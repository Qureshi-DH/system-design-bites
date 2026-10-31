import { LAYOUT_EVENT } from "./shared";

// Where every idea and section sits on the page, and which idea you are reading.
// Measured once, then again whenever the page changes height.
export type Stop = { slug: string; el: HTMLElement; top: number; section: number };
export type Station = { number: number; el: HTMLElement; top: number };

let stops: Stop[] = [];
let stations: Station[] = [];
let height = 1;
let here = -1;
let version = 0;
const listeners = new Set<() => void>();

const docTop = (el: HTMLElement) => el.getBoundingClientRect().top + window.scrollY;

export function headerHeight() {
  return parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 56;
}

export function measure() {
  stops = [...document.querySelectorAll<HTMLElement>("[data-idea]")].map((el) => ({
    slug: el.dataset.idea!,
    el,
    top: docTop(el),
    section: Number(el.closest<HTMLElement>("[data-section]")?.dataset.section),
  }));
  stations = [...document.querySelectorAll<HTMLElement>("[data-section]")].map((el) => ({
    number: Number(el.dataset.section),
    el,
    top: docTop(el),
  }));
  height = Math.max(1, document.documentElement.scrollHeight);
  version++;
  track();
  listeners.forEach((l) => l());
}

// The last stop that starts at or above a point on the page, or -1 above the first.
export function stopAt(y: number) {
  let lo = 0;
  let hi = stops.length - 1;
  let found = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (stops[mid].top <= y) {
      found = mid;
      lo = mid + 1;
    } else hi = mid - 1;
  }
  return found;
}

// The idea you are reading: the one under a line a third of the way down the screen.
export function track() {
  const atEnd = window.scrollY + window.innerHeight >= height - 2;
  const next = atEnd && stops.length ? stops.length - 1 : stopAt(window.scrollY + headerHeight() + window.innerHeight / 3);
  if (next !== here) {
    here = next;
    listeners.forEach((l) => l());
  }
}

export function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

// How far through the ideas you are, from 0 to 1, measured in ideas rather than
// pixels, so opening one long idea doesn't make the rest of the page count for less.
export function progress() {
  if (!stops.length) return 0;
  if (window.scrollY + window.innerHeight >= height - 2) return 1;
  const y = window.scrollY + headerHeight() + window.innerHeight / 3;
  const i = stopAt(y);
  if (i < 0) return 0;
  const next = i + 1 < stops.length ? stops[i + 1].top : height;
  return (i + Math.min(1, (y - stops[i].top) / Math.max(1, next - stops[i].top))) / stops.length;
}

export const getHere = () => here;
export const getServerHere = () => -1;
export const getStops = () => stops;
export const getStations = () => stations;
export const pageHeight = () => height;
export const getVersion = () => version;
export const getServerVersion = () => 0;

const motion = (smooth: boolean): ScrollBehavior =>
  smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto";

// Short hops glide. Long jumps land at once, so they don't drag you past (and load)
// every animation on the way.
// Sent whenever the page moves itself, so anything holding the scroll lets go.
export const GOTO_EVENT = "sdb:goto";

export function goTo(id: string, smooth = true) {
  window.dispatchEvent(new Event(GOTO_EVENT));
  const el = id === "top" ? null : document.getElementById(id);
  const far = Math.abs(el ? el.getBoundingClientRect().top : window.scrollY) > window.innerHeight * 2.5;
  const behavior = motion(smooth && !far);
  if (id === "top") window.scrollTo({ top: 0, behavior });
  else if (el) {
    el.scrollIntoView({ behavior, block: "start" });
    if (behavior === "smooth") landOn(el);
  }
}

// A diagram that finishes drawing above the target mid glide pushes it down, so
// check where the target ended up once the scroll stops, unless you scrolled yourself.
let touched = 0;
function landOn(el: HTMLElement) {
  const started = performance.now();
  addEventListener(
    "scrollend",
    () => {
      if (touched > started || performance.now() - started > 3000) return;
      const off = el.getBoundingClientRect().top - (headerHeight() + 16);
      if (Math.abs(off) > 4) window.scrollBy({ top: off, behavior: "instant" });
    },
    { once: true },
  );
}

// Go somewhere on the page the way a link would: scroll, update the address,
// move focus there, and flash a yellow marker next to the idea you landed on.
export function jumpTo(id: string, { push = true, smooth = true, focus = true } = {}) {
  const el = id === "top" ? document.getElementById("top") : document.getElementById(id);
  if (!el) return;
  if (push) history.pushState(null, "", id === "top" ? location.pathname + location.search : `#${id}`);
  if (focus) {
    if (!el.hasAttribute("tabindex")) el.tabIndex = -1;
    el.focus({ preventScroll: true });
  }
  goTo(id, smooth);
  if (el.matches("[data-idea]")) {
    el.classList.remove("pulse");
    void el.offsetWidth;
    el.classList.add("pulse");
    window.setTimeout(() => el.classList.remove("pulse"), 2100);
  }
}

let started = false;
export function startTracking() {
  if (started) return;
  started = true;
  let frame = 0;
  const onScroll = () => {
    if (!frame)
      frame = requestAnimationFrame(() => {
        frame = 0;
        track();
      });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  for (const type of ["wheel", "touchstart"])
    window.addEventListener(type, () => (touched = performance.now()), { passive: true });
  window.addEventListener(LAYOUT_EVENT, measure);
  window.addEventListener("resize", measure);
  const ideas = document.getElementById("ideas");
  if (ideas) new ResizeObserver(() => measure()).observe(ideas);
  document.fonts?.ready.then(measure);
  measure();
}
