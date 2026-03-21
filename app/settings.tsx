import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useLanguage } from '../src/contexts/LanguageContext';
import { useTextSize, TextSizeLabel } from '../src/contexts/TextSizeContext';
import { useTheme, ThemeKey } from '../src/contexts/ThemeContext';

const SIZE_OPTIONS: { label: TextSizeLabel; si: string; en: string; preview: number }[] = [
  { label: 'small', si: 'කුඩා', en: 'Small', preview: 13 },
  { label: 'medium', si: 'මධ්‍යම', en: 'Medium', preview: 15 },
  { label: 'large', si: 'විශාල', en: 'Large', preview: 18 },
  { label: 'xlarge', si: 'ඉතා විශාල', en: 'Extra Large', preview: 22 },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { locale, t, setLocale, isSinhala } = useLanguage();
  const { sizeLabel, setSizeLabel, scaled } = useTextSize();
  const { themeKey, colors, setThemeKey, allThemes } = useTheme();
  const [notifications, setNotifications] = useState(true);

  return (
    <>
      <Stack.Screen options={{ title: t('settings') }} />
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={styles.content}>

        {/* Theme */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.subtle }]}>
          <Text style={{ fontSize: scaled(18), fontWeight: '600', color: colors.primary }}>{t('theme')}</Text>
          <Text style={{ marginTop: 4, fontSize: scaled(12), color: 'rgba(245,245,245,0.7)' }}>
            {isSinhala ? 'ඔබට ගැලපෙන තේමාවක් තෝරන්න' : 'Choose a theme you like'}
          </Text>
          <View style={styles.themeGrid}>
            {(Object.keys(allThemes) as ThemeKey[]).map((key) => {
              const theme = allThemes[key];
              const active = key === themeKey;
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.themeBtn, {
                    borderColor: active ? theme.colors.primary : colors.divider,
                    backgroundColor: active ? theme.colors.subtle : 'transparent',
                  }]}
                  onPress={() => setThemeKey(key)}
                >
                  <View style={[styles.themePreview, { backgroundColor: theme.colors.background, borderColor: theme.colors.primary }]}>
                    <Text style={{ fontSize: 18 }}>{theme.emoji}</Text>
                  </View>
                  <Text style={[styles.themeName, {
                    color: active ? theme.colors.primary : colors.softWhite,
                    fontSize: scaled(11),
                  }]}>
                    {isSinhala ? theme.labelSi : theme.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Text Size */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.subtle }]}>
          <Text style={{ fontSize: scaled(18), fontWeight: '600', color: colors.primary }}>{t('text_size')}</Text>
          <Text style={{ marginTop: 4, fontSize: scaled(12), color: 'rgba(245,245,245,0.7)' }}>
            {isSinhala ? 'ඔබට සුවපහසු අකුරු ප්‍රමාණය තෝරන්න' : 'Choose a comfortable text size'}
          </Text>
          <View style={styles.sizeRow}>
            {SIZE_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.label}
                style={[styles.sizeBtn, {
                  borderColor: sizeLabel === opt.label ? colors.primary : colors.divider,
                  backgroundColor: sizeLabel === opt.label ? colors.subtle : 'transparent',
                }]}
                onPress={() => setSizeLabel(opt.label)}
              >
                <Text style={[styles.sizeBtnPreview, { fontSize: opt.preview, color: colors.softWhite }]}>අ</Text>
                <Text style={[styles.sizeBtnText, {
                  color: sizeLabel === opt.label ? colors.primary : colors.softWhite,
                }]}>
                  {isSinhala ? opt.si : opt.en}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Preview */}
          <View style={[styles.previewBox, { borderColor: colors.divider }]}>
            <Text style={{ color: colors.accent, fontSize: scaled(11), marginBottom: 4 }}>
              {isSinhala ? 'පෙරදසුන:' : 'Preview:'}
            </Text>
            <Text style={{ color: colors.softWhite, fontSize: scaled(15), lineHeight: scaled(22) }}>
              {isSinhala ? 'සියලු සත්ත්වයෝ සුඛී හෝන්තු 🙏' : 'May all beings be happy 🙏'}
            </Text>
          </View>
        </View>

        {/* Language */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.subtle }]}>
          <Text style={{ fontSize: scaled(18), fontWeight: '600', color: colors.primary }}>{t('change_language')}</Text>
          <View style={styles.langRow}>
            <TouchableOpacity
              style={[styles.langBtn, {
                borderColor: isSinhala ? colors.primary : colors.divider,
                backgroundColor: isSinhala ? colors.subtle : 'transparent',
              }]}
              onPress={() => setLocale('si')}
            >
              <Text style={{ fontSize: scaled(16), fontWeight: '500', color: isSinhala ? colors.primary : colors.softWhite }}>සිංහල</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langBtn, {
                borderColor: !isSinhala ? colors.primary : colors.divider,
                backgroundColor: !isSinhala ? colors.subtle : 'transparent',
              }]}
              onPress={() => setLocale('en')}
            >
              <Text style={{ fontSize: scaled(16), fontWeight: '500', color: !isSinhala ? colors.primary : colors.softWhite }}>English</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications */}
        <View style={[styles.card, styles.row, { backgroundColor: colors.cardBackground, borderColor: colors.subtle }]}>
          <Text style={{ fontSize: scaled(16), color: colors.softWhite }}>{t('notifications')}</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: colors.divider, true: colors.primary }}
            thumbColor="#FFF"
          />
        </View>

        {/* About */}
        <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.subtle }]}>
          <Text style={{ fontSize: scaled(18), fontWeight: '600', color: colors.primary }}>{t('about')}</Text>
          <Text style={{ marginTop: 8, fontSize: scaled(14), color: colors.softWhite }}>Dam Suvanda</Text>
          <Text style={{ marginTop: 4, fontSize: scaled(12), color: 'rgba(245,245,245,0.7)' }}>දම් සුවඳ — The Fragrance of Dhamma</Text>
          <Text style={{ marginTop: 8, fontSize: scaled(12), color: 'rgba(245,245,245,0.7)' }}>{t('version')}: 1.0.0</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  card: { padding: 20, marginBottom: 16, borderRadius: 16, borderWidth: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  themeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 },
  themeBtn: { width: '30%', padding: 10, borderRadius: 12, borderWidth: 1.5, alignItems: 'center' },
  themePreview: {
    width: 40, height: 40, borderRadius: 20, borderWidth: 2,
    justifyContent: 'center', alignItems: 'center', marginBottom: 6,
  },
  themeName: { fontWeight: '500', textAlign: 'center' },
  sizeRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
  sizeBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  sizeBtnPreview: { marginBottom: 4 },
  sizeBtnText: { fontSize: 11, fontWeight: '500' },
  previewBox: { marginTop: 16, padding: 14, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1 },
  langRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  langBtn: { flex: 1, padding: 14, borderRadius: 12, borderWidth: 1, alignItems: 'center' },
});
