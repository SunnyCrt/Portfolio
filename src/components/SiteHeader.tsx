import { navigation } from "../data/navigation";

export default function SiteHeader({ active = "home" }: { active?: string }) {
  const scrollHomeToTop = () => {
    if (active === "home") window.scrollTo({ top: 0, behavior: "instant" });
  };
  return (
    <header className="site-header">
      <div className="site-header-inner shell">
        <a className="logo" href="#home" onClick={scrollHomeToTop} aria-label="첫 화면으로 이동">
          {navigation.logo}
          <span>{navigation.logoAccent}</span>
        </a>
        <nav aria-label="주요 메뉴">
          {navigation.items.map(({ id, label, href }) => (
            <a
              key={id}
              href={href}
              onClick={id === "home" ? scrollHomeToTop : undefined}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
