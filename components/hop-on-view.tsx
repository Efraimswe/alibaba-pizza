"use client";

import { useEffect } from "react";

// Триггер «прыжка» карточек: класс .play вешается ОДИН раз, когда [data-hop]
// секция впервые въезжает в экран; повторных проигрываний нет.
export function HopOnView() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-hop]");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // один раз: сыграли при первом появлении и больше не дёргаем
            entry.target.classList.add("play");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
