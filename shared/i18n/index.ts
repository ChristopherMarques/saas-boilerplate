import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { en } from "./locales/en";
import { ptBR } from "./locales/pt-BR";

export const SUPPORTED_LANGUAGES = ["en", "pt-BR"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_LABELS: Record<SupportedLanguage, string> = {
  en: "English",
  "pt-BR": "Português (BR)",
};

export const resources = {
  en: { translation: en },
  "pt-BR": { translation: ptBR },
} as const;

let initialized = false;

/**
 * Initialize i18next once per application instance.
 * English is the default and fallback language.
 */
export function initI18n(lng?: SupportedLanguage): typeof i18n {
  if (initialized) {
    if (lng && i18n.language !== lng) void i18n.changeLanguage(lng);
    return i18n;
  }
  initialized = true;

  void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng,
      fallbackLng: "en",
      supportedLngs: SUPPORTED_LANGUAGES as unknown as string[],
      load: "currentOnly",
      interpolation: { escapeValue: false },
      detection: {
        order: ["querystring", "localStorage", "navigator"],
        lookupQuerystring: "lng",
        lookupLocalStorage: "app.lng",
        caches: ["localStorage"],
      },
      react: { useSuspense: false },
    });

  return i18n;
}

export default i18n;
