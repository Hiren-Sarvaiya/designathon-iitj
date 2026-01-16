import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const SpatialGame = ({ onComplete }) => {
    // 3D Rotation Game: Match the rotated view
    const [selected, setSelected] = useState(null);

    // Multiple spatial puzzle variations
    const puzzles = [
        {
            rotation: 90,
            correctAnswer: 2,
            mainColor: 'purple',
            shapeType: 'L-shape'
        },
        {
            rotation: 180,
            correctAnswer: 1,
            mainColor: 'blue',
            shapeType: 'T-shape'
        },
        {
            rotation: 270,
            correctAnswer: 3,
            mainColor: 'green',
            shapeType: 'Z-shape'
        },
        {
            rotation: 90,
            correctAnswer: 0,
            mainColor: 'red',
            shapeType: 'corner'
        },
        {
            rotation: 180,
            correctAnswer: 2,
            mainColor: 'cyan',
            shapeType: 'step'
        }
    ];

    // Select random puzzle each time component mounts
    const currentPuzzle = useState(() => {
        return puzzles[Math.floor(Math.random() * puzzles.length)];
    })[0];

    const handleSelect = (idx) => {
        setSelected(idx);
        if (idx === currentPuzzle.correctAnswer) {
            onComplete(true);
        } else {
            onComplete(false);
        }
    };

    const colorMap = {
        purple: { border: 'border-purple-500', bg: 'bg-purple-500', bgLight: 'bg-purple-500/50', borderLight: 'border-purple-400', bgOption: 'bg-purple-400', bgOptionLight: 'bg-purple-400/50' },
        blue: { border: 'border-blue-500', bg: 'bg-blue-500', bgLight: 'bg-blue-500/50', borderLight: 'border-blue-400', bgOption: 'bg-blue-400', bgOptionLight: 'bg-blue-400/50' },
        green: { border: 'border-green-500', bg: 'bg-green-500', bgLight: 'bg-green-500/50', borderLight: 'border-green-400', bgOption: 'bg-green-400', bgOptionLight: 'bg-green-400/50' },
        red: { border: 'border-red-500', bg: 'bg-red-500', bgLight: 'bg-red-500/50', borderLight: 'border-red-400', bgOption: 'bg-red-400', bgOptionLight: 'bg-red-400/50' },
        cyan: { border: 'border-cyan-500', bg: 'bg-cyan-500', bgLight: 'bg-cyan-500/50', borderLight: 'border-cyan-400', bgOption: 'bg-cyan-400', bgOptionLight: 'bg-cyan-400/50' }
    };

    const colors = colorMap[currentPuzzle.mainColor];

    return (
        <div className="flex flex-col items-center gap-6 md:gap-8 px-4">
            <h3 className="text-base md:text-xl text-slate-300 text-center">If you rotate this shape {currentPuzzle.rotation}° clockwise, what does it look like?</h3>
            <div className="p-6 md:p-8 bg-slate-800 rounded-xl relative perspective-1000">
                {/* Main Shape (Simplified Representation) */}
                <motion.div
                    animate={{ rotate: currentPuzzle.rotation }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
                    className={`w-24 h-24 md:w-32 md:h-32 border-4 ${colors.border} relative`}
                >
                    <div className={`absolute top-0 right-0 w-12 h-12 md:w-16 md:h-16 ${colors.bg}`} />
                    <div className={`absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 ${colors.bgLight}`} />
                </motion.div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-md md:max-w-none">
                {[0, 1, 2, 3].map(i => (
                    <Button key={i} onClick={() => handleSelect(i)} className="w-full aspect-square md:w-24 md:h-24 flex items-center justify-center bg-slate-800 hover:bg-slate-700 p-3 md:p-4">
                        {/* Different rotations for options */}
                        <div className={`w-12 h-12 border-2 ${colors.borderLight} relative ${
                            i === currentPuzzle.correctAnswer ? `rotate-${currentPuzzle.rotation === 90 ? '90' : currentPuzzle.rotation === 180 ? '180' : '270'}` :
                            i === 0 && currentPuzzle.correctAnswer !== 0 ? 'rotate-0' :
                            i === 1 && currentPuzzle.correctAnswer !== 1 ? '-rotate-90' :
                            i === 2 && currentPuzzle.correctAnswer !== 2 ? 'rotate-180' :
                            i === 3 && currentPuzzle.correctAnswer !== 3 ? 'rotate-45' : 'rotate-0'
                        }`}>
                            <div className={`absolute top-0 right-0 w-6 h-6 ${colors.bgOption}`} />
                            <div className={`absolute bottom-0 left-0 w-6 h-6 ${colors.bgOptionLight}`} />
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
};
