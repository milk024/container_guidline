/* Git Flow·커밋 학습 데이터 — 화면 로직(script.js)과 분리된 구조·설명 데이터
   - tree: 계층 구조(노드마다 1줄 설명 desc + 출처 src)
   - flows: 단계 흐름(node는 tree의 id)
   - terms: 용어(요약 1줄 + 비교 대상 정확히 1개)
   - sources: 공식 문서 출처 */
window.GUIDE_DATA = {
  meta: {
    id: 'gitflow',
    eyebrow: '협업·버전 관리',
    title: 'Git Flow 브랜치 전략과 커밋 규칙',
    subtitle: 'feature → develop → release → main으로 이어지는 브랜치 흐름과, 이력을 읽기 쉽게 만드는 커밋 메시지 규칙을 단계별로 따라갑니다.',
    checked: '2026-11-09'
  },

  sources: [
    { id: 'nvie', title: 'Vincent Driessen — A successful Git branching model (Git Flow 원문)', url: 'https://nvie.com/posts/a-successful-git-branching-model/', use: 'main·develop·feature·release·hotfix 규칙, --no-ff, 2020 회고' },
    { id: 'cc', title: 'Conventional Commits 1.0.0', url: 'https://www.conventionalcommits.org/en/v1.0.0/', use: 'type(scope): subject, body, footer, BREAKING CHANGE' },
    { id: 'semver', title: 'Semantic Versioning 2.0.0', url: 'https://semver.org/', use: 'MAJOR.MINOR.PATCH' },
    { id: 'git-branch', title: 'Git Reference — git-branch', url: 'https://git-scm.com/docs/git-branch', use: '브랜치 생성·삭제' },
    { id: 'git-switch', title: 'Git Reference — git-switch', url: 'https://git-scm.com/docs/git-switch', use: '브랜치 전환·생성(-c)' },
    { id: 'git-merge', title: 'Git Reference — git-merge', url: 'https://git-scm.com/docs/git-merge', use: '--no-ff, fast-forward, --squash' },
    { id: 'git-tag', title: 'Git Reference — git-tag', url: 'https://git-scm.com/docs/git-tag', use: 'Annotated tag(-a)' },
    { id: 'git-commit', title: 'Git Reference — git-commit', url: 'https://git-scm.com/docs/git-commit', use: '-m, --amend, --no-edit' },
    { id: 'git-rebase', title: 'Git Reference — git-rebase', url: 'https://git-scm.com/docs/git-rebase', use: 'rebase, rebase -i' },
    { id: 'git-revert', title: 'Git Reference — git-revert', url: 'https://git-scm.com/docs/git-revert', use: '되돌리는 새 커밋' },
    { id: 'git-log', title: 'Git Reference — git-log', url: 'https://git-scm.com/docs/git-log', use: '--oneline, --graph, --grep, --author, -p' },
    { id: 'book-workflows', title: 'Pro Git — Branching Workflows', url: 'https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows', use: '장기·토픽 브랜치' },
    { id: 'book-contrib', title: 'Pro Git — Contributing to a Project (Commit Guidelines)', url: 'https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project', use: '50자 요약, 명령형, 논리 단위 커밋' },
    { id: 'book-rewrite', title: 'Pro Git — Rewriting History', url: 'https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History', use: '--amend, rebase -i, push 전 정리' },
    { id: 'gh-flow', title: 'GitHub Docs — GitHub flow', url: 'https://docs.github.com/en/get-started/using-github/github-flow', use: 'main + 짧은 브랜치 + PR' },
    { id: 'gh-merges', title: 'GitHub Docs — Pull request merges', url: 'https://docs.github.com/en/pull-requests/reference/pull-request-merges', use: 'Merge commit·Squash·Rebase 병합' },
    { id: 'gh-pr', title: 'GitHub Docs — About pull requests', url: 'https://docs.github.com/en/pull-requests/reference/pull-requests', use: 'Pull Request 개념' },
    { id: 'gh-link', title: 'GitHub Docs — Linking a pull request to an issue', url: 'https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue', use: 'Closes #123 키워드' },
    { id: 'gitlab-strategies', title: 'GitLab Docs — Branching strategies', url: 'https://docs.gitlab.com/user/project/repository/branches/strategies/', use: '환경별 브랜치·장기 릴리스 브랜치' },
    { id: 'tbd', title: 'Trunk Based Development', url: 'https://trunkbaseddevelopment.com/', use: '단일 trunk에 최소 24시간마다 통합' },
    { id: 'tbd-flags', title: 'Trunk Based Development — Feature Flags', url: 'https://trunkbaseddevelopment.com/feature-flags/', use: '미완성 기능을 플래그로 숨기고 trunk에 병합' },
    { id: 'commitlint', title: 'commitlint — @commitlint/config-conventional', url: 'https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional', use: 'type 목록(build·chore·ci·docs·feat·fix·perf·refactor·revert·style·test), Conventional Commits 규약이 예로 드는 설정' }
  ],

  tree: [
    {
      id: 'branches', label: '브랜치 모델', en: 'Git Flow', src: ['nvie', 'book-workflows'],
      desc: '오래 유지하는 브랜치 2개와 목적별 보조 브랜치 3종으로 작업을 나눕니다.',
      ex: { lang: 'text', code: '브랜치           갈라지는 곳 → 합쳐지는 곳\nmain             (장기) 운영 배포본만 보관\ndevelop          main 에서 1회 생성 → (장기) 다음 릴리스 통합\nfeature/login    develop → develop\nrelease/1.2.0    develop → main + develop\nhotfix/1.2.1     main    → main + develop\nv1.2.0           main 병합 지점에 붙이는 Tag' },
      children: [
        { id: 'main', label: 'main', en: 'production branch', src: ['nvie'], desc: '항상 배포 가능한 상태만 담고, 커밋마다 릴리스 버전이 됩니다.',
          ex: { v: 'main', lang: 'bash', code: 'git switch main\ngit merge --no-ff release/1.2.0\ngit tag -a v1.2.0 -m "release v1.2.0"\ngit push origin main --tags' } },
        { id: 'develop', label: 'develop', en: 'integration branch', src: ['nvie', 'git-switch'], desc: '다음 릴리스에 들어갈 기능이 모이는 통합 브랜치입니다.',
          ex: { v: 'develop', lang: 'bash', code: 'git switch -c develop main      # 저장소마다 최초 1회\ngit push -u origin develop\n\ngit switch develop && git pull  # 작업 시작 전 최신화' } },
        { id: 'feature', label: 'feature/*', en: 'feature branch', src: ['nvie', 'git-switch', 'git-branch'], desc: 'develop에서 갈라져 기능 하나를 만들고 develop으로 돌아갑니다.',
          ex: { v: 'feature/login', lang: 'bash', code: 'git switch -c feature/login develop\n# … 커밋 …\ngit switch develop\ngit merge --no-ff feature/login\ngit branch -d feature/login' } },
        { id: 'release', label: 'release/*', en: 'release branch', src: ['nvie'], desc: 'develop에서 갈라져 버전 확정·버그 수정만 한 뒤 main·develop에 병합합니다.',
          ex: { v: 'release/1.2.0', lang: 'bash', code: 'git switch -c release/1.2.0 develop\n# 버전 번호 수정·버그 수정만 (새 기능 금지)\ngit switch main    && git merge --no-ff release/1.2.0\ngit tag -a v1.2.0 -m \"release v1.2.0\"\ngit switch develop && git merge --no-ff release/1.2.0\ngit branch -d release/1.2.0' } },
        { id: 'hotfix', label: 'hotfix/*', en: 'hotfix branch', src: ['nvie'], desc: '운영 버그를 main에서 바로 갈라 고치고 main·develop에 병합합니다.',
          ex: { v: 'hotfix/1.2.1', lang: 'bash', code: 'git switch -c hotfix/1.2.1 main\ngit commit -am "fix(payment): 결제 금액 반올림 오류 수정"\ngit switch main    && git merge --no-ff hotfix/1.2.1\ngit tag -a v1.2.1 -m "hotfix v1.2.1"\ngit switch develop && git merge --no-ff hotfix/1.2.1\ngit branch -d hotfix/1.2.1' } },
        { id: 'tag', label: 'Tag · SemVer', en: 'git tag', src: ['git-tag', 'semver'], desc: 'main 병합 지점에 v1.2.0 같은 MAJOR.MINOR.PATCH 이름을 붙입니다.',
          ex: { v: 'v1.2.0', lang: 'bash', code: 'git tag -a v1.2.0 -m "release v1.2.0"\ngit push origin main develop --tags\n\n# MAJOR.MINOR.PATCH\n# 2.0.0  호환이 깨지는 변경\n# 1.3.0  호환되는 기능 추가\n# 1.2.1  호환되는 버그 수정' } }
      ]
    },
    {
      id: 'integrate', label: '통합 방식', en: 'Merge', src: ['git-merge', 'gh-merges'],
      desc: '브랜치 작업을 대상 브랜치로 합치는 방법과 그 결과 이력의 모양입니다.',
      ex: { lang: 'text', code: '# PR #45 : feature/login → develop (리뷰 승인 + CI 통과)\n\n# ① --no-ff 병합 결과: 병합 커밋으로 기능 경계가 남음\n*   a1b2c3d Merge branch \'feature/login\' into develop\n|\\\n| * 9f8e7d6 feat(login): 로그인 폼 추가\n| * 5c4b3a2 feat(login): 세션 저장\n|/\n\n# ② Squash 병합 결과: PR 하나 = 커밋 하나\n* 7e6d5c4 feat(login): 로그인 기능 추가 (#45)\n\n# ③ git rebase develop 후 병합: 일직선 이력\n* 3c2b1a0 feat(login): 세션 저장\n* 2b1a0f9 feat(login): 로그인 폼 추가' },
      children: [
        { id: 'pr', label: 'Pull Request', en: 'PR', src: ['gh-pr'], desc: '병합 전에 변경을 보여주고 리뷰·CI 결과를 받는 요청입니다.',
          ex: { v: 'PR #45', lang: 'text', code: 'git push -u origin feature/login\n\n# GitHub에서 Pull Request 생성\nbase: develop  ←  compare: feature/login\n제목: feat(login): 로그인 기능 추가\n본문: 로그인 폼과 세션 저장을 추가합니다.\n      Closes #12' } },
        { id: 'noff', label: '--no-ff 병합', en: 'merge commit', src: ['git-merge', 'nvie'], desc: '항상 병합 커밋을 만들어 기능 단위가 이력에 묶여 남습니다.',
          ex: { v: "Merge branch 'feature/login'", lang: 'bash', code: "git switch develop\ngit merge --no-ff feature/login\n# → 새 커밋: Merge branch 'feature/login' into develop" } },
        { id: 'squash', label: 'Squash 병합', en: 'squash merge', src: ['gh-merges', 'git-merge'], desc: 'PR의 여러 커밋을 대상 브랜치에 커밋 하나로 합칩니다.',
          ex: { v: '로그인 기능 추가 (#45)', lang: 'bash', code: 'git switch develop\ngit merge --squash feature/login\ngit commit -m "feat(login): 로그인 기능 추가 (#45)"\n# GitHub의 Squash and merge 버튼도 같은 결과' } },
        { id: 'rebase', label: 'Rebase', en: 'git rebase', src: ['git-rebase'], desc: '내 커밋을 최신 기준 브랜치 위로 옮겨 다시 쌓습니다. 커밋 해시가 바뀝니다.',
          ex: { v: 'git rebase develop', lang: 'bash', code: 'git switch feature/login\ngit rebase develop\n# 충돌 시: 파일 수정 → git add <파일> → git rebase --continue\ngit push --force-with-lease   # 나만 쓰는 브랜치에서만' } }
      ]
    },
    {
      id: 'message', label: '커밋 메시지', en: 'Conventional Commits', src: ['cc', 'book-contrib'],
      desc: 'type(scope): subject / body / footer 형식으로 변경 의도를 기계도 읽게 씁니다.',
      ex: { lang: 'text', code: 'feat(auth): add OAuth2 login\n\nGoogle 계정으로 로그인할 수 있도록 OAuth2 인증 흐름을 추가합니다.\n기존 이메일 로그인은 그대로 유지합니다.\n\nCloses #123' },
      children: [
        { id: 'type', label: 'type', en: 'feat · fix …', src: ['cc', 'commitlint'], desc: '변경 종류입니다. feat는 MINOR, fix는 PATCH에 대응하고 나머지는 팀 규칙으로 씁니다.',
          ex: { v: 'feat', lang: 'text', code: 'feat:     새 기능                 → MINOR\nfix:      버그 수정               → PATCH\ndocs:     문서만 변경\nstyle:    공백·포맷 등 의미 없는 변경\nrefactor: 동작은 그대로, 구조 개선\nperf:     성능 개선\ntest:     테스트 추가·수정\nbuild:    빌드 시스템·의존성\nci:       CI 설정\nchore:    그 밖의 잡무\nrevert:   이전 커밋 되돌리기' },
          children: [
            { id: 't-feat', label: 'feat', en: 'feature', src: ['cc', 'semver'], desc: '새 기능을 추가합니다. SemVer MINOR에 대응합니다.', ex: { v: 'feat:', lang: 'text', code: 'feat(auth): add OAuth2 login' } },
            { id: 't-fix', label: 'fix', en: 'bug fix', src: ['cc', 'semver'], desc: '버그를 고칩니다. SemVer PATCH에 대응합니다.', ex: { v: 'fix:', lang: 'text', code: 'fix(payment): 결제 금액 반올림 오류 수정' } },
            { id: 't-docs', label: 'docs', en: 'documentation', src: ['commitlint'], desc: 'README·주석 등 문서만 바꿉니다.', ex: { v: 'docs:', lang: 'text', code: 'docs(readme): 로컬 실행 방법 추가' } },
            { id: 't-style', label: 'style', en: 'formatting', src: ['commitlint'], desc: '공백·세미콜론·포맷처럼 동작에 영향 없는 변경입니다.', ex: { v: 'style:', lang: 'text', code: 'style: prettier 포맷 적용' } },
            { id: 't-refactor', label: 'refactor', en: 'refactoring', src: ['commitlint'], desc: '기능·버그 변화 없이 코드 구조만 개선합니다.', ex: { v: 'refactor:', lang: 'text', code: 'refactor(user): 검증 로직을 UserValidator로 분리' } },
            { id: 't-perf', label: 'perf', en: 'performance', src: ['commitlint'], desc: '성능을 개선하는 변경입니다.', ex: { v: 'perf:', lang: 'text', code: 'perf(search): 검색 결과 캐시 추가' } },
            { id: 't-test', label: 'test', en: 'tests', src: ['commitlint'], desc: '테스트를 추가하거나 고칩니다.', ex: { v: 'test:', lang: 'text', code: 'test(auth): 토큰 만료 케이스 추가' } },
            { id: 't-build', label: 'build', en: 'build · deps', src: ['commitlint'], desc: '빌드 도구나 외부 의존성을 바꿉니다.', ex: { v: 'build:', lang: 'text', code: 'build(deps): axios 1.7.0으로 업그레이드' } },
            { id: 't-ci', label: 'ci', en: 'CI config', src: ['commitlint'], desc: 'CI 설정·스크립트를 바꿉니다.', ex: { v: 'ci:', lang: 'text', code: 'ci: GitHub Actions에 lint 단계 추가' } },
            { id: 't-chore', label: 'chore', en: 'chores', src: ['commitlint'], desc: '소스·테스트에 해당하지 않는 기타 작업입니다.', ex: { v: 'chore:', lang: 'text', code: 'chore: .gitignore에 .env 추가' } },
            { id: 't-revert', label: 'revert', en: 'revert', src: ['cc', 'commitlint'], desc: '이전 커밋을 되돌립니다. 되돌린 커밋 SHA를 Refs footer로 남깁니다.', ex: { v: 'revert:', lang: 'text', code: 'revert: OAuth2 로그인 임시 제거\n\nRefs: 1a2b3c4' } }
          ]
        },
        { id: 'scope', label: 'scope', en: '(auth)', src: ['cc'], desc: '괄호 안에 변경이 닿는 영역 이름을 선택적으로 적습니다.',
          ex: { v: '(auth)', lang: 'text', code: 'feat(auth): add OAuth2 login\nfix(payment): 결제 금액 반올림 오류 수정\ndocs(readme): 로컬 실행 방법 추가\nchore: .gitignore에 .env 추가     # scope는 생략 가능' } },
        { id: 'subject', label: 'subject', en: 'description', src: ['cc', 'book-contrib'], desc: '콜론·공백 뒤에 50자 안팎의 한 줄 요약을 명령형으로 씁니다.',
          ex: { v: 'add OAuth2 login', lang: 'text', code: '✔ feat(auth): add OAuth2 login      # 명령형, 짧게\n✘ feat(auth): Added OAuth2 login.   # 과거형·마침표\n✘ feat(auth): 수정함                 # 무엇을 바꿨는지 알 수 없음' } },
        { id: 'body', label: 'body', en: 'body', src: ['cc', 'book-contrib'], desc: '제목 다음 빈 줄 뒤에 무엇을 왜 바꿨는지 72자 안팎으로 줄바꿈해 씁니다.',
          ex: { v: 'Google 계정으로 로그인', lang: 'text', code: 'feat(auth): add OAuth2 login\n                               ← 빈 줄 1개 필수\nGoogle 계정으로 로그인할 수 있도록 OAuth2 인증 흐름을 추가합니다.\n기존 이메일 로그인은 그대로 유지합니다.' } },
        { id: 'footer', label: 'footer', en: 'BREAKING CHANGE · Closes', src: ['cc', 'gh-link'], desc: 'BREAKING CHANGE: 표시나 Closes #123 같은 이슈 연결을 적습니다.',
          ex: { v: 'Closes #123', lang: 'text', code: 'Closes #123\n\n# 호환이 깨질 때\nBREAKING CHANGE: PaymentResult.amount 타입이 float에서 Decimal로 변경됨\n# 또는 type 뒤에 ! 표시\nfeat(payment)!: 금액 타입을 Decimal로 변경' } },
        { id: 'atomic', label: '원자적 커밋', en: 'atomic commit', src: ['book-contrib'], desc: '논리적으로 하나인 변경만 한 커밋에 담아 되돌리기·리뷰가 쉽게 합니다.',
          ex: { v: 'git add -p', lang: 'bash', code: '# ✘ 여러 변경을 한 커밋에\ngit commit -am "로그인 추가, 버그 수정, 포맷 정리"\n\n# ✔ 논리 단위로 나눠 커밋\ngit add -p src/auth/          # 바뀐 부분만 골라 스테이징\ngit commit -m "feat(auth): add OAuth2 login"\ngit add src/payment/round.ts\ngit commit -m "fix(payment): 결제 금액 반올림 오류 수정"' } }
      ]
    },
    {
      id: 'history', label: '이력 관리', en: 'History', src: ['book-rewrite', 'git-log'],
      desc: '커밋을 찾고, push 전에 다듬고, push 후에는 안전하게 되돌립니다.',
      ex: { lang: 'bash', code: 'git log --oneline --graph      # 이력 모양 보기\ngit commit --amend --no-edit   # 직전 커밋 고치기   (push 전)\ngit rebase -i HEAD~3           # 여러 커밋 정리     (push 전)\ngit revert 1a2b3c4             # 공유된 커밋 되돌리기 (push 후)' },
      children: [
        { id: 'log', label: 'git log', en: 'git log', src: ['git-log'], desc: '--oneline·--graph로 모양을, --grep·--author로 조건 검색을 합니다.',
          ex: { v: 'git log --oneline', lang: 'text', code: '$ git log --oneline --graph\n* 4d3c2b1 (HEAD -> develop) fix(payment): 결제 금액 반올림 오류 수정\n*   a1b2c3d Merge branch \'feature/login\' into develop\n|\\\n| * 9f8e7d6 feat(login): 로그인 폼 추가\n|/\n* 0e1f2a3 docs(readme): 로컬 실행 방법 추가\n\n$ git log --grep "feat(auth)"   # 메시지로 검색\n$ git log --author="kim" -p     # 작성자 + 변경 내용' } },
        { id: 'amend', label: '--amend', en: 'git commit --amend', src: ['git-commit', 'book-rewrite'], desc: '직전 커밋의 메시지나 내용을 새 커밋으로 교체합니다. push 전에만 씁니다.',
          ex: { v: '--amend', lang: 'bash', code: 'git add forgotten.ts\ngit commit --amend --no-edit    # 메시지는 그대로, 내용만 추가\n\ngit commit --amend -m "feat(auth): add OAuth2 login"   # 메시지만 수정' } },
        { id: 'interactive', label: 'rebase -i', en: 'interactive rebase', src: ['git-rebase', 'book-rewrite'], desc: '여러 커밋을 합치거나(squash) 메시지를 고쳐(reword) 정리합니다.',
          ex: { v: 'rebase -i HEAD~3', lang: 'text', code: '$ git rebase -i HEAD~3\npick   9f8e7d6 feat(login): 로그인 폼 추가\nsquash 5c4b3a2 wip\nreword 3c2b1a0 fix typo\n# pick 유지 · squash 앞 커밋에 합치기 · reword 메시지 수정' } },
        { id: 'revert', label: 'git revert', en: 'git revert', src: ['git-revert'], desc: '기존 커밋을 지우지 않고 반대 변경을 담은 새 커밋을 만듭니다.',
          ex: { v: 'git revert 1a2b3c4', lang: 'text', code: '$ git revert 1a2b3c4\n[develop 4d3c2b1] Revert "feat(auth): add OAuth2 login"\n\n# 기존 커밋은 그대로 두고 반대 변경을 새 커밋으로 추가\n# → 이미 push한 공유 브랜치에서도 안전' } }
      ]
    },
    {
      id: 'alternatives', label: '대안 전략', en: 'Alternatives', src: ['nvie', 'gh-flow', 'gitlab-strategies', 'tbd'],
      desc: '지속 배포하는 서비스는 더 단순한 전략이 맞을 수 있습니다.',
      ex: { lang: 'text', code: 'Git Flow       main · develop · feature · release · hotfix\nGitHub flow    main + 짧은 브랜치 → PR → 병합 후 배포\n환경별 브랜치  main → test → UAT 로 릴리스 후보 승격\nTrunk-Based    trunk 하나에 최소 24시간마다 통합\nFeature Flag   미완성 기능은 꺼 둔 채로 병합' },
      children: [
        { id: 'githubflow', label: 'GitHub flow', en: 'GitHub flow', src: ['gh-flow'], desc: 'main 하나와 짧은 작업 브랜치, PR 리뷰 후 병합만으로 운영합니다.',
          ex: { v: 'GitHub flow', lang: 'bash', code: 'git switch -c add-oauth main\ngit commit -m "feat(auth): add OAuth2 login"\ngit push -u origin add-oauth\n# PR 생성 → 리뷰·CI → main에 병합 → 배포' } },
        { id: 'gitlabflow', label: '환경별 브랜치', en: 'Branch per environment', src: ['gitlab-strategies'], desc: '기능은 main으로 모으고, 릴리스 후보 커밋을 test·UAT 같은 환경 브랜치로 승격합니다.',
          ex: { v: 'main → test → UAT', lang: 'bash', code: '# 기능은 main에서 갈라져 main으로 병합\ngit switch test && git merge main   # v1.1 RC1 을 test 환경으로\ngit switch UAT  && git merge test   # 검증 통과 후 UAT 환경으로' } },
        { id: 'trunk', label: 'Trunk-Based', en: 'Trunk-Based Development', src: ['tbd'], desc: '모두가 trunk 한 곳에 작은 변경을 최소 하루 한 번 통합합니다.',
          ex: { v: '최소 24시간마다 통합', lang: 'bash', code: 'git switch main && git pull --rebase\ngit commit -m "feat(search): 검색 API 뼈대 추가"\ngit push origin main     # 작은 변경을 자주' } },
        { id: 'featureflag', label: 'Feature Flag', en: 'feature toggle', src: ['tbd-flags'], desc: '미완성 기능을 코드 분기로 꺼 둔 채 trunk에 병합해 긴 브랜치를 없앱니다.',
          ex: { v: '꺼 둔 채로 병합', lang: 'js', code: "if (flags.isEnabled('new-checkout')) {\n  renderNewCheckout();   // 완성 전까지 운영에서는 꺼 둠\n} else {\n  renderOldCheckout();\n}" } }
      ]
    }
  ],

  // 장면에서 각 항목을 나타내는 심볼: k8s-*/logo-* 는 공식 아이콘·로고(logos.js, 출처는 [출처] 서랍), 그 외는 엔진 script.js의 ICONS 이름
  icons: {
    "branches": "logo-git", "main": "star", "develop": "branch", "feature": "branch", "release": "flag", "hotfix": "bug",
    "tag": "tag", "integrate": "merge", "pr": "pr", "noff": "merge", "squash": "commit", "rebase": "history",
    "message": "chat", "type": "tag", "t-feat": "star", "t-fix": "bug", "t-docs": "file", "t-style": "brace",
    "t-refactor": "sync", "t-perf": "gauge", "t-test": "check", "t-build": "build", "t-ci": "workflow", "t-chore": "sliders",
    "t-revert": "undo", "scope": "scope", "subject": "chat", "body": "file", "footer": "flag", "atomic": "commit",
    "history": "logo-git", "log": "list", "amend": "commit", "interactive": "list", "revert": "undo", "alternatives": "route",
    "githubflow": "branch", "gitlabflow": "layers", "trunk": "commit", "featureflag": "toggle"
  },

  flows: [
    {
      id: 'feature', title: '기능 개발 흐름 (feature → develop)', src: ['nvie', 'git-switch', 'git-rebase', 'git-merge'],
      desc: '기능 하나를 별도 브랜치에서 만들고 develop에 합치기까지의 순서입니다.',
      steps: [
        { node: 'develop', text: 'git switch develop 후 git pull로 최신 상태를 받습니다.' },
        { node: 'feature', text: 'git switch -c feature/login 으로 develop에서 기능 브랜치를 만듭니다.' },
        { node: 'atomic', text: '작업은 논리 단위로 잘게 나눠 커밋합니다.' },
        { node: 'rebase', text: '병합 전 git rebase develop으로 최신 develop 위에 내 커밋을 다시 쌓습니다.' },
        { node: 'pr', text: 'push 후 develop 대상 Pull Request를 열어 리뷰·CI를 받습니다.' },
        { node: 'noff', text: 'git merge --no-ff feature/login 으로 병합 커밋을 남기고 브랜치를 삭제합니다.' }
      ]
    },
    {
      id: 'commitmsg', title: '커밋 메시지 작성 흐름', src: ['cc', 'book-contrib', 'gh-link', 'git-log'],
      desc: 'Conventional Commits 형식으로 한 커밋의 메시지를 채워 가는 순서입니다.',
      steps: [
        { node: 'type', text: '변경 종류를 고릅니다. 새 기능은 feat, 버그 수정은 fix, 문서는 docs 처럼 11가지 중 하나입니다.' },
        { node: 'scope', text: '영향 영역을 괄호로 붙입니다. 예: feat(auth)' },
        { node: 'subject', text: '콜론 뒤에 명령형 한 줄 요약을 씁니다. 예: feat(auth): add OAuth2 login' },
        { node: 'body', text: '빈 줄 다음 본문에 무엇을 왜 바꿨는지 적습니다.' },
        { node: 'footer', text: '마지막에 Closes #123, 호환이 깨지면 BREAKING CHANGE: 를 적습니다.' },
        { node: 'log', text: '이렇게 쓰면 git log --grep "feat(auth)"로 바로 찾을 수 있습니다.' }
      ]
    },
    {
      id: 'release', title: '릴리스 흐름 (develop → release → main)', src: ['nvie', 'git-tag', 'semver'],
      desc: '다음 버전에 들어갈 기능이 모인 develop을 운영 버전으로 내보내는 순서입니다.',
      steps: [
        { node: 'develop', text: '이번 릴리스에 넣을 기능이 develop에 모두 병합됐습니다.' },
        { node: 'release', text: 'git switch -c release/1.2.0 develop 으로 릴리스 브랜치를 만들고 버전 번호·버그 수정만 합니다.' },
        { node: 'main', text: 'release를 main에 --no-ff로 병합하고, 같은 내용을 develop에도 병합합니다.' },
        { node: 'tag', text: 'git tag -a v1.2.0 후 git push origin main develop --tags 로 올립니다.' }
      ]
    },
    {
      id: 'hotfix', title: '긴급 수정 흐름 (main → hotfix)', src: ['nvie', 'semver', 'git-tag'],
      desc: '운영 중인 버전의 버그를 develop을 거치지 않고 바로 고치는 순서입니다.',
      steps: [
        { node: 'main', text: '운영(main, v1.2.0)에서 급한 버그가 발견됩니다.' },
        { node: 'hotfix', text: 'git switch -c hotfix/1.2.1 main 으로 갈라 수정하고 fix: 커밋을 남깁니다.' },
        { node: 'tag', text: 'main에 병합하고 PATCH만 올려 v1.2.1 Tag를 붙입니다.' },
        { node: 'develop', text: '같은 수정을 develop에도 병합해 다음 릴리스에서 버그가 되살아나지 않게 합니다.' }
      ]
    },
    {
      id: 'cleanup', title: '이력 다듬기·되돌리기 흐름', src: ['book-rewrite', 'git-commit', 'git-rebase', 'git-log', 'git-revert'],
      desc: 'push 전에는 이력을 고치고, push 후에는 새 커밋으로 되돌리는 구분입니다.',
      steps: [
        { node: 'amend', text: '방금 커밋에 파일을 빠뜨렸다면 git commit --amend --no-edit 으로 직전 커밋을 교체합니다.' },
        { node: 'interactive', text: 'push 전 git rebase -i HEAD~5 로 잔 커밋을 squash하고 메시지를 reword 합니다.' },
        { node: 'log', text: 'git log --oneline --graph 로 정리된 모양을 확인한 뒤 push 합니다.' },
        { node: 'revert', text: '이미 공유된 커밋은 고치지 말고 git revert <커밋>으로 되돌리는 커밋을 추가합니다.' }
      ]
    },
    {
      id: 'together', title: 'Git Flow + 커밋 규칙 함께 쓰기', src: ['nvie', 'cc', 'gh-merges', 'semver'],
      desc: '브랜치마다 커밋 규칙이 어떻게 이어져 버전 번호까지 결정되는지 보는 순서입니다.',
      steps: [
        { node: 'feature', text: 'feature/login 브랜치에서 작업합니다.' },
        { node: 't-feat', text: '커밋은 feat(login): 로그인 폼 추가, feat(login): 세션 저장 처럼 type을 붙여 남깁니다.' },
        { node: 'pr', text: 'develop 대상 PR #45를 열어 리뷰와 CI를 받습니다.' },
        { node: 'squash', text: 'Squash 병합하면 develop에는 feat(login): 로그인 기능 추가 (#45) 한 커밋만 남습니다.' },
        { node: 'release', text: 'release/1.3.0 을 만듭니다. 마지막 릴리스 이후 feat가 있으니 MINOR를 올립니다.' },
        { node: 'tag', text: 'main 병합 후 v1.3.0 Tag를 붙입니다. BREAKING CHANGE가 있었다면 v2.0.0 이 됩니다.' }
      ]
    },
    {
      id: 'choose', title: '대안 전략 비교 흐름', src: ['nvie', 'gh-flow', 'gh-merges', 'gitlab-strategies', 'tbd'],
      desc: 'Git Flow가 무겁게 느껴질 때 고려하는 더 단순한 전략들입니다.',
      steps: [
        { node: 'githubflow', text: '지속 배포하는 웹 서비스라면 main + 짧은 브랜치 + PR만 쓰는 GitHub flow를 검토합니다(Git Flow 원문 2020 회고도 같은 권고).' },
        { node: 'squash', text: 'PR을 Squash 병합하면 PR 하나가 main의 커밋 하나가 되어 이력이 단순해집니다.' },
        { node: 'gitlabflow', text: '배포 환경이나 지원 버전이 여럿이면 환경·버전별 장기 브랜치를 추가합니다.' },
        { node: 'trunk', text: '통합을 더 자주 하려면 모두 trunk에 작은 변경을 바로 합치는 Trunk-Based로 갑니다.' }
      ]
    }
  ],

  terms: [
    { term: 'Git Flow', summary: 'main·develop 두 장기 브랜치와 feature·release·hotfix 보조 브랜치로 나누는 전략', vs: { term: 'GitHub flow', diff: 'Git Flow는 릴리스 단위로 관리하고, GitHub flow는 main 하나에서 PR마다 바로 배포' }, src: ['nvie', 'gh-flow'], nodes: ['branches'] },
    { term: 'main', summary: '운영에 배포된 버전만 담는 브랜치', vs: { term: 'develop', diff: 'main은 배포된 결과이고, develop은 다음 릴리스를 모으는 중인 상태' }, src: ['nvie'], nodes: ['main'] },
    { term: 'feature 브랜치', summary: 'develop에서 갈라져 기능 하나를 만드는 단기 브랜치', vs: { term: 'hotfix 브랜치', diff: 'feature는 develop에서 시작하고, hotfix는 운영 버그 때문에 main에서 시작' }, src: ['nvie'], nodes: ['feature'] },
    { term: 'release 브랜치', summary: '버전 확정과 막바지 수정만 하는 브랜치', vs: { term: 'develop', diff: 'release에는 새 기능을 넣지 않고, develop은 계속 다음 기능을 받음' }, src: ['nvie'], nodes: ['release'] },
    { term: '--no-ff', summary: 'fast-forward가 가능해도 병합 커밋을 만드는 옵션', vs: { term: 'fast-forward', diff: 'fast-forward는 포인터만 옮겨 기능 경계가 사라지고, --no-ff는 병합 커밋으로 경계를 남김' }, src: ['git-merge', 'nvie'], nodes: ['noff'] },
    { term: 'Squash merge', summary: 'PR의 여러 커밋을 커밋 하나로 합쳐 병합', vs: { term: 'Merge commit', diff: 'Squash는 개별 커밋을 없애 이력이 짧고, Merge commit은 모든 커밋과 병합 지점을 보존' }, src: ['gh-merges'], nodes: ['squash'] },
    { term: 'Rebase', summary: '내 커밋을 다른 기준 위에 새로 다시 쌓는 명령', vs: { term: 'Merge', diff: 'Rebase는 일직선 이력을 만들며 커밋 해시가 바뀌고, Merge는 기존 커밋을 그대로 두고 합침' }, src: ['git-rebase', 'git-merge'], nodes: ['rebase'] },
    { term: 'git revert', summary: '지정한 커밋의 반대 변경을 새 커밋으로 추가', vs: { term: 'git reset', diff: 'revert는 이력을 보존해 공유 브랜치에 안전하고, reset은 브랜치 포인터를 뒤로 옮겨 이력을 지움' }, src: ['git-revert', 'book-rewrite'], nodes: ['revert'] },
    { term: '--amend', summary: '직전 커밋을 수정한 새 커밋으로 교체', vs: { term: 'rebase -i', diff: '--amend는 마지막 커밋 하나만, rebase -i는 여러 커밋을 골라 합치기·순서 변경·메시지 수정' }, src: ['git-commit', 'book-rewrite'], nodes: ['amend'] },
    { term: 'Annotated tag', summary: '작성자·날짜·메시지를 함께 저장하는 태그(-a)', vs: { term: 'Lightweight tag', diff: 'Annotated는 별도 객체로 정보를 남기고, Lightweight는 커밋을 가리키는 이름뿐' }, src: ['git-tag'], nodes: ['tag'] },
    { term: 'SemVer', summary: 'MAJOR.MINOR.PATCH로 호환성 변화를 표현하는 버전 규칙', vs: { term: 'Pre-release(-rc.1)', diff: '정식 버전은 공개 API 호환 규칙을 따르고, -rc.1 같은 pre-release는 불안정할 수 있음을 표시' }, src: ['semver'], nodes: ['tag'] },
    { term: 'Conventional Commits', summary: 'type(scope): subject 형식의 커밋 메시지 규약', vs: { term: '자유 형식 메시지', diff: '규약을 쓰면 CHANGELOG·버전 결정을 자동화할 수 있고, 자유 형식은 사람만 읽을 수 있음' }, src: ['cc'], nodes: ['message'] },
    { term: 'feat', summary: '새 기능을 추가하는 커밋 type(SemVer MINOR)', vs: { term: 'fix', diff: 'feat는 기능 추가로 MINOR, fix는 버그 수정으로 PATCH에 대응' }, src: ['cc', 'semver'], nodes: ['t-feat', 't-fix'] },
    { term: 'refactor', summary: '동작은 그대로 두고 코드 구조만 바꾸는 type', vs: { term: 'style', diff: 'refactor는 코드 구조를 바꾸고, style은 공백·포맷 등 의미 없는 변경만' }, src: ['commitlint'], nodes: ['t-refactor', 't-style'] },
    { term: 'BREAKING CHANGE', summary: '호환이 깨지는 변경을 알리는 footer(또는 type 뒤 !)', vs: { term: 'feat', diff: 'feat는 MINOR만 올리고, BREAKING CHANGE가 붙으면 type과 상관없이 MAJOR를 올림' }, src: ['cc', 'semver'], nodes: ['footer'] },
    { term: 'Closes #123', summary: 'PR이 병합되면 해당 이슈를 자동으로 닫는 키워드', vs: { term: '#123 단순 언급', diff: 'Closes 키워드는 병합 시 이슈를 닫고, 키워드 없는 #123은 링크만 걸림' }, src: ['gh-link'], nodes: ['footer'] },
    { term: 'Feature Flag', summary: '미완성 기능을 설정값으로 꺼 둔 채 코드를 병합하는 기법', vs: { term: '장기 feature 브랜치', diff: 'Feature Flag는 코드를 trunk에 일찍 합치고 노출만 막으며, 장기 브랜치는 완성될 때까지 코드를 따로 둠' }, src: ['tbd-flags'], nodes: ['featureflag'] },
    { term: 'Trunk-Based Development', summary: '모두가 trunk 하나에 작은 변경을 자주 합치는 방식', vs: { term: 'Git Flow', diff: 'Trunk-Based는 장기 브랜치 없이 통합을 자주 하고, Git Flow는 develop·release 같은 장기 브랜치를 유지' }, src: ['tbd', 'nvie'], nodes: ['trunk'] }
  ]
};
