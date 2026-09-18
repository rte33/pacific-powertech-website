import { execSync } from 'node:child_process';
import { existsSync, unlinkSync } from 'node:fs';
import path from 'node:path';

console.log('--- PACKAGING PACIFIC POWERTECH FOR CPANEL HOSTING ---');

// 1. Build Astro static site for production root domain
console.log('1. Building Astro site for root domain (https://www.pacificpowertech.com.bd)...');
execSync('npm run build', {
  stdio: 'inherit',
  env: {
    ...process.env,
    BASE_PATH: '/',
    SITE_URL: 'https://www.pacificpowertech.com.bd',
  },
});

// 2. Remove old zip if exists
const zipPath = path.resolve('dist-cpanel.zip');
if (existsSync(zipPath)) {
  unlinkSync(zipPath);
}

// 3. Create zip archive
console.log('2. Creating dist-cpanel.zip archive...');
if (process.platform === 'win32') {
  execSync('pwsh -NoProfile -Command "Compress-Archive -Path (Get-ChildItem -Path dist -Force) -DestinationPath dist-cpanel.zip -Force"', {
    stdio: 'inherit',
  });
} else {
  execSync('cd dist && zip -r ../dist-cpanel.zip .', { stdio: 'inherit' });
}

console.log('✓ Successfully created dist-cpanel.zip!');
console.log('Upload this zip file to your cPanel File Manager inside public_html and extract it.');
