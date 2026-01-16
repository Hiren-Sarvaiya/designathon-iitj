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
            progress: {
                patterns: 24,
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

    const completePuzzle = (puzzleId, xpReward, coinsReward) => {
        if (!user.completedPuzzles.includes(puzzleId)) {
            setUser(prev => ({
                ...prev,
                coins: prev.coins + coinsReward,
                xp: prev.xp + xpReward,
                completedPuzzles: [...prev.completedPuzzles, puzzleId]
            }));
            return true; // First time completion
        }
        return false; // Already completed
    };

    const updateStreak = () => {
        // transform logic for daily streak here
    };

    return (
        <GameContext.Provider value={{ user, addCoins, completePuzzle, updateStreak }}>
            {children}
        </GameContext.Provider>
    );
};
