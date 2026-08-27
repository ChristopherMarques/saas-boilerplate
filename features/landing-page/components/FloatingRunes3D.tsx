"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text } from "@react-three/drei";
import * as THREE from "three";

const RUNES_DATA = Array.from({ length: 8 }).map((_, i) => ({
  text: ["{", "}", "<>", "/", "||", "=>", "&&", ";"][i],
  speed: 2 + Math.random(),
  position: [
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 20,
    (Math.random() - 0.5) * 10
  ] as [number, number, number]
}));

function RunesNode() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh scale={5}>
          <icosahedronGeometry args={[2, 0]} />
          <meshBasicMaterial color="#1a0004" wireframe transparent opacity={0.1} />
        </mesh>
      </Float>
      
      {/* Floating text symbols/runes */}
      {RUNES_DATA.map((data, i) => (
        <Float key={i} speed={data.speed} rotationIntensity={2} floatIntensity={3}>
          <Text
            position={data.position}
            fontSize={2}
            color="#d90324"
            fillOpacity={0.2}
            font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwI.woff"
          >
            {data.text}
          </Text>
        </Float>
      ))}
    </group>
  );
}

export function FloatingRunes3D() {
  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-50 hidden lg:block"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)"
      }}
    >
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <ambientLight intensity={1} />
        <RunesNode />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
      </Canvas>
    </div>
  );
}
