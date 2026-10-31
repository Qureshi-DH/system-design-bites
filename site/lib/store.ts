// Viewer settings: kept in this browser only, shared by every component.
export type PlayMode = "loop" | "once" | "paused";
export type Theme = "system" | "light" | "dark";
export type Illus = "match" | "light" | "dark";
export type Settings = { play: PlayMode; theme: Theme; illus: Illus; openAll: boolean };

import { LAYOUT_EVENT, SETTINGS_KEY as KEY } from "./shared";
const SERVER: Settings = { play: "loop", theme: "system", illus: "match", openAll: false };
const listeners = new Set<() => void>();
let state: Settings | null = null;

function defaults(): Settings {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return { ...SERVER, play: reduce ? "paused" : "loop" };
}

export function getSettings(): Settings {
  if (typeof window === "undefined") return SERVER;
  if (!state) {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "{}");
      state = { ...defaults(), ...saved, openAll: false };
    } catch {
      state = defaults();
    }
  }
  return state!;
}

export const getServerSettings = () => SERVER;

export function setSettings(patch: Partial<Settings>) {
  state = { ...getSettings(), ...patch };
  try {
    const { openAll, ...persist } = state;
    void openAll;
    localStorage.setItem(KEY, JSON.stringify(persist));
  } catch {
    /* private mode: settings just last for this visit */
  }
  applyTheme(state);
  listeners.forEach((l) => l());
}

export function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function applyTheme(s: Settings) {
  const root = document.documentElement;
  const dark = s.theme === "dark" || (s.theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.dataset.theme = dark ? "dark" : "light";
  root.dataset.figs = s.illus === "match" ? root.dataset.theme : s.illus;
}

// Tiny event bus so the rail and header learn when the page changes height.
export const notifyLayout = () => window.dispatchEvent(new Event(LAYOUT_EVENT));

