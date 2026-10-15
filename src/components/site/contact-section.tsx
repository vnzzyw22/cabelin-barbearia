import { BRAND, WHATSAPP_DEFAULT_MESSAGE, whatsappUrl } from "@/content/cabelin";
import { FadeUp, RevealWords } from "./motion";

// Onde estamos: endereço grande, horário real (da bio), mapa e os três
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
          <RevealWords as="h2" id="contato-titulo" text={"Rua Bela Vista,\n99."} className="display-lg mt-5 block" />
          <p className="lede mt-6 text-led/80">
            {BRAND.neighborhood} · {BRAND.city} – {BRAND.state} · {BRAND.zip}
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
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
