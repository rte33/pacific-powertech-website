# Pacific Powertech Website — Current Implementation Handoff

Last updated: 2026-09-09

This file records the latest owner-approved direction and overrides conflicting visual instructions in `ANTIGRAVITY_TODO.md`. Treat the implementation in the working tree as the source of truth. Do not restore older template styling.

## Required Brand Treatment

- The header and footer must not use the supplied JPEG wordmark banners: their white rectangular background is not acceptable on the dark navigation surface.
- `src/components/BrandLockup.astro` is the approved replacement. It clips the supplied circular Pacific symbol cleanly and renders the company name as white HTML text with no backing panel.
- Keep the company name uppercase, the tagline white, and the lockup background transparent.
- Use locally bundled Archivo for display typography and Source Sans 3 for body copy, navigation, forms, and controls.
- Continue using the logo-derived palette: primary blue `#0C53A4`, dark navy `#031525`, gold `#FAB218`, red `#D81A21` only where it carries meaning, and neutral white/slate surfaces.
- Do not introduce hatch, crosshatch, dot-grid, glow, floating-pill, glassmorphism, decorative blob, or generic AI-dashboard effects.
- Do not put the technology logos inside white cards or decorative boxes.
- Do not display decorative sequence numbers such as `01`, `02`, `03`, `SECTION 01`, or `SPEC 01`. Technical ratings, dates, quantities, standards, voltages, capacities, and 24/7 availability are meaningful content and must remain.

## Page-Specific Design System

Only the homepage uses the immersive `HERO.jpeg` photographic treatment with a transparent navy overlay. Internal routes intentionally use different structures according to their purpose:

- **Home:** photographic hero, featured systems, horizontally scrolling catalog rail, engineering pillars.
- **About:** light editorial masthead, founder-year marker, long-form company story, split vision/mission section, staggered facilities, standards dossier, engineering pillars.
- **Products & Solutions:** dark technical catalog cover, operating-range summary, horizontal additional-products rail, editorial product index without decorative numbering.
- **Product details:** light split technical masthead with the product image, clean operating-rating index, editorial feature sections, specifications, gallery and inquiry actions.
- **Engineering Services:** light lifecycle masthead, unnumbered service process, dark industry-experience section, critical-infrastructure index.
- **Contact:** dark-navy direct-engineering-desk masthead with priority hotline and email channels; a restrained office-information column; a spacious white project-inquiry form; and simple divided email-template rows. Keep its hierarchy and typography distinct from the other pages.
- **404:** dark utility layout with oversized error code and direct route index.

`src/components/PageHero.astro` was deliberately removed. Do not recreate one shared homepage-like hero for every route.

## Technology & Component Brands

The bottom section is a static, accessible logo field maintained by `src/components/ClientCarousel.astro` and `src/content/settings/clients.yaml`.

- It must remain titled **Technology & Component Brands**. These marks describe equipment/component brands, not customers, partners, or endorsements.
- The owner approved all ten displayed brand names on 2026-09-08.
- The old cropped `technology-brands.png` screenshot is no longer used for rendering.
- Individual official web/vector assets now render for Mitsubishi Electric, ABB, Fuji Electric, LS Electric, Siemens, Selec Controls, Schneider Electric, CHINT, Togami Electric, and HD Hyundai Electric.
- LS Electric and HD Hyundai Electric use their current identities; do not restore the obsolete “LSIS” or “Hyundai Heavy Industries” labels.
- The section has no autoplay, marquee duplicates, pause/resume button, cards, or boxed backgrounds. Do not restore them.
- The extra “Specified components” eyebrow has been removed so the section opens directly with its title and supporting sentence.
- Every mark links to the official company site, has a meaningful accessible name, and is optimized through Astro’s image pipeline.
- Any future customer or partner claim still requires separate written owner approval. See `docs/CLIENT_APPROVAL_CHECKLIST.md`.

## Certifications & Approvals

