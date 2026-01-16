import React, { useState } from 'react';
import { Button } from '../ui/Button';

export const LogicGame = ({ onComplete }) => {
    // Logic Syllogism Game
    const [selected, setSelected] = useState(null);

    const handleSelect = (idx) => {
        setSelected(idx); // 1 is true
        if (idx === 1) {
            onComplete(true);
        } else {
            onComplete(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 max-w-2xl text-center">
            <h3 className="text-xl text-slate-300">Solve the Syllogism</h3>
            <div className="p-8 bg-slate-800 rounded-xl w-full text-left space-y-4 font-mono text-lg">
                <p className="text-pink-400">Statement 1: All Zorks are Blobbles.</p>
                <p className="text-pink-400">Statement 2: No Blobbles can fly.</p>
                <p className="text-white font-bold border-t border-slate-600 pt-4">Conclusion: Can any Zorks fly?</p>
            </div>
            <div className="flex gap-4">
                <Button onClick={() => handleSelect(0)} className="w-32 bg-slate-800 hover:bg-slate-700">Yes</Button>
                <Button onClick={() => handleSelect(1)} className="w-32 bg-slate-800 hover:bg-slate-700 border-2 border-pink-500/20">No</Button>
                <Button onClick={() => handleSelect(2)} className="w-32 bg-slate-800 hover:bg-slate-700">Maybe</Button>
            </div>
        </div>
    );
};
