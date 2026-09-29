import { test, expect } from "@playwright/test";
import { navigation } from "../src/data/navigation";
for (const [width, height] of [
  [320, 640],
  [390, 844],
  [440, 900],
  [600, 900],
  [760, 900],
  [768, 1024],
  [1024, 768],
  [1440, 900],
  [1920, 1080],
  [2560, 1440],
  [3840, 2160],
]) {
  test(`header alignment and anchors at ${width}x${height}`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
    const nav = page.getByRole("navigation", { name: "주요 메뉴" });
    await expect(nav.getByRole("link")).toHaveCount(3);
    await expect(nav.getByText("HOME", { exact: true })).toHaveCount(0);
    const measure = () =>
      page.evaluate(() => {
        const rect = (s: string) =>
          document.querySelector(s)!.getBoundingClientRect();
        const logo = rect(".site-header .logo"),
          intro = rect("h1"),
          nav = rect(".site-header nav"),
          header = rect(".site-header");
        return {
          logoLeft: logo.left,
          titleLeft: intro.left,
          navCenter: (nav.left + nav.right) / 2,
          headerTop: header.top,
          headerBottom: header.bottom,
          navBottom: nav.bottom,
          within: nav.left >= 0 && nav.right <= innerWidth,
          overlap:
            logo.right > nav.left &&
            logo.left < nav.right &&
            logo.bottom > nav.top &&
            logo.top < nav.bottom,
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
    let m = await measure();
    expect(m.logoLeft).toBeCloseTo(m.titleLeft, 0);
    expect(m.navCenter).toBeCloseTo(width / 2, 0);
    expect(m.within).toBe(true);
    expect(m.overlap).toBe(false);
    expect(m.overflow).toBe(false);
    expect(m.navBottom).toBeLessThanOrEqual(m.headerBottom);
    await expect(page.locator(".site-header")).toHaveCSS(
      "border-bottom-width",
      "1px",
    );
    for (const item of navigation.items) {
      await nav.getByRole("link", { name: item.label, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(item.href + "$"));
      await expect(
        nav.getByRole("link", { name: item.label, exact: true }),
      ).toHaveAttribute("aria-current", item.id === "qa" ? "page" : "location");
      m = await measure();
      expect(m.headerTop).toBe(0);
      const visibleTop = await page
        .locator(item.id === "qa" ? ".qa-intro" : "#" + item.id)
        .evaluate((el) => el.getBoundingClientRect().top);
      expect(visibleTop).toBeGreaterThanOrEqual(m.headerBottom - 1);
      await expect(
        nav.getByRole("link", { name: item.label, exact: true }),
      ).toHaveCSS("border-bottom-width", "0px");
    }
    await page.getByRole("link", { name: "첫 화면으로 이동" }).click();
    await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
    await page.goto("/#works");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page
        .locator("#works")
        .evaluate((el) => el.getBoundingClientRect().top),
    ).toBeGreaterThanOrEqual((await measure()).headerBottom - 1);
    expect(errors).toEqual([]);
    if ([390, 1440, 2560].includes(width)) {
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `test-results/header-${width}.png` });
    }
  });
}
