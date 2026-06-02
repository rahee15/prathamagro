import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const BASE = 'http://localhost:5173';
const OUT  = path.join(__dirname, '../screenshots');

const VIEWPORTS = [
  { name: 'mobile',  width: 375,  height: 812 },
  { name: 'tablet',  width: 768,  height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

const PAGES = [
  { name: 'home',            path: '/' },
  { name: 'products',        path: '/products' },
  { name: 'product-detail',  path: '/products/supreme-sanjivani' },
  { name: 'crop-solutions',  path: '/crop-solutions' },
  { name: 'about',           path: '/about' },
  { name: 'contact',         path: '/contact' },
];

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    const ctx  = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();

    for (const pg of PAGES) {
      await page.goto(BASE + pg.path, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(600); // let animations settle

      const file = path.join(OUT, `${vp.name}_${pg.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log(`✓ ${file}`);
    }

    await ctx.close();
  }

  await browser.close();
  console.log('\nAll screenshots saved to', OUT);
})();
