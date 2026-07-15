"use client";

import { useEffect } from "react";

// Триггер «прыжка» карточек: класс .play вешается, когда [data-hop] секция
// въезжает в экран, и снимается при выходе — анимация переигрывается.
export function HopOnView() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-hop]");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("play", entry.isIntersecting);
        }
      },
      { threshold: 0.4 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
