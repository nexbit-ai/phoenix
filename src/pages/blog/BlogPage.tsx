import React, { useEffect } from 'react';
import logoFresh from '../../assets/logo_fresh.jpg';
import { Wordmark } from '../../components/Wordmark';
import { useReveal } from '../../utils/useReveal';
import { POSTS } from './BlogIndex';
import '../landing/landing.css';
import './blog.css';

interface BlogPageProps {
  titleSlug: string;
}

export const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{ textDecoration: 'underline', textUnderlineOffset: '4px', color: 'var(--ink-mute)', fontWeight: 500 }}
  >
    {children}
  </a>
);

export const BlogPage: React.FC<BlogPageProps> = ({ titleSlug }) => {
  useReveal();

  const post = POSTS.find(p => p.slug === titleSlug);
  const formattedTitle = post ? post.title : titleSlug;

  useEffect(() => {
    document.title = `${formattedTitle} | Nexbit Blog`;
  }, [formattedTitle]);

  return (
    <div className="nx-landing nx-blog">
      <a href="#main" className="nx-skip">
        Skip to content
      </a>

      <header className="nx-topbar is-stuck">
        <div className="nx-shell nx-topbar__inner">
          <a href="/" aria-label="Nexbit home">
            <Wordmark />
          </a>
          <div className="nx-topbar__cta">
            <a className="nx-btn nx-btn--ghost" href="/blogs">
              ← Back to blogs
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* HERO SECTION */}
        <section className="nx-section nx-blog-hero nx-band nx-band--paper-deep">
          <div className="nx-shell nx-prose">
            {/* <div className="nx-meta nx-section__eyebrow nx-reveal">Blog</div> */}
            <h1 className="nx-display nx-section__headline nx-reveal">
              {formattedTitle}
            </h1>
            <div className="nx-blog-meta nx-reveal">
              <span>Published on May 16, 2026</span>
              <span>·</span>
              <span>4 min read</span>
            </div>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="nx-section">
          <div className="nx-shell nx-prose nx-blog-content nx-reveal">
            <p>
              You probably bought something with AI-powered written on its homepage. Maybe it just helps you with your problem. Maybe the dashboards look good. Maybe someone gave you a positive word.
            </p>
            <p>
              Here's what you didn’t ask before signing off: <strong>What is the <ExternalLink href="https://www.itemize.com/ensuring-ai-accuracy-in-financial-operations-the-critical-role-of-data-and-knowledge-quality/">quality of the data</ExternalLink> it's running on?</strong>
            </p>
            <p>
              Because if your month-end closing still takes <ExternalLink href="https://www.solving-finance.com/post/5-reasons-month-end-close-is-slow">7-14 days</ExternalLink>, and for most finance functions it does, it's running on data that’s still <ExternalLink href="https://www.linkedin.com/posts/completeness-share-7452651397818347520-S3fB/">incomplete</ExternalLink>.
            </p>
            <p>
              Unmatched returns. Open deductions. Invalidated settlements. Disputes in someone's to-do list. Real world problems beyond our control.
            </p>
            <p>
              Take something as simple as a ₹40 weight deduction per shipment. Across 9,000 shipments that's ₹3.6L. If it <ExternalLink href="https://qualytics.ai/resources/in/data-quality-for-financial-institutions">surfaces 3 weeks late</ExternalLink>, the dispute window is closed. It has to become a write-off. Your shiny new platform didn't catch it. It was confidently analyzing inconsistent data.
            </p>
            <p>
              Of course, no one would mention this in the demo.
            </p>

            <h2>The number you're reporting isn't wrong. It's just stale.</h2>
            <p>
              Amazon, Flipkart, QCom and hundred others each settle on different cycles, in different formats, with deductions hidden differently. Logistics partners file weight disputes 7–14 days after delivery. Payment gateways hit your account T+2 but the reconciled report takes another day. Returns from the last week of the month are still unmatched when you're trying to close.
            </p>
            <p>
              You're not closing the books this month. You're reconstructing last month in real-time while this month is already happening.
            </p>
            <p>
              Board meetings, investment calls, capital decisions made during that window are running on numbers that are still being assembled. Most CFOs know this, vaguely.
            </p>
            <p>
              But what options do we have: Best case scenario - talk about accurate data only till 3 months back. Or talk about estimated values. Either way, you won't know what exactly is costing you right now.
            </p>

            <h2>When do we actually get to know real numbers? And what’s the underlying cost?</h2>
            <p>
              Numbers being accumulated quietly inside the reconciliation lag appear in audit queries, P&L not tying neatly. And it’s not like the finance team wasn’t looking all along, these were missed because the architecture gave them no way to see it in time.
            </p>

            <blockquote>
              "Confident answers on incomplete data aren't insights. They are noise wrapped in a good format."
            </blockquote>

            <p>
              What we should ask is <ExternalLink href="https://cfoedge.uk/insights/why-ai-fails-in-finance/">what's costing the business quietly</ExternalLink>. The AI question can probably wait.
            </p>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="nx-band nx-band--mint nx-section nx-section--tight">
          <div className="nx-shell" style={{ textAlign: 'center' }}>
            <h2 className="nx-display">Ready to upgrade your finance stack?</h2>
            <div style={{ marginTop: 'var(--s5)' }}>
              <a href="/#cta" className="nx-btn nx-btn--solid nx-btn--lg">
                Request access <span className="nx-btn__arrow" aria-hidden>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="nx-footer">
          <div className="nx-shell">
            <div className="nx-footer__row">
              <div>
                <div className="nx-footer__brand">
                  <img
                    src={logoFresh}
                    alt=""
                    className="nx-wordmark__logo"
                    aria-hidden
                  />
                  Nexbit
                </div>
                <p className="nx-footer__line">
                  Accounting AI for D2C. The operating layer for revenue,
                  settlements, books, and the close.
                </p>
                <p className="nx-footer__line" style={{ marginTop: '12px' }}>
                  Contact us:{' '}
                  <a
                    href="mailto:founders@usenexbit.com"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                  >
                    founders@usenexbit.com
                  </a>
                </p>
              </div>
              <nav className="nx-footer__nav" aria-label="Footer">
                <a href="/#capabilities">Capabilities</a>
                <a href="/#how">How it works</a>
                <a href="/#faq">FAQ</a>
                <a href="mailto:founders@usenexbit.com">Contact Us</a>
              </nav>
              <div className="nx-footer__addr nx-mono">
                {`ACCOUNTING AI\nFOR D2C\n2026`}
              </div>
            </div>

            <div className="nx-footer__bottom">
              <span className="nx-meta">
                © Logikeon Labs Private Limited · All rights reserved
              </span>
              <span className="nx-meta">Built for and by finance teams</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
