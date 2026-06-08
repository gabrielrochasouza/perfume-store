'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import { PerfumeBottle } from './PerfumeBottle';
import { Particles } from './Particles';

interface Props {
  mouseX: number;
  mouseY: number;
}

export default function PerfumeScene({ mouseX, mouseY }: Props) {
  return (
    <Canvas
      dpr={1}                        // cap at 1× — halves pixel count on retina
      camera={{ position: [0, 0, 5.5], fov: 36 }}
      gl={{
        antialias: false,            // disable MSAA for perf
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[6, 8, 4]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-5, -2, -4]} intensity={1} color="#C9A227" />
        <pointLight position={[3, 2, 5]} intensity={1.8} color="#C9A227" />

        {/* Environment for reflections only — no background render */}
        <Environment preset="studio" />

        <Particles />

        <Float speed={1.4} floatIntensity={0.3} rotationIntensity={0}>
          <PerfumeBottle mouseX={mouseX} mouseY={mouseY} />
        </Float>
        {/* ContactShadows removed — was an extra render pass every frame */}
      </Suspense>
    </Canvas>
  );
}
