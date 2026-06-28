"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Stars, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import * as THREE from "three";

const PremiumBlob = () => {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5} floatingRange={[-0.2, 0.2]}>
      <group position={[0, -0.5, -3]}>
        <Sphere args={[1.8, 64, 64]}>
          <MeshDistortMaterial
            color="#050505"
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.9}
            roughness={0.1}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </group>
    </Float>
  );
};

export const Background3D = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-90">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} color="#ffffff" />
          
          {/* Deep violet and blue lights to create vibrant rim lighting */}
          <directionalLight position={[10, 10, 5]} intensity={4} color="#a855f7" />
          <directionalLight position={[-10, -10, -5]} intensity={3} color="#00c6ff" />
          <ambientLight intensity={0.5} color="#ffffff" />
          
          <directionalLight position={[10, 10, 5]} intensity={8} color="#a855f7" />
          <directionalLight position={[-10, -10, -5]} intensity={6} color="#00c6ff" />
          <pointLight position={[0, 0, 5]} intensity={2} color="#ffffff" />
          
          <Stars radius={100} depth={50} count={1000} factor={3} saturation={1} fade speed={1} />
          
          <PremiumBlob />
        </Suspense>
      </Canvas>
    </div>
  );
};
