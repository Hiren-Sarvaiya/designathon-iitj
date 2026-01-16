import React, { useState, useMemo } from 'react';
import { Button } from '../ui/Button';

export const LogicGame = ({ onComplete }) => {
    const [selected, setSelected] = useState(null);

    // Multiple logic puzzle variations - expanded for more variety
    const puzzles = [
        {
            statements: [
                "All Zorks are Blobbles.",
                "No Blobbles can fly."
            ],
            question: "Can any Zorks fly?",
            options: ["Yes", "No", "Maybe"],
            correctAnswer: 1
        },
        {
            statements: [
                "All cats have tails.",
                "Fluffy is a cat."
            ],
            question: "Does Fluffy have a tail?",
            options: ["Yes", "No", "Cannot Determine"],
            correctAnswer: 0
        },
        {
            statements: [
                "Some birds can swim.",
                "All penguins are birds."
            ],
            question: "Can all penguins swim?",
            options: ["Yes", "No", "Cannot Determine"],
            correctAnswer: 2
        },
        {
            statements: [
                "No reptiles have fur.",
                "All snakes are reptiles."
            ],
            question: "Do any snakes have fur?",
            options: ["Yes", "No", "Maybe"],
            correctAnswer: 1
        },
        {
            statements: [
                "All musicians play instruments.",
                "Tom plays the guitar."
            ],
            question: "Is Tom a musician?",
            options: ["Yes", "No", "Cannot Determine"],
            correctAnswer: 2
        },
        {
            statements: [
                "Some robots can talk.",
                "All androids are robots."
            ],
            question: "Can all androids talk?",
            options: ["Yes", "No", "Cannot Determine"],
            correctAnswer: 2
        },
        {
            statements: [
                "No fish can walk.",
                "A shark is a fish."
            ],
            question: "Can a shark walk?",
            options: ["Yes", "No", "Maybe"],
            correctAnswer: 1
        },
        {
            statements: [
                "All triangles have three sides.",
                "This shape has four sides."
            ],
            question: "Is this shape a triangle?",
            options: ["Yes", "No", "Cannot Determine"],
            correctAnswer: 1
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
        <div className="flex flex-col items-center gap-6 md:gap-8 max-w-2xl text-center px-4">
            <h3 className="text-base md:text-xl text-slate-300">Solve the Syllogism</h3>
            <div className="p-4 md:p-8 bg-slate-800 rounded-xl w-full text-left space-y-3 md:space-y-4 font-mono text-sm md:text-lg">
                {currentPuzzle.statements.map((stmt, idx) => (
                    <p key={idx} className="text-pink-400">Statement {idx + 1}: {stmt}</p>
                ))}
                <p className="text-white font-bold border-t border-slate-600 pt-3 md:pt-4">Conclusion: {currentPuzzle.question}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto">
                {currentPuzzle.options.map((option, idx) => (
                    <Button 
                        key={idx}
                        onClick={() => handleSelect(idx)} 
                        className={`w-full sm:w-40 bg-slate-800 hover:bg-slate-700 ${idx === currentPuzzle.correctAnswer ? 'border-2 border-pink-500/20' : ''}`}
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </div>
    );
};
