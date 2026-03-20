import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { Colors, Typography } from '../../src/theme';
import { samplePirithList } from '../../src/data/sampleData';
import { AudioService, AudioStatus } from '../../src/services/audioService';
import { localizedText } from '../../src/types';

function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
  const s = (totalSec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function ChantModeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { locale } = useLanguage();
  const router = useRouter();
  const pirith = samplePirithList.find((p) => p.id === id);
  const audioRef = useRef<AudioService | null>(null);
  const listRef = useRef<FlatList>(null);
  const [status, setStatus] = useState<AudioStatus>({ isPlaying: false, positionMs: 0, durationMs: 0, isLoaded: false });
  const [textScale, setTextScale] = useState(1);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (!pirith) return;
    const audio = new AudioService();
    audioRef.current = audio;
    audio.onStatus(setStatus);
    (async () => {
      try { await audio.load({ url: pirith.audioUrl }); await audio.play(); } catch {}
    })();
    return () => audio.dispose();
  }, [pirith?.id]);

  if (!pirith) return null;

  const currentLine = (() => {
    const adjusted = status.positionMs - 1000;
    let idx = 0;
    for (let i = 0; i < pirith.lines.length; i++) {
      if (adjusted >= pirith.lines[i].timestampMs) idx = i;
    }
    return idx;
  })();

  if (autoScroll && status.isLoaded && pirith.lines.length > 0) {
    setTimeout(() => listRef.current?.scrollToIndex({ index: currentLine, animated: true, viewPosition: 0.3 }), 100);
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={styles.container}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => { audioRef.current?.stop(); router.back(); }}>
            <Text style={{ fontSize: 24, color: Colors.primaryGold }}>✕</Text>
          </TouchableOpacity>
          <Text style={[Typography.headingSmall, { flex: 1, textAlign: 'center' }]} numberOfLines={1}>
            {localizedText(pirith.titleSi, pirith.titleEn, locale)}
          </Text>
          <TouchableOpacity onPress={() => setTextScale((s) => Math.max(0.6, s - 0.1))}>
            <Text style={{ fontSize: 18, color: Colors.primaryGold }}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTextScale((s) => Math.min(2, s + 0.1))} style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 18, color: Colors.primaryGold }}>A+</Text>
          </TouchableOpacity>
        </View>

        {/* Chant text */}
        <FlatList
          ref={listRef}
          data={pirith.lines}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ padding: 24 }}
          onScrollToIndexFailed={() => {}}
          renderItem={({ item, index }) => {
            const isCurrent = index === currentLine;
            return (
              <TouchableOpacity
                onPress={() => audioRef.current?.seek(item.timestampMs)}
                style={[styles.lineContainer, isCurrent && styles.lineHighlight]}
              >
                <Text style={[
                  isCurrent ? styles.chantHighlight : styles.chantNormal,
                  { fontSize: (isCurrent ? 34 : 32) * textScale },
                ]}>
                  {locale === 'si' ? item.textSi : item.textEn}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {/* Bottom controls */}
        <View style={styles.bottom}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: status.durationMs > 0 ? `${(status.positionMs / status.durationMs) * 100}%` : '0%' }]} />
          </View>
          <View style={styles.timeRow}>
            <Text style={Typography.bodySmall}>{formatDuration(status.positionMs)}</Text>
            <Text style={Typography.bodySmall}>{formatDuration(status.durationMs)}</Text>
          </View>
          <View style={styles.controlRow}>
            <TouchableOpacity onPress={() => setAutoScroll((v) => !v)}>
              <Text style={{ fontSize: 20, color: autoScroll ? Colors.primaryGold : 'rgba(245,245,245,0.4)' }}>↕</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playBtn}
              onPress={() => status.isPlaying ? audioRef.current?.pause() : audioRef.current?.play()}
            >
              <Text style={{ fontSize: 32, color: Colors.background }}>{status.isPlaying ? '⏸' : '▶'}</Text>
            </TouchableOpacity>
            <View style={{ width: 20 }} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4 },
  lineContainer: { padding: 12, marginBottom: 4, borderRadius: 12 },
  lineHighlight: { backgroundColor: 'rgba(255,215,0,0.08)' },
  chantNormal: { fontFamily: 'NotoSansSinhala', fontWeight: '500', color: 'rgba(255,215,0,0.4)', textAlign: 'center', lineHeight: 70 },
  chantHighlight: { fontFamily: 'NotoSansSinhala-Bold', fontWeight: '700', color: '#FFFFFF', textAlign: 'center', lineHeight: 75, textShadowColor: 'rgba(255,215,0,0.67)', textShadowRadius: 12 },
  bottom: { backgroundColor: Colors.cardBackground, borderTopWidth: 0.5, borderTopColor: Colors.divider, paddingHorizontal: 16, paddingVertical: 12 },
  progressBar: { width: '100%', height: 2, backgroundColor: Colors.divider, borderRadius: 1 },
  progressFill: { height: 2, backgroundColor: Colors.primaryGold, borderRadius: 1 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, marginBottom: 8 },
  controlRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 24 },
  playBtn: { width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.primaryGold, justifyContent: 'center', alignItems: 'center' },
});
