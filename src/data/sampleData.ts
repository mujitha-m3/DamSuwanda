import { Pirith, Vandana, DhammaQuote, PoyaDay, Sermon } from '../types';

export const samplePirithList: Pirith[] = [
  // ── පිරිත් පේ කිරීම (Pirith Pe Kirima) ──
  {
    id: 'pe_kirima_mahamevnawa',
    titleSi: 'පිරිත් පේ කිරීම - මහමෙව්නාවේ පාළි - සිංහල පිරිත් සජ්ඣායනය',
    titleEn: 'Pirith Pe Kirima - Mahamevnawa',
    group: 'pe_kirima',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/tb0yu577t9ektylxtya6f/01..mp3?rlkey=61v1zrhog1dpqvplwavrlz4qi&st=xx0e5q8v',
    lines: [],
  },

  // ── මහ පිරිත (Maha Piritha) ──
  {
    id: 'maha_piritha_mahamevnawa',
    titleSi: 'මහ පිරිත - මහමෙව්නාවේ පාළි - සිංහල පිරිත් සජ්ඣායනය',
    titleEn: 'Maha Piritha - Mahamevnawa',
    group: 'maha_piritha',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/qf30hg9ec8166krldacnb/02..mp3?rlkey=bp1hkl6t3j0644h6qs6ze5ile&st=3ibqg98w',
    lines: [],
  },

  // ── පළමුවෙනි බණවර (First Banavara) ──
  {
    id: 'khandha_piritha', titleSi: 'ඛන්ධ පිරිත', titleEn: 'Khandha Piritha', group: 'palamuveni_banavara',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/279n207b5bgz8so2mtig1/03..mp3?rlkey=nn57rbw135qz27ps5epwcdt0e&st=6mvmff0o', lines: [],
  },
  {
    id: 'mettanisamsa_sutta', titleSi: 'මෙත්තානිසංස සූත්‍රය', titleEn: 'Mettanisamsa Sutta', group: 'palamuveni_banavara',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/fksx035ow2bilp6radqfs/04..mp3?rlkey=q70pt7jw00rjsp4lvsjxtvw4d&st=apz0m7h4', lines: [],
  },
  {
    id: 'mora_piritha',
    titleSi: 'මෝර පිරිත', titleEn: 'Mora Piritha', group: 'palamuveni_banavara',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/fksx035ow2bilp6radqfs/04..mp3?rlkey=q70pt7jw00rjsp4lvsjxtvw4d&st=gql4gi7s',
    lines: [
      { timestampMs: 0, textSi: 'උදේතයං චක්ඛුමා ඒකරාජා\nහරිස්සවණ්ණෝ පඨවිප්පභාසෝ', textEn: 'Udetayam cakkhumā ekarājā\nHarissavaṇṇo paṭhavippabhāso' },
      { timestampMs: 8000, textSi: 'තං තං නමස්සාමි හරිස්සවණ්ණං පඨවිප්පභාසං\nතයජ්ජ ගුත්තා විහරේමු දිවසං', textEn: 'Tam tam namassāmi harissavaṇṇam paṭhavippabhāsam\nTayajja guttā viharemu divasam' },
      { timestampMs: 32000, textSi: 'යේ බ්‍රාහ්මණා වේදගූ සබ්බධම්මේ\nතේ මේ නමෝ තේ ච මං පාලයන්තූ', textEn: 'Ye brāhmaṇā vedagū sabbadhamme\nTe me namo te ca mam pālayantu' },
      { timestampMs: 40000, textSi: 'නමත්ථු බුද්ධානං නමත්ථු බෝධියා\nනමෝ විමුත්තානං නමෝ විමුත්තියා', textEn: 'Namatthu buddhānam namatthu bodhiyā\nNamo vimuttānam namo vimuttiyā' },
      { timestampMs: 72000, textSi: 'ඉමං සෝ පරිත්තං කත්වා මෝරෝ චරති ඒසනා', textEn: 'Imam so parittam katvā mōrō carati ēsanā' },
    ],
  },
  {
    id: 'chanda_piritha', titleSi: 'චන්ද පිරිත', titleEn: 'Chanda Piritha', group: 'palamuveni_banavara',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/d7ladbbd7w01bhe189452/06..mp3?rlkey=ye8z8iwvs5vmzsieiy14oxpnb&st=ktbq3ymu', lines: [],
  },
  {
    id: 'suriya_piritha', titleSi: 'සුරිය පිරිත', titleEn: 'Suriya Piritha', group: 'palamuveni_banavara',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/gjuhlcs7d9026w50vrq62/07..mp3?rlkey=cmno174x7qobs0bom1hntx9t9&st=3vhuiic9', lines: [],
  },
  {
    id: 'dhajagga_piritha', titleSi: 'ධජග්ග පිරිත', titleEn: 'Dhajagga Piritha', group: 'palamuveni_banavara',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/facvbtdfckayzh3717xaj/08..mp3?rlkey=z4y00x6opqm7d8zum1gmxdvw5&st=r9eo0970', lines: [],
  },

  // ── දෙවෙනි බණවර (Second Banavara) ──
  {
    id: 'maha_kassapatthera', titleSi: 'මහා කස්සපත්ථේර බොජ්ඣංග පිරිත', titleEn: 'Maha Kassapatthera Bojjhanga', group: 'deveni_banavara',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/l66knnddzfc9pxhg1zoc3/09..mp3?rlkey=057l7vywhkepyrgbgwrjyql2m&st=vztd5bba', lines: [],
  },
  {
    id: 'girimananda_sutta', titleSi: 'ගිරිමානන්ද සූත්‍රය', titleEn: 'Girimananda Sutta', group: 'deveni_banavara',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/us3apoqbdxeuemk9cr8mu/10..mp3?rlkey=z7pore45d74o6gcvakb0ruzns&st=kbzhn567', lines: [],
  },

  // ── දම්සක් දෙසුම (Damsak Desuma) ──
  {
    id: 'dhammacakkappavattana', titleSi: 'ධම්මචක්කප්පවත්තන සුත්තං - දම්සක් පැවතුම් සූත්රය', titleEn: 'Dhammacakkappavattana Sutta', group: 'damsak_desuma',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/eqhamhrh3j0l0dxo9ncdq/11..mp3?rlkey=92eklz9w4bxs0hthvkb3p7p6p&st=7jimxix2', lines: [],
  },
  {
    id: 'sacca_vibhanga', titleSi: 'සච්ච විභංග සූත්‍රය', titleEn: 'Sacca Vibhanga Sutta', group: 'damsak_desuma',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/g8fq86qau0fnbq1752uj0/12..mp3?rlkey=nxqi9q24uidelirobh07a2ntz&st=pdbgllbs', lines: [],
  },

  // ── අතිරේක දේශනා (Additional Discourses) ──
  {
    id: 'kasibharadvaja', titleSi: 'කසී භාරද්වාජ සූත්‍රය', titleEn: 'Kasibharadvaja Sutta', group: 'athireka',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/g5s4lz15itawd2rddxdmh/13..mp3?rlkey=foo02adrnxgu6tasxcimg8av9&st=lys0e5ef', lines: [],
  },
  {
    id: 'alavaka_sutta', titleSi: 'ආලවක සූත්‍රය', titleEn: 'Alavaka Sutta', group: 'athireka',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/wxo0wnjzzel1hs0qhqdee/13..mp3?rlkey=egv689rpm13clwliixyhiqcs4&st=jmg9zgs7', lines: [],
  },
  {
    id: 'vasala_sutta', titleSi: 'වසල සූත්‍රය', titleEn: 'Vasala Sutta', group: 'athireka',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/gyr0ouve0dbomsk42k7ae/14..mp3?rlkey=zxm7jxtmuotaqcibtqt6xq88c&st=nfbb1e79', lines: [],
  },

  // ── හමාර දේශනා (Concluding Discourses) ──
  {
    id: 'isigili', titleSi: 'ඉසිගිලි සූත්‍රය', titleEn: 'Isigili Sutta', group: 'hamara',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/o971plycn1peec89eo4cq/17..mp3?rlkey=v67w2seqo6lxo11q26tqcb81d&st=ekzd986a', lines: [],
  },
  {
    id: 'dhammacetiya', titleSi: 'ධම්මචේතිය සූත්‍රය', titleEn: 'Dhammacetiya Sutta', group: 'hamara',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/uotdwqtdkao7s1yn2mb9c/15..mp3?rlkey=olxjulgfrazvik097ewt3merj&st=mnfmqmuc', lines: [],
  },
  {
    id: 'atavisi', titleSi: 'අටවිසි පිරිත', titleEn: 'Atavisi Piritha', group: 'hamara',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/waej8j2lk9fik4jk9uxqa/16..mp3?rlkey=vgl9jdpqeyymddjgve1xl3eje&st=tjtnhcgl', lines: [],
  },
];

