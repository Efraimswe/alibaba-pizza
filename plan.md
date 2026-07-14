# План: продакшен-паковка alibaba-pizza (2026-07-15)

Цель: закрыть req 3 (комплаенс), 5 (карта+расстояние), 6 (аллергены — насколько возможно без данных клиента), 7 (жёсткое SEO/AEO), 10 (i18n NL/EN/FR). Без деплоя.

Инварианты для ВСЕХ кусков:
- Дизайн-система v2 «Minimal Bento» (design-foundation.md): токены из globals.css (bg/surface/surface-alt/ink/ink-soft/primary/secondary), карточки `.card`/`.card-inset`, радиусы 20–24px/full, БЕЗ бордеров, шрифты font-logo (Lobster, только wordmark) / font-display (Space Grotesk) / font-sans (Karla).
- Микроинтеракции: только transform/opacity, ≤300ms, классы `.press`/`.anim-*` уже есть; reduced-motion глобально выключает.
- Статический сайт, БЕЗ бэкенда. Никаких cookies/трекеров.
- Мобайл-фёрст 375px, тап-таргеты ≥44px, контраст AA (белый на primary — только крупный жирный).
- Данные — ТОЛЬКО из data/menu.json. НЕ менять menu.json.
- НЕ запускать `pnpm build` (dev-сервер живой, конфликт .next). Проверка: `npx tsc --noEmit` + curl роутов на :3000.
- НЕ коммитить и НЕ пушить — коммитит лид.

