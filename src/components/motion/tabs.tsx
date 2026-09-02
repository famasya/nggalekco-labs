"use client";

import { motion, MotionConfig, useReducedMotion, type Transition } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type Variant = "pill" | "underline" | "segment";

type TabsContext = {
  value: string;
  setValue: (value: string) => void;
  layoutId: string;
  variant: Variant;
};

const tabsContext = createContext<TabsContext | null>(null);

function useTabs() {
  const context = useContext(tabsContext);
  if (!context) throw new Error("Tabs.* must be used inside <Tabs>");
  return context;
}

const indicatorTransition: Transition = {
  type: "spring",
  stiffness: 170,
  damping: 24,
  mass: 1.2,
};

export function Tabs({
  defaultValue,
  value,
  onValueChange,
  variant = "pill",
  children,
  className,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const layoutId = useId();
  const reduce = useReducedMotion();
  const controlled = value !== undefined;
  const currentValue = controlled ? value : internalValue;
  const setValue = useCallback(
    (nextValue: string) => {
      if (!controlled) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    },
    [controlled, onValueChange],
  );
  const contextValue = useMemo(
    () => ({ value: currentValue, setValue, layoutId, variant }),
    [currentValue, layoutId, setValue, variant],
  );

  return (
    <MotionConfig transition={reduce ? { duration: 0 } : indicatorTransition}>
      <tabsContext.Provider value={contextValue}>
        <motion.div layoutRoot className={className}>
          {children}
        </motion.div>
      </tabsContext.Provider>
    </MotionConfig>
  );
}

const listClasses: Record<Variant, string> = {
  pill: "inline-flex items-center gap-1 rounded-full bg-card p-1",
  underline: "inline-flex items-center gap-1 border-b border-border",
  segment: "inline-flex items-center gap-0 rounded-lg bg-card p-0.5",
};

export function TabsList({ children, className }: { children: ReactNode; className?: string }) {
  const { variant } = useTabs();

  return (
    <div role="tablist" className={cn(listClasses[variant], className)}>
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
  indicatorClassName,
}: {
  value: string;
  children: ReactNode;
  className?: string;
  indicatorClassName?: string;
}) {
  const { value: currentValue, setValue, layoutId, variant } = useTabs();
  const active = currentValue === value;

  if (variant === "underline") {
    return (
      <button
        type="button"
        role="tab"
        aria-selected={active}
        data-state={active ? "active" : "inactive"}
        onClick={() => setValue(value)}
        className={cn(
          "relative isolate -mb-px inline-flex min-h-[44px] items-center px-3 pb-2.5 pt-1 text-sm font-medium transition-colors",
          active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
          className,
        )}
      >
        {children}
        {active ? (
          <motion.span
            layoutId={layoutId}
            layout="position"
            className={cn("absolute inset-x-0 -bottom-px h-px bg-primary", indicatorClassName)}
          />
        ) : null}
      </button>
    );
  }

  const radius = variant === "pill" ? "rounded-full" : "rounded-md";

  return (
    <div className="relative">
      {active ? (
        <motion.span
          layoutId={layoutId}
          layout="position"
          style={{ borderRadius: variant === "pill" ? 9999 : 8 }}
          className={cn("absolute inset-0 bg-primary", radius, indicatorClassName)}
        />
      ) : null}
      <button
        type="button"
        role="tab"
        aria-selected={active}
        data-state={active ? "active" : "inactive"}
        onClick={() => setValue(value)}
        className={cn(
          "relative z-10 inline-flex items-center justify-center whitespace-nowrap bg-transparent px-3.5 py-1.5 text-sm font-medium outline-none transition-colors",
          active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
          radius,
          className,
        )}
      >
        {children}
      </button>
    </div>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: ReactNode;
  className?: string;
}) {
  const { value: currentValue } = useTabs();
  const reduce = useReducedMotion();
  const active = currentValue === value;

  if (!active) {
    return (
      <div hidden className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      key={value}
      initial={{ opacity: 0, y: reduce ? 0 : 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={cn("mt-4", className)}
    >
      {children}
    </motion.div>
  );
}
