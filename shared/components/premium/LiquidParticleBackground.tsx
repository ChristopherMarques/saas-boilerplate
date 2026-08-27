"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
}

export function LiquidParticleBackground({
  className = "",
  particleSpacing = 30,
  interactionRadius = 150,
}: {
  className?: string;
  particleSpacing?: number;
  interactionRadius?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    const initDots = () => {
      dots = [];
      const cols = Math.floor(canvas.width / particleSpacing);
      const rows = Math.floor(canvas.height / particleSpacing);
      
      const offsetX = (canvas.width - cols * particleSpacing) / 2;
      const offsetY = (canvas.height - rows * particleSpacing) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: offsetX + i * particleSpacing,
            y: offsetY + j * particleSpacing,
            baseX: offsetX + i * particleSpacing,
            baseY: offsetY + j * particleSpacing,
            size: 1.5,
            color: "hsl(0 0% 30%)", // Base neutral dark
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        const dx = mouseRef.current.x - dot.baseX;
        const dy = mouseRef.current.y - dot.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          const pushX = (dx / distance) * force * 20;
          const pushY = (dy / distance) * force * 20;
          
          dot.x = gsap.utils.interpolate(dot.x, dot.baseX - pushX, 0.1);
          dot.y = gsap.utils.interpolate(dot.y, dot.baseY - pushY, 0.1);
          
          // Color shift to crimson based on proximity
          const r = gsap.utils.interpolate(76, 217, force); 
          const g = gsap.utils.interpolate(76, 3, force);
          const b = gsap.utils.interpolate(76, 36, force);
          dot.color = `rgb(${r}, ${g}, ${b})`;
          dot.size = gsap.utils.interpolate(1.5, 3, force);
        } else {
          dot.x = gsap.utils.interpolate(dot.x, dot.baseX, 0.1);
          dot.y = gsap.utils.interpolate(dot.y, dot.baseY, 0.1);
          dot.color = "hsl(0 0% 25%)";
          dot.size = gsap.utils.interpolate(dot.size, 1.5, 0.1);
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleSpacing, interactionRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none -z-10 ${className}`}
      style={{ background: "transparent" }}
    />
  );
}
