import React, { useState, useMemo } from 'react';
import { Button } from '../ui/Button';
import { ArrowUp, ArrowRight, ArrowDown, ArrowLeft } from 'lucide-react';

export const DirectionGame = ({ onComplete }) => {
    // Multiple direction puzzle variations - expanded for more variety
    const puzzles = [
        {
            instructions: [
                "Start facing North.",
                "Turn Right 90°.",
                "Walk forward 10 steps.",
                "Turn Right 180°.",
                "Walk forward 20 steps."
            ],
            question: "Which direction is your starting point from you now?",
            correctAnswer: 3 // West
        },
        {
            instructions: [
                "Start facing South.",
                "Turn Left 90°.",
                "Walk forward 5 steps.",
                "Turn Right 90°.",
                "Walk forward 5 steps."
            ],
            question: "Which direction are you facing now?",
            correctAnswer: 2 // South
        },
        {
            instructions: [
                "Start facing East.",
                "Turn Left 180°.",
                "Walk forward 10 steps.",
                "Turn Right 90°."
            ],
            question: "Which direction are you facing now?",
            correctAnswer: 2 // South
        },
        {
            instructions: [
                "Start facing West.",
                "Turn Right 90°.",
                "Walk 8 steps.",
                "Turn Left 90°.",
                "Walk 8 steps."
            ],
            question: "Which direction are you facing now?",
            correctAnswer: 3 // West
        },
        {
            instructions: [
                "Start facing North.",
                "Turn Left 90°.",
                "Walk forward 6 steps.",
                "Turn Right 90°.",
                "Walk forward 6 steps."
            ],
            question: "Which direction are you facing now?",
            correctAnswer: 0 // North
        },
        {
            instructions: [
                "Start facing South.",
                "Turn Right 180°.",
                "Walk forward 12 steps.",
                "Turn Left 90°."
            ],
            question: "Which direction are you facing now?",
            correctAnswer: 1 // East
        },
        {
            instructions: [
                "Start facing East.",
                "Turn Right 90°.",
                "Walk 10 steps.",
                "Turn Right 90°.",
                "Walk 10 steps."
            ],
            question: "Which direction are you facing now?",
            correctAnswer: 3 // West
        }
    ];

    // Select random puzzle
    const currentPuzzle = useMemo(() => {
        return puzzles[Math.floor(Math.random() * puzzles.length)];
    }, [puzzles]);

    const handleSelect = (idx) => {
        if (idx === currentPuzzle.correctAnswer) {
            onComplete(true);
        } else {
            onComplete(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-6 md:gap-8 text-center max-w-2xl px-4">
            <h3 className="text-base md:text-xl text-slate-300">Navigate the Path</h3>
            <div className="p-4 md:p-8 bg-slate-800 rounded-xl w-full text-sm md:text-lg font-mono leading-relaxed relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 md:p-4 opacity-10">
                    <div className="text-4xl md:text-6xl text-green-500">N</div>
                </div>
                {currentPuzzle.instructions.map((instruction, idx) => (
                    <p key={idx} className={idx === 0 ? "text-green-400 font-bold" : ""}>
                        {instruction.includes("facing") ? (
                            <>
                                {instruction.split("facing")[0]}
                                <span className="text-green-400 font-bold">
                                    facing {instruction.split("facing")[1]}
                                </span>
                            </>
                        ) : instruction.includes("Turn") || instruction.includes("Right") || instruction.includes("Left") ? (
                            <span className="text-white font-bold">{instruction}</span>
                        ) : (
                            instruction
                        )}
                    </p>
                ))}
                <p className="mt-3 md:mt-4 font-bold border-t border-slate-600 pt-3 md:pt-4">{currentPuzzle.question}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-md">
                <Button onClick={() => handleSelect(0)} className="gap-2"><ArrowUp className="w-4 h-4" /> <span className="hidden sm:inline">North</span><span className="sm:hidden">N</span></Button>
                <Button onClick={() => handleSelect(1)} className="gap-2"><ArrowRight className="w-4 h-4" /> <span className="hidden sm:inline">East</span><span className="sm:hidden">E</span></Button>
                <Button onClick={() => handleSelect(2)} className="gap-2"><ArrowDown className="w-4 h-4" /> <span className="hidden sm:inline">South</span><span className="sm:hidden">S</span></Button>
                <Button onClick={() => handleSelect(3)} className="gap-2"><ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">West</span><span className="sm:hidden">W</span></Button>
            </div>
        </div>
    );
};
