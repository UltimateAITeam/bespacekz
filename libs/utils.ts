import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function limitText(originalText: string, maxCharacters: number) {
    if (originalText.length > maxCharacters) {
        return originalText.slice(0, maxCharacters) + '...';
    } else {
        return originalText;
    }
}

function formatDate(date: Date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}.${day}.${year}`;
}

function currencyConverter(currency: string, amount: number) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    });

    return formatter.format(amount);
}
function currencyConverterNumber(currency: string, amount: number) {
    const formatter = new Intl.NumberFormat('en-US');

    return formatter.format(amount);
}

function getRelativeTime(pastDate: Date): string {
    const now = new Date();
    const timeDifference = now.getTime() - pastDate.getTime(); // Difference in milliseconds

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    if (days > 0) {
        return rtf.format(-days, 'day');
    } else if (hours > 0) {
        return rtf.format(-hours, 'hour');
    } else if (minutes > 0) {
        return rtf.format(-minutes, 'minute');
    } else {
        return rtf.format(-seconds, 'second');
    }
}

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }

export {
    formatDate,
    getRelativeTime,
    currencyConverterNumber,
    currencyConverter,
    limitText,
    cn,
}