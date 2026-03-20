import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useLanguage } from '../src/contexts/LanguageContext';
import { Colors, Typography, Decorations } from '../src/theme';
import { samplePoyaDays } from '../src/data/sampleData';

export default function PoyaCalendarScreen() {
  const { locale, t } = useLanguage();

  const now = new Date();
  const upcoming = samplePoyaDays.find((p) => new Date(p.date) >= now);

  return (
    <>
      <Stack.Screen options={{ title: t('poya_calendar') }} />
      <FlatList
        style={{ flex: 1, backgroundColor: Colors.background }}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          upcoming ? (
            <View style={[Decorations.glowCard, styles.upcomingCard]}>
              <Text style={[Typography.bodySmall, { color: Colors.accentGold }]}>{t('upcoming_poya')}</Text>
              <Text style={[Typography.headingMedium, { marginTop: 8 }]}>
                {locale === 'si' ? upcoming.nameSi : upcoming.nameEn}
              </Text>
              <Text style={[Typography.bodyMedium, { marginTop: 4 }]}>
                {new Date(upcoming.date).toLocaleDateString()}
              </Text>
              <Text style={[Typography.bodySmall, { marginTop: 8 }]}>
                {locale === 'si' ? upcoming.significanceSi : upcoming.significanceEn}
              </Text>
            </View>
          ) : null
        }
        data={samplePoyaDays}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => {
          const isPast = new Date(item.date) < now;
          return (
            <View style={[Decorations.goldBorderCard, styles.card, isPast && { opacity: 0.5 }]}>
              <View style={styles.dateBox}>
                <Text style={{ color: Colors.primaryGold, fontWeight: '700', fontSize: 16 }}>
                  {new Date(item.date).getDate()}
                </Text>
                <Text style={{ color: 'rgba(245,245,245,0.7)', fontSize: 10 }}>
                  {new Date(item.date).toLocaleString('default', { month: 'short' })}
                </Text>
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={Typography.headingSmall}>{locale === 'si' ? item.nameSi : item.nameEn}</Text>
                <Text style={[Typography.bodySmall, { marginTop: 4 }]} numberOfLines={2}>
                  {locale === 'si' ? item.significanceSi : item.significanceEn}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  upcomingCard: { padding: 20, marginBottom: 16 },
  card: { flexDirection: 'row', padding: 16, marginBottom: 12, alignItems: 'center' },
  dateBox: { width: 48, height: 48, borderRadius: 8, backgroundColor: 'rgba(255,215,0,0.1)', justifyContent: 'center', alignItems: 'center' },
});
