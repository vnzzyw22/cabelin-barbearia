"use client";

import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { PHOTOS, PLAN_TERM, PLANS, whatsappUrl, type Plan } from "@/content/cabelin";
import { formatAmount } from "@/lib/format";
import { EASE } from "@/lib/motion";
import { Bigode } from "./brand";
import { Parallax, RevealClip, RevealWords } from "./motion";

// Club de Assinatura. Cada plano é um "cartão de membro" (o mesmo cartão que
// aparece na Área do cliente), com inclinação leve seguindo o ponteiro.
// Assinar = conversa no WhatsApp com o plano já escrito: funciona hoje, sem
// cobrança automática (que dependeria de gateway, fora desta prévia).

function MemberCard({ plan, index }: { plan: Plan; index: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 160, damping: 18 });
  const shine = useTransform(px, [0, 1], ["0%", "100%"]);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const featured = Boolean(plan.featured);
  const [reais, centavos] = formatAmount(plan.monthlyPrice).split(",");

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE }}
      className={`[perspective:1200px] ${featured ? "lg:-mt-8" : ""}`}
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX: rx, rotateY: ry }}
        className={`chamfer relative flex h-full flex-col overflow-hidden p-7 md:p-8 [--cut:22px] ${
          featured ? "bg-sand text-ink" : "bg-ink-2 text-led shadow-[inset_0_0_0_1px_rgba(238,246,247,0.14)]"
        }`}
      >
        {/* reflexo que acompanha o ponteiro */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          style={{ left: shine, x: "-50%" }}
        />
        <div className="flex items-start justify-between gap-4">
          <p className={`kicker text-[0.85rem] ${featured ? "text-ink/70" : "text-ash"}`}>
            Membro Cabelin
          </p>
          <Bigode className={`w-14 ${featured ? "text-ink" : "text-sand"}`} />
        </div>

        <h3 className="mt-10 font-display text-[clamp(2.6rem,4.2vw,3.4rem)] leading-[0.85] font-black uppercase">
          {plan.name}
        </h3>
        {featured && (
          <p className="mt-3 w-fit bg-ink px-2.5 py-1 font-display text-[0.85rem] font-bold tracking-[0.18em] text-sand uppercase">
            O mais completo
          </p>
        )}

        <p className="mt-7 flex items-start gap-1 font-display leading-none font-black">
          <span className="mt-2 text-[1.3rem]">R$</span>
          <span className="text-[4.6rem] tracking-[-0.01em]">{reais}</span>
          <span className="mt-2 text-[1.5rem]">,{centavos}</span>
          <span className={`mt-auto mb-2 ml-1 text-[1rem] font-semibold tracking-[0.12em] uppercase ${featured ? "text-ink/65" : "text-ash"}`}>
            /mês
          </span>
        </p>

        <ul className={`mt-6 flex flex-1 flex-col gap-2.5 border-t pt-6 ${featured ? "border-ink/15" : "border-[var(--line-on-dark)]"}`}>
          {plan.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-3 text-[0.98rem] leading-snug">
              <svg aria-hidden="true" viewBox="0 0 20 22" className={`mt-[3px] h-[15px] w-[14px] shrink-0 ${featured ? "text-petrol" : "text-sand"}`}>
                <path d="M10 1 19 6v10l-9 5-9-5V6z" fill="none" stroke="currentColor" strokeWidth="2.4" />
              </svg>
              {perk}
            </li>
          ))}
        </ul>

        <p className={`mt-6 text-[0.85rem] ${featured ? "text-smoke-sand" : "text-ash"}`}>
          {plan.days} · {PLAN_TERM}
        </p>
        <a
          href={whatsappUrl(`Olá! Quero assinar o ${plan.name} da Cabelin. Como funciona?`)}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn mt-5 w-full ${featured ? "btn-dark" : "btn-sand"}`}
        >
          Quero o {plan.name.replace("Club ", "")}
          <span className="sr-only"> (abre o WhatsApp)</span>
        </a>
      </motion.div>
    </motion.li>
  );
}

export function ClubSection() {
  return (
    <section
      id="club"
      aria-labelledby="club-titulo"
      className="on-dark hex-texture relative overflow-hidden bg-petrol-deep py-[clamp(88px,12vw,168px)] text-led"
    >
      <div className="wrap">
        <header className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-7">
            <p className="kicker text-sand">
              <span className="tabular">01</span>
              <span aria-hidden="true" className="h-px w-8 bg-current" />
              Club de Assinatura
            </p>
            <RevealWords as="h2" id="club-titulo" text="Corta quando quiser. Paga uma vez por mês." className="display-lg mt-5 block" />
            <p className="lede mt-7 max-w-[34rem] text-ash">
              Você vira membro, a gente cuida do resto: horário garantido, preço fechado e o café da casa por conta. Sem
              fidelidade.
            </p>
          </div>
          {/* A própria campanha do Club: "Bora ficar na régua?" */}
          <div className="lg:col-span-4 lg:col-start-9">
            <RevealClip from="right">
              <div className="chamfer relative aspect-[4/5] overflow-hidden [--cut:24px]">
                <Parallax offset={18} className="absolute -inset-y-6 inset-x-0">
                  <Image src={PHOTOS.club.src} alt={PHOTOS.club.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
                </Parallax>
              </div>
            </RevealClip>
          </div>
        </header>

        <ul className="mt-14 grid gap-5 md:mt-20 lg:grid-cols-3 lg:gap-6">
          {PLANS.map((plan, i) => (
            <MemberCard key={plan.id} plan={plan} index={i} />
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 text-[0.95rem] text-ash sm:flex-row sm:items-center sm:justify-between">
          <p>
            Já é membro?{" "}
            <Link href="/cliente" className="link text-led">
              Veja seu plano e seus horários na Área do cliente
            </Link>
          </p>
          <p className="caption">Planos e valores de exemplo nesta prévia.</p>
        </div>
      </div>
    </section>
  );
}
