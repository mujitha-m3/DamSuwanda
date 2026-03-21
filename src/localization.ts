// ── Localization for Dam Suwanda ──
// Supports Sinhala ('si') and English ('en')

const strings: Record<string, Record<string, string>> = {
  // ── App-wide ──
  app_name: { si: 'දම් සුවඳ', en: 'Dam Suvanda' },
  tagline: { si: 'දහමේ සුවඳ ඔබේ හදවතට', en: 'The Fragrance of Dhamma to your heart' },

  // ── Language selection ──
  select_language: { si: 'භාෂාව තෝරන්න', en: 'Select Language' },
  sinhala: { si: 'සිංහල', en: 'Sinhala' },
  english: { si: 'English', en: 'English' },

  // ── Home categories ──
  pirith: { si: 'පිරිත් සජ්ඣායනා', en: 'Pirith Chanting' },
  buddha_vandana: { si: 'බුද්ධ වන්දනා', en: 'Buddha Vandana' },
  devotional_vandana: { si: 'පින් මතුවෙන වන්දනා', en: 'Merit-Generating Vandana' },
  meditation: { si: 'සිතට සුව දෙන භාවනා', en: 'Soothing Meditation' },
  meditation_guidance: { si: 'භාවනා මාර්ගෝපදේශ', en: 'Meditation Guidance' },
  sajjayana: { si: 'සූත්‍ර දේශනා සජ්ඣායනා', en: 'Sutta Recitation' },
  dharma_sermons: { si: 'ධර්ම දේශනා', en: 'Dharma Sermons' },
  dharma_discussions: { si: 'ධර්ම සාකච්ඡා', en: 'Dharma Discussions' },
  sigithi_lowata: { si: 'සිඟිති ලොවට අමාවැස්ස', en: 'Children\'s Dhamma' },
  daily_quote: { si: 'අද ධර්ම වචනය', en: "Today's Dhamma Quote" },
  poya_calendar: { si: 'පෝය දින දර්ශනය', en: 'Poya Day Calendar' },
  downloads: { si: 'බාගැනීම්', en: 'Downloads' },
  settings: { si: 'සැකසුම්', en: 'Settings' },

  // ── Player ──
  play: { si: 'ධාවනය', en: 'Play' },
  pause: { si: 'නවතන්න', en: 'Pause' },
  download: { si: 'බාගන්න', en: 'Download' },
  favorite: { si: 'ප්‍රියතම', en: 'Favorite' },
  share: { si: 'බෙදාගන්න', en: 'Share' },
  chant_mode: { si: 'සජ්ඣායන ආකාරය', en: 'Chant Mode' },
  downloading: { si: 'බාගත වෙමින්...', en: 'Downloading...' },
  downloaded: { si: 'බාගත කර ඇත', en: 'Downloaded' },

  // ── Search ──
  search: { si: 'සෙවීම...', en: 'Search...' },
  no_results: { si: 'ප්‍රතිඵල හමු නොවීය', en: 'No results found' },

  // ── Vandana ──
  morning_vandana: { si: 'උදෑසන වන්දනා', en: 'Morning Vandana' },
  noon_vandana: { si: 'දහවල් වන්දනා', en: 'Noon Vandana' },
  evening_vandana: { si: 'සන්ධ්‍යා වන්දනා', en: 'Evening Vandana' },
  five_precepts: { si: 'පන්සිල්', en: 'Five Precepts' },

  // ── Meditation ──
  anapanasati: { si: 'ආනාපානසති භාවනාව', en: 'Anapanasati Meditation' },
  metta: { si: 'මෛත්‍රී භාවනාව', en: 'Metta Meditation' },
  beginner: { si: 'ආරම්භක භාවනා', en: 'Beginner Meditation' },
  start_meditation: { si: 'භාවනාව ආරම්භ කරන්න', en: 'Start Meditation' },
  stop: { si: 'නවතන්න', en: 'Stop' },
  minutes: { si: 'මිනිත්තු', en: 'Minutes' },

  // ── Poya ──
  upcoming_poya: { si: 'ලබන පෝය', en: 'Upcoming Poya' },

  // ── Downloads ──
  no_downloads: { si: 'බාගැනීම් නැත', en: 'No downloads yet' },
  delete: { si: 'මකන්න', en: 'Delete' },
  delete_confirm: { si: 'මෙම ගොනුව මකා දැමීමට අවශ්‍යද?', en: 'Delete this file?' },

  // ── Settings ──
  theme: { si: 'තේමාව', en: 'Theme' },
  change_language: { si: 'භාෂාව වෙනස් කරන්න', en: 'Change Language' },
  text_size: { si: 'අකුරු ප්‍රමාණය', en: 'Text Size' },
  notifications: { si: 'දැනුම්දීම්', en: 'Notifications' },
  about: { si: 'යෙදුම ගැන', en: 'About' },
  version: { si: 'අනුවාදය', en: 'Version' },

  // ── General ──
  ok: { si: 'හරි', en: 'OK' },
  cancel: { si: 'අවලංගු', en: 'Cancel' },
  yes: { si: 'ඔව්', en: 'Yes' },
  no: { si: 'නැත', en: 'No' },
  error: { si: 'දෝෂයකි', en: 'Error' },
  loading: { si: 'පූරණය වෙමින්...', en: 'Loading...' },
  retry: { si: 'නැවත උත්සාහ කරන්න', en: 'Retry' },
  offline: { si: 'අන්තර්ජාලය නැත', en: 'You are offline' },
};

export function t(key: string, locale: string): string {
  return strings[key]?.[locale] ?? strings[key]?.['en'] ?? key;
}

export default strings;
