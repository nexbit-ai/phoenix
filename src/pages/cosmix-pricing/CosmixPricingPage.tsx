import React, { useEffect, useRef, useState } from 'react';
import logoFresh from '../../assets/logo_fresh.jpg';
import './cosmix-pricing.css';

const PIN = '8391';
const UNLOCK_KEY = 'nx-cosmix-pricing-unlocked-v1';

/* ─── Content constants ─────────────────────────────────────────────── */

const CHANNELS = [
  'Blinkit',
  'Zepto',
  'Swiggy Instamart',
  'B2B Distributors',
  'D2C Website',
  'Amazon',
  'Flipkart',
  'And more..',
];

type ProblemCard = { number: string; title: string; body: React.ReactNode };
const PROBLEM_CARDS: ProblemCard[] = [
  {
    number: '01',
    title: 'Opaque Bulk Payouts',
    body: (
      <>
        A lump-sum settlement lands in your bank from Blinkit or Zepto.{' '}
        <strong>No line-item breakup</strong>, no way to verify what was
        deducted or why. Your finance team is left reverse-engineering
        every payout.
      </>
    ),
  },
  {
    number: '02',
    title: 'Hidden Platform Deductions',
    body: (
      <>
        Storage charges you never approved. Commission slabs that
        silently shifted. Distributor discounts applied{' '}
        <strong>after the invoice</strong>. These deductions compound
        into lakhs of unrecovered losses every quarter.
      </>
    ),
  },
  {
    number: '03',
    title: 'Unexplained Short Settlements',
    body: (
      <>
        You shipped <strong>₹10,00,000</strong> worth of product.
        The platform settled <strong>₹9,40,000</strong>. Where did{' '}
        <strong>₹60,000 go?</strong> Without order-level
        reconciliation, the answer stays buried in spreadsheets.
      </>
    ),
  },
  {
    number: '04',
    title: 'No Single View Across Channels',
    body: (
      <>
        Quick Commerce, B2B distributors, and D2C, each with its own
        settlement cadence, fee structure, and reporting format. Without a{' '}
        <strong>single accountable partner</strong>, reconciliation becomes
        a full-time job.
      </>
    ),
  },
];

type FeatureBlock = { title: string; body?: string; bullets?: string[] };
const FEATURE_BLOCKS: FeatureBlock[] = [
  {
    title: 'Expected vs. Actual Payout Tracking',
    body: 'Automated reconciliation across Blinkit, Zepto, Swiggy Instamart, and your B2B distributor channels. Every bulk settlement is broken down into expected versus actual, so you see exactly what arrived and what didn\'t.',
  },
  {
    title: 'Line-Item Discrepancy Categorization',
    body: 'We don\'t just tell you money is missing. We tell you exactly why. Every shortfall is categorized: "₹5,000 lost to incorrect commission slab," "₹2,000 unexpected storage fee," "₹8,000 distributor discount applied post-invoice." Actionable, not ambiguous.',
  },
  {
    title: 'End-to-End Month-End Reconciliation',
    body: 'The entire B2B reconciliation process runs in the background. We handle invoice-to-payment matching, debit note tracking, GRN discrepancies, and settlement verification. Finalized books delivered to your finance team, zero manual effort.',
  },
  {
    title: 'Quick Commerce Settlement Auditing',
    bullets: [
      'Commission rates verified against your contracted slabs per platform',
      'Storage, packaging, and logistics charges validated line by line',
      'Settlement TAT monitored with automatic breach alerts',
    ],
  },
  {
    title: 'B2B Distributor Reconciliation',
    bullets: [
      'Invoice-to-GRN-to-payment matching across all distributor partners',
      'Short-quantity deliveries and post-invoice debit notes surfaced automatically',
      'Full order-to-cash visibility: invoice → GRN → debit note → UTR',
    ],
  },
  {
    title: 'D2C & Marketplace Coverage',
    bullets: [
      'Seamless order-level reconciliation for your D2C website and B2C marketplace channels',
      'All revenue streams, B2B, Quick Commerce, and D2C, unified in a single dashboard, ensuring nothing slips through',
    ],
  },
];

