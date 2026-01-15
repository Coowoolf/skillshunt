'use client';

import { useState, useMemo } from 'react';
import { SkillCard } from '@/components/ui/SkillCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryFilter } from '@/components/ui/CategoryFilter';
import { skills, categories, getSkillsByCategory, searchSkills } from '@/data/skills';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSkills = useMemo(() => {
    let result = getSkillsByCategory(selectedCategory);
    if (searchQuery.trim()) {
      const searchResults = searchSkills(searchQuery);
      result = result.filter(skill => searchResults.includes(skill));
    }
    return result;
  }, [searchQuery, selectedCategory]);

  const totalSkills = skills.length;

  return (
    <div className="container-main py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="heading-xl mb-4">
          Discover <span className="gradient-text-purple">AI Agent Skills</span>
        </h1>
        <p className="text-body text-lg max-w-2xl mx-auto mb-8">
          Explore {totalSkills}+ skills from Anthropic, Obra Superpowers, Composio, and the community.
          Find the perfect skill for your AI coding workflow.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search skills by name, description, or tags..."
          />
        </div>

        {/* Source Stats */}
        <div className="flex flex-wrap justify-center gap-4">
          <div className="card px-6 py-3 flex items-center gap-3">
            <span className="w-8 h-8 gradient-blue rounded-lg flex items-center justify-center text-white">🤖</span>
            <div className="text-left">
              <div className="font-bold text-[var(--text-primary)]">Anthropic</div>
              <div className="text-xs text-[var(--text-muted)]">Official Skills</div>
            </div>
          </div>
          <div className="card px-6 py-3 flex items-center gap-3">
            <span className="w-8 h-8 gradient-purple rounded-lg flex items-center justify-center text-white">⚡</span>
            <div className="text-left">
              <div className="font-bold text-[var(--text-primary)]">Superpowers</div>
              <div className="text-xs text-[var(--text-muted)]">Development Workflow</div>
            </div>
          </div>
          <div className="card px-6 py-3 flex items-center gap-3">
            <span className="w-8 h-8 gradient-pink rounded-lg flex items-center justify-center text-white">🔗</span>
            <div className="text-left">
              <div className="font-bold text-[var(--text-primary)]">Composio</div>
              <div className="text-xs text-[var(--text-muted)]">Awesome Skills</div>
            </div>
          </div>
          <div className="card px-6 py-3 flex items-center gap-3">
            <span className="w-8 h-8 gradient-orange rounded-lg flex items-center justify-center text-white">👥</span>
            <div className="text-left">
              <div className="font-bold text-[var(--text-primary)]">Community</div>
              <div className="text-xs text-[var(--text-muted)]">User Created</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section id="categories" className="mb-8">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </section>

      {/* Skills Grid */}
      <section>
        {filteredSkills.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-md">
                {selectedCategory === 'all' ? 'All Skills' : categories.find(c => c.id === selectedCategory)?.name}
                <span className="text-[var(--text-muted)] font-normal ml-2">
                  ({filteredSkills.length})
                </span>
              </h2>
              <div className="flex items-center gap-2 text-caption">
                <span>Sort by:</span>
                <select className="bg-white border-none rounded-lg px-3 py-2 text-sm shadow-[var(--shadow-soft)]">
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Name A-Z</option>
                </select>
              </div>
            </div>
            <div className="skills-grid">
              {filteredSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="heading-md mb-2">No skills found</h3>
            <p className="text-body">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
