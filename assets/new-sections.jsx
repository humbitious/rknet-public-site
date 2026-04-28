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
            <a key={sa.name} href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" rel="noopener" className="rk-sa-card" data-exp={sa.exp}>
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
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How to make your Agent ─────────────────────────────
function HowItWorks({ accentHex = '#B8411B' }) {
  return (
    <section className="rk-psection" id="how">
      <div className="rk-psection-inner">
        <SectionHead
          eyebrow="How to make your Agent"
          title={<>Three steps. About <em>30 minutes</em>.</>}
          sub="Bring in what makes your work yours, teach your Agent how you think, then approve work as engagements come in. Your container stays sealed throughout — only the deliverables ever leave."
        />
        <div className="rk-hiw-grid">
          <HiwStep n="01" title="Bring your context" sub="Drop in the documents, decisions, and connections that shape how you work. Gmail, Calendar, Drive, your notes — your Agent reads them in private. Nothing leaves your container.">
            <SourcesMock />
          </HiwStep>
          <HiwStep n="02" title="Teach your Agent" sub="Have an ongoing conversation about how you actually work. Walk through current engagements and past jobs together. The Agent learns the moves that make you, you.">
            <TeachMock accentHex={accentHex} />
          </HiwStep>
          <HiwStep n="03" title="Your Agent works" sub="When clients engage your Agent, you stay in the loop. Approve scope, review the output, get paid. Cash hits your account; ownership compounds.">
            <WorkMock accentHex={accentHex} />
          </HiwStep>
        </div>
      </div>
    </section>
  );
}

function HiwStep({ n, title, sub, children }) {
  return (
    <div className="rk-hiw-step">
      <div className="rk-hiw-mock">{children}</div>
      <div className="rk-hiw-n">{n}</div>
      <h3 className="rk-hiw-h">{title}</h3>
      <p className="rk-hiw-p">{sub}</p>
    </div>
  );
}

// Mock 1 — Sources panel (docs + MCP connectors)
function SourcesMock() {
  return (
    <div className="rk-mock rk-mock-sources">
      <div className="rk-mock-bar">
        <div className="rk-mock-dots"><span/><span/><span/></div>
        <div className="rk-mock-title">Your container · Sources</div>
      </div>
      <div className="rk-mock-body">
        <div className="rk-mock-lab">Documents</div>
        <div className="rk-mock-docs">
          <div className="rk-mock-doc"><span className="rk-mock-doc-tag">PDF</span><span>Engagement framework — v3.docx</span></div>
          <div className="rk-mock-doc"><span className="rk-mock-doc-tag">XLSX</span><span>Diligence patterns 2018–2025</span></div>
          <div className="rk-mock-doc"><span className="rk-mock-doc-tag">MD</span><span>How I structure first calls</span></div>
          <div className="rk-mock-doc rk-mock-doc-add"><span>+ Add source</span></div>
        </div>
        <div className="rk-mock-lab" style={{ marginTop: 14 }}>Connections</div>
        <div className="rk-mock-chips">
          <div className="rk-mock-chip on"><span className="rk-mock-dot"/>Gmail</div>
          <div className="rk-mock-chip on"><span className="rk-mock-dot"/>Calendar</div>
          <div className="rk-mock-chip on"><span className="rk-mock-dot"/>Drive</div>
          <div className="rk-mock-chip"><span className="rk-mock-dot off"/>Notion</div>
          <div className="rk-mock-chip"><span className="rk-mock-dot off"/>Slack</div>
          <div className="rk-mock-chip"><span className="rk-mock-dot off"/>GitHub</div>
        </div>
      </div>
    </div>
  );
}

// Mock 2 — Teach: split layout, engagement rail + chat
function TeachMock({ accentHex }) {
  return (
    <div className="rk-mock rk-mock-teach">
      <div className="rk-mock-bar">
        <div className="rk-mock-dots"><span/><span/><span/></div>
        <div className="rk-mock-title">Teach your Agent</div>
      </div>
      <div className="rk-mock-split">
        <div className="rk-mock-rail">
          <div className="rk-mock-rail-lab">Current</div>
          <div className="rk-mock-rail-row on">
            <span className="rk-mock-rail-dot" style={{ background: accentHex }}/>
            <span className="rk-mock-rail-name">Acme M&amp;A</span>
            <span className="rk-mock-rail-meta">in flight</span>
          </div>
          <div className="rk-mock-rail-row">
            <span className="rk-mock-rail-dot"/>
            <span className="rk-mock-rail-name">Helio diligence</span>
            <span className="rk-mock-rail-meta">drafting</span>
          </div>
          <div className="rk-mock-rail-lab" style={{ marginTop: 10 }}>Past</div>
          <div className="rk-mock-rail-row">
            <span className="rk-mock-rail-dot off"/>
            <span className="rk-mock-rail-name">Q3 patent landscape</span>
            <span className="rk-mock-rail-meta">closed</span>
          </div>
          <div className="rk-mock-rail-row">
            <span className="rk-mock-rail-dot off"/>
            <span className="rk-mock-rail-name">Article 10 mapping</span>
            <span className="rk-mock-rail-meta">closed</span>
          </div>
          <div className="rk-mock-rail-row">
            <span className="rk-mock-rail-dot off"/>
            <span className="rk-mock-rail-name">Stealth advisory</span>
            <span className="rk-mock-rail-meta">closed</span>
          </div>
        </div>
        <div className="rk-mock-chat">
          <div className="rk-chat-bubble user">When you review a contract, flag any indemnification cap below 2× fees.</div>
          <div className="rk-chat-bubble agent">
            Got it. Looking at your last 12 reviews, you also pushed back on uncapped IP indemnities every time. Should I make that a default flag?
          </div>
          <div className="rk-chat-bubble user small">Yes — and add mutual non-solicit to my standard checklist.</div>
          <div className="rk-chat-input">
            <span className="rk-chat-input-ph">Tell your Agent how you'd handle this…</span>
            <span className="rk-chat-send" style={{ background: accentHex }}>↵</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock 3 — Engagements feed
function WorkMock({ accentHex }) {
  return (
    <div className="rk-mock rk-mock-work">
      <div className="rk-mock-bar">
        <div className="rk-mock-dots"><span/><span/><span/></div>
        <div className="rk-mock-title">Engagements</div>
        <div className="rk-mock-earn">$12,340 <span>this month</span></div>
      </div>
      <div className="rk-mock-body">
        <div className="rk-mock-eng">
          <div className="rk-mock-eng-meta">M&amp;A diligence · super-Agent</div>
          <div className="rk-mock-eng-title">PE firm · Friday close</div>
          <div className="rk-mock-eng-row">
            <span className="rk-mock-eng-status" style={{ color: accentHex }}>● Awaiting your review</span>
            <span className="rk-mock-eng-amt">$2,571</span>
          </div>
        </div>
        <div className="rk-mock-eng">
          <div className="rk-mock-eng-meta">Stealth advising</div>
          <div className="rk-mock-eng-title">Series A founder · concept review</div>
          <div className="rk-mock-eng-row">
            <span className="rk-mock-eng-status work">● In progress</span>
            <span className="rk-mock-eng-amt">$2,400</span>
          </div>
        </div>
        <div className="rk-mock-eng">
          <div className="rk-mock-eng-meta">Compliance · Article 10</div>
          <div className="rk-mock-eng-title">Fortune 500 · regulatory mapping</div>
          <div className="rk-mock-eng-row">
            <span className="rk-mock-eng-status done">● Paid</span>
            <span className="rk-mock-eng-amt">$1,800</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PlatformStrip, SuperAgentGrid, Cleanroom, HowItWorks });
