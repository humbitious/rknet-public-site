// RKNET — Earnings ticker. Three line types stream in:
// 1) Your Agent engaged by a client/employer
// 2) Super-Agent residual (you co-own a shared Agent)
// 3) Co-op dividend (cooperative-wide payout)

const TICKER_ITEMS = [
  { kind: 'agent',    src: '@m.kade · Agent',        who: 'Acme Industries',   amount: 1840, note: 'engagement closed' },
  { kind: 'residual', src: 'Litigation Super-Agent · 0.4%', who: 'Latham & Watkins',  amount:   62, note: '14 queries' },
  { kind: 'agent',    src: '@r.alvarez · Agent',         who: 'KKR portfolio co.', amount: 3200, note: 'diligence sprint' },
  { kind: 'dividend', src: 'Cooperative dividend',          who: 'Oct 2026',          amount:  412, note: '2,180 members paid' },
  { kind: 'residual', src: 'M&A Super-Agent · 0.9%',        who: 'Goldman Sachs',     amount:  174, note: '41 queries' },
  { kind: 'agent',    src: '@priya.rao · Agent',            who: 'Mayo Clinic',       amount: 2460, note: 'protocol review' },
  { kind: 'residual', src: 'Depo-prep Super-Agent · 0.2%',  who: 'Cravath',           amount:   38, note: '9 queries' },
  { kind: 'agent',    src: '@carlos.diaz · Agent',          who: 'Anthropic',         amount: 1120, note: 'expert interview' },
  { kind: 'dividend', src: 'Residual pool payout',          who: 'Q3 2026',           amount:  286, note: 'per-member base' },
  { kind: 'agent',    src: '@sarah.kim · Agent',            who: 'McKinsey',          amount: 4800, note: 'strategy engagement' },
];

function kindGlyph(k) {
  if (k === 'agent') return '◆';
  if (k === 'residual') return '◇';
  return '◈';
}
function kindLabel(k) {
  if (k === 'agent') return 'Agent engaged';
  if (k === 'residual') return 'Residual';
  return 'Dividend';
}

function EarningsTicker() {
  const [rows, setRows] = React.useState(() => {
    // seed with 4 items
    return TICKER_ITEMS.slice(0, 4).map((it, i) => ({ ...it, id: `seed-${i}`, entering: false }));
  });
  const idxRef = React.useRef(4);
  const idRef = React.useRef(100);

  React.useEffect(() => {
    const push = () => {
      const item = TICKER_ITEMS[idxRef.current % TICKER_ITEMS.length];
      idxRef.current += 1;
      const id = `r-${idRef.current++}`;
      setRows((prev) => {
        const next = [{ ...item, id, entering: true }, ...prev].slice(0, 5);
        // flip entering off after a tick
        setTimeout(() => {
          setRows((p) => p.map(r => r.id === id ? { ...r, entering: false } : r));
        }, 50);
        return next;
      });
    };
    const iv = setInterval(push, 2800);
    return () => clearInterval(iv);
  }, []);

  // Totals block (illustrative, static-ish)
  return (
    <div className="rk-ticker">
      <div className="rk-ticker-head">
        <div className="rk-ticker-h-left">
          <div className="rk-ticker-dot"/>
          <span>Live · cooperative earnings feed</span>
        </div>
        <div className="rk-ticker-h-right">
          <div><span className="rk-ticker-n">$1.84M</span><span className="rk-ticker-l">paid to members · Oct</span></div>
          <div><span className="rk-ticker-n">3,412</span><span className="rk-ticker-l">active Agents</span></div>
          <div><span className="rk-ticker-n">28</span><span className="rk-ticker-l">super-Agents you can co-own</span></div>
        </div>
      </div>
      <div className="rk-ticker-rows">
        {rows.map(r => (
          <div key={r.id} className={`rk-ticker-row rk-ticker-${r.kind} ${r.entering ? 'enter' : ''}`}>
            <span className={`rk-ticker-glyph rk-tg-${r.kind}`}>{kindGlyph(r.kind)}</span>
            <span className="rk-ticker-kind">{kindLabel(r.kind)}</span>
            <span className="rk-ticker-src">{r.src}</span>
            <span className="rk-ticker-who">→ {r.who}</span>
            <span className="rk-ticker-note">{r.note}</span>
            <span className="rk-ticker-amt">+${r.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="rk-ticker-foot">
        <span>Three ways your Agent earns: direct engagements · residuals from super-Agents you co-own · cooperative dividends.</span>
      </div>
    </div>
  );
}

window.EarningsTicker = EarningsTicker;
