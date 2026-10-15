"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CLIPS, PHOTOS } from "@/content/cabelin";
import { InViewVideo } from "./in-view-video";
import { Parallax, RevealClip } from "./motion";
import { SectionHead } from "./section-head";

// O espaço. Abre na vitrine (é o que o cliente vê ao chegar pelo Muffato);
// ao lado, o tour em vídeo do filme da inauguração. Sem rótulos por cima: a
// imagem fala sozinha. A moldura abre com a rolagem.

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
          </div>
          <div className="relative hidden md:col-span-5 md:block">
            <InViewVideo src={CLIPS.espaco.src} poster={CLIPS.espaco.poster} className="absolute inset-0 h-full w-full" />
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
