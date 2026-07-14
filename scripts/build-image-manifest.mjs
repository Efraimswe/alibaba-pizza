// Строит манифест генерации фото: файл → промпт, из data/menu.json.
// Слаг должен совпадать с helper'ом в app/page.tsx (slugify).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const menu = JSON.parse(readFileSync(new URL("../data/menu.json", import.meta.url), "utf8"));

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// NL → EN словарь ингредиентов для промптов
const NL_EN = {
  tomatensaus: "tomato sauce", kaas: "cheese", champignons: "mushrooms",
  salami: "salami", hesp: "ham", ui: "onion", ananas: "pineapple",
  ansjovis: "anchovies", kappertjes: "capers", ei: "egg",
  peterselie: "parsley", "pikante saus": "spicy sauce", kip: "grilled chicken",
  "kebab vlees": "doner kebab meat", kebab: "doner kebab meat",
  tonijn: "tuna", olijven: "olives", paprika: "bell pepper",
  pitta: "gyros meat", "maïs": "sweet corn", mais: "sweet corn",
  artisjok: "artichoke", gehakt: "minced beef", bolognesesaus: "bolognese sauce",
  "4 soorten kaas": "four cheeses", zeevruchten: "seafood", look: "garlic",
  "barbecue saus": "barbecue sauce", mozzarella: "mozzarella",
  scampi: "shrimp scampi", roomsaus: "cream sauce", currysaus: "curry sauce",
  tomaten: "tomatoes", "2 kaas": "double cheese", ham: "ham",
  "ham salami": "ham and salami", "met saus": "with sauce",
  "met friet en saus": "with fries and sauce", "looksaus": "garlic sauce",
  sla: "lettuce", tomaat: "tomato", komkommer: "cucumber", wortel: "carrot",
  kool: "cabbage", "groenten salade": "mixed vegetable salad",
  "feta kaas": "feta cheese", "met ananas": "with grilled pineapple",
  kofte: "kofta meatballs", lamskotelet: "lamb chops", kipfilet: "chicken fillet",
  "gebakken ui": "fried onions", "groenten en friet": "vegetables and fries",
};
const tr = (ing) => NL_EN[ing.toLowerCase()] ?? ing;
const ingr = (item) => item.ingredients.map(tr).join(", ");

// Форма блюда по категории
const SHAPE = {
  pizzas: (i) => `one whole rustic wood-fired pizza topped with ${ingr(i) || "melted cheese"}, top view`,
  calzone: (i) => `one golden folded calzone pizza, filling of ${ingr(i)}, slightly open showing filling`,
  lookbrood: (i) => `one baked garlic bread loaf${i.ingredients.length ? " topped with " + ingr(i) : ""}, golden crust`,
  snacks: (i) => {
    const n = i.name.toLowerCase();
    if (n.includes("hamburger")) return "one juicy hamburger with lettuce tomato and sauce, side view";
    if (n.includes("cheeseburger")) return "one cheeseburger with melted cheddar lettuce tomato, side view";
    if (n.includes("fish")) return "one crispy fish burger with lettuce and tartar sauce, side view";
    if (n.includes("mexicano")) return "one belgian broodje mexicano, spicy sausage sandwich in baguette with sauce, side view";
    if (n.includes("friet")) return "one crispy fried frikandel sausage with belgian fries and sauce";
    return "one crispy fried frikandel snack sausage with a stripe of sauce";
  },
  broodjes: (i) => `one turkish pita bread sandwich generously filled with ${ingr(i) || i.name.toLowerCase().replace("speciaal", "") + " meat"}, fresh vegetables and garlic sauce, side view`,
  durum: (i) => `one grilled durum wrap, rolled turkish tortilla filled with ${ingr(i) || i.name.toLowerCase() + " meat"}, fresh vegetables, cut showing filling`,
  kapsalon: (i) => `one kapsalon in aluminium foil tray: belgian fries topped with ${i.name.toLowerCase().includes("vegi") ? "grilled vegetables" : i.name.toLowerCase().replace("kapsalon", "") + " meat"}, melted gouda cheese, lettuce, tomato, garlic sauce, top view`,
  lasagna: () => "one portion of homemade lasagna with melted cheese and bolognese on a plate",
  salades: (i) => `one fresh salad bowl with ${ingr(i)}, top view`,
  schotels: (i) => `one large turkish grill platter: ${ingr(i) || i.name.replace(/schotel/i, "") + " grilled meat"}, belgian fries, fresh vegetables and garlic sauce, top view`,
  bakjes: (i) => `one tray of golden belgian fries${i.name.toLowerCase() !== "friet met saus" ? " topped with " + i.name.toLowerCase().replace("friet met", "") : " with mayonnaise"}`,
  dranken: (i) => {
    const n = i.name.toLowerCase();
    if (n.includes("redbull")) return "one energy drink can, silver and blue, condensation drops";
    if (n.includes("thee")) return "one glass cup of turkish tea and a coffee cup";
    if (n.includes("water")) return "one bottle of still water, condensation drops";
    if (n.includes("ayran")) return "one glass of cold ayran turkish yogurt drink with foam";
    if (n.includes("1,5")) return "one large 1.5 liter cola bottle";
    return "one cold soda can with condensation drops";
  },
  dessert: (i) => {
    const n = i.name.toLowerCase();
    if (n.includes("speculoos")) return "one glass of tiramisu dessert with speculoos biscuit crumble layers";
    if (n.includes("tiramisu")) return "one glass of classic tiramisu dessert with cocoa dusting";
    return "one glass of chocolate mousse dessert with chocolate shavings";
  },
};

