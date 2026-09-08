#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { z } from 'zod';

const ROOT_DIR = process.cwd();
const CONTENT_DIR = path.join(ROOT_DIR, 'src', 'content');
const ASSETS_IMAGE_DIR = path.join(ROOT_DIR, 'src', 'assets', 'images');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

let totalErrors = 0;
let checkedFiles = 0;

function logError(file, message, details = null) {
  totalErrors++;
  console.error(`\x1b[31m[VALIDATION ERROR]\x1b[0m ${file}: ${message}`);
  if (details) {
    console.error(`   \x1b[90mDetails:\x1b[0m ${JSON.stringify(details, null, 2)}`);
  }
}

function checkForRawHtml(value, filePath, currentPath = '') {
  const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;
  if (typeof value === 'string') {
    if (htmlTagRegex.test(value)) {
      logError(
        filePath,
        `Raw HTML detected in field "${currentPath}". Content editors must not use raw HTML.`,
        { snippet: value.slice(0, 100) }
      );
    }
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => {
      checkForRawHtml(item, filePath, `${currentPath}[${index}]`);
    });
  } else if (value !== null && typeof value === 'object') {
    Object.entries(value).forEach(([k, v]) => {
      checkForRawHtml(v, filePath, currentPath ? `${currentPath}.${k}` : k);
    });
  }
}

function verifyAssetExists(assetRef, filePath, currentPath) {
  if (typeof assetRef !== 'string' || !assetRef.trim()) return;

  // If path starts with /assets/ or /
  if (assetRef.startsWith('/')) {
    const publicPath = path.join(PUBLIC_DIR, assetRef.replace(/^\//, ''));
    if (!fs.existsSync(publicPath)) {
      logError(filePath, `Referenced public asset does not exist at "${publicPath}"`, {
        field: currentPath,
        reference: assetRef,
      });
    }
    return;
  }

  // Otherwise assume it's in src/assets/images
  const imagePath = path.join(ASSETS_IMAGE_DIR, assetRef);
  const publicAssetPath = path.join(PUBLIC_DIR, 'assets', assetRef);
  if (!fs.existsSync(imagePath) && !fs.existsSync(publicAssetPath)) {
    logError(
      filePath,
      `Referenced image does not exist in src/assets/images/ or public/assets/`,
      { field: currentPath, reference: assetRef }
    );
  }
}

function checkAllAssets(value, filePath, currentPath = '') {
  if (typeof value === 'string') {
    const isImageField =
      /(image|logo|photo|banner|catalogPdf|asset)$/i.test(currentPath) ||
      /\.(jpeg|jpg|png|webp|avif|svg|pdf)$/i.test(value);
    if (isImageField) {
      verifyAssetExists(value, filePath, currentPath);
    }
  } else if (Array.isArray(value)) {
    value.forEach((item, index) => {
      checkAllAssets(item, filePath, `${currentPath}[${index}]`);
    });
  } else if (value !== null && typeof value === 'object') {
    Object.entries(value).forEach(([k, v]) => {
      checkAllAssets(v, filePath, currentPath ? `${currentPath}.${k}` : k);
    });
  }
}

// Zod Schemas
const SiteSchema = z.object({
  company: z.object({
    name: z.string().min(1),
    legalName: z.string().min(1),
    shortName: z.string().min(1),
    tagline: z.string().min(1),
    established: z.number().int(),
    employees: z.number().int(),
    address: z.object({
      street: z.string(),
      area: z.string(),
      city: z.string(),
      postalCode: z.string(),
      country: z.string(),
      full: z.string(),
    }),
    contact: z.object({
      primaryPhone: z.string(),
      secondaryPhone: z.string(),
      email: z.string().email(),
      salesEmail: z.string().email(),
      supportEmail: z.string().email(),
      website: z.string().url(),
    }),
    branding: z.object({
      logoBannerWide: z.string(),
      logoBannerMedium: z.string(),
      logoStacked: z.string(),
      logoIcon: z.string(),
      catalogPdf: z.string(),
    }),
    certifications: z.array(z.string()).min(1),
  }),
  navigation: z.array(
    z.object({
      title: z.string(),
      path: z.string(),
      children: z
        .array(
          z.object({
            title: z.string(),
            path: z.string(),
            description: z.string().optional(),
          })
        )
        .optional(),
    })
  ),
  seo: z.object({
    defaultTitle: z.string(),
    titleTemplate: z.string(),
    defaultDescription: z.string(),
    openGraphType: z.string(),
    locale: z.string(),
  }),
});

const ClientItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  shortName: z.string().min(1),
  logo: z.string().min(1),
  sourceUrl: z.string().url(),
  altText: z.string().min(1),
  order: z.number().int(),
  enabled: z.boolean(),
  category: z.string().optional(),
  statusNote: z.string().optional(),
});

const ClientsSchema = z.object({
  clients: z.array(ClientItemSchema),
});

const MetaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

const HomeSchema = z.object({
  meta: MetaSchema,
  hero: z.object({
    badge: z.string(),
    headline: z.string(),
    subheadline: z.string(),
    primaryCta: z.object({ label: z.string(), url: z.string() }),
    secondaryCta: z.object({ label: z.string(), url: z.string() }),
    emergencyCta: z.object({ label: z.string(), url: z.string() }),
    stats: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
        subtext: z.string(),
      })
    ),
  }),
  featuredSolutions: z.object({
    sectionTitle: z.string(),
    sectionSubtitle: z.string(),
    items: z.array(
      z.object({
        title: z.string(),
        slug: z.string(),
        image: z.string(),
        summary: z.string(),
        highlights: z.array(z.string()),
        url: z.string(),
      })
    ),
  }),
  manufacturingPillars: z.object({
    title: z.string(),
    subtitle: z.string(),
    pillars: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        description: z.string(),
      })
    ),
  }),
  catalogCta: z.object({
    badge: z.string(),
    title: z.string(),
    description: z.string(),
    buttonText: z.string(),
    buttonUrl: z.string(),
    inquiryText: z.string(),
    inquiryUrl: z.string(),
  }),
});

