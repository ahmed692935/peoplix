import { X, PhoneOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import userImg from "../../assets/images/user_1.png"

interface ActiveCallModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ActiveCallModal = ({ isOpen, onClose }: ActiveCallModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-neutral-900 border border-divider rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col items-center p-12 text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Call ID / Header */}
                        <div className="absolute top-6 left-6 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-xs font-semibold text-text-gray tracking-widest uppercase">Live Demo Call</span>
                        </div>

                        {/* Profile Image / Pulse Animation */}
                        <div className="relative mt-4">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.1, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 bg-primary/20 rounded-full"
                            />
                            <motion.div
                                animate={{
                                    scale: [1, 1.4, 1],
                                    opacity: [0.2, 0, 0.2],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 bg-primary/10 rounded-full"
                            />

                            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary/20 overflow-hidden bg-dark-gray flex items-center justify-center">
                                <img
                                    src={userImg}
                                    loading="lazy"
                                    alt="Calling Agent"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="mt-8 space-y-2">
                            <h3 className="text-2xl md:text-3xl font-bold text-white">Ava - HR Agent</h3>
                            <p className="text-primary font-medium animate-pulse">Calling Ongoing...</p>
                        </div>

                        {/* Controls */}
                        <div className="mt-12 flex items-center gap-6">

                            <button
                                onClick={onClose}
                                className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30 hover:bg-red-700 hover:scale-110 transition-all cursor-pointer"
                            >
                                <PhoneOff className="w-8 h-8" />
                            </button>
                        </div>

                        {/* Footer Hint */}
                        <div className="mt-8 text-[10px] text-text-gray uppercase tracking-widest opacity-50">
                            Powered by Peoplix AI
                        </div>

                        {/* Close button (top right) cross */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 text-text-gray hover:text-white transition-colors cursor-pointer"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ActiveCallModal;
