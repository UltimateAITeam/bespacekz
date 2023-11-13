import {useEffect, useState} from "react";

function limitText(originalText: string, maxCharacters: number) {
    if (originalText.length > maxCharacters) {
        return originalText.slice(0, maxCharacters) + '...';
    } else {
        return originalText;
    }
}

function useFirstStepsLoading() {
    const [lotteries, setLotteries] = useState(false);

    useEffect(() => {
        fetch('/api/profile/completed')
            .then(response => setLotteries(response.ok))
    }, []);

    return lotteries;
}

export {
    limitText,
    useFirstStepsLoading,
}