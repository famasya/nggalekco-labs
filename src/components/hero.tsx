"use client";

import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Compass,
  Languages,
  Layers,
  Mail,
  Menu,
  Waves,
  X,
} from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { ButtonLink as BoardButtonLink } from "@/components/base/buttons/button";
import { Bento02 } from "@/components/bento-02";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import type { GlobeMarker } from "@/components/ui/3d-globe";
import { DiaText } from "@/components/ui/dia-text";
import { Accordion, type AccordionItemData } from "@/components/ui/r-accordion";
import { Switch } from "@/components/ui/r-switch";
import { localeOptions, translations, type Locale } from "@/lib/landing-copy";
import { cn } from "@/lib/utils";

const markers: GlobeMarker[] = [
  {
    lat: -8.05,
    lng: 111.716,
    icon: "place",
    label: "Trenggalek",
  },
];

const HERO_TEXT_REVEAL_DURATION = 0.6;
const HERO_TEXT_REPEAT_DELAY = 3.5;

const navigationItems = [
  { value: "capabilities", href: "#capabilities", icon: Layers },
  { value: "approach", href: "#approach", icon: Compass },
  { value: "contact", href: "#contact", icon: Mail },
] as const;

const Globe3D = lazy(async () => {
  const module = await import("@/components/ui/3d-globe");
  return { default: module.Globe3D };
});

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function Brand({ label }: { label: string }) {
  return (
    <a className="group inline-flex items-center gap-3" href="#top" aria-label={label}>
      <span className="grid size-10 place-items-center">
        <img
          src="/logo-light.png?v=2"
          alt=""
          className="size-full object-contain"
          aria-hidden="true"
        />
      </span>
      <span className="text-[15px] font-normal tracking-[-0.02em] text-gray-900 dark:text-gray-100">
        nggalekco <span className="text-gray-500 dark:text-gray-400">labs</span>
      </span>
    </a>
  );
}

function HeroGlobe({ isDark }: { isDark: boolean }) {
  const isClient = useIsClient();
  if (!isClient) return <div className="h-full w-full" aria-hidden="true" />;

  return (
    <Suspense fallback={<div className="h-full w-full" aria-hidden="true" />}>
      <Globe3D
        className={cn(
          "h-full w-full cursor-grab touch-none active:cursor-grabbing",
          isDark ? "brightness-[1.28]" : "brightness-[0.78]",
        )}
        markers={markers}
        config={{
          showAtmosphere: false,
          bumpScale: 2.2,
          autoRotateSpeed: 0.3,
          initialRotation: { x: -0.24, y: 2.72 },
          enableZoom: false,
          enablePan: false,
          markerSize: 0.09,
          ambientIntensity: 0.95,
          pointLightIntensity: 2.25,
          backgroundColor: null,
        }}
      />
    </Suspense>
  );
}

function ThemeSwitch({
  isDark,
  mobile = false,
  copy,
  onCheckedChange,
}: {
  isDark: boolean;
  mobile?: boolean;
  copy: { label: string; light: string; dark: string };
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <Switch
      checked={isDark}
      onCheckedChange={onCheckedChange}
      size="default"
      label={copy.label}
      labelClassName="text-xs font-normal text-gray-700 dark:text-gray-300"
      wrapperClassName={
        mobile ? "flex w-full items-center justify-between gap-4" : "hidden gap-2 md:flex"
      }
      title={isDark ? copy.light : copy.dark}
      aria-label={isDark ? copy.light : copy.dark}
      thumbContent={isDark ? "🌙" : "☀️"}
      className="[--ic-accent:#f3f4f6] [--ic-card:#ffffff] [--ic-foreground:#111827] dark:[--ic-accent:#374151] dark:[--ic-card:#000000] dark:[--ic-foreground:#ffffff]"
    />
  );
}

