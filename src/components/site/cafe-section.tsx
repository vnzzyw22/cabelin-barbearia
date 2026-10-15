"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BRAND, CAFE_MENU, CAFE_QUOTE, CLIPS, PHOTOS } from "@/content/cabelin";
import { EASE } from "@/lib/motion";
import { InViewVideo } from "./in-view-video";
import { FadeUp, Parallax, RevealClip, RevealWords } from "./motion";

// A cafeteria. O site troca de temperatura: sai o preto/petróleo do salão,
// entra o areia do uniforme. Título = legenda da própria Cabelin
// ("Desacelere"); texto = o post "Cafeteria exclusiva". Foto real do balcão,
// filme da inauguração (vitrine, salgados, chopp, máquina de café) e o
// salgado sendo cortado, num recorte pequeno.

function Steam() {
  const reduce = useReducedMotion();
  const paths = ["M20 120 C 6 96, 34 80, 20 56 S 34 16, 22 2", "M52 120 C 38 92, 66 78, 52 52 S 66 14, 54 0", "M84 120 C 70 96, 98 80, 84 56 S 98 16, 86 2"];
  return (
    <svg aria-hidden="true" viewBox="0 0 104 122" className="h-full w-auto overflow-visible">
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={6}
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={reduce ? { pathLength: 1, opacity: 0.6 } : { pathLength: [0, 1, 1], opacity: [0, 0.8, 0], y: [8, -4, -16] }}
          transition={{ duration: 3.2, delay: i * 0.55, repeat: Infinity, ease: "easeInOut", times: [0, 0.55, 1] }}
        />
      ))}
    </svg>
  );
}

export function CafeSection() {
  return (
    <section id="cafeteria" aria-labelledby="cafe-titulo" className="relative overflow-hidden bg-sand py-[clamp(88px,12vw,168px)] text-ink">
      <div className="wrap">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-7">
            <p className="kicker text-petrol">
              <span className="tabular">03</span>
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              Cafeteria exclusiva
            </p>
            <div className="relative mt-5 w-fit">
              <RevealWords as="h2" id="cafe-titulo" text="Desacelere." className="display-xl block" />
              <div aria-hidden="true" className="absolute -top-[0.5em] right-[0.1em] h-[0.55em] text-petrol" style={{ fontSize: "clamp(4rem,13vw,13.5rem)" }}>
                <Steam />
              </div>
            </div>
          </div>
          <FadeUp delay={0.15} className="lg:col-span-5">
            <blockquote className="border-l-2 border-ink pl-5">
              <p className="font-display text-[clamp(1.7rem,2.5vw,2.2rem)] leading-[1.02] font-bold uppercase">{CAFE_QUOTE}</p>
              <footer className="mt-3 text-[0.92rem] text-smoke-sand">@{BRAND.instagramHandle}</footer>
            </blockquote>
          </FadeUp>
        </header>

        <div className="mt-14 grid gap-4 md:mt-20 lg:grid-cols-12 lg:gap-6">
          {/* Balcão: a foto real, grande */}
          <div className="relative lg:col-span-7">
            <RevealClip>
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                <Parallax offset={22} className="absolute -inset-y-6 inset-x-0">
                  <Image src={PHOTOS.cafeteria.src} alt={PHOTOS.cafeteria.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                </Parallax>
              </div>
            </RevealClip>
            {/* Salgado sendo cortado: recorte pequeno sobre a foto */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
              className="absolute right-3 -bottom-6 w-[38%] max-w-[230px] shadow-[0_24px_50px_rgba(11,15,16,0.35)] md:right-6 lg:-right-10"
            >
              <div className="chamfer relative aspect-[4/5] [--cut:14px]">
                <InViewVideo src={CLIPS.salgado.src} poster={CLIPS.salgado.poster} className="absolute inset-0 h-full w-full" />
              </div>
              <p className="mt-2 font-display text-[0.9rem] font-bold tracking-[0.14em] uppercase">Salgado do dia</p>
            </motion.div>
          </div>

          <div className="mt-14 flex flex-col gap-4 lg:col-span-5 lg:mt-0 lg:gap-6">
            <RevealClip from="right">
              <div className="relative aspect-[4/5] lg:aspect-[5/5]">
                <InViewVideo src={CLIPS.cafe.src} poster={CLIPS.cafe.poster} className="absolute inset-0 h-full w-full" />
              </div>
            </RevealClip>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="chamfer bg-ink p-7 text-led [--cut:22px] md:p-8"
            >
              <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line-on-dark)] pb-4">
                <h3 className="font-display text-[1.9rem] leading-none font-black uppercase">Enquanto espera</h3>
                <p className="kicker text-[0.8rem] text-sand">No balcão</p>
              </div>
              <ul className="mt-1">
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
              <Link href="/agendar" className="btn btn-sand mt-6 w-full min-h-14">
                Agendar e chegar mais cedo
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
