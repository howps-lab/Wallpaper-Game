/**
 * Procedural Web Audio API soundscape and tactile haptic feedback for ASHENVEIL.
 * 100% synthesized in code without any external audio files to ensure instant zero-latency loading and zero 404s.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private droneOsc: OscillatorNode | null = null;
  private noiseNode: AudioNode | null = null;
  private isMuted: boolean = true;
  private isInitialized: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startAmbient();
      this.playBell(320, 2.5);
    } else {
      this.stopAmbient();
    }
    this.triggerHaptic(20);
    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public triggerHaptic(duration = 15) {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      try {
        navigator.vibrate(duration);
      } catch {
        // Ignored if device doesn't permit haptics
      }
    }
  }

  private startAmbient() {
    if (!this.ctx || this.isMuted) return;

    try {
      // 1. Low cavernous atmospheric drone
      const osc = this.ctx.createOscillator();
      const droneGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, this.ctx.currentTime); // Low A

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);
      filter.Q.setValueAtTime(4, this.ctx.currentTime);

      droneGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      droneGain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 3);

      osc.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(this.ctx.destination);
      osc.start();
      this.droneOsc = osc;
      this.ambientGain = droneGain;

      // 2. Wind turbulence (pink noise generator)
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.04;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const windFilter = this.ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.setValueAtTime(280, this.ctx.currentTime);
      windFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const windGainNode = this.ctx.createGain();
      windGainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
      windGainNode.gain.exponentialRampToValueAtTime(0.05, this.ctx.currentTime + 4);

      whiteNoise.connect(windFilter);
      windFilter.connect(windGainNode);
      windGainNode.connect(this.ctx.destination);
      whiteNoise.start();

      this.noiseNode = whiteNoise;
      this.windGain = windGainNode;
      this.isInitialized = true;
    } catch {
      // Audio autoplay restrictions
    }
  }

  private stopAmbient() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    if (this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    }
    if (this.windGain) {
      this.windGain.gain.setValueAtTime(this.windGain.gain.value, now);
      this.windGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    }
    setTimeout(() => {
      try {
        this.droneOsc?.stop();
        this.noiseNode?.disconnect();
      } catch {
        // Safe disposal
      }
    }, 1300);
  }

  public playBladeShimmer() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(2400, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.5);

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(800, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch {
      // Audio context policy
    }
  }

  public playBell(freq = 220, duration = 3.0) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const harmonics = [1, 2.76, 5.4, 8.9];
      const gains = [0.12, 0.06, 0.03, 0.015];

      harmonics.forEach((h, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * h, now);

        gain.gain.setValueAtTime(gains[idx], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration / (idx + 1));

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now);
        osc.stop(now + duration);
      });
    } catch {
      // Audio context policy
    }
  }

  public playEmberBurst() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.4);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.5);
    } catch {
      // Audio context policy
    }
  }
}

export const sound = new SoundEngine();
