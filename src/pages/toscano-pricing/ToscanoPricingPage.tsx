import React, { useEffect, useRef, useState } from 'react';
import logoFresh from '../../assets/logo_fresh.jpg';
import './toscano-pricing.css';

const PIN = '1706';
const UNLOCK_KEY = 'nx-toscano-pricing-unlocked-v1';

const INCLUSIONS: string[] = [
  'Unlimited orders and transactions',
  'Unlimited users and roles',
  'Unlimited reconciliation workflows',
  'Integrations: Urban Piper, Zomato, Swiggy, Swiggy Dineout / dine-in reports, Microsoft Business Central',
  'Bank statement uploads & ERP ledger data',
  'Automated dispute raising for commission overcharges & unapproved promotions',
  'Location-wise dashboards for all 42 outlets',
  'New custom integrations added within 2 days if needed',
];

type FeatureBlock = { title: string; body?: string; bullets?: string[] };
const FEATURE_BLOCKS: FeatureBlock[] = [
  {
    title: 'Reconciliation Engine',
    body: 'Automated real-time reconciliation across your entire stack. Pre-configured for four major workflows: ERP vs Urban Piper, POS vs Zomato/Swiggy Dine-in, Urban Piper vs Zomato/Swiggy Delivery, and expected collections vs bank/ERP ledger entries.',
  },
  {
    title: 'Automated Dispute Management',
    body: 'Identify commission overcharges, payout mismatches, TDS issues, and unapproved promotions from Zomato and Swiggy. Raise disputes automatically with marketplaces to recover 5-8% of GMV.',
  },
  {
    title: 'Custom MIS & Location-wise Dashboards',
    body: 'Gain complete visibility into matched vs mismatched orders, settlement delays, reason-level discrepancy analysis, and location performance across all 42 outlets.',
  },
  {
    title: 'Bank Reconciliation',
    body: 'Effortlessly match expected collections against bank statement uploads and ERP ledger data, eliminating manual Excel work and accelerating month-end close.',
  },
  {
    title: 'Security & Compliance',
    body: 'Designed for finance control and audit readiness. Includes multi-factor authentication, granular permissions, and full support for SOC documentation at the contract stage.',
  },
  {
    title: 'Support & Onboarding',
    body: 'Dedicated priority support and tailored onboarding for your finance team, moving you away from manual Excel processes smoothly.',
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
            Pricing prepared for Toscano
          </span>
          <h1 className="nx-pricing__gate-title">
            A private <span className="nx-pricing__italic">quote.</span>
          </h1>
          <p className="nx-pricing__gate-lede">
            Prepared exclusively for Toscano (United Foodbrands Limited). Enter the four-digit access code shared with you.
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
            Confidential · for United Foodbrands Limited
          </span>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="nx-pricing__hero">
          <div className="nx-pricing__hero-shell">
            <div className="nx-pricing__hero-frame nx-reveal">
              <span className="nx-pricing__hero-eyebrow">
                Plan for Toscano (United Foodbrands Limited)
              </span>

              <div className="nx-pricing__hero-row">
                <div className="nx-pricing__hero-main">
                  <h1 className="nx-pricing__hero-title">
                    Plan: <span className="nx-pricing__italic">Growth</span>
                  </h1>
                  <p style={{ fontSize: '18px', color: 'var(--on-dark-soft)', marginBottom: '32px', maxWidth: '46ch', lineHeight: 1.5 }}>
                    Recover <strong>5-8% of your GMV</strong> by identifying commission overcharges, payout mismatches, and unapproved promotions from Zomato and Swiggy.
                  </p>

                  <div className="nx-pricing__price">
                    <span className="nx-pricing__price-currency">₹</span>
                    <span className="nx-pricing__price-amount">25,000</span>
                    <span className="nx-pricing__price-period">/ month</span>
                  </div>

                  <div className="nx-pricing__price-meta">
                    <span>Unlimited orders</span>
                    <span aria-hidden>·</span>
                    <span>Unlimited users</span>
                    <span aria-hidden>·</span>
                    <span>Unlimited reconciliation workflows</span>
                  </div>

                </div>

                <aside className="nx-pricing__hero-aside">
                  <span className="nx-pricing__meta nx-pricing__hero-aside-label">
                    Annual commitment
                  </span>
                  <p className="nx-pricing__hero-aside-line">
                    <span className="nx-pricing__italic">10%</span> discount
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
              <p className="nx-pricing__value-highlight">
                A consultative enterprise solution replacing manual Excel workflows. Nexbit acts as your single source of truth for{' '}
                <strong>~₹6 crore/month in dine-in + delivery revenue</strong>.
              </p>
            </div>

            {/* Reconciliation Engine */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">Reconciliation Engine</h3>
              <div className="nx-pricing__value-prose">
                <p>
                  Nexbit automates your 4 most time-consuming reconciliation workflows: ERP vs Urban Piper, POS vs Zomato/Swiggy Dine-in, Urban Piper vs Zomato/Swiggy Delivery, and expected collections vs bank/ERP ledger entries.
                </p>
              </div>
            </div>

            {/* Smart Disputes management */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">Automated Dispute Management</h3>
              <div className="nx-pricing__value-prose">
                <p>
                  We identify revenue leaks from commission overcharges and payout mismatches to TDS issues and unapproved promotions from Zomato and Swiggy, and automate dispute raising with optional approval workflows to recover 5-8% of GMV.
                </p>
              </div>
            </div>

            {/* Reporting & MIS */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">Custom MIS &amp; Dashboards</h3>
              <div className="nx-pricing__value-prose">
                <p>
                  Monitor location performance across all 42 outlets instantly. Your finance team gets visibility into matched vs mismatched orders, settlement delays, and reason-level discrepancy analysis in real-time.
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
                    ₹25,000<span className="nx-pricing__value-pricing-period">/month</span>
                  </span>
                </div>
                <div className="nx-pricing__value-pricing-row nx-pricing__value-pricing-row--highlight">
                  <span className="nx-pricing__value-pricing-label">
                    Annual <span className="nx-pricing__value-pricing-badge">10% off</span>
                  </span>
                  <span className="nx-pricing__value-pricing-amount">
                    ₹22,500<span className="nx-pricing__value-pricing-period">/month</span>
                  </span>
                </div>
              </div>
              <p className="nx-pricing__value-pricing-note">
                Unlimited transactions, workflows, and users.
              </p>
            </div>

            {/* Worth noting */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">A few things worth noting</h3>
              <div className="nx-pricing__value-prose">
                <p>
                  <strong>Nothing is auto-booked.</strong> Disputes can be raised automatically with optional approval workflows, giving your team complete control.
                </p>
                <p>
                  The system is designed for finance control and audit readiness. We provide full support for SOC documentation at the contract stage.
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
              Review proposal, start a 2-week trial, then move to rollout if satisfied.
            </h2>
            <p className="nx-pricing__next-body nx-reveal">
              We look forward to partnering with Toscano team to eliminate manual Excel work and optimize your revenue reconciliation.
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
                This pricing is prepared exclusively for Toscano (United Foodbrands Limited).
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
              {`PREPARED FOR\nUNITED FOODBRANDS LIMITED\n2026`}
            </div>
          </div>
          <div className="nx-pricing__shell nx-pricing__footer-bottom">
            <span className="nx-pricing__meta">© Logikeon Labs Private Limited · All rights reserved</span>
            <span className="nx-pricing__meta">Confidential · do not redistribute</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

const ToscanoPricingPage: React.FC = () => {
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

export default ToscanoPricingPage;
