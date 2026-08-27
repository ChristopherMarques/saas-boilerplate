"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";

export function MagneticGlassCard({
  children,
  className = "",
  magneticStrength = 20,
  badge,
}: {
  children: React.ReactNode;
  className?: string;
  magneticStrength?: number;
  badge?: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    const moveX = ((x - centerX) / centerX) * magneticStrength;
    const moveY = ((y - centerY) / centerY) * magneticStrength;

    gsap.to(cardRef.current, {
      x: moveX,
      y: moveY,
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center center",
    });

    gsap.to(glowRef.current, {
      x: x - 150, // Center the 300px glow
      y: y - 150,
      opacity: 1,
      duration: 0.1,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current || !glowRef.current) return;

    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });

    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.3,
    });
  };

  return (
    <div
      className={`relative w-full max-w-sm ${className}`}
      style={{
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {badge && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit z-50">
          {badge}
        </div>
      )}
      <div
        ref={cardRef}
        className="relative w-full h-full rounded-xl p-[1px] bg-gradient-to-br from-[hsl(0,0%,30%)] to-[hsl(0,0%,15%)] shadow-lg"
        style={{
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(217, 3, 36, 0.1)"
            : "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-[hsl(0,0%,13%)] backdrop-blur-md">
          {/* Noise overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')",
            }}
          ></div>

          {/* Dynamic Glow */}
          <div
            ref={glowRef}
            className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none opacity-0"
            style={{
              background: "radial-gradient(circle, rgba(217,3,36,0.15) 0%, rgba(217,3,36,0) 70%)",
              mixBlendMode: "screen",
            }}
          ></div>

          {/* Content */}
          <div className="relative z-10 h-full text-[hsl(0,100%,97.3%)] flex flex-col justify-between">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
