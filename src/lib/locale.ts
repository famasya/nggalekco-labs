"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Locale } from "./landing-copy";

const STORAGE_KEY = "nggalek.co-locale";
const DEFAULT: Locale = "id";

function subscribe(callback: () => void) {
  const handler = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function getSnapshot() {
  return (localStorage.getItem(STORAGE_KEY) as Locale | null) ?? DEFAULT;
}

function getServerSnapshot() {
  return DEFAULT;
}

export function useLocale() {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setLocale = useCallback((next: Locale) => {
    const prev = localStorage.getItem(STORAGE_KEY) as Locale | null;
    localStorage.setItem(STORAGE_KEY, next);
    if (prev !== next) {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: STORAGE_KEY,
          oldValue: prev ?? undefined,
          newValue: next,
        }),
      );
    }
  }, []);
  return [locale, setLocale] as const;
}
