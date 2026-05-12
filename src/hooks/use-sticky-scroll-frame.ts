"use client";

import { type MutableRefObject, type RefObject, useEffect, useRef } from "react";

/** Sticky pin: 0 = bölüm üstte, 1 = bölüm kaydırması bitti */
function viewportHeightPx(): number {
  if (typeof window === "undefined") return 0;
  const vv = window.visualViewport;
  if (vv && vv.height > 0) return vv.height;
  return window.innerHeight;
}

export function getStickyScrollProgress(section: HTMLElement | null): number {
  if (!section || typeof window === "undefined") return 0;
  const vh = viewportHeightPx();
  const trackPx = Math.max(1, section.offsetHeight - vh);
  const topPx = section.getBoundingClientRect().top;
  return Math.min(1, Math.max(0, -topPx / trackPx));
}

export function sectionNeedsScrub(section: HTMLElement | null, padPx = 200): boolean {
  if (!section || typeof window === "undefined") return false;
  const r = section.getBoundingClientRect();
  const vh = viewportHeightPx();
  return r.bottom > -padPx && r.top < vh + padPx;
}

const frameRefs = new Set<MutableRefObject<(() => void) | undefined>>();
let flushRaf = 0;
let subscriberCount = 0;
let onScrollResize: (() => void) | undefined;

function runAllFrames() {
  flushRaf = 0;
  for (const ref of frameRefs) {
    try {
      ref.current?.();
    } catch {
      /* ignore */
    }
  }
}

function requestFlush() {
  if (flushRaf !== 0) return;
  flushRaf = requestAnimationFrame(runAllFrames);
}

/** Bölüm yüksekliği / layout değişince scrub’ı tazele */
export function scheduleScrubFlush(): void {
  requestFlush();
}

/** Tek passive scroll + tek rAF: tüm scrub bileşenleri aynı karede güncellenir */
export function useStickyScrollFrame(
  frameRef: MutableRefObject<(() => void) | undefined>,
): void {
  useEffect(() => {
    subscriberCount += 1;
    if (subscriberCount === 1) {
      onScrollResize = () => requestFlush();
      window.addEventListener("scroll", onScrollResize, { passive: true });
      window.addEventListener("resize", onScrollResize, { passive: true });
    }

    frameRefs.add(frameRef);
    queueMicrotask(() => requestFlush());

    return () => {
      frameRefs.delete(frameRef);
      subscriberCount -= 1;
      if (subscriberCount <= 0) {
        subscriberCount = 0;
        if (onScrollResize) {
          window.removeEventListener("scroll", onScrollResize);
          window.removeEventListener("resize", onScrollResize);
          onScrollResize = undefined;
        }
        if (flushRaf !== 0) {
          cancelAnimationFrame(flushRaf);
          flushRaf = 0;
        }
      }
    };
  }, [frameRef]);
}

/** minHeight vb. değişince ilerleme yeniden hesaplanır */
export function useScrubSectionResizeSync(
  sectionRef: RefObject<HTMLElement | null>,
  onLayoutChange?: () => void,
): void {
  const onLayoutRef = useRef(onLayoutChange);
  onLayoutRef.current = onLayoutChange;

  useEffect(() => {
    let ro: ResizeObserver | null = null;
    let cancelled = false;
    let raf = 0;

    const attach = () => {
      const el = sectionRef.current;
      if (!el || typeof ResizeObserver === "undefined" || cancelled) return false;
      ro = new ResizeObserver(() => {
        scheduleScrubFlush();
        onLayoutRef.current?.();
      });
      ro.observe(el);
      scheduleScrubFlush();
      onLayoutRef.current?.();
      return true;
    };

    if (!attach()) {
      raf = requestAnimationFrame(() => {
        if (!cancelled) attach();
      });
    }

    return () => {
      cancelled = true;
      if (raf !== 0) cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [sectionRef]);
}
