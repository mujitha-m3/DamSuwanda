import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'app_theme';

export type ThemeKey = 'gold' | 'blue' | 'green' | 'purple' | 'saffron';

export interface ThemeColors {
  background: string;
  surface: string;
  cardBackground: string;
  primary: string;
  accent: string;
  softWhite: string;
  divider: string;
  subtle: string;
  highlight: string;
}

const THEMES: Record<ThemeKey, { label: string; labelSi: string; emoji: string; colors: ThemeColors }> = {
  gold: {
    label: 'Classic Gold', labelSi: 'සම්භාව්‍ය රන්', emoji: '🪷',
    colors: {
      background: '#000000', surface: '#111111', cardBackground: '#1A1A1A',
      primary: '#FFD700', accent: '#FFC107', softWhite: '#F5F5F5',
      divider: '#333333', subtle: 'rgba(255,215,0,0.2)', highlight: 'rgba(255,215,0,0.33)',
    },
  },
  blue: {
    label: 'Ocean Blue', labelSi: 'සාගර නිල්', emoji: '🌊',
    colors: {
      background: '#0A0E1A', surface: '#111827', cardBackground: '#1A2332',
      primary: '#60A5FA', accent: '#38BDF8', softWhite: '#E2E8F0',
      divider: '#2D3748', subtle: 'rgba(96,165,250,0.2)', highlight: 'rgba(96,165,250,0.33)',
    },
  },
  green: {
    label: 'Forest Green', labelSi: 'වන හරිත', emoji: '🌿',
    colors: {
      background: '#0A1410', surface: '#111F18', cardBackground: '#1A2E22',
      primary: '#4ADE80', accent: '#34D399', softWhite: '#E2F0E8',
      divider: '#2D4A38', subtle: 'rgba(74,222,128,0.2)', highlight: 'rgba(74,222,128,0.33)',
    },
  },
  purple: {
    label: 'Lotus Purple', labelSi: 'නෙළුම් දම්', emoji: '💜',
    colors: {
      background: '#0E0A1A', surface: '#16112B', cardBackground: '#1E1833',
      primary: '#C084FC', accent: '#A78BFA', softWhite: '#EDE9FE',
      divider: '#362E5A', subtle: 'rgba(192,132,252,0.2)', highlight: 'rgba(192,132,252,0.33)',
    },
  },
  saffron: {
    label: 'Saffron Robe', labelSi: 'කසාවත', emoji: '🧡',
    colors: {
      background: '#120C06', surface: '#1A1008', cardBackground: '#251A0E',
      primary: '#F59E0B', accent: '#FB923C', softWhite: '#FFF1E0',
      divider: '#3D2E1A', subtle: 'rgba(245,158,11,0.2)', highlight: 'rgba(245,158,11,0.33)',
    },
  },
};

interface ThemeContextType {
  themeKey: ThemeKey;
  colors: ThemeColors;
  setThemeKey: (key: ThemeKey) => Promise<void>;
  allThemes: typeof THEMES;
}

const ThemeContext = createContext<ThemeContextType>({
  themeKey: 'gold',
  colors: THEMES.gold.colors,
  setThemeKey: async () => { },
  allThemes: THEMES,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeKey, setThemeKeyState] = useState<ThemeKey>('gold');

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved && saved in THEMES) setThemeKeyState(saved as ThemeKey);
      } catch { }
    })();
  }, []);

  const setThemeKey = useCallback(async (key: ThemeKey) => {
    setThemeKeyState(key);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, key);
    } catch { }
  }, []);

  return (
    <ThemeContext.Provider value={{ themeKey, colors: THEMES[themeKey].colors, setThemeKey, allThemes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
