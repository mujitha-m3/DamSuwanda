import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { LanguageProvider } from '../src/contexts/LanguageContext';
import { FavoritesProvider } from '../src/contexts/FavoritesContext';
import { DownloadProvider } from '../src/contexts/DownloadContext';
import { Colors } from '../src/theme';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'NotoSansSinhala': require('../assets/fonts/NotoSansSinhala-Regular.ttf'),
    'NotoSansSinhala-Bold': require('../assets/fonts/NotoSansSinhala-Bold.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <LanguageProvider>
      <FavoritesProvider>
        <DownloadProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: Colors.background },
              headerTintColor: Colors.primaryGold,
              headerTitleStyle: { fontWeight: '600', fontSize: 20 },
              contentStyle: { backgroundColor: Colors.background },
              animation: 'slide_from_right',
            }}
          />
        </DownloadProvider>
      </FavoritesProvider>
    </LanguageProvider>
  );
}
