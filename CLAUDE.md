@AGENTS.md

# Barbearia Cabelin — guia do projeto

Prévia comercial (2026-10-14) do site + agendamento + área do cliente + painel da
**Barbearia Cabelin** (Rua Bela Vista, 99 — Apucarana/PR, @barbeariacabelinn).
Projeto **independente**: criado a partir de uma cópia do sistema da Lobeca
(`vnzzyw22/lobeca-barbearia`, usado só como base/inspiração — **nunca alterar aquele repo**),
sem `.git`, `.vercel`, `.env.local` e sem mídia de outros clientes. A proposta é **substituir o
CashBarber** que a Cabelin usa hoje (agenda + Club de assinatura).

Reaproveitado: a LÓGICA (scheduling, validações, booking flow, área do cliente, painel demo,
painel real + migrações). Camada visual 100% nova — ver **DESIGN.md**. O que é verificado vs.
ilustrativo: **PRODUCT.md** e os comentários de `src/content/cabelin.ts`.

## Stack

Next.js 16 (App Router, `proxy.ts`) + Tailwind v4 + Framer Motion + Supabase (sem projeto
ainda — prévia roda sem banco). Fontes **auto-hospedadas via Fontsource** (não usar
`next/font/google`: o build não depende de rede): Saira Extra Condensed (display) + Archivo
Variable (texto).

## Modo demonstração (sem Supabase)

- `isSupabaseConfigured` (`src/lib/supabase/config.ts`) decide tudo.
- Agendamento `/agendar`: `mode="demo"` grava no localStorage (`src/lib/demo/store.ts`, chave
  `cabelin-demo-v1`) com o mesmo `computeAvailableSlots` do sistema real. Aceita
  `?servico=<id>` e `?profissional=<id>` (usados pelas seções Serviços e Equipe).
- Área do cliente `/cliente`: "login" pelo WhatsApp (sessionStorage, NÃO é autenticação — a
  tela diz isso). Mostra cartão de membro do Club, próximo horário, histórico, "agendar igual".
- `/admin/*` → rewrite para `src/app/painel-demo/[[...secao]]` (painel da equipe de
  demonstração). Site ↔ painel compartilham o store: preço editado no painel aparece na
  carta de serviços; pedido feito no site aparece pendente no painel; nomes da equipe idem.
- Seção "Dia do Noivo" da Lobeca foi removida (página, componentes e aba do painel).

## Conteúdo (fonte única)

`src/content/cabelin.ts`: BRAND (verificado), SERVICES (preços/durações ILUSTRATIVOS),
PLANS do Club (ILUSTRATIVOS), TEAM_PLACEHOLDER (Nataly verificada; "Barbeiro 01–03" de
exemplo), horário real Seg–Sáb 9h–21h, CAFE_MENU (ilustrativo), PHOTOS, HERO_VIDEO.
`supabase/seed.sql` ainda espelha o catálogo da Lobeca — reescrever antes de criar o banco.

## Mídia (atualizada 2026-10-15 com os originais enviados pelo Vinicius)

Fatos novos confirmados pela mídia: fica **dentro do Muffato Apucarana, no subsolo**, com
**estacionamento coberto**; **cafeteria exclusiva** (café, salgados, chopp/"cervejinha").

Vídeos (`public/videos/cabelin/`, todos sem áudio, sem legenda queimada, sem cartela; pôster
`.webp` de cada um). Fontes = reels `barbeariacabelinn_N.mp4` (não versionados):
- `hero-vertical.mp4` (720×1280, 15,9 s): reel 1, 4,6→20,45 s (corta os flashes laranja e a
  cartela final). `hero-triptico.mp4` (1920×1080): 3 colunas do vertical defasadas 0/5,28/10,57 s.
- `espaco-tour.mp4`: reel 7 (inauguração) — lounge+hex 0,68 s, lavatórios 1,66, cadeira 6,85,
  barber pole 7,88, salão hex 49,58, salão vazio 54,56. Crop 4:5 (1080×1350 a partir de y=285).
- `cafe.mp4`: reel 7 vitrine 2,72 / salgados 3,8 / chopp 16,66 + reel 5 máquina de café 19,2–22,8
  (crop y=40 → acima da legenda queimada). `cafe-salgado.mp4`: reel 6 (360p, usado pequeno).
