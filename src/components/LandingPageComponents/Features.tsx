// // ─── Icons ─────────────────────────────────────────────────────────────────
// const IconAutomate = () => (
//   <svg
//     width="22"
//     height="22"
//     viewBox="0 0 22 22"
//     fill="none"
//     stroke="white"
//     strokeWidth="1.6"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="2" y="3" width="18" height="14" rx="2" />
//     <line x1="7" y1="20" x2="15" y2="20" />
//     <line x1="11" y1="17" x2="11" y2="20" />
//     <rect x="5" y="7" width="4" height="3" rx="0.5" />
//     <line x1="12" y1="8" x2="16" y2="8" />
//     <line x1="12" y1="11" x2="14" y2="11" />
//   </svg>
// );
// const IconAddress = () => (
//   <svg
//     width="22"
//     height="22"
//     viewBox="0 0 22 22"
//     fill="none"
//     stroke="white"
//     strokeWidth="1.6"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3" y="2" width="16" height="18" rx="2" />
//     <line x1="7" y1="7" x2="15" y2="7" />
//     <line x1="7" y1="11" x2="15" y2="11" />
//     <line x1="7" y1="15" x2="11" y2="15" />
//     <polyline points="13,13 16,16 20,12" />
//   </svg>
// );
// const IconPaycheck = () => (
//   <svg
//     width="22"
//     height="22"
//     viewBox="0 0 22 22"
//     fill="none"
//     stroke="white"
//     strokeWidth="1.6"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="2" y="5" width="18" height="12" rx="2" />
//     <line x1="2" y1="9" x2="20" y2="9" />
//     <line x1="6" y1="13" x2="9" y2="13" />
//     <line x1="13" y1="13" x2="16" y2="13" />
//   </svg>
// );
// const IconAuth = () => (
//   <svg
//     width="22"
//     height="22"
//     viewBox="0 0 22 22"
//     fill="none"
//     stroke="white"
//     strokeWidth="1.6"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <circle cx="11" cy="7" r="4" />
//     <path d="M3 19c0-4 3.6-7 8-7s8 3 8 7" />
//     <polyline points="14,9 16,11 20,7" />
//   </svg>
// );
// const IconPolicy = () => (
//   <svg
//     width="22"
//     height="22"
//     viewBox="0 0 22 22"
//     fill="none"
//     stroke="white"
//     strokeWidth="1.6"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M11 2L4 5v6c0 5 3.2 8.5 7 9.8C15 19.5 18 16 18 11V5l-7-3z" />
//     <polyline points="8,11 10,13 14,9" />
//   </svg>
// );
// const IconWorkday = () => (
//   <svg
//     width="22"
//     height="22"
//     viewBox="0 0 22 22"
//     fill="none"
//     stroke="white"
//     strokeWidth="1.6"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <polygon points="13,2 20,6 20,14 13,18 6,14 6,6" />
//     <polyline points="8,10 11,13 15,8" />
//   </svg>
// );

// // ─── Peoplix Logo SVG ──────────────────────────────────────────────────────
// const PeoplixIcon = () => (
//   <svg width="38" height="28" viewBox="0 0 38 28" fill="none">
//     <circle cx="13" cy="14" r="11" fill="white" fillOpacity="0.9" />
//     <circle cx="25" cy="14" r="11" fill="white" fillOpacity="0.6" />
//   </svg>
// );

// // ─── Data ──────────────────────────────────────────────────────────────────
// interface Feature {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }

// const leftFeatures: Feature[] = [
//   {
//     icon: <IconAutomate />,
//     title: "What Peoplix Can Automate",
//     description:
//       "Peoplix handles high-volume, high-friction employee requests end-to-end resolving them instantly without HR intervention.",
//   },
//   {
//     icon: <IconAddress />,
//     title: "Update my home address",
//     description:
//       "Peoplix verifies identity, updates records directly in Workday, and confirms completion in real time without creating a ticket.",
//   },
//   {
//     icon: <IconPaycheck />,
//     title: "Why is my paycheck lower?",
//     description:
//       "Peoplix analyzes payroll data, reviews deductions, tax changes, or benefit adjustments, applies company policy logic.",
//   },
// ];

