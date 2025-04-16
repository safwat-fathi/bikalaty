"use client";

import { useState } from "react";

import { EmptyObject } from "@/types";

const useLocalStorage = <T = EmptyObject,>(key: string, initialValue: T) => {
  const readValue = () => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      throw new Error(`Error reading localStorage key "${key}": ${error}`);
    }
  };

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      throw new Error(`Error setting localStorage key "${key}": ${error}`);
    }
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
