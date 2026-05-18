/**
 * Referans: Meshy Infinity Ribbon — 6 hayal noktası (FORM / heykel tasarımı mock).
 * Konumlar model bbox’ına göre normalize; sahada raycast ile yüzeye yapıştırılır.
 */
export type HeykelHayalNoktasi = {
  /** 0–1, bbox min→max */
  u: number;
  v: number;
  w: number;
  /** Işın yönü ipucu (kameraya / dışa) */
  normalHint: [number, number, number];
};

export const HEYKEL_BBOX = {
  min: [-0.949977, -0.432621, -0.53751] as const,
  max: [0.948447, 0.430565, 0.535825] as const,
};

export const heykelHayalNoktalari: HeykelHayalNoktasi[] = [
  { u: 0.52, v: 0.93, w: 0.52, normalHint: [0.15, 0.85, 0.5] }, // tepe
  { u: 0.8, v: 0.74, w: 0.6, normalHint: [0.9, 0.35, 0.25] }, // sağ üst dış kıvrım
  { u: 0.54, v: 0.6, w: 0.66, normalHint: [0.2, 0.15, 0.95] }, // orta kavşak
  { u: 0.84, v: 0.44, w: 0.56, normalHint: [0.95, 0, 0.3] }, // sağ orta gövde
  { u: 0.7, v: 0.14, w: 0.54, normalHint: [0.65, -0.5, 0.55] }, // sağ alt
  { u: 0.28, v: 0.16, w: 0.5, normalHint: [-0.75, -0.45, 0.5] }, // sol alt
];

export function hayalNoktasiToLocalPosition(n: HeykelHayalNoktasi): [number, number, number] {
  const { min, max } = HEYKEL_BBOX;
  return [
    min[0] + n.u * (max[0] - min[0]),
    min[1] + n.v * (max[1] - min[1]),
    min[2] + n.w * (max[2] - min[2]),
  ];
}
