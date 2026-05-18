"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = "/hero-scroll-scrub.mp4";
const VIDEO_POSTER = "/hero-scroll-scrub-poster.jpg";

const EXTRA_DVH_PER_SEC = 96;
const SCRUB_MAX_EXTRA_DVH = 168;

const HINT_IDLE = "Keşfetmek için kaydırın";
const HINT_SCRUB = "Kaydırarak videoyu ilerletin";
const HINT_DONE = "Aşağı kaydırabilirsiniz";

type HeroScrollVideoProps = {
  children: React.ReactNode;
};

export function HeroScrollVideo({ children }: HeroScrollVideoProps) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  const [reduceMotion, setReduceMotion] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    video.pause();

    let st: ScrollTrigger | null = null;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;

      setDuration(video.duration);

      st = ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (cancelled) return;
          if (video.readyState >= 1 && video.duration > 0) {
            const target = self.progress * video.duration;
            if (Math.abs(video.currentTime - target) > 0.04) {
              video.currentTime = target;
            }
          }
          const h = hintRef.current;
          if (h) {
            const p = self.progress;
            h.textContent =
              p < 0.01 ? HINT_IDLE : p >= 0.99 ? HINT_DONE : HINT_SCRUB;
          }
        },
      });
    };

    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener("loadedmetadata", setup, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", setup);
      st?.kill();
    };
  }, [reduceMotion]);

  const extraDvh = reduceMotion
    ? 0
    : duration > 0
      ? Math.min(SCRUB_MAX_EXTRA_DVH, Math.max(70, Math.ceil(duration * EXTRA_DVH_PER_SEC)))
      : SCRUB_MAX_EXTRA_DVH;

  const minHeight = reduceMotion
    ? "min(100dvh, 100vh)"
    : `calc(100dvh + ${extraDvh}dvh)`;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-w-0 border-b border-white/10"
      style={{ minHeight }}
    >
      <div className="sticky top-0 h-[100dvh] min-h-[100svh] w-full min-w-full overflow-hidden bg-[#10100e] [isolation:isolate] [backface-visibility:hidden]">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden [contain:layout_paint] will-change-transform">
          <video
            ref={videoRef}
            className="pointer-events-none absolute left-0 top-0 h-full min-h-full w-full max-w-none object-cover object-[12%_50%] sm:object-[10%_50%]"
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            muted
            playsInline
            preload="auto"
            tabIndex={-1}
            aria-hidden="true"
            disablePictureInPicture
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_28%,transparent_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_18%_22%,rgba(30,58,95,0.09),transparent_52%),radial-gradient(circle_at_82%_38%,rgba(10,15,20,0.08),transparent_48%)]"
        />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-14 pt-[4.5rem] md:px-10 md:pb-20 md:pt-24">
          <div className="relative mr-auto w-full max-w-[min(100%,38rem)] min-w-0 self-start sm:-ml-4 md:-ml-8 lg:-ml-10">
            <div className="min-w-0 px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8 lg:px-9 lg:py-9">
              {children}
            </div>
          </div>
        </div>

        {!reduceMotion ? (
          <p
            ref={hintRef}
            className="pointer-events-none absolute bottom-6 left-1/2 z-10 max-w-xl -translate-x-1/2 px-4 text-center text-[11px] font-semibold tracking-[0.2em] text-white/82 uppercase drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]"
          >
            {HINT_IDLE}
          </p>
        ) : null}
      </div>
    </section>
  );
}
