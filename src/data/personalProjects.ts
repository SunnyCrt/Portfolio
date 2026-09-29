export interface PersonalProject {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  heroImage?: string;
  heroImageAlt?: string;
  info: { label: string; value: string }[];
  // src/content/personal 안의 Markdown 파일명
  body?: string;
}
// 메뉴와 HOME 카드는 첫 번째 항목으로 연결됩니다. ID는 고유하게 유지하세요.
// 아래 내용은 구조 확인용 예시입니다. 실제 프로젝트 정보로 교체하세요.
export const personalProjects: PersonalProject[] = [
  {
    id: "princess",
    title: "마이 디어 프린세스",
    summary:
      "로맨스 판타지 세계관을 배경으로 하는 육성 시뮬레이션 게임입니다.",
    tags: ["Unity", "PC"],
    heroImage: "",
    heroImageAlt: "",
    info: [
      { label: "장르", value: "육성 시뮬레이션" },
      { label: "플랫폼", value: "PC (Steam)" },
      { label: "엔진", value: "Unity 2022.3.62f3" },
      { label: "개발 형태", value: "개인 개발" },
      { label: "상태", value: "개발 중" },
    ],
    body: "princess.md",
  },
];
export const personalProjectHref = (id: string) =>
  `#/personal/${encodeURIComponent(id)}`;
export const primaryPersonalHref = personalProjects[0]
  ? personalProjectHref(personalProjects[0].id)
  : "#/personal";
