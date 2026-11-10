/* Kubernetes 첫 화면 장면 — 노드 id는 data.js와 같아야 합니다.
   배치: kubectl(떠 있음, 왼쪽 위) · Control Plane(뒤) · 서비스·설정(왼쪽) · 워크로드 카드(오른쪽) · Worker Node(앞) */
window.GUIDE_SCENE = {
  draw: function (K) {
    var cl = K.g(null, 'slab-deco');
    K.box(cl, 500, 392, 600, 400, 18);
    var tp = K.P(500, 374, 30, 190, 0);
    K.topText(cl, 'CLUSTER', tp[0], tp[1], 0, 13, 'slab-tx');

    K.link(null, [[190, 120], [300, 150], [400, 205]], 'flowing');
    K.link(null, [[560, 270], [520, 430]], 'flowing');
    K.link(null, [[600, 250], [720, 330]], 'flowing');
    K.link(null, [[290, 400], [390, 460]], 'flowing');

    // kubectl — 떠 있는 터미널
    var kc = K.part('kubectl');
    var k1 = K.box(kc, 160, 130, 86, 62, 34);
    K.topIcon(kc, K.iconOf('kubectl'), k1.top[0], k1.top[1], 0, 34);
    K.label('kubectl', [180, 90], [290, 60], 'r');

    // Control Plane — 받침 위 네 구성 요소
    var cp = K.part('cp');
    var base = K.box(cp, 500, 252, 260, 130, 12);
    var c = base.top;
    var api = K.P(c[0], c[1], -82, 0, 0);
    var a1 = K.box(K.sub(cp, 'apiserver'), api[0], api[1], 52, 52, 40);
    K.topIcon(cp, K.iconOf('apiserver'), a1.top[0], a1.top[1], 0, 28);
    var et = K.P(c[0], c[1], -24, 0, 0);
    K.cyl(K.sub(cp, 'etcd'), et[0], et[1], 22, 34);
    var sc = K.P(c[0], c[1], 32, 0, 0);
    var s1 = K.box(K.sub(cp, 'scheduler'), sc[0], sc[1], 44, 44, 26);
    K.topIcon(cp, K.iconOf('scheduler'), s1.top[0], s1.top[1], 0, 24);
    var cm = K.P(c[0], c[1], 88, 0, 0);
    var m1 = K.box(K.sub(cp, 'ctrlmgr'), cm[0], cm[1], 44, 44, 26);
    K.topIcon(cp, K.iconOf('ctrlmgr'), m1.top[0], m1.top[1], 0, 24);
    K.label('cp', [600, 230], [780, 170], 'r');

    // Services & Config — 판 위 세 타일
    var sv = K.part('svcconf');
    var sb = K.box(sv, 250, 392, 170, 120, 8);
    [['networking', -48], ['config', 0], ['storage', 48]].forEach(function (o) {
      var p = K.P(sb.top[0], sb.top[1], o[1], 0, 0), t = K.box(K.sub(sv, o[0]), p[0], p[1], 38, 38, 16);
      K.topIcon(sv, K.iconOf(o[0]), t.top[0], t.top[1], 0, 22);
    });
    K.label('svcconf', [200, 360], [100, 470], 'l');

    // Workloads — 떠 있는 카드 묶음
    var wl = K.part('workloads');
    [['job', 0], ['daemonset', 16], ['statefulset', 32], ['deployment', 48]].forEach(function (o) {
      K.box(K.sub(wl, o[0]), 760, 392, 100, 70, 5, '', o[1]);
    });
    K.topIcon(wl, K.iconOf('workloads'), 760, 392, 53, 32);
    K.label('workloads', [800, 330], [900, 290], 'r');

    // Worker Node — kubelet + Pod 세 개
    var nd = K.part('node');
    var nb = K.box(nd, 520, 492, 230, 130, 12);
    var kp = K.P(nb.top[0], nb.top[1], -78, 0, 0);
    var kl = K.box(K.sub(nd, 'kubelet'), kp[0], kp[1], 46, 46, 26);
    K.topIcon(nd, K.iconOf('kubelet'), kl.top[0], kl.top[1], 0, 24);
    var pods = K.sub(nd, 'pod');
    [-14, 34, 82].forEach(function (x) {
      var p = K.P(nb.top[0], nb.top[1], x, 0, 0), b = K.box(pods, p[0], p[1], 36, 36, 32);
      K.topIcon(pods, K.iconOf('pod'), b.top[0], b.top[1], 0, 20);
    });
    K.label('node', [600, 500], [800, 560], 'r');
    return { viewBox: [1000, 640] };
  }
};
