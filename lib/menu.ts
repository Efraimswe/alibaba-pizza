import { put, list } from "@vercel/blob";
import seedData from "@/data/menu.json";

export type Item = {
  name: string;
  ingredients: string[];
  price?: number;
  prices?: { klein: number; groot: number };
};

export type Category = {
  id: string;
  name: string;
  note?: string;
  priceModel?: string;
  image?: string;
  items: Item[];
  extras?: { price: number; options: string[] };
};

export type WeeklyDeal = { day: string; name: string; price: number; note?: string };

export type Menu = {
  restaurant: {
    name: string;
    tagline: string;
    city: string;
    address: string;
    phone: string;
    allergenInfo: string;
  };
  openingHours: Record<string, string>;
  weeklyDeals: WeeklyDeal[];
  categories: Category[];
  sauzen: string[];
  gallery: string[];
};

const MENU_PATHNAME = "menu.json";
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

const GALLERY_SEED = [
  ...[1, 2, 3, 4, 5, 6].map((n) => `/img/gallery/g${n}.jpg`),
  ...[7, 8, 9, 10].map((n) => `/img/gallery/g${n}.png`),
];

function seedMenu(): Menu {
  const base = seedData as unknown as Omit<Menu, "gallery" | "categories"> & {
    categories: Omit<Category, "image">[];
  };
  return {
    ...base,
    categories: base.categories.map((c) => ({ ...c, image: `/img/cats/${c.id}.webp` })),
    gallery: GALLERY_SEED,
  };
}

export async function getMenu(): Promise<Menu> {
  const { blobs } = await list({ prefix: MENU_PATHNAME, token: TOKEN });
  const existing = blobs.find((b) => b.pathname === MENU_PATHNAME);

  if (existing) {
    const res = await fetch(existing.url, { cache: "no-store" });
    if (res.ok) return (await res.json()) as Menu;
  }

  // Nog geen menu.json in Blob — eenmalig seeden vanuit de gebundelde data.
  const menu = seedMenu();
  await put(MENU_PATHNAME, JSON.stringify(menu, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    token: TOKEN,
  });
  return menu;
}

export async function saveMenu(menu: Menu): Promise<void> {
  const backupName = `backups/menu-${new Date().toISOString()}.json`;
  await put(backupName, JSON.stringify(menu, null, 2), {
    access: "public",
    addRandomSuffix: false,
    token: TOKEN,
  });
  await put(MENU_PATHNAME, JSON.stringify(menu, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    token: TOKEN,
  });
}