export const sampleVandanaList: Vandana[] = [
  // ── Udesana (Morning) ──
  {
    id: 'u_full_vandana_audio',
    titleSi: 'උදෑසන බුද්ධ වන්දනාව', titleEn: 'Complete Morning Buddha Vandana', category: 'udesana',
    audioUrl: 'https://dl.dropboxusercontent.com/scl/fi/wox126iv7deme37jovc1x/udesana-wandanawa.mp3?rlkey=lgo765kr1yzi5qd3hibm4sftm&st=3agucan5',
    textSi: 'මෙම ශ්‍රව්‍ය ගොනුව මඟින් සම්පූර්ණ උදෑසන බුද්ධ වන්දනාව ශ්‍රවණය කළ හැක. ප්ලේ බොත්තම ඔබා වන්දනාව ආරම්භ කරන්න.',
    textEn: 'Use this audio to listen to the complete morning Buddha Vandana. Tap the play button below to begin.',
  },
  // ── Dawal (Afternoon) ──
  {
    id: 'd_buddha_vandana', titleSi: 'බුද්ධ වන්දනාව', titleEn: 'Buddha Vandana', category: 'dawal',
    textSi: 'නමෝ තස්ස භගවතෝ අරහතෝ සම්මා සම්බුද්ධස්ස...', textEn: 'Namo Tassa Bhagavato...',
  },
  {
    id: 'd_ahara_puja', titleSi: 'ආහාර පූජාව', titleEn: 'Offering Food', category: 'dawal',
    textSi: 'අධිවාසෙතු නෝ භන්තේ භෝජනං පරිකප්පිතං...', textEn: 'Adhivāsetu no bhante bhojanaṃ parikappitaṃ...',
  },

  // ── Sawasa (Evening) ──
  {
    id: 's_buddha_vandana', titleSi: 'බුද්ධ වන්දනාව', titleEn: 'Buddha Vandana', category: 'sawasa',
    textSi: 'නමෝ තස්ස භගවතෝ...', textEn: 'Namo Tassa Bhagavato...',
  },
  {
    id: 's_gilanpasa', titleSi: 'ගිලන්පස පූජාව', titleEn: 'Offering Gilanpasa', category: 'sawasa',
    textSi: 'අධිවාසෙතු නෝ භන්තේ ගිලාන පච්චයං ඉමං...', textEn: 'Adhivāsetu no bhante gilāna paccayaṃ imaṃ...',
  },

  // ── Bodhi Pujawa ──
  {
    id: 'bodhi_vandana', titleSi: 'බෝධි වන්දනාව', titleEn: 'Bodhi Vandana', category: 'bodhi',
    textSi: 'යස්ස මූලේ නිසින්නෝව සබ්බාරි විජයං අකා\nපත්තෝ සබ්බඤ්ඤුතං සත්ථා වන්දේ තං බෝධි පාදපං.',
    textEn: 'Yassa mūle nisinnōva sabbāri vijayam akā\nPattō sabbaññutam satthā vande tam bōdhi pādapam.',
  },

  // ── Sathbudu Wandanawa ──
  {
    id: 'sathbudu_vandana', titleSi: 'සත්බුදු වන්දනාව', titleEn: 'Sathbudu Vandana', category: 'sathbudu',
    textSi: 'විපස්සිස්ස නමත්ථු චක්ඛුමන්තස්ස සිරිමතෝ\nසිඛිස්සපි නමත්ථු සබ්බභූතානුකම්පිනෝ...',
    textEn: 'Vipassissa namatthu cakkhumantassa sirimatō\nSikhissapi namatthu sabbabhūtānukampinō...',
  },
  {
    id: 'somawathi',
    titleSi: 'සෝමාවතී වන්දනාව',
    titleEn: 'Somawathi Vandana',
    category: 'devotional',
    textSi: 'සෝමාවතී චේතියේ වැඩ වසන බුදුරජාණන් වහන්සේට නමස්කාර කරමි.',
    textEn: 'I pay homage to the Buddha enshrined at the Somawathi Stupa.',
  },
  {
    id: 'sri_pada',
    titleSi: 'ශ්‍රී පාද වන්දනාව',
    titleEn: 'Sri Pada Vandana',
    category: 'devotional',
    textSi: 'සමන් දේවියන්ගේ ආරක්ෂාව ලබන ශ්‍රී පාදස්ථානයට නමස්කාර කරමි.',
    textEn: "I pay homage to the sacred Sri Pada (Adam's Peak).",
  },
  {
    id: 'kelaniya',
    titleSi: 'කැලණිය වන්දනාව',
    titleEn: 'Kelaniya Vandana',
    category: 'devotional',
    textSi: 'කැලණිය රජමහා විහාරයේ වැඩ වසන බුදුරජාණන් වහන්සේට නමස්කාර කරමි.',
    textEn: 'I pay homage to the Buddha enshrined at the Kelaniya Raja Maha Viharaya.',
  },
  {
    id: 'kataragama',
    titleSi: 'කතරගම වන්දනාව',
    titleEn: 'Kataragama Vandana',
    category: 'devotional',
    textSi: 'කතරගම පූජනීය ස්ථානයට නමස්කාර කරමි.',
    textEn: 'I pay homage to the sacred site of Kataragama.',
  },
];

