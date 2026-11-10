/* CI/CD 학습 데이터 — 화면 로직(script.js)과 분리된 구조·설명 데이터 */
window.GUIDE_DATA = {
  meta: {
    id: 'cicd',
    eyebrow: '지속적 통합·배포',
    title: 'CI/CD 파이프라인 구조와 흐름',
    subtitle: '코드 Push가 Build·Test·Package를 거쳐 Kubernetes에 Deploy되기까지의 단계를 따라갑니다.',
    checked: '2026-11-09'
  },

  sources: [
    { id: 'gitea-actions', title: 'Gitea Docs — Gitea Actions Overview', url: 'https://docs.gitea.com/usage/actions/overview', use: 'Gitea Actions' },
    { id: 'act-runner', title: 'Gitea Docs — Gitea Runner (act_runner)', url: 'https://docs.gitea.com/runner/', use: 'Runner' },
    { id: 'gitea-webhooks', title: 'Gitea Docs — Webhooks', url: 'https://docs.gitea.com/usage/repository/webhooks/', use: 'Trigger·Webhook' },
    { id: 'gitea-registry', title: 'Gitea Docs — Container Registry', url: 'https://docs.gitea.com/usage/packages/container', use: 'Gitea Registry' },
    { id: 'gh-workflow', title: 'GitHub Docs — Workflow syntax for GitHub Actions', url: 'https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax', use: 'Workflow·Job·Step (Gitea Actions가 호환)' },
    { id: 'gh-ci', title: 'GitHub Docs — Continuous integration', url: 'https://docs.github.com/en/actions/get-started/continuous-integration', use: 'CI 정의' },
    { id: 'gh-cd', title: 'GitHub Docs — Continuous deployment', url: 'https://docs.github.com/en/actions/get-started/continuous-deployment', use: 'CD 정의' },
    { id: 'git', title: 'Git Documentation — git-push', url: 'https://git-scm.com/docs/git-push', use: 'Push' },
    { id: 'jenkins-pipeline', title: 'Jenkins User Handbook — Pipeline', url: 'https://www.jenkins.io/doc/book/pipeline/', use: 'Pipeline·Stage·Jenkinsfile' },
    { id: 'jenkins-tests', title: 'Jenkins Docs — Recording tests and artifacts', url: 'https://www.jenkins.io/doc/pipeline/tour/tests-and-artifacts/', use: 'Test 결과·Artifact' },
    { id: 'kaniko', title: 'GoogleContainerTools/kaniko (GitHub)', url: 'https://github.com/GoogleContainerTools/kaniko', use: 'Daemon 없는 이미지 빌드 (저장소는 2025-06 이후 archived 상태)' },
    { id: 'docker-build', title: 'Docker Docs — Build overview', url: 'https://docs.docker.com/build/concepts/overview/', use: '이미지 빌드' },
    { id: 'dind', title: 'Docker Hub — docker Official Image (dind 태그)', url: 'https://hub.docker.com/_/docker', use: 'DinD' },
    { id: 'harbor', title: 'Harbor Docs', url: 'https://goharbor.io/docs/', use: 'Harbor Registry' },
    { id: 'harbor-robot', title: 'Harbor Docs — Create Robot Accounts', url: 'https://goharbor.io/docs/main/working-with-projects/project-configuration/create-robot-accounts/', use: 'Robot account' },
    { id: 'harbor-scan', title: 'Harbor Docs — Vulnerability Scanning', url: 'https://goharbor.io/docs/main/administration/vulnerability-scanning/', use: '이미지 취약점 스캔' },
    { id: 'pull-secret', title: 'Kubernetes Docs — Pull an Image from a Private Registry', url: 'https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/', use: 'imagePullSecret' },
    { id: 'k8s-images', title: 'Kubernetes Docs — Images (tag·digest·pull policy)', url: 'https://kubernetes.io/docs/concepts/containers/images/', use: 'Tag 전략' },
    { id: 'rolling', title: 'Kubernetes Docs — Deployments (Rolling update·Rollback)', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/', use: 'Rolling update' },
    { id: 'helm-using', title: 'Helm Docs — Using Helm (Chart·Release·Repository)', url: 'https://helm.sh/docs/intro/using_helm/', use: 'Helm 3대 개념' },
    { id: 'helm-values', title: 'Helm Docs — Values Files', url: 'https://helm.sh/docs/chart_template_guide/values_files/', use: 'values.yaml' },
    { id: 'helm-upgrade', title: 'Helm Docs — helm upgrade', url: 'https://helm.sh/docs/helm/helm_upgrade/', use: 'helm upgrade' },
    { id: 'helm-rollback', title: 'Helm Docs — helm rollback', url: 'https://helm.sh/docs/helm/helm_rollback/', use: 'Rollback' },
    { id: 'helm-lint', title: 'Helm Docs — helm lint', url: 'https://helm.sh/docs/helm/helm_lint/', use: 'Chart 검사' },
    { id: 'argocd', title: 'Argo CD Docs — Overview', url: 'https://argo-cd.readthedocs.io/en/stable/', use: 'GitOps·Pull 방식' },
    { id: 'argocd-concepts', title: 'Argo CD Docs — Core Concepts', url: 'https://argo-cd.readthedocs.io/en/stable/core_concepts/', use: 'Application·Sync·OutOfSync' },
    { id: 'argocd-sync', title: 'Argo CD Docs — Automated Sync Policy', url: 'https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/', use: 'Auto sync·Self heal' },
    { id: 'jenkins-syntax', title: 'Jenkins User Handbook — Pipeline Syntax', url: 'https://www.jenkins.io/doc/book/pipeline/syntax/', use: 'agent·stage·steps·post·credentials()' },
    { id: 'jenkins-creds', title: 'Jenkins User Handbook — Using credentials', url: 'https://www.jenkins.io/doc/book/using/using-credentials/', use: 'Credentials' },
    { id: 'jenkins-k8s', title: 'Jenkins Plugins — Kubernetes plugin', url: 'https://plugins.jenkins.io/kubernetes/', use: 'Kubernetes agent Pod' },
    { id: 'gitea-secrets', title: 'Gitea Docs — Secrets', url: 'https://docs.gitea.com/usage/actions/secrets', use: 'Actions secrets' },
    { id: 'argocd-app', title: 'Argo CD Docs — Application Specification', url: 'https://argo-cd.readthedocs.io/en/stable/user-guide/application-specification/', use: 'Application source·destination' },
    { id: 'argocd-health', title: 'Argo CD Docs — Resource Health', url: 'https://argo-cd.readthedocs.io/en/stable/operator-manual/health/', use: 'Health 상태' },
    { id: 'argocd-waves', title: 'Argo CD Docs — Sync Phases and Waves', url: 'https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/', use: 'PreSync·sync-wave' },
    { id: 'argocd-appset', title: 'Argo CD Docs — ApplicationSet', url: 'https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/', use: 'ApplicationSet' },
    { id: 'argocd-bootstrap', title: 'Argo CD Docs — Cluster Bootstrapping', url: 'https://argo-cd.readthedocs.io/en/stable/operator-manual/cluster-bootstrapping/', use: 'App of Apps' },
    { id: 'helm-charts', title: 'Helm Docs — Charts', url: 'https://helm.sh/docs/topics/charts/', use: 'Chart 구조·templates' },
    { id: 'helm-hooks', title: 'Helm Docs — Chart Hooks', url: 'https://helm.sh/docs/topics/charts_hooks/', use: 'pre-upgrade hook' },
    { id: 'helm-history', title: 'Helm Docs — helm history', url: 'https://helm.sh/docs/helm/helm_history/', use: 'Revision' },
    { id: 'harbor-project', title: 'Harbor Docs — Create Projects', url: 'https://goharbor.io/docs/main/working-with-projects/create-projects/', use: 'Project Public·Private' },
    { id: 'harbor-retention', title: 'Harbor Docs — Create Tag Retention Rules', url: 'https://goharbor.io/docs/main/working-with-projects/working-with-images/create-tag-retention-rules/', use: 'Tag retention' },
    { id: 'harbor-immutable', title: 'Harbor Docs — Create Tag Immutability Rules', url: 'https://goharbor.io/docs/main/working-with-projects/working-with-images/create-tag-immutability-rules/', use: 'Tag immutability' },
    { id: 'harbor-replication', title: 'Harbor Docs — Creating a Replication Rule', url: 'https://goharbor.io/docs/main/administration/configuring-replication/create-replication-rules/', use: 'Push·Pull-based replication' },
    { id: 'harbor-gc', title: 'Harbor Docs — Garbage Collection', url: 'https://goharbor.io/docs/main/administration/garbage-collection/', use: 'GC' },
    { id: 'harbor-projconf', title: 'Harbor Docs — Project Configuration', url: 'https://goharbor.io/docs/main/working-with-projects/project-configuration/', use: '자동 스캔·취약 이미지 차단' }
  ],

  internalRefs: [
    'Notion — 학교 사업(Infra): 현재 Gitea Actions + act_runner(DinD) → Gitea Registry → helm upgrade(Push), 목표 Jenkins + Kaniko → Harbor → ArgoCD(GitOps)',
    'Notion — Container Tech'
  ],
  internalNote: '내부 자료는 학교 클러스터의 현재·목표 구성을 흐름으로 고르는 데만 사용했고, 설명 문장은 위 공식 문서를 기준으로 작성했습니다.',

  tree: [
    { id: "pipeline", label: "CI/CD 파이프라인", en: "Pipeline", src: ["gh-ci", "gh-cd", "jenkins-pipeline"],
      desc: "코드 변경을 자동으로 빌드·테스트·패키징·배포하는 단계들의 연결입니다.",
      ex: { v: "git push → Sync", lang: "text", code: "git push (3f9a2c1)\n → Source  : on: push 조건으로 파이프라인 시작\n → Build   : docker build -t shop-web:3f9a2c1 .\n → Test    : npm test · helm lint · 취약점 스캔\n → Package : harbor.school.local/shop/shop-web:3f9a2c1\n → Deploy  : Argo CD Sync (또는 helm upgrade)" },
      children: [
        { id: "source", label: "Source", en: "소스 관리", src: ["git", "gitea-webhooks"],
          desc: "코드가 저장되고, 변경이 생기면 파이프라인을 시작시키는 출발점입니다.",
          ex: { v: "on: push", lang: "bash", code: "$ git commit -m \"feat(cart): add coupon\"\n$ git push origin main\nTo https://gitea.school.local/school/shop-web.git\n   8b1d0e4..3f9a2c1  main -> main\n# .gitea/workflows/ci.yaml\non:\n  push:\n    branches: [main]" },
          children: [
            { id: "repo", label: "Git Repository", en: "App repo (Gitea)", src: ["git"],
              desc: "애플리케이션 코드와 Dockerfile, 파이프라인 정의가 함께 들어 있는 저장소입니다.",
              ex: { v: "school/shop-web.git", lang: "text", code: "shop-web/\n├─ src/\n├─ Dockerfile\n├─ .gitea/workflows/ci.yaml   # Gitea Actions (현재)\n├─ Jenkinsfile                 # Jenkins (목표)\n└─ chart/                      # Helm Chart (Push 방식 배포용)" }
            },
            { id: "push", label: "Commit · Push", en: "git push", src: ["git"],
              desc: "개발자가 변경을 커밋해 원격 저장소로 올리는 동작입니다.",
              ex: { v: "git push origin main", lang: "bash", code: "$ git push origin main\nTo https://gitea.school.local/school/shop-web.git\n   8b1d0e4..3f9a2c1  main -> main" }
            },
            { id: "trigger", label: "Trigger", en: "on: push / Webhook", src: ["gh-workflow", "gitea-webhooks"],
              desc: "push·pull request 같은 이벤트가 생기면 파이프라인 실행을 시작시키는 조건입니다.",
              ex: { v: "branches: [main]", lang: "yaml", code: "on:\n  push:\n    branches: [main]   # main에 push될 때\n  pull_request:        # PR이 열리거나 갱신될 때\n# Jenkins는 Gitea가 보내는 Webhook을 받아 시작" }
            }
          ]
        },
        { id: "build", label: "Build", en: "빌드", src: ["gitea-actions", "docker-build"],
          desc: "Runner가 코드를 받아 실행 가능한 결과물(컨테이너 이미지)로 만드는 단계입니다.",
          ex: { v: "docker build", lang: "text", code: "workflow : .gitea/workflows/ci.yaml  (목표: Jenkinsfile)\nrunner   : act_runner 가 Job을 받음  (목표: Jenkins agent Pod)\nimage    : docker build -t harbor.school.local/shop/shop-web:3f9a2c1 ." },
          children: [
            { id: "workflow", label: "Pipeline 정의", en: "Workflow / Jenkinsfile", src: ["gh-workflow", "jenkins-pipeline"],
              desc: "Job·Step(또는 Stage)을 YAML이나 Jenkinsfile로 코드처럼 저장소에 적어 둔 실행 순서입니다.",
              ex: { v: ".gitea/workflows/ci.yaml", lang: "text", code: "# 같은 순서를 두 가지 형식 중 하나로 정의\n.gitea/workflows/ci.yaml   jobs: → build: → steps: [...]\nJenkinsfile                pipeline { stages { stage('Build') { ... } } }" },
              children: [
                { id: "gha", label: "Gitea Actions workflow", en: ".gitea/workflows/*.yaml", src: ["gitea-actions", "gh-workflow"],
                  desc: "GitHub Actions와 호환되는 YAML로 Job·Step을 정의하며, 저장소의 .gitea/workflows/ 아래에 둡니다.",
                  ex: { v: "jobs:", lang: "yaml", code: "name: ci\non: { push: { branches: [main] } }\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci && npm test\n      - run: echo \"${{ secrets.REGISTRY_PASSWORD }}\" | docker login harbor.school.local -u 'robot$shop+ci' --password-stdin\n      - run: docker build -t harbor.school.local/shop/shop-web:${{ github.sha }} ." },
                  children: [
                    { id: "jobstep", label: "Job · Step", en: "jobs / steps", src: ["gh-workflow"],
                      desc: "Job은 Runner 하나에서 실행되는 작업 묶음이고, Step은 그 안에서 위에서부터 차례로 실행되는 명령입니다.",
                      ex: { v: "steps:", lang: "yaml", code: "jobs:\n  test:                  # Job 1: Runner 하나에서 실행\n    runs-on: ubuntu-latest\n    steps:               # Step: 위에서부터 차례로\n      - uses: actions/checkout@v4\n      - run: npm test\n  build:\n    needs: test          # test Job이 성공해야 시작\n    runs-on: ubuntu-latest\n    steps: [ ... ]" }
                    },
                    { id: "secrets", label: "Secrets", en: "secrets context", src: ["gitea-secrets"],
                      desc: "비밀번호·토큰을 저장소(또는 조직) 설정에 저장해 두고 워크플로에서 ${{ secrets.이름 }}으로 꺼내 씁니다.",
                      ex: { v: "secrets.REGISTRY_PASSWORD", lang: "yaml", code: "# 저장소 Settings → Actions → Secrets 에 REGISTRY_PASSWORD 등록\n- run: |\n    echo \"${{ secrets.REGISTRY_PASSWORD }}\" | \\\n      docker login harbor.school.local -u 'robot$shop+ci' --password-stdin\n# 같은 이름이면 더 좁은 범위(저장소)의 값이 우선" }
                    }
                  ]
                },
                { id: "jenkinsfile", label: "Jenkinsfile", en: "Declarative Pipeline", src: ["jenkins-syntax", "jenkins-pipeline"],
                  desc: "pipeline { } 블록 안에 agent·stages·post를 적어 Jenkins 파이프라인을 코드로 저장한 파일입니다.",
                  ex: { v: "Jenkinsfile", lang: "groovy", code: "pipeline {\n  agent { kubernetes { yamlFile 'ci-pod.yaml' } }\n  environment {\n    HARBOR = credentials('harbor-robot')\n  }\n  stages {\n    stage('Test')  { steps { sh 'npm ci && npm test' } }\n    stage('Build') { steps { container('kaniko') { sh '/kaniko/executor --destination=harbor.school.local/shop/shop-web:${GIT_COMMIT}' } } }\n  }\n  post {\n    always  { junit 'reports/*.xml' }\n    failure { echo '빌드 실패' }\n  }\n}" },
                  children: [
                    { id: "jstage", label: "Stage · Step", en: "stage / steps", src: ["jenkins-syntax"],
                      desc: "Stage는 화면에 표시되는 큰 단계(Test·Build 등)이고, steps 안의 Step이 실제로 실행되는 명령입니다.",
                      ex: { v: "stage('Test')", lang: "groovy", code: "stages {\n  stage('Test') {\n    steps {\n      sh 'npm ci'\n      sh 'npm test'\n    }\n  }\n  stage('Build') { steps { ... } }\n  stage('Push')  { steps { ... } }\n}" }
                    },
                    { id: "jpost", label: "post", en: "post conditions", src: ["jenkins-syntax"],
                      desc: "파이프라인이나 stage가 끝난 뒤 결과(always·success·failure·unstable 등)에 따라 실행할 단계를 정합니다.",
                      ex: { v: "post {", lang: "groovy", code: "post {\n  always   { junit 'reports/*.xml' }   // 결과와 관계없이 항상\n  success  { echo '성공' }\n  failure  { echo '실패 알림' }\n  unstable { echo '테스트 일부 실패' }\n}" }
                    },
                    { id: "jcreds", label: "Credentials", en: "credentials('id')", src: ["jenkins-creds", "jenkins-syntax"],
                      desc: "Jenkins Credentials에 저장한 비밀 값을 ID로 꺼내 환경 변수로 쓰는 방식입니다.",
                      ex: { v: "credentials('harbor-robot')", lang: "groovy", code: "environment {\n  // Jenkins Credentials에 저장한 ID로 꺼냄 (Username with password 형식)\n  HARBOR = credentials('harbor-robot')\n  // → HARBOR(user:pass), HARBOR_USR, HARBOR_PSW 환경 변수가 생김\n}" }
                    }
                  ]
                }
              ]
            },
            { id: "runner", label: "Runner", en: "act_runner / Jenkins agent", src: ["act-runner", "jenkins-pipeline"],
              desc: "파이프라인의 Job을 실제로 받아 실행하는 작업 머신(또는 Pod)입니다.",
              ex: { v: "act_runner", lang: "text", code: "# Job의 runs-on 과 Runner의 label이 맞으면 그 Runner가 Job을 받음\njobs.build.runs-on : ubuntu-latest\nRunner label       : ubuntu-latest → docker://node:20   (컨테이너에서 실행)\n# Jenkins + Kubernetes plugin: 빌드마다 agent Pod를 만들고 끝나면 삭제" },
              children: [
                { id: "k8sagent", label: "Kubernetes agent", en: "Jenkins Kubernetes plugin", src: ["jenkins-k8s"],
                  desc: "Jenkins가 빌드마다 Kubernetes에 agent Pod를 만들어 실행하고, 빌드가 끝나면 Pod를 지웁니다.",
                  ex: { v: "agent Pod", lang: "yaml", code: "# ci-pod.yaml  (Jenkinsfile: agent { kubernetes { yamlFile 'ci-pod.yaml' } })\napiVersion: v1\nkind: Pod\nspec:\n  containers:\n  - name: node\n    image: node:20\n    command: [sleep]\n    args: [infinity]\n  - name: kaniko\n    image: gcr.io/kaniko-project/executor:debug\n    command: [sleep]\n    args: [infinity]" }
                }
              ]
            },
            { id: "imagebuild", label: "이미지 빌드", en: "DinD / Kaniko", src: ["dind", "kaniko"],
              desc: "Dockerfile로 이미지를 만드는 작업으로, DinD는 Docker Daemon을 띄워서, Kaniko는 Daemon 없이 빌드합니다(Kaniko 원 저장소는 archived 상태라 도입 전 유지보수 여부 확인 필요).",
              ex: { v: "docker build", lang: "bash", code: "# DinD (현재): Runner 옆 Docker Daemon 사용, privileged 필요\ndocker build -t harbor.school.local/shop/shop-web:3f9a2c1 .\ndocker push harbor.school.local/shop/shop-web:3f9a2c1\n# Kaniko (목표): Daemon 없이 빌드하고 바로 push\n/kaniko/executor --context=dir://. --dockerfile=Dockerfile \\\n  --destination=harbor.school.local/shop/shop-web:3f9a2c1" }
            }
          ]
        },
        { id: "test", label: "Test", en: "검증", src: ["jenkins-tests", "gh-ci"],
          desc: "배포 전에 코드와 결과물에 문제가 없는지 자동으로 확인하는 단계입니다.",
          ex: { v: "npm test", lang: "text", code: "$ npm test            → 42 passing\n$ helm lint chart/    → 1 chart(s) linted, 0 chart(s) failed\nHarbor 취약점 스캔    → Critical 0 · High 2" },
          children: [
            { id: "unittest", label: "Unit test", en: "Unit test", src: ["jenkins-tests"],
              desc: "함수·모듈 단위로 코드가 기대대로 동작하는지 자동으로 확인합니다.",
              ex: { v: "npm test", lang: "bash", code: "$ npm test   # 출력은 요약한 예\n  cart\n    ✔ applies coupon\n    ✔ rejects expired coupon\n  42 passing (1s)\n# 실패하면 종료 코드가 0이 아니어서 파이프라인이 여기서 멈춤" }
            },
            { id: "helmlint", label: "Chart 검사", en: "helm lint", src: ["helm-lint"],
              desc: "Helm Chart의 문법과 구성 오류를 배포 전에 검사합니다.",
              ex: { v: "helm lint", lang: "bash", code: "$ helm lint chart/   # 출력은 요약한 예\n==> Linting chart/\n[INFO] Chart.yaml: icon is recommended\n1 chart(s) linted, 0 chart(s) failed" }
            },
            { id: "scan", label: "취약점 스캔", en: "Vulnerability scan", src: ["harbor-scan", "harbor-projconf"],
              desc: "이미지 안 패키지의 알려진 보안 취약점(CVE)을 찾아냅니다. Harbor는 Trivy로 스캔합니다.",
              ex: { v: "Critical 0", lang: "text", code: "# Harbor 프로젝트 Configuration\n[v] Automatically scan images on push\n[v] Prevent vulnerable images from running  (심각도: High 이상)\nshop/shop-web:3f9a2c1   Critical 0 · High 2 · Medium 5   (예시 값)\n# 선택한 심각도 이상이 있으면 그 이미지는 pull 할 수 없음" }
            }
          ]
        },
        { id: "package", label: "Package", en: "패키징·저장", src: ["harbor", "helm-using"],
          desc: "검증된 결과물에 버전을 붙여 배포할 수 있는 형태로 Registry에 보관하는 단계입니다.",
          ex: { v: "harbor.school.local/shop/shop-web:3f9a2c1", lang: "text", code: "tag      : 3f9a2c1  (commit SHA)\nregistry : harbor.school.local/shop/shop-web:3f9a2c1\nchart    : chart/values.yaml → image.tag: 3f9a2c1" },
          children: [
            { id: "tagging", label: "Image Tag", en: "commit SHA tag", src: ["k8s-images"],
              desc: "latest 대신 commit SHA 같은 변하지 않는 Tag를 붙여 어떤 코드인지 추적합니다.",
              ex: { v: "3f9a2c1", lang: "bash", code: "$ git rev-parse --short HEAD\n3f9a2c1\n$ docker tag shop-web harbor.school.local/shop/shop-web:3f9a2c1\n# latest는 계속 다른 이미지를 가리키므로 배포 기준으로 쓰지 않음" }
            },
            { id: "registry", label: "Container Registry", en: "Harbor / Gitea Registry", src: ["harbor", "gitea-registry"],
              desc: "빌드된 이미지를 저장하고 클러스터가 pull 해 가는 저장소입니다.",
              ex: { v: "harbor.school.local", lang: "text", code: "harbor.school.local\n└─ Project shop  (Private)\n   ├─ Robot account  robot$shop+ci   (push·pull 전용)\n   ├─ shop/shop-web:3f9a2c1   스캔 완료\n   ├─ Tag retention     : 최근 push 10개만 보관\n   ├─ Tag immutability  : v* Tag 덮어쓰기 금지\n   └─ Replication       → 백업 Registry\n관리자 Clean Up → GC  : 참조 없는 blob 정리\n클러스터는 imagePullSecret harbor-cred 로 pull" },
              children: [
                { id: "hproject", label: "Project", en: "Harbor Project", src: ["harbor-project"],
                  desc: "이미지 저장소(repository)를 묶고 멤버 권한·스캔·보관 정책을 거는 Harbor의 단위입니다.",
                  ex: { v: "Project shop", lang: "text", code: "Projects\nNAME   ACCESS LEVEL   REPOSITORIES\nshop   Private        shop-web, shop-api\n# Private: 프로젝트 멤버만 pull / Public: 누구나 pull" }
                },
                { id: "robot", label: "Robot account", en: "Robot account", src: ["harbor-robot"],
                  desc: "사람 계정 대신 CI가 push·pull 할 때만 쓰는 권한이 제한된 자동화용 계정입니다.",
                  ex: { v: "robot$shop+ci", lang: "text", code: "# Project shop → Robot Accounts → New Robot Account\nName        : robot$shop+ci\nPermissions : Repository  push, pull\nExpiration  : 90 days\n# CI는 이 계정과 토큰으로 docker login" }
                },
                { id: "pullsecret", label: "imagePullSecret", en: "imagePullSecret", src: ["pull-secret"],
                  desc: "클러스터가 비공개 Registry에서 이미지를 받을 때 쓰는 인증 정보 Secret입니다.",
                  ex: { v: "harbor-cred", lang: "bash", code: "$ kubectl create secret docker-registry harbor-cred -n shop \\\n    --docker-server=harbor.school.local \\\n    --docker-username='robot$shop+pull' --docker-password=<token>\n# Pod spec\nimagePullSecrets:\n- name: harbor-cred" }
                },
                { id: "retention", label: "Tag retention", en: "Tag Retention Rules", src: ["harbor-retention"],
                  desc: "저장소마다 몇 개 또는 얼마 동안의 artifact를 남길지 규칙으로 정해, 나머지를 정리합니다.",
                  ex: { v: "Tag retention", lang: "text", code: "# Project shop → Policy → Tag Retention\nRule     : repositories matching **\n           retain the 10 most recently pushed artifacts\nSchedule : Daily\n# 규칙에 맞지 않는 artifact가 삭제 대상" }
                },
                { id: "immutable", label: "Tag immutability", en: "Tag Immutability Rules", src: ["harbor-immutable"],
                  desc: "규칙에 맞는 Tag는 같은 이름으로 다시 push·재태그·삭제할 수 없게 막아 배포 기준을 고정합니다.",
                  ex: { v: "Tag immutability", lang: "bash", code: "# Project shop → Policy → Tag Immutability\n# Rule: repositories matching **, tags matching v*\n$ docker push harbor.school.local/shop/shop-web:v1.4.0   # 이미 있는 Tag\n→ 거부됨 (덮어쓰기·삭제 불가)" }
                },
                { id: "replication", label: "Replication", en: "Replication", src: ["harbor-replication"],
                  desc: "이미지를 다른 Registry로 보내거나(Push-based) 가져오는(Pull-based) 복제 규칙입니다.",
                  ex: { v: "Replication", lang: "text", code: "# Administration → Replications → New Replication Rule\nMode          : Push-based   (Harbor → 원격 Registry)\nSource filter : shop/**\nDestination   : backup-registry\nTrigger       : Event Based  (push·retag될 때 바로 복제)" }
                },
                { id: "gc", label: "Garbage Collection", en: "GC", src: ["harbor-gc"],
                  desc: "이미지를 지워도 공간은 바로 비지 않으며, GC가 어떤 manifest도 참조하지 않는 blob을 지워 공간을 확보합니다.",
                  ex: { v: "GC", lang: "text", code: "# Administration → Clean Up → Garbage Collection\nDRY RUN  → 지울 수 있는 blob과 예상 확보 용량만 출력\nGC Now   → 참조 없는 blob 실제 삭제\n# 최근 2시간 안에 올라온 blob은 업로드 보호를 위해 제외" }
                }
              ]
            },
            { id: "chart", label: "Helm Chart", en: "Chart / values.yaml", src: ["helm-using", "helm-values", "helm-charts"],
              desc: "Kubernetes YAML 묶음을 템플릿으로 만들고 values.yaml로 이미지 Tag 등을 바꿔 끼우는 패키지입니다.",
              ex: { v: "chart/", lang: "text", code: "chart/\n├─ Chart.yaml          # name: shop-web, version: 0.3.0\n├─ values.yaml         # image.tag 등 기본값\n├─ values-prod.yaml    # 운영 환경 덮어쓰기 값\n└─ templates/\n   ├─ deployment.yaml\n   ├─ service.yaml\n   └─ db-migrate-job.yaml   # helm.sh/hook: pre-upgrade" },
              children: [
                { id: "ctemplates", label: "templates/", en: "Templates", src: ["helm-charts"],
                  desc: "Go 템플릿 문법으로 쓴 Kubernetes YAML로, 설치할 때 values 값을 채워 실제 매니페스트가 됩니다.",
                  ex: { v: "templates/", lang: "yaml", code: "# templates/deployment.yaml (일부)\napiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: {{ .Release.Name }}\nspec:\n  replicas: {{ .Values.replicaCount }}\n  template:\n    spec:\n      containers:\n      - name: web\n        image: \"{{ .Values.image.repository }}:{{ .Values.image.tag }}\"" }
                },
                { id: "cvalues", label: "values.yaml", en: "Values", src: ["helm-values"],
                  desc: "템플릿에 들어갈 기본값 파일로, -f 파일이나 --set으로 환경별 값을 덮어씁니다.",
                  ex: { v: "values.yaml", lang: "yaml", code: "# values.yaml\nreplicaCount: 2\nimage:\n  repository: harbor.school.local/shop/shop-web\n  tag: 3f9a2c1\n# 덮어쓰기: -f values-prod.yaml  또는  --set image.tag=4b7e0d2" }
                },
                { id: "hooks", label: "Chart Hooks", en: "helm.sh/hook", src: ["helm-hooks"],
                  desc: "설치·업그레이드·삭제 전후 같은 시점에 DB 마이그레이션 Job 등을 먼저 실행하게 하는 annotation입니다.",
                  ex: { v: "helm.sh/hook: pre-upgrade", lang: "yaml", code: "# templates/db-migrate-job.yaml\napiVersion: batch/v1\nkind: Job\nmetadata:\n  name: db-migrate\n  annotations:\n    \"helm.sh/hook\": pre-upgrade\n    \"helm.sh/hook-delete-policy\": hook-succeeded\nspec: { ... }\n# pre-upgrade: 템플릿 렌더링 후, 리소스를 바꾸기 전에 실행" }
                }
              ]
            }
          ]
        },
        { id: "deploy", label: "Deploy", en: "배포", src: ["gh-cd", "argocd"],
          desc: "새 버전을 Kubernetes 클러스터에 반영하고 문제가 생기면 되돌리는 단계입니다.",
          ex: { v: "Argo CD Sync", lang: "text", code: "Push 방식 : helm upgrade --install shop-web chart/ -n shop\nGitOps    : Manifest repo school/shop-deploy 커밋 → Argo CD Sync\n결과      : Deployment Rolling update\n문제 시   : helm rollback shop-web 4  /  Manifest repo git revert" },
          children: [
            { id: "helmupgrade", label: "helm upgrade", en: "Push 방식", src: ["helm-upgrade"],
              desc: "CI가 클러스터 권한을 갖고 직접 helm upgrade로 새 버전을 밀어 넣는 방식입니다.",
              ex: { v: "helm upgrade", lang: "bash", code: "$ helm upgrade --install shop-web chart/ -n shop \\\n    -f chart/values-prod.yaml --set image.tag=3f9a2c1 \\\n    --rollback-on-failure\nRelease \"shop-web\" has been upgraded. Happy Helming!\nREVISION: 5" },
              children: [
                { id: "release", label: "Release · Revision", en: "helm history", src: ["helm-using", "helm-history"],
                  desc: "Release는 Chart를 클러스터에 설치한 하나의 인스턴스이고, 설치·업그레이드·롤백마다 Revision 번호가 늘어납니다.",
                  ex: { v: "REVISION: 5", lang: "bash", code: "$ helm history shop-web -n shop   # 출력은 요약한 예\nREVISION  STATUS       CHART           DESCRIPTION\n3         superseded   shop-web-0.3.0  Upgrade complete\n4         superseded   shop-web-0.3.0  Upgrade complete\n5         deployed     shop-web-0.3.0  Upgrade complete" }
                },
                { id: "rbfail", label: "--rollback-on-failure", en: "Helm 3: --atomic", src: ["helm-upgrade"],
                  desc: "업그레이드가 실패하면 직전 성공 Revision으로 자동으로 되돌리는 옵션으로, 켜면 --wait도 함께 적용됩니다(Helm 3의 --atomic).",
                  ex: { v: "--rollback-on-failure", lang: "bash", code: "$ helm upgrade shop-web chart/ -n shop --set image.tag=bad1234 \\\n    --rollback-on-failure\n# 새 리소스가 준비되지 못하면 직전 성공 Revision으로 자동 복구" }
                }
              ]
            },
            { id: "manifest", label: "Manifest repo", en: "Config repo", src: ["argocd"],
              desc: "배포할 YAML·values만 모아 둔 별도 Git 저장소로, 원하는 배포 상태의 기준이 됩니다.",
              ex: { v: "school/shop-deploy", lang: "bash", code: "shop-deploy/\n└─ apps/shop-web/\n   ├─ Chart.yaml\n   └─ values-prod.yaml      # image.tag: 3f9a2c1\n# CI는 이미지 Tag만 바꿔 커밋\n$ git commit -am \"deploy: shop-web 3f9a2c1\" && git push" }
            },
            { id: "argocd", label: "Argo CD", en: "GitOps (Pull 방식)", src: ["argocd", "argocd-concepts"],
              desc: "클러스터 안에서 Manifest repo를 계속 비교해 차이가 있으면 스스로 맞추는(Sync) GitOps 도구입니다.",
              ex: { v: "Argo CD Sync", lang: "text", code: "$ argocd app get shop-web   # 출력은 요약한 예\nName:           argocd/shop-web\nSource:         school/shop-deploy  path apps/shop-web\nDestination:    in-cluster / shop\nSync Policy:    Automated (Prune, SelfHeal)\nSync Status:    Synced to main (3f9a2c1)\nHealth Status:  Healthy\nKIND         NAME         STATUS   HEALTH\nJob          db-migrate   Synced   (PreSync hook)\nDeployment   shop-web     Synced   Healthy\n# 이 Application은 ApplicationSet shop-apps 가 만듦" },
              children: [
                { id: "app", label: "Application", en: "source / destination", src: ["argocd-app", "argocd-concepts"],
                  desc: "어느 Git 경로(source)를 어느 클러스터·Namespace(destination)에 배포할지 적은 Argo CD 객체입니다.",
                  ex: { v: "argocd/shop-web", lang: "yaml", code: "apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata: { name: shop-web, namespace: argocd }\nspec:\n  project: default\n  source:\n    repoURL: https://gitea.school.local/school/shop-deploy.git\n    targetRevision: main\n    path: apps/shop-web\n  destination:\n    server: https://kubernetes.default.svc\n    namespace: shop" }
                },
                { id: "syncstatus", label: "Sync · Health 상태", en: "Sync Status / Health", src: ["argocd-concepts", "argocd-health"],
                  desc: "Sync 상태는 Git과 같은지, Health 상태는 리소스가 실제로 잘 동작하는지를 따로 보여 줍니다.",
                  ex: { v: "Health Status:  Healthy", lang: "text", code: "Sync Status   : Synced | OutOfSync              ← Git과 같은가\nHealth Status : Healthy | Progressing | Degraded\n                Suspended | Missing | Unknown   ← 실제로 잘 동작하는가\n# App Health = 바로 아래 리소스들 중 가장 나쁜 상태" }
                },
                { id: "autosync", label: "Auto sync · Self heal · Prune", en: "syncPolicy.automated", src: ["argocd-sync"],
                  desc: "Git이 바뀌면 자동 반영하고(Auto sync), 클러스터 쪽 변경을 되돌리며(Self heal), Git에서 지운 리소스를 삭제(Prune)합니다.",
                  ex: { v: "Automated (Prune, SelfHeal)", lang: "yaml", code: "spec:\n  syncPolicy:\n    automated:\n      prune: true      # Git에서 지운 리소스는 클러스터에서도 삭제\n      selfHeal: true   # 누가 클러스터를 직접 바꾸면 Git 상태로 되돌림" }
                },
                { id: "wave", label: "Sync hook · wave", en: "PreSync / sync-wave", src: ["argocd-waves"],
                  desc: "hook은 리소스를 Sync 전·중·후 어느 단계에 실행할지, wave는 같은 단계 안에서 순서를 숫자로 정합니다.",
                  ex: { v: "PreSync", lang: "yaml", code: "# 1) DB 마이그레이션 Job: 매니페스트 적용 전에 실행\nmetadata:\n  annotations:\n    argocd.argoproj.io/hook: PreSync\n---\n# 2) 같은 단계 안 순서: 낮은 숫자부터 (기본 0)\nmetadata:\n  annotations:\n    argocd.argoproj.io/sync-wave: \"-1\"   # ConfigMap을 먼저" }
                },
                { id: "appset", label: "ApplicationSet · App of Apps", en: "ApplicationSet", src: ["argocd-appset", "argocd-bootstrap"],
                  desc: "템플릿과 generator로 여러 Application을 자동 생성하며, Application이 다른 Application을 배포하는 App of Apps는 대안 방식입니다.",
                  ex: { v: "ApplicationSet", lang: "yaml", code: "apiVersion: argoproj.io/v1alpha1\nkind: ApplicationSet\nmetadata: { name: shop-apps, namespace: argocd }\nspec:\n  goTemplate: true\n  generators:\n  - list:\n      elements:\n      - app: shop-web\n      - app: shop-api\n  template:\n    metadata: { name: '{{.app}}' }\n    spec:\n      project: default\n      source: { repoURL: https://gitea.school.local/school/shop-deploy.git, targetRevision: main, path: 'apps/{{.app}}' }\n      destination: { server: https://kubernetes.default.svc, namespace: shop }" }
                }
              ]
            },
            { id: "rollout", label: "Rolling update", en: "Rolling update", src: ["rolling"],
              desc: "Pod를 조금씩 새 버전으로 교체해 중단 없이 배포하는 Deployment 기본 전략입니다.",
              ex: { v: "Rolling update", lang: "bash", code: "# spec.strategy (기본값)\n#   type: RollingUpdate\n#   rollingUpdate: { maxUnavailable: 25%, maxSurge: 25% }\n$ kubectl rollout status deployment/shop-web -n shop\ndeployment \"shop-web\" successfully rolled out" }
            },
            { id: "rollback", label: "Rollback", en: "Rollback", src: ["helm-rollback", "rolling"],
              desc: "문제가 생긴 배포를 이전 Revision으로 되돌리는 동작입니다.",
              ex: { v: "helm rollback", lang: "bash", code: "# Push 방식 (Helm)\n$ helm rollback shop-web 4 -n shop\nRollback was a success! Happy Helming!\n# GitOps: Manifest repo에서 git revert → Argo CD가 이전 Tag로 Sync\n# Deployment만: kubectl rollout undo deployment/shop-web -n shop" }
            }
          ]
        }
      ]
    }
  ],

  // 장면에서 각 항목을 나타내는 심볼: k8s-*/logo-* 는 공식 아이콘·로고(logos.js, 출처는 [출처] 서랍), 그 외는 엔진 script.js의 ICONS 이름
  icons: {
    "pipeline": "pipe", "source": "branch", "repo": "logo-git", "push": "upload", "trigger": "bell", "build": "build",
    "workflow": "workflow", "gha": "manifest", "jobstep": "list", "secrets": "key", "jenkinsfile": "logo-jenkins", "jstage": "list",
    "jpost": "check", "jcreds": "key", "runner": "robot", "k8sagent": "k8s-pod", "imagebuild": "package", "test": "check",
    "unittest": "check", "helmlint": "search", "scan": "shield", "package": "package", "tagging": "tag", "registry": "logo-harbor",
    "hproject": "folder", "robot": "robot", "pullsecret": "k8s-secret", "retention": "history", "immutable": "lock", "replication": "copy",
    "gc": "trash", "chart": "logo-helm", "ctemplates": "brace", "cvalues": "sliders", "hooks": "link", "deploy": "rocket",
    "helmupgrade": "logo-helm", "release": "history", "rbfail": "undo", "manifest": "manifest", "argocd": "logo-argo", "app": "target",
    "syncstatus": "pulse", "autosync": "sync", "wave": "wave", "appset": "copy", "rollout": "k8s-deploy", "rollback": "undo"
  },

  flows: [
    {
      id: 'gitops', title: '목표 구성: GitOps(Pull) 파이프라인', src: ['jenkins-pipeline', 'kaniko', 'harbor', 'argocd'],
      desc: 'Source → Build → Test → Package → Deploy 순서로, CI와 CD를 Manifest repo로 분리한 흐름입니다.',
      steps: [
        { node: 'push', text: '개발자가 App repo에 코드를 push 합니다.' },
        { node: 'trigger', text: 'push 이벤트(Webhook)가 파이프라인을 시작시킵니다.' },
        { node: 'runner', text: 'Runner(Jenkins agent)가 코드를 checkout 합니다.' },
        { node: 'unittest', text: 'Unit test를 실행하고 실패하면 여기서 멈춥니다.' },
        { node: 'imagebuild', text: 'Kaniko가 Daemon 없이 이미지를 빌드합니다.' },
        { node: 'tagging', text: '이미지에 commit SHA Tag를 붙입니다.' },
        { node: 'registry', text: 'Robot account로 Harbor에 push 합니다.' },
        { node: 'scan', text: 'Harbor가 이미지 취약점을 스캔합니다.' },
        { node: 'manifest', text: 'CI가 Manifest repo의 이미지 Tag만 새 값으로 커밋합니다.' },
        { node: 'argocd', text: 'Argo CD가 변경(OutOfSync)을 감지하고 Sync 합니다.' },
        { node: 'rollout', text: 'Deployment가 Rolling update로 새 Pod로 교체합니다.' }
      ]
    },
    {
      id: 'push', title: '현재 구성: CI가 직접 배포(Push)', src: ['gitea-actions', 'act-runner', 'helm-upgrade'],
      desc: 'Gitea Actions가 빌드부터 helm upgrade까지 한 번에 수행하는 단순한 흐름입니다.',
      steps: [
        { node: 'push', text: 'main 브랜치에 push 합니다.' },
        { node: 'workflow', text: '.gitea/workflows/*.yaml의 on: push 조건이 맞습니다.' },
        { node: 'runner', text: 'act_runner가 Job을 받아 checkout·Registry login을 합니다.' },
        { node: 'imagebuild', text: 'DinD 사이드카의 Docker로 이미지를 빌드합니다.' },
        { node: 'registry', text: 'Gitea Registry에 이미지를 push 합니다.' },
        { node: 'helmupgrade', text: 'helm upgrade로 새 Tag를 클러스터에 직접 반영합니다.' },
        { node: 'rollout', text: 'Deployment가 Rolling update를 수행합니다.' }
      ]
    },
    {
      id: 'helm', title: 'Helm Chart 배포·롤백 흐름', src: ['git', 'helm-lint', 'helm-using', 'helm-values', 'harbor-robot', 'pull-secret', 'helm-upgrade', 'rolling', 'helm-rollback'],
      desc: 'Chart를 검사해 private Registry 이미지로 배포하고, 문제가 생기면 이전 Revision으로 되돌리는 순서입니다.',
      steps: [
        { node: 'repo', text: 'Chart와 환경별 values 파일을 Git 저장소에서 함께 관리합니다.' },
        { node: 'helmlint', text: 'helm lint로 Chart 문법과 권장 형식을 먼저 검사합니다.' },
        { node: 'chart', text: 'values.yaml의 image.tag 등에 이번 배포 값을 넣어 템플릿을 채웁니다.' },
        { node: 'robot', text: 'private Registry 접근에는 사람 계정 대신 Robot account 자격 증명을 씁니다.' },
        { node: 'pullsecret', text: '그 자격 증명으로 imagePullSecret을 만들어 Pod가 이미지를 받을 수 있게 합니다.' },
        { node: 'helmupgrade', text: 'helm upgrade --install 로 새 Revision을 클러스터에 적용합니다.' },
        { node: 'rollout', text: 'Deployment가 Rolling update로 Pod를 차례로 교체합니다.' },
        { node: 'rollback', text: '문제가 생기면 helm rollback <release> <revision> 으로 이전 Revision을 다시 적용합니다.' }
      ]
    },
    {
      id: 'jenkins', title: 'Jenkinsfile이 실행되는 흐름 (목표 구성)', src: ['jenkins-syntax', 'jenkins-k8s', 'jenkins-creds', 'kaniko'],
      desc: 'Webhook으로 시작된 Jenkins 파이프라인이 agent Pod에서 stage를 실행하고 post로 마무리하기까지입니다.',
      steps: [
        { node: 'trigger', text: 'Gitea가 push 이벤트를 Webhook으로 Jenkins에 알립니다.' },
        { node: 'jenkinsfile', text: 'Jenkins가 저장소의 Jenkinsfile을 읽어 pipeline을 시작합니다.' },
        { node: 'k8sagent', text: 'Kubernetes plugin이 이번 빌드용 agent Pod(node·kaniko 컨테이너)를 만듭니다.' },
        { node: 'jcreds', text: "credentials('harbor-robot')로 Harbor Robot 계정 값을 환경 변수로 받습니다." },
        { node: 'jstage', text: 'Test → Build stage를 차례로 실행하고, 실패하면 이후 stage는 건너뜁니다.' },
        { node: 'imagebuild', text: 'kaniko 컨테이너가 Daemon 없이 이미지를 빌드해 Harbor로 push 합니다.' },
        { node: 'jpost', text: 'post에서 테스트 결과를 기록(always)하고 실패 시 알림(failure)을 보냅니다. agent Pod는 삭제됩니다.' }
      ]
    },
    {
      id: 'argosync', title: 'Argo CD가 Sync 하는 흐름', src: ['argocd-app', 'argocd-concepts', 'argocd-sync', 'argocd-waves', 'argocd-health'],
      desc: 'Manifest repo 커밋이 클러스터에 반영되고 Healthy가 되기까지 Argo CD 안에서 일어나는 순서입니다.',
      steps: [
        { node: 'manifest', text: 'CI가 Manifest repo의 image.tag를 3f9a2c1로 바꿔 커밋합니다.' },
        { node: 'app', text: 'Application이 가리키는 source(repo·path)의 원하는 상태가 바뀝니다.' },
        { node: 'syncstatus', text: '클러스터와 비교해 Sync Status가 OutOfSync가 됩니다.' },
        { node: 'autosync', text: 'automated 정책이 있어 사람이 누르지 않아도 Sync가 시작됩니다.' },
        { node: 'wave', text: 'PreSync hook(DB 마이그레이션 Job)이 먼저 성공해야 나머지 리소스를 wave 순서대로 적용합니다.' },
        { node: 'rollout', text: 'Deployment가 Rolling update로 Pod를 교체하는 동안 Health는 Progressing입니다.' },
        { node: 'argocd', text: '모든 리소스가 준비되면 Synced · Healthy로 표시됩니다.' }
      ]
    },
    {
      id: 'harborops', title: 'Harbor 이미지 수명 관리 흐름', src: ['harbor-project', 'harbor-robot', 'harbor-scan', 'harbor-immutable', 'harbor-replication', 'harbor-retention', 'harbor-gc'],
      desc: '이미지가 Harbor에 들어와 검사·보호·복제되고, 오래된 것이 정리되기까지입니다.',
      steps: [
        { node: 'hproject', text: 'Private Project shop을 만들어 멤버만 pull 하게 합니다.' },
        { node: 'robot', text: 'CI 전용 Robot account에 push·pull 권한만 줍니다.' },
        { node: 'scan', text: 'push 즉시 자동 스캔하고, 기준 이상 취약점이 있으면 pull을 막습니다.' },
        { node: 'immutable', text: '릴리스 Tag(v*)는 덮어쓰거나 지울 수 없게 고정합니다.' },
        { node: 'replication', text: 'Event Based 규칙으로 새 이미지를 백업 Registry에 바로 복제합니다.' },
        { node: 'retention', text: 'Tag retention 규칙으로 최근 10개만 남기고 나머지를 정리 대상으로 만듭니다.' },
        { node: 'gc', text: 'GC가 참조가 끊긴 blob을 지워 실제 디스크 공간을 돌려받습니다.' }
      ]
    }
  ],

  terms: [
    { term: 'CI', summary: '코드 변경을 자주 합치고 그때마다 자동 빌드·테스트하는 방식', vs: { term: 'CD', diff: 'CI는 변경을 검증해 결과물을 만드는 데까지, CD는 그 결과물을 환경에 배포하는 데까지' }, src: ['gh-ci', 'gh-cd'], nodes: ['pipeline'] },
    { term: 'Continuous Delivery', summary: '언제든 배포 가능한 상태를 유지하고, 운영 배포는 사람이 승인', vs: { term: 'Continuous Deployment', diff: 'Delivery는 운영 반영 전 사람의 승인이 있고, Deployment는 테스트 통과 시 자동으로 운영까지 반영' }, src: ['gh-cd'], nodes: ['deploy'] },
    { term: 'Pipeline', summary: '빌드·테스트·배포 단계를 순서대로 엮은 자동화 흐름', vs: { term: 'Job', diff: 'Pipeline은 전체 흐름이고, Job은 그 안에서 하나의 Runner가 실행하는 작업 단위' }, src: ['jenkins-pipeline', 'gh-workflow'], nodes: ['workflow', 'jenkinsfile'] },
    { term: 'Job', summary: '같은 Runner에서 실행되는 Step들의 묶음', vs: { term: 'Step', diff: 'Job은 Runner 단위 작업이고, Step은 Job 안에서 차례로 실행되는 명령 하나' }, src: ['gh-workflow'], nodes: ['jobstep'] },
    { term: 'Trigger', summary: 'push·PR·일정 등 파이프라인을 시작시키는 이벤트 조건', vs: { term: 'Webhook', diff: 'Trigger는 언제 실행할지에 대한 조건이고, Webhook은 이벤트를 HTTP로 알려 주는 전달 수단' }, src: ['gh-workflow', 'gitea-webhooks'], nodes: ['trigger'] },
    { term: 'Runner', summary: '파이프라인 Job을 실제로 실행하는 머신이나 Pod', vs: { term: 'CI 서버', diff: 'CI 서버(Gitea·Jenkins controller)는 작업을 배분하고, Runner는 받은 작업을 실행' }, src: ['act-runner', 'jenkins-pipeline'], nodes: ['runner'] },
    { term: 'Kaniko', summary: 'Docker Daemon 없이 컨테이너 안에서 이미지를 빌드하는 도구', vs: { term: 'DinD', diff: 'DinD는 컨테이너 안에 Docker Daemon을 띄워 privileged가 필요하고, Kaniko는 Daemon 없이 사용자 공간에서 빌드' }, src: ['kaniko', 'dind'], nodes: ['imagebuild'] },
    { term: 'commit SHA tag', summary: '이미지에 Git 커밋 해시를 Tag로 붙이는 방식', vs: { term: 'latest tag', diff: 'latest는 계속 다른 이미지를 가리켜 추적이 어렵고, commit SHA는 정확히 어떤 코드인지 고정' }, src: ['k8s-images'], nodes: ['tagging'] },
    { term: 'Container Registry', summary: '빌드된 이미지를 저장·배포하는 서버', vs: { term: 'Git Repository', diff: 'Git Repository는 소스 코드를, Registry는 빌드 결과물인 이미지를 저장' }, src: ['harbor', 'gitea-registry'], nodes: ['registry'] },
    { term: 'Robot account', summary: '자동화 전용으로 권한을 제한한 Harbor 계정', vs: { term: '사용자 계정', diff: '사용자 계정은 사람이 쓰는 넓은 권한이고, Robot account는 특정 프로젝트의 push·pull 같은 최소 권한' }, src: ['harbor-robot'], nodes: ['robot'] },
    { term: 'imagePullSecret', summary: '비공개 Registry 인증 정보를 담은 Secret', vs: { term: 'Robot account', diff: 'Robot account는 Registry 쪽 계정이고, imagePullSecret은 그 인증 정보를 클러스터에 저장한 객체' }, src: ['pull-secret'], nodes: ['pullsecret'] },
    { term: 'Helm Chart', summary: 'Kubernetes 리소스 템플릿을 묶은 패키지', vs: { term: 'Release', diff: 'Chart는 설치 전 패키지이고, Release는 그 Chart를 클러스터에 설치한 하나의 인스턴스' }, src: ['helm-using'], nodes: ['chart', 'ctemplates'] },
    { term: 'values.yaml', summary: 'Chart 템플릿에 넣을 기본 설정값 파일', vs: { term: 'templates/', diff: 'templates/는 YAML의 틀이고, values.yaml은 그 틀의 빈칸에 들어갈 값' }, src: ['helm-values'], nodes: ['cvalues'] },
    { term: 'helm upgrade', summary: '기존 Release를 새 Chart·값으로 갱신하는 명령', vs: { term: 'helm rollback', diff: 'upgrade는 새 Revision을 만들고, rollback은 이전 Revision 설정으로 되돌림' }, src: ['helm-upgrade', 'helm-rollback'], nodes: ['helmupgrade'] },
    { term: 'GitOps', summary: 'Git에 적힌 원하는 상태를 클러스터가 끌어와 맞추는 배포 방식', vs: { term: 'Push 방식 배포', diff: 'Push는 CI가 클러스터에 직접 명령하고, GitOps는 클러스터 안 도구가 Git을 보고 스스로 반영(Pull)' }, src: ['argocd'], nodes: ['argocd'] },
    { term: 'Sync', summary: 'Git의 원하는 상태를 클러스터에 반영하는 Argo CD 동작', vs: { term: 'Refresh', diff: 'Refresh는 Git과 클러스터를 비교만 하고, Sync는 차이를 실제로 적용' }, src: ['argocd-concepts'], nodes: ['syncstatus'] },
    { term: 'OutOfSync', summary: '클러스터 실제 상태가 Git과 다른 상태', vs: { term: 'Degraded', diff: 'OutOfSync는 Git과 다르다는 동기화 상태이고, Degraded는 리소스가 정상 동작하지 않는 Health 상태' }, src: ['argocd-concepts'], nodes: ['syncstatus'] },
    { term: 'Self heal', summary: '누군가 클러스터를 직접 바꿔도 Git 상태로 자동 복구', vs: { term: 'Auto sync', diff: 'Auto sync는 Git이 바뀔 때 자동 반영하고, Self heal은 클러스터 쪽 변경(Drift)까지 되돌림' }, src: ['argocd-sync'], nodes: ['autosync'] },
    { term: 'Manifest repo', summary: '배포용 YAML·values만 모은 별도 Git 저장소', vs: { term: 'App repo', diff: 'App repo는 소스 코드 변경 이력을, Manifest repo는 배포 상태 변경 이력을 담음' }, src: ['argocd'], nodes: ['manifest'] },
    { term: 'Rolling update', summary: 'Pod를 순차적으로 새 버전으로 바꾸는 무중단 배포', vs: { term: 'Recreate', diff: 'Recreate는 기존 Pod를 모두 지운 뒤 새로 만들어 중단이 생기고, Rolling update는 섞어 가며 교체' }, src: ['rolling'], nodes: ['rollout'] },
    { term: 'Vulnerability scan', summary: '이미지 속 패키지의 알려진 취약점(CVE) 검사', vs: { term: 'Unit test', diff: 'Unit test는 코드가 기능적으로 맞는지, 취약점 스캔은 포함된 패키지가 안전한지를 확인' }, src: ['harbor-scan'], nodes: ['scan'] },
    { term: 'Stage', summary: 'Jenkins 파이프라인 화면에 보이는 큰 작업 단계', vs: { term: 'Step', diff: 'Stage는 Test·Build 같은 단계 묶음이고, Step은 그 안의 sh 같은 실행 명령 하나' }, src: ['jenkins-syntax'], nodes: ['jstage'] },
    { term: 'post always', summary: '결과와 관계없이 마지막에 항상 실행되는 블록', vs: { term: 'post failure', diff: 'always는 성공·실패 모두에서, failure는 실패했을 때만 실행' }, src: ['jenkins-syntax'], nodes: ['jpost'] },
    { term: "credentials('id')", summary: 'Jenkins Credentials의 값을 ID로 꺼내 환경 변수로 쓰는 방법', vs: { term: '${{ secrets.NAME }}', diff: 'Jenkins는 Credentials 저장소의 ID로, Gitea Actions는 저장소·조직 Secrets 이름으로 꺼냄' }, src: ['jenkins-syntax', 'gitea-secrets'], nodes: ['jcreds', 'secrets'] },
    { term: 'Revision', summary: 'Release를 설치·업그레이드·롤백할 때마다 늘어나는 번호', vs: { term: 'Release', diff: 'Release는 설치된 Chart 인스턴스 이름이고, Revision은 그 Release의 변경 이력 번호' }, src: ['helm-using', 'helm-history'], nodes: ['release'] },
    { term: '--rollback-on-failure', summary: '업그레이드 실패 시 직전 성공 Revision으로 자동 복구하는 옵션', vs: { term: 'helm rollback', diff: '--rollback-on-failure는 실패 즉시 자동으로, helm rollback은 사람이 번호를 지정해 수동으로 되돌림' }, src: ['helm-upgrade', 'helm-rollback'], nodes: ['rbfail'] },
    { term: 'Helm hook', summary: '설치·업그레이드 같은 시점 전후에 실행되게 표시한 리소스', vs: { term: 'Argo CD hook', diff: 'helm.sh/hook은 Helm 명령 시점에, argocd.argoproj.io/hook은 Argo CD Sync 단계(PreSync 등)에 맞춰 실행' }, src: ['helm-hooks', 'argocd-waves'], nodes: ['hooks'] },
    { term: 'Sync wave', summary: '같은 Sync 단계 안에서 리소스를 적용할 순서 번호', vs: { term: 'Sync hook', diff: 'hook은 PreSync·Sync·PostSync 같은 단계를 정하고, wave는 그 단계 안의 순서를 낮은 숫자부터 정함' }, src: ['argocd-waves'], nodes: ['wave'] },
    { term: 'Prune', summary: 'Git에서 사라진 리소스를 클러스터에서도 지우는 Sync 옵션', vs: { term: 'Self heal', diff: 'Prune은 Git에서 삭제된 리소스를 지우고, Self heal은 클러스터에서 바뀐 리소스를 Git 상태로 되돌림' }, src: ['argocd-sync'], nodes: ['autosync'] },
    { term: 'Health status', summary: '리소스가 실제로 정상 동작하는지 나타내는 상태', vs: { term: 'Sync status', diff: 'Sync status는 Git과 같은지, Health status는 Healthy·Degraded처럼 동작이 정상인지를 표시' }, src: ['argocd-health', 'argocd-concepts'], nodes: ['syncstatus'] },
    { term: 'ApplicationSet', summary: 'generator와 템플릿으로 Application을 여러 개 자동 생성', vs: { term: 'App of Apps', diff: 'ApplicationSet은 컨트롤러가 목록·조건으로 생성하고, App of Apps는 Application 하나가 다른 Application YAML을 배포' }, src: ['argocd-appset', 'argocd-bootstrap'], nodes: ['appset'] },
    { term: 'Application', summary: 'Git source를 어느 destination에 배포할지 정한 Argo CD 객체', vs: { term: 'Manifest repo', diff: 'Manifest repo는 배포할 YAML이 있는 저장소이고, Application은 그 저장소의 어느 경로를 어디에 배포할지 연결' }, src: ['argocd-app'], nodes: ['app'] },
    { term: 'Tag retention', summary: '보관할 artifact 개수·기간을 규칙으로 정해 나머지를 정리', vs: { term: 'Tag immutability', diff: 'retention은 무엇을 남기고 지울지 정하고, immutability는 규칙에 맞는 Tag를 덮어쓰기·삭제하지 못하게 막음' }, src: ['harbor-retention', 'harbor-immutable'], nodes: ['retention', 'immutable'] },
    { term: 'Garbage collection', summary: '참조가 없는 blob을 지워 실제 저장 공간을 확보하는 작업', vs: { term: 'artifact 삭제', diff: 'artifact 삭제만으로는 공간이 바로 비지 않고, GC가 참조 없는 blob을 지워야 공간이 확보됨' }, src: ['harbor-gc'], nodes: ['gc'] },
    { term: 'Push-based replication', summary: 'Harbor의 이미지를 원격 Registry로 보내는 복제', vs: { term: 'Pull-based replication', diff: 'Push-based는 Harbor → 원격으로 보내고, Pull-based는 원격 Registry에서 Harbor로 가져옴' }, src: ['harbor-replication'], nodes: ['replication'] },
    { term: 'Private project', summary: '프로젝트 멤버만 이미지를 pull 할 수 있는 Harbor 프로젝트', vs: { term: 'Public project', diff: 'Public은 누구나 pull 가능하고, Private은 멤버만 pull 가능' }, src: ['harbor-project'], nodes: ['hproject'] },
    { term: 'Kubernetes agent', summary: '빌드마다 Kubernetes Pod로 만들어지는 Jenkins agent', vs: { term: '고정 agent', diff: '고정 agent는 계속 켜져 있는 머신이고, Kubernetes agent는 빌드마다 Pod를 만들고 끝나면 삭제' }, src: ['jenkins-k8s'], nodes: ['k8sagent'] }
  ]
};
