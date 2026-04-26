import React from 'react';

/**
 * Inline SVG visuals for the landing page.
 * All visuals render with currentColor + design-system CSS vars so they stay
 * on-brand without importing raster assets.
 */

/* ============================================================
   BeforeAfter — Excel chaos → Nexbit clarity
   ============================================================ */
export const BeforeAfter: React.FC = () => {
  return (
    <div className="nx-ba">
      <div className="nx-ba__pair">
        {/* BEFORE — Excel */}
        <figure className="nx-ba__panel nx-ba__panel--before">
          <figcaption className="nx-ba__caption">
            <span className="nx-meta nx-ba__tag nx-ba__tag--before">Before</span>
            <span className="nx-ba__filename nx-mono">
              marketplace_recon_v47_FINAL_final.xlsx
            </span>
          </figcaption>
          <ExcelSvg />
        </figure>

        <div className="nx-ba__arrow" aria-hidden>
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <circle cx="22" cy="22" r="21" stroke="currentColor" strokeDasharray="2 3" />
            <path
              d="M14 22h16m-5-5 5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* AFTER — Nexbit */}
        <figure className="nx-ba__panel nx-ba__panel--after">
          <figcaption className="nx-ba__caption">
            <span className="nx-meta nx-ba__tag nx-ba__tag--after">After</span>
            <span className="nx-ba__filename nx-mono">nexbit · settlements</span>
          </figcaption>
          <NexbitPanelSvg />
        </figure>
      </div>

      <p className="nx-ba__legend">
        From a thirty-tab spreadsheet to a single ledger that reconciles itself.
      </p>
    </div>
  );
};

