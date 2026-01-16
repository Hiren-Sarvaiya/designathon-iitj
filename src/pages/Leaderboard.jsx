import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Trophy, Medal, User, TrendingUp, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

export const Leaderboard = () => {
    const { user } = useGame();
    const [timeframe, setTimeframe] = useState('alltime'); // alltime, weekly, daily
    const [animateScores, setAnimateScores] = useState(false);

    useEffect(() => {
        setAnimateScores(true);
        const timer = setTimeout(() => setAnimateScores(false), 1000);
        return () => clearTimeout(timer);
    }, [timeframe]);

    const generateLeaderboard = () => {
        const baseLeaders = [
            { rank: 1, name: "LogicMaster_99", score: 15400, level: 12, streak: 45, avatar: "🧠" },
            { rank: 2, name: "BrainWave", score: 14200, level: 11, streak: 32, avatar: "⚡" },
            { rank: 3, name: "PixelPioneer", score: 13800, level: 10, streak: 28, avatar: "🎮" },
            { rank: 4, name: "NeuralNet", score: 8900, level: 8, streak: 15, avatar: "🤖" },
            { rank: 5, name: "CognitiveAce", score: 7600, level: 7, streak: 12, avatar: "🎯" },
            { rank: 6, name: "PuzzlePro_X", score: 6800, level: 6, streak: 10, avatar: "🧩" },
            { rank: 7, name: "MindBender", score: 5900, level: 6, streak: 8, avatar: "🌀" },
            { rank: 8, name: "LogicNinja", score: 5200, level: 5, streak: 7, avatar: "🥷" },
        ];

        const userScore = user.coins * 10 + user.xp;
        const userRank = baseLeaders.findIndex(leader => userScore > leader.score);
        const finalRank = userRank === -1 ? baseLeaders.length + 1 : userRank + 1;

        const leaderboard = [...baseLeaders];
        if (userRank !== -1) {
            leaderboard.splice(userRank, 0, {
                rank: finalRank,
                name: user.name,
                score: userScore,
                level: user.level,
                streak: user.streak,
                isUser: true,
                avatar: "👤"
            });
            // Update ranks
            leaderboard.forEach((leader, idx) => {
                leader.rank = idx + 1;
            });
        } else {
            leaderboard.push({
                rank: finalRank,
                name: user.name,
                score: userScore,
                level: user.level,
                streak: user.streak,
                isUser: true,
                avatar: "👤"
            });
        }

        return leaderboard.slice(0, 10);
    };

    const leaderboard = generateLeaderboard();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    Global Rankings
                </h1>
                <p className="text-slate-400">Compete with young geniuses from around the world!</p>
                
                {/* Timeframe Selector */}
                <div className="flex justify-center gap-2 mt-6 bg-slate-900/50 p-1 rounded-xl inline-flex">
                    {[
                        { key: 'daily', label: 'Today', icon: Clock },
                        { key: 'weekly', label: 'This Week', icon: TrendingUp },
                        { key: 'alltime', label: 'All Time', icon: Trophy }
                    ].map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => setTimeframe(key)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${
                                timeframe === key
                                    ? 'bg-cyan-500 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            <Icon className="w-4 h-4" />
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                {leaderboard.map((player, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <Card className={`flex items-center p-4 relative overflow-hidden ${
                            player.isUser 
                                ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800/70 transition-all'
                        }`}>
                            {player.isUser && (
                                <motion.div 
                                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent"
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                />
                            )}
                            
                            <div className="w-16 text-center font-black text-2xl relative z-10">
                                {player.rank <= 3 ? (
                                    <motion.div
                                        animate={animateScores ? { scale: [1, 1.2, 1], rotate: [0, 10, 0] } : {}}
                                    >
                                        <Medal className={`w-10 h-10 mx-auto ${
                                            player.rank === 1 ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]' : 
                                            player.rank === 2 ? 'text-slate-300 drop-shadow-[0_0_10px_rgba(226,232,240,0.6)]' : 
                                            'text-amber-600 drop-shadow-[0_0_10px_rgba(217,119,6,0.6)]'
                                        }`} />
                                    </motion.div>
                                ) : (
                                    <span className="text-slate-500">#{player.rank}</span>
                                )}
                            </div>
                            
                            <div className="text-4xl mr-4">{player.avatar}</div>
                            
                            <div className="flex-1 px-4 relative z-10">
                                <div className={`font-bold text-lg flex items-center gap-2 ${player.isUser ? 'text-cyan-400' : 'text-white'}`}>
                                    {player.name}
                                    {player.isUser && <span className="text-xs bg-cyan-500 text-white px-2 py-0.5 rounded-full">YOU</span>}
                                </div>
                                <div className="flex items-center gap-4 text-xs mt-1">
                                    <span className="text-slate-500 font-bold uppercase tracking-wider">Level {player.level}</span>
                                    <span className="text-orange-400 font-bold flex items-center gap-1">
                                        🔥 {player.streak} Day Streak
                                    </span>
                                </div>
                            </div>
                            
                            <div className="text-right relative z-10">
                                <motion.div 
                                    className="font-mono text-2xl font-black text-white"
                                    animate={animateScores ? { scale: [1, 1.1, 1] } : {}}
                                >
                                    {player.score.toLocaleString()}
                                </motion.div>
                                <div className="text-xs text-slate-500 font-bold">SCORE</div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
