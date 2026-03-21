import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useLanguage } from '../src/contexts/LanguageContext';
import { useTextSize } from '../src/contexts/TextSizeContext';
import { useTheme } from '../src/contexts/ThemeContext';
import { meditationTopics } from '../src/data/meditationData';
import { localizedText } from '../src/types';

export default function SajjayanaScreen() {
  const { locale, t } = useLanguage();
  const { scaled } = useTextSize();
  const { colors } = useTheme();
  const topics = meditationTopics.filter((m) => m.category === 'bojjhanga' || m.category === 'anussati');

  return (
    <>
      <Stack.Screen options={{ title: t('sajjayana') }} />
      <FlatList
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ padding: 16 }}
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} activeOpacity={0.7}>
            <View style={styles.playButton}>
              <Text style={{ color: '#FFF', fontSize: scaled(14), marginLeft: 3 }}>▶</Text>
            </View>
            <View style={[styles.textContainer, { backgroundColor: 'rgba(128,128,128,0.15)' }]}>
              <Text style={{ fontSize: scaled(13), color: colors.primary, fontWeight: '500' }}>
                {localizedText(item.titleSi, item.titleEn, locale)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  playButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FF5500', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  textContainer: { flex: 1, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 2 },
});
