import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacybeleid",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="font-display text-2xl font-bold">Privacybeleid</h1>

      <div className="card mt-6 space-y-4 p-6 text-sm">
        <p>
          Deze website gebruikt geen cookies en geen tracking. Er worden geen
          gegevens over u verzameld, opgeslagen of doorgestuurd naar derden.
        </p>

        <div>
          <h2 className="font-display font-bold">Welke gegevens?</h2>
          <p className="mt-1 text-ink-soft">
            Als u op de knop &ldquo;Toon afstand&rdquo; klikt, vraagt uw
            browser uw locatie op. Deze locatie wordt uitsluitend lokaal in uw
            browser gebruikt om de afstand tot onze zaak te berekenen — ze
            wordt nooit naar onze server of naar derden verstuurd en nergens
            opgeslagen.
          </p>
        </div>

        <div>
          <h2 className="font-display font-bold">Hosting</h2>
          <p className="mt-1 text-ink-soft">
            Deze website wordt gehost bij Vercel Inc. Zoals bij elke website
            worden technische serverlogs (bv. IP-adres, tijdstip van bezoek)
            kortstondig bijgehouden voor beveiliging en foutopsporing. Deze
            logs worden niet gebruikt voor profilering of marketing.
          </p>
        </div>

        <div>
          <h2 className="font-display font-bold">Uw rechten (AVG/GDPR)</h2>
          <p className="mt-1 text-ink-soft">
            U heeft steeds recht op inzage, correctie en verwijdering van
            persoonsgegevens die op u betrekking hebben. Aangezien wij geen
            persoonsgegevens verzamelen of bewaren, is er in de praktijk
            niets om in te zien, te corrigeren of te verwijderen. Heeft u
            hierover toch een vraag, neem dan contact met ons op.
          </p>
        </div>

        <div>
          <h2 className="font-display font-bold">Contact</h2>
          <p className="mt-1 text-ink-soft">
            Alibaba Kebab, Leistraat 84, 2460 Lichtaart —{" "}
            <a
              href="tel:+3214414047"
              className="font-bold underline decoration-dotted"
            >
              014 / 41 40 47
            </a>
          </p>
        </div>
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
