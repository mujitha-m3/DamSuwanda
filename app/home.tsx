import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useLanguage } from '../src/contexts/LanguageContext';
import { Colors, Typography, Decorations } from '../src/theme';
import { sampleQuotes } from '../src/data/sampleData';

const CATEGORIES = [
  { icon: '🎵', key: 'pirith', route: '/pirith' },
  { icon: '🛕', key: 'buddha_vandana', route: '/vandana/buddha' },
  { icon: '🌸', key: 'devotional_vandana', route: '/vandana/devotional' },
  { icon: '🧘', key: 'meditation', route: '/meditation' },
  { icon: '📖', key: 'meditation_guidance', route: '/meditation/guidance' },
  { icon: '📜', key: 'sajjayana', route: '/sajjayana' },
  { icon: '🎙️', key: 'dharma_sermons', route: '/dharma/sermons' },
  { icon: '💬', key: 'dharma_discussions', route: '/dharma/discussions' },
  { icon: '🌙', key: 'sigithi_lowata', route: '/sigithi-lowata' },
  { icon: '💭', key: 'daily_quote', route: '/daily-quote' },
  { icon: '📅', key: 'poya_calendar', route: '/poya-calendar' },
  { icon: '⬇️', key: 'downloads', route: '/downloads' },
] as const;

export default function HomeScreen() {
  const router = useRouter();
  const { locale, t } = useLanguage();

  const dailyQuote = useMemo(() => {
    const dayIdx = new Date().getDate() % sampleQuotes.length;
    return sampleQuotes[dayIdx];
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: t('app_name'), headerRight: () => (
        <TouchableOpacity onPress={() => router.push('/settings')} style={{ marginRight: 8 }}>
          <Text style={{ fontSize: 24, color: Colors.primaryGold }}>⚙️</Text>
        </TouchableOpacity>
      )}} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Daily Quote Card */}
        <TouchableOpacity
          style={[Decorations.glowCard, styles.quoteCard]}
          onPress={() => router.push('/daily-quote')}
          activeOpacity={0.7}
        >
          <View style={styles.quoteHeader}>
            <Text style={{ fontSize: 16, color: 'rgba(255,215,0,0.7)' }}>💭</Text>
            <Text style={[Typography.bodySmall, { color: Colors.accentGold, marginLeft: 8 }]}>{t('daily_quote')}</Text>
          </View>
          <Text style={[Typography.bodyLarge, styles.quoteText]}>
            {locale === 'si' ? dailyQuote.si : dailyQuote.en}
          </Text>
          {(locale === 'si' ? dailyQuote.srcSi : dailyQuote.srcEn) ? (
            <Text style={[Typography.bodySmall, { color: 'rgba(255,193,7,0.7)', marginTop: 8 }]}>
              — {locale === 'si' ? dailyQuote.srcSi : dailyQuote.srcEn}
            </Text>
          ) : null}
        </TouchableOpacity>

        {/* Category Grid */}
        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[Decorations.goldBorderCard, styles.categoryCard]}
              onPress={() => router.push(cat.route as any)}
              activeOpacity={0.7}
            >
              <View style={styles.iconCircle}>
                <Text style={styles.emoji}>{cat.icon}</Text>
              </View>
              <Text style={styles.cardLabel} numberOfLines={2}>{t(cat.key)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  quoteCard: { padding: 20, marginBottom: 24 },
  quoteHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  quoteText: { fontStyle: 'italic', lineHeight: 27.2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryCard: { width: '31%', aspectRatio: 0.78, alignItems: 'center', justifyContent: 'center', marginBottom: 14, padding: 6 },
  iconCircle: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  emoji: { fontSize: 28 },
  cardLabel: { ...Typography.bodySmall, color: Colors.softWhite, fontWeight: '500', fontSize: 13, textAlign: 'center', marginTop: 10 },
});
