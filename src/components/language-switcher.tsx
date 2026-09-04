"use client";

import { Check, ChevronDown, Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { localeOptions, type Locale } from "@/lib/landing-copy";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  locale,
  label,
  onChange,
}: {
  locale: Locale;
  label: string;
  onChange: (locale: Locale) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentOption = localeOptions.find((option) => option.value === locale) ?? localeOptions[0];

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-gray-300 px-3 text-xs text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
        aria-label={`${label}: ${currentOption.label}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="global-language-menu"
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <Languages size={15} strokeWidth={1.7} aria-hidden="true" />
        <span>{currentOption.value.toUpperCase()}</span>
        <ChevronDown
          size={14}
          strokeWidth={1.7}
          className={cn("transition-transform", open && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      {open && (
        <dialog
          id="global-language-menu"
          open
          aria-label={label}
          className="absolute top-full left-0 right-auto z-50 m-0 mt-2 w-80 max-w-[calc(100vw-2rem)] min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-gray-800 dark:bg-gray-950"
          onCancel={() => setOpen(false)}
        >
          <div className="px-3 pb-1 pt-2 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500">
            {label}
          </div>
          <div>
            {localeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={locale === option.value}
                className="flex w-full min-w-0 items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span className="min-w-0 flex-1 whitespace-normal break-words">{option.label}</span>
                {locale === option.value && <Check size={15} aria-hidden="true" />}
              </button>
            ))}
          </div>
        </dialog>
      )}
    </div>
  );
}
