# 게임 콘텐츠 기획자 포트폴리오

첨부 HTML 시안을 React + TypeScript + Vite로 구현한 반응형 포트폴리오입니다.

## 실행

Node.js 22.12 이상을 권장합니다.

```sh
npm ci
npm run dev
```

개발 서버 주소: http://127.0.0.1:5173/Portfolio/

```sh
npm run build
npm run preview
```

빌드는 TypeScript 검사 후 `dist/`에 정적 사이트를 생성합니다.

## 구성 및 편집

- `src/data/home.ts`: 소개 문구, 경력 정보, 프로젝트 목록과 섹션 제목
- `src/App.tsx`: HOME / Work Archive / 작업 상세 / 개인 프로젝트 / Q&A 해시 라우팅
- `src/pages/HomePage.tsx`: HOME 화면 구성과 기존 스크롤 색상 전환
- `src/components/SiteHeader.tsx`: 공통 고정 헤더
- `src/pages/QAPage.tsx`, `src/pages/QAPage.css`: Q&A 아코디언과 전용 스타일
- `src/data/qa.ts`: Q&A 제목, 소개, 질문과 Markdown 답변
- `src/styles.css`: 원본 시안 스타일 및 접근성·모바일·한국어 타이포그래피 보완
- `reference/design.html`: 제공된 원본 디자인 시안
- `public/favicon.svg`: 사이트 아이콘
- `AGENTS.md`: 프로젝트 사용자 규칙

원본 시안의 한국어와 영어를 혼용하며 언어 전환 토글은 제공하지 않습니다. 원본 Manrope, DM Sans, Noto Sans KR 폰트를 Google Fonts에서 불러오며, 네트워크가 없으면 시스템 글꼴로 표시됩니다.

콘텐츠는 `src/data/`와 `src/content/`에서 관리하며, 실제 이미지 파일은 `public/`에 보관합니다. `reference/design.html`은 원본 시안 보관용으로 실행·빌드에는 사용하지 않습니다.

GitHub 저장소: https://github.com/SunnyCrt/Portfolio

공개 사이트: https://sunnycrt.github.io/Portfolio/

## 검증

`npm test`는 설치된 Microsoft Edge로 원본 문구 표시, 스크롤 배경 전환, 내비게이션, 360·390·768·1440px 화면의 가로 넘침을 검증합니다. 캡처는 Git에서 제외된 `test-results/`에 저장됩니다. `npm run format`으로 코드를 정리할 수 있습니다.

## HOME 문구 수정

`src/data/home.ts`의 따옴표 안 내용을 수정하고 저장하세요. React 코드나 CSS를 수정할 필요가 없습니다.

- `introduction`: 소개 영역. `titleLines`는 제목의 줄별 문구, `accent`는 파란 강조색 여부, `role`은 직무, `descriptionLines`는 줄별 소개입니다. `eyebrow`, `worksLinkText`, `scrollHint`는 상단 소제목과 안내 문구입니다.
- `careerSection`: 경력 섹션 제목과 전체 기간. 전체 기간은 `careers`의 개별 기간과 별도로 수정합니다.
- `careers`: 경력 목록. `icon`은 아이콘 약자, `title`은 게임명, `company`는 회사명, `period`는 재직 기간입니다.
- `projectSection`: 주요 프로젝트 섹션 제목과 전체 보기 문구입니다.
- `selectedWorks`: HOME 대표 작업 선택 목록. `workId`를 `works.ts`의 ID로 지정하면 프로젝트명·제목·유형·썸네일을 재사용합니다. 배열 순서가 카드 순서입니다.

목록 항목을 복사하거나 삭제하여 개수를 조절할 수 있습니다. 배열 순서가 화면 표시 순서이며 번호는 자동으로 매겨집니다. 새 항목의 `id`는 같은 목록 안에서 중복되지 않게 정하세요. 문자열의 따옴표와 항목 사이 쉼표는 유지하세요. 개발 서버 실행 중에는 저장 후 화면에 반영되며, 배포용 파일은 `npm run build`로 다시 생성합니다.

CONTACT 이메일은 `src/data/home.ts`의 `contact.email` 값을 변경하세요. 복사 버튼도 같은 주소를 사용합니다.

## Q&A 페이지 편집

Q&A 주소는 `/#/qa`입니다. 해시 기반이라 정적 호스팅에 별도 서버 라우팅 설정이 필요하지 않습니다. 기존 HOME의 `#home`, `#works`, `#personal` 링크는 그대로 사용합니다.

`src/data/qa.ts`에서 다음을 수정하세요.

- `qaPage`: 작은 레이블(`label`), 큰 제목(`title`), 소개(`description`), 브라우저 제목(`documentTitle`) 등.
- `qaItems`: 실제 질문과 답변 목록. 예시 3개는 본인 내용으로 교체하세요.
- `question`: 질문 문구, `answer`: Markdown 답변. 빈 줄로 문단을 구분하며 `- 목록`, `**굵은 글씨**`, `[링크](https://example.com)`을 사용할 수 있습니다.
- 질문 추가: 객체 하나를 복사하고 새로운 고유 `id`를 지정합니다. 항목 수 제한은 없고 번호는 자동입니다.
- 순서 변경: 배열에서 객체를 이동합니다. 내용 수정·순서 변경 시 기존 `id`를 유지하세요. 항목 삭제는 해당 객체를 지우면 됩니다.

답변의 원시 HTML과 이미지는 렌더링하지 않으며, Markdown 링크는 렌더러의 기본 안전 URL 필터를 사용합니다. 여러 답변을 동시에 펼칠 수 있고 Tab으로 질문을 선택한 다음 Enter 또는 Space로 열고 닫을 수 있습니다. 메뉴 문구와 목적지는 `src/data/navigation.ts`의 `label`과 `href`에서 관리합니다.

