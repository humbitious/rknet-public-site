// RKNET v2 — shared product-page building blocks
// Click tracking via data-exp attrs; see window.RKTrack.

const RK = {
  ink: '#0B0B0C', paper: '#FAF8F5', rule: '#1F1F22',
  accent: '#B8411B', mute: '#6B6B72',
};

// ───── Click tracking ─────────────────────────────────────
const RKTrack = (() => {
  const KEY = 'rknet-exp-clicks';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; } };
  const write = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch {} };
  const listeners = new Set();
  const bump = (id) => {
    if (!id) return;
    const m = read();
    m[id] = (m[id] || 0) + 1;
    write(m);
    listeners.forEach((fn) => fn(m));
  };
  return {
    bump, all: read,
    subscribe: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
    reset: () => { write({}); listeners.forEach((fn) => fn({})); },
  };
})();
window.RKTrack = RKTrack;

// Global click interceptor — every element with [data-exp] counts on click.
if (!window.__rkTrackInstalled) {
  window.__rkTrackInstalled = true;
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-exp]');
    if (el) RKTrack.bump(el.getAttribute('data-exp'));
  }, true);
}

// ───── Product-page chrome ────────────────────────────────

function ProductNav({ audience, onCross, wordmarkStyle, ctaLabel, ctaExp }) {
  const cross = audience === 'expert'
    ? { label: 'For companies', to: 'company', exp: 'nav.cross.to-company', href: 'for-companies/index.html' }
    : { label: 'For experts', to: 'expert', exp: 'nav.cross.to-expert', href: '../index.html' };
  const scrollTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <header className="rk-nav">
      <div className="rk-nav-inner">
        <a href="#" onClick={scrollTop} className="rk-nav-brand" data-exp="nav.brand">
          <span className={`rk-wordmark rk-wordmark-${wordmarkStyle}`}>RKNET</span>
          <span className="rk-nav-badge">{audience === 'expert' ? 'for experts' : 'for companies'}</span>
        </a>
        <nav className="rk-nav-links">
          <a href="#how" data-exp="nav.how">How it works</a>
          {audience === 'expert'
            ? <a href="#ledger" data-exp="nav.earnings">Earnings</a>
            : <a href="#pricing" data-exp="nav.pricing">Pricing</a>}
          {audience === 'expert' && <a href="#faq" data-exp="nav.faq">FAQ</a>}
        </nav>
        <div className="rk-nav-right">
          <a href={cross.href} className="rk-nav-cross" data-exp={cross.exp}>{cross.label} →</a>
          <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-nav-cta" data-exp={ctaExp || 'nav.cta'}>{ctaLabel}</a>
        </div>
      </div>
    </header>
  );
}

function StickyCTABar({ children }) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className={`rk-sticky-bar ${visible ? 'on' : ''}`}>{children}</div>;
}

function SocialProof({ items, label }) {
  return (
    <section className="rk-proof">
      <div className="rk-proof-inner">
        {label && <div className="rk-proof-lab">{label}</div>}
        <div className="rk-proof-row">
          {items.map((it, i) => <div key={i} className="rk-proof-logo">{it}</div>)}
        </div>
      </div>
    </section>
  );
}

