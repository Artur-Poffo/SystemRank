import { MobileMenu } from '@/components/Navigation/MobileMenu'
import { NavLinkProps } from '@/components/Navigation/NavLink'
import { Navbar } from '@/components/Navigation/Navbar'
import { Footer } from '@/components/UI/Footer'
import { AuthContextProvider } from '@/contexts/AuthContext'
import { verifyAuthToken } from '@/utils/verifyAuthToken'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import '../globals.css'

export const metadata: Metadata = {
  title: 'SystemRank',
  description: 'Crie sua conta e explore nossa lista de sistemas operacionais',
}

export default async function RootPrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = await verifyAuthToken()

  if (!isAuthenticated.hasCookie) {
    redirect('/auth/signin')
  }

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
