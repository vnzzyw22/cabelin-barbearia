"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BRAND, HERO_VIDEO } from "@/content/cabelin";
import { EASE } from "@/lib/motion";
import { Bigode } from "./brand";

// Dois cortes do mesmo filme: tela mais larga que alta → tríptico 1920×1080;
// retrato → vertical 720×1280. O pôster fica sempre por baixo: se o vídeo não
// tocar (autoplay bloqueado, economia de dados, movimento reduzido), a hero
// continua inteira.
const LANDSCAPE = "(min-aspect-ratio: 1/1)";

function HeroVideo() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [orientation, setOrientation] = useState<"landscape" | "portrait" | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(LANDSCAPE);
    const pick = () => {
      setPlaying(false);
      setOrientation(mq.matches ? "landscape" : "portrait");
    };
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !orientation) return;
    // `muted` como propriedade (não só atributo): é o que o iOS/Chrome checam
    // para liberar o autoplay — causa comum de vídeo de fundo que não aparece.
    video.muted = true;
    const tryPlay = () => video.play().catch(() => setPlaying(false));
    tryPlay();
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? tryPlay() : video.pause()),
      { threshold: 0.05 },
    );
    observer.observe(video);
    const onVisibility = () => (document.hidden ? video.pause() : tryPlay());
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [orientation]);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink">
      <picture>
        <source media={LANDSCAPE} srcSet={HERO_VIDEO.landscape.poster} />
        <img src={HERO_VIDEO.portrait.poster} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      </picture>
      {orientation && !reduceMotion && (
        <video
          ref={videoRef}
          key={orientation}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-[var(--ease)] ${playing ? "opacity-100" : "opacity-0"}`}
          src={HERO_VIDEO[orientation].video}
          poster={HERO_VIDEO[orientation].poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onPlaying={() => setPlaying(true)}
        />
      )}
    </div>
  );
}

/** Selo girando com o lema, o bigode no centro. */
function MottoSeal({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const text = `${BRAND.motto.replace(".", "")} · Apucarana · `;
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <path id="selo" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-display text-[15.5px] font-bold tracking-[0.2em] uppercase">
          <textPath href="#selo">{text.repeat(2)}</textPath>
        </text>
      </motion.svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Bigode className="w-[46%]" />
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const line = (delay: number) => ({
    initial: reduce ? false : { y: "105%" },
    animate: { y: 0 },
    transition: { duration: 1, delay, ease: EASE },
  });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-titulo"
      className="on-dark relative isolate flex h-[100svh] min-h-[640px] flex-col overflow-hidden bg-ink text-led"
    >
      <HeroVideo />
      {/* Tom petróleo da parede por cima do filme + base escura para o texto. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-petrol-deep/45 mix-blend-multiply" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(11,15,16,0.94) 0%, rgba(11,15,16,0.55) 38%, rgba(11,15,16,0.1) 70%, rgba(11,15,16,0.55) 100%)",
        }}
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />


      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="wrap relative flex flex-1 flex-col justify-end pt-[calc(var(--nav-h)+24px)] pb-[clamp(28px,6vh,64px)]"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="kicker text-sand"
        >
          <span className="h-px w-8 bg-sand" aria-hidden="true" />
          Barbearia · {BRAND.city}/{BRAND.state}
        </motion.p>

        <h1 id="hero-titulo" className="display-xl mt-5 md:mt-6">
          <span className="sr-only">Barbearia Cabelin — você merece algo além do básico.</span>
          <span aria-hidden="true" className="-mt-[0.2em] block overflow-hidden pt-[0.2em] pb-[0.04em]">
            <motion.span className="block" {...line(0.5)}>
              Além do
            </motion.span>
          </span>
          <span aria-hidden="true" className="-mt-[0.2em] block overflow-hidden pt-[0.2em] pb-[0.06em]">
            <motion.span className="block text-sand" {...line(0.62)}>
              básico.
            </motion.span>
          </span>
        </h1>

        <div className="mt-7 grid gap-8 md:mt-10 md:grid-cols-[1fr_auto] md:items-end">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
            className="flex max-w-[34rem] flex-col gap-7"
          >
            <p className="lede text-led/85">
              Corte, barba, café e chopp no balcão, num salão que você vai querer fotografar. Dentro do Muffato
              Apucarana, seg a sáb, das 9h às 21h.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/agendar" className="btn btn-sand min-h-14 px-9">
                Agendar horário
              </Link>
              <Link href="/#club" className="btn btn-glass min-h-14 px-8">
                Conhecer o Club
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 1.4, ease: EASE }}
            className="hidden text-led/90 md:block"
          >
            <MottoSeal className="w-[clamp(120px,11vw,170px)]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
