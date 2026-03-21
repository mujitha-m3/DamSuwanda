import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator, Pressable, LayoutChangeEvent, GestureResponderEvent } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { useDownloads } from '../../src/contexts/DownloadContext';
import { useFavorites } from '../../src/contexts/FavoritesContext';
import { Colors, Typography, Decorations } from '../../src/theme';
import { samplePirithList } from '../../src/data/sampleData';
import { AudioService, AudioStatus } from '../../src/services/audioService';
import { localizedText } from '../../src/types';
import * as Sharing from 'expo-sharing';


function formatDuration(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
  const s = (totalSec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function PirithPlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { locale, t } = useLanguage();
  const { isDownloaded, isDownloading, getProgress, startDownload, localUriFor } = useDownloads();
  const { isFavorite, toggle } = useFavorites();
  const router = useRouter();

  const pirith = samplePirithList.find((p) => p.id === id);
  const audioRef = useRef<AudioService | null>(null);
  const [status, setStatus] = useState<AudioStatus>({ isPlaying: false, positionMs: 0, durationMs: 0, isLoaded: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderWidth = useRef(0);

  useEffect(() => {
    if (!pirith) return;
    const audio = new AudioService();
    audioRef.current = audio;
    audio.onStatus(setStatus);

    (async () => {
      try {
        const local = localUriFor(pirith.id);
        if (local) {
          await audio.load({ localUri: local });
        } else {
          // Play from URL immediately
          await audio.load({ url: pirith.audioUrl });
          
          // Auto-download for future offline use
          if (!isDownloaded(pirith.id) && !isDownloading(pirith.id)) {
            startDownload({
              id: pirith.id,
              titleSi: pirith.titleSi,
              titleEn: pirith.titleEn,
              url: pirith.audioUrl
            }).catch(() => { /* silent fail for auto-download */ });
          }
        }
      } catch (e: any) {
        setError(locale === 'si' ? 'ශ්‍රව්‍ය ගොනුව පූරණය කිරීමට නොහැකි විය' : 'Unable to load audio file');
      }
      setLoading(false);
    })();

    return () => audio.dispose();
  }, [pirith?.id]);

  if (!pirith) return <View style={styles.container}><Text style={Typography.bodyLarge}>Not found</Text></View>;

  const title = localizedText(pirith.titleSi, pirith.titleEn, locale);
  const desc = localizedText(pirith.descriptionSi, pirith.descriptionEn, locale);
  const downloaded = isDownloaded(pirith.id);
  const downloading = isDownloading(pirith.id);
  const progress = getProgress(pirith.id);
  const fav = isFavorite(pirith.id);

  return (
    <>
      <Stack.Screen options={{ title }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* Album Art */}
        <View style={styles.albumArt}>
          <Text style={{ fontSize: 72, color: Colors.primaryGold }}>🎵</Text>
        </View>

        <Text style={[Typography.headingLarge, { textAlign: 'center', marginTop: 32 }]}>{title}</Text>
        {desc ? <Text style={[Typography.bodyMedium, { textAlign: 'center', marginTop: 8 }]}>{desc}</Text> : null}

        {loading && (
          <View style={{ marginTop: 24, alignItems: 'center' }}>
            <ActivityIndicator size="large" color={Colors.primaryGold} />
            <Text style={[Typography.bodySmall, { marginTop: 8 }]}>{locale === 'si' ? 'පූරණය වෙමින්...' : 'Loading...'}</Text>
          </View>
        )}

        {error && (
          <View style={{ marginTop: 24, padding: 16, borderRadius: 12, backgroundColor: 'rgba(255,0,0,0.1)', borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
            <Text style={{ color: '#FF6B6B', fontSize: 14, textAlign: 'center' }}>⚠️ {error}</Text>
          </View>
        )}

        {/* Seek Bar */}
        <View style={{ marginTop: 32, width: '100%' }}>
          <Pressable
            style={styles.sliderContainer}
            onPress={(e: GestureResponderEvent) => {
              if (status.durationMs > 0 && sliderWidth.current > 0) {
                const ratio = Math.max(0, Math.min(1, e.nativeEvent.locationX / sliderWidth.current));
                audioRef.current?.seek(ratio * status.durationMs);
              }
            }}
            onLayout={(e: LayoutChangeEvent) => { sliderWidth.current = e.nativeEvent.layout.width; }}
          >
            <View style={styles.sliderTrack}>
              <View style={[styles.sliderFill, { width: status.durationMs > 0 ? `${(status.positionMs / status.durationMs) * 100}%` : '0%' }]} />
            </View>
            <View
              style={[styles.sliderThumb, { left: status.durationMs > 0 ? `${(status.positionMs / status.durationMs) * 100}%` : '0%' }]}
            />
          </Pressable>
          <View style={styles.timeRow}>
            <Text style={Typography.bodySmall}>{formatDuration(status.positionMs)}</Text>
            <Text style={Typography.bodySmall}>{formatDuration(status.durationMs)}</Text>
          </View>
        </View>

        {/* Play/Pause */}
        <TouchableOpacity
          style={[Decorations.goldGradientButton, styles.playButton]}
          onPress={() => status.isPlaying ? audioRef.current?.pause() : audioRef.current?.play()}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 40, color: Colors.background }}>{status.isPlaying ? '⏸' : '▶'}</Text>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <ActionBtn
            icon={downloaded ? '✅' : '⬇️'}
            label={downloaded ? t('downloaded') : downloading ? `${Math.round((progress ?? 0) * 100)}%` : t('download')}
            disabled={downloaded || downloading}
            onPress={() => startDownload({ id: pirith.id, titleSi: pirith.titleSi, titleEn: pirith.titleEn, url: pirith.audioUrl })}
          />
          <ActionBtn icon={fav ? '❤️' : '🤍'} label={t('favorite')} onPress={() => toggle(pirith.id)} />
          <ActionBtn icon="📤" label={t('share')} onPress={async () => {
            try { await Sharing.shareAsync(pirith.audioUrl); } catch {}
          }} />
          <ActionBtn
            icon="📜"
            label={t('chant_mode')}
            disabled={pirith.lines.length === 0}
            onPress={() => router.push({ pathname: '/pirith/chant', params: { id: pirith.id } })}
          />
        </View>
      </ScrollView>
    </>
  );
}

function ActionBtn({ icon, label, onPress, disabled }: { icon: string; label: string; onPress?: () => void; disabled?: boolean }) {
  return (
    <TouchableOpacity onPress={disabled ? undefined : onPress} style={{ alignItems: 'center', opacity: disabled ? 0.4 : 1 }}>
      <Text style={{ fontSize: 26 }}>{icon}</Text>
      <Text style={[Typography.bodySmall, { fontSize: 10, marginTop: 6, textAlign: 'center' }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24, alignItems: 'center' },
  albumArt: {
    width: 180, height: 180, borderRadius: 90,
    backgroundColor: Colors.cardBackground, borderWidth: 2, borderColor: Colors.subtleGold,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: Colors.primaryGold, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.15, shadowRadius: 40, elevation: 10,
  },
  sliderContainer: { width: '100%', height: 40, justifyContent: 'center' },
  sliderTrack: { width: '100%', height: 5, backgroundColor: Colors.divider, borderRadius: 3 },
  sliderFill: { height: 5, backgroundColor: Colors.primaryGold, borderRadius: 3 },
  sliderThumb: { position: 'absolute', width: 18, height: 18, borderRadius: 9, backgroundColor: Colors.primaryGold, marginLeft: -9, top: 11 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingHorizontal: 4 },
  playButton: { width: 72, height: 72, borderRadius: 36, justifyContent: 'center', alignItems: 'center', marginTop: 16 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', marginTop: 32 },
});
