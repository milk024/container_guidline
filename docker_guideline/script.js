/* ==========================================================================
   공통 렌더링 엔진 — 4개 학습 페이지가 동일한 파일을 사용합니다.
   내용(구조·흐름·용어·출처)은 같은 폴더의 data.js(window.GUIDE_DATA)에만 있습니다.
   - 아이소메트릭(등각) 장면: 상위 영역은 분해된 레이어, 하위 영역은 보드 위 부품으로 그립니다.
   - 영역에 포인터를 올리면 떠오르며 빛나고, 누르면 그 안으로 들어갑니다.
   - 데이터 일부가 잘못되어도 해당 항목만 건너뛰고 경고를 표시하며, 나머지는 동작합니다.
   - 외부 라이브러리 없이 순수 JavaScript(ES5)로 작성해 file://에서도 그대로 동작합니다.
   ========================================================================== */
(function () {
  'use strict';

  var GUIDES = [
    { id: 'docker', label: 'Docker', en: 'DOCKER', href: '../docker_guideline/index.html' },
    { id: 'k8s', label: 'Kubernetes', en: 'KUBERNETES', href: '../k8s_guideline/index.html' },
    { id: 'cicd', label: 'CI/CD', en: 'CI/CD', href: '../ci_cd_guideline/index.html' },
    { id: 'monitoring', label: '모니터링', en: 'MONITORING', href: '../monitoring_guideline/index.html' }
  ];
  var AUTOPLAY_MS = 2400;
  var GRID_BELOW = 760;          // 이 너비 미만이면 라벨을 장면 아래 번호 목록으로 배치
  var NS = 'http://www.w3.org/2000/svg';
  var C30 = Math.cos(Math.PI / 6), S30 = 0.5;
  var HINT = '탐색할 영역에 포인터를 올려보세요';

  var warnings = [];
  var state = {
    nodes: {}, order: [], rootIds: [], sources: {}, terms: [], flows: [],
    meta: {}, guide: null,
    mode: 'explore',     // 'explore' | 'flow'
    viewId: null,        // 현재 장면이 보여 주는 부모 노드(null = 최상위)
    hotId: null,         // 포인터·포커스가 올라간 항목 key
    selId: null,         // 고정 선택된 노드 id
    flowIndex: 0, step: 0, timer: null,
    lastPointer: 'mouse', drawerOpener: null, keyNav: false
  };

  /* ---------------- 유틸 ---------------- */
  function $(id) { return document.getElementById(id); }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === 'class') node.className = v;
        else if (k === 'text') node.textContent = v;
        else node.setAttribute(k, v === true ? '' : String(v));
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  function svg(tag, attrs) {
    var n = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { if (attrs[k] !== null && attrs[k] !== undefined) n.setAttribute(k, attrs[k]); });
    return n;
  }

  function isStr(v) { return typeof v === 'string' && v.trim() !== ''; }
  function norm(s) { return String(s || '').toLowerCase().replace(/[\s\-_/().]/g, ''); }
  function warn(msg) { warnings.push(msg); }
  function hash(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h); }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function safe(label, fn) {
    try { return fn(); }
    catch (e) {
      warn(label + ' 처리 중 오류: ' + (e && e.message ? e.message : e));
      if (window.console && console.warn) console.warn('[guide]', label, e);
      return null;
    }
  }

  /* ---------------- 데이터 검증 ---------------- */
  function validateSources(list) {
    var map = {};
    (Array.isArray(list) ? list : []).forEach(function (s, i) {
      if (!s || !isStr(s.id) || !isStr(s.title) || !isStr(s.url)) {
        warn('출처 #' + (i + 1) + '에 id/title/url이 없어 제외했습니다.');
        return;
      }
      if (!/^https?:\/\//i.test(s.url)) { warn('출처 "' + s.id + '": http(s) 주소가 아니어서 제외했습니다.'); return; }
      if (map[s.id]) { warn('중복된 출처 id "' + s.id + '"는 제외했습니다.'); return; }
      map[s.id] = s;
    });
    return map;
  }

  function checkSrc(owner, src) {
    var ids = Array.isArray(src) ? src : (isStr(src) ? [src] : []);
    var ok = ids.filter(function (id) {
      if (!state.sources[id]) { warn(owner + ': 출처 id "' + id + '"를 찾을 수 없습니다.'); return false; }
      return true;
    });
    if (!ok.length) warn(owner + ': 출처 표기가 없습니다.');
    return ok;
  }

  function validateTree(roots) {
    var list = Array.isArray(roots) ? roots : (roots ? [roots] : []);
    function walk(n, parentId, depth, path) {
      if (!n || typeof n !== 'object') { warn(path + ': 노드 형식이 올바르지 않아 제외했습니다.'); return null; }
      if (!isStr(n.id) || !isStr(n.label)) { warn(path + ': id 또는 label이 없어 제외했습니다.'); return null; }
      if (state.nodes[n.id]) { warn('중복된 노드 id "' + n.id + '"는 제외했습니다.'); return null; }
      var desc = isStr(n.desc) ? n.desc.trim() : '';
      if (!desc) { warn('노드 "' + n.label + '"에 설명이 없습니다.'); desc = '(설명 준비 중)'; }
      else if (/\n/.test(desc)) { warn('노드 "' + n.label + '"의 설명이 1줄이 아닙니다.'); desc = desc.replace(/\s*\n\s*/g, ' '); }
      var entry = {
        data: { id: n.id, label: n.label, en: isStr(n.en) ? n.en : '', desc: desc, terms: Array.isArray(n.terms) ? n.terms.filter(isStr) : [] },
        parentId: parentId, depth: depth, childIds: []
      };
      entry.data.src = checkSrc('노드 "' + n.label + '"', n.src);
      state.nodes[n.id] = entry;
      state.order.push(n.id);
      (Array.isArray(n.children) ? n.children : []).forEach(function (c, i) {
        var cid = walk(c, n.id, depth + 1, path + ' > ' + (i + 1));
        if (cid) entry.childIds.push(cid);
      });
      return n.id;
    }
    list.forEach(function (r, i) {
      var id = walk(r, null, 1, '루트 ' + (i + 1));
      if (id) state.rootIds.push(id);
    });
  }

  function validateFlows(flows) {
    (Array.isArray(flows) ? flows : []).forEach(function (f, fi) {
      if (!f || !isStr(f.title) || !Array.isArray(f.steps)) { warn('흐름 #' + (fi + 1) + ' 형식이 올바르지 않아 제외했습니다.'); return; }
      var steps = [];
      f.steps.forEach(function (s, si) {
        if (!s || !state.nodes[s.node]) { warn('흐름 "' + f.title + '" ' + (si + 1) + '단계: 존재하지 않는 노드 "' + (s && s.node) + '"는 제외했습니다.'); return; }
        steps.push({ node: s.node, text: isStr(s.text) ? s.text : state.nodes[s.node].data.desc });
      });
      if (steps.length < 2) { warn('흐름 "' + f.title + '"는 유효한 단계가 2개 미만이라 제외했습니다.'); return; }
      state.flows.push({ id: f.id || 'flow' + fi, title: f.title, desc: isStr(f.desc) ? f.desc : '', steps: steps, src: checkSrc('흐름 "' + f.title + '"', f.src) });
    });
  }

  function validateTerms(terms) {
    var seen = {};
    (Array.isArray(terms) ? terms : []).forEach(function (t, i) {
      if (!t || !isStr(t.term) || !isStr(t.summary)) { warn('용어 #' + (i + 1) + '에 이름 또는 요약이 없어 제외했습니다.'); return; }
      if (Array.isArray(t.vs)) { warn('용어 "' + t.term + '"의 비교 대상은 1개여야 합니다.'); return; }
      if (!t.vs || !isStr(t.vs.term) || !isStr(t.vs.diff)) { warn('용어 "' + t.term + '"에 비교 대상이 1개 없어 제외했습니다.'); return; }
      var key = norm(t.term);
      if (seen[key]) { warn('중복 용어 "' + t.term + '"는 제외했습니다.'); return; }
      seen[key] = true;
      state.terms.push({
        id: 'term-' + state.terms.length,
        term: t.term, summary: t.summary, vs: { term: t.vs.term, diff: t.vs.diff },
        nodes: Array.isArray(t.nodes) ? t.nodes.filter(function (id) { return !!state.nodes[id]; }) : [],
        src: checkSrc('용어 "' + t.term + '"', t.src)
      });
    });
  }

  /* ---------------- 공통 조각 ---------------- */
  function srcLinks(ids) {
    var frag = document.createDocumentFragment();
    (ids || []).forEach(function (id, i) {
      var s = state.sources[id];
      if (!s) return;
      if (i) frag.appendChild(document.createTextNode(', '));
      frag.appendChild(el('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer', text: s.title }));
    });
    return frag;
  }

  function relatedTerms(id) {
    var n = state.nodes[id].data;
    var keys = [norm(n.label), norm(n.en)].concat(n.terms.map(norm)).filter(Boolean);
    return state.terms.filter(function (t) {
      return t.nodes.indexOf(id) >= 0 || keys.indexOf(norm(t.term)) >= 0;
    });
  }

  function baseView() { return state.rootIds.length === 1 ? state.rootIds[0] : null; }
  function itemsOf(viewId) { return viewId ? state.nodes[viewId].childIds : state.rootIds; }
  function pathTo(id) { var p = []; while (id) { p.unshift(id); id = state.nodes[id].parentId; } return p; }
  function enOf(id) { var d = state.nodes[id].data; return (d.en || d.label).toUpperCase(); }
  function currentFlow() { return state.flows[state.flowIndex] || null; }

  /* ---------------- 등각 투영 ---------------- */
  // 월드 좌표(x, y: 바닥면, z: 높이) → 화면 좌표. 화면 오른쪽 아래가 +x, 왼쪽 아래가 +y.
  function project(x, y, z) { return [(x - y) * C30, (x + y) * S30 - z]; }

  function boxCorners(b) {
    var out = [];
    [b.z, b.z + b.h].forEach(function (z) {
      out.push([b.x, b.y, z], [b.x + b.w, b.y, z], [b.x, b.y + b.d, z], [b.x + b.w, b.y + b.d, z]);
    });
    return out;
  }

  function fit(points, R, smax) {
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    points.forEach(function (p) {
      var q = project(p[0], p[1], p[2]);
      if (q[0] < minX) minX = q[0]; if (q[0] > maxX) maxX = q[0];
      if (q[1] < minY) minY = q[1]; if (q[1] > maxY) maxY = q[1];
    });
    var bw = Math.max(maxX - minX, 1), bh = Math.max(maxY - minY, 1);
    var s = Math.max(1, Math.min(R.w / bw, R.h / bh, smax || 16));
    var ox = R.x + (R.w - bw * s) / 2 - minX * s;
    var oy = R.y + (R.h - bh * s) / 2 - minY * s;
    return {
      s: s,
      box: { minX: ox + minX * s, maxX: ox + maxX * s, minY: oy + minY * s, maxY: oy + maxY * s },
      I: function (x, y, z) { var q = project(x, y, z); return [ox + q[0] * s, oy + q[1] * s]; }
    };
  }

  function pts(list) { return list.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '); }
  function poly(parent, list, cls) { var p = svg('polygon', { points: pts(list), class: cls }); parent.appendChild(p); return p; }

  function drawBox(g, P, b, prefix) {
    var I = P.I, x = b.x, y = b.y, z = b.z, w = b.w, d = b.d, h = b.h, c = prefix || '';
    poly(g, [I(x, y + d, z), I(x + w, y + d, z), I(x + w, y + d, z + h), I(x, y + d, z + h)], c + 'f-left');
    poly(g, [I(x + w, y, z), I(x + w, y + d, z), I(x + w, y + d, z + h), I(x + w, y, z + h)], c + 'f-right');
    poly(g, [I(x, y, z + h), I(x + w, y, z + h), I(x + w, y + d, z + h), I(x, y + d, z + h)], c + 'f-top');
  }

  // 윗면 장식(칩·팬·슬롯) — id 해시로 고정 선택해 항목마다 다르게 보이게 한다.
  function motif(g, P, b, id) {
    var I = P.I, top = b.z + b.h, cx = b.x + b.w / 2, cy = b.y + b.d / 2, kind = hash(id) % 3;
    if (kind === 0) {
      var ix = b.w * 0.24, iy = b.d * 0.24;
      poly(g, [I(b.x + ix, b.y + iy, top), I(b.x + b.w - ix, b.y + iy, top), I(b.x + b.w - ix, b.y + b.d - iy, top), I(b.x + ix, b.y + b.d - iy, top)], 'motif');
    } else if (kind === 1) {
      [0.34, 0.14].forEach(function (k) {
        var r = Math.min(b.w, b.d) * k, list = [];
        for (var i = 0; i < 20; i++) { var a = i / 20 * Math.PI * 2; list.push(I(cx + Math.cos(a) * r, cy + Math.sin(a) * r, top)); }
        poly(g, list, 'motif');
      });
    } else {
      [0.3, 0.5, 0.7].forEach(function (k) {
        var a = I(b.x + b.w * 0.2, b.y + b.d * k, top), c = I(b.x + b.w * 0.8, b.y + b.d * k, top);
        g.appendChild(svg('line', { x1: a[0], y1: a[1], x2: c[0], y2: c[1], class: 'motif' }));
      });
    }
  }

  // 하위 항목이 있는 블록 윗면에 작은 부품을 올려 "안에 더 있음"을 모양으로도 알린다.
  function miniCubes(g, P, b, count) {
    var k = Math.min(count, 4), c = Math.min(b.w, b.d) * 0.26, top = b.z + b.h;
    var spots = [[0.18, 0.18], [0.56, 0.18], [0.18, 0.56], [0.56, 0.56]];
    for (var i = 0; i < k; i++) {
      drawBox(g, P, { x: b.x + b.w * spots[i][0], y: b.y + b.d * spots[i][1], z: top, w: c, d: c, h: c * 0.75 }, 'm-');
    }
  }

  function marker(g, P, b, num) {
    var p = P.I(b.x + b.w / 2, b.y + b.d / 2, b.z + b.h);
    var r = Math.max(8, Math.min(12, P.s * 0.9));
    g.appendChild(svg('circle', { cx: p[0], cy: p[1] - r - 2, r: r, class: 'num-bg' }));
    var t = svg('text', { x: p[0], y: p[1] - r - 2, class: 'num-tx', 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': Math.round(r * 1.05) });
    t.textContent = String(num);
    g.appendChild(t);
  }

  function makeBlock(layer, P, b, key, opts) {
    var I = P.I, g = svg('g', { class: 'blk' + (opts.cls ? ' ' + opts.cls : ''), 'data-key': key });
    var m = 0.5;
    poly(g, [I(b.x - m, b.y - m, b.z), I(b.x + b.w + m * 2, b.y - m, b.z), I(b.x + b.w + m * 2, b.y + b.d + m * 2, b.z), I(b.x - m, b.y + b.d + m * 2, b.z)], 'shadow');
    var lift = svg('g', { class: 'lift' });
    g.appendChild(lift);
    drawBox(lift, P, b);
    if (opts.kids) miniCubes(lift, P, b, opts.kids); else motif(lift, P, b, opts.motifId || key);
    if (opts.num) marker(lift, P, b, opts.num);
    layer.appendChild(g);
    return g;
  }

  function defs() {
    var d = svg('defs');
    d.innerHTML =
      '<filter id="glow" x="-60%" y="-60%" width="220%" height="220%">' +
      '<feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b"/>' +
      '<feColorMatrix in="b" type="matrix" values="0 0 0 0 0.62  0 0 0 0 0.46  0 0 0 0 1  0 0 0 0.95 0" result="c"/>' +
      '<feMerge><feMergeNode in="c"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<marker id="arr-on" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#ddd6fe"/></marker>' +
      '<marker id="arr-off" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#6d5fb3"/></marker>';
    return d;
  }

  /* ---------------- 라벨 배치 ---------------- */
  function makeLabel(key, parts, extraCls) {
    var b = el('button', { type: 'button', class: 'lbl' + (extraCls ? ' ' + extraCls : ''), 'data-key': key }, parts);
    $('stage-labels').appendChild(b);
    return b;
  }

  // 좁은 화면: 장면 아래에 번호가 붙은 라벨 격자를 만든다.
  function measureGrid(labels, W) {
    var cols = W >= 520 ? 3 : 2, gap = 8, padX = 12;
    var cw = Math.floor((W - padX * 2 - gap * (cols - 1)) / cols);
    labels.forEach(function (l) { l.classList.add('lbl-grid'); l.style.width = cw + 'px'; });
    var rows = Math.ceil(labels.length / cols), rowH = [], total = 0;
    for (var r = 0; r < rows; r++) {
      var h = 0;
      for (var c = 0; c < cols; c++) { var l = labels[r * cols + c]; if (l) h = Math.max(h, l.offsetHeight); }
      rowH.push(h); total += h + (r ? gap : 0);
    }
    return {
      total: total,
      place: function (top) {
        var y = top;
        for (var r = 0; r < rows; r++) {
          for (var c = 0; c < cols; c++) {
            var l = labels[r * cols + c];
            if (!l) continue;
            l.style.left = (padX + c * (cw + gap)) + 'px';
            l.style.top = y + 'px';
            l.style.height = rowH[r] + 'px';
          }
          y += rowH[r] + gap;
        }
      }
    };
  }

  function sideColW(W) { return Math.min(240, Math.max(150, Math.floor(W * 0.19))); }

  // 넓은 화면: 장면 좌우에 라벨을 두고 지시선으로 잇는다. 공간이 모자라면 false.
  function layoutSide(entries, box, W, H, onlyRight) {
    var colW = sideColW(W);
    entries.forEach(function (e) { e.el.style.width = colW + 'px'; e.h = e.el.offsetHeight; });
    var left = [], right = [];
    if (onlyRight) right = entries.slice();
    else {
      var sorted = entries.slice().sort(function (a, b) { return a.ax - b.ax; });
      var half = Math.floor(sorted.length / 2);
      sorted.forEach(function (e, i) { (i < half ? left : right).push(e); });
    }
    function stack(list) {
      list.sort(function (a, b) { return a.ay - b.ay; });
      var y = 10;
      list.forEach(function (e) { e.top = Math.max(e.ay - e.h / 2, y); y = e.top + e.h + 10; });
      var lim = H - 10;
      for (var i = list.length - 1; i >= 0; i--) { list[i].top = Math.min(list[i].top, lim - list[i].h); lim = list[i].top - 10; }
      return !list.length || list[0].top >= 6;
    }
    if (!stack(left) || !stack(right)) return false;
    left.forEach(function (e) {
      e.side = 'left';
      e.x = Math.max(8, box.minX - 30 - colW);
      e.edge = e.x + colW + 4;
    });
    right.forEach(function (e) {
      e.side = 'right';
      e.x = Math.min(W - 8 - colW, box.maxX + 30);
      e.edge = e.x - 4;
    });
    entries.forEach(function (e) {
      e.el.classList.add('lbl-' + e.side);
      e.el.style.left = e.x + 'px';
      e.el.style.top = e.top + 'px';
      e.ly = e.top + Math.min(e.h / 2, 22);
    });
    return true;
  }

  function drawLeaders(layer, entries) {
    entries.forEach(function (e) {
      var ex = e.side === 'left' ? e.edge + 16 : e.edge - 16;
      var g = svg('g', { class: 'leader', 'data-key': e.key });
      g.appendChild(svg('path', { d: 'M' + e.ax.toFixed(1) + ' ' + e.ay.toFixed(1) + 'L' + ex.toFixed(1) + ' ' + e.ly.toFixed(1) + 'L' + e.edge.toFixed(1) + ' ' + e.ly.toFixed(1) }));
      g.appendChild(svg('circle', { cx: e.ax, cy: e.ay, r: 2.6 }));
      layer.appendChild(g);
    });
  }

  /* ---------------- 장면 그리기 ---------------- */
  function sceneContext() {
    var stage = $('stage');
    stage.style.minHeight = '';
    var W = stage.clientWidth, H = stage.clientHeight;
    var sv = $('scene');
    sv.textContent = '';
    $('stage-labels').textContent = '';
    return { stage: stage, sv: sv, W: W, H: H };
  }

  function sizeSvg(ctx) {
    ctx.sv.setAttribute('viewBox', '0 0 ' + ctx.W + ' ' + ctx.H);
    ctx.sv.setAttribute('width', ctx.W);
    ctx.sv.setAttribute('height', ctx.H);
    ctx.sv.appendChild(defs());
  }

  // 격자 모드에서 장면이 너무 낮아지면 무대 높이를 늘린다(세로 스크롤만 생긴다).
  function gridRegion(ctx, grid, minScene) {
    var need = minScene + grid.total + 44;
    if (ctx.H < need) { ctx.H = need; ctx.stage.style.minHeight = need + 'px'; }
    grid.place(ctx.H - grid.total - 12);
    return { x: 16, y: 26, w: ctx.W - 32, h: ctx.H - grid.total - 26 - 28 };
  }

  function labelParts(id, opts) {
    var d = state.nodes[id].data, kids = state.nodes[id].childIds.length;
    return [
      opts.num ? el('span', { class: 'lbl-num', 'aria-hidden': 'true', text: pad2(opts.num) }) : null,
      el('span', { class: 'lbl-text' }, [
        d.en ? el('span', { class: 'lbl-en', text: d.en }) : null,
        el('span', { class: 'lbl-ko', text: d.label }),
        kids ? el('span', { class: 'lbl-meta', text: '하위 ' + kids + ' ›' }) : null,
        opts.badge ? el('span', { class: 'lbl-badge', text: '' }) : null,
        el('span', { class: 'sel-badge', text: '선택됨' })
      ])
    ];
  }

  function renderExplore(forceGrid) {
    var ctx = sceneContext();
    if (ctx.W < 40 || ctx.H < 40) return;
    var items = itemsOf(state.viewId);
    if (!items.length) { sizeSvg(ctx); $('stage-labels').appendChild(el('p', { class: 'stage-empty', text: '표시할 구조 데이터가 없습니다.' })); return; }
    var grid = forceGrid || ctx.W < GRID_BELOW;
    var layered = items.length <= 5 && items.every(function (id) { return state.nodes[id].childIds.length > 0; });

    var labels = items.map(function (id, i) { return makeLabel(id, labelParts(id, { num: grid ? i + 1 : 0 })); });
    var R, g;
    if (grid) { g = measureGrid(labels, ctx.W); R = gridRegion(ctx, g, 210); }
    else if (layered) { var cw = sideColW(ctx.W); R = { x: 28, y: 34, w: ctx.W - cw - 110, h: ctx.H - 60 }; }
    else { var cw2 = sideColW(ctx.W); R = { x: cw2 + 58, y: 34, w: ctx.W - (cw2 + 58) * 2, h: ctx.H - 60 }; }
    sizeSvg(ctx);

    var model = layered ? layerModel(items) : boardModel(items);
    var all = [];
    model.boxes.forEach(function (b) { all = all.concat(boxCorners(b)); });
    var P = fit(all, R, layered ? 15 : 18);

    var base = svg('g', { class: 'scene-base' }), blocks = svg('g', { class: 'scene-blocks' }), lines = svg('g', { class: 'scene-lines' });
    ctx.sv.appendChild(base); ctx.sv.appendChild(lines); ctx.sv.appendChild(blocks);
    var entries = model.draw(base, blocks, P, grid);
    entries.forEach(function (e, i) { e.el = labels[i]; });

    if (!grid) {
      if (!layoutSide(entries, P.box, ctx.W, ctx.H, layered)) { renderExplore(true); return; }
      drawLeaders(lines, entries);
    }
    applyClasses();
  }

  // 상위 영역: 분해도처럼 위아래로 띄운 레이어(첫 항목이 맨 위).
  function layerModel(items) {
    var SW = 24, SD = 15, ST = 1.4, GAP = 7.5, n = items.length;
    var boxes = items.map(function (id, i) { return { x: 0, y: 0, z: (n - 1 - i) * GAP, w: SW, d: SD, h: ST, id: id }; });
    return {
      boxes: boxes,
      draw: function (base, layer, P, grid) {
        var I = P.I;
        // 레이어 사이 수직 안내선(분해도 느낌)
        for (var i = 0; i < n - 1; i++) {
          [[0, SD], [SW, SD], [SW, 0]].forEach(function (c) {
            var a = I(c[0], c[1], boxes[i + 1].z + ST), b = I(c[0], c[1], boxes[i].z);
            base.appendChild(svg('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: 'guide' }));
          });
        }
        var entries = [];
        for (var j = n - 1; j >= 0; j--) {
          var b = boxes[j], id = b.id;
          var g = svg('g', { class: 'blk layer', 'data-key': id });
          var lift = svg('g', { class: 'lift' });
          g.appendChild(lift);
          drawBox(lift, P, b);
          // 윗면 테두리 안쪽 선
          var t = b.z + ST, m = 1;
          poly(lift, [I(m, m, t), I(SW - m, m, t), I(SW - m, SD - m, t), I(m, SD - m, t)], 'motif');
          // 하위 항목 미리보기 부품
          var kids = state.nodes[id].childIds, k = Math.min(kids.length, 8);
          var cols = Math.min(4, k), rows = Math.ceil(k / cols);
          var cwid = (SW - 6) / cols, cdep = (SD - 5) / rows, fp = Math.min(cwid, cdep) * 0.58;
          var minis = [];
          for (var q = 0; q < k; q++) {
            var c = q % cols, r = Math.floor(q / cols);
            minis.push({ x: 3 + c * cwid + (cwid - fp) / 2, y: 2.5 + r * cdep + (cdep - fp) / 2, z: t, w: fp, d: fp, h: state.nodes[kids[q]].childIds.length ? 1.6 : 0.9, kid: kids[q] });
          }
          minis.sort(function (a, b2) { return (a.x + a.y) - (b2.x + b2.y); });
          minis.forEach(function (mb) { drawBox(lift, P, mb, 'm-'); });
          if (grid) marker(lift, P, { x: 0, y: 0, z: b.z, w: SW, d: SD, h: ST }, j + 1);
          layer.appendChild(g);
          var a = I(SW, 0, b.z + ST);
          entries[j] = { key: id, ax: a[0], ay: a[1] };
        }
        return entries;
      }
    };
  }

  // 하위 영역: 보드 위에 부품 블록을 격자로 배치.
  function boardModel(items) {
    var n = items.length, cols = Math.ceil(Math.sqrt(n)), rows = Math.ceil(n / cols);
    var CELL = 10, PAD = 2.5, BT = 1.2;
    var board = { x: 0, y: 0, z: 0, w: cols * CELL + PAD * 2, d: rows * CELL + PAD * 2, h: BT };
    var blocks = items.map(function (id, i) {
      var r = Math.floor(i / cols), inRow = Math.min(cols, n - r * cols), c = i % cols;
      var off = (cols - inRow) * CELL / 2;
      var kids = state.nodes[id].childIds.length;
      var fp = kids ? 6.4 : 5.4, h = kids ? 2.4 + Math.min(kids, 5) * 0.45 : 1.7;
      return { x: PAD + off + c * CELL + (CELL - fp) / 2, y: PAD + r * CELL + (CELL - fp) / 2, z: BT, w: fp, d: fp, h: h, id: id, kids: kids, idx: i };
    });
    return {
      boxes: [board].concat(blocks.map(function (b) { return { x: b.x, y: b.y, z: b.z, w: b.w, d: b.d, h: b.h + 1.2 }; })),
      draw: function (base, layer, P, grid) {
        var I = P.I;
        var bg = svg('g', { class: 'board' });
        drawBox(bg, P, board);
        // 보드 회로 선
        for (var c = 1; c < cols; c++) {
          var a = I(PAD + c * CELL, 1, BT), b = I(PAD + c * CELL, board.d - 1, BT);
          bg.appendChild(svg('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], class: 'trace' }));
        }
        for (var r = 1; r < rows; r++) {
          var a2 = I(1, PAD + r * CELL, BT), b2 = I(board.w - 1, PAD + r * CELL, BT);
          bg.appendChild(svg('line', { x1: a2[0], y1: a2[1], x2: b2[0], y2: b2[1], class: 'trace' }));
        }
        base.appendChild(bg);
        var entries = [];
        blocks.slice().sort(function (p, q) { return (p.x + p.y) - (q.x + q.y); }).forEach(function (b) {
          makeBlock(layer, P, b, b.id, { kids: b.kids, num: grid ? b.idx + 1 : 0 });
        });
        blocks.forEach(function (b) {
          var a = I(b.x + b.w / 2, b.y + b.d / 2, b.z + b.h);
          entries.push({ key: b.id, ax: a[0], ay: a[1] });
        });
        return entries;
      }
    };
  }

  // 흐름: 단계 블록을 뱀 모양 트랙으로 잇고 화살표로 방향을 보인다.
  function renderFlow(forceGrid) {
    var ctx = sceneContext();
    var f = currentFlow();
    if (ctx.W < 40 || ctx.H < 40 || !f) return;
    var n = f.steps.length, grid = forceGrid || ctx.W < GRID_BELOW;
    var cols = n <= 3 ? n : Math.ceil(Math.sqrt(n)), SP = 11, FP = 5.6, BT = 1, PAD = 3;
    var rowsN = Math.ceil(n / cols);
    var pos = f.steps.map(function (s, i) {
      var r = Math.floor(i / cols), k = i % cols;
      if (r % 2) k = cols - 1 - k;
      return { x: PAD + k * SP, y: PAD + r * SP, z: BT, w: FP, d: FP, h: 2.2, i: i };
    });
    var board = { x: 0, y: 0, z: 0, w: PAD * 2 + (cols - 1) * SP + FP, d: PAD * 2 + (rowsN - 1) * SP + FP, h: BT };

    var labels = f.steps.map(function (s, i) {
      var lb = makeLabel('s' + i, labelParts(s.node, { num: i + 1, badge: true }), 'lbl-step');
      var bd = lb.querySelector('.lbl-badge'); if (bd) bd.textContent = '● 현재'; // 가장 넓은 배지로 미리 측정(이후 applyFlowState가 갱신)
      return lb;
    });
    var R, g;
    if (grid) { g = measureGrid(labels, ctx.W); R = gridRegion(ctx, g, 230); }
    else R = { x: 40, y: 92, w: ctx.W - 80, h: ctx.H - 120 };
    sizeSvg(ctx);

    var all = boxCorners(board);
    pos.forEach(function (p) { all = all.concat(boxCorners({ x: p.x, y: p.y, z: p.z, w: p.w, d: p.d, h: p.h + 1.5 })); });
    var P = fit(all, R, 13), I = P.I;

    var base = svg('g', { class: 'board' });
    drawBox(base, P, board);
    ctx.sv.appendChild(base);
    var conn = svg('g', { class: 'scene-lines' });
    ctx.sv.appendChild(conn);
    for (var i = 0; i < n - 1; i++) {
      var a = pos[i], b = pos[i + 1];
      var ax = a.x + FP / 2, ay = a.y + FP / 2, bx = b.x + FP / 2, by = b.y + FP / 2;
      var dx = bx - ax, dy = by - ay, len = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / len, uy = dy / len, cut = FP / 2 + 0.6;
      var p1 = I(ax + ux * cut, ay + uy * cut, BT), p2 = I(bx - ux * cut, by - uy * cut, BT);
      conn.appendChild(svg('path', { d: 'M' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1) + 'L' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1), class: 'conn', 'data-conn': i }));
    }
    var layer = svg('g', { class: 'scene-blocks' });
    ctx.sv.appendChild(layer);
    pos.slice().sort(function (p, q) { return (p.x + p.y) - (q.x + q.y); }).forEach(function (p) {
      makeBlock(layer, P, p, 's' + p.i, { cls: 'step', num: p.i + 1, motifId: f.steps[p.i].node });
    });

    if (!grid) {
      var rects = [];
      for (var j = 0; j < n; j++) {
        var l = labels[j], p = pos[j], top = I(p.x + FP / 2, p.y + FP / 2, p.z + p.h);
        l.style.maxWidth = '150px';
        var w = l.offsetWidth, h = l.offsetHeight;
        var x = Math.max(8, Math.min(ctx.W - 8 - w, top[0] - w / 2)), y = top[1] - 34 - h;
        if (y < 4) { renderFlow(true); return; }
        l.style.left = x + 'px'; l.style.top = y + 'px';
        rects.push([x, y, x + w, y + h]);
      }
      for (var u = 0; u < rects.length; u++) for (var v = u + 1; v < rects.length; v++) {
        var A = rects[u], B = rects[v];
        if (A[0] < B[2] + 4 && B[0] < A[2] + 4 && A[1] < B[3] + 2 && B[1] < A[3] + 2) { renderFlow(true); return; }
      }
    }
    applyFlowState();
    applyClasses();
  }

  /* ---------------- 상태 반영 ---------------- */
  function render() {
    // 상단·하단을 먼저 채워 무대 크기를 확정한 뒤 장면을 그린다
    safe('상단 표시', updateTop);
    safe('설명 표시', updateCaption);
    safe('장면 그리기', function () {
      var focusKey = document.activeElement && document.activeElement.closest && document.activeElement.closest('#stage-labels .lbl');
      focusKey = focusKey ? focusKey.getAttribute('data-key') : null;
      $('stage').setAttribute('data-mode', state.mode);
      if (state.mode === 'flow') renderFlow(false); else renderExplore(false);
      if (focusKey) focusLabel(focusKey);
    });
    safe('구조 목록 동기화', updateOutline);
  }

  function focusLabel(key) {
    var l = $('stage-labels').querySelector('.lbl[data-key="' + key + '"]');
    if (l) l.focus({ preventScroll: true });
  }

  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }

  function applyClasses() {
    each('#stage [data-key]', function (n) {
      var k = n.getAttribute('data-key');
      n.classList.toggle('is-hot', k === state.hotId);
      n.classList.toggle('is-sel', state.mode === 'explore' && k === state.selId);
      if (n.tagName === 'BUTTON' && state.mode === 'explore') n.setAttribute('aria-pressed', k === state.selId ? 'true' : 'false');
    });
  }

  function applyFlowState() {
    var f = currentFlow();
    if (!f) return;
    var cur = state.step;
    each('#stage [data-key^="s"]', function (n) {
      var i = +n.getAttribute('data-key').slice(1);
      var st = i === cur ? 'cur' : i < cur ? 'done' : 'todo';
      n.classList.toggle('is-cur', st === 'cur');
      n.classList.toggle('is-done', st === 'done');
      n.classList.toggle('is-prev', i === cur - 1);
      n.classList.toggle('is-next', i === cur + 1);
      if (n.tagName === 'BUTTON') {
        n.setAttribute('aria-current', st === 'cur' ? 'step' : 'false');
        var b = n.querySelector('.lbl-badge');
        if (b) b.textContent = i === cur ? '● 현재' : i === cur - 1 ? '이전' : i === cur + 1 ? '다음' : i < cur ? '✓ 완료' : '';
      }
    });
    each('#scene .conn', function (c) {
      var i = +c.getAttribute('data-conn');
      c.setAttribute('class', 'conn' + (i < cur - 1 ? ' is-done' : i === cur - 1 ? ' is-active' : ''));
      c.setAttribute('marker-end', i < cur ? 'url(#arr-on)' : 'url(#arr-off)');
    });
    $('step-counter').textContent = (cur + 1) + ' / ' + f.steps.length;
    $('step-prev').disabled = cur <= 0;
    $('step-next').disabled = cur >= f.steps.length - 1;
  }

  function setHot(key) {
    if (state.hotId === key) return;
    state.hotId = key;
    applyClasses();
    updateCaption();
  }

  function updateTop() {
    var crumbs = $('crumbs');
    crumbs.textContent = '';
    var trail = [{ text: 'INFRA KNOWLEDGE BASE' }];
    var base = baseView();
    trail.push({ text: state.guide ? state.guide.en : 'GUIDE', view: base, go: true });
    if (state.mode === 'flow') trail.push({ text: 'FLOW' });
    else if (state.viewId) pathTo(state.viewId).forEach(function (id) { if (id !== base) trail.push({ text: enOf(id), view: id, go: true }); });
    trail.forEach(function (t, i) {
      if (i) crumbs.appendChild(el('span', { class: 'crumb-sep', 'aria-hidden': 'true', text: '/' }));
      var last = i === trail.length - 1;
      if (t.go && !last) crumbs.appendChild(el('button', { type: 'button', class: 'crumb', 'data-view': t.view === null ? '' : t.view, text: t.text }));
      else crumbs.appendChild(el('span', { class: 'crumb' + (last ? ' is-current' : ''), 'aria-current': last ? 'location' : null, text: t.text }));
    });
    var back = $('back-btn');
    if (state.mode === 'flow') { back.hidden = false; $('back-text').textContent = '구조 탐색'; }
    else if (state.viewId !== base) {
      back.hidden = false;
      var p = state.nodes[state.viewId].parentId;
      $('back-text').textContent = (p === base || p === null) ? '메인' : state.nodes[p].data.label;
    } else back.hidden = true;
    var tf = $('toggle-flow');
    tf.setAttribute('aria-pressed', state.mode === 'flow' ? 'true' : 'false');
    tf.textContent = state.mode === 'flow' ? '◇ 탐색으로' : '⇢ 흐름';
    $('flow-bar').hidden = state.mode !== 'flow';
  }

  function capLine(id, prefix, text) {
    var d = state.nodes[id].data;
    return el('p', { class: 'cap-main' }, [
      prefix ? el('span', { class: 'cap-step', text: prefix }) : null,
      d.en ? el('span', { class: 'cap-en', text: d.en }) : null,
      el('strong', { class: 'cap-name', text: d.label }),
      el('span', { class: 'cap-desc', text: ' — ' + text })
    ]);
  }

  function updateCaption() {
    var box = $('caption-body');
    box.textContent = '';
    if (state.mode === 'flow') {
      var f = currentFlow();
      if (!f) { box.appendChild(el('p', { class: 'cap-hint', text: '표시할 흐름 데이터가 없습니다.' })); return; }
      var s = f.steps[state.step];
      box.appendChild(capLine(s.node, 'STEP ' + (state.step + 1) + '/' + f.steps.length, s.text));
      var m = el('p', { class: 'cap-meta' }, [
        el('span', { text: f.title + (f.desc ? ' — ' + f.desc : '') }),
        el('span', { class: 'cap-src' }, ['출처: ', srcLinks(f.src)]),
        el('button', { type: 'button', class: 'ghost-btn sm', 'data-go': s.node, text: '구조에서 보기 ›' })
      ]);
      box.appendChild(m);
      return;
    }
    var id = state.hotId && state.nodes[state.hotId] ? state.hotId : state.selId;
    if (!id || !state.nodes[id]) {
      var v = state.viewId;
      if (v) box.appendChild(el('p', { class: 'cap-context' }, [el('span', { class: 'cap-en', text: enOf(v) }), ' ', el('strong', { text: state.nodes[v].data.label }), ' — ' + state.nodes[v].data.desc]));
      else if (isStr(state.meta.subtitle)) box.appendChild(el('p', { class: 'cap-context', text: state.meta.subtitle }));
      box.appendChild(el('p', { class: 'cap-hint', text: HINT }));
      box.appendChild(el('p', { class: 'cap-sub', text: '터치: 한 번 눌러 설명 · 다시 눌러 들어가기 · 키보드: Tab 이동, Enter 들어가기, Esc 상위로' }));
      return;
    }
    var n = state.nodes[id];
    box.appendChild(capLine(id, '', n.data.desc));
    var meta = el('p', { class: 'cap-meta' });
    if (id === state.selId) meta.appendChild(el('span', { class: 'cap-badge', text: '● 선택됨' }));
    if (n.childIds.length) meta.appendChild(el('button', { type: 'button', class: 'ghost-btn sm is-primary', 'data-drill': id, text: '들어가기 › (하위 ' + n.childIds.length + ')' }));
    meta.appendChild(el('span', { class: 'cap-src' }, ['출처: ', srcLinks(n.data.src)]));
    var rt = relatedTerms(id);
    if (rt.length) {
      meta.appendChild(el('span', { class: 'cap-terms' }, ['용어: '].concat(rt.slice(0, 4).map(function (t) {
        return el('button', { type: 'button', class: 'term-chip', 'data-term': t.term, text: t.term });
      }))));
    }
    box.appendChild(meta);
  }

  /* ---------------- 이동 ---------------- */
  function drill(id, viaKey) {
    if (!state.nodes[id] || !state.nodes[id].childIds.length) return;
    state.viewId = id; state.selId = null; state.hotId = null;
    render();
    if (viaKey) { var f = $('stage-labels').querySelector('.lbl'); if (f) f.focus(); }
  }

  function up(viaKey) {
    if (state.mode === 'flow') { setMode('explore'); return; }
    var base = baseView();
    if (state.viewId === base) { if (state.selId) { state.selId = null; applyClasses(); updateCaption(); updateOutline(); } return; }
    var from = state.viewId;
    var p = state.nodes[from].parentId;
    state.viewId = p === null ? base : p;
    state.selId = from; state.hotId = null;
    render();
    if (viaKey) focusLabel(from);
  }

  function focusNode(id) {
    if (!state.nodes[id]) return;
    stopAutoplay();
    state.mode = 'explore';
    if (id === baseView()) { state.viewId = id; state.selId = null; }
    else { var p = state.nodes[id].parentId; state.viewId = p === null ? baseView() : p; state.selId = id; }
    state.hotId = null;
    render();
    focusLabel(id);
  }

  function select(id) {
    state.selId = id;
    applyClasses(); updateCaption(); updateOutline();
  }

  function activate(key, viaKey) {
    if (state.mode === 'flow') { if (key.charAt(0) === 's') { stopAutoplay(); goStep(+key.slice(1)); } return; }
    var n = state.nodes[key];
    if (!n) return;
    if (state.lastPointer === 'touch' && !viaKey && state.selId !== key) { select(key); return; }
    if (n.childIds.length) drill(key, viaKey);
    else select(key);
  }

  function setMode(mode) {
    if (mode === 'flow' && !state.flows.length) return;
    stopAutoplay();
    state.mode = mode; state.hotId = null;
    render();
  }

  /* ---------------- 흐름 조작 ---------------- */
  function renderFlowSelect() {
    var sel = $('flow-select');
    sel.textContent = '';
    state.flows.forEach(function (f, i) { sel.appendChild(el('option', { value: i, text: (i + 1) + '. ' + f.title })); });
    $('flow-select-wrap').hidden = state.flows.length < 2;
    sel.addEventListener('change', function () { stopAutoplay(); state.flowIndex = +sel.value || 0; state.step = 0; render(); });
  }

  function goStep(i) {
    var f = currentFlow();
    if (!f) return;
    state.step = Math.max(0, Math.min(f.steps.length - 1, i));
    applyFlowState();
    updateCaption();
  }

  function startAutoplay() {
    var f = currentFlow();
    if (!f) return;
    if (state.step >= f.steps.length - 1) goStep(0);
    $('step-play').setAttribute('aria-pressed', 'true');
    $('step-play').textContent = '⏸ 일시 정지';
    state.timer = setInterval(function () {
      var fl = currentFlow();
      if (!fl || state.step >= fl.steps.length - 1) { stopAutoplay(); return; }
      goStep(state.step + 1);
    }, AUTOPLAY_MS);
  }

  function stopAutoplay() {
    if (state.timer) clearInterval(state.timer);
    state.timer = null;
    $('step-play').setAttribute('aria-pressed', 'false');
    $('step-play').textContent = '▶ 자동 재생';
  }

  /* ---------------- 서랍(구조·용어·출처) ---------------- */
  var PANE_TITLES = { outline: '구조 전체 보기', terms: '용어', sources: '출처' };

  function openDrawer(pane, opener) {
    stopAutoplay();
    state.drawerOpener = opener || document.activeElement;
    $('drawer-title').textContent = PANE_TITLES[pane] || '';
    each('#drawer .pane', function (p) { p.hidden = p.getAttribute('data-pane') !== pane; });
    $('drawer').hidden = false;
    $('drawer-backdrop').hidden = false;
    document.body.classList.add('drawer-open');
    if (pane === 'outline') updateOutline(true);
    var first = pane === 'terms' ? $('term-search') : $('drawer-close');
    first.focus();
  }

  function closeDrawer() {
    if ($('drawer').hidden) return;
    $('drawer').hidden = true;
    $('drawer-backdrop').hidden = true;
    document.body.classList.remove('drawer-open');
    var o = state.drawerOpener;
    state.drawerOpener = null;
    if (o && document.contains(o) && o.focus) o.focus();
  }

  function trapFocus(e) {
    var list = Array.prototype.filter.call($('drawer').querySelectorAll('button, a[href], input, select'), function (n) {
      return !n.disabled && n.offsetParent !== null;
    });
    if (!list.length) return;
    var first = list[0], last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function buildOutline() {
    var root = $('outline');
    root.textContent = '';
    function build(id, ul) {
      var n = state.nodes[id], kids = n.childIds, toggle = null, sub = null;
      var li = el('li', { class: 'ol-item' });
      var row = el('div', { class: 'ol-row' });
      if (kids.length) {
        toggle = el('button', { type: 'button', class: 'ol-toggle', 'aria-expanded': 'false', 'data-toggle': id, 'aria-label': n.data.label + ' 하위 ' + kids.length + '개 펼치기/접기', text: '▸' });
        row.appendChild(toggle);
      } else row.appendChild(el('span', { class: 'ol-leaf', 'aria-hidden': 'true', text: '·' }));
      var badge = el('span', { class: 'ol-badge' });
      row.appendChild(el('button', { type: 'button', class: 'ol-go', 'data-go': id }, [
        n.data.en ? el('span', { class: 'ol-en', text: n.data.en }) : null,
        el('span', { class: 'ol-ko', text: n.data.label }),
        badge
      ]));
      li.appendChild(row);
      if (kids.length) {
        sub = el('ul', { class: 'ol-sub', hidden: true });
        kids.forEach(function (c) { build(c, sub); });
        li.appendChild(sub);
      }
      n.ol = { li: li, toggle: toggle, sub: sub, badge: badge };
      ul.appendChild(li);
    }
    state.rootIds.forEach(function (id) { build(id, root); });
  }

  function setOutlineOpen(id, open) {
    var o = state.nodes[id] && state.nodes[id].ol;
    if (!o || !o.sub) return;
    o.sub.hidden = !open;
    o.toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    o.toggle.textContent = open ? '▾' : '▸';
  }

  function updateOutline(reveal) {
    state.order.forEach(function (id) {
      var o = state.nodes[id].ol;
      if (!o) return;
      var viewing = state.mode === 'explore' && id === state.viewId, sel = state.mode === 'explore' && id === state.selId;
      o.badge.textContent = viewing ? '보는 중' : sel ? '선택됨' : '';
      o.li.classList.toggle('is-current', viewing || sel);
    });
    if (reveal) {
      [state.viewId, state.selId].forEach(function (id) {
        if (!id || !state.nodes[id]) return;
        pathTo(id).forEach(function (p) { if (p !== id || state.nodes[p].childIds.length) setOutlineOpen(p, true); });
      });
    }
  }

  function buildTerms() {
    var dl = $('term-list');
    dl.textContent = '';
    state.terms.forEach(function (t) {
      var nodeBtns = t.nodes.map(function (id) { return el('button', { type: 'button', class: 'term-chip', 'data-go': id, text: '◇ ' + state.nodes[id].data.label }); });
      dl.appendChild(el('div', { class: 'term-row', 'data-q': norm(t.term + ' ' + t.summary + ' ' + t.vs.term + ' ' + t.vs.diff) }, [
        el('dt', { class: 't-main' }, [el('strong', { text: t.term }), ': ' + t.summary]),
        el('dd', { class: 't-vs' }, [el('strong', { text: 'vs ' + t.vs.term }), ': ' + t.vs.diff]),
        el('dd', { class: 't-meta' }, [el('span', null, ['출처: ', srcLinks(t.src)])].concat(nodeBtns))
      ]));
    });
    if (!state.terms.length) dl.appendChild(el('dt', { class: 'pane-note', text: '표시할 용어 데이터가 없습니다.' }));
  }

  function filterTerms() {
    var q = norm($('term-search').value), shown = 0;
    each('#term-list .term-row', function (r) {
      var ok = !q || r.getAttribute('data-q').indexOf(q) >= 0;
      r.hidden = !ok;
      if (ok) shown++;
    });
    $('term-empty').hidden = shown > 0 || !state.terms.length;
  }

  function renderSources(data) {
    var ol = $('source-list');
    ol.textContent = '';
    Object.keys(state.sources).forEach(function (id) {
      var s = state.sources[id];
      ol.appendChild(el('li', null, [
        el('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer', text: s.title }),
        isStr(s.use) ? el('span', { class: 'source-use', text: ' — ' + s.use }) : null
      ]));
    });
    var refs = Array.isArray(data.internalRefs) ? data.internalRefs.filter(isStr) : [];
    var box = $('internal-refs');
    box.textContent = '';
    if (refs.length) {
      box.appendChild(el('h3', { text: '내부 참고 자료 (학습 맥락)' }));
      box.appendChild(el('ul', { class: 'source-list' }, refs.map(function (r) { return el('li', { text: r }); })));
      if (isStr(data.internalNote)) box.appendChild(el('p', { class: 'source-use', text: data.internalNote }));
    }
    $('checked-note').textContent = '모든 설명은 위 공식 문서를 근거로 작성했습니다.' + (isStr(data.meta && data.meta.checked) ? ' 내용 기준일: ' + data.meta.checked + '.' : '');
  }

  /* ---------------- 헤더·경고 ---------------- */
  function renderHeader(meta) {
    meta = meta || {};
    state.meta = meta;
    state.guide = null;
    GUIDES.forEach(function (g) { if (g.id === meta.id) state.guide = g; });
    var title = isStr(meta.title) ? meta.title : '학습 가이드';
    $('guide-title').textContent = title;
    document.title = title + ' · 인프라 학습 가이드';
    var nav = $('guide-nav');
    nav.textContent = '';
    GUIDES.forEach(function (g) {
      nav.appendChild(el('a', { class: 'guide-link', href: g.href, 'aria-current': g.id === meta.id ? 'page' : null, text: g.label }));
    });
  }

  function renderWarnings() {
    var box = $('data-notice');
    if (!warnings.length) { box.hidden = true; return; }
    box.hidden = false;
    $('notice-summary').textContent = '⚠ 데이터 점검 결과 ' + warnings.length + '건 — 문제가 있는 항목만 제외하고 표시했습니다.';
    var ul = $('notice-list');
    ul.textContent = '';
    warnings.forEach(function (w) { ul.appendChild(el('li', { text: w })); });
  }

  /* ---------------- 이벤트 ---------------- */
  function keyOf(target) {
    var n = target && target.closest ? target.closest('[data-key]') : null;
    return n && $('stage').contains(n) ? n.getAttribute('data-key') : null;
  }

  function bindEvents() {
    var stage = $('stage');
    stage.addEventListener('pointerdown', function (e) { state.lastPointer = e.pointerType || 'mouse'; });
    stage.addEventListener('pointerover', function (e) { if (e.pointerType !== 'touch') setHot(keyOf(e.target)); });
    stage.addEventListener('pointerleave', function () { setHot(document.activeElement && keyOf(document.activeElement)); });
    stage.addEventListener('click', function (e) {
      var k = keyOf(e.target);
      if (!k) { if (state.lastPointer === 'touch') setHot(null); return; }
      if (state.lastPointer === 'touch') setHot(k);
      activate(k, e.detail === 0);
      state.lastPointer = 'mouse';
    });
    $('stage-labels').addEventListener('focusin', function (e) { setHot(keyOf(e.target)); });
    $('stage-labels').addEventListener('focusout', function (e) { if (!e.relatedTarget || !keyOf(e.relatedTarget)) setHot(null); });
    $('stage-labels').addEventListener('keydown', function (e) {
      var list = Array.prototype.slice.call($('stage-labels').querySelectorAll('.lbl'));
      var i = list.indexOf(document.activeElement);
      if (i < 0) return;
      var j = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % list.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + list.length) % list.length;
      else if (e.key === 'Home') j = 0;
      else if (e.key === 'End') j = list.length - 1;
      if (j >= 0) { e.preventDefault(); list[j].focus(); }
    });

    $('back-btn').addEventListener('click', function (e) { up(e.detail === 0); });
    $('crumbs').addEventListener('click', function (e) {
      var b = e.target.closest('[data-view]');
      if (!b) return;
      var v = b.getAttribute('data-view') || null;
      stopAutoplay();
      state.mode = 'explore'; state.viewId = v; state.selId = null; state.hotId = null;
      render();
    });
    $('toggle-flow').addEventListener('click', function () { setMode(state.mode === 'flow' ? 'explore' : 'flow'); });
    $('open-outline').addEventListener('click', function (e) { openDrawer('outline', e.currentTarget); });
    $('open-terms').addEventListener('click', function (e) { openDrawer('terms', e.currentTarget); });
    $('open-sources').addEventListener('click', function (e) { openDrawer('sources', e.currentTarget); });
    $('drawer-close').addEventListener('click', closeDrawer);
    $('drawer-backdrop').addEventListener('click', closeDrawer);
    $('expand-all').addEventListener('click', function () { state.order.forEach(function (id) { setOutlineOpen(id, true); }); });
    $('collapse-all').addEventListener('click', function () { state.order.forEach(function (id) { setOutlineOpen(id, false); }); });
    $('term-search').addEventListener('input', filterTerms);

    function onAction(e) {
      var t = e.target.closest('[data-go],[data-toggle],[data-drill],[data-term]');
      if (!t) return;
      if (t.hasAttribute('data-toggle')) {
        var id = t.getAttribute('data-toggle');
        setOutlineOpen(id, t.getAttribute('aria-expanded') !== 'true');
      } else if (t.hasAttribute('data-go')) {
        closeDrawer();
        focusNode(t.getAttribute('data-go'));
      } else if (t.hasAttribute('data-drill')) {
        drill(t.getAttribute('data-drill'), e.detail === 0);
      } else if (t.hasAttribute('data-term')) {
        openDrawer('terms', t);
        $('term-search').value = t.getAttribute('data-term');
        filterTerms();
      }
    }
    $('drawer').addEventListener('click', onAction);
    $('caption').addEventListener('click', onAction);

    $('step-prev').addEventListener('click', function () { stopAutoplay(); goStep(state.step - 1); });
    $('step-next').addEventListener('click', function () { stopAutoplay(); goStep(state.step + 1); });
    $('step-reset').addEventListener('click', function () { stopAutoplay(); goStep(0); });
    $('step-play').addEventListener('click', function () { if (state.timer) stopAutoplay(); else startAutoplay(); });

    document.addEventListener('keydown', function (e) {
      if (!$('drawer').hidden) {
        if (e.key === 'Escape') { e.preventDefault(); closeDrawer(); }
        else if (e.key === 'Tab') trapFocus(e);
        return;
      }
      var tag = e.target && e.target.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === 'Escape' || e.key === 'Backspace') { e.preventDefault(); up(true); return; }
      if (state.mode === 'flow') {
        if (e.key === ',' || e.key === '<') { e.preventDefault(); stopAutoplay(); goStep(state.step - 1); }
        if (e.key === '.' || e.key === '>') { e.preventDefault(); stopAutoplay(); goStep(state.step + 1); }
      }
    });

    // 크기 변화 → 다시 그리기. 숨은 탭처럼 rAF가 멈춘 환경을 위해 타이머도 함께 건다.
    var raf = 0, timer = 0, lastW = -1, lastH = -1;
    function run() {
      if (raf) cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
      raf = 0; timer = 0;
      var s = $('stage');
      if (s.clientWidth === lastW && s.clientHeight === lastH) return;
      render();
      lastW = s.clientWidth; lastH = s.clientHeight;
    }
    function schedule() {
      if (raf) cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
      raf = requestAnimationFrame(run);
      timer = setTimeout(run, 140);
    }
    window.addEventListener('resize', schedule);
    if (window.ResizeObserver) new ResizeObserver(schedule).observe(stage);
    state.forceRender = function () { lastW = -1; schedule(); };
  }

  /* ---------------- 시작 ---------------- */
  function init() {
    var data = window.GUIDE_DATA;
    if (!data || typeof data !== 'object') {
      warn('data.js를 불러오지 못했습니다. index.html과 같은 폴더에 data.js가 있는지 확인하세요.');
      safe('헤더', function () { renderHeader({}); });
      $('caption-body').appendChild(el('p', { class: 'cap-hint', text: '표시할 데이터가 없습니다.' }));
      renderWarnings();
      return;
    }
    safe('헤더', function () { renderHeader(data.meta); });
    state.sources = safe('출처 검증', function () { return validateSources(data.sources); }) || {};
    safe('구조 검증', function () { validateTree(data.tree); });
    safe('흐름 검증', function () { validateFlows(data.flows); });
    safe('용어 검증', function () { validateTerms(data.terms); });

    safe('구조 목록', buildOutline);
    safe('용어 목록', buildTerms);
    safe('출처 목록', function () { renderSources(data); });
    if (state.flows.length) safe('흐름 선택', renderFlowSelect);
    else { $('toggle-flow').disabled = true; $('toggle-flow').title = '표시할 흐름 데이터가 없습니다.'; }

    state.viewId = baseView();
    safe('이벤트 연결', bindEvents);
    render();
    renderWarnings();
    window.__guide = { state: state, render: render, warnings: warnings };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
