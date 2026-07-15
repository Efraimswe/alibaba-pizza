"use client";

import { useEffect } from "react";

// «Поп» на клик по любой кнопке/ссылке: синтез через Web Audio (без файлов,
// без лицензий). Один глобальный слушатель, AudioContext лениво по первому
// жесту (autoplay policy). Лёгкая рандомизация высоты — живое «поп-поп-поп».
export function ClickPop() {
  useEffect(() => {
    let ctx: AudioContext | null = null;

    const pop = () => {
      try {
        const AC =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext;
        if (!AC) return;
        ctx ??= new AC();
        if (ctx.state === "suspended") void ctx.resume();
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const base = 480 + Math.random() * 120;
        osc.type = "sine";
        osc.frequency.setValueAtTime(base, t);
        osc.frequency.exponentialRampToValueAtTime(base * 0.3, t + 0.09);
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.25, t + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.12);
      } catch {
        // нет Web Audio — просто без звука
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const el = e.target as Element | null;
      if (el?.closest("a, button, summary")) pop();
    };

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return null;
}
