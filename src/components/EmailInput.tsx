import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface EmailInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  onChangeValue: (value: string) => void;
}

const DOMAINS = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com.br",
  "uol.com.br",
  "terra.com.br",
  "bol.com.br",
  "icloud.com",
];

export const EmailInput = ({ value, onChangeValue, className, ...props }: EmailInputProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!value.includes("@") || value.endsWith("@")) {
      const parts = value.split("@");
      if (parts.length === 2 && parts[1] === "" && value.endsWith("@")) {
        setSuggestions(DOMAINS.map(d => parts[0] + "@" + d));
      } else {
        setSuggestions([]);
      }
      return;
    }

    const [local, domain] = value.split("@");
    if (domain) {
      const filtered = DOMAINS.filter((d) => d.startsWith(domain))
        .map((d) => local + "@" + d);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      onChangeValue(suggestions[selectedIndex]);
      setSuggestions([]);
      setSelectedIndex(-1);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <Input
        type="email"
        value={value}
        onChange={(e) => {
          onChangeValue(e.target.value);
          setSelectedIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        className={cn(className)}
        autoComplete="off"
        spellCheck={false}

        {...props}
      />
      {suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              type="button"
              className={cn(
                "w-full text-left px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors",
                index === selectedIndex && "bg-accent text-accent-foreground"
              )}
              onClick={() => {
                onChangeValue(suggestion);
                setSuggestions([]);
                setSelectedIndex(-1);
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