export const sampleQuotes: DhammaQuote[] = [
  { si: 'සිත දමනය කිරීම යහපත් ය. දමනය කළ සිත සුව ගෙන දේ.', en: 'It is good to tame the mind, which is difficult to hold in and flighty. A tamed mind brings happiness.', srcSi: 'ධම්මපදය', srcEn: 'Dhammapada 35' },
  { si: 'ද්වේෂයෙන් ද්වේෂය කිසි කලෙක නොනිවෙයි. ද්වේෂය නිවන්නේ මෛත්‍රියෙනි.', en: 'Hatred is never appeased by hatred in this world. By non-hatred alone is hatred appeased.', srcSi: 'ධම්මපදය', srcEn: 'Dhammapada 5' },
  { si: 'සෑම දෙයක්ම අනිත්‍ය ය. නොපසුබට වීරියෙන් වෑයම් කරව්.', en: 'All conditioned things are impermanent. Work out your own salvation with diligence.', srcSi: 'මහා පරිනිබ්බාන සුත්තය', srcEn: 'Mahā Parinibbāna Sutta' },
  { si: 'සෞඛ්‍යයම පරම ලාභය, සතුටම පරම ධනය, විශ්වාසයම පරම ඥාතිය, නිර්වාණයම පරම සුඛය.', en: 'Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship. Nibbāna is the highest happiness.', srcSi: 'ධම්මපදය', srcEn: 'Dhammapada 204' },
  { si: 'ඔබ අන් අයට කරන සෑම යහපත් ක්‍රියාවක් ම ඔබ ඔබටම කරන ක්‍රියාවකි.', en: 'Every good deed you do for others is a deed you do for yourself.', srcSi: 'බුද්ධ වචනය', srcEn: "Buddha's Words" },
  { si: 'අතීතය අනුව නොයන්න, අනාගතය පිළිබඳව සිහින නොමවන්න, වර්තමාන මොහොතට සිත යොමු කරන්න.', en: 'Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.', srcSi: 'බුද්ධ දේශනාව', srcEn: "Buddha's Teaching" },
  { si: 'බිඳක් බිඳක් ලෙස වැටෙන දිය බින්දු ජල භාජනය පුරවාලයි. නුවණැත්තා සුළු සුළු යහපත් රැස් කර ගනී.', en: 'Drop by drop is the water pot filled. Likewise, the wise one, gathering it little by little, fills oneself with good.', srcSi: 'ධම්මපදය', srcEn: 'Dhammapada 122' },
];