// const rightFeatures: Feature[] = [
//   {
//     icon: <IconAuth />,
//     title: "Authenticates Employees",
//     description:
//       "Peoplix securely verifies employee identity before processing any request, using enterprise auth protocols and role-based access controls.",
//   },
//   {
//     icon: <IconPolicy />,
//     title: "Applies HR Policy",
//     description:
//       "Peoplix dynamically interprets and applies company-specific HR policies in real time. Whether it's eligibility rules, accrual logic, payroll conditions.",
//   },
//   {
//     icon: <IconWorkday />,
//     title: "Executes Transactions in Workday",
//     description:
//       "Peoplix doesn't stop at answering questions. It performs real system actions directly inside Workday and other enterprise platforms.",
//   },
// ];

// // ─── Feature Card ──────────────────────────────────────────────────────────
// const FeatureCard = ({ feature }: { feature: Feature }) => (
//   <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-3 w-full hover:shadow-md transition-shadow duration-200">
//     <div className="w-11 h-11 rounded-xl bg-[#0f1f2e] flex items-center justify-center shrink-0">
//       {feature.icon}
//     </div>
//     <div>
//       <h3 className="text-[15px] font-bold text-slate-800 mb-1.5 leading-snug">
//         {feature.title}
//       </h3>
//       <p className="text-[13px] text-slate-500 leading-relaxed">
//         {feature.description}
//       </p>
//     </div>
//   </div>
// );

// // ─── Center Peoplix Box ────────────────────────────────────────────────────
// const PeoplixCenterBox = () => (
//   <div className="flex flex-col items-center justify-center">
//     {/* Outer glow ring */}
//     <div
//       className="relative flex items-center justify-center"
//       style={{
//         filter:
//           "drop-shadow(0 0 32px rgba(6,182,212,0.55)) drop-shadow(0 0 64px rgba(6,182,212,0.25))",
//       }}
//     >
//       {/* Main box */}
//       <div
//         className="w-[100px] h-[100px] rounded-[28px] flex flex-col items-center justify-center gap-2 relative overflow-hidden"
//         style={{
//           background:
//             "linear-gradient(145deg, #0f4f5c  0%, #0d6a7a  45%, #0891b2 100%)",
//           boxShadow:
//             "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.15)",
//         }}
//       >
//         {/* Subtle inner highlight */}
//         <div
//           className="absolute inset-0 rounded-[28px]"
//           style={{
//             background:
//               "radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.22) 0%, transparent 65%)",
//           }}
//         />
//         <PeoplixIcon />
//         <span className="text-white font-bold text-[15px] tracking-wide relative z-10">
//           Peoplix
//         </span>
//       </div>
//     </div>

//     {/* Bottom glow blob */}
//     <div
//       className="w-28 h-5 rounded-full mt-1"
//       style={{
//         background:
//           "radial-gradient(ellipse, rgba(6,182,212,0.4) 0%, transparent 70%)",
//         filter: "blur(8px)",
//       }}
//     />
//   </div>
// );

// // ─── Connector Dot ─────────────────────────────────────────────────────────
// const ConnectorDot = () => (
//   <div className="w-2 h-2 rounded-full bg-slate-400 border border-slate-300 shrink-0" />
// );

// // ─── Main Component ────────────────────────────────────────────────────────
// const WhatPeoplixCanAutomate = () => {
//   // Card height approx + gap for line positioning
//   const cardHeight = 156; // px — approx rendered height of each card
//   const cardGap = 16; // gap-4 = 16px

//   return (
//     <section className="py-16 px-4 sm:px-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
//             <span className="w-[7px] h-[7px] rounded-full bg-cyan-400 animate-pulse shrink-0" />
//             <span className="text-xs font-semibold text-slate-600 tracking-wide">
//               Features
//             </span>
//           </div>
//           <h2 className="text-[clamp(28px,5vw,52px)] font-bold bg-gradient-to-b from-[#61666A] to-[#292C2E] bg-clip-text text-transparent tracking-tight leading-tight">
//             What Peoplix Can Automate
//           </h2>
//         </div>

