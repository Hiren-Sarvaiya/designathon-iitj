import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const PatternGame = ({ onComplete }) => {
    // Current state, only 1 level for demo
    const [selected, setSelected] = useState(null);

    const handleSelect = (idx) => {
        setSelected(idx);
        if (idx === 0) { // Assume index 0 is correct
            onComplete(true);
        } else {
            onComplete(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8">
            <h3 className="text-xl text-slate-300">Which shape comes next?</h3>
            <div className="flex gap-4 p-8 bg-slate-800 rounded-xl">
                <div className="w-16 h-16 bg-blue-500 rounded-full" />
                <div className="w-16 h-16 bg-red-500 rounded-none transform rotate-45" />
                <div className="w-16 h-16 bg-green-500 rounded-full" />
                <div className="w-16 h-16 bg-yellow-500 rounded-none transform rotate-45" />
                <div className="w-16 h-16 border-4 border-dashed border-slate-600 rounded-2xl flex items-center justify-center text-4xl">?</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {[0, 1, 2, 3].map(i => (
                    <Button key={i} onClick={() => handleSelect(i)} className="w-24 h-24 flex items-center justify-center bg-slate-800 hover:bg-slate-700">
                        {i === 0 ? <div className="w-12 h-12 bg-blue-500 rounded-full" /> :
                            i === 1 ? <div className="w-12 h-12 bg-red-500 rounded-none" /> :
                                i === 2 ? <div className="w-12 h-12 bg-green-500 rounded-full" /> :
                                    <div className="w-12 h-12 bg-yellow-500 rounded-none" />}
                    </Button>
                ))}
            </div>
        </div>
    );
};
