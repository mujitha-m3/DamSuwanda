import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { Colors, Typography, Decorations } from '../../src/theme';
import { sampleSermons } from '../../src/data/sampleData';
import { localizedText } from '../../src/types';

export default function DharmaDiscussionsScreen() {
  const { locale, t } = useLanguage();

  return (
    <>
      <Stack.Screen options={{ title: t('dharma_discussions') }} />
      <FlatList
        style={{ flex: 1, backgroundColor: Colors.background }}
        contentContainerStyle={{ padding: 16 }}
        data={sampleSermons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[Decorations.goldBorderCard, styles.card]}>
            <View style={styles.icon}><Text style={{ fontSize: 24 }}>💬</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={Typography.headingSmall}>{localizedText(item.titleSi, item.titleEn, locale)}</Text>
              {(item.topicSi || item.topicEn) && (
                <Text style={[Typography.bodySmall, { marginTop: 4 }]}>
                  {localizedText(item.topicSi, item.topicEn, locale)}
                </Text>
              )}
            </View>
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
