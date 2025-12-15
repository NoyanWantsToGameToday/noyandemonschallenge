// Returns an iframe embed URL, or null if embedding is not allowed
export function embed(videoUrl) {
    if (!videoUrl || typeof videoUrl !== 'string') return null;

    // Medal.tv — embedding is blocked
    if (videoUrl.includes('medal.tv')) {
        return null;
    }

    // YouTube
    const ytMatch = videoUrl.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (ytMatch) {
        return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    return null;
}

// Extracts a video ID from a URL
export function getVideoIdFromUrl(url) {
    if (!url || typeof url !== 'string') return null;

    // YouTube
    const ytMatch = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (ytMatch) {
        return ytMatch[1];
    }

    // Medal.tv
    const medalMatch = url.match(/medal\.tv\/clips\/([a-zA-Z0-9]+)/);
    if (medalMatch) {
        return `medal_${medalMatch[1]}`;
    }

    return null;
}

// Returns a thumbnail URL based on ID
export function getThumbnailFromId(id) {
    if (!id) {
        return '/assets/placeholder.png';
    }

    if (id.startsWith('medal_')) {
        return '/assets/medal-icon.png';
    }

    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}

// Fisher–Yates shuffle
export function shuffle(array) {
    if (!Array.isArray(array)) return [];

    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}
