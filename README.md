# 게임 콘텐츠 기획자 포트폴리오

첨부 HTML 시안을 React + TypeScript + Vite로 구현한 반응형 포트폴리오입니다.

## 실행

Node.js 22.12 이상을 권장합니다.

```sh
npm install
npm run dev
```

개발 서버 주소: http://127.0.0.1:5173

```sh
npm run build
npm run preview
```

빌드는 TypeScript 검사 후 `dist/`에 정적 사이트를 생성합니다.

## 구성 및 편집

- `src/App.tsx`: 포트폴리오 내용, 한국어/영어 문구, 언어 선택 저장, 스크롤 색상 전환
- `src/styles.css`: 원본 시안 스타일 및 접근성·모바일·한국어 타이포그래피 보완
- `reference/design.html`: 제공된 원본 디자인 시안
- `public/favicon.svg`: 사이트 아이콘
- `AGENTS.md`: 프로젝트 사용자 규칙

한국어가 기본이며 상단 EN 버튼으로 영어로 전환할 수 있습니다. 선택한 언어는 브라우저에 저장됩니다. 원본 Manrope, DM Sans, Noto Sans KR 폰트를 Google Fonts에서 불러오며, 네트워크가 없으면 시스템 글꼴로 표시됩니다.

시안의 경력과 프로젝트 제목만 사용했습니다. 프로젝트 상세 문서, 개인 프로젝트 본문, Q&A 답변은 원본에 제공되지 않아 포함하지 않았습니다. 카드의 이미지 영역과 경력 아이콘은 원본의 CSS/SVG 그래픽 및 약자를 유지합니다. 새 이미지·영상 생성은 수행하지 않았습니다.

Git 저장소는 로컬에서만 사용하며 GitHub 원격 저장소는 설정하지 않습니다.

## 검증

`npm test`는 설치된 Microsoft Edge로 언어 전환과 선택 저장, 스크롤 배경 전환, 내비게이션, 360·390·768·1440px 화면의 가로 넘침을 검증합니다. 캡처는 Git에서 제외된 `test-results/`에 저장됩니다. `npm run format`으로 코드를 정리할 수 있습니다.
