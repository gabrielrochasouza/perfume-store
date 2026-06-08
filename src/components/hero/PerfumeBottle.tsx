'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  mouseX: number;
  mouseY: number;
}

// Pre-allocate reusable materials — avoids garbage collection per frame
const glassMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#C9A227'),
  metalness: 0.15,
  roughness: 0.12,
  envMapIntensity: 2.5,
  transparent: true,
  opacity: 0.82,
});

const goldMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#C9A227'),
  metalness: 0.95,
  roughness: 0.07,
  envMapIntensity: 2,
});

const deepGoldMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#9d7b1a'),
  metalness: 0.98,
  roughness: 0.04,
});

export function PerfumeBottle({ mouseX, mouseY }: Props) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Slow continuous Y rotation + mouse offset
    groupRef.current.rotation.y = t * 0.25 + mouseX * 0.22;
    // Smooth X tilt from mouse
    const targetX = mouseY * 0.14;
    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef} scale={0.82}>
      {/* Main body — amber tinted glass (no transmission = no extra render pass) */}
      <mesh material={glassMat}>
        <boxGeometry args={[0.72, 2.1, 0.44]} />
      </mesh>

      {/* Bottom accent bar */}
      <mesh position={[0, -1.13, 0]} material={goldMat}>
        <boxGeometry args={[0.76, 0.08, 0.48]} />
      </mesh>

      {/* Neck taper */}
      <mesh position={[0, 1.18, 0]} material={goldMat}>
        <cylinderGeometry args={[0.14, 0.3, 0.2, 24]} />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 1.46, 0]} material={goldMat}>
        <boxGeometry args={[0.48, 0.52, 0.32]} />
      </mesh>

      {/* Cap knob */}
      <mesh position={[0, 1.74, 0]} material={deepGoldMat}>
        <cylinderGeometry args={[0.09, 0.09, 0.07, 12]} />
      </mesh>
    </group>
  );
}
