import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useLanguage } from '../../../src/contexts/LanguageContext';
import { useDownloads } from '../../../src/contexts/DownloadContext';
import { useTextSize } from '../../../src/contexts/TextSizeContext';
import { useTheme } from '../../../src/contexts/ThemeContext';
import { sampleVandanaList } from '../../../src/data/sampleData';
import { BUDDHA_VANDANA_CATEGORIES } from '../buddha';
import { localizedText } from '../../../src/types';
import { AudioService, AudioStatus } from '../../../src/services/audioService';
import { ActivityIndicator, Pressable, GestureResponderEvent } from 'react-native';

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function BuddhaVandanaCategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const { locale, isSinhala } = useLanguage();
  const { scaled } = useTextSize();
  const { colors } = useTheme();

  const details = BUDDHA_VANDANA_CATEGORIES.find(c => c.id === category);
  const title = details ? (isSinhala ? details.titleSi : details.titleEn) : 'Vandana';
  
  const data = sampleVandanaList.filter((v) => v.category === category);

  return (
    <>
      <Stack.Screen options={{ title }} />
      <FlatList
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ padding: 16 }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VandanaCard item={item} />}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: colors.softWhite, marginTop: 40, fontSize: scaled(14) }}>
            {isSinhala ? 'මෙම අංශය සඳහා වන්දනා ගාථා ඉදිරියේදී එකතු වේ.' : 'Verses for this category will be added soon.'}
          </Text>
        }
      />
    </>
  );
}

const VandanaCard = React.memo(({ item }: { item: any }) => {
  const { locale, isSinhala } = useLanguage();
  const { scaled } = useTextSize();
  const { colors } = useTheme();
  const { isDownloaded, isDownloading, startDownload, localUriFor } = useDownloads();
  
  const [expanded, setExpanded] = React.useState(false);
  const audioRef = React.useRef<AudioService | null>(null);
  const sliderWidth = React.useRef(0);
  const [status, setStatus] = React.useState<AudioStatus>({ isPlaying: false, positionMs: 0, durationMs: 0, isLoaded: false });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (expanded && item.audioUrl) {
      const audio = new AudioService();
      audioRef.current = audio;
      audio.onStatus(setStatus);
      setLoading(true);
      setError(null);
      
      const playLocalOrRemote = async () => {
        try {
          const local = localUriFor(item.id);
          if (local) {
            await audio.load({ localUri: local });
          } else {
            await audio.load({ url: item.audioUrl });
            // Auto download for future offline playback
            if (!isDownloaded(item.id) && !isDownloading(item.id)) {
              startDownload({
                id: item.id,
                titleSi: item.titleSi || 'Vandana',
                titleEn: item.titleEn || 'Vandana',
                url: item.audioUrl
              }).catch(() => {});
            }
          }
        } catch {
          setError(isSinhala ? 'ශ්‍රව්‍ය ගොනුව පූරණය කිරීමට නොහැකි විය' : 'Unable to load audio');
        } finally {
          setLoading(false);
        }
      };
      
      playLocalOrRemote();

      return () => audio.dispose();
    }
  }, [expanded, item.audioUrl]);

  const handleSeek = (e: GestureResponderEvent) => {
    if (sliderWidth.current === 0 || status.durationMs === 0) return;
    const position = e.nativeEvent.locationX;
    const ratio = Math.max(0, Math.min(1, position / sliderWidth.current));
    audioRef.current?.seek(ratio * status.durationMs);
  };

  const progress = status.durationMs > 0 ? (status.positionMs / status.durationMs) * 100 : 0;

  return (
    <TouchableOpacity
      style={[
        styles.card, 
        { 
          backgroundColor: colors.cardBackground, 
        }
      ]}
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
        <View>
          <Text style={{ 
            marginTop: 16, 
            color: colors.softWhite, 
            fontSize: scaled(14), 
            lineHeight: scaled(24),
            fontFamily: isSinhala ? 'NotoSansSinhala' : undefined 
          }}>
            {localizedText(item.textSi, item.textEn, locale)}
          </Text>
          
          {item.audioUrl && (
            <View style={[styles.audioControl, { backgroundColor: colors.subtle, borderColor: colors.divider }]}>
              {loading ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'center', width: '100%' }}>
                  <ActivityIndicator size="small" color={colors.primary} />
                  <Text style={{ color: colors.softWhite, fontSize: scaled(12) }}>{isSinhala ? 'පූරණය වෙමින්...' : 'Loading audio...'}</Text>
                </View>
              ) : error ? (
                <Text style={{ color: '#FF6B6B', fontSize: scaled(12), textAlign: 'center', width: '100%' }}>⚠️ {error}</Text>
              ) : (
                <View style={{ width: '100%' }}>
                  <Pressable
                    onLayout={(e) => { sliderWidth.current = e.nativeEvent.layout.width; }}
                    onPress={handleSeek}
                    style={styles.sliderContainer}
                  >
                    <View style={[styles.sliderTrack, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                      <View style={[styles.sliderFill, { width: `${progress}%`, backgroundColor: colors.primary }]} />
                    </View>
                  </Pressable>
                  
                  <View style={styles.audioMetaRow}>
                    <Text style={{ color: colors.softWhite, fontSize: scaled(12) }}>
                      {formatTime(status.positionMs)}
                    </Text>
                    
                    <TouchableOpacity 
                      style={[styles.playBtnSmall, { backgroundColor: colors.primary }]}
                      onPress={() => status.isPlaying ? audioRef.current?.pause() : audioRef.current?.play()}
                    >
                      <Text style={{ fontSize: scaled(14), color: colors.background }}>
                        {status.isPlaying ? '⏸' : '▶️'}
                      </Text>
                    </TouchableOpacity>

                    <Text style={{ color: colors.softWhite, fontSize: scaled(12) }}>
                      {formatTime(status.durationMs)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: { 
    marginBottom: 16, 
  },
  cardPlayButton: { 
    width: 32, height: 32, borderRadius: 16, 
    justifyContent: 'center', alignItems: 'center', 
    marginRight: 12 
  },
  textContainer: { 
    flex: 1, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 2 
  },
  audioControl: { 
    marginTop: 16, 
    padding: 12, 
    borderRadius: 12, 
    borderWidth: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  playBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 8, 
    paddingHorizontal: 20, 
    borderRadius: 8 
  },
  sliderContainer: { height: 40, justifyContent: 'center', marginBottom: 8 },
  sliderTrack: { height: 4, borderRadius: 2 },
  sliderFill: { height: '100%', borderRadius: 2 },
  audioMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  playBtnSmall: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 8 },
});
