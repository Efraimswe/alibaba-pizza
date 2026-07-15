import type { Locale } from "@/lib/i18n";

type Tr = { en: string; fr: string };

// Ingrediënten: sleutel = exacte NL-string uit data/menu.json (item.ingredients[])
export const INGREDIENTS: Record<string, Tr> = {
  tomatensaus: { en: "tomato sauce", fr: "sauce tomate" },
  kaas: { en: "cheese", fr: "fromage" },
  champignons: { en: "mushrooms", fr: "champignons" },
  salami: { en: "salami", fr: "salami" },
  hesp: { en: "ham", fr: "jambon" },
  ui: { en: "onion", fr: "oignon" },
  ananas: { en: "pineapple", fr: "ananas" },
  ansjovis: { en: "anchovies", fr: "anchois" },
  kappertjes: { en: "capers", fr: "câpres" },
  ei: { en: "egg", fr: "œuf" },
  peterselie: { en: "parsley", fr: "persil" },
  "pikante saus": { en: "spicy sauce", fr: "sauce épicée" },
  kip: { en: "chicken", fr: "poulet" },
  "kebab vlees": { en: "kebab meat", fr: "viande de kebab" },
  tonijn: { en: "tuna", fr: "thon" },
  olijven: { en: "olives", fr: "olives" },
  paprika: { en: "bell pepper", fr: "poivron" },
  pitta: { en: "pita meat", fr: "viande pita" },
  "maïs": { en: "corn", fr: "maïs" },
  kebab: { en: "kebab", fr: "kebab" },
  artisjok: { en: "artichoke", fr: "artichaut" },
  gehakt: { en: "minced meat", fr: "viande hachée" },
  bolognesesaus: { en: "bolognese sauce", fr: "sauce bolognaise" },
  "4 soorten kaas": { en: "four cheeses", fr: "quatre fromages" },
  zeevruchten: { en: "seafood", fr: "fruits de mer" },
  look: { en: "garlic", fr: "ail" },
  "barbecue saus": { en: "barbecue sauce", fr: "sauce barbecue" },
  mozzarella: { en: "mozzarella", fr: "mozzarella" },
  ham: { en: "ham", fr: "jambon" },
  roomsaus: { en: "cream sauce", fr: "sauce crème" },
  tomaten: { en: "tomatoes", fr: "tomates" },
  currysaus: { en: "curry sauce", fr: "sauce curry" },
  scampi: { en: "shrimp", fr: "scampi" },
  "2 kaas": { en: "two cheeses", fr: "deux fromages" },
  "ham salami": { en: "ham & salami", fr: "jambon et salami" },
  looksaus: { en: "garlic sauce", fr: "sauce à l'ail" },
  "met saus": { en: "with sauce", fr: "avec sauce" },
  "met friet en saus": { en: "with fries and sauce", fr: "avec frites et sauce" },
  sla: { en: "lettuce", fr: "laitue" },
  tomaat: { en: "tomato", fr: "tomate" },
  komkommer: { en: "cucumber", fr: "concombre" },
  wortel: { en: "carrot", fr: "carotte" },
  kool: { en: "cabbage", fr: "chou" },
  "groenten salade": { en: "vegetable salad", fr: "salade de légumes" },
  "feta kaas": { en: "feta cheese", fr: "fromage feta" },
  "met ananas": { en: "with pineapple", fr: "avec ananas" },
  kofte: { en: "kofta", fr: "kofta" },
  lamskotelet: { en: "lamb chop", fr: "côtelette d'agneau" },
  "groenten en friet": { en: "vegetables and fries", fr: "légumes et frites" },
  kipfilet: { en: "chicken fillet", fr: "filet de poulet" },
  "gebakken ui": { en: "fried onion", fr: "oignon frit" },
};

