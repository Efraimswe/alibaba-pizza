"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// Карусель фото заведения: нативный scroll-snap (без либ), клик → лайтбокс
// на нативном <dialog>. Тайлы кропятся object-cover, полный вид — object-contain.
const PHOTOS = [1, 2, 3, 4, 5, 6].map((n) => `/img/gallery/g${n}.jpg`);

export function Gallery({ altPrefix }: { altPrefix: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [openIdx, setOpenIdx] = useState(0);

  const open = (i: number) => {
    setOpenIdx(i);
    dialogRef.current?.showModal();
  };

  return (
    <>
      {/* бесконечный авто-скролл: два комплекта тайлов, transform-marquee */}
      <div className="-mx-4 overflow-hidden px-4 pb-2">
        <div className="gallery-track">
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
