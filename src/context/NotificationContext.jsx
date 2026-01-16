import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles } from 'lucide-react';
import Confetti from 'react-confetti';
import useWindowSize from '../hooks/useWindowSize';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);
    const { width, height } = useWindowSize();

    const showLevelUp = (newLevel) => {
        setNotification({ type: 'levelUp', level: newLevel });
        setTimeout(() => setNotification(null), 4000);
    };

    const showUnlock = (moduleName) => {
        setNotification({ type: 'unlock', module: moduleName });
        setTimeout(() => setNotification(null), 3000);
    };

    const showAchievement = (title, description) => {
        setNotification({ type: 'achievement', title, description });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <NotificationContext.Provider value={{ showLevelUp, showUnlock, showAchievement }}>
            {children}
            
            {/* Notification Overlay */}
            <AnimatePresence>
                {notification && (
                    <>
                        {notification.type === 'levelUp' && (
                            <>
                                <Confetti 
                                    width={width} 
                                    height={height} 
                                    numberOfPieces={150}
                                    recycle={false}
                                    gravity={0.3}
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
                                >
                                    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-12 rounded-3xl shadow-2xl text-center border-4 border-yellow-300">
                                        <motion.div
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="inline-block mb-4"
                                        >
                                            <Trophy className="w-20 h-20 text-white" />
                                        </motion.div>
                                        <h2 className="text-5xl font-black text-white mb-2">LEVEL UP!</h2>
                                        <p className="text-2xl font-bold text-yellow-100">You're now Level {notification.level}</p>
                                    </div>
                                </motion.div>
                            </>
                        )}

                        {notification.type === 'unlock' && (
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] pointer-events-none"
                            >
                                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border-2 border-cyan-300">
                                    <Sparkles className="w-8 h-8 text-white" />
                                    <div>
                                        <p className="text-white font-bold text-lg">New Level Unlocked!</p>
                                        <p className="text-cyan-100 text-sm">{notification.module}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {notification.type === 'achievement' && (
                            <motion.div
                                initial={{ opacity: 0, x: 300 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 300 }}
                                className="fixed bottom-8 right-8 z-[200] pointer-events-none"
                            >
                                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4 rounded-xl shadow-2xl border-2 border-purple-300 max-w-sm">
                                    <div className="flex items-start gap-3">
                                        <Trophy className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                                        <div>
                                            <p className="text-white font-bold">{notification.title}</p>
                                            <p className="text-purple-100 text-sm">{notification.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </AnimatePresence>
        </NotificationContext.Provider>
    );
};
