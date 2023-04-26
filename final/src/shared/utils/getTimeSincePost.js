const getTimeSincePost = (postTime) => {
    const timeNow = new Date();
    const diffTime = timeNow - new Date(postTime);

    const diffSeconds = Math.round(diffTime / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);
    const diffWeeks = Math.round(diffDays / 7);
    const diffYears = Math.round(diffDays / 365);

    if (diffSeconds < 60) {
        return `${diffSeconds}s`;
    } else if (diffMinutes < 60) {
        return `${diffMinutes}m`;
    } else if (diffHours < 24) {
        return `${diffHours}h`;
    } else if (diffDays < 7) {
        return `${diffDays}d`;
    } else if (diffWeeks < 52) {
        return `${diffWeeks}w`;
    } else if (diffYears < 10) {
        return `${diffYears}y`;
    } else {
        return `10y+`;
    }
}

export default getTimeSincePost;
