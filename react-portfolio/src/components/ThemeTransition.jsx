import { useEffect, useRef, useCallback } from 'react';

const ThemeTransition = ({ targetTheme, onComplete, videoSrc, fadeOut = false, zIndex = 10000 }) => {

    const containerRef = useRef(null);

    const base = import.meta.env.BASE_URL;
    const finalVideoSrc = videoSrc || (targetTheme === 'light'
        ? `${base}images/Effect.mp4`
        : `${base}images/GhostRiderVid.mp4`);

    const handleSkip = useCallback(() => {
        if (fadeOut && containerRef.current) {
            containerRef.current.style.transition = 'opacity 0.8s ease-out';
            containerRef.current.style.opacity = '0';
            setTimeout(() => {
                onComplete();
            }, 800);
        } else {
            onComplete();
        }
    }, [fadeOut, onComplete]);

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
    }, [handleSkip]);

    return (
        <div
            ref={containerRef}
            id={targetTheme ? (targetTheme === 'light' ? 'lightModeAnimation' : 'darkModeAnimation') : 'introAnimation'}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: zIndex,
                backgroundColor: '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
            }}
            onClick={handleSkip}
        >
            <video
                src={finalVideoSrc}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                autoPlay
                muted
                playsInline
                onEnded={handleSkip}
            />
        </div>
    );
};

export default ThemeTransition;
