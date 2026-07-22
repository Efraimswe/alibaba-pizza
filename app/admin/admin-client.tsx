"use client";

import { useState } from "react";
import Image from "next/image";
import type { Menu, Category, Item } from "@/lib/menu";
import { saveMenuAction, logoutAction } from "./actions";

const DAY_ORDER = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"];

async function uploadFile(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Upload mislukt");
  }
  const data = (await res.json()) as { url: string };
  return data.url;
}

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `categorie-${Date.now()}`
  );
}

export function AdminClient({ initialMenu }: { initialMenu: Menu }) {
  const [menu, setMenu] = useState<Menu>(initialMenu);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  async function handleSave() {
    setSaving(true);
    try {
      await saveMenuAction(menu);
      setSavedAt(new Date().toLocaleTimeString("nl-BE"));
    } finally {
      setSaving(false);
    }
  }

  // ---- openingsuren ----
  function setHour(day: string, value: string) {
    setMenu((m) => ({ ...m, openingHours: { ...m.openingHours, [day]: value } }));
  }

  // ---- carousel-foto's ----
  async function addGalleryPhoto(file: File) {
    const url = await uploadFile(file);
    setMenu((m) => ({ ...m, gallery: [...m.gallery, url] }));
  }
  function removeGalleryPhoto(i: number) {
    setMenu((m) => ({ ...m, gallery: m.gallery.filter((_, idx) => idx !== i) }));
  }

  // ---- categorieën ----
  function addCategory() {
    if (!newCategoryName.trim()) return;
    const id = slugify(newCategoryName);
    setMenu((m) => ({
      ...m,
      categories: [...m.categories, { id, name: newCategoryName.trim(), items: [] }],
    }));
    setNewCategoryName("");
  }
  function renameCategory(id: string, name: string) {
    setMenu((m) => ({
      ...m,
      categories: m.categories.map((c) => (c.id === id ? { ...c, name } : c)),
    }));
  }
  function deleteCategory(id: string) {
    if (!confirm("Deze categorie en alle gerechten erin verwijderen?")) return;
    setMenu((m) => ({ ...m, categories: m.categories.filter((c) => c.id !== id) }));
  }
  async function setCategoryImage(id: string, file: File) {
    const url = await uploadFile(file);
    setMenu((m) => ({
      ...m,
      categories: m.categories.map((c) => (c.id === id ? { ...c, image: url } : c)),
    }));
  }

  // ---- gerechten ----
  function addItem(catId: string) {
    setMenu((m) => ({
      ...m,
      categories: m.categories.map((c) =>
        c.id === catId
          ? { ...c, items: [...c.items, { name: "Nieuw gerecht", ingredients: [], price: 0 }] }
          : c,
      ),
    }));
  }
  function updateItem(catId: string, idx: number, patch: Partial<Item>) {
    setMenu((m) => ({
      ...m,
      categories: m.categories.map((c) =>
        c.id === catId
          ? { ...c, items: c.items.map((it, i) => (i === idx ? { ...it, ...patch } : it)) }
          : c,
      ),
    }));
  }
  function deleteItem(catId: string, idx: number) {
    setMenu((m) => ({
      ...m,
      categories: m.categories.map((c) =>
        c.id === catId ? { ...c, items: c.items.filter((_, i) => i !== idx) } : c,
      ),
    }));
  }
  function togglePriceModel(catId: string, idx: number) {
    setMenu((m) => ({
      ...m,
      categories: m.categories.map((c) => {
        if (c.id !== catId) return c;
        return {
          ...c,
          items: c.items.map((it, i) => {
            if (i !== idx) return it;
            if (it.prices) {
              return { name: it.name, ingredients: it.ingredients, price: it.prices.klein };
            }
            const base = it.price ?? 0;
            return { name: it.name, ingredients: it.ingredients, prices: { klein: base, groot: base } };
          }),
        };
      }),
    }));
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24">
      <div className="sticky top-0 z-10 -mx-4 flex items-center justify-between gap-3 bg-bg/95 px-4 py-3 backdrop-blur-sm">
        <h1 className="font-display text-xl font-bold text-ink">Menubeheer</h1>
        <div className="flex items-center gap-3">
          {savedAt && <span className="text-xs text-ink-soft">Opgeslagen om {savedAt}</span>}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="press rounded-xl bg-primary px-4 py-2 font-display font-bold text-on-primary disabled:opacity-60"
          >
            {saving ? "Bezig…" : "Opslaan"}
          </button>
          <button
            type="button"
            onClick={() => logoutAction()}
            className="press text-sm text-ink-soft underline decoration-dotted"
          >
            Uitloggen
          </button>
        </div>
      </div>

      {/* ── Openingsuren ── */}
      <section className="card mt-4 p-5">
        <h2 className="font-display text-lg font-bold text-ink">Openingsuren</h2>
        <div className="mt-3 space-y-2">
          {DAY_ORDER.map((day) => (
            <div key={day} className="flex items-center justify-between gap-3">
              <span className="w-24 shrink-0 capitalize text-ink-soft">{day}</span>
              <input
                type="text"
                value={menu.openingHours[day] ?? ""}
                onChange={(e) => setHour(day, e.target.value)}
                className="card-inset min-w-0 flex-1 rounded-lg px-3 py-1.5 text-ink outline-none"
              />
            </div>
          ))}
          <div className="flex items-center justify-between gap-3 pt-2">
            <span className="w-24 shrink-0 text-ink-soft">Notitie</span>
            <input
              type="text"
              value={menu.openingHours.note ?? ""}
              onChange={(e) => setHour("note", e.target.value)}
              className="card-inset min-w-0 flex-1 rounded-lg px-3 py-1.5 text-ink outline-none"
            />
          </div>
        </div>
      </section>

      {/* ── Categorieën ── */}
      <section className="mt-4">
        <h2 className="px-1 font-display text-lg font-bold text-ink">Categorieën &amp; gerechten</h2>
        <div className="mt-3 space-y-4">
          {menu.categories.map((cat) => (
            <CategoryEditor
              key={cat.id}
              cat={cat}
              onRename={(name) => renameCategory(cat.id, name)}
              onDelete={() => deleteCategory(cat.id)}
              onImage={(file) => setCategoryImage(cat.id, file)}
              onAddItem={() => addItem(cat.id)}
              onUpdateItem={(idx, patch) => updateItem(cat.id, idx, patch)}
              onDeleteItem={(idx) => deleteItem(cat.id, idx)}
              onTogglePriceModel={(idx) => togglePriceModel(cat.id, idx)}
            />
          ))}
        </div>
        <div className="card-inset mt-4 flex items-center gap-2 p-3">
          <input
            type="text"
            placeholder="Naam nieuwe categorie"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="min-w-0 flex-1 rounded-lg bg-transparent px-2 py-1.5 text-ink outline-none"
          />
          <button
            type="button"
            onClick={addCategory}
            className="press shrink-0 rounded-lg bg-secondary px-3 py-1.5 text-sm font-bold text-on-secondary"
          >
            + Categorie
          </button>
        </div>
      </section>

      {/* ── Carousel-foto's ── */}
      <section className="card mt-4 p-5">
        <h2 className="font-display text-lg font-bold text-ink">Carousel-foto&apos;s</h2>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {menu.gallery.map((src, i) => (
            <div key={`${src}-${i}`} className="photo-slot relative aspect-square overflow-hidden">
              <Image src={src} alt="" fill sizes="10rem" className="object-cover" />
              <button
                type="button"
                onClick={() => removeGalleryPhoto(i)}
                aria-label="Verwijderen"
                className="press absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-ink/70 text-xs font-bold text-white"
              >
                ×
              </button>
            </div>
          ))}
          <label className="card-inset flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 text-center text-xs font-medium text-ink-soft">
            + Foto
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void addGalleryPhoto(file);
                e.target.value = "";
              }}
            />
          </label>
        </div>
      </section>
    </div>
  );
}

