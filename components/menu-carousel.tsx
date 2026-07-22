"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import type { Category } from "@/lib/menu";
import { trCategory, trItem, trIngredients, trExtras } from "@/lib/menu-i18n";

const eur = (n: number) => n.toFixed(2).replace(".", ",");

const EXTRAS_LABEL: Record<Locale, string> = { nl: "Extra's", en: "Extras", fr: "Suppléments" };
const SAUZEN_LABEL: Record<Locale, string> = { nl: "Sauzen", en: "Sauces", fr: "Sauces" };

const MENU_ITEM_LIMIT = 4;
type MenuPagePart = { id: string; from: number; to: number; cont: boolean };

function buildMenuPages(categories: Category[]): MenuPagePart[][] {
  const pages: MenuPagePart[][] = [];
  let cur: MenuPagePart[] = [];
  let count = 0;
  const flush = () => {
    if (cur.length) {
      pages.push(cur);
      cur = [];
      count = 0;
    }
  };
  for (const c of categories) {
    const n = c.items.length;
    if (n > MENU_ITEM_LIMIT) {
      flush();
      const k = Math.ceil(n / MENU_ITEM_LIMIT);
      const base = Math.floor(n / k);
      let rem = n % k;
      let from = 0;
      for (let i = 0; i < k; i++) {
        const size = base + (rem-- > 0 ? 1 : 0);
        pages.push([{ id: c.id, from, to: from + size, cont: i > 0 }]);
        from += size;
      }
    } else {
      if (count + n > MENU_ITEM_LIMIT) flush();
      cur.push({ id: c.id, from: 0, to: n, cont: false });
      count += n;
    }
  }
  flush();
  return pages;
}

// категории + финальная страница соусов
type Page = { kind: "cat"; parts: MenuPagePart[] } | { kind: "sauzen" };

