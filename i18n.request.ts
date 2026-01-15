import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';
import { locales, defaultLocale, type Locale } from './i18n';

// Detect user's preferred locale from browser
function getPreferredLocale(acceptLanguage: string | null): Locale {
    if (!acceptLanguage) return defaultLocale;

    // Parse Accept-Language header
    const languages = acceptLanguage.split(',').map(lang => {
        const [code, q] = lang.trim().split(';q=');
        return {
            code: code.split('-')[0].toLowerCase(),
            quality: q ? parseFloat(q) : 1
        };
    }).sort((a, b) => b.quality - a.quality);

    // Find first matching locale
    for (const lang of languages) {
        if (locales.includes(lang.code as Locale)) {
            return lang.code as Locale;
        }
    }

    return defaultLocale;
}

export default getRequestConfig(async () => {
    // Try to get locale from cookie first
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get('locale')?.value as Locale | undefined;

    let locale: Locale = defaultLocale;

    if (localeCookie && locales.includes(localeCookie)) {
        locale = localeCookie;
    } else {
        // Fall back to Accept-Language header
        const headerStore = await headers();
        const acceptLanguage = headerStore.get('accept-language');
        locale = getPreferredLocale(acceptLanguage);
    }

    // Load messages, falling back to English for missing translations
    let messages;
    try {
        messages = (await import(`./messages/${locale}.json`)).default;
    } catch {
        // If translation file doesn't exist, use English
        messages = (await import('./messages/en.json')).default;
    }

    return {
        locale,
        messages
    };
});
