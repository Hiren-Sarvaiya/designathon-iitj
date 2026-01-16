import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ArrowLeft, Lightbulb, CheckCircle, XCircle, ChevronRight, RotateCcw } from 'lucide-react';
import Confetti from 'react-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import useWindowSize from '../hooks/useWindowSize';
import { useGame } from '../context/GameContext';

// Game Components
import { PatternGame } from '../components/games/PatternGame';
import { SpatialGame } from '../components/games/SpatialGame';
import { LogicGame } from '../components/games/LogicGame';
import { DirectionGame } from '../components/games/DirectionGame';

export const PuzzleInterface = () => {
    const { id } = useParams();
    const location = useLocation();
    const { width, height } = useWindowSize();
    const { completePuzzle, unlockNextLevel } = useGame();

    const [isCorrect, setIsCorrect] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showHintModal, setShowHintModal] = useState(false);
    const [timeLeft, setTimeLeft] = useState(154); // 2:34 in seconds

    // Timer Logic
    useEffect(() => {
        if (isCorrect !== null) return; // Stop timer if game over
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isCorrect]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Determine Game Type based on URL structure
    let GameComponent = PatternGame;
    let moduleColor = "cyan";
    let moduleKey = "patterns";
    let backLink = "/hub/patterns";

    if (location.pathname.includes('/puzzle/spatial')) {
        GameComponent = SpatialGame;
        moduleColor = "purple";
        moduleKey = "spatial";
        backLink = "/hub/spatial";
    } else if (location.pathname.includes('/puzzle/logic')) {
        GameComponent = LogicGame;
        moduleColor = "pink";
        moduleKey = "logic";
        backLink = "/hub/logic";
    } else if (location.pathname.includes('/puzzle/directions')) {
        GameComponent = DirectionGame;
        moduleColor = "green";
        moduleKey = "directions";
        backLink = "/hub/directions";
    }

    const handleComplete = (success) => {
        setIsCorrect(success);
        if (success) {
            setShowConfetti(true);
            completePuzzle(`${moduleKey}-${id}`, 100, 50); // Add rewards
            unlockNextLevel(moduleKey, id); // Unlock next level
            setTimeout(() => setShowConfetti(false), 5000);
        }
    };

    const handleRetry = () => {
        setIsCorrect(null);
    };

    return (
        <div className="min-h-[90vh] flex flex-col pt-4 pb-8 max-w-6xl mx-auto px-4">
            {showConfetti && <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />}

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <Link to={backLink}>
                    <Button variant="ghost" className="pl-0 gap-2 hover:bg-transparent hover:text-white">
                        <ArrowLeft className="w-5 h-5" /> Back
                    </Button>
                </Link>
                <div className="text-center">
                    <h2 className="text-xl font-bold text-slate-200">Lv. {id} Challenge</h2>
                    <div className={cn("flex items-center gap-1 justify-center text-xs font-bold px-2 py-0.5 rounded", `text-${moduleColor}-400 bg-${moduleColor}-500/10`)}>
                        <span className="uppercase">HARD</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className={cn("bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 font-mono min-w-[100px] text-center", `text-${moduleColor}-400`, timeLeft < 10 && "text-red-500 animate-pulse")}>
                        {formatTime(timeLeft)}
                    </div>
                    <Button variant="secondary" className="px-3" onClick={() => setShowHintModal(true)}>
                        <Lightbulb className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Main Game Area */}
            <div className="flex-1 flex flex-col items-center justify-center gap-12">
                <Card className="w-full py-16 px-8 flex items-center justify-center bg-slate-800/50 backdrop-blur-xl border-slate-700/50 relative overflow-hidden min-h-[500px]">
                    {/* Dynamic Game Component */}
                    <AnimatePresence mode="wait">
                        {isCorrect === null ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                                <GameComponent onComplete={handleComplete} />
                            </motion.div>
                        ) : isCorrect === true ? (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-full max-w-lg mx-auto bg-green-500/10 border border-green-500/30 rounded-2xl p-8 flex flex-col items-center gap-6 backdrop-blur-md text-center"
                            >
                                <div className="bg-green-500 rounded-full p-4 text-white shadow-lg shadow-green-500/20 mb-2">
                                    <CheckCircle className="w-12 h-12" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-green-400 mb-2">Genius Level!</h4>
                                    <p className="text-slate-300">You earned +50 Logic Coins and +100 XP.</p>
                                </div>
                                <div className="flex w-full gap-4 mt-4">
                                    <Link to={backLink} className="flex-1">
                                        <Button className="bg-slate-700 hover:bg-slate-600 border-none text-white w-full">Menu</Button>
                                    </Link>
                                    <Link to={backLink} className="flex-1">
                                        <Button className="bg-green-600 hover:bg-green-500 border-none text-white w-full">Next <ChevronRight className="w-4 h-4 ml-1" /></Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ shake: 0 }}
                                animate={{ x: [-10, 10, -10, 10, 0] }}
                                className="w-full max-w-lg mx-auto bg-red-500/10 border border-red-500/30 rounded-2xl p-8 flex flex-col items-center gap-6 backdrop-blur-md text-center"
                            >
                                <div className="bg-red-500 rounded-full p-4 text-white shadow-lg shadow-red-500/20 mb-2">
                                    <XCircle className="w-12 h-12" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-red-400 mb-2">Not Quite...</h4>
                                    <p className="text-slate-300">That wasn't the correct logic. Review the pattern and try again!</p>
                                </div>
                                <Button onClick={handleRetry} className="w-full bg-slate-700 hover:bg-slate-600">
                                    <RotateCcw className="w-4 h-4 mr-2" /> Try Again
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>
            </div>
        </div>
    );
};
