# svgs2html

Turns a folder of SVG files into a single self-contained HTML file with a tabbed viewer. Each SVG becomes a tab; clicking a tab renders that SVG. The output HTML has zero external dependencies — all JS, CSS, and SVG content is inlined.

## Install

```bash
git clone https://github.com/paulopes/svgs2html.git
cd svgs2html
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

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

Copyright 2025 Paulo Lopes

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY
SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION
OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN
CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
