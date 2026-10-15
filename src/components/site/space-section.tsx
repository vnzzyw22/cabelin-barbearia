"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PHOTOS } from "@/content/cabelin";
import { EASE } from "@/lib/motion";
import { Parallax, RevealClip } from "./motion";
import { SectionHead } from "./section-head";

// O espaço. A foto do salão abre com a rolagem (de recorte para tela cheia),
// e os detalhes que fazem a casa — o teto de LED, a parede petróleo, o
// chesterfield — aparecem marcados na própria foto.

type Spot = { x: string; y: string; label: string };
const SPOTS_WIDE: Spot[] = [
  { x: "48%", y: "12%", label: "Teto de hexágonos em LED" },
  { x: "80%", y: "48%", label: "Parede petróleo" },
  { x: "26%", y: "62%", label: "Vitrine de produtos" },
];
const SPOTS_TALL: Spot[] = [
  { x: "50%", y: "13%", label: "Teto de LED" },
  { x: "70%", y: "38%", label: "Parede petróleo" },
  { x: "20%", y: "84%", label: "Chesterfield" },
  { x: "52%", y: "70%", label: "Cadeiras de barbeiro" },
];

function Hotspots({ spots, className }: { spots: Spot[]; className: string }) {
  const reduce = useReducedMotion();
  return (
    <ul className={className} aria-label="Detalhes do salão">
      {spots.map((s, i) => (
        <motion.li
          key={s.label}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 0.7, delay: 0.5 + i * 0.18, ease: EASE }}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
          style={{ left: s.x, top: s.y }}
        >
          <span aria-hidden="true" className="relative flex h-3.5 w-3.5 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-led/50 motion-reduce:hidden" />
            <span className="h-2.5 w-2.5 rounded-full bg-led shadow-[0_0_12px_rgba(238,246,247,0.9)]" />
          </span>
          <span className="bg-ink/75 px-2.5 py-1 font-display text-[0.92rem] font-bold tracking-[0.12em] whitespace-nowrap text-led uppercase backdrop-blur-sm">
            {s.label}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

export function SpaceSection() {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], [9, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v}% ${v}% ${v}%)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);

  return (
    <section id="espaco" aria-labelledby="espaco-titulo" className="on-dark relative bg-ink py-[clamp(88px,12vw,168px)] text-led">
      <div className="wrap">
        <SectionHead index="02" label="O espaço" title="Um salão que acende quando você entra." id="espaco-titulo">
          O novo espaço da Cabelin foi pensado pra você se sentir em casa: mais acolhedor, mais estiloso, com tempo pra
          sentar, tomar um café e sair na régua.
        </SectionHead>
      </div>

      <div ref={frameRef} className="mt-14 md:mt-20 md:px-[var(--gutter)]">
        <motion.div
          style={reduce ? undefined : { clipPath }}
          className="relative mx-auto max-w-[1600px] overflow-hidden"
        >
          {/* Celular: foto vertical do salão. Desktop: o teto em plano aberto. */}
          <div className="relative aspect-[1030/1500] md:hidden">
            <motion.div style={reduce ? undefined : { scale }} className="absolute inset-0">
              <Image src={PHOTOS.salao.src} alt={PHOTOS.salao.alt} fill sizes="100vw" className="object-cover" />
            </motion.div>
            <Hotspots spots={SPOTS_TALL} className="absolute inset-0" />
          </div>
          <div className="relative hidden aspect-[1185/740] md:block">
            <motion.div style={reduce ? undefined : { scale }} className="absolute inset-0">
              <Image src={PHOTOS.teto.src} alt={PHOTOS.teto.alt} fill sizes="(min-width: 1600px) 1600px, 92vw" className="object-cover" />
            </motion.div>
            <Hotspots spots={SPOTS_WIDE} className="absolute inset-0" />
          </div>
        </motion.div>
      </div>

      <div className="wrap mt-6 grid gap-5 md:mt-8 md:grid-cols-12 md:gap-6">
        <RevealClip className="md:col-span-5" from="left">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={PHOTOS.salao.src} alt={PHOTOS.salao.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-bottom" />
          </div>
        </RevealClip>
        <div className="flex flex-col gap-5 md:col-span-7 md:gap-6">
          <Parallax offset={30}>
            <RevealClip from="right">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={PHOTOS.filmeCapa.src} alt={PHOTOS.filmeCapa.alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
              </div>
            </RevealClip>
          </Parallax>
          <dl className="grid grid-cols-2 gap-px bg-[var(--line-on-dark)] md:grid-cols-3">
            {[
              ["Seg a sáb", "9h às 21h"],
              ["Rua Bela Vista", "nº 99"],
              ["Cafeteria", "dentro do salão"],
            ].map(([a, b]) => (
              <div key={a} className="bg-ink p-5 last:col-span-2 md:last:col-span-1">
                <dt className="font-display text-[1.9rem] leading-none font-black uppercase">{a}</dt>
                <dd className="mt-2 text-ash">{b}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
