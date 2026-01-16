import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, Download, PlayCircle, CheckCircle, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../context/ToastContext';
import { soundManager } from '../lib/soundManager';

export const Resources = () => {
    const toast = useToast();
    const [downloading, setDownloading] = useState({});
    const [downloaded, setDownloaded] = useState({});

    const resources = [
        { title: "Logic Basics E-Book", type: "PDF Guide", size: "2.4 MB", color: "blue", desc: "A starter guide to deductive reasoning.", locked: false },
        { title: "Pattern Recognition Templates", type: "Worksheets", size: "15 MB", color: "cyan", desc: "Printable worksheets for offline practice.", locked: false },
        { title: "Spatial Reasoning Drills", type: "Video Course", size: "Unknown", color: "purple", desc: "Video tutorials on mental rotation.", locked: false },
        { title: "Teacher's Guide: Level 1-5", type: "Curriculum", size: "5.1 MB", color: "green", desc: "For educators and classrooms.", locked: true }
    ];

    const handleDownload = (title, idx) => {
        if (downloaded[idx]) {
            toast.info('Already downloaded!', 2000);
            return;
        }

        soundManager.playClick();
        setDownloading(prev => ({ ...prev, [idx]: true }));
        
        // Simulate download process
        setTimeout(() => {
            // Create actual download
            const element = document.createElement("a");
            const file = new Blob([`Logic Lab Resource: ${title}\n\nThank you for downloading!\n\nThis is a sample resource from Logic Lab - your intelligent learning platform.\n\nVisit us for more interactive puzzles and learning materials.`], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = `${title.replace(/\s+/g, '_')}.txt`;
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            
            setDownloading(prev => ({ ...prev, [idx]: false }));
            setDownloaded(prev => ({ ...prev, [idx]: true }));
            soundManager.playSuccess();
            toast.success('Download complete!', 3000);
        }, 1500);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-black mb-4">Learning Resources</h1>
                <p className="text-slate-400 max-w-2xl mx-auto">Download worksheets, guides, and extra practice material to continue your learning offline.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                        <Card className="h-full flex flex-col justify-between border-slate-700 bg-slate-800/40 hover:bg-slate-800/60 transition-colors">
                            <div className="mb-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${item.color}-500/10 text-${item.color}-400`}>
                                    {item.type.includes('Video') ? <PlayCircle /> : <FileText />}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-slate-400 text-sm">{item.desc}</p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                                <div className="text-xs font-bold text-slate-500 uppercase">{item.type} • {item.size}</div>
                                {item.locked ? (
                                    <Button disabled variant="outline" className="border-slate-700 text-slate-500">Locked</Button>
                                ) : downloaded[i] ? (
                                    <Button variant="ghost" className="text-green-400 gap-2 cursor-default">
                                        <CheckCircle className="w-4 h-4" /> Downloaded
                                    </Button>
                                ) : downloading[i] ? (
                                    <Button disabled variant="ghost" className="text-cyan-400 gap-2">
                                        <Loader className="w-4 h-4 animate-spin" /> Downloading...
                                    </Button>
                                ) : (
                                    <Button onClick={() => handleDownload(item.title, i)} variant="ghost" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 gap-2">
                                        <Download className="w-4 h-4" /> Download
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
