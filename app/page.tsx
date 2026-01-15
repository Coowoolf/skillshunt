'use client';

import { useState, useMemo } from 'react';
import { SkillCard } from '@/components/ui/SkillCard';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryFilter } from '@/components/ui/CategoryFilter';
import { skills, categories, getSkillsByCategory, searchSkills } from '@/data/skills';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState<'popular' | 'newest' | 'name'>('popular');

  // Dynamic category counts
  const categoriesWithCounts = useMemo(() => {
    return categories.map(cat => ({
      ...cat,
      count: cat.id === 'all' ? skills.length : skills.filter(s => s.category === cat.id).length
    }));
  }, []);

  const filteredSkills = useMemo(() => {
    let result = getSkillsByCategory(selectedCategory);
    if (searchQuery.trim()) {
      const searchResults = searchSkills(searchQuery);
      result = result.filter(skill => searchResults.includes(skill));
    }
    // Apply sorting
    switch (sortOrder) {
      case 'popular':
        result = [...result].sort((a, b) => b.upvotes - a.upvotes);
        break;
      case 'newest':
        // Sort by id (newer skills have later ids)
        result = [...result].sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return result;
  }, [searchQuery, selectedCategory, sortOrder]);

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
          categories={categoriesWithCounts}
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
                <select
                  className="bg-white border-none rounded-lg px-3 py-2 text-sm shadow-[var(--shadow-soft)] cursor-pointer"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'popular' | 'newest' | 'name')}
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest</option>
                  <option value="name">Name A-Z</option>
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

      {/* About Section */}
      <section id="about" className="mt-20 pt-12 border-t border-[rgba(0,0,0,0.05)]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-20 h-20 gradient-orange rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
            🎯
          </div>
          <h2 className="heading-lg mb-4">About SkillsHunt</h2>
          <p className="text-body text-lg mb-8">
            SkillsHunt is the <strong>Product Hunt for AI Agent Skills</strong>.
            We help developers discover, share, and explore the best skills for
            Claude Code, Codex, OpenCode, and other AI coding assistants.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="card text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-bold mb-2">Discover</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Find the perfect skill for your AI workflow from our curated collection.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-bold mb-2">Share</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Submit your own skills and grow with the community.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-3">📈</div>
              <h3 className="font-bold mb-2">Benchmark</h3>
              <p className="text-sm text-[var(--text-muted)]">
                Test agent capabilities with our curated benchmark tasks.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/Coowoolf/skillshunt"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              ⭐ Star on GitHub
            </a>
            <a
              href="https://skillsbench.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              📊 SkillsBench Partnership
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
