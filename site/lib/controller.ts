import { getSettings, setSettings, subscribe, applyTheme, notifyLayout, type PlayMode } from "./store";
import * as pos from "./positions";
import { FORGET_EVENT, PROGRESS_KEY, REPLAY_EVENT } from "./shared";

// Everything the static page does once it loads, wired to the HTML by classes and
// data attributes: animations, opening ideas, diagrams, in-page links, and keys.

/* ---------- animations ---------- */

type Anim = { svg: SVGSVGElement; loop: number; visible: boolean; seen: boolean; timer: number; colors: string };
const anims = new Map<HTMLElement, Anim>();

// Every animation comes in its own dark colors and a light set made at build time.
const colors = () => (document.documentElement.dataset.figs === "light" ? "light" : "dark");
const animUrl = (slug: string, c: string) => `anim/${slug}${c === "light" ? ".light" : ""}.svg`;

function mount(host: HTMLElement, text: string) {
  host.insertAdjacentHTML("afterbegin", text);
  const svg = host.firstElementChild as SVGSVGElement;
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  return svg;
}

const poster = (a: Anim) => a.loop * 0.7;

function stopAt(a: Anim, t: number) {
  window.clearTimeout(a.timer);
  a.svg.pauseAnimations();
  a.svg.setCurrentTime(t);
}

function playOnce(a: Anim) {
  window.clearTimeout(a.timer);
  a.svg.setCurrentTime(0);
  a.svg.unpauseAnimations();
  // stop just before the loop resets, so the last frame stays on screen
  a.timer = window.setTimeout(() => a.svg.pauseAnimations(), Math.max(0.5, a.loop - 0.8) * 1000);
}

function settle(a: Anim, mode: PlayMode) {
  if (mode === "loop") {
    window.clearTimeout(a.timer);
    if (a.visible) a.svg.unpauseAnimations();
    else a.svg.pauseAnimations();
  } else if (mode === "paused") stopAt(a, poster(a));
  else if (a.visible && !a.seen) {
    a.seen = true;
    playOnce(a);
  } else if (!a.seen) stopAt(a, poster(a));
}

function replay(a: Anim) {
  a.seen = true;
  if (getSettings().play === "loop") {
    window.clearTimeout(a.timer);
    a.svg.setCurrentTime(0);
    a.svg.unpauseAnimations();
  } else playOnce(a);
}

async function load(fig: HTMLElement) {
  if (anims.has(fig) || fig.dataset.loading) return;
  fig.dataset.loading = "1";
  try {
    const c = colors();
    const res = await fetch(animUrl(fig.dataset.anim!, c));
    if (!res.ok) return;
    const svg = mount(fig, await res.text());
    const r = fig.getBoundingClientRect();
    const a: Anim = {
      svg,
      loop: Number(fig.dataset.loop) || 8,
      visible: r.bottom > 0 && r.top < window.innerHeight,
      seen: false,
      timer: 0,
      colors: c,
    };
    anims.set(fig, a);
    settle(a, getSettings().play);
  } finally {
    delete fig.dataset.loading;
  }
}

// Switch every loaded animation to the other color set, keeping its place in the loop.
function recolor() {
  const c = colors();
  anims.forEach(async (a, fig) => {
    if (a.colors === c) return;
    a.colors = c;
    const text = await (await fetch(animUrl(fig.dataset.anim!, c))).text();
    if (a.colors !== c) return;
    const t = a.svg.getCurrentTime();
    const paused = a.svg.animationsPaused();
    a.svg.remove();
    a.svg = mount(fig, text);
    a.svg.setCurrentTime(t);
    if (paused) a.svg.pauseAnimations();
  });
  const v = viewer();
  if (v?.open && view && view.colors !== c) show(viewing);
}

/* ---------- full size viewer: one animation at a time, with previous and next ---------- */

const viewer = () => document.getElementById("viewer") as HTMLDialogElement | null;
let viewing = -1;
let opened = -1;
let view: Anim | null = null;

const titleOf = (idea: HTMLElement) => idea.querySelector("h3")!.textContent!.trim();

