import { Audio, AVPlaybackStatus, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';

export type AudioStatus = {
  isPlaying: boolean;
  positionMs: number;
  durationMs: number;
  isLoaded: boolean;
};

type StatusCallback = (status: AudioStatus) => void;

/**
 * Audio player service wrapping expo-av.
 * Replaces Flutter's AudioPlayerService (just_audio).
 */
export class AudioService {
  private sound: Audio.Sound | null = null;
  private listeners: StatusCallback[] = [];

  /** Subscribe to playback status updates */
  onStatus(cb: StatusCallback) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private emit(status: AudioStatus) {
    this.listeners.forEach((cb) => cb(status));
  }

  private handleStatus = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      this.emit({
        isPlaying: status.isPlaying,
        positionMs: status.positionMillis,
        durationMs: status.durationMillis ?? 0,
        isLoaded: true,
      });
    }
  };

  /** Load audio from URL or local URI */
  async load(source: { url?: string; localUri?: string }) {
    await this.unload();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      playThroughEarpieceAndroid: false,
    });

    const { sound } = await Audio.Sound.createAsync(
      source.localUri
        ? { uri: source.localUri }
        : { uri: source.url! },
      { shouldPlay: false, progressUpdateIntervalMillis: 250 },
      this.handleStatus
    );
    this.sound = sound;
  }

  async play() {
    await this.sound?.playAsync();
  }

  async pause() {
    await this.sound?.pauseAsync();
  }

  async stop() {
    await this.sound?.stopAsync();
  }

  async seek(positionMs: number) {
    await this.sound?.setPositionAsync(positionMs);
  }

  async unload() {
    if (this.sound) {
      try {
        await this.sound.unloadAsync();
      } catch {}
      this.sound = null;
    }
  }

  dispose() {
    this.unload();
    this.listeners = [];
  }
}
