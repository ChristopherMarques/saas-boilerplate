"use client";

import { InteractiveTechGrid, type TechItem } from "@/shared/components/premium/InteractiveTechGrid";
import { ParticleSwarm3D } from "./ParticleSwarm3D";

const ROSTER_ITEMS: TechItem[] = [
  { id: "nextjs", name: "Next.js 15", category: "Framework" },
  { id: "gsap", name: "GSAP 3", category: "Animation" },
  { id: "tailwind", name: "TailwindCSS", category: "Styling" },
  { id: "supabase", name: "Supabase", category: "Database" },
  { id: "react", name: "React 19", category: "Library" },
  { id: "typescript", name: "TypeScript", category: "Language" },
  { id: "lucide", name: "Lucide", category: "Icons" },
  { id: "radix", name: "Radix UI", category: "Primitives" },
];

export function RosterSection() {
  return (
    <section className="relative bg-[hsl(0,0%,10.2%,0.85)] px-6 py-32 overflow-hidden z-20" id="roster">
      <ParticleSwarm3D />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <h2 className="font-['JetBrains_Mono'] text-sm tracking-[0.3em] uppercase text-[hsl(351,97%,43.1%)] mb-4">
            O MOTOR POR TRÁS DE TUDO
          </h2>
          <p className="font-['Inter'] text-2xl text-[hsl(0,100%,97.3%)] max-w-2xl mx-auto">
            Este exato design está rodando sobre o Boilerplate. Você não está comprando um template de design. Você está adquirindo a infraestrutura bruta.
          </p>
        </div>

        <InteractiveTechGrid items={ROSTER_ITEMS} />
      </div>
    </section>
  );
}
