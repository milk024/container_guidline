/* ==========================================================================
   공통 렌더링 엔진 — 5개 학습 페이지가 동일한 파일을 사용합니다.
   내용(구조·흐름·용어·출처)은 같은 폴더의 data.js(window.GUIDE_DATA)에만,
   첫 화면의 손으로 그린 입체 장면은 같은 폴더의 scene.js(window.GUIDE_SCENE)에만 있습니다.
   - 첫 화면: 가이드별 입체(등각) 장면. 영역을 누르면 그 안(L2)으로 들어가고, 안에서는 구성 요소를 눌러 설명창을 엽니다.
   - 오른쪽 흐름 패널: 흐름을 고르면 단계마다 장면의 해당 부분이 빛나고, 이전 단계에서 빛나는 점이 이동합니다.
   - 설명창: 왼쪽은 하위 요소를 분해한 그림, 오른쪽은 개요 → 하위 요소 → 예시 순서의 넘김 슬라이드.
   - 실습 창: data.js의 예시(examples)를 기본 흐름 순서로 묶어 보여 줍니다(끌어서 옮기고 접을 수 있음).
   - 데이터 일부가 잘못되어도 해당 항목만 건너뛰고 경고를 표시하며, 나머지는 동작합니다.
   - 외부 라이브러리·CDN 없이 순수 JavaScript(ES5)로 작성해 file://에서도 그대로 동작합니다.
   ========================================================================== */
