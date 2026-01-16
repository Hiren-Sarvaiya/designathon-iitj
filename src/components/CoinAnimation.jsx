import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins } from 'lucide-react';

export const CoinAnimation = ({ amount, onComplete }) => {
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        // Generate multiple coin particles
        const numCoins = Math.min(amount / 10, 10); // Max 10 coins
        const newCoins = Array.from({ length: Math.ceil(numCoins) }, (_, i) => ({
            id: i,
            delay: i * 0.1,
            x: Math.random() * 200 - 100,
            y: Math.random() * 100 - 50
        }));
        setCoins(newCoins);

        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 2000);

        return () => clearTimeout(timer);
    }, [amount, onComplete]);

    return (
        <div className="fixed inset-0 z-[280] pointer-events-none flex items-center justify-center">
            <AnimatePresence>
                {coins.map((coin) => (
                    <motion.div
                        key={coin.id}
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 0],
                            scale: [0, 1.5, 1, 0.5],
                            x: coin.x,
                            y: [0, coin.y, -100],
                            rotate: [0, 360, 720]
                        }}
                        transition={{
                            duration: 1.5,
                            delay: coin.delay,
                            ease: "easeOut"
                        }}
                        className="absolute"
                    >
                        <Coins className="w-8 h-8 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                    </motion.div>
                ))}
            </AnimatePresence>
            
            {/* Amount Display */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="text-6xl font-black text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]"
            >
                +{amount}
            </motion.div>
        </div>
    );
};
