import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { Colors, Typography, Decorations } from '../../src/theme';
import { meditationTopics } from '../../src/data/meditationData';
import { localizedText } from '../../src/types';

export default function MeditationGuidanceScreen() {
  const { locale, t } = useLanguage();
  const router = useRouter();
  const guideTopics = meditationTopics.filter((m) => 
    m.category === 'guide' || m.category === 'bojjhanga' || m.category === 'anussati'
  );

  return (
    <>
      <Stack.Screen options={{ title: t('meditation_guidance') }} />
      <FlatList
        style={{ flex: 1, backgroundColor: Colors.background }}
        contentContainerStyle={{ padding: 16 }}
        data={guideTopics}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[Decorations.goldBorderCard, styles.card]}
            onPress={() => router.push({ pathname: '/meditation/detail', params: { id: item.id } })}
            activeOpacity={0.7}
          >
            <View style={styles.number}><Text style={{ color: Colors.primaryGold, fontWeight: '600' }}>{index + 1}</Text></View>
            <Text style={[Typography.headingSmall, { flex: 1 }]}>{localizedText(item.titleSi, item.titleEn, locale)}</Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 16, marginBottom: 12, alignItems: 'center' },
  number: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,215,0,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
});
