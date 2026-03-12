// import { useState } from "react";
// import LogoIcon from "../../assets/images/Vector.png";
// import LogoText from "../../assets/images/Peoplix.png";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [active, setActive] = useState("Problem");
//   const links = ["Problem", "Solution", "Resources", "Company"];
//   const navigate = useNavigate();
//   const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

//   return (
//     <div className="max-w-3xl w-full bg-white shadow-[0_4px_10px_rgba(0,0,0,0.5)] rounded-full">
//       <div className="flex items-center justify-between py-2 px-2">
//         {/* Left - Logo */}
//         <div className="flex items-center gap-2 pl-4">
//           <img src={LogoIcon} alt="Logo Icon" className="h-5 cursor-pointer" />
//           <img src={LogoText} alt="Logo Text" className="h-5 cursor-pointer" />
//         </div>

//         {/* Center - Links */}
//         <ul className="hidden md:flex items-center gap-8">
//           {links.map((link) => (
//             <li
//               key={link}
//               onClick={() => {
//                 setActive(link);

//                 const sectionMap: Record<string, string> = {
//                   Problem: "problem",
//                   Solution: "solution",
//                   Resources: "resources",
//                   Company: "company",
//                 };

//                 const id = sectionMap[link];
//                 const element = document.getElementById(id);

//                 if (element) {
//                   element.scrollIntoView({
//                     behavior: "smooth",
//                     block: "start",
//                   });
//                 }
//               }}
//               className={`cursor-pointer pb-1 transition-all duration-300 ${
//                 active === link
//                   ? "text-[#1DBED6] border-b-2 font-semibold border-[#1DBED6]"
//                   : "text-black font-semibold hover:text-[#1DBED6]"
//               }`}
//             >
//               {link}
//             </li>
//           ))}
//         </ul>

//         {/* Right - Button */}
//         <button
//           onClick={() => {
//             navigate("/signin");
//           }}
//           className="bg-[#0B1023] text-white px-5 py-2 cursor-pointer rounded-full
// shadow-[0_8px_15px_rgba(0,0,0,0.35)]
// hover:bg-gray-800 transition"
//         >
//           {/* Book a Demo */}
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { useState, useEffect, useRef } from "react";
import LogoIcon from "../../assets/images/Vector.png";
import LogoText from "../../assets/images/Peoplix.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("Problem");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storedUser, setStoredUser] = useState<{
    email?: string;
    role?: string;
  }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);
  const links = ["Problem", "Solution", "Resources", "Company"];
  const navigate = useNavigate();

  // ── Check login & token expiry ──
  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const token = localStorage.getItem("token");

        if (!token || !user?.email) {
          handleLogout(false);
          return;
        }

        // JWT expiry check
        const payload = JSON.parse(atob(token.split(".")[1]));
        const isExpired = payload.exp && Date.now() / 1000 > payload.exp;

        if (isExpired) {
          handleLogout(true);
          return;
        }

        setIsLoggedIn(true);
        setStoredUser(user);
      } catch {
        handleLogout(false);
      }
    };

    checkAuth();
  }, []);

  // ── Close dropdown on outside click ──
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = (expired = false) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setStoredUser({});
    if (expired) {
      navigate("/signin", {
        state: { message: "Session expired. Please login again." },
      });
    }
  };

  const handleDashboard = () => {
    const role = storedUser.role?.toLowerCase();
    setDropdownOpen(false);
    if (role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

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

        {/* Right - Auth */}
        {isLoggedIn ? (
          // ── Logged In: Avatar + Dropdown ──
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-2 pr-2 cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-sm font-semibold shadow-md">
                {storedUser.email?.[0].toUpperCase() || "U"}
              </div>
              {/* Email + Role */}
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-gray-800 leading-tight max-w-[120px] truncate">
                  {storedUser.email}
                </p>
                <p className="text-[10px] text-gray-400 capitalize">
                  {storedUser.role}
                </p>
              </div>
              {/* Chevron */}
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-3 w-52 bg-white rounded-2xl border border-gray-100 shadow-xl z-50 overflow-hidden">
                {/* User Info */}
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-800 truncate">
                    {storedUser.email}
                  </p>
                  <p className="text-[10px] text-gray-400 capitalize mt-0.5">
                    {storedUser.role}
                  </p>
                </div>

                {/* Dashboard Link */}
                <button
                  onClick={handleDashboard}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7a1 1 0 011-1h6a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V7zM13 7a1 1 0 011-1h3a1 1 0 011 1v2a1 1 0 01-1 1h-3a1 1 0 01-1-1V7zM13 14a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3zM3 14a1 1 0 011-1h6a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3z"
                    />
                  </svg>
                  Dashboard
                </button>

                {/* Divider */}
                <div className="border-t border-gray-50" />

                {/* Logout */}
                <button
                  onClick={() => handleLogout(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // ── Not Logged In: Login Button ──
          <button
            onClick={() => navigate("/signin")}
            className="bg-[#0B1023] text-white px-5 py-2 cursor-pointer rounded-full
              shadow-[0_8px_15px_rgba(0,0,0,0.35)] hover:bg-gray-800 transition"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
