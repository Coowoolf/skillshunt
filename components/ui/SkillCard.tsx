'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export interface Skill {
    id: string;
    name: string;
    slug: string;
    description: string;
    source: 'anthropic' | 'obra' | 'composio' | 'community' | 'nanobanana' | 'skillsmp' | 'skillsbench';
    category: string;
    tags: string[];
    platforms: string[];
    installCommand?: string;
    githubUrl?: string;
    upvotes: number;
    difficulty?: 'easy' | 'medium' | 'hard';
}

interface SkillCardProps {
    skill: Skill;
}

const sourceColors: Record<string, string> = {
    anthropic: 'gradient-blue',
    obra: 'gradient-purple',
    composio: 'gradient-pink',
    community: 'gradient-orange',
    nanobanana: 'gradient-orange',
    skillsmp: 'gradient-blue',
    skillsbench: 'gradient-purple',
};

const sourceIcons: Record<string, string> = {
    anthropic: '🤖',
    obra: '⚡',
    composio: '🔗',
    community: '👥',
    nanobanana: '🍌',
    skillsmp: '📦',
    skillsbench: '📊',
};

const categoryIcons: Record<string, string> = {
    development: '💻',
    creative: '🎨',
    productivity: '📊',
    enterprise: '🏢',
    document: '📄',
    testing: '🧪',
    debugging: '🔍',
    collaboration: '🤝',
    meta: '⚙️',
    benchmark: '📈',
    default: '✨',
};

export function SkillCard({ skill }: SkillCardProps) {
    const [displayUpvotes, setDisplayUpvotes] = useState(skill.upvotes);
    const [hasVoted, setHasVoted] = useState(false);

    // Read vote state from localStorage on mount
    useEffect(() => {
        const votedSkills = JSON.parse(localStorage.getItem('skillshunt_votes') || '{}');
        if (votedSkills[skill.id]) {
            setHasVoted(true);
            setDisplayUpvotes(votedSkills[skill.id].count || skill.upvotes + 1);
        }
    }, [skill.id, skill.upvotes]);

    const gradientClass = sourceColors[skill.source] || 'gradient-blue';
    const sourceIcon = sourceIcons[skill.source] || '✨';
    const categoryIcon = categoryIcons[skill.category] || categoryIcons.default;

    return (
        <Link href={`/skills/${skill.slug}`} className="block">
            <div className="card cursor-pointer group">
                {/* Header */}
                <div className="skill-card-header">
                    <div className={`skill-icon ${gradientClass}`}>
                        {sourceIcon}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="heading-md text-[var(--text-primary)] truncate group-hover:text-[var(--blue-end)] transition-colors">
                            {skill.name}
                        </h3>
                        <div className="flex items-center gap-2 text-caption">
                            <span>{categoryIcon} {skill.category}</span>
                            <span>•</span>
                            <span className="capitalize">{skill.source}</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-body line-clamp-2 mb-4">
                    {skill.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {skill.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag">
                            {tag}
                        </span>
                    ))}
                    {skill.tags.length > 3 && (
                        <span className="tag tag-purple">+{skill.tags.length - 3}</span>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-[rgba(0,0,0,0.05)]">
                    <div className="flex items-center gap-1 text-caption">
                        {skill.platforms.slice(0, 2).map((platform) => (
                            <span
                                key={platform}
                                className="px-2 py-1 bg-[rgba(0,0,0,0.03)] rounded-lg text-xs"
                            >
                                {platform}
                            </span>
                        ))}
                    </div>
                    <div className={`flex items-center gap-1 text-caption ${hasVoted ? 'text-green-600 font-medium' : ''}`}>
                        <span className="text-lg">{hasVoted ? '✅' : '👍'}</span>
                        <span>{displayUpvotes}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
