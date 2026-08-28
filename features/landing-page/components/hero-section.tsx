"use client";

import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LiquidParticleBackground, GlassShape } from "@/shared/components/premium";

export function HeroSection() {
  const { t } = useTranslation();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, delay: 0.2 })
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.6")
      .fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4");
  }, []);

  return (
    <section id="hero" className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6 pt-32 pb-20 z-20">
      <LiquidParticleBackground particleSpacing={50} interactionRadius={120} />
      
      {/* Decorative glass shapes */}
      <GlassShape shape="circle" size={220} top="-40px" left="-60px" tint="red" opacity={0.12} rotate={0} parallaxSpeed={-0.2} />
      <GlassShape shape="diamond" size={160} top="10%" right="-30px" tint="neutral" opacity={0.1} rotate={12} parallaxSpeed={0.4} />
      <GlassShape shape="rectangle" size={100} bottom="15%" left="5%" tint="red" opacity={0.07} rotate={-8} parallaxSpeed={0.5} blur={20} />
      <GlassShape shape="cube" size={80} bottom="8%" right="8%" tint="white" opacity={0.06} rotate={20} parallaxSpeed={-0.3} />
      
      <div className="relative z-10 mx-auto max-w-5xl w-full text-center pointer-events-none">
        {/* Angled glass backdrop — sits behind text, provides contrast against the 3D */}
        <div 
          className="absolute -inset-x-8 -inset-y-12 -skew-y-2 rounded-3xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, hsla(0,0%,5%,0.7) 0%, hsla(0,0%,10%,0.5) 50%, hsla(351,97%,10%,0.3) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 0 80px rgba(217,3,36,0.08), inset 0 1px 0 rgba(255,255,255,0.03)",
            border: "1px solid hsla(0,0%,100%,0.04)",
          }}
        />

        {/* Glowing accent line */}
        <div className="relative z-10 mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-[hsl(351,97%,43.1%)] to-transparent shadow-[0_0_20px_rgba(217,3,36,0.6)]" />

        <h1 
          ref={titleRef}
          className="relative z-10 mb-8 font-heading text-4xl leading-[0.9] tracking-tighter text-[hsl(0,100%,97.3%)] opacity-0 sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl uppercase pointer-events-auto"
          style={{ textShadow: "0 2px 30px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.5)" }}
        >
          {t("landing.hero.title") || "O SEU PRÓXIMO"}{" "}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[hsl(351,97%,53%)] via-[hsl(351,97%,43.1%)] to-[hsl(10,90%,55%)]">
            {t("landing.hero.titleHighlight") || "SAAS. PRONTO."}
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="relative z-10 mx-auto mb-12 max-w-2xl text-base leading-relaxed text-[hsl(0,0%,70%)] opacity-0 pointer-events-auto sm:text-lg md:text-xl"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}
        >
          {t("landing.hero.subtitle") || "Esta landing page foi construída com os mesmos componentes que você está prestes a adquirir. Inicie com uma base brutalista, de alta performance, projetada para dominar."}
        </p>

        <div
          ref={ctaRef}
          className="relative z-10 flex flex-col gap-6 opacity-0 sm:flex-row sm:items-center sm:justify-center pointer-events-auto"
        >
          <Link
            href="/login"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-none bg-[hsl(351,97%,43.1%)] px-6 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-heading uppercase text-[hsl(0,100%,97.3%)] transition-transform hover:scale-105 shadow-[0_0_30px_rgba(217,3,36,0.5)]"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
            <span className="relative z-10">{t("landing.hero.cta") || "INICIAR SISTEMA"}</span>
            <ArrowRight className="relative z-10 h-6 w-6 transition-transform group-hover:translate-x-2" />
          </Link>
          <Link
            href="#features"
            className="group inline-flex items-center justify-center gap-2 px-6 py-4 sm:px-8 sm:py-4 text-xs sm:text-sm font-mono uppercase tracking-widest text-[hsl(0,0%,90%)] transition-colors hover:text-[hsl(0,100%,100%)] bg-[hsl(0,0%,15%,0.5)] backdrop-blur-md rounded-none border border-[hsl(0,0%,30%)]"
          >
            {t("landing.hero.ctaSecondary") || "Explorar Protocolo"}
          </Link>
        </div>
      </div>
    </section>
  );
}
