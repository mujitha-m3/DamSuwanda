import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../src/contexts/LanguageContext';
import { Colors, Typography } from '../src/theme';

export default function SplashScreenPage() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const router = useRouter();
  const { hasSelectedLanguage, isLoaded } = useLanguage();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(async () => {
      if (!isLoaded) return;
      const hasLang = await hasSelectedLanguage();
      router.replace(hasLang ? '/home' : '/language-selection');
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoaded]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
        </View>
        <Text style={styles.title}>Dam Suvanda</Text>
        <Text style={styles.titleSi}>දම් සුවඳ</Text>
        <Text style={styles.tagline}>The Fragrance of Dhamma</Text>
        <ActivityIndicator size="small" color="rgba(255, 215, 0, 0.5)" style={{ marginTop: 48 }} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center' },
  content: { alignItems: 'center' },
  logoContainer: {
    shadowColor: Colors.primaryGold, shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5, shadowRadius: 40, elevation: 15,
  },
  logoImage: { width: 240, height: 240, borderRadius: 20 },
  title: { ...Typography.headingLarge, fontSize: 36, letterSpacing: 2, marginTop: 24 },
  titleSi: { fontFamily: 'NotoSansSinhala-Bold', fontSize: 24, color: Colors.accentGold, marginTop: 4 },
  tagline: { ...Typography.bodyMedium, color: 'rgba(245,245,245,0.7)', fontStyle: 'italic', letterSpacing: 1.5, marginTop: 16 },
});
