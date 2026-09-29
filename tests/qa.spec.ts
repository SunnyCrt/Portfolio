import { test, expect } from "@playwright/test";
import { qaItems, qaPage } from "../src/data/qa";

test("QA routes, shared header, keyboard accordion and multiple answers", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Q&A", exact: true })
    .click();
  await expect(page).toHaveURL(/#\/qa$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    qaPage.title,
  );
  await expect(page).toHaveTitle(qaPage.documentTitle);
  await expect(page.locator(".top-dark")).toHaveCount(0);
  const buttons = page.locator(".qa-question");
  await expect(buttons).toHaveCount(qaItems.length);
  await buttons.nth(0).focus();
  await page.keyboard.press("Enter");
  await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "true");
  await buttons.nth(1).focus();
  await page.keyboard.press("Space");
  await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "true");
  await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(".qa-markdown strong").first()).toBeVisible();
  await expect(page.locator(".qa-markdown li").first()).toBeVisible();
  await buttons.nth(0).click();
  await expect(buttons.nth(0)).toHaveAttribute("aria-expanded", "false");
  await expect(buttons.nth(1)).toHaveAttribute("aria-expanded", "true");
  expect(
    await page
      .locator(".qa-answer")
      .first()
      .evaluate((el) => (el as HTMLElement).inert),
  ).toBe(true);
  await page.reload();
  await expect(page.locator(".qa-page")).toBeVisible();
  for (const [label, id] of [
    ["주요 작업", "works"],
    ["개인 프로젝트", "personal"],
  ]) {
    await page
      .getByRole("navigation")
      .getByRole("link", { name: label, exact: true })
      .click();
    await expect(page.locator(".top-dark")).toBeVisible();
    await expect
      .poll(() =>
        page.locator("#" + id).evaluate((el) => el.getBoundingClientRect().top),
      )
      .toBeGreaterThanOrEqual(88);
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Q&A", exact: true })
      .click();
  }
  await page.getByRole("link", { name: "첫 화면으로 이동" }).click();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  await page.locator('.end-card[href="#/qa"]').click();
  await expect(page.locator(".qa-page")).toBeVisible();
  await page.goBack();
  await expect(page.locator(".top-dark")).toBeVisible();
  await page.goForward();
  await expect(page.locator(".qa-page")).toBeVisible();
  expect(errors).toEqual([]);
});

for (const width of [320, 390, 768, 1024, 1440, 2560]) {
  test(`QA readable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#/qa");
    await page.evaluate(() => document.fonts.ready);
    for (const button of await page.locator(".qa-question").all())
      await button.click();
    await expect
      .poll(() =>
        page
          .locator(".qa-answer")
          .evaluateAll((nodes) =>
            nodes.every((el) => getComputedStyle(el).opacity === "1"),
          ),
      )
      .toBe(true);
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    const sizes = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      heading: document.querySelector(".qa-intro")!.getBoundingClientRect().top,
      header: document.querySelector(".site-header")!.getBoundingClientRect()
        .bottom,
    }));
    expect(sizes.overflow).toBe(false);
    expect(sizes.heading).toBeGreaterThan(sizes.header);
    await page.screenshot({
      path: `test-results/qa-${width}.png`,
      fullPage: true,
    });
  });
}

test("data order, additional items, long Markdown and unsafe HTML", async ({
  page,
}) => {
  const fixture = [...qaItems].reverse().concat({
    id: "extra-test",
    question: "긴질문".repeat(90),
    answer:
      "**강조**\n\n- 항목\n\n" +
      "긴답변".repeat(200) +
      '\n\n<script>window.qaUnsafe=true</script>\n\n<img src=x onerror="window.qaUnsafe=true">\n\n[위험 링크](javascript:alert(1))',
  });
  await page.route("**/src/data/qa.ts*", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `export const qaPage=${JSON.stringify(qaPage)};export const qaItems=${JSON.stringify(fixture)};`,
    }),
  );
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/#/qa");
  await expect(page.locator(".qa-question")).toHaveCount(4);
  await expect(page.locator(".qa-question").first()).toContainText(
    fixture[0].question,
  );
  await expect(page.locator(".qa-number").last()).toHaveText("04");
  await page.locator(".qa-question").last().click();
  await expect(page.locator(".qa-answer").last()).toHaveAttribute(
    "aria-hidden",
    "false",
  );
  await expect(
    page.locator(
      '.qa-markdown script,.qa-markdown img,.qa-markdown a[href^="javascript:"]',
    ),
  ).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(await page.evaluate(() => Object.hasOwn(window, "qaUnsafe"))).toBe(
    false,
  );
});

test("empty data is supported", async ({ page }) => {
  await page.route("**/src/data/qa.ts*", (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `export const qaPage=${JSON.stringify(qaPage)};export const qaItems=[];`,
    }),
  );
  await page.goto("/#/qa");
  await expect(page.getByText(qaPage.emptyMessage)).toBeVisible();
});
