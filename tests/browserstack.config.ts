/**
 * BrowserStack device matrix and remote endpoint generator
 * Strictly consumes BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY from environment variables.
 * Never prints or leaks credentials to stdout/stderr.
 */

export interface BrowserStackCapability {
  name: string;
  browser?: string;
  browser_version?: string;
  os?: string;
  os_version?: string;
  device?: string;
  real_mobile?: 'true' | 'false';
  [key: string]: any;
}

export const BROWSERSTACK_MATRIX: Record<string, BrowserStackCapability> = {
  'win11-chrome': {
    name: 'Windows 11 Chrome Current',
    os: 'Windows',
    os_version: '11',
    browser: 'chrome',
    browser_version: 'latest',
  },
  'win11-edge': {
    name: 'Windows 11 Edge Current',
    os: 'Windows',
    os_version: '11',
    browser: 'edge',
    browser_version: 'latest',
  },
  'win11-firefox': {
    name: 'Windows 11 Firefox Current',
    os: 'Windows',
    os_version: '11',
    browser: 'playwright-firefox',
    browser_version: 'latest',
  },
  'macos-safari': {
    name: 'macOS Safari Current',
    os: 'OS X',
    os_version: 'Sonoma',
    browser: 'playwright-webkit',
    browser_version: 'latest',
  },
  'iphone-15': {
    name: 'iPhone 15 Mobile Safari',
    device: 'iPhone 15',
    os_version: '17',
    real_mobile: 'true',
    browser: 'safari',
  },
  'galaxy-s23': {
    name: 'Samsung Galaxy S23 Chrome',
    device: 'Samsung Galaxy S23',
    os_version: '13.0',
    real_mobile: 'true',
    browser: 'chrome',
  },
  'ipad-safari': {
    name: 'iPad Pro 11 Safari',
    device: 'iPad Pro 11 2022',
    os_version: '16',
    real_mobile: 'true',
    browser: 'safari',
  },
  'narrow-320-viewport': {
    name: 'Windows 11 Chrome 320px Viewport',
    os: 'Windows',
    os_version: '11',
    browser: 'chrome',
    browser_version: 'latest',
    resolution: '1024x768',
  },
};

export function getBrowserStackCdpUrl(capKey: string, localIdentifier?: string): string {
  const username = process.env.BROWSERSTACK_USERNAME;
  const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;

  if (!username || !accessKey) {
    throw new Error('BROWSERSTACK_USERNAME or BROWSERSTACK_ACCESS_KEY environment variable is not defined.');
  }

  const baseCaps = BROWSERSTACK_MATRIX[capKey];
  if (!baseCaps) {
    throw new Error(`Unknown BrowserStack capability key: ${capKey}`);
  }

  const caps: Record<string, any> = {
    ...baseCaps,
    'browserstack.username': username,
    'browserstack.accessKey': accessKey,
    'browserstack.local': localIdentifier ? 'true' : 'false',
    project: 'Pacific Powertech Website',
    build: process.env.BROWSERSTACK_BUILD_NAME || `PPTL Build ${Date.now()}`,
  };

  if (localIdentifier) {
    caps['browserstack.localIdentifier'] = localIdentifier;
  }

  return `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`;
}

