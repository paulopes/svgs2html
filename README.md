# svgs2html

Turns a folder of SVG files into a single self-contained HTML file with a tabbed viewer. Each SVG becomes a tab; clicking a tab renders that SVG. The output HTML has zero external dependencies — all JS, CSS, and SVG content is inlined.

## Install

```bash
git clone <repo-url> && cd svgs2html
npm install
npm link
```

## Usage

```bash
cd /path/to/folder-with-svgs
svgs2html
```

This reads all `*.svg` files in the current directory and produces `<folder-name>.html` in the same directory.

## Example

```
~/reports/q4-charts$ ls *.svg
revenue.svg  expenses.svg  balance.svg

~/reports/q4-charts$ svgs2html
Output: q4-charts.html

~/reports/q4-charts$ ls *.html
q4-charts.html
```

Open `q4-charts.html` in any browser — no server needed.

## How it works

A Vite build with `vite-plugin-singlefile` bundles a React app that displays the SVGs. A custom Vite plugin reads SVG files from the working directory at build time and injects them into the bundle as a virtual module. The result is a single HTML file with everything inlined.

## License

ISC
