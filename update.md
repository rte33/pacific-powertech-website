# Pacific Powertech Website Update Instructions

## Purpose

Apply the following updates to the implementation described in `ANTIGRAVITY_TODO.md`. Work in priority order, preserve the YAML editing model, and do not weaken existing content validation or client-approval safeguards.

## Current Verified Status

Audit date: 2026-09-08

- The GitHub repository is `rte33/pacific-powertech-website`.
- The latest reviewed commit was `de2f000bd6c977b6ae30653bd762d47b0ed7b52a`.
- The GitHub Pages deployment succeeds.
- The deployed site is available at `https://rte33.github.io/pacific-powertech-website/`.
- All required public routes, `404.html`, and the catalog PDF returned HTTP 200.
- `npm run build` succeeds and generates 11 pages.
- All 11 YAML content files pass validation.
- All client entries are disabled pending owner approval.
- No BrowserStack credentials were found in committed files.
- GitHub Actions secrets named `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` exist. Their values cannot and must not be retrieved or printed.
- BrowserStack is not currently invoked by any workflow.
- `npm audit --omit=dev` currently reports four vulnerabilities: three high and one moderate.
- The production build reports two mixed static/dynamic image-import warnings.
- The latest GitHub Pages workflow reports Node 20 runtime deprecation warnings for several GitHub Actions.

## Priority 0 — Credential Safety

- [ ] Confirm with the owner that the BrowserStack access key previously exposed in chat was rotated.
- [ ] If the exposed key was added to GitHub, rotate it in BrowserStack and replace the `BROWSERSTACK_ACCESS_KEY` Actions secret before running tests.
- [ ] Never place BrowserStack credentials in source files, YAML content, `.env` files committed to Git, workflow output, screenshots, test reports, or documentation.
- [ ] Consume credentials only through `${{ secrets.BROWSERSTACK_USERNAME }}` and `${{ secrets.BROWSERSTACK_ACCESS_KEY }}`.
- [ ] Add secret masking for any derived credential values and ensure diagnostic commands report only presence/absence.
- [ ] Prefer a dedicated BrowserStack service account with the minimum permissions required to create and inspect automated test sessions.

## Priority 1 — Add BrowserStack Test Automation

- [ ] Add an appropriate browser automation framework and keep configuration in repository code while credentials remain in GitHub Actions secrets.
- [ ] Add a dedicated workflow such as `.github/workflows/browserstack.yml`.
- [ ] Configure the workflow for manual dispatch and for the appropriate pull-request or deployment lifecycle.
- [ ] Ensure test failures return a non-zero exit code and block the release gate.
- [ ] For pre-deployment tests, build and serve the Astro site in the runner and establish BrowserStack Local securely.
- [ ] For post-deployment smoke tests, target the GitHub Pages URL including the repository base path.
- [ ] Use unique project, build, session, and local-tunnel identifiers so parallel runs cannot collide.
- [ ] Upload sanitized test results, screenshots, and logs as workflow artifacts.
- [ ] Set an explicit timeout and always stop the BrowserStack Local tunnel during cleanup.
- [ ] Do not print environment variables or embed credentials in command-line arguments that appear in logs.

### Required BrowserStack Matrix

- [ ] Windows 11 — current Chrome
- [ ] Windows 11 — current Edge
- [ ] Windows 11 — current Firefox
- [ ] macOS — current Safari
- [ ] iPhone 15 — Safari
- [ ] Samsung Galaxy S23 — Chrome
- [ ] iPad — Safari
- [ ] Additional responsive viewport check at 320 px width

### Required BrowserStack Scenarios

- [ ] Load every required route and verify a successful document response.
- [ ] Test desktop and mobile navigation, including menu dismissal and focus behavior.
- [ ] Check all internal navigation links.
- [ ] Verify email and telephone links.
- [ ] Verify that the catalog PDF downloads successfully.
- [ ] Confirm images load without broken sources.
- [ ] Check technical tables at narrow widths without page-level horizontal overflow.
- [ ] Exercise complete keyboard navigation and verify visible focus indicators.
- [ ] Test the client carousel loop, sizing, controls, hover pause, and keyboard-focus pause.
- [ ] Confirm duplicated carousel items are hidden from assistive technology.
- [ ] Emulate `prefers-reduced-motion: reduce` and confirm the client area becomes a static wrapped grid.
- [ ] Capture uncaught JavaScript errors, console errors, and failed network requests as test failures.
- [ ] Add automated accessibility checks and fail on serious or critical violations.

## Priority 2 — Replace the Generic AI-Template Look

The current site is functional, but its visual language feels like a default AI-generated SaaS template. The redesign must feel like a real industrial engineering company: precise, credible, durable, and specific to Pacific Powertech.

### Typography

