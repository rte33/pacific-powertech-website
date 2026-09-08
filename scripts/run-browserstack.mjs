import { spawn } from 'node:child_process';
import BrowserStackLocal from 'browserstack-local';
import { BROWSERSTACK_MATRIX } from '../tests/browserstack.config.ts';

const username = process.env.BROWSERSTACK_USERNAME;
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;

if (!username || !accessKey) {
  console.error('ERROR: Missing BROWSERSTACK_USERNAME or BROWSERSTACK_ACCESS_KEY environment variable.');
  console.error('Ensure GitHub Secrets or local environment variables are properly set.');
  process.exit(1);
}

// Ensure credential presence is reported without leaking values
console.log(`[BrowserStack] Authenticating with user: ${username.substring(0, 3)}***`);
console.log(`[BrowserStack] Key present: YES (${accessKey.length} chars)`);

const target = process.env.BROWSERSTACK_TARGET || 'local';
const localIdentifier = `pptl_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
const bsLocal = new BrowserStackLocal.Local();

async function startTunnel() {
  return new Promise((resolve, reject) => {
    console.log(`[BrowserStack Local] Starting tunnel with identifier: ${localIdentifier}...`);
    const bsLocalArgs = {
      key: accessKey,
      localIdentifier: localIdentifier,
      forceLocal: true,
      onlyAutomate: true,
    };

    bsLocal.start(bsLocalArgs, (error) => {
      if (error) {
        return reject(new Error(`Failed to start BrowserStack Local tunnel: ${error.message || error}`));
      }
      console.log('[BrowserStack Local] Tunnel connected successfully.');
      resolve();
    });
  });
}

async function stopTunnel() {
  return new Promise((resolve) => {
    if (bsLocal.isRunning()) {
      console.log('[BrowserStack Local] Stopping tunnel...');
      bsLocal.stop(() => {
        console.log('[BrowserStack Local] Tunnel stopped.');
        resolve();
      });
    } else {
      resolve();
    }
  });
}

async function main() {
  let exitCode = 0;
  try {
    if (target === 'local') {
      await startTunnel();
      process.env.BROWSERSTACK_LOCAL_IDENTIFIER = localIdentifier;
    }

    const testEnv = {
      ...process.env,
      BROWSERSTACK_BUILD_NAME: `PPTL Matrix - ${new Date().toISOString().slice(0, 16).replace('T', ' ')}`,
      BROWSERSTACK_LOCAL_IDENTIFIER: target === 'local' ? localIdentifier : undefined,
    };

    console.log(`[BrowserStack] Executing test suite against target: ${target}`);
    
    // Execute Playwright test runner
    const testProcess = spawn('npx', ['playwright', 'test'], {
      stdio: 'inherit',
      shell: true,
      env: testEnv,
    });

    exitCode = await new Promise((resolve) => {
      testProcess.on('close', (code) => resolve(code ?? 0));
    });

  } catch (err) {
    console.error('[BrowserStack Error]', err.message || err);
    exitCode = 1;
  } finally {
    if (target === 'local') {
      await stopTunnel();
    }
    process.exit(exitCode);
  }
}

main();

