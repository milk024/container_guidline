/* Docker 학습 데이터 — 화면 로직(script.js)과 분리된 구조·설명 데이터
   - meta.keyPoint·learn: 첫 화면의 핵심 한 줄과 "이 페이지에서 알 수 있는 것"(3줄 이하)
   - tree: L1 → L2 → L3 계층. 노드마다 key(무엇·왜 1줄), role("OO에게 받아서 OO에게 넘긴다"), desc(자세히), src(출처)
   - flows: main(L1만 쓰는 기본 흐름) + at(그 노드를 열었을 때만 보이는 상세 흐름)
   - terms: 요약 1줄 + 비교 대상 정확히 1개, level(1이면 기본 표시, 생략 시 연결 노드 깊이)
   - sources: 공식 문서 출처 */
window.GUIDE_DATA = {
  meta: {
    id: 'docker',
    eyebrow: '컨테이너 기초',
    title: 'Docker 한눈에 보기',
    subtitle: 'Dockerfile로 이미지를 만들고, Registry로 나누고, Container로 실행하는 흐름을 한 단계씩 살펴봅니다.',
    checked: '2026-11-09',
    keyPoint: '프로그램과 실행 환경을 한 상자에 담아, Docker가 있는 곳이면 어디서든 똑같이 실행하는 도구',
    learn: ['상자(Image)를 만들고 → 보관하고 → 실행(Container)하는 5단계 기본 흐름', '각 구성요소가 무엇이고, 누구에게 받아서 누구에게 넘기는지', '필요할 때만 한 단계씩 더 깊이: 네트워크·저장소·격리 같은 세부 기능']
  },

  sources: [
    { id: 'overview', title: 'Docker Docs — What is Docker? (Docker architecture)', url: 'https://docs.docker.com/get-started/docker-overview/', use: 'Client·Daemon·Registry 구조' },
    { id: 'image', title: 'Docker Docs — What is an image?', url: 'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/', use: 'Image 정의' },
    { id: 'container', title: 'Docker Docs — What is a container?', url: 'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/', use: 'Container 정의' },
    { id: 'registry', title: 'Docker Docs — What is a registry?', url: 'https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-registry/', use: 'Registry·Repository' },
    { id: 'layers', title: 'Docker Docs — Understanding the image layers', url: 'https://docs.docker.com/get-started/docker-concepts/building-images/understanding-image-layers/', use: 'Layer' },
    { id: 'dockerfile', title: 'Docker Docs — Dockerfile reference', url: 'https://docs.docker.com/reference/dockerfile/', use: 'CMD·ENTRYPOINT·ARG·ENV·COPY·ADD·EXPOSE' },
    { id: 'buildkit', title: 'Docker Docs — BuildKit', url: 'https://docs.docker.com/build/buildkit/', use: 'BuildKit' },
    { id: 'context', title: 'Docker Docs — Build context', url: 'https://docs.docker.com/build/concepts/context/', use: 'Build context·.dockerignore' },
    { id: 'multistage', title: 'Docker Docs — Multi-stage builds', url: 'https://docs.docker.com/build/building/multi-stage/', use: 'Multi-stage build' },
    { id: 'pull', title: 'Docker Docs — docker image pull (tag·digest)', url: 'https://docs.docker.com/reference/cli/docker/image/pull/', use: 'Tag·Digest' },
    { id: 'hub', title: 'Docker Docs — Docker Hub', url: 'https://docs.docker.com/docker-hub/', use: 'Docker Hub' },
    { id: 'dockerd', title: 'Docker Docs — dockerd reference', url: 'https://docs.docker.com/reference/cli/dockerd/', use: 'dockerd·containerd 연동' },
    { id: 'run', title: 'Docker Docs — docker container run', url: 'https://docs.docker.com/reference/cli/docker/container/run/', use: 'docker run 옵션' },
    { id: 'restart', title: 'Docker Docs — Start containers automatically', url: 'https://docs.docker.com/engine/containers/start-containers-automatically/', use: 'Restart policy' },
    { id: 'network', title: 'Docker Docs — Networking overview', url: 'https://docs.docker.com/engine/network/', use: 'Network·내장 DNS' },
    { id: 'drivers', title: 'Docker Docs — Network drivers', url: 'https://docs.docker.com/engine/network/drivers/', use: 'bridge·host·overlay·none' },
    { id: 'ports', title: 'Docker Docs — Port publishing and mapping', url: 'https://docs.docker.com/engine/network/port-publishing/', use: '-p 포트 공개' },
    { id: 'storage', title: 'Docker Docs — Storage', url: 'https://docs.docker.com/engine/storage/', use: '저장소 유형 비교' },
    { id: 'volumes', title: 'Docker Docs — Volumes', url: 'https://docs.docker.com/engine/storage/volumes/', use: 'Volume' },
    { id: 'bind', title: 'Docker Docs — Bind mounts', url: 'https://docs.docker.com/engine/storage/bind-mounts/', use: 'Bind mount' },
    { id: 'tmpfs', title: 'Docker Docs — tmpfs mounts', url: 'https://docs.docker.com/engine/storage/tmpfs/', use: 'tmpfs' },
    { id: 'compose', title: 'Docker Docs — Docker Compose', url: 'https://docs.docker.com/compose/', use: 'Compose' },
    { id: 'rootless', title: 'Docker Docs — Rootless mode', url: 'https://docs.docker.com/engine/security/rootless/', use: 'Rootless' },
    { id: 'containerd', title: 'containerd — Documentation', url: 'https://containerd.io/docs/', use: 'containerd' },
    { id: 'runc', title: 'opencontainers/runc (GitHub)', url: 'https://github.com/opencontainers/runc', use: 'OCI 런타임 runc' },
    { id: 'ns', title: 'Linux man-pages — namespaces(7)', url: 'https://man7.org/linux/man-pages/man7/namespaces.7.html', use: '격리' },
    { id: 'cgroup', title: 'Linux Kernel Docs — Control Group v2', url: 'https://docs.kernel.org/admin-guide/cgroup-v2.html', use: '자원 제한' },
    { id: 'storagedrv', title: 'Docker Docs — Storage drivers', url: 'https://docs.docker.com/engine/storage/drivers/', use: '읽기 전용 이미지 레이어 + 쓰기 컨테이너 레이어, CoW, Engine 29+ containerd image store' },
    { id: 'nonenet', title: 'Docker Docs — None network driver', url: 'https://docs.docker.com/engine/network/drivers/none/', use: 'loopback만 있는 완전 격리' },
    { id: 'logs', title: 'Docker Docs — docker container logs', url: 'https://docs.docker.com/reference/cli/docker/container/logs/', use: '컨테이너 stdout·stderr 확인' },
    { id: 'exec', title: 'Docker Docs — docker container exec', url: 'https://docs.docker.com/reference/cli/docker/container/exec/', use: '실행 중 컨테이너 안에서 명령 실행' },
    { id: 'history', title: 'Docker Docs — docker image history', url: 'https://docs.docker.com/reference/cli/docker/image/history/', use: '이미지 레이어 목록' },
    { id: 'engine', title: 'Docker Docs — Docker Engine overview', url: 'https://docs.docker.com/engine/', use: 'Docker Engine = dockerd + API + docker CLI' },
    { id: 'desktop', title: 'Docker Docs — Docker Desktop', url: 'https://docs.docker.com/desktop/', use: 'Docker Desktop에 포함된 구성요소' }
  ],

  internalRefs: [
    'Notion — Container Tech',
    'Notion — Linux Kernel → Kubernetes 중급 학습 가이드라인 (Ubuntu 26.04 LTS 기준)'
  ],

  internalNote: '내부 자료는 학습 범위·순서를 정하는 데만 사용했고, 설명 문장은 위 공식 문서를 기준으로 작성했습니다.',

  tree: [
    {
      id: 'dockerfile', label: 'Dockerfile', en: 'Dockerfile', src: ['dockerfile'],
      key: '이미지를 만드는 순서(어떤 바탕에서, 무엇을 넣고, 무엇을 실행할지)를 적은 텍스트 파일. 만드는 과정을 글로 남겨 누구나 다시 빌드할 수 있게 한다.',
      role: '개발자에게서 작성 내용을 받아서 Docker Engine(docker build)에게 넘긴다',
      desc: '이미지를 만드는 순서(FROM, RUN, COPY 등)를 적은 텍스트 설명서입니다.',
      children: [
        {
          id: 'df-from', label: 'FROM', en: 'base image', src: ['dockerfile'],
          key: '빌드를 시작할 바탕 이미지(예: node:22-slim)를 고른다. 운영체제 파일부터 직접 만들 필요가 없게 해 준다.',
          role: 'Registry에게서 베이스 이미지를 받아서 다음 명령(COPY·RUN)에게 넘긴다',
          desc: '빌드의 출발점이 되는 베이스 이미지를 지정하고, AS로 단계 이름을 붙입니다.',
          children: [
            {
              id: 'multistage', label: 'Multi-stage', en: 'multi-stage build', src: ['multistage'],
              key: 'FROM을 여러 번 써서 빌드용 단계의 결과물만 최종 이미지로 옮긴다. 컴파일러 같은 빌드 도구가 최종 이미지에 남지 않아 크기가 작아진다.',
              role: '앞 단계(빌드용)에게서 결과 파일을 받아서 마지막 단계(실행용)에게 넘긴다',
              desc: 'FROM을 여러 번 써서 빌드 단계의 결과물만 최종 이미지로 복사합니다.'
            }
          ]
        },
        {
          id: 'df-copy', label: 'COPY', en: 'copy files', src: ['dockerfile', 'context'],
          key: '내 컴퓨터의 파일(소스 코드 등)을 이미지 안으로 복사한다. 프로그램을 상자에 넣는 단계다.',
          role: 'Build context(빌드에 함께 보낸 파일 묶음)에게서 파일을 받아서 이미지의 새 Layer로 넘긴다',
          desc: '빌드 컨텍스트의 파일을 이미지 안으로 복사합니다.'
        },
        {
          id: 'df-run', label: 'RUN', en: 'build command', src: ['dockerfile', 'layers'],
          key: '빌드 중에 명령(패키지 설치 등)을 실행하고 그 결과를 이미지에 남긴다.',
          role: '앞 명령까지 만들어진 파일 상태를 받아서 실행 결과를 새 Layer로 넘긴다',
          desc: '빌드 중에 명령을 실행하고 그 결과를 새 레이어로 남깁니다.'
        },
        {
          id: 'df-cmd', label: 'CMD · ENTRYPOINT', en: 'start command', src: ['dockerfile'],
          key: '컨테이너가 시작될 때 실행할 명령을 정한다. 이미지에 "켜면 무엇을 할지"를 적어 둔다.',
          role: 'Dockerfile에게서 받아 이미지 설정에 저장했다가, docker run 때 Container에게 시작 명령으로 넘긴다',
          desc: 'ENTRYPOINT는 고정 실행 파일, CMD는 docker run 인자로 바뀌는 기본 인자입니다.'
        },
        {
          id: 'df-health', label: 'HEALTHCHECK', en: 'health check', src: ['dockerfile'],
          key: '컨테이너 안에서 검사 명령을 주기적으로 실행해 정상(healthy)인지 표시한다. 켜져 있지만 응답하지 않는 상태를 알아낼 수 있다.',
          role: 'Container 안에서 실행한 검사 결과를 받아서 docker ps의 상태 표시에 넘긴다',
          desc: '컨테이너 안에서 검사 명령을 주기적으로 실행해 healthy·unhealthy를 표시합니다.'
        }
      ]
    },
    {
      id: 'engine', label: 'Docker Engine', en: 'Docker Engine', src: ['engine', 'overview'],
      key: 'docker 명령을 받아 실제로 이미지를 만들고 컨테이너를 실행하는 Docker의 본체. 사용자는 명령만 내리고, 일은 Engine이 한다.',
      role: 'Dockerfile과 docker 명령을 받아서 빌드 결과는 Image로, 실행은 Container로 넘긴다',
      desc: '장기 실행 데몬 dockerd, 데몬에 지시하는 API, docker CLI로 이루어진 클라이언트-서버 애플리케이션으로 이미지 빌드와 컨테이너 실행을 맡습니다.',
      children: [
        {
          id: 'cli', label: 'docker 명령', en: 'docker CLI', src: ['overview', 'run', 'engine'], terms: ['docker CLI'],
          key: '터미널에 입력하는 docker 명령(build, run, pull 등). 사람이 Engine에게 일을 시키는 창구다.',
          role: '사용자에게서 명령을 받아서 Docker Daemon에게 API 요청으로 넘긴다',
          desc: '사용자가 터미널에서 docker build·run·pull 같은 명령을 입력하면 REST API로 Docker Daemon에 요청을 보냅니다.'
        },
        {
          id: 'daemon', label: 'Docker Daemon', en: 'dockerd', src: ['overview', 'dockerd'],
          key: '뒤에서 계속 실행되며 요청을 받아 이미지·컨테이너·네트워크·볼륨을 만들고 관리하는 프로그램.',
          role: 'docker 명령(API 요청)을 받아서 빌드는 BuildKit에게, 실행은 containerd에게 넘긴다',
          desc: 'API 요청을 받아 Image·Container·Network·Volume 같은 Docker 객체를 만들고 관리하는 백그라운드 프로세스입니다.'
        },
        {
          id: 'containerd', label: 'containerd', en: 'containerd', src: ['containerd', 'dockerd'],
          key: '컨테이너를 만들고 멈추고 지우는 일을 실제로 맡는 실행 관리자. Daemon은 실행을 직접 하지 않고 여기에 맡긴다.',
          role: 'Docker Daemon에게서 실행 요청을 받아서 runc에게 넘긴다',
          desc: '이미지 저장·컨테이너 생명주기를 관리하는 런타임으로, dockerd가 실제 실행을 맡깁니다.',
          children: [
            {
              id: 'runc', label: 'runc', en: 'OCI Runtime', src: ['runc'],
              key: '리눅스 커널 기능을 호출해 컨테이너 프로세스를 실제로 만드는 작은 실행기.',
              role: 'containerd에게서 실행 설정을 받아서 커널(Namespace·cgroup)에게 넘긴다',
              desc: 'OCI 규격에 따라 커널 기능으로 컨테이너 프로세스를 실제로 생성하는 저수준 런타임입니다.'
            }
          ]
        },
        {
          id: 'compose', label: 'Docker Compose', en: 'Compose', src: ['compose'],
          key: '여러 컨테이너(웹 + DB 등)의 설정을 compose.yaml 한 파일에 적고 한 번에 실행하는 도구.',
          role: 'compose.yaml을 받아서 Docker Daemon에게 여러 컨테이너·네트워크·볼륨 생성 요청으로 넘긴다',
          desc: '여러 컨테이너의 설정을 compose.yaml 한 파일에 정의하고 한 번에 실행하는 도구입니다.'
        }
      ]
    },
    {
      id: 'images', label: 'Image', en: 'Image', src: ['image'],
      key: '프로그램과 실행에 필요한 파일·설정을 묶은 읽기 전용 상자(템플릿). 한 번 만들면 같은 상자로 컨테이너를 여러 개 띄울 수 있다.',
      role: 'Docker Engine에게서 빌드 결과를 받아서 Registry(보관)나 Container(실행)에게 넘긴다',
      desc: '애플리케이션과 실행에 필요한 파일·설정을 묶은 읽기 전용 템플릿입니다.',
      children: [
        {
          id: 'buildkit', label: 'BuildKit', en: 'BuildKit', src: ['buildkit'],
          key: 'Dockerfile을 읽어 이미지를 만드는 빌드 엔진. 바뀐 부분만 다시 만들고 나머지는 캐시를 재사용해 빠르다.',
          role: 'Docker Daemon에게서 Dockerfile과 Build context를 받아서 Layer를 쌓은 Image로 넘긴다',
          desc: 'Dockerfile을 해석해 병렬·캐시 빌드로 이미지를 만드는 기본 빌드 엔진입니다.'
        },
        {
          id: 'layer', label: 'Layer', en: 'Image Layer', src: ['layers'],
          key: 'Dockerfile 명령 하나가 만든 파일 변경분. 여러 겹을 쌓으면 이미지가 되고, 바뀌지 않은 겹은 다시 쓴다.',
          role: 'BuildKit에게서 명령 결과를 받아서 아래 Layer 위에 쌓아 Image로 넘긴다',
          desc: 'Dockerfile 명령 하나하나가 만든 파일 변경분으로, 쌓아서 이미지를 이루고 캐시로 재사용됩니다.'
        },
        {
          id: 'storagedrv', label: '쓰기 레이어 · CoW', en: 'Storage driver', src: ['storagedrv'],
          key: '실행 중인 컨테이너가 파일을 고치면 이미지 대신 컨테이너 전용 쓰기 레이어에 저장한다. 그래서 이미지는 그대로 두고 여러 컨테이너가 함께 쓴다.',
          role: 'Image의 읽기 전용 Layer를 받아서 그 위에 쓰기 레이어를 얹어 Container에게 넘긴다',
          desc: '공유하는 읽기 전용 레이어 위에 컨테이너마다 얇은 쓰기 레이어를 얹고, 수정 시에만 복사합니다.'
        }
      ]
    },
    {
      id: 'registryRoot', label: 'Registry', en: 'Registry', src: ['registry'],
      key: '이미지를 올려 두고 내려받는 창고 서버. 다른 컴퓨터에서도 같은 이미지를 받아 쓸 수 있게 한다.',
      role: 'Image를 docker push로 받아서 다른 곳의 Docker Engine에게 docker pull로 넘긴다',
      desc: '이미지를 저장하고 배포하는 서버로, pull로 받고 push로 올립니다.',
      children: [
        {
          id: 'hub', label: 'Docker Hub', en: 'Docker Hub', src: ['hub'],
          key: 'Docker가 운영하는 공개 Registry. 따로 정하지 않으면 docker pull은 여기서 이미지를 받는다.',
          role: 'docker pull 요청을 받아서 공개 이미지를 Docker Engine에게 넘긴다',
          desc: 'Docker가 운영하는 공개 Registry로, 별도 설정이 없으면 기본으로 사용됩니다.'
        },
        {
          id: 'repository', label: 'Repository', en: 'Repository', src: ['registry'],
          key: '같은 이름(예: nginx)의 이미지들을 버전(Tag)별로 모아 둔 칸.',
          role: 'docker push로 이미지를 받아서 Tag별로 보관했다가 pull 요청에 넘긴다',
          desc: '같은 이름(예: nginx)을 가진 이미지들을 Tag별로 모아 둔 저장 단위입니다.'
        },
        {
          id: 'tag', label: 'Tag · Digest', en: 'Tag / Digest', src: ['pull'],
          key: 'Tag는 사람이 붙인 버전 이름(:1.0), Digest는 내용으로 계산한 고유 번호(sha256). 어떤 이미지를 받을지 정확히 고르게 해 준다.',
          role: 'docker build·docker tag에서 이름을 받아서 push·pull 때 어떤 이미지인지 Registry에게 넘긴다',
          desc: 'Tag는 사람이 붙인 버전 이름(:1.0)이고 Digest는 내용으로 계산한 고유 해시(sha256)입니다.'
        }
      ]
    },
    {
      id: 'containers', label: 'Container', en: 'Container', src: ['container'],
      key: '이미지를 실행해 만든, 다른 프로그램과 분리되어 돌아가는 프로세스. 같은 이미지로 띄우면 어디서든 같은 파일·설정으로 실행된다.',
      role: 'Docker Engine에게서 Image와 실행 옵션을 받아서 실행 결과(서비스·로그)를 사용자에게 넘긴다',
      desc: '이미지를 실행해 만든 격리된 프로세스로, 이미지 위에 쓰기 가능한 계층이 하나 더해집니다.',
      children: [
        {
          id: 'isolation', label: '격리 · 자원 제한', en: 'Isolation', src: ['overview', 'ns', 'cgroup'],
          key: '컨테이너가 다른 프로그램을 들여다보거나 서버 자원을 다 써 버리지 못하게 막는 리눅스 커널 기능들.',
          role: 'runc에게서 격리·제한 설정을 받아서 커널을 통해 컨테이너 프로세스에 넘긴다',
          desc: 'Docker는 Linux namespaces로 컨테이너마다 분리된 작업 공간을 만들고, cgroups로 쓸 수 있는 CPU·메모리 양을 제한합니다.',
          children: [
            {
              id: 'namespaces', label: 'Namespaces', en: 'Linux namespaces', src: ['ns', 'overview'],
              key: '프로세스 목록·네트워크·파일 경로 등을 나눠, 컨테이너가 자기만의 컴퓨터처럼 보게 하는 커널 기능.',
              role: 'runc에게서 나눌 항목을 받아서 컨테이너 프로세스에게 분리된 시야로 넘긴다',
              desc: 'PID·네트워크·마운트 등을 분리해 컨테이너가 자기만의 시스템처럼 보이게 하는 커널 기능입니다.'
            },
            {
              id: 'cgroups', label: 'cgroups', en: 'Control Groups', src: ['cgroup'],
              key: '컨테이너가 쓸 수 있는 CPU·메모리 양을 제한하고 사용량을 잰다. 한 컨테이너가 서버 자원을 독차지하지 못하게 한다.',
              role: 'docker run 옵션(--memory·--cpus)을 runc에게서 받아서 커널이 컨테이너 프로세스에 한도로 넘긴다',
              desc: '컨테이너가 쓸 수 있는 CPU·메모리 양을 제한하고 측정하는 커널 기능입니다.'
            }
          ]
        },
        {
          id: 'networks', label: 'Network', en: 'Network', src: ['network'],
          key: '컨테이너끼리, 그리고 바깥과 통신하게 이어 주는 가상 네트워크.',
          role: 'Docker Daemon에게서 연결 설정을 받아서 Container에게 IP와 이름 찾기를 넘긴다',
          desc: '컨테이너끼리, 그리고 외부와 통신하도록 연결하는 가상 네트워크입니다.',
          children: [
            {
              id: 'bridge', label: 'bridge', en: 'bridge driver', src: ['drivers'],
              key: '한 서버 안의 컨테이너들을 사설 네트워크로 잇는 기본 방식.',
              role: 'Network 설정을 받아서 같은 호스트의 컨테이너들에게 사설 IP를 넘긴다',
              desc: '한 호스트 안의 컨테이너를 사설 네트워크로 연결하는 기본 드라이버입니다.'
            },
            {
              id: 'host', label: 'host', en: 'host driver', src: ['drivers'],
              key: '격리 없이 서버(호스트)의 네트워크를 그대로 함께 쓴다.',
              role: '호스트의 네트워크를 받아서 그대로 컨테이너에게 넘긴다',
              desc: '네트워크 격리 없이 호스트의 네트워크를 그대로 함께 사용하는 드라이버입니다.'
            },
            {
              id: 'overlay', label: 'overlay', en: 'overlay driver', src: ['drivers'],
              key: '여러 Docker 서버에 흩어진 컨테이너를 하나의 네트워크로 묶는다.',
              role: '한 호스트의 컨테이너 트래픽을 받아서 다른 호스트의 컨테이너에게 넘긴다',
              desc: '여러 Docker 호스트에 걸친 컨테이너를 하나의 네트워크로 묶는 드라이버입니다.'
            },
            {
              id: 'none', label: 'none', en: 'none driver', src: ['nonenet'],
              key: '네트워크를 완전히 끊고 loopback(자기 자신과의 연결)만 남긴다.',
              role: 'Network 설정을 받아서 컨테이너에게 loopback만 넘긴다',
              desc: 'loopback만 남기고 네트워크를 완전히 끊습니다.'
            },
            {
              id: 'ports', label: '포트 공개', en: 'Port publishing', src: ['ports'],
              key: '-p 8080:80처럼 서버의 포트를 컨테이너 포트에 이어, 바깥에서 접속할 수 있게 한다.',
              role: '바깥에서 호스트 포트로 들어온 요청을 받아서 컨테이너 포트에 넘긴다',
              desc: '-p 8080:80처럼 호스트 포트를 컨테이너 포트로 연결해 외부 접속을 허용합니다.'
            },
            {
              id: 'dns', label: '내장 DNS', en: 'Embedded DNS', src: ['network'],
              key: '직접 만든 네트워크에서 컨테이너 이름을 IP로 바꿔 준다. IP 대신 이름으로 서로를 부를 수 있다.',
              role: '컨테이너의 이름 조회를 받아서 상대 컨테이너의 IP를 넘긴다',
              desc: '사용자 정의 네트워크에서는 127.0.0.11 DNS가 컨테이너 이름을 IP로 풀어 줍니다.'
            }
          ]
        },
        {
          id: 'volumes', label: 'Volume', en: 'Storage', src: ['storage'],
          key: '컨테이너를 지워도 데이터가 남도록 컨테이너 밖에 저장하는 방법들.',
          role: 'Container가 쓰는 데이터를 받아서 컨테이너 바깥 저장소에 넘긴다',
          desc: '컨테이너가 삭제돼도 데이터가 남도록 컨테이너 밖에 저장하는 방법들입니다.',
          children: [
            {
              id: 'volume', label: 'Volume', en: 'Named volume', src: ['volumes'],
              key: 'Docker가 만들고 관리하는 저장 공간. 데이터를 보존할 때 권장되는 방식이다.',
              role: 'Container의 데이터를 받아서 Docker가 관리하는 저장 위치에 넘긴다',
              desc: 'Docker가 만들고 관리하는 저장 공간으로, 데이터 보존에 권장되는 방식입니다.'
            },
            {
              id: 'bindmount', label: 'Bind mount', en: 'Bind mount', src: ['bind'],
              key: '서버의 특정 폴더를 그대로 컨테이너에 연결한다. 개발 중 소스 코드를 바로 반영할 때 쓴다.',
              role: '호스트 폴더를 받아서 컨테이너 안의 경로로 그대로 넘긴다',
              desc: '호스트의 특정 경로를 그대로 컨테이너에 연결하는 방식입니다.'
            },
            {
              id: 'tmpfs', label: 'tmpfs', en: 'tmpfs mount', src: ['tmpfs'],
              key: '디스크가 아니라 메모리에만 저장해, 컨테이너가 멈추면 사라지는 임시 공간.',
              role: 'Container의 임시 데이터를 받아서 호스트 메모리에 넘긴다',
              desc: '디스크가 아닌 호스트 메모리에만 저장해 컨테이너가 멈추면 사라지는 임시 저장소입니다.'
            }
          ]
        },
        {
          id: 'restart', label: 'Restart policy', en: 'Restart policy', src: ['restart'],
          key: '컨테이너가 종료됐을 때 자동으로 다시 켤지(no, on-failure, always 등) 정하는 규칙.',
          role: 'Container가 종료됐다는 사실을 받아서 Docker Daemon에게 다시 시작할지 넘긴다',
          desc: '컨테이너가 종료됐을 때 자동으로 다시 시작할지(no, on-failure, always 등) 정하는 설정입니다.'
        },
        {
          id: 'logs', label: 'logs · exec', en: 'debugging', src: ['logs', 'exec'],
          key: '컨테이너가 출력한 로그를 보고, 실행 중인 컨테이너 안에서 명령을 실행해 문제를 찾는다.',
          role: 'Container의 출력(stdout·stderr)을 받아서 사용자 터미널에 넘긴다',
          desc: '컨테이너 출력 로그를 보고, 실행 중인 컨테이너 안에서 명령을 실행해 문제를 찾습니다.'
        }
      ]
    }
  ],

  examples: {
    "engine": {"lang":"text","code":"docker run -d -p 8080:80 nginx:1.27      ← Docker Client\n   │ REST API (unix:///var/run/docker.sock)\n   ▼\ndockerd                                  ← Docker Daemon\n   ├─ 이미지가 없으면 docker.io 에서 pull  ← Registry\n   └─ containerd → runc 로 컨테이너 생성"},
    "cli": {"v":"docker run","lang":"bash","code":"docker run -d --name web -p 8080:80 nginx:1.27\ndocker ps                  # 실행 중인 컨테이너\ndocker image ls            # 로컬 이미지\ndocker stop web && docker rm web"},
    "dockerfile": {"v":"Dockerfile","lang":"dockerfile","code":"# syntax=docker/dockerfile:1\nFROM node:22-slim AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:22-slim\nWORKDIR /app\nCOPY --from=build /app/dist ./dist\nCOPY --from=build /app/node_modules ./node_modules\nEXPOSE 3000\nHEALTHCHECK --interval=30s CMD node -e \"fetch('http://localhost:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))\"\nENTRYPOINT [\"node\"]\nCMD [\"dist/server.js\"]"},
    "df-from": {"v":"FROM node:22-slim AS build","lang":"dockerfile","code":"FROM node:22-slim AS build   # 베이스 이미지 + 단계 이름\nFROM ubuntu:24.04\nFROM scratch                 # 아무것도 없는 빈 이미지에서 시작"},
    "df-copy": {"v":"COPY . .","lang":"dockerfile","code":"COPY package*.json ./   # 의존성 목록 먼저 → 소스만 바뀌면 다음 RUN 은 캐시 사용\nRUN npm ci\nCOPY . .                # 소스는 나중에 (.dockerignore 로 node_modules·.git 제외)"},
    "df-run": {"v":"RUN npm ci","lang":"dockerfile","code":"RUN npm ci\n\n# 여러 명령을 한 RUN 으로 묶어 레이어 하나로\nRUN apt-get update \\\n && apt-get install -y --no-install-recommends curl \\\n && rm -rf /var/lib/apt/lists/*"},
    "multistage": {"v":"COPY --from=build","lang":"dockerfile","code":"FROM node:22-slim AS build\nRUN npm run build\n\nFROM node:22-slim                    # 최종 이미지는 새로 시작\nCOPY --from=build /app/dist ./dist   # 빌드 결과물만 복사\n# → 컴파일러·소스·devDependencies 는 최종 이미지에 남지 않음"},
    "df-health": {"v":"HEALTHCHECK","lang":"text","code":"HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\\n  CMD node -e \"fetch('http://localhost:3000/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))\"\n\n$ docker ps\nSTATUS: Up 2 minutes (healthy)"},
    "df-cmd": {"v":"CMD [\"dist/server.js\"]","lang":"text","code":"ENTRYPOINT [\"node\"]\nCMD [\"dist/server.js\"]\n\n$ docker run myapp:1.0            # → node dist/server.js\n$ docker run myapp:1.0 other.js   # → node other.js  (CMD 만 교체됨)"},
    "compose": {"v":"docker compose up","lang":"yaml","code":"services:\n  web:\n    image: nginx:1.27\n    ports: [\"8080:80\"]\n    depends_on: [db]\n  db:\n    image: postgres:17\n    environment:\n      POSTGRES_PASSWORD: example\n    volumes: [dbdata:/var/lib/postgresql/data]\nvolumes:\n  dbdata:\n\n$ docker compose up -d"},
    "daemon": {"v":"dockerd","lang":"bash","code":"docker build -t myapp:1.0 .   # BuildKit 이 빌드\ndocker image ls               # Image\ndocker container ls           # Container\ndocker network ls             # Network\ndocker volume ls              # Volume\n# 실행은 dockerd → containerd → runc 로 위임"},
    "buildkit": {"v":"docker build","lang":"text","code":"$ docker build -t myapp:1.0 .\n[+] Building 12.3s (12/12) FINISHED\n => [build 3/6] COPY package*.json ./\n => CACHED [build 4/6] RUN npm ci      ← 바뀌지 않은 단계는 캐시\n => [build 5/6] COPY . .\n => [build 6/6] RUN npm run build\n(출력은 요약한 예)"},
    "containerd": {"v":"containerd","lang":"text","code":"dockerd\n  └─ containerd                  # 이미지·컨테이너 수명 주기 관리\n       └─ containerd-shim-runc-v2\n            └─ runc create / start  # OCI 런타임: namespaces·cgroups 설정 후 종료\n                 └─ nginx 프로세스"},
    "runc": {"v":"runc create","lang":"bash","code":"# OCI Runtime 규격: config.json + rootfs 로 컨테이너 생성\nrunc spec               # 기본 config.json 생성\nsudo runc run demo      # 그 설정으로 컨테이너 실행"},
    "images": {"v":"Image","lang":"text","code":"$ docker image ls\nREPOSITORY   TAG   IMAGE ID       SIZE\nmyapp        1.0   3f2a1b9c8d7e   210MB\n\n$ docker image history myapp:1.0   # 레이어 목록\n# 실행하면 레이어 위에 container layer (R/W) 가 하나 얹힘"},
    "layer": {"v":"docker image history","lang":"text","code":"$ docker image history myapp:1.0\nCREATED BY                     SIZE\nCMD [\"dist/server.js\"]         0B\nCOPY . .                       1.2MB\nRUN npm ci                     85MB\nCOPY package*.json ./          120kB\nFROM node:22-slim …\n(출력은 요약한 예 — 명령 하나가 레이어 하나)"},
    "tag": {"v":"myapp:1.0","lang":"text","code":"myapp:1.0                  # Tag: 사람이 붙인 이름, 다른 이미지로 옮겨질 수 있음\nmyapp@sha256:4f1c…         # Digest: 내용 해시, 절대 바뀌지 않음\n\ndocker tag myapp:1.0 registry.example.com/team/myapp:1.0\ndocker pull nginx@sha256:<digest>"},
    "storagedrv": {"v":"container layer (R/W)","lang":"text","code":"container layer (R/W)   ← 컨테이너마다 1개, 컨테이너 삭제 시 사라짐\n──────────────────────\nCOPY . .        (R/O)\nRUN npm ci      (R/O)   ← 이미지 레이어는 여러 컨테이너가 공유\nFROM node:22    (R/O)\n# 아래 레이어 파일을 고치면 쓰기 레이어로 복사 후 수정 (copy-on-write)\n# 기존 설치는 overlay2, Engine 29+ 신규 설치는 containerd snapshotter 사용"},
    "containers": {"v":"Container","lang":"bash","code":"docker run -d --name web --memory 512m --cpus 1.5 --restart unless-stopped nginx:1.27\n#   새 프로세스는 자기만의 PID·network namespace 를 봄\n#   --memory·--cpus → cgroups 로 자원 제한\n#   --restart       → 종료 시 재시작 정책\ndocker logs -f web\ndocker exec -it web sh"},
    "namespaces": {"v":"namespace","lang":"text","code":"$ docker run --rm alpine ps\nPID   USER     TIME  COMMAND\n    1 root      0:00 ps      ← 컨테이너 안에서는 자기가 PID 1 (PID namespace)\n\n$ docker run --rm --pid=host alpine ps   # 호스트 PID namespace 공유 → 호스트 프로세스가 모두 보임"},
    "cgroups": {"v":"--memory 512m","lang":"text","code":"$ docker run -d --name web --memory 512m --cpus 1.5 nginx:1.27\n$ docker stats --no-stream web\nNAME   CPU %   MEM USAGE / LIMIT\nweb    0.00%   8MiB / 512MiB\n# 메모리 한도 초과 → OOM kill, CPU 한도 초과 → 스로틀링"},
    "restart": {"v":"--restart unless-stopped","lang":"bash","code":"docker run -d --restart unless-stopped nginx:1.27\n# no              재시작 안 함 (기본값)\n# on-failure[:3]  비정상 종료(코드≠0)일 때만, 최대 3회\n# always          항상 재시작 (직접 stop 하면 데몬 재시작 때 다시 시작)\n# unless-stopped  always 와 같지만 직접 stop 한 컨테이너는 제외"},
    "logs": {"v":"docker logs","lang":"bash","code":"docker logs -f --tail 100 web    # stdout·stderr 를 따라가며 보기\ndocker exec -it web sh           # 실행 중 컨테이너 안에서 셸 열기\ndocker exec web env              # 컨테이너 환경 변수 확인"},
    "networks": {"v":"Network","lang":"bash","code":"docker network create appnet   # 사용자 정의 bridge\ndocker run -d --name db  --network appnet -e POSTGRES_PASSWORD=example postgres:17\ndocker run -d --name web --network appnet -p 8080:80 nginx:1.27\n# web 안에서 db 라는 이름으로 접속 (내장 DNS 127.0.0.11)\ndocker run -d --network host nginx:1.27\ndocker run --rm --network none alpine ip addr\n# overlay: 여러 Docker 호스트(Swarm)에 걸친 네트워크"},
    "bridge": {"v":"bridge","lang":"bash","code":"docker network create appnet\ndocker run -d --name api --network appnet myapp:1.0\ndocker run --rm --network appnet alpine wget -qO- http://api:3000/health\n# 같은 사용자 정의 bridge 안에서는 컨테이너 이름으로 통신"},
    "host": {"v":"--network host","lang":"bash","code":"docker run -d --network host nginx:1.27\n# 호스트의 80 포트에 바로 바인딩 → -p 포트 매핑은 무시됨"},
    "overlay": {"v":"overlay","lang":"bash","code":"docker swarm init\ndocker network create -d overlay --attachable appnet\n# 여러 Docker 호스트의 컨테이너가 한 네트워크처럼 통신"},
    "ports": {"v":"-p 8080:80","lang":"bash","code":"docker run -d -p 8080:80 nginx:1.27\n#              호스트:컨테이너\ncurl http://localhost:8080              # → 컨테이너 80 번\ndocker run -d -p 127.0.0.1:8080:80 nginx:1.27   # 이 호스트에서만 접근"},
    "none": {"v":"--network none","lang":"text","code":"$ docker run --rm --network none alpine ip addr\n1: lo: <LOOPBACK,UP,LOWER_UP> …\n# loopback 만 존재 → 외부와 완전히 차단"},
    "dns": {"v":"127.0.0.11","lang":"text","code":"$ docker exec web cat /etc/resolv.conf\nnameserver 127.0.0.11\n# 사용자 정의 네트워크: 컨테이너 이름(db)을 IP 로 풀어 줌\n# 기본 bridge 네트워크: 호스트 /etc/resolv.conf 복사본을 씀"},
    "volumes": {"v":"Volume","lang":"bash","code":"docker run -d -v dbdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=example postgres:17   # Volume\ndocker run -d -v \"$(pwd)/src:/app/src\" myapp:1.0     # Bind mount\ndocker run -d --tmpfs /tmp myapp:1.0                 # tmpfs"},
    "volume": {"v":"dbdata:","lang":"bash","code":"docker volume create dbdata\ndocker run -d -e POSTGRES_PASSWORD=example -v dbdata:/var/lib/postgresql/data postgres:17\ndocker volume ls\ndocker volume inspect dbdata   # Mountpoint: /var/lib/docker/volumes/dbdata/_data"},
    "bindmount": {"v":"$(pwd)/src","lang":"bash","code":"docker run -d --mount type=bind,source=\"$(pwd)/src\",target=/app/src myapp:1.0\n# 호스트에서 파일을 고치면 컨테이너에 바로 반영 (개발용)"},
    "tmpfs": {"v":"--tmpfs /tmp","lang":"bash","code":"docker run -d --tmpfs /tmp myapp:1.0\n# 메모리에만 저장 → 컨테이너가 멈추면 사라짐, 민감한 임시 파일에 적합"},
    "registryRoot": {"v":"Registry","lang":"text","code":"docker.io/library/nginx:1.27\n└Registry┘└Repository─┘└Tag┘\n\ndocker login registry.example.com\ndocker push registry.example.com/team/myapp:1.0"},
    "hub": {"v":"docker.io","lang":"bash","code":"docker pull nginx:1.27\n# = docker pull docker.io/library/nginx:1.27  (Registry 를 생략하면 Docker Hub)"},
    "repository": {"v":"library/nginx","lang":"text","code":"$ docker image ls registry.example.com/team/myapp\nREPOSITORY                        TAG\nregistry.example.com/team/myapp   1.0\nregistry.example.com/team/myapp   1.1\n# 같은 Repository 안에서 Tag 로 버전을 구분"}
  },

  icons: {
    "cli": "terminal",
    "dockerfile": "file",
    "df-from": "layers",
    "df-copy": "copy",
    "df-run": "play",
    "multistage": "workflow",
    "df-health": "pulse",
    "df-cmd": "play",
    "compose": "manifest",
    "daemon": "engine",
    "buildkit": "build",
    "containerd": "logo-containerd",
    "runc": "logo-runc",
    "images": "layers",
    "layer": "layers",
    "tag": "tag",
    "storagedrv": "disk",
    "containers": "cube",
    "namespaces": "scope",
    "cgroups": "gauge",
    "restart": "sync",
    "logs": "log",
    "networks": "network",
    "bridge": "link",
    "host": "server",
    "overlay": "globe",
    "ports": "door",
    "none": "lock",
    "dns": "search",
    "volumes": "database",
    "volume": "disk",
    "bindmount": "folder",
    "tmpfs": "chip",
    "registryRoot": "cloud",
    "hub": "cloud",
    "repository": "folder",
    "engine": "engine",
    "isolation": "shield"
  },

  flows: [
    {
      main: true, id: 'main', title: '기본 흐름: 만들기 → 보관 → 실행', src: ['overview', 'dockerfile', 'registry'], desc: 'Docker를 쓸 때 거의 항상 거치는 5단계입니다.',
      steps: [
        { node: 'dockerfile', text: 'Dockerfile에 이미지를 만드는 순서를 적는다' },
        { node: 'engine', text: 'docker build를 실행하면 Docker Engine이 Dockerfile을 읽어 빌드한다' },
        { node: 'images', text: '빌드 결과가 읽기 전용 Image(상자)로 저장된다' },
        { node: 'registryRoot', text: 'docker push로 Registry에 올리고, 다른 곳에서 docker pull로 받는다' },
        { node: 'containers', text: 'docker run으로 Image를 Container로 실행한다' }
      ]
    },
    {
      id: 'run', title: 'docker run 실행 흐름', at: 'engine', src: ['overview', 'run'], desc: 'docker run nginx를 입력했을 때 컨테이너가 뜨기까지의 순서입니다.',
      steps: [
        { node: 'cli', text: 'docker run nginx 명령을 입력합니다.' },
        { node: 'daemon', text: 'CLI가 API로 dockerd에 컨테이너 생성을 요청합니다.' },
        { node: 'registryRoot', text: '로컬에 이미지가 없으면 Registry에서 pull 합니다.' },
        { node: 'images', text: '받은 Layer들을 쌓아 읽기 전용 Image로 준비합니다.' },
        { node: 'containerd', text: 'dockerd가 containerd에 컨테이너 실행을 맡깁니다.' },
        { node: 'runc', text: 'runc가 namespaces·cgroups를 설정해 프로세스를 만듭니다.' },
        { node: 'containers', text: '컨테이너가 실행 상태가 됩니다.' },
        { node: 'networks', text: '기본 bridge 네트워크에 연결되고 -p로 포트가 공개됩니다.' },
        { node: 'volumes', text: '-v 옵션이 있으면 Volume을 연결해 데이터를 보존합니다.' }
      ]
    },
    {
      id: 'build', title: '이미지 빌드·배포 흐름', at: 'images', src: ['buildkit', 'layers', 'registry'], desc: 'Dockerfile로 이미지를 만들어 Registry에 올리기까지의 순서입니다.',
      steps: [
        { node: 'dockerfile', text: 'FROM·COPY·RUN 순서로 Dockerfile을 작성합니다.' },
        { node: 'cli', text: 'docker build -t app:1.0 . 으로 Build context와 함께 빌드를 요청합니다.' },
        { node: 'buildkit', text: 'BuildKit이 명령을 실행하고 변경 없는 단계는 캐시를 씁니다.' },
        { node: 'layer', text: '명령마다 Layer가 쌓입니다.' },
        { node: 'tag', text: 'app:1.0 Tag가 붙고 내용 기반 Digest가 계산됩니다.' },
        { node: 'repository', text: 'docker push로 Registry의 Repository에 업로드합니다.' }
      ]
    },
    {
      id: 'isolate', title: '컨테이너 격리·자원 제한 흐름', at: 'containers', src: ['run', 'ns', 'cgroup', 'restart'], desc: 'docker run 옵션이 커널 기능으로 이어져 컨테이너를 격리·제한·재시작하는 순서입니다.',
      steps: [
        { node: 'cli', text: 'docker run --memory 512m --cpus 1 --restart unless-stopped 로 실행을 요청합니다.' },
        { node: 'containers', text: 'Daemon이 이미지로 컨테이너를 만들고 프로세스를 시작합니다.' },
        { node: 'namespaces', text: 'Namespaces가 PID·네트워크·마운트를 분리해 호스트의 다른 프로세스를 보지 못하게 합니다.' },
        { node: 'cgroups', text: 'cgroups가 --memory·--cpus 값만큼만 자원을 쓰게 제한합니다.' },
        { node: 'restart', text: '프로세스가 종료되면 Restart policy에 따라 Daemon이 다시 시작합니다.' }
      ]
    },
    {
      id: 'connect', title: '네트워크·저장소 연결 흐름', at: 'containers', src: ['network', 'drivers', 'ports', 'storage', 'volumes', 'bind', 'tmpfs'], desc: '컨테이너를 네트워크에 붙이고 데이터를 어디에 둘지 고르는 순서입니다.',
      steps: [
        { node: 'bridge', text: '기본은 bridge 네트워크라 같은 호스트의 컨테이너끼리만 통신합니다.' },
        { node: 'ports', text: '외부에서 접속하려면 -p 8080:80 으로 호스트 포트를 컨테이너 포트에 연결합니다.' },
        { node: 'host', text: '--network host 를 쓰면 격리 없이 호스트 네트워크를 그대로 씁니다.' },
        { node: 'overlay', text: '여러 호스트(Swarm)에 걸친 통신은 overlay 네트워크로 연결합니다.' },
        { node: 'volume', text: '보존할 데이터는 -v data:/var/lib/data 처럼 Docker가 관리하는 Volume에 둡니다.' },
        { node: 'bindmount', text: '개발 중 소스 코드처럼 호스트 경로를 그대로 보여줄 때는 Bind mount를 씁니다.' },
        { node: 'tmpfs', text: '남기면 안 되는 임시 데이터는 메모리에만 두는 tmpfs에 씁니다.' }
      ]
    },
    {
      id: 'dockerfile', title: 'Dockerfile 작성 흐름', at: 'dockerfile', src: ['dockerfile', 'context', 'multistage'], desc: '빌드 단계와 실행 단계를 나눈 Dockerfile을 위에서부터 채워 가는 순서입니다.',
      steps: [
        { node: 'df-from', text: 'FROM node:22-slim AS build 로 빌드용 베이스 이미지를 고르고 단계 이름을 붙입니다.' },
        { node: 'df-copy', text: '의존성 목록(package*.json)만 먼저 COPY 해 소스가 바뀌어도 설치 캐시를 재사용합니다.' },
        { node: 'df-run', text: 'RUN npm ci, RUN npm run build 로 설치·빌드합니다. RUN 하나가 레이어 하나입니다.' },
        { node: 'multistage', text: '새 FROM 으로 실행 단계를 시작하고 COPY --from=build 로 결과물만 가져옵니다.' },
        { node: 'df-health', text: 'HEALTHCHECK 로 /health 응답을 주기적으로 검사하게 합니다.' },
        { node: 'df-cmd', text: 'ENTRYPOINT ["node"] + CMD ["dist/server.js"] 로 기본 실행 명령을 정합니다.' }
      ]
    },
    {
      id: 'debug', title: '실행 중 컨테이너 문제 찾기 흐름', at: 'containers', src: ['logs', 'exec', 'network', 'restart'], desc: '컨테이너가 응답하지 않을 때 확인하는 순서입니다.',
      steps: [
        { node: 'containers', text: 'docker ps -a 로 상태(Up·Exited·unhealthy)와 재시작 횟수를 봅니다.' },
        { node: 'logs', text: 'docker logs --tail 100 web 으로 마지막 오류 출력을 확인합니다.' },
        { node: 'df-health', text: '상태가 unhealthy 라면 HEALTHCHECK 가 호출하는 주소가 실제로 응답하는지 봅니다.' },
        { node: 'dns', text: 'docker exec 로 들어가 다른 컨테이너 이름이 풀리는지 확인합니다(사용자 정의 네트워크 필요).' },
        { node: 'ports', text: '외부에서 안 열리면 -p 호스트:컨테이너 포트 매핑이 맞는지 봅니다.' }
      ]
    },
    {
      id: 'compose', title: 'Compose로 여러 컨테이너 실행 흐름', at: 'engine', src: ['compose', 'hub', 'pull', 'network', 'volumes'], desc: 'compose.yaml 하나로 웹·DB 같은 여러 서비스를 함께 띄우는 순서입니다.',
      steps: [
        { node: 'compose', text: 'compose.yaml에 services·networks·volumes를 정의합니다.' },
        { node: 'cli', text: 'docker compose up -d 로 정의 전체를 실행합니다.' },
        { node: 'hub', text: '로컬에 없는 이미지(postgres 등)는 Docker Hub에서 받아옵니다.' },
        { node: 'images', text: '받은 이미지와 build: 로 만든 이미지가 준비됩니다.' },
        { node: 'networks', text: '프로젝트용 네트워크가 만들어져 서비스 이름으로 서로를 찾습니다.' },
        { node: 'volumes', text: '정의한 named volume이 생성되어 DB 데이터가 보존됩니다.' },
        { node: 'containers', text: '서비스마다 컨테이너가 시작됩니다.' }
      ]
    }
  ],

  terms: [
    { term: 'Image', summary: '컨테이너를 만들기 위한 읽기 전용 템플릿', vs: { term: 'Container', diff: 'Image는 실행 전 템플릿이고, Container는 이를 실행한 인스턴스' }, src: ['image', 'container'], nodes: ['images'] },
    { term: 'Container', summary: '이미지를 실행해 만든 격리된 프로세스', vs: { term: 'Virtual Machine', diff: 'VM은 게스트 OS 전체를 띄우고, Container는 호스트 커널을 공유해 프로세스만 격리' }, src: ['container'], nodes: ['containers'] },
    { term: 'Layer', summary: 'Dockerfile 명령 하나가 만든 파일 변경분', vs: { term: 'Image', diff: 'Layer는 변경분 한 겹이고, Image는 Layer들을 쌓은 전체 결과' }, src: ['layers'], nodes: ['layer'] },
    { term: 'Dockerfile', summary: '이미지를 만드는 명령을 순서대로 적은 파일', vs: { term: 'compose.yaml', diff: 'Dockerfile은 이미지 하나를 만들고, compose.yaml은 여러 컨테이너의 실행 구성을 정의' }, src: ['dockerfile', 'compose'], nodes: ['dockerfile'] },
    { term: 'Registry', summary: '이미지를 저장·배포하는 서버', vs: { term: 'Repository', diff: 'Registry는 저장소 서버 전체이고, Repository는 그 안의 이미지 이름 단위 묶음' }, src: ['registry'], nodes: ['registryRoot'] },
    { term: 'Tag', summary: '이미지 버전에 붙이는 사람이 읽는 이름(:1.0, :latest)', vs: { term: 'Digest', diff: 'Tag는 다른 이미지로 옮겨 붙을 수 있고, Digest는 내용 해시라 항상 같은 이미지를 가리킴' }, src: ['pull'], nodes: ['tag'] },
    { term: 'dockerd', summary: 'Docker API를 제공하고 객체를 관리하는 Daemon', vs: { term: 'containerd', diff: 'dockerd는 빌드·네트워크 등 Docker 기능 전체를, containerd는 이미지·컨테이너 실행 관리를 담당' }, src: ['dockerd', 'containerd'], nodes: ['daemon'] },
    { term: 'containerd', summary: '컨테이너 생명주기를 관리하는 런타임', vs: { term: 'runc', diff: 'containerd는 컨테이너를 관리하고, runc는 커널을 호출해 프로세스를 실제로 생성' }, src: ['containerd', 'runc'], nodes: ['containerd'] },
    { term: 'Namespace', summary: '프로세스가 볼 수 있는 시스템 자원을 분리하는 커널 기능', vs: { term: 'cgroup', diff: 'Namespace는 무엇을 볼 수 있는지 격리하고, cgroup은 얼마나 쓸 수 있는지 제한' }, src: ['ns', 'cgroup'], nodes: ['namespaces'] },
    { term: 'CMD', summary: '컨테이너 시작 시 실행할 기본 명령·인자', vs: { term: 'ENTRYPOINT', diff: 'CMD는 docker run 인자로 쉽게 바뀌고, ENTRYPOINT는 항상 실행되는 고정 명령' }, src: ['dockerfile'], nodes: ['df-cmd'] },
    { term: 'ARG', summary: '빌드할 때만 쓰는 변수', vs: { term: 'ENV', diff: 'ARG는 빌드 중에만 존재하고, ENV는 완성된 이미지와 실행 중인 컨테이너에도 남음' }, src: ['dockerfile'], nodes: ['dockerfile'], level: 3 },
    { term: 'COPY', summary: 'Build context의 파일을 이미지로 복사하는 명령', vs: { term: 'ADD', diff: 'COPY는 단순 복사만 하고, ADD는 원격 URL·tar 자동 압축 해제까지 수행' }, src: ['dockerfile'], nodes: ['df-copy'] },
    { term: 'EXPOSE', summary: '컨테이너가 사용하는 포트를 문서처럼 표시하는 명령', vs: { term: '포트 공개(-p)', diff: 'EXPOSE는 표시일 뿐이고, -p를 써야 실제로 호스트에서 접속 가능' }, src: ['dockerfile', 'ports'], nodes: ['ports'] },
    { term: 'Build context', summary: 'docker build에 함께 전달되는 파일 묶음(보통 . 디렉터리)', vs: { term: 'Dockerfile', diff: 'Build context는 빌드에 보내는 파일 묶음이고, Dockerfile은 그 파일로 이미지를 만드는 순서' }, src: ['context'], nodes: ['df-copy'] },
    { term: 'Multi-stage build', summary: '여러 FROM 단계로 빌드하고 결과물만 최종 이미지에 복사하는 방식', vs: { term: '단일 단계 빌드', diff: '단일 단계는 빌드 도구까지 이미지에 남고, Multi-stage는 실행에 필요한 것만 남겨 작음' }, src: ['multistage'], nodes: ['multistage'] },
    { term: 'BuildKit', summary: 'Docker의 기본 이미지 빌드 엔진', vs: { term: 'Docker Daemon', diff: 'BuildKit은 빌드만 담당하고, Daemon은 실행·네트워크·저장소까지 관리' }, src: ['buildkit'], nodes: ['buildkit'] },
    { term: 'HEALTHCHECK', summary: '컨테이너 안에서 주기적으로 검사 명령을 실행해 healthy·unhealthy를 표시하는 Dockerfile 명령', vs: { term: 'Restart policy', diff: 'HEALTHCHECK는 상태를 표시만 하고, Restart policy는 컨테이너가 종료됐을 때 다시 시작' }, src: ['dockerfile', 'restart'], nodes: ['df-health'] },
    { term: 'Copy-on-write', summary: '읽기 전용 레이어의 파일을 고칠 때만 쓰기 레이어로 복사하는 방식', vs: { term: 'Volume', diff: 'CoW 쓰기 레이어는 컨테이너를 지우면 사라지고, Volume은 컨테이너와 별도로 남음' }, src: ['storagedrv', 'volumes'], nodes: ['storagedrv'] },
    { term: '내장 DNS', summary: '사용자 정의 네트워크에서 127.0.0.11로 컨테이너 이름을 IP로 풀어 주는 DNS', vs: { term: 'IP 주소로 접속', diff: '내장 DNS는 이름으로 찾아 컨테이너를 다시 만들어 IP가 바뀌어도 그대로 접속되고, IP를 직접 쓰면 바뀔 때마다 고쳐야 함' }, src: ['network'], nodes: ['dns'] },
    { term: 'none network', summary: 'loopback만 남기고 네트워크를 끊는 드라이버', vs: { term: 'host network', diff: 'none은 네트워크를 완전히 막고, host는 격리 없이 호스트 네트워크를 그대로 씀' }, src: ['nonenet', 'drivers'], nodes: ['none'] },
    { term: 'Volume', summary: 'Docker가 관리하는 영구 데이터 저장 공간', vs: { term: 'Bind mount', diff: 'Volume은 Docker가 위치를 관리하고, Bind mount는 사용자가 지정한 호스트 경로를 그대로 사용' }, src: ['volumes', 'bind'], nodes: ['volume'] },
    { term: 'tmpfs', summary: '호스트 메모리에만 저장하는 임시 마운트', vs: { term: 'Volume', diff: 'tmpfs는 컨테이너가 멈추면 사라지고, Volume은 컨테이너를 지워도 남음' }, src: ['tmpfs', 'volumes'], nodes: ['tmpfs'] },
    { term: 'bridge network', summary: '한 호스트 안 컨테이너를 연결하는 기본 네트워크', vs: { term: 'host network', diff: 'bridge는 컨테이너마다 별도 IP로 격리되고, host는 호스트 네트워크를 그대로 공유' }, src: ['drivers'], nodes: ['bridge'] },
    { term: 'overlay network', summary: '여러 호스트에 걸친 컨테이너 네트워크', vs: { term: 'bridge network', diff: 'bridge는 한 호스트 안에서만, overlay는 여러 호스트 사이를 연결' }, src: ['drivers'], nodes: ['overlay'] },
    { term: 'Restart policy', summary: '컨테이너 종료 시 자동 재시작 규칙', vs: { term: 'HEALTHCHECK', diff: 'Restart policy는 종료됐을 때 반응하고, HEALTHCHECK는 실행 중인 상태가 정상인지 검사' }, src: ['restart', 'dockerfile'], nodes: ['restart'] },
    { term: 'Docker Compose', summary: '여러 컨테이너를 한 YAML로 정의·실행하는 도구', vs: { term: 'Kubernetes', diff: 'Compose는 주로 단일 호스트용이고, Kubernetes는 여러 노드에 걸친 운영·자동 복구까지 담당' }, src: ['compose'], nodes: ['compose'] },
    { term: 'Rootless mode', summary: 'Daemon과 컨테이너를 root가 아닌 사용자로 실행하는 모드', vs: { term: '일반(root) 모드', diff: '일반 모드는 Daemon이 root 권한으로 실행되고, Rootless는 일반 사용자 권한으로 실행해 취약점이 생겨도 피해 범위를 줄임' }, src: ['rootless', 'run'], nodes: ['daemon'], level: 3 },
    { term: 'Docker Engine', summary: 'dockerd(데몬)·API·docker CLI로 이루어진 Docker의 빌드·실행 본체', vs: { term: 'Docker Desktop', diff: 'Docker Engine은 빌드·실행 엔진 자체이고, Docker Desktop은 Engine·CLI·Compose 등을 한 번에 설치해 주는 데스크톱 앱' }, nodes: ['engine'], src: ['engine', 'desktop'] }
  ]
};
