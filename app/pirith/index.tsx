import React, { useState, useMemo } from 'react';
import { View, Text, SectionList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { useTextSize } from '../../src/contexts/TextSizeContext';
import { useTheme } from '../../src/contexts/ThemeContext';
import { samplePirithList } from '../../src/data/sampleData';
import { localizedText } from '../../src/types';

export const PIRITH_GROUPS = [
  { id: 'pe_kirima', titleSi: 'පිරිත් පේ කිරීම', titleEn: 'Pirith Pe Kirima' },
  { id: 'maha_piritha', titleSi: 'මහ පිරිත', titleEn: 'Maha Piritha' },
  { id: 'palamuveni_banavara', titleSi: 'පළමුවෙනි බණවර', titleEn: 'First Banavara' },
  { id: 'deveni_banavara', titleSi: 'දෙවෙනි බණවර', titleEn: 'Second Banavara' },
  { id: 'damsak_desuma', titleSi: 'දම්සක් දෙසුම', titleEn: 'Dhammacakkappavattana' },
  { id: 'athireka', titleSi: 'අතිරේක දේශනා', titleEn: 'Additional Discourses' },
  { id: 'hamara', titleSi: 'හමාර දේශනා', titleEn: 'Concluding Discourses' },
];

export default function PirithListScreen() {
  const router = useRouter();
  const { locale, t, isSinhala } = useLanguage();
  const { scaled } = useTextSize();
  const { colors } = useTheme();
  const [search, setSearch] = useState('');

  const sections = useMemo(() => {
    const list = samplePirithList.filter((p) => {
      const title = localizedText(p.titleSi, p.titleEn, locale).toLowerCase();
      return title.includes(search.toLowerCase());
    });
    
    return PIRITH_GROUPS.map(group => ({
      title: isSinhala ? group.titleSi : group.titleEn,
      data: list.filter(p => p.group === group.id),
      id: group.id
    })).filter(section => section.data.length > 0);
  }, [search, locale, isSinhala]);

  return (
    <>
      <Stack.Screen options={{ title: t('pirith') }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.cardBackground, color: colors.softWhite, borderColor: colors.divider, fontSize: scaled(14) }]}
          placeholder={t('search')}
          placeholderTextColor="rgba(245,245,245,0.4)"
          value={search}
          onChangeText={setSearch}
        />
        
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 24 }}
          stickySectionHeadersEnabled={false}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeaderContainer}>
              <Text style={[styles.sectionTitle, { color: colors.primary, fontSize: scaled(24) }]}>{title}</Text>
              <View style={[styles.sectionLine, { backgroundColor: colors.accent }]} />
            </View>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => router.push({ pathname: '/pirith/player', params: { id: item.id } })}
              activeOpacity={0.7}
            >
              {/* Play Button */}
              <View style={styles.playButton}>
                <Text style={{ color: '#FFF', fontSize: scaled(14), marginLeft: 3 }}>▶</Text>
              </View>

              {/* Text Highlights */}
              <View style={[styles.textContainer, { backgroundColor: 'rgba(128,128,128,0.15)' }]}>
                <Text style={{ fontSize: scaled(13), color: colors.primary, fontWeight: '500' }} numberOfLines={1}>
                  {localizedText(item.titleSi, item.titleEn, locale)}
                </Text>
              </View>

            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 40, color: colors.softWhite, fontSize: scaled(14) }}>
              {t('no_results')}
            </Text>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  searchInput: { borderRadius: 12, padding: 14, borderWidth: 1, marginBottom: 16 },
  sectionHeaderContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 24, marginBottom: 16 },
  sectionTitle: { fontWeight: 'bold', marginRight: 16 },
  sectionLine: { flex: 1, height: 1 },
  listItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  playButton: { 
    width: 32, height: 32, borderRadius: 16, 
    backgroundColor: '#FF5500', 
    justifyContent: 'center', alignItems: 'center', 
    marginRight: 12 
  },
  textContainer: { 
    flex: 1, 
    paddingHorizontal: 12, paddingVertical: 4, 
    borderRadius: 2 
  },
  soundcloudTag: { marginLeft: 12, flexDirection: 'row', alignItems: 'center' },
});
