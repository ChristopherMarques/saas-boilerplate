"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Environment, ContactShadows, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function SemicolonStinger() {
  const groupRef = useRef<THREE.Group>(null);

  // Rotate the entire group slowly
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* The Dot (Semicolon top part / Scorpion venom drop) */}
        <mesh position={[0, 2.2, 0]}>
          <sphereGeometry args={[0.5, 64, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={2}
            roughness={0.1}
            transmission={1}
            ior={1.5}
            chromaticAberration={0.1}
            anisotropy={0.3}
            color="#d90324"
            emissive="#d90324"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* The Comma / Stinger */}
        {/* We build a stylized curved stinger using overlapping geometry or a simple cone */}
        <mesh position={[0, -0.5, 0.2]} rotation={[0.2, 0, 0]}>
          {/* A tapered cylinder to act as the stinger body */}
          <cylinderGeometry args={[0.6, 0.1, 4, 64]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={3}
            roughness={0.2}
            transmission={0.9}
            ior={1.4}
            chromaticAberration={0.2}
            color="#111111"
            emissive="#1a0004"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Inner glowing core of the stinger */}
        <mesh position={[0, -0.5, 0.2]} rotation={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.05, 3.8, 32]} />
          <meshBasicMaterial color="#ff002b" />
        </mesh>

        <pointLight position={[0, 2.2, 0]} color="#ff002b" intensity={50} distance={10} />
      </Float>
    </group>
  );
}

export function ScorpionSemicolon3D() {
  return (
    <div className="w-full h-[500px] md:h-[700px] relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#d90324" />
        
        <SemicolonStinger />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#000000" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
