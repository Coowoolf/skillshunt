'use client';

import React from 'react';

interface Category {
    id: string;
    name: string;
    icon: string;
    count?: number;
}

interface CategoryFilterProps {
    categories: Category[];
    selected: string;
    onChange: (categoryId: string) => void;
}

export function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
    // Get the 'all' category for count
    const allCategory = categories.find(c => c.id === 'all');
    const otherCategories = categories.filter(c => c.id !== 'all');

    return (
        <div className="flex flex-wrap gap-3">
            <button
                onClick={() => onChange('all')}
                className={`tag ${selected === 'all' ? 'gradient-blue text-white' : ''} cursor-pointer transition-all`}
            >
                ✨ All Skills
                {allCategory?.count !== undefined && (
                    <span className="ml-1 opacity-70">({allCategory.count})</span>
                )}
            </button>
            {otherCategories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onChange(category.id)}
                    className={`tag ${selected === category.id ? 'gradient-purple text-white' : ''} cursor-pointer transition-all`}
                >
                    {category.icon} {category.name}
                    {category.count !== undefined && (
                        <span className="ml-1 opacity-70">({category.count})</span>
                    )}
                </button>
            ))}
        </div>
    );
}
