import React, { useEffect, useRef } from 'react';
import './RippleCircle.css';

const RippleCircle = () => {
    const ringRef = useRef(null);

    useEffect(() => {
        let frameId;
        let start = performance.now();

        const animate = (now) => {
            const elapsed = (now - start) % 2000; // 2 s loop
            const progress = elapsed / 2000;

            // scale: 1 → 4   opacity: 0.6 → 0
            const scale = 1 + 3 * progress;
            const opacity = 0.6 * (1 - progress);

            if (ringRef.current) {
                ringRef.current.style.transform = `scale(${scale})`;
                ringRef.current.style.opacity = opacity;
            }

            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div className="ripple_wrapper">
            {/* animated ring */}
            <div className="ring" ref={ringRef} />
            {/* solid dot */}
            <div className="dot-ripple" />
        </div>
    );
};

export default RippleCircle;