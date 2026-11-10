/* 모니터링 첫 화면 장면 — 노드 id는 data.js와 같아야 합니다.
   배치: 수집 대상 랙(왼쪽) → 수집 깔때기 → 저장 DB(TSDB·Loki) → 대시보드 화면 / 알림 종 */
window.GUIDE_SCENE = {
  draw: function (K) {
    var sl = K.g(null, 'slab-deco');
    K.box(sl, 500, 380, 660, 380, 16);
    var tp = K.P(500, 364, 0, 175, 0);
    K.topText(sl, 'OBSERVABILITY', tp[0], tp[1], 0, 13, 'slab-tx');

    K.link(null, [[250, 300], [360, 250]], 'flowing');
    K.link(null, [[400, 255], [530, 300]], 'flowing');
    K.link(null, [[570, 290], [720, 230]], 'flowing');
    K.link(null, [[580, 330], [760, 420]], 'flowing');

    // Visualize — 세워 둔 화면(가장 뒤)
    var vz = K.part('visualize'), gf = K.sub(vz, 'grafana');
    K.box(gf, 740, 268, 90, 50, 6);
    var scr = K.box(gf, 740, 262, 110, 10, 72, '', 6);
    K.icon(gf, K.iconOf('visualize'), 735, 218, 34);
    K.label('visualize', [760, 190], [880, 150], 'r');

    // Collect — 깔때기
    var co = K.part('collect'), sc = K.sub(co, 'scrape');
    K.cyl(sc, 380, 262, 14, 18);
    var f = K.cyl(sc, 380, 262, 40, 20, '', 18);
    K.topIcon(co, K.iconOf('collect'), f.top[0], f.top[1], 0, 26);
    K.label('collect', [360, 210], [270, 150], 'l');

    // Store — TSDB · Loki 원통
    var st = K.part('store');
    K.box(st, 550, 336, 130, 90, 8);
    K.cyl(K.sub(st, 'tsdb'), 520, 330, 28, 54);
    K.cyl(K.sub(st, 'loki'), 586, 336, 22, 40);
    K.topIcon(st, K.iconOf('store'), 520, 276, 0, 26);
    K.label('store', [540, 300], [430, 440], 'l');

    // Targets — 서버 랙(세 단)
    var tg = K.part('targets');
    [['hwmetrics', 0], ['cadvisor', 24], ['appmetrics', 48]].forEach(function (o) {
      K.box(K.sub(tg, o[0]), 220, 360, 80, 60, 18, '', o[1]);
    });
    K.topIcon(tg, K.iconOf('targets'), 220, 360, 66, 30);
    K.label('targets', [190, 300], [100, 240], 'l');

    // Alert — 종
    var al = K.part('alert'), am = K.sub(al, 'alertmanager');
    K.box(am, 790, 452, 70, 70, 8);
    K.cyl(am, 790, 444, 24, 34);
    K.cyl(am, 790, 444, 6, 8, '', 34);
    K.icon(al, K.iconOf('alert'), 790, 372, 30);
    K.label('alert', [810, 390], [900, 470], 'r');
    return { viewBox: [1000, 640] };
  }
};
