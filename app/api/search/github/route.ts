import { NextRequest, NextResponse } from 'next/server';

// Transformed repo type for API response
interface TransformedRepo {
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

// Cache results for 1 hour
const cache = new Map<string, { data: TransformedRepo[], timestamp: number }>();
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    topics: string[];
    language: string;
    owner: {
        login: string;
        avatar_url: string;
    };
}

interface GitHubSearchResponse {
    total_count: number;
    items: GitHubRepo[];
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');

    if (!query || query.length < 2) {
        return NextResponse.json({ items: [], total_count: 0 });
    }

    const cacheKey = `${query}-${page}`;
    const cached = cache.get(cacheKey);

    // Return cached results if valid
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return NextResponse.json({
            items: cached.data,
            total_count: cached.data.length,
            cached: true
        });
    }

    try {
        // Search for skills/MCP related repos
        const searchQuery = encodeURIComponent(
            `${query} skill OR mcp OR claude OR agent in:name,description,topics`
        );

        const response = await fetch(
            `https://api.github.com/search/repositories?q=${searchQuery}&sort=stars&order=desc&per_page=15&page=${page}`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'SkillsHunt-App',
                    // Add token if available for higher rate limits
                    ...(process.env.GITHUB_TOKEN && {
                        'Authorization': `token ${process.env.GITHUB_TOKEN}`
                    })
                },
                next: { revalidate: 3600 } // Cache for 1 hour
            }
        );

        if (!response.ok) {
            if (response.status === 403) {
                return NextResponse.json(
                    { error: 'GitHub API rate limit exceeded', items: [] },
                    { status: 429 }
                );
            }
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const data: GitHubSearchResponse = await response.json();

        // Transform and filter results
        const items = data.items.map(repo => ({
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description || 'No description',
            url: repo.html_url,
            stars: repo.stargazers_count,
            topics: repo.topics || [],
            language: repo.language,
            owner: repo.owner.login,
            ownerAvatar: repo.owner.avatar_url,
        }));

        // Cache the results
        cache.set(cacheKey, { data: items, timestamp: Date.now() });

        return NextResponse.json({
            items,
            total_count: data.total_count,
            cached: false
        });

    } catch (error) {
        console.error('GitHub search error:', error);
        return NextResponse.json(
            { error: 'Failed to search GitHub', items: [] },
            { status: 500 }
        );
    }
}
