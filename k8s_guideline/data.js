/* Kubernetes 학습 데이터 — 화면 로직(script.js)과 분리된 구조·설명 데이터 */
window.GUIDE_DATA = {
  meta: {
    id: 'k8s',
    eyebrow: '컨테이너 오케스트레이션',
    title: 'Kubernetes 구조와 동작 흐름',
    subtitle: 'Cluster가 Control Plane과 Worker Node로 나뉘고, Pod 안의 Container가 실행되기까지의 과정을 따라갑니다.',
    checked: '2026-11-09'
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
    { id: 'linuxns', title: 'Linux man-pages — namespaces(7)', url: 'https://man7.org/linux/man-pages/man7/namespaces.7.html', use: 'Linux namespace 비교' }
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
      desc: 'YAML이나 명령으로 원하는 상태를 kube-apiserver에 전달하는 명령줄 도구입니다.'
    },
    {
      id: 'cluster', label: 'Cluster', en: 'Kubernetes Cluster', src: ['components', 'arch'],
      desc: '컨테이너를 실행하는 Node 묶음과 이를 관리하는 Control Plane을 합친 전체 시스템입니다.',
      children: [
        {
          id: 'cp', label: 'Control Plane', en: 'Control Plane', src: ['components'],
          desc: '클러스터의 원하는 상태를 저장하고, 실제 상태가 그와 같아지도록 결정·조정하는 관리 영역입니다.',
          children: [
            { id: 'apiserver', label: 'kube-apiserver', en: 'API Server', src: ['components'], desc: '모든 요청이 거쳐 가는 Kubernetes API의 입구로, 인증·검증 후 etcd에 기록합니다.' },
            { id: 'etcd', label: 'etcd', en: 'etcd', src: ['components', 'etcd'], desc: '클러스터의 모든 객체 상태를 저장하는 key-value 저장소로, 백업이 필수입니다.' },
            { id: 'scheduler', label: 'kube-scheduler', en: 'Scheduler', src: ['scheduler'], desc: 'Node가 정해지지 않은 Pod를 보고 자원·조건에 맞는 Node를 골라 배정합니다.' },
            { id: 'ctrlmgr', label: 'kube-controller-manager', en: 'Controller Manager', src: ['controller', 'components'], desc: 'Deployment·ReplicaSet 등 컨트롤러를 실행해 원하는 개수와 상태를 계속 맞춥니다.' }
          ]
        },
        {
          id: 'node', label: 'Worker Node', en: 'Node', src: ['nodes', 'components'],
          desc: 'Pod가 실제로 실행되는 서버(물리 또는 가상 머신)입니다.',
          children: [
            {
              id: 'kubelet', label: 'kubelet', en: 'kubelet', src: ['components'],
              desc: '각 Node에서 자기에게 배정된 Pod의 컨테이너가 실행되도록 런타임에 지시하고 상태를 보고합니다.',
              children: [
                { id: 'staticpod', label: 'Static Pod', en: 'Static Pod', src: ['static', 'kubeadm'], desc: 'API Server 없이 kubelet이 Node의 매니페스트 파일로 직접 띄우는 Pod로, kubeadm은 Control Plane을 이렇게 실행합니다.' }
              ]
            },
            { id: 'runtime', label: 'Container Runtime', en: 'containerd (CRI)', src: ['cri'], desc: 'kubelet의 CRI 요청을 받아 이미지를 받고 컨테이너를 실제로 실행합니다.' },
            { id: 'kubeproxy', label: 'kube-proxy', en: 'kube-proxy', src: ['components', 'service'], desc: 'Service 주소로 온 트래픽이 뒤쪽 Pod로 가도록 Node의 네트워크 규칙(iptables·nftables 등)을 관리합니다.' },
            {
              id: 'pod', label: 'Pod', en: 'Pod', src: ['pods', 'lifecycle'],
              desc: '하나 이상의 컨테이너가 네트워크·저장소를 공유하며 함께 배치되는 가장 작은 배포 단위입니다.',
              children: [
                { id: 'container', label: 'Container', en: 'Container', src: ['pods'], desc: 'Pod 안에서 실제 애플리케이션 프로세스를 실행하는 컨테이너입니다.' },
                { id: 'probe', label: 'Probe', en: 'Liveness / Readiness', src: ['probes'], desc: 'kubelet이 컨테이너가 살아 있는지, 요청을 받을 준비가 됐는지 주기적으로 검사하는 방법입니다.' },
                { id: 'resources', label: 'requests / limits', en: 'Resources', src: ['resources'], desc: 'requests는 스케줄링 시 확보할 최소 자원, limits는 넘을 수 없는 최대 자원입니다.' }
              ]
            }
          ]
        },
        {
          id: 'addons', label: '애드온', en: 'Addons', src: ['components'],
          desc: '클러스터 동작에 필요한 네트워크·DNS 같은 기능을 Pod 형태로 추가한 구성 요소입니다.',
          children: [
            { id: 'cni', label: 'CNI 플러그인', en: 'CNI (예: Calico)', src: ['cni'], desc: 'Pod마다 IP를 주고 Node 사이 Pod 통신을 연결하는 네트워크 플러그인입니다.' },
            { id: 'coredns', label: 'CoreDNS', en: 'Cluster DNS', src: ['dns'], desc: 'my-svc.my-ns.svc.cluster.local 같은 Service 이름을 IP로 바꿔 주는 클러스터 DNS입니다.' }
          ]
        },
        {
          id: 'objects', label: 'API 객체', en: 'API Objects', src: ['components', 'labels'],
          desc: 'YAML로 선언하는 원하는 상태의 단위로, 컨트롤러가 이 내용을 실제로 만들어 냅니다.',
          children: [
            { id: 'namespace', label: 'Namespace', en: 'Namespace', src: ['ns'], desc: '한 클러스터 안에서 객체 이름과 권한·할당량을 나누는 논리적 구역입니다.' },
            {
              id: 'deployment', label: 'Deployment', en: 'Deployment', src: ['deploy'],
              desc: '무상태 앱의 Pod 개수와 버전을 선언하면 롤링 업데이트·롤백까지 관리해 주는 객체입니다.',
              children: [
                { id: 'replicaset', label: 'ReplicaSet', en: 'ReplicaSet', src: ['rs'], desc: '지정한 개수만큼 같은 Pod가 항상 떠 있도록 유지하며, 보통 Deployment가 자동으로 만듭니다.' }
              ]
            },
            { id: 'service', label: 'Service', en: 'Service', src: ['service'], desc: '계속 바뀌는 Pod들 앞에 고정된 이름과 가상 IP를 두어 트래픽을 나눠 보내는 객체입니다.' },
            { id: 'gateway', label: 'Gateway API', en: 'Gateway / HTTPRoute', src: ['gateway'], desc: '클러스터 밖의 HTTP 요청을 규칙(HTTPRoute)에 따라 내부 Service로 연결하는 진입점입니다.' },
            { id: 'config', label: 'ConfigMap · Secret', en: 'Configuration', src: ['cm', 'secret'], desc: '설정값과 비밀번호 같은 민감 정보를 이미지와 분리해 Pod에 주입하는 객체입니다.' },
            { id: 'pvc', label: 'PV · PVC', en: 'Persistent Storage', src: ['pv', 'sc'], desc: 'PVC로 저장소를 요청하면 StorageClass가 PV를 만들어 Pod에 연결합니다.' },
            { id: 'rbac', label: 'RBAC', en: 'Role / RoleBinding', src: ['rbac'], desc: '누가 어떤 리소스에 어떤 동작(get, create 등)을 할 수 있는지 정하는 권한 규칙입니다.' }
          ]
        }
      ]
    }
  ],

  flows: [
    {
      id: 'create', title: 'Deployment로 Pod가 실행되는 흐름', src: ['components', 'controller', 'scheduler'],
      desc: 'kubectl apply -f deploy.yaml부터 컨테이너가 Running이 되기까지의 순서입니다.',
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
      id: 'traffic', title: '외부 요청이 Container에 닿는 흐름', src: ['gateway', 'service', 'dns'],
      desc: '클러스터 밖 사용자의 HTTP 요청이 Pod 안의 컨테이너까지 전달되는 순서입니다.',
      steps: [
        { node: 'gateway', text: 'Gateway가 요청을 받고 HTTPRoute 규칙으로 대상 Service를 고릅니다.' },
        { node: 'coredns', text: '클러스터 내부에서는 CoreDNS가 Service 이름을 IP로 바꿉니다.' },
        { node: 'service', text: 'Service가 label selector로 Ready 상태의 Pod 목록을 가집니다.' },
        { node: 'kubeproxy', text: 'kube-proxy 규칙이 그중 한 Pod로 패킷을 보냅니다.' },
        { node: 'pod', text: 'CNI가 연결한 Pod IP로 요청이 도착합니다.' },
        { node: 'container', text: '컨테이너의 애플리케이션이 요청을 처리하고 응답합니다.' }
      ]
    }
  ],

  terms: [
    { term: 'Pod', summary: '컨테이너를 묶어 배포하는 가장 작은 단위', vs: { term: 'Container', diff: 'Container는 프로세스 하나의 실행 단위이고, Pod는 IP·저장소를 공유하는 컨테이너 묶음' }, src: ['pods'], nodes: ['pod'] },
    { term: 'Deployment', summary: '무상태 Pod의 개수·버전·롤링 업데이트를 관리하는 객체', vs: { term: 'StatefulSet', diff: 'Deployment의 Pod는 서로 대체 가능하고, StatefulSet의 Pod는 고정 이름·전용 저장소를 가짐' }, src: ['deploy', 'sts'], nodes: ['deployment'] },
    { term: 'ReplicaSet', summary: '같은 Pod를 지정 개수만큼 유지하는 객체', vs: { term: 'Deployment', diff: 'ReplicaSet은 개수만 유지하고, Deployment는 ReplicaSet을 바꿔 가며 버전 교체·롤백까지 수행' }, src: ['rs', 'deploy'], nodes: ['replicaset'] },
    { term: 'DaemonSet', summary: '모든(또는 선택한) Node마다 Pod를 하나씩 실행하는 객체', vs: { term: 'Deployment', diff: 'Deployment는 개수를 정하고, DaemonSet은 Node 수에 따라 Node당 하나씩 자동 배치' }, src: ['ds', 'deploy'] },
    { term: 'Service', summary: 'Pod 묶음에 고정된 이름·가상 IP를 주는 객체', vs: { term: 'Gateway API', diff: 'Service는 클러스터 내부 L4 진입점이고, Gateway API는 외부 HTTP 요청을 경로·호스트 규칙으로 라우팅' }, src: ['service', 'gateway'], nodes: ['service'] },
    { term: 'ClusterIP', summary: '클러스터 안에서만 접근 가능한 기본 Service 유형', vs: { term: 'NodePort', diff: 'ClusterIP는 내부 전용이고, NodePort는 모든 Node의 지정 포트로 외부 접근을 허용' }, src: ['service'] },
    { term: 'Gateway API', summary: '외부 트래픽 라우팅을 역할별 객체(Gateway·HTTPRoute)로 나눈 표준 API', vs: { term: 'Ingress', diff: 'Ingress는 단일 객체에 기능이 제한적이고, Gateway API는 역할 분리·확장성을 갖춘 후속 표준' }, src: ['gateway', 'ingress'], nodes: ['gateway'] },
    { term: 'ConfigMap', summary: '일반 설정값을 key-value로 Pod에 전달하는 객체', vs: { term: 'Secret', diff: 'ConfigMap은 평문 설정용이고, Secret은 비밀번호·토큰 같은 민감 정보용(기본은 base64 인코딩일 뿐 암호화 아님)' }, src: ['cm', 'secret'], nodes: ['config'] },
    { term: 'PVC', summary: 'Pod가 필요한 저장소 크기·접근 방식을 요청하는 객체', vs: { term: 'PV', diff: 'PVC는 사용자의 요청서이고, PV는 그 요청에 연결되는 실제 저장소 자원' }, src: ['pv'], nodes: ['pvc'] },
    { term: 'StorageClass', summary: 'PV를 자동으로 만드는 방식(프로비저너)을 정의한 객체', vs: { term: 'PV', diff: 'StorageClass는 저장소를 만드는 틀이고, PV는 그 틀로 실제 만들어진 저장소' }, src: ['sc', 'pv'] },
    { term: 'Namespace (Kubernetes)', summary: '클러스터 안에서 객체를 나누는 논리적 구역', vs: { term: 'Linux namespace', diff: 'Kubernetes Namespace는 API 객체의 이름 범위이고, Linux namespace는 프로세스의 커널 자원 격리' }, src: ['ns', 'linuxns'], nodes: ['namespace'] },
    { term: 'Label', summary: '객체를 고르고 묶기 위해 붙이는 key-value', vs: { term: 'Annotation', diff: 'Label은 selector로 객체를 선택하는 데 쓰이고, Annotation은 선택에 쓰이지 않는 부가 정보' }, src: ['labels', 'annotations'] },
    { term: 'Taint', summary: 'Node에 붙여 일반 Pod가 오지 못하게 밀어내는 표시', vs: { term: 'Toleration', diff: 'Taint는 Node에 거는 제한이고, Toleration은 Pod가 그 제한을 견딜 수 있다는 허용 표시' }, src: ['taint'] },
    { term: 'nodeSelector', summary: 'Node label로 Pod가 갈 Node를 지정하는 조건', vs: { term: 'Taint', diff: 'nodeSelector는 Pod가 Node를 고르는 것이고, Taint는 Node가 Pod를 거절하는 것' }, src: ['affinity', 'taint'] },
    { term: 'requests', summary: '스케줄링 시 보장받는 최소 CPU·메모리', vs: { term: 'limits', diff: 'requests는 배치 기준이 되는 보장량이고, limits는 넘으면 CPU 제한·메모리 OOM 종료되는 상한' }, src: ['resources'], nodes: ['resources'] },
    { term: 'Liveness probe', summary: '컨테이너가 살아 있는지 검사하고 실패 시 재시작', vs: { term: 'Readiness probe', diff: 'Liveness 실패는 재시작을, Readiness 실패는 Service 트래픽 대상에서 제외를 일으킴' }, src: ['probes'], nodes: ['probe'] },
    { term: 'kubelet', summary: 'Node에서 Pod 실행을 책임지는 에이전트', vs: { term: 'kube-proxy', diff: 'kubelet은 컨테이너 실행·상태를, kube-proxy는 Service 트래픽 전달 규칙을 담당' }, src: ['components'], nodes: ['kubelet'] },
    { term: 'kube-apiserver', summary: '클러스터의 모든 요청을 받는 API 서버', vs: { term: 'etcd', diff: 'API Server는 요청을 검증·처리하는 입구이고, etcd는 그 결과 상태를 저장하는 데이터베이스' }, src: ['components', 'etcd'], nodes: ['apiserver'] },
    { term: 'Control Plane', summary: '클러스터 상태를 저장·결정·조정하는 관리 영역', vs: { term: 'Worker Node', diff: 'Control Plane은 무엇을 어디서 실행할지 결정하고, Worker Node는 실제로 Pod를 실행' }, src: ['components'], nodes: ['cp'] },
    { term: 'CRI', summary: 'kubelet이 컨테이너 런타임과 통신하는 표준 인터페이스', vs: { term: 'CNI', diff: 'CRI는 컨테이너 실행을, CNI는 Pod 네트워크 연결을 위한 플러그인 규격' }, src: ['cri', 'cni'], nodes: ['runtime'] },
    { term: 'Static Pod', summary: 'kubelet이 매니페스트 파일로 직접 실행하는 Pod', vs: { term: '일반 Pod', diff: '일반 Pod는 API Server·Scheduler를 거쳐 배치되고, Static Pod는 특정 Node의 kubelet이 바로 실행' }, src: ['static'], nodes: ['staticpod'] },
    { term: 'kubectl apply', summary: 'YAML에 적은 원하는 상태를 선언적으로 반영하는 명령', vs: { term: 'kubectl create', diff: 'create는 새로 만들기만 하는 명령형이고, apply는 기존 객체와 비교해 차이만 반영하는 선언형' }, src: ['objmgmt', 'kubectl'], nodes: ['kubectl'] },
    { term: 'HPA', summary: 'CPU 사용률 등 지표에 따라 Pod 수를 자동 조절', vs: { term: 'replicas 수동 설정', diff: 'replicas는 사람이 정한 고정 개수이고, HPA는 지표를 보고 그 값을 자동으로 바꿈' }, src: ['hpa'] },
    { term: 'NetworkPolicy', summary: 'Pod 간 허용할 트래픽을 정하는 방화벽 규칙', vs: { term: 'Service', diff: 'Service는 트래픽을 보낼 주소를 제공하고, NetworkPolicy는 그 트래픽의 허용 여부를 결정' }, src: ['netpol', 'service'] },
    { term: 'Role', summary: '한 Namespace 안의 권한 묶음', vs: { term: 'ClusterRole', diff: 'Role은 특정 Namespace에만, ClusterRole은 클러스터 전체·Node 같은 비 Namespace 리소스까지 적용' }, src: ['rbac'], nodes: ['rbac'] }
  ]
};
