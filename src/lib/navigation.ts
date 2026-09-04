import type { FileRoutesByTo } from "@/routeTree.gen";

import { Briefcase, Home, Users, type LucideIcon } from "lucide-react";

export type RoutePath = keyof FileRoutesByTo;

export type NavItem = {
  value: string;
  icon: LucideIcon;
  to: RoutePath;
  kind: "section" | "route";
};

export const navItems: readonly NavItem[] = [
  { value: "home", icon: Home, to: "/", kind: "section" },
  { value: "approach", icon: Users, to: "/team", kind: "route" },
  { value: "portfolio", icon: Briefcase, to: "/portofolios", kind: "route" },
];

export const sectionNavItems = navItems.filter(
  (item): item is NavItem & { kind: "section" } => item.kind === "section",
);

export const routeNavItems = navItems.filter(
  (item): item is NavItem & { kind: "route" } => item.kind === "route",
);
