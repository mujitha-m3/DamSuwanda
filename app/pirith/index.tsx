import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { Colors, Typography, Decorations } from '../../src/theme';
import { samplePirithList } from '../../src/data/sampleData';
import { localizedText } from '../../src/types';

export default function PirithListScreen() {
  const router = useRouter();
  const { locale, t } = useLanguage();
  const [search, setSearch] = useState('');

  const filtered = samplePirithList.filter((p) => {
    const title = localizedText(p.titleSi, p.titleEn, locale).toLowerCase();
    return title.includes(search.toLowerCase());
  });

  return (
    <>
      <Stack.Screen options={{ title: t('pirith') }} />
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder={t('search')}
          placeholderTextColor="rgba(245,245,245,0.4)"
          value={search}
          onChangeText={setSearch}
        />
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[Decorations.goldBorderCard, styles.listItem]}
              onPress={() => router.push({ pathname: '/pirith/player', params: { id: item.id } })}
              activeOpacity={0.7}
            >
              <View style={styles.iconCircle}>
                <Text style={{ fontSize: 24 }}>🎵</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={Typography.headingSmall} numberOfLines={1}>
                  {localizedText(item.titleSi, item.titleEn, locale)}
                </Text>
                {item.descriptionSi || item.descriptionEn ? (
                  <Text style={[Typography.bodySmall, { marginTop: 4 }]} numberOfLines={2}>
                    {localizedText(item.descriptionSi, item.descriptionEn, locale)}
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={[Typography.bodyMedium, { textAlign: 'center', marginTop: 40 }]}>{t('no_results')}</Text>}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 16 },
  searchInput: {
    backgroundColor: Colors.cardBackground, borderRadius: 12, padding: 14,
    color: Colors.softWhite, fontSize: 14, borderWidth: 1, borderColor: Colors.divider, marginBottom: 16,
  },
  listItem: { flexDirection: 'row', padding: 16, marginBottom: 12, alignItems: 'center' },
  iconCircle: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: 'rgba(255,215,0,0.1)',
    justifyContent: 'center', alignItems: 'center', marginRight: 16,
  },
  textContainer: { flex: 1 },
});
