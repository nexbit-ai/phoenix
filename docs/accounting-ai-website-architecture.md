# Accounting AI — Website Architecture

A single-page marketing site for our product, positioned as **Accounting AI for modern D2C brands** — the operating layer where finance teams run revenue, settlements, payments, reporting, close, and the workflows that hold them together.

This document is the source of truth for the design and copy. The implementation must follow it.

---

## 1. Positioning

**Brand line:** *Accounting AI for D2C.*

**Promise:** One intelligent layer for finance — unifying commerce data, settlement flows, books, reporting, and the close. Built for the way modern D2C brands actually operate.

**Audience:** D2C founders, controllers, finance leads, accounting operators at brands scaling across marketplaces, payment rails, logistics partners, and accounting systems.

**What we are:**
- The operating system for D2C finance
- An intelligence layer that brings revenue, settlements, payouts, books, and reporting onto a single surface
- Calm software for finance teams that have outgrown spreadsheets but don't want a 12-month ERP project

**What we are not (positioning to avoid):**
- "Reconciliation software"
- A CSV-matching agent
- A generic fintech dashboard
- A noisy, autonomous-everything AI brand

**Repo capabilities the marketing site reflects (grounded, not fabricated):**
- Unified ingestion from marketplaces, payment gateways (PayU, Paytm, COD), logistics partners (Delhivery, Blue Dart, DTDC, Shadowfax), uploaded documents, and accounting/ERP systems
- Reconciliation across orders, settlements, and payouts
- Settlement & payout visibility, payment ageing, unreconciled tracking
- Variance and exception detection with AI-assisted explanations
- Reports (income, expenses, custom prompts, scheduled distribution)
- Bookkeeping & accounting sync workflows
- Month-end Checklist / close orchestration
- AI Workflows + Assistant for finance ops
- Activity feed, collaboration, audit trail
- Stytch B2B auth (mentioned only at the security/trust layer, not in hero)

The positioning lifts the language one altitude — from "reconciliation tool" to "Accounting AI" — without inventing capabilities.

---

## 2. Visual Direction

A modern 2026 finance brand. Editorial, calm, and confident. Reads more like a New York studio's annual report than a SaaS template. Restraint is the signature.

**Mood words:** quiet, precise, deliberate, premium, finance-native.

**Reference posture (qualitative, not literal):** the typographic confidence of an editorial publication, the spatial calm of an architecture portfolio, the restraint of a private bank's brand book, the materiality of soft-finish stationery.

**Anti-mood:** dark mode neon, purple-to-cyan gradient meshes, glassmorphism stacks, glowing 3D blobs, dashboard screenshots dropped into a hero, "agentic autonomous workflows" stock copy, generic SaaS card grids.

**Signature design moves the site uses:**
- Off-white paper-warm backgrounds, not pure white
- One serif display face used sparingly for headlines, with a single italic accent
- Section headers in small caps, monospaced labels for metadata
- Ultra-thin hairline rules instead of bordered cards
- Pastel color blocks used as quiet section breaks, not decoration
- Real numerical artifacts (variance amounts, settlement percentages, ageing buckets) used as typographic ornaments — the product's own vocabulary becomes the visual language
- A single restrained accent color (clay) used only on micro-interactions and key emphasis

---

## 3. Color System

The palette is warm, paper-like, and finance-native. One accent only.

### Tokens

