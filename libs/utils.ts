import {useEffect, useState} from "react";

function limitText(originalText: string, maxCharacters: number) {
    if (originalText.length > maxCharacters) {
        return originalText.slice(0, maxCharacters) + '...';
    } else {
        return originalText;
    }
}

function currencyConverter(currency: string, amount: number) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    });

    return formatter.format(amount);
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
    currencyConverter,
    limitText,
    useFirstStepsLoading,
}