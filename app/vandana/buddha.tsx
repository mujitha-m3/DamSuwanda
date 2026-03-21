import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { useTextSize } from '../../src/contexts/TextSizeContext';
import { useTheme } from '../../src/contexts/ThemeContext';

export const BUDDHA_VANDANA_CATEGORIES = [
  { id: 'udesana', titleSi: 'උදෑසන බුද්ධ වන්දනාව', titleEn: 'Morning Buddha Vandana', icon: '🌅' },
  { id: 'dawal', titleSi: 'දවල් බුද්ධ වන්දනාව', titleEn: 'Afternoon Buddha Vandana', icon: '☀️' },
  { id: 'sawasa', titleSi: 'සවස බුද්ධ වන්දනාව', titleEn: 'Evening Buddha Vandana', icon: '🌇' },
  { id: 'bodhi', titleSi: 'බෝධි පූජාව', titleEn: 'Bodhi Pooja', icon: '🌳' },
  { id: 'sathbudu', titleSi: 'සත්බුදු වන්දනාව', titleEn: 'Sathbudu Vandana', icon: '🛕' },
];

export default function BuddhaVandanaMenuScreen() {
  const router = useRouter();
  const { locale, t } = useLanguage();
  const { scaled } = useTextSize();
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: t('buddha_vandana') }} />
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={styles.content}>
        {BUDDHA_VANDANA_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.subtle }]}
            onPress={() => router.push(`/vandana/buddha/${cat.id}` as any)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconCircle, { backgroundColor: colors.subtle }]}>
              <Text style={{ fontSize: scaled(24) }}>{cat.icon}</Text>
            </View>
            <Text style={[styles.cardTitle, { color: colors.softWhite, fontSize: scaled(16) }]}>
              {locale === 'si' ? cat.titleSi : cat.titleEn}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  card: {
    flexDirection: 'row', alignItems: 'center',
    padding: 16, marginBottom: 16, borderRadius: 16, borderWidth: 1,
    shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4,
  },
  iconCircle: {
    width: 52, height: 52, borderRadius: 26,
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  cardTitle: { fontWeight: '500', flex: 1 },
});
