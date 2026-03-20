import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useLanguage } from '../src/contexts/LanguageContext';
import { Colors, Typography, Decorations } from '../src/theme';
import { sampleQuotes } from '../src/data/sampleData';

export default function DailyQuoteScreen() {
  const { locale, t } = useLanguage();

  const quote = useMemo(() => {
    const dayIdx = new Date().getDate() % sampleQuotes.length;
    return sampleQuotes[dayIdx];
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: t('daily_quote') }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.iconCircle}><Text style={{ fontSize: 48 }}>💭</Text></View>
        <View style={[Decorations.glowCard, styles.quoteCard]}>
          <Text style={[Typography.bodyLarge, { fontStyle: 'italic', lineHeight: 30, textAlign: 'center' }]}>
            {locale === 'si' ? quote.si : quote.en}
          </Text>
          <Text style={[Typography.bodySmall, { color: Colors.accentGold, marginTop: 16, textAlign: 'center' }]}>
            — {locale === 'si' ? quote.srcSi : quote.srcEn}
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24, alignItems: 'center', justifyContent: 'center', minHeight: '100%' },
  iconCircle: { marginBottom: 32 },
  quoteCard: { padding: 32, width: '100%' },
});
