import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t as translate } from '../localization';

const STORAGE_KEY = 'selected_language';

interface LanguageContextType {
  locale: string;
  isSinhala: boolean;
  isLoaded: boolean;
  setLocale: (locale: string) => Promise<void>;
  t: (key: string) => string;
  hasSelectedLanguage: () => Promise<boolean>;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  isSinhala: false,
  isLoaded: false,
  setLocale: async () => {},
  t: (key) => key,
  hasSelectedLanguage: async () => false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState('en');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setLocaleState(saved);
      } catch {}
      setIsLoaded(true);
    })();
  }, []);

  const setLocale = useCallback(async (newLocale: string) => {
    setLocaleState(newLocale);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, newLocale);
    } catch {}
  }, []);

  const hasSelectedLanguage = useCallback(async () => {
    try {
      const val = await AsyncStorage.getItem(STORAGE_KEY);
      return val !== null;
    } catch {
      return false;
    }
  }, []);

  const t = useCallback(
    (key: string) => translate(key, locale),
    [locale]
  );

  return (
    <LanguageContext.Provider
      value={{ locale, isSinhala: locale === 'si', isLoaded, setLocale, t, hasSelectedLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