// Categorienamen per id (zie data/menu.json → categories[].id)
export const CATEGORY_NAMES: Record<string, Tr> = {
  pizzas: { en: "Pizzas", fr: "Pizzas" },
  calzone: { en: "Calzones", fr: "Calzones" },
  lookbrood: { en: "Garlic bread", fr: "Pain à l'ail" },
  snacks: { en: "Snacks", fr: "Snacks" },
  broodjes: { en: "Pita sandwiches", fr: "Sandwichs pita" },
  durum: { en: "Durum wraps", fr: "Durums" },
  kapsalon: { en: "Kapsalon", fr: "Kapsalon" },
  lasagna: { en: "Lasagna", fr: "Lasagne" },
  salades: { en: "Salads", fr: "Salades" },
  schotels: { en: "Grill platters", fr: "Assiettes grill" },
  bakjes: { en: "Fries trays", fr: "Barquettes de frites" },
  dranken: { en: "Drinks", fr: "Boissons" },
  dessert: { en: "Desserts", fr: "Desserts" },
};

// Gerechtnamen: alleen items met NL-woorden. Sleutel = exacte item.name.
// Italiaanse/internationale namen (Margherita, Funghi, Tiramisu, Coca Cola…) bewust weggelaten.
export const ITEM_NAMES: Record<string, Tr> = {
  "Pizza Kip": { en: "Chicken Pizza", fr: "Pizza au poulet" },
  "Pizza Kebap": { en: "Kebab Pizza", fr: "Pizza kebab" },
  "Vier Seizoenen": { en: "Four Seasons", fr: "Quatre Saisons" },

  "Lookbrood Natur": { en: "Garlic bread plain", fr: "Pain à l'ail nature" },
  "Lookbrood Kaas": { en: "Garlic bread cheese", fr: "Pain à l'ail fromage" },
  "Lookbrood Kaas - Ham": { en: "Garlic bread cheese & ham", fr: "Pain à l'ail fromage-jambon" },
  "Lookbrood Kaas - Salami": { en: "Garlic bread cheese & salami", fr: "Pain à l'ail fromage-salami" },

  "Broodje Mexicano": { en: "Mexicano Sandwich", fr: "Sandwich mexicano" },
  "Frikandel met friet": { en: "Frikandel with fries", fr: "Frikandel frites" },

  Kip: { en: "Chicken", fr: "Poulet" },
  "Mix, Kip en Kebab": { en: "Mix, Chicken & Kebab", fr: "Mixte, poulet et kebab" },
  "Pitta en Kip": { en: "Pita & Chicken", fr: "Pita et poulet" },
  "Doner Kebab Speciaal": { en: "Doner Kebab Special", fr: "Döner kebab spécial" },
  "Kip Speciaal": { en: "Chicken Special", fr: "Poulet spécial" },
  "Pitta Speciaal": { en: "Pita Special", fr: "Pita spécial" },
  "Kofte Boulet": { en: "Kofta Meatballs", fr: "Boulettes kofta" },
  Vegetarisch: { en: "Vegetarian", fr: "Végétarien" },

  "Kapsalon Vegi": { en: "Veggie Kapsalon", fr: "Kapsalon végé" },
  "Kapsalon Kebab": { en: "Kebab Kapsalon", fr: "Kapsalon kebab" },
  "Kapsalon Kip": { en: "Chicken Kapsalon", fr: "Kapsalon poulet" },
  "Kapsalon Pitta": { en: "Pita Kapsalon", fr: "Kapsalon pita" },
  "Kapsalon Mix": { en: "Mix Kapsalon", fr: "Kapsalon mixte" },

  Groentensalade: { en: "Vegetable salad", fr: "Salade de légumes" },
  Fetasalade: { en: "Feta salad", fr: "Salade feta" },
  Tonijnsalade: { en: "Tuna salad", fr: "Salade au thon" },
  "Kip Salade": { en: "Chicken Salad", fr: "Salade au poulet" },
  "Mix Salade": { en: "Mix Salad", fr: "Salade mixte" },

  "Schotel Doner Kebab": { en: "Doner Kebab Platter", fr: "Assiette döner kebab" },
  "Schotel Kip": { en: "Chicken Platter", fr: "Assiette poulet" },
  "Schotel Pitta": { en: "Pita Platter", fr: "Assiette pita" },
  "Schotel Mix, Kip en Kebab": { en: "Mix, Chicken & Kebab Platter", fr: "Assiette mixte, poulet et kebab" },
  "Schotel Pitta en Kebab": { en: "Pita & Kebab Platter", fr: "Assiette pita et kebab" },
  "Schotel Kofte Boulet": { en: "Kofta Meatball Platter", fr: "Assiette boulettes kofta" },
  "Schotel Lamskotelet": { en: "Lamb Chop Platter", fr: "Assiette côtelette d'agneau" },
  "Schotel Doner Kebap Hawai": { en: "Doner Kebab Hawaii Platter", fr: "Assiette döner kebab Hawaï" },
  "Schotel Kip Hawaï": { en: "Chicken Hawaii Platter", fr: "Assiette poulet Hawaï" },
  "Schotel Pitta Hawaï": { en: "Pita Hawaii Platter", fr: "Assiette pita Hawaï" },
  "Schotel Doner Kebab Speciaal": { en: "Doner Kebab Special Platter", fr: "Assiette döner kebab spécial" },
  "Schotel Kip Speciaal": { en: "Chicken Special Platter", fr: "Assiette poulet spécial" },
  "Schotel Pitta Speciaal": { en: "Pita Special Platter", fr: "Assiette pita spécial" },
  "Ali Baba Speciaal (van het huis)": { en: "Ali Baba Special (house specialty)", fr: "Spécial Ali Baba (maison)" },
  "Lichtaartse Zondag Speciaal": { en: "Lichtaart Sunday Special", fr: "Spécial dimanche de Lichtaart" },

  "Friet met saus": { en: "Fries with sauce", fr: "Frites sauce" },
  "Friet met kebab": { en: "Fries with kebab", fr: "Frites kebab" },
  "Friet met kip": { en: "Fries with chicken", fr: "Frites poulet" },
  "Friet met pitta": { en: "Fries with pita", fr: "Frites pita" },
  "Friet met pitta en kip": { en: "Fries with pita and chicken", fr: "Frites pita et poulet" },
  "Friet met kebab en kip": { en: "Fries with kebab and chicken", fr: "Frites kebab et poulet" },

  Frisdranken: { en: "Soft drinks", fr: "Boissons fraîches" },
  "Thee of koffie": { en: "Tea or coffee", fr: "Thé ou café" },
  Water: { en: "Water", fr: "Eau" },

  Chocomouse: { en: "Chocolate mousse", fr: "Mousse au chocolat" },
};

