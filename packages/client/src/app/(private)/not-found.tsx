import { TransitionWrapper } from '@/components/Navigation/Transition/Wrapper'
import { PageHeader } from '@/components/UI/PageHeader'
import Link from 'next/link'

export default function NotFound() {
  return (
    <TransitionWrapper>
      <div className='flex flex-col items-center gap-10' >
        <PageHeader title='404' />

        <div className='flex flex-col items-center gap-1' >
          <h2 className='text-4xl text-center font-mono text-brand-green-300' >Página não encontrada</h2>
          <Link href="/" className='underline underline-offset-4 decoration-brand-green-300' >Voltar para Home</Link>
        </div>
      </div>
    </TransitionWrapper>
  )
}