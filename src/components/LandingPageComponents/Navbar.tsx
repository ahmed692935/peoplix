import { useState } from "react";
import LogoIcon from "../../assets/images/Vector.png";
import LogoText from "../../assets/images/Peoplix.png";

const Navbar = () => {
  const [active, setActive] = useState("Problem");
  const links = ["Problem", "Solution", "Resources", "Company"];

  return (
    <div className="max-w-3xl w-full bg-white shadow-[0_4px_10px_rgba(0,0,0,0.5)] rounded-full">
      <div className="flex items-center justify-between py-2 px-2">
        {/* Left - Logo */}
        <div className="flex items-center gap-2 pl-4">
          <img src={LogoIcon} alt="Logo Icon" className="h-5 cursor-pointer" />
          <img src={LogoText} alt="Logo Text" className="h-5 cursor-pointer" />
        </div>

        {/* Center - Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li
              key={link}
              onClick={() => {
                setActive(link);

                const sectionMap: Record<string, string> = {
                  Problem: "problem",
                  Solution: "solution",
                  Resources: "resources",
                  Company: "company",
                };

                const id = sectionMap[link];
                const element = document.getElementById(id);

                if (element) {
                  element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              }}
              className={`cursor-pointer pb-1 transition-all duration-300 ${
                active === link
                  ? "text-[#1DBED6] border-b-2 font-semibold border-[#1DBED6]"
                  : "text-black font-semibold hover:text-[#1DBED6]"
              }`}
            >
              {link}
            </li>
          ))}
        </ul>

        {/* Right - Button */}
        <button
          className="bg-[#0B1023] text-white px-5 py-2 cursor-pointer rounded-full 
shadow-[0_8px_15px_rgba(0,0,0,0.35)] 
hover:bg-gray-800 transition"
        >
          Book a Demo
        </button>
      </div>
    </div>
  );
};

export default Navbar;
