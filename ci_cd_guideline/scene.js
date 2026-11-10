/* CI/CD 첫 화면 장면 — 노드 id는 data.js와 같아야 합니다.
   배치: 한 줄로 흐르는 컨베이어 벨트 위 5개 정거장(Source → Build → Test → Package → Deploy) */
window.GUIDE_SCENE = {
  draw: function (K) {
    var CX = 500, CY = 330;
    var belt = K.g(null, 'slab-deco');
    var bt = K.box(belt, CX, CY, 800, 130, 14);
    var c = bt.top;
    K.link(belt, [K.P(c[0], c[1], -390, 0, 0), K.P(c[0], c[1], 390, 0, 0)], 'flowing');
    var tp = K.P(c[0], c[1], 0, 52, 0);
    K.topText(belt, 'PIPELINE', tp[0], tp[1], 0, 12, 'slab-tx');

    function at(x) { return K.P(c[0], c[1], x, 0, 0); }

    // Source — 저장소 상자
    var s = K.part('source'), p = at(-300);
    var s1 = K.box(s, p[0], p[1], 80, 80, 30);
    K.topIcon(s, K.iconOf('source'), s1.top[0], s1.top[1], 0, 40);
    K.label('source', [p[0] + 20, s1.top[1] - 10], [p[0] + 80, s1.top[1] - 60], 'r');

    // Build — 문(작업 공간)처럼 높은 상자
    var b = K.part('build'); p = at(-150);
    K.box(b, p[0], p[1], 96, 96, 10);
    var b1 = K.box(K.sub(b, 'runner'), p[0], p[1] - 10, 72, 72, 50);
    K.topIcon(b, K.iconOf('build'), b1.top[0], b1.top[1], 0, 36);
    K.label('build', [p[0] + 20, b1.top[1] - 10], [p[0] + 80, b1.top[1] - 60], 'r');

    // Test — 검사 게이트(기둥 두 개 + 가로대)
    var t = K.part('test'); p = at(0);
    var l1 = K.P(p[0], p[1], 0, -40, 0), r1 = K.P(p[0], p[1], 0, 40, 0);
    K.box(t, l1[0], l1[1], 14, 14, 64);
    K.box(t, r1[0], r1[1], 14, 14, 64);
    var g1 = K.box(t, p[0], p[1], 14, 94, 12, '', 64);
    K.topIcon(t, K.iconOf('test'), p[0], p[1], 26, 30);
    K.label('test', [p[0] + 10, g1.top[1] - 4], [p[0] + 80, g1.top[1] - 50], 'r');

    // Package — 쌓인 이미지 상자
    var k = K.part('package'); p = at(150);
    K.box(k, p[0], p[1], 76, 76, 26);
    var k2 = K.box(K.sub(k, 'registry'), p[0], p[1], 56, 56, 22, '', 26);
    K.topIcon(k, K.iconOf('package'), k2.top[0], k2.top[1], 0, 30);
    K.label('package', [p[0] + 20, k2.top[1] - 10], [p[0] + 80, k2.top[1] - 60], 'r');

    // Deploy — 클러스터 받침 위로 올라가는 Pod
    var d = K.part('deploy'); p = at(300);
    var d0 = K.box(d, p[0], p[1], 100, 100, 10);
    var pods = K.sub(d, 'rollout');
    [-24, 24].forEach(function (x) {
      var q = K.P(d0.top[0], d0.top[1], x, 0, 0), bx = K.box(pods, q[0], q[1], 32, 32, 30);
      K.topIcon(pods, 'pod', bx.top[0], bx.top[1], 0, 18);
    });
    K.label('deploy', [p[0] + 30, d0.top[1] - 34], [p[0] + 70, d0.top[1] - 90], 'r');
    return { viewBox: [1000, 640] };
  }
};