| Role                  | Token             | Hex       | Use                                                            |
|-----------------------|-------------------|-----------|----------------------------------------------------------------|
| Paper (primary bg)    | `--paper`         | `#F6F2EA` | Page background. Warm, slightly off-white.                     |
| Paper soft            | `--paper-soft`    | `#FBF8F2` | Cards, lifted surfaces, hero canvas.                           |
| Paper deep            | `--paper-deep`    | `#EDE7DA` | Section breaks, footers.                                       |
| Ink                   | `--ink`           | `#14201E` | Body text, headlines. A near-black with a green-teal undertone.|
| Ink soft              | `--ink-soft`      | `#3E4A47` | Secondary text.                                                |
| Ink mute              | `--ink-mute`      | `#6E7773` | Tertiary text, captions, metadata.                             |
| Hairline              | `--hairline`      | `#D9D2C2` | Dividers, 1px rules.                                           |
| Sage                  | `--sage`          | `#D6DECC` | Pastel block, "data" surfaces.                                 |
| Mist                  | `--mist`          | `#D2DCE0` | Pastel block, "settlement" surfaces.                           |
| Mint                  | `--mint`          | `#DDE7DD` | Pastel block, "books / close" surfaces.                        |
| Sand                  | `--sand`          | `#E8DFCC` | Pastel block, "reports" surfaces.                              |
| Stone                 | `--stone`         | `#DBD7CC` | Neutral chip backgrounds.                                      |
| Teal (deep)           | `--teal`          | `#1F3A36` | Reserved for a few high-contrast accents (CTA, brand mark).    |
| Ink deep (hero only)  | `--ink-deep`      | `#0C1B18` | The hero band only. Never used elsewhere on the page.          |
| Clay (accent)         | `--clay`          | `#B5694F` | The one allowed accent. Used sparingly: links, key numbers, underlines, micro-interactions, hero coin glyphs. Never as a fill on big surfaces. |

### Rules

- 90% of any given screen is paper + ink + hairlines.
- Pastel blocks appear as full-bleed section dividers — never as decorative gradient washes inside content.
- Clay is the only saturated color. Never used larger than a button, an underline, or a single number.
- No gradients on type. No drop shadows on type. Drop shadows used only on one or two lifted surfaces, and only at very low opacity (`0 1px 0 rgba(20,32,30,0.04)`).
- Never put pastel-on-pastel. A pastel section sits on paper; surfaces inside it are paper-soft.

---

## 4. Typography

Two faces. No third unless absolutely necessary.

### Faces

- **Display: Fraunces** (variable, Google Fonts). Used for hero headline, section headlines, and the occasional editorial pull-quote. Set with low optical-size axis for large display, slightly higher contrast. Italic of Fraunces is used as a *single* accent voice — for one phrase per page.
- **Text: Inter Tight** (or Inter as fallback). All body copy, UI labels, navigation, captions.

We do **not** use Instrument Serif (overused), DM Serif (too contrasty), Playfair (too wedding-card), or default system fonts (too generic).

### Scale (desktop)

| Token       | Size   | Line   | Weight       | Use                              |
|-------------|--------|--------|--------------|----------------------------------|
| `display-xl`| 92px   | 0.95   | Fraunces 350 | Hero headline                    |
| `display-l` | 64px   | 1.02   | Fraunces 400 | Section headlines                |
| `display-m` | 44px   | 1.08   | Fraunces 400 | Subsection headlines             |
| `lede`      | 22px   | 1.45   | Inter 400    | Hero subtitle, section ledes     |
| `body`      | 17px   | 1.55   | Inter 400    | Long-form body                   |
| `body-s`    | 15px   | 1.55   | Inter 400    | Card copy, FAQ body              |
| `meta`      | 12px   | 1.3    | Inter 500, tracked +0.12em, uppercase | Eyebrows, metadata, section labels |
| `mono`      | 12px   | 1.4    | Inter 500, tabular-nums | Numerical artifacts, IDs |

### Rules

- The hero headline runs in three lines max. One of those words may be set in Fraunces italic for a single editorial accent.
- Body copy never exceeds 62 characters per line.
- Section labels are always in `meta` style, in `--ink-mute`.
- Numbers in product-vocabulary callouts use Inter with `font-variant-numeric: tabular-nums`.
- Letter-spacing on display sizes is `-0.01em` to `-0.02em`. Never tighter than that.

### Mobile scale

Display sizes step down: `display-xl → 56px`, `display-l → 40px`, `display-m → 30px`. Body & meta untouched.

---

## 5. Spacing & Layout

The page is built on a 12-column grid with generous gutters. Whitespace does most of the design work.

### Tokens

`--space-1: 4px` · `--space-2: 8px` · `--space-3: 12px` · `--space-4: 16px` · `--space-5: 24px` · `--space-6: 32px` · `--space-7: 48px` · `--space-8: 72px` · `--space-9: 112px` · `--space-10: 160px`

### Containers

- `--shell-max: 1240px` — outer page shell
- `--prose-max: 720px` — long-form copy lives here
- `--gutter-desktop: 32px`, `--gutter-mobile: 20px`

