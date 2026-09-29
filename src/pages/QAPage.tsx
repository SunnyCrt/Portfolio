import { assetUrl } from "../utils/assetUrl";
import { useState } from "react";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import SiteHeader from "../components/SiteHeader";
import { qaItems, qaPage } from "../data/qa";
import "./QAPage.css";

export default function QAPage() {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());
  function toggle(id: string) {
    setOpenIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  return (
    <>
      <a className="skip-link" href="#qa-content">
        본문으로 건너뛰기
      </a>
      <SiteHeader active="qa" />
      <main className="qa-page" id="qa-content">
        <div className="shell">
          <div className="qa-intro">
            <p className="qa-label">{qaPage.label}</p>
            <h1>{qaPage.title}</h1>
            <p className="qa-description">{qaPage.description}</p>
          </div>
          <div className="qa-list">
            {qaItems.map((item, index) => {
              const open = openIds.has(item.id);
              const buttonId = `qa-question-${item.id}`;
              const panelId = `qa-answer-${item.id}`;
              return (
                <section className="qa-item" key={item.id} data-open={open}>
                  <h2>
                    <button
                      id={buttonId}
                      className="qa-question"
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => toggle(item.id)}
                    >
                      <span className="qa-number" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{item.question}</span>
                      <span className="qa-symbol" aria-hidden="true">
                        {open ? "−" : "+"}
                      </span>
                    </button>
                  </h2>
                  <div
                    id={panelId}
                    className="qa-answer"
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!open}
                    inert={!open}
                  >
                    <div className="qa-answer-clip">
                      <div className="qa-markdown">
                        <ReactMarkdown urlTransform={(url) => assetUrl(defaultUrlTransform(url))} skipHtml disallowedElements={["img"]}>
                          {item.answer}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
            {qaItems.length === 0 && (
              <p className="qa-empty">{qaPage.emptyMessage}</p>
            )}
          </div>
          <div className="qa-footer">
            <a href="#home">{qaPage.backToHome}</a>
          </div>
        </div>
      </main>
    </>
  );
}