function FeatureGrid({ items }) {
  return (
    <div className="rk-fgrid">
      {items.map((f, i) => {
        const isExternal = f.ctaHref && /^https?:/i.test(f.ctaHref);
        return (
          <div key={i} className="rk-fcard">
            <div className="rk-fcard-icon" aria-hidden>{f.icon}</div>
            <h4>{f.title}</h4>
            <p>{f.desc}</p>
            {f.cta && f.ctaHref && (
              <a href={f.ctaHref}
                 target={isExternal ? '_blank' : undefined}
                 rel={isExternal ? 'noopener' : undefined}
                 className="rk-fcard-cta"
                 data-exp={f.ctaExp}>{f.cta} →</a>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PricingGrid({ tiers }) {
  return (
    <div className="rk-pricing">
      {tiers.map((t, i) => (
        <div key={i} className={`rk-plan ${t.highlight ? 'featured' : ''}`}>
          {t.ribbon && <div className="rk-plan-ribbon">{t.ribbon}</div>}
          <div className="rk-plan-head">
            <div className="rk-plan-name">{t.name}</div>
            <div className="rk-plan-tag">{t.tag}</div>
          </div>
          <div className="rk-plan-price">
            <span className="rk-plan-n">{t.price}</span>
            {t.per && <span className="rk-plan-per">{t.per}</span>}
          </div>
          <ul className="rk-plan-feats">
            {t.feats.map((f, j) => <li key={j}>{f}</li>)}
          </ul>
          <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className={`rk-plan-cta ${t.ctaStyle || ''}`} data-exp={t.exp}>{t.cta}</a>
          {t.note && <div className="rk-plan-note">{t.note}</div>}
        </div>
      ))}
    </div>
  );
}

function FAQ({ items }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div className="rk-faq">
      {items.map((it, i) => (
        <div key={i} className={`rk-faq-item ${open === i ? 'on' : ''}`}>
          <button className="rk-faq-q" data-exp={`faq.open.${it.id || i}`}
            onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{it.q}</span>
            <span className="rk-faq-plus">{open === i ? '−' : '+'}</span>
          </button>
          {open === i && <div className="rk-faq-a">{it.a}</div>}
        </div>
      ))}
    </div>
  );
}

function SectionHead({ eyebrow, title, sub, align = 'left' }) {
  return (
    <div className={`rk-sechead rk-sechead-${align}`}>
      {eyebrow && <div className="rk-sechead-eyebrow">{eyebrow}</div>}
      <h2 className="rk-sechead-title">{title}</h2>
      {sub && <p className="rk-sechead-sub">{sub}</p>}
    </div>
  );
}

function ProductFooter({ audience, onCross }) {
  const otherLabel = audience === 'expert' ? 'For companies who hire experts' : 'For experts you hire';
  const otherTo = audience === 'expert' ? 'company' : 'expert';
  const [legalOpen, setLegalOpen] = React.useState(null); // 'privacy' | 'terms' | null

  const openLegal = (e, type) => {
    e.preventDefault();
    setLegalOpen(type);
  };

  const secondLink = audience === 'expert'
    ? <a href="#ledger" data-exp="footer.earnings">Earnings</a>
    : <a href="#pricing" data-exp="footer.pricing">Pricing</a>;

  return (
    <footer className="rk-pfooter">
      <div className="rk-pfooter-inner">
        <div className="rk-pfooter-brand">
          <div className="rk-foot-word">RKNET</div>
          <p>Agent infrastructure for senior professionals and the companies that hire them. Member-owned.</p>
          <div className="rk-foot-chips">
            <span>SOC 2 · in progress</span>
            <span>EU AI Act · Art. 10</span>
            <span>Confidential compute</span>
          </div>
        </div>
        <div className="rk-pfooter-col">
          <div className="rk-foot-lab">Product</div>
          <a href="#how" data-exp="footer.how">How it works</a>
          {secondLink}
          {audience === 'expert' && <a href="#faq" data-exp="footer.faq">FAQ</a>}
        </div>
        <div className="rk-pfooter-col">
          <div className="rk-foot-lab">Network</div>
          <a href="#" onClick={(e) => { e.preventDefault(); onCross(otherTo); }} data-exp={`footer.cross.${otherTo}`}>{otherLabel} →</a>
        </div>
      </div>
      <div className="rk-pfooter-base">
        <span>© 2026 Residual Knowledge Network · a Delaware public benefit entity</span>
        <span>
          <a href="#" onClick={(e) => openLegal(e, 'terms')} data-exp="footer.terms">Terms</a>
        </span>
      </div>
      {legalOpen && <LegalModal type={legalOpen} onClose={() => setLegalOpen(null)} />}
    </footer>
  );
}

function LegalModal({ type, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const title = 'Terms of Use';
  const Body = TermsBody;

  return (
    <div className="rk-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="rk-modal" onClick={(e) => e.stopPropagation()}>
        <button className="rk-modal-close" onClick={onClose} aria-label="Close">×</button>
        <h2 className="rk-modal-title">{title}</h2>
        <p className="rk-modal-eff">Effective April 26, 2026</p>
        <div className="rk-modal-body"><Body /></div>
      </div>
    </div>
  );
}

function TermsBody() {
  return (
    <>
      <h3>1. About this site</h3>
      <p>residualknowledge.net is the marketing site for RKNET, a project in early development. The product described is forward-looking. Features, timelines, pricing, and architectural details may change without notice.</p>

      <h3>2. No service, no warranty</h3>
      <p>Nothing on this site constitutes the provision of a service. The site is provided "as is" with no warranty of accuracy, availability, or fitness for any purpose. Information here is informational only and is not legal, financial, or professional advice.</p>

      <h3>3. Submissions</h3>
      <p>By submitting a form, you confirm the information is yours to share and accurate to your knowledge.</p>

      <h3>4. Intellectual property</h3>
      <p>All content on this site is owned by Residual Knowledge Network or its contributors. You may share links to public pages. You may not reproduce or republish content without written permission.</p>

      <h3>5. Governing law</h3>
      <p>These terms are governed by the laws of the State of Delaware, USA, without regard to conflict-of-laws principles. Any dispute relating to this site shall be brought in the state or federal courts located in Delaware.</p>

      <h3>6. Changes</h3>
      <p>We may update these terms. Material changes will be posted here with a revised effective date.</p>

      <p className="rk-modal-meta">Residual Knowledge Network, a Delaware public benefit entity (in formation).</p>
    </>
  );
}

// ───── Product mockups (serve as hero screenshots) ───────

function AgentScreen() {
  return (
    <div className="rk-vault-screen">
      <div className="rk-vs-chrome">
        <div className="rk-vs-dots"><span/><span/><span/></div>
        <div className="rk-vs-url">rknet.co / @m.kade</div>
        <div className="rk-vs-actions"><span>◆ Private container</span></div>
      </div>
      <div className="rk-vs-body">
        <div className="rk-vs-side">
          <div className="rk-vs-side-user">
            <div className="rk-vs-avatar">MK</div>
            <div>
              <div className="rk-vs-uname">@m.kade</div>
              <div className="rk-vs-urole">M&amp;A litigator · 22y</div>
            </div>
          </div>
          <div className="rk-vs-nav">
            <div className="rk-vs-navitem on">My Agent</div>
            <div className="rk-vs-navitem">Engagements <span className="rk-vs-badge">3</span></div>
            <div className="rk-vs-navitem">Earnings <span className="rk-vs-badge accent">$</span></div>
            <div className="rk-vs-navitem">Super-Agents <span className="rk-vs-badge">5</span></div>
            <div className="rk-vs-navitem">Directory</div>
            <div className="rk-vs-navitem">Audit log</div>
          </div>
        </div>
        <div className="rk-vs-main">
          <div className="rk-vs-head">
            <div>
              <div className="rk-vs-title">Your Agent · live</div>
              <div className="rk-vs-subt">Representing @m.kade across the network.</div>
            </div>
            <div className="rk-vs-cta">＋ Take a meeting</div>
          </div>
          <div className="rk-vs-cards">
            <div className="rk-vs-card">
              <div className="rk-vs-ckind">Engagements · October</div>
              <div className="rk-vs-cn">7</div>
              <div className="rk-vs-cmeta">5 Agent-led · 2 with you in the loop</div>
            </div>
            <div className="rk-vs-card featured">
              <div className="rk-vs-ckind">Earnings · October</div>
              <div className="rk-vs-cn">$18,420</div>
              <div className="rk-vs-cmeta">Direct · residuals · dividend</div>
            </div>
            <div className="rk-vs-card">
              <div className="rk-vs-ckind">Super-Agents you co-own</div>
              <div className="rk-vs-cn">5</div>
              <div className="rk-vs-cmeta">Litigation · Depo-prep · M&amp;A …</div>
            </div>
            <div className="rk-vs-card">
              <div className="rk-vs-ckind">Container</div>
              <div className="rk-vs-cn">Sealed</div>
              <div className="rk-vs-cmeta">Only you can read it</div>
            </div>
          </div>
          <div className="rk-vs-feed">
            <div className="rk-vs-feed-lab">Today</div>
            <div className="rk-vs-row">
              <span className="rk-vs-dot accent"/><span>Agent engaged by Acme · $1,840 · expert-in-loop requested</span><span className="rk-vs-time">2h ago</span>
            </div>
            <div className="rk-vs-row">
              <span className="rk-vs-dot"/><span>Residual · M&amp;A Super-Agent engaged by Goldman — $174</span><span className="rk-vs-time">5h ago</span>
            </div>
            <div className="rk-vs-row">
              <span className="rk-vs-dot accent"/><span>New engagement request · Patterson &amp; Co.</span><span className="rk-vs-time">yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EngagementScreen() {
  const agentCardStyle = {
    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
    background: 'rgba(255,255,255,0.06)', borderRadius: 6, fontSize: 11,
  };
  const statusDot = (color) => ({
    width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0,
  });
  const cleanroomBadge = {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    background: 'rgba(76,175,80,0.12)', color: '#81C784', fontSize: 9,
    padding: '2px 7px', borderRadius: 3, letterSpacing: '0.05em', textTransform: 'uppercase',
    fontFamily: "'JetBrains Mono', monospace",
  };
  const shieldIcon = (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 0L0 2.2V5.5C0 8.5 2.1 11.3 5 12C7.9 11.3 10 8.5 10 5.5V2.2L5 0Z" fill="#81C784" opacity="0.7"/>
      <path d="M4 6.5L2.8 5.3L2.1 6L4 7.9L8 3.9L7.3 3.2L4 6.5Z" fill="#fff"/>
    </svg>
  );

  return (
    <div className="rk-vault-screen">
      <div className="rk-vs-chrome">
        <div className="rk-vs-dots"><span/><span/><span/></div>
        <div className="rk-vs-url">rknet.co / dashboard / acme-industries</div>
        <div className="rk-vs-actions"><span className="rk-vs-live">● live</span></div>
      </div>
      <div className="rk-vs-body rk-vs-body-eng" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="rk-vs-title" style={{ fontSize: 13 }}>Acme Industries</div>
            <div style={{ fontSize: 10, opacity: 0.5, marginTop: 2 }}>3 active engagements · 5 agents</div>
          </div>
          <div style={cleanroomBadge}>{shieldIcon} Cleanroom active</div>
        </div>

        {/* Agent cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.4, fontFamily: "'JetBrains Mono', monospace" }}>Your expert agents</div>

          <div style={agentCardStyle}>
            <div style={statusDot('#81C784')}></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>@r.chen · IP Strategy</div>
              <div style={{ opacity: 0.45, fontSize: 10, marginTop: 1 }}>Delivering · 3 outputs ready for review</div>
            </div>
            <div style={{ ...cleanroomBadge, fontSize: 8 }}>{shieldIcon} Clean</div>
          </div>

          <div style={agentCardStyle}>
            <div style={statusDot('#81C784')}></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>@m.kade · Regulatory</div>
              <div style={{ opacity: 0.45, fontSize: 10, marginTop: 1 }}>Working · EU AI Act mapping in progress</div>
            </div>
            <div style={{ ...cleanroomBadge, fontSize: 8 }}>{shieldIcon} Clean</div>
          </div>

          <div style={agentCardStyle}>
            <div style={statusDot('#FFB74D')}></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>@j.wu · M&amp;A Diligence</div>
              <div style={{ opacity: 0.45, fontSize: 10, marginTop: 1 }}>Awaiting your feedback on draft report</div>
            </div>
            <div style={{ ...cleanroomBadge, fontSize: 8 }}>{shieldIcon} Clean</div>
          </div>
        </div>

        {/* Output review */}
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 6, padding: '10px 12px' }}>
          <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.4, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>Ready for review</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11 }}>
              <span>Patent landscape analysis</span>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ opacity: 0.4, fontSize: 10 }}>PDF · 24 pg</span>
                <span style={{ background: 'rgba(184,65,27,0.2)', color: '#E8845C', padding: '2px 6px', borderRadius: 3, fontSize: 9, cursor: 'pointer' }}>Review</span>
                <span style={{ opacity: 0.3, cursor: 'pointer' }}>↓</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11 }}>
              <span>Competitor IP risk matrix</span>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ opacity: 0.4, fontSize: 10 }}>XLSX</span>
                <span style={{ background: 'rgba(184,65,27,0.2)', color: '#E8845C', padding: '2px 6px', borderRadius: 3, fontSize: 9, cursor: 'pointer' }}>Review</span>
                <span style={{ opacity: 0.3, cursor: 'pointer' }}>↓</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11 }}>
              <span>Article 10 compliance memo</span>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ opacity: 0.4, fontSize: 10 }}>PDF · 8 pg</span>
                <span style={{ background: 'rgba(255,255,255,0.08)', color: '#81C784', padding: '2px 6px', borderRadius: 3, fontSize: 9 }}>Approved</span>
                <span style={{ opacity: 0.3, cursor: 'pointer' }}>↓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cleanroom footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'rgba(76,175,80,0.06)', borderRadius: 5, border: '1px solid rgba(76,175,80,0.12)' }}>
          {shieldIcon}
          <div style={{ fontSize: 10, opacity: 0.6, lineHeight: 1.4 }}>
            All agents operating in sealed cleanroom. Zero IP contamination events. Zero cross-engagement data leakage.
          </div>
        </div>
      </div>
    </div>
  );
}