- **Certifications & Approvals** is a compact row at the bottom of the existing dark footer on every route; it is not a separate page panel.
- It displays three distinct official marks: the BSTI standard mark, the BUET seal, and the Government of the People's Republic of Bangladesh emblem.
- The artwork is stored locally as transparent assets: `bsti-standard-mark.svg`, `buet-official-seal.svg`, and `bangladesh-government-emblem.png` in `src/assets/images/`. Do not restore the former white-background JPEG versions.
- The corresponding names, approval statements, accessible labels, and official artwork sources are maintained in `company.approvalMarks` inside `src/content/settings/site.yaml`.
- Each item uses a 56 × 44 px logo, a gold approval check-badge vector downloaded from the official Heroicons repository (`approval-check-badge.svg`), and the original approval wording: **Approved Test Laboratory by BSTI**, **BUET Tested & Certified Instruments**, and **Electrical Licensing Authority Approved**.
- The marks are intentionally non-interactive and have no links. Keep the row static, compact, unboxed, inside the footer, and free of carousel controls or decorative effects.
- Do not strengthen, broaden, or otherwise change these approval statements without current company documentation.

## Catalog Product Rail

`src/components/HorizontalProductRail.astro` provides a touch-friendly horizontal browser on the homepage and Products overview. Its 13 entries are maintained in `src/content/pages/home.yaml` and were extracted from `Assets/PPL Catalog.pdf`.

The rail must stay horizontally usable without creating page-level overflow. Desktop arrow controls, keyboard focus, touch scrolling, scroll snapping, and reduced-motion behavior are implemented and tested.

## 2026-09-09 Site-Wide Visual Audit

- The type system is standardized on locally bundled **Archivo 700** for headings and **Source Sans 3 400/600/700** for body copy, navigation, labels and controls. Do not introduce monospace or unrelated display faces into public-facing UI.
- The header brand lockup now uses less compressed title tracking and a larger, more readable white tagline while retaining the transparent treatment requested by the owner.
- Dense product-detail card grids were replaced with editorial rules, whitespace and brand-blue accents. Supporting copy is now at least 14 px; operating labels and values wrap instead of clipping.
- The reusable product card, technical tables, borders and copy now use the same navy/slate palette as the rest of the site. Decorative red was removed from the About page; red remains only where it signals category identity or emergency information.
- Contact controls use consistent 52 px minimum heights, readable placeholders, appropriate input semantics, and keyboard-only focus treatment. Page headings, section labels and calls to action were normalized without making the route designs identical.
- Invalid opacity/min-height utilities and inconsistent focus states were corrected. The global theme color, reduced-motion behavior, touch interaction hinting and readable text wrapping are retained.
- The favicon now uses `public/favicon-transparent.png`, a transparent-background version of the circular Pacific Powertech mark. Do not restore the former white-background favicon references.
- This was a source and production-build audit only. Playwright and BrowserStack were deliberately not run because the owner asked to postpone browser automation until later.

## Content and Validation Rules

- YAML remains the only editor-facing content source.
- Do not add raw HTML to YAML.
- Keep image references inside the controlled asset map in `src/utils/assets.ts`.
- Both raster images and SVG logo assets are validated during the build.
- Invalid YAML or missing images must fail the build.
- Keep GitHub Pages repository-base-path behavior intact.
- Do not add a CMS, backend, database, ecommerce system, or hosted contact form.

## Verification Completed Locally

| Check | Result |
| --- | --- |
| YAML and asset validation | 11 content files passed |
| Production Astro build | 11 pages generated successfully |
| Local preview HTTP smoke check | 10 / 10 principal routes returned HTTP 200 after the visual audit |
| Full Playwright regression suite | 96 / 96 passed after the 2026-09-09 visual refinements, including every-route proportion and overflow checks |
| Viewports | Desktop Chrome, Galaxy mobile, iPhone mobile, 320 px narrow |
| Automated accessibility run | 0 serious or critical axe violations on the tested routes after the visual refinements |
| Page-level horizontal overflow | None across all routes at desktop, Galaxy, iPhone and 320 px viewports |
| Console and image errors | None on tested routes |
| Client relationship claims | None published |
| Approved component brands | 10 enabled |

## Publishing Status

The 2026-09-09 redesign, responsive fixes, approved technology-brand assets, certification treatment and transparent favicon are implemented and verified. The owner approved this release for publication to `main`; this handoff is included with that release.

The local production preview is available at:

`http://localhost:4321/pacific-powertech-website/`

After the release reaches GitHub, confirm the Pages deployment workflow completes and review the public repository-path URL before assigning a custom domain.
