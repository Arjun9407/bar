/**
 * Postbuild prerender step.
 *
 * A client-rendered SPA serves an empty <div id="root"></div> to anything that
 * doesn't execute JavaScript — most social-share link-preview bots, some SEO
 * crawlers, and any "view source" check. Google's crawler executes JS, but
 * plenty of other things that matter for SEO/sharing don't.
 *
 * This script builds the app (already done via `vite build`), boots a local
 * static server against dist/, visits every real route in a headless browser,
 * waits for the Seo component to finish writing <head> tags, and writes the
 * fully-rendered HTML to dist/<route>/index.html. The root dist/index.html is
 * left as the plain SPA shell so client-side routing still works for real
 * visitors; static hosts serve the prerendered file for the exact path and
 * fall back to the SPA shell for anything else.
 */
import { chromium } from "playwright";
import { preview } from "vite";
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

const ROUTES = [
  "/", "/qr-generator", "/bulk-generator", "/scanner", "/check-digit-calculator",
  "/size-calculator", "/serial-generator", "/label-sheet-generator", "/qr-contrast-checker",
  "/blog", "/blog/history-of-barcodes", "/blog/qr-vs-barcode", "/blog/printing-barcode-labels",
  "/blog/barcode-types-explained", "/blog/barcodes-ecommerce-shipping", "/blog/gs1-ean-upc-explained",
  "/blog/how-scanners-work", "/use-cases", "/glossary", "/about", "/contact", "/faq",
  "/privacy", "/terms", "/tools",
];

async function main() {
  const previewServer = await preview({
    root: join(__dirname, ".."),
    preview: { port: 4174, host: "127.0.0.1" },
  });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const route of ROUTES) {
    const url = `http://127.0.0.1:4174${route}`;
    await page.goto(url, { waitUntil: "networkidle" });
    // Give the Seo component's effect a beat to write JSON-LD/meta tags.
    await page.waitForTimeout(150);
    const html = await page.content();

    const outPath = route === "/" ? join(distDir, "index.html") : join(distDir, route, "index.html");
    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html);
    console.log(`prerendered ${route} -> ${outPath.replace(distDir, "dist")}`);
  }

  await browser.close();
  await new Promise((resolve) => previewServer.httpServer.close(resolve));
}

main().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
