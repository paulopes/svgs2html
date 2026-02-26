#!/usr/bin/env node
import { execSync } from 'child_process';
import { dirname, resolve, basename } from 'path';
import { renameSync } from 'fs';
import { fileURLToPath } from 'url';

const cwd = process.cwd();
const projectDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const vite = resolve(projectDir, 'node_modules', '.bin', 'vite');

execSync(`"${vite}" build --config "${resolve(projectDir, 'vite.config.ts')}"`, {
  stdio: 'inherit',
  cwd,
  env: {
    ...process.env,
    SVG_VIEWER_CWD: cwd,
    SVG_VIEWER_PROJECT: projectDir,
  },
});

const outName = basename(cwd) + '.html';
renameSync(resolve(cwd, 'index.html'), resolve(cwd, outName));
console.log(`\nOutput: ${outName}`);
