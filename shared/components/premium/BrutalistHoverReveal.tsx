"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

interface RevealItem {
  id: string;
  text: string;
  imageUrl: string;
}

export function BrutalistHoverReveal({
  items,
  className = "",
}: {
  items: RevealItem[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Create refs for each image container
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hoveredIndex !== null && imageRefs.current[hoveredIndex]) {
        const imageEl = imageRefs.current[hoveredIndex];
        if (imageEl) {
          // Calculate position based on mouse relative to the container
          gsap.to(imageEl, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [hoveredIndex]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    const imgEl = imageRefs.current[index];
    if (imgEl) {
      gsap.fromTo(
        imgEl,
        { scale: 0.5, opacity: 0, rotation: gsap.utils.random(-15, 15) },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "back.out(1.5)" }
      );
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    const imgEl = imageRefs.current[index];
    if (imgEl) {
      gsap.to(imgEl, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Floating Images Layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {items.map((item, idx) => (
          <div
            key={`img-${item.id}`}
            ref={(el) => {
              imageRefs.current[idx] = el;
            }}
            className="absolute left-0 top-0 w-64 h-80 rounded-xl overflow-hidden shadow-2xl opacity-0"
            style={{ 
              transform: "translate(-50%, -50%)",
              border: "1px solid hsl(0 0% 20%)", // neutral-border
              backgroundColor: "hsl(0 0% 13%)" // neutral-surface
            }}
          >
            {/* Glassmorphic overlay */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10 mix-blend-overlay"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={item.imageUrl} 
              alt={item.text} 
              className="w-full h-full object-cover filter contrast-125 saturate-0" 
            />
          </div>
        ))}
      </div>

      {/* Text List */}
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        {items.map((item, idx) => (
          <div
            key={`text-${item.id}`}
            className="group cursor-pointer relative"
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
          >
            <h2 className="font-heading text-6xl md:text-8xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[hsl(0,100%,97.3%)] to-[hsl(0,0%,55%)] hover:from-[hsl(351,97%,43.1%)] hover:to-[hsl(351,97%,30%)] transition-all duration-300 ease-out select-none">
              {item.text.toUpperCase()}
            </h2>
            <div className="absolute -bottom-2 left-0 w-0 h-1 bg-[hsl(351,97%,43.1%)] group-hover:w-full transition-all duration-500 ease-out"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
