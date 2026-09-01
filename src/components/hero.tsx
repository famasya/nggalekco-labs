"use client";

import { ArrowUpRight, Menu, Waves, X } from "lucide-react";
import { lazy, Suspense, useState, useSyncExternalStore } from "react";

import { ButtonLink as BoardButtonLink } from "@/components/base/buttons/button";
import { Bento02 } from "@/components/bento-02";
import type { GlobeMarker } from "@/components/ui/3d-globe";
import { DiaText } from "@/components/ui/dia-text";
import { Switch } from "@/components/ui/r-switch";
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

function Brand() {
  return (
    <a
      className="group inline-flex items-center gap-3"
      href="#top"
      aria-label="Nggalekco Labs home"
    >
      <span className="relative isolate grid size-10 place-items-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgb(56_189_248_/_0.42),transparent_48%),radial-gradient(circle_at_75%_75%,rgb(168_85_247_/_0.3),transparent_55%)] opacity-80 blur-md dark:opacity-90"
        />
        <span className="relative z-10 grid size-full place-items-center overflow-hidden rounded-full bg-gray-100/80 backdrop-blur-sm transition-[background-color,backdrop-filter] duration-[150ms] ease-out group-hover:bg-white/20 group-hover:backdrop-blur-md dark:bg-gray-900/70 dark:group-hover:bg-white/20">
          <img src="/logo.png" alt="" className="size-full object-contain" aria-hidden="true" />
        </span>
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

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  return (
    <div
      id="top"
      className={cn("overflow-hidden bg-white text-gray-900", isDark && "dark bg-black text-white")}
    >
      <section className="relative isolate min-h-[700px] overflow-hidden bg-white text-gray-900 dark:bg-black dark:text-white lg:min-h-[790px]">
        <header className="relative z-30 mx-auto flex w-full max-w-[1320px] items-center justify-between px-6 py-6 lg:px-10 lg:py-8">
          <Brand />
          <nav
            className="hidden items-center gap-8 text-sm text-gray-500 dark:text-gray-300 md:flex"
            aria-label="Main navigation"
          >
            <a
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
              href="#capabilities"
            >
              Capabilities
            </a>
            <a
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
              href="#approach"
            >
              Approach
            </a>
            <a
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
              href="#contact"
            >
              Contact
            </a>
          </nav>
          <Switch
            checked={isDark}
            onCheckedChange={setIsDark}
            size="default"
            label="Dark mode"
            labelClassName="text-xs font-normal text-gray-700 dark:text-gray-300"
            wrapperClassName="gap-2"
            title="Toggle dark mode"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            thumbContent={isDark ? "🌙" : "☀️"}
            className="[--ic-accent:#f3f4f6] [--ic-card:#ffffff] [--ic-foreground:#111827] dark:[--ic-accent:#374151] dark:[--ic-card:#000000] dark:[--ic-foreground:#ffffff]"
          />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-lg border border-gray-300 text-gray-700 transition-transform duration-[140ms] ease-out active:scale-[0.97] dark:border-gray-700 dark:text-gray-300 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {menuOpen && (
          <nav
            className="absolute inset-x-4 top-20 z-30 rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-xl backdrop-blur-xl dark:border-gray-700 dark:bg-black/95 md:hidden"
            aria-label="Mobile navigation"
          >
            {[
              ["Capabilities", "#capabilities"],
              ["Approach", "#approach"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                className="block rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                href={href}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        )}

        <div className="pointer-events-none relative z-10 mx-auto flex min-h-[590px] w-full max-w-[1320px] items-center px-6 pb-24 pt-12 lg:min-h-[650px] lg:px-10 lg:pb-32 lg:pt-16">
          <div className="pointer-events-none max-w-[620px]">
            <h1 className="max-w-[680px] text-[clamp(3.15rem,6vw,5.8rem)] font-normal leading-[1.25] tracking-[-0.07em] text-gray-900 dark:text-gray-100">
              <DiaText
                className="font-normal"
                text="Local roots."
                colors={[isDark ? "#f3f4f6" : "#111827"]}
                duration={HERO_TEXT_REVEAL_DURATION}
                textColor={isDark ? "#f3f4f6" : "#111827"}
              />
              <br />
              <DiaText
                className="font-normal"
                text={["Global impact.", "Useful software.", "Better systems."]}
                duration={HERO_TEXT_REVEAL_DURATION}
                textColor={isDark ? "#f3f4f6" : "#111827"}
                repeat
                repeatDelay={HERO_TEXT_REPEAT_DELAY}
                fixedWidth
              />
            </h1>
            <p className="mt-7 max-w-[500px] text-[16px] leading-7 text-gray-600 dark:text-gray-300 lg:text-[17px] lg:leading-7">
              Nggalekco Labs is a hyperlocal software development company based in Trenggalek, East
              Java — bringing national and global expertise to solve local problems.
            </p>
            <div className="pointer-events-auto mt-9 flex flex-col gap-3 sm:flex-row">
              <BoardButtonLink
                href="#contact"
                variant="primary"
                trailingIcon={ArrowUpRight}
                className="page-button-primary pointer-events-auto !h-12 !rounded-xl !px-5 !text-base !font-normal dark:!text-gray-900"
              >
                Start a project
              </BoardButtonLink>
              <BoardButtonLink
                href="#capabilities"
                variant="secondary"
                className="pointer-events-auto !h-12 !rounded-xl !px-5 !text-base !font-normal"
              >
                Explore capabilities
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
              The right amount of technology for the job.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-gray-600 dark:text-gray-300">
              We work closely with people who understand the problem best, shaping software that is
              useful on day one and ready for what comes next.
            </p>
          </div>
          <Bento02 />
        </div>
      </section>

      <section
        id="approach"
        className="scroll-mt-10 border-y border-gray-200 bg-white dark:border-gray-800 dark:bg-black"
      >
        <div className="mx-auto grid max-w-[1320px] gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-28 lg:px-10 lg:py-32">
          <div>
            <h2 className="section-title mt-4 max-w-2xl dark:text-white">
              Close enough to care. Experienced enough to deliver.
            </h2>
          </div>
          <div className="flex items-start gap-4 border-l border-gray-400 pl-6 dark:border-gray-600">
            <Waves
              className="mt-1 shrink-0 text-gray-700 dark:text-gray-200"
              size={22}
              strokeWidth={1.6}
            />
            <p className="text-base leading-7 text-gray-600 dark:text-gray-300">
              Good software starts with listening. We bring the clarity, craft, and momentum to turn
              a meaningful problem into a lasting advantage.
            </p>
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
              Have a local problem with a bigger opportunity?
            </h2>
          </div>
          <BoardButtonLink
            href="mailto:hello@nggalekco.id"
            variant="primary"
            trailingIcon={ArrowUpRight}
            className="page-button-primary pointer-events-auto shrink-0 !h-12 !rounded-xl !px-5 !text-base !font-normal dark:!text-gray-900"
          >
            Say hello
          </BoardButtonLink>
        </div>
        <div className="mx-auto mt-20 flex max-w-[1320px] flex-col justify-between gap-4 border-t border-gray-200 pt-6 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500 sm:flex-row">
          <span>© 2026 Nggalekco Labs</span>
          <span>Trenggalek, East Java · Indonesia</span>
        </div>
      </section>
    </div>
  );
}
