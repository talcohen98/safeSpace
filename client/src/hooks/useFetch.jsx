import { useEffect, useState } from "react";

// custom hook to fetch data from the server
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(response => {
                console.log("Response Status:", response.status); // Log response status
                if(response.status === 404){
                    throw Error('No data found')
                }
                if (!response.ok) {
                    throw Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched Data:", data); // Log the fetched data
                setIsLoading(false);
                setData(data);
                setError(null);
            })
            .catch(error => {
                console.error("Fetch Error:", error); // Log fetch error details
                setIsLoading(false);
                setError(error.message);
            });
    }, [url]);

    return { data, isLoading, error };
};

export default useFetch;
