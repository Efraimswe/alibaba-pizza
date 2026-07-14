import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import menu from "@/data/menu.json";

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

const DAY_LABELS: Record<string, string> = {
  maandag: "MA",
  dinsdag: "DI",
  woensdag: "WO",
  donderdag: "DO",
  vrijdag: "VR",
  zaterdag: "ZA",
  zondag: "ZO",
};

export default function Home() {
  const categories = menu.categories as Category[];
  const hours = menu.openingHours as Record<string, string>;

  return (
    <div className="overflow-x-clip">
      {/* ── Sticky header: wordmark + taaltoggle ─────────────────── */}
      <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <a href="#top" className="font-logo text-3xl text-primary">
            Alibaba
          </a>
          {/* Taalkeuze: dropdown (werkende i18n volgt) */}
          <details className="group relative" aria-label="Taal">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-full bg-secondary px-4 font-display font-bold text-on-secondary [&::-webkit-details-marker]:hidden">
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
              NL
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="group-open:rotate-180"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </summary>
            <div className="card absolute top-[calc(100%+0.5rem)] right-0 z-50 w-44 p-1.5">
              <button
                aria-pressed="true"
                className="flex min-h-11 w-full cursor-pointer items-center justify-between rounded-xl bg-surface-alt px-3 font-display font-bold"
              >
                Nederlands
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
              </button>
              <button
                disabled
                className="flex min-h-11 w-full items-center justify-between rounded-xl px-3 font-display font-bold text-ink-soft opacity-60"
              >
                English
                <span className="text-[0.65rem] font-normal">binnenkort</span>
              </button>
              <button
                disabled
                className="flex min-h-11 w-full items-center justify-between rounded-xl px-3 font-display font-bold text-ink-soft opacity-60"
              >
                Français
                <span className="text-[0.65rem] font-normal">binnenkort</span>
              </button>
            </div>
          </details>
        </div>
      </header>

      {/* ── Statusbanner: volle breedte ────────────────────────────── */}
      <div className="overflow-hidden bg-secondary py-2.5">
        <p className="whitespace-nowrap font-display text-sm font-bold tracking-widest text-on-secondary">
          {Array.from({ length: 4 })
            .map(() => "OPEN VANDAAG 16:00–23:30 • BEL 014 / 41 40 47 • LEISTRAAT 84 LICHTAART")
            .join(" • ")}
        </p>
      </div>

      <main id="top" className="mx-auto max-w-lg px-4 pb-[calc(7rem+env(safe-area-inset-bottom))]">
        {/* ── Hero-bento ───────────────────────────────────────────── */}
        <section className="pt-4">
          <div className="card p-6">
            <div className="flex items-start justify-between gap-3">
              <p className="min-w-0 pt-1.5 font-display text-xs font-bold tracking-[0.3em] text-ink-soft">
                PIZZA · PITA · GRILL
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
                  WOENSDAG
                </p>
                <p className="font-display text-base font-bold leading-tight">
                  PIZZADAG
                </p>
                <p className="font-display text-base font-bold tabular-nums">
                  € 12,00
                </p>
              </div>
            </div>
            <h1 className="mt-1 font-logo text-6xl leading-tight text-primary">
              Alibaba
            </h1>

            {/* Hero-foto: signatuurgerecht */}
            <div className="photo-slot relative mt-4 aspect-[16/9]">
              {imgSrc("img/hero.png") ? (
                <Image
                  src="/img/hero.png"
                  alt="Ali Baba Speciaal — grill schotel van het huis"
                  fill
                  priority
                  sizes="(max-width: 32rem) 100vw, 32rem"
                  className="object-contain p-2"
                />
              ) : (
                <span className="absolute bottom-3 left-3 rounded-full bg-surface px-3 py-1 font-display text-xs font-bold tracking-widest">
                  FOTO — SIGNATUUR SCHOTEL
                </span>
              )}
            </div>

            <p className="mt-4 max-w-xs text-lg text-ink-soft">
              Verse pizza&apos;s, pitta, durum en schotels — om af te halen in
              Lichtaart.
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <a
              href="tel:+3214414047"
              className="card flex min-h-14 items-center justify-center gap-2 bg-primary font-display text-lg font-bold text-on-primary"
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
              BEL NU
            </a>
            <a
              href="#menu"
              className="card flex min-h-14 items-center justify-center font-display text-lg font-bold"
            >
              MENU ↓
            </a>
          </div>
        </section>

        {/* ── Menu: categorieën als bento-kaarten ─────────────────── */}
        <section id="menu" className="scroll-mt-20 pt-10">
          <h2 className="px-2 font-display text-3xl font-bold">Menu</h2>
          <p className="mt-1 px-2 text-ink-soft">
            {categories.length} categorieën,{" "}
            {categories.reduce((n, c) => n + c.items.length, 0)} gerechten
          </p>

          <div className="mt-4 space-y-3">
            {categories.map((cat, i) => (
              <details key={cat.id} open={i === 0} className="group card">
                <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 p-4 [&::-webkit-details-marker]:hidden">
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
                      {cat.items.length} items · vanaf €{" "}
                      <span className="tabular-nums">{eur(fromPrice(cat))}</span>
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex size-11 items-center justify-center rounded-full bg-surface-alt font-display text-2xl font-bold text-ink"
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>

                <div className="px-5 pb-5">
                  <div className="border-t border-ink/10 pt-4">
                    {cat.priceModel === "klein/groot" && (
                      <p className="mb-2 text-right font-display text-xs font-bold tracking-widest text-ink-soft">
                        KLEIN / GROOT
                      </p>
                    )}
                    {cat.note && (
                      <p className="card-inset mb-3 px-4 py-2.5 text-sm">
                        {cat.note}
                      </p>
                    )}
                    <ul className="space-y-3">
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
                          Extra&apos;s (+€ {eur(cat.extras.price)}):
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
        <section className="pt-10">
          <h2 className="px-2 font-display text-3xl font-bold">Elke week</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {(menu.weeklyDeals as { day: string; name: string; price: number; note?: string }[]).map(
              (deal, i) => (
                <div
                  key={deal.day}
                  className={`card px-2 py-4 text-center ${
                    i === 1 ? "bg-primary text-on-primary" : ""
                  }`}
                >
                  <p className="font-display text-2xl font-bold">
                    {DAY_LABELS[deal.day]}
                  </p>
                  <Photo
                    rel={`img/deals/${deal.day}.png`}
                    alt=""
                    sizes="(max-width: 32rem) 33vw, 10rem"
                    className="mt-2 aspect-square w-full"
                  />
                  <p className="mt-2 text-xs font-bold tracking-wide uppercase">
                    {deal.name}
                  </p>
                  <p
                    className={`mt-1 font-display text-lg font-bold tabular-nums ${
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
            Schoteldag: m.u.v. Schotel Lamskotelet en Lichtaartse Zondag
            Speciaal.
          </p>
        </section>

        {/* ── Openingsuren + adres + kaart ─────────────────────────── */}
        <section className="pt-10">
          <h2 className="px-2 font-display text-3xl font-bold">Hier &amp; nu</h2>

          <div className="card mt-4 overflow-hidden">
            <p className="bg-secondary px-5 py-3 font-display text-sm font-bold tracking-widest text-on-secondary">
              OPENINGSUREN
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
                    <span className="capitalize">{day}</span>
                    <span className="font-display font-bold tabular-nums">
                      {time}
                    </span>
                  </li>
                ))}
            </ul>
            <p className="bg-surface-alt px-5 py-3 text-sm font-bold">
              {hours.note}
            </p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {/* Kaart-placeholder (echte kaart + afstand volgen later) */}
            <div className="card-inset relative flex aspect-square items-center justify-center">
              <span className="rounded-full bg-surface px-3 py-1 font-display text-xs font-bold tracking-widest">
                KAART
              </span>
            </div>
            <div className="card flex flex-col justify-between p-4">
              <address className="not-italic">
                <p className="font-display text-lg font-bold">Leistraat 84</p>
                <p className="font-display text-lg font-bold">2460 Lichtaart</p>
              </address>
              <p className="text-sm text-ink-soft">
                <span className="font-display font-bold tabular-nums">···</span>{" "}
                m van jou
                <br />
                (geolocatie volgt)
              </p>
              <a
                href="tel:+3214414047"
                className="rounded-full bg-surface-alt px-2 py-3 text-center font-display text-sm font-bold whitespace-nowrap tabular-nums"
              >
                014 / 41 40 47
              </a>
            </div>
          </div>
        </section>

        {/* ── Allergenen ──────────────────────────────────────────── */}
        <section className="pt-8">
          <p className="card-inset px-5 py-4 text-sm">
            <span className="font-bold">Allergenen:</span>{" "}
            {menu.restaurant.allergenInfo} Volledige allergenenlijst per
            gerecht volgt op deze pagina.
          </p>
        </section>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="mt-12 pb-4 text-sm text-ink-soft">
          <div className="flex gap-4 px-2">
            <span className="underline decoration-dotted">
              Privacy (volgt)
            </span>
            <span className="underline decoration-dotted">
              Cookies (volgt)
            </span>
          </div>
          <p className="mt-3 px-2">
            © 2026 Alibaba Kebab — Pizza Pita Grill, Lichtaart
          </p>
        </footer>
      </main>

      {/* ── Zwevende bel-knop ──────────────────────────────────────── */}
      <div className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40">
        <a
          href="tel:+3214414047"
          className="mx-auto flex min-h-14 max-w-lg items-center justify-center gap-2 rounded-full bg-primary font-display text-lg font-bold text-on-primary shadow-[0_16px_40px_-12px_rgb(226_61_40_/_0.55)]"
        >
          BEL &amp; BESTEL — 014 / 41 40 47
        </a>
      </div>
    </div>
  );
}
