import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from './providers';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TechForma - Plataforma de Formação em Tecnologia",
  description: "Encontre os melhores programas de formação em tecnologia. Centralizamos oportunidades de capacitação em desenvolvimento, dados, cloud, UX e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
