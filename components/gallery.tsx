"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Карусель фото заведения: авто-прокрутка по rAF на настоящем
// scroll-контейнере — нативный свайп работает, автодвижение ставится на
// паузу при взаимодействии и продолжается после 2.5s тишины. Бесконечность —
// два комплекта тайлов + бесшовный wrap scrollLeft. Клик → лайтбокс <dialog>.
const PHOTOS = [1, 2, 3, 4, 5, 6].map((n) => `/img/gallery/g${n}.jpg`);
const SPEED = 0.6; // px за кадр (~36px/s)
const RESUME_MS = 2500;

export function Gallery({ altPrefix }: { altPrefix: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState(0);

  const open = (i: number) => {
    setOpenIdx(i);
    dialogRef.current?.showModal();
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    let raf = 0;
    // scrollLeft округляется браузером до целых px — дробный инкремент
    // «замерзает». Держим точную позицию во флоате.
    let pos = el.scrollLeft;

    const hold = () => {
      paused = true;
      clearTimeout(resumeTimer);
    };
    const release = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, RESUME_MS);
    };

    // бесшовный стык в ОБЕ стороны — на событии scroll, работает и при
    // ручном свайпе (автотик в этот момент на паузе)
    // ТОЛЬКО для ручного режима: в авто-режиме стык перематывает сам tick,
    // и обработчик на scroll не должен с ним драться (иначе на нулевой
    // позиции они телепортируют друг друга каждый кадр — «заморозка»).
    const wrap = () => {
      if (!paused) return;
      const half = el.scrollWidth / 2;
      if (half <= 0) return;
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half;
      } else if (el.scrollLeft < 1) {
        el.scrollLeft += half;
      }
      pos = el.scrollLeft;
    };

    const tick = () => {
      if (!paused && !document.hidden) {
        pos += SPEED;
        const half = el.scrollWidth / 2;
        if (half > 0 && pos >= half) pos -= half;
        el.scrollLeft = pos;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    el.addEventListener("scroll", wrap, { passive: true });

    el.addEventListener("pointerdown", hold);
    el.addEventListener("touchstart", hold, { passive: true });
    el.addEventListener("wheel", hold, { passive: true });
    el.addEventListener("pointerup", release);
    el.addEventListener("touchend", release);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      el.removeEventListener("scroll", wrap);
      el.removeEventListener("pointerdown", hold);
      el.removeEventListener("touchstart", hold);
      el.removeEventListener("wheel", hold);
      el.removeEventListener("pointerup", release);
      el.removeEventListener("touchend", release);
    };
  }, []);

  return (
    <>
      {/* бесконечный трек: два комплекта тайлов, wrap по scrollLeft */}
      <div
        ref={scrollerRef}
        className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-max">
          {[false, true].map((dup) =>
            PHOTOS.map((src, i) => (
              <button
                key={`${src}-${dup}`}
                type="button"
                onClick={() => open(i)}
                aria-label={`${altPrefix} ${i + 1}`}
                aria-hidden={dup}
                tabIndex={dup ? -1 : 0}
                className="press relative mr-3 h-64 w-52 shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-surface-alt"
              >
                <Image
                  src={src}
                  alt={dup ? "" : `${altPrefix} ${i + 1}`}
                  fill
                  loading="lazy"
                  sizes="13rem"
                  className="object-cover"
                />
              </button>
            )),
          )}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto bg-transparent p-0 backdrop:bg-ink/85"
      >
        <div className="relative h-[85svh] w-[min(94vw,64rem)]">
          <Image
            src={PHOTOS[openIdx]}
            alt={`${altPrefix} ${openIdx + 1}`}
            fill
            sizes="94vw"
            className="object-contain"
          />
          <button
            type="button"
            autoFocus
            onClick={() => dialogRef.current?.close()}
            aria-label="Sluiten"
            className="press fixed top-4 right-4 flex size-11 cursor-pointer items-center justify-center rounded-full bg-surface font-display text-xl font-bold text-ink shadow-lg"
          >
            ×
          </button>
        </div>
      </dialog>
    </>
  );
}
