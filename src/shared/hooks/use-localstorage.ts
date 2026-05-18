import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    let storageValue;
    try {
      storageValue = JSON.parse(localStorage.getItem(key) ?? defaultValue);
    } catch {
      storageValue = defaultValue;
    }

    return storageValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
