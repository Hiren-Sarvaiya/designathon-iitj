import React from 'react';
import { Card } from '../components/ui/Card';
import { Trophy, Medal, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

export const Leaderboard = () => {
    const { user } = useGame();

    const leaderboard = [
        { rank: 1, name: "LogicMaster_99", score: 15400, level: 12 },
        { rank: 2, name: "BrainWave", score: 14200, level: 11 },
        { rank: 3, name: "PixelPioneer", score: 13800, level: 10 },
        { rank: 4, name: "NeuralNet", score: 8900, level: 8 },
        { rank: 5, name: "CognitiveAce", score: 7600, level: 7 },
        { rank: 9, name: user.name, score: user.coins * 10, level: user.level, isUser: true }, // Simulate Score based on coins
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
                    <Trophy className="w-10 h-10 text-yellow-500" />
                    Global Rankings
                </h1>
                <p className="text-slate-400">Compete with young geniuses from around the world!</p>
            </div>

            <div className="space-y-4">
                {leaderboard.map((player, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className={`flex items-center p-4 ${player.isUser ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]' : 'bg-slate-800/50 border-slate-700'}`}>
                            <div className="w-12 text-center font-black text-2xl text-slate-500">
                                {player.rank <= 3 ? <Medal className={`w-8 h-8 mx-auto ${player.rank === 1 ? 'text-yellow-400' : player.rank === 2 ? 'text-slate-300' : 'text-amber-600'}`} /> : `#${player.rank}`}
                            </div>
                            <div className="flex-1 px-6">
                                <div className={`font-bold text-lg ${player.isUser ? 'text-cyan-400' : 'text-white'}`}>{player.name}</div>
                                <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Level {player.level}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-mono text-xl font-bold text-white">{player.score.toLocaleString()}</div>
                                <div className="text-xs text-slate-500">Logic Coins</div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
