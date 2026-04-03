import { useState } from "react";
import logo from "../../assets/images/main-logo.webp"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("Problem");
  const links = ["Problem", "Solution", "Resources", "Company", "Demo Call"];
  const navigate = useNavigate();


  return (
    <div className="fixed max-w-3xl w-full bg-dark-gray/80 backdrop-blur-md border border-divider shadow-[0_4px_20px_rgba(0,0,0,0.5)] rounded-full">
      <div className="flex items-center justify-between py-2 px-2">
        {/* Left - Logo */}
        <div className="flex items-center flex-col justify-center pl-4">
          <img src={logo} alt="Logo" loading="lazy" className="h-15 cursor-pointer object-cover" />
        </div>

        {/* Nav links */}
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
                  "Demo Call": "demo-call",
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
                  ? "text-primary border-b-2 font-semibold border-primary"
                  : "text-white font-semibold hover:text-primary"
              }`}
            >
              {link}
            </li>
          ))}
        </ul>

        {/* Login btn */}
        <button
          onClick={() => navigate("/signin")}
          className="bg-primary text-white px-6 py-2 font-bold cursor-pointer rounded-full
            shadow-[0_0_20px_rgba(55,114,255,0.3)] hover:scale-105 transition-transform"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
