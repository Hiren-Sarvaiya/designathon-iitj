import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';
import { soundManager } from '../lib/soundManager';
import { useToast } from './ToastContext';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

// GameProvider component - must be used inside NotificationProvider
export const GameProvider = ({ children }) => {
    const notification = useNotification();
    const toast = useToast();
    
    // User State
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('logiclab_user');
        const defaultState = {
            name: "Young Genius",
            coins: 1250,
            xp: 0,
            level: 1,
            streak: 0,
            lastLoginDate: null,
            completedPuzzles: [], // Array of puzzle IDs e.g., "pattern-1", "spatial-2"
            unlockedModules: ['patterns', 'spatial', 'logic', 'directions'],
            unlockedLevels: {
                patterns: 1, // Highest unlocked level
                spatial: 1,
                logic: 1,
                directions: 1
            },
            progress: {
                patterns: 0,
                spatial: 0,
                logic: 0,
                directions: 0
            },
            dailyChallenge: {
                completed: false,
                date: null,
                puzzleId: null
            },
            achievements: [] // Array of achievement IDs
        };

        if (saved) {
            const parsed = JSON.parse(saved);
            // Deep merge or at least ensure critical structures exist
            return {
                ...defaultState,
                ...parsed,
                unlockedLevels: { ...defaultState.unlockedLevels, ...parsed.unlockedLevels },
                progress: { ...defaultState.progress, ...parsed.progress },
                dailyChallenge: { ...defaultState.dailyChallenge, ...parsed.dailyChallenge }
            };
        }
        return defaultState;
    });

    // Calculate level from XP (100 XP per level)
    const calculateLevel = (xp) => {
        return Math.floor(xp / 100) + 1;
    };

    // Check and update daily streak
    const updateStreak = () => {
        const today = new Date().toDateString();
        const lastLogin = user.lastLoginDate;
        
        if (!lastLogin) {
            // First time login
            setUser(prev => ({
                ...prev,
                streak: 1,
                lastLoginDate: today
            }));
        } else if (lastLogin !== today) {
            const lastDate = new Date(lastLogin);
            const todayDate = new Date();
            const diffTime = Math.abs(todayDate - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                // Consecutive day - increment streak
                setUser(prev => ({
                    ...prev,
                    streak: prev.streak + 1,
                    lastLoginDate: today
                }));
            } else if (diffDays > 1) {
                // Streak broken - reset to 1
                setUser(prev => ({
                    ...prev,
                    streak: 1,
                    lastLoginDate: today
                }));
            }
        }
    };

    // Generate daily challenge
    const generateDailyChallenge = () => {
        const today = new Date().toDateString();
        
        if (user.dailyChallenge.date !== today) {
            const modules = ['patterns', 'spatial', 'logic', 'directions'];
            const randomModule = modules[Math.floor(Math.random() * modules.length)];
            const randomLevel = Math.floor(Math.random() * 12) + 1;
            
            setUser(prev => ({
                ...prev,
                dailyChallenge: {
                    completed: false,
                    date: today,
                    puzzleId: `${randomModule}-${randomLevel}`,
                    module: randomModule,
                    level: randomLevel
                }
            }));
        }
    };

    // Complete daily challenge
    const completeDailyChallenge = () => {
        setUser(prev => ({
            ...prev,
            dailyChallenge: {
                ...prev.dailyChallenge,
                completed: true
            },
            coins: prev.coins + 100, // Bonus coins for daily challenge
            xp: prev.xp + 150
        }));
    };

    // Initialize streak and daily challenge on mount
    useEffect(() => {
        updateStreak();
        generateDailyChallenge();
    }, []);

    // Persist to LocalStorage
    useEffect(() => {
        localStorage.setItem('logiclab_user', JSON.stringify(user));
    }, [user]);

    // Actions
    const addCoins = (amount) => {
        setUser(prev => ({ ...prev, coins: prev.coins + amount }));
    };

    const unlockNextLevel = (module, currentId) => {
        const currentLevel = parseInt(currentId);
        setUser(prev => {
            // Only unlock if we are at the frontier of progress
            if (prev.unlockedLevels[module] === currentLevel) {
                return {
                    ...prev,
                    unlockedLevels: {
                        ...prev.unlockedLevels,
                        [module]: currentLevel + 1
                    }
                };
            }
            return prev;
        });
    };

    const completePuzzle = (puzzleId, xpReward, coinsReward) => {
        if (!user.completedPuzzles.includes(puzzleId)) {
            const [module, id] = puzzleId.split('-'); // e.g., "patterns", "1"

            setUser(prev => {
                const newCompleted = [...prev.completedPuzzles, puzzleId];
                const newXP = prev.xp + xpReward;
                const newLevel = calculateLevel(newXP);
                const oldLevel = prev.level;

                // Calculate new progress percentage
                // Count how many puzzles of this module are completed
                const completedInModule = newCompleted.filter(pid => pid.startsWith(module)).length;
                const totalPuzzles = 12; // Hardcoded total per module
                const newProgress = Math.min(Math.round((completedInModule / totalPuzzles) * 100), 100);

                // Check if this was the daily challenge
                const isDailyChallenge = prev.dailyChallenge.puzzleId === puzzleId && !prev.dailyChallenge.completed;
                const bonusCoins = isDailyChallenge ? 100 : 0;
                const bonusXP = isDailyChallenge ? 150 : 0;

                // Trigger level-up notification if level increased
                if (newLevel > oldLevel && notification) {
                    soundManager.playLevelUp();
                    setTimeout(() => notification.showLevelUp(newLevel), 500);
                }

                return {
                    ...prev,
                    coins: prev.coins + coinsReward + bonusCoins,
                    xp: newXP + bonusXP,
                    level: newLevel,
                    completedPuzzles: newCompleted,
                    progress: {
                        ...prev.progress,
                        [module]: newProgress
                    },
                    dailyChallenge: isDailyChallenge ? {
                        ...prev.dailyChallenge,
                        completed: true
                    } : prev.dailyChallenge
                };
            });
            return true; // First time completion
        }
        return false; // Already completed
    };

    return (
        <GameContext.Provider value={{ 
            user, 
            addCoins, 
            completePuzzle, 
            unlockNextLevel, 
            updateStreak, 
            generateDailyChallenge,
            completeDailyChallenge 
        }}>
            {children}
        </GameContext.Provider>
    );
};
