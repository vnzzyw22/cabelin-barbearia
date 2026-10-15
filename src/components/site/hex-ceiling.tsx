"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

// O teto de hexágonos em LED do salão, desenhado em SVG. Na entrada as
// células "ligam" em onda (como o teto ao acender), depois ficam respirando
// bem de leve. É a assinatura visual do site: aparece na hero e como
// divisor. Decorativo (aria-hidden). Com movimento reduzido, fica aceso.

const R = 46; // raio do hexágono (vértice no topo)
const W = Math.sqrt(3) * R; // largura de uma célula
const GAP = 7; // espaço escuro entre as barras de LED

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 90);
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

export function HexCeiling({
  cols = 14,
  rows = 5,
  className = "",
  delay = 0.2,
  tone = "led",
}: {
  cols?: number;
  rows?: number;
  className?: string;
  delay?: number;
  tone?: "led" | "ink";
}) {
  const reduce = useReducedMotion();
  const cells = useMemo(() => {
    const list: { x: number; y: number; d: number; key: string }[] = [];
    const cx0 = (cols * W) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * W + (r % 2 ? W / 2 : 0) + W / 2;
        const y = r * R * 1.5 + R;
        // Onda do centro para fora, como o teto acendendo.
        const d = Math.hypot((x - cx0) / W, r * 0.9) * 0.07;
        list.push({ x, y, d, key: `${r}-${c}` });
      }
    }
    return list;
  }, [cols, rows]);

  const vbW = cols * W + W / 2;
  const vbH = rows * R * 1.5 + R / 2;
  const stroke = tone === "led" ? "#eef6f7" : "#0b0f10";

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${vbW.toFixed(0)} ${vbH.toFixed(0)}`}
      preserveAspectRatio="xMidYMin slice"
      className={className}
    >
      <defs>
        <filter id="led-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter={tone === "led" ? "url(#led-glow)" : undefined}>
        {cells.map((cell) => (
          <motion.polygon
            key={cell.key}
            points={hexPoints(cell.x, cell.y, R - GAP / 2)}
            fill="none"
            stroke={stroke}
            strokeWidth={3}
            strokeLinejoin="round"
            initial={reduce ? false : { opacity: 0, pathLength: 0 }}
            animate={
              reduce
                ? { opacity: 0.9 }
                : { opacity: [0, 1, 0.55, 0.9], pathLength: 1 }
            }
            transition={{
              duration: 1.4,
              delay: delay + cell.d,
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 1.6, delay: delay + cell.d, times: [0, 0.35, 0.55, 1] },
            }}
          />
        ))}
      </g>
    </svg>
  );
}
