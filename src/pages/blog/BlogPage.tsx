import React, { useEffect, useState } from 'react';
import logoFresh from '../../assets/logo_fresh.jpg';
import qcomIncentiveHeader from '../../assets/blog/qcom_incentive_header.png';
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

/* ───── Shared components ───── */

const MarginNote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <aside className="nx-margin-note">
    <strong>Note</strong>
    {children}
  </aside>
);

/* ───── Blog content renderers ───── */

interface RailLink {
  label: string;
  href: string;
}

const BLOG_CONTENT: Record<string, { readTime: string; content: React.ReactNode; references?: RailLink[]; heroImage?: string }> = {

  'marketplaces-have-no-incentive-to-make-settlements-auditable': {
    readTime: '3 min read',
    heroImage: qcomIncentiveHeader,
    content: (
      <>
        <h2>
          How plaforms look at settlements
        </h2>
        <p>
          Look at it from first principles.
        </p>
        <p>
          Their job is to process millions of transactions across thousands of sellers while optimizing for growth, logistics, customer experience, and their own unit economics. Making every settlement perfectly transparent doesn't directly improve any of those metrics.
        </p>

        <h2>Incentives shape systems.</h2>
        <p>
          Every deduction that takes an extra hour to verify is one less deduction that gets challenged. Every report that changes structure every few months increases the cost of auditing. Every fee spread across multiple files instead of one canonical ledger adds friction to reconciliation. None of this requires bad intent. It only requires that transparency isn't a priority.
        </p>

        <h2>Finance teams pay the price.</h2>
        <p>
          A single payout isn't a single calculation. It's commissions, shipping, returns, claims, marketing spends, collection fees, GST adjustments, TDS, TCS, reversals, recovery entries, and timing differences spread across orders, settlements, and bank credits. The settlement report is simply one projection of a much larger accounting graph.
        </p>

        <h2>Quick commerce is the sharpest version of this problem.</h2>
        <p>
          The order velocity is extreme. Inventory moves continuously. Goods receipt notes, claims, shortages, damages, promotional recoveries, and logistics adjustments all feed into what eventually becomes a settlement. Miss a GRN, fail to dispute a shortage within the allowed window, or overlook a recovery entry, and that amount quietly becomes permanent. Recovering it later is difficult because the evidence has already fragmented across multiple operational systems.
        </p>
        <p>
          There usually isn't a clean dispute workflow because the platform wasn't designed around making disputes efficient. It was designed around processing commerce efficiently.
        </p>
        <p>
          I don't think this is a conspiracy.
        </p>
        <p>
          It's incentive alignment.
        </p>
        <p>
          Software naturally optimizes for the organization paying to build it. Marketplace finance systems exist to settle millions of sellers accurately enough for the marketplace. Seller auditability is a secondary objective because the seller isn't defining the product roadmap.
        </p>

        <h2>This is a pattern you see everywhere.</h2>
        <p>
          Whenever one party defines the protocol and another party bears the verification cost, complexity accumulates on the verification side. APIs evolve without backward compatibility. File schemas drift. Reports split into new exports. Naming conventions change. Individually these decisions are reasonable. Collectively they make reconciliation progressively harder.
        </p>
        <p>
          The interesting question isn't whether marketplaces should build better settlement systems.
        </p>
        <p>
          The interesting question is whether incentives can ever produce them.
        </p>
        <p>
          I think the answer is no.
        </p>
        <p>
          Markets become more efficient when incentives are aligned, not when participants hope for better behavior. A platform gains little from investing engineering effort into making deductions easier to challenge. Sellers, on the other hand, gain enormously from understanding every rupee that moved.
        </p>

        <h2>That creates an information asymmetry.</h2>
        <p>
          The seller doesn't need perfect information. The seller needs an independent financial record that reconstructs reality from raw events instead of trusting a settlement file as the source of truth.
        </p>
        <p>
          Once every order, GRN, invoice, settlement line, payout, bank credit, and accounting entry can be connected into one canonical ledger, the conversation changes. You're no longer arguing that something feels wrong. You're pointing to the exact order, the exact deduction, the exact rule that produced it, and the exact amount that doesn't reconcile.
        </p>

        <blockquote>
          "Visibility is what creates leverage. Without it, disputes become opinions. With it, disputes become accounting."
        </blockquote>
      </>
    ),
  },

  'swiggy-board-restructuring-what-it-means-for-brands': {
    readTime: '3 min read',
    content: (
      <>
        <p>
          A few weeks ago, Swiggy proposed removing foreign investors' rights to nominate directors to its board as part of its effort to qualify as an Indian-Owned and Controlled Company under FEMA.
        </p>
        <div className="nx-annotated">
          <p>
            Shareholders ultimately rejected the proposal.
          </p>
          <MarginNote>
            The resolution received 72.36% shareholder approval, below the 75% threshold required for a special resolution. Swiggy later clarified that qualifying as an IOCC remains an objective and that it continues to engage with shareholders on the matter.
          </MarginNote>
        </div>
        <p>
          The attempt still matters.
        </p>
        <p>
          Indian law cares about who controls the board for a reason. To own and sell inventory directly, a company needs IOCC status. Board control has to rest with Indian residents.
        </p>
        <p>
          The proposal didn't pass this time. But it revealed where management may want to go next.
        </p>
        <p>
          The model underneath Instamart could change.
        </p>
        <p>
          Today, when you buy something on Instamart, you're typically buying from the operator running the dark store serving your area. That operator buys inventory from distributors, holds the stock, and books the sale. Swiggy earns a commission.
        </p>
        <p>
          The incentives are distributed. So is the risk.
        </p>
        <p>
          An inventory model rewires that system.
        </p>
        <p>
          The platform buys directly from distributors, owns the stock, and books the entire sale. The operator becomes a logistics contractor or fades into the background.
        </p>
        <p>
          Blinkit already moved in this direction.
        </p>
        <p>
          After Eternal secured IOCC status, Blinkit's reported revenue expanded sharply. Part of that growth came from genuine business expansion. Store count increased. Order volumes grew. But another part came from a change in economics flowing through the financial statements.
        </p>
        <div className="nx-annotated">
          <p>
            The full basket value started appearing in Blinkit's books instead of just the commission slice.
          </p>
          <MarginNote>
            Eternal reported consolidated Q4 FY26 revenue of ₹17,292 crore. Management disclosures and analyst commentary noted that the comparison benefited from Blinkit's transition to an inventory-led model, while underlying operational growth remained strong.
          </MarginNote>
        </div>
        <p>
          The accounting change is easy to miss because the operational growth was real too.
        </p>
        <p>
          Instamart remains on the marketplace model today.
        </p>
        <p>
          The more interesting question is what happens if that changes.
        </p>
        <p>
          The biggest shift may not be visible to consumers. It could reshape the relationship between quick commerce platforms and brands.
        </p>
        <p>
          Today, a D2C brand selling on Instamart largely operates within a marketplace structure. Commercial discussions happen through intermediaries. Brands retain more influence over pricing, promotions, and assortment decisions.
        </p>
        <p>
          If Instamart eventually adopts an inventory-led structure, that relationship could become far more centralized.
        </p>
        <div className="nx-annotated">
          <p>
            The platform would decide what gets stocked, what gets discounted, and which products receive attention. Shelf space would increasingly reflect margin priorities.
          </p>
          <MarginNote>
            Swiggy has not announced such a transition for Instamart. This section reflects an inference based on how inventory-led models typically alter incentives and decision-making.
          </MarginNote>
        </div>
        <p>
          This isn't a new dynamic.
        </p>
        <p>
          Restaurants on Zomato have lived with versions of it for years. Quick commerce brands may be heading toward their own version of the same equation.
        </p>
        <p>
          The first categories to move would be FMCG staples and beverages. High-volume products with limited differentiation are where owning the margin makes the most financial sense. Brands with genuine pricing power may get more room.
        </p>
        <p>
          If you're doing meaningful volume through Instamart, the question isn't whether today's structure lasts forever.
        </p>
        <p>
          The question is whether your commercial assumptions were built for a marketplace relationship while the platform is preparing for something closer to procurement.
        </p>
        <blockquote>
          "Those are very different businesses. They just happen to use the same app."
        </blockquote>
      </>
    ),
  },

  'ai-is-not-that-useful-in-commercial-finance': {
    readTime: '4 min read',
    references: [
      { label: 'Ensuring AI accuracy in financial operations — Itemize', href: 'https://www.itemize.com/ensuring-ai-accuracy-in-financial-operations-the-critical-role-of-data-and-knowledge-quality/' },
      { label: '5 reasons month-end close is slow — Solving Finance', href: 'https://www.solving-finance.com/post/5-reasons-month-end-close-is-slow' },
      { label: 'Data quality for financial institutions — Qualytics', href: 'https://qualytics.ai/resources/in/data-quality-for-financial-institutions' },
      { label: 'Why AI fails in finance — CFO Edge', href: 'https://cfoedge.uk/insights/why-ai-fails-in-finance/' },
    ],
    content: (
      <>
        <p>
          You probably bought something with AI-powered written on its homepage. Maybe it just helps you with your problem. Maybe the dashboards look good. Maybe someone gave you a positive word.
        </p>
        <p>
          Here's what you didn't ask before signing off: <strong>What is the <ExternalLink href="https://www.itemize.com/ensuring-ai-accuracy-in-financial-operations-the-critical-role-of-data-and-knowledge-quality/">quality of the data</ExternalLink> it's running on?</strong>
        </p>
        <p>
          Because if your month-end closing still takes <ExternalLink href="https://www.solving-finance.com/post/5-reasons-month-end-close-is-slow">7-14 days</ExternalLink>, and for most finance functions it does, it's running on data that's still <ExternalLink href="https://www.linkedin.com/posts/completeness-share-7452651397818347520-S3fB/">incomplete</ExternalLink>.
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

        <h2>When do we actually get to know real numbers? And what's the underlying cost?</h2>
        <p>
          Numbers being accumulated quietly inside the reconciliation lag appear in audit queries, P&L not tying neatly. And it's not like the finance team wasn't looking all along, these were missed because the architecture gave them no way to see it in time.
        </p>

        <blockquote>
          "Confident answers on incomplete data aren't insights. They are noise wrapped in a good format."
        </blockquote>

        <p>
          What we should ask is <ExternalLink href="https://cfoedge.uk/insights/why-ai-fails-in-finance/">what's costing the business quietly</ExternalLink>. The AI question can probably wait.
        </p>
      </>
    ),
  },
};

