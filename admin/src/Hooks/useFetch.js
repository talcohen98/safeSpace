import { useState, useEffect } from 'react';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const abortController = new AbortController();

        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    signal: abortController.signal
                });

                if (!isMounted) return;

                if (response.status === 404) {
                    setData(null);
                    setError(null);
                    setIsLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                
                if (!isMounted) return;
                
                setData(result);
                setError(null);
                setIsLoading(false);

            } catch (error) {
                if (!isMounted) return;

                if (error.name === 'AbortError') {
                    console.log('Fetch aborted');
                    return;
                }

                setError(error.message);
                setData(null);
                setIsLoading(false);
            }
        };

        setIsLoading(true);
        fetchData();

        return () => {
            isMounted = false;
            abortController.abort();
        };

    }, [url]);

    return { data, isLoading, error };
};