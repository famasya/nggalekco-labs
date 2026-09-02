import { createFileRoute } from "@tanstack/react-router";

import { PortfolioShowcase } from "@/components/portfolio-showcase";

export const Route = createFileRoute("/portofolios")({
  head: () => ({
    meta: [
      {
        title: "Portofolio — nggalek.co Labs",
      },
    ],
  }),
  component: Portofolios,
});

function Portofolios() {
  return <PortfolioShowcase />;
}
