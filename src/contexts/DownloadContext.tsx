import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { File, Directory, Paths } from 'expo-file-system';
import { DownloadedFile } from '../types';

const STORAGE_KEY = 'downloaded_files';

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
  deleteDownload: async () => {},
});

export function DownloadProvider({ children }: { children: React.ReactNode }) {
  const [downloads, setDownloads] = useState<DownloadedFile[]>([]);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed: DownloadedFile[] = JSON.parse(raw);
          const valid: DownloadedFile[] = [];
          for (const d of parsed) {
            try {
              const file = new File(d.localUri);
              if (file.exists) valid.push(d);
            } catch {}
          }
          setDownloads(valid);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(valid));
        }
      } catch {}
    })();
  }, []);

  const persist = useCallback(async (list: DownloadedFile[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
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
      const audioDir = new Directory(Paths.document, 'audio');
      if (!audioDir.exists) {
        audioDir.create();
      }
      const destFile = new File(audioDir, params.id + '.mp3');

      setProgress((prev) => ({ ...prev, [params.id]: 0 }));

      try {
        const downloadedFile = await File.downloadFileAsync(params.url, audioDir);
        const uri = downloadedFile.uri;

        const entry: DownloadedFile = {
          id: params.id,
          titleSi: params.titleSi,
          titleEn: params.titleEn,
          localUri: uri,
          originalUrl: params.url,
          fileSizeBytes: downloadedFile.size ?? 0,
          downloadedAt: new Date().toISOString(),
        };

        setDownloads((prev) => {
          const next = [...prev, entry];
          persist(next);
          return next;
        });
      } catch (error) {
        console.warn('Download failed', error);
      }

      setProgress((prev) => {
        const next = { ...prev };
        delete next[params.id];
        return next;
      });

      return destFile.uri;
    },
    [persist]
  );

  const deleteDownload = useCallback(
    async (id: string) => {
      const item = downloads.find((d) => d.id === id);
      if (item) {
        try {
          const file = new File(item.localUri);
          file.delete();
        } catch {}
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