function GlobalPreferencesDropdown({
  locale,
  label,
  isDark,
  themeCopy,
  onChange,
  onThemeChange,
}: {
  locale: Locale;
  label: string;
  isDark: boolean;
  themeCopy: { label: string; light: string; dark: string };
  onChange: (locale: Locale) => void;
  onThemeChange: (isDark: boolean) => void;
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
          aria-label={`${label} and appearance`}
          className="absolute top-full left-0 right-auto z-50 m-0 mt-2 w-80 max-w-[calc(100vw-2rem)] min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl dark:border-gray-800 dark:bg-gray-950 md:left-auto md:right-0"
          onCancel={() => setOpen(false)}
        >
          <div className="px-3 pb-1 pt-2 text-[10px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-500">
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
          <div className="mt-1 border-t border-gray-200 px-3 pb-2 pt-3 dark:border-gray-800">
            <ThemeSwitch isDark={isDark} mobile copy={themeCopy} onCheckedChange={onThemeChange} />
          </div>
        </dialog>
      )}
    </div>
  );
}

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [locale, setLocale] = useState<Locale>("id");
  const [activeNavigation, setActiveNavigation] = useState("capabilities");
  const navigationTargetRef = useRef<string | null>(null);
  const text = translations[locale];
  const themeCopy = {
    label: text.themeLabel,
    light: text.themeLight,
    dark: text.themeDark,
  };
  const approachItems: AccordionItemData[] = text.approach.items.map((item) => ({
    id: item.id,
    title: item.title,
    content: <p>{item.content}</p>,
  }));

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = `Nggalekco Labs — ${text.metaTitle}`;
  }, [locale, text]);

  const handleNavigation = (value: string) => {
    navigationTargetRef.current = value;
    setActiveNavigation(value);
    window.location.hash = value;
  };

  useEffect(() => {
    const sections = navigationItems
      .map(({ value }) => ({ value, element: document.getElementById(value) }))
      .filter(
        (
          section,
        ): section is {
          value: (typeof navigationItems)[number]["value"];
          element: HTMLElement;
        } => section.element !== null,
      );

    if (sections.length === 0) return;

    let frame = 0;
    const updateActiveNavigation = () => {
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

        const navigationTarget = navigationTargetRef.current;
        if (navigationTarget) {
          if (current !== navigationTarget) {
            setActiveNavigation(navigationTarget);
            return;
          }
          navigationTargetRef.current = null;
        }

        setActiveNavigation(current);
      });
    };

    updateActiveNavigation();
    window.addEventListener("scroll", updateActiveNavigation, { passive: true });
    window.addEventListener("resize", updateActiveNavigation);

    return () => {
      window.removeEventListener("scroll", updateActiveNavigation);
      window.removeEventListener("resize", updateActiveNavigation);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      id="top"
      className={cn("overflow-x-clip bg-white text-gray-900", isDark && "dark bg-black text-white")}
    >
      <header className="sticky top-0 z-40 w-full bg-gradient-to-b from-white via-white to-transparent dark:from-black dark:via-black dark:to-transparent">
        <div className="relative mx-auto grid w-full max-w-[1320px] grid-cols-[1fr_auto] items-center px-6 py-6 md:grid-cols-[1fr_auto_1fr] lg:px-10 lg:py-8">
          <Brand label={text.brandHome} />
          <nav
            className="hidden justify-self-center md:block"
            aria-label={text.mainNavigationLabel}
          >
            <Tabs value={activeNavigation} onValueChange={handleNavigation} variant="pill">
              <TabsList className="gap-1.5 rounded-full border border-white/15 bg-black/65 p-1.5 shadow-lg shadow-black/15 backdrop-blur-xl">
                {navigationItems.map(({ value, icon: Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="min-h-[44px] px-5 py-2.5 font-normal text-white/70 hover:bg-white/10 hover:text-white data-[state=active]:text-gray-950"
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
          </nav>
          <div className="flex items-center gap-2 justify-self-end">
            <div className="hidden md:block">
              <GlobalPreferencesDropdown
                locale={locale}
                label={text.languageLabel}
                isDark={isDark}
                themeCopy={themeCopy}
                onChange={setLocale}
                onThemeChange={setIsDark}
              />
            </div>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-lg border border-gray-300 text-gray-700 transition-transform duration-[140ms] ease-out active:scale-[0.97] dark:border-gray-700 dark:text-gray-300 md:hidden"
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
              {navigationItems.map(({ value, href, icon: Icon }) => (
                <a
                  key={href}
                  className="block rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  href={href}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="inline-flex items-center gap-3">
                    <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                    {text.nav[value]}
                  </span>
                </a>
              ))}
              <div className="mt-2 border-t border-gray-200 px-4 pt-4 dark:border-gray-800">
                <p className="text-[10px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-500">
                  {text.languageLabel}
                </p>
                <div className="mt-2 grid gap-1">
                  {localeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={locale === option.value}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
                      onClick={() => setLocale(option.value)}
                    >
                      <span>{option.label}</span>
                      {locale === option.value && <Check size={15} aria-hidden="true" />}
                    </button>
                  ))}
                </div>
                <div className="mt-3 border-t border-gray-200 pt-3 dark:border-gray-800">
                  <ThemeSwitch
                    isDark={isDark}
                    mobile
                    copy={themeCopy}
                    onCheckedChange={setIsDark}
                  />
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>
      <section className="relative isolate min-h-[700px] overflow-hidden bg-white text-gray-900 dark:bg-black dark:text-white lg:min-h-[790px]">
        <div
          className="pointer-events-none absolute inset-0 z-0 [--hero-grid-line:rgb(209_213_219_/_0.32)] dark:[--hero-grid-line:rgb(75_85_99_/_0.24)]"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--hero-grid-line) 1px, transparent 1px),
              linear-gradient(to bottom, var(--hero-grid-line) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            WebkitMaskImage:
              "radial-gradient(ellipse 55% 70% at 30% 50%, #000 20%, transparent 78%)",
            maskImage: "radial-gradient(ellipse 55% 70% at 30% 50%, #000 20%, transparent 78%)",
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none relative z-10 mx-auto flex min-h-[590px] w-full max-w-[1320px] items-center px-6 pb-24 pt-12 lg:min-h-[650px] lg:px-10 lg:pb-32 lg:pt-16">
          <div className="pointer-events-none w-full min-w-0 max-w-[620px]">
            <h1 className="min-w-0 max-w-[680px] text-[clamp(3.15rem,6vw,5.8rem)] font-normal leading-[1.25] tracking-[-0.07em] text-gray-900 dark:text-gray-100 lg:text-[clamp(4rem,5vw,5rem)]">
              <DiaText
                className="font-normal"
                text={text.hero.titleFirst}
                colors={[isDark ? "#f3f4f6" : "#111827"]}
                duration={HERO_TEXT_REVEAL_DURATION}
                textColor={isDark ? "#f3f4f6" : "#111827"}
              />
              <br />
              <DiaText
                className="font-normal"
                text={text.hero.titleSecond}
                duration={HERO_TEXT_REVEAL_DURATION}
                textColor={isDark ? "#f3f4f6" : "#111827"}
                repeat
                repeatDelay={HERO_TEXT_REPEAT_DELAY}
                wrap
              />
            </h1>
            <p className="mt-7 max-w-[500px] text-[16px] leading-7 text-gray-600 dark:text-gray-300 lg:text-[17px] lg:leading-7">
              {text.hero.description}
            </p>
            <div className="pointer-events-auto mt-9 flex w-full min-w-0 flex-col gap-3 sm:flex-row">
              <BoardButtonLink
                href="#contact"
                variant="primary"
                trailingIcon={ArrowUpRight}
                className="page-button-primary pointer-events-auto !h-12 !rounded-xl !px-5 !text-base !font-normal dark:!text-gray-900"
              >
                {text.hero.startProject}
              </BoardButtonLink>
              <BoardButtonLink
                href="#capabilities"
                variant="secondary"
                className="pointer-events-auto !h-12 !rounded-xl !px-5 !text-base !font-normal"
              >
                {text.hero.exploreCapabilities}
              </BoardButtonLink>
            </div>
          </div>
        </div>

        <div className="pointer-events-auto absolute -right-[15rem] -bottom-[15rem] z-0 size-[37rem] opacity-100 sm:-right-[10rem] sm:-bottom-[14rem] sm:size-[46rem] lg:-right-[11rem] lg:-bottom-[17rem] lg:size-[53rem]">
          <HeroGlobe isDark={isDark} />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-r",
              isDark
                ? "from-black/55 via-black/20 to-transparent"
                : "from-white/30 via-white/10 to-transparent",
            )}
            aria-hidden="true"
          />
        </div>
      </section>

      <section
        id="capabilities"
        className="mx-auto max-w-[1320px] scroll-mt-10 bg-white px-6 py-24 dark:bg-black lg:px-10 lg:py-28"
      >
        <div>
          <div>
            <h2 className="section-title mt-4 max-w-md dark:text-white">
              {text.capabilities.title}
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-gray-600 dark:text-gray-300">
              {text.capabilities.description}
            </p>
          </div>
          <Bento02 copy={text.bento} />
        </div>
      </section>

      <section
        id="approach"
        className="scroll-mt-10 border-y border-gray-200 bg-white dark:border-gray-800 dark:bg-black"
      >
        <div className="mx-auto grid max-w-[1320px] gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-28 lg:px-10 lg:py-32">
          <div>
            <h2 className="section-title mt-4 max-w-2xl dark:text-white">{text.approach.title}</h2>
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4 border-l border-gray-400 pl-6 dark:border-gray-600">
              <Waves
                className="mt-1 shrink-0 text-gray-700 dark:text-gray-200"
                size={22}
                strokeWidth={1.6}
              />
              <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
                {text.approach.description}
              </p>
            </div>
            <Accordion
              className="max-w-none"
              defaultValue={["listen"]}
              items={approachItems}
              variant="quiet"
            />
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-10 bg-white px-6 py-24 text-gray-900 dark:bg-black dark:text-white lg:px-10 lg:py-28"
      >
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <h2 className="mt-4 max-w-3xl text-4xl font-normal leading-[1] tracking-[-0.06em] dark:text-gray-100 sm:text-6xl">
              {text.contact.title}
            </h2>
          </div>
          <BoardButtonLink
            href="mailto:hello@nggalekco.id"
            variant="primary"
            trailingIcon={ArrowUpRight}
            className="page-button-primary pointer-events-auto shrink-0 !h-12 !rounded-xl !px-5 !text-base !font-normal dark:!text-gray-900"
          >
            {text.contact.button}
          </BoardButtonLink>
        </div>
        <div className="mx-auto mt-20 flex max-w-[1320px] flex-col justify-between gap-4 border-t border-gray-200 pt-6 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500 sm:flex-row">
          <span>© 2026 Nggalekco Labs</span>
          <span>{text.contact.location}</span>
        </div>
      </section>
    </div>
  );
}
