import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { useTextSize } from '../../src/contexts/TextSizeContext';
import { useTheme } from '../../src/contexts/ThemeContext';
import { sampleVandanaList } from '../../src/data/sampleData';
import { localizedText } from '../../src/types';

export default function DevotionalVandanaScreen() {
  const { locale, t } = useLanguage();
  const { colors } = useTheme();
  const devotional = sampleVandanaList.filter((v) => v.category === 'devotional');

  return (
    <>
      <Stack.Screen options={{ title: t('devotional_vandana') }} />
      <FlatList
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ padding: 16 }}
        data={devotional}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DevotionalCard item={item} />}
      />
    </>
  );
}

const DevotionalCard = React.memo(({ item }: { item: any }) => {
  const { locale } = useLanguage();
  const { scaled } = useTextSize();
  const { colors } = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setExpanded(!expanded)}
      activeOpacity={0.7}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.cardPlayButton, { backgroundColor: expanded ? colors.accent : '#FF5500' }]}>
          <Text style={{ color: '#FFF', fontSize: scaled(14), marginLeft: expanded ? 0 : 3 }}>
            {expanded ? '▼' : '▶'}
          </Text>
        </View>
        <View style={[styles.textContainer, { backgroundColor: 'rgba(128,128,128,0.15)' }]}>
          <Text style={{ fontSize: scaled(13), color: colors.primary, fontWeight: '500' }}>
            {localizedText(item.titleSi, item.titleEn, locale)}
          </Text>
        </View>
      </View>
      
      {expanded && (
        <View style={{ marginTop: 12, paddingLeft: 44 }}>
          <Text style={{ fontSize: scaled(14), color: colors.softWhite, lineHeight: scaled(24) }}>
            {localizedText(item.textSi, item.textEn, locale)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: { marginBottom: 16 },
  cardPlayButton: { 
    width: 32, height: 32, borderRadius: 16, 
    justifyContent: 'center', alignItems: 'center', 
    marginRight: 12 
  },
  textContainer: { flex: 1, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 2 },
});