## C1 — i18n NL/EN/FR (первым, соло — трогает всю страницу)
Файлы: app/page.tsx → components/landing.tsx, lib/i18n.ts, app/en/page.tsx, app/fr/page.tsx, правка app/layout.tsx (lang), app/page.tsx (тонкая обёртка NL).
- Роуты: `/` = NL (основной, без префикса), `/en`, `/fr` — три статические страницы, один компонент `<Landing locale dict>`.
- lib/i18n.ts: словари nl/en/fr для ВСЕХ UI-строк страницы (тикер, hero-подпись и описание, «Menu», «categorieën/gerechten», «items · vanaf», KLEIN/GROOT, Extra's, «Elke week», названия акций, «Hier & nu», OPENINGSUREN, дни недели, «open op feestdagen», KAART, «m van jou», телефонные CTA, аллергены, футер, «binnenkort» и т.д.). Названия блюд и ингредиенты НЕ переводить (меню аутентичное NL).
- Дропдаун языка: те же details/summary и стили, но пункты = ссылки <a href="/">Nederlands</a> / /en / /fr; активный локаль с галочкой; убрать disabled/binnenkort.
- <html lang>: nl-BE на корне; для /en и /fr html lang остаётся nl-BE (один root layout) — НО на каждой странице проставить метадату языка (C2 подхватит hreflang). Дни недели в таблице часов — из словаря.
- Ключи menu.json (maandag…) мапить через словарь дней.

## C2 — SEO/AEO-пакет (после C1; новые файлы + layout)
Файлы: app/layout.tsx (metadata base), components/landing.tsx (только вставка <JsonLd> и alt'ы, не трогая разметку), app/sitemap.ts, app/robots.ts, app/icon.svg, components/json-ld.tsx, public/llms.txt, метадата в app/page.tsx, app/en/page.tsx, app/fr/page.tsx.
- Metadata (локализованная на каждой из 3 страниц): title «Alibaba Kebab Lichtaart — Pizza, Pitta, Durum & Schotels afhalen» (+ EN/FR варианты), description с ключами pizza/kebab/pitta + Lichtaart/Kasterlee/Olen, keywords, metadataBase (https://alibaba-pizza.vercel.app), canonical + alternates.languages (hreflang nl-BE→/, en→/en, fr→/fr, x-default→/), openGraph (type website, image /img/hero.jpg, locale nl_BE), twitter card summary_large_image.
- JSON-LD (components/json-ld.tsx, генерится из data/menu.json): @type Restaurant — name «Alibaba Kebab», alternateName «Alibaba Pizza Lichtaart», servesCuisine [Pizza, Kebab, Turkish], address (PostalAddress, BE, 2460 Lichtaart, Leistraat 84), telephone +3214414047, openingHoursSpecification из openingHours, priceRange «€», geo (approx 51.216, 4.918 — пометить комментарием «приблизительно»), areaServed [Lichtaart, Kasterlee, Olen], hasMenu с ПОЛНЫМИ hasMenuSection/hasMenuItem (name, description=ингредиенты, offers price EUR) из всех 13 категорий.
- app/sitemap.ts: /, /en, /fr, /privacy, /cookies с alternates.
- app/robots.ts: allow all, sitemap URL.
- app/icon.svg: красная (#E23D28) скруглённая плитка с белой «A» (font-weight 700) — простой SVG.
- public/llms.txt: краткое описание бизнеса, адрес, часы, категории меню, телефон (AEO для ChatGPT/Claude).
- Заголовки: h1 один (Alibaba), h2 секции — проверить иерархию.

## C3 — Карта + расстояние (после C1)
Файлы: components/landing.tsx (ТОЛЬКО секция Hier & nu, карточка KAART и строка «m van jou»), components/distance.tsx (client).
- Карта: iframe OpenStreetMap embed (без ключей) на координаты Leistraat 84, 2460 Kasterlee (Lichtaart) — СНАЧАЛА уточнить координаты через Nominatim (https://nominatim.openstreetmap.org/search?q=Leistraat+84+Kasterlee&format=json), fallback 51.216/4.918 с пометкой. iframe: rounded-2xl, loading="lazy", title, в существующем квадрате вместо заглушки; ссылка «Route» на Google Maps (https://maps.google.com/?q=Leistraat+84,+2460+Lichtaart).
- components/distance.tsx ('use client'): кнопка «📍 Toon afstand» (не эмодзи — SVG map-pin!) в стиле пилюли surface-alt + press; клик → navigator.geolocation → haversine до координат → «≈ 1,2 km van jou» (м если <1км); состояния: idle/loading («…»)/error («Locatie niet beschikbaar»)/success; строки — через словарь i18n (пробросить locale/dict пропсом). Никаких молчаливых действий.
- Заменить мок «··· m van jou (geolocatie volgt)».

## C4 — Комплаенс ЕС/Бельгия (после C1)
Файлы: app/privacy/page.tsx, app/cookies/page.tsx, components/landing.tsx (ТОЛЬКО секция аллергенов и футер).
- /privacy (NL): privacybeleid для статического сайта — какие данные обрабатываются (геолокация: только в браузере, никуда не отправляется; нет cookies, нет трекеров, хостинг Vercel — server logs), права GDPR, контакт. Дизайн: карточка на bg, кнопка «← Terug».
- /cookies (NL): сайт НЕ использует cookies и трекинг — поэтому баннер не нужен (это законно по ePrivacy при отсутствии cookies) — краткая страница.
- Аллергены: расширить секцию — карточка с заголовком «Allergenen», текст EU Reg. 1169/2011, список 14 аллергенов ЕС (gluten, schaaldieren, eieren, vis, pinda's, soja, melk, noten, selderij, mosterd, sesamzaad, sulfiet, lupine, weekdieren) чипами `.card-inset`, призыв «vraag ons personeel» + телефон. Пометка: точная маркировка по позициям появится после данных от клиента (в коде TODO-комментарий).
- Футер: ссылки на /privacy и /cookies (реальные <a>), юрблок: Alibaba Kebab, Leistraat 84 2460 Lichtaart, тел; «Ondernemingsnummer: —» с TODO-комментарием (запросить у клиента).

## Гейт (лид, после всех):
tsc, curl всех роутов (/, /en, /fr, /privacy, /cookies, /sitemap.xml, /robots.txt), стоп dev → pnpm build → рестарт dev, ревью diff по frontend-ui-design-reviewer, коммит, обновление тасков в second-brain.
