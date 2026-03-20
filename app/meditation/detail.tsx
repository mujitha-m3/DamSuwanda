import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { Colors, Typography, Decorations } from '../../src/theme';
import { meditationTopics } from '../../src/data/meditationData';
import { localizedText } from '../../src/types';

export default function MeditationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { locale } = useLanguage();
  const topic = meditationTopics.find((m) => m.id === id);

  if (!topic) return <View style={styles.container}><Text style={Typography.bodyLarge}>Not found</Text></View>;

  const title = localizedText(topic.titleSi, topic.titleEn, locale);
  const desc = localizedText(topic.descriptionSi, topic.descriptionEn, locale);

  return (
    <>
      <Stack.Screen options={{ title }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.iconCircle}><Text style={{ fontSize: 48 }}>🧘</Text></View>
        <Text style={[Typography.headingLarge, { textAlign: 'center', marginTop: 24 }]}>{title}</Text>
        {desc ? (
          <View style={[Decorations.goldBorderCard, { padding: 20, marginTop: 24 }]}>
            <Text style={Typography.sinhalaBody}>{desc}</Text>
          </View>
        ) : null}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24, alignItems: 'center' },
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,215,0,0.1)', justifyContent: 'center', alignItems: 'center' },
});
