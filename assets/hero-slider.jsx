// RKNET — Cash ↔ Ownership slider (hero's primary CTA test harness)
// Three presets + free drag. Page load picks a preset (persistent per-visitor bucket).
// Each preset has a data-exp id so you can see which converted.

const PROFESSIONS = {
  default: {
    label: 'Default (Mercor tier)',
    min: 10, max: 60, step: 1,
    presets: [
      { id: 'cash-now', label: 'Cash now',  cashPerHr: 60, ownership: 20, exp: 'hero.preset.cash-now',
        blurb: '$60/hr today. 20% ownership of your Agent. RKNET + investors fund the rest.' },
      { id: 'balanced', label: 'Balanced',  cashPerHr: 30, ownership: 55, exp: 'hero.preset.balanced',
        blurb: '$30/hr today. Majority ownership. Residuals + dividends over time.' },
      { id: 'owner',    label: 'Owner',     cashPerHr: 10, ownership: 80, exp: 'hero.preset.owner',
        blurb: 'Skip most of today for real ownership. 80% of your Agent revenue - forever.' },
    ],
  },
  law: {
    label: 'Law partner',
    min: 40, max: 280, step: 5,
    presets: [
      { id: 'cash-now', label: 'Cash now', cashPerHr: 280, ownership: 20, exp: 'hero.preset.cash-now',
        blurb: '$280/hr today. 20% ownership. Closest to your current billable rate.' },
      { id: 'balanced', label: 'Balanced', cashPerHr: 120, ownership: 55, exp: 'hero.preset.balanced',
        blurb: '$120/hr today. Majority ownership. Residuals + super-Agent payouts.' },
      { id: 'owner',    label: 'Owner',    cashPerHr: 40,  ownership: 80, exp: 'hero.preset.owner',
        blurb: '$40/hr today, 80% ownership. Build the practice-as-asset.' },
    ],
  },
  physician: {
    label: 'Specialist physician',
    min: 35, max: 240, step: 5,
    presets: [
      { id: 'cash-now', label: 'Cash now', cashPerHr: 240, ownership: 20, exp: 'hero.preset.cash-now',
        blurb: '$240/hr today. 20% ownership.' },
      { id: 'balanced', label: 'Balanced', cashPerHr: 110, ownership: 55, exp: 'hero.preset.balanced',
        blurb: '$110/hr today. Majority ownership.' },
      { id: 'owner',    label: 'Owner',    cashPerHr: 35,  ownership: 80, exp: 'hero.preset.owner',
        blurb: '$35/hr today, 80% ownership.' },
    ],
  },
  consulting: {
    label: 'MBB consultant',
    min: 30, max: 220, step: 5,
    presets: [
      { id: 'cash-now', label: 'Cash now', cashPerHr: 220, ownership: 20, exp: 'hero.preset.cash-now',
        blurb: '$220/hr today. 20% ownership.' },
      { id: 'balanced', label: 'Balanced', cashPerHr: 90,  ownership: 55, exp: 'hero.preset.balanced',
        blurb: '$90/hr today. Majority ownership.' },
      { id: 'owner',    label: 'Owner',    cashPerHr: 30,  ownership: 80, exp: 'hero.preset.owner',
        blurb: '$30/hr today, 80% ownership.' },
    ],
  },
  swe: {
    label: 'Software engineer',
    min: 20, max: 140, step: 5,
    presets: [
      { id: 'cash-now', label: 'Cash now', cashPerHr: 140, ownership: 20, exp: 'hero.preset.cash-now',
        blurb: '$140/hr today. 20% ownership.' },
      { id: 'balanced', label: 'Balanced', cashPerHr: 60,  ownership: 55, exp: 'hero.preset.balanced',
        blurb: '$60/hr today. Majority ownership.' },
      { id: 'owner',    label: 'Owner',    cashPerHr: 20,  ownership: 80, exp: 'hero.preset.owner',
        blurb: '$20/hr today, 80% ownership.' },
    ],
  },
};
window.RK_PROFESSIONS = PROFESSIONS;

// Kept for backcompat but no longer used directly — profession presets now drive the UI.
const SLIDER_PRESETS = PROFESSIONS.default.presets;

