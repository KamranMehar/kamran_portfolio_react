// src/hooks/useIcon.js
import { useState } from "react";

/**
 * Custom hook for image fallback
 * If the given src fails, it replaces with a placeholder (or default icon).
 *
 * @param {string} initialSrc - main image url
 * @param {string} id - unique id for the image
 */
export const useIcon = (initialSrc, id) => {
    const [src, setSrc] = useState(initialSrc);

    const onError = () => {
        // you can put any local placeholder image here
        setSrc(`/fallback-icons/${id}.png`);
        // or just one universal fallback:
        // setSrc("/fallback-icons/default.png");
    };

    return { src, onError };
};
