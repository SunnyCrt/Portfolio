import { assetUrl } from "../utils/assetUrl";
import { primaryPersonalHref } from "../data/personalProjects";
import GameCollage from "../components/GameCollage";
import SiteHeader from "../components/SiteHeader";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  introduction,
  contact,
  careerSection,
  careers,
  projectSection,
  projects,
} from "../data/home";
export default function HomePage() {
  const [active, setActive] = useState("home");
  const [copyStatus, setCopyStatus] = useState("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    [],
  );
  async function copyEmail() {
    if (!contact.email) return;
    if (copyTimer.current) clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopyStatus("이메일을 복사했습니다.");
    } catch {
      setCopyStatus("복사하지 못했습니다. 이메일을 직접 선택해 복사해 주세요.");
    }
    copyTimer.current = setTimeout(() => setCopyStatus(""), 4000);
  }
  // Fade the entire introduction background in response to scrolling.
  // The career section uses the same live color at its upper edge, avoiding
  // a visible seam even when the viewport is resized mid-transition.
  useEffect(() => {
    const topDark = document.querySelector<HTMLElement>(".top-dark");
    const career = document.querySelector<HTMLElement>(".career");
    if (!topDark || !career) return;

    let frame = 0;
    const dark = [11, 16, 23];
    const light = [248, 251, 252];
    const updateBackground = () => {
      frame = 0;
      const careerTop = career.getBoundingClientRect().top + window.scrollY;
      // Start at the top of the page; use most of the space before the
      // Experience heading rather than completing after a tiny scroll.
      const end = Math.max(1, careerTop - window.innerHeight * 0.3);
      const progress = Math.min(1, Math.max(0, window.scrollY / end));
      const eased = progress * progress * (3 - 2 * progress);
      const color = `rgb(${dark
        .map((value, i) => Math.round(value + (light[i] - value) * eased))
        .join(", ")})`;
      topDark.style.setProperty("--scroll-background", color);
      career.style.setProperty("--scroll-background", color);
    };
    const scheduleBackground = () => {
      if (!frame) frame = window.requestAnimationFrame(updateBackground);
    };
    window.addEventListener("scroll", scheduleBackground, { passive: true });
    window.addEventListener("resize", scheduleBackground);
    updateBackground();
    return () => {
      window.removeEventListener("scroll", scheduleBackground);
      window.removeEventListener("resize", scheduleBackground);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      frame = 0;
      const ids = ["home", "works", "personal"];
      let current = "home";
      for (const id of ids) {
        const element = document.getElementById(id);
        if (
          element &&
          element.getBoundingClientRect().top < window.innerHeight * 0.5
        )
          current = id;
      }
      // Near the page end, a target may never reach the viewport midpoint.
      // Prefer the requested anchor while it is actually visible.
      const targetId = window.location.hash.slice(1);
      const target = ids.includes(targetId)
        ? document.getElementById(targetId)
        : null;
      if (target) {
        const bounds = target.getBoundingClientRect();
        const headerBottom =
          document.querySelector(".site-header")?.getBoundingClientRect()
            .bottom ?? 0;
        if (bounds.top >= headerBottom - 1 && bounds.top < window.innerHeight)
          current = targetId;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveSection);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    updateActiveSection();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#works">
        본문으로 건너뛰기
      </a>
      <SiteHeader active={active} />
      <main>
        <div className="top-dark">
          <div className="shell">
            <div id="home">
              <section className="hero">
                <div className="hero-intro">
                  <div className="eyebrow">{introduction.eyebrow}</div>
                  <h1>
                    {introduction.titleLines.map((line, index) => (
                      <span className="hero-title-line" key={index}>
                        {line.accent ? <em>{line.text}</em> : line.text}
                      </span>
                    ))}
                  </h1>
                  <div className="ko">{introduction.role}</div>
                  <p className="sub">
                    {introduction.descriptionLines.map((line, index) => (
                      <Fragment key={index}>
                        {index > 0 && <br />}
                        {line}
                      </Fragment>
                    ))}
                  </p>
                  <div className="hero-contact" aria-label="CONTACT">
                    <div className="contact-label">CONTACT</div>
                    <div className="contact-row">
                      {contact.name && <><span className="contact-name">{contact.name}</span><span className="contact-separator" aria-hidden="true">·</span></>}
                      <span className="contact-email">{contact.email}</span>
                      <button
                        className="contact-copy"
                        type="button"
                        onClick={copyEmail}
                        disabled={!contact.email}
                        aria-label="이메일 주소 복사"
                        title="이메일 주소 복사"
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          aria-hidden="true"
                        >
                          <rect x="8" y="8" width="12" height="13" rx="2" />
                          <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
                        </svg>
                      </button>
                    </div>
                    <div
                      className="contact-status"
                      role="status"
                      aria-live="polite"
                    >
                      {copyStatus}
                    </div>
                  </div>
                  <div className="hero-foot">
                    <a className="link" href="#works">
                      {introduction.worksLinkText}
                    </a>
                    <span className="note">{introduction.scrollHint}</span>
                  </div>
                </div>
                <GameCollage />
              </section>
            </div>
          </div>
          <div className="transition-space" aria-hidden="true"></div>
        </div>
        <section className="career" id="career">
          <div className="shell">
            <div className="section-head">
              <div>
                <small>{careerSection.eyebrow}</small>
                <h2>{careerSection.title}</h2>
              </div>
              <small>{careerSection.period}</small>
            </div>
            <div className="career-list">
              {careers.map((career, index) => (
                <div className="career-item" key={career.id}>
                  <span className="num">
                    {career.number ||
                      `${String(index + 1).padStart(2, "0")} / ${String(careers.length).padStart(2, "0")}`}
                  </span>
                  <div className="game-icon" aria-hidden="true">
                    {career.iconImage ? (
                      <img src={assetUrl(career.iconImage)} alt="" />
                    ) : (
                      career.icon
                    )}
                  </div>
                  <h3>{career.title}</h3>
                  <div className="company">{career.company}</div>
                  <ul className="career-tags" aria-label="담당 업무 유형">
                    {career.workTypes.map((type) => (
                      <li key={type}>{type}</li>
                    ))}
                  </ul>
                  <div className="date">{career.period}</div>
                  <div className="career-responsibilities">
                    <h4>{careerSection.responsibilitiesLabel}</h4>
                    <ul>
                      {career.responsibilities.map((task, taskIndex) => (
                        <li key={taskIndex}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="works" id="works">
          <div className="shell">
            <div className="section-head">
              <div>
                <small>{projectSection.eyebrow}</small>
                <h2>{projectSection.title}</h2>
              </div>
              <small>
                <a href="#/works">{projectSection.allWorksText}</a>
              </small>
            </div>
            <div className="works-grid" id="works-grid">
              {projects.map((project, index) => (
                <a className="work" key={project.id} href={`#/works/${encodeURIComponent(project.id)}`}>
                  <div className="work-image selected-work-thumbnail">
                    {project.thumbnail && <img src={assetUrl(project.thumbnail)} alt={project.title + " 썸네일"} loading="lazy" />}
                  </div>
                  <div className="work-meta">
                    <span>{project.game}</span>
                    <span>{String(index + 1).padStart(2, "0")} ↗</span>
                  </div>
                  <h3>{project.title}</h3>
                  <ul className="career-tags" aria-label="업무 유형">{project.types.map(type => <li key={type}>{type}</li>)}</ul>
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="end" id="personal">
          <div className="shell">
            <div className="section-head">
              <div>
                <small>03 / BEYOND</small>
                <h2>Explore More</h2>
              </div>
            </div>
            <div className="end-grid">
              <a className="end-card" href={primaryPersonalHref}>
                <div>
                  <h3>Personal Project</h3>
                  <p>개인 프로젝트 기획 및 개발 과정에 대한 기록</p>
                </div>
                <span>↗</span>
              </a>
              <a className="end-card" id="qa" href="#/qa">
                <div>
                  <h3>Q&A</h3>
                  <p>업무 경험에 대한 여러 질문과 답변</p>
                </div>
                <span>↗</span>
              </a>
            </div>
            <footer>
              <span>PORTFOLIO © 2026</span>
              <a href="#home">BACK TO TOP ↑</a>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
