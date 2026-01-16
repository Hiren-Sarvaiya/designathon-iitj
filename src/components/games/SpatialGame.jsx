import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const SpatialGame = ({ onComplete }) => {
    // 3D Rotation Game: Match the rotated view
    const [selected, setSelected] = useState(null);

    const handleSelect = (idx) => {
        setSelected(idx);
        if (idx === 2) { // Assume index 2 is correct
            onComplete(true);
        } else {
            onComplete(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <h3 className="text-xl text-slate-300">If you rotate this shape 90° clockwise, what does it look like?</h3>
            <div className="p-8 bg-slate-800 rounded-xl relative perspective-1000">
                {/* Main Shape (Simplified Representation) */}
                <motion.div
                    animate={{ rotate: 90 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
                    className="w-32 h-32 border-4 border-purple-500 relative"
                >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-purple-500/50" />
                </motion.div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {[0, 1, 2, 3].map(i => (
                    <Button key={i} onClick={() => handleSelect(i)} className="w-24 h-24 flex items-center justify-center bg-slate-800 hover:bg-slate-700 p-4">
                        {/* Wrong Options and 1 Correct Option (2) */}
                        <div className={`w-12 h-12 border-2 border-purple-400 relative ${i === 2 ? 'rotate-90' : i === 1 ? '-rotate-90' : i === 0 ? 'rotate-180' : ''}`}>
                            <div className="absolute top-0 right-0 w-6 h-6 bg-purple-400" />
                            <div className="absolute bottom-0 left-0 w-6 h-6 bg-purple-400/50" />
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
};
