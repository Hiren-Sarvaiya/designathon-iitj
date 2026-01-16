import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, Coins, Trophy, Star, Zap } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info', duration = 3000, icon = null) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type, icon }]);
        
        setTimeout(() => {
            removeToast(id);
        }, duration);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const success = (message, duration) => addToast(message, 'success', duration, <CheckCircle className="w-5 h-5" />);
    const error = (message, duration) => addToast(message, 'error', duration, <XCircle className="w-5 h-5" />);
    const warning = (message, duration) => addToast(message, 'warning', duration, <AlertCircle className="w-5 h-5" />);
    const info = (message, duration) => addToast(message, 'info', duration, <Info className="w-5 h-5" />);
    const coins = (amount, duration) => addToast(`+${amount} Coins`, 'coins', duration, <Coins className="w-5 h-5" />);
    const xp = (amount, duration) => addToast(`+${amount} XP`, 'xp', duration, <Zap className="w-5 h-5" />);
    const achievement = (message, duration) => addToast(message, 'achievement', duration, <Trophy className="w-5 h-5" />);

    const getToastStyles = (type) => {
        const styles = {
            success: 'bg-green-500/90 border-green-400 text-white',
            error: 'bg-red-500/90 border-red-400 text-white',
            warning: 'bg-yellow-500/90 border-yellow-400 text-white',
            info: 'bg-blue-500/90 border-blue-400 text-white',
            coins: 'bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-400 text-white',
            xp: 'bg-gradient-to-r from-purple-500 to-pink-500 border-purple-400 text-white',
            achievement: 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-400 text-white'
        };
        return styles[type] || styles.info;
    };

    return (
        <ToastContext.Provider value={{ success, error, warning, info, coins, xp, achievement }}>
            {children}
            
            {/* Toast Container */}
            <div className="fixed top-24 right-4 z-[250] space-y-2 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 300, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 300, scale: 0.8 }}
                            className={`
                                ${getToastStyles(toast.type)}
                                px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md
                                border-2 flex items-center gap-3 min-w-[280px]
                                pointer-events-auto cursor-pointer
                            `}
                            onClick={() => removeToast(toast.id)}
                        >
                            {toast.icon}
                            <span className="font-bold text-sm">{toast.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
