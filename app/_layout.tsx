import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import { FavoritesProvider } from '../src/contexts/FavoritesContext';
import { DownloadProvider } from '../src/contexts/DownloadContext';
import { TextSizeProvider } from '../src/contexts/TextSizeContext';
import { ThemeProvider, useTheme } from '../src/contexts/ThemeContext';

function ThemedStack() {
  const { colors } = useTheme();
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.primary,
          headerTitleStyle: { fontWeight: '600', fontSize: 20 },
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'NotoSansSinhala': require('../assets/fonts/NotoSansSinhala-Regular.ttf'),
    'NotoSansSinhala-Bold': require('../assets/fonts/NotoSansSinhala-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <LanguageProvider>
      <ThemeProvider>
        <TextSizeProvider>
          <FavoritesProvider>
            <DownloadProvider>
              <ThemedStack />
            </DownloadProvider>
          </FavoritesProvider>
        </TextSizeProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