export const samplePoyaDays: PoyaDay[] = [
  { date: '2026-01-13', nameSi: 'දුරුතු පෝය', nameEn: 'Duruthu Poya', significanceSi: 'බුදුරදුන්ගේ ලංකාවට ප්‍රථම පැමිණීම සිහිපත් කෙරේ.', significanceEn: 'Commemorates the first visit of the Buddha to Sri Lanka.' },
  { date: '2026-02-12', nameSi: 'නවම් පෝය', nameEn: 'Navam Poya', significanceSi: 'සංඝ සභාව පිහිටුවීම සහ බුදුරදුන් විසින් ප්‍රථම භික්ෂූන් 60 නමට ධර්ම ප්‍රචාරය සඳහා යැවීම.', significanceEn: 'Marks the establishment of the Sangha and the first 60 monks being sent to spread the Dhamma.' },
  { date: '2026-03-13', nameSi: 'මැදින් පෝය', nameEn: 'Medin Poya', significanceSi: 'බුදුරදුන් පියරජු බලන්නට කපිලවස්තුවට පැමිණීම.', significanceEn: "Commemorates the Buddha's visit to his father in Kapilavatthu." },
  { date: '2026-04-12', nameSi: 'බක් පෝය', nameEn: 'Bak Poya', significanceSi: 'බුදුරදුන්ගේ ලංකාවට දෙවන පැමිණීම.', significanceEn: 'Commemorates the second visit of the Buddha to Sri Lanka.' },
  { date: '2026-05-12', nameSi: 'වෙසක් පෝය', nameEn: 'Vesak Poya', significanceSi: 'බුදුරදුන්ගේ උපත, බුද්ධත්වය, සහ පරිනිර්වාණය යන ත්‍රිවිධ බෝධි පූජාව.', significanceEn: 'Celebrates the birth, enlightenment, and passing away of the Buddha.' },
  { date: '2026-06-10', nameSi: 'පොසොන් පෝය', nameEn: 'Poson Poya', significanceSi: 'මහින්ද හිමියන්ගේ ලංකාවට පැමිණීම සහ බුද්ධ ශාසනය ස්ථාපනය.', significanceEn: 'Marks the arrival of Arahat Mahinda and the establishment of Buddhism in Sri Lanka.' },
  { date: '2026-07-10', nameSi: 'ඇසළ පෝය', nameEn: 'Esala Poya', significanceSi: 'බුදුරදුන් විසින් ප්‍රථම ධර්ම දේශනාව වන ධම්මචක්කප්පවත්තන සූත්‍රය දේශනා කිරීම.', significanceEn: 'Commemorates the first sermon — the Dhammacakkappavattana Sutta.' },
  { date: '2026-08-08', nameSi: 'නිකිණි පෝය', nameEn: 'Nikini Poya', significanceSi: 'ප්‍රථම ධර්ම සංගායනාව පැවැත්වීම.', significanceEn: 'Marks the first Buddhist council (Dhamma Sangayana).' },
  { date: '2026-09-07', nameSi: 'බිනර පෝය', nameEn: 'Binara Poya', significanceSi: 'භික්ෂුණී ශාසනය ආරම්භ කිරීම.', significanceEn: 'Commemorates the establishment of the Bhikkhuni Order.' },
  { date: '2026-10-06', nameSi: 'වප් පෝය', nameEn: 'Vap Poya', significanceSi: 'බුදුරදුන්ගේ ලංකාවට තෙවන පැමිණීම.', significanceEn: 'Commemorates the third visit of the Buddha to Sri Lanka.' },
  { date: '2026-11-05', nameSi: 'ඉල් පෝය', nameEn: 'Il Poya', significanceSi: 'සංඝමිත්තා තෙරණිය ශ්‍රී මහා බෝධිය සමග ලංකාවට පැමිණීම.', significanceEn: 'Marks the arrival of Sanghamitta Theri with the sacred Bodhi Tree.' },
  { date: '2026-12-04', nameSi: 'උඳුවප් පෝය', nameEn: 'Unduvap Poya', significanceSi: 'ශ්‍රී මහා බෝධිය අනුරාධපුරයේ රෝපණය කිරීම.', significanceEn: 'Commemorates the planting of the Jaya Sri Maha Bodhi in Anuradhapura.' },
];

