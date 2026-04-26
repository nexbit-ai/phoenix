import React, { useEffect, useRef, useState } from 'react';
import heroIllustration from '../../assets/hero-illustration.png';
import {
  BeforeAfter,
  DashboardPreview,
  DataFlow,
  ReconciliationLedger,
} from './visuals';
import './landing.css';

/**
 * Nexbit — Accounting AI for D2C
 * Single-page marketing site. See /docs/accounting-ai-website-architecture.md.
 *
 * The page is intentionally MUI-free and self-contained: everything renders
 * with semantic HTML and the scoped CSS in landing.css.
 */

type Capability = {
  swatch: string;
  title: string;
  body: string;
};

const CAPABILITIES: Capability[] = [
  {
    swatch: 'var(--sage)',
    title: 'Unified financial data',
    body: 'Marketplaces, payment gateways, logistics partners, documents, and accounting systems — ingested into a single ledger of truth.',
  },
  {
    swatch: 'var(--mist)',
    title: 'Settlement & payout intelligence',
    body: 'Real-time visibility into what settled, what is pending, what is ageing, and where it broke.',
  },
  {
    swatch: 'var(--mint)',
    title: 'Exception detection',
    body: 'Variance, mismatch, and missing-payout signals surfaced with the context to act on them.',
  },
  {
    swatch: 'var(--sand)',
    title: 'Reporting & close readiness',
    body: 'Income, expense, custom prompts, and scheduled reports — generated from the same canonical numbers your books trust.',
  },
  {
    swatch: 'var(--stone)',
    title: 'Bookkeeping workflows',
    body: 'Accounting sync, journal-ready entries, and the operational rails between commerce activity and your books.',
  },
  {
    swatch: 'var(--clay)',
    title: 'AI-guided operations',
    body: 'Reconciliation, analysis, and assistant workflows that explain variances, draft entries, and move work forward without removing the human.',
  },
];

type Step = { num: string; title: string; body: string };
const STEPS: Step[] = [
  {
    num: '01',
    title: 'Connect',
    body: 'Plug in marketplaces, gateways, logistics, and accounting. Or upload documents directly. The first connection takes minutes, not quarters.',
  },
  {
    num: '02',
    title: 'Unify',
    body: 'Every order, payout, fee, return, and entry is normalized into a single financial timeline — yours, not your provider’s.',
  },
  {
    num: '03',
    title: 'Detect',
    body: 'Mismatches, ageing payments, and exceptions are flagged with the context behind them, so the team can resolve, not investigate.',
  },
  {
    num: '04',
    title: 'Close',
    body: 'Reports, journal-ready entries, and the month-end close happen with fewer hands and far more confidence.',
  },
];

type Outcome = { title: React.ReactNode; body: string };
const OUTCOMES: Outcome[] = [
  {
    title: (
      <>
        Faster <em>close.</em>
      </>
    ),
    body: 'From weeks to days. The numbers land while the month still matters.',
  },
  {
    title: (
      <>
        Cleaner <em>books.</em>
      </>
    ),
    body: 'Numbers your books, your board, and your auditor agree on.',
  },
  {
    title: (
      <>
        Fewer <em>blind spots.</em>
      </>
    ),
    body: 'Settlement, ageing, and variance — visible the moment they appear.',
  },
  {
    title: (
      <>
        Less manual <em>work.</em>
      </>
    ),
    body: 'Spreadsheets stay where they belong — out of the close.',
  },
];

