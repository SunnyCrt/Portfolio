import { assetUrl } from "../utils/assetUrl";
import DetailMarkdown from "../components/DetailMarkdown";
import SiteHeader from "../components/SiteHeader";
import { works } from "../data/works";
import "./WorkDetailPage.css";

const bodies = import.meta.glob<string>("../content/works/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
const workHref = (id: string) => `#/works/${encodeURIComponent(id)}`;
export default function WorkDetailPage({ route }: { route: string }) {
  const index = works.findIndex((work) => workHref(work.id) === route);
  const work = works[index];
  const body = work?.body ? bodies[`../content/works/${work.body}`] : undefined;
  if (!work)
    return (
      <>
        <SiteHeader active="works" />
        <main className="work-detail">
          <div className="shell">
            <h1>작업을 찾을 수 없습니다.</h1>
            <a href="#/works">WORK ARCHIVE ↗</a>
          </div>
        </main>
      </>
    );
  return (
    <>
      <SiteHeader active="works" />
      <main className="work-detail">
        <div className="shell">
          <header className="work-detail-intro">
            <div className="work-detail-breadcrumb">
              <a className="work-detail-back" href="#/works">
                WORK ARCHIVE
              </a>
              <span aria-hidden="true"> / </span>
              <span>{work.project}</span>
            </div>
            <ul className="career-tags" aria-label="업무 유형">
              {work.types.map((type) => (
                <li key={type}>{type}</li>
              ))}
            </ul>
            <h1>{work.title}</h1>
            {work.summary && (
              <p className="work-detail-summary">{work.summary}</p>
            )}
            {!!work.details?.length && (
              <dl className="work-detail-meta">
                {work.details.map((item, i) => (
                  <div key={i}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </header>
          {work.heroImage && (
            <img
              className="work-detail-hero"
              src={assetUrl(work.heroImage)}
              alt={work.heroImageAlt ?? work.title}
            />
          )}
          <DetailMarkdown body={body} />
          <nav className="work-detail-pagination" aria-label="작업 이동">
            <div>
              {index > 0 && (
                <a href={workHref(works[index - 1].id)}>
                  <small>← 이전 작업</small>
                  {works[index - 1].title}
                </a>
              )}
            </div>
            <a href="#/works">WORK ARCHIVE</a>
            <div>
              {index < works.length - 1 && (
                <a href={workHref(works[index + 1].id)}>
                  <small>다음 작업 →</small>
                  {works[index + 1].title}
                </a>
              )}
            </div>
          </nav>
        </div>
      </main>
    </>
  );
}
