// Marca da Cabelin, vetorizada do logo do perfil (public/images/cabelin/).
// Renderizada como máscara CSS: a cor vem de `currentColor`, então o mesmo
// arquivo serve sobre o vídeo (claro) e sobre o papel (escuro).

/** Logo inteiro: aro, bigode e as palavras CABELIN / BARBEARIA. */
export function CabelinMark({
  className = "",
  title = "Barbearia Cabelin",
  decorative = false,
}: {
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  if (decorative) return <span aria-hidden="true" className={`cabelin-mark ${className}`} />;
  return <span role="img" aria-label={title} className={`cabelin-mark ${className}`} />;
}

/** Só o bigode. */
export function Bigode({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`cabelin-bigode ${className}`} />;
}

/** Assinatura horizontal para barras: bigode + CABELIN. */
export function CabelinWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Bigode className="h-[0.62em] shrink-0" />
      <span className="font-display text-[1em] leading-none font-black tracking-[0.06em] uppercase">
        Cabelin
      </span>
    </span>
  );
}