### Section rhythm

- Section vertical padding: `var(--space-10)` top and bottom on desktop, `var(--space-8)` on mobile.
- Headlines and ledes are separated by `var(--space-4)`.
- Headline → grid below: `var(--space-8)`.
- Adjacent sections of the same color do not stack. Always alternate paper / paper-soft / pastel.

### Grid

- Capability section: 2 × 3 typographic blocks separated by hairlines (no card chrome).
- How-it-works: vertical rhythm, numbers set in Fraunces large, copy in Inter to the right.
- Outcomes: typographic stat row (4 numbers, hairline-separated).
- FAQ: single column, hairline-separated, expandable rows.

### Whitespace philosophy

A section with one headline and one paragraph is fine if that's enough. Empty space is content. Resist the urge to fill the right column.

---

## 6. Section-by-Section Page Narrative

The page is one continuous editorial document. Sections in order:

### 6.1 Sticky top bar (light)
Small, almost invisible. Wordmark left. Three nav anchors center (Capabilities, How it works, FAQ). One ghost button right (Sign in) and one solid teal CTA (Request access).

### 6.2 Hero (dark)

The hero is the only dark surface on the entire page — a single full-bleed band of `--ink-deep` (a deep teal-near-black) that opens the document on a dramatic, editorial note. The rest of the page returns to warm paper and never repeats the dark.

Inside the band sits a **dashed frame**, inset from the dark edges, that contains the entire composition:

- **Top of the frame — left/right split**
  - Left: eyebrow `ACCOUNTING AI · BUILT FOR D2C`, the Fraunces headline (3 lines, *commerce* set in Fraunces italic), and the Inter lede.
  - Right: a single outlined-clay CTA — `Request access →`.
- **Dashed horizontal divider.**
- **Illustration** — an isometric, line-drawn composition of five podiums (cylinders and cubes) arranged into a quiet arch, with **coins** sitting on four of them. Each coin's `$` glyph is set in Fraunces italic, in `--clay`. The line work is stroked in paper-soft at ~55% opacity. The illustration is inline SVG — no raster, no external file, scales crisply at every width.
- **Second dashed divider**, then a small **credibility row** — `INGESTING FROM Marketplaces · Payment gateways · Logistics partners · Accounting systems · Documents` — set in muted paper-soft.

The dashed frame is a structural device borrowed from the reference. The deep ink-deep canvas, Fraunces editorial type, clay accent on coins and CTA, and the warm-paper continuation that follows are ours.

**Top bar over the hero** sits in a *transparent* state — paper-soft text, hairline-on-dark border for the ghost CTA, paper-soft solid fill for the primary CTA. On scroll past the hero, the top bar resolves into its standard light/paper state.

### 6.3 The problem
- Eyebrow: `THE PROBLEM`
- Headline (Fraunces, display-l): *Finance, fragmented.*
- Lede: D2C finance lives across a dozen places. Marketplace settlements arrive late. Payouts don't tie out. Books drift. Month-end becomes archaeology.
- Body grid: 4 short, sharp paragraphs as hairline-separated blocks:
  1. **Settlement opacity.** Payments land days late, in formats no two providers agree on.
  2. **Disconnected systems.** Marketplaces, gateways, logistics, ERP, and books each tell their own version of the same number.
  3. **Manual reconciliation.** Spreadsheets become the source of truth. They shouldn't be.
  4. **Slow close.** Month-end takes weeks. By the time the numbers land, the month is already gone.

### 6.4 The solution / vision
- Eyebrow: `THE OPERATING LAYER`
- Headline: *One intelligent layer for finance.*
- Lede: We unify the financial events behind your business — every order, settlement, payout, fee, return, and entry — and turn them into a single source of truth your team can actually operate on.
- A short editorial paragraph (prose-max), Inter body. Two sentences max.
- Beneath it, an inline pastel band — full-bleed sage — containing one large Fraunces italic line: *"Accounting AI is not automation. It's the system underneath the operation."* (a quiet manifesto moment)

### 6.5 Core capabilities
- Eyebrow: `CAPABILITIES`
- Headline: *What it does.*
- 6 capability blocks in a 2-column grid (1-column on mobile), separated only by hairlines. Each block: small pastel swatch (8×8 dot), capability title (Inter 600, 18px), one-line description (Inter 400, 15px, ink-soft).

