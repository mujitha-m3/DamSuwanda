// ── Theme system for Dam Suwanda ──
// Dark + Gold aesthetic matching the Flutter version
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

// ── Color Palette ──
export const Colors = {
  background: '#000000',
  surface: '#111111',
  cardBackground: '#1A1A1A',
  primaryGold: '#FFD700',
  accentGold: '#FFC107',
  softWhite: '#F5F5F5',
  divider: '#333333',
  darkGray: '#222222',
  subtleGold: 'rgba(255, 215, 0, 0.2)',
  highlightGold: 'rgba(255, 215, 0, 0.33)',
};

// ── Typography ──
export const Typography = StyleSheet.create({
  headingLarge: {
    fontFamily: 'Roboto',
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.primaryGold,
    letterSpacing: 1.2,
  },
  headingMedium: {
    fontFamily: 'Roboto',
    fontSize: 22,
    fontWeight: '600' as const,
    color: Colors.primaryGold,
  },
  headingSmall: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.primaryGold,
  },
  bodyLarge: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: Colors.softWhite,
    lineHeight: 25.6,
  },
  bodyMedium: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: Colors.softWhite,
    lineHeight: 21,
  },
  bodySmall: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: 'rgba(245, 245, 245, 0.7)',
  },
  sinhalaHeading: {
    fontFamily: 'NotoSansSinhala-Bold',
    fontSize: 22,
    fontWeight: '600' as const,
    color: Colors.primaryGold,
  },
  sinhalaBody: {
    fontFamily: 'NotoSansSinhala',
    fontSize: 16,
    color: Colors.softWhite,
    lineHeight: 28.8,
  },
  sinhalaLarge: {
    fontFamily: 'NotoSansSinhala-Bold',
    fontSize: 28,
    fontWeight: '700' as const,
    color: Colors.primaryGold,
    lineHeight: 56,
  },
  chantText: {
    fontFamily: 'NotoSansSinhala',
    fontSize: 32,
    fontWeight: '500' as const,
    color: Colors.primaryGold,
    lineHeight: 70.4,
  },
  chantTextHighlight: {
    fontFamily: 'NotoSansSinhala-Bold',
    fontSize: 34,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    lineHeight: 74.8,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.background,
  },
});

// ── Decoration Styles ──
export const Decorations = StyleSheet.create({
  goldBorderCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.subtleGold,
  },
  glowCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.subtleGold,
    shadowColor: Colors.primaryGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  goldGradientButton: {
    backgroundColor: Colors.primaryGold,
    borderRadius: 12,
    shadowColor: Colors.primaryGold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
});
