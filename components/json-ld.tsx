import menu from "@/data/menu.json";

const SITE_URL = "https://alibaba-pizza.vercel.app";

// nl → schema.org DayOfWeek
const DAY_TO_SCHEMA: Record<string, string> = {
  maandag: "Monday",
  dinsdag: "Tuesday",
  woensdag: "Wednesday",
  donderdag: "Thursday",
  vrijdag: "Friday",
  zaterdag: "Saturday",
  zondag: "Sunday",
};

type Item = {
  name: string;
  ingredients: string[];
  price?: number;
  prices?: { klein: number; groot: number };
};

type Category = {
  id: string;
  name: string;
  items: Item[];
};

function itemOffers(item: Item) {
  if (item.prices) {
    const values = [item.prices.klein, item.prices.groot];
    return {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: Math.min(...values).toFixed(2),
      highPrice: Math.max(...values).toFixed(2),
      offerCount: 2,
    };
  }
  return {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: item.price!.toFixed(2),
  };
}

function menuItem(item: Item) {
  return {
    "@type": "MenuItem",
    name: item.name,
    ...(item.ingredients.length > 0 && {
      description: item.ingredients.join(", "),
    }),
    offers: itemOffers(item),
  };
}

function openingHoursSpecification() {
  const hours = menu.openingHours as Record<string, string>;
  return Object.entries(hours)
    .filter(([day]) => day !== "note")
    .map(([day, time]) => {
      const [opens, closes] = time.split("–");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${DAY_TO_SCHEMA[day]}`,
        opens,
        closes,
      };
    });
}

export default function JsonLd() {
  const categories = menu.categories as Category[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: menu.restaurant.name,
    alternateName: "Alibaba Pizza Lichtaart",
    servesCuisine: ["Pizza", "Kebab", "Turkish"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Leistraat 84",
      addressLocality: "Lichtaart",
      postalCode: "2460",
      addressCountry: "BE",
    },
    telephone: "+3214414047",
    url: SITE_URL,
    image: `${SITE_URL}/img/hero-schotel.jpg`,
    priceRange: "€",
    // Geo приблизительно (центр Lichtaart) — уточнить точный geocode адреса Leistraat 84
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.216,
      longitude: 4.918,
    },
    areaServed: ["Lichtaart", "Kasterlee", "Olen"],
    openingHoursSpecification: openingHoursSpecification(),
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: categories.map((cat) => ({
        "@type": "MenuSection",
        name: cat.name,
        hasMenuItem: cat.items.map(menuItem),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
