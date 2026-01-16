import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BrainCircuit, Flag, Flame, Star, Lock, Clock, Trophy, Map, Box, Search, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

export const LearningHub = () => {
    const { user } = useGame();
    const [showDailyModal, setShowDailyModal] = useState(false);

    const getDailyChallengeLink = () => {
        if (user.dailyChallenge && user.dailyChallenge.module) {
            return `/puzzle/${user.dailyChallenge.module}/${user.dailyChallenge.level}`;
        }
        return '#';
    };

    const modules = [
        {
            title: "The Predictor Hub",
            icon: BrainCircuit,
            color: "text-cyan-400",
            bg: "bg-cyan-500",
            gradient: "from-cyan-500",
            desc: "Master the art of pattern recognition.",
            link: "/hub/patterns",
            progress: user.progress.patterns,
            status: "IN PROGRESS"
        },
        {
            title: "The 3D Mind",
            icon: Box,
            color: "text-purple-400",
            bg: "bg-purple-500",
            gradient: "from-purple-500",
            desc: "Master mental rotation and visualization.",
            link: "/hub/spatial",
            progress: user.progress.spatial,
            status: "UNLOCKED"
        },
        {
            title: "The Detective Lab",
            icon: Search,
            color: "text-pink-400",
            bg: "bg-pink-500",
            gradient: "from-pink-500",
            desc: "Solve mysteries using pure logic.",
            link: "/hub/logic",
            progress: user.progress.logic,
            status: "UNLOCKED"
        },
        {
            title: "The Map-Maker",
            icon: Map,
            color: "text-green-400",
            bg: "bg-green-500",
            gradient: "from-green-500",
            desc: "Navigate like a true explorer.",
            link: "/hub/directions",
            progress: user.progress.directions,
            status: "UNLOCKED"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Hero Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="md:col-span-2">
                    <Card className="from-slate-800 to-slate-900 bg-gradient-to-br border-slate-700 h-full flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] group-hover:bg-cyan-500/20 transition-all" />
                        <h1 className="text-2xl md:text-3xl font-black mb-2 relative z-10">Welcome back, {user.name}!</h1>
                        <p className="text-slate-400 mb-6 relative z-10 text-sm md:text-base">You have {user.coins} Logic Coins. Keep going!</p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 relative z-10">
                            <Link to="/hub/patterns" className="w-full sm:w-auto">
                                <Button className="shadow-lg shadow-cyan-500/20 w-full sm:w-auto">Resume Training</Button>
                            </Link>
                            <Button 
                                variant="secondary" 
                                onClick={() => setShowDailyModal(true)}
                                className={`w-full sm:w-auto ${user.dailyChallenge?.completed ? "bg-green-500/20 border-green-500/50" : ""}`}
                            >
                                <Calendar className="w-4 h-4 mr-2" />
                                <span className="hidden sm:inline">{user.dailyChallenge?.completed ? "Challenge Complete!" : "View Daily Challenge"}</span>
                                <span className="sm:hidden">{user.dailyChallenge?.completed ? "Complete!" : "Daily Challenge"}</span>
                            </Button>
                        </div>
                    </Card>
                </motion.div>

                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                    <Card className="h-full flex flex-col justify-center items-center text-center border-slate-700 bg-slate-800/50">
                        <div className="bg-orange-500/20 p-4 rounded-full mb-4 animate-pulse">
                            <Flame className="w-8 h-8 text-orange-500" />
                        </div>
                        <h3 className="text-4xl font-black text-white mb-1">{user.streak}</h3>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Day Streak</p>
                    </Card>
                </motion.div>
            </div>

            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <BrainCircuit className="w-8 h-8 text-cyan-400" />
                    Training Modules
                </h2>
                <span className="text-slate-400 text-sm">Level {user.level} Thinker</span>
            </div>

            {/* Modules Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {modules.map((item, i) => (
                    <Link to={item.link} key={i}>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                            <Card className={`h-full border-slate-800 bg-slate-800/40 group cursor-pointer relative overflow-hidden`}>
                                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />

                                <div className="flex justify-between items-start mb-6">
                                    <div className={`${item.bg}/20 p-4 rounded-2xl ${item.color} group-hover:${item.bg} group-hover:text-white transition-all shadow-lg shadow-${item.bg}/10`}>
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 border border-green-500/20">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        {item.status}
                                    </span>
                                </div>

                                <h3 className={`text-2xl font-bold mb-2 text-white group-hover:${item.color} transition-colors`}>{item.title}</h3>
                                <p className="text-slate-400 mb-8 max-w-sm">{item.desc}</p>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-slate-500 group-hover:text-slate-300">
                                        <span>PROGRESS</span>
                                        <span>{item.progress}%</span>
                                    </div>
                                    <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.progress}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className={`bg-gradient-to-r ${item.gradient} to-blue-500 h-full rounded-full`}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Daily Challenge Modal */}
            <AnimatePresence>
                {showDailyModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowDailyModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/50 rounded-2xl p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(6,182,212,0.3)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-full shadow-lg animate-pulse">
                                    <Trophy className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            
                            <h2 className="text-3xl font-black text-center mb-2 mt-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Daily Challenge
                            </h2>
                            
                            {user.dailyChallenge?.completed ? (
                                <div className="text-center">
                                    <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 mb-4">
                                        <p className="text-green-400 text-lg font-bold mb-2">🎉 Challenge Complete!</p>
                                        <p className="text-slate-300 text-sm">Come back tomorrow for a new challenge!</p>
                                    </div>
                                    <Button onClick={() => setShowDailyModal(false)} className="w-full">Close</Button>
                                </div>
                            ) : (
                                <>
                                    <p className="text-slate-300 text-center mb-6">
                                        Complete today's special puzzle to earn bonus rewards!
                                    </p>
                                    
                                    <div className="bg-slate-800/50 rounded-xl p-4 mb-6 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 text-sm">Module:</span>
                                            <span className="text-white font-bold capitalize">{user.dailyChallenge?.module || 'Loading...'}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-400 text-sm">Level:</span>
                                            <span className="text-white font-bold">#{user.dailyChallenge?.level || '?'}</span>
                                        </div>
                                        <div className="border-t border-slate-700 pt-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-yellow-400 text-sm font-bold">Bonus Rewards:</span>
                                                <span className="text-yellow-400 font-bold">+250 XP, +100 Coins</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <Button 
                                            variant="secondary" 
                                            onClick={() => setShowDailyModal(false)}
                                            className="flex-1"
                                        >
                                            Later
                                        </Button>
                                        <Link to={getDailyChallengeLink()} className="flex-1">
                                            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600">
                                                Start Challenge
                                            </Button>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