// ───── Bio (removed per founder request) ───────────────

function Bio() { return null; }

// ───── CTA intercept ─────────────────────────────────────

function rkCtaIntercept(e, trackId) {
  e.preventDefault();
  RKTrack.bump(trackId);
  window.open('https://forms.gle/K3DgLqJTF8Si1wBdA', '_blank');
}

// ───── CTA forms ──────────────────────────────────────────

function ExpertCTA({ state, setState }) {
  const [handle, setHandle] = React.useState('m.kade');
  const [email, setEmail] = React.useState('');
  const [residuals, setResiduals] = React.useState(true);
  const isErr = state === 'error';
  const isSub = state === 'submitted';
  const isFoc = state === 'focus';

  if (isSub) {
    return (
      <div className="rk-confirm">
        <div className="rk-confirm-mark">◆</div>
        <div>
          <h4>@{handle || 'your-handle'} — your Agent is reserved.</h4>
          <p>Check your inbox for the setup link. When you connect your AI subscription, your vault and handle travel with you forever. No employer, including RKNET, can repossess them.</p>
          <div className="rk-counter">
            <span className="rk-counter-n">3,412</span>
            <span className="rk-counter-l">vaults reserved · 94% opt into earnings</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form className={`rk-form ${isFoc ? 'is-focus' : ''} ${isErr ? 'is-error' : ''}`}
          onSubmit={(e) => rkCtaIntercept(e, 'cta.expert.submit')}>
      <div className="rk-form-row">
        <div className="rk-handle-input">
          <span className="rk-at">@</span>
          <input value={handle} onChange={(e) => setHandle(e.target.value)} aria-label="Handle" data-exp="form.expert.handle" />
          <span className={`rk-avail ${isErr ? 'err' : 'ok'}`}>{isErr ? 'taken' : 'available'}</span>
        </div>
        <input className="rk-text" type="email" placeholder="you@work.com"
               value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" data-exp="form.expert.email" />
      </div>
      <label className="rk-check">
        <input type="checkbox" checked={residuals} onChange={(e) => setResiduals(e.target.checked)} data-exp="form.expert.earnings" />
        <span>Turn on <strong>earnings</strong> — get paid when your agent profile is reused.</span>
      </label>
      {isErr && <div className="rk-form-err">That handle is reserved. Handles travel with you for your whole career — try another.</div>}
      <div className="rk-form-foot">
        <button type="submit" className="rk-btn rk-btn-primary" data-exp="cta.expert.primary.claim-agent">Claim your Agent</button>
      </div>
    </form>
  );
}

function CompanyCTA({ state, setState, mode }) {
  // mode: 'invite' | 'demo' | 'pack'
  const effectiveMode = mode || 'invite';
  const [handle, setHandle] = React.useState('');
  const [myName, setMyName] = React.useState('');
  const [myEmail, setMyEmail] = React.useState('');
  const [org, setOrg] = React.useState('');
  const [scope, setScope] = React.useState('');
  const isErr = state === 'error';
  const isSub = state === 'submitted';
  const isFoc = state === 'focus';

  if (isSub) {
    if (effectiveMode === 'pack') {
      return (
        <div className="rk-confirm">
          <div className="rk-confirm-mark">◆</div>
          <div>
            <h4>Compliance pack on its way.</h4>
            <p>One PDF: sample audit certificate, Engagement Contract, and Article 10 mapping. Calendar link included.</p>
          </div>
        </div>
      );
    }
    if (effectiveMode === 'demo') {
      return (
        <div className="rk-confirm">
          <div className="rk-confirm-mark">◆</div>
          <div>
            <h4>Demo request received.</h4>
            <p>We'll reply within one business day with three calendar slots. 30 min walkthrough of the workspace and audit trail on your own sample engagement.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="rk-confirm">
        <div className="rk-confirm-mark">◆</div>
        <div>
          <h4>Invite sent{handle ? ` to @${handle}` : ''}.</h4>
          <p>When they accept, both of you are bound to the Engagement Contract. You'll get a workspace link and cryptographic receipts for every query.</p>
        </div>
      </div>
    );
  }

  if (effectiveMode === 'pack') {
    return (
      <form className={`rk-form ${isFoc ? 'is-focus' : ''} ${isErr ? 'is-error' : ''}`}
            onSubmit={(e) => rkCtaIntercept(e, 'cta.company.pack.submit')}>
        <div className="rk-form-row">
          <input className="rk-text" placeholder="Your name" value={myName} onChange={(e) => setMyName(e.target.value)} data-exp="form.pack.name" />
          <input className="rk-text" placeholder="Role (GC / CCO / Head of AI Gov.)" value={org} onChange={(e) => setOrg(e.target.value)} data-exp="form.pack.role" />
        </div>
        <div className="rk-form-row">
          <input className="rk-text" placeholder="Organization" value={handle} onChange={(e) => setHandle(e.target.value)} data-exp="form.pack.org" />
          <input className="rk-text" type="email" placeholder="you@yourcompany.com" value={myEmail} onChange={(e) => setMyEmail(e.target.value)} data-exp="form.pack.email" />
        </div>
        {isErr && <div className="rk-form-err">Corporate email required.</div>}
        <div className="rk-form-foot">
          <button type="submit" className="rk-btn rk-btn-primary" data-exp="cta.company.pack.submit">Get the compliance pack</button>
          <span className="rk-form-note">One PDF. No mailing list.</span>
        </div>
      </form>
    );
  }

  if (effectiveMode === 'demo') {
    return (
      <form className={`rk-form ${isFoc ? 'is-focus' : ''} ${isErr ? 'is-error' : ''}`}
            onSubmit={(e) => rkCtaIntercept(e, 'cta.company.demo.submit')}>
        <div className="rk-form-row">
          <input className="rk-text" placeholder="Your name" value={myName} onChange={(e) => setMyName(e.target.value)} data-exp="form.demo.name" />
          <input className="rk-text" placeholder="Company" value={org} onChange={(e) => setOrg(e.target.value)} data-exp="form.demo.org" />
        </div>
        <input className="rk-text" type="email" placeholder="you@yourcompany.com" value={myEmail} onChange={(e) => setMyEmail(e.target.value)} data-exp="form.demo.email" />
        {isErr && <div className="rk-form-err">Corporate email required.</div>}
        <div className="rk-form-foot">
          <button type="submit" className="rk-btn rk-btn-primary" data-exp="cta.company.demo.submit">Book a 30-min demo</button>
          <span className="rk-form-note">We reply within one business day.</span>
        </div>
      </form>
    );
  }

  return (
    <form className={`rk-form ${isFoc ? 'is-focus' : ''} ${isErr ? 'is-error' : ''}`}
          onSubmit={(e) => rkCtaIntercept(e, 'cta.company.invite.submit')}>
      <div className="rk-form-row">
        <div className="rk-handle-input">
          <span className="rk-at">@</span>
          <input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="expert handle (or leave blank)" data-exp="form.invite.handle" />
          <span className={`rk-avail ${isErr ? 'err' : 'ok'}`}>{isErr ? 'not found' : 'found'}</span>
        </div>
        <input className="rk-text" type="email" placeholder="you@yourcompany.com"
               value={myEmail} onChange={(e) => setMyEmail(e.target.value)} data-exp="form.invite.email" />
      </div>
      <input className="rk-text" placeholder="Engagement in one line (e.g. 6-week AI governance diagnostic)"
             value={scope} onChange={(e) => setScope(e.target.value)} data-exp="form.invite.scope" />
      {isErr && <div className="rk-form-err">Corporate email required.</div>}
      <div className="rk-form-foot">
        <button type="submit" className="rk-btn rk-btn-primary" data-exp="cta.company.invite.submit">Send invite</button>
        <span className="rk-form-note">60 seconds. Contract binds on acceptance.</span>
      </div>
    </form>
  );
}

// ───── Dev click counter overlay ──────────────────────────
function ClickCounter() {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(RKTrack.all());
  React.useEffect(() => {
    const unsub = RKTrack.subscribe(setData);
    const onKey = (e) => {
      if (e.shiftKey && (e.key === 'X' || e.key === 'x')) setOpen((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => { unsub(); window.removeEventListener('keydown', onKey); };
  }, []);
  if (!open) return null;
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((s, [, n]) => s + n, 0);
  return (
    <div className="rk-clicks">
      <div className="rk-clicks-head">
        <strong>Click experiments</strong>
        <div className="rk-clicks-meta">{entries.length} ids · {total} total</div>
        <button onClick={() => RKTrack.reset()}>reset</button>
        <button onClick={() => setOpen(false)}>×</button>
      </div>
      <div className="rk-clicks-list">
        {entries.length === 0 && <div className="rk-clicks-empty">No clicks yet. Every element with <code>data-exp</code> will appear here.</div>}
        {entries.map(([k, n]) => (
          <div key={k} className="rk-clicks-row">
            <span className="rk-clicks-n">{n}</span>
            <span className="rk-clicks-k">{k}</span>
          </div>
        ))}
      </div>
      <div className="rk-clicks-foot">shift + X to toggle</div>
    </div>
  );
}

Object.assign(window, {
  RK, RKTrack,
  ProductNav, StickyCTABar, SocialProof, FeatureGrid, PricingGrid, FAQ, SectionHead, ProductFooter,
  AgentScreen, EngagementScreen,
  Bio, ExpertCTA, CompanyCTA, ClickCounter,
});
