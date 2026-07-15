// Строит манифест генерации фото: файл → промпт, из data/menu.json.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const menu = JSON.parse(readFileSync(new URL("../data/menu.json", import.meta.url), "utf8"));

const STYLE =
  "professional food photography, ultra appetizing, juicy, glistening, mouth-watering close-up, rich vibrant colors, studio lighting, centered, isolated on pure white background, no props, no text, no watermark";

const entries = [];

// Категории
const CAT_PROMPT = {
  pizzas: "one whole rustic wood-fired pizza with bubbling melted mozzarella and fresh basil, golden charred crust, top view",
  calzone: "one golden folded calzone pizza",
  lookbrood: "one baked garlic bread loaf with herbs, golden crust",
  snacks: "one big juicy flame-grilled cheeseburger, double melted cheddar dripping, glossy sesame brioche bun, fresh lettuce and tomato, side view",
  broodjes: "one overstuffed turkish pita bread sandwich with doner kebab meat, crisp vegetables and garlic sauce dripping, side view",
  durum: "one grilled durum wrap cut in half showing generous doner filling with fresh vegetables, char marks on tortilla",
  kapsalon: "one kapsalon in foil tray, fries topped with doner meat, melted cheese, salad, top view",
  lasagna: "one portion of homemade lasagna with melted cheese on a plate",
  salades: "one fresh mixed salad bowl, top view",
  schotels: "one large turkish grill platter with doner meat, fries and vegetables, top view",
  bakjes: "one tray of golden belgian fries with mayonnaise",
  dranken: "three cold drink cans standing together: one silver-blue energy drink can, one red cola can, one orange soda can, condensation drops, side view",
  dessert: "one glass of classic tiramisu dessert with cocoa dusting",
};

for (const cat of menu.categories) {
  entries.push({
    file: `public/img/cats/${cat.id}.png`,
    w: 512, h: 512,
    prompt: `${CAT_PROMPT[cat.id]}, ${STYLE}`,
  });
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
mkdirSync(new URL("../public/img/deals", import.meta.url), { recursive: true });
writeFileSync(new URL("../scripts/image-manifest.json", import.meta.url), JSON.stringify(entries, null, 2));
console.log(`manifest: ${entries.length} images`);
