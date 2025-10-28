// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
export function getVideoIdFromUrl(url = '') {
    if (!url) return null;

    try {
        // Convert blob URLs to regular URLs if needed
        if (url.startsWith('blob:')) {
            const blobUrl = new URL(url);
            url = blobUrl.pathname.substring(1); // Remove leading slash
        }

        // Check if it's a Medal.tv link
        const medalMatch = url.match(/medal\.tv\/(?:[a-z]{2}\/)?(?:games\/[^\/]+\/)?clips\/([a-zA-Z0-9]+)(?:\?|$)/);
        if (medalMatch) {
            return `medal_${medalMatch[1]}`;
        }

        // Handle YouTube video IDs directly (11 characters)
        if (url.match(/^[a-zA-Z0-9_-]{11}$/)) {
            return url;
        }

        // YouTube links
        const ytMatch = url.match(
            /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|v\/|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
        );
        
        // If no match but URL looks like a YouTube URL, try to extract ID from the pathname
        if (!ytMatch && url.includes('youtube.com')) {
            const paths = url.split('/').filter(Boolean);
            const possibleId = paths[paths.length - 1];
            if (possibleId && possibleId.match(/^[a-zA-Z0-9_-]{11}$/)) {
                return possibleId;
            }
        }

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
    try {
        if (!videoUrl) {
            console.warn('No video URL provided');
            return ''; // Return empty string for null/undefined URLs
        }

        // Build embed url, with start time if present
        const id = getVideoIdFromUrl(videoUrl);
        
        if (!id) {
            console.warn('Could not extract video ID from URL:', videoUrl);
            return ''; // Return empty string if no valid video ID was found
        }
        
        // Handle Medal.tv links - embedding is blocked by X-Frame-Options.
        // Return empty string so callers (components) can render a fallback
        // (for example: a link or button to open the clip in a new tab).
        if (id.startsWith('medal_')) {
            return '';
        }
        
        // Handle YouTube embeds
        const start = getStartTimeFromUrl(videoUrl);
        let embedUrl = `https://www.youtube.com/embed/${id}`;
        if (start > 0) {
            embedUrl += `?start=${start}`;
        }
        return embedUrl;
    } catch (e) {
        console.error('Error generating embed URL:', e);
        return '';
    }
}

export function localize(num) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 3 });
}

export function getThumbnailFromId(id) {
    try {
        if (!id) {
            return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM2NjY2NjYiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwczEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04czggMy41OCA4IDgtMy41OCA4LTggOHoiLz48cGF0aCBmaWxsPSIjNjY2NjY2IiBkPSJNMTEgMTdoMnYtNmgtMnY2em0wLThoMnYtMmgtMnYyeiIvPjwvc3ZnPg==';
        }

        if (id.startsWith('medal_')) {
            // Return a data URI for a generic video icon instead of trying to load Medal thumbnails
            return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM2NjY2NjYiIGQ9Ik0xNyAxMC41VjdjMC0uNTUtLjQ1LTEtMS0xSDRjLS41NSAwLTEgLjQ1LTEgMXYxMGMwIC41NS40NSAxIDEgMWgxMmMuNTUgMCAxLS40NSAxLTF2LTMuNWw0IDRWNi41bC00IDR6Ii8+PC9zdmc+';
        }

        // For YouTube videos, return thumbnail only if ID is valid
        if (id.match(/^[a-zA-Z0-9_-]{11}$/)) {
            return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
        }

        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM2NjY2NjYiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwczEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04czggMy41OCA4IDgtMy41OCA4LTggOHoiLz48cGF0aCBmaWxsPSIjNjY2NjY2IiBkPSJNMTEgMTdoMnYtNmgtMnY2em0wLThoMnYtMmgtMnYyeiIvPjwvc3ZnPg==';
    } catch (e) {
        console.error('Error getting thumbnail:', e);
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM2NjY2NjYiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwczEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04czggMy41OCA4IDgtMy41OCA4LTggOHoiLz48cGF0aCBmaWxsPSIjNjY2NjY2IiBkPSJNMTEgMTdoMnYtNmgtMnY2em0wLThoMnYtMmgtMnYyeiIvPjwvc3ZnPg==';
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
