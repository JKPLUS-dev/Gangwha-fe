import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { PAGES } from "./pages";

const MIN_TOUCH_PX = 44;

for (const path of PAGES) {
  test(`접근성 ${path}`, async ({ page }) => {
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
    const summary = violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
    expect(summary, "접근성 위반").toEqual([]);
  });

  test(`44px ${path}`, async ({ page, isMobile }) => {
    test.skip(!isMobile);
    await page.goto(path);
    const small = await page.locator("a:visible, button:visible").evaluateAll(
      (els, min) =>
        els
          .filter((el) => !el.closest("nextjs-portal") && el.getRootNode() === document).map((el) => ({ label: el.textContent?.trim() || el.getAttribute("aria-label") || el.outerHTML.slice(0, 60), r: el.getBoundingClientRect() }))
          .filter(({ r }, i, arr) => true).filter(({ r }) => r.width < min || r.height < min)
          .map(({ label }) => label),
      MIN_TOUCH_PX,
    );
    expect(small, "44px 미만 버튼/링크").toEqual([]);
  });
}