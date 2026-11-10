/* Kubernetes 학습 데이터 — 화면 로직(script.js)과 분리된 구조·설명 데이터
   - meta.keyPoint·learn: 첫 화면의 핵심 한 줄과 "이 페이지에서 알 수 있는 것"(3줄 이하)
   - tree: L1 → L2 → L3 계층. 노드마다 key(무엇·왜 1줄), role("OO에게 받아서 OO에게 넘긴다"), desc(자세히), src(출처)
   - flows: main(L1만 쓰는 기본 흐름) + at(그 노드를 열었을 때만 보이는 상세 흐름)
   - terms: 요약 1줄 + 비교 대상 정확히 1개, level(1이면 기본 표시, 생략 시 연결 노드 깊이)
   - sources: 공식 문서 출처 */
window.GUIDE_DATA = {
  meta: {
    id: 'k8s',
    eyebrow: '컨테이너 오케스트레이션',
    title: 'Kubernetes 한눈에 보기',
    subtitle: 'kubectl로 원하는 상태를 제출하면 Control Plane이 기록하고, 워크로드가 Pod 개수를 지키며, Worker Node가 실행하고, Service가 연결합니다.',
    checked: '2026-11-09',
    keyPoint: '수많은 컨테이너를 알아서 배치하고, 죽으면 다시 살려주는 관리자',
    learn: ['"이렇게 돌아가게 해 줘"라고 적어 내면 Kubernetes가 그 상태를 계속 지켜 주는 5단계 기본 흐름', '관리하는 쪽(Control Plane)과 실제 실행하는 쪽(Worker Node)이 각각 무엇을 받아서 넘기는지', '필요할 때만 한 단계씩 더 깊이: 배치 규칙·네트워크·저장소·권한']
  },

  sources: [
    { id: 'components', title: 'Kubernetes Docs — Kubernetes Components', url: 'https://kubernetes.io/docs/concepts/overview/components/', use: 'Control Plane·Node 구성 요소' },
    { id: 'arch', title: 'Kubernetes Docs — Cluster Architecture', url: 'https://kubernetes.io/docs/concepts/architecture/', use: '전체 구조' },
    { id: 'nodes', title: 'Kubernetes Docs — Nodes', url: 'https://kubernetes.io/docs/concepts/architecture/nodes/', use: 'Node' },
    { id: 'controller', title: 'Kubernetes Docs — Controllers', url: 'https://kubernetes.io/docs/concepts/architecture/controller/', use: '제어 루프' },
    { id: 'cri', title: 'Kubernetes Docs — Container Runtime Interface (CRI)', url: 'https://kubernetes.io/docs/concepts/containers/cri/', use: 'CRI' },
    { id: 'scheduler', title: 'Kubernetes Docs — Kubernetes Scheduler', url: 'https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/', use: '스케줄링' },
    { id: 'taint', title: 'Kubernetes Docs — Taints and Tolerations', url: 'https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/', use: 'Taint·Toleration' },
    { id: 'affinity', title: 'Kubernetes Docs — Assigning Pods to Nodes', url: 'https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/', use: 'nodeSelector·Affinity' },
    { id: 'kubectl', title: 'Kubernetes Docs — kubectl', url: 'https://kubernetes.io/docs/reference/kubectl/', use: 'kubectl' },
    { id: 'objmgmt', title: 'Kubernetes Docs — Object Management', url: 'https://kubernetes.io/docs/concepts/overview/working-with-objects/object-management/', use: '명령형·선언형' },
    { id: 'etcd', title: 'Kubernetes Docs — Operating etcd clusters', url: 'https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/', use: 'etcd' },
    { id: 'pods', title: 'Kubernetes Docs — Pods', url: 'https://kubernetes.io/docs/concepts/workloads/pods/', use: 'Pod' },
    { id: 'lifecycle', title: 'Kubernetes Docs — Pod Lifecycle', url: 'https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/', use: 'Pod 상태' },
    { id: 'probes', title: 'Kubernetes Docs — Liveness, Readiness, and Startup Probes', url: 'https://kubernetes.io/docs/concepts/workloads/pods/probes/', use: 'Probe' },
    { id: 'resources', title: 'Kubernetes Docs — Resource Management for Pods and Containers', url: 'https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/', use: 'requests·limits' },
    { id: 'deploy', title: 'Kubernetes Docs — Deployments', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/', use: 'Deployment' },
    { id: 'rs', title: 'Kubernetes Docs — ReplicaSet', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/', use: 'ReplicaSet' },
    { id: 'sts', title: 'Kubernetes Docs — StatefulSets', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/', use: 'StatefulSet' },
    { id: 'ds', title: 'Kubernetes Docs — DaemonSet', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/', use: 'DaemonSet' },
    { id: 'hpa', title: 'Kubernetes Docs — Horizontal Pod Autoscaling', url: 'https://kubernetes.io/docs/concepts/workloads/autoscaling/horizontal-pod-autoscale/', use: 'HPA' },
    { id: 'service', title: 'Kubernetes Docs — Service', url: 'https://kubernetes.io/docs/concepts/services-networking/service/', use: 'Service' },
    { id: 'gateway', title: 'Kubernetes Docs — Gateway API', url: 'https://kubernetes.io/docs/concepts/services-networking/gateway/', use: 'Gateway API' },
    { id: 'ingress', title: 'Kubernetes Docs — Ingress', url: 'https://kubernetes.io/docs/concepts/services-networking/ingress/', use: 'Ingress' },
    { id: 'dns', title: 'Kubernetes Docs — DNS for Services and Pods', url: 'https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/', use: 'CoreDNS' },
    { id: 'netpol', title: 'Kubernetes Docs — Network Policies', url: 'https://kubernetes.io/docs/concepts/services-networking/network-policies/', use: 'NetworkPolicy' },
    { id: 'cni', title: 'Kubernetes Docs — Network Plugins', url: 'https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/', use: 'CNI' },
    { id: 'pv', title: 'Kubernetes Docs — Persistent Volumes', url: 'https://kubernetes.io/docs/concepts/storage/persistent-volumes/', use: 'PV·PVC' },
    { id: 'sc', title: 'Kubernetes Docs — Storage Classes', url: 'https://kubernetes.io/docs/concepts/storage/storage-classes/', use: 'StorageClass' },
    { id: 'cm', title: 'Kubernetes Docs — ConfigMaps', url: 'https://kubernetes.io/docs/concepts/configuration/configmap/', use: 'ConfigMap' },
    { id: 'secret', title: 'Kubernetes Docs — Secrets', url: 'https://kubernetes.io/docs/concepts/configuration/secret/', use: 'Secret' },
    { id: 'ns', title: 'Kubernetes Docs — Namespaces', url: 'https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/', use: 'Namespace' },
    { id: 'labels', title: 'Kubernetes Docs — Labels and Selectors', url: 'https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/', use: 'Label' },
    { id: 'annotations', title: 'Kubernetes Docs — Annotations', url: 'https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/', use: 'Annotation' },
    { id: 'rbac', title: 'Kubernetes Docs — Using RBAC Authorization', url: 'https://kubernetes.io/docs/reference/access-authn-authz/rbac/', use: 'RBAC' },
    { id: 'static', title: 'Kubernetes Docs — Create static Pods', url: 'https://kubernetes.io/docs/tasks/configure-pod-container/static-pod/', use: 'Static Pod' },
    { id: 'kubeadm', title: 'Kubernetes Docs — kubeadm', url: 'https://kubernetes.io/docs/reference/setup-tools/kubeadm/', use: 'kubeadm' },
    { id: 'linuxns', title: 'Linux man-pages — namespaces(7)', url: 'https://man7.org/linux/man-pages/man7/namespaces.7.html', use: 'Linux namespace 비교' },
    { id: 'kubeconfig', title: 'Kubernetes Docs — Organizing Cluster Access Using kubeconfig Files', url: 'https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/', use: 'kubeconfig·context' },
    { id: 'kustomize', title: 'Kubernetes Docs — Declarative Management of Kubernetes Objects Using Kustomize', url: 'https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/', use: 'Kustomize' },
    { id: 'sa', title: 'Kubernetes Docs — Service Accounts', url: 'https://kubernetes.io/docs/concepts/security/service-accounts/', use: 'ServiceAccount' },
    { id: 'job', title: 'Kubernetes Docs — Jobs', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/job/', use: 'Job' },
    { id: 'cronjob', title: 'Kubernetes Docs — CronJob', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/', use: 'CronJob' },
    { id: 'crd', title: 'Kubernetes Docs — Custom Resources', url: 'https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/', use: 'CRD' },
    { id: 'operator', title: 'Kubernetes Docs — Operator pattern', url: 'https://kubernetes.io/docs/concepts/extend-kubernetes/operator/', use: 'Operator' },
    { id: 'crictl', title: 'Kubernetes Docs — Debugging Kubernetes nodes with crictl', url: 'https://kubernetes.io/docs/tasks/debug/debug-cluster/crictl/', use: 'crictl' },
    { id: 'workloads', title: 'Kubernetes Docs — Workloads', url: 'https://kubernetes.io/docs/concepts/workloads/', use: '워크로드 리소스가 Pod 묶음을 대신 관리' },
    { id: 'overview', title: 'Kubernetes Docs — Overview (What Kubernetes can do)', url: 'https://kubernetes.io/docs/concepts/overview/', use: '자동 배치·자가 치유(self-healing)' }
  ],

  internalRefs: [
    'Notion — Linux Kernel → Kubernetes 중급 학습 가이드라인 (Ubuntu 26.04 LTS 기준)',
    'Notion — 학교 사업(Infra): kubeadm 단일 노드, Calico, Gateway API + Envoy Gateway, MetalLB, nfs-csi 구성',
    'Notion — Container Tech'
  ],

  internalNote: '내부 자료는 학습 범위(학교 클러스터 구성)를 정하는 데만 사용했고, 설명 문장은 위 공식 문서를 기준으로 작성했습니다.',

  tree: [
    {
      id: 'kubectl', label: 'kubectl', en: 'kubectl', src: ['kubectl'],
      key: 'Kubernetes에게 "이렇게 돌아가게 해 줘"라고 적은 YAML을 보내는 명령줄 도구. 사람이 클러스터에 말을 거는 창구다.',
      role: '사용자에게서 YAML·명령을 받아서 Control Plane(kube-apiserver)에게 넘긴다',
      desc: 'YAML이나 명령으로 원하는 상태를 kube-apiserver에 전달하는 명령줄 도구입니다.',
      ex: { v: 'apply -f web.yaml', lang: 'bash', code: '$ kubectl config use-context dev-cluster\nSwitched to context "dev-cluster".\n$ kubectl apply -f web.yaml\ndeployment.apps/web created\n$ kubectl apply -k overlays/prod\n$ kubectl get pods -n shop\n$ kubectl describe pod web-7d4b9c8f5d-x2k8p -n shop\n$ kubectl logs web-7d4b9c8f5d-x2k8p -n shop' },
      children: [
        {
          id: 'kubeconfig', label: 'kubeconfig · context', en: 'kubeconfig', src: ['kubeconfig'],
          key: 'kubectl이 어느 클러스터에, 누구로, 어떤 기본 Namespace로 접속할지 적어 둔 파일(기본 ~/.kube/config).',
          role: '사용자에게서 접속 정보를 받아서 kubectl에게 접속 대상(context)으로 넘긴다',
          desc: '클러스터 주소·사용자 인증·기본 Namespace를 context로 묶어, kubectl이 어디에 접속할지 정하는 파일(기본 ~/.kube/config)입니다.',
          ex: { v: 'use-context dev-cluster', lang: 'yaml', code: 'apiVersion: v1\nkind: Config\nclusters:\n- name: dev-cluster\n  cluster:\n    server: https://10.0.0.10:6443\nusers:\n- name: dev-admin\ncontexts:\n- name: dev-cluster\n  context:\n    cluster: dev-cluster\n    user: dev-admin\n    namespace: shop\ncurrent-context: dev-cluster' }
        },
        {
          id: 'kustomize', label: 'Kustomize', en: 'kubectl apply -k', src: ['kustomize'],
          key: '공통 YAML(base)은 그대로 두고 환경별 차이(overlay)만 덧씌워 적용하는 도구. kubectl에 들어 있어 apply -k로 쓴다.',
          role: 'base·overlay YAML을 받아서 합친 결과를 kubectl에게 넘긴다',
          desc: 'base YAML은 그대로 두고 환경별(overlay) 차이만 덧씌워 kubectl apply -k로 적용하는 도구로, kubectl에 내장돼 있습니다.',
          ex: { v: 'apply -k', lang: 'yaml', code: '# overlays/prod/kustomization.yaml\nresources:\n- ../../base\nnamespace: shop\nimages:\n- name: shop-web\n  newTag: 1.4.0\n# 적용: kubectl apply -k overlays/prod' }
        }
      ]
    },
    {
      id: 'cp', label: 'Control Plane', en: 'Control Plane', src: ['components'],
      key: '클러스터가 "원하는 상태"를 기록하고, 실제 상태가 그와 같아지도록 결정·조정하는 관리 영역. 직접 컨테이너를 돌리지 않고 지시만 한다.',
      role: 'kubectl에게서 원하는 상태를 받아서 저장한 뒤, 워크로드 조정과 Worker Node 배치 결정으로 넘긴다',
      desc: '클러스터의 원하는 상태를 저장하고, 실제 상태가 그와 같아지도록 결정·조정하는 관리 영역입니다.',
      ex: { v: 'control-plane', lang: 'bash', code: '$ kubectl get pods -n kube-system   # 출력은 요약한 예\nNAME                            READY   STATUS\netcd-cp-1                       1/1     Running\nkube-apiserver-cp-1             1/1     Running\nkube-controller-manager-cp-1    1/1     Running\nkube-scheduler-cp-1             1/1     Running' },
      children: [
        {
          id: 'apiserver', label: 'kube-apiserver', en: 'API Server', src: ['components'],
          key: '모든 요청이 거쳐 가는 Kubernetes의 입구. 누가 보냈는지·형식이 맞는지 확인한 뒤 기록한다.',
          role: 'kubectl·컨트롤러·kubelet에게서 요청을 받아서 검증 후 etcd에게 넘긴다',
          desc: '모든 요청이 거쳐 가는 Kubernetes API의 입구로, 인증·검증 후 etcd에 기록합니다.',
          ex: { v: 'kube-apiserver-cp-1', lang: 'bash', code: '$ kubectl get --raw=\'/readyz\'\nok\n# /etc/kubernetes/manifests/kube-apiserver.yaml 일부\n- --secure-port=6443\n- --etcd-servers=https://127.0.0.1:2379' },
          children: [
            {
              id: 'crd', label: 'CRD · Operator', en: 'CustomResourceDefinition', src: ['crd', 'operator'],
              key: 'Kubernetes에 없는 새 객체 종류를 API에 추가한다(CRD). Operator라는 전용 컨트롤러가 그 객체를 원하는 상태로 맞춘다.',
              role: '사용자에게서 새 객체 정의를 받아서 kube-apiserver의 API로 넘긴다',
              desc: 'CRD로 API에 새 객체 종류를 추가하고, Operator(전용 컨트롤러)가 그 객체를 원하는 상태로 맞춥니다.',
              ex: { v: 'certificate.cert-manager.io', lang: 'yaml', code: '# cert-manager를 설치하면 CRD로 Certificate 종류가 추가됨\n# kubectl get crd → certificates.cert-manager.io ...\napiVersion: cert-manager.io/v1\nkind: Certificate\nmetadata: { name: web-tls, namespace: shop }\nspec:\n  secretName: web-tls\n  dnsNames: ["shop.example.com"]\n  issuerRef: { name: letsencrypt, kind: ClusterIssuer }\n# cert-manager 컨트롤러(Operator)가 이 객체를 보고 인증서 Secret을 만들어 둠' }
            }
          ]
        },
        {
          id: 'etcd', label: 'etcd', en: 'etcd', src: ['components', 'etcd'],
          key: '클러스터의 모든 객체 상태를 저장하는 key-value 저장소. 이게 사라지면 클러스터 기억이 사라지므로 백업이 필수다.',
          role: 'kube-apiserver에게서 기록할 상태를 받아서 저장했다가 조회 요청에 넘긴다',
          desc: '클러스터의 모든 객체 상태를 저장하는 key-value 저장소로, 백업이 필수입니다.',
          ex: { v: 'etcd-cp-1', lang: 'bash', code: '$ ETCDCTL_API=3 etcdctl snapshot save /backup/etcd-snap.db \\\n    --endpoints=https://127.0.0.1:2379 \\\n    --cacert=/etc/kubernetes/pki/etcd/ca.crt \\\n    --cert=/etc/kubernetes/pki/etcd/server.crt \\\n    --key=/etc/kubernetes/pki/etcd/server.key' }
        },
        {
          id: 'scheduler', label: 'kube-scheduler', en: 'Scheduler', src: ['scheduler'],
          key: '아직 갈 곳이 정해지지 않은 Pod를 보고, 자원과 조건이 맞는 Worker Node를 골라 준다.',
          role: 'kube-apiserver에게서 배치 대기 Pod를 받아서 고른 Node 이름을 kube-apiserver에게 넘긴다',
          desc: 'Node가 정해지지 않은 Pod를 보고 자원·조건에 맞는 Node를 골라 배정합니다.',
          ex: { v: 'kube-scheduler-cp-1', lang: 'bash', code: '$ kubectl describe pod web-7d4b9c8f5d-x2k8p -n shop   # 출력은 요약한 예\nEvents:\n  Normal  Scheduled  default-scheduler  Successfully assigned shop/web-7d4b9c8f5d-x2k8p to worker-1\n# 1) Filter: requests 여유, Taint gpu=true:NoSchedule 허용 여부,\n#            nodeSelector disktype: ssd 를 만족하는 Node만 남김\n# 2) Score : 남은 Node에 점수를 매겨 가장 높은 Node에 배정' },
          children: [
            {
              id: 'taint', label: 'Taint · Toleration', en: 'Taints and Tolerations', src: ['taint'],
              key: 'Node에 "아무나 오지 마"라는 표시(Taint)를 걸고, 그걸 견디는 표시(Toleration)가 있는 Pod만 받는다.',
              role: 'Node의 Taint와 Pod의 Toleration을 받아서 kube-scheduler에게 배치 가능 여부를 넘긴다',
              desc: 'Node에 Taint를 걸면 그에 맞는 Toleration을 가진 Pod만 그 Node에 배치될 수 있습니다.',
              ex: { v: 'gpu=true:NoSchedule', lang: 'yaml', code: '# kubectl taint nodes worker-2 gpu=true:NoSchedule\n# Pod spec\ntolerations:\n- key: "gpu"\n  operator: "Equal"\n  value: "true"\n  effect: "NoSchedule"' }
            },
            {
              id: 'affinity', label: 'nodeSelector · Affinity', en: 'Assigning Pods to Nodes', src: ['affinity'],
              key: 'Node에 붙은 Label을 조건으로 Pod가 갈 Node를 고른다. Affinity는 "꼭"과 "되도록" 조건, Pod끼리의 배치까지 표현한다.',
              role: 'Pod에 적힌 조건을 받아서 kube-scheduler에게 후보 Node 목록으로 넘긴다',
              desc: 'Node label을 조건으로 Pod가 갈 Node를 고르며, Affinity는 필수·선호 조건과 Pod 간 배치까지 표현합니다.',
              ex: { v: 'disktype: ssd', lang: 'yaml', code: '# kubectl label nodes worker-1 disktype=ssd\n# Pod spec\nnodeSelector:\n  disktype: ssd' }
            }
          ]
        },
        {
          id: 'ctrlmgr', label: 'kube-controller-manager', en: 'Controller Manager', src: ['controller', 'components'],
          key: 'Deployment·ReplicaSet 같은 컨트롤러를 실행해, 원하는 개수·상태와 실제가 다르면 계속 맞춘다.',
          role: 'kube-apiserver에게서 원하는 상태와 실제 상태를 받아서 부족한 Pod 생성·삭제 요청을 kube-apiserver에게 넘긴다',
          desc: 'Deployment·ReplicaSet 등 컨트롤러를 실행해 원하는 개수와 상태를 계속 맞춥니다.',
          ex: { v: 'kube-controller-manager-cp-1', lang: 'bash', code: '$ kubectl get deploy web -n shop   # 출력은 요약한 예\nNAME   READY   UP-TO-DATE   AVAILABLE\nweb    2/3     3            2\n# 원하는 상태(spec.replicas: 3)와 현재 상태(2개 Ready)를 비교해\n# 컨트롤러가 부족한 Pod를 다시 만들어 3/3으로 맞춤' }
        }
      ]
    },
    {
      id: 'workloads', label: '워크로드', en: 'Workload Resources', src: ['deploy', 'sts', 'ds', 'job'],
      key: 'Pod를 하나하나 직접 만들지 않고, 용도에 맞는 관리 객체(Deployment 등)에 맡겨 개수·순서·배치를 유지하게 한다.',
      role: 'Control Plane에게서 원하는 상태(replicas 등)를 받아서 그 수만큼의 Pod를 Worker Node 배치 대상으로 넘긴다',
      desc: 'Pod를 직접 만들지 않고, 용도에 맞는 컨트롤러 객체로 Pod 개수·순서·배치를 관리합니다.',
      ex: { v: 'deployment.apps/web', lang: 'bash', code: '$ kubectl get deploy,sts,ds,cronjob,hpa -A   # 출력은 요약한 예\ndeployment.apps/web                        READY 3/3\nstatefulset.apps/db                        READY 2/2\ndaemonset.apps/log-agent                   Node마다 1개\ncronjob.batch/backup                       SCHEDULE 0 2 * * *\nhorizontalpodautoscaler.autoscaling/web    TARGETS cpu: 45%/70%' },
      children: [
        {
          id: 'deployment', label: 'Deployment', en: 'Deployment', src: ['deploy'],
          key: '여러 개가 똑같이 돌아도 되는 앱의 Pod 개수와 버전을 선언하면, 새 버전 교체(롤링 업데이트)와 되돌리기까지 관리한다.',
          role: '사용자에게서 Pod 템플릿·개수를 받아서 ReplicaSet에게 넘긴다',
          desc: '무상태 앱의 Pod 개수와 버전을 선언하면 롤링 업데이트·롤백까지 관리해 주는 객체입니다.',
          ex: { v: 'deployment.apps/web', lang: 'yaml', code: 'apiVersion: apps/v1\nkind: Deployment\nmetadata: { name: web, namespace: shop }\nspec:\n  replicas: 3\n  selector: { matchLabels: { app: web } }\n  strategy: { type: RollingUpdate }\n  template:\n    metadata: { labels: { app: web } }\n    spec:\n      containers:\n      - { name: web, image: shop-web:1.4.0 }\n# kubectl get rs -n shop → web-7d4b9c8f5d   DESIRED 3   READY 3' },
          children: [
            {
              id: 'replicaset', label: 'ReplicaSet', en: 'ReplicaSet', src: ['rs'],
              key: '정해진 개수만큼 같은 Pod가 항상 떠 있게 유지한다. 보통 Deployment가 자동으로 만든다.',
              role: 'Deployment에게서 개수와 Pod 템플릿을 받아서 모자란 Pod 생성 요청을 kube-apiserver에게 넘긴다',
              desc: '지정한 개수만큼 같은 Pod가 항상 떠 있도록 유지하며, 보통 Deployment가 자동으로 만듭니다.',
              ex: { v: 'web-7d4b9c8f5d', lang: 'bash', code: '$ kubectl get rs,pods -n shop -l app=web   # 출력은 요약한 예\nreplicaset.apps/web-7d4b9c8f5d   DESIRED 3   READY 3\npod/web-7d4b9c8f5d-x2k8p   Running\npod/web-7d4b9c8f5d-m9q4z   Running\npod/web-7d4b9c8f5d-t7h2c   Running' }
            }
          ]
        },
        {
          id: 'statefulset', label: 'StatefulSet', en: 'StatefulSet', src: ['sts'],
          key: 'DB처럼 각 Pod가 고유해야 할 때 쓴다. db-0, db-1 같은 고정 이름과 전용 저장소를 주고 순서대로 만들고 지운다.',
          role: '사용자에게서 Pod 템플릿·저장소 템플릿을 받아서 번호가 붙은 Pod와 PVC로 넘긴다',
          desc: '각 Pod에 db-0, db-1 같은 고정 이름과 전용 PVC를 주고 순서대로 생성·삭제하는 객체입니다.',
          ex: { v: 'statefulset.apps/db', lang: 'yaml', code: 'apiVersion: apps/v1\nkind: StatefulSet\nmetadata: { name: db, namespace: shop }\nspec:\n  serviceName: db\n  replicas: 2\n  selector: { matchLabels: { app: db } }\n  template: { ... }\n  volumeClaimTemplates:\n  - metadata: { name: data }\n    spec:\n      accessModes: ["ReadWriteOnce"]\n      storageClassName: nfs-csi\n      resources: { requests: { storage: 10Gi } }\n# 결과: Pod db-0, db-1 / PVC data-db-0, data-db-1' }
        },
        {
          id: 'daemonset', label: 'DaemonSet', en: 'DaemonSet', src: ['ds'],
          key: '모든(또는 조건에 맞는) Node마다 Pod를 하나씩 띄운다. 로그 수집·모니터링 에이전트에 쓴다.',
          role: 'Node 목록을 받아서 Node마다 하나씩 Pod 생성 요청으로 넘긴다',
          desc: '모든(또는 조건에 맞는) Node마다 Pod를 하나씩 실행하며, 로그 수집·모니터링 에이전트에 씁니다.',
          ex: { v: 'daemonset.apps/log-agent', lang: 'yaml', code: 'apiVersion: apps/v1\nkind: DaemonSet\nmetadata: { name: log-agent, namespace: kube-system }\nspec:\n  selector: { matchLabels: { app: log-agent } }\n  template:\n    metadata: { labels: { app: log-agent } }\n    spec:\n      tolerations:   # Control Plane Node에도 배치\n      - { key: node-role.kubernetes.io/control-plane, effect: NoSchedule }\n      containers:\n      - { name: agent, image: fluent/fluent-bit }' }
        },
        {
          id: 'job', label: 'Job · CronJob', en: 'Job / CronJob', src: ['job', 'cronjob'],
          key: 'Job은 끝날 때까지 한 번 실행하는 작업, CronJob은 정해진 시간마다 Job을 다시 만드는 예약 작업이다.',
          role: '사용자에게서 작업 정의(·일정)를 받아서 완료될 때까지 실행할 Pod로 넘긴다',
          desc: 'Job은 끝날 때까지 실행되는 일회성 작업이고, CronJob은 일정에 맞춰 Job을 반복해서 만듭니다.',
          ex: { v: 'cronjob.batch/backup', lang: 'yaml', code: 'apiVersion: batch/v1\nkind: CronJob\nmetadata: { name: backup, namespace: shop }\nspec:\n  schedule: "0 2 * * *"      # 매일 02:00\n  jobTemplate:               # 시간마다 이 Job을 만듦\n    spec:\n      backoffLimit: 3\n      template:\n        spec:\n          restartPolicy: OnFailure\n          containers:\n          - { name: backup, image: busybox:1.36, command: ["sh", "-c", "echo backup"] }' }
        },
        {
          id: 'hpa', label: 'HPA', en: 'HorizontalPodAutoscaler', src: ['hpa', 'resources'],
          key: 'CPU 사용률 같은 지표를 보고 Pod 개수를 자동으로 늘리고 줄인다(지표를 주는 Metrics Server 필요).',
          role: 'Metrics Server에게서 사용량을 받아서 Deployment의 replicas 값으로 넘긴다',
          desc: 'CPU 사용률 같은 지표를 보고 Deployment의 replicas를 자동으로 늘리고 줄입니다(지표를 제공하는 Metrics Server 필요).',
          ex: { v: 'cpu: 45%/70%', lang: 'yaml', code: 'apiVersion: autoscaling/v2\nkind: HorizontalPodAutoscaler\nmetadata: { name: web, namespace: shop }\nspec:\n  scaleTargetRef: { apiVersion: apps/v1, kind: Deployment, name: web }\n  minReplicas: 2\n  maxReplicas: 10\n  metrics:\n  - type: Resource\n    resource:\n      name: cpu\n      target: { type: Utilization, averageUtilization: 70 }   # requests 대비 %\n# kubectl get hpa web -n shop → TARGETS cpu: 45%/70%   REPLICAS 3' }
        }
      ]
    },
    {
      id: 'node', label: 'Worker Node', en: 'Node', src: ['nodes', 'components'],
      key: 'Pod가 실제로 실행되는 서버(물리 또는 가상 머신). 여러 대가 모여 일을 나눠 맡는다.',
      role: 'Control Plane에게서 배정된 Pod를 받아서 컨테이너를 실행하고, 상태를 다시 Control Plane에게 넘긴다',
      desc: 'Pod가 실제로 실행되는 서버(물리 또는 가상 머신)입니다.',
      ex: { v: 'worker-1', lang: 'text', code: 'worker-1\n├─ kubelet       (systemd 서비스)\n├─ containerd    (CRI 런타임)\n├─ kube-proxy    (DaemonSet Pod)\n└─ Pod web-7d4b9c8f5d-x2k8p' },
      children: [
        {
          id: 'kubelet', label: 'kubelet', en: 'kubelet', src: ['components'],
          key: '각 Node에 하나씩 있는 관리 담당. 자기 Node에 배정된 Pod의 컨테이너가 실행되게 하고 상태를 보고한다.',
          role: 'kube-apiserver에게서 배정된 Pod 정보를 받아서 Container Runtime에게 실행 지시로 넘긴다',
          desc: '각 Node에서 자기에게 배정된 Pod의 컨테이너가 실행되도록 런타임에 지시하고 상태를 보고합니다.',
          ex: { v: 'kubelet', lang: 'bash', code: '$ systemctl status kubelet   # 출력은 요약한 예\n● kubelet.service - kubelet: The Kubernetes Node Agent\n     Active: active (running)\n$ ls /etc/kubernetes/manifests\netcd.yaml  kube-apiserver.yaml  kube-controller-manager.yaml  kube-scheduler.yaml' },
          children: [
            {
              id: 'staticpod', label: 'Static Pod', en: 'Static Pod', src: ['static', 'kubeadm'],
              key: 'API Server 없이 kubelet이 Node에 있는 YAML 파일만 보고 바로 띄우는 Pod. kubeadm은 Control Plane을 이렇게 실행한다.',
              role: 'Node의 매니페스트 파일을 받아서 kubelet이 Container Runtime에게 바로 넘긴다',
              desc: 'API Server 없이 kubelet이 Node의 매니페스트 파일로 직접 띄우는 Pod로, kubeadm은 Control Plane을 이렇게 실행합니다.',
              ex: { v: '/etc/kubernetes/manifests', lang: 'yaml', code: '# /etc/kubernetes/manifests/kube-scheduler.yaml (kubeadm이 생성, 일부)\napiVersion: v1\nkind: Pod\nmetadata:\n  name: kube-scheduler\n  namespace: kube-system\nspec:\n  containers:\n  - name: kube-scheduler\n    command:\n    - kube-scheduler\n    - --kubeconfig=/etc/kubernetes/scheduler.conf' }
            }
          ]
        },
        {
          id: 'runtime', label: 'Container Runtime', en: 'containerd (CRI)', src: ['cri', 'crictl'],
          key: '이미지를 받고 컨테이너를 실제로 실행하는 프로그램(예: containerd). kubelet과는 CRI라는 표준 규격으로 대화한다.',
          role: 'kubelet에게서 CRI 요청을 받아서 실행 중인 컨테이너로 넘긴다',
          desc: 'kubelet의 CRI 요청을 받아 이미지를 받고 컨테이너를 실제로 실행합니다.',
          ex: { v: 'containerd', lang: 'bash', code: '$ sudo crictl ps   # 출력은 요약한 예\nCONTAINER      IMAGE            STATE     NAME   POD\n3f2a9c1b7e4d   shop-web:1.4.0   Running   web    web-7d4b9c8f5d-x2k8p' }
        },
        {
          id: 'kubeproxy', label: 'kube-proxy', en: 'kube-proxy', src: ['components', 'service'],
          key: 'Service 주소로 온 요청이 뒤쪽 Pod로 가도록 각 Node의 네트워크 규칙을 관리한다.',
          role: 'kube-apiserver에게서 Service·Pod 주소 목록을 받아서 Node의 전달 규칙(iptables 등)으로 넘긴다',
          desc: 'Service 주소로 온 트래픽이 뒤쪽 Pod로 가도록 Node의 네트워크 규칙(iptables·nftables 등)을 관리합니다.',
          ex: { v: 'kube-proxy', lang: 'bash', code: '$ kubectl get svc web -n shop   # 출력은 요약한 예\nNAME   TYPE        CLUSTER-IP     PORT(S)\nweb    ClusterIP   10.96.120.15   80/TCP\n# kube-proxy(iptables 모드)가 Node마다 만든 규칙:\n# 10.96.120.15:80 으로 온 패킷 → Ready Pod IP 중 하나로 DNAT' }
        },
        {
          id: 'pod', label: 'Pod', en: 'Pod', src: ['pods', 'lifecycle'],
          key: '하나 이상의 컨테이너가 네트워크·저장소를 함께 쓰며 같이 배치되는 가장 작은 실행 단위.',
          role: 'kubelet에게서 실행 명세를 받아서 안의 Container들에게 공유 IP·볼륨을 넘긴다',
          desc: '하나 이상의 컨테이너가 네트워크·저장소를 공유하며 함께 배치되는 가장 작은 배포 단위입니다.',
          ex: { v: 'web-7d4b9c8f5d-x2k8p', lang: 'yaml', code: 'apiVersion: v1\nkind: Pod\nmetadata:\n  name: web\n  labels: { app: web }\nspec:\n  containers:\n  - name: web\n    image: shop-web:1.4.0\n    readinessProbe:\n      httpGet: { path: /ready, port: 8080 }\n    resources:\n      requests: { cpu: 250m, memory: 256Mi }\n      limits: { memory: 512Mi }' },
          children: [
            {
              id: 'container', label: 'Container', en: 'Container', src: ['pods'],
              key: 'Pod 안에서 실제 애플리케이션 프로세스를 실행하는 컨테이너.',
              role: 'Pod에게서 이미지·설정을 받아서 애플리케이션 프로세스로 실행해 넘긴다',
              desc: 'Pod 안에서 실제 애플리케이션 프로세스를 실행하는 컨테이너입니다.',
              ex: { v: 'image: shop-web:1.4.0', lang: 'bash', code: '$ kubectl exec -it web -n shop -c web -- ps   # 출력은 요약한 예\nPID   USER   COMMAND\n  1   app    node server.js' }
            },
            {
              id: 'probe', label: 'Probe', en: 'Liveness / Readiness', src: ['probes'],
              key: 'kubelet이 컨테이너가 살아 있는지(Liveness), 요청을 받을 준비가 됐는지(Readiness) 주기적으로 검사한다.',
              role: 'Container의 응답을 받아서 kubelet에게 재시작 또는 트래픽 제외 판단으로 넘긴다',
              desc: 'kubelet이 컨테이너가 살아 있는지, 요청을 받을 준비가 됐는지 주기적으로 검사하는 방법입니다.',
              ex: { v: 'readinessProbe', lang: 'yaml', code: 'livenessProbe:\n  httpGet: { path: /healthz, port: 8080 }\n  periodSeconds: 10\n  failureThreshold: 3   # 연속 3번 실패 → 컨테이너 재시작\nreadinessProbe:\n  httpGet: { path: /ready, port: 8080 }\n  periodSeconds: 5      # 실패하는 동안 Service 대상에서 제외' }
            },
            {
              id: 'resources', label: 'requests / limits', en: 'Resources', src: ['resources'],
              key: 'requests는 배치할 때 확보할 최소 자원, limits는 넘을 수 없는 최대 자원이다.',
              role: 'Pod 명세에서 자원 값을 받아서 kube-scheduler(배치)와 kubelet(제한)에게 넘긴다',
              desc: 'requests는 스케줄링 시 확보할 최소 자원, limits는 넘을 수 없는 최대 자원입니다.',
              ex: { v: 'cpu: 250m', lang: 'yaml', code: 'resources:\n  requests:\n    cpu: 250m        # 0.25 CPU, 스케줄링 기준\n    memory: 256Mi\n  limits:\n    memory: 512Mi    # 넘으면 OOM으로 종료' }
            }
          ]
        },
        {
          id: 'addons', label: '애드온', en: 'Addons', src: ['components'],
          key: '클러스터에 꼭 필요한 네트워크·DNS 기능을 Pod 형태로 덧붙인 구성요소.',
          role: 'Pod·Service 정보를 받아서 Pod 사이 통신과 이름 찾기 기능으로 넘긴다',
          desc: '클러스터 동작에 필요한 네트워크·DNS 같은 기능을 Pod 형태로 추가한 구성 요소입니다.',
          ex: { v: 'get pods -A', lang: 'bash', code: '$ kubectl get pods -A   # 출력은 요약한 예 (Calico 사용 시)\nNAMESPACE       NAME                       READY   STATUS\ncalico-system   calico-node-8fj2k          1/1     Running\nkube-system     coredns-5d78c9869d-abcde   1/1     Running' },
          children: [
            {
              id: 'cni', label: 'CNI 플러그인', en: 'CNI (예: Calico)', src: ['cni'],
              key: 'Pod마다 IP를 주고 Node 사이의 Pod 통신을 이어 주는 네트워크 플러그인(예: Calico).',
              role: 'Container Runtime에게서 새 Pod 정보를 받아서 Pod에게 IP와 네트워크 연결을 넘긴다',
              desc: 'Pod마다 IP를 주고 Node 사이 Pod 통신을 연결하는 네트워크 플러그인입니다.',
              ex: { v: 'calico-node', lang: 'bash', code: '$ ls /etc/cni/net.d\n10-calico.conflist  calico-kubeconfig\n$ kubectl get pod web -n shop -o wide   # 출력은 요약한 예\nNAME   READY   IP               NODE\nweb    1/1     192.168.33.12    worker-1' }
            },
            {
              id: 'coredns', label: 'CoreDNS', en: 'Cluster DNS', src: ['dns'],
              key: 'my-svc.my-ns.svc.cluster.local 같은 Service 이름을 IP로 바꿔 주는 클러스터 DNS.',
              role: 'Pod의 이름 조회를 받아서 Service의 IP를 넘긴다',
              desc: 'my-svc.my-ns.svc.cluster.local 같은 Service 이름을 IP로 바꿔 주는 클러스터 DNS입니다.',
              ex: { v: 'coredns', lang: 'bash', code: '$ kubectl run tmp --rm -it --image=busybox:1.36 -- nslookup web.shop.svc.cluster.local\nName:    web.shop.svc.cluster.local\nAddress: 10.96.120.15' }
            }
          ]
        }
      ]
    },
    {
      id: 'svcconf', label: '서비스 · 설정', en: 'Services & Config', src: ['service', 'cm', 'pv', 'rbac', 'ns'],
      key: 'Pod에 바뀌지 않는 주소를 주고 바깥 요청을 들여보낸다. 설정·저장소·권한도 Pod와 따로 선언해 바꾸기 쉽게 한다.',
      role: '바깥·클러스터 안의 요청을 받아서 알맞은 Pod에게 넘기고, 설정·저장소·권한을 Pod에게 넘긴다',
      desc: 'Pod에 고정된 주소를 주고 바깥 요청을 들여보내며, 설정·저장소·권한·구역을 Pod와 분리해 선언하는 객체들입니다.',
      children: [
        {
          id: 'networking', label: '네트워킹', en: 'Networking', src: ['service', 'gateway', 'ingress', 'netpol'],
          key: 'Pod는 다시 만들어질 때마다 IP가 바뀐다. 그래서 고정 주소(Service)와 외부 입구(Ingress·Gateway)를 둔다.',
          role: '사용자·다른 Pod의 요청을 받아서 규칙에 맞는 Pod에게 넘긴다',
          desc: 'Service로 Pod 앞에 고정 주소를 두고, Ingress·Gateway API로 외부 요청을 들여보내며, NetworkPolicy로 허용 트래픽을 정합니다.',
          ex: { v: 'service/web', lang: 'text', code: '외부 요청 (shop.example.com)\n  → Gateway + HTTPRoute            (권장)\n  → 또는 Ingress (ingressClassName: nginx)\n  → service/web  ClusterIP 10.96.120.15:80\n  → Pod app=web :8080\n  → Pod app=db  :5432  (NetworkPolicy db-allow-web 이 허용한 트래픽만)' },
          children: [
            {
              id: 'service', label: 'Service', en: 'Service', src: ['service'],
              key: '계속 바뀌는 Pod들 앞에 고정된 이름과 가상 IP를 두고 요청을 나눠 보낸다.',
              role: 'Gateway·다른 Pod에게서 요청을 받아서 Label이 맞는 Pod들에게 나눠 넘긴다',
              desc: '계속 바뀌는 Pod들 앞에 고정된 이름과 가상 IP를 두어 트래픽을 나눠 보내는 객체입니다.',
              ex: { v: 'service/web', lang: 'bash', code: '# selector: { app: web }, port 80 → targetPort 8080\n$ kubectl get svc -n shop   # 출력은 요약한 예\nNAME     TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)\nweb      ClusterIP      10.96.120.15   <none>        80/TCP\nweb-np   NodePort       10.96.44.7     <none>        80:30080/TCP\nweb-lb   LoadBalancer   10.96.201.3    <pending>     80:31512/TCP' }
            },
            {
              id: 'clusterip', label: 'ClusterIP', en: 'type: ClusterIP', src: ['service'],
              key: '기본 Service 유형. 클러스터 안에서만 닿는 가상 IP를 준다.',
              role: '클러스터 안 Pod의 요청을 받아서 대상 Pod에게 넘긴다',
              desc: '기본 Service 유형으로, 클러스터 안에서만 닿는 가상 IP를 줍니다.',
              ex: { v: 'ClusterIP', lang: 'yaml', code: 'spec:\n  type: ClusterIP        # 기본값이라 생략 가능\n  selector: { app: web }\n  ports: [{ port: 80, targetPort: 8080 }]\n# 클러스터 안에서: curl http://web.shop.svc.cluster.local' }
            },
            {
              id: 'nodeport', label: 'NodePort', en: 'type: NodePort', src: ['service'],
              key: '모든 Node의 같은 포트(기본 30000-32767)를 열어 바깥에서 NodeIP:포트로 접근하게 한다.',
              role: '바깥에서 Node 포트로 들어온 요청을 받아서 Service에게 넘긴다',
              desc: '모든 Node의 같은 포트(기본 30000-32767)를 열어 외부에서 NodeIP:포트로 접근하게 합니다.',
              ex: { v: 'NodePort', lang: 'yaml', code: 'spec:\n  type: NodePort\n  selector: { app: web }\n  ports: [{ port: 80, targetPort: 8080, nodePort: 30080 }]\n# 외부에서: curl http://<NodeIP>:30080' }
            },
            {
              id: 'lb', label: 'LoadBalancer', en: 'type: LoadBalancer', src: ['service'],
              key: '외부 로드밸런서가 받은 외부 IP의 요청을 Service로 보낸다. 클라우드나 MetalLB 같은 구현체가 있어야 IP가 생긴다.',
              role: '외부 로드밸런서에게서 요청을 받아서 Node를 거쳐 Service에게 넘긴다',
              desc: '외부 로드밸런서가 외부 IP를 받아 Service로 전달하며, 클라우드나 MetalLB 같은 구현체가 있어야 IP가 할당됩니다.',
              ex: { v: 'LoadBalancer', lang: 'yaml', code: 'spec:\n  type: LoadBalancer\n  selector: { app: web }\n  ports: [{ port: 80, targetPort: 8080 }]\n# 구현체가 IP를 할당하면 EXTERNAL-IP에 표시되고,\n# 구현체가 없으면 계속 <pending>' }
            },
            {
              id: 'ingress', label: 'Ingress', en: 'Ingress', src: ['ingress'],
              key: 'host·path 규칙으로 HTTP 요청을 Service에 보내는 객체. 기능 추가가 멈춰 공식 문서는 Gateway API를 권장한다.',
              role: '바깥의 HTTP 요청을 Ingress controller가 받아서 규칙에 맞는 Service에게 넘긴다',
              desc: 'host·path 규칙으로 HTTP 요청을 Service에 보내는 객체로, API가 동결돼 공식 문서는 Gateway API를 권장합니다.',
              ex: { v: 'ingressClassName: nginx', lang: 'yaml', code: 'apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata: { name: web, namespace: shop }\nspec:\n  ingressClassName: nginx\n  rules:\n  - host: shop.example.com\n    http:\n      paths:\n      - path: /\n        pathType: Prefix\n        backend: { service: { name: web, port: { number: 80 } } }' }
            },
            {
              id: 'gateway', label: 'Gateway API', en: 'Gateway / HTTPRoute', src: ['gateway'],
              key: '클러스터 밖 HTTP 요청을 규칙(HTTPRoute)에 따라 안쪽 Service로 연결하는 입구. Ingress의 후속 표준이다.',
              role: '바깥의 요청을 받아서 HTTPRoute 규칙에 맞는 Service에게 넘긴다',
              desc: '클러스터 밖의 HTTP 요청을 규칙(HTTPRoute)에 따라 내부 Service로 연결하는 진입점입니다.',
              ex: { v: 'HTTPRoute', lang: 'yaml', code: 'apiVersion: gateway.networking.k8s.io/v1\nkind: HTTPRoute\nmetadata: { name: web, namespace: shop }\nspec:\n  parentRefs: [{ name: shop-gateway }]   # 인프라 담당이 만든 Gateway\n  hostnames: ["shop.example.com"]\n  rules:\n  - matches: [{ path: { type: PathPrefix, value: / } }]\n    backendRefs: [{ name: web, port: 80 }]' }
            },
            {
              id: 'netpol', label: 'NetworkPolicy', en: 'NetworkPolicy', src: ['netpol', 'cni'],
              key: 'Pod 사이에 어떤 통신을 허용할지 Label로 정하는 방화벽 규칙. CNI 플러그인이 지원해야 실제로 적용된다.',
              role: 'Pod 사이의 트래픽을 받아서 허용된 것만 상대 Pod에게 넘긴다',
              desc: 'Pod 사이에 허용할 트래픽을 label로 정하는 규칙으로, CNI 플러그인이 지원해야 실제로 적용됩니다.',
              ex: { v: 'db-allow-web', lang: 'yaml', code: 'apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata: { name: db-allow-web, namespace: shop }\nspec:\n  podSelector: { matchLabels: { app: db } }\n  policyTypes: [Ingress]\n  ingress:\n  - from: [{ podSelector: { matchLabels: { app: web } } }]\n    ports: [{ port: 5432 }]' }
            }
          ]
        },
        {
          id: 'config', label: 'ConfigMap · Secret', en: 'Configuration', src: ['cm', 'secret'],
          key: 'ConfigMap에는 일반 설정값을, Secret에는 비밀번호 같은 민감 정보를 담아 이미지와 분리해 Pod에 넣는다.',
          role: '사용자에게서 설정값을 받아서 Pod에게 환경 변수나 파일로 넘긴다',
          desc: '설정값과 비밀번호 같은 민감 정보를 이미지와 분리해 Pod에 주입하는 객체입니다.',
          ex: { v: 'configmap/web-config', lang: 'yaml', code: 'apiVersion: v1\nkind: ConfigMap\nmetadata: { name: web-config, namespace: shop }\ndata: { LOG_LEVEL: info }\n---\napiVersion: v1\nkind: Secret\nmetadata: { name: db-pass, namespace: shop }\ntype: Opaque\nstringData: { PASSWORD: change-me }\n---\n# Pod spec\nenvFrom:\n- configMapRef: { name: web-config }\n- secretRef: { name: db-pass }' }
        },
        {
          id: 'storage', label: '저장소', en: 'Storage', src: ['pv', 'sc'],
          key: 'Pod가 사라져도 남아야 하는 데이터를 PVC·PV·StorageClass로 연결한다.',
          role: 'Pod에게서 저장소 요청을 받아서 실제 디스크(PV)를 연결해 넘긴다',
          desc: 'Pod가 사라져도 남아야 하는 데이터를 PVC·PV·StorageClass로 연결합니다.',
          ex: { v: 'data-db-0', lang: 'text', code: 'StorageClass nfs-csi  (provisioner: nfs.csi.k8s.io)\n   ↓ PVC가 생기면 PV를 자동 생성 (동적 프로비저닝)\nPVC data-db-0  ── Bound ──  PV pvc-3c1f9e (10Gi, RWO)\n   ↓\nPod db-0 의 데이터 디렉터리에 마운트' },
          children: [
            {
              id: 'pvc', label: 'PV · PVC', en: 'Persistent Volume', src: ['pv'],
              key: 'PVC로 "이만큼, 이런 방식으로 쓸 저장소"를 요청하면 맞는 PV가 연결(Bound)돼 Pod에 마운트된다.',
              role: 'Pod에게서 저장소 요청을 받아서 연결된 PV를 Pod에게 넘긴다',
              desc: 'PVC로 저장소 크기·접근 방식을 요청하면 조건에 맞는 PV가 연결(Bound)돼 Pod에 마운트됩니다.',
              ex: { v: 'data-db-0', lang: 'bash', code: '$ kubectl get pvc,pv -n shop   # 출력은 요약한 예\npersistentvolumeclaim/data-db-0   Bound   pvc-3c1f9e   10Gi   RWO   nfs-csi\npersistentvolume/pvc-3c1f9e       10Gi    RWO   Delete   Bound   shop/data-db-0' }
            },
            {
              id: 'storageclass', label: 'StorageClass', en: 'StorageClass', src: ['sc'],
              key: 'PVC 요청이 오면 어떤 방식(프로비저너)으로 PV를 자동으로 만들지 정해 둔 틀.',
              role: 'PVC 요청을 받아서 프로비저너에게 PV 생성 요청으로 넘긴다',
              desc: 'PVC 요청이 오면 어떤 프로비저너로 PV를 자동 생성할지 정해 둔 틀입니다.',
              ex: { v: 'nfs-csi', lang: 'yaml', code: 'apiVersion: storage.k8s.io/v1\nkind: StorageClass\nmetadata: { name: nfs-csi }\nprovisioner: nfs.csi.k8s.io\nparameters:\n  server: 10.0.0.20\n  share: /exports/k8s\nreclaimPolicy: Delete\nvolumeBindingMode: Immediate' }
            }
          ]
        },
        {
          id: 'access', label: '접근 제어', en: 'Access Control', src: ['rbac', 'sa'],
          key: '사람과 Pod 안의 프로그램이 어떤 계정·권한으로 API에 접근할지 정한다.',
          role: 'API 요청을 보낸 계정 정보를 받아서 kube-apiserver에게 허용 여부로 넘긴다',
          desc: '사람과 Pod 안 애플리케이션이 어떤 계정·권한으로 API에 접근할지 정합니다.',
          ex: { v: 'serviceaccount/web', lang: 'text', code: '사람 (kubectl)        → User / Group          ┐\nPod 안 애플리케이션   → ServiceAccount web    ┘\n        ↓ RoleBinding\nRole pod-reader  (pods: get, list, watch)' },
          children: [
            {
              id: 'rbac', label: 'RBAC', en: 'Role / RoleBinding', src: ['rbac'],
              key: '누가 어떤 리소스에 어떤 동작(get, create 등)을 할 수 있는지 정하는 권한 규칙.',
              role: '요청한 계정과 동작을 받아서 kube-apiserver에게 허용·거부 결과로 넘긴다',
              desc: '누가 어떤 리소스에 어떤 동작(get, create 등)을 할 수 있는지 정하는 권한 규칙입니다.',
              ex: { v: 'Role pod-reader', lang: 'yaml', code: 'apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata: { name: pod-reader, namespace: shop }\nrules:\n- apiGroups: [""]\n  resources: ["pods"]\n  verbs: ["get", "list", "watch"]\n---\napiVersion: rbac.authorization.k8s.io/v1\nkind: RoleBinding\nmetadata: { name: web-reads-pods, namespace: shop }\nsubjects: [{ kind: ServiceAccount, name: web, namespace: shop }]\nroleRef: { kind: Role, name: pod-reader, apiGroup: rbac.authorization.k8s.io }\n# kubectl auth can-i list pods -n shop --as=system:serviceaccount:shop:web → yes' }
            },
            {
              id: 'serviceaccount', label: 'ServiceAccount', en: 'ServiceAccount', src: ['sa'],
              key: 'Pod 안 프로세스가 API Server에 접근할 때 쓰는, Namespace에 속한 계정.',
              role: 'Pod에게 토큰을 받아서 kube-apiserver에게 요청자 신원으로 넘긴다',
              desc: 'Pod 안 프로세스가 API Server에 접근할 때 쓰는 Namespace 단위 계정입니다.',
              ex: { v: 'ServiceAccount web', lang: 'yaml', code: '# kubectl create serviceaccount web -n shop\n# Pod spec\nspec:\n  serviceAccountName: web\n# 토큰이 /var/run/secrets/kubernetes.io/serviceaccount/ 에 자동 마운트됨' }
            }
          ]
        },
        {
          id: 'nsgroup', label: 'Namespace · Label', en: 'Organizing objects', src: ['ns', 'labels'],
          key: '객체가 많아지면 구역(Namespace)으로 나누고, 이름표(Label)를 붙여 골라 묶는다.',
          role: '사용자에게서 구역·이름표를 받아서 Service·워크로드의 선택(selector)과 권한 범위로 넘긴다',
          desc: 'Namespace로 객체를 구역별로 나누고, Label을 붙여 selector로 객체를 골라 묶습니다.',
          children: [
            {
              id: 'namespace', label: 'Namespace', en: 'Namespace', src: ['ns'],
              key: '한 클러스터 안에서 객체 이름과 권한·할당량을 나누는 논리적 구역.',
              role: '사용자에게서 객체를 받아서 정해진 구역 안의 이름 범위로 넘긴다',
              desc: '한 클러스터 안에서 객체 이름과 권한·할당량을 나누는 논리적 구역입니다.',
              ex: { v: 'namespace/shop', lang: 'bash', code: '$ kubectl create namespace shop\nnamespace/shop created\n$ kubectl get pods -n shop\n$ kubectl config set-context --current --namespace=shop' }
            },
            {
              id: 'labels', label: 'Label · Annotation', en: 'Labels / Annotations', src: ['labels', 'annotations'],
              key: 'Label은 객체를 골라 묶는 key-value 이름표, Annotation은 고르는 데 쓰지 않는 부가 정보다.',
              role: '객체에 붙은 Label을 받아서 Service·Deployment의 selector에게 넘긴다',
              desc: 'Label은 selector로 객체를 골라 묶는 key-value이고, Annotation은 선택에 쓰이지 않는 부가 정보입니다.',
              ex: { v: 'app=web', lang: 'yaml', code: 'metadata:\n  labels:\n    app: web          # Service·Deployment selector가 고르는 기준\n    tier: frontend\n  annotations:\n    kubernetes.io/change-cause: "image 1.4.0 배포"   # 선택에 쓰지 않는 메모\n# kubectl get pods -l app=web,tier=frontend' }
            }
          ]
        }
      ]
    }
  ],

  icons: {
    "kubectl": "terminal",
    "kubeconfig": "key",
    "kustomize": "manifest",
    "cp": "k8s-cp",
    "apiserver": "k8s-api",
    "etcd": "k8s-etcd",
    "scheduler": "k8s-sched",
    "taint": "shield",
    "affinity": "target",
    "ctrlmgr": "k8s-ctrl",
    "node": "k8s-node",
    "kubelet": "k8s-kubelet",
    "staticpod": "k8s-pod",
    "runtime": "logo-containerd",
    "kubeproxy": "k8s-proxy",
    "pod": "k8s-pod",
    "container": "cube",
    "probe": "pulse",
    "resources": "gauge",
    "addons": "plug",
    "cni": "logo-cni",
    "coredns": "logo-coredns",
    "namespace": "k8s-ns",
    "labels": "tag",
    "workloads": "workflow",
    "deployment": "k8s-deploy",
    "replicaset": "k8s-rs",
    "statefulset": "k8s-sts",
    "daemonset": "k8s-ds",
    "job": "k8s-job",
    "hpa": "k8s-hpa",
    "networking": "network",
    "service": "k8s-svc",
    "clusterip": "link",
    "nodeport": "door",
    "lb": "balance",
    "ingress": "k8s-ing",
    "gateway": "route",
    "netpol": "k8s-netpol",
    "config": "k8s-configmap",
    "storage": "disk",
    "pvc": "k8s-pvc",
    "storageclass": "k8s-sc",
    "access": "lock",
    "rbac": "k8s-role",
    "serviceaccount": "k8s-sa",
    "crd": "k8s-crd",
    "svcconf": "link",
    "nsgroup": "tag"
  },

  flows: [
    {
      main: true, id: 'main', title: '기본 흐름: 제출 → 기록 → 개수 유지 → 실행 → 연결', src: ['components', 'workloads', 'service'], desc: 'YAML 한 장이 서비스로 열리기까지 거의 항상 거치는 5단계입니다.',
      steps: [
        { node: 'kubectl', text: 'kubectl apply로 원하는 상태(YAML)를 제출한다' },
        { node: 'cp', text: 'Control Plane이 요청을 확인하고 etcd에 기록한다' },
        { node: 'workloads', text: 'Deployment 같은 워크로드가 정한 개수만큼 Pod를 만들고 계속 유지한다' },
        { node: 'node', text: 'Scheduler가 고른 Worker Node에서 kubelet이 Pod를 실행한다' },
        { node: 'svcconf', text: 'Service가 Pod들 앞에 고정 주소를 두고 요청을 연결한다' }
      ]
    },
    {
      id: 'create', title: 'Deployment로 Pod가 실행되는 흐름', at: 'workloads', src: ['components', 'controller', 'scheduler'], desc: 'kubectl apply -f deploy.yaml부터 컨테이너가 Running이 되기까지의 순서입니다.',
      steps: [
        { node: 'kubectl', text: 'kubectl apply로 Deployment YAML을 제출합니다.' },
        { node: 'apiserver', text: 'API Server가 인증·검증 후 요청을 받아들입니다.' },
        { node: 'etcd', text: '원하는 상태(Deployment)가 etcd에 저장됩니다.' },
        { node: 'deployment', text: 'Deployment 컨트롤러가 이를 감지해 ReplicaSet을 만듭니다.' },
        { node: 'replicaset', text: 'ReplicaSet 컨트롤러가 replicas 수만큼 Pod 객체를 만듭니다.' },
        { node: 'scheduler', text: 'Scheduler가 각 Pod를 실행할 Node를 정합니다.' },
        { node: 'kubelet', text: '해당 Node의 kubelet이 자기 Pod를 발견합니다.' },
        { node: 'runtime', text: 'CRI로 containerd가 이미지를 받아 컨테이너를 만듭니다.' },
        { node: 'cni', text: 'CNI 플러그인이 Pod에 IP를 붙입니다.' },
        { node: 'pod', text: 'Probe를 통과하면 Pod가 Running·Ready가 됩니다.' }
      ]
    },
    {
      id: 'traffic', title: '외부 요청이 Container에 닿는 흐름', at: 'svcconf', src: ['gateway', 'service', 'dns'], desc: '클러스터 밖 사용자의 HTTP 요청이 Pod 안의 컨테이너까지 전달되는 순서입니다.',
      steps: [
        { node: 'gateway', text: 'Gateway가 요청을 받고 HTTPRoute 규칙으로 대상 Service를 고릅니다.' },
        { node: 'coredns', text: '클러스터 내부에서는 CoreDNS가 Service 이름을 IP로 바꿉니다.' },
        { node: 'service', text: 'Service가 label selector로 Ready 상태의 Pod 목록을 가집니다.' },
        { node: 'kubeproxy', text: 'kube-proxy 규칙이 그중 한 Pod로 패킷을 보냅니다.' },
        { node: 'pod', text: 'CNI가 연결한 Pod IP로 요청이 도착합니다.' },
        { node: 'container', text: '컨테이너의 애플리케이션이 요청을 처리하고 응답합니다.' }
      ]
    },
    {
      id: 'workload', title: '운영용 Pod 설정 흐름 (권한·설정·저장소·자원)', at: 'svcconf', src: ['ns', 'rbac', 'cm', 'secret', 'pv', 'sc', 'resources', 'probes'], desc: '애플리케이션을 실제 운영에 올릴 때 Pod 주변에 붙이는 설정을 순서대로 봅니다.',
      steps: [
        { node: 'namespace', text: 'Namespace를 만들어 팀·환경별로 객체 이름과 권한 범위를 나눕니다.' },
        { node: 'rbac', text: 'Role·RoleBinding으로 그 Namespace에서 누가 무엇을 할 수 있는지 정합니다.' },
        { node: 'config', text: '일반 설정은 ConfigMap, 비밀번호 같은 값은 Secret으로 분리해 Pod에 주입합니다.' },
        { node: 'pvc', text: 'PVC로 저장소를 요청하면 StorageClass가 PV를 만들어 연결합니다.' },
        { node: 'resources', text: '컨테이너마다 CPU·메모리 requests와 limits를 적습니다.' },
        { node: 'scheduler', text: 'Scheduler는 requests를 수용할 여유가 있는 Node에만 Pod를 배치합니다.' },
        { node: 'probe', text: 'kubelet이 liveness·readiness Probe로 컨테이너 상태를 주기적으로 검사합니다.' },
        { node: 'pod', text: 'readiness를 통과한 Pod만 Service 트래픽을 받습니다.' }
      ]
    },
    {
      id: 'bootstrap', title: 'Control Plane 기동 흐름 (kubeadm)', at: 'cp', src: ['kubeadm', 'static', 'components', 'controller'], desc: 'kubeadm으로 만든 클러스터에서 Control Plane 구성 요소가 뜨는 방식입니다.',
      steps: [
        { node: 'kubelet', text: 'kubeadm init 후 kubelet이 /etc/kubernetes/manifests 디렉터리를 감시합니다.' },
        { node: 'staticpod', text: '그 디렉터리의 YAML은 API Server 없이 kubelet이 직접 Static Pod로 실행합니다.' },
        { node: 'etcd', text: 'etcd가 Static Pod로 떠서 클러스터 상태 저장소가 준비됩니다.' },
        { node: 'apiserver', text: 'kube-apiserver Static Pod가 etcd에 연결해 API를 엽니다.' },
        { node: 'scheduler', text: 'kube-scheduler가 API Server를 지켜보며 Node가 없는 Pod를 배치합니다.' },
        { node: 'ctrlmgr', text: 'kube-controller-manager가 컨트롤 루프로 현재 상태를 원하는 상태에 맞춥니다.' }
      ]
    },
    {
      id: 'schedule', title: 'Pod가 놓일 Node가 정해지는 흐름', at: 'cp', src: ['scheduler', 'resources', 'taint', 'affinity'], desc: 'Scheduler가 Filter와 Score 단계로 Node를 고르고 kubelet이 실행하기까지입니다.',
      steps: [
        { node: 'resources', text: 'Pod의 requests가 Node의 남은 자원 안에 들어가는지가 첫 조건입니다.' },
        { node: 'scheduler', text: 'Scheduler가 Node가 비어 있는 Pod를 발견하고 후보 Node를 걸러냅니다(Filter).' },
        { node: 'taint', text: 'Taint가 걸린 Node는 맞는 Toleration이 있는 Pod만 통과합니다.' },
        { node: 'affinity', text: 'nodeSelector·Affinity 조건에 맞는 Node만 남기고 점수를 매깁니다(Score).' },
        { node: 'kubelet', text: '선택된 Node의 kubelet이 Pod를 받아 런타임에 실행을 지시합니다.' }
      ]
    },
    {
      id: 'stateful', title: 'StatefulSet이 저장소를 받는 흐름', at: 'workloads', src: ['sts', 'pv', 'sc'], desc: 'volumeClaimTemplates로 Pod마다 전용 PVC가 생기고 PV가 연결되는 순서입니다.',
      steps: [
        { node: 'statefulset', text: 'StatefulSet이 db-0부터 순서대로 Pod를 만들고, Pod마다 PVC(data-db-0)를 만듭니다.' },
        { node: 'pvc', text: 'PVC가 storageClassName으로 원하는 저장소 종류를 요청합니다.' },
        { node: 'storageclass', text: 'StorageClass의 프로비저너가 PV를 자동으로 만들어 PVC와 Bound 시킵니다.' },
        { node: 'scheduler', text: 'Scheduler가 Pod를 Node에 배정합니다.' },
        { node: 'pod', text: 'kubelet이 볼륨을 마운트하고 Pod를 실행합니다. Pod가 다시 만들어져도 같은 PVC를 씁니다.' }
      ]
    },
    {
      id: 'autoscale', title: 'HPA가 Pod 수를 늘리는 흐름', at: 'workloads', src: ['hpa', 'resources', 'deploy', 'probes'], desc: 'CPU 사용률이 목표를 넘을 때 Pod가 늘어나고 트래픽을 받기까지입니다.',
      steps: [
        { node: 'resources', text: 'HPA의 CPU 사용률은 컨테이너 requests 대비 비율이라 requests가 있어야 합니다.' },
        { node: 'hpa', text: 'HPA가 지표를 주기적으로 읽어 목표(70%)를 넘으면 필요한 replicas를 계산합니다.' },
        { node: 'deployment', text: 'Deployment의 replicas 값이 바뀝니다.' },
        { node: 'replicaset', text: 'ReplicaSet 컨트롤러가 늘어난 수만큼 Pod를 만듭니다.' },
        { node: 'scheduler', text: '새 Pod가 Node에 배정됩니다.' },
        { node: 'probe', text: 'readinessProbe를 통과한 Pod부터' },
        { node: 'service', text: 'Service의 트래픽 대상에 추가됩니다.' }
      ]
    }
  ],

  terms: [
    { term: 'Pod', summary: '컨테이너를 묶어 배포하는 가장 작은 단위', vs: { term: 'Container', diff: 'Container는 프로세스 하나의 실행 단위이고, Pod는 IP·저장소를 공유하는 컨테이너 묶음' }, src: ['pods'], nodes: ['pod'] },
    { term: 'Deployment', summary: '무상태 Pod의 개수·버전·롤링 업데이트를 관리하는 객체', vs: { term: 'StatefulSet', diff: 'Deployment의 Pod는 서로 대체 가능하고, StatefulSet의 Pod는 고정 이름·전용 저장소를 가짐' }, src: ['deploy', 'sts'], nodes: ['deployment', 'statefulset'] },
    { term: 'ReplicaSet', summary: '같은 Pod를 지정 개수만큼 유지하는 객체', vs: { term: 'Deployment', diff: 'ReplicaSet은 개수만 유지하고, Deployment는 ReplicaSet을 바꿔 가며 버전 교체·롤백까지 수행' }, src: ['rs', 'deploy'], nodes: ['replicaset'] },
    { term: 'DaemonSet', summary: '모든(또는 선택한) Node마다 Pod를 하나씩 실행하는 객체', vs: { term: 'Deployment', diff: 'Deployment는 개수를 정하고, DaemonSet은 Node 수에 따라 Node당 하나씩 자동 배치' }, src: ['ds', 'deploy'], nodes: ['daemonset'] },
    { term: 'Service', summary: 'Pod 묶음에 고정된 이름·가상 IP를 주는 객체', vs: { term: 'Gateway API', diff: 'Service는 클러스터 내부 L4 진입점이고, Gateway API는 외부 HTTP 요청을 경로·호스트 규칙으로 라우팅' }, src: ['service', 'gateway'], nodes: ['service'] },
    { term: 'ClusterIP', summary: '클러스터 안에서만 접근 가능한 기본 Service 유형', vs: { term: 'NodePort', diff: 'ClusterIP는 내부 전용이고, NodePort는 모든 Node의 지정 포트로 외부 접근을 허용' }, src: ['service'], nodes: ['clusterip', 'nodeport'] },
    { term: 'Gateway API', summary: '외부 트래픽 라우팅을 역할별 객체(Gateway·HTTPRoute)로 나눈 표준 API', vs: { term: 'Ingress', diff: 'Ingress는 단일 객체에 기능이 제한적이고, Gateway API는 역할 분리·확장성을 갖춘 후속 표준' }, src: ['gateway', 'ingress'], nodes: ['gateway', 'ingress'] },
    { term: 'ConfigMap', summary: '일반 설정값을 key-value로 Pod에 전달하는 객체', vs: { term: 'Secret', diff: 'ConfigMap은 평문 설정용이고, Secret은 비밀번호·토큰 같은 민감 정보용(기본은 base64 인코딩일 뿐 암호화 아님)' }, src: ['cm', 'secret'], nodes: ['config'] },
    { term: 'PVC', summary: 'Pod가 필요한 저장소 크기·접근 방식을 요청하는 객체', vs: { term: 'PV', diff: 'PVC는 사용자의 요청서이고, PV는 그 요청에 연결되는 실제 저장소 자원' }, src: ['pv'], nodes: ['pvc'] },
    { term: 'StorageClass', summary: 'PV를 자동으로 만드는 방식(프로비저너)을 정의한 객체', vs: { term: 'PV', diff: 'StorageClass는 저장소를 만드는 틀이고, PV는 그 틀로 실제 만들어진 저장소' }, src: ['sc', 'pv'], nodes: ['storageclass'] },
    { term: 'Namespace (Kubernetes)', summary: '클러스터 안에서 객체를 나누는 논리적 구역', vs: { term: 'Linux namespace', diff: 'Kubernetes Namespace는 API 객체의 이름 범위이고, Linux namespace는 프로세스의 커널 자원 격리' }, src: ['ns', 'linuxns'], nodes: ['namespace'] },
    { term: 'Label', summary: '객체를 고르고 묶기 위해 붙이는 key-value', vs: { term: 'Annotation', diff: 'Label은 selector로 객체를 선택하는 데 쓰이고, Annotation은 선택에 쓰이지 않는 부가 정보' }, src: ['labels', 'annotations'], nodes: ['labels'] },
    { term: 'Taint', summary: 'Node에 붙여 일반 Pod가 오지 못하게 밀어내는 표시', vs: { term: 'Toleration', diff: 'Taint는 Node에 거는 제한이고, Toleration은 Pod가 그 제한을 견딜 수 있다는 허용 표시' }, src: ['taint'], nodes: ['taint'] },
    { term: 'nodeSelector', summary: 'Node label로 Pod가 갈 Node를 지정하는 조건', vs: { term: 'Taint', diff: 'nodeSelector는 Pod가 Node를 고르는 것이고, Taint는 Node가 Pod를 거절하는 것' }, src: ['affinity', 'taint'], nodes: ['affinity'] },
    { term: 'requests', summary: '스케줄링 시 보장받는 최소 CPU·메모리', vs: { term: 'limits', diff: 'requests는 배치 기준이 되는 보장량이고, limits는 넘으면 CPU 제한·메모리 OOM 종료되는 상한' }, src: ['resources'], nodes: ['resources'] },
    { term: 'Liveness probe', summary: '컨테이너가 살아 있는지 검사하고 실패 시 재시작', vs: { term: 'Readiness probe', diff: 'Liveness 실패는 재시작을, Readiness 실패는 Service 트래픽 대상에서 제외를 일으킴' }, src: ['probes'], nodes: ['probe'] },
    { term: 'kubelet', summary: 'Node에서 Pod 실행을 책임지는 에이전트', vs: { term: 'kube-proxy', diff: 'kubelet은 컨테이너 실행·상태를, kube-proxy는 Service 트래픽 전달 규칙을 담당' }, src: ['components'], nodes: ['kubelet'] },
    { term: 'kube-apiserver', summary: '클러스터의 모든 요청을 받는 API 서버', vs: { term: 'etcd', diff: 'API Server는 요청을 검증·처리하는 입구이고, etcd는 그 결과 상태를 저장하는 데이터베이스' }, src: ['components', 'etcd'], nodes: ['apiserver'] },
    { term: 'Control Plane', summary: '클러스터 상태를 저장·결정·조정하는 관리 영역', vs: { term: 'Worker Node', diff: 'Control Plane은 무엇을 어디서 실행할지 결정하고, Worker Node는 실제로 Pod를 실행' }, src: ['components'], nodes: ['cp'] },
    { term: 'CRI', summary: 'kubelet이 컨테이너 런타임과 통신하는 표준 인터페이스', vs: { term: 'containerd', diff: 'CRI는 kubelet과 런타임이 대화하는 규격이고, containerd는 그 규격을 구현한 실제 런타임' }, src: ['cri', 'cni'], nodes: ['runtime'] },
    { term: 'Static Pod', summary: 'kubelet이 매니페스트 파일로 직접 실행하는 Pod', vs: { term: '일반 Pod', diff: '일반 Pod는 API Server·Scheduler를 거쳐 배치되고, Static Pod는 특정 Node의 kubelet이 바로 실행' }, src: ['static'], nodes: ['staticpod'] },
    { term: 'kubectl apply', summary: 'YAML에 적은 원하는 상태를 선언적으로 반영하는 명령', vs: { term: 'kubectl create', diff: 'create는 새로 만들기만 하는 명령형이고, apply는 기존 객체와 비교해 차이만 반영하는 선언형' }, src: ['objmgmt', 'kubectl'], nodes: ['kubectl', 'kustomize'] },
    { term: 'HPA', summary: 'CPU 사용률 등 지표에 따라 Pod 수를 자동 조절', vs: { term: 'replicas 수동 설정', diff: 'replicas는 사람이 정한 고정 개수이고, HPA는 지표를 보고 그 값을 자동으로 바꿈' }, src: ['hpa'], nodes: ['hpa'] },
    { term: 'NetworkPolicy', summary: 'Pod 간 허용할 트래픽을 정하는 방화벽 규칙', vs: { term: 'Service', diff: 'Service는 트래픽을 보낼 주소를 제공하고, NetworkPolicy는 그 트래픽의 허용 여부를 결정' }, src: ['netpol', 'service'], nodes: ['netpol'] },
    { term: 'Role', summary: '한 Namespace 안의 권한 묶음', vs: { term: 'ClusterRole', diff: 'Role은 특정 Namespace에만, ClusterRole은 클러스터 전체·Node 같은 비 Namespace 리소스까지 적용' }, src: ['rbac'], nodes: ['rbac'] },
    { term: 'kubeconfig context', summary: 'cluster·user·namespace 조합에 붙인 이름', vs: { term: 'Namespace', diff: 'Namespace는 클러스터 안의 객체 구역이고, context는 어느 cluster에 어떤 user로 접속할지(기본 Namespace 포함)를 묶은 이름' }, src: ['kubeconfig'], nodes: ['kubeconfig'] },
    { term: 'kubectl apply -k', summary: 'kustomization.yaml로 조합한 결과를 적용', vs: { term: 'kubectl apply -f', diff: '-f는 YAML 파일을 그대로 적용하고, -k는 base에 overlay 변경을 덧씌운 결과를 적용' }, src: ['kustomize'], nodes: ['kustomize'] },
    { term: 'Job', summary: '완료될 때까지 실행되는 일회성 작업', vs: { term: 'CronJob', diff: 'Job은 한 번 실행되고, CronJob은 cron 형식 schedule에 맞춰 Job을 반복 생성' }, src: ['job', 'cronjob'], nodes: ['job'] },
    { term: 'CRD', summary: 'API에 새 객체 종류를 추가하는 정의', vs: { term: 'Operator', diff: 'CRD는 객체 형식만 추가하고, Operator는 그 객체를 보고 실제 작업을 수행하는 컨트롤러' }, src: ['crd', 'operator'], nodes: ['crd'] },
    { term: 'ServiceAccount', summary: 'Pod 안 프로세스가 API에 접근할 때 쓰는 계정', vs: { term: 'User account', diff: 'User는 사람용으로 Kubernetes 객체가 아니고, ServiceAccount는 Namespace에 속한 API 객체' }, src: ['sa'], nodes: ['serviceaccount'] },
    { term: 'LoadBalancer', summary: '외부 로드밸런서로 Service를 노출하는 유형', vs: { term: 'NodePort', diff: 'NodePort는 NodeIP:포트로 직접 접근하고, LoadBalancer는 구현체가 준 외부 IP로 받아 Node로 전달' }, src: ['service'], nodes: ['lb'] },
    { term: 'Workload', summary: 'Pod를 대신 만들고 개수·배치를 유지하는 관리 객체(Deployment 등)', vs: { term: 'Pod', diff: 'Pod는 실제 실행 단위이고, 워크로드는 Pod를 만들고 고장 나면 다시 만드는 관리자' }, nodes: ['workloads'], src: ['workloads'] },
    { term: 'Node', summary: 'Pod가 실행되는 서버(물리 또는 가상 머신)', vs: { term: 'Pod', diff: 'Node는 서버 한 대이고, Pod는 그 서버 위에서 실행되는 컨테이너 묶음' }, nodes: ['node'], src: ['nodes'] }
  ]
};
