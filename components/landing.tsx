import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import menu from "@/data/menu.json";
import type { Dict, DayKey, Locale } from "@/lib/i18n";
import { RESTAURANT } from "@/lib/geo";
import { Distance } from "@/components/distance";

// фото может ещё не быть сгенерировано — тогда остаётся тихая заливка
const imgSrc = (rel: string) =>
  existsSync(join(process.cwd(), "public", rel)) ? `/${rel}` : null;

function Photo({
  rel,
  alt,
  sizes,
  className,
}: {
  rel: string;
  alt: string;
  sizes: string;
  className: string;
}) {
  const src = imgSrc(rel);
  return (
    <span className={`photo-slot relative block shrink-0 overflow-hidden ${className}`}>
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain p-1"
        />
      )}
    </span>
  );
}

type Item = {
  name: string;
  ingredients: string[];
  price?: number;
  prices?: { klein: number; groot: number };
};

type Category = {
  id: string;
  name: string;
  note?: string;
  priceModel?: string;
  items: Item[];
  extras?: { price: number; options: string[] };
};

const eur = (n: number) => n.toFixed(2).replace(".", ",");

const fromPrice = (c: Category) =>
  Math.min(...c.items.map((i) => i.price ?? i.prices?.klein ?? Infinity));

const LANGUAGES: { code: Locale; href: string; label: string }[] = [
  { code: "nl", href: "/", label: "Nederlands" },
  { code: "en", href: "/en", label: "English" },
  { code: "fr", href: "/fr", label: "Français" },
];

