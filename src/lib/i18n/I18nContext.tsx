'use client';

// Dil secimi icin basit context - i18n kutuphanesi yok, elle yaptik
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, translations, TranslationKey } from './translations';

type I18nContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('tr');

  // localStorage'dan dil tercihini oku
  useEffect(() => {
    const saved = localStorage.getItem('envanter-locale') as Locale | null;
    if (saved === 'tr' || saved === 'en') setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('envanter-locale', l);
  };

  const t = (key: TranslationKey) => translations[locale][key];

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
