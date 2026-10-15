"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CLIPS, PHOTOS } from "@/content/cabelin";
import { EASE } from "@/lib/motion";
import { InViewVideo } from "./in-view-video";
import { Parallax, RevealClip } from "./motion";
import { SectionHead } from "./section-head";

// O espaço. Abre na vitrine (é o que o cliente vê ao chegar pelo Muffato),
// com os detalhes da casa marcados na própria foto; ao lado, o tour em vídeo
// do filme da inauguração. A moldura abre com a rolagem.

/** `left`: rótulo à esquerda do ponto (para pontos perto da borda direita). */
type Spot = { x: string; y: string; label: string; left?: boolean };
// Posições sobre fachada.jpg (1080×1015), mesmas no celular e no desktop.
const SPOTS: Spot[] = [
  { x: "34%", y: "27%", label: "Teto de hexágonos em LED" },
  { x: "50%", y: "58%", label: "O bigode no vidro" },
  { x: "88%", y: "47%", label: "Parede petróleo", left: true },
  { x: "40%", y: "88%", label: "Chesterfield" },
];

function Hotspots() {
  const reduce = useReducedMotion();
  return (
    <ul className="absolute inset-0" aria-label="Detalhes da vitrine">
      {SPOTS.map((s, i) => (
        <motion.li
          key={s.label}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 0.7, delay: 0.5 + i * 0.18, ease: EASE }}
          className={`absolute flex -translate-y-1/2 items-center gap-2 ${s.left ? "-translate-x-[calc(100%-7px)] flex-row-reverse" : "-translate-x-[7px]"}`}
          style={{ left: s.x, top: s.y }}
        >
          <span aria-hidden="true" className="relative flex h-3.5 w-3.5 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-led/50 motion-reduce:hidden" />
            <span className="h-2.5 w-2.5 rounded-full bg-led shadow-[0_0_12px_rgba(238,246,247,0.9)]" />
          </span>
          <span className="bg-ink/75 px-2.5 py-1 font-display text-[0.85rem] font-bold tracking-[0.12em] whitespace-nowrap text-led uppercase backdrop-blur-sm md:text-[0.92rem]">
            {s.label}
          </span>
        </motion.li>
      ))}
    </ul>
  );
}

const FACTS = [
  ["Dentro do Muffato", "Apucarana, no subsolo"],
  ["Estacionamento", "coberto e amplo"],
  ["Seg a sáb", "9h às 21h"],
  ["Cafeteria", "exclusiva, no salão"],
] as const;

export function SpaceSection() {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const clipPath = useTransform(inset, (v) => `inset(${v}% ${v}% ${v}% ${v}%)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section id="espaco" aria-labelledby="espaco-titulo" className="on-dark relative bg-ink py-[clamp(88px,12vw,168px)] text-led">
      <div className="wrap">
        <SectionHead index="02" label="O espaço" title="Um salão que acende quando você entra." id="espaco-titulo">
          Você estaciona no coberto do Muffato, desce e dá de cara com o bigode no vidro. Lá dentro: teto de LED, sofá
          chesterfield, lavatórios e café passado na hora.
        </SectionHead>
      </div>

      <div ref={frameRef} className="mt-14 md:mt-20 md:px-[var(--gutter)]">
        <motion.div
          style={reduce ? undefined : { clipPath }}
          className="mx-auto grid max-w-[1600px] gap-2 md:grid-cols-12 md:gap-3"
        >
          <div className="relative aspect-[1080/1015] overflow-hidden md:col-span-7 md:aspect-auto md:min-h-[min(78vh,760px)]">
            <motion.div style={reduce ? undefined : { scale }} className="absolute inset-0">
              <Image src={PHOTOS.fachada.src} alt={PHOTOS.fachada.alt} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
            </motion.div>
            <Hotspots />
          </div>
          <div className="relative hidden md:col-span-5 md:block">
            <InViewVideo src={CLIPS.espaco.src} poster={CLIPS.espaco.poster} className="absolute inset-0 h-full w-full" />
            <p className="absolute bottom-4 left-4 bg-ink/70 px-2.5 py-1 font-display text-[0.92rem] font-bold tracking-[0.14em] uppercase backdrop-blur-sm">
              Dia da inauguração
            </p>
          </div>
        </motion.div>
      </div>

      <div className="wrap mt-3 grid gap-3 md:mt-6 md:grid-cols-12 md:gap-6">
        {/* No celular, o tour vem logo abaixo da vitrine. */}
        <RevealClip className="md:hidden">
          <div className="relative aspect-[4/5]">
            <InViewVideo src={CLIPS.espaco.src} poster={CLIPS.espaco.poster} className="absolute inset-0 h-full w-full" />
          </div>
        </RevealClip>
        <div className="md:col-span-5">
          <Parallax offset={24}>
            <RevealClip from="left">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={PHOTOS.cadeira.src} alt={PHOTOS.cadeira.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
              </div>
            </RevealClip>
          </Parallax>
        </div>
        <dl className="grid grid-cols-2 gap-px self-end bg-[var(--line-on-dark)] md:col-span-7">
          {FACTS.map(([a, b]) => (
            <div key={a} className="bg-ink p-5 md:p-7">
              <dt className="font-display text-[clamp(1.6rem,2.6vw,2.3rem)] leading-[0.95] font-black uppercase">{a}</dt>
              <dd className="mt-2 text-ash">{b}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
