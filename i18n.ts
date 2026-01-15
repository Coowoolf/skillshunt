// Shared i18n constants - can be imported anywhere

// Supported locales
export const locales = [
    'en', 'zh', 'es', 'de', 'ja', 'ko', 'fr', 'pt', 'ru', 'ar', 'hi',
    'id', 'vi', 'th', 'tr', 'it', 'pl', 'nl', 'uk', 'bn', 'ms',
    'ta', 'te', 'mr', 'gu', 'pa', 'ur', 'fa', 'sw', 'ro', 'cs',
    'el', 'hu', 'sv', 'he', 'da', 'fi', 'no', 'sk', 'bg', 'hr',
    'lt', 'lv', 'et', 'sl', 'ca', 'sr', 'fil', 'my', 'km'
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Language names for display
export const languageNames: Record<Locale, string> = {
    en: 'English',
    zh: '中文',
    es: 'Español',
    de: 'Deutsch',
    ja: '日本語',
    ko: '한국어',
    fr: 'Français',
    pt: 'Português',
    ru: 'Русский',
    ar: 'العربية',
    hi: 'हिन्दी',
    id: 'Indonesia',
    vi: 'Tiếng Việt',
    th: 'ไทย',
    tr: 'Türkçe',
    it: 'Italiano',
    pl: 'Polski',
    nl: 'Nederlands',
    uk: 'Українська',
    bn: 'বাংলা',
    ms: 'Bahasa Melayu',
    ta: 'தமிழ்',
    te: 'తెలుగు',
    mr: 'मराठी',
    gu: 'ગુજરાતી',
    pa: 'ਪੰਜਾਬੀ',
    ur: 'اردو',
    fa: 'فارسی',
    sw: 'Kiswahili',
    ro: 'Română',
    cs: 'Čeština',
    el: 'Ελληνικά',
    hu: 'Magyar',
    sv: 'Svenska',
    he: 'עברית',
    da: 'Dansk',
    fi: 'Suomi',
    no: 'Norsk',
    sk: 'Slovenčina',
    bg: 'Български',
    hr: 'Hrvatski',
    lt: 'Lietuvių',
    lv: 'Latviešu',
    et: 'Eesti',
    sl: 'Slovenščina',
    ca: 'Català',
    sr: 'Srpski',
    fil: 'Filipino',
    my: 'မြန်မာ',
    km: 'ខ្មែរ',
};

// RTL languages
export const rtlLocales: Locale[] = ['ar', 'he', 'ur', 'fa'];

export function isRtl(locale: Locale): boolean {
    return rtlLocales.includes(locale);
}
