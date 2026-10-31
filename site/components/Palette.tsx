import { useEffect, useMemo, useRef, useState } from "react";
import { getHere, jumpTo } from "../lib/positions";
import type { IndexEntry, SectionEntry } from "../lib/shared";

type Result = { kind: "section" | "idea"; id: string; num: string; title: string; meta?: string };

const sectionRow = (s: SectionEntry): Result => ({ kind: "section", id: s.id, num: String(s.number), title: s.title });
const ideaRow = (e: IndexEntry, meta?: string): Result => ({ kind: "idea", id: e.slug, num: e.num, title: e.title, meta });

// With nothing typed, the whole page as a contents list. Otherwise the best matches,
// by title first, then section, then the idea's one line. Numbers like 4.3 work too.
function search(query: string, index: IndexEntry[], sections: SectionEntry[]): Result[] {
  const q = query.trim().toLowerCase();
  if (!q) return sections.flatMap((s) => [sectionRow(s), ...index.filter((e) => e.section === s.number).map((e) => ideaRow(e))]);
  const words = q.split(/\s+/);
  const numeric = /^\d+(\.\d*)?$/.test(q);
  const scored: { score: number; order: number; r: Result }[] = [];
  sections.forEach((s, i) => {
    const t = s.title.toLowerCase();
    const score = numeric ? (String(s.number) === q ? 95 : 0) : words.every((w) => t.includes(w)) ? (t.startsWith(q) ? 85 : 65) : 0;
    if (score) scored.push({ score, order: i, r: sectionRow(s) });
  });
  index.forEach((e, i) => {
    let score = 0;
    if (numeric) score = e.num === q ? 100 : e.num.startsWith(q.includes(".") ? q : `${q}.`) ? 80 : 0;
    else {
      const t = e.title.toLowerCase();
      const hay = `${t} ${e.sectionTitle.toLowerCase()} ${e.line.toLowerCase()}`;
      if (words.every((w) => hay.includes(w)))
        score =
          t === q ? 100
          : t.startsWith(q) ? 90
          : t.includes(q) ? 70
          : words.every((w) => t.includes(w)) ? 60
          : words.some((w) => t.includes(w)) ? 30
          : 10;
    }
    if (score) scored.push({ score, order: 100 + i, r: ideaRow(e, e.sectionTitle) });
  });
  return scored
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, 60)
    .map((s) => s.r);
}

export default function Palette({
  open,
  onClose,
  index,
  sections,
}: {
  open: boolean;
  onClose: () => void;
  index: IndexEntry[];
  sections: SectionEntry[];
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const centerNext = useRef(false);
  const results = useMemo(() => search(q, index, sections), [q, index, sections]);

  useEffect(() => {
    const d = dialog.current!;
    if (open && !d.open) {
      // open the contents list at the idea you are reading
      const here = getHere() >= 0 ? index[getHere()].slug : null;
      setQ("");
      setNarrow(window.matchMedia("(max-width: 560px)").matches);
      setActive(Math.max(0, search("", index, sections).findIndex((r) => r.id === here)));
      centerNext.current = true;
      d.showModal();
    } else if (!open && d.open) d.close();
  }, [open, index, sections]);

  useEffect(() => {
    const block = centerNext.current ? "center" : "nearest";
    centerNext.current = false;
    list.current?.querySelector(`[aria-selected="true"]`)?.scrollIntoView({ block });
  }, [active, results, open]);

  const choose = (r: Result | undefined) => {
    if (!r) return;
    onClose();
    // after the dialog closes and hands focus back, move it to where we landed
    requestAnimationFrame(() => jumpTo(r.id));
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(results[active]);
    }
  };

  return (
    <dialog
      ref={dialog}
      className="jump"
      aria-label="Jump to an idea"
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
    >
      <div className="jump-field">
        <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
          <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="jump-list"
          aria-autocomplete="list"
          aria-activedescendant={results.length ? `jump-${active}` : undefined}
          aria-label="Search ideas and sections"
          placeholder={narrow ? `Search ${index.length} ideas` : `Search ${index.length} ideas, like caching, retries, or 4.3`}
          autoComplete="off"
          spellCheck={false}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKey}
        />
      </div>
      {results.length ? (
        <ul id="jump-list" ref={list} className="jump-list" role="listbox" aria-label="Results">
          {results.map((r, i) => (
            <li
              key={r.id}
              id={`jump-${i}`}
              className={r.kind === "section" ? "jump-sec" : undefined}
              role="option"
              aria-selected={i === active}
              onMouseMove={() => i !== active && setActive(i)}
              onClick={() => choose(r)}
            >
              <span className="jump-num">{r.num}</span>
              <span className="jump-title">{r.title}</span>
              {r.meta && <span className="jump-meta">{r.meta}</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="jump-empty" role="status">
          Nothing matches that. Try a shorter word.
        </p>
      )}
    </dialog>
  );
}