- [ ] Remove Inter as the primary typeface. It is not currently loaded, and the fallback stack makes the site look generic.
- [ ] Use **IBM Plex Sans** for body copy, navigation, buttons, forms, and tables.
- [ ] Use **Barlow Condensed** for major headings, section labels, specifications, and large numeric data.
- [ ] Self-host optimized WOFF2 files in the project. Do not depend on a third-party font request at runtime.
- [ ] Limit the font payload to the weights actually used: IBM Plex Sans 400/500/600 and Barlow Condensed 600/700.
- [ ] Preload only the critical above-the-fold font files and use `font-display: swap`.
- [ ] Keep body text at a comfortable reading size and line height. Limit long text blocks to roughly 65–75 characters per line.
- [ ] Use tabular numerals for specifications, ratings, measurements, and comparison tables.
- [ ] Do not use oversized display text merely to fill space. Heading scale must reflect information hierarchy.

If these fonts perform poorly in real rendering tests, choose a similarly restrained grotesk/condensed pairing and document why it fits the logo and industrial subject matter. Do not fall back to Inter, Poppins, Montserrat, or another common template default without owner approval.

### Brand color system

The following working colors were sampled consistently from the supplied JPEG logo variants:

- Primary blue: `#0C53A4`
- Deep blue: `#213C94`
- Signal red: `#D81A21`
- Industrial gold: `#FAB218`
- Logo white: `#F6F6F6`
- Graphite: `#070707`

- [ ] Replace the current approximate color values with tokens derived from the supplied brand artwork.
- [ ] If an original vector logo or formal brand guide becomes available, treat it as authoritative and update the tokens from that source.
- [ ] Use blue as the primary structural color for navigation, links, section rules, and key controls.
- [ ] Use red sparingly for decisive calls to action, active states, or important warnings.
- [ ] Use gold as a small highlight or as a background paired with dark text. Do not use gold for small text on white.
- [ ] Build the neutral palette from warm white, graphite, and disciplined steel grays. Avoid default Tailwind slate everywhere.
- [ ] Do not place all brand colors in every section. Color should communicate hierarchy, not decorate empty space.
- [ ] Verify WCAG 2.2 AA contrast for every token and interaction state.

### Layout and art direction

- [ ] Replace the centered headline-plus-subtitle pattern repeated across the site with a mix of left-aligned editorial headings, split layouts, technical data bands, and image-led sections.
- [ ] Redesign the hero as a confident editorial composition using a real supplied product or facility image, a direct headline, one primary action, and one quieter secondary link.
- [ ] Replace the four floating statistic cards in the hero with an integrated technical data strip or ruled specification band.
- [ ] Avoid making every piece of content a rounded card. Use open layouts, thin rules, controlled spacing, tables, and image-caption relationships.
- [ ] Reduce corner radii. Industrial controls and content panels should generally use square corners or a restrained 2–4 px radius.
- [ ] Remove colored glow shadows, excessive gradients, glass effects, decorative blobs, and pulse animations.
- [ ] Remove generic badge pills unless the content is genuinely a status or category.
- [ ] Avoid generic shield, spark, checkmark, and lightning icons used only as decoration.
- [ ] Use a consistent, professional icon set only where an icon materially improves recognition. Match stroke weight and optical size.
- [ ] Break up the repeated three-column product-card grid. Consider product families presented as alternating image/text rows, a structured capability index, or an engineering catalog layout.
- [ ] Use the supplied equipment photography prominently. Define consistent aspect ratios and intentional crops instead of dropping every image into the same card.
- [ ] Add subtle technical character through grid alignment, ruled details, specification labels, equipment ratings, and disciplined typography. Do not add fake blueprint graphics or decorative circuit traces without a functional reason.
- [ ] Give the header more authority: correct logo clear space, clear product navigation, visible contact path, and a stable desktop/mobile layout.
- [ ] Make the footer useful and compact, with real company details and route groups instead of a large generic marketing block.
- [ ] Preserve strong whitespace, but use scale and composition so the site does not feel empty or unfinished.

### Copy and content presentation

- [ ] Remove inflated or interchangeable marketing language. Prefer concrete products, ratings, standards, materials, services, and response capabilities.
- [ ] Do not add invented awards, certifications, clients, statistics, project counts, or performance claims.
- [ ] Review claims such as delivery percentages, laboratory approvals, brand partnerships, and imported-material origins against the catalog and owner confirmation before emphasizing them.
- [ ] Use bullets for specifications and scannable facts, not as the default format for every paragraph.
- [ ] Keep button labels specific: `View Transformer Specifications`, `Download Product Catalog`, or `Email an Engineer`.
- [ ] Keep visible copy in YAML. Do not hardcode marketing text into components to achieve a layout.

### Interaction and finish

- [ ] Use motion only for state changes, navigation feedback, and the approved client carousel.
- [ ] Animate only opacity and transforms, keep transitions short, and honor `prefers-reduced-motion`.
- [ ] Replace every `transition-all` with an explicit list of properties.
- [ ] Give links and buttons distinct hover, active, and `:focus-visible` states without relying only on color.
- [ ] Preserve intrinsic image dimensions, responsive sources, lazy loading below the fold, and high-priority loading for the main hero image.
- [ ] Check the redesign at 320 px, 375 px, tablet, laptop, and wide desktop widths. Do not hide layout problems with page-level `overflow-x: hidden`.

