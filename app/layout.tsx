import "./globals.css";
import type { Metadata } from "next";
import { AppShell } from "@/components/AppShell";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "SIGLStudio",
  description: "Compose, explore, validate, and export SIGL."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
