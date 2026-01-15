'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { locales, languageNames, type Locale } from '@/i18n';

interface LanguageSwitcherProps {
    compact?: boolean;
}

export function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
    const currentLocale = useLocale() as Locale;
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLocaleChange = (locale: Locale) => {
        // Set cookie for locale preference
        document.cookie = `locale=${locale};path=/;max-age=31536000`;
        // Reload page to apply new locale
        window.location.reload();
    };

    // Popular languages to show first
    const popularLocales: Locale[] = ['en', 'zh', 'es', 'de', 'ja', 'ko', 'fr', 'pt', 'ru', 'ar', 'hi'];
    const otherLocales = locales.filter(l => !popularLocales.includes(l));

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white/80 transition-all text-sm shadow-sm"
            >
                <span className="text-lg">🌐</span>
                {!compact && <span>{languageNames[currentLocale]}</span>}
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 max-h-96 overflow-y-auto bg-white rounded-xl shadow-lg border border-gray-100 z-[300]">
                    {/* Popular Languages */}
                    <div className="p-2 border-b border-gray-100">
                        <div className="text-xs text-gray-400 px-2 py-1 uppercase tracking-wide">Popular</div>
                        <div className="grid grid-cols-2 gap-1">
                            {popularLocales.map((locale) => (
                                <button
                                    key={locale}
                                    onClick={() => handleLocaleChange(locale)}
                                    className={`px-3 py-2 text-left rounded-lg text-sm transition-colors ${locale === currentLocale
                                            ? 'bg-purple-100 text-purple-700 font-medium'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    {languageNames[locale]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Other Languages */}
                    <div className="p-2">
                        <div className="text-xs text-gray-400 px-2 py-1 uppercase tracking-wide">More Languages</div>
                        <div className="grid grid-cols-2 gap-1">
                            {otherLocales.map((locale) => (
                                <button
                                    key={locale}
                                    onClick={() => handleLocaleChange(locale)}
                                    className={`px-3 py-2 text-left rounded-lg text-sm transition-colors ${locale === currentLocale
                                            ? 'bg-purple-100 text-purple-700 font-medium'
                                            : 'hover:bg-gray-50'
                                        }`}
                                >
                                    {languageNames[locale]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
