import type { ReactNode } from "react";
import { RevealWords } from "./motion";

// Cabeçalho padrão das seções: número + nome (régua de cartaz), título grande
// revelado por palavra e um parágrafo opcional ao lado.
export function SectionHead({
  index,
  label,
  title,
  id,
  children,
  tone = "dark",
}: {
  index: string;
  label: string;
  title: string;
  id: string;
  children?: ReactNode;
  tone?: "dark" | "light";
}) {
  const muted = tone === "dark" ? "text-ash" : "text-smoke";
  return (
    <header className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-8">
      <div className="lg:col-span-7">
        <p className={`kicker ${tone === "dark" ? "text-sand" : "text-petrol"}`}>
          <span className="tabular">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-current" />
          {label}
        </p>
        <RevealWords as="h2" id={id} text={title} className="display-lg mt-5 block" />
      </div>
      {children && <div className={`lede lg:col-span-4 lg:col-start-9 ${muted}`}>{children}</div>}
    </header>
  );
}
