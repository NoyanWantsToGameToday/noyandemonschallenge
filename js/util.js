// https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
export function getYoutubeIdFromUrl(url) {
    // Improved to reliably extract YouTube video IDs from various URL formats
    // Matches both regular videos and livestreams
    const match = url.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|v\/|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/
    );
    return match?.[1] ?? '';
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
    // Build embed url, with start time if present
    const id = getYoutubeIdFromUrl(videoUrl);
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
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
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
