import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, Download, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

export const Resources = () => {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="text-4xl font-bold mb-2 text-white">Offline Learning</h1>
                    <p className="text-slate-400">Download high-quality printable worksheets.</p>
                </div>
                <div className="bg-slate-800 p-1 rounded-lg flex gap-1">
                    <Button variant="ghost" className="bg-slate-700 text-white">Worksheets</Button>
                    <Button variant="ghost">Parents Guide</Button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="group cursor-pointer hover:border-cyan-500/50 hover:bg-slate-800/80">
                            <div className="h-56 bg-white rounded-lg mb-4 relative overflow-hidden flex flex-col border border-slate-700">
                                {/* Fake PDF Preview */}
                                <div className="flex-1 bg-slate-100 p-4">
                                    <div className="w-1/2 h-4 bg-slate-300 rounded mb-4" />
                                    <div className="w-3/4 h-2 bg-slate-200 rounded mb-2" />
                                    <div className="w-full h-2 bg-slate-200 rounded mb-2" />
                                    <div className="w-full h-2 bg-slate-200 rounded mb-8" />

                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="aspect-square bg-slate-200 rounded" />
                                        <div className="aspect-square bg-slate-200 rounded" />
                                        <div className="aspect-square bg-slate-200 rounded" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all bg-white/90 p-3 rounded-full shadow-lg">
                                        <Download className="w-6 h-6 text-slate-900" />
                                    </div>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold mb-1 text-slate-100 group-hover:text-cyan-400 transition-colors">Pattern Patterns Vol. {i}</h3>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xs font-bold text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-700">Ages 5-7</span>
                                <span className="text-xs text-slate-500">1.2 MB</span>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
