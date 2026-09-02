"use client";

import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft } from "lucide-react";

export function NotFound() {
  const reduce = useReducedMotion();

  const variants = {
    initial: reduce
      ? { opacity: 1, transform: "translateY(0px)" }
      : { opacity: 0, transform: "translateY(16px)" },
    animate: { opacity: 1, transform: "translateY(0px)" },
  };

  const transition = {
    duration: reduce ? 0 : 0.45,
    ease: [0.16, 1, 0.3, 1] as const,
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-6 text-center dark:bg-neutral-950">
      <motion.span
        initial={variants.initial}
        animate={variants.animate}
        transition={{ ...transition, delay: 0.05 }}
        className="text-[10rem] font-bold leading-none tracking-tighter text-neutral-900 dark:text-neutral-100 sm:text-[12rem]"
      >
        404
      </motion.span>

      <motion.h1
        initial={variants.initial}
        animate={variants.animate}
        transition={{ ...transition, delay: 0.12 }}
        className="mt-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100"
      >
        Halaman tidak ditemukan
      </motion.h1>

      <motion.p
        initial={variants.initial}
        animate={variants.animate}
        transition={{ ...transition, delay: 0.18 }}
        className="mt-3 max-w-md text-base text-neutral-600 dark:text-neutral-400"
      >
        Sepertinya halaman yang kamu cari sudah pindah, dihapus, atau mungkin tidak pernah ada.
      </motion.p>

      <motion.div
        initial={variants.initial}
        animate={variants.animate}
        transition={{ ...transition, delay: 0.24 }}
        className="mt-8"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-transform duration-150 ease-out active:scale-95 dark:bg-white dark:text-neutral-900"
        >
          <ArrowLeft className="size-4" />
          Kembali ke beranda
        </Link>
      </motion.div>
    </main>
  );
}
