import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { ArrowUp, ArrowRight, ArrowDown, ArrowLeft } from 'lucide-react';

export const DirectionGame = ({ onComplete }) => {
    // Pathfinding / Directions
    const handleSelect = (idx) => {
        if (idx === 3) { // West/Left
            onComplete(true);
        } else {
            onComplete(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 text-center max-w-2xl">
            <h3 className="text-xl text-slate-300">Where do you end up?</h3>
            <div className="p-8 bg-slate-800 rounded-xl w-full text-lg font-mono leading-relaxed relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <div className="text-6xl text-green-500">N</div>
                </div>
                <p>Start facing <span className="text-green-400 font-bold">North</span>.</p>
                <p>Turn <span className="text-white font-bold">Right 90°</span>.</p>
                <p>Walk forward 10 steps.</p>
                <p>Turn <span className="text-white font-bold">Right 180°</span>.</p>
                <p>Walk forward 20 steps.</p>
                <p className="mt-4 font-bold border-t border-slate-600 pt-4">Which direction is your starting point from you now?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => handleSelect(0)} className="gap-2"><ArrowUp /> North</Button>
                <Button onClick={() => handleSelect(1)} className="gap-2"><ArrowRight /> East</Button>
                <Button onClick={() => handleSelect(2)} className="gap-2"><ArrowDown /> South</Button>
                <Button onClick={() => handleSelect(3)} className="gap-2"><ArrowLeft /> West</Button>
            </div>
        </div>
    );
};
