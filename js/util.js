// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
export function getVideoIdFromUrl(url = '') {
    if (!url) return null;

    try {
        // Check if it's a Medal.tv link
        const medalMatch = url.match(/medal\.tv\/(?:games\/[^\/]+\/)?clips\/([a-zA-Z0-9]+)/);
        if (medalMatch) {
            return `medal_${medalMatch[1]}`;
        }

        // YouTube links
        const ytMatch = url.match(
            /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|v\/|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
        );
        return ytMatch?.[1] || null;
    } catch (e) {
        console.error('Error parsing video URL:', e);
        return null;
    }
}

export function getStartTimeFromUrl(url) {
    // Extracts ?t= or &t= or ?start= or &start= from url
    const tMatch = url.match(/[?&]t=(\d+)/);
    const startMatch = url.match(/[?&]start=(\d+)/);
    if (tMatch) return Number(tMatch[1]);
    if (startMatch) return Number(startMatch[1]);
    return 0;
}

export function embed(videoUrl) {
    if (!videoUrl) {
        return ''; // Return empty string for null/undefined URLs
    }

    // Build embed url, with start time if present
    const id = getVideoIdFromUrl(videoUrl);
    
    if (!id) {
        return ''; // Return empty string if no valid video ID was found
    }
    
    // Handle Medal.tv embeds
    if (id.startsWith('medal_')) {
        const medalId = id.replace('medal_', '');
        return `https://medal.tv/clips/${medalId}/embed`;
    }
    
    // Handle YouTube embeds
    const start = getStartTimeFromUrl(videoUrl);
    let embedUrl = `https://www.youtube.com/embed/${id}`;
    if (start > 0) {
        embedUrl += `?start=${start}`;
    }
    return embedUrl;
}

export function localize(num) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 3 });
}

export function getThumbnailFromId(id) {
    try {
        if (!id) {
            return '/assets/placeholder.png'; // Default placeholder image
        }

        if (id.startsWith('medal_')) {
            return '/assets/medal-icon.png'; // Local Medal.tv icon
        }

        // For YouTube videos, return thumbnail only if ID is valid
        if (id.match(/^[a-zA-Z0-9_-]{11}$/)) {
            return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
        }

        return '/assets/placeholder.png';
    } catch (e) {
        console.error('Error getting thumbnail:', e);
        return '/assets/placeholder.png';
    }
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }

    return array;
}
