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
        Out of <strong>thousands of orders</strong>, your finance team is
        manually tracking unsettled payments. We take that off their plate
        entirely.
      </>
    ),
  },
  {
    number: '02',
    title: 'Undetected Revenue Leakage',
    body: (
      <>
        Marketplace bills <strong>₹100</strong>, you receive{' '}
        <strong>₹90</strong>, and <strong>₹10 goes missing</strong>. Commission
        overcharges and weight discrepancies add up to lakhs in silent losses
        every quarter.
      </>
    ),
  },
  {
    number: '03',
    title: 'Misaligned COD and Prepaid Settlements',
    body: (
      <>
        COD and prepaid settlement timelines never sync. Your finance team
        ends up reconciling <strong>two separate cash flows</strong> with no
        automated escalation when payments fall behind.
      </>
    ),
  },
  {
    number: '04',
    title: 'No Single View Across Channels',
    body: (
      <>
        Six channels, six dashboards, six fee structures. Without a{' '}
        <strong>single accountable partner</strong>, something always slips
        through.
      </>
    ),
  },
];

type FeatureBlock = { title: string; body?: string; bullets?: string[] };
const FEATURE_BLOCKS: FeatureBlock[] = [
  {
    title: 'Full Channel Reconciliation',
    body: 'D2C, Amazon, Flipkart, Myntra, Nykaa, Pharmeasy, and Quick Commerce. All reconciled at order level. You get clean, finalized books.',
  },
  {
    title: 'Microsoft Dynamics 365 Sync',
    body: 'Bi-directional sync with your Dynamics 365 instance. Your ERP ledger reflects real-time settlement data with zero manual entry.',
  },
  {
    title: 'Zero Manual Intervention',
    body: 'Every COD and Prepaid order matched against shipment data, marketplace settlements, and gateway records. No spreadsheets, no effort from your team.',
  },
  {
    title: 'Proactive TAT Breach Alerts',
    bullets: [
      'Automatic alerts the moment an order crosses its settlement deadline',
      'Aged receivables prioritized by channel and logistics partner, ready to act on',
    ],
  },
  {
    title: 'Rate Card and Anomaly Auditing',
    bullets: [
      'Contracted rate cards audited against actual billed amounts at order level',
      'Commission overcharges, weight discrepancies, and fee anomalies caught automatically',
    ],
  },
  {
    title: 'Dispute Recovery, Managed by Us',
    bullets: [
      'Short-paid and missing payments auto-bucketed, dispute tickets filed on your behalf',
      'Full audit trail with approval controls, recoveries tracked to closure',
    ],
  },
];

const INCLUSIONS: string[] = [
  'Fully managed reconciliation across D2C, Amazon, Flipkart, Blinkit, Zepto and Quick Commerce',
  'Microsoft Dynamics 365 bi-directional sync, maintained by us',
  'Complete order-level reconciliation (COD + Prepaid), zero effort from your team',
  'Proactive TAT breach alerts and escalation, we own the follow-up',
  'Continuous rate card auditing and anomaly flagging',
  'End-to-end logistics reconciliation across all courier partners',
  'Dispute ticketing, filing and recovery, managed to closure',
  'Commission verification against your marketplace contracts',
  'Unlimited dashboard customizations, built to your CFO\'s exact specifications',
  '24x7 Founder-level support with direct access, no ticket queues',
  'Finalized month-end reconciliation outcomes delivered to you',
  'Unlimited orders, channels, and team members',
];

type ROIStat = { value: string; label: string };
const ROI_STATS: ROIStat[] = [
  {
    value: '0',
    label: 'Hours your team spends on reconciliation. We own the entire process.',
  },
  {
    value: '100%',
    label: 'Order-level visibility, 24/7, via your optional Command Center dashboard.',
  },
  {
    value: '~2-5%',
    label: 'Revenue leakage typically recovered from commission and logistics mismatches.',
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
                Zero touch{' '}
                <span className="nx-pricing__italic">reconciliation.</span>
              </h1>

              <p className="nx-pricing__hero-subtitle">
                Order-level reconciliation across every channel, fully managed.
                Our AI connects to Dynamics 365, your payment gateways, and
                logistics partners. Zero manual effort from your finance or
                ops teams.
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
                Why is your team still doing{' '}
                <span className="nx-pricing__italic">this?</span>
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
                Your team shouldn't be solving these problems.{' '}
                <strong>We should, and we will</strong>. Every day without a dedicated reconciliation partner is a day revenue leakage goes unrecovered.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Section 3: Product Capabilities (The Nexbit Cure) ═══ */}
        <section className="nx-pricing__section nx-pricing__band nx-pricing__band--paper-deep">
          <div className="nx-pricing__shell">
            <span className="nx-pricing__meta nx-reveal">What we do for you</span>
            <h2 className="nx-pricing__display nx-reveal">
              Fully managed.{' '}
              <span className="nx-pricing__italic">End to end.</span>
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
             Zero friction
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
              The entire process runs in the background. Your Command
              Center dashboard gives you 24/7 visibility into every
              order of every channel.
            </p>
          </div>
        </section>

        {/* ═══ Section 5: Investment (Pricing & Inclusions) ═══ */}
        <section className="nx-pricing__investment">
          <div className="nx-pricing__shell">
            <span className="nx-pricing__meta nx-reveal">Your investment</span>
            <h2 className="nx-pricing__display nx-reveal">
              Full-Service Reconciliation{' '}
              <span className="nx-pricing__italic">Partnership.</span>
            </h2>

            <div className="nx-pricing__investment-frame nx-reveal">
              <div className="nx-pricing__investment-header">
                <span className="nx-pricing__investment-plan-name">
                  Done-For-You Service · Flat Monthly
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
                  Covers everything: AI reconciliation technology, dashboard
                  customizations to your spec, 24x7 founder-level support, and
                  finalized month-end outcomes. Unlimited orders and channels,
                  zero per-transaction fees. 15-day pilot on live data before
                  any commitment.
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
              Start with a 15-day{' '}
              <span className="nx-pricing__italic">pilot.</span>
            </h2>
            <p className="nx-pricing__next-body nx-reveal">
              We run full reconciliation on your live data across every channel.
              You see the unsettled orders, commission variances, and logistics
              overcharges we catch. No commitment until you see the results.
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
                This service proposal is prepared exclusively for Redcliffe
                Hygiene Private Limited (PeeSafe).
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
