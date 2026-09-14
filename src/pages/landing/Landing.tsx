import React, { useEffect, useRef, useState } from 'react';
import logoFresh from '../../assets/logo_fresh.jpg';
import heroLandingImg from '../../assets/hero-landing.jpg';
import securityFingerprint from '../../assets/security-fingerprint.jpg';
import securityVault from '../../assets/security-vault.jpg';
import securityPadlock from '../../assets/security-padlock.jpg';
import { isValidEmail, submitNexbitAccountingAiEmail } from '../../utils/sheetdb';
import { useReveal } from '../../utils/useReveal';
import './landing.css';

/* ---------------------------------------------------------------
   Nexbit — AI Accounting
   Monochromatic editorial landing page.
   --------------------------------------------------------------- */

// ─── Data ────────────────────────────────────────────────────────

type Capability = { title: string; body: string };
const CAPABILITIES: Capability[] = [
  {
    title: 'Real-time reconciliation',
    body: 'Every transaction matched, verified, and reconciled the moment it lands.',
  },
  {
    title: 'Anomaly detection',
    body: 'Variances and mismatches surfaced with context, not just alerts.',
  },
  {
    title: 'Human-in-the-loop',
    body: 'Flagged exceptions routed to the right person. AI suggests, your team decides.',
  },
  {
    title: 'On-demand dashboards',
    body: 'Revenue, settlements, ageing, and close readiness. Generated, not assembled.',
  },
  {
    title: 'Nex assistant',
    body: 'Ask anything about your books. Get tables, summaries, and answers in seconds.',
  },
  {
    title: 'Month-end close',
    body: 'From ten days to one hour. Journal-ready entries, reconciled and auditable.',
  },
];

type Step = { num: string; title: string; body: string };
const STEPS: Step[] = [
  {
    num: '01',
    title: 'Connect',
    body: 'Plug in your systems. ERPs, payment gateways, banks, marketplaces. First sync in minutes.',
  },
  {
    num: '02',
    title: 'Reconcile',
    body: 'Every order, payout, and fee is matched across sources into a single financial timeline.',
  },
  {
    num: '03',
    title: 'Verify',
    body: 'Anomalies and exceptions surface with context. Your team reviews. AI learns.',
  },
  {
    num: '04',
    title: 'Close',
    body: 'Journal entries, reports, and the month-end close. Done in an hour, not a fortnight.',
  },
];

type Faq = { q: string; a: React.ReactNode };
const FAQS: Faq[] = [
  {
    q: 'Who is Nexbit built for?',
    a: (
      <p>
        Finance teams, controllers, and accounting operators inside high-volume
        enterprises. If your month-end close involves multiple payment rails,
        hundreds of reconciliation items, and too many spreadsheets, this is for you.
      </p>
    ),
  },
  {
    q: 'How is AI used in the product?',
    a: (
      <>
        <p>
          AI sits inside specific workflows: reconciliation matching, anomaly
          detection, variance explanation, and the Nex assistant. AI is never allowed to calculate numbers in your data. It never books
          an entry your team hasn't reviewed.
        </p>
        <p>
          Every suggestion is editable, every action is auditable.
        </p>
      </>
    ),
  },
  {
    q: 'How fast can we go live?',
    a: (
      <p>
        Most teams complete their first reconciliation pass within the first week
        of onboarding. Connections are API-native or file-upload based. No
        migration project.
      </p>
    ),
  },
  {
    q: 'Is our data secure?',
    a: (
      <p>
        Every workspace is isolated. Data is encrypted at rest and in transit.  Authentication uses enterprise SSO with
        session controls and short-lived tokens. Financial data is read-only by
        default, audited by design.
      </p>
    ),
  },
];

// ─── Hooks ───────────────────────────────────────────────────────

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

// ─── Shared Components ──────────────────────────────────────────

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

