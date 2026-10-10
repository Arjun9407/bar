import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchIndex } from "../lib/searchIndex.js";

export default function SearchPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const results = searchIndex(query);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => setSelected(0), [query]);

  const go = (item) => {
    onClose();
    navigate(item.path);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    else if (e.key === "Enter" && results[selected]) go(results[selected]);
  };

  if (!open) return null;

  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div className="palette" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label="Search BarcodePro">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search tools, guides and pages…"
          aria-label="Search"
        />
        <div className="palette-list">
          {results.length === 0 && <div className="palette-empty">No matches for “{query}”.</div>}
          {results.map((item, i) => (
            <a
              key={item.path + item.title}
              href={item.path}
              className={`palette-item${i === selected ? " selected" : ""}`}
              onMouseEnter={() => setSelected(i)}
              onClick={(e) => { e.preventDefault(); go(item); }}
            >
              <span className="pi-cat">{item.cat}</span>
              <div className="pi-title">{item.title}</div>
              <div className="pi-desc">{item.desc}</div>
            </a>
          ))}
        </div>
        <div className="palette-foot"><span>↑↓ navigate</span><span>↵ open</span><span>esc close</span></div>
      </div>
    </div>
  );
}
