import type { Zone, Lang } from "@lib/zone";

/**
 * Traductions centralisees, indexees par cle, zone, langue.
 * En V1, on n'a que les chaines de chrome (nav, footer, switchers).
 * Le contenu eDitorial (8 sections) viendra en phase Copy.
 */

type Dict = Record<string, Record<Zone, Record<Lang, string>>>;

export const t: Dict = {
  "nav.about": {
    occident: { fr: "À propos", en: "About" },
    africa: { fr: "À propos", en: "About" },
  },
  "nav.expertises": {
    occident: { fr: "Nos expertises", en: "Our expertise" },
    africa: { fr: "Nos expertises", en: "Our expertise" },
  },
  "nav.implantations": {
    occident: { fr: "Nos implantations", en: "Locations" },
    africa: { fr: "Nos implantations", en: "Locations" },
  },
  "nav.references": {
    occident: { fr: "Nos références", en: "Cases" },
    africa: { fr: "Nos références", en: "Cases" },
  },
  "nav.partners": {
    occident: { fr: "Nos partenaires", en: "Partners" },
    africa: { fr: "Nos partenaires", en: "Partners" },
  },
  "nav.insights": {
    occident: { fr: "Insights", en: "Insights" },
    africa: { fr: "Insights", en: "Insights" },
  },
  "nav.contact": {
    occident: { fr: "Contact", en: "Contact" },
    africa: { fr: "Contact", en: "Contact" },
  },
  "switcher.zone": {
    occident: { fr: "Zone", en: "Region" },
    africa: { fr: "Zone", en: "Region" },
  },
  "switcher.lang": {
    occident: { fr: "Langue", en: "Language" },
    africa: { fr: "Langue", en: "Language" },
  },
  "home.placeholder.title": {
    occident: {
      fr: "ARMD - Souveraineté de l'information",
      en: "ARMD - Sovereignty of information",
    },
    africa: {
      fr: "ARMD - L'intelligence depuis l'Afrique",
      en: "ARMD - Intelligence from Africa",
    },
  },
  "home.placeholder.body": {
    occident: {
      fr: "Placeholder zone Occident. La DA et la copy arrivent en phase 1 (avant le 2 juin).",
      en: "Placeholder for the Occident zone. Design and copy land in phase 1 (before June 2).",
    },
    africa: {
      fr: "Placeholder zone Afrique. La DA et la copy arrivent en phase 1 (avant le 2 juin).",
      en: "Placeholder for the Africa zone. Design and copy land in phase 1 (before June 2).",
    },
  },
};

export function tr(key: string, zone: Zone, lang: Lang): string {
  return t[key]?.[zone]?.[lang] ?? key;
}
