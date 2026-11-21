/**
 * AGRUMEA FARM - AMBIENT MEDITERRANEAN SOUNDSCAPE
 * Synthesizes gentle summer breeze & warm Sicilian nature chimes via Web Audio API.
 * 100% local, lightweight, and zero external MP3 assets required.
 */

class SoundscapeSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.windNode = null;
    this.timerId = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
  }

  start() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;

    // 1. Warm Sicilian Wind Breeze (Pink noise buffer filtered through slow LFO bandpass)
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99765 * b0 + white * 0.0555179;
      b1 = 0.96300 * b1 + white * 0.0750759;
      b2 = 0.57000 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.05;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter for wind resonance
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, this.ctx.currentTime);

    // Wind modulation
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(160, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    whiteNoise.connect(filter);
    filter.connect(this.gainNode);
    whiteNoise.start();
    this.windSource = whiteNoise;

    // 2. Periodic gentle acoustic resonant chime (pentatonic sunny warmth)
    this.scheduleGentleChimes();
  }

  scheduleGentleChimes() {
    if (!this.isPlaying) return;

    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25]; // C major pentatonic
    const freq = notes[Math.floor(Math.random() * notes.length)];

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    noteGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    noteGain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 0.15);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.2);

    osc.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start();
    osc.stop(this.ctx.currentTime + 3.3);

    // Schedule next chime every 3 to 7 seconds randomly
    const nextInterval = 3200 + Math.random() * 4000;
    this.timerId = setTimeout(() => {
      this.scheduleGentleChimes();
    }, nextInterval);
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    if (this.windSource) {
      try {
        this.windSource.stop();
      } catch (e) {}
    }
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend();
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const soundscape = new SoundscapeSynthesizer();
