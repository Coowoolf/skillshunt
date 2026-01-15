'use client';

import React from 'react';

interface GitHubResult {
    id: number;
    name: string;
    fullName: string;
    description: string;
    url: string;
    stars: number;
    topics: string[];
    language: string;
    owner: string;
    ownerAvatar: string;
}

interface GitHubResultCardProps {
    repo: GitHubResult;
}

export function GitHubResultCard({ repo }: GitHubResultCardProps) {
    return (
        <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white/60 rounded-xl border border-[rgba(0,0,0,0.05)] hover:shadow-md transition-all hover:border-[var(--purple-start)]"
        >
            <div className="flex items-start gap-3">
                <img
                    src={repo.ownerAvatar}
                    alt={repo.owner}
                    className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm text-[var(--text-primary)] truncate">
                            {repo.name}
                        </h4>
                        <span className="flex items-center gap-1 text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
                            ⭐ {repo.stars.toLocaleString()}
                        </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-2">
                        {repo.description}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--text-muted)]">
                            {repo.owner}
                        </span>
                        {repo.language && (
                            <span className="text-xs px-2 py-0.5 bg-[rgba(0,0,0,0.05)] rounded">
                                {repo.language}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </a>
    );
}

interface GitHubResultsProps {
    query: string;
    results: GitHubResult[];
    loading: boolean;
    error: string | null;
}

export function GitHubResults({ query, results, loading, error }: GitHubResultsProps) {
    if (!query || query.length < 2) return null;

    return (
        <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🔍</span>
                <h3 className="font-semibold text-[var(--text-primary)]">
                    GitHub Discovery
                </h3>
                {loading && (
                    <span className="text-xs text-[var(--text-muted)]">Searching...</span>
                )}
                {!loading && results.length > 0 && (
                    <span className="text-xs text-[var(--text-muted)]">
                        ({results.length} found)
                    </span>
                )}
            </div>

            {error && (
                <div className="text-center py-4 text-sm text-red-500">
                    {error}
                </div>
            )}

            {loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="p-4 bg-white/40 rounded-xl animate-pulse">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200" />
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                    <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && results.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {results.slice(0, 6).map(repo => (
                        <GitHubResultCard key={repo.id} repo={repo} />
                    ))}
                </div>
            )}

            {!loading && results.length === 0 && query.length >= 2 && (
                <div className="text-center py-4 text-sm text-[var(--text-muted)]">
                    No GitHub results for &quot;{query}&quot;
                </div>
            )}

            {results.length > 6 && (
                <div className="text-center mt-4">
                    <a
                        href={`https://github.com/search?q=${encodeURIComponent(query + ' skill mcp claude agent')}&type=repositories&s=stars`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--purple-start)] hover:underline"
                    >
                        View more on GitHub →
                    </a>
                </div>
            )}
        </div>
    );
}