async function show(i: number) {
  const v = viewer();
  const stops = pos.getStops();
  if (!v || i < 0 || i >= stops.length) return;
  viewing = i;
  const idea = stops[i].el;
  const q = (sel: string) => v.querySelector<HTMLElement>(sel)!;
  q(".viewer-sec").textContent = idea.closest("section")?.querySelector("h2")?.textContent ?? "";
  q("#viewer-title").innerHTML = idea.querySelector("h3")!.innerHTML;
  q(".viewer-line").innerHTML = idea.querySelector(".line")!.innerHTML;
  v.querySelectorAll<HTMLButtonElement>(".viewer-step").forEach((b) => {
    const to = stops[i + Number(b.dataset.step)];
    b.disabled = !to;
    b.querySelector(".viewer-to")!.textContent = to ? titleOf(to.el) : "";
  });
  if (view) window.clearTimeout(view.timer);
  view = null;
  const stage = q(".viewer-stage");
  stage.replaceChildren();
  if (!v.open) {
    v.showModal();
    v.focus();
  }

  const fig = idea.querySelector<HTMLElement>(".fig");
  if (!fig) return;
  const c = colors();
  const text = await (await fetch(animUrl(idea.id, c))).text();
  if (viewing !== i || !v.open) return;
  // a second copy of the same drawing on the page needs its own ids
  const svg = mount(stage, text.replaceAll(`${idea.id}__`, `full-${idea.id}__`));
  view = { svg, loop: Number(fig.dataset.loop) || 8, visible: true, seen: true, timer: 0, colors: c };
  replay(view);
}

function openViewer(idea: HTMLElement | null) {
  const i = pos.getStops().findIndex((s) => s.el === idea);
  if (i < 0) return;
  opened = i;
  show(i);
}

function wireViewer() {
  const v = viewer();
  if (!v) return;
  // the dialog takes focus itself, so arrow keys work at once and no button lights up
  v.tabIndex = -1;
  v.addEventListener("click", (e) => {
    const t = e.target as HTMLElement;
    if (t === v || t.closest(".viewer-close")) v.close();
    else if (t.closest(".viewer-replay") && view) replay(view);
    else {
      const step = t.closest<HTMLElement>(".viewer-step");
      if (step) show(viewing + Number(step.dataset.step));
    }
  });
  v.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      show(viewing + (e.key === "ArrowRight" ? 1 : -1));
    } else if (e.key === "r" && view) replay(view);
  });
  // Close where you ended up: if you stepped to another idea, the page follows.
  v.addEventListener("close", () => {
    if (view) window.clearTimeout(view.timer);
    view = null;
    v.querySelector(".viewer-stage")!.replaceChildren();
    const to = pos.getStops()[viewing];
    if (viewing !== opened && to) requestAnimationFrame(() => pos.jumpTo(to.slug, { push: false, smooth: false }));
  });
}

/* ---------- diagrams, drawn by mermaid only when someone opens one ---------- */

let diagrams: IntersectionObserver;
type Mermaid = (typeof import("mermaid"))["default"];
let mermaidP: Promise<Mermaid> | null = null;
let queue: Promise<void> = Promise.resolve();
let themed = "";
let seq = 0;

function vars(dark: boolean) {
  return dark
    ? {
        darkMode: true,
        background: "#121b2e",
        primaryColor: "#1e293b",
        primaryTextColor: "#e6ebf3",
        primaryBorderColor: "#475569",
        secondaryColor: "#172036",
        tertiaryColor: "#0f172a",
        lineColor: "#7f8ca5",
        textColor: "#cbd5e1",
        clusterBkg: "#0f172a",
        clusterBorder: "#33456b",
        edgeLabelBackground: "#121b2e",
        actorBkg: "#1e293b",
        actorBorder: "#475569",
        actorTextColor: "#e6ebf3",
        actorLineColor: "#475569",
        signalColor: "#cbd5e1",
        signalTextColor: "#e6ebf3",
        labelBoxBkgColor: "#1e293b",
        noteBkgColor: "#2b2a17",
        noteTextColor: "#f4e7a1",
        noteBorderColor: "#6b5d1a",
      }
    : {
        darkMode: false,
        background: "#ffffff",
        primaryColor: "#f1f5fa",
        primaryTextColor: "#0c1322",
        primaryBorderColor: "#94a3b8",
        secondaryColor: "#e8eef6",
        tertiaryColor: "#f8fafc",
        lineColor: "#56647d",
        textColor: "#1e293b",
        clusterBkg: "#f6f8fb",
        clusterBorder: "#b6c3d5",
        edgeLabelBackground: "#ffffff",
        actorBkg: "#f1f5fa",
        actorBorder: "#94a3b8",
        actorTextColor: "#0c1322",
        actorLineColor: "#94a3b8",
        signalColor: "#35435b",
        signalTextColor: "#0c1322",
        labelBoxBkgColor: "#f1f5fa",
        noteBkgColor: "#fef9c3",
        noteTextColor: "#422006",
        noteBorderColor: "#eab308",
      };
}

