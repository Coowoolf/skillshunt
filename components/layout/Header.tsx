'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { SubmitModal } from '@/components/ui/InteractiveButtons';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

export function Header() {
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const t = useTranslations();

    return (
        <>
            <header className="header">
                <div className="container-main">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 gradient-orange rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                🎯
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-[var(--text-primary)]">
                                    SkillsHunt
                                </h1>
                                <p className="text-xs text-[var(--text-muted)]">
                                    {t('common.discoverSkills')}
                                </p>
                            </div>
                        </Link>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            <Link
                                href="/"
                                className="text-[var(--text-secondary)] hover:text-[var(--blue-end)] transition-colors font-medium"
                            >
                                {t('nav.explore')}
                            </Link>
                            <Link
                                href="/#categories"
                                className="text-[var(--text-secondary)] hover:text-[var(--blue-end)] transition-colors font-medium"
                            >
                                {t('nav.categories')}
                            </Link>
                            <Link
                                href="/#about"
                                className="text-[var(--text-secondary)] hover:text-[var(--blue-end)] transition-colors font-medium"
                            >
                                {t('nav.about')}
                            </Link>
                        </nav>

                        {/* CTA Button & Language Switcher */}
                        <div className="flex items-center gap-3">
                            <LanguageSwitcher compact />
                            <button
                                className="btn-primary hidden sm:block"
                                onClick={() => setIsSubmitModalOpen(true)}
                            >
                                {t('nav.submitSkill')}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Submit Modal */}
            <SubmitModal
                isOpen={isSubmitModalOpen}
                onClose={() => setIsSubmitModalOpen(false)}
            />
        </>
    );
}
