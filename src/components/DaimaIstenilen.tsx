"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = "/kling-20260517-cinematic-973.mp4";
const VIDEO_POSTER = "/kling-20260517-cinematic-973-poster.jpg";

export function DaimaIstenilen() {
  const containerRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const decoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "280px 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!loadVideo) return;
    const vid = videoRef.current;
    if (!vid) return;

    const play = () => {
      vid.muted = true;
      void vid.play().catch(() => {});
    };

    play();
    vid.addEventListener("loadeddata", play);
    vid.addEventListener("canplay", play);

    const onMeta = () => ScrollTrigger.refresh();
    vid.addEventListener("loadedmetadata", onMeta);

    return () => {
      vid.removeEventListener("loadeddata", play);
      vid.removeEventListener("canplay", play);
      vid.removeEventListener("loadedmetadata", onMeta);
    };
  }, [loadVideo]);

  useEffect(() => {
    const container = containerRef.current;
    const videoWrap = videoWrapRef.current;
    const deco = decoRef.current;
    if (!container || !videoWrap || !deco) return;

    const vid = videoRef.current;
    const onVisibility = () => {
      if (!vid) return;
      if (document.visibilityState === "hidden") {
        vid.pause();
      } else if (loadVideo) {
        void vid.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      gsap.set(videoWrap, { scale: 1, borderRadius: "0px" });
      gsap.set(deco, { opacity: 0 });
      return () => {
        document.removeEventListener("visibilitychange", onVisibility);
      };
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      videoWrap,
      { scale: 0.4, borderRadius: "18px" },
      { scale: 1, borderRadius: "0px", ease: "none", force3D: true },
    );

    tl.to(deco, { opacity: 0, ease: "none", force3D: true }, 0);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [loadVideo]);

  return (
    <section
      ref={containerRef}
      id="daima-istenilen"
      className="relative border-b border-bahen-border"
      style={{ minHeight: "190dvh" }}
    >
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden bg-background">
        <div
          ref={videoWrapRef}
          className="absolute inset-0 overflow-hidden will-change-transform [backface-visibility:hidden] [contain:layout_style_paint]"
          style={{ transform: "scale(0.4)", borderRadius: "18px" }}
        >
          {loadVideo ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={VIDEO_SRC}
              poster={VIDEO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              tabIndex={-1}
              aria-hidden="true"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={VIDEO_POSTER}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              decoding="async"
              aria-hidden
            />
          )}
        </div>

        <div
          ref={decoRef}
          className="pointer-events-none absolute inset-0 z-20 flex select-none items-center"
        >
          <div className="flex min-w-0 flex-1 items-center pl-8 sm:pl-12 md:pl-16 lg:pl-24">
            <span className="navbar-wordmark shrink-0 text-sm font-medium tracking-tight whitespace-nowrap text-bahen-ink/80 sm:text-base md:text-lg">
              Daima İstenilen
            </span>
            <div className="ml-5 h-px max-w-[clamp(2rem,10vw,9rem)] flex-1 bg-bahen-ink/20" />
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-end pr-8 sm:pr-12 md:pr-16 lg:pr-24">
            <div className="mr-5 h-px max-w-[clamp(2rem,10vw,9rem)] flex-1 bg-bahen-ink/20" />
            <span className="navbar-wordmark shrink-0 rounded-full border border-bahen-ink/25 px-4 py-1.5 text-sm font-semibold tracking-tight whitespace-nowrap text-bahen-ink/75">
              Bahen.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
