import { useState, useEffect, useCallback } from 'react';
import rawEntries from 'virtual:svg-files';

function humanize(name: string): string {
  const words = name.split('_');
  if (/^\d+$/.test(words[0])) words.shift();
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

const svgEntries = rawEntries.map(({ name, content }) => ({
  name,
  label: humanize(name),
  content,
}));

function indexFromHash(): number {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (!hash) return 0;
  const idx = svgEntries.findIndex((e) => e.name === hash);
  return idx >= 0 ? idx : 0;
}

export function App() {
  const [selected, setSelected] = useState(indexFromHash);

  const selectTab = useCallback((i: number) => {
    setSelected(i);
    if (i === 0) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    } else {
      window.location.hash = encodeURIComponent(svgEntries[i].name);
    }
  }, []);

  useEffect(() => {
    const sync = () => setSelected(indexFromHash());
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  const current = svgEntries[selected];

  if (svgEntries.length === 0) {
    return <p style={{ padding: 24 }}>No SVG files found. Add .svg files to the working directory and rebuild.</p>;
  }

  return (
    <div className="app">
      <nav className="tabs">
        {svgEntries.map((entry, i) => (
          <button
            key={entry.name}
            className={i === selected ? 'tab active' : 'tab'}
            onClick={() => selectTab(i)}
          >
            {entry.label}
          </button>
        ))}
      </nav>
      <div
        className="detail"
        dangerouslySetInnerHTML={{ __html: current.content }}
      />
    </div>
  );
}