The six (wording is final):
1. **Unified financial data.** Marketplaces, payment gateways, logistics partners, documents, and accounting systems — ingested into a single ledger of truth.
2. **Settlement & payout intelligence.** Real-time visibility into what settled, what's pending, what's ageing, and where it broke.
3. **Exception detection.** Variance, mismatch, and missing-payout signals surfaced with the context to act on them.
4. **Reporting & close readiness.** Income, expense, custom prompts, and scheduled reports — generated from the same canonical numbers your books trust.
5. **Bookkeeping workflows.** Accounting sync, journal-ready entries, and the operational rails between commerce activity and your books.
6. **AI-guided operations.** Reconciliation, analysis, and assistant workflows that explain variances, draft entries, and move work forward without removing the human.

### 6.6 How it works
- Eyebrow: `HOW IT WORKS`
- Headline: *Four quiet moves.*
- Vertical layout. Each step: large Fraunces numeral (01–04) in clay, title (Inter 600, 22px), short paragraph.

01 **Connect.** Plug in marketplaces, gateways, logistics, accounting. Or upload documents directly.
02 **Unify.** Every order, payout, fee, and entry is normalized into a single financial timeline.
03 **Detect.** Mismatches, ageing payments, and exceptions are flagged with the context behind them.
04 **Close.** Reports, entries, and the month-end close happen with fewer hands and far more confidence.

### 6.7 Why D2C brands need this now
- Eyebrow: `THE D2C CONTEXT`
- Headline: *D2C finance has outgrown the toolbox built for it.*
- Two-column editorial layout: one column body copy (Inter, prose-max), one column three small pull-quote stats:
  - *11+* average number of payment, marketplace, and logistics surfaces a scaling D2C brand operates across.
  - *6–14 days* typical lag between sale and reconciled settlement.
  - *3 weeks* a typical month-end close, in a quarter where 4 weeks already passed.

These numbers are framed as industry observations, not customer claims.

### 6.8 Outcomes
- Eyebrow: `OUTCOMES`
- Headline: *What changes.*
- Single horizontal row of 4 typographic stat blocks, hairline-separated:
  - **Faster close.** From weeks to days.
  - **Cleaner books.** Numbers your books, your board, and your auditor agree on.
  - **Fewer blind spots.** Settlement, ageing, and variance, visible in real time.
  - **Less manual work.** Spreadsheets stay where they belong — out of the close.
- Below: a single Fraunces line: *Finance teams stop reacting. They start operating.*

### 6.9 Trust / social-proof section (placeholder, tasteful)
- Eyebrow: `TRUSTED BY OPERATORS`
- A quiet horizontal row of 5 wordmarks rendered as flat ink text (no logos required) — placeholder D2C-feeling brand names set in Inter 500, ink-mute, generously spaced. Above the row, in `meta` style: `EARLY DESIGN PARTNERS`. The placeholder names should feel *plausibly D2C* (e.g., *Sundry · Folk Goods · Maison Atlas · Pareto · Ten North*).
- Below the row, one short pull-quote in Fraunces italic, attributed to a finance-lead role (no fake person name): *"It's the first time finance and ops have been looking at the same numbers."* — *Head of Finance, scaling D2C brand.*

### 6.10 FAQ
- Eyebrow: `FREQUENTLY ASKED`
- Headline: *The honest answers.*
- 6 hairline-separated rows. Click to expand. Plus icon rotates to ×. Body content is Inter 15px, ink-soft.

Questions:
1. Who is this for?
2. Does it work for D2C brands selling across multiple channels?
3. How is AI actually used?
4. Do finance teams stay in control?
5. How does connectivity and onboarding work?
6. Is our data secure?

Answers: 2–4 sentences each. Calm, specific, no buzzwords. The security answer mentions B2B SSO and isolated workspaces without naming Stytch in the marketing surface.

### 6.11 Final CTA
- Pastel band — mist blue, full-bleed.
- Single editorial line, Fraunces, display-l: *Run finance like the rest of your company.*
- Subline (Inter): For D2C brands ready to make accounting a system, not a scramble.
- One CTA: solid teal — `Request access`.
- Tiny mono line beneath: `EARLY ACCESS · 2026`.

