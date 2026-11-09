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
    { id: 'argocd-sync', title: 'Argo CD Docs — Automated Sync Policy', url: 'https://argo-cd.readthedocs.io/en/stable/user-guide/auto_sync/', use: 'Auto sync·Self heal' }
  ],

  internalRefs: [
    'Notion — 학교 사업(Infra): 현재 Gitea Actions + act_runner(DinD) → Gitea Registry → helm upgrade(Push), 목표 Jenkins + Kaniko → Harbor → ArgoCD(GitOps)',
    'Notion — Container Tech'
  ],
  internalNote: '내부 자료는 학교 클러스터의 현재·목표 구성을 흐름으로 고르는 데만 사용했고, 설명 문장은 위 공식 문서를 기준으로 작성했습니다.',

  tree: [
    {
      id: 'pipeline', label: 'CI/CD 파이프라인', en: 'Pipeline', src: ['gh-ci', 'gh-cd', 'jenkins-pipeline'],
      desc: '코드 변경을 자동으로 빌드·테스트·패키징·배포하는 단계들의 연결입니다.',
      children: [
        {
          id: 'source', label: 'Source', en: '소스 관리', src: ['git', 'gitea-webhooks'],
          desc: '코드가 저장되고, 변경이 생기면 파이프라인을 시작시키는 출발점입니다.',
          children: [
            { id: 'repo', label: 'Git Repository', en: 'App repo (Gitea)', src: ['git'], desc: '애플리케이션 코드와 Dockerfile, 파이프라인 정의가 함께 들어 있는 저장소입니다.' },
            { id: 'push', label: 'Commit · Push', en: 'git push', src: ['git'], desc: '개발자가 변경을 커밋해 원격 저장소로 올리는 동작입니다.' },
            { id: 'trigger', label: 'Trigger', en: 'on: push / Webhook', src: ['gh-workflow', 'gitea-webhooks'], desc: 'push·pull request 같은 이벤트가 생기면 파이프라인 실행을 시작시키는 조건입니다.' }
          ]
        },
        {
          id: 'build', label: 'Build', en: '빌드', src: ['gitea-actions', 'docker-build'],
          desc: 'Runner가 코드를 받아 실행 가능한 결과물(컨테이너 이미지)로 만드는 단계입니다.',
          children: [
            { id: 'workflow', label: 'Pipeline 정의', en: 'Workflow / Jenkinsfile', src: ['gh-workflow', 'jenkins-pipeline'], desc: 'Job·Step(또는 Stage)을 YAML이나 Jenkinsfile로 코드처럼 저장소에 적어 둔 실행 순서입니다.' },
            { id: 'runner', label: 'Runner', en: 'act_runner / Jenkins agent', src: ['act-runner', 'jenkins-pipeline'], desc: '파이프라인의 Job을 실제로 받아 실행하는 작업 머신(또는 Pod)입니다.' },
            { id: 'imagebuild', label: '이미지 빌드', en: 'DinD / Kaniko', src: ['dind', 'kaniko'], desc: 'Dockerfile로 이미지를 만드는 작업으로, DinD는 Docker Daemon을 띄워서, Kaniko는 Daemon 없이 빌드합니다(Kaniko 원 저장소는 archived 상태라 도입 전 유지보수 여부 확인 필요).' }
          ]
        },
        {
          id: 'test', label: 'Test', en: '검증', src: ['jenkins-tests', 'gh-ci'],
          desc: '배포 전에 코드와 결과물에 문제가 없는지 자동으로 확인하는 단계입니다.',
          children: [
            { id: 'unittest', label: 'Unit test', en: 'Unit test', src: ['jenkins-tests'], desc: '함수·모듈 단위로 코드가 기대대로 동작하는지 자동으로 확인합니다.' },
            { id: 'helmlint', label: 'Chart 검사', en: 'helm lint', src: ['helm-lint'], desc: 'Helm Chart의 문법과 구성 오류를 배포 전에 검사합니다.' },
            { id: 'scan', label: '취약점 스캔', en: 'Vulnerability scan', src: ['harbor-scan'], desc: '이미지 안 패키지의 알려진 보안 취약점(CVE)을 찾아냅니다.' }
          ]
        },
        {
          id: 'package', label: 'Package', en: '패키징·저장', src: ['harbor', 'helm-using'],
          desc: '검증된 결과물에 버전을 붙여 배포할 수 있는 형태로 Registry에 보관하는 단계입니다.',
          children: [
            { id: 'tagging', label: 'Image Tag', en: 'commit SHA tag', src: ['k8s-images'], desc: 'latest 대신 commit SHA 같은 변하지 않는 Tag를 붙여 어떤 코드인지 추적합니다.' },
            {
              id: 'registry', label: 'Container Registry', en: 'Harbor / Gitea Registry', src: ['harbor', 'gitea-registry'],
              desc: '빌드된 이미지를 저장하고 클러스터가 pull 해 가는 저장소입니다.',
              children: [
                { id: 'robot', label: 'Robot account', en: 'Robot account', src: ['harbor-robot'], desc: '사람 계정 대신 CI가 push·pull 할 때만 쓰는 권한이 제한된 자동화용 계정입니다.' },
                { id: 'pullsecret', label: 'imagePullSecret', en: 'imagePullSecret', src: ['pull-secret'], desc: '클러스터가 비공개 Registry에서 이미지를 받을 때 쓰는 인증 정보 Secret입니다.' }
              ]
            },
            { id: 'chart', label: 'Helm Chart', en: 'Chart / values.yaml', src: ['helm-using', 'helm-values'], desc: 'Kubernetes YAML 묶음을 템플릿으로 만들고 values.yaml로 이미지 Tag 등을 바꿔 끼우는 패키지입니다.' }
          ]
        },
        {
          id: 'deploy', label: 'Deploy', en: '배포', src: ['gh-cd', 'argocd'],
          desc: '새 버전을 Kubernetes 클러스터에 반영하고 문제가 생기면 되돌리는 단계입니다.',
          children: [
            { id: 'helmupgrade', label: 'helm upgrade', en: 'Push 방식', src: ['helm-upgrade'], desc: 'CI가 클러스터 권한을 갖고 직접 helm upgrade로 새 버전을 밀어 넣는 방식입니다.' },
            { id: 'manifest', label: 'Manifest repo', en: 'Config repo', src: ['argocd'], desc: '배포할 YAML·values만 모아 둔 별도 Git 저장소로, 원하는 배포 상태의 기준이 됩니다.' },
            { id: 'argocd', label: 'Argo CD', en: 'GitOps (Pull 방식)', src: ['argocd', 'argocd-concepts'], desc: '클러스터 안에서 Manifest repo를 계속 비교해 차이가 있으면 스스로 맞추는(Sync) GitOps 도구입니다.' },
            { id: 'rollout', label: 'Rolling update', en: 'Rolling update', src: ['rolling'], desc: 'Pod를 조금씩 새 버전으로 교체해 중단 없이 배포하는 Deployment 기본 전략입니다.' },
            { id: 'rollback', label: 'Rollback', en: 'Rollback', src: ['helm-rollback', 'rolling'], desc: '문제가 생긴 배포를 이전 Revision으로 되돌리는 동작입니다.' }
          ]
        }
      ]
    }
  ],

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
    }
  ],

  terms: [
    { term: 'CI', summary: '코드 변경을 자주 합치고 그때마다 자동 빌드·테스트하는 방식', vs: { term: 'CD', diff: 'CI는 변경을 검증해 결과물을 만드는 데까지, CD는 그 결과물을 환경에 배포하는 데까지' }, src: ['gh-ci', 'gh-cd'], nodes: ['pipeline'] },
    { term: 'Continuous Delivery', summary: '언제든 배포 가능한 상태를 유지하고, 운영 배포는 사람이 승인', vs: { term: 'Continuous Deployment', diff: 'Delivery는 운영 반영 전 사람의 승인이 있고, Deployment는 테스트 통과 시 자동으로 운영까지 반영' }, src: ['gh-cd'] },
    { term: 'Pipeline', summary: '빌드·테스트·배포 단계를 순서대로 엮은 자동화 흐름', vs: { term: 'Job', diff: 'Pipeline은 전체 흐름이고, Job은 그 안에서 하나의 Runner가 실행하는 작업 단위' }, src: ['jenkins-pipeline', 'gh-workflow'], nodes: ['workflow'] },
    { term: 'Job', summary: '같은 Runner에서 실행되는 Step들의 묶음', vs: { term: 'Step', diff: 'Job은 Runner 단위 작업이고, Step은 Job 안에서 차례로 실행되는 명령 하나' }, src: ['gh-workflow'] },
    { term: 'Trigger', summary: 'push·PR·일정 등 파이프라인을 시작시키는 이벤트 조건', vs: { term: 'Webhook', diff: 'Trigger는 언제 실행할지에 대한 조건이고, Webhook은 이벤트를 HTTP로 알려 주는 전달 수단' }, src: ['gh-workflow', 'gitea-webhooks'], nodes: ['trigger'] },
    { term: 'Runner', summary: '파이프라인 Job을 실제로 실행하는 머신이나 Pod', vs: { term: 'CI 서버', diff: 'CI 서버(Gitea·Jenkins controller)는 작업을 배분하고, Runner는 받은 작업을 실행' }, src: ['act-runner', 'jenkins-pipeline'], nodes: ['runner'] },
    { term: 'Kaniko', summary: 'Docker Daemon 없이 컨테이너 안에서 이미지를 빌드하는 도구', vs: { term: 'DinD', diff: 'DinD는 컨테이너 안에 Docker Daemon을 띄워 privileged가 필요하고, Kaniko는 Daemon 없이 사용자 공간에서 빌드' }, src: ['kaniko', 'dind'], nodes: ['imagebuild'] },
    { term: 'commit SHA tag', summary: '이미지에 Git 커밋 해시를 Tag로 붙이는 방식', vs: { term: 'latest tag', diff: 'latest는 계속 다른 이미지를 가리켜 추적이 어렵고, commit SHA는 정확히 어떤 코드인지 고정' }, src: ['k8s-images'], nodes: ['tagging'] },
    { term: 'Container Registry', summary: '빌드된 이미지를 저장·배포하는 서버', vs: { term: 'Git Repository', diff: 'Git Repository는 소스 코드를, Registry는 빌드 결과물인 이미지를 저장' }, src: ['harbor', 'gitea-registry'], nodes: ['registry'] },
    { term: 'Robot account', summary: '자동화 전용으로 권한을 제한한 Harbor 계정', vs: { term: '사용자 계정', diff: '사용자 계정은 사람이 쓰는 넓은 권한이고, Robot account는 특정 프로젝트의 push·pull 같은 최소 권한' }, src: ['harbor-robot'], nodes: ['robot'] },
    { term: 'imagePullSecret', summary: '비공개 Registry 인증 정보를 담은 Secret', vs: { term: 'Robot account', diff: 'Robot account는 Registry 쪽 계정이고, imagePullSecret은 그 인증 정보를 클러스터에 저장한 객체' }, src: ['pull-secret'], nodes: ['pullsecret'] },
    { term: 'Helm Chart', summary: 'Kubernetes 리소스 템플릿을 묶은 패키지', vs: { term: 'Release', diff: 'Chart는 설치 전 패키지이고, Release는 그 Chart를 클러스터에 설치한 하나의 인스턴스' }, src: ['helm-using'], nodes: ['chart'] },
    { term: 'values.yaml', summary: 'Chart 템플릿에 넣을 기본 설정값 파일', vs: { term: 'templates/', diff: 'templates/는 YAML의 틀이고, values.yaml은 그 틀의 빈칸에 들어갈 값' }, src: ['helm-values'] },
    { term: 'helm upgrade', summary: '기존 Release를 새 Chart·값으로 갱신하는 명령', vs: { term: 'helm rollback', diff: 'upgrade는 새 Revision을 만들고, rollback은 이전 Revision 설정으로 되돌림' }, src: ['helm-upgrade', 'helm-rollback'], nodes: ['helmupgrade'] },
    { term: 'GitOps', summary: 'Git에 적힌 원하는 상태를 클러스터가 끌어와 맞추는 배포 방식', vs: { term: 'Push 방식 배포', diff: 'Push는 CI가 클러스터에 직접 명령하고, GitOps는 클러스터 안 도구가 Git을 보고 스스로 반영(Pull)' }, src: ['argocd'], nodes: ['argocd'] },
    { term: 'Sync', summary: 'Git의 원하는 상태를 클러스터에 반영하는 Argo CD 동작', vs: { term: 'Refresh', diff: 'Refresh는 Git과 클러스터를 비교만 하고, Sync는 차이를 실제로 적용' }, src: ['argocd-concepts'] },
    { term: 'OutOfSync', summary: '클러스터 실제 상태가 Git과 다른 상태', vs: { term: 'Degraded', diff: 'OutOfSync는 Git과 다르다는 동기화 상태이고, Degraded는 리소스가 정상 동작하지 않는 Health 상태' }, src: ['argocd-concepts'] },
    { term: 'Self heal', summary: '누군가 클러스터를 직접 바꿔도 Git 상태로 자동 복구', vs: { term: 'Auto sync', diff: 'Auto sync는 Git이 바뀔 때 자동 반영하고, Self heal은 클러스터 쪽 변경(Drift)까지 되돌림' }, src: ['argocd-sync'] },
    { term: 'Manifest repo', summary: '배포용 YAML·values만 모은 별도 Git 저장소', vs: { term: 'App repo', diff: 'App repo는 소스 코드 변경 이력을, Manifest repo는 배포 상태 변경 이력을 담음' }, src: ['argocd'], nodes: ['manifest'] },
    { term: 'Rolling update', summary: 'Pod를 순차적으로 새 버전으로 바꾸는 무중단 배포', vs: { term: 'Recreate', diff: 'Recreate는 기존 Pod를 모두 지운 뒤 새로 만들어 중단이 생기고, Rolling update는 섞어 가며 교체' }, src: ['rolling'], nodes: ['rollout'] },
    { term: 'Vulnerability scan', summary: '이미지 속 패키지의 알려진 취약점(CVE) 검사', vs: { term: 'Unit test', diff: 'Unit test는 코드가 기능적으로 맞는지, 취약점 스캔은 포함된 패키지가 안전한지를 확인' }, src: ['harbor-scan'], nodes: ['scan'] }
  ]
};
