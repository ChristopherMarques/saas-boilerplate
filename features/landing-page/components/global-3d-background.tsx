"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function CameraController() {
  useFrame((state) => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    // Hero starts camera far away (z=40), footer dives into the core (z=-10)
    const targetZ = 40 - (scrollProgress * 50);
    
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.rotation.z = THREE.MathUtils.lerp(state.camera.rotation.z, scrollProgress * Math.PI * 0.25, 0.05);
  });

  return null;
}

function CoreNode() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.x = time * -0.05;
      pointsRef.current.rotation.y = time * -0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.5}>
        <torusKnotGeometry args={[10, 3, 128, 32]} />
        <meshBasicMaterial color="#d90324" wireframe transparent opacity={0.15} />
      </mesh>

      <points ref={pointsRef} scale={1.5}>
        <torusKnotGeometry args={[10, 3, 128, 32]} />
        <pointsMaterial size={0.15} color="#d90324" transparent opacity={0.8} sizeAttenuation />
      </points>

      <Sparkles count={800} scale={50} size={2} speed={0.4} opacity={0.3} color="#ff002b" />
    </Float>
  );
}

export function Global3DBackground() {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 40], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <CameraController />
        <CoreNode />
      </Canvas>
    </div>
  );
}



