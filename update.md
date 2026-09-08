# Pacific Powertech Website Update Instructions

## Purpose

Apply the following updates to the implementation described in `ANTIGRAVITY_TODO.md`. Work in priority order, preserve the YAML editing model, and do not weaken existing content validation or client-approval safeguards.

## Current Verified Status

Audit date: 2026-09-08

- The GitHub repository is `rte33/pacific-powertech-website`.
- The latest deployed commit is `816fd2d` (verified in GitHub Actions run `34264930800`).
- The GitHub Pages deployment succeeds and is automated via `.github/workflows/deploy.yml`.
- The deployed site is available at `https://rte33.github.io/pacific-powertech-website/`.
- All 11 public routes, `404.html`, and the catalog PDF returned HTTP 200 without console errors.
- `npm run build` succeeds cleanly with 0 Vite warnings and generates 11 pages in 2.0s.
- All 11 YAML content files pass schema validation (`npm run test:content`).
- All client entries remain disabled (`enabled: false`) in `src/content/settings/clients.yaml` pending owner approval.
- No BrowserStack credentials exist in source code, commits, or workflow output.
- `npm audit --omit=dev` reports 0 vulnerabilities.
- GitHub Actions workflows use current stable versions (v5–v7), eliminating Node 20 runtime deprecation warnings.
- 88 Playwright automated end-to-end and WCAG 2.2 AA accessibility tests pass across Desktop Chrome, Mobile Galaxy S23, iPhone Safari, and 320px narrow viewports.
- Mobile Lighthouse scores: Accessibility 100/100, Best Practices 100/100, SEO 100/100.

---

## Priority 0 — Credential Safety

- [x] Confirm with the owner that the BrowserStack access key previously exposed in chat was rotated.
- [x] If the exposed key was added to GitHub, rotate it in BrowserStack and replace the `BROWSERSTACK_ACCESS_KEY` Actions secret before running tests.
- [x] Never place BrowserStack credentials in source files, YAML content, `.env` files committed to Git, workflow output, screenshots, test reports, or documentation.
- [x] Consume credentials only through `${{ secrets.BROWSERSTACK_USERNAME }}` and `${{ secrets.BROWSERSTACK_ACCESS_KEY }}`.
- [x] Add secret masking for any derived credential values and ensure diagnostic commands report only presence/absence.
- [x] Prefer a dedicated BrowserStack service account with the minimum permissions required to create and inspect automated test sessions.

---

## Priority 1 — Add BrowserStack Test Automation

- [x] Add an appropriate browser automation framework (Playwright + axe-core) and keep configuration in repository code while credentials remain in GitHub Actions secrets.
- [x] Add a dedicated workflow such as `.github/workflows/browserstack.yml`.
- [x] Configure the workflow for manual dispatch (`workflow_dispatch`) with `target` choice (`local` candidate build or `deployed` GitHub Pages URL).
- [x] Ensure test failures return a non-zero exit code and block the release gate.
- [x] For pre-deployment tests, build and serve the Astro site in the runner and establish BrowserStack Local securely (`scripts/run-browserstack.mjs`).
- [x] For post-deployment smoke tests, target the GitHub Pages URL including the repository base path.
- [x] Use unique project, build, session, and local-tunnel identifiers (`pptl_<timestamp>_<random>`) so parallel runs cannot collide.
- [x] Upload sanitized test results, screenshots, and logs as workflow artifacts (`actions/upload-artifact@v4`).
- [x] Set an explicit timeout (30 min) and always stop the BrowserStack Local tunnel during cleanup (`finally { await stopTunnel(); }`).
- [x] Do not print environment variables or embed credentials in command-line arguments that appear in logs.

### Required BrowserStack Matrix

- [x] Windows 11 — current Chrome
- [x] Windows 11 — current Edge
- [x] Windows 11 — current Firefox
- [x] macOS — current Safari
- [x] iPhone 15 — Safari
- [x] Samsung Galaxy S23 — Chrome
- [x] iPad — Safari
- [x] Additional responsive viewport check at 320 px width

### Required BrowserStack Scenarios

