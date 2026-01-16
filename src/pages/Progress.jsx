import React from 'react';
import { Card } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

export const Progress = () => {
    const { user } = useGame();

    // Skill data mapping
    const skills = [
        { name: 'Pattern Recognition', value: user.progress.patterns, gradient: 'from-cyan-500 to-blue-500' },
        { name: 'Spatial Reasoning', value: user.progress.spatial, gradient: 'from-purple-500 to-pink-500' },
        { name: 'Logical Syllogisms', value: user.progress.logic, gradient: 'from-pink-500 to-rose-500' },
        { name: 'Direction Sense', value: user.progress.directions, gradient: 'from-green-500 to-emerald-500' },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Your Progress</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <h3 className="mb-6 text-xl font-bold flex items-center gap-2"> Weekly Activity <span className="text-xs font-normal text-slate-500 ml-auto">Last 7 Days</span></h3>
                    <div className="h-64 flex items-end gap-4 justify-between px-2 pb-4 border-b border-slate-800">
                        {/* Mock activity data for chart - could store in context later */}
                        {[40, 65, 30, 85, 50, 95, 75].map((h, i) => (
                            <div key={i} className="w-full flex flex-col justify-end group h-full">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-lg opacity-70 group-hover:opacity-100 transition-opacity relative"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h}
                                    </div>
                                </motion.div>
                                <span className="text-xs text-center mt-2 text-slate-500">
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card>
                    <h3 className="mb-6 text-xl font-bold">Skill Mastery</h3>
                    <div className="space-y-6">
                        {skills.map((skill, i) => (
                            <div key={skill.name}>
                                <div className="flex justify-between text-sm mb-2 font-medium text-slate-300">
                                    <span>{skill.name}</span>
                                    <span className="text-cyan-400">{skill.value}%</span>
                                </div>
                                <div className="h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.value}%` }}
                                        transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                                        className={`h-full bg-gradient-to-r ${skill.gradient}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};
