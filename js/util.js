export function embed(videoUrl) {
    if (!videoUrl) return '';

    // Medal.tv
    if (videoUrl.includes('medal.tv')) {
        const match = videoUrl.match(/clips\/([a-zA-Z0-9]+)/);
        if (match) {
            return `https://medal.tv/clips/${match[1]}/embed`;
        }
        return videoUrl;
    }

    // YouTube
    const ytMatch = videoUrl.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (ytMatch) {
        return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    return '';
}

export function localize(num) {
    if (num === null || num === undefined || isNaN(num)) {
        return '0';
    }
    return Number(num).toLocaleString();
}

export function getThumbnailFromId(id) {
    if (!id) {
        return '/assets/placeholder.png';
    }

    if (id.startsWith('medal_')) {
        return '/assets/medal-icon.png';
    }

    // YouTube
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
}