const ExcelSvg: React.FC = () => (
  <svg
    className="nx-ba__svg"
    viewBox="0 0 520 320"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Messy spreadsheet with errors and manual highlights"
  >
    {/* Window chrome */}
    <rect x="0" y="0" width="520" height="320" rx="6" fill="#fbf8f2" />
    <rect x="0" y="0" width="520" height="22" fill="#ede7da" />
    <circle cx="12" cy="11" r="3" fill="#d97757" />
    <circle cx="22" cy="11" r="3" fill="#e0c08c" />
    <circle cx="32" cy="11" r="3" fill="#a4b3a3" />

    {/* Toolbar / formula bar */}
    <rect x="0" y="22" width="520" height="26" fill="#f4eedf" />
    <rect x="10" y="30" width="44" height="10" rx="2" fill="#e3ddcf" />
    <rect x="60" y="30" width="22" height="10" rx="2" fill="#e3ddcf" />
    <rect x="88" y="30" width="22" height="10" rx="2" fill="#e3ddcf" />
    <rect x="116" y="30" width="22" height="10" rx="2" fill="#e3ddcf" />

    {/* Formula bar */}
    <rect x="0" y="48" width="520" height="22" fill="#fbf8f2" stroke="#e3ddcf" />
    <text x="10" y="63" fontSize="10" fontFamily="ui-monospace, Menlo, monospace" fill="#9d5a43">
      fx
    </text>
    <text x="32" y="63" fontSize="10" fontFamily="ui-monospace, Menlo, monospace" fill="#3e4a47">
      =IFERROR(VLOOKUP(A2,'mar-recon'!$B:$F,4,FALSE)+SUMIFS(payouts!E:E,payouts!A:A,A2),0)
    </text>

    {/* Column headers */}
    <g fontSize="9" fontFamily="ui-monospace, Menlo, monospace" fill="#6e7773">
      <rect x="0" y="70" width="520" height="20" fill="#ede7da" />
      <text x="32" y="84">A</text>
      <text x="92" y="84">B</text>
      <text x="156" y="84">C</text>
      <text x="222" y="84">D</text>
      <text x="288" y="84">E</text>
      <text x="356" y="84">F</text>
      <text x="424" y="84">G</text>
      <text x="488" y="84">H</text>
    </g>

    {/* Row numbers */}
    <g fontSize="9" fontFamily="ui-monospace, Menlo, monospace" fill="#9aa39e">
      {Array.from({ length: 11 }).map((_, i) => (
        <g key={i}>
          <rect x="0" y={90 + i * 20} width="20" height="20" fill="#ede7da" />
          <text x="6" y={104 + i * 20}>{i + 2}</text>
        </g>
      ))}
    </g>

    {/* Grid lines */}
    <g stroke="#e3ddcf" strokeWidth="1">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((c) => (
        <line key={`v${c}`} x1={20 + c * 62.5} y1="90" x2={20 + c * 62.5} y2="310" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((r) => (
        <line key={`h${r}`} x1="0" y1={110 + r * 20} x2="520" y2={110 + r * 20} />
      ))}
    </g>

    {/* Cell highlights — yellow manual marks */}
    <rect x="20" y="110" width="62.5" height="20" fill="#fff2a8" opacity="0.7" />
    <rect x="145" y="170" width="62.5" height="20" fill="#fff2a8" opacity="0.7" />
    <rect x="270" y="230" width="62.5" height="20" fill="#fdd9c4" opacity="0.85" />
    <rect x="395" y="150" width="62.5" height="20" fill="#fff2a8" opacity="0.7" />

    {/* Strikethrough row */}
    <line x1="20" y1="200" x2="520" y2="200" stroke="#b5694f" strokeWidth="0.8" />

    {/* Cell text — messy */}
    <g fontSize="9" fontFamily="ui-monospace, Menlo, monospace" fill="#3e4a47">
      <text x="26" y="104">ORD-1042</text>
      <text x="92" y="104">Amazon</text>
      <text x="158" y="104">12,400</text>
      <text x="222" y="104">11,890</text>
      <text x="288" y="104">510</text>
      <text x="358" y="104">paid</text>
      <text x="424" y="104">07-Apr</text>
      <text x="490" y="104">--</text>

      <text x="26" y="124">ORD-1043</text>
      <text x="92" y="124">Flipkart</text>
      <text x="158" y="124">8,210</text>
      <text x="222" y="124" fill="#b5694f">#N/A</text>
      <text x="288" y="124" fill="#b5694f">#N/A</text>
      <text x="358" y="124">--</text>
      <text x="424" y="124">--</text>
      <text x="490" y="124">??</text>

      <text x="26" y="144">ORD-1044</text>
      <text x="92" y="144">Shopify</text>
      <text x="158" y="144">3,200</text>
      <text x="222" y="144">3,150</text>
      <text x="288" y="144">50</text>
      <text x="358" y="144">paid</text>
      <text x="424" y="144">07-Apr</text>
      <text x="490" y="144">ok</text>

      <text x="26" y="164">ORD-1045</text>
      <text x="92" y="164">Amazon</text>
      <text x="158" y="164">15,900</text>
      <text x="222" y="164" fill="#b5694f">#REF!</text>
      <text x="288" y="164" fill="#b5694f">#REF!</text>
      <text x="358" y="164">--</text>
      <text x="424" y="164">--</text>
      <text x="490" y="164">??</text>

      <text x="26" y="184">ORD-1046</text>
      <text x="92" y="184">Myntra</text>
      <text x="158" y="184">5,400</text>
      <text x="222" y="184">5,082</text>
      <text x="288" y="184">318</text>
      <text x="358" y="184">part</text>
      <text x="424" y="184">--</text>
      <text x="490" y="184">v.</text>

      <text x="26" y="204" textDecoration="line-through">ORD-1047</text>
      <text x="92" y="204" textDecoration="line-through">Amazon</text>
      <text x="158" y="204" textDecoration="line-through">9,100</text>
      <text x="222" y="204" textDecoration="line-through">--</text>
      <text x="288" y="204" textDecoration="line-through">--</text>
      <text x="358" y="204">--</text>

      <text x="26" y="224">ORD-1048</text>
      <text x="92" y="224">Shopify</text>
      <text x="158" y="224">2,800</text>
      <text x="222" y="224">2,800</text>
      <text x="288" y="224">0</text>
      <text x="358" y="224">paid</text>
      <text x="424" y="224">06-Apr</text>

      <text x="26" y="244">ORD-1049</text>
      <text x="92" y="244">Flipkart</text>
      <text x="158" y="244">11,250</text>
      <text x="222" y="244">10,900</text>
      <text x="288" y="244" fill="#b5694f">350</text>
      <text x="358" y="244">paid?</text>
      <text x="424" y="244">--</text>
      <text x="490" y="244">??</text>

      <text x="26" y="264">ORD-1050</text>
      <text x="92" y="264">Amazon</text>
      <text x="158" y="264">7,600</text>
      <text x="222" y="264">7,600</text>
      <text x="288" y="264">0</text>
      <text x="358" y="264">paid</text>
      <text x="424" y="264">06-Apr</text>

      <text x="26" y="284">ORD-1051</text>
      <text x="92" y="284">Myntra</text>
      <text x="158" y="284" fill="#b5694f">#VALUE!</text>
      <text x="222" y="284" fill="#b5694f">--</text>
      <text x="288" y="284" fill="#b5694f">--</text>
    </g>

    {/* Sticky-note comment */}
    <g>
      <rect x="395" y="225" width="118" height="40" rx="2" fill="#fff2a8" stroke="#e6c970" />
      <text x="403" y="240" fontSize="9" fontFamily="ui-monospace, Menlo, monospace" fill="#3e4a47">
        ask Anand —
      </text>
      <text x="403" y="252" fontSize="9" fontFamily="ui-monospace, Menlo, monospace" fill="#3e4a47">
        why diff vs payout?
      </text>
      <text x="403" y="262" fontSize="8" fontFamily="ui-monospace, Menlo, monospace" fill="#9d5a43">
        — pinged 3x
      </text>
    </g>

    {/* Sheet tabs */}
    <rect x="0" y="300" width="520" height="20" fill="#ede7da" />
    <g fontSize="9" fontFamily="ui-monospace, Menlo, monospace" fill="#3e4a47">
      <rect x="6" y="302" width="62" height="16" fill="#fbf8f2" stroke="#d9d2c2" />
      <text x="14" y="313">mar-recon</text>
      <text x="76" y="313">apr-recon</text>
      <text x="138" y="313">payouts</text>
      <text x="194" y="313">amazon</text>
      <text x="246" y="313">flipkart</text>
      <text x="298" y="313">shopify</text>
      <text x="354" y="313">v2</text>
      <text x="378" y="313">v2-old</text>
      <text x="424" y="313">v3-FINAL</text>
      <text x="492" y="313">···</text>
    </g>
  </svg>
);

const NexbitPanelSvg: React.FC = () => (
  <svg
    className="nx-ba__svg"
    viewBox="0 0 520 320"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Clean Nexbit settlement dashboard"
  >
    <defs>
      <linearGradient id="nx-area-grad" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#1f3a36" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#1f3a36" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Surface */}
    <rect x="0" y="0" width="520" height="320" rx="6" fill="#fbf8f2" />

    {/* Top bar */}
    <rect x="0" y="0" width="520" height="40" fill="#f6f2ea" />
    <text x="20" y="25" fontSize="11" fontFamily="Inter Tight, sans-serif" fontWeight="500" fill="#14201e">
      Settlements
    </text>
    <text x="84" y="25" fontSize="11" fontFamily="Inter Tight, sans-serif" fill="#6e7773">
      / April 2026
    </text>

    {/* Status pill — Reconciled */}
    <g>
      <rect x="424" y="14" width="80" height="18" rx="9" fill="#dde7dd" />
      <circle cx="436" cy="23" r="3" fill="#1f3a36" />
      <text x="445" y="26" fontSize="9" fontFamily="Inter Tight, sans-serif" fontWeight="500" fill="#1f3a36">
        Reconciled
      </text>
    </g>

    {/* KPI tiles */}
    <g fontFamily="Inter Tight, sans-serif">
      {/* Tile 1 */}
      <rect x="20" y="56" width="146" height="62" rx="4" fill="#f6f2ea" />
      <text x="32" y="74" fontSize="9" fill="#6e7773" letterSpacing="1">SETTLED</text>
      <text x="32" y="98" fontSize="20" fontWeight="500" fill="#14201e" fontFamily="Fraunces, serif">
        ₹ 4.82 Cr
      </text>
      <text x="32" y="113" fontSize="9" fill="#1f3a36">▲ 12.3% vs Mar</text>

      {/* Tile 2 */}
      <rect x="178" y="56" width="146" height="62" rx="4" fill="#f6f2ea" />
      <text x="190" y="74" fontSize="9" fill="#6e7773" letterSpacing="1">PENDING</text>
      <text x="190" y="98" fontSize="20" fontWeight="500" fill="#14201e" fontFamily="Fraunces, serif">
        ₹ 38.4 L
      </text>
      <text x="190" y="113" fontSize="9" fill="#6e7773">14 payouts in flight</text>

      {/* Tile 3 */}
      <rect x="336" y="56" width="164" height="62" rx="4" fill="#f6f2ea" />
      <text x="348" y="74" fontSize="9" fill="#6e7773" letterSpacing="1">VARIANCE</text>
      <text x="348" y="98" fontSize="20" fontWeight="500" fill="#b5694f" fontFamily="Fraunces, serif">
        ₹ 2.18 L
      </text>
      <text x="348" y="113" fontSize="9" fill="#b5694f">3 flagged · all explained</text>
    </g>

    {/* Chart */}
    <g>
      <rect x="20" y="130" width="304" height="118" rx="4" fill="#f6f2ea" />
      <text x="32" y="148" fontSize="9" fontFamily="Inter Tight, sans-serif" fill="#6e7773" letterSpacing="1">
        DAILY SETTLEMENT
      </text>

      {/* gridlines */}
      <g stroke="#e3ddcf" strokeWidth="1">
        <line x1="32" y1="170" x2="312" y2="170" />
        <line x1="32" y1="195" x2="312" y2="195" />
        <line x1="32" y1="220" x2="312" y2="220" strokeDasharray="2 3" />
      </g>

      {/* area */}
      <path
        d="M32 220 L52 210 L72 198 L92 205 L112 188 L132 192 L152 178 L172 170 L192 174 L212 162 L232 168 L252 152 L272 158 L292 148 L312 140 L312 240 L32 240 Z"
        fill="url(#nx-area-grad)"
      />
      {/* line */}
      <path
        d="M32 220 L52 210 L72 198 L92 205 L112 188 L132 192 L152 178 L172 170 L192 174 L212 162 L232 168 L252 152 L272 158 L292 148 L312 140"
        fill="none"
        stroke="#1f3a36"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* end dot */}
      <circle cx="312" cy="140" r="3" fill="#b5694f" />

      {/* x-axis labels */}
      <g fontSize="8" fontFamily="Inter Tight, sans-serif" fill="#9aa39e">
        <text x="32" y="240">Apr 1</text>
        <text x="142" y="240">Apr 14</text>
        <text x="282" y="240">Apr 28</text>
      </g>
    </g>

    {/* Source breakdown / right column */}
    <g fontFamily="Inter Tight, sans-serif">
      <rect x="336" y="130" width="164" height="118" rx="4" fill="#f6f2ea" />
      <text x="348" y="148" fontSize="9" fill="#6e7773" letterSpacing="1">SOURCES</text>

      {/* Amazon */}
      <text x="348" y="168" fontSize="10" fill="#14201e">Amazon</text>
      <rect x="348" y="172" width="138" height="4" rx="2" fill="#ede7da" />
      <rect x="348" y="172" width="92" height="4" rx="2" fill="#1f3a36" />
      <text x="468" y="168" fontSize="9" fill="#6e7773" textAnchor="end">42%</text>

      {/* Flipkart */}
      <text x="348" y="190" fontSize="10" fill="#14201e">Flipkart</text>
      <rect x="348" y="194" width="138" height="4" rx="2" fill="#ede7da" />
      <rect x="348" y="194" width="56" height="4" rx="2" fill="#1f3a36" />
      <text x="468" y="190" fontSize="9" fill="#6e7773" textAnchor="end">26%</text>

      {/* Shopify */}
      <text x="348" y="212" fontSize="10" fill="#14201e">Shopify</text>
      <rect x="348" y="216" width="138" height="4" rx="2" fill="#ede7da" />
      <rect x="348" y="216" width="40" height="4" rx="2" fill="#1f3a36" />
      <text x="468" y="212" fontSize="9" fill="#6e7773" textAnchor="end">19%</text>

      {/* Myntra */}
      <text x="348" y="234" fontSize="10" fill="#14201e">Myntra</text>
      <rect x="348" y="238" width="138" height="4" rx="2" fill="#ede7da" />
      <rect x="348" y="238" width="28" height="4" rx="2" fill="#1f3a36" />
      <text x="468" y="234" fontSize="9" fill="#6e7773" textAnchor="end">13%</text>
    </g>

    {/* Bottom row — recent transactions */}
    <g fontFamily="Inter Tight, sans-serif">
      <line x1="20" y1="262" x2="500" y2="262" stroke="#e3ddcf" />
      <text x="20" y="278" fontSize="9" fill="#6e7773" letterSpacing="1">RECENT</text>

      {/* row 1 — clean */}
      <text x="20" y="298" fontSize="10" fill="#14201e">ORD-1042 · Amazon</text>
      <text x="280" y="298" fontSize="10" fill="#6e7773">₹ 12,400</text>
      <circle cx="346" cy="295" r="3" fill="#1f3a36" />
      <text x="354" y="298" fontSize="9" fill="#1f3a36">Matched</text>
      <text x="450" y="298" fontSize="9" fill="#9aa39e" textAnchor="end">Apr 7</text>

      {/* row 2 — flagged */}
      <text x="20" y="312" fontSize="10" fill="#14201e">ORD-1049 · Flipkart</text>
      <text x="280" y="312" fontSize="10" fill="#6e7773">₹ 11,250</text>
      <circle cx="346" cy="309" r="3" fill="#b5694f" />
      <text x="354" y="312" fontSize="9" fill="#b5694f">Variance · ₹ 350</text>
      <text x="450" y="312" fontSize="9" fill="#9aa39e" textAnchor="end">Apr 7</text>
    </g>
  </svg>
);

