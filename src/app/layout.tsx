import "./globals.css";

export const metadata = {
  title: "ComparaJá",
  description: "Sistema de comparação de preços para portfólio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}