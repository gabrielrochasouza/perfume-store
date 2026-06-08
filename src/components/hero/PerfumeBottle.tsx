'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  mouseX: number;
  mouseY: number;
}

export function PerfumeBottle({ mouseX, mouseY }: Props) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = mouseY * 0.14;
    const targetY = mouseX * 0.22;
    groupRef.current.rotation.x +=
      (targetX - groupRef.current.rotation.x) * 0.04;
    groupRef.current.rotation.y +=
      (targetY - groupRef.current.rotation.y) * 0.04;
  });

  return (
    <group ref={groupRef} scale={1.15}>
      {/* Main body — amber glass */}
      <mesh castShadow>
        <boxGeometry args={[0.72, 2.1, 0.44]} />
        <meshPhysicalMaterial
          color="#C9A227"
          transmission={0.82}
          thickness={0.7}
          roughness={0.06}
          metalness={0.04}
          ior={1.5}
          transparent
          opacity={0.88}
          envMapIntensity={2}
        />
      </mesh>

      {/* Bottom accent bar */}
      <mesh position={[0, -1.13, 0]} castShadow>
        <boxGeometry args={[0.76, 0.08, 0.48]} />
        <meshStandardMaterial
          color="#C9A227"
          metalness={0.92}
          roughness={0.08}
          envMapIntensity={2}
        />
      </mesh>

      {/* Neck taper */}
      <mesh position={[0, 1.18, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.3, 0.2, 32]} />
        <meshStandardMaterial
          color="#C9A227"
          metalness={0.93}
          roughness={0.07}
          envMapIntensity={2}
        />
      </mesh>

      {/* Cap */}
      <mesh position={[0, 1.46, 0]} castShadow>
        <boxGeometry args={[0.48, 0.52, 0.32]} />
        <meshStandardMaterial
          color="#C9A227"
          metalness={0.93}
          roughness={0.07}
          envMapIntensity={2}
        />
      </mesh>

      {/* Cap top knob */}
      <mesh position={[0, 1.74, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.07, 16]} />
        <meshStandardMaterial
          color="#9d7b1a"
          metalness={0.98}
          roughness={0.04}
        />
      </mesh>
    </group>
  );
}
