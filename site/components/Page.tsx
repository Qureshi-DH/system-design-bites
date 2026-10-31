import type { Category, Concept } from "../lib/content";

// The static page: every idea, rendered once at build time from the markdown.
// No JavaScript is needed to read it. The header and the rail are hydrated on top.

const Icon = ({ d, size = 15 }: { d: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
    <path d={d} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const REPLAY = "M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5";
const EXPAND = "M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7";

function Idea({ k, num }: { k: Concept; num: string }) {
  return (
    <article className="idea" id={k.slug} data-idea={k.slug} data-num={num} aria-labelledby={`${k.slug}-t`}>
      <h3 id={`${k.slug}-t`}>
        <span className="num">{num}</span> {k.title}
      </h3>
      <p className="line" dangerouslySetInnerHTML={{ __html: k.oneLiner }} />
      {k.loop > 0 && (
        <div className="fig" data-anim={k.slug} data-loop={k.loop}>
          <noscript>
            <img src={`anim/${k.slug}.svg`} alt={`${k.title}, animated`} loading="lazy" />
          </noscript>
          <div className="fig-tools">
            <button type="button" className="replay" aria-label={`Replay the ${k.title} animation`}>
              <Icon d={REPLAY} />
              <span className="fig-label">Replay</span>
            </button>
            <button type="button" className="enlarge" aria-label={`Show the ${k.title} animation full size`}>
              <Icon d={EXPAND} />
              <span className="fig-label">Full size</span>
            </button>
          </div>
        </div>
      )}
      <details className="deep">
        <summary className="more">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="more-open">Read more</span>
          <span className="more-close">Show less</span>
          <span className="vh"> about {k.title}</span>
        </summary>
        <div className="deep-body">
          <h4>How it works</h4>
          <div className="prose" dangerouslySetInnerHTML={{ __html: k.how }} />
          <h4>Example</h4>
          <div className="prose" dangerouslySetInnerHTML={{ __html: k.example }} />
          {k.mermaid && (
            <figure className="diagram">
              <h4>Picture it</h4>
              <div className="mermaid-out" data-mermaid={k.mermaid} />
              <figcaption className="prose" dangerouslySetInnerHTML={{ __html: k.caption }} />
            </figure>
          )}
          {k.related.length > 0 && (
            <div className="related">
              <h4>Related</h4>
              <ul>
                {k.related.map((r) => (
                  <li key={r.slug}>
                    <a href={`#${r.slug}`}>{r.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </details>
    </article>
  );
}

// One full screen viewer for every animation, filled in by the controller.
function Viewer() {
  return (
    <dialog className="viewer" id="viewer" aria-labelledby="viewer-title">
      <div className="viewer-bar">
        <div className="viewer-head">
          <p className="viewer-sec" />
          <h2 id="viewer-title" />
        </div>
        <button type="button" className="viewer-close" aria-label="Close the full size view">
          <Icon d="M6 6l12 12M18 6L6 18" size={18} />
        </button>
      </div>
      <div className="viewer-stage" />
      <p className="viewer-line" />
      <div className="viewer-nav">
        <button type="button" className="viewer-step" data-step="-1">
          <Icon d="M15 5l-7 7 7 7" size={18} />
          <span>
            <span className="viewer-dir">Previous</span>
            <span className="viewer-to" />
          </span>
        </button>
        <button type="button" className="viewer-replay">
          <Icon d={REPLAY} />
          Replay
        </button>
        <button type="button" className="viewer-step" data-step="1">
          <span>
            <span className="viewer-dir">Next</span>
            <span className="viewer-to" />
          </span>
          <Icon d="M9 5l7 7-7 7" size={18} />
        </button>
      </div>
      <p className="viewer-hint">Turn your phone sideways for a bigger view.</p>
    </dialog>
  );
}

export default function Page({ cats, lede }: { cats: Category[]; lede: string }) {
  const all = cats.flatMap((c) => c.concepts);

  return (
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">System Design Bites</h1>
        <p className="lede">{lede}</p>
        <p className="hero-how">
          Here are all {all.length} ideas on one page, each with one line and one moving picture. Click a picture to see
          it full size, and open any idea for the full story.
        </p>
      </section>

      <div id="ideas">
        {cats.map((c) => (
          <section className="section" id={c.dir} key={c.dir} aria-labelledby={`${c.dir}-title`} data-section={c.number}>
            <header className="section-head">
              <span className="section-num" aria-hidden="true">{c.number}</span>
              <h2 id={`${c.dir}-title`}>{c.title}</h2>
              <p>{c.blurb}</p>
            </header>
            {c.concepts.map((k, i) => (
              <Idea key={k.slug} k={k} num={`${c.number}.${i + 1}`} />
            ))}
          </section>
        ))}
      </div>

      <footer className="foot">
        <p>
          Every idea here comes from the markdown files in the{" "}
          <a href="https://github.com/Qureshi-DH/system-design-bites">System Design Bites repository</a>. Shared under
          CC BY 4.0, so you can reuse anything with credit.
        </p>
        <p>
          <a href="#top">Back to the top</a>
        </p>
      </footer>
      <Viewer />
    </main>
  );
}
