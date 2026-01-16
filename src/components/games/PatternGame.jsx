import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const PatternGame = ({ onComplete }) => {
    const [selected, setSelected] = useState(null);

    // Multiple puzzle variations - expanded for more variety
    const puzzles = [
        {
            sequence: [
                { color: 'bg-blue-500', shape: 'rounded-full' },
                { color: 'bg-red-500', shape: 'rounded-none rotate-45' },
                { color: 'bg-blue-500', shape: 'rounded-full' },
                { color: 'bg-red-500', shape: 'rounded-none rotate-45' }
            ],
            correctAnswer: 0,
            options: [
                { color: 'bg-blue-500', shape: 'rounded-full' },
                { color: 'bg-red-500', shape: 'rounded-none' },
                { color: 'bg-green-500', shape: 'rounded-full' },
                { color: 'bg-yellow-500', shape: 'rounded-none' }
            ]
        },
        {
            sequence: [
                { color: 'bg-green-500', shape: 'rounded-full' },
                { color: 'bg-green-500', shape: 'rounded-full' },
                { color: 'bg-purple-500', shape: 'rounded-none' },
                { color: 'bg-green-500', shape: 'rounded-full' }
            ],
            correctAnswer: 1,
            options: [
                { color: 'bg-purple-500', shape: 'rounded-none' },
                { color: 'bg-green-500', shape: 'rounded-full' },
                { color: 'bg-blue-500', shape: 'rounded-full' },
                { color: 'bg-yellow-500', shape: 'rounded-full' }
            ]
        },
        {
            sequence: [
                { color: 'bg-yellow-500', shape: 'rounded-lg' },
                { color: 'bg-pink-500', shape: 'rounded-full' },
                { color: 'bg-cyan-500', shape: 'rounded-lg' },
                { color: 'bg-yellow-500', shape: 'rounded-lg' }
            ],
            correctAnswer: 2,
            options: [
                { color: 'bg-yellow-500', shape: 'rounded-lg' },
                { color: 'bg-cyan-500', shape: 'rounded-full' },
                { color: 'bg-pink-500', shape: 'rounded-full' },
                { color: 'bg-blue-500', shape: 'rounded-lg' }
            ]
        },
        {
            sequence: [
                { color: 'bg-orange-500', shape: 'rounded-none' },
                { color: 'bg-teal-500', shape: 'rounded-none' },
                { color: 'bg-orange-500', shape: 'rounded-none' },
                { color: 'bg-teal-500', shape: 'rounded-none' }
            ],
            correctAnswer: 0,
            options: [
                { color: 'bg-orange-500', shape: 'rounded-none' },
                { color: 'bg-teal-500', shape: 'rounded-full' },
                { color: 'bg-purple-500', shape: 'rounded-none' },
                { color: 'bg-red-500', shape: 'rounded-none' }
            ]
        },
        {
            sequence: [
                { color: 'bg-indigo-500', shape: 'rounded-full' },
                { color: 'bg-indigo-500', shape: 'rounded-lg' },
                { color: 'bg-indigo-500', shape: 'rounded-none' },
                { color: 'bg-indigo-500', shape: 'rounded-full' }
            ],
            correctAnswer: 1,
            options: [
                { color: 'bg-indigo-500', shape: 'rounded-full' },
                { color: 'bg-indigo-500', shape: 'rounded-lg' },
                { color: 'bg-blue-500', shape: 'rounded-lg' },
                { color: 'bg-indigo-500', shape: 'rounded-none rotate-45' }
            ]
        },
        {
            sequence: [
                { color: 'bg-rose-500', shape: 'rounded-lg' },
                { color: 'bg-amber-500', shape: 'rounded-full' },
                { color: 'bg-emerald-500', shape: 'rounded-none' },
                { color: 'bg-rose-500', shape: 'rounded-lg' }
            ],
            correctAnswer: 3,
            options: [
                { color: 'bg-rose-500', shape: 'rounded-none' },
                { color: 'bg-emerald-500', shape: 'rounded-full' },
                { color: 'bg-rose-500', shape: 'rounded-lg' },
                { color: 'bg-amber-500', shape: 'rounded-full' }
            ]
        }
    ];

    // Select random puzzle each time component mounts (no useMemo caching)
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

    return (
        <div className="flex flex-col items-center gap-6 md:gap-8">
            <h3 className="text-base md:text-xl text-slate-300 text-center px-4">Which shape comes next in the pattern?</h3>
            <div className="flex gap-2 md:gap-4 p-4 md:p-8 bg-slate-800 rounded-xl overflow-x-auto max-w-full">
                {currentPuzzle.sequence.map((item, idx) => (
                    <div key={idx} className={`w-12 h-12 md:w-16 md:h-16 flex-shrink-0 ${item.color} ${item.shape}`} />
                ))}
                <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 border-4 border-dashed border-slate-600 rounded-2xl flex items-center justify-center text-2xl md:text-4xl">?</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-md md:max-w-none px-4">
                {currentPuzzle.options.map((item, i) => (
                    <Button 
                        key={i} 
                        onClick={() => handleSelect(i)} 
                        className="w-full aspect-square md:w-24 md:h-24 flex items-center justify-center bg-slate-800 hover:bg-slate-700"
                    >
                        <div className={`w-10 h-10 md:w-12 md:h-12 ${item.color} ${item.shape}`} />
                    </Button>
                ))}
            </div>
        </div>
    );
};
