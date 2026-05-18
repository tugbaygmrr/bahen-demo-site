"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Akıcı kaydırma (Lenis). Premium vitrin sitelerindeki gibi tekerlek/trackpad
 * ivmesini yumuşatır; `window` scroll olayları korunur — hero scrub ile uyumlu.
 * `prefers-reduced-motion` açıksa Lenis başlatılmaz.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      lerp: 0.058,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.62,
      touchMultiplier: 0.78,
      syncTouch: false,
    });

    let rafId = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return children;
}
