import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies",
  robots: { index: false },
};

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="font-display text-2xl font-bold">Cookies</h1>

      <div className="card mt-6 space-y-4 p-6 text-sm">
        <p>
          Deze website gebruikt geen cookies en geen tracking. Daarom tonen
          wij ook geen cookiebanner — die is wettelijk enkel verplicht als er
          cookies of vergelijkbare trackingtechnieken worden gebruikt.
        </p>
        <p className="text-ink-soft">
          Er worden geen analytische, functionele of marketingcookies
          geplaatst, en er wordt geen gedrag van bezoekers gevolgd.
        </p>
        <p className="text-ink-soft">
          Meer informatie over de gegevens die wel (lokaal) verwerkt worden,
          vindt u in ons{" "}
          <a href="/privacy" className="font-bold underline decoration-dotted">
            privacybeleid
          </a>
          .
        </p>
      </div>

      <a
        href="/"
        className="press mt-8 inline-flex items-center justify-center rounded-full bg-surface-alt px-5 py-3 font-display text-sm font-bold"
      >
        ← Terug
      </a>
    </main>
  );
}
