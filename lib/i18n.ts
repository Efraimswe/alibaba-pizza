export type Locale = "nl" | "en" | "fr";

export type AllergenKey =
  | "gluten"
  | "crustaceans"
  | "eggs"
  | "fish"
  | "peanuts"
  | "soy"
  | "milk"
  | "nuts"
  | "celery"
  | "mustard"
  | "sesame"
  | "sulphites"
  | "lupin"
  | "molluscs";

export type DayKey =
  | "maandag"
  | "dinsdag"
  | "woensdag"
  | "donderdag"
  | "vrijdag"
  | "zaterdag"
  | "zondag";

export type Dict = {
  languageLabel: string;
  ticker: { openToday: string; call: string };
  heroTag: string;
  heroDescription: string;
  callNowCta: string;
  menuCta: string;
  menuHeading: string;
  menuSummary: (categories: number, dishes: number) => string;
  itemsFromPrefix: string;
  sizeLabel: string;
  extrasLabel: string;
  weeklyHeading: string;
  dealNameByDay: Record<string, string>;
  weeklyExceptWord: string;
  andWord: string;
  hereNowHeading: string;
  openingHoursLabel: string;
  days: Record<DayKey, string>;
  dayAbbrev: Record<DayKey, string>;
  openHolidaysNote: string;
  mapLabel: string;
  distanceSuffix: string;
  geolocationNote: string;
  distanceLabelShow: string;
  distanceLoading: string;
  distanceError: string;
  distanceSuffixKm: string;
  distanceSuffixM: string;
  phoneCtaPrefix: string;
  allergensLabel: string;
  allergensIntro: string;
  allergensNote: string;
  allergensHeading: string;
  allergensEuNote: string;
  allergens: Record<AllergenKey, string>;
  allergensCta: string;
  footer: { privacy: string; cookies: string };
};

const nl: Dict = {
  languageLabel: "Taal",
  ticker: { openToday: "OPEN VANDAAG", call: "BEL" },
  heroTag: "PIZZA · PITA · GRILL",
  heroDescription:
    "Verse pizza's, pitta, durum en schotels — om af te halen in Lichtaart.",
  callNowCta: "BEL NU",
  menuCta: "MENU ↓",
  menuHeading: "Menu",
  menuSummary: (categories, dishes) => `${categories} categorieën, ${dishes} gerechten`,
  itemsFromPrefix: "items · vanaf €",
  sizeLabel: "KLEIN / GROOT",
  extrasLabel: "Extra's",
  weeklyHeading: "Elke week",
  dealNameByDay: {
    dinsdag: "Kapsalondag",
    woensdag: "Pizzadag",
    donderdag: "Schoteldag",
  },
  weeklyExceptWord: "m.u.v.",
  andWord: "en",
  hereNowHeading: "Hier & nu",
  openingHoursLabel: "OPENINGSUREN",
  days: {
    maandag: "maandag",
    dinsdag: "dinsdag",
    woensdag: "woensdag",
    donderdag: "donderdag",
    vrijdag: "vrijdag",
    zaterdag: "zaterdag",
    zondag: "zondag",
  },
  dayAbbrev: {
    maandag: "MA",
    dinsdag: "DI",
    woensdag: "WO",
    donderdag: "DO",
    vrijdag: "VR",
    zaterdag: "ZA",
    zondag: "ZO",
  },
  openHolidaysNote: "We zijn open op feestdagen",
  mapLabel: "KAART",
  distanceSuffix: "m van jou",
  geolocationNote: "(geolocatie volgt)",
  distanceLabelShow: "Toon afstand",
  distanceLoading: "Bepalen…",
  distanceError: "Locatie niet beschikbaar",
  distanceSuffixKm: "km van jou",
  distanceSuffixM: "m van jou",
  phoneCtaPrefix: "BEL & BESTEL",
  allergensLabel: "Allergenen:",
  allergensIntro: "Voor allergenen kunt u zich steeds wenden tot onze medewerkers.",
  allergensNote: "Volledige allergenenlijst per gerecht volgt op deze pagina.",
  allergensHeading: "Allergenen",
  allergensEuNote:
    "Volgens EU-verordening 1169/2011 melden wij welke van de 14 wettelijk erkende allergenen kunnen voorkomen in onze gerechten:",
  allergens: {
    gluten: "gluten",
    crustaceans: "schaaldieren",
    eggs: "eieren",
    fish: "vis",
    peanuts: "pinda's",
    soy: "soja",
    milk: "melk",
    nuts: "noten",
    celery: "selderij",
    mustard: "mosterd",
    sesame: "sesamzaad",
    sulphites: "sulfieten",
    lupin: "lupine",
    molluscs: "weekdieren",
  },
  allergensCta: "Twijfelt u? Vraag het gerust aan ons personeel, of bel ons:",
  footer: { privacy: "Privacy", cookies: "Cookies" },
};

