import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit, Menu, X, Coins, Volume2, VolumeX, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { soundManager } from '../lib/soundManager';

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const [soundEnabled, setSoundEnabled] = useState(() => soundManager.isEnabled());
    const [showHelpModal, setShowHelpModal] = useState(false);
    const { user } = useGame();

    // Persist sound preference and sync with sound manager
    const toggleSound = () => {
        const newValue = soundManager.toggle();
        setSoundEnabled(newValue);
        soundManager.playClick(); // Test sound
    };

    const navLinks = [
        { name: 'Learning Hub', path: '/hub' },
        { name: 'My Progress', path: '/progress' },
        { name: 'Leaderboard', path: '/leaderboard' },
        { name: 'Resources', path: '/resources' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <BrainCircuit className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                            <div className="absolute inset-0 bg-cyan-400/20 blur-lg rounded-full group-hover:bg-cyan-400/40 transition-all opacity-0 group-hover:opacity-100" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            LOGIC-LAB
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={cn(
                                    "text-sm font-bold uppercase tracking-wide transition-colors relative py-1",
                                    isActive(link.path) ? "text-cyan-400" : "text-slate-400 hover:text-white"
                                )}
                            >
                                {link.name}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-full border border-slate-700/50 hover:border-slate-600 transition-colors">
                            <Coins className="w-4 h-4 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                            <span className="font-bold text-yellow-400">{user.coins.toLocaleString()}</span>
                        </div>

                        <button
                            onClick={toggleSound}
                            className="p-2 text-slate-400 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
                            title={soundEnabled ? "Mute sounds" : "Enable sounds"}
                        >
                            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                        </button>

                        <button 
                            onClick={() => setShowHelpModal(true)}
                            className="p-2 text-slate-400 hover:text-cyan-400 transition-colors hover:bg-white/5 rounded-lg"
                            title="Help & Guide"
                        >
                            <HelpCircle className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "block text-lg font-bold py-2 border-b border-white/5",
                                        isActive(link.path) ? "text-cyan-400" : "text-slate-400"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Coins className="w-5 h-5 text-yellow-400" />
                                    <span className="font-bold text-yellow-400">{user.coins.toLocaleString()} Coins</span>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={toggleSound}>
                                        {soundEnabled ? <Volume2 className="w-6 h-6 text-slate-400" /> : <VolumeX className="w-6 h-6 text-slate-400" />}
                                    </button>
                                    <button onClick={() => setShowHelpModal(true)}>
                                        <HelpCircle className="w-6 h-6 text-slate-400" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Help Modal */}
            <AnimatePresence>
                {showHelpModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowHelpModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-black text-cyan-400">How to Play</h2>
                                <button onClick={() => setShowHelpModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>
                            <div className="space-y-6 text-slate-300">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">🎯 Objective</h3>
                                    <p>Complete puzzles across four different modules to improve your logical reasoning skills. Earn coins, unlock new levels, and climb the leaderboard!</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">🎮 Game Modules</h3>
                                    <ul className="space-y-2 ml-4">
                                        <li><strong className="text-cyan-400">Pattern Recognition:</strong> Identify sequences and predict what comes next</li>
                                        <li><strong className="text-purple-400">Spatial Reasoning:</strong> Rotate shapes mentally and visualize 3D objects</li>
                                        <li><strong className="text-pink-400">Logic Puzzles:</strong> Solve syllogisms and deductive reasoning challenges</li>
                                        <li><strong className="text-green-400">Direction Sense:</strong> Navigate paths using compass directions</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">💰 Coins & Progress</h3>
                                    <p>Earn coins by completing puzzles. Your progress is automatically saved. Complete puzzles to unlock the next level in each module!</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">⏱️ Tips</h3>
                                    <ul className="space-y-1 ml-4">
                                        <li>• Take your time - there's no penalty for thinking!</li>
                                        <li>• Use the Robo mascot for hints if you get stuck</li>
                                        <li>• Practice daily to maintain your streak</li>
                                        <li>• Challenge yourself with harder difficulties</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