function pickPreset() {
  try {
    const k = 'rknet-hero-bucket';
    let b = localStorage.getItem(k);
    if (!b) {
      b = SLIDER_PRESETS[Math.floor(Math.random() * SLIDER_PRESETS.length)].id;
      localStorage.setItem(k, b);
    }
    return b;
  } catch { return 'balanced'; }
}

// Projected cumulative earnings over 10 years.
// cashPerHr drives billable-hour income; ownership drives your share of Agent revenue.
// Agent annual revenue ramps from Y1 to Y10; the ramp floor/ceiling scale with profession rates.
function projectEarnings({ cashPerHr, ownership, profession = 'default' }) {
  const prof = (window.RK_PROFESSIONS && window.RK_PROFESSIONS[profession]) || window.RK_PROFESSIONS.default;
  const years = 10;
  const billableHrs = 900;
  // Scale Agent revenue ramp to profession's top rate
  const topRate = prof.max;
  const revFloor = Math.round(topRate * 900 * 0.20);  // y1 agent revenue ≈ 20% of top billable
  const revCeil  = Math.round(topRate * 900 * 1.30);  // y10 agent revenue ≈ 130% of top billable
  const out = [];
  let sum = 0;
  for (let y = 1; y <= years; y++) {
    const cashYr = cashPerHr * billableHrs;
    const agentRev = revFloor + (y - 1) * ((revCeil - revFloor) / (years - 1));
    const agentShare = agentRev * (ownership / 100);
    const yearly = cashYr + agentShare;
    sum += yearly;
    out.push({ year: y, yearly, cum: sum });
  }
  return out;
}

