import Link from "next/link";
import { BRAND, WHATSAPP_DEFAULT_MESSAGE, whatsappUrl } from "@/content/cabelin";
import { Bigode } from "./brand";

export function Footer({ demo }: { demo: boolean }) {
  return (
    <footer className="on-dark hex-texture relative overflow-hidden bg-ink pt-20 pb-[max(28px,env(safe-area-inset-bottom))] text-led md:pt-28">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-5">
            <Bigode className="w-28 text-sand" />
            <p className="mt-6 font-display text-[clamp(1.8rem,3vw,2.4rem)] leading-[0.95] font-black uppercase">
              {BRAND.motto}
            </p>
          </div>
          <nav aria-label="Rodapé" className="grid grid-cols-2 gap-x-8 gap-y-3 text-[0.98rem] md:col-span-4 md:col-start-7">
            <Link href="/agendar" className="link w-fit decoration-transparent hover:decoration-current">Agendar</Link>
            <Link href="/cliente" className="link w-fit decoration-transparent hover:decoration-current">Área do cliente</Link>
            <Link href="/#club" className="link w-fit decoration-transparent hover:decoration-current">Club</Link>
            <Link href="/#cafeteria" className="link w-fit decoration-transparent hover:decoration-current">Cafeteria</Link>
            <Link href="/#servicos" className="link w-fit decoration-transparent hover:decoration-current">Serviços</Link>
            <Link href="/#contato" className="link w-fit decoration-transparent hover:decoration-current">Onde estamos</Link>
          </nav>
          <div className="flex flex-col gap-2 text-[0.98rem] text-ash md:col-span-2">
            <a href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)} target="_blank" rel="noopener noreferrer" className="link w-fit text-led decoration-transparent hover:decoration-current">
              {BRAND.whatsappLabel}
            </a>
            <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer" className="link w-fit decoration-transparent hover:decoration-current">
              @{BRAND.instagramHandle}
            </a>
            <span>{BRAND.hoursLabel}</span>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-16 font-display leading-[0.74] font-black tracking-[-0.01em] text-led uppercase select-none md:mt-24"
          style={{ fontSize: "clamp(4rem, 36.5vw, 36rem)" }}
        >
          Cabelin
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-[var(--line-on-dark)] pt-6 text-[0.85rem] text-ash md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name} · {BRAND.venue} (subsolo) · {BRAND.address} · {BRAND.city} – {BRAND.state}
          </p>
          {demo && <p>Prévia de demonstração: agendamentos e área do cliente rodam só neste navegador.</p>}
        </div>
      </div>
    </footer>
  );
}
