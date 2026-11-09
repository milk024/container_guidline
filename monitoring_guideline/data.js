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
    { id: 'otel', title: 'OpenTelemetry Docs — Observability primer', url: 'https://opentelemetry.io/docs/concepts/observability-primer/', use: 'Metric·Log·Trace' },
    { id: 'prom-config', title: 'Prometheus Docs — Configuration', url: 'https://prometheus.io/docs/prometheus/latest/configuration/configuration/', use: 'scrape_config·kubernetes_sd_config·relabel_config·remote_write' },
    { id: 'prom-functions', title: 'Prometheus Docs — Query functions', url: 'https://prometheus.io/docs/prometheus/latest/querying/functions/', use: 'rate·histogram_quantile' },
    { id: 'op-design', title: 'Prometheus Operator — API objects (Design)', url: 'https://prometheus-operator.dev/docs/getting-started/design/', use: 'ServiceMonitor·PodMonitor·PrometheusRule' },
    { id: 'cadvisor', title: 'google/cadvisor — Prometheus metrics', url: 'https://github.com/google/cadvisor/blob/master/docs/storage/prometheus.md', use: 'container_* 메트릭' },
    { id: 'k8s-sysmetrics', title: 'Kubernetes Docs — Metrics For Kubernetes System Components', url: 'https://kubernetes.io/docs/concepts/cluster-administration/system-metrics/', use: '/metrics/cadvisor' },
    { id: 'ksm-deploy', title: 'kube-state-metrics — Deployment Metrics', url: 'https://github.com/kubernetes/kube-state-metrics/blob/main/docs/metrics/workload/deployment-metrics.md', use: 'kube_deployment_* 메트릭' },
    { id: 'thanos', title: 'Thanos Docs — Quick Tutorial', url: 'https://thanos.io/tip/thanos/quick-tutorial.md/', use: 'Sidecar·Store Gateway·Compactor·Querier' },
    { id: 'loki-labels', title: 'Grafana Loki Docs — Understand labels', url: 'https://grafana.com/docs/loki/latest/get-started/labels/', use: 'low-cardinality 라벨' },
    { id: 'fb-tail', title: 'Fluent Bit Docs — Tail input', url: 'https://docs.fluentbit.io/manual/pipeline/inputs/tail', use: 'tail' },
    { id: 'fb-k8s', title: 'Fluent Bit Docs — Kubernetes filter', url: 'https://docs.fluentbit.io/manual/pipeline/filters/kubernetes', use: 'Kubernetes 메타데이터' },
    { id: 'fb-loki', title: 'Fluent Bit Docs — Loki output', url: 'https://docs.fluentbit.io/manual/pipeline/outputs/loki', use: 'auto_kubernetes_labels' },
    { id: 'grafana-ds', title: 'Grafana Docs — Data sources', url: 'https://grafana.com/docs/grafana/latest/datasources/', use: 'Data source' },
    { id: 'grafana-provision', title: 'Grafana Docs — Provision Grafana', url: 'https://grafana.com/docs/grafana/latest/administration/provisioning/', use: 'datasources YAML' },
    { id: 'grafana-panels', title: 'Grafana Docs — Panels and visualizations', url: 'https://grafana.com/docs/grafana/latest/panels-visualizations/', use: 'Panel' },
    { id: 'grafana-vars', title: 'Grafana Docs — Prometheus template variables', url: 'https://grafana.com/docs/grafana/latest/datasources/prometheus/template-variables/', use: 'Label values 변수' }
  ],

  internalRefs: [
    'Notion — 학교 사업(Infra): kube-prometheus-stack(Prometheus·Alertmanager·kube-state-metrics·node-exporter), DCGM Exporter, metrics-server, Retention 10d, 로그(Fluent Bit → Loki) 계획',
    'Notion — Linux Kernel → Kubernetes 중급 학습 가이드라인 (Ubuntu 26.04 LTS 기준)'
  ],
  internalNote: '내부 자료는 학교 클러스터의 모니터링 구성 요소를 고르는 데만 사용했고, 설명 문장은 위 공식 문서를 기준으로 작성했습니다.',

  tree: [
    { id: "stack", label: "모니터링 파이프라인", en: "Observability Stack", src: ["prom-overview", "otel", "kps"],
      desc: "수집 대상 → 수집 → 저장 → 시각화 → 알림으로 이어지는 관측 데이터의 흐름 전체입니다.",
      ex: { v: "kube-prometheus-stack", lang: "text", code: "$ helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack -n monitoring\nTargets   : node-exporter · cAdvisor · kube-state-metrics · shop-web /metrics\n수집      : ServiceMonitor → Prometheus scrape   /  Fluent Bit → Loki\n저장      : TSDB (15d) + remote_write / Thanos\n시각화    : PromQL · LogQL → Grafana\n알림      : PrometheusRule → Alertmanager → Slack" },
      children: [
        { id: "targets", label: "수집 대상", en: "Targets", src: ["prom-jobs", "exporters"],
          desc: "Prometheus가 /metrics를 가져가는 엔드포인트들과, 로그를 남기는 컨테이너입니다.",
          ex: { v: "Targets", lang: "text", code: "수집 대상 (Prometheus Status → Targets 요약)\nnode-exporter          http://10.0.1.11:9100/metrics              UP\nkubelet (cadvisor)     https://10.0.1.11:10250/metrics/cadvisor   UP\nkube-state-metrics     http://10.244.1.7:8080/metrics             UP\nshop-web:8080/metrics  앱이 직접 노출                             UP\ndcgm-exporter          http://10.0.1.21:9400/metrics → DCGM_FI_DEV_GPU_TEMP 등   UP\n로그 파일              /var/log/pods/shop_shop-web-.../web/0.log" },
          children: [
            { id: "nodeexp", label: "node-exporter", en: "Node metrics", src: ["node-exporter"],
              desc: "각 서버의 CPU·메모리·디스크·네트워크 사용량을 :9100/metrics로 내보냅니다.",
              ex: { v: "node-exporter", lang: "text", code: "$ curl http://10.0.1.11:9100/metrics   # 출력은 요약한 예\nnode_cpu_seconds_total{cpu=\"0\",mode=\"idle\"} 182340.5\nnode_memory_MemAvailable_bytes 6.2e+09\nnode_filesystem_avail_bytes{mountpoint=\"/\"} 3.1e+10" }
            },
            { id: "cadvisor", label: "cAdvisor", en: "Container metrics", src: ["k8s-metrics", "k8s-sysmetrics", "cadvisor"],
              desc: "kubelet 안에 포함된 수집기로, 컨테이너별 CPU·메모리 사용량을 /metrics/cadvisor로 내보냅니다.",
              ex: { v: "cadvisor", lang: "text", code: "# kubelet 엔드포인트: /metrics/cadvisor   # 출력은 요약한 예\ncontainer_cpu_usage_seconds_total{namespace=\"shop\",pod=\"shop-web-7d4b9c8f5d-x2k8p\",container=\"web\"} 512.3\ncontainer_memory_working_set_bytes{namespace=\"shop\",pod=\"shop-web-7d4b9c8f5d-x2k8p\",container=\"web\"} 2.1e+08" }
            },
            { id: "ksm", label: "kube-state-metrics", en: "K8s object metrics", src: ["ksm", "ksm-deploy"],
              desc: "Deployment 원하는 개수, Pod 재시작 횟수 같은 Kubernetes API 객체 상태를 메트릭으로 바꿉니다.",
              ex: { v: "kube-state-metrics", lang: "text", code: "# 출력은 요약한 예\nkube_deployment_spec_replicas{namespace=\"shop\",deployment=\"shop-web\"} 3\nkube_deployment_status_replicas_available{namespace=\"shop\",deployment=\"shop-web\"} 2\nkube_pod_container_status_restarts_total{namespace=\"shop\",pod=\"shop-web-7d4b9c8f5d-x2k8p\"} 4" }
            },
            { id: "appmetrics", label: "애플리케이션 /metrics", en: "Instrumentation", src: ["clientlibs", "prom-types"],
              desc: "앱 코드에 client library를 넣어 요청 수·지연 시간 등을 직접 노출하며, 각 메트릭은 4가지 유형 중 하나입니다.",
              ex: { v: "shop-web:8080/metrics", lang: "text", code: "$ curl http://shop-web:8080/metrics   # 출력은 요약한 예\n# TYPE http_requests_total counter\nhttp_requests_total{method=\"GET\",code=\"200\"} 10234\n# TYPE http_requests_in_flight gauge\nhttp_requests_in_flight 3\n# TYPE http_request_duration_seconds histogram\nhttp_request_duration_seconds_bucket{le=\"0.1\"} 9100\nhttp_request_duration_seconds_bucket{le=\"0.5\"} 10150\nhttp_request_duration_seconds_bucket{le=\"+Inf\"} 10234\nhttp_request_duration_seconds_sum 812.4\nhttp_request_duration_seconds_count 10234\n# TYPE go_gc_duration_seconds summary\ngo_gc_duration_seconds{quantile=\"0.5\"} 4.1e-05" },
              children: [
                { id: "counter", label: "Counter", en: "Counter", src: ["prom-types"],
                  desc: "계속 증가만 하고 프로세스가 재시작되면 0으로 돌아가는 누적 값으로, rate()로 초당 증가량을 봅니다.",
                  ex: { v: "counter", lang: "promql", code: "http_requests_total{code=\"200\"}   10234 → 10290 → 10351   (증가만)\nrate(http_requests_total[5m])     # 초당 요청 수로 바꿔서 봄" }
                },
                { id: "gauge", label: "Gauge", en: "Gauge", src: ["prom-types"],
                  desc: "현재 처리 중인 요청 수, 메모리 사용량처럼 오르내리는 현재 값입니다.",
                  ex: { v: "gauge", lang: "promql", code: "http_requests_in_flight   3 → 7 → 2   (오르내림)\nhttp_requests_in_flight   # 값을 그대로 그래프로 봄" }
                },
                { id: "histogram", label: "Histogram", en: "Histogram", src: ["prom-types", "prom-functions"],
                  desc: "관측값을 구간(bucket)별 누적 개수와 _sum·_count로 내보내며, 서버에서 histogram_quantile로 분위수를 계산합니다.",
                  ex: { v: "histogram", lang: "promql", code: "_bucket{le=\"0.1\"}  0.1초 이하로 끝난 요청 수 (누적)\n_sum / _count      전체 합계 / 전체 개수\nhistogram_quantile(0.9, rate(http_request_duration_seconds_bucket[10m]))" }
                },
                { id: "summary", label: "Summary", en: "Summary", src: ["prom-types"],
                  desc: "클라이언트가 분위수(quantile)를 직접 계산해 내보내는 유형으로, 여러 인스턴스 값을 합쳐 분위수를 다시 구하기 어렵습니다.",
                  ex: { v: "summary", lang: "text", code: "go_gc_duration_seconds{quantile=\"0.5\"}   4.1e-05   ← 앱 안에서 계산한 중앙값\ngo_gc_duration_seconds_sum / _count\n# 인스턴스 3개의 quantile 값을 평균 내도 전체 분위수가 되지 않음" }
                }
              ]
            },
            { id: "dcgm", label: "DCGM Exporter", en: "GPU metrics", src: ["dcgm"],
              desc: "NVIDIA GPU의 온도·메모리·클럭 등을 :9400/metrics에 Prometheus 형식으로 내보냅니다.",
              ex: { v: "DCGM_FI_DEV_GPU_TEMP", lang: "text", code: "$ curl http://10.0.1.21:9400/metrics   # 출력은 요약한 예\nDCGM_FI_DEV_SM_CLOCK{gpu=\"0\"} 1410\nDCGM_FI_DEV_GPU_TEMP{gpu=\"0\"} 35\nDCGM_FI_DEV_FB_USED{gpu=\"0\"} 35690" }
            },
            { id: "containerlogs", label: "컨테이너 로그", en: "stdout / stderr", src: ["k8s-logging"],
              desc: "컨테이너가 표준 출력으로 쓴 로그로, Node의 /var/log/pods 아래 파일로 남습니다.",
              ex: { v: "/var/log/pods", lang: "text", code: "# Node 파일 경로\n/var/log/pods/shop_shop-web-7d4b9c8f5d-x2k8p_<uid>/web/0.log\n# 로그 한 줄 (앱이 stdout으로 출력)\nlevel=error msg=\"payment timeout\" duration=3.2s path=/api/pay" }
            }
          ]
        },
        { id: "collect", label: "수집", en: "Collection", src: ["prom-overview", "fluentbit"],
          desc: "메트릭은 Prometheus가 Pull로, 로그는 Fluent Bit이 Node에서 읽어 모으는 단계입니다.",
          ex: { v: "scrape", lang: "text", code: "메트릭 : ServiceMonitor → Prometheus scrape (scrape_interval: 30s 마다 Pull)\n로그   : Fluent Bit (DaemonSet) → Loki로 전송\n현재값 : metrics-server → kubectl top · HPA" },
          children: [
            { id: "servicemonitor", label: "ServiceMonitor", en: "ServiceMonitor CRD", src: ["operator", "op-design"],
              desc: "어떤 Service의 어느 포트를 수집할지 선언하면 Prometheus Operator가 scrape 설정을 자동으로 만들어 주는 객체입니다.",
              ex: { v: "ServiceMonitor", lang: "yaml", code: "apiVersion: monitoring.coreos.com/v1\nkind: ServiceMonitor\nmetadata:\n  name: shop-web\n  namespace: shop\n  labels: { release: kube-prometheus-stack }   # Prometheus가 고르는 라벨\nspec:\n  selector:\n    matchLabels: { app: shop-web }   # 이 라벨의 Service를\n  endpoints:\n  - port: http                       # 이 포트의 /metrics를\n    interval: 30s\n# Service가 없는 Pod는 PodMonitor 사용" },
              children: [
                { id: "podmonitor", label: "PodMonitor", en: "PodMonitor CRD", src: ["op-design", "operator"],
                  desc: "Service 없이 Pod 라벨로 직접 수집 대상을 고르는 Prometheus Operator 객체입니다.",
                  ex: { v: "PodMonitor", lang: "yaml", code: "apiVersion: monitoring.coreos.com/v1\nkind: PodMonitor\nmetadata: { name: batch-worker, namespace: shop }\nspec:\n  selector:\n    matchLabels: { app: batch-worker }   # Service가 없는 Pod\n  podMetricsEndpoints:\n  - port: metrics" }
                }
              ]
            },
            { id: "scrape", label: "Prometheus scrape", en: "Pull 수집", src: ["prom-overview", "prom-jobs", "prom-config"],
              desc: "Prometheus가 scrape_interval마다 Target의 /metrics를 HTTP로 직접 가져옵니다(기본 1m).",
              ex: { v: "scrape_interval: 30s", lang: "yaml", code: "# prometheus.yml\nglobal:\n  scrape_interval: 30s        # 기본값 1m\nscrape_configs:\n- job_name: shop-pods\n  kubernetes_sd_configs:\n  - role: pod\n  relabel_configs:\n  - source_labels: [__meta_kubernetes_pod_label_app]\n    regex: shop-web\n    action: keep" },
              children: [
                { id: "sd", label: "Service Discovery", en: "kubernetes_sd_configs", src: ["prom-config"],
                  desc: "Kubernetes API를 조회해 node·service·pod·endpoints 등을 수집 대상으로 자동 발견하고, 클러스터 변화에 맞춰 갱신합니다.",
                  ex: { v: "kubernetes_sd_configs", lang: "text", code: "role: pod → Pod의 컨테이너 포트마다 Target 하나\n  __address__                         10.244.2.15:8080\n  __meta_kubernetes_namespace         shop\n  __meta_kubernetes_pod_label_app     shop-web\n# Pod가 늘거나 사라지면 Target 목록도 자동으로 바뀜" }
                },
                { id: "relabel", label: "Relabeling", en: "relabel_configs", src: ["prom-config"],
                  desc: "발견된 Target의 라벨을 수집 전에 바꾸거나, keep·drop으로 수집할 대상만 고르는 규칙입니다.",
                  ex: { v: "relabel_configs", lang: "yaml", code: "relabel_configs:\n- source_labels: [__meta_kubernetes_pod_label_app]\n  regex: shop-web\n  action: keep          # 정규식에 맞지 않는 Target은 버림 (기본 action은 replace)\n- source_labels: [__meta_kubernetes_namespace]\n  target_label: namespace   # 메타 라벨을 일반 라벨로 복사" }
                }
              ]
            },
            { id: "fluentbit", label: "Fluent Bit", en: "Log collector", src: ["fluentbit", "k8s-logging"],
              desc: "각 Node에 DaemonSet으로 떠서 컨테이너 로그 파일을 읽고(Input) 라벨을 붙여(Filter) 전송(Output)합니다.",
              ex: { v: "Fluent Bit", lang: "text", code: "# Fluent Bit 설정 (classic 형식)\n[INPUT]\n    Name   tail\n    Path   /var/log/containers/*.log\n    Tag    kube.*\n[FILTER]\n    Name       kubernetes\n    Match      kube.*\n    Merge_Log  On\n[OUTPUT]\n    Name   loki\n    Match  *\n    Host   loki.monitoring.svc\n    Labels job=fluentbit\n    auto_kubernetes_labels on" },
              children: [
                { id: "fbtail", label: "Input: tail", en: "tail input", src: ["fb-tail"],
                  desc: "로그 파일 끝을 계속 따라 읽으며 새 줄을 레코드로 만드는 입력 플러그인입니다.",
                  ex: { v: "tail", lang: "text", code: "[INPUT]\n    Name   tail\n    Path   /var/log/containers/*.log   # 모든 컨테이너 로그 파일\n    Tag    kube.*                      # 파일 경로가 Tag 뒤에 붙음" }
                },
                { id: "fbk8s", label: "Filter: kubernetes", en: "Kubernetes filter", src: ["fb-k8s"],
                  desc: "Tag의 파일 이름으로 Pod를 찾아 namespace·pod·label 같은 Kubernetes 메타데이터를 레코드에 붙입니다.",
                  ex: { v: "kubernetes", lang: "json", code: "{ \"log\": \"level=error msg=\\\"payment timeout\\\"\",\n  \"kubernetes\": {\n    \"namespace_name\": \"shop\",\n    \"pod_name\": \"shop-web-7d4b9c8f5d-x2k8p\",\n    \"container_name\": \"web\",\n    \"labels\": { \"app\": \"shop-web\" } } }" }
                },
                { id: "fbloki", label: "Output: loki", en: "Loki output", src: ["fb-loki"],
                  desc: "레코드를 Loki로 보내는 출력 플러그인으로, 어떤 값을 스트림 라벨로 쓸지 정합니다.",
                  ex: { v: "loki", lang: "text", code: "[OUTPUT]\n    Name   loki\n    Host   loki.monitoring.svc\n    Labels job=fluentbit\n    auto_kubernetes_labels on   # Kubernetes 라벨을 스트림 라벨로 추가" }
                }
              ]
            },
            { id: "metricsserver", label: "metrics-server", en: "Resource Metrics API", src: ["k8s-metrics"],
              desc: "kubectl top과 HPA가 쓰는 현재 CPU·메모리 값만 kubelet에서 짧게 모아 주는 경량 수집기입니다(이력 저장 없음).",
              ex: { v: "kubectl top", lang: "bash", code: "$ kubectl top pod -n shop   # 출력은 요약한 예\nNAME                        CPU(cores)   MEMORY(bytes)\nshop-web-7d4b9c8f5d-x2k8p   120m         210Mi" }
            }
          ]
        },
        { id: "store", label: "저장", en: "Storage", src: ["prom-storage", "loki"],
          desc: "수집한 메트릭과 로그를 시간 순서로 보관하는 단계로, 오래 보관하려면 원격 저장소를 붙입니다.",
          ex: { v: "TSDB", lang: "text", code: "메트릭 : Prometheus TSDB (로컬 디스크, --storage.tsdb.retention.time 기본 15d)\n         └ remote_write → 장기 저장소\n         └ Thanos Sidecar → 오브젝트 스토리지\n로그   : Loki (라벨만 인덱싱, 본문은 압축 저장)" },
          children: [
            { id: "tsdb", label: "Prometheus TSDB", en: "Time series DB", src: ["prom-storage"],
              desc: "메트릭을 2시간 단위 블록으로 로컬 디스크에 저장하고, 보관 기간(기본 15d)이 지나면 지웁니다.",
              ex: { v: "retention.time", lang: "bash", code: "$ prometheus --storage.tsdb.path=/prometheus \\\n    --storage.tsdb.retention.time=15d   # 기본값 15d\n/prometheus/\n├─ 01HV.../        # 2시간 단위 블록 (chunks, index)\n└─ wal/            # 아직 블록이 되지 않은 최신 데이터" },
              children: [
                { id: "wal", label: "WAL", en: "Write-ahead log", src: ["prom-storage"],
                  desc: "메모리에 있는 최신 데이터를 잃지 않도록 먼저 기록해 두는 로그로, 재시작 시 다시 읽어 복구합니다.",
                  ex: { v: "wal/", lang: "text", code: "/prometheus/wal/\n├─ 00000012\n└─ 00000013\n# 최근 2시간 안팎 데이터는 메모리 + WAL에만 있음\n# Prometheus가 비정상 종료되면 재시작할 때 WAL을 다시 읽음(replay)" }
                }
              ]
            },
            { id: "remotewrite", label: "Remote Write", en: "remote_write", src: ["prom-storage", "prom-config"],
              desc: "수집한 샘플을 원격 저장소로 계속 보내, 로컬 보관 기간보다 오래 저장하거나 한곳에 모읍니다.",
              ex: { v: "remote_write", lang: "yaml", code: "# prometheus.yml\nremote_write:\n- url: http://thanos-receive.monitoring.svc:19291/api/v1/receive\n# 받는 쪽이 Prometheus라면 --web.enable-remote-write-receiver 로 수신 가능" }
            },
            { id: "thanos", label: "Thanos", en: "Long-term storage", src: ["thanos"],
              desc: "Sidecar가 Prometheus 블록을 오브젝트 스토리지에 올리고, Querier가 여러 Prometheus와 저장소를 합쳐 조회하게 해 줍니다.",
              ex: { v: "Thanos Sidecar", lang: "bash", code: "$ thanos sidecar \\\n    --tsdb.path /prometheus \\\n    --prometheus.url http://localhost:9090 \\\n    --objstore.config-file bucket.yaml\n# Store Gateway : 버킷의 데이터를 조회용으로 제공\n# Compactor     : 버킷 데이터 압축·다운샘플링·보관 기간 적용\n# Querier       : 여러 소스를 합쳐 Prometheus API로 응답" }
            },
            { id: "loki", label: "Loki", en: "Log store", src: ["loki", "loki-labels"],
              desc: "로그 본문은 압축 저장하고 라벨만 인덱싱해 비용을 줄인 로그 저장소입니다.",
              ex: { v: "Loki", lang: "text", code: "스트림 = 라벨 조합 하나\n{namespace=\"shop\", app=\"shop-web\", container=\"web\"}\n  2026-11-09T10:21:03Z level=error msg=\"payment timeout\"\n  2026-11-09T10:21:05Z level=info  msg=\"GET /api/cart 200\"" },
              children: [
                { id: "lokilabels", label: "Label 설계", en: "Low cardinality labels", src: ["loki-labels"],
                  desc: "라벨은 값 종류가 적은(low-cardinality) 출처 정보에만 쓰고, 요청 ID처럼 값이 매우 많은 정보는 라벨로 만들지 않습니다.",
                  ex: { v: "namespace=\"shop\"", lang: "text", code: "좋은 라벨 : namespace=\"shop\", app=\"shop-web\", container=\"web\"\n피할 라벨 : request_id=\"9f1c...\"  user_id=\"12345\"   (값이 계속 늘어남)\n# 값이 많은 정보는 본문에 두고 LogQL 필터로 검색" }
                }
              ]
            }
          ]
        },
        { id: "visualize", label: "시각화", en: "Query & Visualization", src: ["promql", "grafana"],
          desc: "저장된 데이터를 질의 언어로 꺼내 대시보드로 보여 주는 단계입니다.",
          ex: { v: "PromQL", lang: "text", code: "PromQL : rate(http_requests_total[5m])\nLogQL  : {namespace=\"shop\"} |= \"error\"\nGrafana Dashboard: 두 쿼리를 패널로 함께 표시" },
          children: [
            { id: "promql", label: "PromQL", en: "PromQL", src: ["promql", "prom-functions"],
              desc: "메트릭을 라벨로 고르고 rate·sum·histogram_quantile 같은 함수로 계산하는 Prometheus 질의 언어입니다.",
              ex: { v: "rate(http_requests_total[5m])", lang: "promql", code: "# 초당 요청 수 (Pod별)\nrate(http_requests_total[5m])\n# 서비스 전체 5xx 비율\nsum(rate(http_requests_total{code=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m]))\n# 응답 시간 90번째 백분위수\nhistogram_quantile(0.9, sum by (le) (rate(http_request_duration_seconds_bucket[10m])))\n# Recording rule로 미리 계산해 둔 결과\njob:http_requests:rate5m" },
              children: [
                { id: "rate", label: "rate()", en: "rate", src: ["prom-functions"],
                  desc: "범위 벡터의 Counter 값으로 초당 평균 증가율을 구하며, 재시작으로 0이 된 구간도 자동 보정합니다.",
                  ex: { v: "rate(", lang: "promql", code: "http_requests_total[5m]          # 최근 5분 동안의 샘플들 (범위 벡터)\nrate(http_requests_total[5m])    # → 초당 증가량 예: 3.4\n# Counter에만 사용, Gauge에는 deriv() 등을 사용" }
                },
                { id: "hquantile", label: "histogram_quantile()", en: "histogram_quantile", src: ["prom-functions", "prom-types"],
                  desc: "Histogram bucket에서 원하는 분위수(예: 0.9 = 90%)를 계산합니다.",
                  ex: { v: "histogram_quantile(0.9", lang: "promql", code: "histogram_quantile(0.9, rate(http_request_duration_seconds_bucket[10m]))\n# → 0.42   (요청의 90%가 0.42초 안에 끝남)" }
                },
                { id: "recording", label: "Recording rule", en: "Recording rule", src: ["prom-recording"],
                  desc: "자주 쓰는 PromQL 결과를 주기마다 미리 계산해 새 메트릭 이름으로 저장하는 규칙입니다.",
                  ex: { v: "job:http_requests:rate5m", lang: "yaml", code: "groups:\n- name: shop.rules\n  rules:\n  - record: job:http_requests:rate5m          # 새 메트릭 이름 (level:metric:operations)\n    expr: sum by (job) (rate(http_requests_total[5m]))" }
                }
              ]
            },
            { id: "logql", label: "LogQL", en: "LogQL", src: ["logql"],
              desc: "{namespace=\"shop\"}처럼 라벨로 스트림을 고른 뒤 |= 필터와 파서(logfmt·json)로 내용을 거르는 Loki 질의 언어입니다.",
              ex: { v: "{namespace=\"shop\"} |= \"error\"", lang: "logql", code: "{namespace=\"shop\"} |= \"error\"                                  # 라벨로 고르고 단어로 거름\n{namespace=\"shop\", app=\"shop-web\"} | logfmt | duration > 3s    # 파싱 후 값으로 거름\nsum by (app) (count_over_time({namespace=\"shop\"} |= \"error\" [5m]))   # 로그를 숫자로" }
            },
            { id: "grafana", label: "Grafana", en: "Dashboards", src: ["grafana", "grafana-ds"],
              desc: "Prometheus·Loki를 데이터 소스로 연결해 패널과 대시보드로 시각화하는 도구입니다.",
              ex: { v: "Dashboard", lang: "text", code: "Dashboard \"shop-web 서비스\"   변수: $namespace = shop\n┌ Panel: 초당 요청 수      (Prometheus)  rate(http_requests_total[5m])\n├ Panel: 응답 시간 p90     (Prometheus)  histogram_quantile(0.9, ...)\n└ Panel: 에러 로그         (Loki)        {namespace=\"$namespace\"} |= \"error\"\ndatasources: Prometheus, Loki" },
              children: [
                { id: "datasource", label: "Data source", en: "Data source", src: ["grafana-ds", "grafana-provision"],
                  desc: "Grafana가 데이터를 조회할 저장소(Prometheus·Loki 등) 연결 정보로, YAML 파일로 미리 등록(provisioning)할 수 있습니다.",
                  ex: { v: "datasources:", lang: "yaml", code: "# provisioning/datasources/ds.yaml\napiVersion: 1\ndatasources:\n- name: Prometheus\n  type: prometheus\n  url: http://prometheus-operated.monitoring.svc:9090\n- name: Loki\n  type: loki\n  url: http://loki.monitoring.svc:3100" }
                },
                { id: "panel", label: "Panel", en: "Panel / Visualization", src: ["grafana", "grafana-panels"],
                  desc: "대시보드의 칸 하나로, 데이터 소스 쿼리 결과를 그래프·표·숫자 등으로 보여 줍니다.",
                  ex: { v: "Panel", lang: "text", code: "Panel \"초당 요청 수\"\n  Data source   : Prometheus\n  Query         : sum by (pod) (rate(http_requests_total{namespace=\"$namespace\"}[5m]))\n  Visualization : Time series\n  Unit          : requests/sec" }
                },
                { id: "variable", label: "Variable", en: "Template variable", src: ["grafana-vars"],
                  desc: "대시보드 상단 드롭다운 값으로, 쿼리 안의 $이름 자리에 넣어 같은 대시보드로 여러 대상을 봅니다.",
                  ex: { v: "$namespace", lang: "text", code: "Variable namespace\n  Type        : Query\n  Data source : Prometheus\n  Query type  : Label values   label = namespace\n→ 드롭다운: shop, monitoring, kube-system\n→ 쿼리에서 {namespace=\"$namespace\"} 로 사용" }
                }
              ]
            }
          ]
        },
        { id: "alert", label: "알림", en: "Alerting", src: ["prom-rules", "am"],
          desc: "Prometheus가 규칙을 평가해 경보를 만들고, Alertmanager가 정리해 담당자에게 보내는 단계입니다.",
          ex: { v: "PrometheusRule → Alertmanager → Slack", lang: "text", code: "PrometheusRule ShopWebHighErrorRate   for: 5m 지나면 Firing\n → Alertmanager : group_by [alertname, namespace] 로 묶음\n → Receiver oncall-slack (#oncall 채널)" },
          children: [
            { id: "rule", label: "Alert rule", en: "PrometheusRule", src: ["prom-rules", "operator"],
              desc: "PromQL 조건이 for 기간 동안 계속 참이면 경보를 발생시키는 규칙입니다.",
              ex: { v: "for: 5m", lang: "yaml", code: "apiVersion: monitoring.coreos.com/v1\nkind: PrometheusRule\nmetadata: { name: shop-web, namespace: shop }\nspec:\n  groups:\n  - name: shop-web\n    rules:\n    - alert: ShopWebHighErrorRate\n      expr: sum(rate(http_requests_total{code=~\"5..\"}[5m])) / sum(rate(http_requests_total[5m])) > 0.05\n      for: 5m\n      labels: { severity: critical }\n      annotations:\n        summary: \"shop-web 5xx 비율 {{ $value }}\"\n# 조건 참 → Pending → 5분 동안 유지 → Firing" },
              children: [
                { id: "alertstate", label: "Pending · Firing", en: "Alert state", src: ["prom-rules"],
                  desc: "조건이 처음 참이 되면 Pending, for 기간 내내 참이면 Firing이 되어 Alertmanager로 전송됩니다.",
                  ex: { v: "Pending", lang: "text", code: "10:00  5xx 비율 0.08 > 0.05   → Pending  (전송 안 함)\n10:03  여전히 참              → Pending\n10:05  5분 내내 참            → Firing   → Alertmanager 전송\n10:12  조건 거짓              → 해제(resolved)\n# for 가 없으면 첫 평가에서 바로 Firing" }
                }
              ]
            },
            { id: "alertmanager", label: "Alertmanager", en: "Alertmanager", src: ["am", "am-config"],
              desc: "Prometheus가 보낸 경보를 묶고(Grouping), 억제·무음 처리한 뒤, Route에 따라 Receiver로 보냅니다.",
              ex: { v: "Alertmanager", lang: "yaml", code: "# alertmanager.yml\nroute:\n  receiver: team-default\n  group_by: [alertname, namespace]\n  group_wait: 30s          # 기본 30s\n  group_interval: 5m       # 기본 5m\n  repeat_interval: 4h      # 기본 4h\n  routes:\n  - matchers: [ severity=\"critical\" ]\n    receiver: oncall-slack\ninhibit_rules:\n- source_matchers: [ severity=\"critical\" ]\n  target_matchers: [ severity=\"warning\" ]\n  equal: [ alertname, namespace ]" },
              children: [
                { id: "grouping", label: "Grouping", en: "group_by", src: ["am", "am-config"],
                  desc: "같은 라벨 값을 가진 경보를 하나의 알림으로 묶고, group_wait·group_interval·repeat_interval로 보내는 시점을 정합니다.",
                  ex: { v: "group_by", lang: "text", code: "group_by: [alertname, namespace]\n  ShopWebHighErrorRate · shop · pod x2k8p  ┐\n  ShopWebHighErrorRate · shop · pod m9q4z  ├→ 알림 1건 (경보 3개 포함)\n  ShopWebHighErrorRate · shop · pod p7c2d  ┘\ngroup_wait 30s 동안 모아 첫 알림 → 새 경보는 group_interval 5m 뒤\n같은 알림 반복은 repeat_interval 4h 뒤" }
                },
                { id: "route", label: "Route", en: "route tree", src: ["am-config"],
                  desc: "경보의 라벨을 matchers로 비교해 어느 Receiver로 보낼지 정하는 트리 형태의 분기 규칙입니다.",
                  ex: { v: "routes:", lang: "text", code: "route (receiver: team-default)          ← 아무 데도 안 맞으면 여기\n└─ matchers: severity=\"critical\"  → oncall-slack\n경보 {alertname=\"ShopWebHighErrorRate\", severity=\"critical\"} → oncall-slack" }
                },
                { id: "silence", label: "Silence · Inhibition", en: "Silence / Inhibition", src: ["am"],
                  desc: "Silence는 정해진 시간 동안, Inhibition은 상위(critical) 경보가 있을 때 관련 하위(warning) 경보를 숨깁니다.",
                  ex: { v: "inhibit_rules:", lang: "text", code: "Inhibition: critical 경보가 있으면 같은 alertname·namespace의 warning은 보내지 않음\nSilence   : Alertmanager UI → New Silence\n            matchers  namespace=\"shop\"\n            기간       2026-11-09 22:00 ~ 23:00   (점검 시간)" }
                }
              ]
            },
            { id: "receiver", label: "Receiver", en: "Slack / Email / Webhook", src: ["am-config"],
              desc: "경보를 실제로 받는 곳(Slack, 메일, Webhook 등)의 설정입니다.",
              ex: { v: "oncall-slack", lang: "yaml", code: "receivers:\n- name: team-default\n  email_configs:\n  - to: team@school.local\n- name: oncall-slack\n  slack_configs:\n  - api_url: https://hooks.slack.com/services/...\n    channel: '#oncall'\n    send_resolved: true    # 해제됐을 때도 알림" }
            }
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
    },
    {
      id: 'k8smetrics', title: 'Kubernetes·애플리케이션·GPU 메트릭 흐름', src: ['clientlibs', 'ksm', 'dcgm', 'operator', 'k8s-metrics'],
      desc: 'node-exporter 외의 수집 대상과, Prometheus와 별개로 동작하는 metrics-server를 함께 봅니다.',
      steps: [
        { node: 'appmetrics', text: '애플리케이션은 client library로 요청 수·지연 시간을 /metrics에 노출합니다.' },
        { node: 'ksm', text: 'kube-state-metrics는 Deployment·Pod 같은 API 객체의 상태를 메트릭으로 바꿉니다.' },
        { node: 'dcgm', text: 'DCGM Exporter는 GPU 사용률·메모리·온도를 노출합니다.' },
        { node: 'servicemonitor', text: '각 Exporter의 Service를 ServiceMonitor로 수집 대상에 등록합니다.' },
        { node: 'scrape', text: 'Prometheus가 모두 같은 방식으로 Pull 해 TSDB에 저장합니다.' },
        { node: 'metricsserver', text: '한편 metrics-server는 kubelet의 CPU·메모리 값만 모아 kubectl top·HPA에 제공하며 이력은 저장하지 않습니다.' }
      ]
    },
    {
      id: 'discovery', title: 'Pod가 자동으로 수집 대상이 되는 흐름', src: ['prom-config', 'operator', 'op-design'],
      desc: '새 Pod가 뜨면 사람이 설정을 고치지 않아도 Prometheus Target에 추가되기까지입니다.',
      steps: [
        { node: 'appmetrics', text: 'shop-web Pod가 8080 포트 /metrics에 메트릭을 노출합니다.' },
        { node: 'servicemonitor', text: 'ServiceMonitor가 app=shop-web Service의 http 포트를 수집하겠다고 선언합니다.' },
        { node: 'sd', text: 'Operator가 만든 설정의 kubernetes_sd_configs가 API에서 해당 Endpoint를 찾아냅니다.' },
        { node: 'relabel', text: 'relabel_configs가 대상만 남기고(keep) namespace·pod 라벨을 붙입니다.' },
        { node: 'scrape', text: 'Prometheus가 30초마다 그 주소를 Pull 합니다.' },
        { node: 'tsdb', text: '샘플이 WAL과 메모리를 거쳐 2시간 블록으로 저장됩니다.' }
      ]
    },
    {
      id: 'metrictypes', title: '메트릭 유형별로 그래프를 그리는 흐름', src: ['prom-types', 'prom-functions', 'prom-recording'],
      desc: '/metrics의 값이 유형에 맞는 PromQL을 거쳐 대시보드 숫자가 되기까지입니다.',
      steps: [
        { node: 'counter', text: 'Counter(http_requests_total)는 누적 값이라 그대로 그리지 않습니다.' },
        { node: 'rate', text: 'rate()로 5분 동안의 초당 증가량을 계산합니다.' },
        { node: 'histogram', text: 'Histogram은 bucket별 누적 개수로 응답 시간 분포를 담고 있습니다.' },
        { node: 'hquantile', text: 'histogram_quantile(0.9, …)로 90% 응답 시간을 계산합니다.' },
        { node: 'recording', text: '자주 쓰는 계산은 Recording rule로 미리 저장해 대시보드를 가볍게 합니다.' },
        { node: 'panel', text: 'Grafana 패널이 결과를 Time series 그래프로 그립니다.' }
      ]
    },
    {
      id: 'longterm', title: '메트릭을 오래 보관하는 흐름', src: ['prom-storage', 'thanos', 'prom-config'],
      desc: '로컬 TSDB 보관 기간(기본 15d)보다 오래 보관하고 여러 Prometheus를 한 번에 조회하는 구성입니다.',
      steps: [
        { node: 'tsdb', text: 'Prometheus는 로컬 디스크에 기본 15일만 보관합니다.' },
        { node: 'wal', text: '최신 데이터는 WAL에 먼저 기록되어 재시작해도 복구됩니다.' },
        { node: 'remotewrite', text: '방법 1: remote_write로 샘플을 원격 저장소에 계속 보냅니다.' },
        { node: 'thanos', text: '방법 2: Thanos Sidecar가 완성된 블록을 오브젝트 스토리지에 올리고, Querier가 합쳐서 조회합니다.' },
        { node: 'grafana', text: 'Grafana는 데이터 소스를 Thanos Querier로 바꿔 긴 기간을 조회합니다.' }
      ]
    }
  ],

  terms: [
    { term: 'Metric', summary: '시간에 따라 기록되는 숫자 측정값', vs: { term: 'Log', diff: 'Metric은 집계된 숫자로 추세를 보고, Log는 개별 사건의 텍스트 기록으로 원인을 봄' }, src: ['otel', 'prom-model'], nodes: ['targets'] },
    { term: 'Trace', summary: '한 요청이 여러 서비스를 거친 경로와 소요 시간 기록', vs: { term: 'Log', diff: 'Log는 한 지점의 사건이고, Trace는 요청 하나를 서비스 전체에 걸쳐 이어 붙인 기록' }, src: ['otel'], nodes: ['stack'] },
    { term: 'Monitoring', summary: '미리 정한 지표를 관찰하고 이상을 알리는 활동', vs: { term: 'Observability', diff: 'Monitoring은 알려진 문제를 감시하고, Observability는 출력 데이터로 예상 못 한 문제의 원인까지 파악하는 성질' }, src: ['otel', 'sre-monitoring'], nodes: ['stack'] },
    { term: 'Pull 수집(scrape)', summary: 'Prometheus가 Target에 찾아가 메트릭을 가져오는 방식', vs: { term: 'Push 수집(Pushgateway)', diff: 'Pull은 서버가 주기적으로 가져가고, Push는 짧게 끝나는 작업이 직접 밀어 넣음(제한적으로 권장)' }, src: ['prom-overview', 'pushgw'], nodes: ['scrape'] },
    { term: 'Exporter', summary: '기존 시스템의 상태를 Prometheus 형식으로 바꿔 노출하는 프로그램', vs: { term: 'Instrumentation', diff: 'Exporter는 코드 밖에서 변환하고, Instrumentation은 앱 코드에 client library를 넣어 직접 노출' }, src: ['exporters', 'clientlibs'], nodes: ['nodeexp'] },
    { term: 'Target', summary: 'Prometheus가 수집하는 개별 엔드포인트(instance)', vs: { term: 'Job', diff: 'Target은 수집 주소 하나이고, Job은 같은 목적의 Target들을 묶은 이름' }, src: ['prom-jobs'], nodes: ['targets', 'sd'] },
    { term: 'Label', summary: '메트릭을 구분하는 key="value" 속성', vs: { term: 'Metric name', diff: 'Metric name은 무엇을 쟀는지, Label은 어디서·어떤 조건에서 쟀는지를 구분' }, src: ['prom-model'], nodes: ['lokilabels', 'relabel'] },
    { term: 'Counter', summary: '계속 증가만 하는 누적 값(재시작 시 0)', vs: { term: 'Gauge', diff: 'Counter는 증가만 해서 rate()로 변화량을 보고, Gauge는 오르내리는 현재 값을 그대로 봄' }, src: ['prom-types'], nodes: ['counter', 'gauge'] },
    { term: 'Histogram', summary: '관측값을 구간(bucket)별로 세어 서버에서 분위수를 계산하는 유형', vs: { term: 'Summary', diff: 'Histogram은 여러 인스턴스를 합쳐 분위수를 계산할 수 있고, Summary는 클라이언트가 계산해 합치기 어려움' }, src: ['prom-types'], nodes: ['histogram', 'summary', 'hquantile'] },
    { term: 'Prometheus', summary: '메트릭을 Pull로 수집·저장·질의하는 시계열 모니터링 시스템', vs: { term: 'Alertmanager', diff: 'Prometheus는 규칙을 평가해 경보를 만들고, Alertmanager는 그 경보를 묶어 전달' }, src: ['prom-overview', 'am'], nodes: ['scrape'] },
    { term: 'Retention', summary: 'TSDB에 메트릭을 보관하는 기간(예: 10d)', vs: { term: 'Scrape interval', diff: 'Retention은 얼마나 오래 보관할지, Scrape interval은 얼마나 자주 수집할지' }, src: ['prom-storage'], nodes: ['tsdb'] },
    { term: 'PromQL', summary: 'Prometheus 메트릭을 고르고 계산하는 질의 언어', vs: { term: 'LogQL', diff: 'PromQL은 숫자 시계열을 계산하고, LogQL은 Loki 로그를 라벨로 고른 뒤 내용으로 거름' }, src: ['promql', 'logql'], nodes: ['promql'] },
    { term: 'Recording rule', summary: '자주 쓰는 PromQL 결과를 미리 계산해 새 메트릭으로 저장', vs: { term: 'Alerting rule', diff: 'Recording rule은 결과를 저장하고, Alerting rule은 조건이 참이면 경보를 발생' }, src: ['prom-recording', 'prom-rules'], nodes: ['recording'] },
    { term: 'Pending', summary: '경보 조건이 참이 되었지만 for 기간을 아직 못 채운 상태', vs: { term: 'Firing', diff: 'Pending은 대기 중이라 전송되지 않고, Firing은 for 기간을 넘겨 Alertmanager로 전송됨' }, src: ['prom-rules'], nodes: ['rule'] },
    { term: 'Grouping', summary: '비슷한 경보를 하나의 알림으로 묶는 기능', vs: { term: 'Inhibition', diff: 'Grouping은 같은 종류를 묶어 개수를 줄이고, Inhibition은 상위 경보가 있으면 관련 하위 경보를 숨김' }, src: ['am'], nodes: ['grouping'] },
    { term: 'Silence', summary: '정해진 시간 동안 특정 경보를 일시적으로 끄는 설정', vs: { term: 'Inhibition', diff: 'Silence는 사람이 시간을 정해 수동으로 끄고, Inhibition은 다른 경보 유무에 따라 규칙으로 자동 억제' }, src: ['am'], nodes: ['silence'] },
    { term: 'Receiver', summary: '알림을 받을 대상(Slack·메일·Webhook)의 설정', vs: { term: 'Route', diff: 'Route는 어느 대상으로 보낼지 고르는 규칙이고, Receiver는 실제로 보낼 곳' }, src: ['am-config'], nodes: ['receiver'] },
    { term: 'ServiceMonitor', summary: 'Service 기준으로 수집 대상을 선언하는 Prometheus Operator CRD', vs: { term: 'PodMonitor', diff: 'ServiceMonitor는 Service의 Endpoint를, PodMonitor는 Service 없이 Pod를 직접 수집 대상으로 지정' }, src: ['operator'], nodes: ['servicemonitor', 'podmonitor'] },
    { term: 'kube-state-metrics', summary: 'Kubernetes 객체 상태를 메트릭으로 노출', vs: { term: 'node-exporter', diff: 'kube-state-metrics는 API 객체 상태(원하는 개수 등)를, node-exporter는 서버 하드웨어·OS 사용량을 보여 줌' }, src: ['ksm', 'node-exporter'], nodes: ['ksm'] },
    { term: 'metrics-server', summary: 'kubectl top·HPA용 현재 CPU·메모리 값을 제공', vs: { term: 'Prometheus', diff: 'metrics-server는 최신 값만 메모리에 두고, Prometheus는 이력을 저장해 기간 조회·알림이 가능' }, src: ['k8s-metrics'], nodes: ['metricsserver'] },
    { term: 'Loki', summary: '라벨만 인덱싱하는 로그 저장소', vs: { term: '전문 인덱싱 로그 저장소', diff: '전문 인덱싱은 본문 전체로 색인해 무겁고, Loki는 라벨만 색인해 저장 비용이 낮음' }, src: ['loki'], nodes: ['loki'] },
    { term: 'Fluent Bit', summary: '각 Node에서 로그를 읽어 전송하는 경량 수집기', vs: { term: 'Loki', diff: 'Fluent Bit은 로그를 모아 보내는 쪽이고, Loki는 받아서 저장·질의하는 쪽' }, src: ['fluentbit', 'loki'], nodes: ['fluentbit'] },
    { term: 'Golden Signals', summary: 'Latency·Traffic·Errors·Saturation 네 가지 핵심 지표', vs: { term: 'SLO', diff: 'Golden Signals는 무엇을 볼지 정한 지표 목록이고, SLO는 그 지표가 지켜야 할 목표 값' }, src: ['sre-monitoring', 'sre-slo'], nodes: ['promql'] },
    { term: 'SLI', summary: '서비스 품질을 수치로 나타낸 지표(예: 성공 요청 비율)', vs: { term: 'SLO', diff: 'SLI는 측정한 실제 값이고, SLO는 그 값이 도달해야 할 목표(예: 99.9%)' }, src: ['sre-slo'], nodes: ['rule'] },
    { term: 'Service Discovery', summary: 'API·클라우드 등을 조회해 수집 대상을 자동으로 찾는 기능', vs: { term: 'static_configs', diff: 'static_configs는 주소를 직접 적어 고정하고, Service Discovery는 Pod가 바뀌면 대상도 자동으로 바뀜' }, src: ['prom-config'], nodes: ['sd'] },
    { term: 'relabel_configs', summary: '수집 전에 Target 라벨을 바꾸거나 keep·drop으로 대상을 고르는 규칙', vs: { term: 'metric_relabel_configs', diff: 'relabel_configs는 scrape 전 Target에, metric_relabel_configs는 scrape 후 가져온 샘플에 적용' }, src: ['prom-config'], nodes: ['relabel'] },
    { term: 'cAdvisor', summary: 'kubelet에 포함되어 컨테이너별 CPU·메모리 사용량을 내보내는 수집기', vs: { term: 'node-exporter', diff: 'cAdvisor는 컨테이너 단위, node-exporter는 서버(Node) 전체 단위 사용량' }, src: ['k8s-metrics', 'cadvisor'], nodes: ['cadvisor'] },
    { term: 'for', summary: '조건이 이 기간 내내 참이어야 경보를 Firing으로 바꾸는 alert rule 항목', vs: { term: 'keep_firing_for', diff: 'for는 Firing이 되기 전 기다리는 시간, keep_firing_for는 조건이 풀린 뒤에도 Firing을 유지하는 시간' }, src: ['prom-rules'], nodes: ['rule', 'alertstate'] },
    { term: 'group_wait', summary: '새 경보 그룹의 첫 알림을 보내기 전 모으는 시간(기본 30s)', vs: { term: 'repeat_interval', diff: 'group_wait는 처음 보낼 때까지 기다리는 시간, repeat_interval은 같은 알림을 다시 보내기까지의 간격(기본 4h)' }, src: ['am-config'], nodes: ['grouping'] },
    { term: 'WAL', summary: '아직 블록으로 저장되지 않은 최신 샘플을 먼저 기록해 두는 로그', vs: { term: 'Block', diff: 'WAL은 최신 데이터를 잃지 않기 위한 임시 기록이고, Block은 2시간 단위로 압축 정리된 저장 단위' }, src: ['prom-storage'], nodes: ['wal', 'tsdb'] },
    { term: 'Remote Write', summary: 'Prometheus가 수집한 샘플을 원격 저장소로 계속 보내는 기능', vs: { term: 'Thanos Sidecar', diff: 'Remote Write는 샘플을 실시간으로 보내고, Thanos Sidecar는 완성된 2시간 블록을 오브젝트 스토리지에 올림' }, src: ['prom-config', 'thanos'], nodes: ['remotewrite', 'thanos'] },
    { term: 'PodMonitor', summary: 'Service 없이 Pod 라벨로 수집 대상을 고르는 Operator CRD', vs: { term: 'ServiceMonitor', diff: 'PodMonitor는 Pod를 직접, ServiceMonitor는 Service가 가리키는 Endpoint를 수집' }, src: ['op-design'], nodes: ['podmonitor'] },
    { term: 'Data source', summary: 'Grafana가 조회할 저장소(Prometheus·Loki 등)의 연결 정보', vs: { term: 'Dashboard', diff: 'Data source는 데이터를 어디서 가져올지, Dashboard는 그 데이터를 패널로 어떻게 보여 줄지' }, src: ['grafana-ds', 'grafana'], nodes: ['datasource', 'grafana'] },
    { term: 'Template variable', summary: '대시보드 드롭다운 값을 쿼리의 $이름에 넣는 기능', vs: { term: '고정 쿼리', diff: '고정 쿼리는 대상마다 대시보드를 따로 만들어야 하고, 변수를 쓰면 하나의 대시보드에서 대상을 바꿔 봄' }, src: ['grafana-vars'], nodes: ['variable'] },
    { term: 'Low cardinality label', summary: '값 종류가 적은 출처 정보(namespace·app)로만 만든 Loki 라벨', vs: { term: 'High cardinality label', diff: 'request_id처럼 값이 계속 늘어나는 라벨은 스트림이 폭증해 Loki 성능을 떨어뜨림' }, src: ['loki-labels'], nodes: ['lokilabels'] },
    { term: 'Fluent Bit Filter', summary: '수집한 레코드에 Kubernetes 메타데이터를 붙이거나 내용을 가공하는 단계', vs: { term: 'Fluent Bit Output', diff: 'Filter는 레코드를 가공하고, Output은 가공된 레코드를 Loki 등 목적지로 보냄' }, src: ['fb-k8s', 'fb-loki'], nodes: ['fbk8s', 'fbloki'] }
  ]
};
