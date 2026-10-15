import { CafeSection } from "@/components/site/cafe-section";
import { ClubSection } from "@/components/site/club-section";
import { ContactSection } from "@/components/site/contact-section";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import { MobileBookBar } from "@/components/site/mobile-book-bar";
import { Marquee } from "@/components/site/motion";
import { Navbar } from "@/components/site/navbar";
import { ServicesSection } from "@/components/site/services-section";
import { SpaceSection } from "@/components/site/space-section";
import { TeamSection } from "@/components/site/team-section";
import { BRAND } from "@/content/cabelin";
import { isSupabaseConfigured } from "@/lib/supabase/config";

function Hex() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 22" className="mx-8 h-[0.5em] w-auto">
      <path d="M10 1 19 6v10l-9 5-9-5V6z" fill="none" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

// Narrativa: filme da casa → lema → Club (o que a Cabelin quer vender) →
// o espaço novo → a cafeteria (troca de temperatura) → equipe → serviços →
// onde estamos. Cada seção troca de superfície: preto, petróleo, areia,
// papel — as cores do salão e do uniforme.
export default function Home() {
  const demo = !isSupabaseConfigured;

  return (
    <>
      <Navbar />
      <main id="conteudo" className="flex flex-1 flex-col">
        <Hero />
        <div className="overflow-hidden bg-sand py-5 text-ink md:py-6">
          <Marquee speed={36}>
            {[BRAND.motto, BRAND.bio, "Cafeteria dentro do salão", "Club de Assinatura"].map((t) => (
              <span key={t} className="flex items-center font-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-none font-black whitespace-nowrap uppercase">
                {t.replace(/\.$/, "")}
                <Hex />
              </span>
            ))}
          </Marquee>
        </div>
        <ClubSection />
        <SpaceSection />
        <CafeSection />
        <TeamSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer demo={demo} />
      <MobileBookBar />
    </>
  );
}
