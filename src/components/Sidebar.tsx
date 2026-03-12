import {
    LayoutDashboard,
    Users,
    X
} from "lucide-react";
import Logo from "../assets/images/Vector.png";
import { Link, useLocation } from "react-router-dom";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Users", path: "/users" },
    { icon: Users, label: "Agents", path: "/agents" },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
    const location = useLocation();

    return (
        <>
            {/* Mobile Overlay / Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            <aside className={`fixed left-0 top-0 h-screen w-64 bg-[#0F172A] text-gray-300 flex flex-col z-40 shadow-xl border-r border-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Brand Logo & Close Button for Mobile */}
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/5">
                            <img src={Logo} alt="Peoplix Logo" className="w-6 h-6 object-contain filter brightness-110" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-wide">Peoplix</span>
                    </div>
                    {/* Close button - visible only on mobile when sidebar is open */}
                    <button 
                        onClick={onClose}
                        className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Groups */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-8 scrollbar-hide">
                    {/* Main Navigation */}
                    <div>
                        <p className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">
                            Main Menu
                        </p>
                        <nav className="space-y-1">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.label}
                                        to={item.path}
                                        onClick={() => {
                                            if (window.innerWidth < 1024) onClose();
                                        }}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                        ${isActive
                                                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                                                : "hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        <item.icon size={20} className={`${isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-white"}`} />
                                        <span className="text-sm font-medium">{item.label}</span>
                                        {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]"></div>}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;