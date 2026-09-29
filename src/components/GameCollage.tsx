import { assetUrl } from "../utils/assetUrl";
import { useEffect, useRef } from "react";
import "./GameCollage.css";

const games = [
  { id: "mabinogi", file: "mabinogi.webp", name: "마비노기 모바일" },
  { id: "chronicles", file: "chronicles.jpg", name: "서머너즈 워: 크로니클" },
  { id: "egon", file: "egon.png", name: "에곤: 인페르나 벨룸" },
  { id: "storypick", file: "storypick.png", name: "스토리픽" },
  { id: "wannabe", file: "wannabe.jpg", name: "워너비챌린지" },
  { id: "yeoju", file: "yeoju.png", name: "김여주 꾸미기" },
];

export default function GameCollage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const paint = () => {
      frame = 0;
      const top = element.getBoundingClientRect().top + window.scrollY;
      // Animate throughout the hero's scroll journey, including the
      // first screen. A hero at the top should not start halfway done.
      const start = Math.max(0, top - window.innerHeight * 0.95);
      const end = top + element.offsetHeight * 0.9;
      const progress = Math.max(
        0,
        Math.min(1, (window.scrollY - start) / Math.max(1, end - start)),
      );
      element.style.setProperty(
        "--collage-progress",
        String(reduced.matches ? 0 : progress * progress * (3 - 2 * progress)),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    paint();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
    };
  }, []);
  return (
    <div
      className="game-collage"
      ref={ref}
      role="group"
      aria-label="참여한 게임 6개"
    >
      <svg
        className="collage-light-trails"
        viewBox="0 0 500 510"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="collage-cool-arc" x1="0" y1="1" x2="1" y2="0">
            <stop stopColor="#8dcddd" stopOpacity="0" />
            <stop offset=".48" stopColor="#84c9e0" stopOpacity=".2" />
            <stop offset=".7" stopColor="#c5f4ff" stopOpacity=".85" />
            <stop offset="1" stopColor="#a4c9de" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="collage-warm-arc">
            <stop stopColor="#a7cadc" stopOpacity="0" />
            <stop offset=".55" stopColor="#efcbbf" stopOpacity=".65" />
            <stop offset="1" stopColor="#a7cadc" stopOpacity="0" />
          </linearGradient>
          <filter
            id="collage-trail-blur"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <g fill="none">
          <path
            d="M70 322 C18 198 100 62 326 40"
            stroke="url(#collage-cool-arc)"
            strokeWidth="5"
            filter="url(#collage-trail-blur)"
          />
          <path
            d="M70 322 C18 198 100 62 326 40"
            stroke="url(#collage-cool-arc)"
            strokeWidth=".9"
          />
          <path
            d="M48 304 C83 425 283 490 467 452"
            stroke="url(#collage-warm-arc)"
            strokeWidth="6"
            filter="url(#collage-trail-blur)"
          />
          <path
            d="M48 304 C83 425 283 490 467 452"
            stroke="url(#collage-warm-arc)"
            strokeWidth=".8"
          />
          <path
            d="M162 54 C454 45 520 272 340 420"
            stroke="#8daec0"
            strokeOpacity=".07"
            strokeWidth=".7"
          />
        </g>
        <g
          fill="#b6d4e5"
          fillOpacity=".045"
          stroke="#bbd3e8"
          strokeOpacity=".12"
          strokeWidth=".6"
        >
          <rect x="262" y="99" width="21" height="21" rx="5" />
          <rect x="439" y="177" width="19" height="19" rx="4" />
          <rect x="198" y="391" width="27" height="27" rx="6" />
        </g>
      </svg>
      {games.map((game) => (
        <div key={game.id} className={`collage-icon collage-icon-${game.id}`}>
          <div className="collage-reveal">
            <img
              src={assetUrl(`/game-icons/${game.file}`)}
              alt={game.name}
              draggable={false}
              decoding="async"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
