import { useEffect, useState } from 'react';

const useLocalStorage = <T extends string | null>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item !== null) {
      setStoredValue(item as T);
    }
  }, [key]);

  const setValue = (value: T) => {
    setStoredValue(value);
    if (value === null) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, value);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
