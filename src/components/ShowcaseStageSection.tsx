"use client";

import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const SculptureGallery3D = dynamic(
  () =>
    import("@/components/SculptureGallery3D").then((m) => m.SculptureGallery3D),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-[13px] text-bahen-muted">3D sahne yükleniyor…</p>
      </div>
    ),
  },
);

export function ShowcaseStageSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [canvasActive, setCanvasActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => setCanvasActive(entry.isIntersecting),
      { rootMargin: "160px 0px" },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      fastScrollEnd: true,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => {
      st.kill();
    };
  }, []);

  const ease = (x: number) =>
    x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
  const p = ease(Math.max(0, Math.min(1, progress)));
  const darkOpacity = p * 0.92;

  return (
    <section
      ref={sectionRef}
      id="proje-gorselleri"
      className="relative scroll-mt-20 border-b border-bahen-border bg-bahen-surface-muted"
      style={{ minHeight: "220dvh" }}
      aria-labelledby="proje-gorselleri-baslik"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{ backgroundColor: "#0A0907", opacity: darkOpacity }}
        />

        <div className="absolute inset-0 z-20">
          {canvasActive ? (
            <SculptureGallery3D activeProgress={progress} renderActive={canvasActive} />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-bahen-surface-muted"
              aria-hidden
            />
          )}
        </div>

        <div className="pointer-events-none absolute inset-0 z-30 hidden lg:block">
          <div className="relative mx-auto h-full max-w-7xl px-5 md:px-10">
            <div
              className="absolute inset-y-0 left-5 flex w-[36%] max-w-md flex-col justify-center md:left-10"
              style={{
                opacity: Math.max(0, 1 - p * 2.4),
                transform: `translateX(${-p * 28}px)`,
              }}
            >
              <p className="text-[11px] font-semibold tracking-[0.35em] text-bahen-muted uppercase">
                (01)
              </p>
              <h2
                id="proje-gorselleri-baslik"
                className="navbar-wordmark mt-4 text-balance text-3xl font-semibold tracking-[-0.03em] text-bahen-ink md:text-4xl lg:text-[2.4rem] lg:leading-[1.08]"
              >
                Sahada gördüğümüz her detay,{" "}
                <span className="text-bahen-muted">çizim masasında</span> başlar.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-bahen-muted md:text-base">
                Karma yapı, hastane, otel ve endüstri referanslarımızdan kesitler. Hepsi tek
                mühendislik disipliniyle: tasarım, dokümantasyon ve şantiye uyumu.
              </p>
              <p className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.3em] text-bahen-muted uppercase">
                <span aria-hidden>↓</span> Aşağı kaydırın
              </p>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-40 mx-auto max-w-7xl px-5 pt-28 md:px-10 md:pt-32"
          style={{
            opacity: Math.max(0, (p - 0.3) * 2),
            transform: `translateY(${Math.max(0, (1 - p) * 12)}px)`,
          }}
        >
          <p className="text-[11px] font-semibold tracking-[0.4em] text-white/70 uppercase">
            (02) Proje görselleri
          </p>
          <h3 className="navbar-wordmark mt-3 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.025em] text-white md:text-3xl lg:text-[2.1rem] lg:leading-[1.08]">
            Yapılarda iz bırakan{" "}
            <span className="text-white/55">karma yapı, hastane, endüstri</span> projelerimiz.
          </h3>
          <p
            className="mt-4 max-w-md text-[13px] leading-relaxed text-white/65 md:text-sm"
            style={{ opacity: Math.max(0, (p - 0.5) * 2.2) }}
          >
            Heykel üstündeki noktalara tıklayın — her bir nokta bir projeyi temsil eder.
          </p>
        </div>
      </div>
    </section>
  );
}
