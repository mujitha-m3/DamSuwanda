import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useLanguage } from '../src/contexts/LanguageContext';
import { Colors, Typography, Decorations } from '../src/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const { locale, t, setLocale, isSinhala } = useLanguage();
  const [notifications, setNotifications] = useState(true);

  return (
    <>
      <Stack.Screen options={{ title: t('settings') }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Language */}
        <View style={[Decorations.goldBorderCard, styles.card]}>
          <Text style={Typography.headingSmall}>{t('change_language')}</Text>
          <View style={styles.langRow}>
            <TouchableOpacity
              style={[styles.langBtn, isSinhala && styles.langBtnActive]}
              onPress={() => setLocale('si')}
            >
              <Text style={[styles.langBtnText, isSinhala && styles.langBtnTextActive]}>සිංහල</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langBtn, !isSinhala && styles.langBtnActive]}
              onPress={() => setLocale('en')}
            >
              <Text style={[styles.langBtnText, !isSinhala && styles.langBtnTextActive]}>English</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications */}
        <View style={[Decorations.goldBorderCard, styles.card, styles.row]}>
          <Text style={Typography.bodyLarge}>{t('notifications')}</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: Colors.divider, true: Colors.primaryGold }}
            thumbColor="#FFF"
          />
        </View>

        {/* About */}
        <View style={[Decorations.goldBorderCard, styles.card]}>
          <Text style={Typography.headingSmall}>{t('about')}</Text>
          <Text style={[Typography.bodyMedium, { marginTop: 8 }]}>Dam Suvanda</Text>
          <Text style={[Typography.bodySmall, { marginTop: 4 }]}>දම් සුවඳ — The Fragrance of Dhamma</Text>
          <Text style={[Typography.bodySmall, { marginTop: 8 }]}>{t('version')}: 1.0.0</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  card: { padding: 20, marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  langRow: { flexDirection: 'row', gap: 12, marginTop: 16 },
  langBtn: { flex: 1, padding: 14, borderRadius: 12, borderWidth: 1, borderColor: Colors.divider, alignItems: 'center' },
  langBtnActive: { borderColor: Colors.primaryGold, backgroundColor: 'rgba(255,215,0,0.1)' },
  langBtnText: { color: Colors.softWhite, fontSize: 16, fontWeight: '500' },
  langBtnTextActive: { color: Colors.primaryGold },
});
