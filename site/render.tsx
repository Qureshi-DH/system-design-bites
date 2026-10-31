import fs from "node:fs";
import path from "node:path";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { animationSlugs, animationSvg, getCategories, lede, lightSvg } from "./lib/content";
import { THEME_BOOT, type PageData } from "./lib/shared";
import Page from "./components/Page";
import Header from "./components/Header";
import Rail from "./components/Rail";

const DESCRIPTION =
  "Every system design idea that matters, on one page. One line and one moving picture each, with the full explanation one tap away.";

const plain = (html: string) =>
  html.replace(/<[^>]+>/g, "").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");

// Turns the repo's markdown into out/index.html and the animations into out/anim/.
export async function render({ out, js, css, font }: { out: string; js: string; css: string; font: string }) {
  const cats = await getCategories();
  const data: PageData = {
    index: cats.flatMap((c) =>
      c.concepts.map((k, i) => ({
        slug: k.slug,
        num: `${c.number}.${i + 1}`,
        title: k.title,
        section: c.number,
        sectionTitle: c.title,
        line: plain(k.oneLiner),
      })),
    ),
    sections: cats.map((c) => ({ id: c.dir, number: c.number, title: c.title })),
  };

  fs.mkdirSync(path.join(out, "anim"), { recursive: true });
  for (const slug of animationSlugs()) {
    const svg = animationSvg(slug);
    fs.writeFileSync(path.join(out, "anim", `${slug}.svg`), svg);
    fs.writeFileSync(path.join(out, "anim", `${slug}.light.svg`), lightSvg(svg, slug));
  }

  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>System Design Bites</title>
<meta name="description" content="${DESCRIPTION}">
<meta property="og:title" content="System Design Bites">
<meta property="og:description" content="${DESCRIPTION}">
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0c1322">
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#eef2f7">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preload" href="${font}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${css}">
<script>${THEME_BOOT}</script>
<script type="module" src="${js}"></script>
</head>
<body>
<a class="skip" href="#ideas">Skip to the ideas</a>
<div class="progress" aria-hidden="true"><i class="progress-far"></i><i class="progress-now"></i></div>
<div id="header-root" class="island">${renderToString(<Header {...data} />)}</div>
${renderToStaticMarkup(<Page cats={cats} lede={lede()} />)}
<div id="rail-root">${renderToString(<Rail {...data} />)}</div>
<script id="page-data" type="application/json">${json}</script>
</body>
</html>
`;
  fs.writeFileSync(path.join(out, "index.html"), html);
  return { ideas: data.index.length, sections: data.sections.length, bytes: html.length };
}
