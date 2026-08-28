const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2500); // Allow Three.js and animations to render

  // 1. Hero & Top Services
  await page.screenshot({ path: 'C:/Users/sakju/Tahseen-ai/public/mobile_1_hero.png' });

  // 2. Scroll to Partners & Insights
  await page.evaluate(() => window.scrollTo(0, 950));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:/Users/sakju/Tahseen-ai/public/mobile_2_partners_insights.png' });

  // 3. Scroll to Solutions & Pricing
  await page.evaluate(() => window.scrollTo(0, 2200));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:/Users/sakju/Tahseen-ai/public/mobile_3_solutions_pricing.png' });

  // 4. Scroll to CTA & Footer
  await page.evaluate(() => window.scrollTo(0, 4300));
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'C:/Users/sakju/Tahseen-ai/public/mobile_4_cta_footer.png' });

  // 5. Open mobile drawer menu and capture
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.click('button[aria-label="Toggle mobile menu"]');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/sakju/Tahseen-ai/public/mobile_5_menu.png' });

  await browser.close();
  console.log('Mobile screenshots captured successfully!');
})();
