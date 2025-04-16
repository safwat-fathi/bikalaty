"use client";

import { ChangeEvent, ComponentProps, KeyboardEventHandler, useEffect, useRef, useState } from "react";

import useLocalStorage from "@/lib/hooks/useLocalStorage";
import useOutsideClick from "@/lib/hooks/useOutsideClick";
import { useScopedI18n } from "@/locales/client";

import TextInput from "../TextInput";

type Props = ComponentProps<typeof TextInput> & {
  historyKey: string;
};

const Autocomplete = ({ historyKey, value, onChange, onKeyDown, ...props }: Props) => {
  const tGlobal = useScopedI18n("global");

  const inputRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState<string>((value as string) || "");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [history, setHistory] = useLocalStorage<string[] | null>(historyKey, null);

  useEffect(() => {
    if (isFocused && inputValue && history) {
      const filtered = history.filter((suggestion) => suggestion.toLowerCase().includes(inputValue.toLowerCase()));
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, isFocused]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (onChange) onChange(e);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);

    // Update history
    if (history) {
      if (!history.includes(suggestion)) {
        setHistory([suggestion, ...history]);
      }
    } else {
      setHistory([suggestion]);
    }

    setShowSuggestions(false);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      if (inputValue) {
        if (history) {
          if (!history.includes(inputValue)) {
            setHistory([inputValue, ...history]);
          }
        } else {
          setHistory([inputValue]);
        }
      }
      setShowSuggestions(false);
    }
    if (onKeyDown) onKeyDown(e);
  };

  useOutsideClick<HTMLDivElement | null>(inputRef, () => setShowSuggestions(false));

  return (
    <div className="relative w-full" ref={inputRef}>
      <TextInput
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        {...props}
      />

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 mx-0 mt-2 mb-0 max-h-60 w-full list-none overflow-auto rounded-md border border-gray-300 bg-white p-0 shadow-lg">
          <li className="pointer-events-none m-0 px-8 pt-4 text-xs text-neutral-400 italic select-none">
            {tGlobal("fromYourSearchHistory")}
          </li>

          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={`${suggestion}-${index}`}
              className="m-0 cursor-pointer px-8 py-2.5 hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