/* ============================================================
   DashboardPreview — single rich panel
   ============================================================ */
export const DashboardPreview: React.FC = () => (
  <div className="nx-dash">
    <div className="nx-dash__chrome">
      <span className="nx-dash__dot" />
      <span className="nx-dash__dot" />
      <span className="nx-dash__dot" />
      <span className="nx-dash__url nx-mono">app.nexbit.ai · /workspace/aprilclose</span>
    </div>
    <svg
      className="nx-dash__svg"
      viewBox="0 0 1100 580"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Nexbit close-readiness dashboard preview"
    >
      <defs>
        <linearGradient id="dash-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1f3a36" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1f3a36" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="dash-area2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#b5694f" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#b5694f" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Surface */}
      <rect x="0" y="0" width="1100" height="580" fill="#fbf8f2" />

      {/* Sidebar */}
      <rect x="0" y="0" width="200" height="580" fill="#f4eedf" />
      <g fontFamily="Inter Tight, sans-serif">
        <text x="24" y="40" fontFamily="Fraunces, serif" fontSize="22" fill="#14201e">
          Nexbit
        </text>
        <circle cx="80" cy="34" r="3" fill="#b5694f" />

        <text x="24" y="80" fontSize="10" fill="#9aa39e" letterSpacing="1.4">WORKSPACE</text>
        <text x="24" y="100" fontSize="13" fill="#14201e" fontWeight="500">April close</text>

        <text x="24" y="140" fontSize="10" fill="#9aa39e" letterSpacing="1.4">FINANCE</text>
        <rect x="14" y="148" width="172" height="28" rx="4" fill="#dde7dd" />
        <text x="30" y="167" fontSize="13" fill="#1f3a36" fontWeight="500">Settlements</text>
        <text x="30" y="195" fontSize="13" fill="#3e4a47">Payouts</text>
        <text x="30" y="220" fontSize="13" fill="#3e4a47">Reconciliation</text>
        <text x="30" y="245" fontSize="13" fill="#3e4a47">Variance</text>

        <text x="24" y="285" fontSize="10" fill="#9aa39e" letterSpacing="1.4">BOOKS</text>
        <text x="30" y="308" fontSize="13" fill="#3e4a47">Journal entries</text>
        <text x="30" y="333" fontSize="13" fill="#3e4a47">Reports</text>
        <text x="30" y="358" fontSize="13" fill="#3e4a47">Close checklist</text>

        <text x="24" y="398" fontSize="10" fill="#9aa39e" letterSpacing="1.4">CONNECTIONS</text>
        <text x="30" y="421" fontSize="13" fill="#3e4a47">Marketplaces</text>
        <text x="30" y="446" fontSize="13" fill="#3e4a47">Gateways</text>
        <text x="30" y="471" fontSize="13" fill="#3e4a47">Logistics</text>
        <text x="30" y="496" fontSize="13" fill="#3e4a47">Accounting</text>
      </g>

      {/* Main area */}
      <g>
        {/* Header */}
        <text x="232" y="48" fontFamily="Fraunces, serif" fontSize="28" fill="#14201e" fontWeight="350">
          Close readiness
        </text>
        <text x="232" y="72" fontFamily="Inter Tight, sans-serif" fontSize="13" fill="#6e7773">
          April 2026 · 27 of 30 days reconciled
        </text>

        {/* Period chip */}
        <rect x="930" y="32" width="142" height="32" rx="16" fill="#f6f2ea" stroke="#d9d2c2" />
        <text x="950" y="52" fontFamily="Inter Tight, sans-serif" fontSize="12" fill="#14201e">
          Apr 1 – Apr 28
        </text>

        {/* KPI row */}
        <g fontFamily="Inter Tight, sans-serif">
          {[
            { x: 232, label: 'NET REVENUE', val: '₹ 6.42 Cr', delta: '▲ 18.4%', deltaColor: '#1f3a36' },
            { x: 432, label: 'SETTLED', val: '₹ 4.82 Cr', delta: '75% of revenue', deltaColor: '#6e7773' },
            { x: 632, label: 'PENDING', val: '₹ 1.22 Cr', delta: '14 payouts in flight', deltaColor: '#6e7773' },
            { x: 832, label: 'VARIANCE', val: '₹ 2.18 L', delta: '3 flagged', deltaColor: '#b5694f' },
          ].map((k) => (
            <g key={k.label}>
              <rect x={k.x} y="100" width="184" height="92" rx="6" fill="#f6f2ea" />
              <text x={k.x + 18} y="124" fontSize="10" fill="#6e7773" letterSpacing="1.4">
                {k.label}
              </text>
              <text x={k.x + 18} y="158" fontSize="26" fontFamily="Fraunces, serif" fill={k.label === 'VARIANCE' ? '#b5694f' : '#14201e'}>
                {k.val}
              </text>
              <text x={k.x + 18} y="180" fontSize="11" fill={k.deltaColor}>
                {k.delta}
              </text>
            </g>
          ))}
        </g>

        {/* Big chart */}
        <g>
          <rect x="232" y="216" width="584" height="232" rx="6" fill="#f6f2ea" />
          <text x="252" y="244" fontFamily="Inter Tight, sans-serif" fontSize="10" fill="#6e7773" letterSpacing="1.4">
            REVENUE VS SETTLEMENTS
          </text>
          <text x="252" y="262" fontFamily="Fraunces, serif" fontSize="18" fill="#14201e">
            Daily flow
          </text>

          {/* legend */}
          <g fontFamily="Inter Tight, sans-serif" fontSize="11">
            <circle cx="612" cy="244" r="4" fill="#1f3a36" />
            <text x="622" y="247" fill="#3e4a47">Revenue</text>
            <circle cx="688" cy="244" r="4" fill="#b5694f" />
            <text x="698" y="247" fill="#3e4a47">Settled</text>
          </g>

          {/* gridlines */}
          <g stroke="#e3ddcf" strokeWidth="1">
            <line x1="252" y1="296" x2="796" y2="296" />
            <line x1="252" y1="346" x2="796" y2="346" />
            <line x1="252" y1="396" x2="796" y2="396" />
          </g>

          {/* y-axis labels */}
          <g fontFamily="Inter Tight, sans-serif" fontSize="10" fill="#9aa39e">
            <text x="252" y="293">₹ 24L</text>
            <text x="252" y="343">₹ 16L</text>
            <text x="252" y="393">₹ 8L</text>
          </g>

          {/* area — revenue */}
          <path
            d="M252 360 L284 348 L316 332 L348 340 L380 318 L412 322 L444 304 L476 296 L508 300 L540 286 L572 290 L604 274 L636 280 L668 268 L700 262 L732 256 L764 248 L796 244 L796 420 L252 420 Z"
            fill="url(#dash-area)"
          />
          <path
            d="M252 360 L284 348 L316 332 L348 340 L380 318 L412 322 L444 304 L476 296 L508 300 L540 286 L572 290 L604 274 L636 280 L668 268 L700 262 L732 256 L764 248 L796 244"
            fill="none"
            stroke="#1f3a36"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* area — settled (lags) */}
          <path
            d="M252 384 L284 376 L316 368 L348 372 L380 358 L412 360 L444 348 L476 340 L508 344 L540 332 L572 334 L604 322 L636 326 L668 318 L700 314 L732 308 L764 302 L796 298 L796 420 L252 420 Z"
            fill="url(#dash-area2)"
          />
          <path
            d="M252 384 L284 376 L316 368 L348 372 L380 358 L412 360 L444 348 L476 340 L508 344 L540 332 L572 334 L604 322 L636 326 L668 318 L700 314 L732 308 L764 302 L796 298"
            fill="none"
            stroke="#b5694f"
            strokeWidth="1.6"
            strokeDasharray="3 3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* x-axis */}
          <g fontFamily="Inter Tight, sans-serif" fontSize="10" fill="#9aa39e">
            <text x="252" y="436">Apr 1</text>
            <text x="408" y="436">Apr 8</text>
            <text x="556" y="436">Apr 15</text>
            <text x="708" y="436">Apr 22</text>
            <text x="780" y="436">Apr 28</text>
          </g>
        </g>

        {/* Right column — Close checklist */}
        <g>
          <rect x="832" y="216" width="240" height="232" rx="6" fill="#f6f2ea" />
          <text x="852" y="244" fontFamily="Inter Tight, sans-serif" fontSize="10" fill="#6e7773" letterSpacing="1.4">
            CLOSE CHECKLIST
          </text>

          {[
            { label: 'Marketplace settlements', done: true },
            { label: 'Gateway payouts', done: true },
            { label: 'Logistics fees', done: true },
            { label: 'Returns & refunds', done: true },
            { label: 'Variance review', done: false },
            { label: 'Journal entries posted', done: false },
            { label: 'Books synced', done: false },
          ].map((it, i) => (
            <g key={it.label} fontFamily="Inter Tight, sans-serif">
              {it.done ? (
                <>
                  <circle cx="858" cy={272 + i * 24} r="6" fill="#1f3a36" />
                  <path
                    d={`M${854} ${272 + i * 24} l3 3 l5 -5`}
                    stroke="#fbf8f2"
                    strokeWidth="1.4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              ) : (
                <circle cx="858" cy={272 + i * 24} r="6" fill="none" stroke="#d9d2c2" strokeWidth="1.4" />
              )}
              <text
                x="876"
                y={276 + i * 24}
                fontSize="12"
                fill={it.done ? '#6e7773' : '#14201e'}
                style={it.done ? { textDecoration: 'line-through' } : undefined}
              >
                {it.label}
              </text>
            </g>
          ))}
        </g>

        {/* Bottom strip — assistant suggestion */}
        <g>
          <rect x="232" y="472" width="840" height="76" rx="6" fill="#dde7dd" />
          <text x="256" y="498" fontFamily="Inter Tight, sans-serif" fontSize="10" fill="#1f3a36" letterSpacing="1.4">
            ASSISTANT
          </text>
          <text x="256" y="520" fontFamily="Fraunces, serif" fontSize="16" fill="#14201e">
            3 settlements show a ₹ 350 fee variance against the Flipkart contract.
          </text>
          <text x="256" y="538" fontFamily="Inter Tight, sans-serif" fontSize="12" fill="#3e4a47">
            Suggested journal entry drafted · Review before posting
          </text>

          <rect x="940" y="496" width="116" height="32" rx="16" fill="#1f3a36" />
          <text x="998" y="516" fontFamily="Inter Tight, sans-serif" fontSize="12" fill="#fbf8f2" textAnchor="middle">
            Review →
          </text>
        </g>
      </g>
    </svg>
  </div>
);

