# Cabelin — direção de arte

## De onde vem tudo

Nada de paleta "premium" genérica: cada decisão sai do salão e da marca.

| Fonte real | Vira no site |
|---|---|
| Teto de hexágonos em LED | Assinatura: `HexCeiling` (células acendem em onda na hero), textura `.hex-texture`, marcadores hexagonais nas listas, avatares hexagonais no agendamento |
| Parede azul-petróleo | `--petrol` / `--petrol-deep`: fundo do Club, do contato e do cartão de membro |
| Uniforme areia da equipe | `--sand`: botão principal, faixa do lema, a cafeteria inteira |
| Logo (letras quadradas, cantos cortados) e posts ("CLUB DE ASSINATURA") | Saira Extra Condensed em caixa alta; chanfro (`.chamfer`, `.btn`) em vez de pílula |
| Preto das capas e do logo | `--ink` com leve tom frio |
| Legenda "Desacelere" | Título da cafeteria, troca de temperatura (areia) |

## Ritmo das superfícies

Hero (vídeo + petróleo) → faixa areia com o lema → Club (petróleo + hexágonos) → Espaço
(preto, foto abre com a rolagem, pontos marcados na foto) → Cafeteria (areia, tipográfica, CAFÉ
soltando vapor) → Equipe (papel, foto areia) → Serviços (preto, carta numerada) → Onde estamos
(petróleo, mapa tingido) → Rodapé (CABELIN gigante).

## Movimento (Framer Motion)

Uma curva só (`EASE` em `src/lib/motion.ts`). Títulos sobem palavra por palavra de dentro de uma
máscara; fotos se revelam por recorte; cartões do Club inclinam seguindo o ponteiro (só mouse);
selo do lema gira na hero; teto acende uma vez e fica. `prefers-reduced-motion` desliga tudo e
troca vídeo por pôster.

## Tipos

- Display: Saira Extra Condensed 600–900, sempre caixa alta (`.display-xl/lg/md`, `.kicker`, `.btn`).
- Texto: Archivo Variable.

## Contraste verificado (WCAG AA texto normal)

smoke `#5d5850` sobre paper 6,0:1 · ash `#93a7ab` sobre ink 7,6:1 · ink sobre sand 11,5:1 ·
paper sobre petrol 8,8:1. Texto secundário sobre areia usa `--smoke-sand`.
