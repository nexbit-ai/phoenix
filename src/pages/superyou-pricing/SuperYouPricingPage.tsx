import React, { useEffect, useRef, useState } from 'react';
import logoFresh from '../../assets/logo_fresh.jpg';
import './superyou-pricing.css';

const PIN = '8391';
const UNLOCK_KEY = 'nx-superyou-pricing-unlocked-v1';

const INCLUSIONS: string[] = [
  'Single source of truth for reconciliation across D2C, ecom, quick commerce, and B2B',
  'Order and invoice to payment visibility, expected vs actual payouts',
  'Automated mismatch and revenue leakage detection',
  'Commission overcharge and contract compliance tracking',
  'Logistics contract vs billed validation and recovery',
  'Dispute and claims workflow with approval controls',
  'B2B reconciliation: invoice to GRN to debit note to UTR',
  'GST sync and document ingestion via uploads and email forwarding',
  'Customizable leadership-ready dashboards and MIS',
  'Reliable, near real-time data sync built to scale',
];

type FeatureBlock = { title: string; body?: string; bullets?: string[] };
const FEATURE_BLOCKS: FeatureBlock[] = [
  {
    title: 'D2C & Marketplace Reconciliation',
    body: 'Reconcile across Shopify, Uniware, Tally, marketplaces, payment providers, and logistics partners with order level visibility into matched, mismatched, and unsettled transactions, and expected vs actual payouts.',
  },
  {
    title: 'Claims & Recovery Management',
    bullets: [
      'Identify claim buckets: fee adjustments, overcharges, FBA loss and damage cases',
      'Surface pending and short settlements automatically',
      'Dispute workflow with optional approval controls before actions are triggered',
    ],
  },
  {
    title: 'Commission & Contract Compliance',
    body: 'Track agreed commercials against actual charges and highlight seller-specific and platform-wide changes. Platforms often revise charge schedules silently, this catches it.',
  },
  {
    title: 'Logistics Reconciliation',
    bullets: [
      'Contract vs billed validation at order level',
      'Detect incorrect freight billing and lost shipment cases',
      'Flag non-delivered but billed shipments and recoverable deductions',
    ],
  },
  {
    title: 'B2B & Quick Commerce',
    body: 'Reconcile invoice to GRN to debit note and deductions to payment and UTR, with GST sync and document ingestion via uploads or email forwarding. Built for Zepto, Instamart, and Blinkit style workflows.',
  },
  {
    title: 'Custom Dashboards & MIS',
    bullets: [
      'Recoverables and settlement performance',
      'Channel-wise visibility and aging',
      'Trends, growth analysis, and finance leadership reporting',
    ],
  },
];

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
            Pricing prepared for Elite Mindset Pvt Ltd
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

