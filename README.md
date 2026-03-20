# 🪷 Dam Suvanda (දම් සුවඳ)

**The Fragrance of Dhamma** — A Buddhist spiritual companion app built with React Native & Expo.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎵 **Pirith Chanting** | Listen to pirith suttas with synchronized Pali lyrics |
| 🛕 **Buddha Vandana** | Morning, noon & evening vandana texts |
| 🌸 **Merit-Generating Vandana** | Devotional vandana for sacred sites |
| 🧘 **Soothing Meditation** | Guided meditation with timer |
| 📖 **Meditation Guidance** | Step-by-step meditation instructions |
| 📜 **Sutta Recitation** | Sutta discourse chanting |
| 🎙️ **Dharma Sermons** | Audio dharma sermons |
| 💬 **Dharma Discussions** | Recorded dharma discussions |
| 🌙 **Children's Dhamma** | Buddhist teachings for children |
| 💭 **Daily Dhamma Quote** | Inspirational daily quote from Buddhist texts |
| 📅 **Poya Day Calendar** | Full-year poya calendar with significance |
| ⬇️ **Downloads** | Offline audio download manager |
| 🌐 **Bilingual** | Full Sinhala & English support |

## 🛠️ Tech Stack

- **Framework**: [Expo](https://expo.dev/) (SDK 54)
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **Audio**: expo-av
- **Storage**: AsyncStorage, expo-file-system
- **Fonts**: Noto Sans Sinhala

## 📁 Project Structure

```
DamSuwanda/
├── app/                    # Screens (file-based routing)
│   ├── _layout.tsx         # Root layout & providers
│   ├── index.tsx           # Splash screen
│   ├── home.tsx            # Main menu grid
│   ├── language-selection.tsx
│   ├── settings.tsx
│   ├── daily-quote.tsx
│   ├── poya-calendar.tsx
│   ├── sajjayana.tsx
│   ├── downloads.tsx
│   ├── sigithi-lowata.tsx
│   ├── pirith/             # Pirith screens
│   ├── dharma/             # Sermons & discussions
│   ├── meditation/         # Meditation screens
│   └── vandana/            # Vandana screens
├── src/
│   ├── contexts/           # React contexts (Language, Downloads, Favorites)
│   ├── data/               # Sample data & content
│   │   └── sampleData.ts   # All pirith, vandana, quotes, poya data
│   ├── services/           # Audio & download services
│   ├── localization.ts     # Sinhala/English translations
│   ├── theme.ts            # Colors, typography, decorations
│   └── types.ts            # TypeScript type definitions
├── assets/                 # Fonts, icons, splash images
├── app.json                # Expo configuration
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Expo Go](https://expo.dev/go) app on your phone

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start the dev server
npx expo start --clear
```

### Running on Device

1. Install **Expo Go** from the App Store / Play Store
2. Scan the QR code from the terminal
3. The app will load on your phone

### Running on Web

```bash
npx expo start --web
```

## 📝 Adding Content

### Add a New Pirith

Edit `src/data/sampleData.ts` and add to the `samplePirithList` array:

```typescript
{
  id: 'unique_id',
  titleSi: 'සිංහල නම',
  titleEn: 'English Name',
  descriptionSi: 'සිංහල විස්තරය',
  descriptionEn: 'English description',
  audioUrl: 'https://www.dropbox.com/...&dl=1',  // dl=1 for direct download
  lines: [
    { timestampMs: 0, textSi: 'පාලි', textEn: 'Pali text' },
  ],
},
```

> **Dropbox tip**: Change `dl=0` to `dl=1` at the end of the URL for direct audio playback.

### Add Translations

Edit `src/localization.ts`:

```typescript
my_key: { si: 'සිංහල', en: 'English' },
```

### Add a Menu Category

1. Add translation key in `src/localization.ts`
2. Add entry to `CATEGORIES` in `app/home.tsx`
3. Create a screen file in `app/` matching the route

## 📄 License

This project is for personal/educational use.

---

*සියලු සත්ත්වයෝ සුඛී හෝන්තු* — *May all beings be happy* 🙏