const STYLE =
  "professional food photography, appetizing, studio lighting, centered, isolated on pure white background, no props, no text, no watermark";

const entries = [];

// Hero — signatuur schotel (Ali Baba Speciaal van het huis)
entries.push({
  file: "public/img/hero.png",
  w: 1280, h: 720,
  prompt: `one large mixed turkish grill platter: kofta, lamb chops, doner kebab, grilled chicken, belgian fries, fresh vegetables, garlic sauce, top view, ${STYLE}`,
});

// Категории
const CAT_PROMPT = {
  pizzas: "one whole rustic wood-fired margherita pizza with melted cheese, top view",
  calzone: "one golden folded calzone pizza",
  lookbrood: "one baked garlic bread loaf with herbs, golden crust",
  snacks: "one juicy cheeseburger, side view",
  broodjes: "one turkish pita bread sandwich filled with doner kebab meat and vegetables, side view",
  durum: "one grilled durum wrap cut in half showing doner filling",
  kapsalon: "one kapsalon in foil tray, fries topped with doner meat, melted cheese, salad, top view",
  lasagna: "one portion of homemade lasagna with melted cheese on a plate",
  salades: "one fresh mixed salad bowl, top view",
  schotels: "one large turkish grill platter with doner meat, fries and vegetables, top view",
  bakjes: "one tray of golden belgian fries with mayonnaise",
  dranken: "cold soda cans and ayran glass with condensation",
  dessert: "one glass of classic tiramisu dessert with cocoa dusting",
};

for (const cat of menu.categories) {
  entries.push({
    file: `public/img/cats/${cat.id}.png`,
    w: 512, h: 512,
    prompt: `${CAT_PROMPT[cat.id]}, ${STYLE}`,
  });
  const shape = SHAPE[cat.id];
  for (const item of cat.items) {
    entries.push({
      file: `public/img/items/${cat.id}--${slugify(item.name)}.png`,
      w: 512, h: 512,
      prompt: `${shape(item)}, ${STYLE}`,
    });
  }
}

// Акции
const DEAL_PROMPT = {
  dinsdag: "one kapsalon in foil tray, fries topped with doner meat, melted cheese, salad, top view",
  woensdag: "one whole rustic wood-fired pizza with salami and vegetables, top view",
  donderdag: "one large turkish grill platter with doner meat, fries and vegetables, top view",
};
for (const deal of menu.weeklyDeals) {
  entries.push({
    file: `public/img/deals/${deal.day}.png`,
    w: 512, h: 512,
    prompt: `${DEAL_PROMPT[deal.day]}, ${STYLE}`,
  });
}

mkdirSync(new URL("../public/img/cats", import.meta.url), { recursive: true });
mkdirSync(new URL("../public/img/items", import.meta.url), { recursive: true });
mkdirSync(new URL("../public/img/deals", import.meta.url), { recursive: true });
writeFileSync(new URL("../scripts/image-manifest.json", import.meta.url), JSON.stringify(entries, null, 2));
console.log(`manifest: ${entries.length} images`);
