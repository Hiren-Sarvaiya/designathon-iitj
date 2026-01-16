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
import { useToast } from '../context/ToastContext';
import { soundManager } from '../lib/soundManager';
import { CoinAnimation } from '../components/CoinAnimation';

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
    const toast = useToast();

    const [isCorrect, setIsCorrect] = useState(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [showHintModal, setShowHintModal] = useState(false);
    const [timeLeft, setTimeLeft] = useState(154); // 2:34 in seconds
    const [showCoinAnimation, setShowCoinAnimation] = useState(false);
    const [earnedCoins, setEarnedCoins] = useState(0);

    // Timer Logic
    useEffect(() => {
        if (isCorrect !== null) return; // Stop timer if game over
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsCorrect(false); // Time's up = failure
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

    if (location.pathname.includes('/puzzle/patterns')) {
        GameComponent = PatternGame;
        moduleColor = "cyan";
        moduleKey = "patterns";
        backLink = "/hub/patterns";
    } else if (location.pathname.includes('/puzzle/spatial')) {
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
            soundManager.playSuccess();
            setShowConfetti(true);
            
            const coinsReward = 50;
            const xpReward = 100;
            
            const isFirstTime = completePuzzle(`${moduleKey}-${id}`, xpReward, coinsReward);
            if (isFirstTime) {
                soundManager.playCoin();
                setEarnedCoins(coinsReward);
                setShowCoinAnimation(true);
                
                // Show toast notifications
                setTimeout(() => {
                    toast.coins(coinsReward, 2000);
                }, 500);
                setTimeout(() => {
                    toast.xp(xpReward, 2000);
                }, 700);
                toast.success('Puzzle Complete!', 3000);
            } else {
                toast.info('Already completed!', 2000);
            }
            
            unlockNextLevel(moduleKey, id);
            setTimeout(() => {
                setShowConfetti(false);
                setShowCoinAnimation(false);
            }, 5000);
        } else {
            soundManager.playError();
            toast.error('Not quite right. Try again!', 2000);
        }
    };

    const handleRetry = () => {
        soundManager.playClick();
        setIsCorrect(null);
        setTimeLeft(154); // Reset to 2:34
    };

    const openHintModal = () => {
        soundManager.playClick();
        setShowHintModal(true);
    };

    return (
        <div className="min-h-[90vh] flex flex-col pt-4 pb-8 max-w-6xl mx-auto px-4">
            {showConfetti && <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />}
            {showCoinAnimation && <CoinAnimation amount={earnedCoins} onComplete={() => setShowCoinAnimation(false)} />}

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
                <Link to={backLink}>
                    <Button variant="ghost" className="pl-0 gap-2 hover:bg-transparent hover:text-white text-sm md:text-base">
                        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" /> <span className="hidden sm:inline">Back</span>
                    </Button>
                </Link>
                <div className="text-center flex-1">
                    <h2 className="text-lg md:text-xl font-bold text-slate-200">Lv. {id} Challenge</h2>
                    <div className={cn("flex items-center gap-1 justify-center text-xs font-bold px-2 py-0.5 rounded mt-1", `text-${moduleColor}-400 bg-${moduleColor}-500/10`)}>
                        <span className="uppercase">HARD</span>
                    </div>
                </div>
                <div className="flex gap-2 md:gap-4 w-full md:w-auto">
                    <div className={cn("bg-slate-800 px-3 md:px-4 py-2 rounded-xl border border-slate-700 font-mono flex-1 md:flex-none md:min-w-[100px] text-center text-sm md:text-base", `text-${moduleColor}-400`, timeLeft < 10 && "text-red-500 animate-pulse")}>
                        {formatTime(timeLeft)}
                    </div>
                    <Button variant="secondary" className="px-3" onClick={() => setShowHintModal(true)}>
                        <Lightbulb className="w-4 h-4 md:w-5 md:h-5" />
                    </Button>
                </div>
            </div>

            {/* Main Game Area */}
            <div className="flex-1 flex flex-col items-center justify-center gap-8 md:gap-12">
                <Card className="w-full py-8 md:py-16 px-4 md:px-8 flex items-center justify-center bg-slate-800/50 backdrop-blur-xl border-slate-700/50 relative overflow-hidden min-h-[400px] md:min-h-[500px]">
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

            {/* Hint Modal */}
            <AnimatePresence>
                {showHintModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowHintModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className={cn(
                                "bg-slate-900 border rounded-2xl p-8 max-w-md w-full relative",
                                `border-${moduleColor}-500/50`
                            )}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                <div className={cn("bg-gradient-to-r p-3 rounded-full shadow-lg", `from-${moduleColor}-500 to-${moduleColor}-600`)}>
                                    <Lightbulb className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <h3 className={cn("text-2xl font-black mb-4 mt-4 text-center", `text-${moduleColor}-400`)}>Need a Hint?</h3>
                            <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-slate-700">
                                <p className="text-slate-300 text-center">
                                    {moduleKey === 'patterns' && "Look for repeating sequences or alternating patterns. What comes after the established pattern?"}
                                    {moduleKey === 'spatial' && "Visualize the shape rotating in your mind. What changes and what stays the same?"}
                                    {moduleKey === 'logic' && "Break down each statement. If all statements are true, what must logically follow?"}
                                    {moduleKey === 'directions' && "Draw it out mentally or on paper. Track each turn and step carefully."}
                                </p>
                            </div>
                            <Button 
                                onClick={() => setShowHintModal(false)} 
                                className="w-full bg-slate-700 hover:bg-slate-600"
                            >
                                Got it!
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
