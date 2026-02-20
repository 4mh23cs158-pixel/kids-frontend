import React from 'react';

/**
 * Temporary Markdown renderer fallback that uses plain text 
 * to avoid Vite build errors when react-markdown is missing.
 */
export const MarkdownRenderer = ({ content, className }) => {
    return (
        <div className={`prose-story ${className || ''}`} style={{ whiteSpace: 'pre-wrap' }}>
            {content}
        </div>
    );
};
