export const getDateTimeReadable = (datetimeString) => {
    const date = new Date(datetimeString); // Create Date object from string

    if (isNaN(date)) {
        return "Invalid date"; // Handle invalid date
    }

    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    });

    return formattedDate;
};


export const getTimeAgo = (datetimeString) => {
    const date = new Date(datetimeString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (isNaN(seconds)) {
        return 'Invalid date';
    }

    let interval = Math.floor(seconds / 31536000); // years
    if (interval >= 1) {
        return interval + ' year(s) ago';
    }
    interval = Math.floor(seconds / 2592000); // months
    if (interval >= 1) {
        return interval + ' month(s) ago';
    }
    interval = Math.floor(seconds / 86400); // days
    if (interval >= 1) {
        return interval + ' day(s) ago';
    }
    interval = Math.floor(seconds / 3600); // hours
    if (interval >= 1) {
        return interval + ' hour(s) ago';
    }
    interval = Math.floor(seconds / 60); // minutes
    if (interval >= 1) {
        return interval + ' minute(s) ago';
    }
    return 'Just now';
}