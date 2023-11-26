import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';
import { FaX } from 'react-icons/fa6';

interface DefaultDialogProps {
  children: ReactNode
  dialogContent?: ReactNode
  title?: string
  description?: string
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export function DefaultDialog({ children, dialogContent, title, description, isOpen, setIsOpen }: DefaultDialogProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen} >
      <Dialog.Trigger asChild >
        {children}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='bg-brand-gray-900 opacity-60 fixed inset-0' />

        <Dialog.Content className='fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-4 rounded-md bg-brand-gray-200 p-5 focus:outline-none' >
          <header className='flex flex-col gap-1' >
            {title && (
              <Dialog.Title className='text-2xl text-brand-blue-900 font-mono font-bold' >
                {title}
              </Dialog.Title>
            )}
            {description && (
              <Dialog.Description className='text-brand-gray-900 font-medium' >
                {description}
              </Dialog.Description>
            )}
          </header>

          <main>
            {dialogContent && dialogContent}
          </main>

          <Dialog.Close asChild>
            <button className='absolute top-5 right-5' >
              <FaX size={12} color={'#000'} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}