function draw(el: HTMLElement) {
  queue = queue.then(async () => {
    const theme = document.documentElement.dataset.theme || "dark";
    if (el.dataset.drawn === theme || !el.closest<HTMLDetailsElement>(".deep")?.open) return;
    mermaidP ??= import("mermaid").then((m) => m.default);
    const mermaid = await mermaidP;
    if (themed !== theme) {
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "strict",
        theme: "base",
        themeVariables: { ...vars(theme === "dark"), fontFamily: getComputedStyle(document.body).fontFamily, fontSize: "15px" },
      });
      themed = theme;
    }
    try {
      const { svg } = await mermaid.render(`mm-${++seq}`, el.dataset.mermaid!);
      el.innerHTML = svg;
      el.dataset.drawn = theme;
    } catch {
      el.textContent = "This diagram could not be drawn.";
    }
    notifyLayout();
  });
}

const deepOf = (idea: HTMLElement) => idea.querySelector<HTMLDetailsElement>(".deep")!;

/* ---------- your place: the progress bar, and opening where you stopped ---------- */

// slug and offset say where the screen was, far is the furthest you have read (0 to 1),
// and open lists the ideas you had open.
type Place = { slug: string | null; offset: number; far: number; open: string[] };

function readPlace(): Place | null {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "null");
  } catch {
    return null;
  }
}

// Keep the saved spot in place while late fonts, pictures, and diagrams settle the
// layout above it, measuring the idea's live position each time. Any scroll, tap, or
// key of yours lets go, so does the page jumping somewhere itself, and so do ten seconds.
function hold(el: HTMLElement, offset: number) {
  const until = performance.now() + 10000;
  const inputs = ["wheel", "touchstart", "pointerdown", "keydown", pos.GOTO_EVENT];
  let timer = 0;
  const release = () => {
    window.clearInterval(timer);
    unsubscribe();
    window.removeEventListener("scroll", apply);
    inputs.forEach((t) => window.removeEventListener(t, release));
  };
  function apply() {
    if (performance.now() > until) return release();
    const y = Math.round(el.getBoundingClientRect().top + window.scrollY + offset);
    if (Math.abs(window.scrollY - y) > 1) window.scrollTo({ top: y, behavior: "instant" });
  }
  timer = window.setInterval(apply, 150);
  const unsubscribe = pos.subscribe(apply);
  window.addEventListener("scroll", apply, { passive: true });
  inputs.forEach((t) => window.addEventListener(t, release, { passive: true }));
  apply();
}

function welcomeBack(idea: HTMLElement) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  const text = document.createElement("span");
  const name = document.createElement("b");
  name.textContent = titleOf(idea);
  text.append("Picked up where you left off, at ", name, ".");
  const top = document.createElement("button");
  top.type = "button";
  top.textContent = "Back to the top";
  const close = () => {
    toast.classList.add("gone");
    window.setTimeout(() => toast.remove(), 300);
  };
  top.addEventListener("click", () => {
    close();
    pos.jumpTo("top", { push: false });
  });
  toast.append(text, top);
  document.body.append(toast);
  window.setTimeout(close, 7000);
  window.addEventListener(FORGET_EVENT, close, { once: true });
}

/* ---------- start ---------- */

