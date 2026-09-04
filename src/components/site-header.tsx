"use client";

import { Link, useLocation, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { translations } from "@/lib/landing-copy";
import { useLocale } from "@/lib/locale";
import { routeNavItems, sectionNavItems } from "@/lib/navigation";

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
      className="group inline-flex min-h-11 items-center gap-3 hover:opacity-80"
      aria-label={label}
      onClick={onClick}
    >
      <span className="grid size-10 shrink-0 place-items-center">
        <img
          src="/logo-light.png?v=2"
          alt=""
          className="size-full object-contain"
          aria-hidden="true"
        />
      </span>
      <span className="text-md font-normal tracking-tight text-gray-900 dark:text-gray-100">
        nggalek.co <span className="text-gray-500 dark:text-gray-400">labs</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale] = useLocale();
  const [activeSection, setActiveSection] = useState<string>(sectionNavItems[0].value);
  const sectionTargetRef = useRef<string | null>(null);
  const text = translations[locale];
  const { pathname } = useLocation();
  const router = useRouter();
  const isHome = pathname === "/";

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

    const sections = sectionNavItems
      .map(({ value }) => ({ value, element: document.getElementById(value) }))
      .filter(
        (section): section is { value: string; element: HTMLElement } => section.element !== null,
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

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-b from-white via-white to-transparent dark:from-black dark:via-black dark:to-transparent">
      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10 lg:py-8">
        <div>
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
        </div>
        <div className="flex items-center gap-2">
          <nav
            className="hidden items-center gap-1.5 md:flex"
            aria-label={text.mainNavigationLabel}
          >
            <Tabs
              value={tabsValue}
              onValueChange={handleSection}
              variant="segment"
              className="inline-block"
            >
              <TabsList className="gap-1.5 bg-transparent p-0">
                {sectionNavItems.map(({ value, icon: Icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="min-h-11 px-5 py-2.5 font-normal text-gray-300 hover:bg-white/10 hover:text-white data-[state=active]:text-gray-950"
                    indicatorClassName="site-nav-active-indicator bg-white shadow-md shadow-black/20"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                      {text.nav[value as keyof typeof text.nav]}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            {routeNavItems.map(({ value, icon: Icon, to }) => (
              <Link
                key={value}
                to={to}
                activeOptions={{ exact: true }}
                className="relative inline-flex min-h-11 items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-normal transition-colors"
                activeProps={{ className: "text-gray-950" }}
                inactiveProps={{ className: "text-gray-300 hover:bg-white/10 hover:text-white" }}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span
                        className="site-nav-active-indicator absolute inset-0 rounded-lg bg-white shadow-md shadow-black/20"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10 inline-flex items-center gap-2">
                      <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
                      {text.nav[value as keyof typeof text.nav]}
                    </span>
                  </>
                )}
              </Link>
            ))}
          </nav>
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
            {sectionNavItems.map(({ value, icon: Icon }) => (
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
                  {text.nav[value as keyof typeof text.nav]}
                </span>
              </button>
            ))}
            {routeNavItems.map(({ value, icon: Icon, to }) => (
              <Link
                key={value}
                to={to}
                activeOptions={{ exact: true }}
                className="mt-1 block rounded-xl px-4 py-3 text-sm transition-colors"
                activeProps={{
                  className: "bg-gray-100 text-gray-950 dark:bg-gray-800 dark:text-white",
                }}
                inactiveProps={{
                  className:
                    "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                }}
                onClick={() => setMenuOpen(false)}
              >
                <span className="inline-flex items-center gap-3">
                  <Icon size={15} strokeWidth={1.75} aria-hidden="true" />
                  {text.nav[value as keyof typeof text.nav]}
                </span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
