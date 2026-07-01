import React, { useEffect } from 'react';
import logoFresh from '../../assets/logo_fresh.jpg';
import { Wordmark } from '../../components/Wordmark';
import { useReveal } from '../../utils/useReveal';
import '../landing/landing.css';
import './blog.css';

interface BlogPostSummary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export const POSTS: BlogPostSummary[] = [
  {
    slug: 'marketplaces-have-no-incentive-to-make-settlements-auditable',
    title: 'Marketplaces Have No Incentive to Make Settlements Auditable',
    date: 'July 1, 2026',
    excerpt: 'Making every settlement transparent doesn\'t improve growth, logistics, or unit economics — so it doesn\'t happen. Whenever one party defines the protocol and another bears the verification cost, complexity accumulates on the verification side. Why an independent ledger is the only real leverage.',
  },
  {
    slug: 'swiggy-board-restructuring-what-it-means-for-brands',
    title: 'The Quiet Restructuring Happening in Quick Commerce',
    date: 'June 12, 2026',
    excerpt: 'Swiggy proposed removing foreign investors\' board nomination rights to qualify for IOCC status. Shareholders rejected it. The attempt still reveals where Instamart may be heading — and what it means for brands selling through it.',
  },
  {
    slug: 'ai-is-not-that-useful-in-commercial-finance',
    title: 'AI is Not That Useful in Commercial Finance',
    date: 'May 16, 2026',
    excerpt: 'Confident answers on incomplete data aren\'t insights. They are noise wrapped in a good format. Why your data architecture matters more than the AI built on top of it.',
  }
];

export const BlogIndex: React.FC = () => {
  useReveal();

  useEffect(() => {
    document.title = 'Blog | Nexbit';
  }, []);

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
          <nav className="nx-nav" aria-label="Primary">
            <a className="nx-nav__link" href="/pricing">Pricing</a>
            <a className="nx-nav__link" href="/blog">Blogs</a>
            <a className="nx-nav__link" href="/#capabilities">Capabilities</a>
            <a className="nx-nav__link" href="/#how">How it works</a>
            <a className="nx-nav__link" href="/#faq">FAQ</a>
          </nav>
          <div className="nx-topbar__cta">
            <a className="nx-btn nx-btn--ghost" href="/">
              ← Back to home
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* HERO SECTION */}
        <section className="nx-section nx-blog-hero nx-band nx-band--paper-deep">
          <div className="nx-shell">
            <div className="nx-blog-header">
              <h1 className="nx-display nx-section__headline nx-reveal">
                The Nexbit <span className="nx-italic">Blog</span>
              </h1>
              <p className="nx-lede nx-section__lede nx-reveal">
                Thoughts, playbooks, and insights on running finance at the speed of modern commerce.
              </p>
            </div>
          </div>
        </section>

        {/* POSTS LIST */}
        <section className="nx-section">
          <div className="nx-shell nx-reveal">
            <div className="nx-blog-list">
              {POSTS.map((post) => (
                <article key={post.slug} className="nx-blog-card">
                  <span className="nx-meta nx-blog-card__date">{post.date}</span>
                  <a href={`/blog/${post.slug}`} className="nx-blog-card__title-link">
                    <h2 className="nx-blog-card__title">{post.title}</h2>
                  </a>
                  <p className="nx-blog-card__excerpt">{post.excerpt}</p>
                  <a href={`/blog/${post.slug}`} className="nx-blog-card__more">
                    Read article →
                  </a>
                </article>
              ))}
            </div>
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
