import React from 'react';

export function Footer() {
    return (
        <footer className="mt-20 py-12 border-t border-[rgba(0,0,0,0.05)]">
            <div className="container-main">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo & Description */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 gradient-orange rounded-lg flex items-center justify-center text-white text-sm">
                            🎯
                        </div>
                        <div>
                            <h3 className="font-bold text-[var(--text-primary)]">SkillsHunt</h3>
                            <p className="text-xs text-[var(--text-muted)]">
                                Discover and share AI Agent Skills
                            </p>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[var(--blue-end)] transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://anthropic.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[var(--blue-end)] transition-colors"
                        >
                            Anthropic Skills
                        </a>
                        <a
                            href="https://github.com/obra/superpowers"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[var(--blue-end)] transition-colors"
                        >
                            Superpowers
                        </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-sm text-[var(--text-muted)]">
                        © 2026 SkillsHunt. Built with 🎯 using Next.js
                    </div>
                </div>
            </div>
        </footer>
    );
}
