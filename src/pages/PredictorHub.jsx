import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BrainCircuit, Star, Lock, Clock, CheckCircle, Play, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export const PredictorHub = () => {
    const [difficulty, setDifficulty] = useState('starter');

    // Mock data generator
    const puzzles = Array.from({ length: 12 }).map((_, i) => {
        let status = 'locked';
        if (i === 0) status = 'unlocked';
        if (i === 1) status = 'completed';
        if (i === 2) status = 'unlocked';

        return {
            id: i + 1,
            difficulty: i < 4 ? 1 : i < 8 ? 2 : 3,
            status: status,
            coins: 25 + (i * 5),
            time: '~2 min'
        };
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <Link to="/hub" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-4 text-sm font-bold uppercase tracking-wider group">
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Learning Hub
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-2 flex items-center gap-4">
                        <span className="bg-cyan-500/20 p-3 rounded-2xl text-cyan-400"><BrainCircuit className="w-10 h-10" /></span>
                        The Predictor Hub
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl">Identify visual patterns and complete sequence logic. Logic coins awarded for first-time solves.</p>
                </div>

                <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                    {['Starter', 'Explorer', 'Genius'].map((level) => (
                        <button
                            key={level}
                            onClick={() => setDifficulty(level.toLowerCase())}
                            className={cn(
                                "px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300",
                                difficulty === level.toLowerCase()
                                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {puzzles.map((puzzle, i) => (
                    <PuzzleCard key={i} puzzle={puzzle} index={i} />
                ))}
            </div>
        </div>
    );
};

const PuzzleCard = ({ puzzle, index }) => {
    const isLocked = puzzle.status === 'locked';
    const isCompleted = puzzle.status === 'completed';
    const isUnlocked = puzzle.status === 'unlocked';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <Link to={isLocked ? '#' : `/puzzle/${puzzle.id}`}>
                <Card className={cn(
                    "h-full group transition-all duration-300 relative overflow-hidden",
                    isLocked ? "opacity-50 grayscale" : "hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] cursor-pointer hover:border-cyan-500/50"
                )}>
                    {/* Background Glow for Unlocked */}
                    {isUnlocked && <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />}

                    <div className="aspect-video bg-slate-950 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                        {/* Thumbnail Visual */}
                        <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            <div className="w-6 h-6 rounded bg-cyan-500/40" />
                            <div className="w-6 h-6 rounded-full bg-purple-500/40" />
                            <div className="w-6 h-6 rounded bg-blue-500/40" />
                            <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold">?</div>
                        </div>

                        {isLocked && (
                            <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center backdrop-blur-[2px]">
                                <Lock className="w-8 h-8 text-slate-600" />
                            </div>
                        )}

                        {isCompleted && (
                            <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center backdrop-blur-[1px]">
                                <div className="bg-green-500 text-white p-2 rounded-full shadow-lg scale-110">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                            </div>
                        )}

                        {isUnlocked && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/40 backdrop-blur-[2px]">
                                <div className="bg-cyan-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                                    <Play className="w-6 h-6 fill-current" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <div className="font-bold text-lg text-slate-200 group-hover:text-cyan-400 transition-colors">Puzzle #{puzzle.id}</div>
                            <div className="text-xs text-slate-500 font-medium">Seq. Recognition</div>
                        </div>
                        <div className="flex text-yellow-500/50 group-hover:text-yellow-500 transition-colors gap-0.5">
                            {Array.from({ length: 3 }).map((_, j) => (
                                <Star key={j} className={cn("w-3 h-3", j < puzzle.difficulty ? "fill-current" : "opacity-20")} />
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-xs font-bold text-slate-500 border-t border-slate-800 pt-3 mt-2">
                        <span className="flex items-center gap-1 group-hover:text-slate-300 transition-colors"><Clock className="w-3 h-3" /> {puzzle.time}</span>
                        <span className="text-cyan-600 group-hover:text-cyan-400 transition-colors bg-cyan-950/30 px-2 py-1 rounded">+{puzzle.coins} coins</span>
                    </div>
                </Card>
            </Link>
        </motion.div>
    );
};
