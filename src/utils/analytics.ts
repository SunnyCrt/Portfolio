type Pageview = { path: string; title: string };
declare global {
  interface Window {
    goatcounter?: { count?: (pageview: Pageview) => void };
  }
}

let lastPath: string | undefined;
let loading = false;
const pending: Pageview[] = [];

// Only the public Pages site loads analytics; local previews send nothing.
export function trackPageview(route: string) {
  if (location.origin !== "https://sunnycrt.github.io" ||
      !location.pathname.startsWith("/Portfolio/")) return;
  const path = "/Portfolio/" + route;
  if (lastPath === path) return; // Includes StrictMode's repeated effect.
  lastPath = path;
  pending.push({ path, title: document.title });

  const flush = () => {
    if (!window.goatcounter?.count) return;
    for (const pageview of pending.splice(0)) window.goatcounter.count(pageview);
  };
  if (window.goatcounter?.count) {
    flush();
  } else if (!loading) {
    loading = true;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://gc.zgo.at/count.js";
    script.dataset.goatcounter = "https://sunnycrt.goatcounter.com/count";
    script.dataset.goatcounterSettings = JSON.stringify({ no_onload: true });
    script.onload = flush;
    script.onerror = () => { pending.length = 0; };
    document.head.append(script);
  }
}
