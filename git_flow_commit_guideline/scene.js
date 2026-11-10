/* Git Flow·커밋 첫 화면 장면 — 노드 id는 data.js와 같아야 합니다.
   배치: 판 위 다섯 갈래 브랜치 줄(main·hotfix·release·develop·feature) + 커밋 점과 병합선,
   주변에 커밋 메시지 카드(왼쪽 위) · 병합 블록(오른쪽 위) · 이력 판(왼쪽 아래) · 대안 전략 2×2(오른쪽 아래) */
window.GUIDE_SCENE = {
  draw: function (K) {
    var CX = 470, CY = 360;

    // 메시지 카드(떠 있음)
    var ms = K.part('message');
    K.box(ms, 170, 120, 130, 84, 4);
    var m2 = K.box(ms, 170, 112, 120, 76, 4, '', 4);
    K.topIcon(ms, K.iconOf('message'), m2.top[0], m2.top[1], 0, 34);
    K.label('message', [190, 80], [290, 60], 'r');

    // 병합 블록(떠 있음)
    var ig = K.part('integrate');
    var i1 = K.box(ig, 820, 176, 84, 84, 30);
    K.topIcon(ig, K.iconOf('integrate'), i1.top[0], i1.top[1], 0, 40);
    K.label('integrate', [790, 136], [700, 96], 'l');

    // 브랜치 판
    var br = K.part('branches');
    var sb = K.box(br, CX, CY, 600, 270, 14);
    var c = sb.top;
    function P(x, y) { return K.P(c[0], c[1], x, y, 0); }
    var lanes = [['main', -112], ['hotfix', -56], ['release', 0], ['develop', 56], ['feature', 112]];
    var Y = {};
    lanes.forEach(function (l) { Y[l[0]] = l[1]; });
    var dots = {
      main: [-230, 40, 230], hotfix: [150, 190], release: [-20, 20],
      develop: [-230, -150, -80, 0, 80, 200, 240], feature: [-180, -120]
    };
    var joins = [
      ['develop', -230, 'feature', -180], ['feature', -120, 'develop', -80],
      ['develop', -80, 'release', -20], ['release', 20, 'main', 40], ['release', 20, 'develop', 80],
      ['main', 40, 'hotfix', 150], ['hotfix', 190, 'main', 230], ['hotfix', 190, 'develop', 240]
    ];
    var laneG = {};
    lanes.forEach(function (l) {
      var g = K.sub(br, l[0]);
      laneG[l[0]] = g;
      var xs = dots[l[0]], x0 = l[0] === 'main' || l[0] === 'develop' ? -270 : xs[0] - 20, x1 = l[0] === 'main' || l[0] === 'develop' ? 270 : xs[xs.length - 1] + 20;
      K.el(g, 'polyline', { class: 'line-lane', points: [P(x0, l[1]), P(x1, l[1])].map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ') });
      var tp = P(-288, l[1]);
      K.topText(g, l[0], tp[0], tp[1], 0, 10, 'lane-tx');
    });
    joins.forEach(function (j) { K.link(laneG[j[2]], [P(j[1], Y[j[0]]), P(j[3], Y[j[2]])], 'solid'); });
    lanes.forEach(function (l) {
      dots[l[0]].forEach(function (x) { var p = P(x, l[1]); K.dot(laneG[l[0]], p[0], p[1], 5.5); });
    });
    // 태그: main의 릴리스 커밋 위 깃발
    var tg = K.sub(br, 'tag');
    [40, 230].forEach(function (x) {
      var p = P(x, -112);
      K.el(tg, 'line', { class: 'link solid', x1: p[0], y1: p[1], x2: p[0], y2: p[1] - 30 });
      K.el(tg, 'polygon', { class: 'tag-flag', points: p[0] + ',' + (p[1] - 30) + ' ' + (p[0] + 18) + ',' + (p[1] - 25) + ' ' + p[0] + ',' + (p[1] - 20) });
    });
    var la = P(-230, 56);
    K.label('branches', la, [80, 330], 'l');

    // 이력 판(앞 왼쪽)
    var hs = K.part('history');
    [0, 10, 20, 30].forEach(function (z) { K.box(hs, 150, 556, 96, 66, 6, '', z); });
    K.topIcon(hs, K.iconOf('history'), 150, 556, 36, 30);
    K.label('history', [170, 520], [260, 600], 'r');

    // 대안 전략 2×2(앞 오른쪽)
    var al = K.part('alternatives');
    [['githubflow', -30, -30], ['gitlabflow', 30, -30], ['trunk', -30, 30], ['featureflag', 30, 30]].forEach(function (o) {
      var p = K.P(830, 556, o[1], o[2], 0), b = K.box(K.sub(al, o[0]), p[0], p[1], 50, 50, 12);
      K.topIcon(al, K.iconOf(o[0]), b.top[0], b.top[1], 0, 24);
    });
    K.label('alternatives', [810, 520], [700, 610], 'l');
    return { viewBox: [1000, 640] };
  }
};
