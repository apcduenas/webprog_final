import React, { useState, useEffect, useRef } from 'react';

const IntroVideo = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const containerRef = useRef(null);
    const videoRef = useRef(null);

    const handleSkip = () => {
        if (containerRef.current) {
            containerRef.current.style.transition = 'opacity 0.8s ease-out';
            containerRef.current.style.opacity = '0';
            setTimeout(() => {
                setIsVisible(false);
                onComplete();
            }, 800);
        }
    };

    useEffect(() => {
        // Autoplay handling
        if (videoRef.current) {
            videoRef.current.play().catch(console.error);
        }

        const handleKeyDown = (e) => {
            handleSkip();
        };

        document.addEventListener('keydown', handleKeyDown);

        // Default timeout
        const timeout = setTimeout(() => {
            handleSkip();
        }, 6000);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            clearTimeout(timeout);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            ref={containerRef}
            id="ghostRiderContainer"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 9998,
                backgroundColor: 'black',
                display: 'flex',
                cursor: 'pointer'
            }}
            onClick={handleSkip}
        >
            <video
                ref={videoRef}
                id="ghostRiderVid"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
                muted
                playsInline
                src={`${import.meta.env.BASE_URL}images/Intro.mp4`}

                onEnded={handleSkip}
            />
        </div>
    );
};

export default IntroVideo;
