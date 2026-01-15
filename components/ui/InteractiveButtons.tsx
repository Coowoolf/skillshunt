'use client';

import { useState } from 'react';

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
    initialCount: number;
}

export function UpvoteButton({ initialCount }: UpvoteButtonProps) {
    const [count, setCount] = useState(initialCount);
    const [hasVoted, setHasVoted] = useState(false);

    const handleUpvote = () => {
        if (!hasVoted) {
            setCount(count + 1);
            setHasVoted(true);
        }
    };

    return (
        <button
            className={`btn-primary w-full ${hasVoted ? 'opacity-80' : ''}`}
            onClick={handleUpvote}
        >
            👍 {hasVoted ? 'Upvoted' : 'Upvote'} ({count})
        </button>
    );
}
