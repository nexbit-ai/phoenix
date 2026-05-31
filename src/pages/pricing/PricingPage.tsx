import React, { useEffect, useRef, useState } from 'react';
import logoFresh from '../../assets/logo_fresh.jpg';
import { Wordmark } from '../../components/Wordmark';
import { useReveal } from '../../utils/useReveal';
import { isValidEmail, submitNexbitAccountingAiEmail } from '../../utils/sheetdb';
import './pricing.css';

const MIN_TRANSACTIONS = 0;
const MAX_TRANSACTIONS = 150000;
const STEP_TRANSACTIONS = 1000;
const DEFAULT_TRANSACTIONS = 25000;

const RATE_PER_TRANSACTION = 2; // ₹2 per transaction
const MIN_PRICE_CAP = 30000; // ₹30,000 minimum
const MAX_PRICE_CAP = 200000; // ₹2,00,000 maximum
const ANNUAL_DISCOUNT_RATE = 0.85; // 15% discount for annual

type Inclusions = string[];
const INCLUSIONS: Inclusions = [
  'Unified commerce data ingestion (Marketplaces, payment gateways, logistics partners)',
  'Real-time reconciliation of settlements, orders, and payouts',
  'Month-end close orchestration & Close Checklist rails',
  'Automated exception, variance, and anomaly detection',
  'ERP sync & journal-ready entries (Zoho, QuickBooks, Tally, SAP)',
  'AI-guided analysis & ledger explanations',
  'Unlimited user seats and isolated secure workspaces',
  'Dedicated Slack & priority email support with our finance engineers',
];

type RoiItem = { label: string; body: string };
const ROI: RoiItem[] = [
  { label: 'Variance protection', body: 'Uncover hidden commission leaks, double payments, and logistics overcharges.' },
  { label: 'Audit readiness', body: 'Produce clean books your board, your controller, and your auditor instantly trust.' },
  { label: 'Time savings', body: 'Condense weeks of month-end archeological spreadsheet digging into a 3-day close.' },
];

const Waitlist: React.FC<{ alignCenter?: boolean }> = ({ alignCenter }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [focused, setFocused] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError(true);
      return;
    }
    setError(false);
    submitNexbitAccountingAiEmail(email);
    setSubmitted(true);
  };

  const placeholder = error ? '' : focused ? 'Enter your email' : 'Join waitlist';

  return (
    <div className={`nx-waitlist${alignCenter ? ' nx-waitlist--align-center' : ''}`} style={{ maxWidth: '420px', margin: alignCenter ? '0 auto' : '0' }}>
      <form 
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--paper-soft)',
          border: error ? '1px solid var(--clay)' : '1px solid var(--hairline)',
          borderRadius: '999px',
          padding: '4px',
          width: '100%',
          position: 'relative'
        }}
        onSubmit={onSubmit} 
        noValidate
      >
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="email"
            style={{
              width: '100%',
              height: '38px',
              border: 'none',
              background: 'transparent',
              padding: '0 16px',
              fontFamily: 'var(--text)',
              fontSize: '14px',
              color: 'var(--ink)',
              outline: 'none'
            }}
            placeholder={placeholder}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(false);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={submitted}
            aria-label="Email address"
          />
          {error && (
            <span style={{
              position: 'absolute',
              left: '16px',
              bottom: '-22px',
              fontSize: '11px',
              color: 'var(--clay)',
              fontFamily: 'var(--text)'
            }}>
              Enter a valid email
            </span>
          )}
        </div>
        <button
          type="submit"
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '999px',
            background: 'var(--teal)',
            color: 'var(--paper-soft)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 150ms ease',
            cursor: 'pointer'
          }}
          disabled={submitted}
          aria-label="Join waitlist"
        >
          <svg
            style={{ width: '16px', height: '16px' }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </form>
      {submitted && (
        <p style={{
          marginTop: '12px',
          fontSize: '13px',
          color: 'var(--ink-soft)',
          fontFamily: 'var(--text)',
          textAlign: alignCenter ? 'center' : 'left'
        }}>
          Thanks, we&apos;ll be in touch.
        </p>
      )}
    </div>
  );
};

