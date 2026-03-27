import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import {
  FiMic,
  FiCpu,
  FiFileText,
  FiRefreshCw,
  FiDatabase,
} from "react-icons/fi";

const cards = [
  {
    title: "Voice",
    icon: FiMic,
    content:
      "Employees initiate requests through secure voice or chat interactions — natural, conversational, and authenticated.",
  },
  {
    title: "AI Reasoning",
    icon: FiCpu,
    content:
      "The agent interprets intent, understands context, and determines the appropriate course of action using enterprise-trained intelligence.",
  },
  {
    title: "Policy Engine",
    icon: FiFileText,
    content:
      "HR policies are dynamically applied, evaluated, and validated to ensure compliance and accurate decision-making.",
  },
  {
    title: "Transaction Engine",
    icon: FiRefreshCw,
    content:
      "The agent executes real system actions — creating, updating, or resolving records in real time.",
  },
  {
    title: "HRIS (Workday)",
    icon: FiDatabase,
    content:
      "Transactions are completed directly inside enterprise platforms like Workday, with full auditability and confirmation.",
  },
];

const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        // Measure the card width + the gap (24px for mr-6)
        setCardWidth(cardRef.current.offsetWidth + 24);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const next = () => {
    if (active < cards.length - 1) setActive(active + 1);
  };

  const prev = () => {
    if (active > 0) setActive(active - 1);
  };

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 50; // pixels to trigger slide
    if (info.offset.x < -threshold && active < cards.length - 1) {
      setActive(active + 1);
    } else if (info.offset.x > threshold && active > 0) {
      setActive(active - 1);
    }
  };

  return (
    <div className="py-0 px-4 sm:px-8 lg:pl-32 lg:pr-0 overflow-hidden">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 items-center">
        {/* ── Left Side ── */}
        <div className="lg:pr-6">
          <div className="bg-dark-gray px-3 py-1 rounded-lg border border-divider flex gap-1 items-center max-w-[130px]">
            <GoDotFill className="text-primary mt-[2px]" />
            <span className="text-sm text-primary font-semibold">
              How it Works
            </span>
          </div>

          <h2 className="mt-8 tracking-tighter text-3xl sm:text-5xl lg:text-[64px] lg:leading-[1.1] font-semibold text-white">
            Build for Enterprise Operations
          </h2>

          {/* Arrows + Step Indicator */}
          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={prev}
              disabled={active === 0}
              className={`p-3 rounded-full transition cursor-pointer 
                ${
                  active === 0
                    ? "bg-divider text-text-gray cursor-not-allowed"
                    : "bg-primary text-black hover:scale-110 shadow-lg shadow-primary/20"
                }`}
            >
              <FiArrowLeft />
            </button>

            <button
              onClick={next}
              disabled={active === cards.length - 1}
              className={`p-3 rounded-full transition cursor-pointer
                ${
                  active === cards.length - 1
                    ? "bg-divider text-text-gray cursor-not-allowed"
                    : "bg-primary text-black hover:scale-110 shadow-lg shadow-primary/20"
                }`}
            >
              <FiArrowRight />
            </button>

            <span className="text-sm text-gray-400 font-medium ml-2">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(cards.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Right Side Cards ── */}
        <div className="relative overflow-hidden" ref={containerRef}>
          <motion.div
            drag="x"
            dragConstraints={{
              left: -((cards.length - 1) * cardWidth),
              right: 0,
            }}
            onDragEnd={handleDragEnd}
            animate={{
              x: -(active * cardWidth),
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="flex cursor-grab active:cursor-grabbing"
          >
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  ref={index === 0 ? cardRef : null}
                  className="shrink-0 w-[min(320px,80vw)] sm:w-72 lg:w-80 xl:w-[420px] h-[450px] mr-6 bg-dark-gray border border-divider rounded-3xl p-8 relative"
                >
                  {/* ── Glow Box with Icon ── */}
                  <div className="relative mb-6 w-14 h-14">
                    {/* Dark base */}
                    <div className="absolute inset-0 bg-background rounded-xl border border-divider" />

                    {/* Bottom glow */}
                    <div
                      className="absolute -bottom-4 -left-3 -right-3 h-10 
                  bg-linear-to-t from-primary/50 to-transparent 
                  rounded-2xl blur-xl opacity-90"
                    />

                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <Icon className="text-primary text-xl" />
                    </div>
                  </div>

                  {/* Heading */}
                  <h3 className="text-3xl font-semibold mb-4 text-white">{card.title}</h3>

                  {/* Divider */}
                  <div className="h-px w-full bg-linear-to-r from-transparent via-divider to-transparent mb-4" />

                  {/* Content */}
                  <p className="text-text-gray text-lg">{card.content}</p>

                  {/* Counter */}
                  <div className="absolute bottom-6 right-8 font-semibold text-3xl">
                    <span className="text-text-gray">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-divider">
                      /{String(cards.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Right fade — shows peek of next card */}
          <div className="absolute top-0 right-0 h-full w-16 bg-linear-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
