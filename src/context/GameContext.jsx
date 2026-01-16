import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    // User State
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('logiclab_user');
        return saved ? JSON.parse(saved) : {
            name: "Young Genius",
            coins: 1250,
            xp: 0,
            level: 3,
            streak: 5,
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
            }
        };
    });

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

                // Calculate new progress percentage
                // Count how many puzzles of this module are completed
                const completedInModule = newCompleted.filter(pid => pid.startsWith(module)).length;
                const totalPuzzles = 12; // Hardcoded total per module
                const newProgress = Math.min(Math.round((completedInModule / totalPuzzles) * 100), 100);

                return {
                    ...prev,
                    coins: prev.coins + coinsReward,
                    xp: prev.xp + xpReward,
                    completedPuzzles: newCompleted,
                    progress: {
                        ...prev.progress,
                        [module]: newProgress
                    }
                };
            });
            return true; // First time completion
        }
        return false; // Already completed
    };

    const updateStreak = () => {
        // transform logic for daily streak here
    };

    return (
        <GameContext.Provider value={{ user, addCoins, completePuzzle, unlockNextLevel, updateStreak }}>
            {children}
        </GameContext.Provider>
    );
};
