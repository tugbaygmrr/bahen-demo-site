"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { projeGorselleriTum } from "@/data/proje-gorselleri-tum";

/** Meshy texture GLB — Meshopt geometry + WebP texture (1024px), ~540KB */
const SCULPTURE_URL = "/ribbon.opt.glb";

const PROJE_SAYISI = projeGorselleriTum.length;
/** Sıralı parıldama: tam tur süresi (sn) */
const TWINKLE_CYCLE_SEC = PROJE_SAYISI * 0.55;

type Sample = {
  position: THREE.Vector3;
  normal: THREE.Vector3;
};

const ANCHOR_PREFIX = /^Anchor[_\s-]?(\d+)/i;

/** Heykel boyunca 01→N sırası: yukarıdan aşağı, önden arkaya */
function sortSamplesAlongRibbon(samples: Sample[]): Sample[] {
  const pathKey = (s: Sample) =>
    s.position.y * 2.4 + Math.atan2(s.position.x, s.position.z + 0.001);
  return [...samples].sort((a, b) => pathKey(b) - pathKey(a));
}

/**
 * 1) GLB içinde Anchor_NN varsa onları kullan
 * 2) Yüzey örnekleme + heykel boyunca sıralama
 */
function useSurfaceSamples(scene: THREE.Object3D, count: number): Sample[] {
  return useMemo(() => {
    const anchors: { obj: THREE.Object3D; n: number }[] = [];
    scene.traverse((obj) => {
      const m = ANCHOR_PREFIX.exec(obj.name);
      if (m) anchors.push({ obj, n: parseInt(m[1], 10) });
    });

    if (anchors.length > 0) {
      anchors.sort((a, b) => a.n - b.n);
      return anchors.slice(0, count).map(({ obj }) => {
        obj.updateWorldMatrix(true, false);
        const pos = new THREE.Vector3();
        const quat = new THREE.Quaternion();
        obj.getWorldPosition(pos);
        obj.getWorldQuaternion(quat);
        const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(quat).normalize();
        return { position: pos, normal };
      });
    }

    let target: THREE.Mesh | null = null;
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh && !target) target = obj;
    });
    if (!target) return [];

    // Basit area-ağırlıklı örnekleme (deterministik seed)
    const geom = (target as THREE.Mesh).geometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const idx = geom.index;
    const triCount = idx ? idx.count / 3 : posAttr.count / 3;

    // Üçgen alanları + kümülatif
    const areas: number[] = new Array(triCount);
    let total = 0;
    const vA = new THREE.Vector3();
    const vB = new THREE.Vector3();
    const vC = new THREE.Vector3();
    const ab = new THREE.Vector3();
    const ac = new THREE.Vector3();
    const cross = new THREE.Vector3();
    for (let i = 0; i < triCount; i++) {
      const a = idx ? idx.getX(i * 3) : i * 3;
      const b = idx ? idx.getX(i * 3 + 1) : i * 3 + 1;
      const c = idx ? idx.getX(i * 3 + 2) : i * 3 + 2;
      vA.fromBufferAttribute(posAttr, a);
      vB.fromBufferAttribute(posAttr, b);
      vC.fromBufferAttribute(posAttr, c);
      ab.subVectors(vB, vA);
      ac.subVectors(vC, vA);
      cross.crossVectors(ab, ac);
      total += cross.length() * 0.5;
      areas[i] = total;
    }

    const samples: Sample[] = [];
    const minDist = Math.sqrt(total / Math.max(1, count)) * 0.09;
    let seed = 42;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    let attempts = 0;
    const maxAttempts = count * 120;

    while (samples.length < count && attempts < maxAttempts) {
      attempts += 1;
      const stratPos = (samples.length + rand()) / count;
      const r = stratPos * total;
      let lo = 0;
      let hi = triCount - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (areas[mid] < r) lo = mid + 1;
        else hi = mid;
      }
      const a = idx ? idx.getX(lo * 3) : lo * 3;
      const b = idx ? idx.getX(lo * 3 + 1) : lo * 3 + 1;
      const c = idx ? idx.getX(lo * 3 + 2) : lo * 3 + 2;
      vA.fromBufferAttribute(posAttr, a);
      vB.fromBufferAttribute(posAttr, b);
      vC.fromBufferAttribute(posAttr, c);
      let u = rand();
      let v = rand();
      if (u + v > 1) {
        u = 1 - u;
        v = 1 - v;
      }
      const w = 1 - u - v;
      const pos = new THREE.Vector3()
        .addScaledVector(vA, w)
        .addScaledVector(vB, u)
        .addScaledVector(vC, v);
      ab.subVectors(vB, vA);
      ac.subVectors(vC, vA);
      const normal = cross.crossVectors(ab, ac).normalize().clone();

      const tooClose = samples.some((s) => s.position.distanceTo(pos) < minDist);
      if (!tooClose) samples.push({ position: pos, normal });
    }

    return sortSamplesAlongRibbon(samples);
  }, [scene, count]);
}