export default function Landing({ locale, dict }: { locale: Locale; dict: Dict }) {
  const categories = menu.categories as Category[];
  const hours = menu.openingHours as Record<string, string>;

  return (
    <div className="overflow-x-clip">
      {locale !== "nl" && (
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang=${JSON.stringify(locale)}`,
          }}
        />
      )}
      {/* ── Sticky header: wordmark + taaltoggle ─────────────────── */}
      <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3 md:max-w-2xl lg:max-w-5xl">
          <a href="#top" className="font-logo text-3xl text-primary">
            Alibaba
          </a>
          {/* Taalkeuze: dropdown */}
          <details className="group relative" aria-label={dict.languageLabel}>
            <summary className="press flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-full bg-secondary px-4 font-display font-bold text-on-secondary [&::-webkit-details-marker]:hidden">
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {locale.toUpperCase()}
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="transition-transform duration-200 group-open:rotate-180"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div className="card anim-pop absolute top-[calc(100%+0.5rem)] right-0 z-50 w-44 p-1.5">
              {LANGUAGES.map((lang) => {
                const active = lang.code === locale;
                return (
                  <a
                    key={lang.code}
                    href={lang.href}
                    aria-current={active ? "true" : undefined}
                    className={`press flex min-h-11 w-full cursor-pointer items-center justify-between rounded-xl px-3 font-display font-bold ${
                      active ? "bg-surface-alt" : "text-ink-soft"
                    }`}
                  >
                    {lang.label}
                    {active && (
                      <svg
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </a>
                );
              })}
            </div>
          </details>
        </div>
      </header>

      {/* ── Statusbanner: marquee — декоративный дубликат (часы/тел/адрес есть ниже) */}
      <div aria-hidden="true" className="overflow-hidden bg-secondary py-2.5">
        <div className="marquee-track">
          {[false, true].map((hidden) => (
            <p
              key={String(hidden)}
              aria-hidden={hidden}
              className="whitespace-nowrap pr-8 font-display text-sm font-bold tracking-widest text-on-secondary"
            >
              {Array.from({ length: 3 })
                .map(
                  () =>
                    `${dict.ticker.openToday} 16:00 • ${dict.ticker.call} 014 / 41 40 47 • LEISTRAAT 84 LICHTAART`,
                )
                .join(" • ")}{" "}
              •
            </p>
          ))}
        </div>
      </div>

      <main id="top" className="mx-auto max-w-lg px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] md:max-w-2xl lg:grid lg:max-w-5xl lg:grid-cols-3 lg:items-start lg:gap-x-6">
        {/* ── Hero-bento ───────────────────────────────────────────── */}
        <section className="pt-4 lg:col-span-3">
          <div className="card p-6 md:grid md:grid-cols-2 md:items-center md:gap-x-8 lg:p-8">
            <div className="flex items-start justify-between gap-3">
              <p className="min-w-0 pt-1.5 font-display text-xs font-bold tracking-[0.3em] text-ink-soft">
                {dict.heroTag}
                <br />
                <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-on-secondary">
                  <svg
                    aria-hidden="true"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="shrink-0"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  LICHTAART
                </span>
              </p>
              {/* Sticker van de dag (dagslogica volgt in een latere fase) */}
              <div className="shrink-0 rounded-2xl bg-primary px-3 py-2 text-center text-on-primary">
                <p className="font-display text-[0.65rem] font-bold tracking-widest">
                  {dict.days.woensdag.toUpperCase()}
                </p>
                <p className="font-display text-base font-bold leading-tight">
                  {dict.dealNameByDay.woensdag.toUpperCase()}
                </p>
                <p className="font-display text-base font-bold tabular-nums">
                  € 12,00
                </p>
              </div>
            </div>
            <h1 className="mt-1 font-logo text-6xl leading-tight text-primary md:col-start-1 md:row-start-2 lg:text-8xl">
              Alibaba
            </h1>

            {/* Hero-foto: schotels van het huis, volledig kader */}
            <div className="relative mt-4 aspect-square overflow-hidden rounded-2xl md:col-start-2 md:row-start-1 md:row-span-3 md:mt-0">
              <Image
                src="/img/hero.jpg"
                alt={dict.heroPhotoAlt}
                fill
                priority
                sizes="(max-width: 32rem) 100vw, 32rem"
                className="object-cover"
              />
            </div>

            <p className="mt-4 max-w-xs text-lg text-ink-soft md:col-start-1 md:row-start-3 md:self-start">
              {dict.heroDescription}
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 md:max-w-md">
            <a
              href="tel:+3214414047"
              className="card press flex min-h-14 items-center justify-center gap-2 bg-primary font-display text-lg font-bold text-on-primary"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {dict.callNowCta}
            </a>
            <a
              href="#menu"
              className="card press flex min-h-14 items-center justify-center font-display text-lg font-bold"
            >
              {dict.menuCta}
            </a>
          </div>
        </section>

        {/* ── Menu: categorieën als bento-kaarten ─────────────────── */}
        <section id="menu" className="scroll-mt-20 pt-10 lg:col-span-2 lg:pt-8">
          <h2 className="px-2 font-display text-3xl font-bold">{dict.menuHeading}</h2>
          <p className="mt-1 px-2 text-ink-soft">
            {dict.menuSummary(
              categories.length,
              categories.reduce((n, c) => n + c.items.length, 0),
            )}
          </p>

          <div className="mt-4 space-y-3">
            {categories.map((cat, i) => (
              <details key={cat.id} className="group card view-reveal">
                <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 rounded-3xl p-4 transition-colors duration-150 active:bg-surface-alt/60 [&::-webkit-details-marker]:hidden">
                  <Photo
                    rel={`img/cats/${cat.id}.png`}
                    alt=""
                    sizes="80px"
                    className="size-20"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl font-bold">
                      {cat.name}
                    </span>
                    <span className="block text-sm text-ink-soft">
                      {cat.items.length} {dict.itemsFromPrefix}{" "}
                      <span className="tabular-nums">{eur(fromPrice(cat))}</span>
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex size-11 items-center justify-center rounded-full bg-surface-alt text-ink"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="transition-transform duration-200 group-open:rotate-45"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>

                <div className="anim-reveal px-5 pb-5">
                  <div className="border-t border-ink/10 pt-4">
                    {cat.priceModel === "klein/groot" && (
                      <p className="mb-2 text-right font-display text-xs font-bold tracking-widest text-ink-soft">
                        {dict.sizeLabel}
                      </p>
                    )}
                    {cat.note && (
                      <p className="card-inset mb-3 px-4 py-2.5 text-sm">
                        {dict.categoryNotes[cat.id] ?? cat.note}
                      </p>
                    )}
                    <ul className="space-y-3 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-3 md:space-y-0">
                      {cat.items.map((item) => (
                        <li key={item.name}>
                          <div className="flex items-end gap-2">
                            <span className="font-bold">{item.name}</span>
                            <span aria-hidden="true" className="leader" />
                            <span className="font-display font-bold whitespace-nowrap tabular-nums">
                              {item.price !== undefined
                                ? eur(item.price)
                                : `${eur(item.prices!.klein)} / ${eur(item.prices!.groot)}`}
                            </span>
                          </div>
                          {item.ingredients.length > 0 && (
                            <p className="text-sm text-ink-soft">
                              {item.ingredients.join(", ")}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                    {cat.extras && (
                      <p className="card-inset mt-4 px-4 py-2.5 text-sm text-ink-soft">
                        <span className="font-bold text-ink">
                          {dict.extrasLabel} (+€ {eur(cat.extras.price)}):
                        </span>{" "}
                        {cat.extras.options.join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Weekacties: bento-rij ───────────────────────────────── */}
        <div className="lg:col-start-3 lg:self-start">
        <section className="pt-10 lg:pt-8">
          <h2 className="px-2 font-display text-3xl font-bold lg:text-2xl">{dict.weeklyHeading}</h2>
          <div className="mt-4 grid grid-cols-3 gap-3 lg:grid-cols-1">
            {(menu.weeklyDeals as { day: string; name: string; price: number; note?: string }[]).map(
              (deal, i) => (
                <div
                  key={deal.day}
                  className={`card view-reveal px-2 py-4 text-center lg:flex lg:items-center lg:gap-3 lg:px-4 lg:py-3 lg:text-left ${
                    i === 1 ? "bg-primary text-on-primary" : ""
                  }`}
                >
                  <p className="font-display text-2xl font-bold lg:w-9 lg:shrink-0 lg:text-xl">
                    {dict.dayAbbrev[deal.day as DayKey]}
                  </p>
                  <Photo
                    rel={`img/deals/${deal.day}.png`}
                    alt=""
                    sizes="(max-width: 32rem) 33vw, 10rem"
                    className="mt-2 aspect-square w-full lg:mt-0 lg:w-14 lg:shrink-0"
                  />
                  <p className="mt-2 min-w-0 text-xs font-bold tracking-wide uppercase lg:mt-0 lg:flex-1">
                    {dict.dealNameByDay[deal.day] ?? deal.name}
                  </p>
                  <p
                    className={`mt-1 font-display text-lg font-bold tabular-nums lg:mt-0 lg:shrink-0 ${
                      i === 1 ? "" : "text-primary"
                    }`}
                  >
                    € {eur(deal.price)}
                  </p>
                </div>
              ),
            )}
          </div>
          <p className="mt-3 px-2 text-sm text-ink-soft">
            {dict.dealNameByDay.donderdag}: {dict.weeklyExceptWord} Schotel
            Lamskotelet {dict.andWord} Lichtaartse Zondag Speciaal.
          </p>
        </section>

        {/* ── Openingsuren + adres + kaart ─────────────────────────── */}
        <section className="pt-10 lg:pt-6">
          <h2 className="px-2 font-display text-3xl font-bold lg:text-2xl">{dict.hereNowHeading}</h2>

          <div className="card view-reveal mt-4 overflow-hidden">
            <p className="bg-secondary px-5 py-3 font-display text-sm font-bold tracking-widest text-on-secondary">
              {dict.openingHoursLabel}
            </p>
            <ul className="px-2 py-2">
              {Object.entries(hours)
                .filter(([k]) => k !== "note")
                .map(([day, time], i) => (
                  <li
                    key={day}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                      i % 2 === 1 ? "bg-surface-alt/60" : ""
                    }`}
                  >
                    <span className="capitalize">{dict.days[day as DayKey]}</span>
                    <span className="font-display font-bold tabular-nums">
                      {time}
                    </span>
                  </li>
                ))}
            </ul>
            <p className="bg-surface-alt px-5 py-3 text-sm font-bold">
              {dict.openHolidaysNote}
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <div className="card-inset relative aspect-square overflow-hidden rounded-[1.25rem]">
                {/* iframe крупнее контейнера: обрезаем встроенную плашку атрибуции OSM,
                    собственная подпись © — чипом ниже */}
                <iframe
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${(RESTAURANT.lon - 0.008).toFixed(6)},${(RESTAURANT.lat - 0.005).toFixed(6)},${(RESTAURANT.lon + 0.008).toFixed(6)},${(RESTAURANT.lat + 0.005).toFixed(6)}&layer=mapnik&marker=${RESTAURANT.lat},${RESTAURANT.lon}`}
                  loading="lazy"
                  title={dict.mapLabel}
                  className="absolute -top-[50%] -left-[50%] h-[200%] w-[200%]"
                />
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-1.5 bottom-1.5 rounded-full bg-surface/85 px-2 py-0.5 text-[0.6rem] text-ink-soft"
                >
                  © OpenStreetMap
                </a>
              </div>
              <a
                href="https://maps.google.com/?q=Leistraat+84,+2460+Lichtaart"
                target="_blank"
                rel="noopener noreferrer"
                className="press flex min-h-11 items-center justify-center rounded-full bg-surface-alt px-3 py-2 text-center font-display text-xs font-bold tracking-widest"
              >
                Route →
              </a>
            </div>
            <div className="card flex flex-col justify-between p-4">
              <address className="not-italic">
                <p className="font-display text-lg font-bold">Leistraat 84</p>
                <p className="font-display text-lg font-bold">2460 Lichtaart</p>
              </address>
              <Distance
                labelShow={dict.distanceLabelShow}
                loading={dict.distanceLoading}
                error={dict.distanceError}
                suffixKm={dict.distanceSuffixKm}
                suffixM={dict.distanceSuffixM}
              />
              <a
                href="tel:+3214414047"
                className="press rounded-full bg-surface-alt px-2 py-3 text-center font-display text-sm font-bold whitespace-nowrap tabular-nums"
              >
                014 / 41 40 47
              </a>
            </div>
          </div>
        </section>

        {/* ── Allergenen ──────────────────────────────────────────── */}
        <section className="pt-8 lg:pt-6">
          <div className="card p-6">
            <h2 className="font-display text-lg font-bold">
              {dict.allergensHeading}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">{dict.allergensEuNote}</p>
            {/* TODO: exacte allergenenmarkering per gerecht — volgt zodra klant de data aanlevert */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {Object.entries(dict.allergens).map(([key, label]) => (
                <li
                  key={key}
                  className="card-inset rounded-full px-3 py-1.5 text-sm"
                >
                  {label}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm">
              {dict.allergensCta}{" "}
              <a
                href="tel:+3214414047"
                className="press font-bold underline decoration-dotted"
              >
                014 / 41 40 47
              </a>
            </p>
          </div>
        </section>
        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="mt-12 pb-4 text-sm text-ink-soft lg:col-span-3">
          <div className="flex gap-4 px-2">
            <a href="/privacy" className="underline decoration-dotted">
              {dict.footer.privacy}
            </a>
            <a href="/cookies" className="underline decoration-dotted">
              {dict.footer.cookies}
            </a>
          </div>
          <p className="mt-3 px-2">
            <span className="font-bold">Alibaba Kebab</span>
            <br />
            Leistraat 84, 2460 Lichtaart
            <br />
            <span className="whitespace-nowrap tabular-nums">014 / 41 40 47</span>
          </p>
          {/* TODO: ondernemingsnummer opvragen bij de klant */}
          <p className="mt-2 px-2 text-xs">Ondernemingsnummer: —</p>
        </footer>
      </main>

      {/* ── Zwevende bel-knop ──────────────────────────────────────── */}
      <div className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40">
        <a
          href="tel:+3214414047"
          className="press mx-auto flex min-h-14 max-w-lg items-center justify-center gap-2 rounded-full bg-primary font-display text-lg font-bold text-on-primary shadow-[0_16px_40px_-12px_rgb(210_55_31_/_0.55)]"
        >
          <svg
            aria-hidden="true"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="ring-wiggle shrink-0"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          {dict.phoneCtaPrefix} — 014 / 41 40 47
        </a>
      </div>
    </div>
  );
}