export const sampleSermons: Sermon[] = [
  { id: 'sermon_1', titleSi: 'සතර සතිපට්ඨානය', titleEn: 'The Four Foundations of Mindfulness', monkSi: 'මහාචාර්ය හිමි', monkEn: 'Venerable Teacher', topicSi: 'සති භාවනා', topicEn: 'Mindfulness Meditation', audioUrl: 'https://example.com/audio/sermon_1.mp3', durationMinutes: 45 },
  { id: 'sermon_2', titleSi: 'ආර්ය අෂ්ටාංගික මාර්ගය', titleEn: 'The Noble Eightfold Path', monkSi: 'ධම්මපාල හිමි', monkEn: 'Venerable Dhammapala', topicSi: 'මාර්ග ඵල', topicEn: 'Path and Fruition', audioUrl: 'https://example.com/audio/sermon_2.mp3', durationMinutes: 60 },
  { id: 'sermon_3', titleSi: 'චතුරාර්ය සත්‍යය', titleEn: 'The Four Noble Truths', monkSi: 'සීලානන්ද හිමි', monkEn: 'Venerable Silananda', topicSi: 'මූලික ධර්ම', topicEn: 'Fundamental Dhamma', audioUrl: 'https://example.com/audio/sermon_3.mp3', durationMinutes: 50 },
];
