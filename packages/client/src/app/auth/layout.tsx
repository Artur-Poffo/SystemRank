import { AuthContextProvider } from '@/contexts/AuthContext'
import { verifyAuthToken } from '@/utils/verifyAuthToken'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = await verifyAuthToken()

  if (isAuthenticated) {
    redirect('/explore')
  }

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
