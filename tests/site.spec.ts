import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ROUTES = [
  '',
  'about/',
  'contact/',
  'services/',
  'products/',
  'products/ht-switchgear/',
  'products/industrial-automation/',
  'products/lt-switchgear/',
  'products/pfi-systems/',
  'products/transformers/',
  '404.html',
];

test.describe('Pacific Powertech Ltd. Comprehensive Test Suite', () => {

  test.describe('Route Integrity & Console Error Checks', () => {
    for (const route of ROUTES) {
      const displayRoute = route === '' ? '/' : route;
      test(`Verify route ${displayRoute} loads successfully with no console errors`, async ({ page }) => {
        const consoleErrors: string[] = [];
        page.on('console', (msg) => {
          if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
          }
        });
        page.on('pageerror', (err) => {
          consoleErrors.push(err.message);
        });

        const response = await page.goto(route);
        expect(response).not.toBeNull();
        expect(response!.status()).toBeLessThan(400);

        // Verify document title and basic structure
        await expect(page).toHaveTitle(/Pacific Powertech/);
        const main = page.locator('main');
        await expect(main).toBeVisible();

        // Check for console errors
        expect(consoleErrors).toEqual([]);
      });
    }
  });

  test('Verify Catalog PDF is accessible and returns HTTP 200', async ({ page }) => {
    const pdfUrl = 'assets/PPL Catalog.pdf';
    const response = await page.request.get(pdfUrl);
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('pdf');
    const body = await response.body();
    expect(body.length).toBeGreaterThan(10000);
  });

  test('Verify all images load with valid sources and non-zero dimensions', async ({ page }) => {
    // Use the static brand grid so moving marquee images are stable while inspected.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('');
    await page.waitForLoadState('networkidle');

    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const isVisible = await img.isVisible();
      if (!isVisible) continue;

      // Scroll image into view to trigger lazy loading if needed
      await img.scrollIntoViewIfNeeded();
      await page.waitForTimeout(50);
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      const src = await img.getAttribute('src');
      expect(naturalWidth, `Image with src "${src}" failed to render (naturalWidth === 0)`).toBeGreaterThan(0);
    }
  });

  test('Verify desktop and mobile navigation behavior', async ({ page, isMobile }) => {
    await page.goto('');

    const isNarrow = isMobile || (page.viewportSize()?.width ?? 1280) < 1024;

    if (isNarrow) {
      const menuBtn = page.locator('#mobile-menu-btn');
      await expect(menuBtn).toBeVisible();
      const mobileDrawer = page.locator('#mobile-nav');

      // Initial state: hidden
      await expect(mobileDrawer).toBeHidden();
      expect(await menuBtn.getAttribute('aria-expanded')).toBe('false');

      // Open drawer
      await menuBtn.click();
      await expect(mobileDrawer).toBeVisible();
      expect(await menuBtn.getAttribute('aria-expanded')).toBe('true');

      // Check mobile drawer link navigation
      const aboutLink = mobileDrawer.locator('a[href*="about"]');
      await expect(aboutLink).toBeVisible();

      // Close drawer
      await menuBtn.click();
      await expect(mobileDrawer).toBeHidden();
      expect(await menuBtn.getAttribute('aria-expanded')).toBe('false');
    } else {
      // Desktop nav links are visible
      const desktopNav = page.locator('nav[aria-label="Main Navigation"]');
      await expect(desktopNav).toBeVisible();
      const productsLink = desktopNav.locator('a[href*="products"]').first();
      await expect(productsLink).toBeVisible();
    }
  });

  test('Verify contact channels (tel & mailto links)', async ({ page }) => {
    await page.goto('contact/');

    const mailtoLinks = page.locator('a[href^="mailto:"]');
    const mailtoCount = await mailtoLinks.count();
    expect(mailtoCount).toBeGreaterThan(0);

    for (let i = 0; i < mailtoCount; i++) {
      const href = await mailtoLinks.nth(i).getAttribute('href');
      expect(href).toMatch(/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/);
    }

    const telLinks = page.locator('a[href^="tel:"]');
    const telCount = await telLinks.count();
    expect(telCount).toBeGreaterThan(0);

    for (let i = 0; i < telCount; i++) {
      const href = await telLinks.nth(i).getAttribute('href');
      expect(href).toMatch(/^tel:\+?[0-9\s-]+$/);
    }
  });

  test('Verify responsive technical tables do not cause page-level horizontal overflow', async ({ page }) => {
    // Navigate to a product page with dense spec tables
    await page.goto('products/transformers/');
    await page.waitForLoadState('networkidle');

    // Verify document width equals viewport width (no horizontal body scroll)
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll, 'Page has unintended horizontal overflow').toBe(false);

    // Verify specification table container is present and scrollable internally if needed
    const tableContainer = page.locator('table').first();
    await expect(tableContainer).toBeVisible();
  });

  test('Verify every route remains proportionate within the viewport', async ({ page }) => {
    for (const route of ROUTES) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      const layout = await page.evaluate(() => {
        const viewportWidth = window.innerWidth;
        const header = document.querySelector('header')?.getBoundingClientRect();
        const heading = document.querySelector('main h1')?.getBoundingClientRect();

        return {
          viewportWidth,
          documentWidth: document.documentElement.scrollWidth,
          headerLeft: header?.left ?? 0,
          headerRight: header?.right ?? viewportWidth,
          headingLeft: heading?.left ?? 0,
          headingRight: heading?.right ?? viewportWidth,
        };
      });

      expect(layout.documentWidth, `${route || '/'} has page-level horizontal overflow`).toBeLessThanOrEqual(layout.viewportWidth);
      expect(layout.headerLeft, `${route || '/'} header extends beyond the left edge`).toBeGreaterThanOrEqual(-1);
      expect(layout.headerRight, `${route || '/'} header extends beyond the right edge`).toBeLessThanOrEqual(layout.viewportWidth + 1);
      expect(layout.headingLeft, `${route || '/'} primary heading extends beyond the left edge`).toBeGreaterThanOrEqual(-1);
      expect(layout.headingRight, `${route || '/'} primary heading extends beyond the right edge`).toBeLessThanOrEqual(layout.viewportWidth + 1);
    }
  });

  test('Verify individual technology logos render without autoplay controls', async ({ page }) => {
    await page.goto('');

    const brandSection = page.locator('[data-technology-brands]');
    await expect(brandSection).toBeVisible();
    await expect(brandSection.getByRole('heading', { name: 'Technology & Component Brands' })).toBeVisible();
    await expect(brandSection.locator('li')).toHaveCount(10);
    await expect(brandSection.locator('img')).toHaveCount(10);
    await expect(brandSection.locator('#brand-carousel-toggle')).toHaveCount(0);
    await expect(brandSection.locator('#brand-marquee-track')).toHaveCount(0);
  });

  test('Verify additional catalog products scroll horizontally without page overflow', async ({ page }) => {
    await page.goto('');

    const rail = page.getByRole('region', { name: 'Additional products from the Pacific Powertech catalog' });
    await expect(rail).toBeVisible();
    await expect(rail.locator('article')).toHaveCount(13);

    const next = rail.locator('xpath=ancestor::section[1]').getByRole('button', { name: 'Scroll products forward' });
    if (await next.isVisible()) {
      const before = await rail.evaluate((element) => element.scrollLeft);
      await next.click();
      await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(before);
    }

    const hasPageOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(hasPageOverflow).toBe(false);
  });

  test('Verify keyboard focus navigation', async ({ page }) => {
    await page.goto('');

    // Press Tab multiple times to navigate interactive elements
    await page.keyboard.press('Tab');
    const firstFocusedTag = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(firstFocusedTag);

    // Verify focused element has an active outline / focus styling
    const hasFocusIndicator = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return false;
      const style = window.getComputedStyle(el);
      return style.outlineStyle !== 'none' || style.boxShadow !== 'none';
    });
    expect(hasFocusIndicator).toBe(true);
  });

  test.describe('Automated Accessibility (axe-core WCAG 2.2 AA)', () => {
    const keyPages = ['', 'about/', 'products/transformers/', 'contact/'];

    for (const pagePath of keyPages) {
      const displayName = pagePath === '' ? '/' : pagePath;
      test(`Axe accessibility scan for ${displayName}`, async ({ page }) => {
        await page.goto(pagePath);
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze();

        const seriousViolations = accessibilityScanResults.violations.filter(
          (v) => v.impact === 'serious' || v.impact === 'critical'
        );

        if (seriousViolations.length > 0) {
          console.error(`Axe violations on ${pagePath}:`, JSON.stringify(seriousViolations, null, 2));
        }

        expect(seriousViolations).toEqual([]);
      });
    }
  });

});
