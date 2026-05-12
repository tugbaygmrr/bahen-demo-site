"use client";

import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { getStickyScrollProgress, useScrubSectionResizeSync } from "@/hooks/use-sticky-scroll-frame";

const VIDEO_SRC = "/hero-scroll-scrub.mp4";

/** Videonun saniyesi başına eklenen kaydırma alanı (dvh). Büyük = daha yavaş ilerler. */
const EXTRA_DVH_PER_SEC = 26;

/** Sık seek decode’u kilitler; rAF ile ilerleme okunur ama seek sınırlı kalır */
const SEEK_EPS_SEC = 0.03;
const MIN_MS_BETWEEN_SEEKS = 56;

type HeroScrollVideoProps = {
  children: React.ReactNode;
};

export function HeroScrollVideo({ children }: HeroScrollVideoProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const durationRef = useRef(0);
  const readyRef = useRef(false);
  const lastAppliedRef = useRef(-1);
  const metaBoundRef = useRef(false);
  const startedRef = useRef(false);
  const completedRef = useRef(false);
  const scrubKickRef = useRef<(() => void) | null>(null);
  const scrollProgressRef = useRef<MotionValue<number> | null>(null);

  const scrollProgress = useMotionValue(0);
  scrollProgressRef.current = scrollProgress;

  const gradientY = useTransform(scrollProgress, [0, 0.45], [0, -100]);

  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  useEffect(() => {
    readyRef.current = ready;
  }, [ready]);

  useEffect(() => {
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useScrubSectionResizeSync(containerRef, () => scrubKickRef.current?.());

  const bindVideoMeta = useCallback((v: HTMLVideoElement) => {
    if (metaBoundRef.current) return;
    const d = v.duration;
    if (!Number.isFinite(d) || d <= 0) return;
    metaBoundRef.current = true;
    durationRef.current = d;
    readyRef.current = true;
    setDuration(d);
    setReady(true);
    try {
      v.pause();
      const p = getStickyScrollProgress(containerRef.current);
      scrollProgressRef.current?.set(p);
      const t = Math.min(Math.max(p * d, 0), Math.max(d - 0.04, 0));
      v.currentTime = t;
      lastAppliedRef.current = t;
    } catch {
      /* ignore */
    }
    queueMicrotask(() => scrubKickRef.current?.());
  }, []);

  /** Bazı ortamlarda yalnızca JSX handler yetmez; metadata gecikirse yakala */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryBind = () => bindVideoMeta(v);

    tryBind();
    v.addEventListener("loadedmetadata", tryBind);
    v.addEventListener("durationchange", tryBind);
    v.addEventListener("canplay", tryBind);

    let iv = 0;
    iv = window.setInterval(() => {
      tryBind();
      if (metaBoundRef.current) {
        window.clearInterval(iv);
        iv = 0;
      }
    }, 400);

    return () => {
      if (iv !== 0) window.clearInterval(iv);
      v.removeEventListener("loadedmetadata", tryBind);
      v.removeEventListener("durationchange", tryBind);
      v.removeEventListener("canplay", tryBind);
    };
  }, [bindVideoMeta]);

  const extraDvh = reduceMotion
    ? 0
    : Math.max(70, Math.ceil(duration * EXTRA_DVH_PER_SEC));

  const minHeight = reduceMotion
    ? "min(100dvh, 100vh)"
    : ready
      ? `calc(100dvh + ${extraDvh}dvh)`
      : "calc(100dvh + 150dvh)";

  /**
   * rAF: ilerleme + video seek (throttle’lı). Effect artık `reduceMotion`’a bağlı değil —
   * OS “hareketi azalt” açıkken effect tamamen kapanıyordu; scrub hiç çalışmıyordu.
   * Reduce yalnızca `minHeight` / dekoratif gradient’te kullanılıyor.
   */
  useEffect(() => {
    let rafId = 0;
    let stopped = false;
    let lastSeekMs = 0;

    const applyScrub = () => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") {
        return;
      }

      const section = containerRef.current;
      const sp = scrollProgressRef.current;
      if (!sp) return;

      const p = getStickyScrollProgress(section);
      sp.set(p);

      if (p > 0.001 && !startedRef.current) {
        startedRef.current = true;
        setStarted(true);
      }
      if (p >= 0.995) {
        if (!completedRef.current) {
          completedRef.current = true;
          setCompleted(true);
        }
      } else if (completedRef.current) {
        completedRef.current = false;
        setCompleted(false);
      }

      const el = videoRef.current;
      const d = durationRef.current;
      if (!el || d <= 0 || !readyRef.current) return;

      const target = Math.min(Math.max(p * d, 0), Math.max(d - 0.04, 0));
      const drift = Math.abs(target - lastAppliedRef.current);
      if (drift <= SEEK_EPS_SEC) return;

      const now = performance.now();
      if (now - lastSeekMs < MIN_MS_BETWEEN_SEEKS && drift < 0.28) return;

      try {
        el.currentTime = target;
        lastAppliedRef.current = target;
        lastSeekMs = now;
      } catch {
        /* ignore */
      }
    };

    const kick = () => {
      try {
        applyScrub();
      } catch {
        /* ignore */
      }
    };

    scrubKickRef.current = kick;

    const tick = () => {
      if (stopped) return;
      try {
        applyScrub();
      } catch {
        /* keep loop */
      }
      if (!stopped) rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick, { passive: true });
    document.addEventListener("visibilitychange", kick);
    const vv = typeof window !== "undefined" ? window.visualViewport : null;
    vv?.addEventListener("scroll", kick, { passive: true });
    vv?.addEventListener("resize", kick, { passive: true });

    kick();
    rafId = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      scrubKickRef.current = null;
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      document.removeEventListener("visibilitychange", kick);
      vv?.removeEventListener("scroll", kick);
      vv?.removeEventListener("resize", kick);
      if (rafId !== 0) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-w-0 border-b border-white/10"
      style={{ minHeight }}
    >
      <div className="sticky top-0 h-[100dvh] min-h-[100svh] w-full min-w-full overflow-hidden bg-[#10100e] [isolation:isolate] [backface-visibility:hidden]">
        <video
          ref={videoRef}
          className="absolute left-0 top-0 z-0 h-full min-h-full w-[108%] max-w-none object-cover object-[12%_50%] sm:object-[10%_50%]"
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          disablePictureInPicture
          onLoadedMetadata={(e) => bindVideoMeta(e.currentTarget)}
          onLoadedData={(e) => bindVideoMeta(e.currentTarget)}
          onCanPlay={(e) => bindVideoMeta(e.currentTarget)}
          onDurationChange={(e) => bindVideoMeta(e.currentTarget)}
        />

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_28%,transparent_100%)]" />

        {!reduceMotion ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_18%_22%,rgba(245,201,108,0.1),transparent_52%),radial-gradient(circle_at_82%_38%,rgba(83,108,255,0.11),transparent_48%)]"
            style={{ y: gradientY }}
          />
        ) : (
          <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_18%_22%,rgba(245,201,108,0.1),transparent_52%),radial-gradient(circle_at_82%_38%,rgba(83,108,255,0.11),transparent_48%)]" />
        )}

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-14 pt-[4.5rem] md:px-10 md:pb-20 md:pt-24">
          <div className="relative isolate -ml-4 mr-auto w-fit max-w-full self-start sm:-ml-6 md:-ml-10 lg:-ml-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-xl bg-white/[0.02] backdrop-blur-[2px] ring-1 ring-inset ring-white/[0.08] md:rounded-2xl md:backdrop-blur-[3px] lg:rounded-[1.35rem]"
            />
            <div className="relative z-[1]">{children}</div>
          </div>
        </div>

        {!reduceMotion ? (
          <p className="pointer-events-none absolute bottom-6 left-1/2 z-10 max-w-xl -translate-x-1/2 px-4 text-center text-[11px] font-semibold tracking-[0.2em] text-white/82 uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
            {!started
              ? "Kaydırınca video başlayacak"
              : completed
                ? "Aşağı kaydırabilirsiniz"
                : "Kaydırarak videoyu ilerletin"}
          </p>
        ) : null}
      </div>
    </section>
  );
}