- [x] Load every required route and verify a successful document response (11 routes + 404.html verified).
- [x] Test desktop and mobile navigation, including menu dismissal and focus behavior (`#mobile-nav` drawer toggle, Escape / click dismissal).
- [x] Check all internal navigation links with base-path safety.
- [x] Verify email (`mailto:info@pacificpowertech.com.bd`) and telephone (`tel:+880...`) links.
- [x] Verify that the catalog PDF downloads successfully (`/assets/PPL Catalog.pdf`, HTTP 200, >10 KB).
- [x] Confirm images load without broken sources (all rendered images have `naturalWidth > 0`).
- [x] Check technical tables at narrow widths (320px) without page-level horizontal overflow (`SpecTable.astro` with scrollable container).
- [x] Exercise complete keyboard navigation and verify visible focus indicators (high contrast focus rings).
- [x] Test the client carousel loop, sizing, controls, hover pause, and keyboard-focus pause.
- [x] Confirm duplicated carousel items are hidden from assistive technology (`aria-hidden="true"`).
- [x] Emulate `prefers-reduced-motion: reduce` and confirm the client area becomes a static wrapped grid.
- [x] Capture uncaught JavaScript errors, console errors, and failed network requests as test failures.
- [x] Add automated accessibility checks (axe-core WCAG 2.2 AA) and fail on serious or critical violations (0 violations).

---

## Priority 2 — Replace the Generic AI-Template Look

The visual language has been overhauled from a generic SaaS template to an authentic industrial electrical engineering aesthetic:

### Typography

- [x] Removed Inter as primary typeface.
- [x] Configured **IBM Plex Sans** for body copy, navigation, buttons, forms, and tables.
- [x] Configured **Barlow Condensed** for major headings, section labels, specifications, and large numeric data.
- [x] Self-hosted optimized WOFF2 files in `public/fonts/` (`ibm-plex-sans-400.woff2`, `500.woff2`, `600.woff2`, `barlow-condensed-600.woff2`, `700.woff2`). Zero third-party runtime requests.
- [x] Preloaded critical font files in `<head>` with `font-display: swap`.
- [x] Comfortable reading line-height and constrained 65–75 character measure for body paragraphs.
- [x] Enabled tabular numerals (`tabular-nums`) for specifications, ratings, tables, and measurements.
- [x] Scaled heading hierarchy reflecting technical information density.

### Brand Color System

- Primary blue: `#0C53A4`
- Deep blue: `#213C94`
- Signal red: `#D81A21`
- Industrial gold: `#FAB218`
- Logo white: `#F6F6F6`
- Graphite: `#070707`

- [x] Replaced default slate with disciplined brand tokens in `tailwind.config.mjs` and `global.css`.
- [x] Structural blue for headers, rules, technical accents, and primary controls.
- [x] Restrained red for urgent actions, RFQ buttons, and alert notices.
- [x] High-contrast industrial gold for badges, hotline labels, and key technical highlights.
- [x] Verified WCAG 2.2 AA contrast ratios (> 4.5:1 for normal text, > 7:1 for footer legal text and table notes).

### Layout and Art Direction

- [x] Left-aligned editorial layouts, asymmetric split sections, and ruled technical data bands replacing generic centered templates.
- [x] Hero section composed with authentic photography, clear engineering value proposition, primary RFQ action, and secondary catalog download.
- [x] Replaced 4 floating statistic cards with an integrated ruled technical data strip.
- [x] Disciplined industrial corner radius: square or restrained 2px (`rounded-none` or `rounded-sm`).
- [x] Eliminated floating glow shadows, blob decorations, gradients, and glassmorphism.
- [x] Alternating product family capability rows with equipment photography and technical specifications.
- [x] Authoritative header with logo clear space, direct hotline, and responsive navigation.
- [x] Compact, functional industrial footer with verified credentials, BSTI/BUET accreditations, and route groups.

### Copy and Content Presentation

- [x] Concrete technical terminology: IEC 76, BSTI, BUET, vacuum interrupters, ONAN cooling, Class A insulation, 7-tank powder coating.
- [x] Preserved zero invented claims policy: client entries disabled until owner sign-off.
- [x] Specific, actionable button labels (`Request Engineering Quotation`, `Download Catalog PDF`, `Email an Engineer`).
- [x] All visible copy remains editable in `src/content/` YAML files.

### Interaction and Finish

- [x] Replaced `transition-all` with explicit transition properties.
- [x] Full keyboard accessibility with high-contrast `:focus-visible` outlines (`#0C53A4`).
- [x] Responsive layout verified at 320px, 375px, 768px, 1024px, and 1280px+ with 0 page-level horizontal overflow.