## All Works 편집

`src/data/works.ts`의 `works` 배열에서 항목을 추가·삭제하거나 순서를 변경하세요. `id`는 중복 없는 영문 식별자로 정하고 향후 상세 페이지 연결을 위해 유지합니다. `project`는 프로젝트명, `title`은 작업물 제목, `thumbnail`은 이미지 경로, `types`는 업무 유형 배열입니다. 예: `types: ["퀘스트", "내러티브·시나리오"]`. `public/works/example.jpg` 파일은 `thumbnail: "/works/example.jpg"`로 지정하며 빈 문자열이면 문자 대체 영역을 표시합니다. 제목과 소개는 `worksPage`에서 수정합니다. HOME의 선택 작업 ID는 `home.ts`에서 지정합니다. 목록 주소는 `/#/works`, 상세 주소는 `/#/works/고유-id`입니다.

## 작업 상세 페이지 추가

1. `src/content/works/collection-bonus.md`를 복사해 새 파일명으로 저장합니다(예: `quest-flow.md`).
2. `src/data/works.ts`의 `works` 배열에 항목을 추가하거나 기존 항목을 수정합니다. 고유 `id`는 이후에도 유지하세요.
3. `body: "quest-flow.md"`로 Markdown 파일을 연결합니다. `summary`는 짧은 소개, `details: [{ label: "항목명", value: "내용" }]`는 순서와 개수가 자유로운 추가 정보입니다.
4. 대표 이미지는 `heroImage: "/works/example.jpg"`, 설명은 `heroImageAlt`에 작성합니다. 이미지 파일은 `public/works/`에 넣습니다. `heroImage`를 생략하거나 빈 문자열로 두면 이미지 영역은 표시되지 않습니다.
5. Markdown의 `##`, `###` 제목이 자동으로 CONTENTS에 반영됩니다. `###`, `####`, 목록, 굵은 글씨, 링크, `>` 강조 영역과 Markdown 표를 사용할 수 있습니다. 이미지는 `![대체 설명](/works/example.jpg "캡션")`으로 작성합니다. 캡션은 선택 사항입니다. 원시 HTML은 렌더링하지 않습니다.

상세 주소는 `/#/works/고유-id`입니다. 이전/다음은 `works` 배열 순서로 결정됩니다. 본문을 아직 지정하지 않은 작업은 준비 중 안내를 표시합니다. 새 파일을 추가한 뒤 배포용 파일은 `npm run build`로 생성하세요.

## 개인 프로젝트 편집

- `src/data/personalProjects.ts`: 항목을 복사해 고유 `id`를 지정하세요. `title`/`summary`는 이름·소개, `tags`는 순서가 자유로운 태그 배열, `info`는 `{ label, value }` 정보 목록입니다. `heroImage`를 비우면 대표 이미지 영역이 생기지 않습니다. 이미지 경로는 `/personal/logo.png`처럼 지정하고 파일은 `public/personal/`에 넣으세요.
- `src/content/personal/princess.md`: 복사하여 새 Markdown 파일을 만들고 데이터의 `body`에 파일명을 지정하세요. `##`가 자동 목차이며 Works 상세와 동일한 Markdown 문법 및 스타일을 사용합니다.
- 메뉴와 HOME 카드에는 배열의 첫 번째 프로젝트가 연결됩니다. 순서를 바꾸면 진입 프로젝트도 바뀝니다. 각 프로젝트 주소는 `/#/personal/고유-id`입니다. 목록 페이지는 없습니다.

## 공개 저장소 및 재현 환경

- Node.js 22.12 이상에서 `npm ci` 후 `npm run dev` 또는 `npm run build`를 실행합니다. 실행에 필요한 비밀 환경변수는 없습니다. `package-lock.json`을 함께 커밋하세요.
- `npm test`는 Microsoft Edge 설치가 필요합니다. 테스트 코드는 보존했으며, 일부 과거 문구·라우팅 가정은 현재 사이트에 맞춰 별도 점검이 필요합니다. 이번 공개 준비에서는 전체 테스트 통과를 보장하지 않습니다.
- `node_modules`, `dist`, 테스트 결과·보고서, 캐시, 로컬 환경변수·인증 파일은 Git에서 제외합니다. `.env.example`에는 실제 비밀값을 넣지 마세요. 프런트엔드에 포함되는 값은 환경변수라도 방문자가 확인할 수 있습니다.
- 연락처·이름은 의도적으로 공개되는 사이트 콘텐츠입니다. 게임 화면·기획 자료·로고의 공개 권한과 문서/이미지에 포함된 회사 내부 정보는 업로드 전에 직접 확인하세요. Git 커밋 작성자 이름·이메일도 공개 이력에 포함됩니다.
- GitHub Pages용 `/Portfolio/` base와 공통 `noindex, nofollow` 메타 태그가 적용되어 있습니다. noindex는 검색엔진에 색인 제외를 요청하는 설정이며 접근 제어나 비공개 설정은 아닙니다.

## GitHub Pages 배포

Settings → Pages → Build and deployment → Source를 **GitHub Actions**로 선택하세요. `.github/workflows/deploy.yml`이 main push 또는 수동 실행 시 Node.js 22에서 npm ci·빌드 후 dist를 공식 Pages 액션으로 배포합니다. 첫 실행이 Pages 미설정으로 실패하면 설정 후 Actions에서 재실행하세요.

로컬 확인: `npm run dev` 후 `http://127.0.0.1:5173/Portfolio/`. 배포 결과 확인: `npm run build` 및 `npm run preview` 후 `http://127.0.0.1:4173/Portfolio/`. 데이터와 Markdown에는 기존 `/works-images/...` 형식을 유지하며 렌더러가 base를 적용합니다.
