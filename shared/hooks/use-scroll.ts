import { useState, useEffect } from "react";

export function useScroll() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = (e?: Event) => {
      let currentScrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      
      // If the scroll event came from a specific container (due to capture phase), use its scrollTop
      if (e && e.target && (e.target as HTMLElement).scrollTop !== undefined) {
        currentScrollY = Math.max(currentScrollY, (e.target as HTMLElement).scrollTop);
      }
      
      setScrollY(currentScrollY);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
    };
  }, []);

  return scrollY;
}
