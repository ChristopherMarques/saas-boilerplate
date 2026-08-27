"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GlassShapeProps {
  shape: "circle" | "diamond" | "cube" | "rectangle";
  size?: number; // px
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: number;
  tint?: "red" | "neutral" | "white";
  blur?: number;
  opacity?: number;
  parallaxSpeed?: number; // how much it moves on scroll (negative = opposite)
}

export function GlassShape({
  shape,
  size = 120,
  top,
  left,
  right,
  bottom,
  rotate = 0,
  tint = "neutral",
  blur = 16,
  opacity = 0.08,
  parallaxSpeed = 0.3,
}: GlassShapeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Parallax: shape moves slightly on scroll for depth
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: `${parallaxSpeed * 100}%`,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [parallaxSpeed]);

  const tints = {
    red: "linear-gradient(135deg, hsla(351,97%,43%,0.15) 0%, hsla(351,97%,30%,0.05) 100%)",
    neutral: "linear-gradient(135deg, hsla(0,0%,20%,0.12) 0%, hsla(0,0%,10%,0.04) 100%)",
    white: "linear-gradient(135deg, hsla(0,0%,100%,0.06) 0%, hsla(0,0%,100%,0.02) 100%)",
  };

  const borderColors = {
    red: "hsla(351,97%,43%,0.12)",
    neutral: "hsla(0,0%,100%,0.05)",
    white: "hsla(0,0%,100%,0.08)",
  };

  const shapeStyles: Record<string, string> = {
    circle: "50%",
    diamond: "0%",
    cube: "12px",
    rectangle: "8px",
  };

  const isRectangle = shape === "rectangle";
  const isDiamond = shape === "diamond";

  return (
    <div
      ref={ref}
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        right,
        bottom,
        width: isRectangle ? size * 1.8 : size,
        height: size,
        borderRadius: shapeStyles[shape],
        transform: `rotate(${isDiamond ? rotate + 45 : rotate}deg)`,
        background: tints[tint],
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: `1px solid ${borderColors[tint]}`,
        boxShadow: tint === "red"
          ? "0 0 40px rgba(217,3,36,0.05), inset 0 0 30px rgba(217,3,36,0.03)"
          : "0 0 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.02)",
        opacity,
        zIndex: 5,
      }}
    />
  );
}
