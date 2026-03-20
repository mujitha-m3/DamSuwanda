import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { Colors, Typography, Decorations } from '../../src/theme';
import { sampleVandanaList } from '../../src/data/sampleData';
import { localizedText } from '../../src/types';

export default function DevotionalVandanaScreen() {
  const { locale, t } = useLanguage();
  const devotional = sampleVandanaList.filter((v) => v.category === 'devotional');

  return (
    <>
      <Stack.Screen options={{ title: t('devotional_vandana') }} />
      <FlatList
        style={{ flex: 1, backgroundColor: Colors.background }}
        contentContainerStyle={{ padding: 16 }}
        data={devotional}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const [expanded, setExpanded] = React.useState(false);
          return (
            <TouchableOpacity
              style={[Decorations.goldBorderCard, { padding: 16, marginBottom: 12 }]}
              onPress={() => setExpanded(!expanded)}
              activeOpacity={0.7}
            >
              <Text style={Typography.headingSmall}>{localizedText(item.titleSi, item.titleEn, locale)}</Text>
              {expanded && (
                <Text style={[Typography.sinhalaBody, { marginTop: 12 }]}>
                  {localizedText(item.textSi, item.textEn, locale)}
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}
