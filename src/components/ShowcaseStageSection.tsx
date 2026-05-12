"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

import { projeGorselleriBackdrop } from "@/data/proje-gorselleri-backdrop";

const ShowcaseIndustrialModel = dynamic(
  () =>
    import("@/components/ShowcaseIndustrialModel").then((m) => m.ShowcaseIndustrialModel),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(48vh,520px)] w-full items-center justify-center md:h-[min(56vh,620px)] lg:h-[min(62vh,700px)]">
        <p className="text-[13px] text-white/45">3D model yükleniyor…</p>
      </div>
    ),
  },
);

type ShowcaseStageSectionProps = {
  children?: ReactNode;
};

export function ShowcaseStageSection({ children }: ShowcaseStageSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="proje-sahnesi"
      className="relative isolate min-h-[min(92dvh,920px)] overflow-hidden border-b border-white/[0.06] bg-[#050507]"
      aria-labelledby="proje-sahnesi-baslik"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,rgba(90,110,200,0.12),transparent_65%),radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(245,215,138,0.06),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,7,0.55)_0%,rgba(5,5,7,0.25)_28%,rgba(5,5,7,0.35)_55%,rgba(5,5,7,0.92)_100%)]"
        aria-hidden
      />

      <div className="absolute inset-0 z-0 flex justify-center px-4 md:px-8">
        <div className="relative h-full w-full max-w-[88rem]">
        {projeGorselleriBackdrop.map((panel, index) => (
          <motion.div
            key={`${panel.src}-${index}`}
            className={`showcase-float-card pointer-events-auto absolute ${panel.className}`}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.65, delay: panel.delay }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.12,
                    rotate: 0,
                    zIndex: 5,
                    transition: { type: "spring", stiffness: 380, damping: 26 },
                  }
            }
          >
            <div className="relative overflow-hidden rounded-xl ring-1 ring-white/[0.07]">
              <img
                src={panel.src}
                alt={panel.label}
                className={`h-auto w-full object-cover shadow-[0_20px_50px_-16px_rgba(0,0,0,0.8)] [image-rendering:auto] contrast-[1.03] ${reduceMotion ? "" : "bahen-showcase-drift"}`}
                style={
                  {
                    ["--bahen-showcase-rotate"]: `${panel.rotate}deg`,
                    ["--bahen-showcase-delay"]: `${panel.delay}s`,
                  } as CSSProperties
                }
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index === 0 ? "high" : undefined}
                sizes="(max-width: 768px) 40vw, 280px"
              />
            </div>
          </motion.div>
        ))}
        </div>
      </div>

      <div className="relative z-20 mx-auto flex min-h-[min(92dvh,920px)] max-w-6xl flex-col px-5 pt-10 pb-24 md:px-10 md:pt-14 md:pb-28">
        <div className="pointer-events-auto relative mb-8 max-w-3xl md:mb-10">
          <div
            className="rounded-2xl border border-white/[0.08] bg-[#050507]/82 px-5 py-6 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.75)] backdrop-blur-md md:px-7 md:py-7"
            style={{
              boxShadow:
                "0 8px 40px -8px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <h2
              id="proje-sahnesi-baslik"
              className="navbar-wordmark text-balance text-2xl leading-[1.1] font-semibold tracking-[-0.03em] uppercase md:text-4xl lg:text-[2.65rem] lg:leading-[1.06]"
            >
              <span
                className="bg-gradient-to-br from-[#f5d78a] via-[#fafafa] to-[#9aacff] bg-clip-text text-transparent"
                style={{
                  filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.85))",
                }}
              >
                Her proje
              </span>
              <span
                className="mt-1 block text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.9)] md:mt-1.5"
                style={{ opacity: 0.94 }}
              >
                ortak bir hikâyenin parçası.
              </span>
            </h2>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
          <div className="relative z-10 w-full" data-showcase-model-root>
            {children ?? <ShowcaseIndustrialModel />}
          </div>
        </div>
      </div>
    </section>
  );
}
