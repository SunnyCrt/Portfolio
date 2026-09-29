import { test, expect } from "@playwright/test";
for (const [width, height] of [
  [390, 844],
  [768, 1024],
  [1440, 600],
  [1440, 900],
  [2560, 1440],
]) {
  test(`live background joins career without a seam at ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
    const boundary = await page
      .locator(".career")
      .evaluate((el) => el.getBoundingClientRect().top + scrollY);
    const home = page.locator(".top-dark");
    await expect(home).toHaveCSS("background-color", "rgb(11, 16, 23)");
    const end = Math.max(1, boundary - height * 0.3);
    for (const y of [
      end * 0.25,
      end * 0.5,
      Math.max(0, boundary - height + 1),
      end,
    ]) {
      await page.evaluate((y) => scrollTo(0, y), y);
      await expect
        .poll(() =>
          page.evaluate(() => {
            const home = getComputedStyle(
              document.querySelector(".top-dark")!,
            ).backgroundColor;
            const career = document.querySelector(".career")!;
            return (
              getComputedStyle(career)
                .getPropertyValue("--scroll-background")
                .trim() === home &&
              getComputedStyle(career, "::before").backgroundImage.includes(
                home,
              )
            );
          }),
        )
        .toBe(true);
    }
    await expect(home).toHaveCSS("background-color", "rgb(248, 251, 252)");
    await page.evaluate(() => scrollTo(0, 0));
    await expect(home).toHaveCSS("background-color", "rgb(11, 16, 23)");
  });
}
