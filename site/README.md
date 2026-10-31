# The one page site

Every idea in this repo on a single page, numbered in reading order (4.3 is the third idea in section 4): one line and one big moving picture each, with the full page one click away. The markdown in `concepts/` is the only source. Nothing here copies it; every build reads it fresh.

## Run it

```bash
cd site
npm install
npm run dev
```

That builds the page and serves it at http://localhost:4321. It rebuilds when any markdown, animation, or site file changes. Refresh to see it.

`npm run build` writes the finished site to `site/out/`. It is plain static files, so any static host can serve that folder, at the root or under a subpath.

## Publish it

`.github/workflows/site.yml` builds the site and publishes it to GitHub Pages on every push to main, and once on its own when the repo is made public. While the repo is private it skips every run. Before the first publish, set Pages to deploy from GitHub Actions in the repo settings, once.

## How it is put together

| File | Job |
| --- | --- |
| `lib/content.ts` | Reads the markdown. Section order and blurbs come from each section's README, the reading path from the root README. |
| `components/Page.tsx` | The page itself, rendered once at build time. Each idea's details sit in a plain `<details>`, so they open without script and the browser's find can open them too. |
| `components/Header.tsx`, `Rail.tsx` | The two interactive parts: the header (where you are, jump box, settings) and the rail on the right, a map of the whole page you can hover, click, or drag. |
| `lib/controller.ts` | Loads the animations as you get near them, plays or pauses them, draws diagrams when you open an idea, and handles links and keys. |
| `build.mjs` | Bundles the script and styles with esbuild and writes `out/`. |

The animations are served from `out/anim/` with their ids prefixed by the idea's name, so all of them can live on one page without clashing. Each also gets a light version (`<name>.light.svg`), made at build time by swapping every color for a light partner, so the pictures can be light or dark in either theme.

## Keys

`j` and `k` move to the next or previous idea, `o` opens or closes the one you are on, `r` replays its animation, `f` shows it full size, and `/` opens the jump box. In the full size view, the arrow keys step through the animations.
