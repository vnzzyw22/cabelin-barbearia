import { BRAND, CLIPS, WHATSAPP_DEFAULT_MESSAGE, whatsappUrl } from "@/content/cabelin";
import { InViewVideo } from "./in-view-video";
import { FadeUp, RevealWords } from "./motion";

// Onde estamos: dentro do Muffato Apucarana (subsolo), com o estacionamento
// coberto em vídeo sobre o mapa; endereço, horário real (da bio) e os três
// caminhos de contato. O mapa ganha o tom petróleo por filtro, para não
// quebrar a paleta com o colorido padrão do Google.

const WEEK = [
  ["Segunda", "9h — 21h"],
  ["Terça", "9h — 21h"],
  ["Quarta", "9h — 21h"],
  ["Quinta", "9h — 21h"],
  ["Sexta", "9h — 21h"],
  ["Sábado", "9h — 21h"],
  ["Domingo", "Fechado"],
] as const;

export function ContactSection() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="on-dark relative bg-petrol py-[clamp(88px,12vw,168px)] text-led">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-5">
          <p className="kicker text-sand">
            <span className="tabular">06</span>
            <span aria-hidden="true" className="h-px w-8 bg-current" />
            Onde estamos
          </p>
          <RevealWords as="h2" id="contato-titulo" text={"Dentro do\nMuffato."} className="display-lg mt-5 block" />
          <p className="lede mt-6 text-led/85">
            {BRAND.address} · {BRAND.city} – {BRAND.state}
            <br />
            <span className="text-led/70">Subsolo, com estacionamento coberto e amplo. Estacionou, desceu, chegou.</span>
          </p>

          <FadeUp delay={0.15} className="mt-10">
            <dl className="border-t border-[var(--line-on-dark)]">
              {WEEK.map(([day, hours]) => (
                <div key={day} className="flex items-baseline justify-between border-b border-[var(--line-on-dark)] py-3">
                  <dt className="font-display text-[1.35rem] font-bold tracking-[0.04em] uppercase">{day}</dt>
                  <dd className={`tabular ${hours === "Fechado" ? "text-led/60" : ""}`}>{hours}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href={BRAND.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sand min-h-14 px-8">
                Como chegar
              </a>
              <a href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light min-h-14 px-8">
                WhatsApp
              </a>
              <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light min-h-14 px-8">
                Instagram
              </a>
            </div>
            <p className="mt-5 text-[0.95rem] text-led/75">{BRAND.whatsappLabel}</p>
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="lg:col-span-7">
          <div className="chamfer relative h-full min-h-[380px] overflow-hidden bg-petrol-deep [--cut:28px] lg:min-h-[620px]">
            <iframe
              title={`Mapa: ${BRAND.name}, ${BRAND.address}, ${BRAND.city}`}
              src={BRAND.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_contrast(1.05)_brightness(0.92)]"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-petrol/35 mix-blend-multiply" />
            {/* Estacionamento coberto do Muffato */}
            <figure className="absolute right-3 bottom-3 w-[42%] max-w-[260px] md:right-5 md:bottom-5">
              <div className="chamfer relative aspect-[4/5] shadow-[0_20px_40px_rgba(0,0,0,0.4)] [--cut:14px]">
                <InViewVideo src={CLIPS.estacionamento.src} poster={CLIPS.estacionamento.poster} className="absolute inset-0 h-full w-full" />
              </div>
              <figcaption className="mt-2 bg-ink/75 px-2 py-1 font-display text-[0.85rem] font-bold tracking-[0.12em] text-led uppercase backdrop-blur-sm">
                Estacionamento coberto
              </figcaption>
            </figure>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
