"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "nggalek.co-theme";
const DEFAULT_THEME: Theme = "dark";

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function subscribe(callback: () => void) {
  const handler = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function getSnapshot(): Theme {
  const storedTheme = localStorage.getItem(STORAGE_KEY);
  return isTheme(storedTheme) ? storedTheme : DEFAULT_THEME;
}

function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setTheme = useCallback((nextTheme: Theme) => {
    const previousTheme = getSnapshot();
    if (previousTheme === nextTheme) return;

    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: STORAGE_KEY,
        oldValue: previousTheme,
        newValue: nextTheme,
      }),
    );
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return [theme, setTheme] as const;
}

export function ThemeSync() {
  useTheme();
  return null;
}
