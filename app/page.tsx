import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import menu from "@/data/menu.json";

// должен совпадать со slugify в scripts/build-image-manifest.mjs
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// фото может ещё не быть сгенерировано — тогда остаётся штриховка
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
    <span className={`wire-photo relative block shrink-0 overflow-hidden ${className}`}>
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-contain p-0.5"
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
      <header className="sticky top-0 z-40 border-b-3 border-wire-line bg-wire-surface">
        <div className="mx-auto flex max-w-lg items-stretch justify-between px-4 py-3">
          <a href="#top" className="wire-block-flat px-3 py-2">
            <span className="font-display text-xl font-bold tracking-tight">
              ALIBABA
            </span>
          </a>
          <div className="flex items-center gap-2" aria-label="Taal">
            <button
              aria-pressed="true"
              className="wire-block-flat min-h-11 min-w-11 cursor-pointer bg-wire-ink px-2 font-display font-bold text-wire-surface"
            >
              NL
            </button>
            <button
              disabled
              title="Binnenkort"
              className="wire-block-flat min-h-11 min-w-11 px-2 font-display font-bold opacity-40"
            >
              EN
            </button>
            <button
              disabled
              title="Binnenkort"
              className="wire-block-flat min-h-11 min-w-11 px-2 font-display font-bold opacity-40"
            >
              FR
            </button>
          </div>
        </div>
      </header>

      {/* ── Ticker-statusstrook ──────────────────────────────────── */}
      <div className="overflow-hidden border-b-3 border-wire-line bg-wire-ink py-2">
        <p className="whitespace-nowrap font-display text-sm font-bold tracking-widest text-wire-surface">
          {Array.from({ length: 4 })
            .map(() => "OPEN VANDAAG 16:00–23:30 • BEL 014 / 41 40 47 • LEISTRAAT 84 LICHTAART")
            .join(" • ")}
        </p>
      </div>

      <main id="top" className="mx-auto max-w-lg px-4 pb-[calc(6rem+env(safe-area-inset-bottom))]">
        {/* ── Hero: gestapelde woordblokken + sticker ─────────────── */}
        <section className="relative pt-8 pb-10">
          <p className="font-display text-sm font-bold tracking-[0.3em] text-wire-ink-soft">
            ALIBABA KEBAB — LICHTAART
          </p>
          <h1 className="mt-3 font-display font-bold leading-none">
            <span className="wire-block inline-block px-4 py-2 text-6xl">
              PIZZA
            </span>
            <span className="wire-block mt-3 ml-8 inline-block bg-brand-yellow px-4 py-2 text-6xl">
              PITA
            </span>
            <span className="wire-block mt-3 ml-2 inline-block bg-brand-primary px-4 py-2 text-6xl text-brand-on-primary">
              GRILL
            </span>
          </h1>

          {/* Sticker van de dag (dagslogica volgt in een latere fase) */}
          <div className="absolute top-26 right-0 max-w-[45%] rotate-3">
            <div className="wire-block-flat bg-brand-yellow px-3 py-2 text-center">
              <p className="font-display text-xs font-bold tracking-widest">WOENSDAG</p>
              <p className="font-display text-lg font-bold leading-tight">
                PIZZADAG
              </p>
              <p className="font-display text-lg font-bold tabular-nums">
                € 12,00
              </p>
            </div>
          </div>

          <p className="mt-6 max-w-xs text-lg text-wire-ink-soft">
            Verse pizza&apos;s, pitta, durum en schotels — om af te halen in
            Lichtaart.
          </p>

          {/* Hero-foto: signatuurgerecht */}
          <div className="wire-photo relative mt-6 aspect-[16/9]">
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
              <span className="wire-block-flat absolute bottom-3 left-3 bg-wire-surface px-2 py-1 font-display text-xs font-bold tracking-widest">
                FOTO — SIGNATUUR SCHOTEL
              </span>
            )}
          </div>

          <div className="mt-6 flex gap-4">
            <a
              href="tel:+3214414047"
              className="wire-block flex min-h-13 flex-1 items-center justify-center gap-2 bg-brand-primary px-4 font-display text-lg font-bold text-brand-on-primary"
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
              className="wire-block flex min-h-13 flex-1 items-center justify-center bg-wire-surface px-4 font-display text-lg font-bold"
            >
              MENU ↓
            </a>
          </div>
        </section>

        {/* ── Menu: categorieën als kastickets ────────────────────── */}
        <section id="menu" className="relative scroll-mt-20 pt-2">
          <span
            aria-hidden="true"
            className="absolute top-24 -left-4 font-display text-sm font-bold tracking-[0.5em] text-wire-ink-soft [writing-mode:vertical-rl]"
          >
            HET MENU
          </span>

          <h2 className="font-display text-4xl font-bold">MENU</h2>
          <p className="mt-1 text-wire-ink-soft">
            {categories.length} categorieën, {" "}
            {categories.reduce((n, c) => n + c.items.length, 0)} gerechten
          </p>

          <div className="mt-6 space-y-5 pl-2">
            {categories.map((cat, i) => (
              <details
                key={cat.id}
                open={i === 0}
                className={`group wire-block-flat wire-ticket-edge ${
                  i % 2 === 0 ? "-rotate-[0.4deg]" : "rotate-[0.4deg]"
                }`}
              >
                <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-3xl font-bold tabular-nums text-wire-ink-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Photo
                    rel={`img/cats/${cat.id}.png`}
                    alt=""
                    sizes="48px"
                    className="size-12"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl font-bold uppercase">
                      {cat.name}
                    </span>
                    <span className="block text-sm text-wire-ink-soft">
                      {cat.items.length} items · vanaf €{" "}
                      <span className="tabular-nums">{eur(fromPrice(cat))}</span>
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="wire-block-flat flex size-11 items-center justify-center bg-wire-surface-alt font-display text-2xl font-bold"
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>

                <div className="border-t-3 border-wire-line px-4 pt-3 pb-8">
                  {cat.priceModel === "klein/groot" && (
                    <p className="mb-2 text-right font-display text-xs font-bold tracking-widest text-wire-ink-soft">
                      KLEIN / GROOT
                    </p>
                  )}
                  {cat.note && (
                    <p className="wire-block-flat mb-3 bg-wire-surface-alt px-3 py-2 text-sm">
                      {cat.note}
                    </p>
                  )}
                  <ul className="space-y-3">
                    {cat.items.map((item) => (
                      <li key={item.name} className="flex items-start gap-3">
                        <Photo
                          rel={`img/items/${cat.id}--${slugify(item.name)}.png`}
                          alt=""
                          sizes="56px"
                          className="size-14"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-end gap-2">
                            <span className="font-bold">{item.name}</span>
                            <span aria-hidden="true" className="wire-leader" />
                            <span className="font-display font-bold whitespace-nowrap tabular-nums">
                              {item.price !== undefined
                                ? eur(item.price)
                                : `${eur(item.prices!.klein)} / ${eur(item.prices!.groot)}`}
                            </span>
                          </div>
                          {item.ingredients.length > 0 && (
                            <p className="text-sm text-wire-ink-soft">
                              {item.ingredients.join(", ")}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  {cat.extras && (
                    <p className="mt-4 border-t-2 border-dotted border-wire-ink-soft pt-3 text-sm text-wire-ink-soft">
                      <span className="font-bold text-wire-ink">
                        Extra&apos;s (+€ {eur(cat.extras.price)}):
                      </span>{" "}
                      {cat.extras.options.join(", ")}
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Weekacties: gedraaide stickers ──────────────────────── */}
        <section className="pt-14">
          <h2 className="font-display text-4xl font-bold">ELKE WEEK</h2>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {(menu.weeklyDeals as { day: string; name: string; price: number; note?: string }[]).map(
              (deal, i) => (
                <div
                  key={deal.day}
                  className={`wire-block px-2 py-4 text-center ${
                    i === 1 ? "rotate-1 bg-brand-yellow" : "-rotate-1"
                  }`}
                >
                  <p className="font-display text-3xl font-bold">
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
                  <p className="mt-2 font-display text-xl font-bold tabular-nums">
                    € {eur(deal.price)}
                  </p>
                </div>
              ),
            )}
          </div>
          <p className="mt-3 text-sm text-wire-ink-soft">
            Schoteldag: m.u.v. Schotel Lamskotelet en Lichtaartse Zondag
            Speciaal.
          </p>
        </section>

        {/* ── Openingsuren + adres + kaart ─────────────────────────── */}
        <section className="pt-14">
          <h2 className="font-display text-4xl font-bold">HIER &amp; NU</h2>

          <div className="wire-block-flat mt-6">
            <p className="border-b-3 border-wire-line px-4 py-2 font-display text-sm font-bold tracking-widest">
              OPENINGSUREN
            </p>
            <ul>
              {Object.entries(hours)
                .filter(([k]) => k !== "note")
                .map(([day, time], i) => (
                  <li
                    key={day}
                    className={`flex items-center justify-between px-4 py-2 ${
                      i % 2 === 1 ? "bg-wire-surface-alt/50" : ""
                    }`}
                  >
                    <span className="capitalize">{day}</span>
                    <span className="font-display font-bold tabular-nums">
                      {time}
                    </span>
                  </li>
                ))}
            </ul>
            <p className="border-t-3 border-wire-line bg-wire-surface-alt px-4 py-2 text-sm font-bold">
              {hours.note}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            {/* Kaart-placeholder (echte kaart + afstand volgen later) */}
            <div className="wire-block-flat relative flex aspect-square items-center justify-center bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--wire-surface-alt)_10px,var(--wire-surface-alt)_12px)]">
              <span className="wire-block-flat bg-wire-surface px-2 py-1 font-display text-xs font-bold tracking-widest">
                KAART
              </span>
            </div>
            <div className="flex flex-col justify-between">
              <address className="not-italic">
                <p className="font-display text-lg font-bold">Leistraat 84</p>
                <p className="font-display text-lg font-bold">2460 Lichtaart</p>
              </address>
              <p className="text-sm text-wire-ink-soft">
                <span className="font-display font-bold tabular-nums">···</span>{" "}
                m van jou
                <br />
                (geolocatie volgt)
              </p>
              <a
                href="tel:+3214414047"
                className="wire-block-flat inline-block px-3 py-2 text-center font-display font-bold tabular-nums"
              >
                014 / 41 40 47
              </a>
            </div>
          </div>
        </section>

        {/* ── Allergenen ──────────────────────────────────────────── */}
        <section className="pt-10">
          <p className="wire-block-flat bg-wire-surface-alt px-4 py-3 text-sm">
            <span className="font-bold">Allergenen:</span>{" "}
            {menu.restaurant.allergenInfo} Volledige allergenenlijst per
            gerecht volgt op deze pagina.
          </p>
        </section>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <footer className="mt-14 border-t-3 border-wire-line pt-6 pb-4 text-sm text-wire-ink-soft">
          <div className="flex gap-4">
            <span className="underline decoration-dotted">
              Privacy (volgt)
            </span>
            <span className="underline decoration-dotted">
              Cookies (volgt)
            </span>
          </div>
          <p className="mt-3">
            © 2026 Alibaba Kebab — Pizza Pita Grill, Lichtaart
          </p>
        </footer>
      </main>

      {/* ── Sticky bel-balk ────────────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-3 border-wire-line bg-wire-surface pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-lg px-4 py-3">
          <a
            href="tel:+3214414047"
            className="wire-block-flat flex min-h-13 items-center justify-center gap-2 bg-brand-primary font-display text-lg font-bold text-brand-on-primary"
          >
            BEL &amp; BESTEL — 014 / 41 40 47
          </a>
        </div>
      </div>
    </div>
  );
}
