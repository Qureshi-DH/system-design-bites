// Builds the one page site into out/: a static index.html, the animations, one small
// script, one stylesheet, and the fonts. Run `npm run build`, or `npm run dev` to
// rebuild on every change and serve it at http://localhost:4321.
import * as esbuild from "esbuild";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE = import.meta.dirname;
const OUT = path.join(SITE, "out");
const CACHE = path.join(SITE, ".cache");
// Each build is written here first and swapped into out/ when it is complete, so a
// reload in the middle of a rebuild never gets a page without its styles.
const NEXT = path.join(CACHE, "out");
const watch = process.argv.includes("--watch");
process.chdir(SITE); // the content loader finds the repo from here
const rel = (file) => path.relative(NEXT, file).split(path.sep).join("/");

async function build() {
  const started = Date.now();
  fs.rmSync(NEXT, { recursive: true, force: true });

  // The browser code. Mermaid is split off and only loads when a diagram is opened.
  const client = await esbuild.build({
    entryPoints: [path.join(SITE, "client.tsx")],
    bundle: true,
    splitting: true,
    format: "esm",
    target: "es2022",
    minify: true,
    jsx: "automatic",
    legalComments: "none",
    outdir: path.join(NEXT, "js"),
    entryNames: "[name]-[hash]",
    chunkNames: "[name]-[hash]",
    define: { "process.env.NODE_ENV": '"production"' },
    metafile: true,
    logLevel: "warning",
  });
  const js = Object.keys(client.metafile.outputs).find((f) => client.metafile.outputs[f].entryPoint?.endsWith("client.tsx"));

  // The stylesheet, with the fonts it points to copied next to it.
  const styles = await esbuild.build({
    entryPoints: [path.join(SITE, "styles.css")],
    bundle: true,
    minify: true,
    outdir: path.join(NEXT, "css"),
    entryNames: "[name]-[hash]",
    assetNames: "[name]-[hash]",
    loader: { ".woff2": "file" },
    metafile: true,
    logLevel: "warning",
  });
  const outputs = Object.keys(styles.metafile.outputs);
  const css = outputs.find((f) => f.endsWith(".css"));
  const font = outputs.find((f) => /overpass-latin-wght-normal-.*\.woff2$/.test(f));

  // The page itself, rendered in Node from the markdown.
  await esbuild.build({
    entryPoints: [path.join(SITE, "render.tsx")],
    bundle: true,
    platform: "node",
    format: "esm",
    packages: "external",
    jsx: "automatic",
    outfile: path.join(CACHE, "render.mjs"),
    logLevel: "warning",
  });
  const { render } = await import(`${pathToFileURL(path.join(CACHE, "render.mjs")).href}?v=${Date.now()}`);
  const stats = await render({
    out: NEXT,
    js: rel(path.resolve(js)),
    css: rel(path.resolve(css)),
    font: rel(path.resolve(font)),
  });

  fs.copyFileSync(path.join(SITE, "favicon.svg"), path.join(NEXT, "favicon.svg"));
  fs.rmSync(OUT, { recursive: true, force: true });
  fs.renameSync(NEXT, OUT);

  const kb = (n) => `${Math.round(n / 1024)} KB`;
  const jsSize = fs.statSync(path.join(OUT, rel(path.resolve(js)))).size;
  console.log(
    `Built ${stats.ideas} ideas in ${stats.sections} sections: page ${kb(stats.bytes)}, script ${kb(jsSize)}, in ${Date.now() - started} ms`,
  );
}

await build();

if (watch) {
  // Rebuild when the markdown, the animations, or the site code change. One build at
  // a time: a change that lands during a build queues one more after it.
  let timer;
  let busy = false;
  let queued = false;
  const rebuild = async () => {
    if (busy) {
      queued = true;
      return;
    }
    busy = true;
    await build().catch((e) => console.error(e.message));
    busy = false;
    if (queued) {
      queued = false;
      rebuild();
    }
  };
  const again = () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 120);
  };
  const ignore = /(^|\/)(node_modules|\.git|out|\.cache)(\/|$)/;
  fs.watch(path.join(SITE, ".."), { recursive: true }, (_, file) => file && !ignore.test(file) && again());

  const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
  http
    .createServer((req, res) => {
      const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
      const file = path.join(OUT, url.endsWith("/") ? `${url}index.html` : url);
      if (!file.startsWith(OUT) || !fs.existsSync(file)) {
        res.writeHead(404).end("Not found");
        return;
      }
      res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream", "Cache-Control": "no-store" });
      fs.createReadStream(file).pipe(res);
    })
    .listen(4321, () => console.log("Serving out/ at http://localhost:4321"));
}