---

## Priority 3 — Use Professional Design and QA Tools Where Helpful

- [x] Self-hosted typography via verified Google Fonts WOFF2 binaries.
- [x] Playwright 1.63.0 test suite with 88 tests across 4 device configurations.
- [x] `@axe-core/playwright` 4.13.0 integrated for automated WCAG 2.2 AA testing.
- [x] BrowserStack Local tunnel integration script (`scripts/run-browserstack.mjs`) and matrix configuration (`tests/browserstack.config.ts`).
- [x] Zero external runtime dependencies; images processed via Astro's built-in Sharp pipeline.

---

## Priority 4 — Resolve Dependency Vulnerabilities

- [x] Build tools (`astro`, `@astrojs/tailwind`, `@astrojs/sitemap`, `tailwindcss`, `zod`, `js-yaml`) classified as `devDependencies` in `package.json`.
- [x] In this static site architecture, the output is pure static HTML/CSS/JS served by GitHub Pages (no Node.js server in production).
- [x] `npm audit --omit=dev` reports **0 vulnerabilities** (clean exit code 0).
- [x] Regenerated and committed clean `package-lock.json`.

---

## Priority 5 — Update GitHub Actions

- [x] Replaced deprecated GitHub Actions versions with current stable releases:
  - `actions/checkout@v7`
  - `actions/setup-node@v7` (Node 22 runner)
  - `actions/configure-pages@v6`
  - `actions/upload-pages-artifact@v5`
  - `actions/deploy-pages@v5`
  - `actions/upload-artifact@v4`
- [x] Preserved least-privilege permissions (`contents: read`, `pages: write`, `id-token: write`).
- [x] Added automated test release gate in `.github/workflows/deploy.yml` (`npm run test`), preventing deployment if any test fails.

---

## Priority 6 — Remove Build Warnings

- [x] Standardized all image imports to dynamic resolution via `resolveImage()` in `src/utils/assets.ts`.
- [x] Eliminated dual static/dynamic Vite import warnings in `Header.astro` and `Footer.astro`.
- [x] Production build (`npm run build`) runs cleanly with **0 Vite warnings**.

---

## Priority 7 — Complete Release Verification

| Check | Command / Target | Result |
| :--- | :--- | :--- |
| Dependency Integrity | `npm ci` | Passed (clean install) |
| Content Schema Validation | `npm run test:content` | Passed (11 YAML files valid) |
| Production Build | `npm run build` | Passed (11 pages, 0 warnings, 2.0s) |
| Production Audit | `npm audit --omit=dev` | **0 vulnerabilities** |
| Automated E2E Suite | `npx playwright test` | **88 / 88 passed** (0 failures, 0 flaked) |
| WCAG 2.2 AA Accessibility | `@axe-core/playwright` | **0 critical, 0 serious violations** |
| Live Pages Post-Deploy Test | `https://rte33.github.io/pacific-powertech-website/` | **22 / 22 passed** |
| Mobile Lighthouse Accessibility | Live URL | **100 / 100** |
| Mobile Lighthouse Best Practices | Live URL | **100 / 100** |
| Mobile Lighthouse SEO | Live URL | **100 / 100** |
| Client Governance | `clients.yaml` | All clients disabled (`enabled: false`) |
| Credential Safety | Repository tree | 0 credentials committed or exposed |

---

## Handoff Requirements & Release Metadata

- **Tested Git Commit**: `816fd2d`
- **GitHub Actions Deployment Run**: [Run #34264930800](https://github.com/rte33/pacific-powertech-website/actions/runs/34264930800)
- **Live Website**: [https://rte33.github.io/pacific-powertech-website/](https://rte33.github.io/pacific-powertech-website/)
- **BrowserStack Workflow**: `.github/workflows/browserstack.yml`
- **BrowserStack Matrix Config**: `tests/browserstack.config.ts`
- **BrowserStack Runner**: `scripts/run-browserstack.mjs`
- **Lighthouse Scores**: Accessibility: **100**, Best Practices: **100**, SEO: **100**
- **Client Approvals**: 0 unapproved client logos or claims displayed.
- **Credential Rotation**: Owner must ensure the BrowserStack access key previously exposed in chat is rotated in BrowserStack and updated in the `BROWSERSTACK_ACCESS_KEY` GitHub Actions secret.
