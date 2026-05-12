"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Center, Html, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";

const MODEL_SRC = "/models/meshy-industrial.glb";

useGLTF.preload(MODEL_SRC, true, true);

function LoadingHud() {
  const { active, progress, errors } = useProgress();
  if (errors.length > 0) {
    return (
      <Html center prepend zIndexRange={[100, 100]}>
        <div className="max-w-[260px] rounded-xl border border-red-500/25 bg-[#050507]/90 px-4 py-3 text-center text-[12px] leading-snug text-red-100/90 backdrop-blur-sm">
          Model yüklenemedi. Dosyanın{" "}
          <code className="rounded bg-white/10 px-1 py-0.5 text-[11px] text-white/80">
            public/models/meshy-industrial.glb
          </code>{" "}
          yolunda olduğundan emin olun.
        </div>
      </Html>
    );
  }
  if (!active) return null;
  return (
    <Html center prepend zIndexRange={[100, 100]}>
      <div className="flex w-[220px] flex-col items-center gap-2 rounded-xl border border-white/[0.08] bg-[#050507]/85 px-4 py-3 backdrop-blur-sm">
        <span className="text-[11px] font-medium tracking-wide text-white/55">
          Model yükleniyor…
        </span>
        <span className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <span
            className="block h-full rounded-full bg-gradient-to-r from-amber-300/80 to-indigo-400/90 transition-[width] duration-200"
            style={{ width: `${Math.min(100, Math.round(progress))}%` }}
          />
        </span>
        <span className="text-[10px] tabular-nums text-white/40">{Math.round(progress)}%</span>
      </div>
    </Html>
  );
}

/** OrbitControls.autoRotate, tekerlek / sürükleme sonrası duruyor; dönüşü her karede uygularız. */
function AlwaysSpinningModel({ scene }: { scene: THREE.Object3D }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const g = groupRef.current;
    if (g) g.rotation.y += delta * 0.52;
  });
  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function IndustrialScene() {
  const gltf = useGLTF(MODEL_SRC, true, true);

  return (
    <>
      <hemisphereLight intensity={0.58} groundColor="#050507" color="#e8ecff" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[14, 22, 12]} intensity={1.28} />
      <directionalLight position={[-12, 10, -10]} intensity={0.38} color="#b4c2ff" />
      <Bounds fit observe margin={0.92}>
        <Center>
          <AlwaysSpinningModel scene={gltf.scene} />
        </Center>
      </Bounds>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 5.5}
        maxPolarAngle={Math.PI / 2.05}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

export function ShowcaseIndustrialModel() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-[min(48vh,520px)] w-full items-center justify-center md:h-[min(56vh,620px)] lg:h-[min(62vh,700px)]">
        <p className="text-[13px] text-white/45">3D sahne açılıyor…</p>
      </div>
    );
  }

  return (
    <div className="relative h-[min(48vh,520px)] w-full md:h-[min(56vh,620px)] lg:h-[min(62vh,700px)]">
      <Canvas
        camera={{ fov: 36, near: 0.06, far: 280 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x050507, 0);
        }}
        dpr={[1, 1.5]}
        className="h-full w-full touch-pan-y"
      >
        <Suspense fallback={null}>
          <IndustrialScene />
        </Suspense>
        <LoadingHud />
      </Canvas>
    </div>
  );
}
