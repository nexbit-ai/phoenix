import React, { useEffect, useRef, useState } from 'react';
import logoFresh from '../../assets/logo_fresh.jpg';
import './bacca-bucci-pricing.css';

const PIN = '1706';
const UNLOCK_KEY = 'nx-bacca-bucci-pricing-unlocked-v1';



const INCLUSIONS: string[] = [
  'Unlimited transactions',
  'Complete D2C ecosystem integration: logistics partners & OMS systems',
  'Marketplace integrations',
  'ERP connections with Zoho Books, SAP and Tally',
  'Transaction categorization',
  'Automated multi-party reconciliation',
  'Automated matching of selling prices, rate cards, and commissions',
  'Customizable reporting dashboards',
  'Automated bookkeeping',
];

type FeatureBlock = { title: string; body?: string; bullets?: string[] };
const FEATURE_BLOCKS: FeatureBlock[] = [
  {
    title: 'Reconciliation',
    body: 'Automated real-time reconciliation of your orders and transactions from multiple sources.',
  },
  {
    title: 'Dispute management',
    body: 'Instantly identify discrepancies and resolve disputes with our AI-powered system that flags inconsistencies in real-time. Raise disputes directly from the platform for marketplaces, saving hours of manual portal management and avoiding missed dispute windows.',
  },
  {
    title: 'Integrations',
    body: 'We handle all integrations with your existing stack',
    bullets: [
      'Marketplaces: Amazon, Flipkart, Myntra, own website, Ajio, Tata Cliq, Snapdeal',
      'Quickcommerce: Zepto, Instamarket, Blinkit, Jiomart',
      'Logistics Providers: Shadowfax, Delhivery, Ecom Express, Ekart, Amazon, Blitznow, Blue Dart, DTDC',
      'Payment gateways / aggregators: Razorpay, PayU, Easebuzz, Paytm',
      'CSV Support for any custom integrations'
    ],
  },
  {
    title: 'Security',
    bullets: [
      'Multi-factor authentication',
      'Detailed audit logs to track user activity',
      'User roles & permissions',
      'Approval workflow',
    ],
  },
  {
    title: 'Data backup',
    body: 'Unlimited backup included.',
  },
  {
    title: 'Support',
    body: 'Dedicated priority email & call support.',
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
            Pricing prepared for Bacca Bucci
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
            Confidential · for Bacca Bucci
          </span>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="nx-pricing__hero">
          <div className="nx-pricing__hero-shell">
            <div className="nx-pricing__hero-frame nx-reveal">
              <span className="nx-pricing__hero-eyebrow">
                Plan for Bacca Bucci
              </span>

              <div className="nx-pricing__hero-row">
                <div className="nx-pricing__hero-main">
                  <h1 className="nx-pricing__hero-title">
                    Plan: <span className="nx-pricing__italic">Growth</span>
                  </h1>
                  <p style={{ fontSize: '18px', color: 'var(--on-dark-soft)', marginBottom: '32px', maxWidth: '44ch', lineHeight: 1.5 }}>
                    Recover <strong>5-10% of your GMV</strong> every quarter through smart recon and real-time disputes.
                  </p>

                  <div className="nx-pricing__price">
                    <span className="nx-pricing__price-currency">₹</span>
                    <span className="nx-pricing__price-amount">20,999</span>
                    <span className="nx-pricing__price-period">/ month</span>
                  </div>

                  <div className="nx-pricing__price-meta">
                    <span>Up to 20 users</span>
                    <span aria-hidden>·</span>
                    <span>2-week trial</span>
                    <span aria-hidden>·</span>
                    <span>Billed monthly</span>
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
                Three things in one subscription: the{' '}
                <strong>Reconciliation Engine</strong>,{' '}
                <strong>real-time disputes management</strong>, and{' '}
                <strong>live reporting</strong>.
              </p>
            </div>

            {/* Reconciliation Engine */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">Reconciliation Engine</h3>
              <div className="nx-pricing__value-prose">
                <p>
                  Nexbit's reconciliation engine processes every order in real time matching settlements,
                  fees and deductions across all marketplaces, logistics providers and payment gateways automatically.
                </p>
              </div>
            </div>

            {/* Smart Disputes management */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">Smart Dispute management</h3>
              <div className="nx-pricing__value-prose">
                <p>
                  Our system matches every order against contracts, detects wrong fees and deductions, and automatically raises disputes with marketplaces, logistics providers and payment gateways recovering revenue that would otherwise go unnoticed.
                </p>
              </div>
            </div>

            {/* Reporting & MIS */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">Reporting &amp; MIS</h3>
              <div className="nx-pricing__value-prose">
                <p>
                  With Nexbit, All revenue adashboards are
                  live. The CFO sees actuals directly, without waiting for a
                  report to be assembled.
                </p>
                <p>
                  Investor-ready and audit-ready data is available at any point, already
                  structured.
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
                    ₹20,999<span className="nx-pricing__value-pricing-period">/month</span>
                  </span>
                </div>
                <div className="nx-pricing__value-pricing-row nx-pricing__value-pricing-row--highlight">
                  <span className="nx-pricing__value-pricing-label">
                    Annual <span className="nx-pricing__value-pricing-badge">10% off</span>
                  </span>
                  <span className="nx-pricing__value-pricing-amount">
                    ₹18,899<span className="nx-pricing__value-pricing-period">/month</span>
                  </span>
                </div>
              </div>
              <p className="nx-pricing__value-pricing-note">
                Unlimited transactions.
              </p>
            </div>

            {/* Worth noting */}
            <div className="nx-pricing__value-block nx-reveal">
              <h3 className="nx-pricing__value-title">A few things worth noting</h3>
              <div className="nx-pricing__value-prose">
                <p>
                  Nothing is auto-booked. Every entry is reviewable by your controller
                  before it hits the books. Full audit trail, always available.
                </p>
                <p>
                  This is built to scale with you. No per-transaction pricing, no
                  channel limits, no user caps.
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

        {/* Feature detail (Reconciliation, Dispute, Integrations, Security, Backup, Support) */}
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

        {/* Brands */}
        <section className="nx-pricing__section" style={{ padding: '48px 0', borderBottom: '1px solid var(--hairline)' }}>
          <div className="nx-pricing__shell">
            <span className="nx-pricing__meta nx-reveal" style={{ display: 'block', textAlign: 'center', marginBottom: '16px' }}>Trusted By</span>
            <h2 className="nx-pricing__display nx-reveal" style={{ textAlign: 'center', margin: '0 auto', maxWidth: 'none', fontSize: 'clamp(24px, 3vw, 32px)' }}>
              <span>Kapiva, Heads Up For Tails, and 5 more.</span>
            </h2>
          </div>
        </section>

        {/* Next steps */}
        <section className="nx-pricing__band nx-pricing__band--mint">
          <div className="nx-pricing__shell nx-pricing__next">
            <span className="nx-pricing__meta nx-reveal">Next steps</span>
            <h2 className="nx-pricing__next-headline nx-reveal">
              We would be delighted to onboard Bacca Bucci as an{' '}
              <span className="nx-pricing__italic">Enterprise</span> customer.
            </h2>
            <p className="nx-pricing__next-body nx-reveal">
              With a 2-week trial, you will be able to experience the full value
              of our solution before committing to billing.
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
                This pricing is prepared exclusively for Bacca Bucci.
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
              {`PREPARED FOR\nBACCA BUCCI\n2026`}
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

const BaccaBucciPricingPage: React.FC = () => {
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

export default BaccaBucciPricingPage;
