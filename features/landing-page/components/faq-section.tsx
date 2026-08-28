"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingRunes3D } from "./FloatingRunes3D";
import { GlassShape } from "@/shared/components/premium";

gsap.registerPlugin(ScrollTrigger);

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export function FaqSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
            start: "top 85%",
          },
        }
      );

      faqRefs.current.forEach((el, index) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-6 py-32 bg-[hsl(0,0%,10.2%,0.85)] overflow-hidden z-20" id="faq">
      <FloatingRunes3D />
      <GlassShape shape="diamond" size={180} top="15%" right="-80px" tint="red" opacity={0.08} rotate={45} parallaxSpeed={0.5} blur={12} />
      <GlassShape shape="circle" size={120} bottom="20%" left="5%" tint="neutral" opacity={0.1} parallaxSpeed={-0.3} blur={16} />
      <div className="relative z-10 mx-auto max-w-3xl">
        <div ref={titleRef} className="mb-16 text-center">
          <h2 className="mb-4 font-heading text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-[hsl(0,100%,97.3%)]">
            {t("landing.faq.title") || "PERGUNTAS FREQUENTES"}
          </h2>
          <p className="text-base md:text-lg text-[hsl(0,0%,55%)] font-sans">
            {t("landing.faq.subtitle") || "Tudo o que você precisa saber para começar."}
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_KEYS.map((key, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={key}
                ref={(el) => {
                  faqRefs.current[index] = el;
                }}
                className={cn(
                  "rounded-none border transition-colors overflow-hidden",
                  isOpen ? "border-[hsl(351,97%,43.1%)] bg-[hsl(0,0%,13%)]" : "border-[hsl(0,0%,20%)] bg-[hsl(0,0%,12%)] hover:border-[hsl(0,0%,30%)]"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={cn(
                    "pr-4 text-lg font-heading uppercase tracking-tight transition-colors",
                    isOpen ? "text-[hsl(0,100%,97.3%)]" : "text-[hsl(0,0%,80%)]"
                  )}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {t(`landing.faq.items.${key}` as any)}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "backOut" }}
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-none border",
                      isOpen ? "border-[hsl(351,97%,43.1%)] text-[hsl(351,97%,43.1%)]" : "border-[hsl(0,0%,30%)] text-[hsl(0,0%,55%)]"
                    )}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="h-px w-full bg-gradient-to-r from-[hsl(351,97%,43.1%,0.5)] to-transparent mb-6"></div>
                        <p className="text-base leading-relaxed text-[hsl(0,0%,65%)] font-sans">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {t(`landing.faq.items.${key.replace("q", "a")}` as any)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