export function MenuCarousel({
  locale,
  categories,
  sauzen,
}: {
  locale: Locale;
  categories: Category[];
  sauzen: string[];
}) {
  const PAGES: Page[] = useMemo(
    () => [
      ...buildMenuPages(categories).map((parts) => ({ kind: "cat", parts }) as const),
      { kind: "sauzen" as const },
    ],
    [categories],
  );
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // при свайпе отмечаем активную страницу — её заголовок показывает закреплённый бар
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const pages = Array.from(scroller.querySelectorAll<HTMLElement>("[data-page]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio >= 0.6) {
            setActive(Number(e.target.getAttribute("data-page")));
          }
        }
      },
      { root: scroller, threshold: [0.6] },
    );
    pages.forEach((p) => io.observe(p));
    return () => io.disconnect();
  }, []);

  const activePage = PAGES[active];
  let headerLabel: string;
  let headerImage: string;
  let headerCont = false;
  if (activePage.kind === "sauzen") {
    headerLabel = SAUZEN_LABEL[locale];
    headerImage = "/img/cats/sauzen.webp";
  } else {
    const firstPart = activePage.parts[0];
    const activeCat = categories.find((c) => c.id === firstPart.id)!;
    headerLabel = trCategory(locale, activeCat.id, activeCat.name);
    headerImage = activeCat.image ?? `/img/cats/${activeCat.id}.webp`;
    headerCont = firstPart.cont;
  }

  return (
    <div>
      {/* заголовок категории + фото + счётчик — скроллится вместе со страницей, меняется по свайпу */}
      <div className="mt-4 flex items-start justify-between gap-3 px-2 pt-2 pb-0">
        <div className="flex min-w-0 flex-col items-start gap-2.5">
          <h3 className="truncate font-display text-3xl font-bold">
            {headerLabel}
            {headerCont && <span className="text-ink-soft"> ·</span>}
          </h3>
          <Image
            src={headerImage}
            alt=""
            width={256}
            height={256}
            className="h-32 w-32 shrink-0 rounded-xl object-cover"
          />
        </div>
        <span className="mt-2 shrink-0 font-display text-sm font-bold text-ink-soft tabular-nums">
          {active + 1}/{PAGES.length}
        </span>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PAGES.map((page, pi) => (
          <article key={pi} data-page={pi} className="w-full shrink-0 snap-center">
            <div className="card h-full space-y-6 px-5 pt-1 pb-5">
              {/* подсказка свайпа — только на первой странице (Phosphor hand-swipe-left) */}
              {pi === 0 && (
              <div className="flex items-center justify-end gap-2 pt-2 text-ink-soft">
                <span className="font-display text-sm font-bold">Swipe</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  className="size-8 shrink-0 text-ink-soft"
                >
                  <path d="M216,140v36c0,25.59-8.49,42.85-8.85,43.58A8,8,0,0,1,200,224a7.9,7.9,0,0,1-3.57-.85,8,8,0,0,1-3.58-10.73c.06-.12,7.16-14.81,7.16-36.42V140a12,12,0,0,0-24,0v4a8,8,0,0,1-16,0V124a12,12,0,0,0-24,0v12a8,8,0,0,1-16,0V68a12,12,0,0,0-24,0V176a8,8,0,0,1-14.79,4.23l-18.68-30-.14-.23A12,12,0,1,0,41.6,162L70.89,212A8,8,0,1,1,57.08,220l-29.32-50a28,28,0,0,1,48.41-28.17L80,148V68a28,28,0,0,1,56,0V98.7a28,28,0,0,1,38.65,16.69A28,28,0,0,1,216,140Zm32-92H195.31l18.34-18.34a8,8,0,0,0-11.31-11.32l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.31-11.32L195.31,64H248a8,8,0,0,0,0-16Z" />
                </svg>
              </div>
              )}
              {page.kind === "sauzen" ? (
                <div>
                  <ul className="space-y-2">
                    {sauzen.map((sauce) => (
                      <li key={sauce} className="font-bold capitalize">
                        {sauce}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                page.parts.map((part, parti) => {
                  const cat = categories.find((c) => c.id === part.id)!;
                  const items = cat.items.slice(part.from, part.to);
                  const lastPart = part.to === cat.items.length;
                  return (
                    <div key={`${part.id}-${part.from}`}>
                      {/* заголовок первой категории живёт в закреплённом баре; вторичные — инлайн */}
                      {parti > 0 && (
                        <div className="flex items-center gap-2.5">
                          <Image
                            src={cat.image ?? `/img/cats/${cat.id}.webp`}
                            alt=""
                            width={256}
                            height={256}
                            className="h-32 w-32 shrink-0 rounded-xl object-cover"
                          />
                          <h3 className="font-display text-xl font-bold">
                            {trCategory(locale, cat.id, cat.name)}
                            {part.cont && <span className="text-ink-soft"> ·</span>}
                          </h3>
                        </div>
                      )}
                      {cat.priceModel === "klein/groot" && (
                        <p className="text-right font-display text-xs font-bold tracking-widest text-ink-soft">
                          KLEIN / GROOT
                        </p>
                      )}
                      <ul className="mt-3 space-y-3">
                        {items.map((item) => (
                          <li key={item.name}>
                            <div className="flex items-end gap-2">
                              <span className="text-xl font-bold">{trItem(locale, item.name)}</span>
                              <span aria-hidden="true" className="leader" />
                              <span className="rounded-lg bg-primary px-3 py-1 font-display font-bold whitespace-nowrap tabular-nums text-on-primary">
                                {item.price !== undefined
                                  ? `€ ${eur(item.price)}`
                                  : `€ ${eur(item.prices!.klein)} / ${eur(item.prices!.groot)}`}
                              </span>
                            </div>
                            {item.ingredients.length > 0 && (
                              <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {trIngredients(locale, item.ingredients).map((ing) => (
                                  <span
                                    key={ing}
                                    className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary-deep"
                                  >
                                    {ing}
                                  </span>
                                ))}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                      {lastPart && cat.extras && (
                        <p className="mt-4 text-sm text-ink-soft">
                          <span className="font-bold text-ink">{EXTRAS_LABEL[locale]}</span>{" "}
                          (+€&nbsp;{eur(cat.extras.price)}):{" "}
                          {trExtras(locale, cat.extras.options).join(", ")}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
