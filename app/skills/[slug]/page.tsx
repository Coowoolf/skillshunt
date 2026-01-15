import { notFound } from 'next/navigation';
import Link from 'next/link';
import { skills, getSkillBySlug } from '@/data/skills';
import { CopyButton, UpvoteButton } from '@/components/ui/InteractiveButtons';

// Generate static params for all skills
export async function generateStaticParams() {
    return skills.map((skill) => ({
        slug: skill.slug,
    }));
}

// Generate metadata for each skill page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const skill = getSkillBySlug(slug);

    if (!skill) {
        return {
            title: 'Skill Not Found - SkillsHunt',
        };
    }

    return {
        title: `${skill.name} - SkillsHunt`,
        description: skill.description,
        openGraph: {
            title: `${skill.name} - AI Agent Skill`,
            description: skill.description,
        },
    };
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

export default async function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const skill = getSkillBySlug(slug);

    if (!skill) {
        notFound();
    }

    const gradientClass = sourceColors[skill.source] || 'gradient-blue';
    const sourceIcon = sourceIcons[skill.source] || '✨';

    return (
        <div className="container-main py-12">
            {/* Back Link */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--blue-end)] transition-colors mb-8"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to All Skills
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {/* Header Card */}
                    <div className="card mb-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className={`skill-icon w-16 h-16 text-3xl ${gradientClass}`}>
                                {sourceIcon}
                            </div>
                            <div className="flex-1">
                                <h1 className="heading-lg mb-2">{skill.name}</h1>
                                <div className="flex items-center gap-3 text-caption">
                                    <span className="capitalize">{skill.source}</span>
                                    <span>•</span>
                                    <span>{skill.category}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <span>👍</span> {skill.upvotes} upvotes
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-body text-lg mb-6">{skill.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {skill.tags.map((tag) => (
                                <span key={tag} className="tag">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Installation */}
                    {skill.installCommand && (
                        <div className="card mb-8">
                            <h2 className="heading-md mb-4">📦 Installation</h2>
                            <div className="code-block">
                                <code>{skill.installCommand}</code>
                            </div>
                            <CopyButton text={skill.installCommand} />
                        </div>
                    )}

                    {/* About This Skill */}
                    <div className="card">
                        <h2 className="heading-md mb-4">📖 About This Skill</h2>
                        <div className="markdown-content">
                            <p>{skill.description}</p>

                            <h3>Features</h3>
                            <ul>
                                <li>Works with {skill.platforms.join(', ')}</li>
                                <li>Part of the {skill.source} skills collection</li>
                                <li>Category: {skill.category}</li>
                            </ul>

                            <h3>Getting Started</h3>
                            <p>
                                After installing the skill, simply mention it in your conversation or use the relevant command.
                                The AI will automatically apply the skill&apos;s instructions to help you complete your task.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    {/* Actions */}
                    <div className="card mb-6">
                        <h3 className="font-bold mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <UpvoteButton skillId={skill.id} initialCount={skill.upvotes} />
                            {skill.githubUrl && (
                                <a
                                    href={skill.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary w-full block text-center"
                                >
                                    View on GitHub
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Platforms */}
                    <div className="card mb-6">
                        <h3 className="font-bold mb-4">Supported Platforms</h3>
                        <div className="space-y-2">
                            {skill.platforms.map((platform) => (
                                <div
                                    key={platform}
                                    className="flex items-center gap-2 p-3 bg-[rgba(0,0,0,0.02)] rounded-xl"
                                >
                                    <span className="w-8 h-8 gradient-blue rounded-lg flex items-center justify-center text-white text-sm">
                                        {platform === 'claude-code' ? '💻' : platform === 'claude-ai' ? '🤖' : '⚡'}
                                    </span>
                                    <span className="font-medium capitalize">{platform.replace('-', ' ')}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Source Info */}
                    <div className="card">
                        <h3 className="font-bold mb-4">Source</h3>
                        <div className={`card-gradient ${gradientClass} p-4`}>
                            <div className="flex items-center gap-3 text-white">
                                <span className="text-3xl">{sourceIcon}</span>
                                <div>
                                    <div className="font-bold capitalize">{skill.source}</div>
                                    <div className="text-sm opacity-80">Skills Collection</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
