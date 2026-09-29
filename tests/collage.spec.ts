import { test, expect } from "@playwright/test";
for (const width of [320, 360, 600, 760, 768, 1024, 1440, 1920]) {
  test(`collage stays contained and reverses at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
    const panel = page.locator(".game-collage");
    const icons = panel.locator(".collage-icon");
    await expect(icons).toHaveCount(6);
    await expect
      .poll(() =>
        panel
          .locator("img")
          .evaluateAll((images) =>
            images.every(
              (image) =>
                (image as HTMLImageElement).complete &&
                (image as HTMLImageElement).naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
    const initial = await icons.evaluateAll((nodes) =>
      nodes.map((node) => getComputedStyle(node).transform),
    );
    for (const progress of [0, 0.5, 1]) {
      await page.evaluate((progress) => {
        const el = document.querySelector(".game-collage") as HTMLElement;
        const top = el.getBoundingClientRect().top + scrollY;
        const start = Math.max(0, top - innerHeight * 0.95);
        window.scrollTo(
          0,
          progress === 0
            ? 0
            : start + (top + el.offsetHeight * 0.9 - start) * progress,
        );
      }, progress);
      await expect
        .poll(() =>
          panel.evaluate((el) =>
            Number(
              (el as HTMLElement).style.getPropertyValue("--collage-progress"),
            ),
          ),
        )
        .toBeCloseTo(progress === 0.5 ? 0.5 : progress, 2);
      const boxes = await icons.evaluateAll((nodes) =>
        nodes.map((node) => {
          const rect = node.getBoundingClientRect();
          const matrix = new DOMMatrixReadOnly(
            getComputedStyle(node).transform,
          );
          return {
            left: rect.left,
            right: rect.right,
            top: rect.top,
            bottom: rect.bottom,
            rotated: matrix.b !== 0 || matrix.c !== 0,
          };
        }),
      );
      expect(boxes.every((box) => !box.rotated)).toBe(true);
      for (let i = 0; i < boxes.length; i++)
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i],
            b = boxes[j];
          expect(
            a.right <= b.left ||
              b.right <= a.left ||
              a.bottom <= b.top ||
              b.bottom <= a.top,
          ).toBe(true);
        }
      const sizes = await icons.evaluateAll((nodes) =>
        nodes.map((node) => node.getBoundingClientRect().width),
      );
      expect(
        sizes[0] > sizes[1] && sizes.slice(2).every((size) => sizes[1] > size),
      ).toBe(true);
      expect(
        await panel.evaluate((el) => {
          const bounds = el.getBoundingClientRect();
          return [...el.querySelectorAll(".collage-icon")].every((icon) => {
            const r = icon.getBoundingClientRect();
            return (
              r.left >= bounds.left &&
              r.right <= bounds.right &&
              r.top >= bounds.top &&
              r.bottom <= bounds.bottom
            );
          });
        }),
      ).toBe(true);
    }
    await page.evaluate(() => scrollTo(0, 0));
    await expect
      .poll(() =>
        icons.evaluateAll((nodes) =>
          nodes.map((node) => getComputedStyle(node).transform),
        ),
      )
      .toEqual(initial);
    await expect
      .poll(() =>
        panel
          .locator(".collage-reveal")
          .evaluateAll((nodes) =>
            nodes.every((node) => getComputedStyle(node).opacity === "1"),
          ),
      )
      .toBe(true);
    await panel.screenshot({ path: `test-results/collage-${width}.png` });
  });
}
test("reduced motion keeps icons still", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const icon = page.locator(".collage-icon-mabinogi");
  const initial = await icon.evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate(() => scrollTo(0, 400));
  await expect(icon).toHaveCSS("transform", initial);
});

test("reveal order, persistence and scroll independence", async ({ page }) => {
  await page.goto("/");
  const order = [
    "mabinogi",
    "chronicles",
    "egon",
    "storypick",
    "wannabe",
    "yeoju",
  ];
  for (const [index, id] of order.entries()) {
    const layer = page.locator(`.collage-icon-${id} .collage-reveal`);
    expect(
      await layer.evaluate((el) =>
        parseFloat(getComputedStyle(el).animationDelay),
      ),
    ).toBeCloseTo([0.35, 0.55, 0.7, 0.85, 1, 1.15][index]);
  }
  await expect
    .poll(() =>
      page
        .locator(".collage-reveal")
        .evaluateAll((nodes) =>
          nodes.every((el) => getComputedStyle(el).opacity === "1"),
        ),
    )
    .toBe(true);
  await page.evaluate(() => scrollTo({ top: 300, behavior: "instant" }));
  await expect
    .poll(() =>
      page
        .locator(".game-collage")
        .evaluate((el) =>
          Number(
            (el as HTMLElement).style.getPropertyValue("--collage-progress"),
          ),
        ),
    )
    .toBeGreaterThan(0);
  for (const id of order)
    await expect(page.locator(`.collage-icon-${id} .collage-reveal`)).toHaveCSS(
      "opacity",
      "1",
    );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".collage-reveal").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".hero > div").first()).toHaveCSS("opacity", "1");
});
