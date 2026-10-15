import type { Metadata, Viewport } from "next";
// Fontes auto-hospedadas (Fontsource), sem depender do Google Fonts no build.
// Saira Extra Condensed: o mesmo desenho quadrado e estreito dos posts da
// Cabelin e do anel "BARBEARIA" do logo. Archivo: texto corrido.
import "@fontsource/saira-extra-condensed/600.css";
import "@fontsource/saira-extra-condensed/700.css";
import "@fontsource/saira-extra-condensed/800.css";
import "@fontsource/saira-extra-condensed/900.css";
import "@fontsource-variable/archivo/index.css";
import "./globals.css";
import { MotionProvider } from "@/components/site/motion-provider";
import { BRAND } from "@/content/cabelin";

export const viewport: Viewport = { themeColor: "#0b0f10" };

const description = `${BRAND.bio} Barbearia em ${BRAND.city} – ${BRAND.state}: agende online, conheça o Club de Assinatura, a cafeteria e o novo espaço.`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: `${BRAND.name} · ${BRAND.city}`, template: `%s — ${BRAND.name}` },
  description,
  openGraph: { title: BRAND.name, description, locale: "pt_BR", type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className="h-full antialiased"
      style={
        {
          "--font-saira": '"Saira Extra Condensed"',
          "--font-archivo": '"Archivo Variable"',
        } as React.CSSProperties
      }
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-paper"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
