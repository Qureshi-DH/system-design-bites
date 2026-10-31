import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import * as pos from "../lib/positions";
import type { IndexEntry, SectionEntry } from "../lib/shared";

// The rail is a map of the whole page: a station for each section, a tick for each
// idea, and a yellow packet for the part of the page on screen. Hover to read it,
// click to go somewhere, drag to scrub. On phones it shrinks to a thumb you can grab.

const DESKTOP = "(min-width: 900px) and (pointer: fine)";
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

type Mode = null | "hover" | "drag" | "focus";

export default function Rail({ index, sections }: { index: IndexEntry[]; sections: SectionEntry[] }) {
  const version = useSyncExternalStore(pos.subscribe, pos.getVersion, pos.getServerVersion);
  const here = useSyncExternalStore(pos.subscribe, pos.getHere, pos.getServerHere);
  const rail = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const packet = useRef<HTMLDivElement>(null);
  const tip = useRef<HTMLDivElement>(null);
  const ticks = useRef<(HTMLDivElement | null)[]>([]);
  const drag = useRef<{ grab: number; onPacket: boolean; startY: number; moved: boolean } | null>(null);
  const modeRef = useRef<Mode>(null);
  const [mode, setModeState] = useState<Mode>(null);
  const [hoverI, setHoverI] = useState(-1);

  const stops = version ? pos.getStops() : [];
  const stations = version ? pos.getStations() : [];
  const H = pos.pageHeight();
  const shownI = mode === "hover" ? hoverI : here;
  const shown = shownI >= 0 ? index[shownI] : null;
  const cur = here >= 0 ? index[here] : null;

  const setMode = (m: Mode) => {
    modeRef.current = m;
    setModeState(m);
  };

  const geo = () => {
    const h = track.current?.clientHeight ?? 1;
    const vh = window.innerHeight;
    const total = pos.pageHeight();
    const min = window.matchMedia(DESKTOP).matches ? 8 : 48;
    const size = Math.min(h, Math.max(min, (vh / total) * h));
    return { h, vh, total, size, max: Math.max(1, total - vh) };
  };

  const placeTip = (y: number) => {
    if (tip.current) tip.current.style.transform = `translateY(${18 + y}px) translateY(-50%)`;
  };

  // Keep the packet in step with the page, and wake the phone thumb while scrolling.
  useEffect(() => {
    let frame = 0;
    let idle = 0;
    const paint = () => {
      frame = 0;
      if (!packet.current) return;
      const { h, size, max } = geo();
      const y = (clamp(window.scrollY, 0, max) / max) * (h - size);
      packet.current.style.height = `${size}px`;
      packet.current.style.transform = `translateY(${y}px)`;
      if (modeRef.current === "drag" || modeRef.current === "focus") placeTip(y + size / 2);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
      rail.current?.classList.add("awake");
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        if (modeRef.current !== "drag") rail.current?.classList.remove("awake");
      }, 1400);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", paint);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", paint);
      cancelAnimationFrame(frame);
      window.clearTimeout(idle);
    };
  }, [version, mode]);

  const fisheye = (y: number | null) => {
    const { h, total } = geo();
    pos.getStops().forEach((s, i) => {
      const el = ticks.current[i];
      if (!el) return;
      const k = y === null ? 0 : Math.max(0, 1 - Math.abs((s.top / total) * h - y) / 64);
      el.style.transform = k ? `scaleX(${1 + 2.6 * k * k})` : "";
      el.style.opacity = k ? String(0.5 + 0.5 * k) : "";
    });
  };

  const localY = (e: React.PointerEvent) => e.clientY - track.current!.getBoundingClientRect().top;
  const stopUnder = (y: number) => {
    const { h, total } = geo();
    return pos.stopAt((clamp(y, 0, h) / h) * total);
  };

  const scrub = (y: number, grab: number) => {
    const { h, size, max } = geo();
    const f = clamp((y - grab) / Math.max(1, h - size), 0, 1);
    window.scrollTo({ top: f * max, behavior: "instant" });
  };

  const onDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const onPacket = e.target === packet.current;
    const y = localY(e);
    const { h, size, max } = geo();
    const packetTop = (clamp(window.scrollY, 0, max) / max) * (h - size);
    (e.target as Element).setPointerCapture(e.pointerId);
    drag.current = { grab: onPacket ? y - packetTop : size / 2, onPacket, startY: e.clientY, moved: false };
    if (onPacket) {
      setMode("drag");
      fisheye(null);
    }
    e.preventDefault();
  };

  const onMove = (e: React.PointerEvent) => {
    const y = localY(e);
    const d = drag.current;
    if (d) {
      if (!d.moved && Math.abs(e.clientY - d.startY) > 4) {
        d.moved = true;
        setMode("drag");
        fisheye(null);
      }
      if (d.moved || d.onPacket) scrub(y, d.grab);
      return;
    }
    if (e.pointerType !== "mouse") return;
    if (modeRef.current !== "hover") setMode("hover");
    setHoverI(stopUnder(y));
    placeTip(clamp(y, 0, geo().h));
    fisheye(y);
  };

  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (!d.moved && !d.onPacket) {
      const i = stopUnder(localY(e));
      pos.jumpTo(i >= 0 ? pos.getStops()[i].slug : "top", { push: false, focus: false });
    }
    const over = e.pointerType === "mouse" && rail.current?.matches(":hover");
    setMode(over ? "hover" : null);
    if (over) {
      const y = clamp(localY(e), 0, geo().h);
      setHoverI(stopUnder(y));
      placeTip(y);
      fisheye(y);
    } else fisheye(null);
  };

  const onLeave = () => {
    if (drag.current) return;
    setMode(null);
    fisheye(null);
  };

  // Keyboard: the rail is a slider over every idea on the page.
  const onKey = (e: React.KeyboardEvent) => {
    const all = pos.getStops();
    if (!all.length) return;
    const i = pos.getHere();
    const sec = i >= 0 ? all[i].section : 0;
    let to: number | null = null;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        to = Math.min(i + 1, all.length - 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        to = Math.max(i - 1, -1);
        break;
      case "PageDown":
        to = all.findIndex((s) => s.section > sec);
        if (to < 0) to = all.length - 1;
        break;
      case "PageUp": {
        const first = all.findIndex((s) => s.section === sec);
        to = i > first ? first : all.findIndex((s) => s.section === sec - 1);
        break;
      }
      case "Home":
        to = -1;
        break;
      case "End":
        to = all.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    pos.jumpTo(to >= 0 ? all[to].slug : "top", { push: false, focus: false, smooth: false });
    pos.track();
  };

  const valueText = cur ? `${cur.num} ${cur.title}, in ${cur.sectionTitle}` : "Top of the page";

  return (
    <div
      ref={rail}
      className={`rail${mode === "drag" ? " dragging" : ""}`}
      role="slider"
      tabIndex={0}
      aria-label="Page map"
      aria-orientation="vertical"
      aria-valuemin={0}
      aria-valuemax={index.length}
      aria-valuenow={here + 1}
      aria-valuetext={valueText}
      onKeyDown={onKey}
      onFocus={(e) => e.currentTarget.matches(":focus-visible") && setMode("focus")}
      onBlur={() => modeRef.current === "focus" && setMode(null)}
    >
      <div
        ref={track}
        className="rail-track"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onLeave}
      >
        <div className="rail-line" />
        {stations.map((s) => (
          <div
            key={s.number}
            className={`station${cur && cur.section === s.number ? " here" : ""}`}
            style={{ top: `${(s.top / H) * 100}%` }}
          />
        ))}
        {stops.map((s, i) => (
          <div
            key={s.slug}
            ref={(el) => {
              ticks.current[i] = el;
            }}
            className={`tick${i === here ? " here" : ""}`}
            style={{ top: `${(s.top / H) * 100}%` }}
          />
        ))}
        <div ref={packet} className="packet" />
      </div>
      <div ref={tip} className={`rail-tip${mode ? " show" : ""}`} aria-hidden="true">
        <span className="tip-sec">{shown ? shown.sectionTitle : `${index.length} ideas in ${sections.length} sections`}</span>
        <span className="tip-title">
          {shown ? (
            <>
              <b>{shown.num}</b> {shown.title}
            </>
          ) : (
            "Top of the page"
          )}
        </span>
      </div>
    </div>
  );
}