type ProjectDotProps = {
  sample: Sample;
  index: number;
  total: number;
  hovered: boolean;
  activeProgress: number;
  onHover: (i: number | null) => void;
  href: string;
};

function ProjectDot({
  sample,
  index,
  total,
  hovered,
  activeProgress,
  onHover,
  href,
}: ProjectDotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const step = Math.floor((t / TWINKLE_CYCLE_SEC) * total) % total;
    const ringDist = Math.min((index - step + total) % total, (step - index + total) % total);
    const sparkle = ringDist === 0 ? 1 : ringDist === 1 ? 0.32 : 0.12;
    const idle = hovered ? 0.55 : 0.14;
    const bright = idle + (1 - idle) * sparkle;

    if (coreMatRef.current) {
      coreMatRef.current.opacity = THREE.MathUtils.lerp(
        coreMatRef.current.opacity,
        0.35 + bright * 0.65,
        Math.min(1, delta * 10),
      );
    }
    if (glowMatRef.current) {
      glowMatRef.current.opacity = THREE.MathUtils.lerp(
        glowMatRef.current.opacity,
        0.04 + bright * 0.22,
        Math.min(1, delta * 10),
      );
    }
    if (groupRef.current) {
      const targetScale = hovered ? 1.35 : 0.75 + bright * 0.35;
      const s = THREE.MathUtils.lerp(
        groupRef.current.scale.x,
        targetScale,
        Math.min(1, delta * 10),
      );
      groupRef.current.scale.setScalar(s);
    }
  });

  if (activeProgress <= 0.35) return null;

  const dotPos = sample.position.clone().addScaledVector(sample.normal, 0.04);

  return (
    <group ref={groupRef} position={dotPos}>
      <mesh renderOrder={3} raycast={() => null}>
        <sphereGeometry args={[0.055, 10, 10]} />
        <meshBasicMaterial
          ref={glowMatRef}
          color="#FFFFFF"
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      <mesh
        renderOrder={4}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(index);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          onHover(null);
          document.body.style.cursor = "";
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (href && href !== "#") window.location.href = href;
        }}
      >
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial
          ref={coreMatRef}
          color="#FFFFFF"
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Sculpture({
  hovered,
  setHovered,
  activeProgress,
}: {
  hovered: number | null;
  setHovered: (i: number | null) => void;
  activeProgress: number;
}) {
  const gltf = useGLTF(SCULPTURE_URL, undefined, true);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  const samples = useSurfaceSamples(scene, PROJE_SAYISI);
  const groupRef = useRef<THREE.Group>(null);

  // Grace timer: dot → popup arası boşlukta flicker olmasın
  const hoverTimerRef = useRef<number | null>(null);
  const requestSetHover = (val: number | null) => {
    if (hoverTimerRef.current !== null) {
      window.clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (val === null) {
      hoverTimerRef.current = window.setTimeout(() => {
        setHovered(null);
        hoverTimerRef.current = null;
      }, 200);
    } else {
      setHovered(val);
    }
  };

  // Orijinal Meshy materyali aynen korunuyor — material'a dokunulmaz.

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.x = (1 - activeProgress) * 1.6;
    groupRef.current.scale.setScalar(1 + activeProgress * 0.45);
    groupRef.current.rotation.y = activeProgress * Math.PI * 2;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
      {samples.map((sample, i) => (
        <ProjectDot
          key={projeGorselleriTum[i].src}
          sample={sample}
          index={i}
          total={PROJE_SAYISI}
          hovered={hovered === i}
          activeProgress={activeProgress}
          onHover={requestSetHover}
          href="#projeler"
        />
      ))}

    </group>
  );
}

useGLTF.preload(SCULPTURE_URL, undefined, true);

const DEFAULT_CAM_POS = new THREE.Vector3(0, 0.4, 4.5);
const DEFAULT_TARGET = new THREE.Vector3(0, 0, 0);
/** Fare canvas’tan çıktıktan sonra kameranın dönmesi için bekleme (ms) */
const RETURN_AFTER_LEAVE_MS = 350;

