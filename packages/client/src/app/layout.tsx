import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SystemRank',
  description: 'Crie sua conta e explore ou registre sistemas operacionais',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <header></header>

        <main>
          {children}
        </main>

        <footer></footer>
      </body>
    </html>
  )
}
