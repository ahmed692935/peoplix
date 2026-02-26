import { useState } from "react";
import { GoDotFill } from "react-icons/go";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How is Peoplix different from a chatbot?",
    answer:
      "Traditional chatbots deflect questions. Peoplix resolves work. Our autonomous AI agents understand intent, apply HR policy, execute real transactions in systems like Workday, and close requests end-to-end — without creating tickets.",
  },
  {
    question: "Does Peoplix integrate with Workday?",
    answer:
      "Yes. Peoplix integrates directly with Workday and other enterprise systems through secure APIs, enabling real-time data retrieval and transaction execution — not just surface-level responses.",
  },
  {
    question: "What types of HR requests can Peoplix automate?",
    answer:
      "Peoplix automates Tier 1 and Tier 2 HR operations including profile updates, payroll inquiries, PTO balance checks, benefits eligibility, policy interpretation, and workflow-triggered transactions. Complex or exception-based cases are intelligently escalated when required.",
  },
  {
    question: "Is Peoplix secure and compliant?",
    answer:
      "Peoplix is built with enterprise-grade security architecture, including role-based access control, encrypted data handling, full audit trails, and SOC2-ready infrastructure. Every action is logged and traceable.",
  },
  {
    question: "How does Peoplix handle policy changes?",
    answer:
      "HR policies can be configured and updated within the platform. The policy reasoning engine dynamically applies the latest rules to every request, ensuring consistent and compliant outcomes.",
  },
  {
    question: "What happens if the AI cannot resolve a request?",
    answer:
      "If a request requires human review or falls outside defined policy boundaries, Peoplix automatically escalates it to the appropriate HR team with full context, reducing handling time and preserving SLA commitments.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Implementation timelines vary by integration scope and enterprise complexity, but most organizations can deploy initial use cases within weeks — not months.",
  },
  {
    question: "Who is Peoplix built for?",
    answer:
      "Peoplix is designed for CHROs, HR Operations leaders, Shared Services teams, and CIOs seeking measurable automation, cost reduction, and improved employee experience.",
  },
];

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const AccordionItem = ({
  item,
  isOpen,
  onToggle,
  index,
}: AccordionItemProps) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-white/80 overflow-hidden"
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-7 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-[#09090B] leading-snug pr-6">
          {item.question}
        </span>

        {/* Toggle button */}
        <div
          className={`
            shrink-0 w-9 h-9 rounded-full flex items-center justify-center
            transition-all duration-300 ease-out
            ${
              isOpen
                ? "bg-gradient-to-b from-[#61666A] to-[#292C2E] text-white hover:opacity-80 rotate-0 cursor-pointer"
                : "bg-gradient-to-b from-[#61666A] to-[#292C2E] text-white hover:opacity-80 cursor-pointer"
            }
          `}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={`transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : "rotate-0"}`}
          >
            <line
              x1="7"
              y1="1"
              x2="7"
              y2="13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="1"
              y1="7"
              x2="13"
              y2="7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </button>

      {/* Animated answer panel */}
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isOpen ? "400px" : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p className="px-7 pb-6 text-[14px] text-[#09090B] leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center items-center flex flex-col justify-center mb-14">
            <div className="bg-[#F5F5F5] mb-10 px-3 py-1 rounded-lg shadow-[0_6px_12px_rgba(0,0,0,0.35)] flex gap-1 justify-center items-center max-w-[110px]">
              <GoDotFill className="text-[#22D3EE] mt-[2px]" />
              <span className="text-sm text-[#22D3EE] font-semibold">
                FAQ's
              </span>
            </div>

            <h2 className="text-[52px] font-semibold tracking-tighter leading-tight bg-gradient-to-b from-[#61666A] to-[#292C2E] bg-clip-text text-transparent">
              Frequently Asked
              <br />
              Questions
            </h2>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => toggle(index)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