function CameraAutoReturn({
  controlsRef,
  pointerOverCanvas,
}: {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  pointerOverCanvas: boolean;
}) {
  const { camera } = useThree();
  const hasEnteredRef = useRef(false);
  const leftAtRef = useRef(performance.now());
  const wasOverRef = useRef(false);

  useEffect(() => {
    if (pointerOverCanvas) {
      hasEnteredRef.current = true;
    }
    if (wasOverRef.current && !pointerOverCanvas) {
      leftAtRef.current = performance.now();
    }
    wasOverRef.current = pointerOverCanvas;
  }, [pointerOverCanvas]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!controls || !hasEnteredRef.current || pointerOverCanvas) return;

    if (performance.now() - leftAtRef.current < RETURN_AFTER_LEAVE_MS) return;

    camera.position.lerp(DEFAULT_CAM_POS, Math.min(1, delta * 1.4));
    controls.target.lerp(DEFAULT_TARGET, Math.min(1, delta * 1.4));
    controls.update();
  });

  return null;
}

type SculptureGalleryProps = {
  activeProgress: number;
  /** Görünür değilken WebGL döngüsünü durdurur */
  renderActive?: boolean;
};

export function SculptureGallery3D({
  activeProgress,
  renderActive = true,
}: SculptureGalleryProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pointerOverCanvas, setPointerOverCanvas] = useState(false);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const ctaVisible = activeProgress > 0.55;
  const popupItem =
    hovered !== null
      ? projeGorselleriTum[hovered]
      : null;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      onPointerEnter={() => setPointerOverCanvas(true)}
      onPointerLeave={() => setPointerOverCanvas(false)}
    >
      <Canvas
        camera={{ position: [0, 0.4, 4.5], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop={renderActive ? "always" : "demand"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 5, 5]} intensity={1.0} />
        <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#F2E6CC" />
        <Suspense fallback={null}>
          <Sculpture
            hovered={hovered}
            setHovered={setHovered}
            activeProgress={activeProgress}
          />
        </Suspense>
        <Suspense fallback={null}>
          <Environment preset="city" background={false} />
        </Suspense>
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.1}
          rotateSpeed={0.85}
          makeDefault
        />
        <CameraAutoReturn
          controlsRef={controlsRef}
          pointerOverCanvas={pointerOverCanvas}
        />
      </Canvas>

      {/* Hover popup — sağda, dikey ortada, büyük */}
      <div
        aria-hidden={!popupItem}
        className="pointer-events-none absolute right-6 bottom-16 z-40 transition-all duration-300 ease-out md:right-12 md:bottom-24"
        style={{
          opacity: popupItem ? 1 : 0,
          transform: popupItem ? "translateX(0)" : "translateX(12px)",
        }}
      >
        {popupItem && hovered !== null ? (
          <a
            href="#projeler"
            className="pointer-events-auto block w-[22rem] overflow-hidden rounded-2xl border border-bahen-border bg-bahen-surface/95 text-left shadow-[0_30px_80px_-18px_rgba(28,24,20,0.65)] backdrop-blur-md md:w-[24rem]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1A1612]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={popupItem.src}
                alt={popupItem.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-bahen-ink/85 px-2.5 py-1 text-[11px] font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-sm">
                {String(hovered + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="p-5">
              <p className="navbar-wordmark text-[18px] font-semibold leading-tight tracking-tight text-bahen-ink md:text-[19px]">
                {popupItem.title}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-bahen-muted">
                {popupItem.caption}
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-bahen-primary">
                Projeyi gör <span aria-hidden>→</span>
              </p>
            </div>
          </a>
        ) : null}
      </div>

      {/* "Projeleri Gör →" CTA */}
      <a
        href="#projeler"
        aria-label="Projeleri gör"
        className={`absolute inset-x-0 bottom-10 z-30 mx-auto flex justify-center transition-all duration-500 ease-out md:bottom-14 ${
          ctaVisible
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <span className="navbar-wordmark inline-flex items-center gap-3 rounded-full border border-white/35 bg-white/[0.08] px-7 py-3 text-base font-semibold tracking-[-0.01em] text-white shadow-[0_18px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md transition hover:border-white/55 hover:bg-white/[0.16] md:px-9 md:py-3.5 md:text-lg">
          Projeleri gör
          <span aria-hidden className="text-xl leading-none">
            →
          </span>
        </span>
      </a>
    </div>
  );
}
