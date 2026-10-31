import { useEffect, useState, useSyncExternalStore } from "react";
import * as pos from "../lib/positions";
import * as store from "../lib/store";
import type { IndexEntry, SectionEntry } from "../lib/shared";
import Settings from "./Settings";
import Palette from "./Palette";

const typing = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));

export default function Header({ index, sections }: { index: IndexEntry[]; sections: SectionEntry[] }) {
  const here = useSyncExternalStore(pos.subscribe, pos.getHere, pos.getServerHere);
  const settings = useSyncExternalStore(store.subscribe, store.getSettings, store.getServerSettings);
  const [jumping, setJumping] = useState(false);
  const cur = here >= 0 ? index[here] : null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const cmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const slash = e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey && !typing(e.target);
      if (cmdK || slash) {
        e.preventDefault();
        setJumping(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="bar">
      <a href="#top" className="mark" data-jump aria-label="System Design Bites, back to the top">
        <span>System Design Bites</span>
      </a>
      <button
        type="button"
        className="where"
        data-empty={cur ? undefined : ""}
        tabIndex={cur ? 0 : -1}
        aria-hidden={cur ? undefined : true}
        onClick={() => setJumping(true)}
      >
        <span className="where-sec">{cur?.sectionTitle ?? ""}</span>
        <svg className="where-sep" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
          <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="where-idea">
          <span className="where-n">{cur?.num ?? ""}</span> {cur?.title ?? ""}
        </span>
      </button>
      <div className="tools">
        <button type="button" className="tool" onClick={() => setJumping(true)} aria-keyshortcuts="/ Control+K Meta+K" aria-label="Jump to an idea">
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M13 13l4.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="tool-label">Jump to</span>
          <kbd>/</kbd>
        </button>
        <button
          type="button"
          className="tool"
          onClick={() => store.setSettings({ openAll: !settings.openAll })}
        >
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            {settings.openAll ? (
              <path d="M5 12l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
          <span className="tool-label">{settings.openAll ? "Close all" : "Open all"}</span>
        </button>
        <button type="button" className="tool" popoverTarget="settings">
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <path d="M3 6h8M15 6h2M3 14h2M9 14h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="13" cy="6" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="7" cy="14" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="tool-label">Settings</span>
        </button>
      </div>
      <Settings settings={settings} />
      <Palette open={jumping} onClose={() => setJumping(false)} index={index} sections={sections} />
    </header>
  );
}
