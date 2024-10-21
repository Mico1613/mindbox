import { useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  defaultValue?: T,
): [
  localStorageValue: T | undefined,
  setLocalStorageStateValue: (value: T) => void,
] => {
  const value = localStorage.getItem(key);

  if (!value) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }

  const [localStorageValue, setLocalStorageValue] = useState<T | undefined>(
    value ? JSON.parse(value) : defaultValue,
  );

  const setLocalStorageStateValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setLocalStorageValue(value);
  };

  return [localStorageValue, setLocalStorageStateValue];
};
