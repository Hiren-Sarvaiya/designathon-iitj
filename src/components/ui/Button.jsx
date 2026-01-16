import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export const Button = ({ children, className, variant = 'primary', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer outline-none focus:ring-2 focus:ring-cyan-400/50";

    const variants = {
        primary: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:brightness-110",
        secondary: "bg-slate-800 border-2 border-slate-700 text-slate-200 hover:border-slate-500 hover:text-white hover:bg-slate-700/50",
        glow: "bg-transparent border border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:bg-cyan-500/10",
        ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
        danger: "bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </motion.button>
    );
};
