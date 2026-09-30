import { primaryPersonalHref } from "./personalProjects";
// 상단 로고와 메뉴의 표시 문구는 여기에서만 수정하세요.
// id는 페이지 활성 상태를 구분하므로 텍스트만 변경할 때는 수정하지 마세요.
export const navigation = {
  logo: "PORTFOLIO",
  logoAccent: ".",
  items: [
    { id: "home", href: "#home", label: "소개" },
    { id: "works", href: "#/works", label: "주요 작업" },
    { id: "personal", href: primaryPersonalHref, label: "개인 프로젝트" },
    { id: "qa", href: "#/qa", label: "Q&A" },
  ],
};
