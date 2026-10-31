import { setSettings, type Settings as S } from "../lib/store";
import { FORGET_EVENT, REPLAY_EVENT } from "../lib/shared";

function Choice<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
  hint,
}: {
  legend: string;
  name: string;
  value: T;
  options: [T, string][];
  onChange: (v: T) => void;
  hint?: string;
}) {
  return (
    <fieldset>
      <legend>{legend}</legend>
      <div className="seg">
        {options.map(([v, label]) => (
          <label key={v}>
            <input type="radio" name={name} value={v} checked={value === v} onChange={() => onChange(v)} />
            {label}
          </label>
        ))}
      </div>
      {hint && <p className="hint">{hint}</p>}
    </fieldset>
  );
}

export default function Settings({ settings }: { settings: S }) {
  return (
    <div id="settings" className="settings" popover="auto" role="dialog" aria-labelledby="settings-title">
      <h2 id="settings-title">Settings</h2>
      <button type="button" className="close" popoverTarget="settings" popoverTargetAction="hide" aria-label="Close settings">
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <Choice
        legend="Animations"
        name="play"
        value={settings.play}
        options={[
          ["loop", "Loop"],
          ["once", "Play once"],
          ["paused", "Paused"],
        ]}
        onChange={(play) => setSettings({ play })}
      />
      <button type="button" className="wide" onClick={() => window.dispatchEvent(new Event(REPLAY_EVENT))}>
        Replay the ones on screen
      </button>
      <Choice
        legend="Theme"
        name="theme"
        value={settings.theme}
        options={[
          ["system", "System"],
          ["light", "Light"],
          ["dark", "Dark"],
        ]}
        onChange={(theme) => setSettings({ theme })}
      />
      <Choice
        legend="Animation colors"
        name="illus"
        value={settings.illus}
        options={[
          ["match", "Match"],
          ["light", "Light"],
          ["dark", "Dark"],
        ]}
        onChange={(illus) => setSettings({ illus })}
        hint="Match follows the theme above. Light or Dark keeps every animation that way in either theme."
      />
      <div className="place">
        <p className="place-title">Your place</p>
        <p className="hint">This browser remembers where you stopped, and opens there next time.</p>
        <button type="button" className="wide" onClick={() => window.dispatchEvent(new Event(FORGET_EVENT))}>
          Start over from the top
        </button>
      </div>
      <dl className="keys">
        <div>
          <dt><kbd>j</kbd><kbd>k</kbd></dt>
          <dd>Next or previous idea</dd>
        </div>
        <div>
          <dt><kbd>o</kbd></dt>
          <dd>Open or close the idea you are on</dd>
        </div>
        <div>
          <dt><kbd>/</kbd></dt>
          <dd>Jump to any idea</dd>
        </div>
        <div>
          <dt><kbd>r</kbd></dt>
          <dd>Replay the animation you are on</dd>
        </div>
        <div>
          <dt><kbd>f</kbd></dt>
          <dd>Show its animation full size</dd>
        </div>
      </dl>
    </div>
  );
}
