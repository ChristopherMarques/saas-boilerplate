"use client";

import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from "@/shared/i18n";

/**
 * Hook for language switching with persistence and HTML lang attribute updates.
 */
export function useLocale() {
  const { i18n } = useTranslation();

  const currentLocale = (i18n.language || "en") as SupportedLanguage;

  const setLocale = useCallback(
    (locale: SupportedLanguage) => {
      void i18n.changeLanguage(locale);
      if (typeof document !== "undefined") {
        document.documentElement.lang = locale;
      }
    },
    [i18n],
  );

  const toggleLocale = useCallback(() => {
    const currentIndex = SUPPORTED_LANGUAGES.indexOf(currentLocale);
    const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length;
    setLocale(SUPPORTED_LANGUAGES[nextIndex]);
  }, [currentLocale, setLocale]);

  return {
    locale: currentLocale,
    setLocale,
    toggleLocale,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
}
