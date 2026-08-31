import React, { useEffect, useRef, useState } from 'react';
import logoFresh from '../../assets/logo_fresh.jpg';
import './redcliffe-pricing.css';

const PIN = '8391';
const UNLOCK_KEY = 'nx-redcliffe-pricing-unlocked-v1';

/* ─── Content constants ─────────────────────────────────────────────── */

const CHANNELS = [
  'D2C Website',
  'Amazon',
  'Flipkart',
  'Myntra',
  'Nykaa',
  'Pharmeasy',
  'Quick Commerce',
  'And many more..',
  
];

type ProblemCard = { number: string; title: string; body: React.ReactNode };
const PROBLEM_CARDS: ProblemCard[] = [
  {
    number: '01',
    title: 'Manual Order-Level Reconciliation',
    body: (
      <>
        Out of <strong>Thousands of orders</strong>, you shouldn't have to manually
        hunt down the 500 with unsettled payments past their TAT across
        Delhivery, Blue Dart, and multiple settlement reports.
      </>
    ),
  },
  {
    number: '02',
    title: 'Silent Revenue Leakage',
    body: (
      <>
        Marketplace bills <strong>₹100</strong>, you receive{' '}
        <strong>₹90</strong>, and <strong>₹10 vanishes</strong>. Commission
        overcharges and weight discrepancies compound into lakhs of silent
        losses every quarter.
      </>
    ),
  },
  {
    number: '03',
    title: 'Un-Synced COD & Prepaid Orders',
    body: (
      <>
        COD and prepaid settlement timelines never align. Your finance team
        reconciles <strong>two separate cash flows</strong> with no automated
        escalation when payments fall behind.
      </>
    ),
  },
  {
    number: '04',
    title: 'No Unified View Across Channels',
    body: (
      <>
        Six channels, six dashboards, six fee structures. Without a{' '}
        <strong>single source of truth</strong>, something always slips through.
      </>
    ),
  },
];

type FeatureBlock = { title: string; body?: string; bullets?: string[] };
const FEATURE_BLOCKS: FeatureBlock[] = [
  {
    title: 'D2C & Marketplace Reconciliation',
    body: 'All channels in one place with order-level visibility into matched, mismatched, and unsettled transactions. Expected vs actual payouts, reconciled automatically.',
  },
  {
    title: 'Microsoft Dynamics 365 Integration',
    body: 'Bi-directional sync with Dynamics 365. No double-entry; your ledger always reflects real-time settlement data.',
  },
  {
    title: 'Automated Order-Level Reconciliation',
    body: 'Every order (COD and Prepaid) matched against shipment data, marketplace settlements, and gateway records. No spreadsheets.',
  },
  {
    title: 'TAT Breach Alerts & Unsettled Order Tracking',
    bullets: [
      'Automated alerts the moment an order crosses its settlement deadline',
      'Prioritized aged-receivables view by channel and logistics partner',
    ],
  },
  {
    title: 'Rate Card Matching & Anomaly Flagging',
    bullets: [
      'Contracted rate cards compared against actual billed amounts at order level',
      'Instant flagging of commission overcharges, weight discrepancies, and fee anomalies',
    ],
  },
  {
    title: 'Automated Dispute Ticketing & Recovery',
    bullets: [
      'Short-paid and missing payments auto-bucketed by claim type',
      'Batch ticket filing with approval controls and full audit trail',
    ],
  },
];

const INCLUSIONS: string[] = [
  'Unified reconciliation across D2C, Amazon, Flipkart, Blinkit, Zepto & Quick Commerce',
  'Microsoft Dynamics 365 bi-directional sync',
  'Automated order-level reconciliation (COD + Prepaid)',
  'Real-time TAT breach alerts for unsettled orders',
  'Rate card vs actual billed anomaly flagging',
  'Logistics reconciliation across all courier partners',
  'Automated dispute ticketing & recovery',
  'Commission verification against your marketplace contracts',
  'AI MIS, cash-flow forecasting & custom dashboards',
  'Unlimited orders, channels, and team members',
];