/* ───── Component ───── */

export const BlogPage: React.FC<BlogPageProps> = ({ titleSlug }) => {
  useReveal();

  const post = POSTS.find(p => p.slug === titleSlug);
  const formattedTitle = post ? post.title : titleSlug;
  const blogEntry = BLOG_CONTENT[titleSlug];
  const readTime = blogEntry?.readTime ?? '4 min read';
  const publishDate = post?.date ?? '';
  const references = blogEntry?.references;
  const heroImage = blogEntry?.heroImage;

  const [toc, setToc] = useState<{ id: string; text: string }[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    document.title = `${formattedTitle} | Nexbit Blog`;
  }, [formattedTitle]);

  // Build the "On this page" table of contents from the rendered headings,
  // and highlight the section currently in view.
  useEffect(() => {
    const container = document.querySelector('.nx-blog-content');
    if (!container) return;

    const headings = Array.from(container.querySelectorAll('h2')) as HTMLElement[];
    setToc(
      headings.map((h) => {
        if (!h.id) {
          h.id = (h.textContent || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        }
        return { id: h.id, text: h.textContent || '' };
      })
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId((entry.target as HTMLElement).id);
        });
      },
      { rootMargin: '-100px 0px -66% 0px' }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [titleSlug]);

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
            <a className="nx-btn nx-btn--ghost" href="/blog">
              ← Back to blogs
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        {/* HERO SECTION */}
        <section className="nx-section nx-blog-hero nx-band nx-band--paper-deep">
          <div className="nx-shell">
            <div className={heroImage ? 'nx-blog-hero__grid' : ''}>
              <div className="nx-blog-header">
                <h1 className="nx-display nx-section__headline nx-reveal">
                  {formattedTitle}
                </h1>
                <div className="nx-blog-meta nx-reveal">
                  <span>Published on {publishDate}</span>
                  <span>·</span>
                  <span>{readTime}</span>
                </div>
              </div>
              {heroImage && (
                <div className="nx-blog-hero__art nx-reveal">
                  <img
                    src={heroImage}
                    alt="Why marketplaces have no incentive to make settlements auditable."
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CONTENT SECTION */}
        <section className="nx-section">
          <div className="nx-shell">
            <div className="nx-blog-layout">
              <div className="nx-blog-content nx-reveal">
                {blogEntry?.content ?? (
                  <p>Blog post not found.</p>
                )}
              </div>

              <aside className="nx-blog-rail">
                {toc.length >= 2 && (
                  <div className="nx-blog-rail__section nx-blog-rail__toc">
                    <div className="nx-blog-rail__title">On this page</div>
                    <ul className="nx-toc">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className={item.id === activeId ? 'is-active' : ''}
                          >
                            {item.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {references && references.length > 0 && (
                  <div className="nx-blog-rail__section">
                    <div className="nx-blog-rail__title">References</div>
                    <ul className="nx-rail-links">
                      {references.map((ref) => (
                        <li key={ref.href}>
                          <a href={ref.href} target="_blank" rel="noopener noreferrer">
                            {ref.label} ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="nx-blog-rail__section">
                  <div className="nx-rail-cta">
                    <div className="nx-rail-cta__title">Reconcile every rupee</div>
                    <p>
                      See how Nexbit builds an independent ledger for your
                      marketplace settlements.
                    </p>
                    <a
                      className="nx-btn nx-btn--solid"
                      href="/#cta"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      Request access <span className="nx-btn__arrow" aria-hidden>→</span>
                    </a>
                  </div>
                </div>
              </aside>
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
