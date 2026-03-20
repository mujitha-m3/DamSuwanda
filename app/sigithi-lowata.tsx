import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useLanguage } from '../src/contexts/LanguageContext';
import { Colors, Typography, Decorations } from '../src/theme';

export default function SigithiLowataScreen() {
  const { t, isSinhala } = useLanguage();

  return (
    <>
      <Stack.Screen options={{ title: t('sigithi_lowata') }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={[Decorations.glowCard, styles.headerCard]}>
          <Text style={styles.icon}>🌙</Text>
          <Text style={Typography.headingMedium}>{t('sigithi_lowata')}</Text>
          <Text style={[Typography.bodyMedium, { marginTop: 8, textAlign: 'center' }]}>
            {isSinhala
              ? 'ළමුන් සඳහා බුද්ධ ධර්මය සරල ලෙස ඉදිරිපත් කරයි.'
              : 'Buddhist teachings presented in a simple way for children.'}
          </Text>
        </View>

        <View style={[Decorations.goldBorderCard, styles.card]}>
          <Text style={Typography.bodyLarge}>
            {isSinhala ? 'අන්තර්ගතය ඉක්මනින් එකතු වේ...' : 'Content coming soon...'}
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  headerCard: { padding: 24, alignItems: 'center', marginBottom: 16 },
  icon: { fontSize: 48, marginBottom: 12 },
  card: { padding: 20 },
});
