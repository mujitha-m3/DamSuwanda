import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import { DownloadedFile } from '../types';

const STORAGE_KEY = 'downloaded_files';
const AUDIO_DIR = FileSystem.documentDirectory + 'audio/';

interface DownloadContextType {
  downloads: DownloadedFile[];
  isDownloaded: (id: string) => boolean;
  isDownloading: (id: string) => boolean;
  getProgress: (id: string) => number | undefined;
  localUriFor: (id: string) => string | undefined;
  startDownload: (params: {
    id: string;
    titleSi: string;
    titleEn: string;
    url: string;
  }) => Promise<string>;
  deleteDownload: (id: string) => Promise<void>;
}

const DownloadContext = createContext<DownloadContextType>({
  downloads: [],
  isDownloaded: () => false,
  isDownloading: () => false,
  getProgress: () => undefined,
  localUriFor: () => undefined,
  startDownload: async () => '',
  deleteDownload: async () => { },
});

export function DownloadProvider({ children }: { children: React.ReactNode }) {
  const [downloads, setDownloads] = useState<DownloadedFile[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});

  // Ensure audio directory exists
  useEffect(() => {
    (async () => {
      try {
        const dirInfo = await FileSystem.getInfoAsync(AUDIO_DIR);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(AUDIO_DIR, { intermediates: true });
        }
      } catch { }

      // Load saved downloads
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed: DownloadedFile[] = JSON.parse(raw);
          const valid: DownloadedFile[] = [];
          for (const d of parsed) {
            try {
              const info = await FileSystem.getInfoAsync(d.localUri);
              if (info.exists) valid.push(d);
            } catch { }
          }
          setDownloads(valid);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
        }
      } catch { }
    })();
  }, []);

  const persist = useCallback(async (list: DownloadedFile[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch { }
  }, []);

  const isDownloaded = useCallback(
    (id: string) => downloads.some((d) => d.id === id),
    [downloads]
  );

  const isDownloading = useCallback(
    (id: string) => id in progress,
    [progress]
  );

  const getProgress = useCallback(
    (id: string) => progress[id],
    [progress]
  );

  const localUriFor = useCallback(
    (id: string) => downloads.find((d) => d.id === id)?.localUri,
    [downloads]
  );

  const startDownload = useCallback(
    async (params: { id: string; titleSi: string; titleEn: string; url: string }) => {
      const destUri = AUDIO_DIR + params.id + '.mp3';

      setProgress((prev) => ({ ...prev, [params.id]: 0 }));

      try {
        const downloadResumable = FileSystem.createDownloadResumable(
          params.url,
          destUri,
          {},
          (downloadProgress) => {
            const pct = downloadProgress.totalBytesExpectedToWrite > 0
              ? downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite
              : 0;
            setProgress((prev) => ({ ...prev, [params.id]: pct }));
          }
        );

        const result = await downloadResumable.downloadAsync();
        if (!result) throw new Error('Download failed');

        const fileInfo = await FileSystem.getInfoAsync(result.uri);

        const entry: DownloadedFile = {
          id: params.id,
          titleSi: params.titleSi,
          titleEn: params.titleEn,
          localUri: result.uri,
          originalUrl: params.url,
          fileSizeBytes: (fileInfo as any).size ?? 0,
          downloadedAt: new Date().toISOString(),
        };

        setDownloads((prev) => {
          const next = [...prev, entry];
          persist(next);
          return next;
        });

        return result.uri;
      } catch (error) {
        console.warn('Download failed', error);
        return '';
      } finally {
        setProgress((prev) => {
          const next = { ...prev };
          delete next[params.id];
          return next;
        });
      }
    },
    [persist]
  );

  const deleteDownload = useCallback(
    async (id: string) => {
      const item = downloads.find((d) => d.id === id);
      if (item) {
        try {
          await FileSystem.deleteAsync(item.localUri, { idempotent: true });
        } catch { }
      }
      setDownloads((prev) => {
        const next = prev.filter((d) => d.id !== id);
        persist(next);
        return next;
      });
    },
    [downloads, persist]
  );

  return (
    <DownloadContext.Provider
      value={{
        downloads,
        isDownloaded,
        isDownloading,
        getProgress,
        localUriFor,
        startDownload,
        deleteDownload,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
}

export function useDownloads() {
  return useContext(DownloadContext);
}
