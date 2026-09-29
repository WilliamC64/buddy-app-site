// Buddy origins – where a buddy is from (their roots). Default: United States.
// Each origin maps to Web Speech language preferences used ONLY for the
// browser-speech fallback (real MP3 voices always play as recorded).
// langs: tried in order – regional English first, then the heritage language
// (an English line read by that voice gives an accented-English fallback).
// rate/pitch: small multipliers applied on top of the buddy's normal voice.
const origins = [
  { id: 'us', label: 'United States', demonym: 'American', langs: ['en-US'], rate: 1, pitch: 1, phrases: '' },
  { id: 'mexico', label: 'Mexico', demonym: 'Mexican', langs: ['es-MX', 'es-US', 'es-ES'], rate: 0.97, pitch: 1.02, phrases: 'Spanish' },
  { id: 'puerto-rico', label: 'Puerto Rico', demonym: 'Puerto Rican', langs: ['es-PR', 'es-US', 'es-MX', 'es-ES'], rate: 1.03, pitch: 1.03, phrases: 'Spanish' },
  { id: 'cuba', label: 'Cuba', demonym: 'Cuban', langs: ['es-CU', 'es-US', 'es-MX', 'es-ES'], rate: 1.04, pitch: 1.02, phrases: 'Spanish' },
  { id: 'dominican-republic', label: 'Dominican Republic', demonym: 'Dominican', langs: ['es-DO', 'es-US', 'es-MX', 'es-ES'], rate: 1.05, pitch: 1.03, phrases: 'Spanish' },
  { id: 'el-salvador', label: 'El Salvador / Central America', demonym: 'Central American', langs: ['es-SV', 'es-US', 'es-MX', 'es-ES'], rate: 0.98, pitch: 1.02, phrases: 'Spanish' },
  { id: 'colombia', label: 'Colombia', demonym: 'Colombian', langs: ['es-CO', 'es-US', 'es-MX', 'es-ES'], rate: 0.98, pitch: 1.03, phrases: 'Spanish' },
  { id: 'brazil', label: 'Brazil', demonym: 'Brazilian', langs: ['pt-BR', 'pt-PT'], rate: 1, pitch: 1.03, phrases: 'Portuguese' },
  { id: 'argentina', label: 'Argentina', demonym: 'Argentine', langs: ['es-AR', 'es-ES', 'es-MX'], rate: 0.98, pitch: 1.01, phrases: 'Spanish' },
  { id: 'jamaica', label: 'Jamaica', demonym: 'Jamaican', langs: ['en-JM', 'en-TT', 'en-GB'], rate: 0.96, pitch: 1.02, phrases: 'Jamaican Patois' },
  { id: 'haiti', label: 'Haiti', demonym: 'Haitian', langs: ['ht-HT', 'fr-HT', 'fr-FR', 'fr-CA'], rate: 0.97, pitch: 1.02, phrases: 'Haitian Creole' },
  { id: 'trinidad', label: 'Trinidad & Tobago', demonym: 'Trinidadian', langs: ['en-TT', 'en-JM', 'en-GB'], rate: 1.02, pitch: 1.04, phrases: 'Trini' },
  { id: 'canada', label: 'Canada', demonym: 'Canadian', langs: ['en-CA', 'en-US'], rate: 1, pitch: 1, phrases: '' },
  { id: 'ireland', label: 'Ireland', demonym: 'Irish', langs: ['en-IE', 'en-GB'], rate: 1.02, pitch: 1.03, phrases: 'Irish' },
  { id: 'england', label: 'United Kingdom – England', demonym: 'English', langs: ['en-GB'], rate: 0.98, pitch: 1, phrases: 'British' },
  { id: 'scotland', label: 'United Kingdom – Scotland', demonym: 'Scottish', langs: ['en-GB-scotland', 'en-GB'], rate: 0.98, pitch: 0.98, phrases: 'Scots' },
  { id: 'italy', label: 'Italy', demonym: 'Italian', langs: ['it-IT'], rate: 1.02, pitch: 1.04, phrases: 'Italian' },
  { id: 'germany', label: 'Germany', demonym: 'German', langs: ['de-DE', 'de-AT'], rate: 0.96, pitch: 0.97, phrases: 'German' },
  { id: 'france', label: 'France', demonym: 'French', langs: ['fr-FR', 'fr-CA'], rate: 0.98, pitch: 1.03, phrases: 'French' },
  { id: 'poland', label: 'Poland', demonym: 'Polish', langs: ['pl-PL'], rate: 0.97, pitch: 0.99, phrases: 'Polish' },
  { id: 'russia', label: 'Russia', demonym: 'Russian', langs: ['ru-RU'], rate: 0.95, pitch: 0.96, phrases: 'Russian' },
  { id: 'ukraine', label: 'Ukraine', demonym: 'Ukrainian', langs: ['uk-UA', 'ru-RU'], rate: 0.96, pitch: 0.98, phrases: 'Ukrainian' },
  { id: 'greece', label: 'Greece', demonym: 'Greek', langs: ['el-GR'], rate: 1, pitch: 1.01, phrases: 'Greek' },
  { id: 'portugal', label: 'Portugal', demonym: 'Portuguese', langs: ['pt-PT', 'pt-BR'], rate: 0.98, pitch: 1, phrases: 'Portuguese' },
  { id: 'nigeria', label: 'Nigeria', demonym: 'Nigerian', langs: ['en-NG', 'yo-NG', 'en-GB'], rate: 0.98, pitch: 1.01, phrases: 'Yoruba or Igbo' },
  { id: 'ghana', label: 'Ghana', demonym: 'Ghanaian', langs: ['en-GH', 'en-NG', 'en-GB'], rate: 0.97, pitch: 1.01, phrases: 'Twi' },
  { id: 'ethiopia', label: 'Ethiopia', demonym: 'Ethiopian', langs: ['am-ET', 'en-KE', 'en-GB'], rate: 0.95, pitch: 1, phrases: 'Amharic' },
  { id: 'kenya', label: 'Kenya', demonym: 'Kenyan', langs: ['en-KE', 'sw-KE', 'en-GB'], rate: 0.96, pitch: 1, phrases: 'Swahili' },
  { id: 'south-africa', label: 'South Africa', demonym: 'South African', langs: ['en-ZA', 'af-ZA', 'en-GB'], rate: 0.99, pitch: 1, phrases: 'Afrikaans or Zulu' },
  { id: 'egypt', label: 'Egypt', demonym: 'Egyptian', langs: ['ar-EG', 'ar-SA', 'ar'], rate: 0.97, pitch: 0.99, phrases: 'Arabic' },
  { id: 'lebanon', label: 'Lebanon', demonym: 'Lebanese', langs: ['ar-LB', 'ar-SA', 'ar', 'fr-FR'], rate: 0.99, pitch: 1.01, phrases: 'Arabic' },
  { id: 'iran', label: 'Iran', demonym: 'Iranian', langs: ['fa-IR'], rate: 0.96, pitch: 0.99, phrases: 'Farsi' },
  { id: 'turkey', label: 'Turkey', demonym: 'Turkish', langs: ['tr-TR'], rate: 0.98, pitch: 1, phrases: 'Turkish' },
  { id: 'india', label: 'India', demonym: 'Indian', langs: ['en-IN', 'hi-IN'], rate: 1.02, pitch: 1.03, phrases: 'Hindi' },
  { id: 'pakistan', label: 'Pakistan', demonym: 'Pakistani', langs: ['en-PK', 'en-IN', 'ur-PK', 'hi-IN'], rate: 1, pitch: 1.02, phrases: 'Urdu' },
  { id: 'bangladesh', label: 'Bangladesh', demonym: 'Bangladeshi', langs: ['en-BD', 'en-IN', 'bn-BD', 'bn-IN'], rate: 1, pitch: 1.02, phrases: 'Bengali' },
  { id: 'philippines', label: 'Philippines', demonym: 'Filipino', langs: ['en-PH', 'fil-PH', 'tl-PH'], rate: 1.02, pitch: 1.04, phrases: 'Tagalog' },
  { id: 'vietnam', label: 'Vietnam', demonym: 'Vietnamese', langs: ['vi-VN'], rate: 0.97, pitch: 1.03, phrases: 'Vietnamese' },
  { id: 'china', label: 'China', demonym: 'Chinese', langs: ['zh-CN', 'zh-TW', 'zh-HK'], rate: 0.96, pitch: 1.02, phrases: 'Mandarin' },
  { id: 'korea', label: 'Korea', demonym: 'Korean', langs: ['ko-KR'], rate: 0.98, pitch: 1.02, phrases: 'Korean' },
  { id: 'japan', label: 'Japan', demonym: 'Japanese', langs: ['ja-JP'], rate: 0.97, pitch: 1.03, phrases: 'Japanese' },
  { id: 'thailand', label: 'Thailand', demonym: 'Thai', langs: ['th-TH'], rate: 0.96, pitch: 1.04, phrases: 'Thai' },
  { id: 'indonesia', label: 'Indonesia', demonym: 'Indonesian', langs: ['id-ID'], rate: 0.97, pitch: 1.02, phrases: 'Indonesian' },
  { id: 'australia', label: 'Australia', demonym: 'Australian', langs: ['en-AU', 'en-NZ', 'en-GB'], rate: 1.02, pitch: 1.02, phrases: 'Aussie slang' },
  { id: 'new-zealand', label: 'New Zealand', demonym: 'New Zealander', langs: ['en-NZ', 'en-AU', 'en-GB'], rate: 1.01, pitch: 1.02, phrases: 'Kiwi slang' },
  { id: 'samoa', label: 'Samoa / Pacific Islands', demonym: 'Pacific Islander', langs: ['en-NZ', 'en-AU', 'en-US'], rate: 0.96, pitch: 1.01, phrases: 'Samoan' }
];

// Optional ethnic-background preferences. Stored as a preference only;
// never assigned to existing named characters.
const ethnicityOptions = [
  { id: 'black', label: 'Black / African American' },
  { id: 'hispanic', label: 'Hispanic / Latino' },
  { id: 'white', label: 'White / European' },
  { id: 'east-asian', label: 'East Asian' },
  { id: 'south-asian', label: 'South Asian' },
  { id: 'southeast-asian', label: 'Southeast Asian' },
  { id: 'mena', label: 'Middle Eastern / North African' },
  { id: 'indigenous', label: 'Native American / Indigenous' },
  { id: 'pacific-islander', label: 'Pacific Islander' },
  { id: 'caribbean', label: 'Caribbean' },
  { id: 'mixed', label: 'Mixed / Multiracial' }
];
