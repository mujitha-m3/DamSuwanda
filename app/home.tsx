import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useLanguage } from '../src/contexts/LanguageContext';
import { useTextSize } from '../src/contexts/TextSizeContext';
import { useTheme } from '../src/contexts/ThemeContext';
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
  const { scaled } = useTextSize();
  const { colors } = useTheme();

  const dailyQuote = useMemo(() => {
    const dayIdx = new Date().getDate() % sampleQuotes.length;
    return sampleQuotes[dayIdx];
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: t('app_name'), headerRight: () => (
        <TouchableOpacity onPress={() => router.push('/settings')} style={{ marginRight: 8 }}>
          <Text style={{ fontSize: 24, color: colors.primary }}>⚙️</Text>
        </TouchableOpacity>
      )}} />
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={styles.content}>
        {/* Daily Quote Card */}
        <TouchableOpacity
          style={[styles.quoteCard, {
            backgroundColor: colors.cardBackground, borderColor: colors.subtle,
            shadowColor: colors.primary,
          }]}
          onPress={() => router.push('/daily-quote')}
          activeOpacity={0.7}
        >
          <View style={styles.quoteHeader}>
            <Text style={{ fontSize: scaled(16), color: `${colors.primary}B3` }}>💭</Text>
            <Text style={{ color: colors.accent, marginLeft: 8, fontSize: scaled(13) }}>{t('daily_quote')}</Text>
          </View>
          <Text style={[styles.quoteText, { color: colors.softWhite, fontSize: scaled(16), lineHeight: scaled(26) }]}>
            {locale === 'si' ? dailyQuote.si : dailyQuote.en}
          </Text>
          {(locale === 'si' ? dailyQuote.srcSi : dailyQuote.srcEn) ? (
            <Text style={{ color: `${colors.accent}B3`, marginTop: 8, fontSize: scaled(12) }}>
              — {locale === 'si' ? dailyQuote.srcSi : dailyQuote.srcEn}
            </Text>
          ) : null}
        </TouchableOpacity>

        {/* Category Grid */}
        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[styles.categoryCard, { backgroundColor: colors.cardBackground, borderColor: colors.subtle }]}
              onPress={() => router.push(cat.route as any)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: colors.subtle }]}>
                <Text style={{ fontSize: scaled(28) }}>{cat.icon}</Text>
              </View>
              <Text style={[styles.cardLabel, { color: colors.softWhite, fontSize: scaled(13) }]} numberOfLines={2}>{t(cat.key)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  quoteCard: {
    padding: 20, marginBottom: 24, borderRadius: 16, borderWidth: 1,
    shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.08, shadowRadius: 20, elevation: 4,
  },
  quoteHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  quoteText: { fontStyle: 'italic' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  categoryCard: {
    width: '31%', aspectRatio: 0.78, alignItems: 'center', justifyContent: 'center',
    marginBottom: 14, padding: 6, borderRadius: 16, borderWidth: 1,
  },
  iconCircle: {
    width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center',
  },
  cardLabel: { fontWeight: '500', textAlign: 'center', marginTop: 10, fontSize: 12 },
});
