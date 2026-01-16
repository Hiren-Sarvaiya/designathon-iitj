import React from 'react';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown } from 'lucide-react';
import { cn } from '../lib/utils';

export const Leaderboard = () => {
    const users = [
        { rank: 1, name: "LogicMaster42", score: 5280, level: 8 },
        { rank: 2, name: "BrainyBear", score: 4950, level: 7 },
        { rank: 3, name: "PixelPioneer", score: 4820, level: 7 },
        { rank: 4, name: "CyberNinja", score: 4500, level: 6 },
        { rank: 5, name: "StarGazer", score: 4200, level: 5 },
        { rank: 23, name: "You", score: 1250, level: 3, isUser: true },
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Global Leaderboard</h1>
                <p className="text-slate-400">See how you stack up against other young genuises!</p>
            </div>

            <div className="grid gap-4">
                {users.map((user, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={user.rank}
                    >
                        <Card className={cn(
                            "flex items-center p-4 transition-all hover:scale-[1.01]",
                            user.isUser ? "border-cyan-500 bg-cyan-900/10" : "border-slate-800",
                            user.rank === 1 && "bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/50"
                        )}>
                            <div className="w-12 text-2xl font-bold flex justify-center text-slate-500">
                                {user.rank === 1 ? <Crown className="text-yellow-500 fill-current" /> :
                                    user.rank === 2 ? <Medal className="text-slate-400 fill-current" /> :
                                        user.rank === 3 ? <Medal className="text-amber-700 fill-current" /> :
                                            `#${user.rank}`}
                            </div>
                            <div className="w-12 h-12 bg-slate-700 rounded-full mx-4 overflow-hidden border-2 border-slate-600">
                                <div className={`w-full h-full bg-gradient-to-br ${['from-red-400 to-orange-400', 'from-blue-400 to-cyan-400', 'from-purple-400 to-pink-400'][i % 3]}`} />
                            </div>
                            <div className="flex-1">
                                <h3 className={cn("font-bold text-lg", user.isUser && "text-cyan-400")}>{user.name}</h3>
                                <span className="text-xs text-slate-500 uppercase font-bold">Level {user.level}</span>
                            </div>
                            <div className="text-right">
                                <div className="font-mono text-xl font-bold text-white">{user.score.toLocaleString()}</div>
                                <div className="text-xs text-slate-500">Logic Coins</div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
