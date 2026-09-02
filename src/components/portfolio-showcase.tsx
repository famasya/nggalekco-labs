"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import { BounceSidebar } from "@/components/motion/bounce-sidebar";
import { SiteFooter } from "@/components/site-footer";
import { translations, type LandingCopy } from "@/lib/landing-copy";
import { useLocale } from "@/lib/locale";

type PortfolioProjectMetadata = {
  id: string;
  detailUrl: string;
  websiteUrl: string;
};

type PortfolioProject = LandingCopy["portfolio"]["projects"][number] & PortfolioProjectMetadata;

const portfolioProjectMetadata: PortfolioProjectMetadata[] = [
  {
    id: "nggalek",
    detailUrl: "https://nggalek.co/tentang/",
    websiteUrl: "https://nggalek.co/",
  },
  {
    id: "kabartrenggalek",
    detailUrl: "https://kabartrenggalek.com/tentang-kabar-trenggalek",
    websiteUrl: "https://kabartrenggalek.com/",
  },
  {
    id: "bprjwalita",
    detailUrl: "https://bprjwalita.com/profil/",
    websiteUrl: "https://bprjwalita.com/",
  },
];

function PortfolioCard({
  project,
  copy,
  reduceMotion,
}: {
  project: PortfolioProject;
  copy: LandingCopy["portfolio"];
  reduceMotion: boolean;
}) {
  return (
    <motion.article
      key={project.id}
      initial={{ opacity: 0, transform: reduceMotion ? "translateY(0px)" : "translateY(10px)" }}
      animate={{ opacity: 1, transform: "translateY(0px)" }}
      exit={{ opacity: 0, transform: reduceMotion ? "translateY(0px)" : "translateY(-8px)" }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950/70"
    >
      <div className="border-b border-gray-200 p-6 sm:p-8 dark:border-gray-800">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <h2 className="max-w-2xl flex-1 text-3xl font-normal leading-tight tracking-[-0.04em] text-gray-900 dark:text-gray-100 sm:text-4xl">
            {project.title}
          </h2>
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gray-200 px-3.5 py-2 text-xs text-gray-600 transition-[background-color,color] duration-150 ease-out hover:bg-gray-100 hover:text-gray-950 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white"
          >
            {copy.visitSite}
            <ArrowUpRight size={14} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
        <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400">
          {project.description}
        </p>
      </div>
      <div className="grid gap-6 p-6 sm:grid-cols-[minmax(0,1fr)_minmax(11rem,0.55fr)] sm:p-8">
        <div>
          <p className="text-sm text-gray-900 dark:text-gray-200">{project.focus}</p>
        </div>
        <div>
          <a
            href={project.detailUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-600 underline-offset-4 transition-colors hover:text-gray-950 hover:underline dark:text-gray-300 dark:hover:text-white"
          >
            {copy.sourceProfile}
            <ArrowUpRight size={14} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function PortfolioShowcase() {
  const [locale] = useLocale();
  const text = translations[locale];
  const projects = portfolioProjectMetadata.flatMap((metadata) => {
    const copy = text.portfolio.projects.find((project) => project.id === metadata.id);
    return copy ? [{ ...metadata, ...copy }] : [];
  });
  const [activeId, setActiveId] = useState(projects[0]?.id ?? "");
  const reduceMotion = useReducedMotion() === true;
  const firstProject = projects[0];

  if (!firstProject) return null;

  const activeProject = projects.find((project) => project.id === activeId) ?? firstProject;

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-black dark:text-white">
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32">
          <div className="max-w-3xl">
            <h1 className="mt-6 max-w-2xl text-5xl font-normal leading-tight tracking-[-0.055em] text-gray-900 dark:text-gray-100 sm:text-6xl lg:text-7xl">
              {text.portfolio.title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-400">
              {text.portfolio.description}
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(12rem,15rem)_minmax(0,1fr)] lg:items-start lg:gap-20">
            <BounceSidebar
              items={projects.map(({ id, label }) => ({ id, label }))}
              value={activeId}
              onValueChange={setActiveId}
              ariaLabel={text.portfolio.sidebarLabel}
              className="lg:sticky lg:top-32"
              listClassName="w-full"
              itemClassName="w-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 data-[active=true]:text-gray-900 dark:hover:bg-white/[0.04] dark:hover:text-gray-200 dark:data-[active=true]:text-gray-100"
              indicatorClassName="bg-gray-900 shadow-[0_0_0_4px_rgb(17_24_39_/_0.08)] dark:bg-white dark:shadow-[0_0_0_4px_rgb(255_255_255_/_0.08)]"
            />
            <AnimatePresence initial={false} mode="wait">
              <PortfolioCard
                key={activeProject.id}
                project={activeProject}
                copy={text.portfolio}
                reduceMotion={reduceMotion}
              />
            </AnimatePresence>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
