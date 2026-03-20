import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useLanguage } from '../src/contexts/LanguageContext';
import { Colors, Typography, Decorations } from '../src/theme';
import { meditationTopics } from '../src/data/meditationData';
import { localizedText } from '../src/types';

export default function SajjayanaScreen() {
  const { locale, t } = useLanguage();
  const topics = meditationTopics.filter((m) => m.category === 'bojjhanga' || m.category === 'anussati');

  return (
    <>
      <Stack.Screen options={{ title: t('sajjayana') }} />
      <FlatList
        style={{ flex: 1, backgroundColor: Colors.background }}
        contentContainerStyle={{ padding: 16 }}
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[Decorations.goldBorderCard, styles.card]}>
            <View style={styles.icon}><Text style={{ fontSize: 24 }}>📜</Text></View>
            <Text style={[Typography.headingSmall, { flex: 1 }]}>
              {localizedText(item.titleSi, item.titleEn, locale)}
            </Text>
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', padding: 16, marginBottom: 12, alignItems: 'center' },
  icon: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,215,0,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
});
