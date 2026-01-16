import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';

export const Mascot = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const toggleHint = () => setShowHint(!showHint);

    return (
        <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end pointer-events-none">
            {/* Wrapper ensures pointer events only on interactive elements */}
            <div className="pointer-events-auto flex flex-col items-end">
                <AnimatePresence>
                    {(showHint || isHovered) && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: 20 }}
                            className="mb-4 bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl rounded-br-none border border-cyan-400/30 max-w-xs shadow-xl cursor-pointer"
                            onClick={() => setShowHint(false)}
                        >
                            <p className="text-sm font-medium text-cyan-50">
                                {showHint
                                    ? "Try looking at the color sequence! It alternates every two steps."
                                    : "Hi! I'm Robo. Click me if you get stuck!"}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={toggleHint}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    animate={{
                        y: [0, -10, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 4,
                        ease: "easeInOut"
                    }}
                    className="relative group cursor-pointer"
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)] border-2 border-white/20 relative overflow-hidden transition-transform group-hover:scale-110">
                        <Bot className="w-8 h-8 text-white relative z-10" />
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </div>

                    {/* Status Indicator */}
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-slate-900"></span>
                    </span>
                </motion.button>
            </div>
        </div>
    );
};