export function start() {
  pos.startTracking();
  const figs = [...document.querySelectorAll<HTMLElement>(".fig[data-anim]")];
  const ideas = [...document.querySelectorAll<HTMLElement>("[data-idea]")];

  // Load animations a little before they scroll in, once the page settles near them
  // (so scrubbing past a hundred ideas doesn't fetch a hundred animations), and only
  // run the ones on screen.
  const waiting = new Map<Element, number>();
  const near = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        window.clearTimeout(waiting.get(e.target));
        waiting.delete(e.target);
        if (e.isIntersecting) waiting.set(e.target, window.setTimeout(() => load(e.target as HTMLElement), 150));
      }
    },
    { rootMargin: "900px 0px" },
  );
  const onScreen = new IntersectionObserver((entries) => {
    const mode = getSettings().play;
    for (const e of entries) {
      const a = anims.get(e.target as HTMLElement);
      if (!a) continue;
      a.visible = e.isIntersecting;
      settle(a, mode);
    }
  });
  figs.forEach((f) => {
    near.observe(f);
    onScreen.observe(f);
  });

  diagrams = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        diagrams.unobserve(e.target);
        draw(e.target as HTMLElement);
      }
    },
    { rootMargin: "600px 0px" },
  );

  // An idea opened by its button, by a key, or by the browser's find.
  document.addEventListener(
    "toggle",
    (e) => {
      const d = e.target as HTMLElement;
      if (!d.matches?.(".deep")) return;
      if ((d as HTMLDetailsElement).open) d.querySelectorAll<HTMLElement>("[data-mermaid]").forEach((m) => diagrams.observe(m));
      notifyLayout();
      schedule();
    },
    true,
  );

  // Clicks: a picture opens full size, its replay button replays it, and links that
  // stay on this page scroll there.
  wireViewer();
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const t = e.target as HTMLElement;
    const fig = t.closest<HTMLElement>(".fig");
    if (fig) {
      const a = anims.get(fig);
      if (t.closest(".replay")) a && replay(a);
      else openViewer(fig.closest<HTMLElement>("[data-idea]"));
      return;
    }
    const link = t.closest<HTMLAnchorElement>('a[href^="#"]');
    if (link) {
      const id = decodeURIComponent(link.getAttribute("href")!.slice(1));
      if (id === "top" || document.getElementById(id)) {
        e.preventDefault();
        viewer()?.close();
        pos.jumpTo(id);
      }
    }
  });

  // Keys: j and k walk the ideas, o opens one, r replays its animation.
  let target: number | null = null;
  let settleTimer = 0;
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented) return;
    const el = e.target as HTMLElement;
    if (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.closest("dialog, [popover]")) return;
    const all = pos.getStops();
    const here = target ?? pos.getHere();
    if (e.key === "j" || e.key === "k") {
      const to = Math.max(0, Math.min(all.length - 1, here + (e.key === "j" ? 1 : -1)));
      target = to;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => (target = null), 700);
      pos.jumpTo(all[to].slug, { push: false });
    } else if (e.key === "o" && here >= 0) {
      const d = deepOf(all[here].el);
      d.open = !d.open;
    } else if (e.key === "r" && here >= 0) {
      const a = anims.get(all[here].el.querySelector<HTMLElement>(".fig")!);
      if (a) replay(a);
    } else if (e.key === "f" && here >= 0) openViewer(all[here].el);
  });

  // Your place: the bar follows every scroll, the place is saved as you go, and a
  // fresh visit (one without a link to an idea) opens where you stopped last time.
  const saved = readPlace();
  const resuming = !location.hash && !!saved?.slug;
  const nowBar = document.querySelector<HTMLElement>(".progress-now");
  const farBar = document.querySelector<HTMLElement>(".progress-far");
  let far = saved?.far ?? 0;
  let ready = false;
  let frame = 0;
  let saveTimer = 0;
  function save() {
    if (!ready) return;
    // read live positions here: cached ones can lag behind a late reflow
    const line = pos.headerHeight() + window.innerHeight / 3;
    let at: HTMLElement | null = null;
    let top = 0;
    for (const idea of ideas) {
      const t = idea.getBoundingClientRect().top;
      if (t > line) break;
      at = idea;
      top = t;
    }
    const place: Place = {
      slug: at?.id ?? null,
      offset: at ? Math.round(-top) : 0,
      far: Math.round(far * 10000) / 10000,
      open: ideas.filter((i) => deepOf(i).open).map((i) => i.id),
    };
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(place));
    } catch {
      /* private mode: nothing is kept */
    }
  }
  function schedule() {
    if (!frame)
      frame = requestAnimationFrame(() => {
        frame = 0;
        const p = pos.progress();
        if (ready) far = Math.max(far, p);
        if (nowBar) nowBar.style.transform = `scaleX(${p})`;
        if (farBar) farBar.style.transform = `scaleX(${far})`;
        window.clearTimeout(saveTimer);
        saveTimer = window.setTimeout(save, 400);
      });
  }
  window.addEventListener("scroll", schedule, { passive: true });
  pos.subscribe(schedule);
  window.addEventListener("pagehide", save);
  document.addEventListener("visibilitychange", () => document.visibilityState === "hidden" && save());
  window.addEventListener(FORGET_EVENT, () => {
    try {
      localStorage.removeItem(PROGRESS_KEY);
    } catch {
      /* nothing to forget */
    }
    far = 0;
    document.getElementById("settings")?.hidePopover?.();
    if (getSettings().openAll) setSettings({ openAll: false });
    ideas.forEach((i) => (deepOf(i).open = false));
    pos.jumpTo("top", { push: false, smooth: false });
    schedule();
  });
  if (resuming) {
    const open = new Set(saved!.open ?? []);
    ideas.forEach((i) => open.has(i.id) && (deepOf(i).open = true));
    if (open.size === ideas.length) setSettings({ openAll: true });
  }

  // Settings: play mode and open all. The theme is applied by the store.
  let last = getSettings();
  subscribe(() => {
    const s = getSettings();
    if (s.play !== last.play) anims.forEach((a) => ((a.seen = false), settle(a, s.play)));
    if (s.openAll !== last.openAll) {
      // keep the idea you are reading in the same place on screen
      const anchor = pos.getStops()[pos.getHere()]?.el;
      const before = anchor?.getBoundingClientRect().top ?? 0;
      ideas.forEach((i) => (deepOf(i).open = s.openAll));
      if (anchor) window.scrollBy(0, anchor.getBoundingClientRect().top - before);
      notifyLayout();
    }
    last = s;
  });
  window.addEventListener(REPLAY_EVENT, () => anims.forEach((a) => a.visible && replay(a)));

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => getSettings().theme === "system" && applyTheme(getSettings()));
  applyTheme(getSettings());

  // Redraw open diagrams when the theme changes, and recolor the animations.
  new MutationObserver((changes) => {
    if (changes.some((c) => c.attributeName === "data-theme"))
      document.querySelectorAll<HTMLElement>("[data-drawn]").forEach((m) => diagrams.observe(m));
    if (changes.some((c) => c.attributeName === "data-figs")) recolor();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "data-figs"] });

  // A link straight to an idea opens it.
  const openFromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    const idea = id ? document.getElementById(id) : null;
    if (idea?.matches("[data-idea]")) {
      deepOf(idea).open = true;
      requestAnimationFrame(() => pos.jumpTo(id, { push: false, smooth: false }));
    }
  };
  openFromHash();
  window.addEventListener("hashchange", openFromHash);

  // Scroll back to the saved place once the fonts have settled the layout, then show
  // the page (it is hidden by data-resume until now, so it doesn't jump in front of you).
  (async () => {
    if (resuming) {
      await Promise.race([document.fonts?.ready, new Promise((r) => window.setTimeout(r, 800))]);
      pos.measure();
      const stop = pos.getStops().find((s) => s.slug === saved!.slug);
      if (stop) {
        hold(stop.el, saved!.offset || 0);
        pos.track();
        welcomeBack(stop.el);
      }
    }
    document.documentElement.removeAttribute("data-resume");
    ready = true;
    schedule();
  })();
}
