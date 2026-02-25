import { useState } from 'react';

const svgModules = import.meta.glob<string>('./svg/*.svg', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const svgEntries = Object.entries(svgModules).map(([path, content]) => ({
  name: path.split('/').pop()!.replace(/\.svg$/, ''),
  content,
}));

export function App() {
  const [selected, setSelected] = useState(0);
  const current = svgEntries[selected];

  if (svgEntries.length === 0) {
    return <p style={{ padding: 24 }}>No SVG files found. Add .svg files to src/svg/</p>;
  }

  return (
    <div className="app">
      <nav className="tabs">
        {svgEntries.map((entry, i) => (
          <button
            key={entry.name}
            className={i === selected ? 'tab active' : 'tab'}
            onClick={() => setSelected(i)}
          >
            {entry.name}
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
