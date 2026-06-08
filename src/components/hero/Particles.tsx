'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Shared material — created once
const particleMat = new THREE.PointsMaterial({
  size: 0.022,
  color: new THREE.Color('#C9A227'),
  sizeAttenuation: true,
  transparent: true,
  opacity: 0.45,
  depthWrite: false,
});

export function Particles({ count = 80 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.016;
    pointsRef.current.rotation.x = Math.sin(t * 0.007) * 0.05;
  });

  return <points ref={pointsRef} geometry={geometry} material={particleMat} />;
}
