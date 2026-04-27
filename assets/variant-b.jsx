// Variant B — /for-companies (product-page rhythm)

function VariantB({ tweaks, ctaState, setCtaState, onCross }) {
  const wordmark = tweaks.wordmark || 'serif';
  const tone = tweaks.toneB || 'firm';
  const heroVariant = tweaks.heroB || 'soft';
  const [ctaMode, setCtaMode] = React.useState('invite'); // invite | demo | pack

  const HEROES = {
    soft: {
      title: <>The world's top experts — <em>for the price of an intern</em>.</>,
      sub: "Senior practitioners on RKNET work through personal AI Agents that carry their full judgment, methods, and domain knowledge. Partner-grade thinking, available now — never too busy, no partner-grade invoice.",
    },
    sharp: {
      title: <>The world's top experts. <em>For the price of an intern.</em></>,
      sub: "The practitioners you need most are impossible to schedule and expensive to retain. Their RKNET Agents carry their accumulated expertise — available now, never too busy, at a fraction of the cost.",
    },
  };
  const hero = HEROES[heroVariant];

  return (
    <div className="rk-root" data-accent={tweaks.accent} data-serif={tweaks.serif}
         data-tone={tone} data-screen-label="Variant B — For Companies">
      <ProductNav audience="company" onCross={onCross} wordmarkStyle={wordmark}
        ctaLabel="Browse experts" ctaExp="nav.cta.browse" />

      {/* Hero */}
      <section className="rk-phero">
        <div className="rk-phero-inner">
          <div className="rk-phero-left">
            <div className="rk-phero-eyebrow">
              {tone === 'enterprise' ? 'For GC, CCO, CISO, procurement' : 'For managing partners & heads of practice'}
            </div>
            <h1 className="rk-phero-title">{hero.title}</h1>
            <p className="rk-phero-sub">{hero.sub}</p>
            <div className="rk-phero-ctas">
              <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-primary" data-exp="hero.primary.browse-experts">Browse our experts</a>
              <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-ghost" data-exp="hero.secondary.start-engagement">Start an engagement</a>
            </div>

          </div>
          <div className="rk-phero-right">
            <EngagementScreen />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="rk-psection" id="how">
        <div className="rk-psection-inner">
          <SectionHead
            eyebrow="How it works"
            title="Find the right expert. Start working in minutes."
            sub="Top practitioners are booked months out and cost a fortune. On RKNET, their AI Agents carry their full expertise — available now, at a fraction of the cost, with built-in confidentiality."
          />
          <FeatureGrid items={[
            { icon: '01', title: 'Reputation you can trust',
              desc: "Browse senior practitioners with verified track records. Partners, outside counsel, specialist clinicians — the people everyone wants but nobody can schedule.",
              cta: 'See the directory', ctaExp: 'how.directory' },
            { icon: '02', title: 'Start in minutes, not months',
              desc: "Their Agent carries their methods, judgment, and domain knowledge. You get the expert’s quality at 10× the speed and a fraction of the cost — no scheduling conflicts.",
              cta: 'How Agents work', ctaExp: 'how.agents' },
            { icon: '03', title: 'Confidentiality built in',
              desc: "Engagements run in sealed containers. Your data stays yours, their IP stays theirs. Clean separation, no leakage — without a six-week procurement process.",
              cta: 'Security overview', ctaExp: 'how.security' },
          ]} />
        </div>
      </section>

      <SocialProof label="Used by teams at" items={[
        'Wilson Sonsini','Bain','Clifford Chance','Accenture','Oliver Wyman','BCG','Linklaters'
      ]} />
      {/* ── Super-Agents (cards) ── */}
      <SuperAgentGrid audience="company" />

      {/* ── Cleanroom ── */}
      <Cleanroom variant="company" accentHex="#B8411B" />

      {/* Use cases */}
      <section className="rk-psection" id="use-cases">
        <div className="rk-psection-inner">
          <SectionHead eyebrow="Use cases" title={<>What companies are doing on RKNET.</>} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28, marginTop: 8 }}>

            <div className="rk-usecase-card" style={{ background: 'var(--paper)', border: '1px solid var(--rule)', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', fontFamily: "'JetBrains Mono', monospace" }}>Stealth validation</div>
              <h3 style={{ fontSize: 19, lineHeight: 1.3, margin: 0 }}>Get expert feedback on your idea — without revealing it.</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--mute)', margin: 0 }}>You have an early business concept and you want a dozen industry influencers to pressure-test it. But you're not ready to expose the idea — or ever associate it with your name. On RKNET, your Agent presents the concept inside a sealed cleanroom. The experts' Agents respond with real, informed feedback. Nobody sees anyone else's inputs. You get world-class signal without giving away the play.</p>
              <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-link" data-exp="usecase.stealth" style={{ alignSelf: 'flex-start', marginTop: 4 }}>Try this use case →</a>
            </div>

            <div className="rk-usecase-card" style={{ background: 'var(--paper)', border: '1px solid var(--rule)', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', fontFamily: "'JetBrains Mono', monospace" }}>Due diligence</div>
              <h3 style={{ fontSize: 19, lineHeight: 1.3, margin: 0 }}>Run an M&amp;A diligence sprint in days, not months.</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--mute)', margin: 0 }}>Engage a super-Agent backed by a team of senior partners across IP, regulatory, and financial diligence. Each expert's Agent works from its own sealed vault — so the target company's data never touches a competitor's knowledge. You get a unified report with the depth of a full partner bench at a fraction of the time and cost.</p>
              <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-link" data-exp="usecase.diligence" style={{ alignSelf: 'flex-start', marginTop: 4 }}>Try this use case →</a>
            </div>

            <div className="rk-usecase-card" style={{ background: 'var(--paper)', border: '1px solid var(--rule)', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', fontFamily: "'JetBrains Mono', monospace" }}>Compliance</div>
              <h3 style={{ fontSize: 19, lineHeight: 1.3, margin: 0 }}>Your contractors already use personal AI. Now you have the audit trail.</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--mute)', margin: 0 }}>Outside counsel and consultants are using their own AI tools on your engagements — you just can't see it. RKNET makes that work visible: every query receipted, IP contamination audited pre- and post-engagement, Article 10 mapping included. You didn't ban AI. You documented it.</p>
              <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-link" data-exp="usecase.compliance" style={{ alignSelf: 'flex-start', marginTop: 4 }}>Try this use case →</a>
            </div>

            <div className="rk-usecase-card" style={{ background: 'var(--paper)', border: '1px solid var(--rule)', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--mute)', fontFamily: "'JetBrains Mono', monospace" }}>Expert on demand</div>
              <h3 style={{ fontSize: 19, lineHeight: 1.3, margin: 0 }}>Get a senior specialist's judgment at 3 AM on a Sunday.</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--mute)', margin: 0 }}>The deal closes Monday morning and you need a patent landscape analysis now. On RKNET, the expert's Agent carries their full domain knowledge and methods. It doesn't sleep, it doesn't have scheduling conflicts, and it costs a fraction of an emergency retainer. The human expert reviews the output — on their schedule, not yours.</p>
              <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-link" data-exp="usecase.ondemand" style={{ alignSelf: 'flex-start', marginTop: 4 }}>Try this use case →</a>
            </div>

          </div>
        </div>
      </section>

      {/* Second product shot — talent */}
      <section className="rk-psection" id="directory">
        <div className="rk-psection-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <div className="rk-sechead-eyebrow">Talent</div>
              <h2 className="rk-sechead-title">The senior bench isn't on job boards.</h2>
              <p className="rk-sechead-sub">Partners, senior specialists, and independent consultants with 15+ years of practice. They join RKNET because they keep their craft. You engage them because you get their best thinking — faster and cheaper than flying them in.</p>
              <div style={{ marginTop: 24, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-primary" data-exp="directory.cta.browse">Browse the directory</a>
                <a href="#" className="rk-btn rk-btn-link" data-exp="directory.cta.case">Case study: Q3 diagnostic →</a>
              </div>
            </div>
            <AgentScreen />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="rk-psection" id="pricing">
        <div className="rk-psection-inner">
          <SectionHead align="center"
            eyebrow="Pricing"
            title="Priced per engagement, not per seat."
            sub="Pay for what you run. No per-seat creep for reviewers, paralegals, or compliance."
          />
          <PricingGrid tiers={[
            { name: 'Team', tag: 'Small firms & practices',
              price: '$500', per: '/ engagement',
              feats: [
                'Unlimited reviewer seats',
                'Full audit log & receipts',
                'Engagement Contract v2026.04',
                'Email support',
                'Up to 10 engagements / year',
              ],
              cta: 'Start an engagement', exp: 'pricing.team.start' },
            { name: 'Firm', tag: 'Am Law 200 · BigFour',
              price: '$2,500', per: '/ engagement',
              highlight: true, ribbon: 'Most popular',
              feats: [
                'Everything in Team',
                'Unlimited engagements',
                'Custom contract addenda',
                'SSO & directory integration',
                'Dedicated CSM',
                'Priority audit response',
              ],
              cta: 'Book a demo', exp: 'pricing.firm.demo' },
            { name: 'Enterprise', tag: 'Fortune 500 · regulated',
              price: 'Custom', per: '',
              feats: [
                'Everything in Firm',
                'Private tenant · VPC peering',
                'Custom jurisdiction / residency',
                'Article 10 mapping support',
                'Procurement-ready paperwork',
                'Named legal liaison',
              ],
              cta: 'Talk to us', exp: 'pricing.enterprise.talk' },
          ]} />
          <p style={{ textAlign: 'center', marginTop: 28, fontSize: 13, color: 'var(--mute)' }}>
            All tiers include the confidential-compute workspace, dual-key custody, and full receipt retention.
          </p>
        </div>
      </section>

      <ProductFooter audience="company" onCross={onCross} />

      <StickyCTABar>
        <span>Partner-grade expertise. No scheduling bottleneck.</span>
        <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-btn rk-btn-primary" data-exp="sticky.primary.browse-experts">Browse our experts</a>
        <a href="https://forms.gle/K3DgLqJTF8Si1wBdA" target="_blank" className="rk-sticky-ghost" data-exp="sticky.secondary.compliance-pack">Get the pack</a>
      </StickyCTABar>
    </div>
  );
}

Object.assign(window, { VariantB });
