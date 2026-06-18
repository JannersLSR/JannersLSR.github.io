import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'crt-sound-enabled';

// Web Audio API sound engine. Zero audio files — all synthesized.
// Muted by default (browsers block autoplay; surprise sound is jarring).
export function useSound() {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef(null);
  const humRef = useRef(null);

  useEffect(() => {
    try {
      setEnabled(localStorage.getItem(STORAGE_KEY) === 'true');
    } catch {
      /* ignore */
    }
  }, []);

  const getCtx = useCallback(() => {
    if (typeof window === 'undefined') return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctxRef.current) ctxRef.current = new AC();
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  const beep = useCallback(
    (freq, duration, type = 'sine', gain = 0.04) => {
      if (!enabled) return;
      const ctx = getCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      g.gain.setValueAtTime(gain, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration / 1000);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration / 1000);
    },
    [enabled, getCtx]
  );

  const keypress = useCallback(() => {
    beep(1800 + Math.random() * 400, 22, 'square', 0.018);
  }, [beep]);

  const boot = useCallback(() => {
    if (!enabled) return;
    [440, 620, 880].forEach((f, i) => setTimeout(() => beep(f, 90, 'sine', 0.05), i * 110));
  }, [beep, enabled]);

  const startHum = useCallback(() => {
    if (!enabled) return;
    const ctx = getCtx();
    if (!ctx || humRef.current) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 60;
    g.gain.value = 0.006;
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start();
    humRef.current = { osc, g };
  }, [enabled, getCtx]);

  const stopHum = useCallback(() => {
    if (humRef.current) {
      try {
        humRef.current.osc.stop();
      } catch {
        /* ignore */
      }
      humRef.current = null;
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        /* ignore */
      }
      if (!next) stopHum();
      return next;
    });
  }, [stopHum]);

  // start/stop hum following enabled state
  useEffect(() => {
    if (enabled) startHum();
    else stopHum();
    return stopHum;
  }, [enabled, startHum, stopHum]);

  return { enabled, toggle, keypress, boot };
}
