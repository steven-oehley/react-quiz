import { useEffect, useState } from "react";

export function useFetchData(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Failed to fetch questions - problem loading data");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (url) {
      fetchData();
    }

    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
}
