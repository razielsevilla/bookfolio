"use client";
import { useCallback } from 'react';

export function usePageFlipAudio(soundEnabled: boolean) {
  const playPageFlipAudio = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const duration = 0.45;
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.value = 4.0;
      filter.frequency.setValueAtTime(1400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + duration - 0.05);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.06);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      noiseNode.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noiseNode.start();
      noiseNode.stop(ctx.currentTime + duration);
    } catch (err) {
      console.warn("WebAudio context launch deferred: waiting for user action.", err);
    }
  }, [soundEnabled]);

  return { playPageFlipAudio };
}
