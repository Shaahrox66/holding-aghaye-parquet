import fs from "node:fs/promises";

let chromium;
for (const packageName of ["playwright", "playwright-core"]) {
  try {
    ({ chromium } = await import(packageName));
    break;
  } catch {
    // Try the next locally available browser package.
  }
}

if (!chromium) {
  throw new Error("Playwright is not available in this workspace.");
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const result = {};

try {
  await page.goto("http://127.0.0.1:4173/pages/design-studio.html", {
    waitUntil: "networkidle",
  });
  await page.waitForSelector(".project-card", { timeout: 15_000 });

  result.title = await page.title();
  result.projects = await page.locator(".project-card").count();
  result.heroImageLoaded = await page.locator(".hero-slide img").first().evaluate(
    (image) => image.complete && image.naturalWidth > 0,
  );
  result.homeHref = await page.locator("a[href='../index.html']").first().getAttribute("href");

  await page.screenshot({
    path: "verification-design-studio-desktop.png",
    fullPage: true,
  });

  await page.locator(".project-card").first().click();
  await page.waitForSelector("dialog[open]", { timeout: 5_000 });
  result.galleryOpened = await page.locator("dialog[open]").count() === 1;
  result.galleryImages = await page.locator(".gallery-thumb").count();
  await page.screenshot({
    path: "verification-design-studio-gallery.png",
    fullPage: false,
  });
  await page.keyboard.press("Escape");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForSelector(".project-card");
  result.mobileOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  await page.screenshot({
    path: "verification-design-studio-mobile.png",
    fullPage: true,
  });
} finally {
  await browser.close();
}

await fs.writeFile(
  "design-studio-verification.json",
  `${JSON.stringify(result, null, 2)}\n`,
  "utf8",
);