function formatMoney(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}k`;
  return `$${Math.round(n)}`;
}

function EarningsCurve({ cashPerHr, ownership, profession, accentHex }) {
  const data = projectEarnings({ cashPerHr, ownership, profession });
  const w = 520, h = 180, padL = 44, padR = 14, padT = 12, padB = 22;
  const maxY = Math.max(...data.map(d => d.cum));
  const xFor = (i) => padL + (i / (data.length - 1)) * (w - padL - padR);
  const yFor = (v) => padT + (1 - v / maxY) * (h - padT - padB);
  const pts = data.map((d, i) => `${xFor(i)},${yFor(d.cum)}`).join(' ');
  const areaPts = `${padL},${h - padB} ${pts} ${xFor(data.length - 1)},${h - padB}`;
  const last = data[data.length - 1];
  const yTicks = [0, 0.5, 1].map(t => t * maxY);

  return (
    <div className="rk-curve">
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        {/* grid */}
        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={padL} x2={w - padR} y1={yFor(t)} y2={yFor(t)} stroke="currentColor" strokeOpacity="0.12" strokeDasharray="2 3" />
            <text x={padL - 6} y={yFor(t) + 3} textAnchor="end" fontSize="9" fill="currentColor" fillOpacity="0.55" fontFamily="var(--mono)">{formatMoney(t)}</text>
          </g>
        ))}
        {/* x labels */}
        {data.filter((_, i) => i % 2 === 1).map(d => (
          <text key={d.year} x={xFor(d.year - 1)} y={h - 6} textAnchor="middle" fontSize="9" fill="currentColor" fillOpacity="0.55" fontFamily="var(--mono)">Y{d.year}</text>
        ))}
        {/* area */}
        <polygon points={areaPts} fill={accentHex} fillOpacity="0.12" />
        {/* line */}
        <polyline points={pts} fill="none" stroke={accentHex} strokeWidth="2" strokeLinejoin="round" />
        {/* endpoint */}
        <circle cx={xFor(data.length - 1)} cy={yFor(last.cum)} r="4" fill={accentHex} />
        <text x={xFor(data.length - 1) - 4} y={yFor(last.cum) - 10} textAnchor="end" fontSize="11" fontWeight="600" fill="currentColor">
          {formatMoney(last.cum)} by Y{last.year}
        </text>
      </svg>
    </div>
  );
}

function OwnershipSlider({ accentHex = '#B8411B', profession = 'default' }) {
  const prof = PROFESSIONS[profession] || PROFESSIONS.default;
  const presets = prof.presets;
  // Default preset: cash-now (per founder guidance — most people start there)
  const initialPreset = presets[0];
  const [cashPerHr, setCashPerHr] = React.useState(initialPreset.cashPerHr);
  const [ownership, setOwnership] = React.useState(initialPreset.ownership);
  const [activeId, setActiveId] = React.useState(initialPreset.id);

  // Reset when profession changes
  React.useEffect(() => {
    const p = PROFESSIONS[profession] || PROFESSIONS.default;
    setCashPerHr(p.presets[0].cashPerHr);
    setOwnership(p.presets[0].ownership);
    setActiveId(p.presets[0].id);
    RKTrack.bump(`hero.profession.${profession}`);
  }, [profession]);

  React.useEffect(() => {
    RKTrack.bump(`hero.preset-shown.${initialPreset.id}`);
  }, []);

  const choose = (p) => {
    setCashPerHr(p.cashPerHr); setOwnership(p.ownership); setActiveId(p.id);
    RKTrack.bump(p.exp);
  };

  // Cash/hr -> ownership on a linear curve between the profession's min (80% own) and max (20% own)
  const onCashChange = (v) => {
    setCashPerHr(v);
    const range = prof.max - prof.min;
    const t = range > 0 ? (v - prof.min) / range : 0;
    const own = Math.round(80 - t * 60);
    setOwnership(Math.max(10, Math.min(95, own)));
    setActiveId('custom');
  };

  const totals = projectEarnings({ cashPerHr, ownership, profession });
  const tenYr = totals[totals.length - 1].cum;
  const rknetCut = 100 - ownership;

  return (
    <div className="rk-slider-card">
      <div className="rk-slider-head">
        <div className="rk-slider-eyebrow">Your deal</div>
        <div className="rk-slider-title">More Cash Now, or More Ownership Forever?</div>
        <div className="rk-slider-hint">Experts who take less cash up front keep more of the Agent's lifetime revenue. RKNET + investors fund the rest - we win when you do.</div>
      </div>

      <div className="rk-slider-presets">
        {presets.map(p => (
          <button key={p.id}
            className={`rk-slider-preset ${activeId === p.id ? 'on' : ''}`}
            onClick={() => choose(p)}
            data-exp={p.exp}>
            <div className="rk-slider-preset-label">{p.label}</div>
            <div className="rk-slider-preset-split">
              <span><strong>${p.cashPerHr}</strong>/hr</span>
              <span className="rk-slider-preset-div">·</span>
              <span><strong>{p.ownership}%</strong> ownership</span>
            </div>
          </button>
        ))}
      </div>

      <div className="rk-slider-rail">
        <div className="rk-slider-labels">
          <span>Less cash · more ownership</span>
          <span>More cash · less ownership</span>
        </div>
        <input type="range" min={prof.min} max={prof.max} step={prof.step} value={cashPerHr}
          onChange={(e) => onCashChange(Number(e.target.value))}
          onMouseUp={() => RKTrack.bump('hero.slider.drag')}
          onTouchEnd={() => RKTrack.bump('hero.slider.drag')}
          className="rk-slider-range"
          style={{ '--accent': accentHex }} />
        <div className="rk-slider-readout">
          <div><span className="rk-slider-n">${cashPerHr}<span className="rk-slider-n-sm">/hr</span></span><span className="rk-slider-l">cash now</span></div>
          <div><span className="rk-slider-n">{ownership}%</span><span className="rk-slider-l">you own · forever</span></div>
        </div>
        <div className="rk-slider-split">
          <div className="rk-slider-split-bar">
            <div className="rk-slider-split-you" style={{ width: `${ownership}%` }}>You {ownership}%</div>
            <div className="rk-slider-split-us" style={{ width: `${rknetCut}%` }}>RKNET + investors {rknetCut}%</div>
          </div>
        </div>
      </div>

      <div className="rk-slider-curve">
        <div className="rk-slider-curve-head">
          <div>
            <div className="rk-slider-curve-lab">Projected 10-year total</div>
            <div className="rk-slider-curve-n">{formatMoney(tenYr)}</div>
          </div>
          <div className="rk-slider-curve-note">
            Billable hours + your share of Agent revenue.
            <br/><span className="rk-dim">Illustrative. Super-Agent residuals not included.</span>
          </div>
        </div>
        <EarningsCurve cashPerHr={cashPerHr} ownership={ownership} profession={profession} accentHex={accentHex} />
      </div>
    </div>
  );
}

window.OwnershipSlider = OwnershipSlider;
window.SLIDER_PRESETS = SLIDER_PRESETS;
