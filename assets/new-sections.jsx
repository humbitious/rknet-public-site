// Shared new sections: PlatformStrip, SuperAgentGrid, Cleanroom

function PlatformStrip({ variant = 'expert' }) {
  const usCopy = variant === 'expert'
    ? <>RKNET experts publish Agents <em>with their names on them</em>. Individually — or as super-Agents: multiple senior experts teamed up, sharing revenue, sharing reputation, dominating their domain.</>
    : <>RKNET gives you named senior experts, accountable by contract. Or <em>super-Agents</em> — teams of seniors with collective reach no single practitioner can match.</>;

  return (
    <section className="rk-psection">
      <div className="rk-psection-inner">
        <SectionHead
          eyebrow="vs. platforms"
          title={<>Don't help a super-Agent.</>}
          sub="Platforms train one centralized Agent per role on millions of people's work. It scales. Nobody's accountable. The expertise is averaged."
        />
        <div className="rk-platform-strip">
          <div className="rk-platform-col them">
            <div className="rk-platform-lab">The platform monster</div>
            <div className="rk-platform-h">A centralized Agent trained on millions of people's work.</div>
            <p>Averaged. Unaccountable. Owned by the platform.</p>
          </div>
          <div className="rk-platform-col us">
            <div className="rk-platform-lab">The RKNET answer</div>
            <div className="rk-platform-h">Named experts <em>with AI that scales them</em>.</div>
            <p>{usCopy}</p>
          </div>
        </div>
        <div className="rk-sa-defn">A super-Agent is an Agent with the collective residual knowledge of multiple humans who share in the revenue.</div>
      </div>
    </section>
  );
}

function SAFace({ initials }) {
  return <div className="rk-sa-face">{initials}</div>;
}

const SUPER_AGENTS = [
  {
    kind: 'Law',
    name: 'M&A Litigation',
    meta: '7 senior partners · Cravath · Latham · Wachtell alumni',
    faces: ['JW','MR','SK','DP','AL','TO'],
    more: 1,
    rate: '$18k',
    per: 'engagement',
    split: 'Revenue-share · 7 ways',
    exp: 'sa.card.ma-litigation',
  },
  {
    kind: 'Health',
    name: 'Pediatric Oncology',
    meta: '5 clinicians · Mayo · Kaiser · St. Jude',
    faces: ['HP','LR','CN','MV','SA'],
    more: 0,
    rate: '$12k',
    per: 'consult',
    split: 'Revenue-share · 5 ways',
    exp: 'sa.card.pediatric-onc',
  },
  {
    kind: 'Consulting',
    name: 'Supply-Chain Due Diligence',
    meta: '9 senior consultants · McKinsey · Bain · Oliver Wyman alumni',
    faces: ['RW','ND','TJ','KB','EM','GV','BH'],
    more: 2,
    rate: '$24k',
    per: 'engagement',
    split: 'Revenue-share · 9 ways',
    exp: 'sa.card.supply-chain',
  },
];

function SuperAgentGrid({ audience = 'company' }) {
  const title = audience === 'company'
    ? <>Need a team? Hire a <em>super-Agent</em>.</>
    : <>Team up. Be a <em>super-Agent</em>.</>;
  const sub = audience === 'company'
    ? <>Multiple named senior experts, their collective know-how behind every engagement. Priced higher than a solo agent, but 50× less than hiring a bench of experts.<br/><br/>Unlike platforms that brain-scrape experts and fold them into a hive-mind, every super-Agent is the interface for a real team of humans who are directly invested in your success. That means real transparency, real accountability, and work quality that a scraped model can never match.</>
    : 'Join forces with other seniors in your field. Shared revenue, shared reputation, shared SEO gravity. Priced higher than a solo Agent — and you share the upside.';
  return (
    <section className="rk-psection" id="super-agents">
      <div className="rk-psection-inner">
        <SectionHead eyebrow="Super-Agents" title={title} sub={sub} />
        <div className="rk-sa-grid">
          {SUPER_AGENTS.map(sa => (
            <a key={sa.name} href="#" className="rk-sa-card" data-exp={sa.exp}>
              <div className="rk-sa-kind">{sa.kind}</div>
              <div className="rk-sa-name">{sa.name}</div>
              <div className="rk-sa-meta">{sa.meta}</div>
              <div className="rk-sa-faces">
                {sa.faces.slice(0,6).map((f,i) => <SAFace key={i} initials={f} />)}
                {sa.more > 0 && <div className="rk-sa-face more">+{sa.more}</div>}
              </div>
              <div className="rk-sa-row">
                <div className="rk-sa-rate">{sa.rate} <span>/ {sa.per}</span></div>
                <div className="rk-sa-revshare">{sa.split}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Cleanroom ────────────────────────────────────────────
function CleanroomDiagram({ accentHex = '#B8411B' }) {
  return (
    <svg viewBox="0 0 560 300" style={{ width: 500 }} role="img" aria-label="Cleanroom diagram">
      {/* Three private containers */}
      {[
        { x: 20, y: 14, label: '@m.kade' },
        { x: 200, y: 14, label: '@r.alvarez' },
        { x: 380, y: 14, label: '@s.chen' },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width="160" height="48" rx="2"
            fill="#FAF8F5" stroke="#1F1F22" strokeOpacity="0.15" />
          <circle cx={c.x + 14} cy={c.y + 24} r="4" fill={accentHex} />
          <text x={c.x + 24} y={c.y + 20} fontFamily="Inconsolata, monospace" fontSize="8"
            fill="#0B0B0C" letterSpacing="0.06em">PRIVATE CONTAINER</text>
          <text x={c.x + 24} y={c.y + 36} fontFamily="Inconsolata, monospace" fontSize="11"
            fill="#0B0B0C" fontWeight="600">{c.label}</text>
          <line x1={c.x + 80} y1={c.y + 48} x2={c.x + 80} y2="110"
            stroke="#0B0B0C" strokeOpacity="0.35" strokeDasharray="2 3" />
          <polygon points={`${c.x + 76},110 ${c.x + 84},110 ${c.x + 80},118`} fill="#0B0B0C" opacity="0.5" />
        </g>
      ))}
      {/* Cleanroom box */}
      <rect x="20" y="120" width="520" height="100" rx="2" fill="#0B0B0C" />
      <text x="280" y="152" textAnchor="middle" fontFamily="Inconsolata, monospace" fontSize="10"
        fill={accentHex} letterSpacing="0.2em">SEALED CLEANROOM</text>
      <text x="280" y="178" textAnchor="middle" fontFamily="'Source Serif 4', serif" fontSize="16"
        fill="#FAF8F5" fontStyle="italic">Agents collaborate. Nothing crosses between them.</text>
      {/* Exit arrow */}
      <line x1="280" y1="220" x2="280" y2="250" stroke={accentHex} strokeWidth="2" />
      <polygon points="274,250 286,250 280,262" fill={accentHex} />
      {/* Output */}
      <rect x="170" y="264" width="220" height="24" rx="2" fill={accentHex} />
      <text x="280" y="280" textAnchor="middle" fontFamily="Inconsolata, monospace" fontSize="10"
        fill="#FAF8F5" letterSpacing="0.14em">CLIENT DELIVERABLE · OWNED</text>
    </svg>
  );
}

function Cleanroom({ variant = 'expert', accentHex = '#B8411B' }) {
  const subCopy = variant === 'expert'
    ? "When a client hires your Agent or your super-Agent, RKNET creates a sealed workspace that contains your Agents, others' Agents, and the client's Agents, plus any data they need to do the work. Nothing gets out except the requested work product, and nobody has access to open the container unless all parties turn their cryptographic keys together. In the end, the client owns the output — cleanly — and you retain total control over your prior knowledge and any expertise you added during the engagement."
    : "When you hire a super-Agent, multiple experts' Agents collaborate in a sealed cleanroom. No expert sees any other expert's background knowledge. Only the final deliverable — which you own in full — comes out. No contamination. No IP leaks. No ambiguity.";
  return (
    <section className="rk-psection" id="cleanroom">
      <div className="rk-psection-inner">
        <SectionHead
          eyebrow="The cleanroom"
          title={variant === 'expert'
            ? <>Don't get <em>BrainScraped</em>.</>
            : <>No IP contamination. No data walking out the door.</>}
        />
        <div className="rk-cleanroom-wrap">
          <div className="rk-cleanroom-diagram">
            <CleanroomDiagram accentHex={accentHex} />
          </div>
          <div>
            <p className="rk-sechead-sub" style={{ marginTop: 0 }}>{subCopy}</p>
            <div className="rk-cr-chips">
              <span className="rk-cr-chip">No contamination</span>
              <span className="rk-cr-chip">No appropriation</span>
              <span className="rk-cr-chip">Pure collaboration</span>
              <span className="rk-cr-chip">Unambiguous ownership</span>
            </div>
            <div style={{ marginTop: 20, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="#" className="rk-btn rk-btn-link" data-exp="cleanroom.cta.protocol">See the cleanroom protocol →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { PlatformStrip, SuperAgentGrid, Cleanroom });
