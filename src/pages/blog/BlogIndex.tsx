import React, { useEffect } from 'react';
import logoFresh from '../../assets/logo_fresh.jpg';
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
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <a href="#main" className="nx-skip">
        Skip to content
      </a>

      <header className="nx-topbar is-stuck">
        <div className="nx-shell nx-topbar__inner">
          <a href="/" className="nx-topbar__brand" aria-label="Nexbit home">
            <img src={logoFresh} alt="" aria-hidden />
            Nexbit
          </a>
          <nav className="nx-nav" aria-label="Primary">
            <a className="nx-nav__link" href="/blog">Blog</a>
            <a className="nx-nav__link" href="/#capabilities">Capabilities</a>
            <a className="nx-nav__link" href="/#how">How it works</a>
            <a className="nx-nav__link" href="/#faq">FAQ</a>
          </nav>
          <a className="nx-btn-pill nx-btn-pill--ghost" href="/">
            ← Back to home
          </a>
        </div>
      </header>

      <main id="main">
        {/* HERO SECTION */}
        <section className="nx-section nx-blog-hero nx-band--paper-deep">
          <div className="nx-shell">
            <div className="nx-blog-header">
              <h1 className="nx-headline nx-reveal">
                The Nexbit <span className="nx-italic">Blog</span>
              </h1>
              <p className="nx-body nx-reveal" style={{ marginTop: 12 }}>
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
                  <span className="nx-blog-card__date">{post.date}</span>
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
        <section className="nx-band--mint nx-section nx-section--tight">
          <div className="nx-shell" style={{ textAlign: 'center' }}>
            <h2 className="nx-headline">Ready to upgrade your finance stack?</h2>
            <div style={{ marginTop: 24 }}>
              <a href="/#cta" className="nx-btn-pill nx-btn-pill--solid">
                Request access →
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="nx-footer">
          <div className="nx-shell">
            <div className="nx-footer__inner">
              <div>
                <div className="nx-footer__brand">
                  <img src={logoFresh} alt="" aria-hidden />
                  Nexbit
                </div>
                <p className="nx-footer__desc">
                  Accounting AI for D2C. The operating layer for revenue,
                  settlements, books, and the close.
                </p>
                <p className="nx-footer__contact">
                  Contact us:{' '}
                  <a href="mailto:founders@usenexbit.com">
                    founders@usenexbit.com
                  </a>
                </p>
              </div>
              <nav className="nx-footer__nav" aria-label="Footer">
                <a href="/blog">Blog</a>
                <a href="/#capabilities">Capabilities</a>
                <a href="/#how">How it works</a>
                <a href="/#faq">FAQ</a>
                <a href="mailto:founders@usenexbit.com">Contact Us</a>
              </nav>
            </div>

            <div className="nx-footer__bottom">
              <span className="nx-footer__legal">
                © Logikeon Labs Private Limited · All rights reserved
              </span>
              <span className="nx-footer__legal">Built for and by finance teams</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
