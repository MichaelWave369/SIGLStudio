import Link from "next/link";
import { ReactNode } from "react";

const nav = ["/", "/compose", "/validate", "/atlas", "/sequences", "/export"];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-5 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">SIGL Studio v0.1</p>
          <h1 className="text-2xl font-semibold">Symbolic Observatory</h1>
        </div>
        <nav className="flex flex-wrap gap-2">
          {nav.map((item) => (
            <Link key={item} href={item} className="rounded-lg border border-line px-3 py-1.5 text-sm hover:border-accent/40">
              {item === "/" ? "home" : item.slice(1)}
            </Link>
          ))}
        </nav>
      </header>
      {children}
    </div>
  );
}
