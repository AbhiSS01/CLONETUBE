export const formatViewCount = (viewCount) => {
    if (viewCount >= 1000000) {
        return `${(viewCount / 1000000).toFixed(1)}M`;
    }
    if (viewCount >= 1000) {
        return `${(viewCount / 1000).toFixed(1)}K`;
    }
    return viewCount;
}

export const formatTimeElapsed = (date) => {
    // If date is undefined or not a valid date, return empty string
    if (!date) return '';

    // If date is a string, convert it to a Date object
    const inputDate = date instanceof Date ? date : new Date(date);
    
    // If the date is invalid, return empty string
    if (isNaN(inputDate)) return '';

    const now = new Date();
    const diffMs = now - inputDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 30) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMinutes > 0) {
        return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else {
        return 'just now';
    }
};

export const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};