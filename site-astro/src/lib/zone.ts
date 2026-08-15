export type Zone = "occident" | "africa";
export type Lang = "fr" | "en";

export type ZoneLang = {
  zone: Zone;
  lang: Lang;
};

/**
 * Resoudre la zone et la langue depuis l'URL.
 *   /             -> occident fr
 *   /en           -> occident en
 *   /africa       -> africa fr
 *   /africa/en    -> africa en
 */
export function resolveZoneLang(pathname: string): ZoneLang {
  const segments = pathname.replace(/^\/|\/$/g, "").split("/").filter(Boolean);

  const isAfrica = segments[0] === "africa";
  const langSegment = isAfrica ? segments[1] : segments[0];
  const lang: Lang = langSegment === "en" ? "en" : "fr";

  return {
    zone: isAfrica ? "africa" : "occident",
    lang,
  };
}

/**
 * Construit l'URL d'une zone et langue cible.
 * Sert au ZoneSwitcher et au LangSwitcher pour basculer.
 */
export function buildUrl(zone: Zone, lang: Lang, rest = ""): string {
  const tail = rest.replace(/^\//, "");
  if (zone === "occident") {
    return lang === "fr" ? `/${tail}` : `/en/${tail}`;
  }
  return lang === "fr" ? `/africa/${tail}` : `/africa/en/${tail}`;
}

export const ZONES: Zone[] = ["occident", "africa"];
export const LANGS: Lang[] = ["fr", "en"];

export const ZONE_LABEL: Record<Zone, Record<Lang, string>> = {
  occident: { fr: "Occident", en: "Occident" },
  africa: { fr: "Afrique", en: "Africa" },
};

export const LANG_LABEL: Record<Lang, string> = {
  fr: "FR",
  en: "EN",
};