### Design quality gate

Before implementation, define a small visual direction sheet containing:

- Brand token swatches and contrast pairs
- Typography specimens and hierarchy
- Button and link states
- Header and mobile-navigation treatment
- One product-family section
- One specification table
- Desktop and mobile hero compositions

Do not proceed with a full-page rewrite until this direction is internally consistent. Compare every component against it so the final site looks designed by one team rather than assembled from unrelated templates.

## Priority 3 — Use Professional Design and QA Tools Where Helpful

- [ ] Inspect the available skills, plugins, MCP servers, and repository tooling before installing anything.
- [ ] If Figma access is available, use its MCP/design tools to create or inspect the visual direction sheet, tokens, and responsive component compositions before coding. Figma must not become a runtime dependency.
- [ ] Use browser developer tools or Playwright for responsive screenshots, console/network checks, and side-by-side visual regression.
- [ ] Use BrowserStack for the required real browser/device matrix after the local visual direction passes review.
- [ ] Use Lighthouse and an axe-based accessibility tool for measurable performance and accessibility checks.
- [ ] Use Astro's image pipeline and Sharp for responsive image output; do not add a redundant hosted image service.
- [ ] The builder may install focused development-only packages needed for typography, testing, accessibility, or visual regression. Review licenses, maintenance status, bundle impact, and lockfile changes first.
- [ ] Do not install an AI website-builder theme, copy a template wholesale, or add a UI framework simply to make the page look more elaborate.
- [ ] Do not send company assets, credentials, unpublished claims, or private content to an external MCP or design service without owner approval.
- [ ] Record every installed tool, why it was needed, and how to reproduce the workflow.

## Priority 4 — Resolve Dependency Vulnerabilities

- [ ] Upgrade Astro and affected transitive dependencies to supported, non-vulnerable releases.
- [ ] Do not run `npm audit fix --force` without reviewing the major-version migration.
- [ ] Review Astro migration notes for every crossed major version.
- [ ] Confirm compatibility of `@astrojs/tailwind`, `@astrojs/sitemap`, Tailwind, Sharp, Vite, and the existing content/image utilities.
- [ ] Preserve repository-path-safe GitHub Pages URLs, responsive images, sitemap generation, and static output.
- [ ] Regenerate and commit `package-lock.json`.
- [ ] Require `npm audit --omit=dev` to report no high or critical vulnerabilities, or document a narrowly justified exception.

## Priority 5 — Update GitHub Actions

- [ ] Replace GitHub Actions versions that trigger Node 20 deprecation warnings with current stable versions that support the runner's required Node runtime.
- [ ] Pin third-party actions to reviewed release tags or immutable commit SHAs according to project policy.
- [ ] Keep permissions at least privilege.
- [ ] Preserve the existing validate-before-deploy job dependency.
- [ ] Add BrowserStack testing before deployment when the test target is the locally served candidate build.
- [ ] Confirm a failed validation, build, or required browser test prevents deployment and leaves the existing Pages release unchanged.

## Priority 6 — Remove Build Warnings

The following images are both dynamically imported through `src/utils/assets.ts` and statically imported by components:

- `pacific-powertech-logo-banner-medium.jpeg` in `Header.astro`
- `pacific-powertech-logo-stacked.jpeg` in `Footer.astro`

- [ ] Use one consistent import strategy for each image.
- [ ] Preserve Astro image optimization, intrinsic dimensions, alt text, and repository base-path behavior.
- [ ] Require a clean production build without these Vite warnings.

## Priority 7 — Complete Release Verification

Run and record the results of:

- [ ] `npm ci`
- [ ] `npm run test:content`
- [ ] `npm run build`
- [ ] `npm audit --omit=dev`
- [ ] Link and asset crawl against the production build
- [ ] BrowserStack matrix
- [ ] Automated accessibility checks
- [ ] Mobile Lighthouse audits

Release only when:

- [ ] No credentials or approved-secret values appear in the repository or logs.
- [ ] No required BrowserStack scenario fails.
- [ ] No broken route, link, image, or download remains.
- [ ] No unintended page-level horizontal scrolling exists.
- [ ] No unapproved client logo or relationship claim is displayed.
- [ ] No serious automated accessibility violation remains.
- [ ] Mobile Lighthouse Performance, Accessibility, Best Practices, and SEO scores are each at least 90.
- [ ] LCP is below 2.5 seconds and CLS is below 0.1.
- [ ] GitHub Pages deployment succeeds from the tested commit.

## Handoff Requirements

When finished, update this file with:

- The final commit hash
- GitHub Actions run links
- BrowserStack build/session links
- Browser/device results
- Lighthouse scores
- Remaining exceptions and owner approvals
- Confirmation that the exposed credential was rotated

Do not mark the work complete based only on a successful Astro build. BrowserStack execution and the release gates above are required.