- `estacionamento.mp4`: reel 5, 7,0–11,0 s, crop acima da legenda.
- `servico-cabelo/barba/acabamento.mp4`: reel 1 (4,6 / 11,16 / 16,5 s), crop 4:5.
- NÃO usados: reel 2 (gorros de Natal), reel 3 (filmado deitado, curso), reel 4 (crianças em
  quase todo o vídeo), reel 8 (colagem com logo por cima), reel 5 fora dos recortes (legendas).

Fotos (`public/images/cabelin/`, originais 1080px): `fachada.jpg` (vitrine no Muffato, recortada
acima do texto do post), `cafeteria.jpg` e `club-regua.jpg` (textos de Instagram removidos com
inpaint OpenCV), `equipe-panorama.jpg` (2 slides do carrossel unidos = os 5 barbeiros),
`barbeiro-secador.jpg` (girada 90°), `barbeiro-cadeira.jpg`, `servico-tesoura/freestyle/pente.jpg`.
Mapa foto → seção em `PHOTOS`/`CLIPS` de `src/content/cabelin.ts`.

- `midia-cliente/`: prints do Instagram da 1ª rodada (o repo é público — ver pendências).
- Logo: `public/images/cabelin/cabelin-logo.svg` (= `cabelin-mark.svg`), vetorizado do print;
  `bigode.svg` e `logo-path.ts` = bigode separado. Pedir o vetor oficial.
- Vídeo de fundo: `video.muted = true` é setado por JS antes do `play()` (hero e InViewVideo).
- **QA local**: o Chromium do ambiente da Anthropic NÃO tem H.264 (`canPlayType` vazio, erro 4) —
  nos prints aparecem só os pôsteres. Chrome/Safari/Firefox reais tocam normalmente.

## Lições técnicas

- Linhas de título com `overflow-hidden` (reveal) cortam acento em caixa alta com
  line-height < 1: usar `pt-[0.18em] -mt-[0.18em]` no wrapper (já aplicado em RevealWords e
  na hero).
- `.outline-text` não funciona junto de `text-*` do Tailwind (utilitário vence o componente).
- Botões usam `clip-path` (chanfro): sombras não aparecem; contorno é `box-shadow: inset`.
- Estilos próprios do `globals.css` ficam em `@layer base/components`.
- Herdadas: `proxy.ts` (não `middleware.ts`); fuso fixo `America/Sao_Paulo`; constante usada
  por Server Component não pode morar em módulo `"use client"`.

## QA

`node scripts/qa-booking.mjs <url> <dir> <w> <h>` (fluxo completo de agendamento),
`node scripts/qa-admin.mjs <url> <dir> <w> <h>` (painel + preço sincronizado com o site),
`node scripts/qa-cliente.mjs <url> <dir> <w> <h>`, `node scripts/shot.mjs <url> <out.png> <w> <h> <full>`.
Requer `npm i --no-save playwright-core`; Chrome via `CHROME_PATH` (padrão aponta para o
Chromium do ambiente da Anthropic — ajuste no seu PC). Screenshots `full=1` não disparam todos
os reveals (`whileInView`); para conferir uma seção, abra direto na âncora (`/#equipe`).

## Pendências (dependem do cliente)

- [x] Reels/fotos em alta — recebidos e aplicados em 2026-10-15.
- [ ] Tabela real de serviços (preços e durações) e quem faz o quê.
- [ ] Planos reais do Club (nomes, valores, regras, dias).
- [ ] Nomes e fotos da equipe (hoje: Nataly + "Barbeiro 01–03").
- [ ] Cardápio da cafeteria com preços (hoje só café/salgados/cervejinha, sem preço).
- [ ] Bairro: Instagram diz Vila Santa Terezinha, Linktree/Google dizem Centro (o site usa
  "Dentro do Muffato", que resolve na prática).
- [ ] Repo público com `midia-cliente/` (prints com DM de terceiro) — decidir: privar o repo ou
  remover a pasta.
- [ ] Logo vetorial oficial.
- [ ] Supabase próprio da Cabelin + seed reescrito; migração dos assinantes do CashBarber.
- [ ] Políticas de privacidade/termos com razão social/CNPJ.
