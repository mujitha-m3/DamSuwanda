import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'text_size_scale';

export type TextSizeLabel = 'small' | 'medium' | 'large' | 'xlarge';

const SCALE_MAP: Record<TextSizeLabel, number> = {
  small: 0.85,
  medium: 1.0,
  large: 1.2,
  xlarge: 1.5,
};

interface TextSizeContextType {
  scale: number;
  sizeLabel: TextSizeLabel;
  setSizeLabel: (label: TextSizeLabel) => Promise<void>;
  scaled: (fontSize: number) => number;
}

const TextSizeContext = createContext<TextSizeContextType>({
  scale: 1.0,
  sizeLabel: 'medium',
  setSizeLabel: async () => { },
  scaled: (s) => s,
});

export function TextSizeProvider({ children }: { children: React.ReactNode }) {
  const [sizeLabel, setSizeLabelState] = useState<TextSizeLabel>('medium');

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved && saved in SCALE_MAP) setSizeLabelState(saved as TextSizeLabel);
      } catch { }
    })();
  }, []);

  const setSizeLabel = useCallback(async (label: TextSizeLabel) => {
    setSizeLabelState(label);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, label);
    } catch { }
  }, []);

  const scale = SCALE_MAP[sizeLabel];
  const scaled = useCallback((fontSize: number) => Math.round(fontSize * scale), [scale]);

  return (
    <TextSizeContext.Provider value={{ scale, sizeLabel, setSizeLabel, scaled }}>
      {children}
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  return useContext(TextSizeContext);
}
