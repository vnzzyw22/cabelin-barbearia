"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CLIPS, PHOTOS, SERVICE_CATEGORIES, SERVICES, type ServiceCategory } from "@/content/cabelin";
import { useDemoState } from "@/lib/demo/store";
import { formatAmount } from "@/lib/format";
import { EASE } from "@/lib/motion";
import { InViewVideo } from "./in-view-video";
import { RevealClip } from "./motion";
import { SectionHead } from "./section-head";

// Vídeo de cada categoria (recortes do reel da Cabelin).
const TAB_CLIP = { cabelo: CLIPS.cabelo, barba: CLIPS.barba, rosto: CLIPS.acabamento } as const;

const GALLERY = [
  { key: "tesoura", label: "Tesoura" },
  { key: "freestyle", label: "Freestyle na navalha" },
  { key: "pente", label: "Finalização" },
] as const;

function TabVideo({ tab, className }: { tab: ServiceCategory; className: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative overflow-hidden bg-graphite ${className}`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={tab}
          initial={reduce ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="absolute inset-0"
        >
          <InViewVideo src={TAB_CLIP[tab].src} poster={TAB_CLIP[tab].poster} className="absolute inset-0 h-full w-full" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Serviços: carta numerada por categoria. Preço vem do store da
// demonstração (o que for editado no painel aparece aqui). Cada linha leva
// ao agendamento com o serviço já marcado.

export function ServicesSection() {
  const reduce = useReducedMotion();
  const state = useDemoState();
  const [tab, setTab] = useState<ServiceCategory>("cabelo");

  const notes = new Map(SERVICES.map((s) => [s.id, s.note]));
  const all = state
    ? state.services.filter((s) => s.active).map((s) => ({ ...s, note: notes.get(s.id) ?? "" }))
    : SERVICES.map((s) => ({ ...s, durationMinutes: s.demoDurationMinutes }));
  const list = all.filter((s) => s.category === tab);

  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="on-dark relative bg-ink py-[clamp(88px,12vw,168px)] text-led">
      <div className="wrap">
        <SectionHead index="05" label="Serviços" title="O básico, feito além." id="servicos-titulo">
          Do corte de toda semana à pigmentação. Escolha, marque o horário e chegue só pra sentar.
        </SectionHead>

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-8">
            <div role="tablist" aria-label="Categorias de serviço" className="flex gap-2 overflow-x-auto no-scrollbar">
              {SERVICE_CATEGORIES.map((c) => {
                const active = c.id === tab;
                return (
                  <button
                    key={c.id}
                    role="tab"
                    type="button"
                    id={`tab-${c.id}`}
                    aria-selected={active}
                    aria-controls="servicos-lista"
                    onClick={() => setTab(c.id)}
                    className={`btn min-h-12 shrink-0 px-6 text-[1.05rem] ${active ? "btn-sand" : "btn-outline-light"}`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            <TabVideo tab={tab} className="chamfer mt-6 aspect-[16/10] [--cut:18px] lg:hidden" />

            <div id="servicos-lista" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.ol
                  key={tab}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="border-t border-[var(--line-on-dark)]"
                >
                  {list.map((s, i) => (
                    <li key={s.id} className="border-b border-[var(--line-on-dark)]">
                      <Link
                        href={`/agendar?servico=${s.id}`}
                        className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-1 py-5 md:gap-x-8 md:py-6"
                      >
                        <span className="font-display text-[1rem] font-semibold tracking-[0.18em] text-sand tabular">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>
                          <span className="block font-display text-[clamp(1.75rem,2.8vw,2.4rem)] leading-[0.95] font-black uppercase transition-transform duration-500 ease-[var(--ease)] group-hover:translate-x-2">
                            {s.name}
                          </span>
                          {s.note && <span className="mt-1 block text-[0.95rem] text-ash">{s.note}</span>}
                        </span>
                        <span className="flex items-center gap-4 text-right">
                          <span className="font-display text-[1.65rem] leading-none font-black whitespace-nowrap">
                            {s.priceFrom && <span className="block text-[0.8rem] font-semibold tracking-[0.12em] text-ash uppercase">a partir de</span>}
                            R$ {formatAmount(s.price)}
                          </span>
                          <span
                            aria-hidden="true"
                            className="hidden h-11 w-11 items-center justify-center bg-led/10 text-[1.2rem] transition-colors group-hover:bg-sand group-hover:text-ink sm:flex"
                          >
                            →
                          </span>
                          <span className="sr-only">Agendar {s.name}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </motion.ol>
              </AnimatePresence>
              <p className="caption mt-4 text-ash">Valores de exemplo nesta prévia.</p>
            </div>
          </div>

          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+24px)]">
              <TabVideo tab={tab} className="chamfer aspect-[4/5] [--cut:24px]" />
              <Link href="/agendar" className="btn btn-sand mt-5 w-full min-h-14">
                Montar meu horário
              </Link>
            </div>
          </aside>
        </div>

        {/* Na régua: o resultado, em foto */}
        <ul className="mt-16 grid grid-cols-3 gap-2 md:mt-24 md:gap-4">
          {GALLERY.map((g, i) => (
            <li key={g.key}>
              <RevealClip delay={i * 0.12}>
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={PHOTOS[g.key].src}
                      alt={PHOTOS[g.key].alt}
                      fill
                      sizes="(min-width: 768px) 30vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease)] hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-2 font-display text-[0.8rem] font-bold tracking-[0.12em] text-ash uppercase md:text-[0.95rem]">
                    {g.label}
                  </figcaption>
                </figure>
              </RevealClip>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
