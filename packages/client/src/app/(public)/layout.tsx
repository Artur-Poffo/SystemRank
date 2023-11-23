import { NavLinkProps } from '@/components/Navigation/NavLink'
import { Navbar } from '@/components/Navigation/Navbar'
import { Footer } from '@/components/UI/Footer'
import { AuthContextProvider } from '@/contexts/AuthContext'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SystemRank',
  description: 'Crie sua conta e explore nossa lista de sistemas operacionais',
}

export default function RootPublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navLinks: NavLinkProps[] = [
    { name: "Home", to: '/' },
    { name: "Explorar", to: "/explore" }
  ]

  return (
    <html lang="pt">
      <body className={`${inter.className} bg-brand-blue-900 text-brand-gray-200 scrollbar-thin scrollbar-thumb-brand-blue-700 scrollbar-track-brand-gray-900`}>
        <AuthContextProvider>
          <Navbar navLinks={navLinks} />

          <main className='min-h-screen'>
            {children}
          </main>

          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  )
}
