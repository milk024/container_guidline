/* Docker 첫 화면 장면 — 엔진(script.js)의 도구(K)로 그립니다. 노드 id는 data.js와 같아야 합니다.
   배치: 떠 있는 Registry(위) · Dockerfile(뒤 왼쪽) · Image 레이어 더미(뒤 오른쪽) · Docker Engine(가운데) · Container 3개(앞 오른쪽) */
window.GUIDE_SCENE = {
  draw: function (K) {
    var host = K.g(null, 'slab-deco');
    K.box(host, 500, 384, 560, 400, 18);
    var tp = K.P(500, 366, -40, 185, 0);
    K.topText(host, 'DOCKER HOST', tp[0], tp[1], 0, 13, 'slab-tx');

    // 연결선(뒤에 깔림): Image → Registry → Engine, Engine → Container
    K.link(null, [[650, 250], [650, 150], [560, 112]], 'flowing');
    K.link(null, [[440, 112], [400, 150], [430, 300]], 'flowing');
    K.link(null, [[540, 360], [610, 420]], 'flowing');
    K.link(null, [[330, 250], [430, 320]], 'flowing');

    // Registry — 떠 있는 저장소
    var rg = K.part('registryRoot');
    K.box(rg, 500, 118, 150, 96, 8, 'ghost');
    var r1 = K.box(K.sub(rg, 'hub'), 500, 112, 120, 76, 20);
    K.topIcon(rg, K.iconOf('registryRoot'), r1.top[0], r1.top[1], 0, 40);
    K.label('registryRoot', [500, 80], [700, 64], 'r');

    // Dockerfile — 겹친 종이
    var df = K.part('dockerfile');
    K.box(df, 310, 262, 104, 76, 6);
    K.box(df, 310, 256, 96, 70, 6, '', 0);
    var d1 = K.box(df, 310, 250, 88, 64, 6);
    K.topIcon(df, K.iconOf('dockerfile'), d1.top[0], d1.top[1], 0, 34);
    K.label('dockerfile', [270, 236], [150, 200], 'l');

    // Image — 쌓인 레이어(읽기 전용)
    var im = K.part('images'), ly = K.sub(im, 'layer');
    K.box(ly, 660, 290, 104, 104, 10);
    K.box(ly, 660, 276, 104, 104, 10);
    var i3 = K.box(ly, 660, 262, 104, 104, 10);
    K.topIcon(im, K.iconOf('images'), i3.top[0], i3.top[1], 0, 40);
    K.label('images', [700, 230], [860, 190], 'r');

    // Docker Engine — 받침 위의 본체
    var en = K.part('engine');
    K.box(en, 480, 372, 150, 150, 12);
    var e1 = K.box(K.sub(en, 'daemon'), 480, 360, 106, 106, 46);
    K.topIcon(en, K.iconOf('engine'), e1.top[0], e1.top[1], 0, 54);
    K.label('engine', [430, 300], [170, 330], 'l');

    // Container — 이미지로 만든 실행 단위 3개
    var ct = K.part('containers');
    [-70, 0, 70].forEach(function (x) {
      var p = K.P(660, 470, x, 0, 0), c = K.box(ct, p[0], p[1], 52, 52, 50);
      K.topIcon(ct, K.iconOf('containers'), c.top[0], c.top[1], 0, 26);
    });
    K.label('containers', [740, 470], [880, 450], 'r');
    return { viewBox: [1000, 640] };
  }
};
