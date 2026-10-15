"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PHOTOS, TEAM_PLACEHOLDER } from "@/content/cabelin";
import { useDemoState } from "@/lib/demo/store";
import { EASE } from "@/lib/motion";
import { Parallax, RevealClip } from "./motion";
import { SectionHead } from "./section-head";

// Equipe. O panorama dos cinco de uniforme areia ocupa a largura toda e
// "anda" com a rolagem (no celular revela um por um); abaixo, um barbeiro em
// ação e a escalação numerada — cada linha leva direto ao
// agendamento com aquele profissional. Lê os nomes do store da demonstração,
// então um nome trocado no painel aparece aqui.

export function TeamSection() {
  const reduce = useReducedMotion();
  const state = useDemoState();
  const panoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: panoRef, offset: ["start end", "end start"] });
  const pan = useTransform(scrollYProgress, [0.1, 0.9], ["0% 60%", "100% 60%"]);
  const team = state ? state.staff.filter((s) => s.active).map((s) => ({ id: s.id, name: s.name, role: s.role })) : TEAM_PLACEHOLDER;

  return (
    <section id="equipe" aria-labelledby="equipe-titulo" className="relative bg-paper py-[clamp(88px,12vw,168px)] text-ink">
      <div className="wrap">
        <SectionHead index="04" label="Equipe" title="Quem deixa você na régua." id="equipe-titulo" tone="light">
          Uniforme areia, tesoura afiada e atenção total em quem está na cadeira. Escolha com quem você quer cortar e
          vá direto pra agenda dele.
        </SectionHead>

      </div>

      {/* Panorama dos cinco: sangra a largura toda */}
      <div ref={panoRef} className="mt-14 md:mt-20">
        <RevealClip>
          <div className="relative aspect-[4/5] overflow-hidden bg-sand sm:aspect-[16/9] lg:aspect-[21/9]">
            <motion.img
              src={PHOTOS.equipe.src}
              alt={PHOTOS.equipe.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: reduce ? "50% 60%" : pan }}
            />
          </div>
        </RevealClip>
      </div>

      <div className="wrap">
        <div className="mt-6 grid gap-10 md:mt-8 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <RevealClip from="left">
              <div className="relative aspect-[1350/1080] overflow-hidden bg-ink">
                <Parallax offset={16} className="absolute -inset-y-6 inset-x-0">
                  <Image src={PHOTOS.secador.src} alt={PHOTOS.secador.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                </Parallax>
              </div>
            </RevealClip>
          </div>

          <div className="flex flex-col justify-end lg:col-span-5">
            <ol className="border-t border-ink">
              {team.map((member, i) => (
                <motion.li
                  key={member.id}
                  initial={reduce ? false : { opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                  className="border-b border-ink"
                >
                  <Link
                    href={`/agendar?profissional=${member.id}`}
                    className="group relative flex items-center gap-5 overflow-hidden py-5 md:py-6"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[var(--ease)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
                    />
                    <span className="relative font-display text-[1rem] font-semibold tracking-[0.18em] text-petrol transition-colors group-hover:text-sand tabular">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative flex-1">
                      <span className="block font-display text-[clamp(2.2rem,3.6vw,3rem)] leading-[0.9] font-black uppercase transition-colors group-hover:text-led">
                        {member.name}
                      </span>
                      <span className="mt-1 block text-[0.95rem] text-smoke transition-colors group-hover:text-ash">{member.role}</span>
                    </span>
                    <span className="relative font-display text-[0.95rem] font-bold tracking-[0.14em] text-ink uppercase transition-colors group-hover:text-sand">
                      Agendar <span aria-hidden="true">→</span>
                      <span className="sr-only"> com {member.name}</span>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ol>
            <p className="caption mt-4 text-smoke">Nataly confirmada pelo perfil; os demais nomes são de exemplo — a foto é a equipe real.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
