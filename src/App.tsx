import { useHashNavigation } from "./hooks/useHashNavigation";
import PersonalProjectPage from "./pages/PersonalProjectPage";
import { personalProjects, personalProjectHref } from "./data/personalProjects";
import { useLayoutEffect } from "react";
import HomePage from "./pages/HomePage";
import QAPage from "./pages/QAPage";
import WorkDetailPage from "./pages/WorkDetailPage";
import { works } from "./data/works";
import WorksPage from "./pages/WorksPage";
import { worksPage } from "./data/works";
import { qaPage } from "./data/qa";

// A hash route works on static hosting without server rewrite rules.
export default function App() {
  const navigation = useHashNavigation();
  const getPage = () => {
    const hash = navigation.hash;
    if (["#/qa", "#qa-content"].includes(hash)) return "qa";
    if (["#/works", "#works-content"].includes(hash)) return "works";
    if (hash.startsWith("#/works/")) return hash;
    if (hash === "#/personal" || hash.startsWith("#/personal/")) return hash;
    return "home";
  };
  const page = getPage();
  useLayoutEffect(() => {
    document.title = page.startsWith("#/personal")
      ? `${(page === "#/personal" ? personalProjects[0] : personalProjects.find((item) => personalProjectHref(item.id) === page))?.title ?? "개인 프로젝트"} | 포트폴리오`
      : page.startsWith("#/works/")
        ? `${works.find((work) => "#/works/" + encodeURIComponent(work.id) === page)?.title ?? "작업을 찾을 수 없습니다"} | 포트폴리오`
        : page === "works"
          ? worksPage.documentTitle
          : page === "qa"
            ? qaPage.documentTitle
            : "게임 콘텐츠 기획자 | 포트폴리오";
    let cancelled = false;
    const positionPage = () => {
      if (cancelled) return;
      const target =
        page === "home" && navigation.hash !== "#home" &&
        document.getElementById(navigation.hash.slice(1));
      const top = navigation.restoreTop ?? (target
        ? target.getBoundingClientRect().top +
          window.scrollY -
          parseFloat(getComputedStyle(target).scrollMarginTop || "0")
        : 0);
      window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
    };
    positionPage();
    const positionedScrollY = window.scrollY;
    void document.fonts.ready.then(() => {
      // Do not override scrolling performed while fonts were loading.
      if (Math.abs(window.scrollY - positionedScrollY) < 1) positionPage();
    });
    return () => {
      cancelled = true;
    };
  }, [page, navigation]);
  return page.startsWith("#/personal") ? (
    <PersonalProjectPage key={page} route={page} />
  ) : page.startsWith("#/works/") ? (
    <WorkDetailPage key={page} route={page} />
  ) : page === "works" ? (
    <WorksPage />
  ) : page === "qa" ? (
    <QAPage />
  ) : (
    <HomePage />
  );
}
