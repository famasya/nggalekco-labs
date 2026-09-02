"use client";

import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { lazy, Suspense, useEffect, useSyncExternalStore } from "react";

import { buttonStyles } from "@/components/base/buttons/button";
import { Bento02 } from "@/components/bento-02";
import { SiteFooter } from "@/components/site-footer";
import type { GlobeMarker } from "@/components/ui/3d-globe";
import { DiaText } from "@/components/ui/dia-text";
import { translations } from "@/lib/landing-copy";
import { useLocale } from "@/lib/locale";
import { useTheme } from "@/lib/theme";
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

export function Hero() {
  const [theme] = useTheme();
  const isDark = theme === "dark";
  const [locale] = useLocale();
  const text = translations[locale];
  useEffect(() => {
    document.title = `Nggalekco Labs — ${text.metaTitle}`;
  }, [locale, text]);

  return (
    <div id="home" className="overflow-x-clip bg-black text-white">
      <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-white text-gray-900 dark:bg-black dark:text-white lg:min-h-[calc(100svh-6rem)]">
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
        <div className="pointer-events-none relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl items-center px-6 pb-16 pt-8 lg:min-h-[calc(100svh-6rem)] lg:px-10 lg:pb-20 lg:pt-12">
          <div className="pointer-events-none w-full min-w-0 max-w-2xl">
            <h1 className="min-w-0 max-w-2xl text-5xl font-normal leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl lg:text-7xl">
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
            <p className="mt-6 max-w-lg text-base font-light leading-7 text-gray-600 dark:text-gray-300 lg:text-lg lg:leading-7">
              {text.hero.description}
            </p>
            <div className="pointer-events-auto mt-8 flex w-full min-w-0 flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                hash="contact"
                className={cn(
                  buttonStyles.base,
                  buttonStyles.size.medium,
                  buttonStyles.variant.primary,
                  "page-button-primary pointer-events-auto !h-12 !rounded-xl !px-5 !text-base !font-normal dark:!text-gray-900",
                )}
              >
                <span className={buttonStyles.label.medium}>{text.hero.startProject}</span>
                <ArrowUpRight className={buttonStyles.icon.medium} aria-hidden="true" />
              </Link>
              <Link
                to="/"
                hash="capabilities"
                className={cn(
                  buttonStyles.base,
                  buttonStyles.size.medium,
                  buttonStyles.variant.secondary,
                  "pointer-events-auto !h-12 !rounded-xl !px-5 !text-base !font-normal",
                )}
              >
                <span className={buttonStyles.label.medium}>{text.hero.exploreCapabilities}</span>
              </Link>
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
        className="mx-auto max-w-7xl scroll-mt-10 bg-white px-6 py-16 dark:bg-black lg:px-10 lg:py-20"
      >
        <div>
          <div>
            <h2 className="section-title max-w-md dark:text-white">{text.capabilities.title}</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-gray-600 dark:text-gray-300">
              {text.capabilities.description}
            </p>
          </div>
          <Bento02 copy={text.bento} />
        </div>
      </section>

      <section className="scroll-mt-10 border-y border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20 lg:px-10 lg:py-24">
          <div>
            <p className="eyebrow mb-5">{text.team.eyebrow}</p>
            <h2 className="section-title max-w-2xl dark:text-white">{text.team.title}</h2>
          </div>
          <div>
            <p className="max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300">
              {text.team.description}
            </p>
            <Link
              to="/team"
              className="mt-6 inline-flex items-center gap-2 text-sm font-normal text-gray-900 underline-offset-4 transition-colors hover:text-gray-500 hover:underline dark:text-gray-100 dark:hover:text-gray-400"
            >
              {text.team.button}
              <ArrowUpRight size={16} strokeWidth={1.7} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
