'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import { PerfumeBottle } from './PerfumeBottle';
import { Particles } from './Particles';

interface Props {
  mouseX: number;
  mouseY: number;
}

export default function PerfumeScene({ mouseX, mouseY }: Props) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.5], fov: 36 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 8, 4]} intensity={2.2} color="#ffffff" castShadow />
        <directionalLight position={[-5, -2, -4]} intensity={1} color="#C9A227" />
        <pointLight position={[3, 2, 5]} intensity={1.8} color="#C9A227" />
        <pointLight position={[-3, 4, -2]} intensity={0.7} color="#ffffff" />

        <Environment preset="studio" />

        <Particles />

        <Float speed={1.4} floatIntensity={0.3} rotationIntensity={0}>
          <PerfumeBottle mouseX={mouseX} mouseY={mouseY} />
        </Float>

        <ContactShadows
          position={[0, -1.9, 0]}
          opacity={0.4}
          scale={5}
          blur={2.5}
          far={4}
          color="#C9A227"
        />
      </Suspense>
    </Canvas>
  );
}
