import { assetUrl } from "../utils/assetUrl";
import SiteHeader from "../components/SiteHeader";
import DetailMarkdown from "../components/DetailMarkdown";
import {
  personalProjects,
  personalProjectHref,
} from "../data/personalProjects";
import "./PersonalProjectPage.css";
const bodies = import.meta.glob<string>("../content/personal/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
export default function PersonalProjectPage({ route }: { route: string }) {
  const project =
    route === "#/personal"
      ? personalProjects[0]
      : personalProjects.find((item) => personalProjectHref(item.id) === route);
  return (
    <>
      <SiteHeader active="personal" />
      <main className="work-detail personal-detail">
        <div className="shell">
          {project ? (
            <>
              <header className="work-detail-intro">
                <p className="work-detail-back">PERSONAL PROJECT</p>
                <h1>{project.title}</h1>
                {project.summary && (
                  <p className="work-detail-summary">{project.summary}</p>
                )}
                {!!project.tags.length && (
                  <ul className="career-tags" aria-label="프로젝트 태그">
                    {project.tags.map((tag, i) => (
                      <li key={i}>{tag}</li>
                    ))}
                  </ul>
                )}
              </header>
              {project.heroImage && (
                <img
                  className="work-detail-hero personal-project-hero"
                  src={assetUrl(project.heroImage)}
                  alt={project.heroImageAlt || project.title}
                />
              )}
              {!!project.info.length && (
                <section
                  className="personal-project-info"
                  aria-labelledby="personal-info-heading"
                >
                  <h2 id="personal-info-heading">PROJECT INFO</h2>
                  <dl className="work-detail-meta">
                    {project.info.map((item, i) => (
                      <div key={i}>
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
              <DetailMarkdown
                body={
                  project.body
                    ? bodies[`../content/personal/${project.body}`]
                    : undefined
                }
              />
            </>
          ) : (
            <>
              <h1>개인 프로젝트를 찾을 수 없습니다.</h1>
              <a href="#home">HOME ↗</a>
            </>
          )}
        </div>
      </main>
    </>
  );
}
