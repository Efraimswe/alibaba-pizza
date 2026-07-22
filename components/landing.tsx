import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import menu from "@/data/menu.json";
import type { Dict, DayKey, Locale } from "@/lib/i18n";
import { Gallery } from "@/components/gallery";
import { trItem } from "@/lib/menu-i18n";
import { MenuCarousel } from "@/components/menu-carousel";

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
          loading="lazy"
          sizes={sizes}
          className="object-contain p-1"
        />
      )}
    </span>
  );
}

const eur = (n: number) => n.toFixed(2).replace(".", ",");

const LANGUAGES: { code: Locale; href: string; label: string }[] = [
  { code: "nl", href: "/", label: "Nederlands" },
  { code: "en", href: "/en", label: "English" },
  { code: "fr", href: "/fr", label: "Français" },
];

export default function Landing({ locale, dict }: { locale: Locale; dict: Dict }) {
  const hours = menu.openingHours as Record<string, string>;

  return (
    <div className="overflow-x-clip">
      {/* ── Sticky header: wordmark + taaltoggle ─────────────────── */}
      <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3 md:max-w-2xl lg:max-w-5xl">
          <a href="#top" className="wordmark-sign flex items-center gap-2 font-logo text-3xl text-logo">
            <Image
              src="/img/logo.svg"
              alt="Alibaba Kebab logo"
              width={1024}
              height={820}
              className="h-9 w-auto shrink-0"
              priority
            />
            Alibaba
          </a>
          {/* Taalkeuze: dropdown */}
          <details data-lang-menu className="group relative" aria-label={dict.languageLabel}>
            <summary className="press flex min-h-11 cursor-pointer list-none items-center gap-1.5 rounded-full px-3 font-display font-medium text-ink-soft [&::-webkit-details-marker]:hidden">
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
            <div className="anim-pop absolute top-[calc(100%+0.5rem)] right-0 z-50 w-44 rounded-xl bg-surface p-1.5 shadow-[0_2px_6px_rgb(28_25_23/0.06),0_12px_28px_-8px_rgb(28_25_23/0.14)]">
              {LANGUAGES.map((lang) => {
                const active = lang.code === locale;
                return (
                  <a
                    key={lang.code}
                    href={lang.href}
                    aria-current={active ? "true" : undefined}
                    className={`press flex min-h-11 w-full cursor-pointer items-center justify-between rounded-lg px-3 font-display ${
                      active ? "bg-surface-gray font-medium text-ink" : "font-medium text-ink-soft"
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

      <main id="top" className="mx-auto max-w-lg px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] md:max-w-2xl lg:grid lg:max-w-5xl lg:grid-cols-3 lg:items-start lg:gap-x-6">
        {/* ── Hero-bento ───────────────────────────────────────────── */}
        <section className="pt-4 lg:col-span-3">
          <div>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight lg:text-5xl">
              Pizza, pitta &amp; grill — af te halen in Lichtaart
            </h1>

            <p className="mt-3 max-w-sm text-base text-ink-soft lg:mt-4">
              Zin in pizza of kebab? Vanaf 16u staan we voor je klaar.
            </p>

            {/* Schotels-collage onder de tekst */}
            <Image
              src="/img/hero-platters-v2.png"
              alt={dict.heroPhotoAlt}
              width={1600}
              height={882}
              priority
              sizes="(max-width: 48rem) 100vw, 48rem"
              className="relative left-1/2 mt-6 h-auto w-screen max-w-none -translate-x-1/2 md:static md:left-auto md:mx-auto md:w-full md:max-w-2xl md:translate-x-0"
            />
          </div>

          <div data-hero-cta className="mt-4 flex flex-col gap-3 md:max-w-md">
            <a
              href="https://maps.app.goo.gl/cp6UAzKbUHbBdhDx8"
              target="_blank"
              rel="noopener noreferrer"
              className="press flex min-h-11 items-center gap-2 font-display font-medium text-ink"
            >
              <span className="font-bold text-[#e8a013]">★ 4,3</span>
              <span className="text-ink-soft">·</span>
              <span>90+ reviews op Google</span>
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
            </a>
            <div>
              <a
                href="#menu"
                className="press flex min-h-12 items-center justify-between border-t border-surface-gray font-display font-medium"
              >
                <span className="text-ink-soft">Pizza&rsquo;s</span>
                <span className="flex items-center gap-2 text-ink-soft">
                  vanaf
                  <span className="rounded-lg bg-primary px-3 py-1 text-on-primary">€&nbsp;10,00</span>
                </span>
              </a>
              <a
                href="#menu"
                className="press flex min-h-12 items-center justify-between border-t border-surface-gray font-display font-medium"
              >
                <span className="text-ink-soft">Kebab</span>
                <span className="flex items-center gap-2 text-ink-soft">
                  vanaf
                  <span className="rounded-lg bg-primary px-3 py-1 text-on-primary">€&nbsp;9,00</span>
                </span>
              </a>
            </div>
            <p className="text-sm text-ink-soft">
              <a
                href="https://maps.google.com/?q=Leistraat+84,+2460+Lichtaart"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted"
              >
                Leistraat&nbsp;84, Lichtaart
              </a>{" "}
              · elke dag vanaf&nbsp;16u ·{" "}
              <a href="tel:+3214414047" className="whitespace-nowrap underline decoration-dotted">
                014&nbsp;/&nbsp;41&nbsp;40&nbsp;47
              </a>
            </p>
            <a
              href="tel:+3214414047"
              data-hero-call
              className="card press flex min-h-14 items-center justify-center gap-2 rounded-xl bg-primary font-display text-lg font-bold text-on-primary"
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
              {dict.arrangeOrderCta}
            </a>
            <a
              href="#menu"
              className="press flex min-h-14 items-center justify-center rounded-xl bg-surface-gray font-display text-lg font-bold text-ink"
            >
              {dict.menuCta}
            </a>
            <p className="mt-2 font-display text-lg font-bold text-ink">
              Voor grote bestellingen, stuur ons een bericht op WhatsApp.
            </p>
            <a
              href="https://wa.me/32465192080"
              target="_blank"
              rel="noopener noreferrer"
              className="card press flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#128c7e] font-display text-lg font-bold text-white"
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Stuur een bericht
            </a>
          </div>
        </section>

        {/* ── Menu: categorieën als bento-kaarten ─────────────────── */}
        <section id="menu" className="scroll-mt-20 pt-10 lg:col-span-2 lg:pt-8">
          <h2 className="px-2 font-display text-3xl font-bold">{dict.menuHeading}</h2>

          <MenuCarousel locale={locale} />
        </section>

        {/* ── Openingsuren + adres + kaart — на lg sticky-колонка справа.
            Обёртка = grid-item на всю высоту рядов 2–4: sticky клампится внутри неё
            и не наезжает на полноширинные секции ниже ── */}
        <div className="lg:col-start-3 lg:row-start-2 lg:row-span-3 lg:self-stretch">
        <section className="pt-10 lg:sticky lg:top-20 lg:pt-8">
          <h2 className="px-2 font-display text-3xl font-bold lg:text-2xl">{dict.hereNowHeading}</h2>

          {/* Статус «Nu open · sluit …» — заполняет инлайн-скрипт внизу (Europe/Brussels);
              без JS остаётся скрытым (display:none в globals.css) */}
          <p
            data-open-status
            suppressHydrationWarning
            className="mx-2 mt-3 w-fit items-center gap-2 rounded-full px-4 py-2 font-display text-sm font-bold"
          >
            {/* плейсхолдер-текст обязателен: скрипт заменяет СУЩЕСТВУЮЩИЙ текстовый узел,
                иначе новый узел ломает гидрацию (suppressHydrationWarning не покрывает лишние ноды) */}
            {" "}
          </p>

          <div data-shake className="card shake-idle mt-4 overflow-hidden">
            <p className="bg-secondary px-5 py-3 font-display text-sm font-bold tracking-widest text-on-secondary">
              {dict.openingHoursLabel}
            </p>
            <ul data-hours className="px-2 py-2">
              {Object.entries(hours)
                .filter(([k]) => k !== "note")
                .map(([day, time]) => (
                  <li
                    key={day}
                    data-day={day}
                    suppressHydrationWarning
                    className="flex items-center justify-between rounded-xl px-3 py-2"
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
        </section>
        </div>

        {/* ── Galerij: sfeer van de zaak ──────────────────────────── */}
        <section className="pt-10 lg:col-span-2 lg:pt-8">
          <h2 className="px-2 font-display text-3xl font-bold">
            {dict.galleryHeading}
          </h2>
          <div className="mt-4">
            <Gallery altPrefix={dict.galleryAlt} />
          </div>
        </section>

        {/* ── Weekacties: bento-rij ───────────────────────────────── */}
        <section className="pt-10 lg:col-span-2 lg:pt-8">
          <h2 className="px-2 font-display text-3xl font-bold">{dict.weeklyHeading}</h2>
          <div data-hop className="mt-4 grid grid-cols-3 gap-3">
            {(menu.weeklyDeals as { day: string; name: string; price: number; note?: string }[]).map(
              (deal, i) => (
                <div
                  key={deal.day}
                  className={`card px-2 py-4 text-center ${
                    i === 1 ? "bg-primary text-on-primary" : ""
                  }`}
                >
                  <p className="font-display text-2xl font-bold">
                    {dict.dayAbbrev[deal.day as DayKey]}
                  </p>
                  <Photo
                    rel={`img/deals/${deal.day}.png`}
                    alt=""
                    sizes="(max-width: 32rem) 33vw, 10rem"
                    className="mt-2 aspect-square w-full"
                  />
                  <p className="mt-2 min-w-0 text-xs font-bold tracking-wide uppercase">
                    {dict.dealNameByDay[deal.day] ?? deal.name}
                  </p>
                  <p
                    className={`mt-1 font-display text-lg font-bold tabular-nums ${
                      i === 1 ? "" : "text-primary-deep"
                    }`}
                  >
                    €{" "}{eur(deal.price)}
                  </p>
                </div>
              ),
            )}
          </div>
          <p className="mt-3 px-2 text-sm text-ink-soft">
            {dict.dealNameByDay.donderdag}: {dict.weeklyExceptWord}{" "}
            {trItem(locale, "Schotel Lamskotelet")} {dict.andWord}{" "}
            {trItem(locale, "Lichtaartse Zondag Speciaal")}.
          </p>
        </section>

        {/* ── Allergenen ──────────────────────────────────────────── */}
        <section className="pt-8 lg:col-span-3 lg:pt-10">
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

        {/* ── Footer ──────────────────────────────────────────────── */}
        {/* Локальный SEO-блок: регион видимым текстом */}
        <section className="pt-10 lg:col-span-3">
          <div className="card-inset px-5 py-4">
            <h2 className="font-display text-base font-bold">{dict.regionHeading}</h2>
            <p className="mt-1 text-sm text-ink-soft">{dict.regionText}</p>
          </div>
        </section>

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
            <br />
            <span className="tabular-nums">Ondernemingsnummer 1031538184</span>
          </p>
          {/* Social media — открываются в новой вкладке */}
          <div className="mt-4 flex gap-4 px-2">
            <a
              href="https://www.tiktok.com/@alibabakebablichtaart"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="press text-ink-soft transition-colors hover:text-ink"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/alib_aba226"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="press text-ink-soft transition-colors hover:text-ink"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61591809757697"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="press text-ink-soft transition-colors hover:text-ink"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
              </svg>
            </a>
          </div>
        </footer>
      </main>

      {/* ── Zwevende bel-knop: на lg появляется после скролла мимо hero-CTA ── */}
      <div
        data-callbar
        suppressHydrationWarning
        className="fixed inset-x-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40"
      >
        <a
          href="tel:+3214414047"
          className="press mx-auto flex min-h-14 max-w-lg items-center justify-center gap-2 rounded-xl bg-primary font-display text-lg font-bold text-on-primary shadow-[0_16px_40px_-12px_rgb(234_88_12_/_0.45)]"
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
          {dict.arrangeOrderCta}
        </a>
      </div>

      {/* Клиентское поведение без отдельного бандла: статус «открыто/закрыто» (Europe/Brussels),
          выделение сегодняшнего дня, закрытие языкового дропдауна (Esc/клик-вне/выбор),
          кнопка «Sluit» в тикетах, показ bel-bar на lg после скролла мимо hero-CTA */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
var H=${JSON.stringify(hours)};
var S=${JSON.stringify({ open: dict.openStatus.openNow, closed: dict.openStatus.opensAt })};
var D=["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"];
function pm(s){var a=(s||"").split("–");if(a.length<2)return null;var b=a[0].split(":"),c=a[1].split(":");var x=+b[0]*60+ +b[1],y=+c[0]*60+ +c[1];return isNaN(x)||isNaN(y)?null:[x,y]}
function f(m){return("0"+((m/60)|0)).slice(-2)+":"+("0"+m%60).slice(-2)}
try{
var P=new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Brussels",weekday:"long",hour:"2-digit",minute:"2-digit",hourCycle:"h23"}).formatToParts(new Date());
var g=function(t){for(var i=0;i<P.length;i++)if(P[i].type===t)return P[i].value};
var w=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].indexOf(g("weekday"));
var n=+g("hour")*60+ +g("minute");
var td=pm(H[D[w]]),yd=pm(H[D[(w+6)%7]]);
var open=false,c=0;
if(yd&&yd[1]<yd[0]&&n<yd[1]){open=true;c=yd[1]}
else if(td&&n>=td[0]&&(n<td[1]||td[1]<td[0])){open=true;c=td[1]}
var b=document.querySelector("[data-open-status]");
if(b&&td){b.textContent=(open?S.open:S.closed).replace("{t}",f(open?c:td[0]));b.setAttribute("data-state",open?"open":"closed")}
var r=document.querySelector('[data-hours] [data-day="'+D[w]+'"]');
if(r)r.setAttribute("data-today","")
}catch(e){}
document.addEventListener("click",function(e){
var t=e.target instanceof Element?e.target:null;if(!t)return;
var d=document.querySelector("details[data-lang-menu][open]");
if(d&&(!d.contains(t)||t.closest("a")))d.removeAttribute("open");
});
document.addEventListener("keydown",function(e){
if(e.key!=="Escape")return;
var d=document.querySelector("details[data-lang-menu][open]");
if(d){d.removeAttribute("open");var s=d.querySelector("summary");if(s)s.focus()}
});
var bar=document.querySelector("[data-callbar]"),cta=document.querySelector("[data-hero-call]");
if(bar&&cta&&"IntersectionObserver" in window)new IntersectionObserver(function(es){bar.classList.toggle("past-hero",!es[0].isIntersecting)},{rootMargin:"-80px 0px 0px 0px"}).observe(cta);
})()`,
        }}
      />
    </div>
  );
}