function CategoryEditor({
  cat,
  onRename,
  onDelete,
  onImage,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onTogglePriceModel,
}: {
  cat: Category;
  onRename: (name: string) => void;
  onDelete: () => void;
  onImage: (file: File) => void;
  onAddItem: () => void;
  onUpdateItem: (idx: number, patch: Partial<Item>) => void;
  onDeleteItem: (idx: number) => void;
  onTogglePriceModel: (idx: number) => void;
}) {
  const imageSrc = cat.image ?? `/img/cats/${cat.id}.webp`;

  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        <label className="photo-slot relative size-16 shrink-0 cursor-pointer overflow-hidden rounded-xl">
          <Image src={imageSrc} alt="" fill sizes="4rem" className="object-cover" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onImage(file);
              e.target.value = "";
            }}
          />
        </label>
        <input
          type="text"
          value={cat.name}
          onChange={(e) => onRename(e.target.value)}
          className="min-w-0 flex-1 rounded-lg bg-transparent px-1 py-1 font-display text-lg font-bold text-ink outline-none"
        />
        <button
          type="button"
          onClick={onDelete}
          className="press shrink-0 text-sm font-medium text-red-600"
        >
          Verwijderen
        </button>
      </div>

      <ul className="mt-4 space-y-3">
        {cat.items.map((item, idx) => (
          <li key={idx} className="card-inset p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={item.name}
                onChange={(e) => onUpdateItem(idx, { name: e.target.value })}
                className="min-w-0 flex-1 rounded-lg bg-transparent px-1 py-1 font-bold text-ink outline-none"
              />
              <button
                type="button"
                onClick={() => onDeleteItem(idx)}
                aria-label="Gerecht verwijderen"
                className="press shrink-0 text-sm font-medium text-red-600"
              >
                ×
              </button>
            </div>
            <input
              type="text"
              defaultValue={item.ingredients.join(", ")}
              placeholder="Ingrediënten, gescheiden door komma"
              onBlur={(e) =>
                onUpdateItem(idx, {
                  ingredients: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              className="mt-2 w-full rounded-lg bg-transparent px-1 py-1 text-sm text-ink-soft outline-none"
            />
            <div className="mt-2 flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                <input
                  type="checkbox"
                  checked={Boolean(item.prices)}
                  onChange={() => onTogglePriceModel(idx)}
                />
                klein/groot
              </label>
              {item.prices ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={item.prices.klein}
                    onChange={(e) =>
                      onUpdateItem(idx, {
                        prices: { ...item.prices!, klein: Number(e.target.value) },
                      })
                    }
                    className="card-inset w-20 rounded-lg px-2 py-1 text-sm outline-none"
                  />
                  <span className="text-ink-soft">/</span>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={item.prices.groot}
                    onChange={(e) =>
                      onUpdateItem(idx, {
                        prices: { ...item.prices!, groot: Number(e.target.value) },
                      })
                    }
                    className="card-inset w-20 rounded-lg px-2 py-1 text-sm outline-none"
                  />
                </div>
              ) : (
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={item.price ?? 0}
                  onChange={(e) => onUpdateItem(idx, { price: Number(e.target.value) })}
                  className="card-inset w-24 rounded-lg px-2 py-1 text-sm outline-none"
                />
              )}
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onAddItem}
        className="press mt-3 rounded-lg bg-surface-gray px-3 py-1.5 text-sm font-bold text-ink"
      >
        + Gerecht
      </button>
    </div>
  );
}
