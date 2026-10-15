// Conteúdo da Barbearia Cabelin — fonte única para site, agendamento, área do
// cliente e painel de demonstração. Editar AQUI muda o site inteiro.
//
// Origem de cada dado:
// - VERIFICADO (perfil @barbeariacabelinn e linktr.ee/cabelinbarbearia, 2026-10-14):
//   nome, bio "Você merece algo além do básico!", horário Seg a Sáb 9h às 21h,
//   endereço R. Bela Vista, 99 – Apucarana/PR 86802-330, WhatsApp (43) 98867-5695,
//   slogan "Qualidade que ninguém copia.", existência do Club de Assinatura,
//   da cafeteria (post de inauguração) e da barbeira Nataly (post de apresentação).
// - ILUSTRATIVO (trocar antes da versão final): preços e durações dos serviços,
//   nomes/valores/benefícios dos planos do Club, demais nomes da equipe,
//   itens do cardápio da cafeteria. Tudo marcado com "ILUSTRATIVO" abaixo.

export const BRAND = {
  name: "Barbearia Cabelin",
  shortName: "Cabelin",
  motto: "Qualidade que ninguém copia.",
  bio: "Você merece algo além do básico.",
  city: "Apucarana",
  state: "PR",
  whatsappDigits: "5543988675695",
  whatsappLabel: "(43) 98867-5695",
  instagramHandle: "barbeariacabelinn",
  instagramUrl: "https://www.instagram.com/barbeariacabelinn/",
  address: "Rua Bela Vista, 99",
  neighborhood: "Vila Santa Terezinha",
  zip: "86802-330",
  hoursLabel: "Seg a Sáb · 9h às 21h",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Barbearia+Cabelin,+R.+Bela+Vista,+99,+Apucarana+-+PR",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Barbearia+Cabelin,+R.+Bela+Vista,+99,+Apucarana+-+PR,+86802-330",
  mapEmbedUrl:
    "https://www.google.com/maps?q=R.+Bela+Vista,+99+-+Apucarana+-+PR,+86802-330&z=16&output=embed",
} as const;

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${BRAND.whatsappDigits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const WHATSAPP_DEFAULT_MESSAGE = "Olá! Vim pelo site e queria agendar um horário na Cabelin.";

// ── Serviços ────────────────────────────────────────────────────────
// ILUSTRATIVO: preços e durações. O catálogo real está no sistema que a
// Cabelin usa hoje — pedir a tabela ao cliente.

export type ServiceCategory = "cabelo" | "barba" | "rosto";

export const SERVICE_CATEGORIES: { id: ServiceCategory; label: string }[] = [
  { id: "cabelo", label: "Cabelo" },
  { id: "barba", label: "Barba" },
  { id: "rosto", label: "Acabamento" },
];

export interface CatalogService {
  id: string;
  name: string;
  /** Uma linha, sem adjetivo vazio: o que acontece na cadeira. */
  note: string;
  price: number;
  priceFrom: boolean;
  category: ServiceCategory;
  demoDurationMinutes: number;
}

export const SERVICES: CatalogService[] = [
  { id: "corte", name: "Corte", note: "Tesoura e máquina, finalizado com produto", price: 45, priceFrom: false, category: "cabelo", demoDurationMinutes: 40 },
  { id: "corte-infantil", name: "Corte infantil", note: "Até 12 anos", price: 40, priceFrom: false, category: "cabelo", demoDurationMinutes: 30 },
  { id: "luzes-platinado", name: "Luzes / Platinado", note: "Valor conforme comprimento", price: 150, priceFrom: true, category: "cabelo", demoDurationMinutes: 120 },
  { id: "selagem-progressiva", name: "Selagem / Progressiva", note: "Valor conforme volume", price: 90, priceFrom: true, category: "cabelo", demoDurationMinutes: 90 },
  { id: "hidratacao", name: "Hidratação", note: "Reconstrução dos fios", price: 30, priceFrom: false, category: "cabelo", demoDurationMinutes: 25 },
  { id: "camuflagem-cabelo", name: "Pigmentação cabelo", note: "Disfarça falhas e fios brancos", price: 30, priceFrom: false, category: "cabelo", demoDurationMinutes: 20 },
  { id: "barba", name: "Barba", note: "Toalha quente e navalha", price: 35, priceFrom: false, category: "barba", demoDurationMinutes: 30 },
  { id: "camuflagem-barba", name: "Pigmentação barba", note: "Preenche e uniformiza", price: 30, priceFrom: false, category: "barba", demoDurationMinutes: 20 },
  { id: "design-sobrancelhas", name: "Sobrancelha", note: "Na navalha ou na pinça", price: 15, priceFrom: false, category: "rosto", demoDurationMinutes: 10 },
  { id: "acabamento-pezinho", name: "Pezinho", note: "Contorno entre um corte e outro", price: 15, priceFrom: false, category: "rosto", demoDurationMinutes: 10 },
  { id: "esfoliacao-mascara", name: "Limpeza de pele", note: "Esfoliação e máscara", price: 35, priceFrom: false, category: "rosto", demoDurationMinutes: 25 },
];

// ── Club de Assinatura ──────────────────────────────────────────────
// O Club existe (post "Club de Assinatura Cabelin"). ILUSTRATIVO: nomes,
// valores, dias e benefícios abaixo — confirmar com a Cabelin.

export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  days: string | null;
  perks: string[];
  featured?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "club-corte",
    name: "Club Corte",
    monthlyPrice: 99.9,
    days: "Segunda a sábado",
    perks: ["Cortes ilimitados no mês", "Pezinho incluso entre um corte e outro", "Café da casa por conta"],
  },
  {
    id: "club-completo",
    name: "Club Completo",
    monthlyPrice: 149.9,
    days: "Segunda a sábado",
    perks: ["Corte e barba ilimitados", "Sobrancelha inclusa", "Prioridade na agenda", "Café da casa por conta"],
    featured: true,
  },
  {
    id: "club-barba",
    name: "Club Barba",
    monthlyPrice: 89.9,
    days: "Segunda a sábado",
    perks: ["Barbas ilimitadas no mês", "Toalha quente em todas", "Café da casa por conta"],
  },
];

