"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
}

export type AccordionVariant = "default" | "quiet";

export interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
  multiple?: boolean;
  variant?: AccordionVariant;
  defaultValue?: string[];
}

function AccordionContent({
  children,
  open,
  reduceMotion,
}: {
  children: React.ReactNode;
  open: boolean;
  reduceMotion: boolean;
}) {
  return (
    <AnimatePresence initial={false}>
      {open ? (
        <AccordionPrimitive.Content asChild forceMount>
          <motion.div
            animate={{
              gridTemplateRows: "1fr",
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0%)",
            }}
            className="overflow-hidden"
            style={{ display: "grid" }}
            initial={{
              gridTemplateRows: "0fr",
              opacity: 0,
              clipPath: "inset(0% 0% 100% 0%)",
            }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    gridTemplateRows: { type: "spring", stiffness: 180, damping: 28, mass: 0.9 },
                    opacity: { duration: 0.18, ease: [0.23, 1, 0.32, 1] },
                    clipPath: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
                  }
            }
          >
            <div className="pb-3 pl-7 pr-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
              {children}
            </div>
          </motion.div>
        </AccordionPrimitive.Content>
      ) : null}
    </AnimatePresence>
  );
}

function AccordionRow({
  item,
  open,
  quiet,
  reduceMotion,
}: {
  item: AccordionItemData;
  open: boolean;
  quiet: boolean;
  reduceMotion: boolean;
}) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        quiet
          ? "rounded-xl bg-gray-100 px-4 py-2.5 dark:bg-gray-900"
          : "group border-gray-200 border-t first:border-t-0 dark:border-gray-800",
        !quiet && "px-1",
      )}
      value={item.id}
    >
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          className={cn(
            "flex w-full cursor-pointer items-baseline text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-inset",
            quiet ? "gap-4" : "items-start justify-between gap-6",
            open ? (quiet ? "" : "pt-5 pb-3") : quiet ? "" : "py-5",
          )}
        >
          {quiet ? (
            <span
              aria-hidden="true"
              className={cn(
                "text-[15px] leading-none transition-colors duration-150",
                open ? "text-gray-900 dark:text-gray-100" : "text-gray-400 dark:text-gray-500",
              )}
            >
              {open ? "−" : "+"}
            </span>
          ) : (
            <span
              aria-hidden="true"
              className="relative mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-gray-900 dark:text-gray-100"
            >
              <span className="absolute h-px w-3 rounded-full bg-current" />
              <span
                className={cn(
                  "absolute h-3 w-px origin-center rounded-full bg-current transition-opacity duration-150",
                  open && "opacity-0",
                )}
              />
            </span>
          )}
          <span
            className={cn(
              "font-normal text-[15px] leading-6 tracking-[-0.02em] sm:text-base",
              quiet
                ? "text-gray-900 dark:text-gray-100"
                : "flex-1 text-gray-900 dark:text-gray-100",
            )}
          >
            {item.title}
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionContent open={open} reduceMotion={reduceMotion}>
        {item.content}
      </AccordionContent>
    </AccordionPrimitive.Item>
  );
}

export function Accordion({
  items,
  className,
  defaultValue = [],
  multiple = false,
  variant = "default",
}: AccordionProps) {
  const reduceMotion = useReducedMotion() === true;
  const [openItems, setOpenItems] = React.useState<string[]>(defaultValue);
  const quiet = variant === "quiet";

  const rows = items.map((item) => (
    <AccordionRow
      item={item}
      key={item.id}
      open={openItems.includes(item.id)}
      quiet={quiet}
      reduceMotion={reduceMotion}
    />
  ));

  if (multiple) {
    return (
      <AccordionPrimitive.Root
        className={cn("w-full", quiet && "space-y-1.5", className)}
        onValueChange={setOpenItems}
        type="multiple"
        value={openItems}
      >
        {rows}
      </AccordionPrimitive.Root>
    );
  }

  return (
    <AccordionPrimitive.Root
      className={cn("w-full", quiet && "space-y-1.5", className)}
      collapsible
      onValueChange={(value) => setOpenItems(value ? [value] : [])}
      type="single"
      value={openItems[0]}
    >
      {rows}
    </AccordionPrimitive.Root>
  );
}