type Faq = { q: string; a: React.ReactNode };
const FAQS: Faq[] = [
  {
    q: 'Who is this for?',
    a: (
      <p>
        Finance teams, controllers, and accounting operators inside D2C and commerce
        brands. The brands we build for are usually past their first scale moment —
        multiple channels, multiple payment rails, an actual close calendar — and
        spreadsheets have stopped being honest.
      </p>
    ),
  },
  {
    q: 'Does it work for D2C brands selling across multiple channels?',
    a: (
      <p>
        Yes. Multi-marketplace, multi-gateway, and multi-logistics is the default,
        not the edge case. We unify settlement, payout, and order data across the
        full surface and reconcile it against your books.
      </p>
    ),
  },
  {
    q: 'How is AI actually used?',
    a: (
      <>
        <p>
          AI sits inside specific workflows — reconciliation matching, variance
          explanation, anomaly detection, and assistant-style guidance — not as a
          floating chatbot bolted on top.
        </p>
        <p>
          The model never books an entry your team didn’t see. It explains,
          suggests, and shortens the path. The decision still belongs to finance.
        </p>
      </>
    ),
  },
  {
    q: 'Do finance teams stay in control?',
    a: (
      <p>
        Always. Every action is reviewable, every change is audit-trailed, and every
        AI-generated suggestion is editable before it touches the books. Control is
        a feature, not a setting.
      </p>
    ),
  },
  {
    q: 'How does connectivity and onboarding work?',
    a: (
      <p>
        Connect marketplaces and gateways through their native APIs, sync your
        accounting system, or upload statements and exports directly. A first
        reconciliation pass usually runs the same week we onboard.
      </p>
    ),
  },
  {
    q: 'Is our data secure?',
    a: (
      <p>
        Each workspace is isolated. Authentication uses B2B SSO with session
        controls and short-lived tokens. We treat your financial data the way your
        finance team does — read-only by default, audited by design.
      </p>
    ),
  },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.nx-reveal');
    if (!els.length) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.05 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useStickyTopbar(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      if (window.scrollY > 4) el.classList.add('is-stuck');
      else el.classList.remove('is-stuck');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);
}

const Wordmark: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => (
  <span className="nx-wordmark" style={size === 'sm' ? { fontSize: 18 } : undefined}>
    Nexbit
    <span className="nx-wordmark__dot" aria-hidden />
  </span>
);

const FaqItem: React.FC<{ q: string; a: React.ReactNode; defaultOpen?: boolean }> = ({
  q,
  a,
  defaultOpen,
}) => {
  const [open, setOpen] = useState(!!defaultOpen);
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`nx-faq__item${open ? ' is-open' : ''}`}>
      <button
        type="button"
        className="nx-faq__btn"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{q}</span>
        <span className="nx-faq__icon" aria-hidden />
      </button>
      <div
        className="nx-faq__panel"
        style={{ maxHeight: open ? (panelRef.current?.scrollHeight ?? 600) : 0 }}
      >
        <div ref={panelRef} className="nx-faq__panel-inner">
          {a}
        </div>
      </div>
    </div>
  );
};

