// Variant A — /for-experts  (v4: Agent-centric, ownership flywheel, private container)

function VariantA({ tweaks, ctaState, setCtaState, onCross }) {
  const wordmark = tweaks.wordmark || 'serif';
  const accentHex = getComputedAccent(tweaks.accent);

  return (
    <div className="rk-root" data-accent={tweaks.accent} data-serif={tweaks.serif}
         data-screen-label="Variant A — For Experts">
      <ProductNav audience="expert" onCross={onCross} wordmarkStyle={wordmark}
        ctaLabel="Claim my Agent" ctaExp="nav.cta.claim-agent" />

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="rk-phero">
        <div className="rk-phero-inner">
          <div className="rk-phero-left">
            <div className="rk-phero-eyebrow">For senior practitioners</div>
            <h1 className="rk-phero-title">You are the <em>future of AI</em>.</h1>
            <p className="rk-phero-sub" style={{ fontSize: 20 }}>
              Own your Agents. Get hired. Get paid — forever.
            </p>

            <div className="rk-agent-strip">
              <span className="rk-agent-strip-kw">What's an Agent?</span>
              <span className="rk-agent-strip-body">
                <strong>It's you, scaled.</strong> Hired to do what you do. You tap in any time &mdash; take the wheel, take the call, take responsibility. Only a human can do that. That's why your Agent has your name on it.
              </span>
            </div>

            <div className="rk-phero-ctas" style={{ marginTop: 28 }}>
              <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-primary" data-exp="hero.primary.claim-agent" onClick={() => RKTrack.bump('hero.primary.claim-agent')}>Claim your Agent</a>
              <a href="#how" className="rk-btn rk-btn-ghost" data-exp="hero.secondary.see-how">How it works</a>
              <a href="#ledger" className="rk-btn rk-btn-link" data-exp="hero.tertiary.see-earnings">See live earnings →</a>
            </div>
            <div className="rk-phero-trust">
              <span>Private container · only you have access</span>
              <span>You own your Agent — always</span>
            </div>
          </div>

          <div className="rk-phero-right">
            <OwnershipSlider accentHex={accentHex} profession={tweaks?.profession || 'default'} />
          </div>
        </div>
      </section>

      <SocialProof label="Early members practicing at" items={[
        'Goldman','McKinsey','Cleveland Clinic','Latham & Watkins','Bain','Kaiser','Cravath'
      ]} />

      {/* ── How it works ─────────────────────────────── */}
      <HowItWorks accentHex={accentHex} />

      {/* ── Earnings ticker ──────────────────────────── */}
      <section className="rk-psection" id="ledger" style={{ background: 'rgba(11,11,12,0.02)' }}>
        <div className="rk-psection-inner">
          <SectionHead
            align="center"
            eyebrow="The ledger"
            title="What earning looks like, every day."
            sub="A live slice of the network. Direct engagements, residuals from super-Agents, and the monthly dividend, all streaming in at once."
          />
          <EarningsTicker />
        </div>
      </section>

      {/* ── Private container ────────────────────────── */}
      <section className="rk-psection" id="container">
        <div className="rk-psection-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div className="rk-sechead-eyebrow">Your container</div>
              <h2 className="rk-sechead-title">A private workspace <em>nobody but you can ever access</em>.</h2>
              <p className="rk-sechead-sub">Your Agent lives in a sealed container only you have access to — not your employer, not your clients, not RKNET. Keep your background knowledge, your methods, your residual know-how here. Your Agent reads from all of it. <strong>Clients own the output. They never see the rest.</strong></p>
              <div style={{ marginTop: 24, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-primary" data-exp="container.cta.try" onClick={() => RKTrack.bump('container.cta.try')}>Claim your Agent</a>
                <a href="#cleanroom" className="rk-btn rk-btn-link" data-exp="container.cta.security">How the container works →</a>
              </div>
              <div style={{ marginTop: 18, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span className="rk-priv-pill">Sealed to you</span>
                <span className="rk-priv-pill">Output leaves · know-how stays</span>
                <span className="rk-priv-pill">Portable · It's your container — you decide where it lives</span>
              </div>
            </div>
            <AgentScreen />
          </div>
        </div>
      </section>

      <section className="rk-psection" style={{ paddingTop: 56, paddingBottom: 56 }}>>
        <div className="rk-psection-inner">
          <div className="rk-vs-strip">
            <div className="rk-vs-ask">Why not just use <em>Claude or Gemini or ChatGPT</em> on your own?</div>
            <div className="rk-vs-col">
              <div className="rk-vs-lab">Claude / ChatGPT alone</div>
              <div className="rk-vs-h">A tool you pay for.</div>
              <p>Private. Forgets. Yours until you stop paying. Earns nothing when you're not at the keyboard.</p>
            </div>
            <div className="rk-vs-col">
              <div className="rk-vs-lab">Your RKNET Agent</div>
              <div className="rk-vs-h">A representative that pays you.</div>
              <p>Works while you don't. Compounds with every engagement. Findable in a marketplace that brings you clients. Owned by you — permanently.</p>
            </div>
          </div>
        </div>
      </section>

      

      {/* ── Pricing ──────────────────────────────────── */}
      <Cleanroom variant="expert" accentHex={accentHex} />

      <SuperAgentGrid audience="expert" />

      {/* ── Opportunities ──────────────────── */}
      <section className="rk-psection" id="ways-to-earn">
        <div className="rk-psection-inner">
          <SectionHead
            eyebrow="Live opportunities"
            title={<>Companies are looking for you <em>right now</em>.</>}
            sub="These are the kinds of engagements flowing through RKNET. Your Agent handles the work. You review the output. You keep the earnings."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginTop: 8 }}>

            <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', fontFamily: "'JetBrains Mono', monospace" }}>Stealth advising · $2,400</div>
              <h3 style={{ fontSize: 17, lineHeight: 1.3, margin: 0 }}>A founder wants your take on a stealth concept.</h3>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--mute)', margin: 0 }}>They need industry influencers to pressure-test a new product idea — without exposing it. Your Agent advises from your sealed vault. You never see their concept directly. They get world-class signal. You get paid.</p>
              <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-link" data-exp="opp.stealth" style={{ alignSelf: 'flex-start', marginTop: 4 }}>I'd take this engagement →</a>
            </div>

            <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', fontFamily: "'JetBrains Mono', monospace" }}>M&amp;A diligence · super-Agent · $18k</div>
              <h3 style={{ fontSize: 17, lineHeight: 1.3, margin: 0 }}>A PE firm needs a full diligence sprint by Friday.</h3>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--mute)', margin: 0 }}>Join six other senior partners in a super-Agent covering IP, regulatory, and financial diligence. Each vault stays sealed. The client gets a unified report in days. You split $18k seven ways — for work your Agent mostly handles.</p>
              <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-link" data-exp="opp.diligence" style={{ alignSelf: 'flex-start', marginTop: 4 }}>I'd take this engagement →</a>
            </div>

            <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', fontFamily: "'JetBrains Mono', monospace" }}>On-demand expert · $3,200</div>
              <h3 style={{ fontSize: 17, lineHeight: 1.3, margin: 0 }}>A deal team needs a patent landscape analysis before Monday morning.</h3>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--mute)', margin: 0 }}>It's Saturday night. Your Agent delivers the analysis from your accumulated IP expertise. You review it Sunday morning over coffee. They got partner-grade work instantly. You earned $3,200 without leaving the house.</p>
              <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-link" data-exp="opp.ondemand" style={{ alignSelf: 'flex-start', marginTop: 4 }}>I'd take this engagement →</a>
            </div>

            <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', fontFamily: "'JetBrains Mono', monospace" }}>Model fine-tuning · $4,200</div>
              <h3 style={{ fontSize: 17, lineHeight: 1.3, margin: 0 }}>An AI lab needs partner-grade judgment to train a legal-reasoning model.</h3>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--mute)', margin: 0 }}>They tried the obvious vendors and got mid-pyramid signal. Now they need actual partners — but partners don't sell their reasoning patterns. Your Agent contributes graded reasoning inside a sealed cleanroom. You keep ownership and full provenance receipts. The lab gets the signal it paid for. Your career doesn't get folded into someone else's model.</p>
              <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-link" data-exp="opp.training" style={{ alignSelf: 'flex-start', marginTop: 4 }}>I'd take this engagement →</a>
            </div>

            <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', fontFamily: "'JetBrains Mono', monospace" }}>Security audit · $5,200</div>
              <h3 style={{ fontSize: 17, lineHeight: 1.3, margin: 0 }}>A B2B SaaS needs a SOC 2 readiness review before a key enterprise deal closes.</h3>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--mute)', margin: 0 }}>Their biggest prospect needs SOC 2 evidence by month-end. The audit firm's calendar is booked through Q3. Your Agent reviews their architecture and policies, pulls control gaps from your decade of audits, and drafts the readiness report with prioritized remediation. You spot-check, sign, get paid. They close the deal.</p>
              <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-link" data-exp="opp.security" style={{ alignSelf: 'flex-start', marginTop: 4 }}>I'd take this engagement →</a>
            </div>

            <div style={{ background: 'var(--paper)', border: '1px solid var(--rule)', padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', fontFamily: "'JetBrains Mono', monospace" }}>Data-center electrical · $7,400</div>
              <h3 style={{ fontSize: 17, lineHeight: 1.3, margin: 0 }}>A hyperscaler's design team needs a power-system review for a 1.2&nbsp;GW campus.</h3>
              <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--mute)', margin: 0 }}>Site selection is locked, but the prelim utility study just came back with capacity flags. Your Agent walks the substation interface and load-balancing scheme, draws on your portfolio of 30+ data-center builds, and flags the three things to re-spec before final design. You confirm, sign, get paid. They keep the schedule.</p>
              <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-link" data-exp="opp.datacenter" style={{ alignSelf: 'flex-start', marginTop: 4 }}>I'd take this engagement →</a>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="rk-psection" id="faq">
        <div className="rk-psection-inner">
          <SectionHead align="center" eyebrow="FAQ" title="Questions we get." />
          <FAQ items={[
            { id: 'cleanroom', q: "When experts collaborate, whose knowledge leaks to whom?",
              a: <>None. Each Agent reads only its own expert's container. Collaboration happens in a sealed cleanroom that produces one output — the client's deliverable. Every other Agent's knowledge, methods, and residual know-how stays put.</> },
            { id: 'diff', q: "How is this different from just using Claude on my own?",
              a: <>Claude is a tool you pay for — private, forgetful, and earns nothing when you're not at the keyboard. Your RKNET Agent is a representative the network markets on your behalf. It takes meetings, bills under your name, and keeps paying you long after the engagement ends.</> },
            { id: 'read', q: "Who can read what's in my container?",
              a: <>Only you. Your container is sealed to your credentials. Even RKNET cannot read its contents. Keep your notes and playbooks here — outside any employer, client, or partner system.</> },
            { id: 'own', q: "What does 'own my Agent' actually mean?",
              a: <>You own the Agent and everything it represents. If you leave RKNET, you take your Agent with you. If RKNET dissolves, you still have your Agent, your container, and your audit history. No employer, including RKNET, can repossess them.</> },
            { id: 'earn', q: 'How do earnings work, exactly?',
              a: <>Three streams. <strong>Direct:</strong> when someone engages your Agent, you're paid the rate you set. <strong>Residuals:</strong> super-Agents — collective Agents multiple members shaped — pay all contributors whenever they're engaged, by anyone. <strong>Dividends:</strong> the cooperative pays members a share of network-wide revenue. You choose your cash-vs-ownership mix at signup.</> },
            { id: 'employer', q: 'What if my employer has a policy against personal AI?',
              a: <>RKNET is designed to coexist with employer policy. Your container stays outside your employer's systems. During engagements, the audit trail proves exactly what crossed between sides. Several Am Law 100 firms have cleared RKNET for use by outside counsel.</> },
            { id: 'price', q: 'Is the free tier really forever free?',
              a: <>Yes. Your Agent and container are a primitive, not a product we'll ransom. Marketplace features (earnings, residuals, dividends) unlock on Practice.</> },
          ]} />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="rk-cta-section" id="cta">
        <div className="rk-cta-inner">
          <h2 className="rk-sechead-title">Claim your Agent.</h2>
          <p className="rk-sechead-sub">Reserve it once. Yours for the rest of your career.</p>
          <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center' }}>
            <a href="https://forms.gle/K3DgLqJTF8Si1wBdA"
               target="_blank"
               className="rk-btn rk-btn-primary rk-cta-button"
               data-exp="cta.expert.claim"
               onClick={() => RKTrack.bump('cta.expert.claim')}>
              Claim your Agent
            </a>
          </div>
          <div className="rk-cta-foot">
            <span>Free forever</span>
            <span className="rk-cta-foot-dot">·</span>
            <span>60 seconds to claim</span>
            <span className="rk-cta-foot-dot">·</span>
            <span>No credit card</span>
          </div>
        </div>
      </section>

      <ProductFooter audience="expert" onCross={onCross} />

      <StickyCTABar>
        <span>Free forever. 60 seconds to claim.</span>
        <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-primary" data-exp="sticky.primary.claim-agent" onClick={() => RKTrack.bump('sticky.primary.claim-agent')}>Claim your Agent</a>
        <a href="#ledger" className="rk-sticky-ghost" data-exp="sticky.secondary.see-earnings">See earnings</a>
      </StickyCTABar>
    </div>
  );
}

function getComputedAccent(variant) {
  // Map the tweakable accent token to a hex for SVG coloring
  const map = { rust: '#B8411B', teal: '#0E6968', ink: '#0B0B0C', plum: '#6B2C6B' };
  return map[variant] || '#B8411B';
}

Object.assign(window, { VariantA, getComputedAccent });