/* ============================================================
   DataFlow — sources → Nexbit → outputs
   ============================================================ */
const SOURCES = ['Amazon', 'Flipkart', 'Shopify', 'Razorpay', 'Shiprocket', 'Documents'];
const OUTPUTS = ['Books', 'Reports', 'Close', 'Audit trail'];

export const DataFlow: React.FC = () => (
  <div className="nx-flow">
    <svg
      className="nx-flow__svg"
      viewBox="0 0 980 360"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Data flow from sources through Nexbit to books and reports"
    >
      <defs>
        <radialGradient id="hub-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1f3a36" />
          <stop offset="100%" stopColor="#07201b" />
        </radialGradient>
      </defs>

      {/* Connecting lines — sources to hub */}
      {SOURCES.map((_, i) => {
        const y = 30 + i * 50;
        return (
          <path
            key={`l-in-${i}`}
            d={`M 200 ${y} C 320 ${y}, 360 180, 460 180`}
            stroke="#d9d2c2"
            strokeWidth="1"
            strokeDasharray="3 3"
            fill="none"
          />
        );
      })}

      {/* Connecting lines — hub to outputs */}
      {OUTPUTS.map((_, i) => {
        const y = 80 + i * 60;
        return (
          <path
            key={`l-out-${i}`}
            d={`M 540 180 C 640 180, 680 ${y}, 780 ${y}`}
            stroke="#d9d2c2"
            strokeWidth="1"
            strokeDasharray="3 3"
            fill="none"
          />
        );
      })}

      {/* Source pills */}
      {SOURCES.map((s, i) => {
        const y = 30 + i * 50;
        return (
          <g key={s}>
            <rect
              x="40"
              y={y - 14}
              width="160"
              height="28"
              rx="14"
              fill="#fbf8f2"
              stroke="#d9d2c2"
            />
            <circle cx="60" cy={y} r="3" fill="#1f3a36" />
            <text
              x="76"
              y={y + 4}
              fontFamily="Inter Tight, sans-serif"
              fontSize="13"
              fill="#14201e"
            >
              {s}
            </text>
          </g>
        );
      })}

      {/* Source category label */}
      <text
        x="40"
        y="14"
        fontFamily="Inter Tight, sans-serif"
        fontSize="10"
        fill="#9aa39e"
        letterSpacing="1.4"
      >
        SOURCES
      </text>

      {/* Hub */}
      <g>
        <circle cx="500" cy="180" r="84" fill="url(#hub-gradient)" />
        <circle cx="500" cy="180" r="84" fill="none" stroke="#b5694f" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="2 4" />
        <circle cx="500" cy="180" r="100" fill="none" stroke="#d9d2c2" strokeDasharray="2 4" />
        <text
          x="500"
          y="178"
          fontFamily="Fraunces, serif"
          fontSize="22"
          fontWeight="350"
          fill="#fbf8f2"
          textAnchor="middle"
        >
          Nexbit
        </text>
        <text
          x="500"
          y="200"
          fontFamily="Inter Tight, sans-serif"
          fontSize="10"
          fill="rgba(251,248,242,0.6)"
          textAnchor="middle"
          letterSpacing="1.4"
        >
          OPERATING LAYER
        </text>
        <circle cx="540" cy="142" r="3" fill="#b5694f" />
      </g>

      {/* Output pills */}
      <text
        x="780"
        y="64"
        fontFamily="Inter Tight, sans-serif"
        fontSize="10"
        fill="#9aa39e"
        letterSpacing="1.4"
      >
        OUTPUTS
      </text>
      {OUTPUTS.map((s, i) => {
        const y = 80 + i * 60;
        return (
          <g key={s}>
            <rect
              x="780"
              y={y - 14}
              width="160"
              height="28"
              rx="14"
              fill="#1f3a36"
            />
            <circle cx="800" cy={y} r="3" fill="#dde7dd" />
            <text
              x="816"
              y={y + 4}
              fontFamily="Inter Tight, sans-serif"
              fontSize="13"
              fill="#fbf8f2"
            >
              {s}
            </text>
          </g>
        );
      })}

      {/* Stage labels */}
      <text
        x="120"
        y="346"
        fontFamily="Fraunces, serif"
        fontStyle="italic"
        fontSize="14"
        fill="#6e7773"
        textAnchor="middle"
      >
        connect
      </text>
      <text
        x="500"
        y="346"
        fontFamily="Fraunces, serif"
        fontStyle="italic"
        fontSize="14"
        fill="#6e7773"
        textAnchor="middle"
      >
        unify · detect
      </text>
      <text
        x="860"
        y="346"
        fontFamily="Fraunces, serif"
        fontStyle="italic"
        fontSize="14"
        fill="#6e7773"
        textAnchor="middle"
      >
        close
      </text>
    </svg>
  </div>
);

