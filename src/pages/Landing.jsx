import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrainCircuit, Cpu, Box, Search, Map, ChevronRight, Lock, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Landing = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <div className="relative overflow-hidden">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-16">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center max-w-5xl mx-auto"
                >
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                        className="inline-block mb-6 relative"
                    >
                        <BrainCircuit className="w-32 h-32 md:w-48 md:h-48 text-cyan-400 drop-shadow-[0_0_50px_rgba(34,211,238,0.6)]" />
                        <div className="absolute inset-0 bg-cyan-400/20 blur-[60px] -z-10 rounded-full" />
                    </motion.div>

                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-6 leading-[0.9]">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                            LOGIC-LAB
                        </span>
                    </h1>

                    <p className="text-xl md:text-3xl text-slate-300 font-medium mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                        Where <span className="text-cyan-400 font-bold border-b-4 border-cyan-400/30">10-Year-Olds</span> Out-Think Adults.
                        <br />
                        <span className="text-base md:text-xl text-slate-400 mt-4 block">
                            Master logic, patterns, and spatial reasoning through gamified visual puzzles.
                        </span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link to="/hub">
                            <Button className="text-xl px-12 py-6 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_80px_rgba(6,182,212,0.7)] group">
                                Start Your Logic Journey
                                <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Button variant="secondary" className="text-xl px-10 py-6 rounded-2xl bg-white/5 border-white/10 hover:bg-white/10">
                            Watch Demo
                        </Button>
                    </div>
                </motion.div>

                {/* Parallax Elements */}
                <motion.div style={{ y: y1 }} className="absolute top-20 left-10 opacity-20 text-cyan-800 pointer-events-none">
                    <Box className="w-32 h-32 rotate-12" />
                </motion.div>
                <motion.div style={{ y: y2 }} className="absolute bottom-40 right-10 opacity-20 text-purple-800 pointer-events-none">
                    <Cpu className="w-48 h-48 -rotate-12" />
                </motion.div>
            </section>

            {/* Problem Statement */}
            <section className="py-24 px-4 bg-slate-900/50 backdrop-blur-sm relative z-10 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Lock, title: "Rote Learning", desc: "Old systems teach memory, not thinking." },
                            { icon: Search, title: "Fragmented Resources", desc: "Hard to find quality material in one place." },
                            { icon: Zap, title: "Curiosity Killed", desc: "Rigid curriculums bore young brilliant minds." }
                        ].map((item, i) => (
                            <Card key={i} delay={i * 0.2} className="text-center group hover:bg-slate-800/80 transition-colors border-slate-700/50 py-10">
                                <div className="bg-slate-800 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all duration-300">
                                    <item.icon className="w-10 h-10 text-slate-400 group-hover:text-cyan-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-slate-100">{item.title}</h3>
                                <p className="text-slate-400 text-lg">{item.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Four Pillars */}
            <section className="py-32 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl md:text-6xl font-black text-center mb-20 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
                        The Four Pillars of Logic
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 px-4">
                        {[
                            { title: "The Predictor Hub", desc: "Crack the code in visual sequences", icon: Cpu, color: "from-cyan-500 to-blue-500", link: "/hub/patterns", available: true },
                            { title: "The 3D Mind", desc: "Master mental rotation and visualization", icon: Box, color: "from-purple-500 to-pink-500", link: "/hub/spatial", available: true },
                            { title: "The Detective Lab", desc: "Solve mysteries using pure logic", icon: Search, color: "from-pink-500 to-rose-500", link: "/hub/logic", available: true },
                            { title: "The Map-Maker", desc: "Navigate like a true explorer", icon: Map, color: "from-green-500 to-emerald-500", link: "/hub/directions", available: true },
                        ].map((item, i) => (
                            <Link to={item.link} key={i} className={item.available ? "" : "pointer-events-none opacity-60 grayscale-[0.5]"}>
                                <motion.div
                                    whileHover={item.available ? { scale: 1.02 } : {}}
                                    className="relative group overflow-hidden rounded-3xl h-96 cursor-pointer border border-white/5"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-900/40 backdrop-blur-sm group-hover:bg-slate-900/20 transition-all">
                                        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-8 shadow-2xl skew-x-3 group-hover:skew-x-0 transition-transform duration-500`}>
                                            <item.icon className="w-12 h-12 text-white" />
                                        </div>
                                        <h3 className="text-4xl font-black mb-3">{item.title}</h3>
                                        <p className="text-xl text-slate-300 font-medium group-hover:text-white transition-colors max-w-md">
                                            {item.desc}
                                        </p>

                                        {!item.available && (
                                            <div className="absolute top-4 right-4 bg-slate-950/80 px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                                                LOCKED
                                            </div>
                                        )}

                                        <div className="mt-8 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            <Button variant={item.available ? "primary" : "secondary"} className="rounded-full px-8">
                                                {item.available ? "Explore Module" : "Coming Soon"}
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
