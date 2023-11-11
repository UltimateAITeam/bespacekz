function limitText(originalText: string, maxCharacters: number) {
    if (originalText.length > maxCharacters) {
        return originalText.slice(0, maxCharacters) + '...';
    } else {
        return originalText;
    }
}

export {
    limitText
}