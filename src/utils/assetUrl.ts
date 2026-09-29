// Resolve public assets under Vite's base; preserve external URLs and hash routes.
export function assetUrl(url: string): string {
  if (!url || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\?)/i.test(url)) return url;
  const base = import.meta.env.BASE_URL;
  if (url.startsWith(base)) return url;
  return base + url.replace(/^\.?\//, "").replace(/^public\//, "");
}
