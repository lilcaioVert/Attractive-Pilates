import type {Metadata} from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import './globals.css'; // Global styles

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Attractive Pilates | Aula Experimental Gratuita em Copacabana',
  description: 'Agende uma aula experimental gratuita no estúdio mais tradicional de Copacabana. Recupere sua postura, alivie dores e ganhe flexibilidade.',
  openGraph: {
    title: 'Attractive Pilates | Aula Experimental Gratuita: Transforme Sua Saúde',
    description: 'Agende uma aula experimental gratuita no estúdio mais tradicional de Copacabana. Recupere sua postura, alivie dores e ganhe flexibilidade.',
    type: 'website',
    images: [
      {
        url: 'https://picsum.photos/seed/pilates/1200/630',
        width: 1200,
        height: 630,
        alt: 'Attractive Pilates Copacabana',
      },
    ],
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${montserrat.variable} scroll-smooth`}>
      <head>
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon in SVG format with Pilates representation (Ciano, Azul, Laranja Neon) */}
        <link 
          rel="icon" 
          type="image/svg+xml" 
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%231d4ed8'/%3E%3Cpath d='M30 60 Q50 20 70 60' stroke='%2306b6d4' stroke-width='8' fill='none' stroke-linecap='round'/%3E%3Ccircle cx='50' cy='25' r='10' fill='%23ff6b00'/%3E%3C/svg%3E" 
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased text-slate-100 bg-slate-950">
        {children}
      </body>
    </html>
  );
}