/* ============================================================
   ReconciliationLedger — small, dense ledger snapshot
   ============================================================ */
type LedgerRow = {
  id: string;
  source: string;
  amount: string;
  status: 'matched' | 'pending' | 'variance';
  note: string;
};

const LEDGER_ROWS: LedgerRow[] = [
  { id: 'ORD-1042', source: 'Amazon', amount: '₹ 12,400', status: 'matched', note: 'Matched · 7 Apr' },
  { id: 'ORD-1043', source: 'Flipkart', amount: '₹ 8,210', status: 'matched', note: 'Matched · 7 Apr' },
  { id: 'ORD-1045', source: 'Amazon', amount: '₹ 15,900', status: 'pending', note: 'Settlement in flight' },
  { id: 'ORD-1049', source: 'Flipkart', amount: '₹ 11,250', status: 'variance', note: 'Fee variance · ₹ 350' },
  { id: 'ORD-1050', source: 'Shopify', amount: '₹ 7,600', status: 'matched', note: 'Matched · 6 Apr' },
];

const STATUS_META: Record<LedgerRow['status'], { label: string; color: string; dot: string }> = {
  matched: { label: 'Matched', color: 'var(--ink)', dot: 'var(--teal)' },
  pending: { label: 'Pending', color: 'var(--ink-mute)', dot: '#c9a14a' },
  variance: { label: 'Variance', color: 'var(--clay)', dot: 'var(--clay)' },
};

export const ReconciliationLedger: React.FC = () => (
  <div className="nx-ledger">
    <div className="nx-ledger__head">
      <span className="nx-meta">Live ledger</span>
      <span className="nx-mono nx-ledger__head-meta">5 of 412 today</span>
    </div>
    <div className="nx-ledger__row nx-ledger__row--header">
      <span>Order</span>
      <span>Source</span>
      <span className="nx-ledger__cell--right">Amount</span>
      <span>Status</span>
    </div>
    {LEDGER_ROWS.map((row) => {
      const meta = STATUS_META[row.status];
      return (
        <div key={row.id} className={`nx-ledger__row nx-ledger__row--${row.status}`}>
          <span className="nx-mono">{row.id}</span>
          <span>{row.source}</span>
          <span className="nx-mono nx-ledger__cell--right">{row.amount}</span>
          <span className="nx-ledger__status" style={{ color: meta.color }}>
            <span className="nx-ledger__dot" style={{ background: meta.dot }} />
            {meta.label}
            <span className="nx-ledger__note">{row.note}</span>
          </span>
        </div>
      );
    })}
    <div className="nx-ledger__foot nx-meta">
      Variance flagged automatically · explanation drafted by Nexbit · awaiting your sign-off
    </div>
  </div>
);
