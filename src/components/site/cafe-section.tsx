"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BRAND, CAFE_MENU } from "@/content/cabelin";
import { EASE } from "@/lib/motion";
import { FadeUp, RevealWords } from "./motion";

// A cafeteria. Aqui o site troca de temperatura: sai o preto/petróleo do
// salão, entra o areia do uniforme. O título é a própria legenda da Cabelin
// ("Desacelere"). Sem foto da cafeteria ainda — a composição é tipográfica
// de propósito (a palavra CAFÉ soltando vapor), e funciona sozinha.

function Steam() {
  const reduce = useReducedMotion();
  const paths = [
    "M20 120 C 6 96, 34 80, 20 56 S 34 16, 22 2",
    "M52 120 C 38 92, 66 78, 52 52 S 66 14, 54 0",
    "M84 120 C 70 96, 98 80, 84 56 S 98 16, 86 2",
  ];
  return (
    <svg aria-hidden="true" viewBox="0 0 104 122" className="h-full w-auto overflow-visible">
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={
            reduce
              ? { pathLength: 1, opacity: 0.6 }
              : { pathLength: [0, 1, 1], opacity: [0, 0.75, 0], y: [8, -4, -16] }
          }
          transition={{ duration: 3.2, delay: i * 0.55, repeat: Infinity, ease: "easeInOut", times: [0, 0.55, 1] }}
        />
      ))}
    </svg>
  );
}

export function CafeSection() {
  return (
    <section
      id="cafeteria"
      aria-labelledby="cafe-titulo"
      className="relative overflow-hidden bg-sand py-[clamp(88px,12vw,168px)] text-ink"
    >
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-7">
          <p className="kicker text-petrol">
            <span className="tabular">03</span>
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            Cafeteria
          </p>
          <RevealWords as="h2" id="cafe-titulo" text="Desacelere." className="display-xl mt-5 block" />

          <FadeUp delay={0.2} className="mt-10 max-w-[36rem]">
            <blockquote className="border-l-2 border-ink pl-5">
              <p className="font-display text-[clamp(1.7rem,2.6vw,2.2rem)] leading-[1.02] font-bold uppercase">
                Às vezes, tudo o que você precisa é desacelerar.
              </p>
              <footer className="mt-3 text-[0.92rem] text-smoke-sand">@{BRAND.instagramHandle}</footer>
            </blockquote>
            <p className="lede mt-8 text-smoke-sand">
              A Cabelin tem cafeteria dentro do salão. Chegou antes? Senta, pede um café e espera a sua vez sem olhar o
              relógio. Corte bom começa com cabeça leve.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/agendar" className="btn btn-dark min-h-14 px-9">
                Agendar e chegar mais cedo
              </Link>
            </div>
          </FadeUp>
        </div>

        <div className="flex flex-col lg:col-span-5">
          {/* CAFÉ soltando vapor */}
          <div aria-hidden="true" className="relative select-none">
            <div className="absolute -top-[0.62em] right-[8%] h-[0.62em] text-petrol" style={{ fontSize: "clamp(6rem,15vw,12rem)" }}>
              <Steam />
            </div>
            <p
              className="outline-text font-display leading-[0.78] font-black uppercase"
              style={{ fontSize: "clamp(6rem,15vw,12rem)" }}
            >
              Café
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="chamfer mt-6 bg-ink p-7 text-led [--cut:22px] md:p-9"
          >
            <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line-on-dark)] pb-4">
              <h3 className="font-display text-[1.9rem] leading-none font-black uppercase">Na xícara</h3>
              <p className="kicker text-[0.8rem] text-sand">Cardápio da casa</p>
            </div>
            <ul className="mt-2">
              {CAFE_MENU.map((item, i) => (
                <li key={item.name} className="flex items-baseline gap-4 border-b border-[var(--line-on-dark)] py-4 last:border-0">
                  <span className="font-display text-[0.95rem] font-semibold tracking-[0.12em] text-sand tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[1.65rem] leading-none font-bold uppercase">{item.name}</span>
                  <span aria-hidden="true" className="mx-1 flex-1 translate-y-[-4px] border-b border-dotted border-led/25" />
                  <span className="text-right text-[0.92rem] text-ash">{item.note}</span>
                </li>
              ))}
            </ul>
            <p className="caption mt-4 text-ash">Itens de exemplo nesta prévia — o cardápio real entra aqui.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
