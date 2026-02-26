import { useEffect, useRef, useState } from "react";
import S1 from "../../assets/images/s1.png";
import S2 from "../../assets/images/s2.png";
import S3 from "../../assets/images/s3.png";
import S4 from "../../assets/images/s4.png";
import S5 from "../../assets/images/s5.png";
import S6 from "../../assets/images/s6.png";

interface FloatingCard {
  id: string;
  icon: React.ReactNode;
  side: "left" | "right";
  // Final (spread-out) position
  finalTop: string;
  finalOffset: string;
  // Starting position (center cluster) — top only, horizontal handled via transform
  startTop: string;
  rotation: string;
  delay: number;
}

const floatingCards: FloatingCard[] = [
  // LEFT side — final positions are left-side, start from center
  {
    id: "l1",
    icon: <img src={S1} alt="icon" className="w-10 h-10 object-contain" />,
    side: "left",
    finalTop: "12%",
    finalOffset: "14%",
    startTop: "35%",
    rotation: "-12deg",
    delay: 0,
  },
  {
    id: "l2",
    icon: <img src={S2} alt="icon" className="w-10 h-10 object-contain" />,
    side: "left",
    finalTop: "38%",
    finalOffset: "7%",
    startTop: "38%",
    rotation: "-8deg",
    delay: 80,
  },
  {
    id: "l3",
    icon: <img src={S3} alt="icon" className="w-10 h-10 object-contain" />,
    side: "left",
    finalTop: "64%",
    finalOffset: "14%",
    startTop: "42%",
    rotation: "-10deg",
    delay: 160,
  },
  // RIGHT side — final positions are right-side, start from center
  {
    id: "r1",
    icon: <img src={S4} alt="icon" className="w-10 h-10 object-contain" />,
    side: "right",
    finalTop: "10%",
    finalOffset: "14%",
    startTop: "35%",
    rotation: "10deg",
    delay: 40,
  },
  {
    id: "r2",
    icon: <img src={S5} alt="icon" className="w-10 h-10 object-contain" />,
    side: "right",
    finalTop: "38%",
    finalOffset: "7%",
    startTop: "38%",
    rotation: "6deg",
    delay: 120,
  },
  {
    id: "r3",
    icon: <img src={S6} alt="icon" className="w-10 h-10 object-contain" />,
    side: "right",
    finalTop: "64%",
    finalOffset: "14%",
    startTop: "42%",
    rotation: "9deg",
    delay: 200,
  },
];

const WhoItsFor = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden px-5 py-20"
    >
      {/* ── Floating cards ── */}
      {floatingCards.map((card) => {
        const isLeft = card.side === "left";

        /**
         * BEFORE trigger (center state):
         *   - All cards sit at center-ish using left: 50% + translateX(-50%)
         *   - Slight vertical offset per card so they're not all exactly stacked
         *   - No rotation (rotate(0deg)) so they look clean while centered
         *
         * AFTER trigger (spread state):
         *   - Left cards: left = finalOffset, transform = rotate(rotation)
         *   - Right cards: right = finalOffset, transform = rotate(rotation)
         *   - top transitions from startTop → finalTop
         */
        const cardStyle: React.CSSProperties = triggered
          ? {
              // SPREAD OUT — final side positions
              top: card.finalTop,
              [isLeft ? "left" : "right"]: card.finalOffset,
              transform: `rotate(${card.rotation})`,
              opacity: 1,
              transitionDelay: `${card.delay}ms`,
            }
          : {
              // CENTER — all clustered in the middle
              top: card.startTop,
              left: "50%",
              transform: "translateX(-50%) rotate(0deg)",
              opacity: 0.85,
              transitionDelay: "0ms",
            };

        return (
          <div
            key={card.id}
            aria-hidden="true"
            style={cardStyle}
            className={[
              "absolute",
              "w-20 h-20",
              "bg-white",
              "rounded-[20px]",
              "flex items-center justify-center",
              "shadow-[0_4px_20px_rgba(0,0,0,0.07),0_1px_4px_rgba(0,0,0,0.05)]",
              "will-change-[transform,opacity,top,left,right]",
              "transition-[transform,opacity,top,left,right]",
              "duration-[1500ms]",
              "ease-[cubic-bezier(0.34,1.56,0.64,1)]", // spring-like overshoot
              "max-[480px]:hidden",
              "max-[768px]:w-16 max-[768px]:h-16",
            ].join(" ")}
          >
            {card.icon}
          </div>
        );
      })}

      {/* ── Center content ── */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-[800px] w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-1.5 mb-6 shadow-sm">
          <span className="w-[7px] h-[7px] rounded-xl bg-cyan-400 animate-pulse shrink-0" />
          <span className="text-xs font-semibold text-cyan-400 tracking-wide">
            Who It's For
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-semibold text-[#2d3748] leading-[1.15] tracking-tighter mb-7 text-[clamp(36px,6vw,64px)]">
          Built for HR Operations
          <br />
          &amp; Shared Services
          <br />
          Leaders
        </h2>

        {/* Bullet list */}
        <ul className="flex flex-wrap justify-center gap-x-7 gap-y-2 p-0 m-0 mb-9 list-none">
          {[
            "CHRO",
            "VP HR Operations",
            "Head of Shared Services",
            "CIO / IT Leaders",
          ].map((label) => (
            <li
              key={label}
              className="flex items-center gap-2 text-sm text-slate-500 font-semibold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0 inline-block" />
              {label}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className="relative px-6 py-2 bg-black rounded-full shadow-[0_8px_15px_rgba(0,0,0,0.35)] cursor-pointer transition text-white overflow-hidden">
          {/* Top Gradient Overlay */}
          <span className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-full text-white pointer-events-none"></span>
          Close Strong
        </button>
      </div>
    </section>
  );
};

export default WhoItsFor;
