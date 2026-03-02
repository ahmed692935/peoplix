import { GoDotFill } from "react-icons/go";
import Problem from "../../assets/images/Black.png";
import Problem1 from "../../assets/images/v1.png";
import Problem2 from "../../assets/images/v2.png";
import Problem3 from "../../assets/images/v3.png";
import Problem4 from "../../assets/images/v4.png";
import { motion } from "framer-motion";

const TheProblem = () => {
  const problems = [
    { img: Problem1, text: "HR service desks drowning in repetitive tickets" },
    { img: Problem2, text: "Slow response times hurting employee experience" },
    { img: Problem3, text: "High cost per case" },
    { img: Problem4, text: "Burnout across HR operations teams" },
  ];

  return (
    <div className="flex flex-col items-center mt-12 md:mt-20 px-4 mb-20">
      {/* Header Badge */}
      <div className="bg-[#F5F5F5] px-3 py-1 rounded-lg shadow-[0_6px_12px_rgba(0,0,0,0.35)] flex gap-1 items-center">
        <GoDotFill className="text-[#22D3EE]" />
        <span className="text-sm text-[#22D3EE] font-semibold">
          The Problem
        </span>
      </div>

      {/* Title */}
      <div className="text-[#292C2E] tracking-tighter text-2xl sm:text-4xl lg:text-[65px] lg:leading-[4rem] font-semibold flex flex-col items-center mt-5 text-center">
        <span>Enterprise Service Teams</span>
        <span>Are Overwhelmed</span>
      </div>

      {/* Main Section */}
      <div className="relative w-full max-w-5xl flex justify-center">
        {/* Top Fade */}
        {/* <div className="absolute -top-10 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" /> */}
        {/* White Top Fade Shadow */}
        <div
          className="absolute -top-10 md:-top-20 left-0 w-full sm:h-20
    bg-gradient-to-t from-white to-transparent
    z-20 pointer-events-none"
        ></div>
        {/* "The Pain" badge */}
        <div className="absolute top-5 sm:top-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 text-sm text-white py-1 px-3 rounded-full border border-gray-500 bg-transparent whitespace-nowrap">
          <GoDotFill className="text-[#22D3EE]" />
          The Pain
        </div>

        {/* Background Image */}
        <img
          src={Problem}
          alt="Problem Background"
          className="relative z-0 h-[650px] sm:w-full object-cover rounded-xl"
        />

        {/* Grid Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="relative w-[85%] sm:w-[75%] md:w-[65%] grid sm:grid-cols-2 grid-rows-2 gap-4 sm:gap-6 md:gap-10">
            {/* Horizontal Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute hidden sm:block top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent -translate-y-1/2 pointer-events-none"
            />

            {/* Vertical Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="hidden sm:block absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-gray-400 to-transparent -translate-x-1/2 pointer-events-none"
            />

            {problems.map((p, idx) => (
              <motion.div
                key={idx}
                className="p-2 sm:p-4 flex flex-col items-center justify-center bg-transparent rounded-lg text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-md border-t-gray-500 border-t-[3px] p-2 sm:p-4 mb-2 flex items-center justify-center">
                  {/* <img
                    src={p.img}
                    alt={p.text}
                    className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
                  /> */}
                  {/* 🔥 ROTATING IMAGE */}
                  <motion.img
                    src={p.img}
                    alt={p.text}
                    className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"
                    initial={{ rotate: 0 }}
                    whileInView={{ rotate: 360 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    viewport={{ once: false, amount: 0.6 }}
                  />
                </div>
                <span className="text-center text-[10px] sm:text-xs md:text-sm font-normal leading-snug">
                  {p.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Caption */}
        <div className="absolute bottom-4 sm:bottom-2 lg:bottom-10 left-1/2 -translate-x-1/2 z-30 text-white font-normal text-[10px] sm:text-sm md:text-base max-w-[90%] sm:max-w-sm md:max-w-lg text-center px-2">
          Traditional chatbots and portals haven't solved the problem. They
          deflect questions but they don't resolve work.
        </div>
      </div>
    </div>
  );
};

export default TheProblem;