const Landing: React.FC = () => {
  const topbarRef = useRef<HTMLElement>(null);
  useReveal();
  useStickyTopbar(topbarRef);

  return (
    <div className="nx-landing">
      <a href="#main" className="nx-skip">Skip to content</a>

      {/* Top bar */}
      <header ref={topbarRef} className="nx-topbar">
        <div className="nx-shell nx-topbar__inner">
          <a href="#" aria-label="Nexbit home"><Wordmark /></a>
          <nav className="nx-nav" aria-label="Primary">
            <a className="nx-nav__link" href="#capabilities">Capabilities</a>
            <a className="nx-nav__link" href="#how">How it works</a>
            <a className="nx-nav__link" href="#faq">FAQ</a>
          </nav>
          <div className="nx-topbar__cta">
            <a className="nx-btn nx-btn--ghost" href="/login">Sign in</a>
            <a className="nx-btn nx-btn--solid" href="#cta">
              Request access <span className="nx-btn__arrow" aria-hidden>→</span>
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* HERO — dark band, dashed frame, headline + CTA + isometric coin illustration */}
        <section className="nx-hero">
          <div className="nx-hero__shell">
            <div className="nx-hero-frame nx-reveal">
              <div className="nx-hero-frame__top">
                <div className="nx-hero-frame__copy">
                  <div className="nx-meta nx-hero__eyebrow">
                    Accounting AI · Built for D2C
                  </div>
                  <h1 className="nx-hero__headline">
                    Finance that finally moves at the speed of your{' '}
                    <span className="nx-italic">commerce.</span>
                  </h1>
                  <p className="nx-hero__lede">
                    One intelligent layer for revenue, settlements, payouts, books,
                    and reporting — built for D2C brands scaling across marketplaces,
                    payment rails, and accounting systems.
                  </p>
                </div>
                <div className="nx-hero-frame__cta">
                  <a className="nx-btn nx-btn--outline-clay nx-btn--lg" href="#cta">
                    Request access <span className="nx-btn__arrow" aria-hidden>→</span>
                  </a>
                </div>
              </div>

              <div className="nx-hero-frame__divider" aria-hidden />

              <div className="nx-hero-frame__illustration">
                <img
                  className="nx-hero-frame__illustration-image"
                  src={heroIllustration}
                  alt=""
                />
              </div>

              <div className="nx-hero-frame__divider nx-hero-frame__divider--credibility" aria-hidden />

              <div className="nx-hero-frame__credibility">
                <span className="nx-meta">Ingesting from</span>
                <div className="nx-hero-frame__credibility-list">
                  <span>Marketplaces</span>
                  <span>Payment gateways</span>
                  <span>Logistics partners</span>
                  <span>Accounting systems</span>
                  <span>Documents</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="nx-section">
          <div className="nx-shell">
            <div className="nx-meta nx-section__eyebrow nx-reveal">The problem</div>
            <h2 className="nx-display nx-section__headline nx-reveal">
              Finance, <span className="nx-italic">fragmented.</span>
            </h2>
            <p className="nx-lede nx-section__lede nx-reveal nx-prose">
              D2C finance lives across a dozen places. Marketplace settlements arrive
              late. Payouts don’t tie out. Books drift. Month-end becomes
              archaeology.
            </p>

            <div className="nx-problem-grid nx-reveal">
              <div className="nx-problem-grid__item">
                <h3 className="nx-problem-grid__title">Settlement opacity</h3>
                <p className="nx-problem-grid__body">
                  Payments land days late, in formats no two providers agree on, with
                  fees no spreadsheet can track honestly.
                </p>
              </div>
              <div className="nx-problem-grid__item">
                <h3 className="nx-problem-grid__title">Disconnected systems</h3>
                <p className="nx-problem-grid__body">
                  Marketplaces, gateways, logistics, ERP, and books each tell their
                  own version of the same number.
                </p>
              </div>
              <div className="nx-problem-grid__item">
                <h3 className="nx-problem-grid__title">Manual reconciliation</h3>
                <p className="nx-problem-grid__body">
                  Spreadsheets become the source of truth. They shouldn’t be —
                  but until now there hasn’t been a real alternative.
                </p>
              </div>
              <div className="nx-problem-grid__item">
                <h3 className="nx-problem-grid__title">Slow close</h3>
                <p className="nx-problem-grid__body">
                  Month-end takes weeks. By the time the numbers land, the month is
                  already gone — and so is the chance to act on them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER — Excel chaos to Nexbit clarity */}
        <section className="nx-section nx-section--tight nx-band nx-band--paper-deep">
          <div className="nx-shell">
            <div className="nx-meta nx-section__eyebrow nx-reveal">The transition</div>
            <h2 className="nx-display nx-section__headline nx-reveal">
              From the spreadsheet, <br />
              to a <span className="nx-italic">system.</span>
            </h2>
            <p className="nx-lede nx-section__lede nx-reveal nx-prose">
              Today, finance teams run the close in a thirty-tab workbook. Tomorrow,
              the same data lives in a single ledger that reconciles itself.
            </p>

            <div className="nx-reveal" style={{ marginTop: 'var(--s8)' }}>
              <BeforeAfter />
            </div>
          </div>
        </section>

        {/* SOLUTION + manifesto band */}
        <section className="nx-section nx-section--tight">
          <div className="nx-shell">
            <div className="nx-meta nx-section__eyebrow nx-reveal">The operating layer</div>
            <h2 className="nx-display nx-section__headline nx-reveal">
              One intelligent layer <br /> for finance.
            </h2>
            <p className="nx-lede nx-section__lede nx-reveal nx-prose">
              We unify the financial events behind your business — every order,
              settlement, payout, fee, return, and entry — and turn them into a
              single source of truth your team can actually operate on.
            </p>
          </div>

          <div className="nx-band nx-band--sage" style={{ marginTop: 'var(--s9)' }}>
            <div className="nx-shell nx-manifesto nx-reveal">
              <p className="nx-manifesto__line">
                &ldquo;Accounting AI is not automation. It&rsquo;s the system{' '}
                <span className="nx-italic">underneath</span> the operation.&rdquo;
              </p>
              <div className="nx-manifesto__attribution nx-meta">
                Our position
              </div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="capabilities" className="nx-section">
          <div className="nx-shell">
            <div className="nx-meta nx-section__eyebrow nx-reveal">Capabilities</div>
            <h2 className="nx-display nx-section__headline nx-reveal">
              What it does.
            </h2>
            <p className="nx-lede nx-section__lede nx-reveal nx-prose">
              Six surfaces, one system. Each maps to a real motion inside the
              finance and accounting workday.
            </p>

            <div className="nx-cap-grid nx-reveal">
              {CAPABILITIES.map((c) => (
                <article key={c.title} className="nx-cap">
                  <h3 className="nx-cap__title">
                    <span className="nx-cap__swatch" style={{ background: c.swatch }} />
                    {c.title}
                  </h3>
                  <p className="nx-cap__body">{c.body}</p>
                </article>
              ))}
            </div>

            <div className="nx-dash-wrap nx-reveal">
              <div className="nx-dash-wrap__head">
                <span className="nx-meta">Inside the product</span>
                <span className="nx-meta nx-dash-wrap__head-end">Close readiness · April 2026</span>
              </div>
              <DashboardPreview />
              <p className="nx-dash-wrap__legend">
                One view across revenue, settlements, payouts, and the close —
                generated from the same canonical numbers your books trust.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="nx-section nx-band nx-band--paper-deep">
          <div className="nx-shell">
            <div className="nx-meta nx-section__eyebrow nx-reveal">How it works</div>
            <h2 className="nx-display nx-section__headline nx-reveal">
              Four <span className="nx-italic">quiet</span> moves.
            </h2>

            <div className="nx-flow-wrap nx-reveal">
              <DataFlow />
            </div>

            <div className="nx-steps nx-reveal">
              {STEPS.map((s) => (
                <div key={s.num} className="nx-step">
                  <div className="nx-step__num">{s.num}</div>
                  <div>
                    <h3 className="nx-step__title">{s.title}</h3>
                    <p className="nx-step__body">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY D2C NOW */}
        <section className="nx-section">
          <div className="nx-shell">
            <div className="nx-meta nx-section__eyebrow nx-reveal">The D2C context</div>
            <h2 className="nx-display nx-section__headline nx-reveal">
              D2C finance has outgrown <br /> the toolbox built for it.
            </h2>

            <div className="nx-context">
              <div className="nx-context__body nx-reveal">
                <p>
                  A scaling D2C brand isn’t a single business — it’s a
                  dozen overlapping ones. Every marketplace, gateway, and logistics
                  partner has its own settlement clock, its own fee structure, its
                  own version of the truth.
                </p>
                <p>
                  Legacy accounting tools were designed for a world where revenue
                  came through one rail. The modern D2C P&amp;L doesn’t look
                  like that anymore. Finance needs a system that does.
                </p>
                <p>
                  Accounting AI is that system — the layer underneath the
                  operation, where commerce data, settlement intelligence, and the
                  general ledger finally agree.
                </p>
              </div>

              <div className="nx-context__stats nx-reveal">
                <div className="nx-context__stat">
                  <div className="nx-context__stat-num">
                    <em>11+</em>
                  </div>
                  <p className="nx-context__stat-body">
                    payment, marketplace, and logistics surfaces a scaling D2C
                    brand operates across.
                  </p>
                </div>
                <div className="nx-context__stat">
                  <div className="nx-context__stat-num">
                    <em>6–14 days</em>
                  </div>
                  <p className="nx-context__stat-body">
                    typical lag between sale and reconciled settlement.
                  </p>
                </div>
                <div className="nx-context__stat">
                  <div className="nx-context__stat-num">
                    <em>3 weeks</em>
                  </div>
                  <p className="nx-context__stat-body">
                    a typical month-end close — in a quarter where four weeks have
                    already passed.
                  </p>
                </div>
              </div>
            </div>

            <div className="nx-ledger-wrap nx-reveal">
              <ReconciliationLedger />
            </div>
          </div>
        </section>

        {/* OUTCOMES */}
        <section className="nx-section nx-section--tight">
          <div className="nx-shell">
            <div className="nx-meta nx-section__eyebrow nx-reveal">Outcomes</div>
            <h2 className="nx-display nx-section__headline nx-reveal">
              What changes.
            </h2>

            <div className="nx-outcomes nx-reveal">
              {OUTCOMES.map((o, i) => (
                <div key={i} className="nx-outcome">
                  <div className="nx-outcome__title">{o.title}</div>
                  <p className="nx-outcome__body">{o.body}</p>
                </div>
              ))}
            </div>

            <p className="nx-outcomes-tag nx-reveal">
              Finance teams stop reacting. They start operating.
            </p>
          </div>
        </section>

        {/* TRUST */}
        <section className="nx-section nx-band nx-band--mint">
          <div className="nx-shell nx-trust">
            <div className="nx-meta nx-reveal">Early design partners</div>
            <h2 className="nx-display nx-section__headline nx-reveal" style={{ marginTop: 'var(--s4)', marginLeft: 'auto', marginRight: 'auto' }}>
              Built with operators.
            </h2>

            <div className="nx-trust__row nx-reveal">
              <span className="nx-trust__name">Sundry</span>
              <span className="nx-trust__name">Folk Goods</span>
              <span className="nx-trust__name">Maison Atlas</span>
              <span className="nx-trust__name">Pareto</span>
              <span className="nx-trust__name">Ten North</span>
            </div>

            <p className="nx-trust__quote nx-reveal">
              &ldquo;It&rsquo;s the first time finance and ops have been looking at
              the same numbers.&rdquo;
            </p>
            <p className="nx-trust__attribution nx-reveal nx-meta">
              Head of Finance · Scaling D2C brand
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="nx-section">
          <div className="nx-shell">
            <div className="nx-meta nx-section__eyebrow nx-reveal">Frequently asked</div>
            <h2 className="nx-display nx-section__headline nx-reveal">
              The honest <span className="nx-italic">answers.</span>
            </h2>

            <div className="nx-faq nx-reveal">
              {FAQS.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="cta" className="nx-band nx-band--mist">
          <div className="nx-shell nx-final">
            <p className="nx-final__line nx-reveal">
              Run finance like the <em>rest</em> of your company.
            </p>
            <p className="nx-final__sub nx-reveal">
              For D2C brands ready to make accounting a system, not a scramble.
            </p>
            <div className="nx-final__cta nx-reveal">
              <a className="nx-btn nx-btn--solid nx-btn--lg" href="mailto:hello@nexbit.ai?subject=Early%20access">
                Request access <span className="nx-btn__arrow" aria-hidden>→</span>
              </a>
              <span className="nx-final__tag nx-mono">EARLY ACCESS · 2026</span>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="nx-footer">
          <div className="nx-shell">
            <div className="nx-footer__row">
              <div>
                <div className="nx-footer__brand">
                  Nexbit<span className="nx-wordmark__dot" aria-hidden style={{ transform: 'translateY(-2px)' }} />
                </div>
                <p className="nx-footer__line">
                  Accounting AI for D2C. The operating layer for revenue,
                  settlements, books, and the close.
                </p>
              </div>
              <nav className="nx-footer__nav" aria-label="Footer">
                <a href="#capabilities">Capabilities</a>
                <a href="#how">How it works</a>
                <a href="#faq">FAQ</a>
                <a href="/login">Sign in</a>
              </nav>
              <div className="nx-footer__addr nx-mono">
                {`ACCOUNTING AI\nFOR D2C\n2026`}
              </div>
            </div>

            <div className="nx-footer__bottom">
              <span className="nx-meta">© Nexbit · All rights reserved</span>
              <span className="nx-meta">Made for finance teams</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Landing;
