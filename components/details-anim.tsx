"use client";

import { useEffect } from "react";

// Фейд тикетов меню (details.card), 100% compositor-friendly: только opacity.
// Раскрытие анимирует CSS .anim-reveal (fade-up на transform/opacity) —
// здесь только фейд-аут перед сворачиванием, чтобы закрытие не было рубленым.
export function DetailsAnim() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const summary = (e.target as Element | null)?.closest("summary");
      const details = summary?.parentElement as HTMLDetailsElement | null;
      if (!summary || !details?.classList.contains("card") || !details.open) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const content = summary.nextElementSibling as HTMLElement | null;
      if (!content) return;

      e.preventDefault();
      if (details.dataset.animating) return;
      details.dataset.animating = "1";
      const anim = content.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 150,
        easing: "ease-in",
      });
      anim.onfinish = () => {
        details.open = false;
        delete details.dataset.animating;
      };
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
