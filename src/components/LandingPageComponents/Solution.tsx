import { useState } from "react";
import { GoDotFill } from "react-icons/go";

const services = [
  {
    id: "01",
    title: "Voice-first AI agents",
    description:
      "Natural, conversational AI agents that handle employee requests through secure voice and chat interactions.",
    tags: [
      "Voice + chat interface",
      "Secure authentication",
      "Natural language understanding",
    ],
  },
  {
    id: "02",
    title: "Policy reasoning engine",
    description:
      "Understands and applies company policies in real-time to give employees accurate, context-aware answers.",
    tags: ["Policy parsing", "Context awareness", "Auto-updates"],
  },
  {
    id: "03",
    title: "Real-time HRIS transactions",
    description:
      "Executes live HR system actions — from leave requests to payroll queries — without human intervention.",
    tags: ["Live sync", "Multi-system support", "Audit trail"],
  },
  {
    id: "04",
    title: "Case orchestration & escalation",
    description:
      "Automatically routes, tracks, and escalates complex cases to the right human at the right time.",
    tags: ["Smart routing", "SLA tracking", "Escalation rules"],
  },
  {
    id: "05",
    title: "Enterprise security & compliance",
    description:
      "Built with enterprise-grade security, role-based access controls, and full compliance reporting.",
    tags: ["SOC 2", "Role-based access", "Compliance logs"],
  },
];

const Solution = () => {
  const [activeId, setActiveId] = useState("01");

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* ───── LEFT – Static Content ───── */}
        <div className="lg:sticky lg:top-20">
          {/* Badge */}
          <div className="bg-dark-gray px-3 py-1 rounded-lg border border-divider flex gap-1 items-center max-w-[110px]">
            <GoDotFill className="text-primary mt-[2px]" />
            <span className="text-sm text-primary font-semibold">
              Solution
            </span>
          </div>

          {/* Heading */}
          <h2
            className="max-w-3xl mt-10 tracking-tighter md:leading-[1.1] text-3xl lg:text-[72px] font-semibold
text-white pb-4"
          >
            Meet Autonomous AI Agents
          </h2>

          {/* Description */}
          <p className="mt-6 text-text-gray text-base lg:text-lg leading-relaxed lg:max-w-md">
            Peoplix agents don't just answer questions. They understand, decide,
            and act — resolving employee requests end-to-end without human
            involvement.
          </p>
        </div>

        {/* ───── RIGHT – Accordion ───── */}
        <div className="flex flex-col gap-3">
          {services.map((service) => {
            const isActive = activeId === service.id;

            return (
              <div
                key={service.id}
                onClick={() => setActiveId(service.id)}
                className={`cursor-pointer rounded-2xl transition-all duration-500 overflow-hidden
                  ${isActive
                    ? "relative text-white shadow-xl border border-primary/30"
                    : "bg-dark-gray text-text-gray hover:bg-divider border border-transparent"
                  }`}
              >
                {isActive && (
                  <>
                    {/* Background Gradient & Glow */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
                      style={{
                        background: "#080808",
                      }}
                    >
                      {/* Radial glow effect */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "radial-gradient(circle at 20% 0%, rgba(55,114,255,0.1) 0%, transparent 70%)"
                        }}
                      />
                    </div>
                  </>
                )}
                {/* Header Row */}
                <div className="relative z-10 flex items-center justify-between px-6 py-5">
                  <h3
                    className={`text-lg sm:text-2xl font-semibold tracking-tight transition-colors duration-300
                      ${isActive ? "text-primary" : "text-text-gray"}`}
                  >
                    {service.title}
                  </h3>
                  <span className="text-sm font-light text-gray-400">
                    ({service.id})
                  </span>
                </div>

                {/* Expanded Content */}
                <div
                  className={`transition-all duration-500 ease-in-out
                    ${isActive ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="relative z-10 px-6 pb-6">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-5">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-1.5 rounded-full border border-divider text-text-gray text-xs sm:text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Solution;
