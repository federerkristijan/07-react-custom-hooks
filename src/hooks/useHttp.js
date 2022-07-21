import { useState } from 'react';

const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url, {
          method: requestConfig.method,
          headers: requestConfig.headers,
          body: JSON.stringify(requestConfig.body)
        }
        // 'https://udemy-react-21466-default-rtdb.europe-west1.firebasedatabase.app/tasks.json'
      );

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data);


    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };

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