const Pricing: React.FC = () => {
  useReveal();

  return (
    <div className="nx-pricing__doc">
      <header className="nx-pricing__topbar">
        <div className="nx-pricing__shell nx-pricing__topbar-inner">
          <Wordmark />
          <span className="nx-pricing__badge nx-pricing__badge--light">
            <span className="nx-pricing__badge-dot" aria-hidden />
            Confidential &middot; for SuperYou
          </span>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="nx-pricing__hero">
          <div className="nx-pricing__hero-shell">
            <div className="nx-pricing__hero-frame nx-reveal">
              <span className="nx-pricing__hero-eyebrow">
                Plan for Elite Mindset Pvt Ltd
              </span>

              <div className="nx-pricing__hero-row">
                <div className="nx-pricing__hero-main">
                  <h1 className="nx-pricing__hero-title">
                    Plan: <span className="nx-pricing__italic">Growth</span>
                  </h1>

                  <div className="nx-pricing__price">
                    <span className="nx-pricing__price-currency">₹</span>
                    <span className="nx-pricing__price-amount">28,000</span>
                    <span className="nx-pricing__price-period">/ month</span>
                  </div>

                  <div className="nx-pricing__price-meta">
                    <span>Built for Unlimited orders / month</span>
                    <span aria-hidden>&middot;</span>
                    <span>15-day trial</span>
                    <span aria-hidden>&middot;</span>
                    <span>Billed monthly</span>
                  </div>
                </div>

                <aside className="nx-pricing__hero-aside">
                  <span className="nx-pricing__meta nx-pricing__hero-aside-label">
                    Annual commitment
                  </span>
                  <p className="nx-pricing__hero-aside-line">
                    <span className="nx-pricing__italic">15%</span> discount
                    on monthly plan.
                  </p>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* What you're getting */}
        <section className="nx-pricing__section nx-pricing__band nx-pricing__band--paper-deep">
          <div className="nx-pricing__shell">
            <span className="nx-pricing__meta nx-reveal">Overview</span>
            <h2 className="nx-pricing__display nx-reveal">
              What you're <span className="nx-pricing__italic">getting.</span>
            </h2>

            <div className="nx-pricing__value-intro nx-reveal">
              <p>
                A unified reconciliation, recovery, and finance visibility platform across
                D2C, marketplaces, quick commerce, and B2B workflows, helping the finance
                team identify leakages faster, reduce manual effort, and improve payout accuracy.
              </p>
              <p className="nx-pricing__value-highlight">
                A single source of truth for <strong>reconciliation and recoveries</strong> across
                every channel, from day one.
              </p>
            </div>

            {/* Single source of truth */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">One platform for all reconciliation</h3>
              <div className="nx-pricing__value-prose">
                <p>
                  D2C, ecom, quick commerce, and B2B reconciled in one place, with GT
                  workflows arriving shortly. Every order, invoice, settlement, and payout
                  ingested into a single view.
                </p>
                <p>
                  Clear order and invoice to payment visibility, so you always know whether
                  expected payouts were actually received, and where they fell short.
                </p>
                <p>
                  Reliable, near real-time data sync. No more delays or glitches, and built
                  to support growth well beyond your current volumes.
                </p>
              </div>
            </div>

            {/* Leakage & recovery */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">Leakage detection &amp; recovery</h3>
              <div className="nx-pricing__value-prose">
                <p>
                  Automated identification of revenue leakages: commission overcharges, fee
                  changes, short settlements, unsettled orders, and logistics discrepancies
                  surface automatically.
                </p>
                <p>
                  A dispute and claims workflow makes those discrepancies easy to raise
                  quickly, with optional approval controls before any action is triggered.
                </p>
                <p>
                  The result is faster finance operations, less manual Excel work, less time
                  tracing discrepancies, and quicker follow-up with platforms and partners.
                </p>
              </div>
            </div>

            {/* Pricing comparison */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">Pricing</h3>
              <div className="nx-pricing__value-pricing-table">
                <div className="nx-pricing__value-pricing-row">
                  <span className="nx-pricing__value-pricing-label">Monthly</span>
                  <span className="nx-pricing__value-pricing-amount">
                    ₹28,000<span className="nx-pricing__value-pricing-period">/month</span>
                  </span>
                </div>
                <div className="nx-pricing__value-pricing-row nx-pricing__value-pricing-row--highlight">
                  <span className="nx-pricing__value-pricing-label">
                    Annual <span className="nx-pricing__value-pricing-badge">15% off</span>
                  </span>
                  <span className="nx-pricing__value-pricing-amount">
                    ₹23,800<span className="nx-pricing__value-pricing-period">/month</span>
                  </span>
                </div>
              </div>
              <p className="nx-pricing__value-pricing-note">
                Designed for your current scale of ~40,000–45,000 orders / month.
                All channels, unlimited team members, no per-transaction pricing.
              </p>
              <p className="nx-pricing__value-pricing-cta">
                A flat predictable price that supports future scale without workflow change.
              </p>
            </div>

            {/* Worth noting */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">A few things worth noting</h3>
              <div className="nx-pricing__value-prose">
                <p>
                  Nothing is auto-actioned. Discrepancies and claims are reviewable by your
                  team, with approval controls before recoveries are raised. Full audit
                  trail, always available.
                </p>
                <p>
                  This is built to scale with you. No per-transaction pricing, no channel
                  limits, no user caps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Plan Inclusions */}
        <section className="nx-pricing__section">
          <div className="nx-pricing__shell">
            <span className="nx-pricing__meta nx-reveal">Plan inclusions</span>
            <h2 className="nx-pricing__display nx-reveal">
              What's <span className="nx-pricing__italic">included.</span>
            </h2>

            <ul className="nx-pricing__inclusions nx-reveal">
              {INCLUSIONS.map((line) => (
                <li key={line} className="nx-pricing__inclusion">
                  <span className="nx-pricing__check" aria-hidden>
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 8.5 6.5 12 13 4.5" />
                    </svg>
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Feature detail */}
        <section className="nx-pricing__section nx-pricing__band nx-pricing__band--paper-deep">
          <div className="nx-pricing__shell">
            <span className="nx-pricing__meta nx-reveal">Capabilities</span>
            <h2 className="nx-pricing__display nx-reveal">
              In <span className="nx-pricing__italic">detail.</span>
            </h2>

            <div className="nx-pricing__features nx-reveal">
              {FEATURE_BLOCKS.map((f) => (
                <article key={f.title} className="nx-pricing__feature">
                  <h3 className="nx-pricing__feature-title">{f.title}</h3>
                  {f.body && <p className="nx-pricing__feature-body">{f.body}</p>}
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

        {/* Next steps */}
        <section className="nx-pricing__band nx-pricing__band--mint">
          <div className="nx-pricing__shell nx-pricing__next">
            <span className="nx-pricing__meta nx-reveal">Next steps</span>
            <h2 className="nx-pricing__next-headline nx-reveal">
              We would be delighted to onboard SuperYou as an{' '}
              <span className="nx-pricing__italic">Enterprise</span> customer.
            </h2>
            <p className="nx-pricing__next-body nx-reveal">
              We propose a 15-day trial with one month of Amazon data, so you can
              experience the full value of the platform before committing to billing.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="nx-pricing__footer">
          <div className="nx-pricing__shell nx-pricing__footer-row">
            <div>
              <div className="nx-pricing__footer-brand">
                <img src={logoFresh} alt="" className="nx-pricing__wordmark-logo" aria-hidden />
                Nexbit
              </div>
              <p className="nx-pricing__footer-line">
                This pricing is prepared exclusively for Elite Mindset Pvt Ltd.
              </p>
              <p className="nx-pricing__footer-line" style={{ marginTop: '12px' }}>
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
              {`PREPARED FOR\nSUPERYOU\n2026`}
            </div>
          </div>
          <div className="nx-pricing__shell nx-pricing__footer-bottom">
            <span className="nx-pricing__meta">© Logikeon Labs Private Limited &middot; All rights reserved</span>
            <span className="nx-pricing__meta">Confidential &middot; do not redistribute</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

const SuperYouPricingPage: React.FC = () => {
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

export default SuperYouPricingPage;
