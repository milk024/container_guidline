/* Terraform 학습 데이터 — 화면 로직(script.js)과 분리된 구조·설명 데이터
   - tree: 계층 구조(노드마다 1줄 설명 desc + 출처 src)
   - flows: 단계 흐름(node는 tree의 id)
   - terms: 용어(요약 1줄 + 비교 대상 정확히 1개)
   - sources: 공식 문서 출처(HashiCorp Developer — Terraform) */
window.GUIDE_DATA = {
  meta: {
    id: 'terraform',
    eyebrow: '인프라를 코드로',
    title: 'Terraform 한눈에 보기',
    subtitle: '원하는 인프라를 .tf 파일에 적고, plan으로 바뀔 내용을 확인한 뒤, apply로 만들고 State에 기록하는 흐름을 한 단계씩 살펴봅니다.',
    checked: '2026-11-11',
    keyPoint: '서버·네트워크 같은 인프라를 코드 파일로 적어 두면, Terraform이 지금 상태와 비교해 필요한 만큼만 만들고 바꾸고 지우는 도구',
    learn: ['코드 작성 → init → plan → apply로 이어지는 기본 흐름', 'Provider·State·Module이 각각 무엇을 받아서 무엇을 넘기는지', '필요할 때만 한 단계씩 더 깊이: 변수 우선순위·State 잠금·반복 생성 같은 세부 기능']
  },

  sources: [
    { id: 'intro', title: 'Terraform — What is Terraform?', url: 'https://developer.hashicorp.com/terraform/intro', use: 'IaC 정의, Provider로 API 호출, Write·Plan·Apply, State 파일' },
    { id: 'workflow', title: 'Terraform — The core Terraform workflow', url: 'https://developer.hashicorp.com/terraform/intro/core-workflow', use: 'Write → Plan → Apply 작업 흐름' },
    { id: 'language', title: 'Terraform Language Documentation', url: 'https://developer.hashicorp.com/terraform/language', use: '선언형 언어, 블록 순서는 대체로 무관' },
    { id: 'syntax', title: 'Terraform — Configuration syntax', url: 'https://developer.hashicorp.com/terraform/language/syntax/configuration', use: '블록(type·label·body), 인수, 주석, HCL' },
    { id: 'resources', title: 'Terraform — Resources overview', url: 'https://developer.hashicorp.com/terraform/language/resources', use: '생성·수정·삭제·교체 동작' },
    { id: 'resource', title: 'Terraform — resource block reference', url: 'https://developer.hashicorp.com/terraform/language/block/resource', use: 'resource "TYPE" "LABEL", TYPE.LABEL 참조, 메타 인수, lifecycle' },
    { id: 'data', title: 'Terraform — Data sources', url: 'https://developer.hashicorp.com/terraform/language/data-sources', use: '읽기 전용 조회, data.TYPE.LABEL.ATTR' },
    { id: 'count', title: 'Terraform — count meta-argument', url: 'https://developer.hashicorp.com/terraform/language/meta-arguments/count', use: 'count.index, server[0], count와 for_each 동시 사용 불가' },
    { id: 'foreach', title: 'Terraform — for_each meta-argument', url: 'https://developer.hashicorp.com/terraform/language/meta-arguments/for_each', use: 'map·set, each.key·each.value, count와 고르는 기준' },
    { id: 'depends', title: 'Terraform — depends_on meta-argument', url: 'https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on', use: '참조로 자동 추론, 숨은 의존성에만 최후 수단으로' },
    { id: 'lifecycle', title: 'Terraform — lifecycle meta-argument', url: 'https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle', use: 'create_before_destroy, prevent_destroy, ignore_changes, replace_triggered_by' },
    { id: 'variables', title: 'Terraform — Input variables', url: 'https://developer.hashicorp.com/terraform/language/values/variables', use: 'type·default·validation·sensitive, var.NAME, 값 우선순위' },
    { id: 'locals', title: 'Terraform — Local values', url: 'https://developer.hashicorp.com/terraform/language/values/locals', use: 'locals 블록, local.NAME, 남용 주의' },
    { id: 'outputs', title: 'Terraform — Output values', url: 'https://developer.hashicorp.com/terraform/language/values/outputs', use: 'module.NAME.OUTPUT, CLI 표시, sensitive, terraform output' },
    { id: 'providers', title: 'Terraform — Providers', url: 'https://developer.hashicorp.com/terraform/language/providers', use: 'Provider 플러그인, Resource·Data Source 제공, Registry 배포' },
    { id: 'provreq', title: 'Terraform — Provider requirements', url: 'https://developer.hashicorp.com/terraform/language/providers/requirements', use: 'required_providers, source 주소 형식, 기본 호스트' },
    { id: 'provblock', title: 'Terraform — provider block reference', url: 'https://developer.hashicorp.com/terraform/language/block/provider', use: 'region 같은 Provider 설정' },
    { id: 'version', title: 'Terraform — Version constraints', url: 'https://developer.hashicorp.com/terraform/language/expressions/version-constraints', use: '~> 연산자, Root Module·재사용 모듈 권장 방식' },
    { id: 'lock', title: 'Terraform — Dependency lock file', url: 'https://developer.hashicorp.com/terraform/language/files/dependency-lock', use: '.terraform.lock.hcl, 버전 관리에 포함, Provider만 기록' },
    { id: 'registry', title: 'Terraform Registry', url: 'https://registry.terraform.io/', use: '공개 Provider·Module 목록' },
    { id: 'init', title: 'Terraform CLI — terraform init', url: 'https://developer.hashicorp.com/terraform/cli/commands/init', use: 'Backend 초기화, Module·Provider 설치, 잠금 파일, 반복 실행 안전' },
    { id: 'fmt', title: 'Terraform CLI — terraform fmt', url: 'https://developer.hashicorp.com/terraform/cli/commands/fmt', use: '표준 형식 정리, -check, -recursive' },
    { id: 'validate', title: 'Terraform CLI — terraform validate', url: 'https://developer.hashicorp.com/terraform/cli/commands/validate', use: '문법·내부 일관성 검사, 원격 서비스는 검사 안 함' },
    { id: 'plan', title: 'Terraform CLI — terraform plan', url: 'https://developer.hashicorp.com/terraform/cli/commands/plan', use: '현재 상태 읽기 → 비교 → 변경 제안, -out, -destroy, -refresh-only, -var' },
    { id: 'apply', title: 'Terraform CLI — terraform apply', url: 'https://developer.hashicorp.com/terraform/cli/commands/apply', use: '자동 plan 후 승인, 저장된 plan 적용, -auto-approve' },
    { id: 'destroy', title: 'Terraform CLI — terraform destroy', url: 'https://developer.hashicorp.com/terraform/cli/commands/destroy', use: 'apply -destroy 별칭, plan -destroy 미리보기' },
    { id: 'import', title: 'Terraform — import block reference', url: 'https://developer.hashicorp.com/terraform/language/block/import', use: '기존 인프라 가져오기, to·id 인수' },
    { id: 'state', title: 'Terraform — State', url: 'https://developer.hashicorp.com/terraform/language/state', use: 'terraform.tfstate, 실제 리소스와 연결, 원격 저장 권장' },
    { id: 'remote', title: 'Terraform — Remote state', url: 'https://developer.hashicorp.com/terraform/language/state/remote', use: '팀이 State를 공유하는 원격 저장' },
    { id: 'backend', title: 'Terraform — Backend block configuration overview', url: 'https://developer.hashicorp.com/terraform/language/backend', use: 'State 저장 위치, 기본 local, 변수 참조 불가, 변경 후 init' },
    { id: 's3', title: 'Terraform — Backend type: s3', url: 'https://developer.hashicorp.com/terraform/language/backend/s3', use: 'bucket·key·region, use_lockfile, DynamoDB 잠금 deprecated, 버킷 버전 관리' },
    { id: 'locking', title: 'Terraform — State locking', url: 'https://developer.hashicorp.com/terraform/language/state/locking', use: '쓰기 작업 자동 잠금, -lock=false 비권장, force-unlock' },
    { id: 'workspaces', title: 'Terraform CLI — Workspaces', url: 'https://developer.hashicorp.com/terraform/cli/workspaces', use: '한 디렉터리의 여러 State, default, 같은 Backend 공유' },
    { id: 'statecmd', title: 'Terraform CLI — terraform state', url: 'https://developer.hashicorp.com/terraform/cli/commands/state', use: 'list·show·mv·rm 등, State 파일 직접 수정 대신 명령 사용' },
    { id: 'sensitive', title: 'Terraform — Manage sensitive data', url: 'https://developer.hashicorp.com/terraform/language/manage-sensitive-data', use: 'State는 평문, sensitive는 출력만 가림, 암호화·원격 저장, ephemeral' },
    { id: 'modules', title: 'Terraform — Modules', url: 'https://developer.hashicorp.com/terraform/language/modules', use: 'Module 정의, Root·Child Module, 공개·사설 레지스트리' },
    { id: 'module', title: 'Terraform — module block reference', url: 'https://developer.hashicorp.com/terraform/language/block/module', use: 'source 필수, version은 레지스트리만, module.LABEL.OUTPUT, 변경 후 init' }
  ],

  tree: [
    {
      id: 'config', label: '구성 파일', en: 'Configuration', src: ['language', 'syntax', 'intro'],
      key: '만들고 싶은 인프라를 적어 두는 .tf 파일. "이렇게 되어 있어야 한다"는 목표만 적고, 만드는 순서는 Terraform이 정한다.',
      role: '사람에게서 원하는 인프라 내용을 받아서 Terraform CLI에게 읽을 설계도로 넘긴다',
      desc: 'Terraform 언어는 목표 상태를 적는 선언형이며, 주 목적은 인프라 객체를 나타내는 Resource를 선언하는 것입니다.',
      ex: { v: 'main.tf', lang: 'hcl', code: 'terraform {\n  required_providers {\n    aws = {\n      source  = "hashicorp/aws"\n      version = "~> 6.0"\n    }\n  }\n}\n\nprovider "aws" {\n  region = var.region\n}\n\nresource "aws_instance" "web" {\n  ami           = data.aws_ami.ubuntu.id\n  instance_type = var.instance_type\n}\n\noutput "web_ip" {\n  value = aws_instance.web.public_ip\n}' },
      children: [
        {
          id: 'hcl', label: '블록·인수 문법', en: 'HCL syntax', src: ['syntax', 'language'],
          key: '모든 설정은 "블록 { 인수 = 값 }" 모양이다. 블록 종류와 이름표(label)를 쓰고 중괄호 안에 값을 채운다.',
          role: '작성자에게서 블록·인수를 받아서 Terraform이 해석할 구성으로 넘긴다',
          desc: '블록은 종류(type)·라벨·본문 { }으로, 인수는 이름 = 표현식으로 쓰며 이 문법은 HCL을 바탕으로 합니다.',
          ex: { v: 'resource "aws_instance" "web"', lang: 'hcl', code: '# 블록 종류  라벨1(타입)        라벨2(이름)\nresource "aws_instance" "web" {\n  instance_type = "t3.micro"   # 인수: 이름 = 값\n}\n\n// 한 줄 주석 (# 과 같음)\n/* 여러 줄\n   주석 */' }
        },
        {
          id: 'resource', label: 'Resource', en: 'resource block', src: ['resource', 'resources'],
          key: 'Terraform이 실제로 만들고 관리하는 인프라 하나(서버, 네트워크, 버킷 등)를 적는 블록.',
          role: '구성 파일에게서 원하는 모양을 받아서 Provider에게 생성·수정·삭제 요청으로 넘긴다',
          desc: 'resource "TYPE" "LABEL" 블록으로 선언하고 TYPE.LABEL로 참조하며, 설정과 실제가 다르면 생성·수정·삭제·교체합니다.',
          ex: { v: 'aws_instance.web', lang: 'hcl', code: 'resource "aws_instance" "web" {\n  ami           = "ami-0abc1234"\n  instance_type = "t3.micro"\n  tags = { Name = "web" }\n}\n\n# 다른 블록에서 참조: TYPE.LABEL.속성\noutput "web_id" {\n  value = aws_instance.web.id\n}' }
        },
        {
          id: 'datasrc', label: 'Data Source', en: 'data block', src: ['data'],
          key: '이미 있는 정보(최신 OS 이미지 ID 등)를 읽어 오기만 하는 블록. 아무것도 만들거나 바꾸지 않는다.',
          role: 'Provider에게서 조회 결과를 받아서 Resource의 인수 값으로 넘긴다',
          desc: 'Provider에서 데이터를 읽기만 하고 리소스를 만들거나 바꾸지 않으며, data.TYPE.LABEL.속성으로 참조합니다.',
          ex: { v: 'data.aws_ami.ubuntu', lang: 'hcl', code: 'data "aws_ami" "ubuntu" {\n  most_recent = true\n  owners      = ["099720109477"]\n  filter {\n    name   = "name"\n    values = ["ubuntu/images/*-24.04-amd64-server-*"]\n  }\n}\n\nresource "aws_instance" "web" {\n  ami = data.aws_ami.ubuntu.id   # 읽어 온 값 사용\n}' }
        },
        {
          id: 'meta', label: '반복·순서 설정', en: 'Meta-arguments', src: ['resource', 'count', 'foreach', 'depends', 'lifecycle'],
          key: '어느 Resource에나 붙일 수 있는 Terraform 전용 인수. 여러 개 만들기, 순서 정하기, 삭제 방식 바꾸기에 쓴다.',
          role: 'Resource 블록에게서 받아서 Terraform이 인스턴스 개수·만드는 순서·교체 방식을 정하도록 넘긴다',
          desc: 'resource 블록은 count·for_each·depends_on·provider·lifecycle 같은 메타 인수를 지원합니다.',
          children: [
            {
              id: 'count', label: 'count', en: 'count', src: ['count'],
              key: '거의 똑같은 것을 숫자만큼 만든다. 각각은 0부터 시작하는 번호(count.index)로 구분한다.',
              role: '숫자를 받아서 같은 Resource를 그만큼의 인스턴스로 넘긴다',
              desc: '정수만큼 비슷한 인스턴스를 만들고 count.index(0부터)와 server[0] 같은 주소로 구분하며, for_each와 함께 쓸 수 없습니다.',
              ex: { v: 'count = 3', lang: 'hcl', code: 'resource "aws_instance" "server" {\n  count         = 3\n  ami           = "ami-0abc1234"\n  instance_type = "t3.micro"\n  tags = { Name = "server-${count.index}" }\n}\n# 주소: aws_instance.server[0], [1], [2]' }
            },
            {
              id: 'foreach', label: 'for_each', en: 'for_each', src: ['foreach'],
              key: 'map이나 문자열 set의 항목마다 하나씩 만든다. 항목마다 값이 달라야 할 때 쓴다.',
              role: 'map·set을 받아서 항목(each.key·each.value)마다 인스턴스로 넘긴다',
              desc: 'map 또는 문자열 set의 항목마다 인스턴스를 만들고, 정수에서 끌어낼 수 없는 서로 다른 값이 필요할 때 씁니다.',
              ex: { v: 'for_each', lang: 'hcl', code: 'resource "aws_s3_bucket" "b" {\n  for_each = toset(["logs", "assets"])\n  bucket   = "myapp-${each.key}"\n}\n# 주소: aws_s3_bucket.b["logs"], aws_s3_bucket.b["assets"]' }
            },
            {
              id: 'depends', label: 'depends_on', en: 'depends_on', src: ['depends'],
              key: '보통은 다른 Resource를 참조하면 순서가 자동으로 정해진다. 참조로 드러나지 않는 의존만 직접 적는다.',
              role: '숨은 의존 관계를 받아서 Terraform의 생성 순서 계산에 넘긴다',
              desc: 'Terraform이 참조로 추론할 수 없는 숨은 의존성을 지정하며, 최후의 수단으로만 쓰라고 권장합니다.',
              ex: { v: 'depends_on', lang: 'hcl', code: 'resource "aws_instance" "app" {\n  # 참조(aws_iam_instance_profile.p.name)가 있으면 순서는 자동\n  iam_instance_profile = aws_iam_instance_profile.p.name\n\n  # 참조로 드러나지 않는 의존만 직접 지정\n  depends_on = [aws_iam_role_policy.p]\n}' }
            },
            {
              id: 'lifecycle', label: 'lifecycle', en: 'lifecycle', src: ['lifecycle', 'resource'],
              key: '교체·삭제 방식을 바꾸는 설정. 새것을 먼저 만들거나, 실수로 지우지 못하게 막는다.',
              role: 'Resource에게서 받아서 plan이 교체·삭제를 계산할 때 규칙으로 넘긴다',
              desc: 'create_before_destroy·prevent_destroy·ignore_changes·replace_triggered_by로 생성·교체·삭제 동작을 바꿉니다.',
              ex: { v: 'prevent_destroy', lang: 'hcl', code: 'resource "aws_db_instance" "main" {\n  # ...\n  lifecycle {\n    prevent_destroy       = true   # 삭제하는 plan은 거부\n    create_before_destroy = true   # 교체 시 새것 먼저 생성\n    ignore_changes        = [tags]\n  }\n}' }
            }
          ]
        }
      ]
    },
    {
      id: 'values', label: '입력·출력 값', en: 'Variables & Outputs', src: ['variables', 'locals', 'outputs'],
      key: '같은 코드를 값만 바꿔 다시 쓰게 해 주는 입구(variable)와, 만든 결과를 밖으로 알려 주는 출구(output).',
      role: '실행하는 사람에게서 값을 받아서 구성 파일에 넘기고, 적용 결과는 output으로 사람·상위 모듈에게 넘긴다',
      desc: '입력 변수는 모듈의 매개변수, 로컬 값은 모듈 안의 이름 붙인 식, 출력 값은 모듈 밖으로 내보내는 결과입니다.',
      ex: { v: 'var · local · output', lang: 'hcl', code: 'variable "env" { type = string }\n\nlocals {\n  name = "myapp-${var.env}"\n}\n\nresource "aws_s3_bucket" "logs" {\n  bucket = local.name\n}\n\noutput "bucket" {\n  value = aws_s3_bucket.logs.bucket\n}' },
      children: [
        {
          id: 'variable', label: '입력 변수', en: 'variable', src: ['variables'],
          key: '실행할 때마다 바꿔 넣을 값의 자리. 기본값이 없으면 Terraform이 실행 전에 값을 물어본다.',
          role: '.tfvars·-var·환경 변수에게서 값을 받아서 var.NAME으로 Resource에게 넘긴다',
          desc: 'type·default·description·validation·sensitive로 정의하고 var.NAME으로 참조하며, default가 없으면 plan 전에 값을 묻습니다.',
          ex: { v: 'var.instance_type', lang: 'hcl', code: 'variable "instance_type" {\n  type        = string\n  default     = "t3.micro"\n  description = "EC2 인스턴스 크기"\n  validation {\n    condition     = startswith(var.instance_type, "t3.")\n    error_message = "t3 계열만 허용합니다."\n  }\n}' }
        },
        {
          id: 'tfvars', label: '값 넣는 방법·우선순위', en: '.tfvars · precedence', src: ['variables', 'plan'],
          key: '같은 변수에 값이 여러 곳에서 들어오면 명령줄 > *.auto.tfvars > terraform.tfvars > 환경 변수 > default 순으로 이긴다.',
          role: '파일·명령줄·환경 변수에게서 값을 받아서 우선순위가 가장 높은 값을 입력 변수에게 넘긴다',
          desc: '-var·-var-file이 가장 높고, *.auto.tfvars → terraform.tfvars.json → terraform.tfvars → TF_VAR_ 환경 변수 → default 순으로 낮아집니다.',
          ex: { v: 'terraform.tfvars', lang: 'bash', code: '# terraform.tfvars (자동으로 읽음)\nregion        = "ap-northeast-2"\ninstance_type = "t3.small"\n\n# 우선순위 (높음 → 낮음)\nterraform plan -var="instance_type=t3.large"   # 1. -var / -var-file\n#   prod.auto.tfvars                              2. *.auto.tfvars\n#   terraform.tfvars                              3~4. terraform.tfvars(.json)\nexport TF_VAR_instance_type=t3.medium           # 5. 환경 변수\n#   default = "t3.micro"                          6. default' }
        },
        {
          id: 'locals', label: '로컬 값', en: 'locals', src: ['locals'],
          key: '모듈 안에서 여러 번 쓰는 식에 이름을 붙여 두는 것. 밖에서 바꿀 수는 없다.',
          role: '변수·다른 값들에게서 식을 받아서 local.NAME으로 여러 Resource에게 넘긴다',
          desc: '함수 안 지역 변수와 비슷하며 local.NAME으로 참조하고, 값의 출처를 가릴 수 있어 반복되거나 복잡한 식에만 쓰도록 권장합니다.',
          ex: { v: 'local.common_tags', lang: 'hcl', code: 'locals {\n  common_tags = {\n    Project = "myapp"\n    Env     = var.env\n  }\n}\n\nresource "aws_instance" "web" {\n  tags = local.common_tags\n}' }
        },
        {
          id: 'output', label: '출력 값', en: 'output', src: ['outputs'],
          key: '만든 인프라의 정보(IP, 주소 등)를 밖으로 내보내는 출구. apply가 끝나면 화면에 보여 준다.',
          role: 'Resource 속성을 받아서 CLI 화면·상위 모듈(module.NAME.OUTPUT)·다른 구성에게 넘긴다',
          desc: 'Root Module의 출력은 apply 뒤 CLI에 표시되고, Child Module의 출력은 module.NAME.OUTPUT으로 상위에서 씁니다.',
          ex: { v: 'terraform output', lang: 'hcl', code: 'output "web_ip" {\n  value       = aws_instance.web.public_ip\n  description = "웹 서버 공인 IP"\n}\n\noutput "db_password" {\n  value     = random_password.db.result\n  sensitive = true   # CLI에 가려 표시 (State에는 저장됨)\n}\n\n# $ terraform output web_ip' }
        }
      ]
    },
    {
      id: 'cli', label: 'Terraform CLI', en: 'terraform command', src: ['workflow', 'intro', 'plan', 'apply'],
      key: '구성 파일을 읽어 지금 상태와 비교하고, 바뀔 내용을 보여 준 뒤 승인하면 실제로 적용하는 명령 도구.',
      role: '구성 파일과 State를 받아서 계산한 변경을 Provider에게 넘기고, 결과를 State에 기록한다',
      desc: 'Write로 작성한 구성을 Plan으로 미리 보고, 승인하면 Apply가 의존 관계 순서대로 작업을 수행합니다.',
      ex: { v: 'init → plan → apply', lang: 'bash', code: 'terraform init        # Provider·Module·Backend 준비\nterraform fmt         # 코드 형식 정리\nterraform validate    # 문법·일관성 검사\nterraform plan -out=tfplan\nterraform apply tfplan\nterraform destroy     # 모두 삭제(실습 정리용)' },
      children: [
        {
          id: 'init', label: 'terraform init', en: 'initialize', src: ['init'],
          key: '작업 폴더를 처음 준비하는 명령. Provider와 Module을 내려받고 State 저장 위치(Backend)를 연결한다.',
          role: '구성 파일을 받아서 Backend·Module·Provider를 준비하고 잠금 파일에 버전을 넘긴다',
          desc: 'Backend 초기화·Child Module 설치·Provider 플러그인 설치를 하고 선택한 버전을 잠금 파일에 기록하며, 여러 번 실행해도 안전합니다.',
          ex: { v: 'terraform init', lang: 'bash', code: 'terraform init                      # 최초 준비 (여러 번 실행해도 안전)\nterraform init -upgrade             # 제약 범위 안에서 Provider 새 버전 선택\nterraform init -backend-config=prod.hcl   # Backend 설정 일부를 파일로 주입' }
        },
        {
          id: 'fmtval', label: 'fmt · validate', en: 'format & check', src: ['fmt', 'validate'],
          key: 'fmt는 코드 모양을 표준대로 정리하고, validate는 문법과 속성 이름·타입이 맞는지 검사한다.',
          role: '작성한 .tf 파일을 받아서 정리·검사한 결과를 plan 전 단계로 넘긴다',
          desc: 'fmt는 표준 형식으로 정리하고, validate는 변수·State와 무관하게 문법·내부 일관성을 검사하되 원격 서비스는 검사하지 않습니다.',
          ex: { v: 'terraform fmt -check', lang: 'bash', code: 'terraform fmt -recursive   # 하위 폴더까지 형식 정리\nterraform fmt -check       # CI: 정리 안 된 파일이 있으면 0이 아닌 종료 코드\nterraform validate         # init 된 폴더에서 문법·타입 검사' }
        },
        {
          id: 'plan', label: 'terraform plan', en: 'preview changes', src: ['plan'],
          key: '실제로 바꾸기 전에 "무엇을 만들고·바꾸고·지울지" 미리 보여 주는 명령. 이것만으로는 아무것도 바뀌지 않는다.',
          role: 'State와 실제 원격 객체를 읽어 구성 파일과 비교한 변경 계획을 apply에게 넘긴다',
          desc: '원격 객체의 현재 상태를 읽어 State를 최신화하고 구성과 비교해 변경을 제안하며, 제안만 할 뿐 실행하지 않습니다.',
          ex: { v: 'terraform plan -out=tfplan', lang: 'text', code: '$ terraform plan -out=tfplan\n\n  # aws_instance.web will be created\n  + resource "aws_instance" "web" {\n      + instance_type = "t3.micro"\n    }\n\nPlan: 1 to add, 0 to change, 0 to destroy.\n\n# 기호: + 생성  ~ 수정  - 삭제  -/+ 교체' }
        },
        {
          id: 'apply', label: 'terraform apply', en: 'apply changes', src: ['apply', 'intro'],
          key: '계획대로 실제 인프라를 만들고 바꾸는 명령. 저장된 plan이 없으면 먼저 plan을 보여 주고 승인을 받는다.',
          role: 'plan의 변경 목록을 받아서 Provider에게 실행시키고, 결과를 State에게 넘긴다',
          desc: '저장된 plan 없이 실행하면 새 plan을 만들어 승인을 묻고, 저장된 plan 파일을 주면 묻지 않고 그대로 실행합니다.',
          ex: { v: 'terraform apply tfplan', lang: 'bash', code: 'terraform apply            # plan을 보여 주고 yes 입력을 기다림\nterraform apply tfplan     # 저장한 plan 그대로 실행 (승인 질문 없음)\nterraform apply -auto-approve   # 승인 생략 (자동화 전용, 주의)' }
        },
        {
          id: 'destroy', label: 'terraform destroy', en: 'destroy all', src: ['destroy', 'plan'],
          key: '이 구성이 관리하는 인프라를 모두 지우는 명령. 실습·임시 환경 정리에 쓴다.',
          role: 'State에 기록된 객체 목록을 받아서 Provider에게 삭제 요청으로 넘긴다',
          desc: 'terraform apply -destroy의 별칭으로 관리 중인 모든 원격 객체를 삭제하며, plan -destroy로 미리 볼 수 있습니다.',
          ex: { v: 'terraform destroy', lang: 'bash', code: 'terraform plan -destroy    # 무엇이 지워질지 미리 보기\nterraform destroy          # = terraform apply -destroy' }
        },
        {
          id: 'import', label: 'import', en: 'import block', src: ['import'],
          key: '콘솔 등으로 이미 만들어 둔 인프라를 Terraform 관리 대상으로 가져오는 방법.',
          role: '기존 리소스의 ID를 받아서 지정한 Resource 주소로 State에 넘긴다',
          desc: 'import 블록의 to에 Resource 주소, id에 클라우드의 리소스 ID를 적어 기존 인프라를 Terraform으로 가져옵니다.',
          ex: { v: 'import { to = ... }', lang: 'hcl', code: 'import {\n  to = aws_s3_bucket.logs\n  id = "myapp-logs"        # 클라우드에 이미 있는 버킷 이름\n}\n\nresource "aws_s3_bucket" "logs" {\n  bucket = "myapp-logs"\n}\n# terraform plan 으로 가져올 내용 확인 → terraform apply' }
        }
      ]
    },
    {
      id: 'providers', label: 'Provider', en: 'Provider plugin', src: ['providers', 'intro'],
      key: 'AWS·Azure·Kubernetes 같은 서비스의 API를 Terraform이 쓸 수 있게 이어 주는 플러그인.',
      role: 'Terraform CLI에게서 생성·수정·삭제 요청을 받아서 각 서비스의 API에게 넘긴다',
      desc: 'Provider는 클라우드·SaaS 등의 API와 통신하는 플러그인으로, 관리할 수 있는 Resource 타입과 Data Source를 추가합니다.',
      ex: { v: 'provider "aws"', lang: 'hcl', code: 'terraform {\n  required_version = ">= 1.6"\n  required_providers {\n    aws = {\n      source  = "hashicorp/aws"   # registry.terraform.io/hashicorp/aws\n      version = "~> 6.0"\n    }\n  }\n}\n\nprovider "aws" {\n  region = "ap-northeast-2"\n}' },
      children: [
        {
          id: 'required', label: '필요한 Provider 선언', en: 'required_providers', src: ['provreq', 'version'],
          key: '이 구성이 어떤 Provider의 어느 버전을 쓰는지 적어 두는 곳. init이 이걸 보고 내려받는다.',
          role: '구성 파일에게서 Provider 이름·버전 제약을 받아서 terraform init에게 넘긴다',
          desc: 'terraform 블록 안 required_providers에 [호스트/]네임스페이스/타입 형식의 source와 version 제약을 적으며, 호스트를 생략하면 registry.terraform.io입니다.',
          ex: { v: 'required_providers', lang: 'hcl', code: 'terraform {\n  required_providers {\n    aws = {\n      source  = "hashicorp/aws"\n      version = "~> 6.0"   # 6.x 허용, 7.0 제외\n    }\n  }\n}' }
        },
        {
          id: 'provblock', label: 'Provider 설정', en: 'provider block', src: ['provblock', 'providers'],
          key: '리전·엔드포인트처럼 Provider가 일하기 전에 알아야 할 값을 적는 블록.',
          role: '구성 파일에게서 리전 같은 설정을 받아서 Provider 플러그인에게 넘긴다',
          desc: 'provider 블록에 리전이나 엔드포인트 URL 같은, Provider를 쓰기 전에 필요한 설정을 적습니다.',
          ex: { v: 'provider "aws"', lang: 'hcl', code: 'provider "aws" {\n  region = "ap-northeast-2"\n}\n\n# 같은 Provider를 다른 리전으로 하나 더 (alias)\nprovider "aws" {\n  alias  = "us"\n  region = "us-east-1"\n}' }
        },
        {
          id: 'registry', label: 'Terraform Registry', en: 'registry.terraform.io', src: ['registry', 'providers', 'modules'],
          key: '공개된 Provider와 Module을 찾아 내려받는 공식 목록 사이트.',
          role: 'Provider·Module 개발자에게서 배포본을 받아서 terraform init에게 넘긴다',
          desc: '공개 Provider의 주된 목록이자 공개 Module을 호스팅하는 곳이며, Provider는 Terraform과 별도로 배포됩니다.',
          ex: { v: 'hashicorp/aws', lang: 'text', code: 'registry.terraform.io/hashicorp/aws\n└─ 호스트           /네임스페이스 /타입\n\nsource = "hashicorp/aws"                       # Provider\nsource = "terraform-aws-modules/vpc/aws"       # Module' }
        },
        {
          id: 'lockfile', label: '의존성 잠금 파일', en: '.terraform.lock.hcl', src: ['lock', 'init'],
          key: 'init이 고른 Provider 정확한 버전을 기록한 파일. 팀 모두가 같은 버전을 쓰게 Git에 함께 올린다.',
          role: 'terraform init에게서 선택한 Provider 버전을 받아서 다음 init에게 그대로 넘긴다',
          desc: '.terraform.lock.hcl은 Provider 의존성만 기록하며 버전 관리에 포함해야 하고, init -upgrade일 때만 새 버전으로 다시 고릅니다.',
          ex: { v: '.terraform.lock.hcl', lang: 'hcl', code: '# .terraform.lock.hcl (init이 자동 생성 — Git에 커밋)\nprovider "registry.terraform.io/hashicorp/aws" {\n  version     = "6.0.0"\n  constraints = "~> 6.0"\n  hashes = [\n    "h1:...",\n  ]\n}' }
        }
      ]
    },
    {
      id: 'state', label: 'State', en: 'terraform.tfstate', src: ['state', 'backend'],
      key: 'Terraform이 "코드의 이 Resource = 실제 이 서버"라고 기억해 두는 기록장. 다음 plan은 이 기록과 비교한다.',
      role: 'apply에게서 실제 객체 정보를 받아서 다음 plan에게 비교 기준으로 넘긴다',
      desc: '구성을 실제 리소스에 연결하고 메타데이터를 추적하며, 기본으로 terraform.tfstate 파일에 저장되고 팀은 원격 저장을 권장합니다.',
      ex: { v: 'terraform.tfstate', lang: 'text', code: '코드                         State                      실제\nresource "aws_instance"  →  aws_instance.web         →  i-0123456789abcdef0\n         "web"               id = "i-0123..."\n\n# 기본: ./terraform.tfstate (+ terraform.tfstate.backup)\n# 팀:   S3·HCP Terraform 같은 원격 Backend 권장' },
      children: [
        {
          id: 'tfstate', label: 'State 파일', en: 'state file', src: ['state', 'statecmd'],
          key: '코드의 Resource 주소와 실제 리소스 ID를 짝지어 둔 JSON 파일. 손으로 고치지 않는다.',
          role: 'apply 결과를 받아서 plan·output·destroy에게 현재 상태로 넘긴다',
          desc: '기본으로 작업 공간마다 terraform.tfstate에 저장되며, 직접 고치는 대신 terraform state 명령으로 다룹니다.',
          ex: { v: 'terraform state list', lang: 'bash', code: 'terraform state list                    # 관리 중인 주소 목록\nterraform state show aws_instance.web   # 한 객체의 속성\nterraform state mv  aws_instance.web aws_instance.app   # 주소 변경\nterraform state rm  aws_instance.old    # 관리 대상에서만 제외(실제 삭제 아님)' }
        },
        {
          id: 'backend', label: 'Backend', en: 'remote backend', src: ['backend', 's3', 'remote'],
          key: 'State 파일을 어디에 둘지 정하는 설정. 기본은 내 컴퓨터(local), 팀이면 S3 같은 공유 저장소에 둔다.',
          role: 'terraform 블록에게서 저장 위치를 받아서 State 읽기·쓰기를 그 저장소에게 넘긴다',
          desc: 'terraform 블록 안 backend 블록으로 State 저장 위치를 정하며 기본은 local이고, 변수를 참조할 수 없고 바꾸면 init을 다시 해야 합니다.',
          ex: { v: 'backend "s3"', lang: 'hcl', code: 'terraform {\n  backend "s3" {\n    bucket       = "myapp-tfstate"\n    key          = "prod/terraform.tfstate"\n    region       = "ap-northeast-2"\n    use_lockfile = true   # S3 자체 잠금 (DynamoDB 잠금은 deprecated)\n    encrypt      = true\n  }\n}\n# 버킷 버전 관리(Versioning)를 켜 두면 State 복구 가능' }
        },
        {
          id: 'locking', label: 'State 잠금', en: 'state locking', src: ['locking', 's3'],
          key: '두 사람이 동시에 apply해서 State가 망가지지 않게, 쓰는 동안 자물쇠를 거는 기능.',
          role: '쓰기 작업(plan·apply)에게서 잠금 요청을 받아서 다른 실행에게는 대기·실패로 넘긴다',
          desc: 'State를 쓸 수 있는 모든 작업에서 자동으로 잠그며, -lock=false는 권장하지 않고 force-unlock은 자동 해제가 실패한 내 잠금에만 씁니다.',
          ex: { v: 'force-unlock', lang: 'bash', code: '# 잠금은 자동. 다른 사람이 apply 중이면:\n#   Error acquiring the state lock ... Lock Info: ID: 3f2a...\n\n# 내 실행이 비정상 종료돼 잠금이 남았을 때만\nterraform force-unlock 3f2a...' }
        },
        {
          id: 'workspace', label: 'Workspace', en: 'CLI workspaces', src: ['workspaces'],
          key: '같은 폴더·같은 코드로 State만 여러 벌 두는 기능. 처음엔 default 하나다.',
          role: '선택한 이름을 받아서 Backend 안의 해당 State를 plan·apply에게 넘긴다',
          desc: '한 작업 디렉터리 안의 여러 State 인스턴스로 default에서 시작하며, 같은 Backend를 쓰므로 자격 증명이 다른 환경 분리에는 맞지 않습니다.',
          ex: { v: 'terraform workspace', lang: 'bash', code: 'terraform workspace list          # * default\nterraform workspace new feature-x\nterraform workspace select default\n\n# 자격 증명·권한이 다른 dev / prod 는\n# Workspace 대신 Backend(폴더)를 따로 두는 것을 권장' }
        },
        {
          id: 'secret', label: 'State 속 비밀값', en: 'sensitive data', src: ['sensitive', 'state', 'outputs'],
          key: 'State는 비밀번호까지 평문으로 담는다. sensitive는 화면에서만 가릴 뿐이라 State 저장소 자체를 지켜야 한다.',
          role: 'Resource·output의 비밀값을 받아서 State에 평문으로 넘기므로, 암호화된 원격 Backend에 맡긴다',
          desc: 'State는 비밀값을 포함한 평문 파일이며 sensitive는 CLI 출력만 가리므로, 원격 저장·저장 시 암호화·접근 제한을 권장합니다.',
          ex: { v: 'sensitive = true', lang: 'hcl', code: 'variable "db_password" {\n  type      = string\n  sensitive = true   # plan·apply 출력에서 가림\n}\n# 하지만 State·plan 파일에는 그대로 저장됨\n# → State를 Git에 올리지 않기 (.gitignore: *.tfstate*)\n# → encrypt = true 인 원격 Backend + 접근 제한' }
        }
      ]
    },
    {
      id: 'modules', label: 'Module', en: 'module', src: ['modules', 'module'],
      key: '여러 Resource를 한 묶음으로 만들어 두고 이름만 불러 다시 쓰는 단위. 함수처럼 입력을 받고 출력을 돌려준다.',
      role: '상위 구성에게서 입력 변수를 받아서 안의 Resource들을 만들고, 결과를 output으로 상위에게 넘긴다',
      desc: 'Module은 함께 관리하는 리소스 묶음이며, 작업 디렉터리의 구성이 Root Module이고 module 블록으로 부른 것이 Child Module입니다.',
      ex: { v: 'module "vpc"', lang: 'hcl', code: 'module "vpc" {\n  source  = "terraform-aws-modules/vpc/aws"\n  version = "~> 6.0"\n\n  name = "myapp"          # 모듈의 입력 변수\n  cidr = "10.0.0.0/16"\n}\n\nresource "aws_instance" "web" {\n  subnet_id = module.vpc.public_subnets[0]   # 모듈의 출력\n}' },
      children: [
        {
          id: 'rootmod', label: 'Root Module', en: 'root module', src: ['modules'],
          key: 'terraform 명령을 실행하는 폴더의 .tf 파일 전체. 모든 구성은 여기서 시작한다.',
          role: '사람에게서 실행 명령을 받아서 Child Module에게 입력 값을 넘긴다',
          desc: '작업 공간 루트 디렉터리에 있는 구성을 Root Module이라 하며, 여기서 Child Module을 호출합니다.',
          ex: { v: 'envs/prod', lang: 'text', code: 'envs/prod/            ← Root Module (여기서 terraform 실행)\n├─ main.tf            module "network" { source = "../../modules/network" }\n├─ variables.tf\n├─ outputs.tf\n└─ terraform.tfvars\nmodules/network/      ← Child Module\n├─ main.tf\n├─ variables.tf\n└─ outputs.tf' }
        },
        {
          id: 'childmod', label: 'Child Module', en: 'module block', src: ['module', 'modules'],
          key: 'module 블록으로 불러 쓰는 묶음. 블록 안 인수가 입력이 되고, module.이름.출력으로 결과를 꺼낸다.',
          role: 'Root Module에게서 인수(입력 변수)를 받아서 Resource들을 만들고 output을 Root Module에게 넘긴다',
          desc: 'module "LABEL" 블록에 source(필수)와 입력 값을 적고, 출력은 module.LABEL.OUTPUT으로 참조합니다.',
          ex: { v: 'module.network.vpc_id', lang: 'hcl', code: 'module "network" {\n  source = "../../modules/network"   # 로컬 경로\n  cidr   = "10.0.0.0/16"\n}\n\noutput "vpc_id" {\n  value = module.network.vpc_id\n}' }
        },
        {
          id: 'modsrc', label: '모듈 출처·버전', en: 'source · version', src: ['module', 'version', 'registry'],
          key: '모듈을 어디서 가져올지(source)와 어느 버전을 쓸지(version)를 정한다. 바꾸면 init을 다시 한다.',
          role: 'Registry·Git·로컬 경로에게서 모듈 코드를 받아서 terraform init이 .terraform 폴더로 넘기게 한다',
          desc: 'version 인수는 레지스트리 모듈에만 적용되며, source를 바꾸면 terraform init을 다시 실행해야 합니다.',
          ex: { v: 'version = "~> 6.0"', lang: 'hcl', code: 'module "vpc" {\n  source  = "terraform-aws-modules/vpc/aws"   # Registry\n  version = "~> 6.0"                         # 6.x 안에서만 갱신\n}\n\n# 로컬 경로 모듈은 version 을 쓸 수 없음\n# source 를 바꾼 뒤에는: terraform init' }
        }
      ]
    }
  ],

  icons: {
    "config": "file", "hcl": "brace", "resource": "cube", "datasrc": "search", "meta": "sliders",
    "count": "copy", "foreach": "list", "depends": "link", "lifecycle": "history",
    "values": "pipe", "variable": "download", "tfvars": "file", "locals": "tag", "output": "upload",
    "cli": "terminal", "init": "download", "fmtval": "check", "plan": "eye", "apply": "play", "destroy": "trash", "import": "target",
    "providers": "plug", "required": "manifest", "provblock": "key", "registry": "package", "lockfile": "lock",
    "state": "database", "tfstate": "disk", "backend": "cloud", "locking": "lock", "workspace": "folder", "secret": "shield",
    "modules": "layers", "rootmod": "folder", "childmod": "cube", "modsrc": "globe"
  },

  flows: [
    {
      main: true, id: 'main', title: '기본 흐름: 작성 → 계획 → 적용', src: ['intro', 'workflow', 'init', 'plan', 'apply', 'state'],
      desc: 'Terraform을 쓸 때 거의 항상 거치는 5단계입니다.',
      steps: [
        { node: 'config', text: '.tf 파일에 원하는 인프라를 Resource 블록으로 적는다' },
        { node: 'providers', text: 'terraform init이 필요한 Provider 플러그인을 내려받는다' },
        { node: 'cli', text: 'terraform plan으로 바뀔 내용을 확인하고, terraform apply로 승인·적용한다' },
        { node: 'state', text: '적용 결과가 State에 기록되어 다음 plan의 비교 기준이 된다' },
        { node: 'values', text: 'output으로 만든 결과(IP·주소 등)를 확인한다' }
      ]
    },
    {
      id: 'init', title: 'terraform init이 준비하는 것', at: 'cli', src: ['init', 'backend', 'module', 'provreq', 'lock'],
      desc: '새 폴더에서 처음 init을 실행했을 때 일어나는 순서입니다.',
      steps: [
        { node: 'init', text: '작업 폴더에서 terraform init을 실행한다' },
        { node: 'backend', text: 'terraform 블록의 backend 설정으로 State 저장소를 연결한다' },
        { node: 'modsrc', text: 'module 블록의 source에서 Child Module 코드를 내려받는다' },
        { node: 'required', text: 'required_providers에 적힌 Provider와 버전 제약을 확인한다' },
        { node: 'registry', text: 'Registry에서 제약에 맞는 Provider 플러그인을 설치한다' },
        { node: 'lockfile', text: '선택한 버전을 .terraform.lock.hcl에 기록한다 (Git에 커밋)' }
      ]
    },
    {
      id: 'plan', title: 'plan → apply 변경 계산 흐름', at: 'cli', src: ['plan', 'apply', 'resources', 'state'],
      desc: '코드를 고친 뒤 plan이 변경을 계산하고 apply가 실행하기까지의 순서입니다.',
      steps: [
        { node: 'tfstate', text: 'plan이 State와 원격 객체의 현재 상태를 읽어 최신화한다' },
        { node: 'resource', text: '구성 파일의 Resource와 비교해 차이를 찾는다' },
        { node: 'plan', text: '+ 생성 / ~ 수정 / - 삭제 / -/+ 교체 목록을 보여 준다 (-out으로 저장 가능)' },
        { node: 'apply', text: '승인하면(또는 저장한 plan을 주면) 의존 순서대로 실행한다' },
        { node: 'providers', text: 'Provider가 각 서비스 API를 호출해 실제로 만들고 바꾼다' },
        { node: 'tfstate', text: '결과가 State에 다시 기록된다' }
      ]
    },
    {
      id: 'vars', title: '변수 값이 들어가고 나오는 흐름', at: 'values', src: ['variables', 'locals', 'outputs'],
      desc: '같은 코드를 dev·prod 값만 바꿔 쓰는 순서입니다.',
      steps: [
        { node: 'variable', text: 'variable 블록으로 바꿀 값의 자리(type·default)를 만든다' },
        { node: 'tfvars', text: 'terraform.tfvars·-var·TF_VAR_로 값을 넣는다. 여러 곳이면 -var가 가장 우선' },
        { node: 'locals', text: '여러 번 쓰는 식은 locals에 이름을 붙여 둔다' },
        { node: 'resource', text: 'Resource가 var.NAME·local.NAME으로 값을 받아 쓴다' },
        { node: 'output', text: 'apply 뒤 output으로 결과를 내보낸다' }
      ]
    },
    {
      id: 'team', title: '팀이 State를 함께 쓰는 흐름', at: 'state', src: ['backend', 's3', 'locking', 'sensitive', 'remote'],
      desc: '로컬 State를 S3 원격 Backend로 옮겨 여러 사람이 안전하게 쓰는 순서입니다.',
      steps: [
        { node: 'backend', text: 'backend "s3" 블록에 bucket·key·region·use_lockfile을 적는다' },
        { node: 'init', text: 'Backend를 바꿨으므로 terraform init을 다시 실행한다' },
        { node: 'locking', text: 'plan·apply 중에는 State가 자동으로 잠겨 동시 실행을 막는다' },
        { node: 'secret', text: 'State엔 비밀값이 평문으로 남으므로 암호화·접근 제한을 건다' },
        { node: 'tfstate', text: '로컬 terraform.tfstate는 Git에 올리지 않는다' }
      ]
    },
    {
      id: 'module', title: '모듈로 다시 쓰는 흐름', at: 'modules', src: ['module', 'modules', 'outputs', 'version'],
      desc: '네트워크 같은 묶음을 모듈로 불러 쓰는 순서입니다.',
      steps: [
        { node: 'rootmod', text: 'Root Module(실행 폴더)의 main.tf에 module 블록을 추가한다' },
        { node: 'modsrc', text: 'source와 version으로 가져올 모듈을 정한다' },
        { node: 'init', text: 'terraform init으로 모듈 코드를 내려받는다' },
        { node: 'childmod', text: '블록 안 인수가 Child Module의 입력 변수로 들어간다' },
        { node: 'output', text: 'module.이름.출력으로 결과를 꺼내 다른 Resource에 쓴다' }
      ]
    },
    {
      id: 'import', title: '이미 있는 인프라 가져오기 흐름', at: 'cli', src: ['import', 'plan', 'apply', 'statecmd'],
      desc: '콘솔에서 손으로 만든 버킷을 Terraform 관리로 옮기는 순서입니다.',
      steps: [
        { node: 'resource', text: '가져올 대상과 같은 모양의 resource 블록을 적는다' },
        { node: 'import', text: 'import 블록의 to에 Resource 주소, id에 실제 리소스 ID를 적는다' },
        { node: 'plan', text: 'terraform plan으로 가져올 내용과 차이를 확인한다' },
        { node: 'apply', text: 'terraform apply로 가져오기를 실행한다' },
        { node: 'tfstate', text: 'terraform state list로 State에 들어왔는지 확인한다' }
      ]
    },
    {
      id: 'many', title: '여러 개를 만들고 순서·교체 정하기', at: 'config', src: ['count', 'foreach', 'depends', 'lifecycle'],
      desc: '비슷한 Resource를 여러 개 만들고 만드는 순서와 교체 방식을 정하는 순서입니다.',
      steps: [
        { node: 'count', text: '똑같은 것 N개는 count = N, 각각은 count.index로 구분한다' },
        { node: 'foreach', text: '항목마다 값이 다르면 for_each에 map·set을 주고 each.key로 구분한다' },
        { node: 'depends', text: '참조로 드러나지 않는 의존만 depends_on으로 순서를 적는다' },
        { node: 'lifecycle', text: '중요한 Resource는 lifecycle로 삭제를 막거나 새것을 먼저 만든다' },
        { node: 'plan', text: 'plan에서 주소([0], ["logs"])별로 무엇이 바뀌는지 확인한다' }
      ]
    }
  ],

  terms: [
    { term: 'IaC', summary: '인프라를 사람이 읽을 수 있는 설정 파일로 정의·버전 관리하는 방식', vs: { term: '수동 콘솔 작업', diff: '콘솔 작업은 기록·재현이 어렵고, IaC는 파일로 남아 검토·반복 적용이 가능' }, src: ['intro'], nodes: ['config'], level: 1 },
    { term: 'Resource', summary: 'Terraform이 만들고 관리하는 인프라 객체', vs: { term: 'Data Source', diff: 'Resource는 만들고 바꾸며, Data Source는 이미 있는 정보를 읽기만 함' }, src: ['resource', 'data'], nodes: ['resource'], level: 1 },
    { term: 'Provider', summary: '서비스 API와 통신해 Resource 타입을 제공하는 플러그인', vs: { term: 'Module', diff: 'Provider는 API를 호출하는 플러그인이고, Module은 .tf로 쓴 Resource 묶음' }, src: ['providers', 'modules'], nodes: ['providers'], level: 1 },
    { term: 'State', summary: '구성과 실제 리소스를 연결해 두는 Terraform의 기록', vs: { term: '구성 파일(.tf)', diff: '.tf는 원하는 모습이고, State는 Terraform이 마지막으로 알고 있는 실제 모습' }, src: ['state'], nodes: ['state'], level: 1 },
    { term: 'terraform plan', summary: '구성과 현재 상태를 비교해 변경을 제안하는 명령', vs: { term: 'terraform apply', diff: 'plan은 제안만 하고, apply는 승인 후 실제로 실행' }, src: ['plan', 'apply'], nodes: ['plan'], level: 1 },
    { term: 'Module', summary: '함께 관리하는 Resource 묶음', vs: { term: 'Root Module', diff: 'Root Module은 실행하는 폴더의 구성이고, 일반 Module은 그것이 module 블록으로 부르는 묶음' }, src: ['modules'], nodes: ['modules'], level: 1 },
    { term: 'variable', summary: '모듈 밖에서 값을 받는 입력 변수', vs: { term: 'locals', diff: 'variable은 밖에서 값을 넣고, locals는 모듈 안에서만 계산해 이름 붙인 값' }, src: ['variables', 'locals'], nodes: ['variable'], level: 2 },
    { term: 'output', summary: '모듈의 결과를 밖으로 내보내는 값', vs: { term: 'variable', diff: 'variable은 모듈로 들어오는 입구, output은 모듈에서 나가는 출구' }, src: ['outputs', 'variables'], nodes: ['output'], level: 2 },
    { term: 'Backend', summary: 'State 데이터를 저장하는 위치 설정', vs: { term: 'Provider', diff: 'Backend는 State를 어디에 둘지, Provider는 어떤 인프라 API를 다룰지 정함' }, src: ['backend', 'providers'], nodes: ['backend'], level: 2 },
    { term: 'State locking', summary: 'State를 쓰는 동안 다른 실행을 막는 잠금', vs: { term: '.terraform.lock.hcl', diff: 'State 잠금은 동시 실행을 막고, lock.hcl은 Provider 버전을 고정하는 파일' }, src: ['locking', 'lock'], nodes: ['locking'], level: 2 },
    { term: '.terraform.lock.hcl', summary: '선택한 Provider 버전을 기록하는 의존성 잠금 파일', vs: { term: 'required_providers', diff: 'required_providers는 허용 범위(~> 6.0), lock 파일은 실제 고른 정확한 버전' }, src: ['lock', 'provreq'], nodes: ['lockfile'], level: 2 },
    { term: 'count', summary: '정수만큼 비슷한 인스턴스를 만드는 메타 인수', vs: { term: 'for_each', diff: 'count는 번호(0,1,2)로, for_each는 map·set의 키로 인스턴스를 구분' }, src: ['count', 'foreach'], nodes: ['count'], level: 2 },
    { term: 'Workspace', summary: '한 작업 디렉터리 안의 여러 State 인스턴스', vs: { term: '별도 Backend 디렉터리', diff: 'Workspace는 같은 Backend·자격 증명을 공유하고, 디렉터리 분리는 환경마다 권한까지 나눔' }, src: ['workspaces'], nodes: ['workspace'], level: 3 },
    { term: 'depends_on', summary: '참조로 드러나지 않는 의존 관계를 직접 적는 메타 인수', vs: { term: '참조(암시적 의존)', diff: '참조하면 순서가 자동으로 정해지고, depends_on은 그럴 수 없을 때만 쓰는 최후 수단' }, src: ['depends'], nodes: ['depends'], level: 3 },
    { term: 'sensitive', summary: '값을 CLI 출력에서 가리는 표시', vs: { term: 'ephemeral', diff: 'sensitive 값은 State에 저장되고, ephemeral 값은 State·plan 파일에 아예 남지 않음' }, src: ['sensitive', 'variables'], nodes: ['secret'], level: 3 },
    { term: 'import 블록', summary: '기존 인프라를 Terraform 관리로 가져오는 블록', vs: { term: 'terraform state rm', diff: 'import는 State에 넣고, state rm은 실제 삭제 없이 State에서만 뺌' }, src: ['import', 'statecmd'], nodes: ['import'], level: 3 }
  ]
};