const AboutSchema = z.object({
  meta: MetaSchema,
  header: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
  }),
  story: z.object({
    title: z.string(),
    paragraphs: z.array(z.string()).min(1),
  }),
  visionMission: z.object({
    vision: z.object({ title: z.string(), statement: z.string() }),
    mission: z.object({ title: z.string(), statement: z.string() }),
  }),
  infrastructure: z.object({
    title: z.string(),
    subtitle: z.string(),
    facilities: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
      })
    ),
  }),
  complianceStandards: z.object({
    title: z.string(),
    items: z.array(z.object({ code: z.string(), description: z.string() })),
  }),
  teamValues: z.object({
    title: z.string(),
    values: z.array(
      z.object({
        number: z.string(),
        name: z.string(),
        description: z.string(),
      })
    ),
  }),
});

const ContactSchema = z.object({
  meta: MetaSchema,
  header: z.object({
    badge: z.string(),
    title: z.string(),
    subtitle: z.string(),
  }),
  office: z.object({
    name: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string(),
    country: z.string(),
    fullAddress: z.string(),
    mapCoordinates: z.string().optional(),
    googleMapsUrl: z.string().url(),
  }),
  contactNumbers: z.array(
    z.object({
      label: z.string(),
      phone: z.string(),
      telLink: z.string(),
      description: z.string().optional(),
    })
  ),
  emails: z.array(
    z.object({
      label: z.string(),
      email: z.string().email(),
      mailtoLink: z.string(),
      description: z.string().optional(),
    })
  ),
  businessHours: z.object({
    weekdays: z.string(),
    weekend: z.string(),
    emergencyNote: z.string(),
  }),
  prefilledInquiries: z.object({
    title: z.string(),
    description: z.string(),
    templates: z.array(
      z.object({
        title: z.string(),
        badge: z.string(),
        subject: z.string(),
        body: z.string(),
        summary: z.string(),
      })
    ),
  }),
});

const ProductSchema = z.object({
  meta: MetaSchema,
  product: z
    .object({
      name: z.string(),
      category: z.string(),
      shortDescription: z.string(),
      primaryImage: z.string(),
      gallery: z.array(z.string()).optional(),
    })
    .optional(),
  header: z
    .object({
      badge: z.string(),
      title: z.string(),
      subtitle: z.string(),
    })
    .optional(),
  parameters: z.record(z.string()).optional(),
  features: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  specificationsTable: z
    .object({
      headers: z.array(z.string()),
      notes: z.string().optional(),
      rows: z.array(z.array(z.string())),
    })
    .optional(),
});

function validateFile(relPath, schema) {
  const fullPath = path.join(CONTENT_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    logError(relPath, `Content file does not exist.`);
    return null;
  }
  checkedFiles++;
  const rawContent = fs.readFileSync(fullPath, 'utf-8');
  let data;
  try {
    data = yaml.load(rawContent);
  } catch (err) {
    logError(relPath, `Malformed YAML syntax: ${err.message}`);
    return null;
  }

  // 1. Raw HTML Check
  checkForRawHtml(data, relPath);

  // 2. Asset existence check
  checkAllAssets(data, relPath);

  // 3. Schema validation
  if (schema) {
    const parseResult = schema.safeParse(data);
    if (!parseResult.success) {
      parseResult.error.issues.forEach((issue) => {
        logError(
          relPath,
          `Schema validation failed at field "${issue.path.join('.')}": ${issue.message}`,
          issue
        );
      });
    }
  }

  return data;
}

console.log('--- PACIFIC POWERTECH CONTENT VALIDATION ---');

// Validate site & clients
validateFile('settings/site.yaml', SiteSchema);
const clientsData = validateFile('settings/clients.yaml', ClientsSchema);
if (clientsData && Array.isArray(clientsData.clients)) {
  const enabledClients = clientsData.clients.filter((c) => c.enabled === true);
  if (enabledClients.length > 0) {
    console.warn(
      `\x1b[33m[CLIENT GOVERNANCE NOTICE]\x1b[0m ${enabledClients.length} clients are marked enabled: true. Ensure sign-off is logged in docs/CLIENT_APPROVAL_CHECKLIST.md.`
    );
  } else {
    console.log(
      '\x1b[32m[CLIENT GOVERNANCE OK]\x1b[0m All client entries are disabled (enabled: false) pending owner approval.'
    );
  }
}

// Validate pages
validateFile('pages/home.yaml', HomeSchema);
validateFile('pages/about.yaml', AboutSchema);
validateFile('pages/contact.yaml', ContactSchema);

// Validate products
const productsDir = path.join(CONTENT_DIR, 'pages', 'products');
if (fs.existsSync(productsDir)) {
  const productFiles = fs.readdirSync(productsDir).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'));
  for (const pFile of productFiles) {
    validateFile(path.join('pages', 'products', pFile), ProductSchema);
  }
}

console.log(`Validated ${checkedFiles} content files.`);

if (totalErrors > 0) {
  console.error(`\x1b[31mValidation FAILED with ${totalErrors} error(s).\x1b[0m`);
  process.exit(1);
} else {
  console.log('\x1b[32mAll content and assets passed validation successfully!\x1b[0m');
  process.exit(0);
}

