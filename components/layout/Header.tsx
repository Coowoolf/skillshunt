'use client';

import React from 'react';
import Link from 'next/link';

export function Header() {
    return (
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
                                Discover AI Agent Skills
                            </p>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-[var(--text-secondary)] hover:text-[var(--blue-end)] transition-colors font-medium"
                        >
                            Explore
                        </Link>
                        <Link
                            href="#categories"
                            className="text-[var(--text-secondary)] hover:text-[var(--blue-end)] transition-colors font-medium"
                        >
                            Categories
                        </Link>
                        <Link
                            href="#about"
                            className="text-[var(--text-secondary)] hover:text-[var(--blue-end)] transition-colors font-medium"
                        >
                            About
                        </Link>
                    </nav>

                    {/* CTA Button */}
                    <div className="flex items-center gap-4">
                        <button className="btn-primary hidden sm:block">
                            Submit Skill
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
