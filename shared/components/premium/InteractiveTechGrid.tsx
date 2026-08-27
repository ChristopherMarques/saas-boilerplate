"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticGlassCard } from "./MagneticGlassCard";

gsap.registerPlugin(ScrollTrigger);

export interface TechItem {
  id: string;
  name: string;
  category: string;
}

export function InteractiveTechGrid({
  items,
  className = "",
}: {
  items: TechItem[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el, index) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.8, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: (index % 4) * 0.1,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {items.map((item, idx) => (
        <div
          key={item.id}
          ref={(el) => {
            itemsRef.current[idx] = el;
          }}
          className="w-full"
        >
          <MagneticGlassCard magneticStrength={15} className="h-32">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[hsl(351,97%,43.1%)] mb-2">
                {item.category}
              </span>
              <span className="font-['Archivo_Black'] text-xl uppercase tracking-tight text-[hsl(0,100%,97.3%)]">
                {item.name}
              </span>
            </div>
          </MagneticGlassCard>
        </div>
      ))}
    </div>
  );
}
