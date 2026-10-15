"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CabelinWordmark } from "./brand";
import { BRAND, WHATSAPP_DEFAULT_MESSAGE, whatsappUrl } from "@/content/cabelin";
import { EASE } from "@/lib/motion";

const LINKS = [
  { href: "/#club", label: "Club" },
  { href: "/#espaco", label: "Espaço" },
  { href: "/#cafeteria", label: "Cafeteria" },
  { href: "/#equipe", label: "Equipe" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#contato", label: "Onde estamos" },
];

// `overlay`: começa transparente sobre o vídeo da hero e vira barra escura
// (preto + vidro) quando a página rola. `solid`: barra escura desde o início
// (Agendar, Área do cliente).
export function Navbar({ variant = "overlay" }: { variant?: "overlay" | "solid" }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(variant === "solid");
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant === "solid") return;
    // A barra só fica sólida quando a primeira tela (hero) já passou quase toda.
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  // Menu móvel: trava a rolagem do fundo, Esc fecha, foco volta ao botão.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a, button"));
        const firstItem = items[0];
        const lastItem = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstItem) {
          e.preventDefault();
          lastItem.focus();
        } else if (!e.shiftKey && document.activeElement === lastItem) {
          e.preventDefault();
          firstItem.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Fecha o menu ao trocar de rota. Ajuste durante a renderização
  // (react.dev/learn/you-might-not-need-an-effect), sem efeito extra.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const solid = scrolled && !open;

  return (
    <>
      <header
        className={`on-dark fixed inset-x-0 top-0 z-50 text-led transition-[background-color,border-color] duration-500 ease-[var(--ease)] ${
          solid ? "border-b border-[var(--line-on-dark)] bg-ink/85 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="wrap flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" aria-label={`${BRAND.name}, início`} className="flex items-center py-3 text-[1.7rem]">
            <CabelinWordmark />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-2 font-display text-[1.08rem] font-semibold tracking-[0.14em] uppercase after:absolute after:inset-x-0 after:bottom-0.5 after:h-[2px] after:origin-left after:scale-x-0 after:bg-sand after:transition-transform after:duration-300 after:ease-[var(--ease)] hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/cliente"
              className="hidden px-3 py-2 font-display text-[1.08rem] font-semibold tracking-[0.14em] text-led/85 uppercase hover:text-led sm:block"
            >
              Área do cliente
            </Link>
            <Link href="/agendar" className="btn btn-sand hidden min-h-11 px-6 py-2 text-[1rem] sm:inline-flex">
              Agendar
            </Link>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="menu-movel"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
              <span aria-hidden="true" className="relative block h-3 w-7">
                <span
                  className={`absolute left-0 h-[2px] w-7 bg-current transition-transform duration-300 ease-[var(--ease)] ${
                    open ? "top-[5px] rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute right-0 h-[2px] bg-current transition-[transform,width] duration-300 ease-[var(--ease)] ${
                    open ? "top-[5px] w-7 -rotate-45" : "top-[10px] w-4"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="menu-movel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="on-dark hex-texture fixed inset-0 z-40 flex flex-col bg-ink pt-[var(--nav-h)] text-led lg:hidden"
          >
            <nav aria-label="Menu" className="wrap flex flex-1 flex-col justify-center gap-1">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display flex items-baseline gap-4 py-1.5 text-[clamp(2.8rem,13vw,4rem)] leading-none font-black uppercase"
                >
                  <span className="font-display text-[0.9rem] font-semibold tracking-[0.2em] text-sand tabular">
                    {String(LINKS.indexOf(link) + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="wrap flex flex-col gap-3 pb-10 text-[0.95rem] text-ash">
              <Link href="/agendar" onClick={() => setOpen(false)} className="btn btn-sand mb-3 w-full sm:hidden">
                Agendar horário
              </Link>
              <Link href="/cliente" onClick={() => setOpen(false)} className="link w-fit text-led">
                Área do cliente
              </Link>
              <a href={whatsappUrl(WHATSAPP_DEFAULT_MESSAGE)} target="_blank" rel="noopener noreferrer" className="link w-fit">
                WhatsApp {BRAND.whatsappLabel}
              </a>
              <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer" className="link w-fit">
                Instagram @{BRAND.instagramHandle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
