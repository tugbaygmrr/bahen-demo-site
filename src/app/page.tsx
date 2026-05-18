"use client";

import { useEffect, useRef } from "react";
import { DaimaIstenilen } from "@/components/DaimaIstenilen";
import { FooterCtaBanner } from "@/components/FooterCtaBanner";
import { HakkimizdaScrollSplit } from "@/components/HakkimizdaScrollSplit";
import { HeroScrollVideo } from "@/components/HeroScrollVideo";
import { KurumsalSection } from "@/components/KurumsalSection";
import { SurecSection } from "@/components/SurecSection";
import { Navbar } from "@/components/Navbar";
import { SeciliProjelerSection } from "@/components/SeciliProjelerSection";
import { SssSection } from "@/components/SssSection";
import { ShowcaseStageSection } from "@/components/ShowcaseStageSection";
import { SiteFooter } from "@/components/SiteFooter";
import { projeGorselleriTum } from "@/data/proje-gorselleri-tum";

export default function Home() {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    void import("@/components/SculptureGallery3D");
    projeGorselleriTum.forEach((item) => {
      const img = new Image();
      img.decoding = "async";
      img.src = `/api/img?url=${encodeURIComponent(item.src)}`;
    });
  }, []);

  useEffect(() => {
    const el = progressBarRef.current;
    if (!el) return;

    const update = () => {
      const doc = document.documentElement;
      const range = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / range));
      el.style.transformOrigin = "left center";
      el.style.transform = `scaleX(${p})`;
    };

    let scheduled = 0;
    const onScrollOrResize = () => {
      if (scheduled !== 0) return;
      scheduled = requestAnimationFrame(() => {
        scheduled = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (scheduled !== 0) cancelAnimationFrame(scheduled);
    };
  }, []);

  return (
    <main className="min-w-0 w-full overflow-x-clip bg-background text-bahen-ink antialiased">
      <Navbar />
      <div ref={progressBarRef} className="progress-line" style={{ transform: "scaleX(0)" }} />

      <HeroScrollVideo>
        <div className="min-w-0 w-full space-y-6 sm:space-y-7 md:space-y-8">
          <div className="flex min-w-0 flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-2">
            <p className="inline-flex min-w-0 items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-white/88 uppercase">
              <span className="h-px w-6 shrink-0 bg-gradient-to-r from-bahen-primary/30 to-bahen-primary" />
              Mekanik mühendislik
            </p>
            <span className="hidden h-3 w-px shrink-0 bg-white/30 sm:block" aria-hidden />
            <p className="min-w-0 text-[10px] font-bold tracking-[0.18em] text-white/78 uppercase">
              Daima İstenilen
            </p>
          </div>
          <div className="min-w-0 space-y-3.5 md:space-y-4">
            <h1 className="navbar-wordmark max-w-[15ch] text-balance text-[clamp(1.625rem,1.1rem+2.8vw,2.65rem)] leading-[1.14] font-bold tracking-[-0.03em] text-white sm:max-w-[17ch] md:max-w-[18ch] md:leading-[1.1] lg:text-[2.5rem] lg:leading-[1.08]">
              <span
                className="bg-gradient-to-br from-white via-white to-slate-200 bg-clip-text text-transparent"
                style={{
                  filter:
                    "drop-shadow(0 1px 0 rgba(0,0,0,0.28)) drop-shadow(0 2px 8px rgba(0,0,0,0.25))",
                }}
              >
                Tasarımı sahaya taşıyoruz.
              </span>
            </h1>
            <p className="max-w-[36ch] font-sans text-[15px] font-semibold leading-relaxed tracking-[-0.01em] text-white sm:text-[16px] md:text-[17px] md:leading-[1.6] [text-shadow:0_1px_0_rgba(0,0,0,0.45),0_2px_14px_rgba(0,0,0,0.35),0_0_1px_rgba(0,0,0,0.6)]">
              Enerji, konfor ve sürdürülebilirlik odaklı mekanik çözümler sunuyoruz.
            </p>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2.5 pt-0.5 sm:gap-3">
            <a
              href="#projeler"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-white to-white/95 px-7 py-2.5 font-sans text-sm font-bold text-[#050507] shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition hover:to-white"
            >
              Projeleri incele
              <span aria-hidden>→</span>
            </a>
            <a
              href="#kurumsal"
              className="inline-flex items-center justify-center rounded-full border border-white/28 bg-white/[0.14] px-6 py-2.5 font-sans text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/[0.2]"
            >
              Nasıl çalışıyoruz
            </a>
          </div>
        </div>
      </HeroScrollVideo>

      <KurumsalSection />

      <ShowcaseStageSection />

      <SurecSection />

      <HakkimizdaScrollSplit />

      <SeciliProjelerSection />

      <SssSection />

      <DaimaIstenilen />

      <FooterCtaBanner />

      <SiteFooter />
    </main>
  );
}
