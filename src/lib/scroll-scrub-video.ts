/**
 * Kaydırmalı video scrub: tek yerde tutarlı davranış (hero + uygulama alanı).
 */

export type ScrubSeekConfig = {
  /** Küçük hareketlerde minimum süre farkı; altında seek yok (decode tasarrufu) */
  minDeltaSec: number;
  /** Bu kadar ve üzeri sıçramada her zaman seek (hızlı kaydırmada video geride kalmaz) */
  bigJumpSec: number;
  /** Varsa hedef süreyi bu FPS grid’ine yuvarla — gereksiz yakın seek’leri birleştirir */
  snapFps?: number;
};

export function clampScrubTime(sec: number, duration: number, endPad = 0.05): number {
  const end = Math.max(duration - endPad, 0);
  return Math.min(Math.max(sec, 0), end);
}

export function snapTimeToFps(sec: number, fps: number): number {
  if (fps <= 0) return sec;
  return Math.round(sec * fps) / fps;
}

/**
 * @returns Yeni “son uygulanan” süre (seek atlanmışsa `lastAppliedSec`)
 */
export function applyScrollScrubSeek(
  video: HTMLVideoElement,
  progress01: number,
  duration: number,
  lastAppliedSec: number,
  cfg: ScrubSeekConfig,
): number {
  let target = clampScrubTime(progress01 * duration, duration);
  if (cfg.snapFps && cfg.snapFps > 0) {
    target = snapTimeToFps(target, cfg.snapFps);
    target = clampScrubTime(target, duration);
  }

  const delta = Math.abs(target - lastAppliedSec);
  if (lastAppliedSec >= 0 && delta < cfg.bigJumpSec && delta < cfg.minDeltaSec) {
    return lastAppliedSec;
  }

  try {
    video.currentTime = target;
  } catch {
    return lastAppliedSec;
  }
  return target;
}