// Extra's (extras.options): sleutel = exacte string uit data/menu.json
export const EXTRAS: Record<string, Tr> = {
  pepers: { en: "chili peppers", fr: "piments" },
  ananas: { en: "pineapple", fr: "ananas" },
  "kaas (jonge of feta)": { en: "cheese (mild or feta)", fr: "fromage (jeune ou feta)" },
  champignons: { en: "mushrooms", fr: "champignons" },
  "gebakken uien": { en: "fried onions", fr: "oignons frits" },
  paprika: { en: "bell pepper", fr: "poivron" },
  saus: { en: "sauce", fr: "sauce" },
  vlees: { en: "meat", fr: "viande" },
  kaas: { en: "cheese", fr: "fromage" },
  feta: { en: "feta", fr: "feta" },
};

export function trCategory(locale: Locale, id: string, fallback: string): string {
  if (locale === "nl") return fallback;
  return CATEGORY_NAMES[id]?.[locale] ?? fallback;
}

export function trItem(locale: Locale, name: string): string {
  if (locale === "nl") return name;
  return ITEM_NAMES[name]?.[locale] ?? name;
}

export function trIngredients(locale: Locale, list: string[]): string[] {
  if (locale === "nl") return list;
  return list.map((i) => INGREDIENTS[i]?.[locale] ?? i);
}

export function trExtras(locale: Locale, list: string[]): string[] {
  if (locale === "nl") return list;
  return list.map((e) => EXTRAS[e]?.[locale] ?? e);
}