export const PLAN_TERM = "Sem fidelidade";

// ── Equipe ──────────────────────────────────────────────────────────
// Nataly: verificada (post de apresentação). Demais: ILUSTRATIVO — o site
// usa a foto real do time, mas os nomes precisam vir do cliente.
export interface TeamMember {
  id: string;
  name: string;
  role: string;
}

export const TEAM_PLACEHOLDER: TeamMember[] = [
  { id: "nataly", name: "Nataly", role: "Barbeira" },
  { id: "barbeiro-01", name: "Barbeiro 01", role: "Barbeiro" },
  { id: "barbeiro-02", name: "Barbeiro 02", role: "Barbeiro" },
  { id: "barbeiro-03", name: "Barbeiro 03", role: "Barbeiro" },
];

// ── Horário (VERIFICADO na bio: Seg a Sáb 9h às 21h) ────────────────
export const DEMO_BUSINESS_HOURS: Record<string, { open: string; close: string } | { closed: true }> = {
  mon: { open: "09:00", close: "21:00" },
  tue: { open: "09:00", close: "21:00" },
  wed: { open: "09:00", close: "21:00" },
  thu: { open: "09:00", close: "21:00" },
  fri: { open: "09:00", close: "21:00" },
  sat: { open: "09:00", close: "21:00" },
  sun: { closed: true },
};

// ── Cafeteria ───────────────────────────────────────────────────────
// A cafeteria existe (post de inauguração). ILUSTRATIVO: itens do cardápio.
export const CAFE_MENU = [
  { name: "Espresso", note: "Curto, do jeito certo" },
  { name: "Cappuccino", note: "Pra esperar sem pressa" },
  { name: "Café coado", note: "Passado na hora" },
  { name: "Gelados", note: "Pros dias quentes de Apucarana" },
] as const;

// ── Fotografias ─────────────────────────────────────────────────────
// Recortes dos posts do Instagram (midia-cliente/), ~1000px. Trocar pelos
// originais em alta mantendo o mesmo caminho — o layout não muda.
export const PHOTOS = {
  salao: { src: "/images/cabelin/espaco-salao.jpg", alt: "Salão da Cabelin com teto de hexágonos em LED, parede azul-petróleo e cadeiras pretas" },
  teto: { src: "/images/cabelin/espaco-teto.jpg", alt: "Teto de hexágonos iluminados sobre a parede azul-petróleo" },
  espacoNovo: { src: "/images/cabelin/espaco-novo.jpg", alt: "O novo espaço da Cabelin, com sofá chesterfield e bancadas" },
  barba: { src: "/images/cabelin/barba-navalha.jpg", alt: "Barbeiro de uniforme areia acertando a barba de um cliente" },
  equipe: { src: "/images/cabelin/equipe-areia.jpg", alt: "Equipe da Cabelin de uniforme areia, braços cruzados, encostada na parede" },
  equipeTrio: { src: "/images/cabelin/equipe-trio.jpg", alt: "Três barbeiros da Cabelin de uniforme areia" },
  filmeNuca: { src: "/images/cabelin/filme-nuca.jpg", alt: "Acabamento na nuca, visto de perto" },
  filmeCapa: { src: "/images/cabelin/filme-capa-verde.jpg", alt: "Capa da Cabelin com o monograma do bigode" },
  filmeFoco: { src: "/images/cabelin/filme-concentracao.jpg", alt: "Barbeiro concentrado no corte" },
  curso: { src: "/images/cabelin/curso-turma.jpg", alt: "Turma de curso prático de barbearia no salão da Cabelin" },
} as const;

export type PhotoKey = keyof typeof PHOTOS;

// ── Vídeos ──────────────────────────────────────────────────────────
// TEMPORÁRIO: a hero usa um loop montado com as fotos reais (ffmpeg, ver
// CLAUDE.md). Trocar pelos reels originais em alta quando chegarem, com os
// mesmos nomes de arquivo.
export const HERO_VIDEO = {
  landscape: { video: "/videos/cabelin/hero-triptico.mp4", poster: "/videos/cabelin/hero-triptico-poster.webp" },
  portrait: { video: "/videos/cabelin/hero-vertical.mp4", poster: "/videos/cabelin/hero-vertical-poster.webp" },
} as const;