const PricingPage: React.FC = () => {
  const [transactions, setTransactions] = useState<number>(DEFAULT_TRANSACTIONS);
  const [isAnnual, setIsAnnual] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>(DEFAULT_TRANSACTIONS.toLocaleString());

  useReveal();

  useEffect(() => {
    document.title = 'Predictable Pricing | Nexbit';
  }, []);

  // Compute pricing
  const rawPrice = transactions * RATE_PER_TRANSACTION;
  
  // Apply caps (minimum ₹30,000 only)
  const cappedPrice = Math.max(MIN_PRICE_CAP, rawPrice);
  
  // Apply annual billing discount if active
  const baseMonthlyPrice = isAnnual ? cappedPrice * ANNUAL_DISCOUNT_RATE : cappedPrice;
  const finalPrice = Math.round(baseMonthlyPrice);
  
  const originalMonthlyPrice = cappedPrice;
  const monthlySavings = isAnnual ? cappedPrice - finalPrice : 0;

  // Check if minimum cap is currently active
  const isMinCapActive = rawPrice <= MIN_PRICE_CAP;

  // Synchronize slider and input field
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setTransactions(val);
    setInputValue(val.toLocaleString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/,/g, '');
    if (rawVal === '') {
      setInputValue('');
      return;
    }
    const val = Number(rawVal);
    if (!isNaN(val)) {
      setInputValue(val.toLocaleString());
      // Don't clamp on change, let them type. Clamp on blur or submit.
      if (val >= 0 && val <= 1000000) {
        setTransactions(Math.min(MAX_TRANSACTIONS, val));
      }
    }
  };

  const handleInputBlur = () => {
    const rawVal = inputValue.replace(/,/g, '');
    let val = Number(rawVal);
    if (isNaN(val) || rawVal === '') {
      val = DEFAULT_TRANSACTIONS;
    }
    const clamped = Math.max(MIN_TRANSACTIONS, Math.min(MAX_TRANSACTIONS, val));
    setTransactions(clamped);
    setInputValue(clamped.toLocaleString());
  };

  // Get percentage fill for custom range slider track styling
  const sliderPercentage = ((transactions - MIN_TRANSACTIONS) / (MAX_TRANSACTIONS - MIN_TRANSACTIONS)) * 100;

  return (
    <div className="nx-pricing-public">
      <a href="#main" className="nx-skip">Skip to content</a>

      {/* Header topbar */}
      <header className="nx-pricing-public__topbar">
        <div className="nx-pricing-public__shell nx-pricing-public__topbar-inner">
          <a href="/" aria-label="Nexbit home"><Wordmark /></a>
          <nav className="nx-nav" aria-label="Primary">
            <a className="nx-nav__link" href="/pricing">Pricing</a>
            <a className="nx-nav__link" href="/blogs">Blogs</a>
            <a className="nx-nav__link" href="/#capabilities">Capabilities</a>
            <a className="nx-nav__link" href="/#how">How it works</a>
            <a className="nx-nav__link" href="/#faq">FAQ</a>
          </nav>
          <div className="nx-pricing-public__topbar-cta">
            <a className="nx-pricing-public__btn nx-pricing-public__btn--solid" href="#cta">
              Request access
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* HERO */}
        <section className="nx-pricing-public__hero">
          <div className="nx-pricing-public__shell nx-reveal">
            <span className="nx-pricing-public__meta">Predictable Commerce Pricing</span>
            <h1 className="nx-pricing-public__display">
              Prediction, not <span className="nx-pricing-public__italic">speculation.</span>
            </h1>
            <p className="nx-pricing-public__hero-lede">
              Nexbit prices commerce accounting directly on your volume of transactions.
              Calculate your exact monthly fee below.
            </p>
          </div>
        </section>

        {/* INTERACTIVE CALCULATOR SECTION */}
        <section className="nx-pricing-public__calculator-wrap">
          <div className="nx-pricing-public__shell nx-reveal">
            <div className="nx-pricing-public__calc-box">
              
              {/* Intervals toggle */}
              <div className="nx-pricing-public__toggle-container">
                <div className="nx-pricing-public__toggle-pill">
                  <div className={`nx-pricing-public__toggle-bg${isAnnual ? ' is-annual' : ''}`} />
                  <button
                    type="button"
                    className={`nx-pricing-public__toggle-btn${!isAnnual ? ' is-active' : ''}`}
                    onClick={() => setIsAnnual(false)}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    className={`nx-pricing-public__toggle-btn${isAnnual ? ' is-active' : ''}`}
                    onClick={() => setIsAnnual(true)}
                  >
                    Annually
                    <span className="nx-pricing-public__discount-badge">15% off</span>
                  </button>
                </div>
              </div>

              {/* Slider & Input Fields Grid */}
              <div className="nx-pricing-public__calc-fields">
                <div>
                  <h3 style={{ margin: 0, fontFamily: 'var(--text)', fontSize: '18px', fontWeight: 600 }}>
                    Monthly Transactions
                  </h3>
                  <p className="nx-pricing-public__label-desc">
                    Orders across marketplaces, payment rails, and store frontends.
                  </p>
                </div>
                <div className="nx-pricing-public__input-wrap">
                  <input
                    type="text"
                    className="nx-pricing-public__num-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    aria-label="Transactions input count"
                  />
                  <span className="nx-pricing-public__input-suffix">txns</span>
                </div>

                {/* Range Slider Container */}
                <div className="nx-pricing-public__slider-container">
                  <input
                    type="range"
                    className="nx-pricing-public__range-slider"
                    min={MIN_TRANSACTIONS}
                    max={MAX_TRANSACTIONS}
                    step={STEP_TRANSACTIONS}
                    value={transactions}
                    onChange={handleSliderChange}
                    style={{ backgroundSize: `${sliderPercentage}% 100%` }}
                    aria-label="Monthly transactions slider scale"
                  />
                  <div className="nx-pricing-public__slider-labels">
                    <span>0 txns</span>
                    <span>50k</span>
                    <span>100k</span>
                    <span>150k+</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Price Output Box */}
              <div className="nx-pricing-public__calc-result">
                {transactions > 50000 ? (
                  <div className="nx-pricing-public__enterprise-result">
                    <div className="nx-pricing-public__enterprise-info">
                      <span className="nx-pricing-public__meta">Plan Option</span>
                      <h3 className="nx-pricing-public__enterprise-title">
                        Enterprise <em>Option</em>
                      </h3>
                      <p className="nx-pricing-public__enterprise-desc">
                        Predictable support, custom SLA agreements, and dedicated finance engineers for high-volume brands operating beyond 50,000 monthly transactions.
                      </p>
                    </div>
                    <div className="nx-pricing-public__enterprise-cta">
                      <a 
                        href="https://cal.com/shubh.r/nexbit-intro" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="nx-pricing-public__btn nx-pricing-public__btn--large"
                      >
                        Schedule a call <span style={{ marginLeft: '6px' }}>→</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="nx-pricing-public__price-headline">
                      <span className="nx-pricing-public__meta">Estimated Fee</span>
                      <div className="nx-pricing-public__final-amount">
                        <span style={{ fontSize: 'clamp(20px, 2vw, 32px)', fontWeight: 400, marginRight: '6px', color: 'var(--ink-soft)' }}>₹</span>
                        {finalPrice.toLocaleString()}
                        <span className="nx-pricing-public__price-period">/ month</span>
                      </div>
                      {isAnnual && (
                        <span className="nx-pricing-public__price-subtext">
                          Billed annually · Save ₹{monthlySavings.toLocaleString()} / month (normally ₹{originalMonthlyPrice.toLocaleString()})
                        </span>
                      )}
                      {!isAnnual && (
                        <span className="nx-pricing-public__price-subtext">
                          No commitment · Billed month-to-month
                        </span>
                      )}
                    </div>

                    {/* Status Cap Indicators */}
                    <div 
                      className={`nx-pricing-public__threshold-badge${isMinCapActive ? ' is-cap' : ''}`}
                      role="status"
                      aria-live="polite"
                    >
                      <span className="nx-pricing-public__threshold-dot" />
                      <span>
                        {isMinCapActive ? 'Base Price Cap Applied (Min ₹30k)' : 'Predictable Volume Standard Rate'}
                      </span>
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* VALUE PROPOSITIONS & ROI */}
        <section className="nx-pricing-public__section nx-pricing-public__band nx-pricing-public__band--paper-deep">
          <div className="nx-pricing-public__shell">
            <div className="nx-pricing-public__meta nx-reveal">ROI</div>
            <h2 className="nx-pricing-public__display nx-reveal" style={{ maxWidth: '24ch' }}>
              Designed to return its <span className="nx-pricing-public__italic">investment.</span>
            </h2>

            <ol className="nx-pricing-public__roi-grid nx-reveal">
              {ROI.map((r, i) => (
                <li key={r.label} className="nx-pricing-public__roi-item">
                  <span className="nx-pricing-public__roi-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="nx-pricing-public__roi-title">{r.label}</h3>
                    <p className="nx-pricing-public__roi-body">{r.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PLAN INCLUSIONS */}
        <section className="nx-pricing-public__section">
          <div className="nx-pricing-public__shell">
            <div className="nx-pricing-public__meta nx-reveal">Inclusions</div>
            <h2 className="nx-pricing-public__display nx-reveal" style={{ maxWidth: '24ch' }}>
              Standard on every <span className="nx-pricing-public__italic">plan.</span>
            </h2>

            <ul className="nx-pricing-public__inclusions-grid nx-reveal">
              {INCLUSIONS.map((line) => (
                <li key={line} className="nx-pricing-public__inclusion">
                  <span className="nx-pricing-public__check-container" aria-hidden>
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

        {/* FINAL CTA BAND */}
        <section id="cta" className="nx-pricing-public__band nx-pricing-public__band--mist">
          <div className="nx-pricing-public__shell nx-pricing-public__final-band nx-reveal">
            <h2 className="nx-pricing-public__final-headline">
              Run finance like the <em>rest</em> of your scaling operation.
            </h2>
            <Waitlist alignCenter />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="nx-pricing-public__footer">
          <div className="nx-pricing-public__shell">
            <div className="nx-pricing-public__footer-row">
              <div>
                <div className="nx-pricing-public__footer-brand">
                  <img src={logoFresh} alt="" aria-hidden />
                  Nexbit
                </div>
                <p className="nx-pricing-public__footer-line">
                  Accounting AI for D2C. The operating layer for commerce settlements,
                  payouts, unified data ledgers, and month-end close.
                </p>
                <p className="nx-pricing-public__footer-line" style={{ marginTop: '12px' }}>
                  Contact us:{' '}
                  <a
                    href="mailto:founders@usenexbit.com"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                  >
                    founders@usenexbit.com
                  </a>
                </p>
              </div>
              <div className="nx-pricing-public__footer-addr nx-mono">
                {`ACCOUNTING AI\nFOR D2C\n2026`}
              </div>
            </div>

            <div className="nx-pricing-public__footer-bottom">
              <span className="nx-pricing-public__meta">© Logikeon Labs Private Limited · All rights reserved</span>
              <span className="nx-pricing-public__meta">Built for modern commerce finance operations</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PricingPage;
