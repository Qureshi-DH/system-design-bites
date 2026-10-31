import fs from "node:fs";
import path from "node:path";
import { Marked, type Tokens } from "marked";
import { createHighlighter, type Highlighter } from "shiki";

// The repo's markdown is the single source of truth. Nothing here copies it:
// every build reads concepts/ and assets/ straight from the repo root.
export const REPO_ROOT = path.resolve(process.cwd(), "..");
const CONCEPTS = path.join(REPO_ROOT, "concepts");
export const ANIMATIONS = path.join(REPO_ROOT, "assets", "animations");

export type Concept = {
  slug: string;
  title: string;
  category: string;
  oneLiner: string; // inline html
  how: string; // html
  example: string; // html
  mermaid: string; // raw mermaid source
  caption: string; // html
  related: { slug: string; title: string }[];
  loop: number; // seconds in one animation loop, 0 when there is no animation
};

export type Category = {
  dir: string;
  number: number;
  title: string;
  blurb: string;
  concepts: Concept[];
};

const LANGS = ["python", "http", "sql", "yaml", "json", "js", "nginx", "ini", "dockerfile", "text",
  "proto", "html", "hcl", "graphql", "go", "diff", "bash"];

let highlighter: Highlighter | null = null;
async function getHighlighter() {
  highlighter ??= await createHighlighter({ themes: ["github-light", "github-dark-dimmed"], langs: LANGS });
  return highlighter;
}

function slugFromHref(href: string) {
  return path.basename(href).replace(/\.md$/, "");
}

function makeMarked(hl: Highlighter) {
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      code({ text, lang }: Tokens.Code) {
        const language = lang && LANGS.includes(lang) ? lang : "text";
        return hl.codeToHtml(text, {
          lang: language,
          themes: { light: "github-light", dark: "github-dark-dimmed" },
          defaultColor: false,
        });
      },
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { href, tokens }: Tokens.Link) {
        const inner = this.parser.parseInline(tokens);
        if (href.endsWith("README.md")) return `<a href="#top">${inner}</a>`;
        if (href.endsWith(".md")) return `<a href="#${slugFromHref(href)}">${inner}</a>`;
        return `<a href="${href}" target="_blank" rel="noreferrer">${inner}</a>`;
      },
    },
  });
  return marked;
}

function splitSections(body: string) {
  const out: Record<string, string> = {};
  const parts = body.split(/^## /m);
  for (const part of parts.slice(1)) {
    const nl = part.indexOf("\n");
    out[part.slice(0, nl).trim()] = part.slice(nl + 1).trim();
  }
  return out;
}

// Every animation shares one loop length, so the page can pause it on a frame.
function loopSeconds(slug: string) {
  const file = path.join(ANIMATIONS, `${slug}.svg`);
  if (!fs.existsSync(file)) return 0;
  const m = fs.readFileSync(file, "utf8").match(/\bdur="([\d.]+)s"/);
  return m ? parseFloat(m[1]) : 0;
}

function parseConcept(file: string, category: string, marked: Marked): Concept {
  const slug = path.basename(file, ".md");
  let raw = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  // generated parts of the GitHub pages: the nav footer and the animation embed
  raw = raw.replace(/\n+---\n\n[^\n]*\[All concepts\][^\n]*\n?$/, "\n");
  raw = raw.replace(/\n!\[[^\]]*\]\([^)]*assets\/animations\/[^)]+\.svg\)\n/, "\n");

  const title = raw.match(/^# (.+)$/m)![1].trim();
  const quote = raw.match(/^((?:>.*\n?)+)/m)![1];
  const oneLiner = marked.parseInline(quote.replace(/^>\s?/gm, "").replace(/\n/g, " ").trim()) as string;
  const s = splitSections(raw);

  const picture = s["Picture it"] ?? "";
  const mm = picture.match(/```mermaid\n([\s\S]*?)```/);
  const caption = picture.replace(/```mermaid\n[\s\S]*?```/, "").trim();

  const related = [...(s["Related"] ?? "").matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((m) => ({
    title: m[1],
    slug: slugFromHref(m[2]),
  }));

  return {
    slug,
    title,
    category,
    oneLiner,
    how: marked.parse(s["How it works"] ?? "") as string,
    example: marked.parse(s["Example"] ?? "") as string,
    mermaid: mm ? mm[1].trim() : "",
    caption: marked.parse(caption) as string,
    related,
    loop: loopSeconds(slug),
  };
}

let cache: Category[] | null = null;

export async function getCategories(): Promise<Category[]> {
  if (cache) return cache;
  const marked = makeMarked(await getHighlighter());
  const dirs = fs.readdirSync(CONCEPTS).filter((d) => /^\d+-/.test(d)).sort();
  cache = dirs.map((dir) => {
    // the section README holds the title, the blurb, and the reading order
    const readme = fs.readFileSync(path.join(CONCEPTS, dir, "README.md"), "utf8");
    const title = readme.match(/^# (.+)$/m)![1].trim();
    const blurb = readme.split("\n\n")[1].trim();
    const order = [...readme.matchAll(/^\| \[[^\]]+\]\(([^)]+\.md)\)/gm)].map((m) => m[1]);
    return {
      dir,
      number: parseInt(dir, 10),
      title,
      blurb,
      concepts: order.map((f) => parseConcept(path.join(CONCEPTS, dir, f), dir, marked)),
    };
  });
  return cache;
}

