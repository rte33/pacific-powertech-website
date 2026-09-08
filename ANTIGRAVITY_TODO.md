# TODO: Build the Pacific Powertech Website

## Owner

Antigravity

## Objective

Build and publish a professional, English-language Astro website for Pacific Powertech Ltd. The primary audience is industrial and business buyers. Use simple YAML files for editable content and derive the visual design from the supplied company logo and catalog.

The completed website must be deployable to GitHub Pages, pass the validation and release criteria below, and be ready for supervised BrowserStack testing.

## Content and Editing System

- [ ] Use YAML as the single source of editable content.
- [ ] Create one YAML file per page plus shared company/settings and client-logo files.
- [ ] Use this structure:

      src/content/settings/site.yaml
      src/content/settings/clients.yaml
      src/content/pages/home.yaml
      src/content/pages/about.yaml
      src/content/pages/contact.yaml
      src/content/pages/products/*.yaml

- [ ] Support editable page titles, SEO descriptions, hero content, sections, lists, calls to action, images, product features, applications, and specification tables.
- [ ] Define every client entry with company name, logo filename, official source URL, accessibility label, display order, and enabled/disabled status.
- [ ] Validate all YAML and referenced images during every build.
- [ ] Make invalid content fail the build with a clear filename and field-level error.
- [ ] Ensure a failed build does not replace the existing live site.
- [ ] Keep layout, colors, animation, components, and responsive behavior in Astro code so content editors cannot damage the design through YAML edits.
- [ ] Do not allow raw HTML in YAML content.
- [ ] Resolve uploaded images through a controlled asset map.
- [ ] Generate responsive AVIF and WebP images with suitable fallbacks.
- [ ] Write a non-technical editing guide for GitHub's web interface covering content updates, reordering, image uploads, publishing, validation errors, and version restoration.

## Required Routes

- [ ] Home
- [ ] About
- [ ] Products/Solutions overview
- [ ] Transformers
- [ ] LT Switchgear
- [ ] PFI Systems
- [ ] HT Switchgear
- [ ] Industrial Automation and Control Panels
- [ ] Engineering Services and Industry Expertise
- [ ] Contact
- [ ] Useful custom 404 page

## Content Requirements

- [ ] Convert the supplied catalog into structured web content.
- [ ] Preserve all technical values and claims accurately.
- [ ] Correct spelling and grammar without changing technical meaning.
- [ ] Present company capabilities rather than named project case studies.
- [ ] Make the original catalog available as a downloadable PDF.
- [ ] Use prefilled email inquiry links addressed to `info@pacificpowertech.com.bd`.

## Visual and Interaction Design

- [ ] Extract exact design tokens from the supplied logo and catalog.
- [ ] Use an industrial, premium visual style with restrained motion.
- [ ] Make technical tables horizontally scrollable on narrow screens without causing page-level horizontal overflow.
- [ ] Provide clear keyboard focus states and WCAG 2.2 AA interaction and contrast fundamentals.
- [ ] Ensure the full site works at 320 px width.

## Companies We've Worked With

Add this section directly above the footer.

- [ ] Locate candidate client logos only on official company websites or official brand-resource pages.
- [ ] Prepare an approval checklist containing each company name, official source, proposed logo, and enabled status.
- [ ] Keep every client disabled until the website owner approves both the company relationship claim and the logo.
- [ ] Never show disabled or unapproved clients publicly.
- [ ] Normalize visual logo dimensions without distorting the marks.
- [ ] Implement slow, seamless horizontal movement with no flash or abrupt reset.
- [ ] Pause motion on hover and keyboard focus.
- [ ] Show visible controls whenever users can navigate the carousel manually.
- [ ] Under `prefers-reduced-motion`, replace the moving carousel with a static wrapped logo grid.
- [ ] Hide duplicated looping copies from assistive technology.
- [ ] Give logos meaningful accessible names and maintain sufficient contrast.

## SEO and Platform Requirements

- [ ] Add canonical and Open Graph metadata.
- [ ] Add appropriate Organization and Product structured data.
- [ ] Generate a sitemap and `robots.txt`.
- [ ] Add a favicon based on approved brand material.
- [ ] Configure Astro for repository-path-safe GitHub Pages deployment and easy later custom-domain activation.
- [ ] Create GitHub Actions workflows that validate content, run tests/builds, and deploy only after success.
- [ ] Do not add a backend, ecommerce system, contact-form service, database, or CMS.

## Publishing Workflow

- [ ] Extract catalog content and create the YAML content files.
- [ ] Build the complete site and publish a GitHub Pages preview.
- [ ] Submit the candidate client-logo approval checklist.
- [ ] Confirm that unapproved client entries remain disabled and absent from the public build.
- [ ] Configure successful GitHub Actions builds to deploy automatically.
- [ ] Keep BrowserStack credentials only in secure environment variables; never commit them.
- [ ] Address audit findings and rerun failed scenarios plus regression checks until all release gates pass.

## Browser and Device Test Matrix

- [ ] Windows 11: current Chrome, Edge, and Firefox
- [ ] macOS: current Safari
- [ ] iPhone 15: Safari
- [ ] Samsung Galaxy S23: Chrome
- [ ] iPad: Safari
- [ ] Additional responsive check at 320 px width

## Functional and Content Tests

- [ ] Test every route, mobile navigation, images, technical tables, catalog download, email and telephone links, keyboard navigation, focus states, and reduced-motion behavior.
- [ ] Test the client carousel for seamless looping, consistent logo sizing, pause behavior, keyboard accessibility, narrow-screen layout, duplicate screen-reader announcements, and its reduced-motion static state.
- [ ] Test valid YAML edits, reordered sections and clients, enabled/disabled clients, image replacements, missing files, malformed YAML, and empty optional fields.

## Defect Reporting Format

For every defect, record severity, device/browser, reproduction steps, expected result, actual result, recommended correction, and retest condition.

## Release Gates

- [ ] No broken routes, assets, links, downloads, or console errors.
- [ ] No unintended horizontal page scrolling.
- [ ] No unapproved client logos or relationship claims.
- [ ] No serious automated accessibility violations.
- [ ] WCAG 2.2 AA interaction and contrast fundamentals pass.
- [ ] Mobile Lighthouse Performance, Accessibility, Best Practices, and SEO scores are each at least 90.
- [ ] Largest Contentful Paint is below 2.5 seconds.
- [ ] Cumulative Layout Shift is below 0.1.

## Fixed Decisions and Assumptions

- Astro and YAML are the approved implementation choices.
- Use one YAML file per page, with shared settings and client-logo data stored separately.
- The supplied assets and catalog are the authoritative initial content sources.
- The builder may locate official client logos, but the website owner must supply or confirm the client list and approve every public relationship claim and logo before launch.
- Version one is English-only and initially uses the project's GitHub Pages URL.
- BrowserStack credentials will be supplied securely and must never enter the repository.

## Definition of Done

The task is complete only when the site is implemented, content is editable through the documented YAML structure, a passing GitHub Pages build is available, unapproved clients remain unpublished, the editing guide and approval checklist are delivered, and every release gate above has passed or has an explicitly documented owner-approved exception.
