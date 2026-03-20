// ── TypeScript types for Dam Suwanda ──

export interface TimestampedLine {
  timestampMs: number;
  textSi: string;
  textEn: string;
}

export interface Pirith {
  id: string;
  titleSi: string;
  titleEn: string;
  descriptionSi?: string;
  descriptionEn?: string;
  audioUrl: string;
  imageUrl?: string;
  lines: TimestampedLine[];
}

export interface Vandana {
  id: string;
  titleSi: string;
  titleEn: string;
  textSi: string;
  textEn: string;
  audioUrl?: string;
  category: 'morning' | 'noon' | 'evening' | 'devotional';
}

export interface Sermon {
  id: string;
  titleSi: string;
  titleEn: string;
  monkSi?: string;
  monkEn?: string;
  topicSi?: string;
  topicEn?: string;
  audioUrl: string;
  videoUrl?: string;
  durationMinutes?: number;
}

export interface DhammaQuote {
  si: string;
  en: string;
  srcSi: string;
  srcEn: string;
}

export interface PoyaDay {
  date: string;
  nameSi: string;
  nameEn: string;
  significanceSi: string;
  significanceEn: string;
}

export interface MeditationTopic {
  id: string;
  titleSi: string;
  titleEn: string;
  descriptionSi: string;
  descriptionEn: string;
  audioUrl: string;
  category: string;
}

export interface DownloadedFile {
  id: string;
  titleSi: string;
  titleEn: string;
  localUri: string;
  originalUrl: string;
  fileSizeBytes: number;
  downloadedAt: string;
}

// ── Helper functions ──
export function localizedText(
  si: string | undefined,
  en: string | undefined,
  locale: string
): string {
  return locale === 'si' ? (si ?? en ?? '') : (en ?? '');
}
