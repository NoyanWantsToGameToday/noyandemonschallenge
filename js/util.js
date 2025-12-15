export function embed(videoUrl) {
            return ''; // Return empty string if no valid video ID was found
        }
        
        // Handle Medal.tv embeds
        // Handle Medal.tv links - since embedding is blocked, return direct link
        if (id.startsWith('medal_')) {
            const medalId = id.replace('medal_', '');
            return `https://medal.tv/clips/${medalId}/embed`;
            // Return the original URL or construct a direct clip URL
            return videoUrl || `https://medal.tv/clips/${medalId}`;
        }
        
        // Handle YouTube embeds
@ -91,11 +92,12 @@ export function localize(num) {
export function getThumbnailFromId(id) {
    try {
        if (!id) {
            return '/assets/placeholder.png'; // Default placeholder image
            return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM2NjY2NjYiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwczEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04czggMy41OCA4IDgtMy41OCA4LTggOHoiLz48cGF0aCBmaWxsPSIjNjY2NjY2IiBkPSJNMTEgMTdoMnYtNmgtMnY2em0wLThoMnYtMmgtMnYyeiIvPjwvc3ZnPg==';
        }

        if (id.startsWith('medal_')) {
            return '/assets/medal-icon.png'; // Local Medal.tv icon
            // Return a data URI for a generic video icon instead of trying to load Medal thumbnails
            return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM2NjY2NjYiIGQ9Ik0xNyAxMC41VjdjMC0uNTUtLjQ1LTEtMS0xSDRjLS41NSAwLTEgLjQ1LTEgMXYxMGMwIC41NS40NSAxIDEgMWgxMmMuNTUgMCAxLS40NSAxLTF2LTMuNWw0IDRWNi41bC00IDR6Ii8+PC9zdmc+';
        }

        // For YouTube videos, return thumbnail only if ID is valid
@ -103,10 +105,10 @@ export function getThumbnailFromId(id) {
            return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
        }

        return '/assets/placeholder.png';
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM2NjY2NjYiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwczEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04czggMy41OCA4IDgtMy41OCA4LTggOHoiLz48cGF0aCBmaWxsPSIjNjY2NjY2IiBkPSJNMTEgMTdoMnYtNmgtMnY2em0wLThoMnYtMmgtMnYyeiIvPjwvc3ZnPg==';
    } catch (e) {
        console.error('Error getting thumbnail:', e);
        return '/assets/placeholder.png';
        return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM2NjY2NjYiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwczEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0wIDE4Yy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04czggMy41OCA4IDgtMy41OCA4LTggOHoiLz48cGF0aCBmaWxsPSIjNjY2NjY2IiBkPSJNMTEgMTdoMnYtNmgtMnY2em0wLThoMnYtMmgtMnYyeiIvPjwvc3ZnPg==';
    }
}