type ROIStat = { value: string; label: string };
const ROI_STATS: ROIStat[] = [
  {
    value: '100%',
    label: 'Real-time visibility into unsettled orders across all channels',
  },
  {
    value: '0',
    label: 'Manual reconciliation spreadsheets, replaced entirely by automation',
  },
  {
    value: '~2-5%',
    label: 'Revenue leakage typically recovered from commission and logistics mismatches',
  },
];

/* ─── Hooks & atoms ─────────────────────────────────────────────────── */

const PIN_LENGTH = 4;

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
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const Wordmark: React.FC = () => (
  <span className="nx-pricing__wordmark">
    <img src={logoFresh} alt="" className="nx-pricing__wordmark-logo" aria-hidden />
    Nexbit
  </span>
);

/* ─── PIN Gate ──────────────────────────────────────────────────────── */

const PinGate: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const [digits, setDigits] = useState<string[]>(Array(PIN_LENGTH).fill(''));
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const submit = (next: string[]) => {
    const code = next.join('');
    if (code.length < PIN_LENGTH) return;
    if (code === PIN) {
      try {
        sessionStorage.setItem(UNLOCK_KEY, '1');
      } catch {
        /* sessionStorage unavailable; proceed without persistence */
      }
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 420);
      setTimeout(() => {
        setDigits(Array(PIN_LENGTH).fill(''));
        inputs.current[0]?.focus();
      }, 220);
    }
  };

  const handleChange = (idx: number, raw: string) => {
    const value = raw.replace(/\D/g, '');
    if (!value) {
      const next = [...digits];
      next[idx] = '';
      setDigits(next);
      if (error) setError(false);
      return;
    }

    const next = [...digits];

    if (value.length > 1) {
      const chars = value.slice(0, PIN_LENGTH - idx).split('');
      chars.forEach((c, i) => {
        next[idx + i] = c;
      });
      setDigits(next);
      if (error) setError(false);
      const nextIdx = Math.min(idx + chars.length, PIN_LENGTH - 1);
      inputs.current[nextIdx]?.focus();
      submit(next);
      return;
    }

    next[idx] = value;
    setDigits(next);
    if (error) setError(false);
    if (idx < PIN_LENGTH - 1) {
      inputs.current[idx + 1]?.focus();
    }
    submit(next);
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
      const next = [...digits];
      next[idx - 1] = '';
      setDigits(next);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      inputs.current[idx - 1]?.focus();
      e.preventDefault();
    } else if (e.key === 'ArrowRight' && idx < PIN_LENGTH - 1) {
      inputs.current[idx + 1]?.focus();
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, PIN_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(PIN_LENGTH).fill('');
    pasted.split('').forEach((c, i) => {
      next[i] = c;
    });
    setDigits(next);
    if (error) setError(false);
    const focusIdx = Math.min(pasted.length, PIN_LENGTH - 1);
    inputs.current[focusIdx]?.focus();
    submit(next);
  };

  return (
    <div className="nx-pricing__gate">
      <header className="nx-pricing__gate-bar">
        <Wordmark />
        <span className="nx-pricing__badge">
          <span className="nx-pricing__badge-dot" aria-hidden />
          Confidential
        </span>
      </header>

      <main className="nx-pricing__gate-main">
        <div className={`nx-pricing__gate-frame${shake ? ' is-shaking' : ''}`}>
          <span className="nx-pricing__gate-eyebrow">
            Pricing prepared for Redcliffe Hygiene Private Limited
          </span>
          <h1 className="nx-pricing__gate-title">
            A private <span className="nx-pricing__italic">quote.</span>
          </h1>
          <p className="nx-pricing__gate-lede">
            Enter the four-digit access code shared with your team.
          </p>

          <div
            className={`nx-pricing__pin${error ? ' is-error' : ''}`}
            role="group"
            aria-label="Access code"
          >
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                className="nx-pricing__pin-input"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={d}
                aria-label={`Digit ${i + 1}`}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                onFocus={(e) => e.currentTarget.select()}
              />
            ))}
          </div>

          <div className="nx-pricing__pin-status" aria-live="polite">
            {error ? 'Incorrect code. Try again.' : 'Auto-submits when complete.'}
          </div>
        </div>
      </main>

      <footer className="nx-pricing__gate-foot">
        <span className="nx-pricing__meta">
          Don't have the code? Email{' '}
          <a href="mailto:founders@usenexbit.com">founders@usenexbit.com</a>
        </span>
        <span className="nx-pricing__meta">© Logikeon Labs Private Limited</span>
      </footer>
    </div>
  );
};

