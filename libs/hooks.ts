import {useEffect, useState} from "react";

function useFirstStepsLoading() {
    const [lotteries, setLotteries] = useState(false);

    useEffect(() => {
        fetch('/api/profile/completed')
            .then(response => setLotteries(response.ok))
    }, []);

    return lotteries;
}

export {
    useFirstStepsLoading
}