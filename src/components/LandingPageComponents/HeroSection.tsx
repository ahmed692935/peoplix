import Navbar from "./Navbar";
import { GoDotFill } from "react-icons/go";
import { FaArrowDownLong } from "react-icons/fa6";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const fullText = "Enterprise Operations";
  const [typedText, setTypedText] = useState("");

  // useEffect(() => {
  //   let currentIndex = 0;
  //   const interval = setInterval(() => {
  //     setTypedText(fullText.slice(0, currentIndex + 1));
  //     currentIndex++;
  //     if (currentIndex === fullText.length) {
  //       clearInterval(interval); // stop once complete
  //     }
  //   }, 100); // 100ms per letter
  //   return () => clearInterval(interval);
  // }, []);
  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;

    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseAfterTyping = 1000;

    const interval = setInterval(() => {
      if (!isDeleting) {
        // Typing forward
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;

        if (currentIndex === fullText.length) {
          isDeleting = true;
          clearInterval(interval);

          setTimeout(() => {
            startDeleting();
          }, pauseAfterTyping);
        }
      }
    }, typingSpeed);

    const startDeleting = () => {
      const deleteInterval = setInterval(() => {
        setTypedText(fullText.slice(0, currentIndex - 1));
        currentIndex--;

        if (currentIndex === 1) {
          clearInterval(deleteInterval);
          isDeleting = false;
          startTyping();
        }
      }, deletingSpeed);
    };

    const startTyping = () => {
      const typeInterval = setInterval(() => {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;

        if (currentIndex === fullText.length) {
          clearInterval(typeInterval);
          isDeleting = true;
          setTimeout(() => {
            startDeleting();
          }, pauseAfterTyping);
        }
      }, typingSpeed);
    };

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[95vh] bg-background overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full"></div>

      {/* Navbar (Image ke upar) */}
      <div className="absolute top-5 left-0 w-full flex justify-center z-20">
        <Navbar />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 mt-5">
        {/* Small Text */}
        <div
          className="bg-dark-gray px-3 py-1 rounded-lg 
border border-divider flex gap-1 items-center"
        >
          <GoDotFill className="text-primary" />
          <span className="text-sm text-primary font-semibold">
            Now integrated with Workday
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-[96px] tracking-tighter leading-tight font-semibold text-white mt-10">
          Autonomous AI Agents for
        </h1>
        <h1
          className="text-3xl md:text-[96px] font-semibold tracking-tighter mt-4 
text-primary"
        >
          {/* Enterprise Operations */}
          {typedText}
        </h1>

        {/* Paragraph */}
        <p className="mt-4 max-w-2xl text-sm md:text-lg text-text-gray">
          Peoplix deploys intelligent AI agents that resolve employee and
          operational
          <br />
          requests end-to-end using voice, reasoning, and real system
          transactions.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="relative px-8 py-3 bg-primary text-black font-bold rounded-full shadow-[0_0_20px_rgba(222,243,22,0.3)] cursor-pointer hover:scale-105 transition-transform">
            Book a Demo
          </button>
          <button className="px-8 py-3 cursor-pointer border border-divider bg-dark-gray text-white rounded-full hover:bg-divider transition">
            Watch 2-min Overview
          </button>
        </div>

        <p className="absolute gap-2 flex bottom-5 md:bottom-3 left-1/2 -translate-x-1/2 text-text-gray font-medium text-[11px] md:text-sm">
          Scroll for more{" "}
          <span className=" p-1 flex items-center justify-center">
            <FaArrowDownLong className="text-primary text-lg mt-1 animate-bounce" />
          </span>
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