(function () {
  'use strict';

  var GUIDES = [
    { id: 'gitflow', label: 'Git Flow·커밋', en: 'GIT FLOW', href: '../git_flow_commit_guideline/index.html', h: 340 },
    { id: 'cicd', label: 'CI/CD', en: 'CI/CD', href: '../ci_cd_guideline/index.html', h: 158 },
    { id: 'docker', label: 'Docker', en: 'DOCKER', href: '../docker_guideline/index.html', h: 198 },
    { id: 'terraform', label: 'Terraform', en: 'TERRAFORM', href: '../terraform_guideline/index.html', h: 268 },
    { id: 'k8s', label: 'Kubernetes', en: 'KUBERNETES', href: '../k8s_guideline/index.html', h: 226 },
    { id: 'monitoring', label: '모니터링', en: 'MONITORING', href: '../monitoring_guideline/index.html', h: 30 }
  ];
  var HUB = '../index.html';
  var NS = 'http://www.w3.org/2000/svg';
  var WIDE = 900;        // 이 너비 이상이면 장면 + 오른쪽 흐름 패널, 미만이면 위아래로 쌓음
  var COMPACT = 600;     // 장면 폭이 이보다 좁으면 라벨을 번호로 줄이고 아래에 목록을 보여 줌
  var TYPE_MS = 20;      // 단계 설명 타이핑 속도(글자당)

  var warnings = [];
  var state = {
    nodes: {}, order: [], rootIds: [], sources: {}, terms: [], flows: [], icons: {},
    meta: {}, guide: null,
    viewId: null,        // 지금 장면이 보여 주는 부모 노드(null = 첫 화면 장면)
    hotId: null,         // 포인터·포커스가 올라간 노드
    flow: -1, step: 0,   // 진행 중인 흐름과 단계(-1 = 목록)
    kit: null, vb: [1000, 640], labels: [],
    modal: null, practice: 0, drawerOpener: null
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
  // localStorage는 사생활 보호 모드·file:// 등에서 막힐 수 있으므로 항상 try/catch로 감싼다.
  function store(k, v) {
    try { if (v === undefined) return window.localStorage.getItem(k); window.localStorage.setItem(k, v); } catch (e) { /* 저장 불가 환경: 무시 */ }
    return null;
  }
  function lvOf(id) { return state.nodes[id] ? Math.min(3, state.nodes[id].depth) : 3; }

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

  // 예시: { v: 장면 라벨에 보일 실제 값(짧게), code: 하단에 보일 전체 예시 }
  function parseEx(n) {
    if (n.ex === undefined || n.ex === null) return null;
    if (typeof n.ex !== 'object') { warn('노드 "' + n.label + '"의 예시(ex) 형식이 올바르지 않아 무시했습니다.'); return null; }
    var ex = {
      v: isStr(n.ex.v) ? String(n.ex.v).replace(/\s*\n\s*/g, ' ') : '',
      code: isStr(n.ex.code) ? String(n.ex.code).replace(/\s+$/, '') : '',
      lang: isStr(n.ex.lang) ? n.ex.lang : ''
    };
    return ex.v || ex.code ? ex : null;
  }

  function validateTree(roots, exMap) {
    exMap = exMap && typeof exMap === 'object' ? exMap : {};
    var list = Array.isArray(roots) ? roots : (roots ? [roots] : []);
    function walk(n, parentId, depth, path) {
      if (!n || typeof n !== 'object') { warn(path + ': 노드 형식이 올바르지 않아 제외했습니다.'); return null; }
      if (!isStr(n.id) || !isStr(n.label)) { warn(path + ': id 또는 label이 없어 제외했습니다.'); return null; }
      if (state.nodes[n.id]) { warn('중복된 노드 id "' + n.id + '"는 제외했습니다.'); return null; }
      var desc = isStr(n.desc) ? n.desc.trim() : '';
      if (!desc) { warn('노드 "' + n.label + '"에 설명이 없습니다.'); desc = '(설명 준비 중)'; }
      else if (/\n/.test(desc)) { warn('노드 "' + n.label + '"의 설명이 1줄이 아닙니다.'); desc = desc.replace(/\s*\n\s*/g, ' '); }
      var entry = {
        data: {
          id: n.id, label: n.label, en: isStr(n.en) ? n.en : '', desc: desc, terms: Array.isArray(n.terms) ? n.terms.filter(isStr) : [],
          // key: 무엇이고 왜 필요한지 1줄, role: 흐름에서 "OO에게 받아서 OO에게 넘긴다". 없으면 설명으로 대신한다.
          key: isStr(n.key) ? n.key.trim() : '', role: isStr(n.role) ? n.role.trim() : ''
        },
        parentId: parentId, depth: depth, childIds: []
      };
      entry.data.src = checkSrc('노드 "' + n.label + '"', n.src);
      entry.data.ex = parseEx(n.ex !== undefined ? n : { label: n.label, ex: Object.prototype.hasOwnProperty.call(exMap, n.id) ? exMap[n.id] : undefined });
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
      var at = isStr(f.at) ? f.at : null;
      if (at && !state.nodes[at]) { warn('흐름 "' + f.title + '": at 노드 "' + at + '"가 없어 항상 표시합니다.'); at = null; }
      state.flows.push({ id: f.id || 'flow' + fi, title: f.title, desc: isStr(f.desc) ? f.desc : '', steps: steps, main: f.main === true, at: at, src: checkSrc('흐름 "' + f.title + '"', f.src) });
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
      var nodes = Array.isArray(t.nodes) ? t.nodes.filter(function (id) { return !!state.nodes[id]; }) : [];
      // level: 1이면 기본 표시, 2·3은 "더 보기". 생략하면 연결된 노드 중 가장 얕은 깊이(없으면 3).
      var level = t.level === 1 || t.level === 2 || t.level === 3 ? t.level
        : nodes.length ? Math.min.apply(null, nodes.map(lvOf)) : 3;
      state.terms.push({
        id: 'term-' + state.terms.length,
        term: t.term, summary: t.summary, vs: { term: t.vs.term, diff: t.vs.diff },
        nodes: nodes, level: level,
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


  /* ---------------- 용어 툴팁 ----------------
     본문 문자열에서 용어가 처음 나오는 곳을 버튼(.tt)으로 감싼다. 같은 설명 안에서는 용어마다 한 번만. */
  var termMatchers = null;
  function buildMatchers() {
    termMatchers = state.terms.map(function (t) {
      var latin = /^[\x00-\x7f]+$/.test(t.term);
      return { t: t, low: t.term.toLowerCase(), latin: latin };
    }).sort(function (a, b) { return b.low.length - a.low.length; });
  }
  function richText(text, used, self) {
    var frag = document.createDocumentFragment();
    text = String(text || '');
    if (!termMatchers) buildMatchers();
    var low = text.toLowerCase(), hits = [];
    used = used || {};
    termMatchers.forEach(function (m) {
      if (used[m.t.id] || (self && self.indexOf(norm(m.t.term)) >= 0)) return;
      var from = 0, i;
      while ((i = low.indexOf(m.low, from)) >= 0) {
        var e = i + m.low.length;
        var okB = !m.latin || ((i === 0 || !/[a-z0-9]/i.test(text.charAt(i - 1))) && (e >= text.length || !/[a-z0-9]/i.test(text.charAt(e))));
        if (okB && !hits.some(function (h) { return i < h.e && e > h.s; })) { hits.push({ s: i, e: e, t: m.t }); used[m.t.id] = true; break; }
        from = i + 1;
      }
    });
    hits.sort(function (a, b) { return a.s - b.s; });
    var pos = 0;
    hits.forEach(function (h) {
      if (h.s > pos) frag.appendChild(document.createTextNode(text.slice(pos, h.s)));
      frag.appendChild(el('button', { type: 'button', class: 'tt', 'data-tip': h.t.id, 'aria-expanded': 'false', text: text.slice(h.s, h.e) }));
      pos = h.e;
    });
    if (pos < text.length) frag.appendChild(document.createTextNode(text.slice(pos)));
    return frag;
  }
  function selfKeys(id) { var d = state.nodes[id].data; return [norm(d.label), norm(d.en)].filter(Boolean); }
  function termById(tid) { for (var i = 0; i < state.terms.length; i++) if (state.terms[i].id === tid) return state.terms[i]; return null; }

  var tipOwner = null;
  function showTip(btn) {
    var t = termById(btn.getAttribute('data-tip')), tip = $('tip');
    if (!t || !tip) return;
    if (tipOwner && tipOwner !== btn) tipOwner.setAttribute('aria-expanded', 'false');
    tipOwner = btn;
    tip.textContent = '';
    tip.appendChild(el('p', { class: 'tip-main' }, [el('strong', { text: t.term }), ': ' + t.summary]));
    tip.appendChild(el('p', { class: 'tip-vs' }, [el('strong', { text: 'vs ' + t.vs.term }), ': ' + t.vs.diff]));
    tip.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-describedby', 'tip');
    var r = btn.getBoundingClientRect(), vw = document.documentElement.clientWidth, vh = window.innerHeight;
    tip.style.maxWidth = Math.min(340, vw - 24) + 'px';
    var w = tip.offsetWidth, h = tip.offsetHeight;
    var x = Math.max(12, Math.min(vw - 12 - w, r.left + r.width / 2 - w / 2));
    var y = r.top - h - 8 >= 8 ? r.top - h - 8 : Math.min(vh - h - 8, r.bottom + 8);
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  }
  function hideTip() {
    if (tipOwner) { tipOwner.setAttribute('aria-expanded', 'false'); tipOwner.removeAttribute('aria-describedby'); }
    tipOwner = null;
    if ($('tip')) $('tip').hidden = true;
  }


  /* ---------------- 심볼 아이콘 ----------------
     24×24 선 아이콘(직접 작성). 'c x y r' = 원, 그 밖은 path d. 상표 로고는 쓰지 않는다. */
  var ICONS = {
    terminal: ['M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z', 'M7 10l3 2.5L7 15', 'M12.5 15H17'],
    engine: ['c 12 12 3', 'M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1', 'c 12 12 6.5'],
    server: ['M5 3h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z', 'M5 14h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1z', 'M8 6.5h.01M8 17.5h.01M12 6.5h4M12 17.5h4'],
    database: ['M4 6c0 1.7 3.6 3 8 3s8-1.3 8-3-3.6-3-8-3-8 1.3-8 3z', 'M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6', 'M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3'],
    cube: ['M12 2.5l8.5 4.75v9.5L12 21.5l-8.5-4.75v-9.5z', 'M3.5 7.25L12 12l8.5-4.75', 'M12 12v9.5'],
    pod: ['c 12 12 9.5', 'M12 6.5l5 2.75v5.5L12 17.5l-5-2.75v-5.5z', 'M7 9.25L12 12l5-2.75', 'M12 12v5.5'],
    package: ['M3 7.5l9-5 9 5v9l-9 5-9-5z', 'M3 7.5l9 5 9-5', 'M12 12.5v9', 'M7.5 5l9 5'],
    layers: ['M12 2.5l9.5 4.75L12 12 2.5 7.25z', 'M2.5 12L12 16.75 21.5 12', 'M2.5 16.75L12 21.5l9.5-4.75'],
    file: ['M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z', 'M14 2.5V8h5.5', 'M8 13h8M8 17h5'],
    manifest: ['M9 2.5h6v3H9z', 'M9 4H6.5a1.5 1.5 0 0 0-1.5 1.5v14A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-14A1.5 1.5 0 0 0 17.5 4H15', 'M8.5 10.5h7M8.5 14h7M8.5 17.5h4'],
    code: ['M8 6l-6 6 6 6', 'M16 6l6 6-6 6', 'M14 3.5l-4 17'],
    network: ['c 12 5 2.5', 'c 5 19 2.5', 'c 19 19 2.5', 'M10.9 7.3l-4.8 9.4M13.1 7.3l4.8 9.4M7.5 19h9'],
    globe: ['c 12 12 9', 'M3 12h18', 'M12 3c2.6 2.5 3.8 5.5 3.8 9s-1.2 6.5-3.8 9c-2.6-2.5-3.8-5.5-3.8-9S9.4 5.5 12 3z'],
    lock: ['M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z', 'M8 11V7.5a4 4 0 0 1 8 0V11', 'M12 15v2.5'],
    key: ['c 7.5 15.5 4.5', 'M10.7 12.3L20.5 2.5', 'M16.5 6.5l3 3M14 9l2 2'],
    shield: ['M12 2.5l8 3v6c0 5-3.4 9-8 10.5C7.4 20.5 4 16.5 4 11.5v-6z', 'M8.5 12l2.5 2.5 4.5-5'],
    user: ['c 12 8 4', 'M4 21c0-4.4 3.6-7.5 8-7.5s8 3.1 8 7.5'],
    cloud: ['M7 19h10.5a4.5 4.5 0 0 0 .6-9 6.5 6.5 0 0 0-12.6 1.6A3.8 3.8 0 0 0 7 19z'],
    chip: ['M7 6h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z', 'M9.5 9.5h5v5h-5z', 'M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5'],
    gpu: ['M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z', 'c 9 12 3.2', 'M15.5 10h3.5M15.5 14h3.5', 'M6 18v3M10 18v3'],
    disk: ['M3 13.5l3-8.5h12l3 8.5', 'M3 13.5h18v5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z', 'M7 17h.01M11 17h2'],
    folder: ['M3 6.5A1.5 1.5 0 0 1 4.5 5h5l2 2.5h8A1.5 1.5 0 0 1 21 9v9.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z'],
    tag: ['M3 3h8.5l9.5 9.5-8.5 8.5L3 11.5z', 'M7.5 7.5h.01'],
    branch: ['c 6 5 2.2', 'c 6 19 2.2', 'c 18 6 2.2', 'M6 7.2v9.6', 'M18 8.2v1.3a4.5 4.5 0 0 1-4.5 4.5H10a4 4 0 0 0-4 4'],
    commit: ['c 12 12 3.8', 'M2 12h6.2M15.8 12H22'],
    merge: ['c 6 5 2.2', 'c 6 19 2.2', 'c 18 15 2.2', 'M6 7.2v9.6', 'M6 7.2c0 4.5 4 7.8 9.8 7.8'],
    pr: ['c 6 5 2.2', 'c 6 19 2.2', 'c 18 19 2.2', 'M6 7.2v9.6', 'M18 16.8V9.5a3 3 0 0 0-3-3h-4', 'M13 4l-2.5 2.5L13 9'],
    play: ['c 12 12 9.5', 'M10 8.3l5.5 3.7-5.5 3.7z'],
    rocket: ['M12.5 15.5l-4-4c1.4-4.6 5.2-8 11-9-.9 5.8-4.4 9.6-7 13z', 'M8.5 11.5H5l2-4h4.5', 'M12.5 15.5V19l4-2v-4.5', 'M7 17c-1.6.4-2.6 1.7-3 4 2.3-.4 3.6-1.4 4-3'],
    sync: ['M20 11a8 8 0 0 0-14.7-4.4', 'M4.5 3v4h4', 'M4 13a8 8 0 0 0 14.7 4.4', 'M19.5 21v-4h-4'],
    undo: ['M9 14.5l-5-5 5-5', 'M4 9.5h10.5a5.5 5.5 0 0 1 0 11H10'],
    clock: ['c 12 12 9.5', 'M12 7v5l3.5 2'],
    bell: ['M6 16.5V11a6 6 0 0 1 12 0v5.5l2 2H4z', 'M10 20.5a2 2 0 0 0 4 0'],
    mute: ['M7 9.5A5 5 0 0 1 16 8', 'M18 12v4.5l2 2H8', 'M6 11v5.5l-2 2', 'M10 20.5a2 2 0 0 0 4 0', 'M3 3l18 18'],
    chart: ['M3.5 3v17.5H21', 'M7 15l4-5 3 3 6-7'],
    bars: ['M3 21h18', 'M6 17.5v-5M11 17.5v-11M16 17.5v-8M20.5 17.5v-3'],
    gauge: ['M4 18.5a9 9 0 1 1 16 0', 'c 12 14 1.6', 'M13.2 12.8L17 9'],
    eye: ['M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z', 'c 12 12 3'],
    search: ['c 10.5 10.5 6.5', 'M15.5 15.5L21 21'],
    filter: ['M3 4h18l-7 8.5V19l-4 2v-8.5z'],
    log: ['M5.5 3h13a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z', 'M8 8h8M8 12h8M8 16h5'],
    route: ['M3 12h6l4-6h7.5', 'M9 12l4 6h7.5', 'M17.5 3l3 3-3 3', 'M17.5 15l3 3-3 3'],
    link: ['M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1', 'M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1'],
    plug: ['M9 2.5v4.5M15 2.5v4.5', 'M6 7h12v3.5a6 6 0 0 1-12 0z', 'M12 16.5v5'],
    api: ['M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z', 'M8 10l-2 2 2 2M16 10l2 2-2 2M13 9l-2 6'],
    check: ['M8.5 11l3 3 8.5-8.5', 'M20 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'],
    bug: ['M8 9a4 4 0 0 1 8 0v6a4 4 0 0 1-8 0z', 'M12 9v10', 'M3.5 10H8M16 10h4.5M3.5 16H8M16 16h4.5', 'M9.5 5.5L7.5 3M14.5 5.5l2-2.5'],
    balance: ['c 12 4.5 2.3', 'c 5 19 2.3', 'c 12 19 2.3', 'c 19 19 2.3', 'M12 6.8v9.9M11 6.6L6 16.8M13 6.6l5 10.2'],
    door: ['M4 21V3h11v18', 'M2.5 21h15', 'M15 12h6.5', 'M18.5 9l3 3-3 3', 'M11.5 12h.01'],
    copy: ['M10 8h10a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z', 'M16 8V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h5'],
    scale: ['M3.5 9V3.5H9M20.5 9V3.5H15M3.5 15v5.5H9M20.5 15v5.5H15', 'M9.5 9.5h5v5h-5z'],
    sliders: ['M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0', 'c 16 6 2', 'c 10 12 2', 'c 18 18 2'],
    trash: ['M4 7h16', 'M9 7V4h6v3', 'M6 7l1 13.5h10L18 7', 'M10 11v6M14 11v6'],
    send: ['M21.5 2.5L10.5 13.5', 'M21.5 2.5l-7 19-4-8-8-4z'],
    chat: ['M21 12a8.5 8.5 0 0 1-12.3 7.6L3 21l1.6-5.4A8.5 8.5 0 1 1 21 12z', 'M8 12h.01M12 12h.01M16 12h.01'],
    workflow: ['M3.5 3h7v6h-7z', 'M13.5 15h7v6h-7z', 'M7 9v4a2 2 0 0 0 2 2h4.5'],
    pipe: ['c 4 12 2.2', 'c 12 12 2.2', 'c 20 12 2.2', 'M6.2 12h3.6M14.2 12h3.6'],
    list: ['M9 6h12M9 12h12M9 18h12', 'M4 6h.01M4 12h.01M4 18h.01'],
    upload: ['M12 16V3.5', 'M7 8.5l5-5 5 5', 'M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4'],
    download: ['M12 3.5V16', 'M7 11l5 5 5-5', 'M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4'],
    build: ['M14.5 3l6.5 6.5-3 3L11.5 6z', 'M13 7.5L3.5 17v3.5H7l9.5-9.5'],
    target: ['c 12 12 9.5', 'c 12 12 5.5', 'c 12 12 1.5'],
    pulse: ['M2.5 12h4.5l3-7 4 14 3-7h4.5'],
    brace: ['M8 3H7a2 2 0 0 0-2 2v4.5A2.5 2.5 0 0 1 2.5 12 2.5 2.5 0 0 1 5 14.5V19a2 2 0 0 0 2 2h1', 'M16 3h1a2 2 0 0 1 2 2v4.5a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0-2.5 2.5V19a2 2 0 0 1-2 2h-1'],
    panel: ['M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z', 'M3 10h18M10 10v11'],
    hourglass: ['M6 3h12M6 21h12', 'M7 3v2.5a5 5 0 0 0 10 0V3', 'M7 21v-2.5a5 5 0 0 1 10 0V21'],
    group: ['M3.5 3.5h7v7h-7zM13.5 3.5h7v7h-7zM3.5 13.5h7v7h-7zM13.5 13.5h7v7h-7z'],
    scope: ['M3 7.5V3h4.5M16.5 3H21v4.5M21 16.5V21h-4.5M7.5 21H3v-4.5', 'M8.5 8.5h7v7h-7z'],
    flag: ['M5 21.5V3', 'M5 4h12l-2.5 4.5L17 13H5'],
    robot: ['M6 8h12a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z', 'M12 4.5V8', 'c 12 3.5 1.2', 'M9 13h.01M15 13h.01M9.5 16.5h5'],
    toggle: ['M7 7h10a5 5 0 0 1 0 10H7A5 5 0 0 1 7 7z', 'c 16.5 12 2.8'],
    star: ['M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z'],
    history: ['M3.5 12a8.5 8.5 0 1 0 2.5-6', 'M3 3.5V8h4.5', 'M12 7.5V12l3 2'],
    wave: ['M2 9c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2 5 0', 'M2 15c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2 5 0']
  };

  // 공식 아이콘·로고(logos.js). 정리된 SVG를 data: URI로 갖고 있으며 <image>/<img>로만 그린다.
  var LOGOS = (window.GUIDE_LOGOS && window.GUIDE_LOGOS.items) || {};
  function logoOf(name) {
    var L = Object.prototype.hasOwnProperty.call(LOGOS, name) ? LOGOS[name] : null;
    return L && typeof L.src === 'string' && L.src.indexOf('data:image/svg+xml,') === 0 ? L : null;
  }

  function iconOf(id) {
    var d = state.nodes[id] && state.nodes[id].data;
    var name = (d && d.icon) || (state.icons && state.icons[id]);
    return ICONS[name] || logoOf(name) ? name : (state.nodes[id] && state.nodes[id].childIds.length ? 'layers' : 'cube');
  }

  // 아이콘을 (cx, cy) 중심, 한 변 size 픽셀로 그린다.
  function drawIcon(parent, name, cx, cy, size, cls) {
    var L = logoOf(name);
    if (L) {
      // 공식 아이콘은 원본 비율 그대로(변형 없이) 밝은 판 위에 놓는다.
      var s = size * 1.28;
      var im = svg('image', { x: (cx - s / 2).toFixed(1), y: (cy - s / 2).toFixed(1), width: s.toFixed(1), height: s.toFixed(1), preserveAspectRatio: 'xMidYMid meet', class: 'logo' });
      im.setAttribute('href', L.src);
      im.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', L.src);
      parent.appendChild(im);
      return im;
    }
    var parts = ICONS[name] || ICONS.cube, k = size / 24;
    var g = svg('g', { class: cls || 'ico', transform: 'translate(' + (cx - size / 2).toFixed(1) + ' ' + (cy - size / 2).toFixed(1) + ') scale(' + k.toFixed(3) + ')' });
    parts.forEach(function (p) {
      if (p.charAt(0) === 'c') { var a = p.split(' '); g.appendChild(svg('circle', { cx: a[1], cy: a[2], r: a[3] })); }
      else g.appendChild(svg('path', { d: p }));
    });
    parent.appendChild(g);
    return g;
  }

  // 라벨용 작은 인라인 아이콘
  function iconEl(name) {
    var L = logoOf(name);
    if (L) return el('img', { src: L.src, alt: '', class: 'lbl-ico lbl-logo', 'aria-hidden': 'true', draggable: 'false' });
    var s = svg('svg', { viewBox: '0 0 24 24', class: 'lbl-ico', 'aria-hidden': 'true', focusable: 'false' });
    (ICONS[name] || ICONS.cube).forEach(function (p) {
      if (p.charAt(0) === 'c') { var a = p.split(' '); s.appendChild(svg('circle', { cx: a[1], cy: a[2], r: a[3] })); }
      else s.appendChild(svg('path', { d: p }));
    });
    return s;
  }


  function srcChips(ids) {
    var wrap = el('span', { class: 'src-chips' });
    (ids || []).forEach(function (id) {
      var s = state.sources[id];
      if (!s) return;
      wrap.appendChild(el('a', { class: 'src-chip', href: s.url, target: '_blank', rel: 'noopener noreferrer', title: s.title + ' (새 창)', text: s.title }));
    });
    return wrap;
  }

  // 예시 코드: marks[{v, n, key}]에 해당하는 조각을 번호와 함께 강조한다.
  function exBlock(id, marks, heading) {
    var ex = state.nodes[id].data.ex;
    if (!ex || !ex.code) return null;
    var code = ex.code, hits = [];
    (marks || []).forEach(function (m) {
      if (!m.v) return;
      var from = 0, i;
      while ((i = code.indexOf(m.v, from)) >= 0) {
        var e = i + m.v.length;
        if (!hits.some(function (h) { return i < h.e && e > h.s; })) { hits.push({ s: i, e: e, n: m.n, key: m.key }); break; }
        from = i + 1;
      }
    });
    hits.sort(function (x, y) { return x.s - y.s; });
    var pre = el('pre', { class: 'ex-code', tabindex: '0', 'aria-label': heading }), pos = 0;
    hits.forEach(function (h) {
      if (h.s > pos) pre.appendChild(document.createTextNode(code.slice(pos, h.s)));
      pre.appendChild(el('mark', { class: 'ex-mark', 'data-mk': h.key || '' }, [
        h.n ? el('span', { class: 'ex-n', text: pad2(h.n) }) : null,
        code.slice(h.s, h.e)
      ]));
      pos = h.e;
    });
    if (pos < code.length) pre.appendChild(document.createTextNode(code.slice(pos)));
    return el('figure', { class: 'cap-ex' }, [
      el('figcaption', { class: 'cap-ex-h' }, [
        el('span', { text: heading }),
        el('span', { class: 'cap-ex-r' }, [
          ex.lang ? el('span', { class: 'cap-ex-lang', text: ex.lang }) : null,
          copyBtn(code, heading)
        ])
      ]),
      pre
    ]);
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


  function termRow(t) {
    var nodeBtns = t.nodes.map(function (id) { return el('button', { type: 'button', class: 'term-chip', 'data-go': id, text: '◇ ' + state.nodes[id].data.label }); });
    return el('div', { class: 'term-row', 'data-q': norm(t.term + ' ' + t.summary + ' ' + t.vs.term + ' ' + t.vs.diff) }, [
      el('dt', { class: 't-main' }, [el('span', { class: 'lv lv-' + t.level, title: '레벨 ' + t.level, text: 'L' + t.level }), ' ', el('strong', { text: t.term }), ': ' + t.summary]),
      el('dd', { class: 't-vs' }, [el('strong', { text: 'vs ' + t.vs.term }), ': ' + t.vs.diff]),
      el('dd', { class: 't-meta' }, [el('span', null, ['출처: ', srcLinks(t.src)])].concat(nodeBtns))
    ]);
  }

  // L1 용어는 기본 표시, L2·L3는 "더 보기" 뒤에. 검색하면 전부에서 찾는다.
  function buildTerms() {
    var dl = $('term-list'), more = $('term-list-more'), nMore = 0, nOne = 0;
    dl.textContent = ''; more.textContent = '';
    state.terms.slice().sort(function (a, b) { return a.level - b.level || state.terms.indexOf(a) - state.terms.indexOf(b); }).forEach(function (t) {
      if (t.level === 1) { dl.appendChild(termRow(t)); nOne++; } else { more.appendChild(termRow(t)); nMore++; }
    });
    state.termsMoreCount = nMore;
    if (!nOne && nMore) state.termsMore = true;
    if (!state.terms.length) dl.appendChild(el('dt', { class: 'pane-note', text: '표시할 용어 데이터가 없습니다.' }));
    syncTermsMore();
  }

  function syncTermsMore() {
    var q = norm($('term-search').value), open = !!q || state.termsMore, btn = $('term-more');
    $('term-list-more').hidden = !open;
    btn.hidden = !!q || !state.termsMoreCount;
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.textContent = state.termsMore ? '접기 (L2·L3 ' + state.termsMoreCount + '개)' : '더 보기 (L2·L3 ' + state.termsMoreCount + '개)';
  }

  function filterTerms() {
    var q = norm($('term-search').value), shown = 0;
    each('#drawer .term-row', function (r) {
      var ok = !q || r.getAttribute('data-q').indexOf(q) >= 0;
      r.hidden = !ok;
      if (ok) shown++;
    });
    syncTermsMore();
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
    var credits = (window.GUIDE_LOGOS && window.GUIDE_LOGOS.credits) || {}, used = [];
    Object.keys(state.icons || {}).forEach(function (k) {
      var L = logoOf(state.icons[k]);
      if (L && credits[L.credit] && used.indexOf(L.credit) < 0) used.push(L.credit);
    });
    if (used.length) {
      box.appendChild(el('h3', { text: '아이콘 · 로고 출처' }));
      box.appendChild(el('ul', { class: 'source-list logo-credits' }, used.map(function (c) {
        var s = credits[c];
        return el('li', null, [
          isStr(s.url) && /^https:\/\//.test(s.url) ? el('a', { href: s.url, target: '_blank', rel: 'noopener noreferrer', text: s.title }) : el('span', { text: s.title }),
          isStr(s.use) ? el('span', { class: 'source-use', text: ' — ' + s.use }) : null
        ]);
      })));
      box.appendChild(el('p', { class: 'source-use', text: '각 로고는 해당 프로젝트·상표권자의 상표입니다. 이 가이드는 해당 프로젝트를 가리키기 위해서만 원본 그대로 사용하며, 후원·보증 관계를 뜻하지 않습니다. 공식 아이콘이 없거나 사용 허가가 필요한 항목(Docker, Grafana, Loki 등)은 직접 그린 일반 심볼로 표시합니다.' }));
    }
    if (refs.length) {
      box.appendChild(el('h3', { text: '내부 참고 자료 (학습 맥락)' }));
      box.appendChild(el('ul', { class: 'source-list' }, refs.map(function (r) { return el('li', { text: r }); })));
      if (isStr(data.internalNote)) box.appendChild(el('p', { class: 'source-use', text: data.internalNote }));
    }
    $('checked-note').textContent = '모든 설명은 위 공식 문서를 근거로 작성했습니다.' + (isStr(data.meta && data.meta.checked) ? ' 내용 기준일: ' + data.meta.checked + '.' : '');
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



  /* ---------------- 공통 보조 ---------------- */
  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
  function pathTo(id) { var p = []; while (id && state.nodes[id]) { p.unshift(id); id = state.nodes[id].parentId; } return p; }
  function nd(id) { return state.nodes[id] && state.nodes[id].data; }
  function enOf(id) { var d = nd(id); return (d.en || d.label).toUpperCase(); }
  // 영문 이름이 한글 이름과 같은 글자면(예: Image / IMAGE) 영문 줄을 따로 보이지 않는다
  function enDup(id) { var d = nd(id); return !d.en || d.en.toLowerCase() === String(d.label).toLowerCase(); }
  function enLv(id) { var lv = 'L' + Math.min(3, state.nodes[id].depth); return enDup(id) ? lv : enOf(id) + ' · ' + lv; }
  function keyOf(id) { var d = nd(id); return d.key || d.desc; }
  function kidsOf(id) { return id ? state.nodes[id].childIds : state.rootIds; }
  function siblingsOf(id) { var p = state.nodes[id].parentId; return p ? state.nodes[p].childIds : state.rootIds; }
  // 애니메이션은 항상 켜 둔다(끄는 버튼·설정 없음)
  function motionOff() { return false; }
  function later(fn, ms) { if (motionOff()) fn(); else setTimeout(fn, ms); }

  /* ---------------- 복사 버튼 ----------------
     예시 코드를 그대로(번호 표시 없이) 클립보드에 넣는다. 클립보드 API가 막힌 환경(file:// 등)은 textarea 방식으로 대신한다. */
  var COPY_ICO = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg>';
  var DONE_ICO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  function copyText(text, done) {
    function legacy() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.top = '-1000px'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      done(ok);
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { done(true); }, legacy);
    else legacy();
  }
  function copyBtn(text, what) {
    var label = (what ? what + ' ' : '') + '복사';
    var b = el('button', { type: 'button', class: 'copy-btn', 'aria-label': label, title: '복사' });
    b.innerHTML = COPY_ICO + '<span class="copy-t">복사</span>';
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      copyText(text, function (ok) {
        b.classList.toggle('is-done', ok);
        b.innerHTML = (ok ? DONE_ICO : COPY_ICO) + '<span class="copy-t">' + (ok ? '복사됨' : '실패') + '</span>';
        b.setAttribute('aria-label', ok ? '복사했습니다' : '복사하지 못했습니다');
        clearTimeout(b._t);
        b._t = setTimeout(function () { b.classList.remove('is-done'); b.innerHTML = COPY_ICO + '<span class="copy-t">복사</span>'; b.setAttribute('aria-label', label); }, 1600);
      });
    });
    return b;
  }

  /* ---------------- 등각 도구 ----------------
     2:1 등각 투영. (sx, sy) = 바닥 중심의 화면 좌표, (x, y, z) = 그 점에서의 등각 좌표. */
  function isoP(sx, sy, x, y, z) { return [sx + x - y, sy + (x + y) / 2 - (z || 0)]; }
  function ptsStr(list) { return list.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '); }
  function polyEl(parent, list, cls) { var p = svg('polygon', { points: ptsStr(list), class: cls }); parent.appendChild(p); return p; }
  function topMatrix(sx, sy, z) { return 'matrix(1 .5 -1 .5 ' + sx.toFixed(1) + ' ' + (sy - (z || 0)).toFixed(1) + ')'; }

  // 장면을 그리는 도구 모음. scene.js(GUIDE_SCENE.draw)와 엔진의 일반 장면이 같은 도구를 쓴다.
  function makeKit(layer) {
    var K = { parts: {}, subs: {}, labels: [], nb: {}, layer: layer, P: isoP, obst: [] };
    K.has = function (id) { return !!state.nodes[id]; };
    K.g = function (parent, cls) { var g = svg('g', { class: cls || '' }); (parent || layer).appendChild(g); return g; };
    // 누를 수 있는 부분(노드 하나). 데이터에 없는 노드면 화면에 붙이지 않은 빈 그룹을 돌려준다.
    K.part = function (id, cls) {
      var g = svg('g', { class: 'part' + (cls ? ' ' + cls : ''), 'data-id': id });
      if (!state.nodes[id]) { warn('장면(scene.js): 노드 "' + id + '"가 데이터에 없어 그리지 않았습니다.'); return g; }
      layer.appendChild(g);
      K.parts[id] = g;
      return g;
    };
    // 부분 안의 더 깊은 노드(흐름 단계에서 이 조각만 빛나게 할 때 사용)
    K.sub = function (parent, id) {
      var g = svg('g', { class: 'sub', 'data-sub': id });
      parent.appendChild(g);
      if (state.nodes[id]) K.subs[id] = g;
      return g;
    };
    K.box = function (parent, sx, sy, w, d, h, cls, z0) {
      z0 = z0 || 0;
      var a = w / 2, b = d / 2, z1 = z0 + h;
      var g = svg('g', { class: 'bx' + (cls ? ' ' + cls : '') });
      var A = isoP(sx, sy, -a, -b, z1), B = isoP(sx, sy, a, -b, z1), C = isoP(sx, sy, a, b, z1), D = isoP(sx, sy, -a, b, z1);
      if (h > 0) {
        polyEl(g, [D, C, isoP(sx, sy, a, b, z0), isoP(sx, sy, -a, b, z0)], 'fa');
        polyEl(g, [C, B, isoP(sx, sy, a, -b, z0), isoP(sx, sy, a, b, z0)], 'fb');
      }
      polyEl(g, [A, B, C, D], 'ft');
      parent.appendChild(g);
      return { g: g, top: [sx, sy - z1], z: z1, left: D, right: B, back: A, front: C };
    };
    K.cyl = function (parent, sx, sy, r, h, cls, z0) {
      z0 = z0 || 0;
      var y0 = sy - z0, y1 = y0 - h, ry = r / 2;
      var g = svg('g', { class: 'bx cy' + (cls ? ' ' + cls : '') });
      g.appendChild(svg('path', { class: 'fa', d: 'M' + (sx - r) + ' ' + y1 + 'L' + (sx - r) + ' ' + y0 + 'A' + r + ' ' + ry + ' 0 0 0 ' + (sx + r) + ' ' + y0 + 'L' + (sx + r) + ' ' + y1 + 'Z' }));
      g.appendChild(svg('ellipse', { class: 'ft', cx: sx, cy: y1, rx: r, ry: ry }));
      parent.appendChild(g);
      return { g: g, top: [sx, y1], z: z0 + h };
    };
    // 윗면에 눕힌 아이콘·글자
    K.topIcon = function (parent, name, sx, sy, z, size) {
      var g = svg('g', { class: 'top-ico', transform: topMatrix(sx, sy, z) });
      drawIcon(g, name, 0, 0, size, 'ico');
      parent.appendChild(g);
      // 윗면에 눕힌 아이콘의 화면 상자(라벨이 덮지 않게 피할 자리)
      K.obst.push([sx - size / 2, sy - (z || 0) - size / 4, size, size / 2]);
      return g;
    };
    K.topText = function (parent, text, sx, sy, z, size, cls) {
      var g = svg('g', { transform: topMatrix(sx, sy, z) });
      var t = svg('text', { class: 'top-tx' + (cls ? ' ' + cls : ''), x: 0, y: 0, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': size || 12 });
      t.textContent = text;
      g.appendChild(t);
      parent.appendChild(g);
      return g;
    };
    // 세워 둔 아이콘(떠 있는 물체용)
    K.icon = function (parent, name, cx, cy, size) { K.obst.push([cx - size / 2, cy - size / 2, size, size]); return drawIcon(parent, name, cx, cy, size, 'ico'); };
    K.text = function (parent, text, x, y, size, cls, anchor) {
      var t = svg('text', { class: 'sc-tx' + (cls ? ' ' + cls : ''), x: x, y: y, 'text-anchor': anchor || 'middle', 'dominant-baseline': 'central', 'font-size': size || 11 });
      t.textContent = text;
      parent.appendChild(t);
      return t;
    };
    K.el = function (parent, tag, attrs) { var n = svg(tag, attrs); (parent || layer).appendChild(n); return n; };
    K.dot = function (parent, x, y, r, cls) { return K.el(parent, 'circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: r, class: cls || 'dot-c' }); };
    K.iconOf = function (id) { return iconOf(id); };
    K.link = function (parent, points, cls) {
      var p = svg('polyline', { class: 'link' + (cls ? ' ' + cls : ''), points: ptsStr(points) });
      (parent || layer).appendChild(p);
      return p;
    };
    // 라벨: anchor(부분 위의 점)에서 at(라벨 자리)까지 지시선. side 'l' | 'r'
    K.label = function (id, anchor, at, side) {
      if (!state.nodes[id]) return;
      K.labels.push({ id: id, anchor: anchor, at: at, side: side || (at[0] < anchor[0] ? 'l' : 'r') });
    };
    return K;
  }

  /* ---------------- 장면: 일반(안으로 들어간 화면) ----------------
     부모 판 위에 하위 요소를 블록으로 놓고, 가장자리에 같은 단계의 이웃(형제)을 작은 판으로 둔다. */
  function drawGeneric(K, vid) {
    var items = kidsOf(vid), n = items.length;
    var cols = n <= 3 ? Math.max(1, n) : n === 4 ? 2 : 3, rows = Math.ceil(n / cols);
    var cell = 128, blk = 80, pad = 30, slabH = 22;
    var W = cols * cell + pad * 2, D = rows * cell + pad * 2;
    var CX = 500, CY = 352 - Math.max(0, (rows - 2)) * 20;

    var slabG = vid ? K.part(vid, 'slab') : K.g(null, 'slab-deco');
    var slab = K.box(slabG, CX, CY, W, D, slabH, 'slab-bx');
    var tp = isoP(CX, CY, 0, D / 2 - 15, 0);
    if (vid) {
      K.topText(slabG, enOf(vid), tp[0], tp[1], slabH, 13, 'slab-tx');
    }
    else K.topText(slabG, (state.guide ? state.guide.en : ''), tp[0], tp[1], slabH, 13, 'slab-tx');
    var cells = items.map(function (id, i) {
      var r = Math.floor(i / cols), c = i % cols;
      var inRow = Math.min(cols, n - r * cols);
      var x = -W / 2 + pad + cell / 2 + c * cell + (cols - inRow) * cell / 2;
      var y = -D / 2 + pad + cell / 2 + r * cell;
      return { id: id, x: x, y: y };
    }).sort(function (a, b) { return (a.x + a.y) - (b.x + b.y); });
    cells.forEach(function (c) {
      var base = isoP(CX, CY, c.x, c.y, slabH), deep = false; // 장면은 두 단계까지만: 안쪽 블록은 들어가지 않고 설명창으로 연다
      var g = K.part(c.id, 'blk');
      var b;
      if (deep) {
        K.box(g, base[0], base[1], blk + 14, blk + 14, 8, 'blk-base');
        b = K.box(g, base[0], base[1] - 8, blk, blk, 40, 'blk-bx');
      } else b = K.box(g, base[0], base[1], blk, blk, 28, 'blk-bx');
      K.topIcon(g, iconOf(c.id), b.top[0], b.top[1], 0, blk * 0.56);
      var side = base[0] < CX - 4 ? 'l' : base[0] > CX + 4 ? 'r' : (c.y > 0 ? 'l' : 'r');
      var lx = side === 'l' ? Math.min(base[0] - 70, CX - W / 2 - D / 2 + 60) : Math.max(base[0] + 70, CX + W / 2 + D / 2 - 60);
      K.label(c.id, [b.top[0], b.top[1]], [lx, b.top[1] - 26], side);
    });
    // 지금 들어와 있는 영역(판) 자신의 라벨(하위 다음 번호): 점은 판 윗면 오른쪽 모서리 안쪽에 찍는다
    if (vid) {
      var sa = isoP(CX, CY, W / 2 - 18, -D / 2 + 18, slabH);
      K.label(vid, sa, [sa[0] + 70, sa[1] - 34], 'r');
    }
    return { viewBox: [1000, 640] };
  }

  /* ---------------- 장면 그리기 ---------------- */
  function boardDefs(board) {
    var d = svg('defs', {});
    var f = svg('filter', { id: 'glow', x: '-50%', y: '-50%', width: '200%', height: '200%' });
    f.appendChild(svg('feGaussianBlur', { stdDeviation: '5', result: 'b' }));
    var m = svg('feMerge', {});
    m.appendChild(svg('feMergeNode', { in: 'b' }));
    m.appendChild(svg('feMergeNode', { in: 'SourceGraphic' }));
    f.appendChild(m);
    d.appendChild(f);
    board.appendChild(d);
  }

  function renderView() {
    var board = $('board');
    board.textContent = '';
    boardDefs(board);
    var layer = svg('g', { class: 'scene' });
    board.appendChild(layer);
    var K = makeKit(layer), res = null;
    var custom = !state.viewId && window.GUIDE_SCENE && typeof window.GUIDE_SCENE.draw === 'function';
    if (custom) {
      res = safe('장면(scene.js)', function () { return window.GUIDE_SCENE.draw(K); });
      if (!res || !Object.keys(K.parts).length) {
        layer.textContent = ''; K = makeKit(layer); custom = false;
      }
    }
    if (!custom) res = drawGeneric(K, state.viewId);
    state.vb = res && res.viewBox ? res.viewBox : [1000, 640];
    board.setAttribute('viewBox', '0 0 ' + state.vb[0] + ' ' + state.vb[1]);
    // 흐름 경로(빛나는 선 + 점)는 가장 위에
    var trail = svg('g', { class: 'tour-trail' });
    trail.appendChild(svg('path', { class: 'journey__path', d: '' }));
    trail.appendChild(svg('circle', { class: 'journey__dot', r: 5, cx: -20, cy: -20 }));
    board.appendChild(trail);
    state.kit = K;
    // 라벨이 빠진 부분은 자동으로 붙인다
    Object.keys(K.parts).forEach(function (id) {
      if (K.labels.some(function (l) { return l.id === id; })) return;
      var bb = K.parts[id].getBBox();
      K.labels.push({ id: id, anchor: [bb.x + bb.width / 2, bb.y + bb.height / 2], at: [bb.x + bb.width + 30, bb.y - 10], side: 'r' });
    });
    $('stage').classList.toggle('is-root', !state.viewId);
    buildLabels();
    sizeBoard();
    updateTop();
    updateCap();
    applyFlow(false);
    applyPractice();
  }

  // 장면 폭: 넓은 화면은 높이·폭 둘 다에 맞추고, 좁은 화면은 폭에 맞춘다.
  function sizeBoard() {
    var stage = $('stage'), wrap = $('board-wrap');
    var r = stage.getBoundingClientRect();
    var availW = Math.max(240, r.width - 32), w = availW;
    if (window.innerWidth >= WIDE) {
      // 장면 칸 높이에서 위 여백과 다른 요소(설명 등)의 실제 높이를 빼고 남는 만큼만 쓴다
      var cs = window.getComputedStyle(stage), used = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) + 16;
      Array.prototype.forEach.call(stage.children, function (c) {
        if (c === wrap || c.hidden) return;
        var p = window.getComputedStyle(c).position;
        if (p === 'absolute' || p === 'fixed') return;
        used += c.offsetHeight + (parseFloat(window.getComputedStyle(c).marginTop) || 0);
      });
      var availH = Math.max(200, r.height - used);
      w = Math.min(availW, availH * state.vb[0] / state.vb[1]);
    }
    wrap.style.width = Math.floor(w) + 'px';
    wrap.style.height = Math.floor(w * state.vb[1] / state.vb[0]) + 'px';
    layoutLabels();
  }

  /* ---------------- 라벨(HTML) ----------------
     글자 크기를 화면 폭과 상관없이 유지하려고 장면 위에 HTML 버튼으로 얹고, 지시선은 겹친 SVG에 px로 그린다. */
  function buildLabels() {
    var box = $('labels'), legend = $('legend');
    box.textContent = ''; legend.textContent = '';
    var lead = svg('svg', { class: 'leaders', 'aria-hidden': 'true', focusable: 'false' });
    box.appendChild(lead);
    state.labels = state.kit.labels.map(function (L, i) {
      var d = nd(L.id), nb = !!state.kit.nb[L.id], deep = state.nodes[L.id].childIds.length > 0;
      var tipText = nb ? '이웃: ' + d.label + (deep ? ' (눌러서 이동)' : '') : d.label;
      var btn = el('button', {
        type: 'button', class: 'lbl lbl-' + L.side + (nb ? ' lbl-nb' : ''), 'data-id': L.id,
        'aria-label': (i + 1) + '. ' + tipText + (!enDup(L.id) ? ' (' + d.en + ')' : '') + ' — ' + actionText(L.id)
      }, [
        el('span', { class: 'lbl-n', 'aria-hidden': 'true', text: String(i + 1) }),
        el('span', { class: 'lbl-txt' }, [
          !enDup(L.id) ? el('span', { class: 'lbl-en', text: d.en.toUpperCase() }) : null,
          el('span', { class: 'lbl-ko', text: d.label })
        ])
      ]);
      box.appendChild(btn);
      var line = svg('polyline', { class: 'leader' + (nb ? ' leader-nb' : ''), 'data-id': L.id });
      var dot = svg('circle', { class: 'leader-dot', r: 2.5, 'data-id': L.id });
      lead.appendChild(line); lead.appendChild(dot);
      legend.appendChild(el('li', null, [el('button', { type: 'button', class: 'lg-btn' + (nb ? ' lbl-nb' : ''), 'data-id': L.id }, [
        el('span', { class: 'lbl-n', text: String(i + 1) }),
        el('span', { class: 'lbl-txt' }, [!enDup(L.id) ? el('span', { class: 'lbl-en', text: d.en.toUpperCase() }) : null, el('span', { class: 'lbl-ko', text: d.label })]),
        el('span', { class: 'lg-act', text: actionText(L.id) })
      ])]));
      return { L: L, btn: btn, line: line, dot: dot };
    });
  }

  // 장면은 두 단계(전체 → 영역)까지만. 들어갈 수 있는 것은 하위가 있는 최상위 영역뿐이다.
  function canEnter(id) { return !!(state.nodes[id] && state.nodes[id].parentId === null && state.nodes[id].childIds.length); }
  function actionText(id) {
    if (isDrillTarget(id) && canEnter(id)) return '들어가기';
    return '자세히 보기';
  }
  function isDrillTarget(id) {
    var K = state.kit;
    return !!(K && (K.nb[id] || (!state.viewId && state.rootIds.indexOf(id) >= 0)));
  }

  function layoutLabels() {
    var wrap = $('board-wrap'), box = $('labels');
    if (!state.labels.length) { $('legend').hidden = true; return; }
    var W = wrap.clientWidth, H = wrap.clientHeight, s = W / state.vb[0];
    var compact = W < COMPACT;
    box.classList.toggle('is-compact', compact);
    $('legend').hidden = !compact;
    var lead = box.querySelector('.leaders');
    lead.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    lead.setAttribute('width', W); lead.setAttribute('height', H);
    // 1) 원하는 자리 계산
    var items = state.labels.map(function (o) {
      var a = [o.L.anchor[0] * s, o.L.anchor[1] * s], t = [o.L.at[0] * s, o.L.at[1] * s];
      o.btn.style.left = '0px'; o.btn.style.top = '0px';
      return { o: o, a: a, x: t[0], y: t[1], h: compact ? 22 : o.btn.offsetHeight || 34, w: o.btn.offsetWidth || 90 };
    });
    if (compact) {
      // 번호만: 부분 위에 바로 놓는다
      // 번호끼리 겹치면 서로 밀어내고, 제자리에서 벗어난 번호는 짧은 선으로 잇는다
      var R = 13;
      items.forEach(function (it) { it.x = it.a[0]; it.y = it.a[1]; });
      for (var cp = 0; cp < 60; cp++) {
        var hit = false;
        for (var ci = 0; ci < items.length; ci++) for (var cj = ci + 1; cj < items.length; cj++) {
          var P = items[ci], Q = items[cj], dx = Q.x - P.x, dy = Q.y - P.y;
          var ox = R * 2 - Math.abs(dx), oy = R * 2 - Math.abs(dy);
          if (ox <= 0 || oy <= 0) continue;
          hit = true;
          // 덜 겹친 축으로 반씩 민다(같은 자리면 위아래로)
          if (ox < oy && Math.abs(dx) > 0.5) { var sx = dx > 0 ? 1 : -1; P.x -= sx * (ox / 2 + 0.5); Q.x += sx * (ox / 2 + 0.5); }
          else { var sy = dy >= 0 ? 1 : -1; P.y -= sy * (oy / 2 + 0.5); Q.y += sy * (oy / 2 + 0.5); }
        }
        items.forEach(function (it) { it.x = Math.max(R, Math.min(W - R, it.x)); it.y = Math.max(R, Math.min(H - R, it.y)); });
        if (!hit) break;
      }
      items.forEach(function (it) {
        it.o.btn.style.left = it.x + 'px'; it.o.btn.style.top = it.y + 'px';
        it.o.btn.tabIndex = -1; it.o.btn.setAttribute('aria-hidden', 'true');
        var off = Math.abs(it.x - it.a[0]) + Math.abs(it.y - it.a[1]) > 3;
        it.o.line.setAttribute('points', off ? ptsStr([it.a, [it.x, it.y]]) : '');
        it.o.dot.setAttribute('cx', it.a[0].toFixed(1)); it.o.dot.setAttribute('cy', it.a[1].toFixed(1));
        it.o.dot.setAttribute('r', off ? 2 : 0);
      });
      return;
    }
    // 2) 가로 경계: 화면(흐름 패널 앞)과 래퍼 밖 12px 안쪽에 들어오게 x를 당긴다.
    //    래퍼는 전환 중 확대·축소될 수 있으므로 변형을 무시하는 offset 값으로 계산한다.
    var wl = pageLeft(wrap), wide = window.innerWidth >= WIDE;
    var tp = $('tours').getBoundingClientRect();
    var lo = Math.max(-12, 16 - wl), hi = Math.min(W + 12, (wide ? tp.left : window.innerWidth) - 16 - wl);
    function boxOf(it) {
      var sd = it.o.L.side, x0 = sd === 'l' ? it.x - it.w : sd === 'c' ? it.x - it.w / 2 : it.x;
      return { x0: x0, y0: it.y - it.h / 2, x1: x0 + it.w, y1: it.y + it.h / 2 };
    }
    function clampX(it) {
      var b = boxOf(it);
      if (b.x0 < lo) it.x += lo - b.x0;
      else if (b.x1 > hi) it.x -= Math.max(0, Math.min(b.x1 - hi, b.x0 - lo));
    }
    function clampY(it) { it.y = Math.max(it.h / 2 + 2, Math.min(H - it.h / 2 - 2, it.y)); }
    items.forEach(function (it) { clampX(it); clampY(it); });
    // 3) 겹침 풀기: 겹친 두 라벨을 세로로 벌린다(가로로 덜 겹친 쪽이면 가로로). 끝까지 안 풀리면 다시 반복.
    //    블록 아이콘은 움직이지 않는 장애물: 라벨이 아이콘을 덮으면 라벨만 비켜 간다.
    // 아이콘 장애물은 실제로 그려진 모양의 화면 상자로 잰다(전환 중 확대·축소는 비율로 되돌린다)
    var gap = 6, obst = [], bsv = $('board'), br = bsv.getBoundingClientRect(), bk = br.width ? W / br.width : 1;
    Array.prototype.forEach.call(bsv.querySelectorAll('.part:not(.slab) .top-ico, .part:not(.slab) .ico'), function (n) {
      var r = n.getBoundingClientRect(); if (!r.width) return;
      obst.push({ x0: (r.left - br.left) * bk - 3, y0: (r.top - br.top) * bk - 3, x1: (r.right - br.left) * bk + 3, y1: (r.bottom - br.top) * bk + 3 });
    });
    function dodge(it) {
      var hit = false;
      obst.forEach(function (o) {
        var b = boxOf(it), ox = Math.min(b.x1, o.x1) - Math.max(b.x0, o.x0) + 2, oy = Math.min(b.y1, o.y1) - Math.max(b.y0, o.y0) + 2;
        if (ox <= 0 || oy <= 0) return;
        hit = true;
        var cy = (b.y0 + b.y1) / 2, oc = (o.y0 + o.y1) / 2, cx = (b.x0 + b.x1) / 2, ocx = (o.x0 + o.x1) / 2;
        if (ox < oy) it.x += cx < ocx ? -ox : ox; else it.y += cy < oc ? -oy : oy;
        clampX(it); clampY(it);
      });
      return hit;
    }
    for (var pass = 0; pass < 80; pass++) {
      var moved = false;
      for (var i = 0; i < items.length; i++) {
        for (var j = i + 1; j < items.length; j++) {
          var A = items[i], B = items[j], a = boxOf(A), b = boxOf(B);
          var ox = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0) + gap, oy = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0) + gap;
          if (ox <= 0 || oy <= 0) continue;
          moved = true;
          var up = A.y < B.y || (A.y === B.y && i < j) ? A : B, dn = up === A ? B : A;
          if (ox < oy * 0.6) {
            var lf = (a.x0 + a.x1) < (b.x0 + b.x1) ? A : B, rt = lf === A ? B : A;
            lf.x -= ox / 2; rt.x += ox / 2; clampX(lf); clampX(rt);
          } else {
            up.y -= oy / 2; dn.y += oy / 2;
            // 위·아래 끝에 걸리면 반대쪽이 마저 움직인다
            var uy = up.y, dy = dn.y; clampY(up); clampY(dn);
            if (up.y !== uy) dn.y += up.y - uy;
            if (dn.y !== dy) up.y -= dy - dn.y;
            clampY(up); clampY(dn);
          }
        }
      }
      items.forEach(function (it) { if (dodge(it)) moved = true; });
      if (!moved) break;
    }
    // 3-2) 그래도 남은 겹침: 앞에서부터 하나씩 확정하며, 겹치는 라벨은 가장 가까운 빈자리로 옮긴다
    function over(b, o, m) { return b.x0 < o.x1 + m && o.x0 < b.x1 + m && b.y0 < o.y1 + m && o.y0 < b.y1 + m; }
    var placed = [];
    function free(it) {
      var b = boxOf(it);
      if (b.x0 < lo - 0.5 || b.x1 > hi + 0.5 || b.y0 < 1 || b.y1 > H - 1) return false;
      for (var k = 0; k < obst.length; k++) if (over(b, obst[k], 0)) return false;
      for (k = 0; k < placed.length; k++) if (over(b, boxOf(placed[k]), gap - 1)) return false;
      return true;
    }
    items.slice().sort(function (p, q) { return p.y - q.y; }).forEach(function (it) {
      if (!free(it)) {
        var x0 = it.x, y0 = it.y, best = null, bd = 1e9;
        for (var dy = 0; dy <= H; dy += 6) {
          if (dy * 0.7 > bd) break;
          [dy, -dy].forEach(function (yy) {
            [0, -0.5, 0.5, -1, 1, -1.5, 1.5].forEach(function (fx) {
              it.x = x0 + fx * it.w; it.y = y0 + yy;
              var d = Math.abs(yy) + Math.abs(fx * it.w) * 0.7;
              if (d < bd && free(it)) { bd = d; best = [it.x, it.y]; }
            });
          });
        }
        if (best) { it.x = best[0]; it.y = best[1]; } else { it.x = x0; it.y = y0; }
      }
      placed.push(it);
    });
    // 4) 배치 + 지시선: 기준점에서 라벨 상자의 가장 가까운 가장자리까지 잇는다
    items.forEach(function (it) {
      var o = it.o, b = boxOf(it);
      o.btn.tabIndex = 0; o.btn.removeAttribute('aria-hidden');
      o.btn.style.left = it.x + 'px'; o.btn.style.top = it.y + 'px';
      var ax = it.a[0], ay = it.a[1], pts;
      var inX = ax >= b.x0 && ax <= b.x1, inY = ay >= b.y0 && ay <= b.y1;
      if (inX && inY) pts = [it.a, it.a];
      else if (inX) pts = [it.a, [ax, ay < b.y0 ? b.y0 : b.y1]];
      else {
        var ex = ax < b.x0 ? b.x0 : b.x1, ey = Math.max(b.y0 + 8, Math.min(b.y1 - 8, it.y));
        var mx = ex + (ax < b.x0 ? -10 : 10);
        pts = Math.abs(ax - ex) > 14 ? [it.a, [mx, ey], [ex, ey]] : [it.a, [ex, ey]];
      }
      o.line.setAttribute('points', ptsStr(pts));
      o.dot.setAttribute('cx', ax.toFixed(1)); o.dot.setAttribute('cy', ay.toFixed(1)); o.dot.setAttribute('r', 2.5);
    });
  }
  function pageLeft(n) { var x = 0; while (n) { x += n.offsetLeft; n = n.offsetParent; } return x - (window.pageXOffset || 0); }

  /* ---------------- 강조·선택 ---------------- */
  function partEls(id) {
    var K = state.kit, out = [];
    if (!K) return out;
    if (K.parts[id]) out.push(K.parts[id]);
    if (K.subs[id]) out.push(K.subs[id]);
    return out;
  }
  function setHot(id) {
    if (state.hotId === id) return;
    state.hotId = id;
    each('#board .is-hover', function (n) { n.classList.remove('is-hover'); });
    each('#labels .is-hover, #legend .is-hover', function (n) { n.classList.remove('is-hover'); });
    if (id) {
      partEls(id).forEach(function (n) { n.classList.add('is-hover'); });
      each('#labels [data-id="' + id + '"], #legend [data-id="' + id + '"]', function (n) { n.classList.add('is-hover'); });
    }
    updateHint();
  }
  function updateHint() {
    var h = $('hint'), id = state.hotId;
    // 지금 들어가 있는 영역은 위 설명(view-cap)에 이미 나와 있으니 힌트에서 되풀이하지 않는다
    if (id && state.nodes[id] && id !== state.viewId) {
      h.textContent = '';
      h.appendChild(el('b', { text: nd(id).label }));
      h.appendChild(document.createTextNode(' — ' + keyOf(id)));
      h.classList.add('is-key');
      return;
    }
    h.classList.remove('is-key');
    h.textContent = state.flow >= 0 ? '오른쪽 패널에서 단계를 넘기며 따라가 보세요'
      : !state.viewId && window.GUIDE_SCENE ? '영역을 누르면 들어갑니다 · 포인터를 올리면 핵심 한 줄'
        : '구성 요소를 눌러 자세히 보기';
  }

  function activate(id, opener) {
    if (!state.nodes[id]) return;
    if (isDrillTarget(id) && canEnter(id)) { setView(id); return; }
    openModal(id, 0, opener);
  }

  /* ---------------- 이동(들어가기·나오기) ----------------
     들어갈 때: 누른 부분을 중심으로 확대되며 사라지고, 새 판이 작게서 커지며 나타난다.
     나올 때: 지금 판이 작아지며 사라지고, 위 판이 방금 나온 부분을 중심으로 크게서 제자리로 돌아온다.
     옆(형제)으로 갈 때: 옆으로 밀려나고 반대쪽에서 들어온다. 움직임 줄이기면 바로 바뀐다. */
  var EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
  function anim(node, frames, ms, delay) {
    if (motionOff() || !node || !node.animate) return null;
    try { return node.animate(frames, { duration: ms, delay: delay || 0, easing: EASE, fill: 'both' }); } catch (e) { return null; }
  }
  function endAnim(a) { if (a) try { a.cancel(); } catch (e) { /* 무시 */ } }
  // 부분(노드)의 화면 중심을 board-wrap 기준 px로
  function partOrigin(id) {
    var K = state.kit, g = K && K.parts[id], wrap = $('board-wrap');
    if (!g) return '50% 50%';
    var r = g.getBoundingClientRect(), w = wrap.getBoundingClientRect();
    if (!r.width) return '50% 50%';
    return Math.round(r.left + r.width / 2 - w.left) + 'px ' + Math.round(r.top + r.height / 2 - w.top) + 'px';
  }
  // 새 화면의 부분·라벨이 차례로 떠오르게
  function popParts() {
    if (motionOff()) return;
    var K = state.kit, i = 0;
    Object.keys(K.parts).forEach(function (id) {
      var a = anim(K.parts[id], [{ opacity: 0, transform: 'translateY(-14px)' }, { opacity: 1, transform: 'none' }], 520, 80 + i * 55);
      if (a) a.onfinish = function () { endAnim(a); };
      i++;
    });
    each('#labels .lbl', function (b, k) {
      var a = anim(b, [{ opacity: 0 }, { opacity: 1 }], 360, 260 + k * 45);
      if (a) a.onfinish = function () { endAnim(a); };
    });
  }
  function setView(id, focusId) {
    if (id && !state.nodes[id]) id = null;
    if (id && !canEnter(id)) { var root = pathTo(id)[0]; id = canEnter(root) ? root : null; }
    if (id === state.viewId) { updateTop(); return; }
    var stage = $('stage'), wrap = $('board-wrap'), prev = state.viewId;
    var pNew = id ? pathTo(id) : [], pOld = prev ? pathTo(prev) : [];
    var dir = (prev === null || pNew.indexOf(prev) >= 0) && pNew.length > pOld.length ? 'in'
      : (id === null || pOld.indexOf(id) >= 0) ? 'out' : 'side';
    // 들어갈 때 기준이 되는 부분: 새 경로에서 지금 화면 바로 아래 단계
    var inPart = dir === 'in' ? pNew[pOld.length] : null;
    // 나올 때 새 화면에서 기준이 되는 부분: 옛 경로에서 새 화면 바로 아래 단계
    var outPart = dir === 'out' ? pOld[pNew.length] : null;
    stage.classList.add('is-diving');
    hideTip();
    var exitFrames;
    if (dir === 'in') {
      wrap.style.transformOrigin = partOrigin(inPart);
      exitFrames = [{ opacity: 1, transform: 'scale(1)', filter: 'blur(0)' }, { opacity: 0, transform: 'scale(1.9)', filter: 'blur(6px)' }];
    } else if (dir === 'out') {
      wrap.style.transformOrigin = '50% 50%';
      exitFrames = [{ opacity: 1, transform: 'scale(1)', filter: 'blur(0)' }, { opacity: 0, transform: 'scale(.55)', filter: 'blur(4px)' }];
    } else {
      wrap.style.transformOrigin = '50% 50%';
      exitFrames = [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateX(-60px)' }];
    }
    var ex = anim(wrap, exitFrames, 340);
    later(function () {
      state.viewId = id;
      state.hotId = null;
      renderView();
      updateOutline();
      saveHash();
      endAnim(ex);
      var enterFrames;
      if (dir === 'in') {
        wrap.style.transformOrigin = '50% 50%';
        enterFrames = [{ opacity: 0, transform: 'scale(.6)', filter: 'blur(4px)' }, { opacity: 1, transform: 'scale(1)', filter: 'blur(0)' }];
      } else if (dir === 'out') {
        wrap.style.transformOrigin = partOrigin(outPart);
        enterFrames = [{ opacity: 0, transform: 'scale(1.9)', filter: 'blur(6px)' }, { opacity: 1, transform: 'scale(1)', filter: 'blur(0)' }];
      } else {
        enterFrames = [{ opacity: 0, transform: 'translateX(60px)' }, { opacity: 1, transform: 'none' }];
      }
      var en = anim(wrap, enterFrames, 520);
      if (en) en.onfinish = function () { endAnim(en); wrap.style.transformOrigin = ''; };
      if (dir === 'in') popParts();
      stage.classList.remove('is-diving');
      if (outPart && state.kit.parts[outPart] && !motionOff()) {
        // 방금 나온 부분을 잠깐 빛내 위치를 알려 준다
        state.kit.parts[outPart].classList.add('is-came');
        setTimeout(function () { if (state.kit.parts[outPart]) state.kit.parts[outPart].classList.remove('is-came'); }, 1400);
      }
      var f = focusId || prev;
      var lb = f && document.querySelector('#labels .lbl[data-id="' + f + '"]:not([aria-hidden])');
      if (lb && document.activeElement && document.activeElement !== document.body) lb.focus();
      updateHint();
    }, 330);
  }
  function up() { if (state.viewId) setView(state.nodes[state.viewId].parentId, state.viewId); }

  // 지금 보는 위치를 주소 뒤(#)에 남겨 새로고침해도 유지. file:// 등에서 막히면 무시한다.
  function saveHash() {
    try {
      var h = state.viewId ? '#' + state.viewId : '';
      if (window.history && history.replaceState) history.replaceState(null, '', location.pathname + location.search + h);
    } catch (e) { /* 무시 */ }
  }

  /* ---------------- 위쪽 머리말 ---------------- */
  function updateTop() {
    var back = $('back'), crumb = $('crumb'), vid = state.viewId;
    if (vid) {
      var pid = state.nodes[vid].parentId;
      $('stage-up').hidden = false;
      $('stage-up-to').textContent = pid ? nd(pid).label : (state.guide ? state.guide.label : '처음 화면');
    } else {
      $('stage-up').hidden = true;
    }
    // 머리말의 뒤로 버튼은 언제나 전체 지도(다른 페이지)로. 장면 안에서 나가기는 장면 왼쪽 위 버튼 하나로 통일한다.
    back.setAttribute('href', HUB);
    back.removeAttribute('data-up');
    $('back-text').textContent = '전체 지도';
    crumb.textContent = '';
    var parts = [el('a', { href: HUB, class: 'cr-link', text: 'INFRA KNOWLEDGE BASE' })];
    var g = state.guide ? state.guide.en : (state.meta.title || 'GUIDE');
    parts.push(vid ? el('button', { type: 'button', class: 'cr-link', 'data-view': '', text: g }) : el('b', { 'aria-current': 'page', text: g }));
    if (vid) pathTo(vid).forEach(function (p, i, arr) {
      var t = enOf(p);
      parts.push(i === arr.length - 1 ? el('b', { 'aria-current': 'page', text: t }) : el('button', { type: 'button', class: 'cr-link', 'data-view': p, text: t }));
    });
    parts.forEach(function (p, i) { if (i) crumb.appendChild(el('i', { 'aria-hidden': 'true', text: '/' })); crumb.appendChild(p); });
    var title = (state.meta.title || '학습 가이드') + (vid ? ' — ' + nd(vid).label : '');
    $('page-title').textContent = title;
    document.title = title + ' · 인프라 학습 가이드';
  }

  // 안으로 들어간 화면의 왼쪽 아래 설명(이 판이 무엇인지 1줄)
  function updateCap() {
    var cap = $('view-cap'), vid = state.viewId;
    cap.textContent = '';
    if (!vid) { cap.hidden = true; return; }
    cap.hidden = false;
    var d = nd(vid);
    cap.appendChild(el('p', { class: 'vc-eyebrow', text: enLv(vid) }));
    cap.appendChild(el('h2', { class: 'vc-title', text: d.label }));
    cap.appendChild(el('p', { class: 'vc-key' }, [richText(keyOf(vid), {}, selfKeys(vid))]));
    cap.appendChild(el('button', { type: 'button', class: 'pill vc-more', 'data-modal': vid, text: '자세히 ›' }));
  }

  /* ---------------- 흐름 패널: 목록 ---------------- */
  var ARROW_R = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
  var ARROW_L = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  function svgHtml(html) { var s = el('span', { class: 'ico-wrap' }); s.innerHTML = html; return s; }

  function renderToursList() {
    var box = $('tours-list'), m = state.meta;
    box.textContent = '';
    box.appendChild(el('p', { class: 'tours__eyebrow', text: 'FLOWS · ' + String(m.eyebrow || (state.guide ? state.guide.label : '흐름')) }));
    box.appendChild(el('h2', { class: 'tours__title', text: m.title || '학습 가이드' }));
    var lead = isStr(m.keyPoint) ? m.keyPoint : isStr(m.subtitle) ? m.subtitle : '';
    if (lead) box.appendChild(el('p', { class: 'tours__lead' }, [richText(lead, {})]));
    if (Array.isArray(m.learn) && m.learn.length) {
      box.appendChild(el('p', { class: 'tours__label', text: '이 페이지에서 알 수 있는 것' }));
      box.appendChild(el('ul', { class: 'tours__learn' }, m.learn.filter(isStr).slice(0, 3).map(function (t) { return el('li', { text: t }); })));
    }
    if (!state.flows.length) { box.appendChild(el('p', { class: 'tours__lead', text: '표시할 흐름 데이터가 없습니다.' })); return; }
    // 묶음: 기본 흐름(at 없음) → at 노드별
    var groups = [{ title: '기본 흐름', list: [] }], byAt = {};
    state.flows.forEach(function (f, i) {
      if (!f.at) { groups[0].list.push(i); return; }
      if (!byAt[f.at]) { byAt[f.at] = { title: nd(f.at).label + ' 안에서', at: f.at, list: [] }; }
      byAt[f.at].list.push(i);
    });
    state.order.forEach(function (id) { if (byAt[id]) groups.push(byAt[id]); });
    if (!groups[0].list.length) groups.shift();
    var k = 0;
    groups.forEach(function (g) {
      box.appendChild(el('p', { class: 'tours__label', text: g.title }));
      g.list.forEach(function (fi) {
        var f = state.flows[fi];
        var route = el('span', { class: 'ti-route', 'aria-hidden': 'true' }, f.steps.slice(0, 10).map(function () { return el('i'); }));
        var b = el('button', { type: 'button', class: 'tour-item', 'data-flow': fi, style: '--i:' + (k++) }, [
          route,
          el('span', { class: 'ti-txt' }, [el('b', { text: f.title }), f.desc ? el('small', { text: f.desc }) : null]),
          el('span', { class: 'ti-meta' }, [f.steps.length + '단계', svgHtml(ARROW_R)])
        ]);
        box.appendChild(b);
      });
    });
  }

  /* ---------------- 흐름 패널: 진행 ---------------- */
  function openFlow(i, step) {
    var f = state.flows[i];
    if (!f) return;
    hideTourTip(true);
    state.flow = i; state.step = step || 0;
    $('tours').classList.add('is-view');
    document.body.classList.add('touring');
    buildFlowView();
    var target = f.at && state.nodes[f.at].childIds.length ? f.at : null;
    if (target !== state.viewId) setView(target);
    later(function () { goStep(state.step, true); }, motionOff() ? 0 : 300);
    var back = $('tours-view').querySelector('.tours__back');
    if (back) back.focus();
  }
  function closeFlow() {
    var i = state.flow;
    state.flow = -1;
    stopTyping();
    $('tours').classList.remove('is-view');
    document.body.classList.remove('touring');
    applyFlow(false);
    updateHint();
    var b = $('tours-list').querySelector('[data-flow="' + i + '"]');
    if (b) b.focus();
  }

  function buildFlowView() {
    var f = state.flows[state.flow], box = $('tours-view');
    box.textContent = '';
    var back = el('button', { type: 'button', class: 'tours__back' }, [svgHtml(ARROW_L), '흐름 목록']);
    back.addEventListener('click', closeFlow);
    box.appendChild(back);
    box.appendChild(el('p', { class: 'tours__eyebrow tv-where', id: 'tv-where', text: f.at ? enOf(f.at) : (state.guide ? state.guide.en : 'FLOW') }));
    box.appendChild(el('h2', { class: 'tours__title tv-title', text: f.title }));
    var line = el('div', { class: 'tv-line', role: 'group', 'aria-label': '단계로 바로 가기' });
    f.steps.forEach(function (s, i) {
      line.appendChild(el('button', { type: 'button', class: 'tv-node', 'data-step': i, 'aria-label': (i + 1) + '단계: ' + nd(s.node).label }, [el('span')]));
    });
    box.appendChild(line);
    box.appendChild(el('div', { class: 'tv-data', id: 'tv-data' }, [
      el('div', { class: 'tv-data__head' }, [el('span', { class: 'tv-data__label', id: 'tv-data-label' }), el('span', { class: 'tv-data__tag', id: 'tv-data-tag' })]),
      el('p', { class: 'tv-data__value', id: 'tv-data-value' }),
      el('p', { class: 'tv-data__sub', id: 'tv-data-sub' })
    ]));
    box.appendChild(el('div', { class: 'tv-step' }, [
      el('span', { class: 'tv-step__n', id: 'tv-n', 'aria-hidden': 'true' }),
      el('h3', { class: 'tv-step__title', id: 'tv-title' }),
      el('p', { class: 'tv-step__text', id: 'tv-text' })
    ]));
    box.appendChild(el('div', { class: 'tv-src', id: 'tv-src' }));
    var prev = el('button', { type: 'button', class: 'tv-btn tv-btn--prev', id: 'tv-prev', 'aria-label': '이전 단계' }, [svgHtml(ARROW_L)]);
    var next = el('button', { type: 'button', class: 'tv-btn tv-btn--next', id: 'tv-next' }, [el('span', { id: 'tv-next-t', text: '다음' }), svgHtml(ARROW_R)]);
    box.appendChild(el('div', { class: 'tv-nav' }, [prev, el('span', { class: 'tv-count', id: 'tv-count' }), next]));
    prev.addEventListener('click', function () { goStep(state.step - 1); });
    next.addEventListener('click', function () {
      if (state.step >= f.steps.length - 1) closeFlow(); else goStep(state.step + 1);
    });
  }

  function goStep(i, first) {
    var f = state.flows[state.flow];
    if (!f) return;
    i = Math.max(0, Math.min(f.steps.length - 1, i));
    var prevStep = state.step;
    state.step = i;
    var s = f.steps[i], d = nd(s.node), last = i === f.steps.length - 1;
    each('#tours-view .tv-node', function (b, k) {
      b.classList.toggle('is-done', k < i);
      b.classList.toggle('is-on', k === i);
      if (k === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
      var drawn = drawnFor(f.steps[k].node);
      b.classList.toggle('is-away', !drawn);
    });
    $('tours-view').querySelector('.tv-line').style.setProperty('--p', f.steps.length > 1 ? i / (f.steps.length - 1) : 0);
    // 위: 지금 다루는 대상
    var card = $('tv-data');
    card.classList.remove('is-in'); void card.offsetWidth; card.classList.add('is-in');
    $('tv-data-label').textContent = '지금 여기';
    $('tv-data-tag').textContent = 'L' + Math.min(3, state.nodes[s.node].depth) + ' · ' + pad2(i + 1);
    scramble($('tv-data-value'), d.en ? d.en.toUpperCase() : d.label);
    var sub = $('tv-data-sub');
    sub.textContent = '';
    sub.appendChild(el('b', { text: d.label }));
    if (d.role) sub.appendChild(document.createTextNode(' · ' + d.role));
    // 아래: 단계 설명
    $('tv-n').textContent = pad2(i + 1);
    $('tv-title').textContent = d.label;
    typeText($('tv-text'), s.text, selfKeys(s.node));
    var src = $('tv-src');
    src.textContent = '';
    if (s === f.steps[0] || last) { src.appendChild(document.createTextNode('출처: ')); src.appendChild(srcLinks(f.src)); }
    $('tv-count').innerHTML = '<b>' + pad2(i + 1) + '</b> / ' + pad2(f.steps.length);
    $('tv-prev').disabled = i === 0;
    $('tv-next-t').textContent = last ? '마치기' : '다음';
    $('tv-next').classList.toggle('is-away', last);
    applyFlow(!first && prevStep !== i ? prevStep : null);
    updateHint();
  }

  // 흐름 단계 노드가 지금 장면에서 그려진 곳: 자기 자신 → 가장 가까운 조상
  function drawnFor(id) {
    var K = state.kit;
    if (!K || !state.nodes[id]) return null;
    var p = pathTo(id);
    for (var i = p.length - 1; i >= 0; i--) {
      if (K.subs[p[i]]) return K.subs[p[i]];
      if (K.parts[p[i]]) return K.parts[p[i]];
    }
    return null;
  }
  function centerOf(n) {
    try { var b = n.getBBox(); return [b.x + b.width / 2, b.y + b.height * 0.42]; } catch (e) { return null; }
  }

  function applyFlow(fromStep) {
    var board = $('board');
    each('#board .is-on, #board .is-dim', function (n) { n.classList.remove('is-on'); n.classList.remove('is-dim'); });
    each('#labels .is-on, #legend .is-on', function (n) { n.classList.remove('is-on'); });
    var trail = board.querySelector('.tour-trail');
    var f = state.flows[state.flow];
    board.classList.toggle('touring', !!f);
    if (!f) { if (trail) { trail.querySelector('path').setAttribute('d', ''); trail.querySelector('circle').setAttribute('cx', -20); } return; }
    var s = f.steps[state.step], cur = drawnFor(s.node);
    var K = state.kit;
    Object.keys(K.parts).forEach(function (id) { K.parts[id].classList.add('is-dim'); });
    if (cur) {
      cur.classList.add('is-on');
      var part = cur.classList.contains('part') ? cur : cur.parentNode;
      while (part && part.classList && !part.classList.contains('part')) part = part.parentNode;
      if (part && part.classList) { part.classList.remove('is-dim'); var pid = part.getAttribute('data-id'); each('#labels [data-id="' + pid + '"], #legend [data-id="' + pid + '"]', function (n) { n.classList.add('is-on'); }); }
    }
    var to = cur && centerOf(cur);
    var prevEl = fromStep !== null && fromStep !== undefined && f.steps[fromStep] ? drawnFor(f.steps[fromStep].node) : null;
    var from = prevEl && prevEl !== cur ? centerOf(prevEl) : null;
    travel(trail, from, to);
  }

  // 이전 단계 → 지금 단계: 등각 축을 따라 꺾이는 길을 빛나는 점이 지나간다.
  var travelRaf = 0;
  function travel(trail, a, b) {
    if (!trail) return;
    var path = trail.querySelector('path'), dot = trail.querySelector('circle');
    if (travelRaf) cancelAnimationFrame(travelRaf);
    if (!b) { path.setAttribute('d', ''); dot.setAttribute('cx', -20); return; }
    if (!a) { path.setAttribute('d', ''); dot.setAttribute('cx', b[0]); dot.setAttribute('cy', b[1]); return; }
    var dx = b[0] - a[0], dy = b[1] - a[1], sAx = dy + dx / 2;
    var corner = [a[0] + sAx, a[1] + sAx / 2];
    var pts = [a, corner, b];
    var segs = [Math.hypot(corner[0] - a[0], corner[1] - a[1]), Math.hypot(b[0] - corner[0], b[1] - corner[1])], total = segs[0] + segs[1] || 1;
    function at(t) {
      var dist = t * total;
      if (dist <= segs[0]) { var k = segs[0] ? dist / segs[0] : 1; return [a[0] + (corner[0] - a[0]) * k, a[1] + (corner[1] - a[1]) * k]; }
      var k2 = segs[1] ? (dist - segs[0]) / segs[1] : 1;
      return [corner[0] + (b[0] - corner[0]) * k2, corner[1] + (b[1] - corner[1]) * k2];
    }
    // tail~head 구간만 그린다. 머리가 도착한 뒤 꼬리가 따라와 길이 지워진다.
    function draw(t0, t1) {
      var p0 = at(t0), p1 = at(t1), d = 'M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1);
      if (t0 * total < segs[0] && t1 * total > segs[0]) d += 'L' + corner[0].toFixed(1) + ' ' + corner[1].toFixed(1);
      d += 'L' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1);
      path.setAttribute('d', t1 > t0 ? d : '');
      dot.setAttribute('cx', p1[0].toFixed(1)); dot.setAttribute('cy', p1[1].toFixed(1));
    }
    if (motionOff()) { path.setAttribute('d', ''); dot.setAttribute('cx', b[0]); dot.setAttribute('cy', b[1]); return; }
    var start = 0, dur = 750, lag = 350;
    function ease(t) { t = Math.max(0, Math.min(1, t)); return 1 - Math.pow(1 - t, 3); }
    function frame(ts) {
      if (!start) start = ts;
      var el = ts - start;
      draw(ease((el - lag) / dur), ease(el / dur));
      if (el < dur + lag) travelRaf = requestAnimationFrame(frame); else { path.setAttribute('d', ''); travelRaf = 0; }
    }
    travelRaf = requestAnimationFrame(frame);
    return pts;
  }

  // 설명 타이핑(글자당 20ms, 긴 글은 한 번에 여러 글자). 끝나면 용어 툴팁이 붙은 글로 바꾼다.
  var typing = null;
  function stopTyping() { if (typing) { clearTimeout(typing.t); typing.done(); typing = null; } }
  function typeText(node, text, self) {
    stopTyping();
    node.textContent = '';
    function done() { node.textContent = ''; node.classList.remove('is-typing'); node.appendChild(richText(text, {}, self)); }
    if (motionOff()) { done(); return; }
    var i = 0, per = Math.max(1, Math.ceil(text.length / 90));
    node.classList.add('is-typing');
    typing = { done: done, t: 0 };
    (function tick() {
      i += per;
      node.textContent = text.slice(0, i);
      if (i >= text.length) { typing = null; done(); return; }
      typing.t = setTimeout(tick, TYPE_MS);
    })();
  }

  var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  function scramble(node, text) {
    if (node._t) clearInterval(node._t);
    if (motionOff()) { node.textContent = text; return; }
    var n = 0, steps = 12;
    node._t = setInterval(function () {
      n++;
      var keep = Math.floor(text.length * n / steps), out = text.slice(0, keep);
      for (var i = keep; i < text.length; i++) out += /\s/.test(text.charAt(i)) ? text.charAt(i) : CHARS.charAt(Math.floor(Math.random() * CHARS.length));
      node.textContent = out;
      if (n >= steps) { clearInterval(node._t); node._t = 0; node.textContent = text; }
    }, 32);
  }

  /* ---------------- 첫 방문 안내 ---------------- */
  function tipKey() { return 'kb-tour-tip.' + (state.meta.id || 'page'); }
  function showTourTip() { if (state.flows.length && store(tipKey()) !== 'done' && state.flow < 0) $('tour-tip').classList.add('is-on'); }
  function hideTourTip(save) { $('tour-tip').classList.remove('is-on'); if (save) store(tipKey(), 'done'); }

  /* ---------------- 설명창 ----------------
     왼쪽: 하위 요소를 분해한 그림(번호 지시선), 오른쪽: 개요 → 하위 요소 → 예시 슬라이드 */
  function slidesOf(id) {
    var out = [{ kind: 'overview' }];
    state.nodes[id].childIds.forEach(function (c, i) { out.push({ kind: 'child', id: c, n: i + 1 }); });
    if (nd(id).ex && nd(id).ex.code) out.push({ kind: 'example' });
    return out;
  }

  function openModal(id, slide, opener) {
    if (!state.nodes[id]) return;
    hideTip();
    var wasOpen = !!state.modal;
    clearTimeout(state.modalTimer);
    $('modal').classList.remove('is-closing'); $('modal-back').classList.remove('is-closing');
    state.modal = { id: id, slide: slide || 0, slides: slidesOf(id), opener: wasOpen ? state.modal.opener : (opener || document.activeElement) };
    var d = nd(id), m = $('modal');
    $('md-eyebrow').textContent = enLv(id);
    $('md-title').textContent = d.label;
    var chips = $('md-chips');
    chips.textContent = '';
    var kids = state.nodes[id].childIds;
    if (kids.length) kids.forEach(function (c, i) { chips.appendChild(el('button', { type: 'button', class: 'md-chip', 'data-slide': i + 1, text: nd(c).label })); });
    else relatedTerms(id).slice(0, 6).forEach(function (t) { chips.appendChild(el('button', { type: 'button', class: 'md-chip tt', 'data-tip': t.id, 'aria-expanded': 'false', text: t.term })); });
    chips.hidden = !chips.childNodes.length;
    var dots = $('md-dots');
    dots.textContent = '';
    state.modal.slides.forEach(function (s, i) {
      var name = s.kind === 'overview' ? '개요' : s.kind === 'example' ? '예시' : nd(s.id).label;
      dots.appendChild(el('button', { type: 'button', class: 'md-dot', 'data-slide': i, 'aria-label': (i + 1) + '. ' + name }));
    });
    // 아래 버튼: 들어가기(최상위 영역만) · 다음 주제
    var act = $('md-actions');
    act.textContent = '';
    if (canEnter(id) && id !== state.viewId) act.appendChild(el('button', { type: 'button', class: 'nav-btn md-go', 'data-view': id }, ['들어가기', svgHtml(ARROW_R)]));
    var sib = siblingsOf(id), k = sib.indexOf(id), nx = sib[k + 1];
    if (nx) act.appendChild(el('button', { type: 'button', class: 'tv-btn tv-btn--next md-nexttopic', 'data-modal': nx }, ['다음 주제 ' + (k + 2), svgHtml(ARROW_R)]));
    $('modal-back').hidden = false;
    m.hidden = false;
    document.body.classList.add('modal-open');
    drawExploded(id);
    showSlide(state.modal.slide);
    if (!wasOpen) $('md-close').focus();
  }

  function closeModal() {
    if (!state.modal) return;
    var op = state.modal.opener;
    state.modal = null;
    hideTip();
    document.body.classList.remove('modal-open');
    var hideIt = function () {
      if (state.modal) return;
      $('modal').hidden = true; $('modal-back').hidden = true;
      $('modal').classList.remove('is-closing'); $('modal-back').classList.remove('is-closing');
    };
    if (motionOff()) hideIt();
    else {
      $('modal').classList.add('is-closing'); $('modal-back').classList.add('is-closing');
      state.modalTimer = setTimeout(hideIt, 200);
    }
    if (op && op.focus && document.body.contains(op)) op.focus();
  }

  function showSlide(i) {
    var M = state.modal;
    if (!M) return;
    i = Math.max(0, Math.min(M.slides.length - 1, i));
    M.slide = i;
    var s = M.slides[i], id = M.id, d = nd(id), box = $('md-slides');
    box.textContent = '';
    var sl = el('article', { class: 'md-slide' });
    if (s.kind === 'overview') {
      sl.appendChild(el('p', { class: 'md-s-eyebrow', text: 'OVERVIEW · 개요' }));
      var used = {}, self = selfKeys(id);
      sl.appendChild(el('p', { class: 'md-lead' }, [richText(keyOf(id), used, self)]));
      if (d.role) sl.appendChild(el('p', { class: 'md-role' }, [el('span', { class: 'md-k', text: '흐름에서의 역할' }), richText(d.role, used, self)]));
      if (d.key && d.desc && d.desc !== d.key) sl.appendChild(el('p', { class: 'md-desc' }, [richText(d.desc, used, self)]));
    } else if (s.kind === 'child') {
      var c = nd(s.id), cs = selfKeys(s.id), u2 = {};
      sl.appendChild(el('p', { class: 'md-s-eyebrow', text: pad2(s.n) + (enDup(s.id) ? '' : ' · ' + enOf(s.id)) }));
      sl.appendChild(el('h3', { class: 'md-s-title', text: c.label }));
      sl.appendChild(el('p', { class: 'md-lead' }, [richText(keyOf(s.id), u2, cs)]));
      if (c.key && c.desc !== c.key) sl.appendChild(el('p', { class: 'md-desc' }, [richText(c.desc, u2, cs)]));
      sl.appendChild(el('button', { type: 'button', class: 'pill md-open', 'data-modal': s.id }, [state.nodes[s.id].childIds.length ? '이 항목 자세히 (하위 ' + state.nodes[s.id].childIds.length + '개)' : '이 항목 자세히', ' ›']));
      sl.appendChild(el('p', { class: 'md-src' }, ['출처: ', srcLinks(c.src)]));
    } else {
      sl.appendChild(el('p', { class: 'md-s-eyebrow', text: 'EXAMPLE · 예시' }));
      var ex = exBlock(id, [], '예시' + (d.ex.lang ? ' (' + d.ex.lang + ')' : ''));
      if (ex) sl.appendChild(ex);
    }
    if (s.kind !== 'child') sl.appendChild(el('p', { class: 'md-src' }, ['출처: ', srcLinks(d.src)]));
    box.appendChild(sl);
    if (!motionOff()) { sl.classList.add('is-enter'); void sl.offsetWidth; sl.classList.remove('is-enter'); }
    each('#md-dots .md-dot', function (b, k) { b.classList.toggle('is-on', k === i); if (k === i) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    each('#md-chips .md-chip[data-slide]', function (b) { b.classList.toggle('is-on', +b.getAttribute('data-slide') === i); });
    each('#md-svg .xp', function (g) { g.classList.toggle('is-on', +g.getAttribute('data-slide') === i); });
    $('md-prev').disabled = i === 0;
    $('md-next').disabled = i === M.slides.length - 1;
    // 안내는 실제로 넘길 수 있을 때만, 지금 위치와 함께 보여 준다
    var hint = $('md-hint'), n = M.slides.length;
    hint.hidden = n < 2;
    hint.textContent = '← → 키나 아래 점으로 넘겨 보세요 · ' + (i + 1) + ' / ' + n;
  }

  // 분해 그림: 하위 요소를 위아래로 띄워 쌓은 판(5개 이하) 또는 격자 블록(6개 이상), 없으면 블록 하나
  function drawExploded(id) {
    var s = $('md-svg');
    s.textContent = '';
    var kids = state.nodes[id].childIds, W = 420, H = 460;
    s.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    var K = makeKit(s), cx = 190;
    if (!kids.length) {
      var g = svg('g', { class: 'xp is-on', 'data-slide': 0 });
      s.appendChild(g);
      K.box(g, cx, 330, 170, 170, 26, 'xp-base');
      var b = K.box(g, cx, 300, 120, 120, 70, 'xp-bx');
      K.topIcon(g, iconOf(id), b.top[0], b.top[1], 0, 76);
      return;
    }
    if (kids.length <= 5) {
      // 판끼리 겹치지 않게: 판 하나의 화면 높이(윗면 마름모 + 두께)와 간격으로 크기를 정한다
      var n = kids.length, sep = 16, th = n > 3 ? 10 : 14;
      var plateH = Math.min(150, (410 - (n - 1) * sep) / n), half = plateH - th;
      var pw = half * 1.16, pd = half * 0.84, top0 = (H - (n * plateH + (n - 1) * sep)) / 2;
      kids.slice().reverse().forEach(function (c, ri) {
        var i = n - 1 - ri, y = top0 + i * (plateH + sep) + th + half / 2;
        // 위에서부터 1번: 맨 아래 판을 먼저 그린다
        var g2 = svg('g', { class: 'xp', 'data-slide': i + 1, 'data-x': c });
        s.appendChild(g2);
        var bx = K.box(g2, cx, y, pw, pd, th, 'xp-bx');
        K.topIcon(g2, iconOf(c), bx.top[0], bx.top[1], 0, Math.min(40, half * 0.42));
        var ax = bx.right[0] + 6, ay = bx.right[1] + th / 2, lx = 372;
        g2.appendChild(svg('polyline', { class: 'xp-lead', points: ptsStr([[ax, ay], [lx - 13, ay]]) }));
        g2.appendChild(svg('circle', { class: 'xp-num-bg', cx: lx, cy: ay, r: 12 }));
        K.text(g2, String(i + 1), lx, ay, 11, 'xp-num');
      });
      // 부모 받침
      return;
    }
    // 격자: 블록 사이를 비워 서로 닿지 않게 하고, 전체를 그림 가운데에 둔다
    var cols = 3, rows = Math.ceil(kids.length / cols);
    // 행이 늘면 화면 폭이 커지므로, 그림 안에 들어오도록 간격·블록 크기를 함께 줄인다
    var spanX = (cols - 1 + rows - 1) * 100 / 2 * 2 + 104, spanY = (cols - 1 + rows - 1) * 100 / 2 + 52 + 20 + 40;
    var sc = Math.min(1, (W - 24) / spanX, (H - 40) / spanY);
    var cell = 100 * sc, blkS = 52 * sc, blkH = 20 * sc;
    var cells = kids.map(function (c, i) {
      var r = Math.floor(i / cols), k = i % cols;
      return { c: c, i: i, r: r, k: k, p: isoP(0, 0, (k - (cols - 1) / 2) * cell, (r - (rows - 1) / 2) * cell, 0) };
    });
    var xs = cells.map(function (o) { return o.p[0]; }), ys = cells.map(function (o) { return o.p[1]; });
    var ox = W / 2 - (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2;
    var oy = H / 2 - (Math.min.apply(null, ys) + Math.max.apply(null, ys)) / 2 + blkH / 2;
    cells.sort(function (a, b) { return (a.r + a.k) - (b.r + b.k); }).forEach(function (o) {
      var g3 = svg('g', { class: 'xp', 'data-slide': o.i + 1, 'data-x': o.c });
      s.appendChild(g3);
      var b3 = K.box(g3, ox + o.p[0], oy + o.p[1], blkS, blkS, blkH, 'xp-bx');
      K.topIcon(g3, iconOf(o.c), b3.top[0], b3.top[1], 0, 30 * sc);
      // 번호는 블록 뒤 꼭짓점 바로 위(뒤쪽 이웃 블록과 닿지 않는 자리)
      g3.appendChild(svg('circle', { class: 'xp-num-bg', cx: b3.back[0], cy: b3.back[1] - 14 * sc, r: 11 }));
      K.text(g3, String(o.i + 1), b3.back[0], b3.back[1] - 14 * sc, 10.5, 'xp-num');
    });
  }

  /* ---------------- 실습 창 ----------------
     기본 흐름 순서대로, 각 단계 노드(또는 그 하위)에서 처음 나오는 예시를 한 장씩 보여 준다. */
  function practiceItems() {
    var out = [], seen = {};
    function firstEx(id) {
      if (nd(id).ex && nd(id).ex.code && !seen[id]) return id;
      var k = state.nodes[id].childIds;
      for (var i = 0; i < k.length; i++) { var r = firstEx(k[i]); if (r) return r; }
      return null;
    }
    var main = null;
    state.flows.forEach(function (f) { if (f.main && !main) main = f; });
    if (main) main.steps.forEach(function (s) { var id = firstEx(s.node); if (id) { seen[id] = true; out.push({ id: id, step: s.node }); } });
    if (!out.length) state.order.forEach(function (id) { if (out.length < 6 && nd(id).ex && nd(id).ex.code) out.push({ id: id, step: id }); });
    return out;
  }

  function buildPractice() {
    var items = practiceItems(), box = $('practice');
    state.practiceItems = items;
    if (!items.length) { box.hidden = true; document.documentElement.classList.remove('pr-on', 'pr-folded'); return; }
    box.hidden = false;
    document.documentElement.classList.add('pr-on');
    var folded = store('kb-practice-fold') !== 'open' || window.innerWidth < WIDE && store('kb-practice-fold') !== 'open';
    setPracticeFold(folded);
    renderPractice();
  }
  function setPracticeFold(folded) {
    var box = $('practice'), b = $('pr-fold');
    box.classList.toggle('is-folded', folded);
    $('pr-body').hidden = folded;
    b.setAttribute('aria-expanded', folded ? 'false' : 'true');
    b.setAttribute('aria-label', folded ? '실습 창 펼치기' : '실습 창 접기');
    document.documentElement.classList.toggle('pr-folded', folded);
    // 자리가 바뀌었으니 장면 크기·라벨을 다시 맞춘다
    if (state.kit) sizeBoard();
  }
  function renderPractice() {
    var items = state.practiceItems, i = state.practice, body = $('pr-body');
    if (!items || !items.length) return;
    body.textContent = '';
    var it = items[i], d = nd(it.id);
    body.appendChild(el('div', { class: 'pr-chips', role: 'group', 'aria-label': '실습 단계' }, items.map(function (o, k) {
      return el('button', { type: 'button', class: 'pr-chip' + (k === i ? ' is-on' : ''), 'data-pr': k, 'aria-current': k === i ? 'step' : null, text: (k + 1) + ' ' + nd(o.step).label });
    })));
    var screen = el('div', { class: 'pr-screen' }, [
      el('div', { class: 'pr-bar' }, [el('i', { 'aria-hidden': 'true' }), el('i', { 'aria-hidden': 'true' }), el('i', { 'aria-hidden': 'true' }), el('span', { 'aria-hidden': 'true', text: d.ex.lang || 'example' }), copyBtn(d.ex.code, d.label + ' 예시 코드')]),
      el('pre', { class: 'pr-code', tabindex: '0', 'aria-label': d.label + ' 예시 코드', text: d.ex.code })
    ]);
    body.appendChild(screen);
    body.appendChild(el('p', { class: 'pr-text' }, [el('b', { text: d.label }), ' — ', richText(keyOf(it.id), {}, selfKeys(it.id))]));
    body.appendChild(el('p', { class: 'md-src' }, ['출처: ', srcLinks(d.src)]));
    body.appendChild(el('div', { class: 'pr-nav' }, [
      el('button', { type: 'button', class: 'pill', 'data-pr': 0, text: '처음부터' }),
      el('span', { class: 'pr-dots', 'aria-hidden': 'true' }, items.map(function (o, k) { return el('i', { class: k === i ? 'is-on' : '' }); })),
      el('button', { type: 'button', class: 'pill', 'data-pr': i - 1, disabled: i === 0, 'aria-label': '이전 실습', text: '‹' }),
      el('button', { type: 'button', class: 'pill is-primary', 'data-pr': i + 1, disabled: i === items.length - 1, 'aria-label': '다음 실습', text: '다음 ›' })
    ]));
    applyPractice();
  }
  function goPractice(k) {
    var items = state.practiceItems || [];
    if (k < 0 || k >= items.length) return;
    state.practice = k;
    var had = document.activeElement && document.activeElement.getAttribute && document.activeElement.getAttribute('data-pr');
    renderPractice();
    var f = $('pr-body').querySelector('.pr-chip[data-pr="' + k + '"]');
    if (had !== null && f) f.focus();
  }
  // 실습 중인 노드를 장면에서 점선 고리로 표시
  function applyPractice() {
    each('#board .is-practice', function (n) { n.classList.remove('is-practice'); });
    var items = state.practiceItems;
    if (!items || !items.length || $('practice').classList.contains('is-folded')) return;
    var n = drawnFor(items[state.practice].id);
    if (n) n.classList.add('is-practice');
  }

  /* ---------------- 서랍(구조·용어·출처) ---------------- */
  var PANE_TITLES = { outline: '구조 전체 보기', terms: '용어', sources: '출처' };
  function openDrawer(pane, opener) {
    state.drawerOpener = opener || document.activeElement;
    $('drawer-title').textContent = PANE_TITLES[pane];
    each('#drawer .pane', function (p) { p.hidden = p.getAttribute('data-pane') !== pane; });
    $('drawer').hidden = false;
    $('drawer-backdrop').hidden = false;
    document.body.classList.add('drawer-open');
    if (pane === 'outline') updateOutline(true);
    (pane === 'terms' ? $('term-search') : $('drawer-close')).focus();
  }
  function closeDrawer() {
    if ($('drawer').hidden) return;
    $('drawer').hidden = true;
    $('drawer-backdrop').hidden = true;
    document.body.classList.remove('drawer-open');
    hideTip();
    var op = state.drawerOpener;
    state.drawerOpener = null;
    if (op && op.focus && document.body.contains(op)) op.focus();
  }
  function trapFocus(e, box) {
    if (e.key !== 'Tab') return;
    var f = Array.prototype.filter.call(box.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])'), function (n) { return !n.disabled && n.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function updateOutline(reveal) {
    state.order.forEach(function (id) {
      var o = state.nodes[id].ol;
      if (!o) return;
      var viewing = id === state.viewId;
      o.badge.textContent = viewing ? '보는 중' : '';
      o.li.classList.toggle('is-current', viewing);
    });
    if (reveal && state.viewId) pathTo(state.viewId).forEach(function (p) { setOutlineOpen(p, true); });
  }
  // 구조·용어에서 노드로 이동: 하위가 있으면 그 안으로, 없으면 부모 화면에서 설명창
  function goNode(id) {
    if (!state.nodes[id]) return;
    closeDrawer();
    if (canEnter(id)) { setView(id); return; }
    setView(pathTo(id)[0]);
    later(function () { openModal(id, 0, $('stage')); }, 300);
  }

  function renderGuideNav() {
    var nav = $('guide-nav');
    nav.textContent = '';
    nav.appendChild(el('a', { class: 'guide-link', href: HUB, text: '전체 지도' }));
    GUIDES.forEach(function (g) {
      nav.appendChild(el('a', { class: 'guide-link', href: g.href, 'aria-current': g.id === state.meta.id ? 'page' : null, text: g.label }));
    });
  }


  /* ---------------- 이벤트 ---------------- */
  function idFrom(t) {
    var n = t.closest && t.closest('[data-id]');
    return n ? n.getAttribute('data-id') : null;
  }
  function bindEvents() {
    var board = $('board'), labels = $('labels'), legend = $('legend');
    // 장면(마우스·터치)
    board.addEventListener('click', function (e) {
      var id = idFrom(e.target);
      if (id) { activate(id, document.querySelector('#labels .lbl[data-id="' + id + '"]')); return; }
    });
    board.addEventListener('mouseover', function (e) { setHot(idFrom(e.target)); });
    board.addEventListener('mouseleave', function () { setHot(null); });
    // 라벨·목록(키보드 경로)
    [labels, legend].forEach(function (box) {
      box.addEventListener('click', function (e) { var b = e.target.closest('button[data-id]'); if (b) activate(b.getAttribute('data-id'), b); });
      box.addEventListener('mouseover', function (e) { var b = e.target.closest('[data-id]'); setHot(b ? b.getAttribute('data-id') : null); });
      box.addEventListener('mouseleave', function () { setHot(null); });
      box.addEventListener('focusin', function (e) { var b = e.target.closest('[data-id]'); if (b) setHot(b.getAttribute('data-id')); });
      box.addEventListener('focusout', function () { setHot(null); });
    });
    // 위쪽
    $('stage-up').addEventListener('click', up);
    // 다른 페이지(전체 지도·다른 가이드)로 갈 때 화면을 흐리게 지운 뒤 이동
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target) return;
      var h = a.getAttribute('href');
      if (!h || h.charAt(0) === '#' || /^[a-z]+:/i.test(h)) return;
      e.preventDefault();
      leavePage(a.href);
    });
    window.addEventListener('pageshow', function () { document.documentElement.classList.remove('is-leaving'); });
    $('back').addEventListener('click', function (e) { if (this.hasAttribute('data-up')) { e.preventDefault(); up(); } });
    $('crumb').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-view]');
      if (b) setView(b.getAttribute('data-view') || null);
    });
    $('open-outline').addEventListener('click', function () { openDrawer('outline', this); });
    $('open-terms').addEventListener('click', function () { openDrawer('terms', this); });
    $('open-sources').addEventListener('click', function () { openDrawer('sources', this); });
    // 흐름 패널
    $('tours-list').addEventListener('click', function (e) { var b = e.target.closest('[data-flow]'); if (b) openFlow(+b.getAttribute('data-flow')); });
    $('tours-view').addEventListener('click', function (e) {
      var b = e.target.closest('.tv-node');
      if (b) goStep(+b.getAttribute('data-step'));
      if (e.target.closest('#tv-text') && typing) stopTyping();
    });
    $('tour-tip-ok').addEventListener('click', function () { hideTourTip(true); $('tours-list').focus(); });
    // 왼쪽 아래 설명·설명창
    document.addEventListener('click', function (e) {
      var t = e.target;
      var m = t.closest('[data-modal]');
      if (m) { openModal(m.getAttribute('data-modal'), 0, m); return; }
      var go = t.closest('.md-go');
      if (go) { var v = go.getAttribute('data-view'); closeModal(); setView(v); return; }
      var sl = t.closest('#modal [data-slide]');
      if (sl) { showSlide(+sl.getAttribute('data-slide')); return; }
      var pr = t.closest('#practice [data-pr]');
      if (pr) { goPractice(+pr.getAttribute('data-pr')); return; }
      var gn = t.closest('#drawer [data-go]');
      if (gn) { goNode(gn.getAttribute('data-go')); return; }
      var tg = t.closest('#drawer [data-toggle]');
      if (tg) { var tid = tg.getAttribute('data-toggle'); setOutlineOpen(tid, tg.getAttribute('aria-expanded') !== 'true'); return; }
      var tip = t.closest('.tt');
      if (tip) { if (tipOwner === tip) hideTip(); else showTip(tip); return; }
      if (!t.closest('#tip')) hideTip();
    });
    $('md-svg').addEventListener('click', function (e) { var g = e.target.closest('.xp'); if (g) showSlide(+g.getAttribute('data-slide')); });
    $('md-close').addEventListener('click', closeModal);
    $('modal-back').addEventListener('click', closeModal);
    $('md-prev').addEventListener('click', function () { showSlide(state.modal.slide - 1); });
    $('md-next').addEventListener('click', function () { showSlide(state.modal.slide + 1); });
    // 서랍
    $('drawer-close').addEventListener('click', closeDrawer);
    $('drawer-backdrop').addEventListener('click', closeDrawer);
    $('expand-all').addEventListener('click', function () { state.order.forEach(function (id) { setOutlineOpen(id, true); }); });
    $('collapse-all').addEventListener('click', function () { state.order.forEach(function (id) { setOutlineOpen(id, false); }); });
    $('term-search').addEventListener('input', filterTerms);
    $('term-more').addEventListener('click', function () { state.termsMore = !state.termsMore; syncTermsMore(); });
    // 실습 창
    $('pr-fold').addEventListener('click', function () {
      var f = !$('practice').classList.contains('is-folded');
      setPracticeFold(f);
      store('kb-practice-fold', f ? 'fold' : 'open');
      applyPractice();
    });
    // 용어 툴팁: 포인터를 올리면 보이기
    document.addEventListener('mouseover', function (e) { var b = e.target.closest && e.target.closest('.tt'); if (b && b !== tipOwner) showTip(b); });
    document.addEventListener('focusin', function (e) { var b = e.target.closest && e.target.closest('.tt'); if (b) showTip(b); else if (tipOwner && !e.target.closest('#tip')) hideTip(); });
    // 키보드
    document.addEventListener('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase(), typingField = tag === 'input' || tag === 'textarea';
      if (e.key === 'Escape') {
        if (tipOwner) { var o = tipOwner; hideTip(); o.focus(); return; }
        if (state.modal) { closeModal(); return; }
        if (!$('drawer').hidden) { closeDrawer(); return; }
        if (state.flow >= 0) { closeFlow(); return; }
        if (state.viewId) { up(); return; }
        return;
      }
      if (state.modal) {
        trapFocus(e, $('modal'));
        // 한글 입력기 등에서 key 값이 다르게 올 때도 방향 키를 알아보도록 keyCode도 함께 본다
        var dir = e.key === 'ArrowRight' || e.key === 'Right' || e.keyCode === 39 ? 1 : e.key === 'ArrowLeft' || e.key === 'Left' || e.keyCode === 37 ? -1 : 0;
        if (dir && !e.altKey && !e.metaKey && !e.ctrlKey) { e.preventDefault(); if (tipOwner) hideTip(); showSlide(state.modal.slide + dir); }
        return;
      }
      if (!$('drawer').hidden) { trapFocus(e, $('drawer')); return; }
      if (typingField) return;
      if (e.key === 'Backspace' && state.viewId && state.flow < 0) { e.preventDefault(); up(); return; }
      if (state.flow >= 0 && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
        e.preventDefault();
        goStep(state.step + (e.key === 'ArrowRight' ? 1 : -1));
      }
    });
    var raf = 0;
    window.addEventListener('resize', function () {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () { raf = 0; sizeBoard(); hideTip(); });
    });
    window.addEventListener('hashchange', function () {
      var h = decodeURIComponent((location.hash || '').slice(1));
      if (h !== (state.viewId || '')) setView(state.nodes[h] ? h : null);
    });
  }

  /* ---------------- 시작 ---------------- */
  function init() {
    var data = window.GUIDE_DATA;
    if (!data || typeof data !== 'object') {
      warn('data.js를 불러오지 못했습니다. index.html과 같은 폴더에 data.js가 있는지 확인하세요.');
      renderWarnings();
      return;
    }
    state.meta = data.meta || {};
    GUIDES.forEach(function (g) { if (g.id === state.meta.id) state.guide = g; });
    if (state.guide) document.documentElement.style.setProperty('--h', state.guide.h);
    state.sources = safe('출처 검증', function () { return validateSources(data.sources); }) || {};
    safe('구조 검증', function () {
      validateTree(data.tree, data.examples);
      Object.keys(data.examples || {}).forEach(function (k) { if (!state.nodes[k]) warn('예시(examples)의 "' + k + '"에 해당하는 노드가 없습니다.'); });
    });
    safe('심볼 검증', function () {
      Object.keys(data.icons || {}).forEach(function (k) {
        if (!state.nodes[k]) warn('심볼(icons)의 "' + k + '"에 해당하는 노드가 없습니다.');
        else if (!ICONS[data.icons[k]] && !logoOf(data.icons[k])) warn('"' + k + '"의 심볼 이름 "' + data.icons[k] + '"을 찾을 수 없어 기본 심볼로 표시합니다.');
        else state.icons[k] = data.icons[k];
      });
    });
    safe('흐름 검증', function () { validateFlows(data.flows); });
    safe('용어 검증', function () { validateTerms(data.terms); });
    safe('흐름 목록', renderToursList);
    safe('구조 목록', buildOutline);
    safe('용어 목록', buildTerms);
    safe('출처 목록', function () { renderSources(data); });
    safe('다른 가이드', renderGuideNav);
    safe('이벤트 연결', bindEvents);
    var h = decodeURIComponent((location.hash || '').slice(1));
    state.viewId = state.nodes[h] && canEnter(pathTo(h)[0]) ? pathTo(h)[0] : null;
    safe('장면', renderView);
    safe('장면 등장', popParts);
    safe('실습 창', buildPractice);
    updateHint();
    renderWarnings();
    setTimeout(showTourTip, 1400);
    window.__guide = { state: state, setView: setView, openFlow: openFlow, openModal: openModal, warnings: warnings };
  }

  function leavePage(url) {
    if (motionOff()) { location.href = url; return; }
    document.documentElement.classList.add('is-leaving');
    setTimeout(function () { location.href = url; }, 260);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
