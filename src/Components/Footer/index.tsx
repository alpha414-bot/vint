import React from 'react';

interface TermsPrivacyItemProps {
    title: string;
    content: React.ReactNode;
}

export const TermsPrivacyItem: React.FC<TermsPrivacyItemProps> = ({ title, content }) => {
    return (
        <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">{title}</h2>
            <div className="prose prose-blue max-w-none prose-headings:font-semibold prose-headings:text-gray-800 prose-h3:text-xl prose-p:text-gray-600 prose-a:text-emerald-600 prose-li:text-gray-600">
                {content}
            </div>
        </div>
    );
};

export default TermsPrivacyItem;
