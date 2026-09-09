# Content Editing Guide for Pacific Powertech Ltd. Website

This guide explains how company staff can safely update, add, or edit website content directly through GitHub's web interface without touching code or installing any software.

---

## 1. Where Content Lives

All website text, company information, product specifications, and settings are stored in **YAML files** located in the `src/content/` folder:

| File Location | What it Controls |
| :--- | :--- |
| `src/content/settings/site.yaml` | Company address, telephone numbers, emails, navigation links, and certifications |
| `src/content/settings/clients.yaml` | Client and partner company registry, official website links, and approval status |
| `src/content/pages/home.yaml` | Homepage headline, key statistics, featured products, and capability highlights |
| `src/content/pages/about.yaml` | Company story, vision, mission statements, manufacturing infrastructure, and standards |
| `src/content/pages/contact.yaml` | Office hours, hotline numbers, pre-filled quotation templates, and map details |
| `src/content/pages/products/transformers.yaml` | Transformer specifications, loss tables, dimensions, cooling options, and testing procedures |
| `src/content/pages/products/lt-switchgear.yaml` | LT Switchgear, ACB/VCB/MCCB breaker ratings, 7-tank powder coating details, and technical tables |
| `src/content/pages/products/pfi-systems.yaml` | Power Factor Improvement plants, capacitor banks, PFC relay descriptions, and formulas |
| `src/content/pages/products/ht-switchgear.yaml` | 11 kV HT Switchgear, ABB VD4 vacuum breakers, Load Break Switches (LBS), and surge arresters |
| `src/content/pages/products/industrial-automation.yaml` | PLC/HMI/SCADA panels, Motor Control Centers (MCC), VFDs, and 10 manufacturing benefits |
| `src/content/pages/products/services.yaml` | Engineering services (AMC, utility load sanction documentation, field installation) and industry sectors |

---

## 2. How to Edit a Page on GitHub (Web Interface)

1. Open your repository on **GitHub.com**.
2. Navigate to the file you wish to change (e.g., click `src` &rarr; `content` &rarr; `settings` &rarr; `site.yaml`).
3. Click the **Pencil icon** (Edit this file) in the top-right corner.
4. Make your text edits following the YAML syntax rules below.
5. Scroll to the bottom of the page to **Commit changes**:
   - Write a short description (e.g. `Update office contact phone number`).
   - Leave "Commit directly to the `main` branch" selected (or select a pull request branch if using a review workflow).
   - Click **Commit changes**.
6. The automated system will immediately validate your changes and publish the site.

---

## 3. Important Rules When Editing YAML

YAML is designed to be human-readable, but follows strict indentation rules:

### A. Indentation Matters
- Always use **2 spaces** for indentation. **Never use the Tab key**.
- Align sub-items directly under their parent keys.

### B. Use Quotes for Text with Special Characters
If your text contains colons (`:`), dashes (`-`), exclamation marks (`!`), or quotes, wrap the entire text in double quotes:
```yaml
# Good:
tagline: "Reliable 24/7 Substation & Automation Solutions"

# Bad (may break the build):
tagline: Reliable 24/7: Substation & Automation Solutions
```

### C. Do NOT Use Raw HTML Tags
For security and layout stability, raw HTML tags (like `<p>`, `<b>`, `<div>`, `<span>`, `<br>`) are strictly forbidden in YAML files. The automated build system will reject any file containing HTML tags.

---

## 4. Uploading New Images

If you have a new photo to include on a product page:

1. On GitHub, navigate to `src/assets/images/`.
2. Click **Add file** &rarr; **Upload files**.
3. Drag and drop your image file (use standard formats: `.jpeg`, `.jpg`, `.png`, `.webp`).
4. Give the file a clean, lowercase name separated by hyphens (e.g., `dry-type-transformer-substation.jpeg`).
5. Commit the new file.
6. Now reference that exact filename in your YAML file (e.g., `image: "dry-type-transformer-substation.jpeg"`).

### Updating the Certifications & Approvals Row

The three compact official marks at the bottom of the dark footer are maintained under `company.approvalMarks` in `src/content/settings/site.yaml`. Each entry contains the organization name, the exact approval statement, a local logo filename, accessible alternative text, and the official artwork source.

- Upload replacement artwork to `src/assets/images/` before changing the `logo` filename.
- Use only artwork obtained from the named organization's official website or official brand resources.
- Keep `sourceUrl` as a private editorial record of where the artwork was obtained. The certification marks are intentionally non-interactive and must not be wrapped in links.
- Do not change an approval statement unless the company has current documentation supporting the claim.

---

## 5. Managing Technology & Component Brand Logos

Per company governance, unapproved client logos must **never** appear publicly:

1. Open `src/content/settings/clients.yaml`.
2. Every client has an `enabled:` setting:
   ```yaml
   - id: "desco"
     name: "Dhaka Electric Supply Company Limited (DESCO)"
     logo: "desco-logo.jpeg"
     sourceUrl: "https://www.desco.org.bd"
     altText: "DESCO official logo"
     order: 1
     enabled: false # Change to true ONLY after signing off in docs/CLIENT_APPROVAL_CHECKLIST.md
   ```
3. Keep `enabled: false` until the relationship claim and official logo have been reviewed and approved in `docs/CLIENT_APPROVAL_CHECKLIST.md`.

---

## 6. How Publishing Works & Understanding Build Errors

Every time you save a change on GitHub, an automated robot (**GitHub Actions**) tests your content:

1. **Content Check**: Validates that all required fields exist, no HTML tags are present, and every referenced image actually exists.
2. **Build**: Converts the YAML and Astro templates into high-speed, mobile-optimized web pages.
3. **Deploy**: Publishes the update to GitHub Pages.

### What happens if an error occurs?
- If you make a mistake (e.g., mistyping a filename or using bad YAML indentation), **the build will fail and stop**.
- **The live website will NOT break or be replaced**. The existing live site stays safe and online.
- You can click on the red `X` next to your commit on GitHub, select "Details", and view the error message pointing directly to the filename and line number that needs correction.

---

## 7. Reverting to an Older Version (Undo)

If you made a change and want to restore an earlier version:
1. Navigate to the file on GitHub.
2. Click the **History** button at the top right of the file view.
3. Click on the commit where the file was working correctly.
4. Click the three dots (`...`) &rarr; **View file at this point**.
5. Copy the contents, navigate back to the current file, edit, paste the known-good content, and commit.