//         {/* ── Desktop layout ── */}
//         <div className="hidden lg:block">
//           {/* 3-column grid */}
//           <div className="grid grid-cols-[1fr_180px_1fr] items-center">
//             {/* ── Left cards ── */}
//             <div className="flex flex-col gap-4">
//               {leftFeatures.map((feature, i) => (
//                 <div key={i} className="flex items-center gap-0">
//                   <FeatureCard feature={feature} />
//                   {/* Right connector: line → dot */}
//                   <div className="flex items-center w-12 shrink-0">
//                     <ConnectorDot />
//                     <div className="flex-1 border-t border-dashed border-slate-300" />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* ── Center: vertical line + box + vertical line ── */}
//             <div
//               className="flex flex-col items-center"
//               style={{ height: `${3 * cardHeight + 2 * cardGap}px` }}
//             >
//               {/* Top vertical segment */}
//               <ConnectorDot />
//               <div className="flex-1 border-l border-dashed border-slate-300" />

//               {/* Center box */}
//               <PeoplixCenterBox />

//               {/* Bottom vertical segment */}
//               <div className="flex-1 border-l border-dashed border-slate-300 -mt-5" />
//               <ConnectorDot />
//             </div>

//             {/* ── Right cards ── */}
//             <div className="flex flex-col gap-4">
//               {rightFeatures.map((feature, i) => (
//                 <div key={i} className="flex items-center gap-0">
//                   {/* Left connector: dot → line */}
//                   <div className="flex items-center w-24 shrink-0">
//                     <div className="flex-1 border-t border-dashed border-slate-300" />
//                     <ConnectorDot />
//                   </div>
//                   <FeatureCard feature={feature} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── Mobile / Tablet layout ── */}
//         <div className="lg:hidden flex flex-col items-center gap-8">
//           {/* Center box */}
//           <PeoplixCenterBox />

//           {/* All 6 cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
//             {[...leftFeatures, ...rightFeatures].map((feature, i) => (
//               <FeatureCard key={i} feature={feature} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhatPeoplixCanAutomate;

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

// ─── Icons ──────────────────────────────────────────────────────────────────
const IconAutomate = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    stroke="white"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="18" height="14" rx="2" />
    <line x1="11" y1="17" x2="11" y2="20" />
    <line x1="7" y1="20" x2="15" y2="20" />
    <rect x="5" y="7" width="4" height="3" rx="0.5" />
    <line x1="12" y1="8" x2="16" y2="8" />
    <line x1="12" y1="11" x2="14" y2="11" />
  </svg>
);
const IconAddress = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    stroke="white"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="2" width="16" height="18" rx="2" />
    <line x1="7" y1="7" x2="15" y2="7" />
    <line x1="7" y1="11" x2="15" y2="11" />
    <line x1="7" y1="15" x2="11" y2="15" />
    <polyline points="13,13 16,16 20,12" />
  </svg>
);
const IconPaycheck = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    stroke="white"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="5" width="18" height="12" rx="2" />
    <line x1="2" y1="9" x2="20" y2="9" />
    <line x1="6" y1="13" x2="9" y2="13" />
    <line x1="13" y1="13" x2="16" y2="13" />
  </svg>
);
const IconAuth = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    stroke="white"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="7" r="4" />
    <path d="M3 19c0-4 3.6-7 8-7s8 3 8 7" />
    <polyline points="14,9 16,11 20,7" />
  </svg>
);
const IconPolicy = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    stroke="white"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 2L4 5v6c0 5 3.2 8.5 7 9.8C15 19.5 18 16 18 11V5l-7-3z" />
    <polyline points="8,11 10,13 14,9" />
  </svg>
);
const IconWorkday = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    stroke="white"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13,2 20,6 20,14 13,18 6,14 6,6" />
    <polyline points="8,10 11,13 15,8" />
  </svg>
);

// ─── Peoplix Logo ────────────────────────────────────────────────────────────
const PeoplixIcon = () => (
  <svg width="36" height="26" viewBox="0 0 36 26" fill="none">
    <circle cx="12" cy="13" r="10" fill="white" fillOpacity="0.95" />
    <circle cx="24" cy="13" r="10" fill="white" fillOpacity="0.55" />
  </svg>
);

