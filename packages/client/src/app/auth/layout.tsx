import { AuthContextProvider } from '@/contexts/AuthContext'
import { verifyAuthToken } from '@/utils/verifyAuthToken'
import { redirect } from 'next/navigation'
import '../globals.css'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = await verifyAuthToken()

  if (isAuthenticated.hasCookie) {
    redirect('/explore')
  }

  return (
    <html lang="pt-BR" className='scroll-smooth'>
      <body className={`bg-brand-blue-900 text-brand-gray-200 scrollbar-thin scrollbar-thumb-brand-blue-700 scrollbar-track-brand-gray-900`}>

        <AuthContextProvider>
          <main className='min-h-screen'>
            {children}
          </main>
        </AuthContextProvider>

      </body>
    </html>
  )
}
