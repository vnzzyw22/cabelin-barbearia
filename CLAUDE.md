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

## Mídia

- `midia-cliente/`: prints do Instagram enviados pelo Vinicius (originais).
- `public/images/cabelin/*.jpg`: recortes desses prints (~1000px). Trocar pelos originais em
  alta mantendo os nomes.
- Logo: `public/images/cabelin/cabelin-logo.svg` (= `cabelin-mark.svg`) vetorizado com
  potracer do print do perfil; `bigode.svg` e `src/components/site/logo-path.ts` são o bigode
  separado. Pedir o vetor oficial.
- **Hero (TEMPORÁRIO)**: `public/videos/cabelin/hero-vertical.mp4` (720×1280, 12 s) foi montado
  com ffmpeg (zoompan + xfade + grão) a partir das fotos do salão e da barba;
  `hero-triptico.mp4` (1920×1080) = 3 colunas do vertical defasadas 0/4/8 s. Pôsteres `.webp`
  são o fallback. Quando chegarem os reels em alta: recortar sem legenda/marca d'água, sem
  áudio, e salvar com os MESMOS nomes.
- Vídeo de fundo: `video.muted = true` é setado por JS antes do `play()` (causa comum de vídeo
  de hero que não aparece no iOS/Chrome); o pôster fica sempre por baixo.

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

- [ ] Reels/fotos em alta (hero, espaço, equipe) e **fotos da cafeteria**.
- [ ] Tabela real de serviços (preços e durações) e quem faz o quê.
- [ ] Planos reais do Club (nomes, valores, regras, dias).
- [ ] Nomes e fotos da equipe (hoje: Nataly + "Barbeiro 01–03").
- [ ] Cardápio da cafeteria.
- [ ] Bairro: Instagram diz Vila Santa Terezinha, Linktree/Google dizem Centro — confirmar.
- [ ] Logo vetorial oficial.
- [ ] Supabase próprio da Cabelin + seed reescrito; migração dos assinantes do CashBarber.
- [ ] Políticas de privacidade/termos com razão social/CNPJ.
