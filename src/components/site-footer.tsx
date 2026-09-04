import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { ButtonLink as BoardButtonLink } from "@/components/base/buttons/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Switch } from "@/components/ui/r-switch";
import { translations } from "@/lib/landing-copy";
import { useLocale } from "@/lib/locale";
import { navItems } from "@/lib/navigation";
import { useTheme } from "@/lib/theme";

export function SiteFooter() {
  const [theme, setTheme] = useTheme();
  const [locale, setLocale] = useLocale();
  const text = translations[locale];
  const isDark = theme === "dark";
  const themeCopy = {
    light: text.themeLight,
    dark: text.themeDark,
    lightMode: text.themeLightMode,
    darkMode: text.themeDarkMode,
  };

  return (
    <footer
      id="contact"
      className="scroll-mt-10 border-t border-gray-200 bg-white text-gray-900 dark:border-gray-800 dark:bg-black dark:text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-normal dark:text-gray-100 sm:text-4xl">
              {text.contact.title}
            </h2>
          </div>
          <BoardButtonLink
            href="mailto:hello@nggalek.co"
            variant="primary"
            trailingIcon={ArrowUpRight}
            className="page-button-primary pointer-events-auto shrink-0 !h-12 !rounded-xl !px-5 !text-base !font-normal dark:!text-gray-900"
          >
            {text.contact.button}
          </BoardButtonLink>
        </div>

        <div className="mt-16 grid gap-8 border-t border-gray-200 pt-8 dark:border-gray-800 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link
              to="/"
              className="group inline-flex items-center gap-3"
              aria-label={text.brandHome}
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
                nggalek.co <span className="text-gray-500 dark:text-gray-400">labs</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-gray-600 dark:text-gray-300">
              {text.hero.description}
            </p>
          </div>

          <nav aria-label={text.mainNavigationLabel}>
            <p className="eyebrow mb-4">{text.mainNavigationLabel}</p>
            <ul className="space-y-2">
              {navItems.map(({ value, to }) => (
                <li key={value}>
                  <Link
                    to={to}
                    className="text-sm text-gray-700 transition-colors hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
                  >
                    {text.nav[value as keyof typeof text.nav]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">{text.nav.contact}</p>
            <a
              href="mailto:hello@nggalek.co"
              className="block text-sm text-gray-700 transition-colors hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
            >
              hello@nggalek.co
            </a>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{text.contact.location}</p>
          </div>

          <div>
            <p className="eyebrow mb-4">{text.themeLabel}</p>
            <Switch
              checked={isDark}
              onCheckedChange={(nextIsDark) => setTheme(nextIsDark ? "dark" : "light")}
              size="default"
              label={isDark ? themeCopy.darkMode : themeCopy.lightMode}
              labelClassName="text-xs font-normal text-gray-700 dark:text-gray-300"
              wrapperClassName="flex items-center gap-2.5"
              title={isDark ? themeCopy.light : themeCopy.dark}
              aria-label={isDark ? themeCopy.light : themeCopy.dark}
              thumbContent={isDark ? "🌙" : "☀️"}
              className="[--ic-accent:#f3f4f6] [--ic-card:#ffffff] [--ic-foreground:#111827] dark:[--ic-accent:#374151] dark:[--ic-card:#000000] dark:[--ic-foreground:#ffffff]"
            />
            <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-800">
              <p className="eyebrow mb-4">{text.languageLabel}</p>
              <LanguageSwitcher locale={locale} label={text.languageLabel} onChange={setLocale} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-500 sm:flex-row">
          <span>© 2026 nggalek.co Labs</span>
          <span>{text.contact.location}</span>
        </div>
      </div>
    </footer>
  );
}
