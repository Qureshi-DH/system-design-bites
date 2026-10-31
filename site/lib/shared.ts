// Shared between server and client code (no "use client" here on purpose).
export const SETTINGS_KEY = "sdb-settings";
// Where you were reading, so the page can open there next time.
export const PROGRESS_KEY = "sdb-progress";
export const FORGET_EVENT = "sdb:forget";

// Inline in <head> so the right theme paints first, with no flash.
// data-figs says which colors the animations use: their own dark ones, or the light set.
// data-resume hides the page for a moment while it scrolls back to where you were.
export const THEME_BOOT = `(function(){var r=document.documentElement;if('scrollRestoration' in history)history.scrollRestoration='manual';try{var p=JSON.parse(localStorage.getItem('${PROGRESS_KEY}')||'null');if(p&&p.slug&&!location.hash)r.dataset.resume='1';var s=JSON.parse(localStorage.getItem('${SETTINGS_KEY}')||'{}');var t=s.theme||'system';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);var i=s.illus==='light'||s.illus==='dark'?s.illus:(d?'dark':'light');r.dataset.theme=d?'dark':'light';r.dataset.figs=i;}catch(e){r.dataset.theme='dark';r.dataset.figs='dark';}})();`;

export const LAYOUT_EVENT = "sdb:layout";

// num is the idea's place in the reading order, like 4.3: section 4, third idea.
export type IndexEntry = { slug: string; num: string; title: string; section: number; sectionTitle: string; line: string };
export const REPLAY_EVENT = "sdb:replay";

export type SectionEntry = { id: string; number: number; title: string };
// What the header and rail need in the browser, sent as JSON next to the page.
export type PageData = { index: IndexEntry[]; sections: SectionEntry[] };
