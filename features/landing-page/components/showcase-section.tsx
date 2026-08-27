"use client";

import { ScrollGalaxyRings } from "@/shared/components/premium";

export function ShowcaseSection() {
  return (
    <section className="relative bg-[hsl(0,0%,10.2%,0.85)] z-20" id="showcase">
      {/* We just render the ScrollGalaxyRings which handles its own layout and scroll interactions */}
      <ScrollGalaxyRings />
    </section>
  );
}
