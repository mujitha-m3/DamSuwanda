import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useLanguage } from '../src/contexts/LanguageContext';
import { useDownloads } from '../src/contexts/DownloadContext';
import { Colors, Typography, Decorations } from '../src/theme';
import { localizedText } from '../src/types';

export default function DownloadsScreen() {
  const { locale, t } = useLanguage();
  const { downloads, deleteDownload } = useDownloads();

  const confirmDelete = (id: string) => {
    Alert.alert(t('delete'), t('delete_confirm'), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('yes'), style: 'destructive', onPress: () => deleteDownload(id) },
    ]);
  };

  return (
    <>
      <Stack.Screen options={{ title: t('downloads') }} />
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        {downloads.length === 0 ? (
          <View style={styles.empty}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>⬇️</Text>
            <Text style={Typography.bodyLarge}>{t('no_downloads')}</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{ padding: 16 }}
            data={downloads}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[Decorations.goldBorderCard, styles.card]}>
                <View style={{ flex: 1 }}>
                  <Text style={Typography.headingSmall}>{localizedText(item.titleSi, item.titleEn, locale)}</Text>
                  <Text style={[Typography.bodySmall, { marginTop: 4 }]}>
                    {(item.fileSizeBytes / 1024 / 1024).toFixed(1)} MB
                  </Text>
                </View>
                <TouchableOpacity onPress={() => confirmDelete(item.id)}>
                  <Text style={{ fontSize: 20, color: '#FF4444' }}>🗑️</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { flexDirection: 'row', padding: 16, marginBottom: 12, alignItems: 'center' },
});
