"use client";

import { useEffect, useRef, useState } from "react";

import {
  hakkimizdaIntro,
  hakkimizdaUyumNotu,
  uygulamaAlanlari,
  uygulamaTurleri,
} from "@/data/hakkimizda-icerik";

const VIDEO_SRC = "/kling_20260510_VIDEO_Minimal_gr_749_3.mp4";

/** Hero ile aynı: video üstünde ağır karartma yok, hafif üst sis */
const videoTopWash =
  "pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,transparent_28%,transparent_100%)]";

export function HakkimizdaScrollSplit() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

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

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduceMotion) return;

    const tryPlay = () => {
      void v.play().catch(() => {});
    };

    const onVis = () => {
      if (document.visibilityState === "hidden") {
        v.pause();
      } else {
        tryPlay();
      }
    };

    v.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", onVis);
    tryPlay();

    return () => {
      v.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVis);
      v.pause();
    };
  }, [reduceMotion]);

  return (
    <section
      id="hakkimizda-detay"
      className="relative w-full min-w-0 border-b border-white/[0.06] bg-[#050507]"
    >
      <div className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden bg-[#10100e] [isolation:isolate] [backface-visibility:hidden]">
        <video
          ref={videoRef}
          className="absolute inset-0 z-0 h-full w-full transform-gpu object-cover object-[50%_42%] [transform:translate3d(0,0,0)]"
          src={VIDEO_SRC}
          muted
          loop
          playsInline
          preload="auto"
          autoPlay={!reduceMotion}
          tabIndex={-1}
          aria-hidden="true"
          disablePictureInPicture
        />

        <div className={videoTopWash} aria-hidden />

        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_78%_20%,rgba(127,155,255,0.1),transparent_52%),radial-gradient(circle_at_12%_72%,rgba(245,215,138,0.07),transparent_48%)]"
          aria-hidden
        />
        {/* Açık video zeminde beyaz yazı: alt bantta çok hafif vignette — kutu değil */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top,rgba(5,5,7,0.42)_0%,rgba(5,5,7,0.12)_38%,transparent_62%)]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-12 pt-16 md:px-10 md:pb-16 md:pt-24">
          <div className="max-w-xl space-y-5 pb-1 md:max-w-2xl md:space-y-6 md:pb-0 lg:max-w-3xl">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
              <p className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.24em] text-white uppercase [text-shadow:0_1px_0_rgba(0,0,0,0.65),0_2px_12px_rgba(0,0,0,0.45)]">
                <span className="h-px w-6 shrink-0 bg-gradient-to-r from-amber-200 to-indigo-300" />
                Hakkımızda
              </p>
              <span className="hidden h-3 w-px bg-white/35 sm:block" aria-hidden />
            </div>

            <div className="space-y-3 md:space-y-4">
              <h2 className="navbar-wordmark text-balance text-[1.75rem] font-bold leading-[1.12] tracking-[-0.03em] text-white md:text-[2.35rem] md:leading-[1.1] lg:text-[2.5rem]">
                <span
                  className="bg-gradient-to-br from-[#fff4dc] via-white to-[#d0dcff] bg-clip-text text-transparent"
                  style={{
                    filter:
                      "drop-shadow(0 1px 0 rgba(0,0,0,0.55)) drop-shadow(0 2px 12px rgba(0,0,0,0.5)) drop-shadow(0 0 24px rgba(0,0,0,0.35))",
                  }}
                >
                  Alanlar ve sistemler
                </span>
              </h2>
              <p className="max-w-lg font-sans text-[16px] font-semibold leading-relaxed tracking-[-0.01em] text-white md:text-[17px] md:leading-[1.65] [text-shadow:0_1px_0_rgba(0,0,0,0.65),0_2px_16px_rgba(0,0,0,0.5),0_0_2px_rgba(0,0,0,0.7)]">
                {hakkimizdaIntro}
              </p>
            </div>

            <div className="space-y-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white [text-shadow:0_1px_0_rgba(0,0,0,0.55),0_2px_10px_rgba(0,0,0,0.4)]">
                Sektörler
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {uygulamaAlanlari.map((label) => (
                  <li key={label}>
                    <span className="inline-flex rounded-full border border-white/35 bg-black/45 px-2.5 py-1 text-[10px] font-bold text-white shadow-[0_2px_12px_rgba(0,0,0,0.35)] backdrop-blur-[2px] md:px-3 md:py-1.5 md:text-[11px] [text-shadow:0_1px_2px_rgba(0,0,0,0.65)]">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white [text-shadow:0_1px_0_rgba(0,0,0,0.55),0_2px_10px_rgba(0,0,0,0.4)]">
                Sistemler
              </p>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {uygulamaTurleri.map((line) => (
                  <li
                    key={line}
                    className="border-l-[3px] border-amber-300/70 pl-3 font-sans text-[14px] font-semibold leading-snug text-white [text-shadow:0_1px_0_rgba(0,0,0,0.65),0_2px_10px_rgba(0,0,0,0.55),0_0_1px_rgba(0,0,0,0.8)] md:border-amber-300/80 md:pl-3.5 md:text-[15px] md:leading-relaxed"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <p className="max-w-lg pt-1 font-sans text-[12px] font-semibold leading-relaxed text-white [text-shadow:0_1px_0_rgba(0,0,0,0.55),0_2px_12px_rgba(0,0,0,0.45)] md:text-[13px] md:pt-0">
              {hakkimizdaUyumNotu}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
