// Gets the YouTube video's ID from the URL
// this is used to request a video's thumbnail from youtube's servers
// and embed a youtube video onto the site (verifications)
export function getYoutubeIdFromUrl(url) {
    // For more info, visit https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url.
    return url.match(
        /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/,
    )?.[1] ?? '';
}

// Extracts the start time (in seconds) from a YouTube URL
export function getStartTimeFromUrl(url) {
    // Look for t= or start= in the URL
    const match = url.match(/[?&](?:t|start)=(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
}

// Creates an embed for the YouTube video, with optional start time from URL
export function embed(video) {
    const id = getYoutubeIdFromUrl(video);
    const start = getStartTimeFromUrl(video);
    let url = `https://www.youtube.com/embed/${id}`;
    if (start > 0) {
        url += `?start=${start}`;
    }
    return url;
}

// Gets the thumbnail of the YoutTube video to display with the embed
export function getThumbnailFromId(id) {
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}