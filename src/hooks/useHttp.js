import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url, {
          //  if the method is not set, send GET
          method: requestConfig.method ? requestConfig.method : 'GET',
          // if the headers are not set, set it to an empty object
          headers: requestConfig.headers ? requestConfig.headers : {},
          // if the body is set, stringify it, if not set it to null
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return {
    // v.1
    // isLoading: isLoading,
    // error: error,
    // sendRequest: sendRequest

    // v.2 if the same name, we can simplify it with:
    isLoading,
    error,
    sendRequest
  }
};

export default useHttp;
