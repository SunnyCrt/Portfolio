import { test, expect } from "@playwright/test";
for (const width of [320, 390, 760, 768, 1024, 1440, 1920, 2560, 3840]) {
  test(`hero title fits at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const lines = page.locator(".hero-title-line");
    await expect(lines).toHaveCount(2);
    await expect(lines.nth(0)).toHaveText("Game Content");
    await expect(lines.nth(1)).toHaveText("Designer.");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    if (width > 760) {
      const metrics = await page.locator("h1").evaluate((el) => {
        const rect = el.getBoundingClientRect();
        const ranges = [...el.querySelectorAll(".hero-title-line")].map(
          (line) => {
            const range = document.createRange();
            range.selectNodeContents(line);
            return [...range.getClientRects()].filter((r) => r.width > 0);
          },
        );
        return {
          height: rect.height,
          lineHeight: parseFloat(getComputedStyle(el).lineHeight),
          right: rect.right,
          contentRight: Math.max(...ranges.flat().map((r) => r.right)),
          collageLeft: document
            .querySelector(".game-collage")!
            .getBoundingClientRect().left,
        };
      });
      expect(metrics.height).toBeCloseTo(metrics.lineHeight * 2, 0);
      expect(metrics.contentRight).toBeLessThanOrEqual(metrics.right + 1);
      expect(metrics.contentRight).toBeLessThan(metrics.collageLeft);
    }
  });
}
