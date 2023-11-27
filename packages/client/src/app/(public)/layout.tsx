import { MobileMenu } from '@/components/Navigation/MobileMenu'
import { NavLinkProps } from '@/components/Navigation/NavLink'
import { Navbar } from '@/components/Navigation/Navbar'
import { Footer } from '@/components/UI/Footer'
import { AuthContextProvider } from '@/contexts/AuthContext'
import type { Metadata } from 'next'
import '../globals.css'

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
    <html lang="pt-BR" className='scroll-smooth'>
      <body className={`bg-brand-blue-900 text-brand-gray-200 scrollbar-thin scrollbar-thumb-brand-blue-700 scrollbar-track-brand-gray-900`}>
        <AuthContextProvider>
          <Navbar navLinks={navLinks} />
          <MobileMenu navLinks={navLinks} />

          <main className='min-h-screen'>
            {children}
          </main>

          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  )
}
