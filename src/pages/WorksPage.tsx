import { assetUrl } from "../utils/assetUrl";
import { useState } from "react";
import SiteHeader from "../components/SiteHeader";
import { works, worksPage, workTypes, type WorkType } from "../data/works";
import "./WorksPage.css";

export default function WorksPage() {
  const [filter, setFilter] = useState<WorkType | "ALL">("ALL");
  const visible = works.filter(
    (work) => filter === "ALL" || work.types.includes(filter),
  );
  return (
    <>
      <a className="skip-link" href="#works-content">
        본문으로 건너뛰기
      </a>
      <SiteHeader active="works" />
      <main className="all-works-page" id="works-content" tabIndex={-1}>
        <div className="shell">
          <div className="all-works-intro">
            <p className="all-works-label">{worksPage.label}</p>
            <h1>{worksPage.title}</h1>
            <p className="all-works-description">{worksPage.description}</p>
          </div>
          <div className="all-works-layout">
            <div
              className="all-works-filters"
              role="group"
              aria-label={worksPage.filterLabel}
            >
              {(["ALL", ...workTypes] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={filter === type}
                  aria-controls="all-works-list"
                  onClick={() => setFilter(type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <div>
              <p className="all-works-count" role="status">
                {filter} · {visible.length}개 작업
              </p>
              <div id="all-works-list" className="all-works-list">
                {visible.map((work) => (
                  <a
                    href={`#/works/${encodeURIComponent(work.id)}`}
                    className="all-works-card"
                    key={work.id}
                    data-work-id={work.id}
                  >
                    <div className="all-works-thumbnail">
                      {work.thumbnail ? (
                        <img
                          src={assetUrl(work.thumbnail)}
                          alt={work.title + " 썸네일"}
                          loading="lazy"
                        />
                      ) : (
                        <span aria-hidden="true">{work.project}</span>
                      )}
                    </div>
                    <p className="all-works-project">{work.project}</p>
                    <h2>{work.title}</h2>
                    <ul className="career-tags" aria-label="업무 유형">
                      {work.types.map((type) => (
                        <li key={type}>{type}</li>
                      ))}
                    </ul>
                  </a>
                ))}
                {visible.length === 0 && (
                  <p className="all-works-empty">{worksPage.emptyMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
