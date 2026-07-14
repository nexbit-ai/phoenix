import React, { useEffect, useRef, useState } from 'react';
import logoFresh from '../../assets/logo_fresh.jpg';
import './sirona-pricing.css';

const PIN = '8391';
const UNLOCK_KEY = 'nx-sirona-pricing-unlocked-v1';

const INCLUSIONS: string[] = [
  'Single source of truth for reconciliation across D2C Website, Flipkart, Amazon, Other marketplaces and B2B invoicing',
  'Order and invoice to payout visibility, expected vs actual settlements across every channel',
  'B2C settlement verification, short and unsettled payouts flagged automatically',
  'Commission verification against your specific Flipkart and Amazon contracts',
  'Automated mismatch and revenue leakage detection',
  'Full order-to-cash visibility: invoice to GRN to debit note to UTR',
  'Short-quantity delivery detection, GRN vs invoice mismatch flagged',
  'Debit notes fetched and visible at transaction level',
  'Logistics reconciliation, rate card vs billed, across your courier partners',
  'EasyEcom, Shopify, and Zoho Books integration, with email-forwarding document ingestion',
  'AI MIS, cash flow forecasting, and fully customizable dashboards',
];

type FeatureBlock = { title: string; body?: string; bullets?: string[] };
const FEATURE_BLOCKS: FeatureBlock[] = [
  {
    title: 'D2C & Marketplace Reconciliation',
    body: 'Reconcile across Shopify, EasyEcom, Zoho Books, Flipkart, Amazon (B2C and B2B), payment providers (Easebuzz, PayU, Razorpay and more), and logistics partners, with order level visibility into matched, mismatched, and unsettled transactions, and expected vs actual payouts. The first time order-level reconciliation runs automatically instead of by hand.',
  },
  {
    title: 'B2C Settlement Verification',
    body: 'Close the B2C blind spot. Every marketplace and gateway payout is checked against what was expected at order level, so short-paid and unsettled B2C settlements surface automatically instead of going unnoticed.',
  },
  {
    title: 'Commission & Contract Compliance',
    body: 'Verify that Flipkart and Amazon deducted the correct commission percentage against your own negotiated contract. Personalized contracts are ingested and compared line by line, catching silent or seller-specific rate changes.',
  },
  {
    title: 'B2B Reconciliation & Order-to-Cash',
    bullets: [
      'Full O2C: invoice to GRN to debit note to payment and UTR',
      'Short-quantity delivery detection',
      'Debit notes fetched and visible at transaction level, so discount deductions are never a surprise',
    ],
  },
  {
    title: 'Bulk Dispute Filing & Recovery',
    bullets: [
      'Claim buckets: unpaid, short-paid, fee adjustments and overcharges',
      'AI agents file in batches with optional approval controls before any action is triggered',
    ],
  },
  {
    title: 'Logistics Reconciliation',
    bullets: [
      'Contract rate card vs billed validation at order level',
      'Weight discrepancy detection across all logistics partners',
      'Flag non-delivered but billed shipments and recoverable deductions',
    ],
  },
  {
    title: 'AI MIS, Forecasting & Dashboards',
    body: 'Fully customizable, leadership-ready dashboards covering recoverables, settlement performance, and channel-wise aging, with AI MIS and cash flow forecasting. Onboarding includes a 7-day dashboard setup tailored to how your team reviews numbers.',
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
            Pricing prepared for Sirona Hygiene Private Limited
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
            Confidential &middot; for Sirona
          </span>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="nx-pricing__hero">
          <div className="nx-pricing__hero-shell">
            <div className="nx-pricing__hero-frame nx-reveal">
              <span className="nx-pricing__hero-eyebrow">
                Plan for Sirona Hygiene Private Limited
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
                    <span>Built for unlimited orders / month</span>
                    <span aria-hidden>&middot;</span>
                    <span>15-day trial</span>
                    <span aria-hidden>&middot;</span>
                    <span>Billed monthly</span>
                  </div>
                </div>

                <aside className="nx-pricing__hero-aside">
                  <span className="nx-pricing__meta nx-pricing__hero-aside-label">
                    Simple, flat pricing
                  </span>
                  <p className="nx-pricing__hero-aside-line">
                    No <span className="nx-pricing__italic">per-order</span> fees,
                    no channel caps, no user limits.
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
                D2C, marketplaces, and B2B, moving your team from manual ticket-raising to
                automated order-level reconciliation, and recovering cash across every channel.
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
                  D2C (Shopify), Flipkart, Amazon B2C and B2B, and your B2B invoicing in one
                  place, with every order, invoice, settlement, GRN, debit note, and payout in
                  a single view.
                </p>
                <p>
                  It's the first time expected vs actual lines up automatically, synced in near
                  real-time from EasyEcom, settlement reports, and logistics.
                </p>
              </div>
            </div>

            {/* Leakage & recovery */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">Leakage detection &amp; recovery</h3>
              <div className="nx-pricing__value-prose">
                <p>
                  B2C short and unsettled payouts surface automatically. On B2B, short-quantity deliveries and debit
                  notes are traceable at transaction level, and is fully explained.
                </p>
                <p>
                  Commission is verified against your Flipkart and Amazon contracts.
                </p>
              </div>
            </div>

            {/* Pricing */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">Pricing</h3>
              <div className="nx-pricing__value-pricing-table">
                <div className="nx-pricing__value-pricing-row nx-pricing__value-pricing-row--highlight">
                  <span className="nx-pricing__value-pricing-label">Flat monthly</span>
                  <span className="nx-pricing__value-pricing-amount">
                    ₹28,000<span className="nx-pricing__value-pricing-period">/month</span>
                  </span>
                </div>
              </div>
              <p className="nx-pricing__value-pricing-note">
                Designed for your current scale of ~1,500 to 2,000 B2B invoices per month plus
                unlimited B2C order volume across channels. All channels, unlimited team
                members, no per-transaction pricing.
              </p>
              <p className="nx-pricing__value-pricing-cta">
                A flat, predictable price that supports future scale without workflow change.
              </p>
            </div>

            {/* Worth noting */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">A few things worth noting</h3>
              <div className="nx-pricing__value-prose">
                <p>
                  Nothing is auto-actioned, every claim is reviewable with approval controls
                  and a full audit trail. Built to scale: no per-transaction pricing, no channel
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
              We would be delighted to onboard Sirona as a long-term{' '}
              <span className="nx-pricing__italic">partner</span>.
            </h2>
            <p className="nx-pricing__next-body nx-reveal">
              We propose a 15-day trial run on one month of your data across B2B invoices and
              B2C settlements, so your team can see the short-payments, debit note gaps, and
              commission variances we recover before any billing begins. Onboarding includes a
              7-day dashboard setup tailored to your team.
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
                This pricing is prepared exclusively for Sirona Hygiene Private Limited.
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
              {`PREPARED FOR\nSIRONA\n2026`}
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

const SironaPricingPage: React.FC = () => {
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

export default SironaPricingPage;
