"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger, making sure it only happens on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollGalaxyRings({
  className = "",
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<SVGSVGElement>(null);
  const ring2Ref = useRef<SVGSVGElement>(null);
  const ring3Ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1, // Smooth scrubbing
      },
    });

    // Animate the rings rotating and scaling as user scrolls past
    tl.to(ring1Ref.current, {
      rotation: 180,
      scale: 1.2,
      ease: "none",
    }, 0)
    .to(ring2Ref.current, {
      rotation: -120,
      scale: 1.5,
      ease: "none",
    }, 0)
    .to(ring3Ref.current, {
      rotation: 270,
      scale: 1.1,
      ease: "none",
    }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-[100vh] flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Background glow to emphasize rings */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[hsl(351,97%,43.1%,0.05)] to-transparent pointer-events-none"></div>

      {/* Ring 1 - Inner */}
      <svg
        ref={ring1Ref}
        viewBox="0 0 1000 1000"
        className="absolute w-[1000px] h-[1000px] opacity-30 mix-blend-screen"
        style={{ transformOrigin: "center center" }}
      >
        <circle 
          cx="500" 
          cy="500" 
          r="490" 
          fill="none" 
          stroke="hsl(0, 100%, 97.3%)" 
          strokeWidth="1" 
          strokeDasharray="2 15" 
        />
      </svg>

      {/* Ring 2 - Middle (Crimson) */}
      <svg
        ref={ring2Ref}
        viewBox="0 0 1600 1600"
        className="absolute w-[1600px] h-[1600px] opacity-50 mix-blend-screen"
        style={{ transformOrigin: "center center" }}
      >
        <circle 
          cx="800" 
          cy="800" 
          r="790" 
          fill="none" 
          stroke="hsl(351, 97%, 43.1%)" 
          strokeWidth="3" 
          strokeDasharray="8 30" 
        />
        {/* Glow on the middle ring */}
        <circle 
          cx="800" 
          cy="800" 
          r="790" 
          fill="none" 
          stroke="hsl(351, 97%, 43.1%)" 
          strokeWidth="8" 
          strokeDasharray="8 30"
          className="blur-xl opacity-40"
        />
      </svg>

      {/* Ring 3 - Outer */}
      <svg
        ref={ring3Ref}
        viewBox="0 0 2200 2200"
        className="absolute w-[2200px] h-[2200px] opacity-20 mix-blend-screen"
        style={{ transformOrigin: "center center" }}
      >
        <circle 
          cx="1100" 
          cy="1100" 
          r="1090" 
          fill="none" 
          stroke="hsl(0, 0%, 55%)" 
          strokeWidth="2" 
          strokeDasharray="2 25" 
        />
      </svg>

      {/* Center content */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <div className="w-24 h-24 rounded-full border border-[hsl(351,97%,43.1%)] bg-[hsl(0,0%,13%)] shadow-[0_0_50px_rgba(217,3,36,0.3)] flex items-center justify-center backdrop-blur-sm mb-8">
           <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="hsl(0, 100%, 97.3%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
           </svg>
        </div>
        <h3 className="font-['Archivo_Black'] text-4xl md:text-5xl text-[hsl(0,100%,97.3%)] mb-4 tracking-tight">
          ENTRE NO VAZIO
        </h3>
        <p className="text-[hsl(0,0%,55%)] max-w-md mx-auto text-lg">
          Desbloqueie o potencial do seu produto com componentes criados para aliar velocidade à estética pura.
        </p>
      </div>
    </div>
  );
}
