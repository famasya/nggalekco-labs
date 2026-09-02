import { createFileRoute, Link } from "@tanstack/react-router";

import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/portofolios")({
  head: () => ({
    meta: [
      {
        title: "Portofolio — Nggalekco Labs",
      },
    ],
  }),
  component: Portofolios,
});

function Portofolios() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <h1 className="text-4xl font-normal tracking-tight">Portofolio</h1>
        <p className="mt-4 max-w-md text-gray-400">Halaman portofolio sedang disiapkan.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 text-sm text-gray-300 underline-offset-4 hover:text-white hover:underline"
        >
          Kembali ke beranda
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
