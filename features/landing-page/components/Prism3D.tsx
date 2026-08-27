"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function PrismNode() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={2}>
        <octahedronGeometry args={[2, 0]} />
        <MeshTransmissionMaterial 
          background={new THREE.Color("#000000")}
          transmission={0.9} 
          thickness={1.5} 
          roughness={0.1} 
          ior={1.5} 
          chromaticAberration={0.06}
          anisotropy={0.1}
          color="#d90324"
        />
      </mesh>
    </Float>
  );
}

export function Prism3D() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none z-0 opacity-40 mix-blend-screen hidden lg:block">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={2} />
        <directionalLight position={[10, 10, 10]} intensity={5} color="#ff0000" />
        <directionalLight position={[-10, -10, -10]} intensity={2} color="#ffffff" />
        <PrismNode />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}
