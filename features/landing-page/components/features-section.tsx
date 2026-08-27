"use client";

import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, CreditCard, Globe, Database, Puzzle, Zap } from "lucide-react";
import { MagneticGlassCard, GlassShape } from "@/shared/components/premium";
import { Prism3D } from "./Prism3D";

gsap.registerPlugin(ScrollTrigger);

const FEATURE_ICONS = [Shield, CreditCard, Globe, Database, Puzzle, Zap] as const;
const FEATURE_KEYS = ["auth", "payments", "i18n", "database", "components", "animations"] as const;

export function FeaturesSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      // Staggered cards animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 100, rotationX: -15 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            delay: (index % 3) * 0.15, // Stagger rows
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[hsl(0,0%,10.2%,0.85)] px-6 py-32 z-20" id="features">
      <Prism3D />
      <GlassShape shape="circle" size={300} top="-80px" right="-100px" tint="red" opacity={0.08} parallaxSpeed={0.3} />
      <GlassShape shape="diamond" size={120} top="30%" left="-40px" tint="neutral" opacity={0.1} rotate={15} parallaxSpeed={-0.4} />
      <GlassShape shape="cube" size={90} bottom="10%" right="5%" tint="white" opacity={0.06} rotate={-25} parallaxSpeed={0.5} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 
            ref={titleRef}
            className="font-['Archivo_Black'] text-5xl md:text-7xl uppercase tracking-tighter text-[hsl(0,100%,97.3%)] opacity-0"
          >
            {t("landing.features.title") || "MÓDULOS INTEGRADOS"}
          </h2>
          <div className="mx-auto mt-6 h-1 w-24 bg-[hsl(351,97%,43.1%)]"></div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {FEATURE_KEYS.map((key, index) => {
            const Icon = FEATURE_ICONS[index];
            return (
              <div
                key={key}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="w-full h-full flex justify-center"
              >
                <MagneticGlassCard className="h-[320px] w-full">
                  <div className="flex flex-col h-full p-8">
                    <div className="mb-auto inline-flex items-center justify-center rounded-xl bg-[hsl(351,97%,43.1%,0.1)] p-4 text-[hsl(351,97%,43.1%)] shadow-[0_0_15px_rgba(217,3,36,0.3)] border border-[hsl(351,97%,43.1%,0.3)] w-fit">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="mt-8">
                      <h3 className="mb-3 font-['Archivo_Black'] text-2xl uppercase tracking-tight text-[hsl(0,100%,97.3%)]">
                        {t(`landing.features.${key}.title`) || key.toUpperCase()}
                      </h3>
                      <p className="font-['Inter'] text-sm leading-relaxed text-[hsl(0,0%,55%)]">
                        {t(`landing.features.${key}.description`) || "Uma implementação robusta criada para performance bruta e confiabilidade absoluta em ambientes de produção."}
                      </p>
                    </div>
                  </div>
                </MagneticGlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
