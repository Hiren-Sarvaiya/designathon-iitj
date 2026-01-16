import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export const Card = ({ children, className, hover = true, delay = 0, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            whileHover={hover ? { y: -5, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)" } : {}}
            className={cn(
                "bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 relative overflow-hidden",
                "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:pointer-events-none",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};
