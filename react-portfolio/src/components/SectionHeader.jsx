import React from 'react';

const SectionHeader = ({ title }) => {
    return (
        <div className="flex items-center justify-center gap-4 mb-8 border-b-2 border-stone-800 pb-4">
            <i className="fas fa-fire text-2xl text-orange-700 animate-pulse"></i>
            <h2 className="text-3xl font-heading uppercase tracking-wider text-stone-900 m-0" style={{ fontFamily: 'var(--font-heading)' }}>
                {title}
            </h2>
            <i className="fas fa-fire text-2xl text-orange-700 animate-pulse"></i>
        </div>
    );
};

export default SectionHeader;
