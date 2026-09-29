import { assetUrl } from "../utils/assetUrl";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Root, Element } from "hast";
import "../pages/WorkDetailPage.css";
// IDs are assigned from parsed headings, so code blocks and duplicate titles are safe.
function headingIds() {
  return (tree: Root) => {
    let index = 0;
    let subIndex = 0;
    function walk(node: Root | Element) {
      for (const child of node.children) {
        if (child.type !== "element") continue;
        if (child.tagName === "h2")
          child.properties.id = `work-section-${++index}`;
        if (child.tagName === "h3")
          child.properties.id = `work-subsection-${++subIndex}`;
        walk(child);
      }
    }
    walk(tree);
  };
}
// Only consume a positive pixel width immediately after a parsed image.
// Code samples and other Markdown text are left untouched.
function imageWidths() {
  return (tree: Root) => {
    function walk(node: Root | Element) {
      node.children.forEach((child, index) => {
        if (child.type !== "element") return;
        const next = node.children[index + 1];
        if (child.tagName === "img" && next?.type === "text") {
          const match = /^\{width=([1-9]\d*)\}/.exec(next.value);
          if (match && Number.isSafeInteger(Number(match[1]))) {
            child.properties.width = Number(match[1]);
            next.value = next.value.slice(match[0].length);
          }
        }
        walk(child);
      });
    }
    walk(tree);
  };
}

export default function DetailMarkdown({ body }: { body?: string }) {
  const article = useRef<HTMLDivElement>(null);
  const mobileToc = useRef<HTMLDetailsElement>(null);
  const [toc, setToc] = useState<
    { id: string; label: string; level: number; number?: number }[]
  >([]);
  const [active, setActive] = useState("");
  useEffect(() => {
    const headings = [
      ...(article.current?.querySelectorAll<HTMLHeadingElement>("h2, h3") ??
        []),
    ];
    let sectionNumber = 0;
    setToc(
      headings.map((el) => ({
        id: el.id,
        label: el.textContent ?? "",
        level: el.tagName === "H2" ? 2 : 3,
        number: el.tagName === "H2" ? ++sectionNumber : undefined,
      })),
    );
    let frame = 0;
    const update = () => {
      frame = 0;
      const cutoff =
        (document.querySelector(".site-header")?.getBoundingClientRect()
          .bottom ?? 88) + 36;
      let current = headings[0]?.id ?? "";
      for (const h of headings)
        if (h.getBoundingClientRect().top <= cutoff) current = h.id;
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [body]);
  function jump(id: string) {
    if (mobileToc.current) mobileToc.current.open = false;
    const target = document.getElementById(id);
    target?.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
      block: "start",
    });
    target?.setAttribute("tabindex", "-1");
    target?.focus({ preventScroll: true });
    setActive(id);
  }
  const contents = (
    <ul>
      {toc.map((item) => (
        <li
          key={item.id}
          className={item.level === 3 ? "work-toc-subitem" : undefined}
        >
          <button
            type="button"
            onClick={() => jump(item.id)}
            aria-current={active === item.id ? "location" : undefined}
          >
            {item.number !== undefined && (
              <span className="work-toc-number">{String(item.number).padStart(2, "0")}</span>
            )}
            <span className="work-toc-title">{item.label}</span>
          </button>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`work-detail-layout${toc.length ? "" : " without-toc"}`}>
      {!!toc.length && (
        <>
          <aside className="work-toc-desktop" aria-label="본문 목차">
            <p>CONTENTS</p>
            {contents}
          </aside>
          <details className="work-toc-mobile" ref={mobileToc}>
            <summary>CONTENTS</summary>
            {contents}
          </details>
        </>
      )}
      <div className="work-markdown" ref={article}>
        {body ? (
          <ReactMarkdown urlTransform={(url) => assetUrl(defaultUrlTransform(url))}
            skipHtml
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[headingIds, imageWidths]}
            components={{
              table: ({ children }) => (
                <div
                  className="work-table-scroll"
                  role="region"
                  aria-label="본문 표"
                  tabIndex={0}
                >
                  <table>{children}</table>
                </div>
              ),
              img: ({ src, alt, title, width }) => (
                <span
                  className="markdown-image"
                  style={
                    width
                      ? {
                          width: Number(width),
                          maxWidth: "100%",
                          marginInline: "auto",
                        }
                      : undefined
                  }
                >
                  <img src={src} alt={alt ?? ""} loading="lazy" />
                  {title && <span className="work-image-caption">{title}</span>}
                </span>
              ),
            }}
          >
            {body}
          </ReactMarkdown>
        ) : (
          <p>상세 내용을 준비하고 있습니다.</p>
        )}
      </div>
    </div>
  );
}
