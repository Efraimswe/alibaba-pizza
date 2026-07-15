"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Карусель фото заведения. Движение — transform (компositor, масляно),
// один источник истины `offset`: авто-дрейф по rAF + ручной drag через
// Pointer Events. Бесконечность — два комплекта тайлов, offset по модулю
// половины ширины. Работает только пока карусель видна. Клик → лайтбокс.
const PHOTOS = [1, 2, 3, 4, 5, 6].map((n) => `/img/gallery/g${n}.jpg`);
const SPEED = 0.55; // px за кадр (~33px/s)
const RESUME_MS = 2000;
const CLICK_SLOP = 8; // px — больше = это был drag, не клик

export function Gallery({ altPrefix }: { altPrefix: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const suppressClick = useRef(false);
  const [openIdx, setOpenIdx] = useState(0);

  const open = (i: number) => {
    setOpenIdx(i);
    dialogRef.current?.showModal();
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const autoAllowed = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    let offset = 0; // текущий сдвиг ленты, px
    let half = 0; // ширина одного комплекта тайлов
    let paused = false;
    let dragging = false;
    let dragStartX = 0;
    let dragStartOffset = 0;
    let lastX = 0;
    let velocity = 0; // px за событие move
    let flingV = 0; // инерция после отпускания
    let visible = false;
    let raf = 0;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;

    const ro = new ResizeObserver(() => {
      half = track.scrollWidth / 2;
    });
    ro.observe(track);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(viewport);

    const apply = () => {
      if (half > 0) {
        // нормализуем в [0, half) — стык бесшовный в обе стороны
        offset = ((offset % half) + half) % half;
      }
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };

    const tick = () => {
      if (!dragging && !document.hidden) {
        if (Math.abs(flingV) > 0.1) {
          // инерция: летит и плавно затухает
          offset += flingV;
          flingV *= 0.94;
          apply();
        } else if (autoAllowed && visible && !paused) {
          offset += SPEED;
          apply();
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      paused = true;
      flingV = 0;
      clearTimeout(resumeTimer);
      dragStartX = e.clientX;
      dragStartOffset = offset;
      lastX = e.clientX;
      velocity = 0;
      suppressClick.current = false;
      viewport.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const delta = e.clientX - dragStartX;
      if (Math.abs(delta) > CLICK_SLOP) suppressClick.current = true;
      velocity = e.clientX - lastX;
      lastX = e.clientX;
      offset = dragStartOffset - delta;
      apply();
    };
    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      // отпустил на скорости → лента летит по инерции (кап ±45 px/кадр)
      flingV = Math.max(-45, Math.min(45, -velocity));
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, RESUME_MS);
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);

    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(resumeTimer);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
    };
  }, []);

  return (
    <>
      {/* viewport: overflow-hidden, вертикальный скролл страницы не трогаем */}
      <div
        ref={viewportRef}
        className="-mx-4 overflow-hidden px-4 pb-2 [touch-action:pan-y]"
        onClickCapture={(e) => {
          if (suppressClick.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClick.current = false;
          }
        }}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {[false, true].map((dup) =>
            PHOTOS.map((src, i) => (
              <button
                key={`${src}-${dup}`}
                type="button"
                onClick={() => open(i)}
                aria-label={`${altPrefix} ${i + 1}`}
                aria-hidden={dup}
                tabIndex={dup ? -1 : 0}
                className="press relative mr-3 h-64 w-52 shrink-0 cursor-grab overflow-hidden rounded-2xl bg-surface-alt active:cursor-grabbing"
              >
                <Image
                  src={src}
                  alt={dup ? "" : `${altPrefix} ${i + 1}`}
                  fill
                  loading="eager"
                  sizes="13rem"
                  className="pointer-events-none object-cover select-none"
                  draggable={false}
                />
              </button>
            )),
          )}
        </div>
      </div>

      {/* тап в любом месте закрывает (Esc — нативно) */}
      <dialog
        ref={dialogRef}
        onClick={() => dialogRef.current?.close()}
        className="m-auto cursor-pointer bg-transparent p-0 backdrop:bg-ink/85"
      >
        <div className="relative h-[85svh] w-[min(94vw,64rem)]">
          <Image
            src={PHOTOS[openIdx]}
            alt={`${altPrefix} ${openIdx + 1}`}
            fill
            sizes="94vw"
            className="object-contain"
          />
        </div>
      </dialog>
    </>
  );
}
