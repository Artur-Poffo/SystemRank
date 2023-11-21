import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { AuthContextProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SystemRank | Entrar',
  description: 'Faça seu login e descubra mais sobre o mundo dos sistemas operacionais',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={`${inter.className} bg-brand-blue-900 text-brand-gray-200 scrollbar-thin scrollbar-thumb-brand-blue-700 scrollbar-track-brand-gray-900`}>

      <AuthContextProvider>
        <main className='min-h-screen'>
          {children}
        </main>
      </AuthContextProvider>

      </body>
    </html>
  )
}
