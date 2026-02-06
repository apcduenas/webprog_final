import React, { useEffect, useState, useRef } from 'react';

const ThemeTransition = ({ targetTheme, onComplete }) => {
    const [visible, setVisible] = useState(true);
    const containerRef = useRef(null);

    const videoSrc = targetTheme === 'light' ? '/images/Effect.mp4' : '/images/GhostRiderVid.mp4';

    const handleSkip = () => {
        // Just callback, let React handle unmounting via state change in parent
        onComplete();
    };

    useEffect(() => {
        // Timeout fallback
        const timer = setTimeout(() => {
            handleSkip();
        }, 6000); // Original code used 6000ms (light/dark)

        const handleKeyDown = () => handleSkip();
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            id={targetTheme === 'light' ? 'lightModeAnimation' : 'darkModeAnimation'}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 10000,
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
            }}
            onClick={handleSkip}
        >
            <video
                src={videoSrc}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                autoPlay
                muted
                onEnded={handleSkip}
            />
        </div>
    );
};

export default ThemeTransition;