const PeoplixCenterBox = () => (
  <div className="flex flex-col items-center">
    <div
      style={{
        filter:
          "drop-shadow(0 0 28px rgba(6,182,212,0.75)) drop-shadow(0 0 60px rgba(6,182,212,0.4))",
      }}
    >
      <div
        className="w-[130px] h-[130px] rounded-[28px] flex flex-col items-center justify-center gap-2 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #0e7490 0%, #0891b2 50%, #22d3ee 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.15)",
        }}
      >
        <div
          className="absolute inset-0 rounded-[28px]"
          style={{
            background:
              "radial-gradient(ellipse at 40% 25%, rgba(255,255,255,0.25) 0%, transparent 60%)",
          }}
        />
        <PeoplixIcon />
        <span className="text-white font-bold text-[15px] tracking-wide relative z-10 select-none">
          Peoplix
        </span>
      </div>
    </div>
    <div
      className="w-24 h-4 -mt-1"
      style={{
        background:
          "radial-gradient(ellipse, rgba(6,182,212,0.5) 0%, transparent 70%)",
        filter: "blur(6px)",
      }}
    />
  </div>
);

// ─── Data ────────────────────────────────────────────────────────────────────
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  side: "left" | "right";
}

const features: Feature[] = [
  {
    side: "left",
    icon: <IconAutomate />,
    title: "Enterprise HR Automation in Action",
    description:
      "Peoplix handles high-volume, high-friction employee requests end-to-end resolving them instantly without HR intervention.",
  },
  {
    side: "left",
    icon: <IconAddress />,
    title: "Update my home address",
    description:
      "Peoplix verifies identity, updates records directly in Workday, and confirms completion in real time without creating a ticket.",
  },
  {
    side: "left",
    icon: <IconPaycheck />,
    title: "Why is my paycheck lower?",
    description:
      "Peoplix analyzes payroll data, reviews deductions, tax changes, or benefit adjustments, applies company policy logic.",
  },
  {
    side: "right",
    icon: <IconAuth />,
    title: "Authenticates Employees",
    description:
      "Peoplix securely verifies employee identity before processing any request, using enterprise auth protocols and role-based access controls.",
  },
  {
    side: "right",
    icon: <IconPolicy />,
    title: "Applies HR Policy",
    description:
      "Peoplix dynamically interprets and applies company-specific HR policies in real time. Whether it's eligibility rules, accrual logic, payroll conditions.",
  },
  {
    side: "right",
    icon: <IconWorkday />,
    title: "Executes Transactions in Workday",
    description:
      "Peoplix doesn't stop at answering questions. It performs real system actions directly inside Workday and other enterprise platforms.",
  },
];