const en: Dict = {
  languageLabel: "Language",
  ticker: { openToday: "OPEN TODAY", call: "CALL" },
  heroTag: "PIZZA · PITA · GRILL",
  heroDescription:
    "Fresh pizzas, pitta, durum and platters — to pick up in Lichtaart.",
  callNowCta: "CALL NOW",
  menuCta: "MENU ↓",
  menuHeading: "Menu",
  menuSummary: (categories, dishes) => `${categories} categories, ${dishes} dishes`,
  itemsFromPrefix: "items · from €",
  sizeLabel: "SMALL / LARGE",
  extrasLabel: "Extras",
  weeklyHeading: "Every week",
  dealNameByDay: {
    dinsdag: "Kapsalon day",
    woensdag: "Pizza day",
    donderdag: "Platter day",
  },
  weeklyExceptWord: "except",
  andWord: "and",
  hereNowHeading: "Here & now",
  openingHoursLabel: "OPENING HOURS",
  days: {
    maandag: "Monday",
    dinsdag: "Tuesday",
    woensdag: "Wednesday",
    donderdag: "Thursday",
    vrijdag: "Friday",
    zaterdag: "Saturday",
    zondag: "Sunday",
  },
  dayAbbrev: {
    maandag: "MO",
    dinsdag: "TU",
    woensdag: "WE",
    donderdag: "TH",
    vrijdag: "FR",
    zaterdag: "SA",
    zondag: "SU",
  },
  openHolidaysNote: "We are open on public holidays",
  mapLabel: "MAP",
  distanceSuffix: "m from you",
  geolocationNote: "(geolocation coming soon)",
  distanceLabelShow: "Show distance",
  distanceLoading: "Locating…",
  distanceError: "Location unavailable",
  distanceSuffixKm: "km from you",
  distanceSuffixM: "m from you",
  phoneCtaPrefix: "CALL & ORDER",
  allergensLabel: "Allergens:",
  allergensIntro: "For allergens, please ask our staff.",
  allergensNote: "Full allergen list per dish is coming soon on this page.",
  allergensHeading: "Allergens",
  allergensEuNote:
    "Under EU Regulation 1169/2011, we disclose which of the 14 legally recognised allergens may be present in our dishes:",
  allergens: {
    gluten: "gluten",
    crustaceans: "crustaceans",
    eggs: "eggs",
    fish: "fish",
    peanuts: "peanuts",
    soy: "soybeans",
    milk: "milk",
    nuts: "nuts",
    celery: "celery",
    mustard: "mustard",
    sesame: "sesame seeds",
    sulphites: "sulphites",
    lupin: "lupin",
    molluscs: "molluscs",
  },
  allergensCta: "Not sure? Just ask our staff, or give us a call:",
  footer: { privacy: "Privacy", cookies: "Cookies" },
};

const fr: Dict = {
  languageLabel: "Langue",
  ticker: { openToday: "OUVERT AUJOURD'HUI", call: "APPELEZ" },
  heroTag: "PIZZA · PITA · GRILL",
  heroDescription:
    "Pizzas, pitta, durum et plats fraîchement préparés — à emporter à Lichtaart.",
  callNowCta: "APPELEZ",
  menuCta: "MENU ↓",
  menuHeading: "Menu",
  menuSummary: (categories, dishes) => `${categories} catégories, ${dishes} plats`,
  itemsFromPrefix: "articles · à partir de €",
  sizeLabel: "PETIT / GRAND",
  extrasLabel: "Suppléments",
  weeklyHeading: "Chaque semaine",
  dealNameByDay: {
    dinsdag: "Jour Kapsalon",
    woensdag: "Jour pizza",
    donderdag: "Jour plat",
  },
  weeklyExceptWord: "sauf",
  andWord: "et",
  hereNowHeading: "Ici & maintenant",
  openingHoursLabel: "HEURES D'OUVERTURE",
  days: {
    maandag: "lundi",
    dinsdag: "mardi",
    woensdag: "mercredi",
    donderdag: "jeudi",
    vrijdag: "vendredi",
    zaterdag: "samedi",
    zondag: "dimanche",
  },
  dayAbbrev: {
    maandag: "LU",
    dinsdag: "MA",
    woensdag: "ME",
    donderdag: "JE",
    vrijdag: "VE",
    zaterdag: "SA",
    zondag: "DI",
  },
  openHolidaysNote: "Nous sommes ouverts les jours fériés",
  mapLabel: "CARTE",
  distanceSuffix: "m de vous",
  geolocationNote: "(géolocalisation à venir)",
  distanceLabelShow: "Afficher la distance",
  distanceLoading: "Localisation…",
  distanceError: "Position indisponible",
  distanceSuffixKm: "km de vous",
  distanceSuffixM: "m de vous",
  phoneCtaPrefix: "APPELEZ & COMMANDEZ",
  allergensLabel: "Allergènes :",
  allergensIntro: "Pour les allergènes, adressez-vous toujours à notre personnel.",
  allergensNote: "La liste complète des allergènes par plat arrivera bientôt sur cette page.",
  allergensHeading: "Allergènes",
  allergensEuNote:
    "Conformément au règlement UE 1169/2011, nous indiquons lesquels des 14 allergènes reconnus par la loi peuvent être présents dans nos plats :",
  allergens: {
    gluten: "gluten",
    crustaceans: "crustacés",
    eggs: "œufs",
    fish: "poisson",
    peanuts: "arachides",
    soy: "soja",
    milk: "lait",
    nuts: "fruits à coque",
    celery: "céleri",
    mustard: "moutarde",
    sesame: "graines de sésame",
    sulphites: "sulfites",
    lupin: "lupin",
    molluscs: "mollusques",
  },
  allergensCta: "Un doute ? Demandez à notre personnel, ou appelez-nous :",
  footer: { privacy: "Confidentialité", cookies: "Cookies" },
};

export const dictionaries: Record<Locale, Dict> = { nl, en, fr };
