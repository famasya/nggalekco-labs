import {
  Activity,
  ArrowUpRight,
  Bell,
  Globe2,
  Layers,
  Radar,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const networkStats = [
  ["Edge delivery", "99.99%"],
  ["Core services", "99.99%"],
  ["Data systems", "99.99%"],
];

const capabilities = [
  {
    icon: Layers,
    title: "Digital products",
    copy: "Clear, resilient products that feel considered from the first interaction.",
  },
  {
    icon: Activity,
    title: "Custom software",
    copy: "Practical systems that remove friction from the work your team does every day.",
  },
  {
    icon: Radar,
    title: "Platforms & data",
    copy: "The connective tissue that keeps operations, information, and people moving.",
  },
];

export function Bento02() {
  return (
    <div className="mt-14 grid gap-3 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
      <article className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 via-white to-gray-100 p-7 dark:border-gray-800 dark:from-gray-950 dark:via-gray-900 dark:to-black lg:col-span-7 lg:row-span-2 lg:p-9">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
              Systems that keep moving
            </p>
            <h3 className="mt-5 max-w-md text-3xl font-normal leading-[1.02] tracking-[-0.055em] text-gray-900 dark:text-gray-100 sm:text-4xl">
              Built for the moment, ready for what comes next.
            </h3>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-200">
            <ArrowUpRight size={17} strokeWidth={1.6} />
          </span>
        </div>

        <div className="mt-16 border-t border-gray-200 pt-5 dark:border-gray-800">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-5xl font-normal tracking-[-0.07em] text-gray-900 dark:text-gray-100 sm:text-6xl">
                24/7
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Thoughtful engineering, from first sketch to steady operation.
              </p>
            </div>
            <Activity
              className="mb-2 text-gray-500 dark:text-gray-400"
              size={25}
              strokeWidth={1.4}
            />
          </div>
          <div className="mt-8 flex h-20 items-end gap-1.5" aria-hidden="true">
            {[28, 44, 35, 58, 42, 68, 52, 78, 61, 88, 72, 94, 82, 100].map((height, index) => (
              <span
                key={index}
                className="flex-1 rounded-t-sm bg-gray-300 dark:bg-gray-700"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white via-gray-50 to-gray-100 p-7 dark:border-gray-800 dark:from-gray-950 dark:via-black dark:to-gray-950 lg:col-span-5 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
              Reliable by design
            </p>
            <p className="mt-5 text-5xl font-normal tracking-[-0.07em] text-gray-900 dark:text-gray-100">
              99.99%
            </p>
          </div>
          <ShieldCheck className="text-gray-600 dark:text-gray-300" size={23} strokeWidth={1.5} />
        </div>
        <p className="mt-4 max-w-sm text-sm leading-6 text-gray-600 dark:text-gray-300">
          Calm foundations for software that has to earn trust every day.
        </p>
      </article>

      <article className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white via-gray-50 to-gray-100 p-7 dark:border-gray-800 dark:from-gray-950 dark:via-black dark:to-gray-950 lg:col-span-5 lg:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            Connected thinking
          </p>
          <Globe2 className="text-gray-600 dark:text-gray-300" size={22} strokeWidth={1.5} />
        </div>
        <div className="mt-6 space-y-3">
          {networkStats.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between border-b border-gray-200 pb-3 text-sm last:border-0 last:pb-0 dark:border-gray-800"
            >
              <span className="text-gray-600 dark:text-gray-300">{label}</span>
              <span className="text-gray-900 dark:text-gray-100">{value}</span>
            </div>
          ))}
        </div>
      </article>

      <div className="grid gap-3 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-3">
        <article className="rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 via-white to-gray-100 p-7 dark:border-gray-800 dark:from-gray-950 dark:via-gray-900 dark:to-black">
          <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-200">
            <span className="relative grid size-7 place-items-center rounded-full border border-gray-300 dark:border-gray-700">
              <span className="size-2 rounded-full bg-gray-700 dark:bg-gray-200" />
              <span className="absolute size-5 animate-ping rounded-full border border-gray-400 opacity-40 dark:border-gray-500" />
            </span>
            <span>Traffic spike detected</span>
          </div>
          <p className="mt-6 text-sm leading-6 text-gray-600 dark:text-gray-300">
            We scale the right parts of the system before a busy day becomes a problem.
          </p>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white via-gray-50 to-gray-100 p-7 dark:border-gray-800 dark:from-gray-950 dark:via-black dark:to-gray-950">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
              Smart alerts
            </p>
            <Bell className="text-gray-600 dark:text-gray-300" size={20} strokeWidth={1.5} />
          </div>
          <p className="mt-6 text-sm leading-6 text-gray-600 dark:text-gray-300">
            Useful signals arrive early, with enough context to act on them.
          </p>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-gradient-to-b from-white via-gray-50 to-gray-100 p-7 dark:border-gray-800 dark:from-gray-950 dark:via-black dark:to-gray-950 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
              What we bring
            </p>
            <TrendingUp className="text-gray-600 dark:text-gray-300" size={20} strokeWidth={1.5} />
          </div>
          <div className="mt-6 grid gap-3">
            {capabilities.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="group flex gap-3">
                <Icon
                  className="mt-0.5 shrink-0 text-gray-500 dark:text-gray-400"
                  size={16}
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-sm text-gray-900 dark:text-gray-100">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
