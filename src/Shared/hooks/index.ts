import { useState } from "react";

export const useLocalStorage = (key: string, defaultValue?: unknown) => {
  const value = localStorage.getItem(key);

  if (!value) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }

  const [localStorageValue, setLocalStorageValue] = useState(() => {
    return value ? JSON.parse(value) : defaultValue;
  });

  const setLocalStorageStateValue = (value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
    setLocalStorageValue(value);
  };

  return [localStorageValue, setLocalStorageStateValue];
};
