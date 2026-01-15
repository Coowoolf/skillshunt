import { Skill } from '@/components/ui/SkillCard';

export const skills: Skill[] = [
    // Anthropic Skills
    {
        id: 'anthropic-pdf',
        name: 'PDF Processing',
        slug: 'pdf-processing',
        description: 'Extract text, forms, and structured data from PDF documents. Supports OCR for scanned documents and complex layouts.',
        source: 'anthropic',
        category: 'document',
        tags: ['PDF', 'OCR', 'extraction', 'forms'],
        platforms: ['claude-code', 'claude-ai'],
        installCommand: '/plugin install document-skills@anthropic-agent-skills',
        githubUrl: 'https://github.com/anthropics/skills/tree/main/skills/pdf',
        upvotes: 342,
    },
    {
        id: 'anthropic-docx',
        name: 'Word Document Editor',
        slug: 'word-document-editor',
        description: 'Create, edit, and format Microsoft Word documents. Supports templates, styles, tables, and image embedding.',
        source: 'anthropic',
        category: 'document',
        tags: ['Word', 'DOCX', 'formatting', 'templates'],
        platforms: ['claude-code', 'claude-ai'],
        installCommand: '/plugin install document-skills@anthropic-agent-skills',
        githubUrl: 'https://github.com/anthropics/skills/tree/main/skills/docx',
        upvotes: 289,
    },
    {
        id: 'anthropic-xlsx',
        name: 'Excel Spreadsheet',
        slug: 'excel-spreadsheet',
        description: 'Work with Excel spreadsheets. Create charts, formulas, pivot tables, and complex data analysis.',
        source: 'anthropic',
        category: 'document',
        tags: ['Excel', 'spreadsheet', 'charts', 'formulas'],
        platforms: ['claude-code', 'claude-ai'],
        installCommand: '/plugin install document-skills@anthropic-agent-skills',
        githubUrl: 'https://github.com/anthropics/skills/tree/main/skills/xlsx',
        upvotes: 256,
    },
    {
        id: 'anthropic-pptx',
        name: 'PowerPoint Creator',
        slug: 'powerpoint-creator',
        description: 'Design and generate professional PowerPoint presentations with custom themes, animations, and layouts.',
        source: 'anthropic',
        category: 'document',
        tags: ['PowerPoint', 'presentation', 'slides', 'design'],
        platforms: ['claude-code', 'claude-ai'],
        installCommand: '/plugin install document-skills@anthropic-agent-skills',
        githubUrl: 'https://github.com/anthropics/skills/tree/main/skills/pptx',
        upvotes: 234,
    },
    {
        id: 'anthropic-webapp-testing',
        name: 'Web App Testing',
        slug: 'webapp-testing',
        description: 'Automated testing for web applications using browser automation. Supports E2E tests, visual regression, and accessibility checks.',
        source: 'anthropic',
        category: 'testing',
        tags: ['testing', 'browser', 'e2e', 'automation'],
        platforms: ['claude-code'],
        installCommand: '/plugin install example-skills@anthropic-agent-skills',
        githubUrl: 'https://github.com/anthropics/skills/tree/main/skills/webapp-testing',
        upvotes: 198,
    },

    // Obra Superpowers Skills
    {
        id: 'obra-tdd',
        name: 'Test-Driven Development',
        slug: 'test-driven-development',
        description: 'Enforces RED-GREEN-REFACTOR cycle: write failing test, watch it fail, write minimal code, watch it pass, commit.',
        source: 'obra',
        category: 'development',
        tags: ['TDD', 'testing', 'red-green', 'refactor'],
        platforms: ['claude-code', 'codex', 'opencode'],
        installCommand: '/plugin install superpowers@superpowers-marketplace',
        githubUrl: 'https://github.com/obra/superpowers/tree/main/skills/test-driven-development',
        upvotes: 456,
    },
    {
        id: 'obra-brainstorming',
        name: 'Brainstorming',
        slug: 'brainstorming',
        description: 'Socratic design refinement through natural dialogue. Explores alternatives, presents designs in sections for validation.',
        source: 'obra',
        category: 'collaboration',
        tags: ['design', 'planning', 'socratic', 'dialogue'],
        platforms: ['claude-code', 'codex', 'opencode'],
        installCommand: '/plugin install superpowers@superpowers-marketplace',
        githubUrl: 'https://github.com/obra/superpowers/tree/main/skills/brainstorming',
        upvotes: 389,
    },
    {
        id: 'obra-systematic-debugging',
        name: 'Systematic Debugging',
        slug: 'systematic-debugging',
        description: '4-phase root cause process including root-cause-tracing, defense-in-depth, and condition-based-waiting techniques.',
        source: 'obra',
        category: 'debugging',
        tags: ['debugging', 'root-cause', 'systematic', 'tracing'],
        platforms: ['claude-code', 'codex', 'opencode'],
        installCommand: '/plugin install superpowers@superpowers-marketplace',
        githubUrl: 'https://github.com/obra/superpowers/tree/main/skills/systematic-debugging',
        upvotes: 367,
    },
    {
        id: 'obra-subagent',
        name: 'Subagent-Driven Development',
        slug: 'subagent-driven-development',
        description: 'Fast iteration with two-stage review: spec compliance check, then code quality review. Enables parallel agent workflows.',
        source: 'obra',
        category: 'development',
        tags: ['subagent', 'parallel', 'review', 'automation'],
        platforms: ['claude-code'],
        installCommand: '/plugin install superpowers@superpowers-marketplace',
        githubUrl: 'https://github.com/obra/superpowers/tree/main/skills/subagent-driven-development',
        upvotes: 312,
    },
    {
        id: 'obra-writing-plans',
        name: 'Writing Implementation Plans',
        slug: 'writing-plans',
        description: 'Creates detailed implementation plans with bite-sized tasks (2-5 minutes each). Every task has exact file paths and verification steps.',
        source: 'obra',
        category: 'collaboration',
        tags: ['planning', 'tasks', 'implementation', 'verification'],
        platforms: ['claude-code', 'codex', 'opencode'],
        installCommand: '/plugin install superpowers@superpowers-marketplace',
        githubUrl: 'https://github.com/obra/superpowers/tree/main/skills/writing-plans',
        upvotes: 298,
    },

    // Composio Skills
    {
        id: 'composio-mcp-builder',
        name: 'MCP Server Builder',
        slug: 'mcp-builder',
        description: 'Build Model Context Protocol (MCP) servers quickly. Generates boilerplate, handles tool registration, and testing.',
        source: 'composio',
        category: 'development',
        tags: ['MCP', 'server', 'protocol', 'tools'],
        platforms: ['claude-code'],
        installCommand: 'git clone https://github.com/composio/awesome-skills',
        githubUrl: 'https://github.com/composio/awesome-skills/tree/main/mcp-builder',
        upvotes: 234,
    },
    {
        id: 'composio-skill-creator',
        name: 'Skill Creator',
        slug: 'skill-creator',
        description: 'Meta-skill for creating new skills. Follows best practices, generates SKILL.md templates, and sets up testing.',
        source: 'composio',
        category: 'meta',
        tags: ['skills', 'meta', 'template', 'generator'],
        platforms: ['claude-code'],
        installCommand: 'git clone https://github.com/composio/awesome-skills',
        githubUrl: 'https://github.com/composio/awesome-skills/tree/main/skill-creator',
        upvotes: 178,
    },
    {
        id: 'composio-theme-factory',
        name: 'Theme Factory',
        slug: 'theme-factory',
        description: 'Generate beautiful, consistent UI themes. Supports dark mode, accessibility, and multiple color palettes.',
        source: 'composio',
        category: 'creative',
        tags: ['theme', 'UI', 'design', 'colors'],
        platforms: ['claude-code'],
        installCommand: 'git clone https://github.com/composio/awesome-skills',
        githubUrl: 'https://github.com/composio/awesome-skills/tree/main/theme-factory',
        upvotes: 156,
    },
    {
        id: 'composio-resume-generator',
        name: 'Tailored Resume Generator',
        slug: 'tailored-resume-generator',
        description: 'Create ATS-optimized resumes tailored to specific job descriptions. Supports multiple formats and styling.',
        source: 'composio',
        category: 'productivity',
        tags: ['resume', 'job', 'ATS', 'career'],
        platforms: ['claude-code', 'claude-ai'],
        installCommand: 'git clone https://github.com/composio/awesome-skills',
        githubUrl: 'https://github.com/composio/awesome-skills/tree/main/tailored-resume-generator',
        upvotes: 189,
    },

    // Community / NanoBanana
    {
        id: 'nanobanana-ppt',
        name: 'NanoBanana PPT Generator',
        slug: 'nanobanana-ppt-generator',
        description: 'AI-powered PPT image and video generation with intelligent transitions and interactive playback.',
        source: 'nanobanana',
        category: 'creative',
        tags: ['PPT', 'video', 'AI', 'animation'],
        platforms: ['claude-code'],
        installCommand: 'git clone https://github.com/op7418/NanoBanana-PPT-Skills',
        githubUrl: 'https://github.com/op7418/NanoBanana-PPT-Skills',
        upvotes: 267,
    },
];

export const categories = [
    { id: 'development', name: 'Development', icon: '💻', count: 4 },
    { id: 'document', name: 'Document', icon: '📄', count: 4 },
    { id: 'testing', name: 'Testing', icon: '🧪', count: 1 },
    { id: 'debugging', name: 'Debugging', icon: '🔍', count: 1 },
    { id: 'collaboration', name: 'Collaboration', icon: '🤝', count: 2 },
    { id: 'creative', name: 'Creative', icon: '🎨', count: 2 },
    { id: 'productivity', name: 'Productivity', icon: '📊', count: 1 },
    { id: 'meta', name: 'Meta', icon: '⚙️', count: 1 },
];

export function getSkillBySlug(slug: string): Skill | undefined {
    return skills.find(skill => skill.slug === slug);
}

export function getSkillsByCategory(categoryId: string): Skill[] {
    if (categoryId === 'all') return skills;
    return skills.filter(skill => skill.category === categoryId);
}

export function searchSkills(query: string): Skill[] {
    const lowerQuery = query.toLowerCase();
    return skills.filter(skill =>
        skill.name.toLowerCase().includes(lowerQuery) ||
        skill.description.toLowerCase().includes(lowerQuery) ||
        skill.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
}
