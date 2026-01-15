'use client';

import { useState, useEffect } from 'react';

interface CopyButtonProps {
    text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            className="btn-secondary mt-4"
            onClick={handleCopy}
        >
            {copied ? '✓ Copied!' : 'Copy Command'}
        </button>
    );
}

interface UpvoteButtonProps {
    skillId: string;
    initialCount: number;
}

export function UpvoteButton({ skillId, initialCount }: UpvoteButtonProps) {
    const [count, setCount] = useState(initialCount);
    const [hasVoted, setHasVoted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load vote state from localStorage on mount
    useEffect(() => {
        const votedSkills = JSON.parse(localStorage.getItem('skillshunt_votes') || '{}');
        if (votedSkills[skillId]) {
            setHasVoted(true);
            setCount(votedSkills[skillId].count || initialCount + 1);
        }
        setIsLoaded(true);
    }, [skillId, initialCount]);

    const handleUpvote = () => {
        if (hasVoted) {
            // Undo vote
            const votedSkills = JSON.parse(localStorage.getItem('skillshunt_votes') || '{}');
            delete votedSkills[skillId];
            localStorage.setItem('skillshunt_votes', JSON.stringify(votedSkills));
            setCount(initialCount);
            setHasVoted(false);
        } else {
            // Add vote
            const newCount = count + 1;
            const votedSkills = JSON.parse(localStorage.getItem('skillshunt_votes') || '{}');
            votedSkills[skillId] = { count: newCount, votedAt: Date.now() };
            localStorage.setItem('skillshunt_votes', JSON.stringify(votedSkills));
            setCount(newCount);
            setHasVoted(true);
        }
    };

    if (!isLoaded) {
        return (
            <button className="btn-primary w-full opacity-50" disabled>
                👍 Loading...
            </button>
        );
    }

    return (
        <button
            className={`btn-primary w-full transition-all ${hasVoted ? 'bg-gradient-to-r from-green-500 to-emerald-500' : ''}`}
            onClick={handleUpvote}
        >
            {hasVoted ? '✅ Upvoted' : '👍 Upvote'} ({count})
        </button>
    );
}

// Submit Skill Modal
interface SubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SubmitModal({ isOpen, onClose }: SubmitModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        githubUrl: '',
        category: 'development',
        email: '',
    });
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Store submission in localStorage for now
        const submissions = JSON.parse(localStorage.getItem('skillshunt_submissions') || '[]');
        submissions.push({
            ...formData,
            id: Date.now(),
            submittedAt: new Date().toISOString(),
        });
        localStorage.setItem('skillshunt_submissions', JSON.stringify(submissions));
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', description: '', githubUrl: '', category: 'development', email: '' });
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                    ✕
                </button>

                {submitted ? (
                    <div className="text-center py-8">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="heading-lg mb-2">Thanks for submitting!</h2>
                        <p className="text-body">We&apos;ll review your skill and get back to you soon.</p>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 gradient-orange rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                                🎯
                            </div>
                            <h2 className="heading-lg">Submit a Skill</h2>
                            <p className="text-body">Share your AI Agent Skill with the community</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Skill Name *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Database Migration Helper"
                                    className="search-input w-full"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Description *</label>
                                <textarea
                                    required
                                    rows={3}
                                    placeholder="What does your skill do?"
                                    className="search-input w-full resize-none"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">GitHub URL *</label>
                                <input
                                    type="url"
                                    required
                                    placeholder="https://github.com/..."
                                    className="search-input w-full"
                                    value={formData.githubUrl}
                                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Category</label>
                                <select
                                    className="search-input w-full"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="development">💻 Development</option>
                                    <option value="document">📄 Document</option>
                                    <option value="testing">🧪 Testing</option>
                                    <option value="creative">🎨 Creative</option>
                                    <option value="productivity">📊 Productivity</option>
                                    <option value="benchmark">📈 Benchmark</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Your Email *</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="search-input w-full"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="btn-primary w-full mt-6">
                                🚀 Submit Skill
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
