import { useState, useEffect }
 from 'react';

// custom hook function MUST start with 'use' in its name!
const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        // forward counter
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        // backwardcounter
        setCounter((prevCounter) => prevCounter - 1);
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);

  return counter;
};

export default useCounter;