### 6.12 Footer
- Three-column quiet footer. Left: wordmark + one-line positioning + a small clay dot. Center: nav (Capabilities, How it works, FAQ, Sign in). Right: address-style block — `Accounting AI · For D2C · 2026`.
- Hairline above. Tiny copyright in `meta` style.

---

## 7. Motion Principles

Motion is restraint, not entertainment. The page should feel calm even on first load.

- **Reveal on scroll**: copy and section blocks fade in with a 12px upward translation, 600ms ease-out, staggered by 60ms within a group. Triggered once, near the bottom 25% of viewport.
- **Cursor-aware micro-interactions**: links and buttons have a 150ms color transition and a 1px underline-grow on hover. Nothing scales. Nothing bounces.
- **Pastel section bands**: enter the viewport with a 1.5s gentle background-color crossfade from paper — never a slide.
- **Hero**: the three small data artifacts breathe (sub-pixel y-translate, 6s ease-in-out loop) at very low amplitude. If reduced-motion is preferred, they sit still.
- **FAQ rows**: expand with a 280ms ease-in-out, plus icon rotates 45° to ×.
- **Page load**: no splash, no preloader. The first paint is calm — paper, headline, lede, in that order via 90ms staggered fade.
- **Reduced motion**: every animation is disabled under `prefers-reduced-motion`. The page is fully usable static.

Banned: parallax dashboards, scroll-jacking, infinite-loop hero gradients, blob morphs, shimmering type, autoplaying video.

---

## 8. Component Style Rules

The marketing surface uses its own component vocabulary. It does **not** inherit the dashboard's MUI theme.

### Buttons
- **Primary (`btn--solid`)**: background `--teal`, text paper-soft, 14px Inter 500, 12px / 22px padding, 999px radius, 1px hairline border in same teal. Hover: shifts to ink. Focus: 2px clay outline, 2px offset.
- **Ghost (`btn--ghost`)**: transparent, ink text, hairline border, same padding/radius. Hover: paper-soft fill.
- **Inline link**: ink text with a 1px clay underline that extends on hover.

No gradients. No shadows. No icons inside buttons unless absolutely needed (an arrow on the primary CTA only, optional).

### Cards / blocks
The page does not use cards in the SaaS sense. Capability blocks, FAQ rows, outcome stats, and how-it-works steps are typographic blocks separated by 1px hairlines in `--hairline`. Padding on each block is `var(--space-6)` vertical.

### Eyebrows / labels
`meta` style: 12px Inter 500, uppercase, +0.14em tracking, ink-mute color. Always sits 12–24px above its headline.

### Hairlines
Single 1px line in `--hairline`. Never doubled. Never colored. The entire chrome of the page is hairlines, paper, ink, and one accent.

### Pastel bands
Full-bleed sections (`width: 100vw` via negative margin technique) using `--sage`, `--mist`, `--mint`, or `--sand`. Internal content respects the shell max-width.

### Hero illustration (SVG)
A single inline SVG sits below the dashed divider in the hero frame. It is an isometric line-drawn composition of five podiums — three cylinders and two cubes — arranged into a quiet symmetric arch. Four of them carry a tilted coin on top, the central peak the most prominent.

Construction rules:
- ViewBox `0 0 1200 400`, baseline at `y = 380`.
- All strokes share a single color: paper-soft at `0.55` opacity. Stroke width `1.2`. Line caps and joins rounded.
- Cylinders: top ellipse + two side lines + a half-arc for the visible front of the bottom rim.
- Cubes: front rectangle + a parallelogram for the visible top face + a parallelogram for the visible right face. Depth offset is `dx=22, dy=-13` (cabinet projection).
- Coins are tilted ellipses (rx ≈ 42, ry ≈ 14) with a concentric inner ellipse for the rim, and the `$` glyph in **Fraunces italic, fill `--clay`**, centered.
- The illustration scales fluidly with the frame — no fixed pixel sizes on the SVG itself.

Not a dashboard screenshot, not a 3D render, not a stock illustration. A single piece of editorial linework, drawn in code, that gives the hero its image moment.

---

## 9. Content Tone Rules

