import { test, expect } from "@playwright/test";

test("language selection translates content and persists after reload", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "ko");
  await expect(page.locator("h1")).toContainText("기획자.");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("h1")).toContainText("Designer.");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("button", { name: "한국어로 전환" }).click();
  await expect(page.locator("h1")).toContainText("기획자.");
  expect(errors).toEqual([]);
});

test("scroll transition reaches reading surface and navigation returns to intro", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".top-dark")).toHaveCSS(
    "background-color",
    "rgb(11, 16, 23)",
  );
  await page.getByRole("link", { name: "작업 살펴보기" }).click();
  await expect(page).toHaveURL(/#works$/);
  await expect(page.locator(".top-dark")).toHaveCSS(
    "background-color",
    "rgb(248, 251, 252)",
  );
  await page.getByRole("link", { name: "맨 위로" }).click();
  await expect(page).toHaveURL(/#home$/);
  await expect(page.locator(".top-dark")).toHaveCSS(
    "background-color",
    "rgb(11, 16, 23)",
  );
});

for (const width of [360, 390, 768, 1440]) {
  test(`layout fits ${width}px in both languages`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    for (const language of ["ko", "en"]) {
      if (language === "en")
        await page.getByRole("button", { name: "Switch to English" }).click();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      await expect(page.locator(".work")).toHaveCount(4);
      await page.screenshot({
        path: `test-results/portfolio-${width}-${language}.png`,
        fullPage: true,
      });
    }
  });
}
