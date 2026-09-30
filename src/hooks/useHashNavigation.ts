import { useLayoutEffect, useRef, useState } from "react";

// Positions belong to history entries, not routes: two visits can differ.
export function useHashNavigation() {
  const [navigation, setNavigation] = useState({
    hash: window.location.hash,
    restoreTop: undefined as number | undefined,
  });
  const positions = useRef(new Map<string, number>());

  useLayoutEffect(() => {
    const stateKey = "portfolioScrollKey";
    const newKey = () => crypto.randomUUID();
    let currentKey = history.state?.[stateKey] as string | undefined;
    if (!currentKey) {
      currentKey = newKey();
      history.replaceState({ ...history.state, [stateKey]: currentKey }, "");
    }
    let currentUrl = window.location.href;
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const save = () => positions.current.set(currentKey!, window.scrollY);
    save();

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 ||
          event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.hasAttribute("download") ||
          (link.target && link.target !== "_self")) return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname ||
          url.search !== location.search || !url.hash) return;
      event.preventDefault();
      save();
      if (url.href !== currentUrl) {
        currentKey = newKey();
        history.pushState({ [stateKey]: currentKey }, "", url);
      }
      currentUrl = url.href;
      setNavigation({ hash: url.hash, restoreTop: undefined });
    };
    const onHistory = () => {
      // popstate and hashchange can both fire for the same traversal.
      if (currentUrl === location.href &&
          currentKey === history.state?.[stateKey]) return;
      const destinationKey = history.state?.[stateKey] as string | undefined;
      const restoreTop = destinationKey && destinationKey !== currentKey
        ? positions.current.get(destinationKey) : undefined;
      currentKey = destinationKey && destinationKey !== currentKey
        ? destinationKey : newKey();
      history.replaceState({ ...history.state, [stateKey]: currentKey }, "");
      currentUrl = location.href;
      setNavigation({ hash: location.hash, restoreTop });
    };
    window.addEventListener("scroll", save, { passive: true });
    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onHistory);
    window.addEventListener("hashchange", onHistory);
    return () => {
      history.scrollRestoration = previousRestoration;
      window.removeEventListener("scroll", save);
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onHistory);
      window.removeEventListener("hashchange", onHistory);
    };
  }, []);

  return navigation;
}
