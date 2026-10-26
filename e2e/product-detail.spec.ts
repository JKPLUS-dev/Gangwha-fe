import { test, expect } from "@playwright/test";

// 상세 첫 화면(스크롤 없이)에 반드시 보여야 하는 항목
const REQUIRED_ABOVE_FOLD = [/원산지/, /배송/, /출고/];

test("상품 상세 첫 화면에 필수 정보가 보인다", async ({ page }) => {
  await page.goto("/");
  await page.locator('a[href*="/products/"]').first().click();
  await page.waitForURL(/\/products\//);

  const viewportHeight = page.viewportSize()!.height;
  for (const label of REQUIRED_ABOVE_FOLD) {
    const el = page.getByText(label).first();
    await expect(el, `${label} 표시`).toBeVisible();
    const box = await el.boundingBox();
    expect(box!.y, `${label}이(가) 첫 화면 안에 있어야 함`).toBeLessThan(viewportHeight);
  }
  await expect(page.getByRole("button", { name: /구매|장바구니|품절/ }).first()).toBeVisible();
});
