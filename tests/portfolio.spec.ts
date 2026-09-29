import { test, expect } from "@playwright/test";
import { introduction, contact, projects } from "../src/data/home";

test("Navigation returns to intro after the live background transition", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".top-dark")).toHaveCSS(
    "background-color",
    "rgb(11, 16, 23)",
  );
  await page.getByRole("link", { name: "EXPLORE WORKS" }).click();
  await expect(page).toHaveURL(/#works$/);
  await expect(page.locator(".top-dark")).toHaveCSS(
    "background-color",
    "rgb(248, 251, 252)",
  );
  await page.getByRole("link", { name: "BACK TO TOP" }).click();
  await expect(page).toHaveURL(/#home$/);
  await expect(page.locator(".top-dark")).toHaveCSS(
    "background-color",
    "rgb(11, 16, 23)",
  );
});

for (const width of [360, 390, 768, 1440]) {
  test(`layout fits ${width}px with original mixed-language copy`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText(
      introduction.titleLines.map((line) => line.text).join(""),
    );
    await expect(page.locator(".hero .ko")).toHaveText(introduction.role);
    await expect(page.locator(".language-toggle")).toHaveCount(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator(".work")).toHaveCount(projects.length);
    await page.screenshot({
      path: "test-results/portfolio-" + width + ".png",
      fullPage: true,
    });
  });
}

test("contact copies the configured email", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await expect(page.locator(".contact-email")).toHaveText(contact.email);
  await page.getByRole("button", { name: "이메일 주소 복사" }).click();
  await expect(page.getByRole("status")).toHaveText("이메일을 복사했습니다.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    contact.email,
  );
});
test("contact explains a clipboard failure", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, "writeText", {
      value: () => Promise.reject(new Error("Denied")),
    });
  });
  await page.getByRole("button", { name: "이메일 주소 복사" }).click();
  await expect(page.getByRole("status")).toContainText("복사하지 못했습니다.");
});
