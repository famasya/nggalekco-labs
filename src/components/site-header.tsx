"use client";

import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { Briefcase, Check, ChevronDown, Home, Languages, Menu, Users, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { localeOptions, translations, type Locale } from "@/lib/landing-copy";
import { useLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";

const sectionItems = [{ value: "home", icon: Home }] as const;

function SiteBrand({
  label,
  onClick,
}: {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      to="/"
      className="group inline-flex items-center gap-3"
      aria-label={label}
      onClick={onClick}
    >
      <span className="grid size-10 place-items-center">
        <img
          src="/logo-light.png?v=2"
          alt=""
          className="size-full object-contain"
          aria-hidden="true"
        />
      </span>
      <span className="text-md font-normal tracking-tight text-gray-900 dark:text-gray-100">
        nggalekco <span className="text-gray-500 dark:text-gray-400">labs</span>
      </span>
    </Link>
  );
}

function GlobalPreferencesDropdown({
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
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-300 px-3 text-xs text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
        aria-label={`${label}: ${currentOption.label}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="global-preferences-menu"
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
          id="global-preferences-menu"
          open
          aria-label={label}
          className="absolute top-full left-0 right-auto z-50 m-0 mt-2 w-80 max-w-[calc(100vw-2rem)] min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-gray-800 dark:bg-gray-950 md:left-auto md:right-0"
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

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocale] = useLocale();
  const [activeSection, setActiveSection] = useState<string>(sectionItems[0].value);
  const sectionTargetRef = useRef<string | null>(null);
  const text = translations[locale];
  const { pathname } = useLocation();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const isHome = pathname === "/";
  const isTeam = pathname === "/team";
  const isPortfolio = pathname === "/portofolios";

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const handleSection = (value: string) => {
    sectionTargetRef.current = value;
    setActiveSection(value);
    void router.navigate({ to: "/" });
  };

  useEffect(() => {
    if (!isHome) {
      return;
    }

    const sections = sectionItems
      .map(({ value }) => ({ value, element: document.getElementById(value) }))
      .filter(
        (
          section,
        ): section is {
          value: (typeof sectionItems)[number]["value"];
          element: HTMLElement;
        } => section.element !== null,
      );

    if (sections.length === 0) return;

    let frame = 0;
    const updateActiveSection = () => {
      if (frame !== 0) return;

      frame = requestAnimationFrame(() => {
        frame = 0;
        const readingLine = window.innerHeight * 0.35;
        let current = sections[0].value;

        for (const section of sections) {
          if (section.element.getBoundingClientRect().top <= readingLine) {
            current = section.value;
          }
        }

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1) {
          current = sections[sections.length - 1].value;
        }

        const sectionTarget = sectionTargetRef.current;
        if (sectionTarget) {
          if (current !== sectionTarget) {
            setActiveSection(sectionTarget);
            return;
          }
          sectionTargetRef.current = null;
        }

        setActiveSection(current);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [isHome]);

  const tabsValue = isHome ? activeSection : "";
  const activeNavigationTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 170, damping: 24, mass: 1.2 };

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-b from-white via-white to-transparent dark:from-black dark:via-black dark:to-transparent">
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto] items-center px-6 py-6 md:grid-cols-[1fr_auto_1fr] lg:px-10 lg:py-8">
        <SiteBrand
          label={text.brandHome}
          onClick={
            isHome
              ? (event) => {
                  event.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              : undefined
          }
        />
        <nav
          className="hidden items-center justify-self-center md:flex"
          aria-label={text.mainNavigationLabel}
        >
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/65 p-1.5 shadow-lg shadow-black/15 backdrop-blur-xl">
            <Tabs
              value={tabsValue}
              onValueChange={handleSection}
              variant="pill"
              layoutId="site-header-active-navigation"
              className="inline-block"
            >
              <TabsList className="gap-1.5 bg-transparent p-0">
                {sectionItems.map(({ value, icon: Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="min-h-11 px-5 py-2.5 font-normal text-white/70 hover:bg-white/10 hover:text-white data-[state=active]:text-gray-950"
                    indicatorClassName="bg-white shadow-md shadow-black/20"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                      {text.nav[value]}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Link
              to="/team"
              className={cn(
                "relative inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-normal transition-colors",
                isTeam ? "text-gray-950" : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              {isTeam && (
                <motion.span
                  layoutId="site-header-active-navigation"
                  layout="position"
                  style={{ borderRadius: 9999 }}
                  transition={activeNavigationTransition}
                  className="absolute inset-0 rounded-full bg-white shadow-md shadow-black/20"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-2">
                <Users size={16} strokeWidth={1.75} aria-hidden="true" />
                {text.nav.approach}
              </span>
            </Link>
            <Link
              to="/portofolios"
              className={cn(
                "relative inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-normal transition-colors",
                isPortfolio ? "text-gray-950" : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              {isPortfolio && (
                <motion.span
                  layoutId="site-header-active-navigation"
                  layout="position"
                  style={{ borderRadius: 9999 }}
                  transition={activeNavigationTransition}
                  className="absolute inset-0 rounded-full bg-white shadow-md shadow-black/20"
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 inline-flex items-center gap-2">
                <Briefcase size={16} strokeWidth={1.75} aria-hidden="true" />
                {text.nav.portfolio}
              </span>
            </Link>
          </div>
        </nav>
        <div className="flex items-center gap-2 justify-self-end">
          <div className="hidden md:block">
            <GlobalPreferencesDropdown
              locale={locale}
              label={text.languageLabel}
              onChange={setLocale}
            />
          </div>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-gray-300 text-gray-700 transition-transform duration-150 ease-out active:scale-95 dark:border-gray-700 dark:text-gray-300 md:hidden"
            aria-label={menuOpen ? text.menuClose : text.menuOpen}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav
            className="absolute inset-x-0 top-full z-30 mt-2 rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-xl backdrop-blur-xl dark:border-gray-700 dark:bg-black/95 md:hidden"
            aria-label={text.mobileNavigationLabel}
          >
            {sectionItems.map(({ value, icon: Icon }) => (
              <button
                key={value}
                type="button"
                className="block w-full rounded-xl px-4 py-3 text-left text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                onClick={() => {
                  handleSection(value);
                  setMenuOpen(false);
                }}
              >
                <span className="inline-flex items-center gap-3">
                  <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                  {text.nav[value]}
                </span>
              </button>
            ))}
            <Link
              to="/team"
              className={cn(
                "mt-1 block rounded-xl px-4 py-3 text-sm transition-colors",
                isTeam
                  ? "bg-gray-100 text-gray-950 dark:bg-gray-800 dark:text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
              )}
              onClick={() => setMenuOpen(false)}
            >
              <span className="inline-flex items-center gap-3">
                <Users size={15} strokeWidth={1.75} aria-hidden="true" />
                {text.nav.approach}
              </span>
            </Link>
            <Link
              to="/portofolios"
              className={cn(
                "mt-1 block rounded-xl px-4 py-3 text-sm transition-colors",
                isPortfolio
                  ? "bg-gray-100 text-gray-950 dark:bg-gray-800 dark:text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
              )}
              onClick={() => setMenuOpen(false)}
            >
              <span className="inline-flex items-center gap-3">
                <Briefcase size={15} strokeWidth={1.75} aria-hidden="true" />
                {text.nav.portfolio}
              </span>
            </Link>
            <div className="mt-2 border-t border-gray-200 px-4 pt-4 dark:border-gray-800">
              <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500">
                {text.languageLabel}
              </p>
              <div className="mt-2 grid gap-1">
                {localeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={locale === option.value}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    onClick={() => {
                      setLocale(option.value);
                      setMenuOpen(false);
                    }}
                  >
                    <span>{option.label}</span>
                    {locale === option.value && <Check size={15} aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