- Calm, not loud.
- Specific, not generic. Mention payouts, ageing, settlements, marketplace fees — the actual texture of D2C finance.
- Confident, not boastful. We make claims that a thoughtful finance leader would nod at.
- Short sentences. Periods are good. White space inside copy is good.
- Use "Finance," "Books," "Operations," "Close" with capital weight where appropriate — they are nouns, not slogans.
- Use the word "Accounting AI" sparingly and on purpose. It is the positioning, not the punchline of every paragraph.

### Words and phrases we use
*Settle, payout, ageing, exception, variance, ledger, book, close, operate, control, clarity, ground truth.*

### Words and phrases we ban
*Revolutionary, paradigm, autonomous, agentic, leverage, unlock, supercharge, harness, harness AI, end-to-end automation, cutting-edge, next-gen, disrupt, game-changer, copilot.* The word "agent" is used at most once, and only when describing a specific agent capability.

---

## 10. How We Avoid AI Slop

- No purple. No purple-cyan gradient. No mesh gradient.
- No glass cards. No frosted blur on hero text.
- No autogenerated 3D abstract render in the hero. The hero is type, paper, and three small data artifacts.
- No floating "powered by AI" badge.
- No "agent" stock illustration.
- No emoji in headlines.
- No before/after dashboard screenshots inside cards with sparkles.
- No "Try Our AI" pulsing button.
- The serif face is **Fraunces**, deliberately chosen because Instrument Serif has become the AI-startup default. Editorial restraint over trend-following.
- The accent color is **clay**, chosen because the AI-startup default of "purple + cyan" is a tell. Clay reads like print, not like a model output.
- The pastels are *muted* — sage, mist, mint, sand, stone — never candy.
- Copy says specific D2C-finance things (settlement, ageing, marketplace fees) instead of "intelligent automation transforms your business."

---

## 11. Holding the "Accounting AI" Position Without Drifting From the Repo

A small mapping discipline keeps the messaging broad-yet-honest:

| Marketing surface phrase                          | Repo capability it maps to                                  |
|---------------------------------------------------|-------------------------------------------------------------|
| Unified financial data ingestion                  | UploadDocuments + ConnectDataSources + marketplace + gateway integrations |
| Settlement & payout intelligence                  | MarketplaceReconciliation settled/pending/COD/gateway splits |
| Exception detection / variance visibility         | Reconciliation discrepancy flagging + Operations Centre views |
| Reporting & close readiness                       | Reports page (income, expense, custom prompt, Slack)        |
| Bookkeeping workflows                             | Bookkeeping page + accounting sync                          |
| AI-guided operations                              | AIWorkflows (Reconciliation Agent, Analysis Agent) + Assistant |
| Collaboration & operational accountability        | RecentActivities feed + comments + attachments              |
| Close-process orchestration                       | Checklist page (month-end)                                  |
| Security                                          | Stytch B2B + protected routes (described as "B2B SSO and isolated workspaces") |

If a future revision wants to add a capability claim, it must map back to a file or feature in this repo. If it can't, it doesn't ship.

---

## 12. Responsive Behavior

- Breakpoints: `mobile <720px`, `tablet 720–1080px`, `desktop ≥1080px`.
- The shell max stays at 1240px; gutters tighten on smaller screens.
- The capabilities grid collapses 2-col → 1-col below 760px.
- Hero typographic artifacts hide on mobile below 480px (the page works without them).
- Type scale steps down per §4.
- Every section is still single-column-readable on a phone — nothing is a desktop-only layout.

---

## 13. Implementation Notes

- Mount the marketing site as a public route at `/landing` inside the existing Vite app. It does not require auth.
- The marketing page does **not** import MUI components. It uses plain semantic HTML, a single dedicated CSS file (or an Emotion `Global` styles block) scoped under a root class so the dashboard's MUI theme cannot leak in.
- Fonts are loaded once via `<link>` in `index.html` (Fraunces + Inter Tight). No font-loader libraries.
- Animations use Framer Motion (already in `package.json`) — but only `motion.div` reveals and a single ambient loop. No layout animations.
- The hero data artifacts and stat blocks are pure HTML/CSS. No SVG illustration files added.
- The page must pass: no horizontal overflow at any width ≥ 320px; tab-navigable; FAQ accessible via keyboard; reduced-motion respected.
