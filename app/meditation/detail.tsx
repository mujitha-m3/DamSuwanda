import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useLanguage } from '../../src/contexts/LanguageContext';
import { useTextSize } from '../../src/contexts/TextSizeContext';
import { useTheme } from '../../src/contexts/ThemeContext';
import { useDownloads } from '../../src/contexts/DownloadContext';
import { meditationTopics } from '../../src/data/meditationData';
import { localizedText } from '../../src/types';
import { AudioService, AudioStatus } from '../../src/services/audioService';
import { TouchableOpacity, ActivityIndicator, Pressable, GestureResponderEvent } from 'react-native';

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function MeditationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { locale, isSinhala } = useLanguage();
  const { scaled } = useTextSize();
  const { colors } = useTheme();
  const { isDownloaded, isDownloading, startDownload, localUriFor } = useDownloads();

  const topic = meditationTopics.find((m) => m.id === id);

  const audioRef = React.useRef<AudioService | null>(null);
  const sliderWidth = React.useRef(0);
  const [status, setStatus] = React.useState<AudioStatus>({ isPlaying: false, positionMs: 0, durationMs: 0, isLoaded: false });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (topic?.audioUrl) {
      const audio = new AudioService();
      audioRef.current = audio;
      audio.onStatus(setStatus);
      setLoading(true);
      setError(null);
      
      const loadAudio = async () => {
        try {
          const local = localUriFor(topic.id);
          if (local) {
            await audio.load({ localUri: local });
          } else {
            await audio.load({ url: topic.audioUrl });
            if (!isDownloaded(topic.id) && !isDownloading(topic.id)) {
              startDownload({
                id: topic.id,
                titleSi: topic.titleSi,
                titleEn: topic.titleEn,
                url: topic.audioUrl
              }).catch(() => {});
            }
          }
        } catch {
          setError(isSinhala ? 'ශ්‍රව්‍ය ගොනුව පූරණය කිරීමට නොහැකි විය' : 'Unable to load audio');
        } finally {
          setLoading(false);
        }
      };
      
      loadAudio();
      return () => audio.dispose();
    }
  }, [topic]);

  const handleSeek = (e: GestureResponderEvent) => {
    if (sliderWidth.current === 0 || status.durationMs === 0) return;
    const position = e.nativeEvent.locationX;
    const ratio = Math.max(0, Math.min(1, position / sliderWidth.current));
    audioRef.current?.seek(ratio * status.durationMs);
  };

  if (!topic) return <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: colors.primary }}>Not found</Text></View>;

  const title = localizedText(topic.titleSi, topic.titleEn, locale);
  const desc = localizedText(topic.descriptionSi, topic.descriptionEn, locale);
  const progress = status.durationMs > 0 ? (status.positionMs / status.durationMs) * 100 : 0;

  return (
    <>
      <Stack.Screen options={{ title }} />
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={styles.content}>
        <View style={styles.iconCircle}><Text style={{ fontSize: 48 }}>🧘</Text></View>
        <Text style={{ fontSize: scaled(20), fontWeight: '600', color: colors.primary, textAlign: 'center', marginTop: 24 }}>{title}</Text>

        {topic.audioUrl && (
          <View style={[styles.audioControl, { backgroundColor: colors.subtle, borderColor: colors.divider, width: '100%', maxWidth: 500, alignSelf: 'center' }]}>
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

        {desc ? (
          <View style={{ padding: 20, marginTop: 24, alignSelf: 'stretch' }}>
            <Text style={{ fontSize: scaled(15), color: colors.softWhite, lineHeight: scaled(26) }}>{desc}</Text>
            {topic.category === 'guide' && (
              <View style={{ marginTop: 24 }}>
                <Text style={{ fontSize: scaled(13), color: colors.primary, fontStyle: 'italic', textAlign: 'right', marginBottom: 12 }}>
                  {isSinhala ? 'පූජ්‍ය කිරිබත්ගොඩ ඤාණානන්ද ස්වාමීන් වහන්සේ විසිනි' : 'By Ven. Kiribathgoda Gnanananda Thero'}
                </Text>
                {topic.audioUrl && (
                  <Text style={{ fontSize: scaled(13), color: colors.softWhite, opacity: 0.8, fontStyle: 'italic', textAlign: 'center', marginTop: 8 }}>
                    {isSinhala ? 'තවත් සම්පූර්ණ විස්තර සඳහා ඉහත ඇති ශ්‍රව්‍ය දේශනය ශ්‍රවණය කරන්න.' : 'For full details, please listen to the audio recording above.'}
                  </Text>
                )}
              </View>
            )}
          </View>
        ) : null}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: { padding: 24, alignItems: 'center' },
  iconCircle: { width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,215,0,0.1)', justifyContent: 'center', alignItems: 'center' },
  audioControl: { 
    marginTop: 24, 
    padding: 12, 
    borderRadius: 12, 
    borderWidth: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  sliderContainer: { height: 40, justifyContent: 'center', marginBottom: 8 },
  sliderTrack: { height: 4, borderRadius: 2 },
  sliderFill: { height: '100%', borderRadius: 2 },
  audioMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  playBtnSmall: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 8 },
});