const Waitlist: React.FC<{ center?: boolean }> = ({ center }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

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

  return (
    <div>
      <form
        className={`nx-waitlist-form${center ? ' nx-waitlist-form--center' : ''}`}
        onSubmit={onSubmit}
        noValidate
      >
        <input
          type="email"
          className="nx-waitlist__input"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(false);
          }}
          disabled={submitted}
          aria-label="Email address"
        />
        <button
          type="submit"
          className="nx-waitlist__submit"
          disabled={submitted}
        >
          Join waitlist
        </button>
      </form>
      {error && <span className="nx-waitlist__error">Enter a valid email</span>}
      {submitted && <p className="nx-waitlist__confirm">Thanks, we'll be in touch.</p>}
    </div>
  );
};

// ─── Landing ────────────────────────────────────────────────────

const Landing: React.FC = () => {
  const topbarRef = useRef<HTMLElement>(null);
  useReveal();
  useStickyTopbar(topbarRef);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <a href="#main" className="nx-skip" style={{ position: 'absolute', left: '-9999px' }}>
        Skip to content
      </a>

      {/* ─── Topbar ─── */}
      <header ref={topbarRef} className="nx-topbar">
        <div className="nx-shell nx-topbar__inner">
          <a href="#" className="nx-topbar__brand" aria-label="Nexbit home">
            <img src={logoFresh} alt="" aria-hidden />
            Nexbit
          </a>
          <nav className="nx-nav" aria-label="Primary">
            <a className="nx-nav__link" href="/blog">Blog</a>
            <a className="nx-nav__link" href="#capabilities">Capabilities</a>
            <a className="nx-nav__link" href="#how">How it works</a>
            <a className="nx-nav__link" href="#faq">FAQ</a>
          </nav>
          <a className="nx-btn-pill nx-btn-pill--solid" href="https://cal.com/shubh.r/nexbit-intro" target="_blank" rel="noopener noreferrer">
            Book a demo
          </a>
        </div>
      </header>

      <main id="main">
        {/* ─── Hero ─── */}
        <section className="nx-hero">
          <div className="nx-shell--narrow">
            <div className="nx-reveal nx-hero__layout">
              <div className="nx-hero__layout-left">
                <h1 className="nx-hero__headline">
                  The accounting layer your enterprise outgrew
                </h1>
                <div className="nx-hero__cta">
                  <Waitlist />
                </div>
              </div>
              <div className="nx-hero__layout-right">
                <p className="nx-hero__lede">
                  AI that closes your books in real-time. For B2B and B2C alike<span className="nx-cursor-blink">|</span>
                </p>
              </div>
            </div>
          </div>
          <div className="nx-shell--medium">
            <div className="nx-reveal">
              <div className="nx-hero__image-wrapper" style={{ marginTop: '64px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--ink-08)', boxShadow: '0 12px 48px var(--ink-04)' }}>
                <img src={heroLandingImg} alt="Nexbit Dashboard" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>
          </div>
        </section>

        {/* ─── Stats ─── */}
        {/* <section className="nx-section">
          <div className="nx-shell--narrow nx-reveal">
            <hr className="nx-divider" style={{ marginBottom: 48 }} />
            <div className="nx-stats-row">
              <div className="nx-stat">
                <div className="nx-stat__value">1 hr</div>
                <div className="nx-stat__label">
                  Month-end close. Down from ten days.
                </div>
              </div>
              <div className="nx-stat">
                <div className="nx-stat__value">0</div>
                <div className="nx-stat__label">
                  Unreconciled exceptions left behind.
                </div>
              </div>
              <div className="nx-stat">
                <div className="nx-stat__value">24/7</div>
                <div className="nx-stat__label">
                  Continuous anomaly monitoring across all rails.
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* ─── Manifesto ─── */}
        {/* <section>
          <hr className="nx-divider" style={{ width: 'min(100% - 2rem, 688px)', margin: '0 auto' }} />
          <div className="nx-manifesto nx-reveal">
            <p className="nx-manifesto__quote">
              "Accounting AI isn't automation. It's the system underneath your close."
            </p>
          </div>
          <hr className="nx-divider" style={{ width: 'min(100% - 2rem, 688px)', margin: '0 auto' }} />
        </section> */}

        {/* ─── Capabilities ─── */}
        <section id="capabilities" className="nx-section">
          <div className="nx-shell--narrow">
            <div className="nx-eyebrow nx-reveal">Capabilities</div>
            <h2 className="nx-headline nx-reveal" style={{ marginTop: 12 }}>
              What it does.
            </h2>
            <p className="nx-body nx-reveal" style={{ marginTop: 16 }}>
              Stitches together every metric that matters. Each maps to a real motion inside the finance workflow.
            </p>
          </div>
          <div className="nx-shell nx-reveal" style={{ marginTop: 48 }}>
            <div className="nx-capabilities">
              {CAPABILITIES.map((c) => (
                <div key={c.title} className="nx-cap-card">
                  <div className="nx-cap-card__title">{c.title}</div>
                  <div className="nx-cap-card__body">{c.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How it works ─── */}
        <section id="how" className="nx-section" style={{ paddingTop: 0 }}>
          <div className="nx-shell--narrow">
            <hr className="nx-divider nx-reveal" style={{ marginBottom: 48 }} />
            <div className="nx-eyebrow nx-reveal">How it works</div>
            <h2 className="nx-headline nx-reveal" style={{ marginTop: 12 }}>
              
            </h2>
            <div className="nx-steps nx-reveal">
              {STEPS.map((s) => (
                <div key={s.num} className="nx-step">
                  <div className="nx-step__num">{s.num}</div>
                  <div>
                    <div className="nx-step__title">{s.title}</div>
                    <p className="nx-step__body">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── NexBot Preview ─── */}
        <section className="nx-section" style={{ paddingTop: 0 }}>
          <div className="nx-shell--narrow">
            <hr className="nx-divider nx-reveal" style={{ marginBottom: 48 }} />
            <div className="nx-eyebrow nx-reveal">Nex</div>
            <h2 className="nx-headline nx-reveal" style={{ marginTop: 12 }}>
              Ask your books anything.
            </h2>
            <p className="nx-body nx-reveal" style={{ marginTop: 16 }}>
              NexBot understands your data. Ask a question, get a table, a summary, or an answer. Grounded in your actual numbers.
            </p>

            <div className="nx-bot-preview nx-reveal" style={{ marginTop: 40 }}>
              <div className="nx-bot-preview__header">
                <span className="nx-bot-preview__dot" />
                Nex
              </div>
              <div className="nx-bot-preview__body">
                <div className="nx-bot-msg">
                  <div className="nx-bot-msg__avatar nx-bot-msg__avatar--user">Y</div>
                  <div className="nx-bot-msg__text">
                    Show me all unreconciled settlements above ₹50,000 from last month.
                  </div>
                </div>
                <div className="nx-bot-msg">
                  <div className="nx-bot-msg__avatar nx-bot-msg__avatar--bot">N</div>
                  <div className="nx-bot-msg__text">
                    Found <code>4 settlements</code> with unreconciled amounts above ₹50,000 in August 2026.
                    <table className="nx-preview-table">
                      <thead>
                        <tr>
                          <th>Settlement ID</th>
                          <th>Channel</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>STL-88412</td>
                          <td>Walmart</td>
                          <td>₹1,24,800</td>
                          <td>Variance ₹3,200</td>
                        </tr>
                        <tr>
                          <td>STL-88507</td>
                          <td>Acme Corp</td>
                          <td>₹87,600</td>
                          <td>Missing payout</td>
                        </tr>
                        <tr>
                          <td>STL-88621</td>
                          <td>Buyer-J983</td>
                          <td>₹62,400</td>
                          <td>Fee mismatch</td>
                        </tr>
                        <tr>
                          <td>STL-88745</td>
                          <td>Razorpay</td>
                          <td>₹53,100</td>
                          <td>Pending review</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Security & Privacy ─── */}
        <section className="nx-section" style={{ paddingTop: 0 }}>
          <div className="nx-shell--narrow">
            <hr className="nx-divider nx-reveal" style={{ marginBottom: 48 }} />
            <h2 className="nx-headline nx-reveal" style={{ marginTop: 12, textAlign: 'center' }}>
              Security and privacy built for growing businesses.
            </h2>
          </div>
          <div className="nx-shell nx-reveal" style={{ marginTop: 48 }}>
            <div className="nx-security-grid">
              <div className="nx-security-card">
                <div className="nx-security-card__img">
                  <img src={securityFingerprint} alt="Enterprise-grade security" />
                </div>
                <div className="nx-security-card__title">Enterprise-grade security</div>
                <div className="nx-security-card__body">
                  Built on SOC-2 compliant infrastructure, encrypted at rest and in transit.
                </div>
              </div>
              <div className="nx-security-card">
                <div className="nx-security-card__img">
                  <img src={securityVault} alt="Your Data Stays Private" />
                </div>
                <div className="nx-security-card__title">Your Data Stays Private</div>
                <div className="nx-security-card__body">
                  Your data will never be used to train AI models. Ever.
                </div>
              </div>
              <div className="nx-security-card">
                <div className="nx-security-card__img">
                  <img src={securityPadlock} alt="Read-only access" />
                </div>
                <div className="nx-security-card__title">Read-only access</div>
                <div className="nx-security-card__body">
                  Nexbit only requests read permissions. It can't modify, delete or transfer your data.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section id="faq" className="nx-section" style={{ paddingTop: 0 }}>
          <div className="nx-shell--narrow">
            <hr className="nx-divider nx-reveal" style={{ marginBottom: 48 }} />
            <div className="nx-eyebrow nx-reveal">Frequently asked</div>
            <h2 className="nx-headline nx-reveal" style={{ marginTop: 12 }}>
              The honest answers.
            </h2>
            <div className="nx-faq nx-reveal" style={{ marginTop: 40 }}>
              {FAQS.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Final CTA ─── */}
        <section id="cta">
          <hr className="nx-divider" style={{ width: 'min(100% - 2rem, 688px)', margin: '0 auto' }} />
          <div className="nx-cta-band">
            <div className="nx-shell--narrow nx-reveal">
              <h2 className="nx-cta-band__headline">
                Close your books at lightning speed.
              </h2>
              <a className="nx-btn-pill nx-btn-pill--solid" href="https://cal.com/shubh.r/nexbit-intro" target="_blank" rel="noopener noreferrer" style={{ margin: '0 auto' }}>
                Book a demo
              </a>
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="nx-footer">
          <div className="nx-shell">
            <div className="nx-footer__inner">
              <div>
                <div className="nx-footer__brand">
                  <img src={logoFresh} alt="" aria-hidden />
                  Nexbit
                </div>
                <p className="nx-footer__desc">
                  AI accounting for high-volume enterprises. The operating layer for reconciliation,
                  close, and reporting.
                </p>
                <p className="nx-footer__contact">
                  Contact:{' '}
                  <a href="mailto:founders@usenexbit.com">founders@usenexbit.com</a>
                </p>
              </div>
              <nav className="nx-footer__nav" aria-label="Footer">
                <a href="/blog">Blog</a>
                <a href="#capabilities">Capabilities</a>
                <a href="#how">How it works</a>
                <a href="#faq">FAQ</a>
                <a href="mailto:founders@usenexbit.com">Contact</a>
              </nav>
            </div>
            <div className="nx-footer__bottom">
              <span className="nx-footer__legal">
                © Logikeon Labs Private Limited · All rights reserved
              </span>
              <span className="nx-footer__legal">
                Built for finance teams
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Landing;
