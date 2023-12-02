import { TransitionWrapper } from '@/components/Navigation/Transition/Wrapper'
import { DefaultLink } from '@/components/UI/DefaultLink'
import { PageHeader } from '@/components/UI/PageHeader'

export default function NotFound() {
  return (
    <TransitionWrapper>
      <div className='flex flex-col items-center gap-10' >
        <PageHeader title='404' />

        <div className='flex flex-col items-center gap-1' >
          <h2 className='text-4xl text-center font-mono text-brand-green-300' >Página não encontrada</h2>
          <DefaultLink text='Voltar para a Home' to='/' />
        </div>
      </div>
    </TransitionWrapper>
  )
}