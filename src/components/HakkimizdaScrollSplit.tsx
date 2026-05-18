"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import {
  hakkimizdaIntro,
  hakkimizdaUyumNotu,
  uygulamaAlanlari,
  uygulamaTurleri,
} from "@/data/hakkimizda-icerik";

const EMPTY_IMG = "/hakkimizda-empty.png";
const FACILITY_IMG = "/hakkimizda-facility.png";

const textShadow =
  "[text-shadow:0_1px_0_rgba(0,0,0,0.9),0_2px_8px_rgba(0,0,0,0.75),0_0_24px_rgba(0,0,0,0.55)]";

const imageProps = {
  fill: true as const,
  className: "object-cover object-center [image-rendering:auto]",
  sizes: "100vw",
  quality: 95,
  unoptimized: true,
  priority: true,
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function HakkimizdaScrollSplit() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef(0);
  const dragRef = useRef<{
    pointerId: number;
    startY: number;
    startReveal: number;
  } | null>(null);

  const [reveal, setReveal] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const setRevealSafe = useCallback((value: number) => {
    const next = clamp01(value);
    revealRef.current = next;
    setReveal(next);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const snapReveal = useCallback(
    (value: number) => {
      if (reduceMotion) {
        setRevealSafe(value > 0.5 ? 1 : 0);
        return;
      }
      setRevealSafe(value > 0.52 ? 1 : 0);
    },
    [reduceMotion, setRevealSafe],
  );

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      if (reduceMotion) return;
      event.preventDefault();
      dragRef.current = {
        pointerId: event.pointerId,
        startY: event.clientY,
        startReveal: revealRef.current,
      };
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [reduceMotion],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      const height = sectionRef.current?.clientHeight ?? window.innerHeight;
      const delta = drag.startY - event.clientY;
      setRevealSafe(drag.startReveal + delta / height);
    },
    [setRevealSafe],
  );

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLButtonElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      dragRef.current = null;
      setIsDragging(false);
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      snapReveal(revealRef.current);
    },
    [snapReveal],
  );

  const phase2Opacity = clamp01((reveal - 0.2) / 0.65);
  const phase2Shift = (1 - phase2Opacity) * 28;
  const isOpen = reveal >= 0.52;
  const hintOpen = reveal > 0.06 && reveal < 0.94;

  return (
    <section
      ref={sectionRef}
      id="hakkimizda-detay"
      className="relative h-[100dvh] min-h-[100svh] w-full min-w-0 overflow-hidden border-b border-bahen-border bg-[#0c0e12] [isolation:isolate]"
    >
      {/* Alt katman: borulu tesis */}
      <div className="absolute inset-0 z-0" aria-hidden={reveal < 0.15}>
        <Image src={FACILITY_IMG} alt="" {...imageProps} />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,14,0.35)_0%,rgba(5,8,14,0.55)_38%,rgba(5,8,14,0.82)_62%,rgba(5,8,14,0.88)_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(5,8,14,0.45)_0%,transparent_40%)]"
          aria-hidden
        />
      </div>

      {/* Sağ panel: sistemler (tesis açılınca) */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-20 flex w-full flex-col justify-center px-5 pb-24 pt-20 md:px-10 md:pb-28 md:pt-24 lg:w-[min(52%,540px)] lg:px-12 lg:pb-20"
        style={{
          opacity: reduceMotion ? 1 : phase2Opacity,
          transform: reduceMotion
            ? undefined
            : `translate3d(${phase2Shift}px,0,0)`,
          transition: isDragging
            ? "none"
            : "opacity 0.45s ease, transform 0.45s ease",
        }}
        aria-hidden={phase2Opacity < 0.05 && !reduceMotion}
      >
        <div className="ml-auto w-full max-w-md rounded-2xl border border-white/15 bg-black/55 p-5 shadow-[0_12px_48px_rgba(0,0,0,0.45)] backdrop-blur-md md:max-w-lg md:p-6 lg:p-7">
          <div className="space-y-3 md:space-y-3.5">
            <p
              className={`text-[11px] font-bold tracking-[0.24em] text-white uppercase ${textShadow}`}
            >
              Sistemler
            </p>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {uygulamaTurleri.map((line) => (
                <li
                  key={line}
                  className={`border-l-[3px] border-white/80 pl-3.5 text-[14px] font-bold leading-snug text-white md:text-[15px] md:leading-relaxed ${textShadow}`}
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <p
            className={`mt-4 max-w-sm border-t border-white/15 pt-4 text-[13px] font-bold leading-relaxed text-white md:mt-5 md:text-[14px] ${textShadow}`}
          >
            {hakkimizdaUyumNotu}
          </p>
        </div>
      </div>

      {/* Üst katman: boş bina — yukarı kayar */}
      <div
        className="absolute inset-0 z-10 touch-none will-change-transform"
        style={{
          transform: `translate3d(0, ${-reveal * 100}%, 0)`,
          transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Image src={EMPTY_IMG} alt="" {...imageProps} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(8,10,14,0.82)_0%,rgba(8,10,14,0.45)_38%,transparent_72%)]" />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-5 pb-20 pt-16 md:px-10 md:pb-24 md:pt-20">
          <div
            className="max-w-xl space-y-5 md:max-w-2xl md:space-y-6 lg:max-w-3xl"
            style={{
              opacity: reduceMotion ? 1 : clamp01(1 - reveal * 1.4),
              transition: isDragging ? "none" : "opacity 0.35s ease",
            }}
          >
            <p
              className={`inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.24em] text-white uppercase ${textShadow}`}
            >
              <span className="h-px w-6 shrink-0 bg-bahen-primary/80" />
              Hakkımızda
            </p>

            <div className="space-y-3 md:space-y-4">
              <h2
                className={`navbar-wordmark text-balance text-[1.75rem] font-bold leading-[1.12] tracking-[-0.03em] text-white md:text-[2.35rem] lg:text-[2.5rem] ${textShadow}`}
              >
                Alanlar ve sistemler
              </h2>
              <p
                className={`max-w-lg text-[16px] font-bold leading-relaxed text-white md:text-[17px] md:leading-[1.65] ${textShadow}`}
              >
                {hakkimizdaIntro}
              </p>
            </div>

            <div className="space-y-2.5">
              <p
                className={`text-[10px] font-bold tracking-[0.22em] text-white uppercase ${textShadow}`}
              >
                Sektörler
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {uygulamaAlanlari.map((label) => (
                  <li key={label}>
                    <span
                      className={`inline-flex rounded-full border border-white/40 bg-black/60 px-2.5 py-1 text-[10px] font-bold text-white shadow-[0_2px_12px_rgba(0,0,0,0.4)] backdrop-blur-sm md:px-3 md:py-1.5 md:text-[11px] ${textShadow}`}
                    >
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* SÃ¼rÃ¼kleme tutamacÄ± â€” gÃ¶rselin alt kenarÄ± */}
      {!reduceMotion ? (
        <>
          <button
            type="button"
            className="absolute left-0 right-0 z-30 flex -translate-y-1/2 cursor-grab flex-col items-center gap-2 border-0 bg-transparent px-4 py-4 touch-none active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{
              top: `${(1 - reveal) * 100}%`,
              transition: isDragging
                ? "none"
                : "top 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            aria-label={
              isOpen
                ? "Aşağı sürükleyerek boş yapı görünümüne dön"
                : "Yukarı sürükleyerek tesis görünümünü aç"
            }
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(reveal * 100)}
            role="slider"
            aria-orientation="vertical"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={(event) => {
              if (event.key === "ArrowUp") {
                event.preventDefault();
                snapReveal(revealRef.current + 0.15);
              }
              if (event.key === "ArrowDown") {
                event.preventDefault();
                snapReveal(revealRef.current - 0.15);
              }
            }}
          >
            <span
              className="flex h-9 w-[4.5rem] items-center justify-center rounded-full border border-white/40 bg-black/50 shadow-[0_4px_24px_rgba(0,0,0,0.45)] backdrop-blur-md"
              aria-hidden
            >
              <span className="flex flex-col gap-1">
                <span className="mx-auto h-0.5 w-7 rounded-full bg-white/85" />
                <span className="mx-auto h-0.5 w-7 rounded-full bg-white/70" />
              </span>
            </span>
            {hintOpen ? (
              <span
                className={`rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-white uppercase backdrop-blur-sm ${textShadow}`}
              >
                {isOpen ? "Aşağı çekin" : "Yukarı çekin"}
              </span>
            ) : null}
          </button>

          {reveal >= 0.92 ? (
            <button
              type="button"
              className={`absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/35 bg-black/60 px-4 py-2 text-[11px] font-semibold tracking-[0.06em] text-white backdrop-blur-md transition hover:bg-black/75 ${textShadow}`}
              onClick={() => snapReveal(0)}
            >
              Boş yapıya dön
            </button>
          ) : null}
        </>
      ) : (
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          <button
            type="button"
            className="rounded-full border border-white/35 bg-black/55 px-4 py-2 text-[11px] font-semibold text-white backdrop-blur-sm"
            onClick={() => setRevealSafe(0)}
          >
            Yapı
          </button>
          <button
            type="button"
            className="rounded-full border border-white/35 bg-black/55 px-4 py-2 text-[11px] font-semibold text-white backdrop-blur-sm"
            onClick={() => setRevealSafe(1)}
          >
            Tesis
          </button>
        </div>
      )}
    </section>
  );
}
