import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { readdirSync, readFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// When invoked via the CLI bin, SVG_VIEWER_CWD is the caller's directory.
// When invoked via `npm run build`, it's just process.cwd().
const callerCwd = process.env.SVG_VIEWER_CWD ?? process.cwd();

const VIRTUAL_ID = 'virtual:svg-files';
const RESOLVED_ID = '\0' + VIRTUAL_ID;

/** Reads all *.svg files from the caller's cwd and exposes them as a virtual module. */
function svgFromCwd(): Plugin {
  return {
    name: 'svg-from-cwd',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    load(id) {
      if (id !== RESOLVED_ID) return;
      const files = readdirSync(callerCwd)
        .filter((f) => f.endsWith('.svg'))
        .sort();
      const entries = files.map((f) => {
        const content = readFileSync(join(callerCwd, f), 'utf-8');
        const name = f.replace(/\.svg$/, '');
        return { name, content };
      });
      return `export default ${JSON.stringify(entries)};`;
    },
  };
}

export default defineConfig({
  root: resolve(__dirname, 'src'),
  plugins: [svgFromCwd(), react(), viteSingleFile()],
  build: {
    outDir: callerCwd,
    emptyOutDir: false,
  },
});
