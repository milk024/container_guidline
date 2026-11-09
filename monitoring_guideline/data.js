/* 모니터링 학습 데이터 — 화면 로직(script.js)과 분리된 구조·설명 데이터 */
window.GUIDE_DATA = {
  meta: {
    id: 'monitoring',
    eyebrow: '관측·알림',
    title: '모니터링 구조와 데이터 흐름',
    subtitle: '수집 대상 → 수집 → 저장 → 시각화 → 알림 순서로 메트릭과 로그가 이동하는 과정을 따라갑니다.',
    checked: '2026-11-09'
  },

  sources: [
    { id: 'prom-overview', title: 'Prometheus Docs — Overview', url: 'https://prometheus.io/docs/introduction/overview/', use: '구성 요소·Pull 모델' },
    { id: 'prom-model', title: 'Prometheus Docs — Data model', url: 'https://prometheus.io/docs/concepts/data_model/', use: 'Metric name·Label' },
    { id: 'prom-types', title: 'Prometheus Docs — Metric types', url: 'https://prometheus.io/docs/concepts/metric_types/', use: 'Counter·Gauge·Histogram·Summary' },
    { id: 'prom-jobs', title: 'Prometheus Docs — Jobs and instances', url: 'https://prometheus.io/docs/concepts/jobs_instances/', use: 'Target·Job' },
    { id: 'prom-storage', title: 'Prometheus Docs — Storage', url: 'https://prometheus.io/docs/prometheus/latest/storage/', use: 'TSDB·Retention' },
    { id: 'promql', title: 'Prometheus Docs — Querying basics (PromQL)', url: 'https://prometheus.io/docs/prometheus/latest/querying/basics/', use: 'PromQL' },
    { id: 'prom-rules', title: 'Prometheus Docs — Alerting rules', url: 'https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/', use: 'Alert rule·Pending·Firing' },
    { id: 'prom-recording', title: 'Prometheus Docs — Recording rules', url: 'https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/', use: 'Recording rule' },
    { id: 'am', title: 'Prometheus Docs — Alertmanager', url: 'https://prometheus.io/docs/alerting/latest/alertmanager/', use: 'Grouping·Inhibition·Silence' },
    { id: 'am-config', title: 'Prometheus Docs — Alertmanager configuration', url: 'https://prometheus.io/docs/alerting/latest/configuration/', use: 'route·receiver' },
    { id: 'exporters', title: 'Prometheus Docs — Exporters and integrations', url: 'https://prometheus.io/docs/instrumenting/exporters/', use: 'Exporter' },
    { id: 'clientlibs', title: 'Prometheus Docs — Client libraries', url: 'https://prometheus.io/docs/instrumenting/clientlibs/', use: 'Instrumentation' },
    { id: 'pushgw', title: 'Prometheus Docs — When to use the Pushgateway', url: 'https://prometheus.io/docs/practices/pushing/', use: 'Push 방식' },
    { id: 'node-exporter', title: 'Prometheus Docs — Monitoring Linux host metrics with the Node Exporter', url: 'https://prometheus.io/docs/guides/node-exporter/', use: 'node-exporter' },
    { id: 'operator', title: 'Prometheus Operator — Documentation', url: 'https://prometheus-operator.dev/docs/getting-started/introduction/', use: 'ServiceMonitor·PrometheusRule CRD' },
    { id: 'ksm', title: 'kubernetes/kube-state-metrics (GitHub)', url: 'https://github.com/kubernetes/kube-state-metrics', use: 'kube-state-metrics' },
    { id: 'kps', title: 'prometheus-community/helm-charts — kube-prometheus-stack', url: 'https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack', use: '통합 설치 Chart' },
    { id: 'k8s-metrics', title: 'Kubernetes Docs — Resource metrics pipeline', url: 'https://kubernetes.io/docs/tasks/debug/debug-cluster/resource-metrics-pipeline/', use: 'metrics-server·kubectl top' },
    { id: 'k8s-logging', title: 'Kubernetes Docs — Logging Architecture', url: 'https://kubernetes.io/docs/concepts/cluster-administration/logging/', use: '컨테이너 로그 위치' },
    { id: 'dcgm', title: 'NVIDIA Docs — DCGM Exporter', url: 'https://docs.nvidia.com/datacenter/cloud-native/gpu-telemetry/latest/dcgm-exporter.html', use: 'GPU 메트릭' },
    { id: 'fluentbit', title: 'Fluent Bit Docs — Manual', url: 'https://docs.fluentbit.io/manual', use: 'Fluent Bit' },
    { id: 'loki', title: 'Grafana Loki Docs — Overview', url: 'https://grafana.com/docs/loki/latest/get-started/overview/', use: 'Loki 라벨 인덱싱' },
    { id: 'logql', title: 'Grafana Loki Docs — LogQL', url: 'https://grafana.com/docs/loki/latest/query/', use: 'LogQL' },
    { id: 'grafana', title: 'Grafana Docs — Dashboards', url: 'https://grafana.com/docs/grafana/latest/visualizations/dashboards/', use: 'Dashboard' },
    { id: 'sre-monitoring', title: 'Google SRE Book — Monitoring Distributed Systems', url: 'https://sre.google/sre-book/monitoring-distributed-systems/', use: 'Golden Signals' },
    { id: 'sre-slo', title: 'Google SRE Book — Service Level Objectives', url: 'https://sre.google/sre-book/service-level-objectives/', use: 'SLI·SLO' },
    { id: 'otel', title: 'OpenTelemetry Docs — Observability primer', url: 'https://opentelemetry.io/docs/concepts/observability-primer/', use: 'Metric·Log·Trace' }
  ],

  internalRefs: [
    'Notion — 학교 사업(Infra): kube-prometheus-stack(Prometheus·Alertmanager·kube-state-metrics·node-exporter), DCGM Exporter, metrics-server, Retention 10d, 로그(Fluent Bit → Loki) 계획',
    'Notion — Linux Kernel → Kubernetes 중급 학습 가이드라인 (Ubuntu 26.04 LTS 기준)'
  ],
  internalNote: '내부 자료는 학교 클러스터의 모니터링 구성 요소를 고르는 데만 사용했고, 설명 문장은 위 공식 문서를 기준으로 작성했습니다.',

  tree: [
    {
      id: 'stack', label: '모니터링 파이프라인', en: 'Observability Stack', src: ['prom-overview', 'otel', 'kps'],
      desc: '시스템 상태 데이터를 모으고, 저장하고, 보여 주고, 이상하면 알리는 전체 흐름입니다.',
      children: [
        {
          id: 'targets', label: '수집 대상', en: 'Targets', src: ['prom-jobs', 'exporters'],
          desc: '상태를 알고 싶은 대상과 그 상태를 메트릭·로그로 내보내는 구성 요소입니다.',
          children: [
            { id: 'nodeexp', label: 'node-exporter', en: 'Node metrics', src: ['node-exporter'], desc: '각 서버의 CPU·메모리·디스크·네트워크 사용량을 /metrics로 내보냅니다.' },
            { id: 'ksm', label: 'kube-state-metrics', en: 'K8s object metrics', src: ['ksm'], desc: 'Deployment 원하는 개수, Pod 재시작 횟수 같은 Kubernetes 객체 상태를 메트릭으로 바꿉니다.' },
            { id: 'appmetrics', label: '애플리케이션 /metrics', en: 'Instrumentation', src: ['clientlibs'], desc: '앱 코드에 client library를 넣어 요청 수·지연 시간 등을 직접 노출합니다.' },
            { id: 'dcgm', label: 'DCGM Exporter', en: 'GPU metrics', src: ['dcgm'], desc: 'NVIDIA GPU의 사용률·메모리·온도 등을 Prometheus 형식으로 내보냅니다.' },
            { id: 'containerlogs', label: '컨테이너 로그', en: 'stdout / stderr', src: ['k8s-logging'], desc: '컨테이너가 표준 출력으로 쓴 로그로, Node의 /var/log/pods 아래 파일로 남습니다.' }
          ]
        },
        {
          id: 'collect', label: '수집', en: 'Collection', src: ['prom-overview', 'fluentbit'],
          desc: '흩어진 대상에서 메트릭과 로그를 가져오는 단계입니다.',
          children: [
            { id: 'servicemonitor', label: 'ServiceMonitor', en: 'ServiceMonitor CRD', src: ['operator'], desc: '어떤 Service의 어느 포트를 수집할지 선언하면 Prometheus 설정이 자동으로 만들어지는 객체입니다.' },
            { id: 'scrape', label: 'Prometheus scrape', en: 'Pull 수집', src: ['prom-overview', 'prom-jobs'], desc: 'Prometheus가 정해진 주기마다 Target의 /metrics를 HTTP로 직접 가져옵니다.' },
            { id: 'fluentbit', label: 'Fluent Bit', en: 'Log collector', src: ['fluentbit', 'k8s-logging'], desc: '각 Node에 DaemonSet으로 떠서 컨테이너 로그 파일을 읽고 라벨을 붙여 전송합니다.' },
            { id: 'metricsserver', label: 'metrics-server', en: 'Resource Metrics API', src: ['k8s-metrics'], desc: 'kubectl top과 HPA가 쓰는 현재 CPU·메모리 값만 짧게 모아 주는 경량 수집기입니다.' }
          ]
        },
        {
          id: 'store', label: '저장', en: 'Storage', src: ['prom-storage', 'loki'],
          desc: '수집한 데이터를 시간 순서로 보관해 나중에 조회할 수 있게 하는 단계입니다.',
          children: [
            { id: 'tsdb', label: 'Prometheus TSDB', en: 'Time series DB', src: ['prom-storage'], desc: '메트릭을 시계열로 로컬 디스크에 저장하며 Retention 기간(예: 10d)이 지나면 지웁니다.' },
            { id: 'loki', label: 'Loki', en: 'Log store', src: ['loki'], desc: '로그 본문은 압축 저장하고 라벨만 인덱싱해 비용을 줄인 로그 저장소입니다.' }
          ]
        },
        {
          id: 'visualize', label: '시각화', en: 'Query & Visualization', src: ['promql', 'grafana'],
          desc: '저장된 데이터를 질의 언어로 꺼내 그래프와 대시보드로 보여 주는 단계입니다.',
          children: [
            { id: 'promql', label: 'PromQL', en: 'PromQL', src: ['promql'], desc: 'rate(http_requests_total[5m])처럼 메트릭을 선택·계산하는 Prometheus 질의 언어입니다.' },
            { id: 'logql', label: 'LogQL', en: 'LogQL', src: ['logql'], desc: '{namespace="app"} |= "error"처럼 라벨로 고르고 내용으로 거르는 Loki 질의 언어입니다.' },
            { id: 'grafana', label: 'Grafana', en: 'Dashboards', src: ['grafana'], desc: 'Prometheus·Loki를 데이터 소스로 연결해 패널과 대시보드로 시각화하는 도구입니다.' }
          ]
        },
        {
          id: 'alert', label: '알림', en: 'Alerting', src: ['prom-rules', 'am'],
          desc: '조건을 넘는 이상 상태를 감지해 담당자에게 알리는 단계입니다.',
          children: [
            { id: 'rule', label: 'Alert rule', en: 'PrometheusRule', src: ['prom-rules', 'operator'], desc: 'PromQL 조건이 for 기간 동안 계속 참이면 경보를 발생시키는 규칙입니다.' },
            {
              id: 'alertmanager', label: 'Alertmanager', en: 'Alertmanager', src: ['am'],
              desc: 'Prometheus가 보낸 경보를 묶고(Grouping) 중복을 없애 알맞은 곳으로 보내는 서버입니다.',
              children: [
                { id: 'route', label: 'Route', en: 'route tree', src: ['am-config'], desc: '경보의 라벨을 보고 어느 Receiver로 보낼지 정하는 분기 규칙입니다.' },
                { id: 'silence', label: 'Silence · Inhibition', en: 'Silence / Inhibition', src: ['am'], desc: 'Silence는 정해진 시간 동안, Inhibition은 상위 장애 경보가 있을 때 하위 경보를 숨깁니다.' }
              ]
            },
            { id: 'receiver', label: 'Receiver', en: 'Slack / Email / Webhook', src: ['am-config'], desc: '경보를 실제로 받는 곳(메신저, 메일, Webhook 등)의 설정입니다.' }
          ]
        }
      ]
    }
  ],

  flows: [
    {
      id: 'metrics', title: '메트릭 흐름 (수집 대상 → 시각화)', src: ['prom-overview', 'operator'],
      desc: 'Node의 CPU 사용량이 그래프로 보이기까지의 순서입니다.',
      steps: [
        { node: 'nodeexp', text: 'node-exporter가 Node 상태를 /metrics로 노출합니다.' },
        { node: 'servicemonitor', text: 'ServiceMonitor가 수집할 Service·포트를 지정합니다.' },
        { node: 'scrape', text: 'Prometheus가 주기마다 /metrics를 Pull 합니다.' },
        { node: 'tsdb', text: '값이 라벨과 함께 TSDB에 시계열로 저장됩니다.' },
        { node: 'promql', text: 'PromQL로 필요한 값을 계산해 꺼냅니다.' },
        { node: 'grafana', text: 'Grafana 대시보드 패널에 그래프로 표시됩니다.' }
      ]
    },
    {
      id: 'alerting', title: '알림 흐름 (저장 → 알림)', src: ['prom-rules', 'am', 'am-config'],
      desc: '조건을 넘는 값이 담당자에게 알림으로 도착하기까지의 순서입니다.',
      steps: [
        { node: 'tsdb', text: 'Prometheus가 저장된 메트릭으로 규칙을 주기적으로 평가합니다.' },
        { node: 'rule', text: '조건이 참이면 Pending, for 기간이 지나면 Firing이 됩니다.' },
        { node: 'alertmanager', text: 'Firing 경보가 Alertmanager로 전송되어 그룹으로 묶입니다.' },
        { node: 'silence', text: 'Silence·Inhibition에 걸린 경보는 보내지 않습니다.' },
        { node: 'route', text: '라벨에 맞는 Route를 따라 대상이 정해집니다.' },
        { node: 'receiver', text: 'Receiver(Slack·메일 등)로 알림이 도착합니다.' }
      ]
    },
    {
      id: 'logs', title: '로그 흐름 (수집 대상 → 시각화)', src: ['k8s-logging', 'fluentbit', 'loki'],
      desc: '컨테이너가 출력한 로그를 검색하기까지의 순서입니다.',
      steps: [
        { node: 'containerlogs', text: '컨테이너가 stdout으로 로그를 쓰면 Node에 파일로 남습니다.' },
        { node: 'fluentbit', text: 'Fluent Bit이 파일을 읽어 namespace·pod 라벨을 붙입니다.' },
        { node: 'loki', text: 'Loki가 라벨만 인덱싱하고 본문은 압축 저장합니다.' },
        { node: 'logql', text: 'LogQL로 라벨을 고른 뒤 내용으로 걸러냅니다.' },
        { node: 'grafana', text: 'Grafana에서 로그를 메트릭 그래프와 함께 봅니다.' }
      ]
    }
  ],

  terms: [
    { term: 'Metric', summary: '시간에 따라 기록되는 숫자 측정값', vs: { term: 'Log', diff: 'Metric은 집계된 숫자로 추세를 보고, Log는 개별 사건의 텍스트 기록으로 원인을 봄' }, src: ['otel', 'prom-model'] },
    { term: 'Trace', summary: '한 요청이 여러 서비스를 거친 경로와 소요 시간 기록', vs: { term: 'Log', diff: 'Log는 한 지점의 사건이고, Trace는 요청 하나를 서비스 전체에 걸쳐 이어 붙인 기록' }, src: ['otel'] },
    { term: 'Monitoring', summary: '미리 정한 지표를 관찰하고 이상을 알리는 활동', vs: { term: 'Observability', diff: 'Monitoring은 알려진 문제를 감시하고, Observability는 출력 데이터로 예상 못 한 문제의 원인까지 파악하는 성질' }, src: ['otel', 'sre-monitoring'], nodes: ['stack'] },
    { term: 'Pull 수집(scrape)', summary: 'Prometheus가 Target에 찾아가 메트릭을 가져오는 방식', vs: { term: 'Push 수집(Pushgateway)', diff: 'Pull은 서버가 주기적으로 가져가고, Push는 짧게 끝나는 작업이 직접 밀어 넣음(제한적으로 권장)' }, src: ['prom-overview', 'pushgw'], nodes: ['scrape'] },
    { term: 'Exporter', summary: '기존 시스템의 상태를 Prometheus 형식으로 바꿔 노출하는 프로그램', vs: { term: 'Instrumentation', diff: 'Exporter는 코드 밖에서 변환하고, Instrumentation은 앱 코드에 client library를 넣어 직접 노출' }, src: ['exporters', 'clientlibs'], nodes: ['nodeexp'] },
    { term: 'Target', summary: 'Prometheus가 수집하는 개별 엔드포인트(instance)', vs: { term: 'Job', diff: 'Target은 수집 주소 하나이고, Job은 같은 목적의 Target들을 묶은 이름' }, src: ['prom-jobs'], nodes: ['targets'] },
    { term: 'Label', summary: '메트릭을 구분하는 key="value" 속성', vs: { term: 'Metric name', diff: 'Metric name은 무엇을 쟀는지, Label은 어디서·어떤 조건에서 쟀는지를 구분' }, src: ['prom-model'] },
    { term: 'Counter', summary: '계속 증가만 하는 누적 값(재시작 시 0)', vs: { term: 'Gauge', diff: 'Counter는 증가만 해서 rate()로 변화량을 보고, Gauge는 오르내리는 현재 값을 그대로 봄' }, src: ['prom-types'] },
    { term: 'Histogram', summary: '관측값을 구간(bucket)별로 세어 서버에서 분위수를 계산하는 유형', vs: { term: 'Summary', diff: 'Histogram은 여러 인스턴스를 합쳐 분위수를 계산할 수 있고, Summary는 클라이언트가 계산해 합치기 어려움' }, src: ['prom-types'] },
    { term: 'Prometheus', summary: '메트릭을 Pull로 수집·저장·질의하는 시계열 모니터링 시스템', vs: { term: 'Alertmanager', diff: 'Prometheus는 규칙을 평가해 경보를 만들고, Alertmanager는 그 경보를 묶어 전달' }, src: ['prom-overview', 'am'], nodes: ['scrape'] },
    { term: 'Retention', summary: 'TSDB에 메트릭을 보관하는 기간(예: 10d)', vs: { term: 'Scrape interval', diff: 'Retention은 얼마나 오래 보관할지, Scrape interval은 얼마나 자주 수집할지' }, src: ['prom-storage'], nodes: ['tsdb'] },
    { term: 'PromQL', summary: 'Prometheus 메트릭을 고르고 계산하는 질의 언어', vs: { term: 'LogQL', diff: 'PromQL은 숫자 시계열을 계산하고, LogQL은 Loki 로그를 라벨로 고른 뒤 내용으로 거름' }, src: ['promql', 'logql'], nodes: ['promql'] },
    { term: 'Recording rule', summary: '자주 쓰는 PromQL 결과를 미리 계산해 새 메트릭으로 저장', vs: { term: 'Alerting rule', diff: 'Recording rule은 결과를 저장하고, Alerting rule은 조건이 참이면 경보를 발생' }, src: ['prom-recording', 'prom-rules'] },
    { term: 'Pending', summary: '경보 조건이 참이 되었지만 for 기간을 아직 못 채운 상태', vs: { term: 'Firing', diff: 'Pending은 대기 중이라 전송되지 않고, Firing은 for 기간을 넘겨 Alertmanager로 전송됨' }, src: ['prom-rules'], nodes: ['rule'] },
    { term: 'Grouping', summary: '비슷한 경보를 하나의 알림으로 묶는 기능', vs: { term: 'Inhibition', diff: 'Grouping은 같은 종류를 묶어 개수를 줄이고, Inhibition은 상위 경보가 있으면 관련 하위 경보를 숨김' }, src: ['am'], nodes: ['alertmanager'] },
    { term: 'Silence', summary: '정해진 시간 동안 특정 경보를 일시적으로 끄는 설정', vs: { term: 'Inhibition', diff: 'Silence는 사람이 시간을 정해 수동으로 끄고, Inhibition은 다른 경보 유무에 따라 규칙으로 자동 억제' }, src: ['am'], nodes: ['silence'] },
    { term: 'Receiver', summary: '알림을 받을 대상(Slack·메일·Webhook)의 설정', vs: { term: 'Route', diff: 'Route는 어느 대상으로 보낼지 고르는 규칙이고, Receiver는 실제로 보낼 곳' }, src: ['am-config'], nodes: ['receiver'] },
    { term: 'ServiceMonitor', summary: 'Service 기준으로 수집 대상을 선언하는 Prometheus Operator CRD', vs: { term: 'PodMonitor', diff: 'ServiceMonitor는 Service의 Endpoint를, PodMonitor는 Service 없이 Pod를 직접 수집 대상으로 지정' }, src: ['operator'], nodes: ['servicemonitor'] },
    { term: 'kube-state-metrics', summary: 'Kubernetes 객체 상태를 메트릭으로 노출', vs: { term: 'node-exporter', diff: 'kube-state-metrics는 API 객체 상태(원하는 개수 등)를, node-exporter는 서버 하드웨어·OS 사용량을 보여 줌' }, src: ['ksm', 'node-exporter'], nodes: ['ksm'] },
    { term: 'metrics-server', summary: 'kubectl top·HPA용 현재 CPU·메모리 값을 제공', vs: { term: 'Prometheus', diff: 'metrics-server는 최신 값만 메모리에 두고, Prometheus는 이력을 저장해 기간 조회·알림이 가능' }, src: ['k8s-metrics'], nodes: ['metricsserver'] },
    { term: 'Loki', summary: '라벨만 인덱싱하는 로그 저장소', vs: { term: '전문 인덱싱 로그 저장소', diff: '전문 인덱싱은 본문 전체로 색인해 무겁고, Loki는 라벨만 색인해 저장 비용이 낮음' }, src: ['loki'], nodes: ['loki'] },
    { term: 'Fluent Bit', summary: '각 Node에서 로그를 읽어 전송하는 경량 수집기', vs: { term: 'Loki', diff: 'Fluent Bit은 로그를 모아 보내는 쪽이고, Loki는 받아서 저장·질의하는 쪽' }, src: ['fluentbit', 'loki'], nodes: ['fluentbit'] },
    { term: 'Golden Signals', summary: 'Latency·Traffic·Errors·Saturation 네 가지 핵심 지표', vs: { term: 'SLO', diff: 'Golden Signals는 무엇을 볼지 정한 지표 목록이고, SLO는 그 지표가 지켜야 할 목표 값' }, src: ['sre-monitoring', 'sre-slo'] },
    { term: 'SLI', summary: '서비스 품질을 수치로 나타낸 지표(예: 성공 요청 비율)', vs: { term: 'SLO', diff: 'SLI는 측정한 실제 값이고, SLO는 그 값이 도달해야 할 목표(예: 99.9%)' }, src: ['sre-slo'] }
  ]
};
