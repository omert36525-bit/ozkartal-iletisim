// screenshot.mjs — Puppeteer screenshot tool
// Usage:   node screenshot.mjs <url> [label]
// Example: node screenshot.mjs http://localhost:3000
// Example: node screenshot.mjs http://localhost:3000 hero-section
// Output:  ./temporary screenshots/screenshot-N[-label].png

import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/ÖMER/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer');

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

// Chrome executable
const CHROME = 'C:/Users/ÖMER/.cache/puppeteer/chrome/win64-148.0.7778.167/chrome-win64/chrome.exe';

// Create screenshots directory
const screenshotsDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

// Auto-increment filename
let n = 1;
while (fs.existsSync(path.join(screenshotsDir, `screenshot-${n}${label ? '-' + label : ''}.png`))) n++;
const filename = `screenshot-${n}${label ? '-' + label : ''}.png`;
const outPath  = path.join(screenshotsDir, filename);

(async () => {
  console.log(`\n📸 Screenshotting ${url}...`);

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  // Force-trigger all reveal animations + load lazy images immediately
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    document.querySelectorAll('img[loading="lazy"]').forEach(img => img.setAttribute('loading', 'eager'));
  });

  // Wait for all images to actually load
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(imgs.map(img => {
      if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
      return new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
        setTimeout(resolve, 5000);
      });
    }));
  });

  // Scroll through page slowly to trigger IntersectionObserver reveal animations
  await page.evaluate(async () => {
    await new Promise(resolve => {
      const step = 200;
      let pos = 0;
      const h = document.body.scrollHeight;
      const id = setInterval(() => {
        window.scrollTo(0, pos);
        pos += step;
        if (pos >= h) { window.scrollTo(0, 0); clearInterval(id); resolve(undefined); }
      }, 40);
    });
  });

  // Wait for all reveal animations and images to complete
  await new Promise(r => setTimeout(r, 2000));

  // Default to full page, but viewport-only if "vp" label
  const fullPage = !label.includes('vp');
  await page.screenshot({ path: outPath, fullPage });
  await browser.close();

  console.log(`✓ Saved: temporary screenshots/${filename}`);
  console.log(`  Full path: ${outPath}\n`);
})().catch(err => {
  console.error('✗ Screenshot failed:', err.message);
  process.exit(1);
});
