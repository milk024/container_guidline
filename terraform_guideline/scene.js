/* Terraform 첫 화면 장면 — 노드 id는 data.js와 같아야 합니다.
   배치: Module 블록(뒤) · 구성 파일 종이 묶음(왼쪽 위) · 입력·출력 값 타일(왼쪽 앞)
         → Terraform CLI(가운데) → Provider 플러그(오른쪽) → 클라우드 · State 원통(오른쪽 앞) */
window.GUIDE_SCENE = {
  draw: function (K) {
    var sl = K.g(null, 'slab-deco');
    K.box(sl, 500, 380, 660, 380, 16);
    var tp = K.P(500, 364, 0, 175, 0);
    K.topText(sl, 'TERRAFORM', tp[0], tp[1], 0, 13, 'slab-tx');

    K.link(null, [[300, 300], [440, 345]], 'flowing');
    K.link(null, [[310, 430], [450, 385]], 'flowing');
    K.link(null, [[480, 245], [495, 315]], 'flowing');
    K.link(null, [[570, 340], [680, 305]], 'flowing');
    K.link(null, [[750, 270], [840, 215]], 'flowing');
    K.link(null, [[555, 395], [660, 450]], 'flowing');

    // 관리 대상 클라우드(장식)
    var cl = K.g(null, 'slab-deco');
    K.icon(cl, 'cloud', 870, 190, 40);

    // Module — 받침 위 블록 세 개(뒤)
    var md = K.part('modules');
    var mb = K.box(md, 470, 222, 130, 70, 10);
    [['rootmod', -38], ['childmod', 0], ['modsrc', 38]].forEach(function (o) {
      var p = K.P(mb.top[0], mb.top[1], o[1], 0, 0);
      K.box(K.sub(md, o[0]), p[0], p[1], 30, 30, o[0] === 'rootmod' ? 30 : 20);
    });
    K.topIcon(md, K.iconOf('modules'), mb.top[0] - 38, mb.top[1] - 19, 30, 20);
    K.label('modules', [470, 180], [600, 110], 'r');

    // 구성 파일 — 겹쳐 둔 .tf 종이
    var cf = K.part('config');
    [['meta', 0], ['datasrc', 10], ['resource', 20], ['hcl', 30]].forEach(function (o) {
      K.box(K.sub(cf, o[0]), 250, 300, 70, 92, 4, '', o[1]);
    });
    K.topIcon(cf, K.iconOf('config'), 250, 300, 34, 30);
    K.label('config', [240, 255], [120, 180], 'l');

    // Provider — 플러그 상자
    var pv = K.part('providers');
    var pb = K.box(pv, 720, 300, 70, 70, 12);
    var pr = K.P(pb.top[0], pb.top[1], -14, 0, 0);
    K.box(K.sub(pv, 'required'), pr[0], pr[1], 34, 34, 26);
    var pl = K.P(pb.top[0], pb.top[1], 22, 0, 0);
    K.box(K.sub(pv, 'lockfile'), pl[0], pl[1], 18, 34, 12);
    K.topIcon(pv, K.iconOf('providers'), pr[0], pr[1], 26, 22);
    K.label('providers', [740, 262], [870, 300], 'r');

    // Terraform CLI — 받침 위 init · plan · apply 단추
    var cli = K.part('cli');
    var cb = K.box(cli, 500, 362, 150, 84, 14);
    [['init', -46, 14], ['plan', 0, 20], ['apply', 46, 26]].forEach(function (o) {
      var p = K.P(cb.top[0], cb.top[1], o[1], 0, 0), b = K.box(K.sub(cli, o[0]), p[0], p[1], 34, 34, o[2]);
      K.topIcon(cli, K.iconOf(o[0]), b.top[0], b.top[1], 0, 20);
    });
    K.label('cli', [520, 395], [520, 570], 'r');

    // 입력·출력 값 — 판 위 타일 네 개
    var vl = K.part('values');
    var vb = K.box(vl, 250, 452, 170, 70, 8);
    [['variable', -60], ['tfvars', -20], ['locals', 20], ['output', 60]].forEach(function (o) {
      var p = K.P(vb.top[0], vb.top[1], o[1], 0, 0), t = K.box(K.sub(vl, o[0]), p[0], p[1], 28, 28, 12);
      K.topIcon(vl, K.iconOf(o[0]), t.top[0], t.top[1], 0, 16);
    });
    K.label('values', [220, 420], [100, 540], 'l');

    // State — 원격 Backend 받침 위 State 원통 + 잠금
    var st = K.part('state');
    K.box(K.sub(st, 'backend'), 700, 478, 120, 80, 8);
    var c = K.cyl(K.sub(st, 'tfstate'), 690, 466, 28, 46);
    K.box(K.sub(st, 'locking'), 742, 476, 22, 22, 18);
    K.topIcon(st, K.iconOf('state'), c.top[0], c.top[1], 0, 24);
    K.label('state', [710, 430], [860, 520], 'r');
    return { viewBox: [1000, 640] };
  }
};
