"use client";

import { useEffect } from "react";

// Триггер «прыжка» карточек: класс .play вешается КАЖДЫЙ раз, когда [data-hop]
// секция въезжает в экран (≥50%), и снимается при выходе — так анимация
// проигрывается заново при каждом возврате в viewport.
export function HopOnView() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-hop]");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // снятие класса при выходе позволяет CSS-анимации стартовать заново при возврате
          entry.target.classList.toggle("play", entry.isIntersecting);
        }
      },
      // зона наблюдения = верхняя половина экрана: срабатывает, когда секция
      // доходит до верхней половины viewport, а не когда только въезжает снизу
      { rootMargin: "0px 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));

    // [data-shake]: единичный проигрыш при появлении (≥25% на экране);
    // класс снимается при выходе, поэтому при возврате в viewport играет заново
    const shakeEls = document.querySelectorAll("[data-shake]");
    const ioShake = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("play", entry.isIntersecting);
        }
      },
      { threshold: 0.25 },
    );
    shakeEls.forEach((el) => ioShake.observe(el));

    return () => {
      io.disconnect();
      ioShake.disconnect();
    };
  }, []);

  return null;
}