// Serve each animation with its ids prefixed, so 214 inline SVGs can live on one
// page without their markers, clip paths, and titles colliding.
export function animationSvg(slug: string) {
  const src = fs.readFileSync(path.join(ANIMATIONS, `${slug}.svg`), "utf8");
  const p = `${slug}__`;
  return src
    .replace(/\bid="([^"]+)"/g, (_, id) => `id="${p}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${p}${id})`)
    .replace(/href="#([^"]+)"/g, (_, id) => `href="#${p}${id}"`)
    .replace(/aria-labelledby="([^"]+)"/g, (_, ids: string) =>
      `aria-labelledby="${ids.split(/\s+/).map((i) => p + i).join(" ")}"`);
}

// The animations are drawn on a dark card. The light versions swap every color for a
// light partner: surfaces turn white and slate, and accents go a shade deeper so they
// read on white. Text gets the deepest shade, then strokes, then fills.
const LIGHT: Record<string, { fill: string; stroke: string; text: string }> = {
  "#0f172a": { fill: "#ffffff", stroke: "#ffffff", text: "#0f172a" },
  "#172033": { fill: "#f8fafc", stroke: "#e2e8f0", text: "#f8fafc" },
  "#1e293b": { fill: "#f1f5f9", stroke: "#e2e8f0", text: "#334155" },
  "#334155": { fill: "#e2e8f0", stroke: "#cbd5e1", text: "#475569" },
  "#475569": { fill: "#cbd5e1", stroke: "#94a3b8", text: "#475569" },
  "#64748b": { fill: "#94a3b8", stroke: "#94a3b8", text: "#5b6b82" },
  "#94a3b8": { fill: "#64748b", stroke: "#64748b", text: "#475569" },
  "#e2e8f0": { fill: "#334155", stroke: "#334155", text: "#0f172a" },
  "#ffffff": { fill: "#0f172a", stroke: "#0f172a", text: "#0f172a" },
  "#3b5b8f": { fill: "#bfd3f6", stroke: "#93b4e8", text: "#1e40af" },
  "#1f4d33": { fill: "#dcfce7", stroke: "#86efac", text: "#14532d" },
  "#5c2328": { fill: "#fee2e2", stroke: "#fca5a5", text: "#7f1d1d" },
  "#facc15": { fill: "#eab308", stroke: "#ca8a04", text: "#a16207" },
  "#22d3ee": { fill: "#06b6d4", stroke: "#0891b2", text: "#0e7490" },
  "#4ade80": { fill: "#22c55e", stroke: "#16a34a", text: "#15803d" },
  "#fb923c": { fill: "#f97316", stroke: "#ea580c", text: "#c2410c" },
  "#f87171": { fill: "#ef4444", stroke: "#dc2626", text: "#b91c1c" },
  "#a78bfa": { fill: "#8b5cf6", stroke: "#7c3aed", text: "#6d28d9" },
  "#60a5fa": { fill: "#3b82f6", stroke: "#2563eb", text: "#1d4ed8" },
  "#f472b6": { fill: "#ec4899", stroke: "#db2777", text: "#be185d" },
};

export function lightSvg(svg: string, slug = "") {
  const stack: string[] = [];
  return svg.replace(/<(\/?)([a-zA-Z][\w:-]*)([^>]*?)(\/?)>/g, (tag, close: string, name: string, attrs: string, self: string) => {
    if (close) {
      stack.pop();
      return tag;
    }
    const parent = stack[stack.length - 1] ?? "";
    if (!self) stack.push(name);
    const animates = name === "animate" || name === "set";
    const inText = /^(text|tspan)$/.test(name) || (animates && /^(text|tspan)$/.test(parent));
    const target = animates ? (attrs.match(/attributeName="([^"]+)"/)?.[1] ?? "") : "";
    const recolored = attrs.replace(/([\w:-]+)="([^"]*#[^"]*)"/g, (pair, attr: string, value: string) => {
      const prop = animates && /^(values|from|to|by)$/.test(attr) ? target : attr;
      const role = prop === "stroke" ? "stroke" : inText ? "text" : "fill";
      return `${attr}="${value.replace(/#[0-9a-fA-F]{6}\b/g, (c) => {
        const swap = LIGHT[c.toLowerCase()];
        if (!swap) throw new Error(`${slug}: no light color for ${c}`);
        return swap[role];
      })}"`;
    });
    return `<${name}${recolored}${self}>`;
  });
}

export function animationSlugs() {
  return fs.readdirSync(ANIMATIONS).filter((f) => f.endsWith(".svg")).map((f) => f.replace(/\.svg$/, ""));
}

// The opening paragraph of the root README, used as the page's lede.
export function lede() {
  const readme = fs.readFileSync(path.join(REPO_ROOT, "README.md"), "utf8");
  return readme.split("\n\n").find((p) => p.trim() && !p.trim().startsWith("<"))!.trim();
}
