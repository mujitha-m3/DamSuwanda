import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../src/contexts/LanguageContext';
import { Colors, Typography, Decorations } from '../src/theme';

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const { setLocale, t } = useLanguage();

  const selectLanguage = async (locale: string) => {
    await setLocale(locale);
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.wheelIcon}>☸</Text>
      </View>
      <Text style={styles.heading}>{t('select_language')}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[Decorations.goldBorderCard, styles.langButton]}
          onPress={() => selectLanguage('si')}
          activeOpacity={0.7}
        >
          <Text style={styles.langText}>සිංහල</Text>
          <Text style={styles.langSubtext}>Sinhala</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[Decorations.goldBorderCard, styles.langButton]}
          onPress={() => selectLanguage('en')}
          activeOpacity={0.7}
        >
          <Text style={styles.langText}>English</Text>
          <Text style={styles.langSubtext}>English</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', padding: 24 },
  iconCircle: {
    width: 80, height: 80, borderRadius: 40,
    borderWidth: 2, borderColor: Colors.primaryGold,
    justifyContent: 'center', alignItems: 'center', marginBottom: 32,
  },
  wheelIcon: { fontSize: 40, color: Colors.primaryGold },
  heading: { ...Typography.headingLarge, marginBottom: 40, textAlign: 'center' },
  buttonContainer: { width: '100%', gap: 16 },
  langButton: { padding: 24, alignItems: 'center' },
  langText: { fontSize: 24, fontWeight: '600', color: Colors.primaryGold, marginBottom: 4 },
  langSubtext: { ...Typography.bodySmall },
});
