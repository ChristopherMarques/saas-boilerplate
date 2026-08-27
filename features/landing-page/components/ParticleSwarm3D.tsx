"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function SwarmNode() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.rotation.z = Math.sin(time * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={1} fade speed={1} />
      <points>
        <sphereGeometry args={[15, 32, 32]} />
        <PointMaterial transparent color="#d90324" size={0.1} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
      </points>
      <mesh>
        <sphereGeometry args={[14, 16, 16]} />
        <meshBasicMaterial color="#1a0004" wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export function ParticleSwarm3D() {
  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60 mix-blend-screen hidden md:block"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
      }}
    >
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.5} />
        <SwarmNode />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
