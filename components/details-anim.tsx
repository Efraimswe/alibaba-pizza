"use client";

import { useEffect } from "react";

// Плавный слайд раскрытия/сворачивания тикетов меню (details.card).
// Web Animations API — работает везде, включая iOS/WebKit (в отличие от
// CSS interpolate-size). Один глобальный слушатель; reduced-motion →
// нативное мгновенное поведение.
export function DetailsAnim() {
  useEffect(() => {
    // высокий контент (Pizza's ~3000px) за фиксированные 280ms визуально
    // «телепортируется» — видимая верхушка вырастает за пару кадров.
    // Поэтому: длительность растёт с высотой (с потолком), а высоким —
    // изинг с плавным стартом.
    const timing = (h: number) => ({
      duration: Math.min(520, Math.max(280, h * 0.18)),
      easing: h > 900 ? "cubic-bezier(0.4, 0, 0.2, 1)" : "cubic-bezier(0.2, 0, 0, 1)",
    });

    const onClick = (e: MouseEvent) => {
      const summary = (e.target as Element | null)?.closest("summary");
      const details = summary?.parentElement as HTMLDetailsElement | null;
      if (!summary || !details?.classList.contains("card")) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const content = summary.nextElementSibling as HTMLElement | null;
      if (!content) return;

      e.preventDefault();
      if (details.dataset.animating) return;
      details.dataset.animating = "1";
      content.style.overflow = "hidden";

      const cleanup = () => {
        content.style.overflow = "";
        delete details.dataset.animating;
      };

      if (details.open) {
        // сворачивание: высота и паддинги → 0, потом закрыть
        const from = {
          height: `${content.offsetHeight}px`,
          paddingTop: getComputedStyle(content).paddingTop,
          paddingBottom: getComputedStyle(content).paddingBottom,
          opacity: 1,
        };
        const anim = content.animate(
          [from, { height: "0px", paddingTop: "0px", paddingBottom: "0px", opacity: 0 }],
          timing(content.offsetHeight),
        );
        anim.onfinish = () => {
          details.open = false;
          cleanup();
        };
      } else {
        // раскрытие: открыть, измерить, проиграть 0 → высота
        details.open = true;
        const to = {
          height: `${content.offsetHeight}px`,
          paddingTop: getComputedStyle(content).paddingTop,
          paddingBottom: getComputedStyle(content).paddingBottom,
          opacity: 1,
        };
        const anim = content.animate(
          [{ height: "0px", paddingTop: "0px", paddingBottom: "0px", opacity: 0 }, to],
          timing(content.offsetHeight),
        );
        anim.onfinish = cleanup;
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
