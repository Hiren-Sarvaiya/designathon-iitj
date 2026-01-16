// Sound Manager for Logic Lab
// Manages all game sounds and audio feedback

class SoundManager {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.volume = 0.5;
        
        // Load sound enabled state from localStorage
        const savedState = localStorage.getItem('soundEnabled');
        this.enabled = savedState !== null ? JSON.parse(savedState) : true;
    }

    // Create audio context and load sounds
    init() {
        // Using Web Audio API for better control
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    // Generate simple beep tones using Web Audio API
    playTone(frequency, duration, volume = 0.3) {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(volume * this.volume, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Play click sound
    playClick() {
        this.playTone(800, 0.05, 0.2);
    }

    // Play success sound
    playSuccess() {
        if (!this.enabled) return;
        // Success melody: C5 -> E5 -> G5
        this.playTone(523.25, 0.1, 0.3);
        setTimeout(() => this.playTone(659.25, 0.1, 0.3), 100);
        setTimeout(() => this.playTone(783.99, 0.2, 0.3), 200);
    }

    // Play error/failure sound
    playError() {
        if (!this.enabled) return;
        // Error sound: descending tones
        this.playTone(400, 0.1, 0.3);
        setTimeout(() => this.playTone(300, 0.15, 0.3), 100);
    }

    // Play coin collection sound
    playCoin() {
        if (!this.enabled) return;
        // Coin sound: quick ascending tone
        this.playTone(880, 0.05, 0.3);
        setTimeout(() => this.playTone(1174.66, 0.08, 0.3), 50);
    }

    // Play level up sound
    playLevelUp() {
        if (!this.enabled) return;
        // Level up fanfare: C5 -> E5 -> G5 -> C6
        this.playTone(523.25, 0.1, 0.3);
        setTimeout(() => this.playTone(659.25, 0.1, 0.3), 100);
        setTimeout(() => this.playTone(783.99, 0.1, 0.3), 200);
        setTimeout(() => this.playTone(1046.5, 0.3, 0.3), 300);
    }

    // Play hover sound
    playHover() {
        this.playTone(600, 0.03, 0.1);
    }

    // Play unlock sound
    playUnlock() {
        if (!this.enabled) return;
        // Unlock sound: quick ascending sweep
        this.playTone(400, 0.08, 0.2);
        setTimeout(() => this.playTone(600, 0.08, 0.2), 60);
        setTimeout(() => this.playTone(800, 0.12, 0.2), 120);
    }

    // Toggle sound on/off
    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('soundEnabled', JSON.stringify(this.enabled));
        return this.enabled;
    }

    // Set volume (0.0 to 1.0)
    setVolume(vol) {
        this.volume = Math.max(0, Math.min(1, vol));
    }

    // Check if sounds are enabled
    isEnabled() {
        return this.enabled;
    }

    // Set enabled state
    setEnabled(enabled) {
        this.enabled = enabled;
        localStorage.setItem('soundEnabled', JSON.stringify(this.enabled));
    }
}

// Export singleton instance
export const soundManager = new SoundManager();

// Initialize on first import
if (typeof window !== 'undefined') {
    soundManager.init();
}

export default soundManager;
