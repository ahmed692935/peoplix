import Bg from "../../assets/images/HeroBG.png";
import Navbar from "./Navbar";
import Star from "../../assets/images/star.png";
import { FaArrowDownLong } from "react-icons/fa6";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const fullText = "Enterprise Operations";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === fullText.length) {
        clearInterval(interval); // stop once complete
      }
    }, 100); // 100ms per letter
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[95vh]">
      {/* Background Image */}
      <img src={Bg} alt="Hero Background" className="w-full h-full" />

      {/* Navbar (Image ke upar) */}
      <div className="absolute top-5 left-0 w-full flex justify-center z-20">
        <Navbar />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 mt-5">
        {/* Small Text */}
        <div
          className="bg-[#F5F5F5] px-3 py-1 rounded-lg 
shadow-[0_6px_12px_rgba(0,0,0,0.35)] flex gap-1"
        >
          <img src={Star} className="w-4 h-4 mt-[2px]" />
          <span className="text-sm text-[#22D3EE] font-semibold">
            Now integrated with Workday
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-[96px] tracking-tighter leading-12 font-semibold text-[#43484D] mt-10">
          Autonomous AI Agents for
        </h1>
        <h1
          className="text-3xl md:text-[96px] font-semibold tracking-tighter mt-4 
bg-gradient-to-b from-[#00454F] to-[#22D3EE] 
bg-clip-text text-transparent"
        >
          {/* Enterprise Operations */}
          {typedText}
        </h1>

        {/* Paragraph */}
        <p className="mt-4 max-w-2xl text-sm md:text-sm text-[#09090B]">
          Peoplix deploys intelligent AI agents that resolve employee and
          operational
          <br />
          requests end-to-end using voice, reasoning, and real system
          transactions.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="relative px-6 py-2 bg-black rounded-full shadow-[0_8px_15px_rgba(0,0,0,0.35)] cursor-pointer transition overflow-hidden">
            {/* Top Gradient Overlay */}
            <span className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-full pointer-events-none"></span>
            Book a Demo
          </button>
          <button
            className="px-6 py-2 cursor-pointer border border-white bg-white text-black rounded-full shadow-[0_8px_15px_rgba(0,0,0,0.35)] 
hover:bg-gray-100 transition"
          >
            Watch 2-min Overview
          </button>
        </div>

        <p className="absolute gap-2 flex bottom-5 md:bottom-3 left-1/2 -translate-x-1/2 text-black font-semibold text-[11px] md:text-base">
          Scroll for more{" "}
          <span className=" p-1 flex items-center justify-center">
            <FaArrowDownLong className="text-[#22D3EE] text-lg mt-1 animate-bounce" />
          </span>
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
