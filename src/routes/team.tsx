import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter } from "@/components/site-footer";
import { Accordion, type AccordionItemData } from "@/components/ui/r-accordion";
import { useLocale } from "@/lib/locale";
import { translations } from "@/lib/landing-copy";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      {
        title: "Team — Nggalekco Labs",
      },
    ],
  }),
  component: Team,
});

function Team() {
  const [locale] = useLocale();
  const text = translations[locale];
  const approachItems: AccordionItemData[] = text.approach.items.map((item) => ({
    id: item.id,
    title: item.title,
    content: <p>{item.content}</p>,
  }));

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-10 lg:pb-32 lg:pt-28">
          <p className="text-xs uppercase tracking-[0.24em] text-gray-500">{text.nav.approach}</p>
          <div className="mt-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-28">
            <div>
              <h1 className="max-w-3xl text-5xl font-normal leading-tight tracking-tight text-gray-100 sm:text-6xl lg:text-7xl">
                {text.approach.title}
              </h1>
            </div>
            <div className="border-l border-gray-700 pl-6">
              <p className="text-base leading-7 text-gray-300">{text.hero.description}</p>
              <p className="mt-6 text-base leading-7 text-gray-400">{text.approach.description}</p>
            </div>
          </div>
        </section>

        <section className="border-y border-gray-800">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
            <Accordion
              className="max-w-3xl"
              defaultValue={["listen"]}
              items={approachItems}
              variant="quiet"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
