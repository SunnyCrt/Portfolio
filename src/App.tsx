import { useEffect, useRef, useState } from "react";
type Language = "ko" | "en";
export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem("portfolio-language") === "en" ? "en" : "ko";
    } catch {
      return "ko";
    }
  });
  const [active, setActive] = useState("home");
  const transitionRef = useRef<HTMLDivElement>(null);
  const t = (ko: string, en: string) => (language === "ko" ? ko : en);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title =
      language === "ko"
        ? "게임 콘텐츠 기획자 | 포트폴리오"
        : "Game Content Designer | Portfolio";
    try {
      localStorage.setItem("portfolio-language", language);
    } catch {
      /* Storage can be disabled. */
    }
  }, [language]);
  useEffect(() => {
    let frame = 0;
    const paint = () => {
      frame = 0;
      const transition = transitionRef.current;
      if (!transition) return;
      const top = transition.getBoundingClientRect().top + window.scrollY;
      const start = Math.max(0, top - window.innerHeight * 0.55);
      const end = top + transition.offsetHeight - window.innerHeight * 0.55;
      const progress = Math.min(
        1,
        Math.max(0, (window.scrollY - start) / Math.max(1, end - start)),
      );
      const smooth = progress * progress * (3 - 2 * progress);
      const rgb = [11, 16, 23].map((v, i) =>
        Math.round(v + ([248, 251, 252][i] - v) * smooth),
      );
      document.documentElement.style.setProperty(
        "--transition-color",
        "rgb(" + rgb.join(",") + ")",
      );
      const ids = ["home", "works", "personal", "qa"];
      let current = "home";
      for (const id of ids) {
        const element = document.getElementById(id);
        if (
          element &&
          element.getBoundingClientRect().top < window.innerHeight * 0.5
        )
          current = id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    paint();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <>
      <a className="skip-link" href="#works">
        {t("본문으로 건너뛰기", "Skip to content")}
      </a>
      <main>
        <div className="top-dark">
          <div className="shell">
            <header>
              <div className="logo">
                {t("포트폴리오", "PORTFOLIO")}
                <span>.</span>
              </div>
              <nav aria-label={t("주요 메뉴", "Main navigation")}>
                {[
                  ["home", t("홈", "HOME")],
                  ["works", t("작업", "WORKS")],
                  ["personal", t("개인 작업", "PERSONAL")],
                  ["qa", t("질문과 답변", "Q&A")],
                ].map(([id, label]) => (
                  <a
                    key={id}
                    href={"#" + id}
                    className={active === id ? "active" : ""}
                    aria-current={active === id ? "location" : undefined}
                  >
                    {label}
                  </a>
                ))}
                <button
                  className="language-toggle"
                  onClick={() => setLanguage(language === "ko" ? "en" : "ko")}
                  aria-label={t("Switch to English", "한국어로 전환")}
                >
                  {language === "ko" ? "EN" : "한국어"}
                </button>
              </nav>
            </header>
            <div id="home">
              <section className="hero">
                <div>
                  <div className="eyebrow">
                    {t("주요 포트폴리오 / 2026", "SELECTED PORTFOLIO / 2026")}
                  </div>
                  <h1>
                    {t("게임", "Game")}
                    <br />
                    {t("콘텐츠", "Content")}
                    <br />
                    <em>{t("기획자.", "Designer.")}</em>
                  </h1>
                  <div className="ko">
                    {t("퀘스트 · 콘텐츠 기획", "Quest & Content Design")}
                  </div>
                  <p className="sub">
                    {t(
                      "RPG 및 스토리 게임의 신규 개발과",
                      "New RPG and story game development,",
                    )}
                    <br />
                    {t("라이브 서비스 경험", "with live service experience")}
                  </p>
                  <div className="hero-foot">
                    <a className="link" href="#works">
                      {t("작업 살펴보기 ↗", "EXPLORE WORKS ↗")}
                    </a>
                    <span className="note">
                      {t("스크롤하여 더 보기 ↓", "SCROLL TO DISCOVER ↓")}
                    </span>
                  </div>
                </div>
                <div
                  className="hero-art dark-art"
                  aria-label="퀘스트와 콘텐츠 연결 구조를 표현한 추상 그래픽"
                >
                  <div className="diagram-label">
                    {t(
                      "시스템 / 퀘스트 / 내러티브",
                      "SYSTEM / QUEST / NARRATIVE",
                    )}
                  </div>
                  <svg
                    viewBox="0 0 540 540"
                    role="img"
                    aria-label="콘텐츠 흐름을 추상화한 노드 다이어그램"
                  >
                    <defs>
                      <linearGradient id="line" x1="0" x2="1">
                        <stop stopColor="#6f98b6" stopOpacity=".2" />
                        <stop
                          offset="1"
                          stopColor="#d0e4ed"
                          stopOpacity=".85"
                        />
                      </linearGradient>
                      <radialGradient id="glow">
                        <stop stopColor="#7099ba" stopOpacity=".26" />
                        <stop offset="1" stopColor="#7099ba" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="290" cy="255" r="225" fill="url(#glow)" />
                    <g
                      fill="none"
                      stroke="#71899d"
                      strokeWidth=".65"
                      opacity=".27"
                    >
                      <circle cx="277" cy="269" r="195" />
                      <circle cx="277" cy="269" r="139" />
                      <path d="M0 270H540M277 0V540" strokeDasharray="3 8" />
                    </g>
                    <g fill="none" stroke="url(#line)" strokeWidth="1.5">
                      <path d="M75 320L180 220L288 260L410 128" />
                      <path d="M180 220L175 380L315 415L442 337" />
                      <path d="M288 260L442 337" />
                      <path d="M288 260L315 415" strokeDasharray="5 6" />
                    </g>
                    <g fill="#14202b" stroke="#9dbed0" strokeWidth="1.5">
                      <circle cx="75" cy="320" r="7" />
                      <circle cx="180" cy="220" r="8" />
                      <circle cx="288" cy="260" r="12" fill="#a9c9d9" />
                      <circle cx="410" cy="128" r="7" />
                      <circle cx="175" cy="380" r="7" />
                      <circle cx="315" cy="415" r="7" />
                      <circle cx="442" cy="337" r="7" />
                    </g>
                    <g
                      fill="#d0dfe9"
                      fontFamily="monospace"
                      fontSize="10"
                      letterSpacing="2"
                    >
                      <text x="49" y="301">
                        {t("시작", "START")}
                      </text>
                      <text x="150" y="196">
                        {t("퀘스트", "QUEST")}
                      </text>
                      <text x="267" y="230">
                        {t("핵심", "CORE")}
                      </text>
                      <text x="390" y="103">
                        {t("이벤트", "EVENT")}
                      </text>
                      <text x="140" y="408">
                        {t("분기 01", "BRANCH 01")}
                      </text>
                      <text x="310" y="444">
                        {t("분기 02", "BRANCH 02")}
                      </text>
                      <text x="413" y="367">
                        {t("결과", "RESULT")}
                      </text>
                    </g>
                  </svg>
                  <div className="diagram-footer">
                    <span>{t("시스템 설계", "DESIGNING SYSTEMS")}</span>
                    <span>
                      {t(
                        "그림 01 — 연결되는 경험",
                        "FIG. 01 — CONNECTED EXPERIENCES",
                      )}
                    </span>
                  </div>
                </div>
              </section>
            </div>
          </div>
          <div
            ref={transitionRef}
            className="transition-space"
            aria-hidden="true"
          ></div>
        </div>
        <section className="career" id="career">
          <div className="shell">
            <div className="section-head">
              <div>
                <small>{t("01 / 경력 소개", "01 / BACKGROUND")}</small>
                <h2>
                  {t("경력", "Experience")}
                  <span style={{ color: "#8ca1b5" }}>.</span>
                </h2>
              </div>
              <small>2017 — 2025</small>
            </div>
            <div className="career-list">
              <div className="career-item">
                <span className="num">01 / 04</span>
                <div className="game-icon" aria-label="게임 아이콘 임시 영역">
                  MM
                </div>
                <h3>{t("마비노기 모바일", "Mabinogi Mobile")}</h3>
                <div className="company">{t("데브캣", "devCAT")}</div>
                <div className="date">2024.04 — 2025.07</div>
              </div>
              <div className="career-item">
                <span className="num">02 / 04</span>
                <div className="game-icon" aria-label="게임 아이콘 임시 영역">
                  SW
                </div>
                <h3>
                  {t("서머너즈 워: 크로니클", "Summoners War: Chronicles")}
                </h3>
                <div className="company">{t("컴투스", "Com2uS")}</div>
                <div className="date">2022.09 — 2024.03</div>
              </div>
              <div className="career-item">
                <span className="num">03 / 04</span>
                <div className="game-icon" aria-label="게임 아이콘 임시 영역">
                  EG
                </div>
                <h3>{t("에곤: 인페르나 벨룸", "EGON: Inferna Bellum")}</h3>
                <div className="company">
                  {t("라운드플래닛", "Round Planet")}
                </div>
                <div className="date">2021.07 — 2022.08</div>
              </div>
              <div className="career-item">
                <span className="num">04 / 04</span>
                <div className="game-icon" aria-label="게임 아이콘 임시 영역">
                  SP
                </div>
                <h3>{t("스토리픽 외", "Storypick & More")}</h3>
                <div className="company">{t("데이세븐", "Day7")}</div>
                <div className="date">2017.11 — 2021.07</div>
              </div>
            </div>
          </div>
        </section>
        <section className="works" id="works">
          <div className="shell">
            <div className="section-head">
              <div>
                <small>
                  {t("02 / 주요 프로젝트", "02 / SELECTED PROJECTS")}
                </small>
                <h2>
                  {t("주요 작업", "Selected Works")}
                  <span style={{ color: "#8ca1b5" }}>.</span>
                </h2>
              </div>
              <small>
                <a href="#works-grid">
                  {t("전체 작업 보기 ↓", "VIEW ALL WORKS ↓")}
                </a>
              </small>
            </div>
            <div className="works-grid" id="works-grid">
              <article className="work">
                <div className="work-image">
                  <div className="work-visual">{t("시스템", "SYSTEM")}</div>
                </div>
                <div className="work-meta">
                  <span>
                    {t("서머너즈 워: 크로니클", "SUMMONERS WAR: CHRONICLES")}
                  </span>
                  <span>01</span>
                </div>
                <h3>
                  {t(
                    "도감 보너스 포인트 시스템",
                    "Collection Bonus Point System",
                  )}
                </h3>
                <p>{t("시스템 · 콘텐츠 기획", "System & Content Design")}</p>
              </article>
              <article className="work">
                <div className="work-image">
                  <div className="work-visual">{t("퀘스트", "QUEST")}</div>
                </div>
                <div className="work-meta">
                  <span>
                    {t("에곤: 인페르나 벨룸", "EGON: INFERNA BELLUM")}
                  </span>
                  <span>02</span>
                </div>
                <h3>
                  {t(
                    "퀘스트 설계 및 플레이 동선",
                    "Quest Design & Player Flow",
                  )}
                </h3>
                <p>{t("퀘스트 · 내러티브 기획", "Quest & Narrative Design")}</p>
              </article>
              <article className="work">
                <div className="work-image">
                  <div className="work-visual">{t("스토리", "STORY")}</div>
                </div>
                <div className="work-meta">
                  <span>{t("스토리픽", "STORYPICK")}</span>
                  <span>03</span>
                </div>
                <h3>
                  {t("시나리오 분기 구조 설계", "Branching Story Structure")}
                </h3>
                <p>{t("내러티브 기획", "Narrative Design")}</p>
              </article>
              <article className="work">
                <div className="work-image">
                  <div className="work-visual">{t("콘텐츠", "CONTENT")}</div>
                </div>
                <div className="work-meta">
                  <span>
                    {t("서머너즈 워: 크로니클", "SUMMONERS WAR: CHRONICLES")}
                  </span>
                  <span>04</span>
                </div>
                <h3>{t("수집 콘텐츠 기획", "Collection Content Design")}</h3>
                <p>{t("시스템 · 콘텐츠 기획", "System & Content Design")}</p>
              </article>
            </div>
          </div>
        </section>
        <section className="end" id="personal">
          <div className="shell">
            <div className="section-head">
              <div>
                <small>{t("03 / 더 알아보기", "03 / FURTHER READING")}</small>
                <h2>{t("더 알아보기.", "Explore More.")}</h2>
              </div>
            </div>
            <div className="end-grid">
              <div className="end-card">
                <div>
                  <h3>{t("개인 프로젝트", "Personal Project")}</h3>
                  <p>
                    {t(
                      "개인 게임 개발 및 기획 과정",
                      "Independent game development and design process",
                    )}
                  </p>
                </div>
              </div>
              <div className="end-card" id="qa">
                <div>
                  <h3>{t("질문과 답변", "Q&A")}</h3>
                  <p>
                    {t(
                      "업무 경험과 게임 기획에 관한 질문과 답변",
                      "Questions and answers about work experience and game design",
                    )}
                  </p>
                </div>
              </div>
            </div>
            <footer>
              <span>{t("포트폴리오 © 2026", "PORTFOLIO © 2026")}</span>
              <a href="#home">{t("맨 위로 ↑", "BACK TO TOP ↑")}</a>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