/* ─── Pricing Document ──────────────────────────────────────────────── */

const Pricing: React.FC = () => {
  useReveal();

  return (
    <div className="nx-pricing__doc">
      <header className="nx-pricing__topbar">
        <div className="nx-pricing__shell nx-pricing__topbar-inner">
          <Wordmark />
          <span className="nx-pricing__badge nx-pricing__badge--light">
            <span className="nx-pricing__badge-dot" aria-hidden />
            Confidential &middot; for Redcliffe Hygiene
          </span>
        </div>
      </header>

      <main>
        {/* ═══ Section 1: Executive Hook (Hero) ═══ */}
        <section className="nx-pricing__hero">
          <div className="nx-pricing__hero-shell">
            <div className="nx-pricing__hero-frame nx-reveal">
              <span className="nx-pricing__hero-eyebrow">
                Prepared for Redcliffe Hygiene Private Limited · PeeSafe
              </span>

              <h1 className="nx-pricing__hero-title">
                Stop losing revenue to{' '}
                <span className="nx-pricing__italic">payouts.</span>
              </h1>

              <p className="nx-pricing__hero-subtitle">
                Multiple channels. Unsettled orders, commission overcharges, and
                un-synced COD remittances silently eroding margin. Nexbit brings
                it all into one automated view so your finance team recovers
                cash instead of chasing spreadsheets.
              </p>

              <div className="nx-pricing__hero-channels">
                {CHANNELS.map((ch) => (
                  <span key={ch} className="nx-pricing__hero-chip">
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Section 2: "The Missing Penny" Problem ═══ */}
        <section className="nx-pricing__problem">
          <div className="nx-pricing__shell">
            <div className="nx-pricing__problem-header">
              <span className="nx-pricing__meta nx-reveal">The problem</span>
              <h2 className="nx-pricing__display nx-reveal">
                The missing <span className="nx-pricing__italic">penny.</span>
              </h2>
            </div>

            <div className="nx-pricing__problem-scenarios nx-reveal">
              {PROBLEM_CARDS.map((card) => (
                <article key={card.number} className="nx-pricing__problem-card">
                  <span className="nx-pricing__problem-card-number">
                    {card.number}
                  </span>
                  <h3 className="nx-pricing__problem-card-title">
                    {card.title}
                  </h3>
                  <p className="nx-pricing__problem-card-body">{card.body}</p>
                </article>
              ))}
            </div>

            <div className="nx-pricing__problem-callout nx-reveal">
              <p>
                Every day without automation is a day{' '}
                <strong>real revenue leakage goes undetected</strong>. The cost is margin you never knew you lost.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Section 3: Product Capabilities (The Nexbit Cure) ═══ */}
        <section className="nx-pricing__section nx-pricing__band nx-pricing__band--paper-deep">
          <div className="nx-pricing__shell">
            <span className="nx-pricing__meta nx-reveal">The Nexbit cure</span>
            <h2 className="nx-pricing__display nx-reveal">
              Built for your{' '}
              <span className="nx-pricing__italic">channels.</span>
            </h2>

            <div className="nx-pricing__features nx-reveal">
              {FEATURE_BLOCKS.map((f) => (
                <article key={f.title} className="nx-pricing__feature">
                  <h3 className="nx-pricing__feature-title">{f.title}</h3>
                  {f.body && (
                    <p className="nx-pricing__feature-body">{f.body}</p>
                  )}
                  {f.bullets && (
                    <ul className="nx-pricing__feature-list">
                      {f.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ Section 4: ROI Projection ═══ */}
        <section className="nx-pricing__roi">
          <div className="nx-pricing__shell">
            <h2 className="nx-pricing__roi-title nx-reveal">
             ROI
            </h2>

            <div className="nx-pricing__roi-stats nx-reveal">
              {ROI_STATS.map((stat) => (
                <div key={stat.value} className="nx-pricing__roi-stat">
                  <span className="nx-pricing__roi-stat-value">
                    {stat.value}
                  </span>
                  <span className="nx-pricing__roi-stat-label">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="nx-pricing__roi-note nx-reveal">
              Recover lost margins from commission overcharges and logistics
              billing errors. Eliminate manual ledger syncs between your ERP
              and marketplace reports, permanently.
            </p>
          </div>
        </section>

        {/* ═══ Section 5: Investment (Pricing & Inclusions) ═══ */}
        <section className="nx-pricing__investment">
          <div className="nx-pricing__shell">
            <span className="nx-pricing__meta nx-reveal">Your investment</span>
            <h2 className="nx-pricing__display nx-reveal">
              What's <span className="nx-pricing__italic">included.</span>
            </h2>

            <div className="nx-pricing__investment-frame nx-reveal">
              <div className="nx-pricing__investment-header">
                <span className="nx-pricing__investment-plan-name">
                  Growth Plan · Flat Monthly
                </span>
                <div className="nx-pricing__investment-price">
                  <span className="nx-pricing__investment-price-currency">
                    ₹
                  </span>
                  <span className="nx-pricing__investment-price-amount">
                    51,000
                  </span>
                  <span className="nx-pricing__investment-price-period">
                    / month
                  </span>
                </div>
              </div>

              <div className="nx-pricing__investment-body">
                <p className="nx-pricing__investment-note">
                  Unlimited orders across every channel. No per-transaction fees,
                  no channel caps, no user limits. Billed monthly with a 15-day
                  pilot on your live data before any commitment.
                </p>

                <ul className="nx-pricing__inclusions">
                  {INCLUSIONS.map((line) => (
                    <li key={line} className="nx-pricing__inclusion">
                      <span className="nx-pricing__check" aria-hidden>
                        <svg
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 8.5 6.5 12 13 4.5" />
                        </svg>
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ Next Steps ═══ */}
        <section className="nx-pricing__band nx-pricing__band--mint">
          <div className="nx-pricing__shell nx-pricing__next">
            <span className="nx-pricing__meta nx-reveal">Next steps</span>
            <h2 className="nx-pricing__next-headline nx-reveal">
              We'd love to onboard Redcliffe Hygiene as a long-term{' '}
              <span className="nx-pricing__italic">partner.</span>
            </h2>
            <p className="nx-pricing__next-body nx-reveal">
              15-day pilot on one month of your live data across all channels.
              See the unsettled orders, commission variances, and logistics
              overcharges we catch before any billing begins.
            </p>
          </div>
        </section>

        {/* ═══ Footer ═══ */}
        <footer className="nx-pricing__footer">
          <div className="nx-pricing__shell nx-pricing__footer-row">
            <div>
              <div className="nx-pricing__footer-brand">
                <img
                  src={logoFresh}
                  alt=""
                  className="nx-pricing__wordmark-logo"
                  aria-hidden
                />
                Nexbit
              </div>
              <p className="nx-pricing__footer-line">
                This pricing is prepared exclusively for Redcliffe Hygiene
                Private Limited (PeeSafe).
              </p>
              <p
                className="nx-pricing__footer-line"
                style={{ marginTop: '12px' }}
              >
                Contact us:{' '}
                <a
                  href="mailto:founders@usenexbit.com"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  founders@usenexbit.com
                </a>
              </p>
            </div>
            <div className="nx-pricing__footer-meta nx-pricing__meta">
              {`PREPARED FOR\nREDCLIFFE HYGIENE\n2026`}
            </div>
          </div>
          <div className="nx-pricing__shell nx-pricing__footer-bottom">
            <span className="nx-pricing__meta">
              © Logikeon Labs Private Limited &middot; All rights reserved
            </span>
            <span className="nx-pricing__meta">
              Confidential &middot; do not redistribute
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
};

/* ─── Page wrapper ──────────────────────────────────────────────────── */

const RedcliffePricingPage: React.FC = () => {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(UNLOCK_KEY) === '1';
    } catch {
      return false;
    }
  });

  return (
    <div className="nx-pricing">
      {unlocked ? <Pricing /> : <PinGate onUnlock={() => setUnlocked(true)} />}
    </div>
  );
};

export default RedcliffePricingPage;