const INCLUSIONS: string[] = [
  'Fully managed reconciliation across Blinkit, Zepto, Swiggy Instamart, and B2B distributor channels',
  'Expected vs. Actual payout verification for every Quick Commerce and distributor settlement',
  'Line-item discrepancy categorization: commission errors, storage charges, distributor deductions, explained, not just flagged',
  'Complete month-end B2B reconciliation delivered to your team, zero manual effort',
  'Custom reporting for each distributor channel, built to your CFO\'s specifications',
  'Platform-specific deduction identification: storage fees, commission slab mismatches, logistics overcharges',
  'Seamless D2C website and B2C marketplace reconciliation included',
  'Proactive TAT breach alerts and settlement delay escalation',
  'Dispute ticketing, filing, and recovery, managed to closure',
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
    label: 'Payout-level visibility, 24/7, across every Quick Commerce and B2B channel.',
  },
  {
    value: '~2-5%',
    label: 'Revenue leakage typically recovered from commission, storage, and distributor mismatches.',
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
            Pricing prepared for Cosmix
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
            Confidential &middot; for Cosmix
          </span>
        </div>
      </header>

      <main>
        {/* ═══ Section 1: Executive Hook (Hero) ═══ */}
        <section className="nx-pricing__hero">
          <div className="nx-pricing__hero-shell">
            <div className="nx-pricing__hero-frame nx-reveal">
              <span className="nx-pricing__hero-eyebrow">
                Prepared for Cosmix
              </span>

              <h1 className="nx-pricing__hero-title">
                Zero touch{' '}
                <span className="nx-pricing__italic">receivables management.</span>
              </h1>

              <p className="nx-pricing__hero-subtitle">
                Quick Commerce payouts from Blinkit, Zepto, and Swiggy Instamart
                are opaque by design. B2B distributor settlements are no better.
                We track exactly what you were expected to be paid versus what
                actually arrived in the bank, down to the last rupee.
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

        {/* ═══ Section 2: The B2B / Quick Commerce Problem ═══ */}
        <section className="nx-pricing__problem">
          <div className="nx-pricing__shell">
            <div className="nx-pricing__problem-header">
              <span className="nx-pricing__meta nx-reveal">The problem</span>
              <h2 className="nx-pricing__display nx-reveal">
                Where is the{' '}
                <span className="nx-pricing__italic">money?</span>
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
                Every bulk settlement you accept without line-item verification
                is revenue walking out the door.{' '}
                <strong>We make sure it doesn't</strong>. Every day without a
                dedicated reconciliation partner is a day platform deductions go
                unquestioned.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ Section 3: Done-For-You B2B Reconciliation (The Solution) ═══ */}
        <section className="nx-pricing__section nx-pricing__band nx-pricing__band--paper-deep">
          <div className="nx-pricing__shell">
            <span className="nx-pricing__meta nx-reveal">What we do for you</span>
            <h2 className="nx-pricing__display nx-reveal">
              Your financial{' '}
              <span className="nx-pricing__italic">truth.</span>
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
              payout, deduction, and discrepancy across every channel.
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
                    35,999
                  </span>
                  <span className="nx-pricing__investment-price-period">
                    / month
                  </span>
                </div>
              </div>

              <div className="nx-pricing__investment-body">
                <p className="nx-pricing__investment-note">
                  Covers everything: AI-driven B2B and Quick Commerce
                  reconciliation, custom reporting for every distributor
                  channel, platform deduction identification, dashboard
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
              We run full reconciliation on your live Quick Commerce and B2B
              distributor data. You see the hidden storage charges, commission
              mismatches, and settlement shortfalls we catch. No commitment
              until you see the results.
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
                This service proposal is prepared exclusively for Cosmix.
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
              {`PREPARED FOR\nCOSMIX\n2026`}
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

const CosmixPricingPage: React.FC = () => {
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

export default CosmixPricingPage;
