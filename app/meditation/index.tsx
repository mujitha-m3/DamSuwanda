import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { Colors, Typography, Decorations } from '../../src/theme';
import { meditationTopics } from '../../src/data/meditationData';
import { localizedText } from '../../src/types';

export default function MeditationScreen() {
  const { locale, t } = useLanguage();
  const router = useRouter();
  const audioTopics = meditationTopics.filter((m) => m.category === 'audio');

  return (
    <>
      <Stack.Screen options={{ title: t('meditation') }} />
      <FlatList
        style={{ flex: 1, backgroundColor: Colors.background }}
        contentContainerStyle={{ padding: 16 }}
        data={audioTopics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[Decorations.goldBorderCard, styles.card]}
            onPress={() => router.push({ pathname: '/meditation/detail', params: { id: item.id } })}
            activeOpacity={0.7}
          >
            <View style={styles.icon}><Text style={{ fontSize: 24 }}>🧘</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={Typography.headingSmall}>{localizedText(item.titleSi, item.titleEn, locale)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 16, marginBottom: 12, alignItems: 'center' },
  icon: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,215,0,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
});