// ─── Line type ───────────────────────────────────────────────────────────────
interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// ─── Main Component ──────────────────────────────────────────────────────────
const WhatPeoplixCanAutomate = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  // 6 card refs: index 0-2 = left, 3-5 = right
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(6).fill(null));

  const [lines, setLines] = useState<Line[]>([]);
  const [svgSize, setSvgSize] = useState({ w: 0, h: 0 });

  const recalc = useCallback(() => {
    const wrapper = wrapperRef.current;
    const center = centerRef.current;
    if (!wrapper || !center) return;

    const wRect = wrapper.getBoundingClientRect();
    const cRect = center.getBoundingClientRect();

    // Center of Peoplix box relative to wrapper
    const cx = cRect.left - wRect.left + cRect.width / 2;
    const cy = cRect.top - wRect.top + cRect.height / 2;

    const newLines: Line[] = [];

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const r = card.getBoundingClientRect();

      // Left cards (0-2): connect from right-center edge
      // Right cards (3-5): connect from left-center edge
      const isLeft = idx < 3;
      const ex = isLeft
        ? r.right - wRect.left // right edge of left card
        : r.left - wRect.left; // left edge of right card
      const ey = r.top - wRect.top + r.height / 2;

      newLines.push({ x1: ex, y1: ey, x2: cx, y2: cy });
    });

    setSvgSize({ w: wRect.width, h: wRect.height });
    setLines(newLines);
  }, []);

  useEffect(() => {
    // Initial calc after paint
    const t = setTimeout(recalc, 80);

    // Recalc on resize
    window.addEventListener("resize", recalc);

    // Watch wrapper size changes with ResizeObserver
    let ro: ResizeObserver | null = null;
    if (wrapperRef.current && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(recalc);
      ro.observe(wrapperRef.current);
    }

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", recalc);
      ro?.disconnect();
    };
  }, [recalc]);

  const leftFeatures = features.filter((f) => f.side === "left");
  const rightFeatures = features.filter((f) => f.side === "right");

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-1.5 mb-6 shadow-sm">
            <span className="w-[7px] h-[7px] rounded-full bg-cyan-400 animate-pulse shrink-0" />
            <span className="text-sm font-semibold text-cyan-400 tracking-wide">
              Features
            </span>
          </div>
          <h2 className="text-[clamp(28px,5vw,52px)] font-bold text-slate-800 tracking-tight leading-tight">
            What Peoplix Can Automate
          </h2>
        </div>

        {/* ── Desktop (lg+) ── */}
        <div className="hidden lg:block">
          <div ref={wrapperRef} className="relative">
            {/* SVG lines layer — sits above cards */}
            {svgSize.w > 0 && (
              <svg
                className="absolute inset-0 pointer-events-none z-20"
                width={svgSize.w}
                height={svgSize.h}
              >
                <defs>
                  {/* Small circle markers for line endpoints */}
                  <marker
                    id="m-dot"
                    markerWidth="8"
                    markerHeight="8"
                    refX="4"
                    refY="4"
                    orient="auto"
                  >
                    <circle
                      cx="4"
                      cy="4"
                      r="2.5"
                      fill="white"
                      stroke="#94a3b8"
                      strokeWidth="1.2"
                    />
                  </marker>
                </defs>

                {lines.map((l, i) => (
                  <line
                    key={i}
                    x1={l.x1}
                    y1={l.y1}
                    x2={l.x2}
                    y2={l.y2}
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="5 4"
                    markerStart="url(#m-dot)"
                    markerEnd="url(#m-dot)"
                  />
                ))}
              </svg>
            )}

            {/* 3-column grid */}
            <div className="grid grid-cols-[1fr_180px_1fr]">
              {/* Left cards */}
              <div className="flex flex-col gap-5 pr-10">
                {leftFeatures.map((f, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200"
                  >
                    {/* <div className="w-11 h-11 rounded-xl bg-[#0f1f2e] flex items-center justify-center mb-3">
                      {f.icon}
                    </div> */}
                    <motion.div
                      className="w-11 h-11 rounded-xl bg-[#0f1f2e] flex items-center justify-center mb-3"
                      initial={{ rotate: 0 }}
                      whileInView={{ rotate: 360 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      viewport={{ once: false, amount: 0.5 }}
                    >
                      {f.icon}
                    </motion.div>
                    <h3 className="text-[15px] font-bold text-slate-800 mb-1.5 leading-snug">
                      {f.title}
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Center — Peoplix box vertically centered */}
              <div className="flex items-center justify-center z-100">
                <div ref={centerRef}>
                  <PeoplixCenterBox />
                </div>
              </div>

              {/* Right cards */}
              <div className="flex flex-col gap-5 pl-10">
                {rightFeatures.map((f, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      cardRefs.current[i + 3] = el;
                    }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200"
                  >
                    {/* <div className="w-11 h-11 rounded-xl bg-[#0f1f2e] flex items-center justify-center mb-3">
                      {f.icon}
                    </div> */}
                    <motion.div
                      className="w-11 h-11 rounded-xl bg-[#0f1f2e] flex items-center justify-center mb-3"
                      initial={{ rotate: 0 }}
                      whileInView={{ rotate: 360 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      viewport={{ once: false, amount: 0.5 }}
                    >
                      {f.icon}
                    </motion.div>
                    <h3 className="text-[15px] font-bold text-slate-800 mb-1.5 leading-snug">
                      {f.title}
                    </h3>
                    <p className="text-[13px] text-slate-500 leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile / Tablet ── */}
        <div className="lg:hidden flex flex-col items-center gap-8">
          <PeoplixCenterBox />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
              >
                <div className="w-11 h-11 rounded-xl bg-[#0f1f2e] flex items-center justify-center mb-3">
                  {f.icon}
                </div>
                <h3 className="text-[15px] font-bold text-slate-800 mb-1.5 leading-snug">
                  {f.title}
                </h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatPeoplixCanAutomate;
