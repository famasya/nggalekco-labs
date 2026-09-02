import { useEffect } from "react";
import { createFileRoute, useLocation } from "@tanstack/react-router";

import { Hero } from "@/components/hero";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  return (
    <main>
      <Hero />
    </main>
  );
}
