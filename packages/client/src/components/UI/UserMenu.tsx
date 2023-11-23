'use client'

import { useAuth } from '@/hooks/useAuth';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { NavLink } from '../Navigation/NavLink';

export function UserMenu() {
  const { user, Logout } = useAuth()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className='w-10 h-10 rounded-full border-2 border-brand-green-300 cursor-pointer' >
          <img src={user?.profile_image_path} alt="Imagem de perfil do usuário" className='w-full h-full rounded-full object-cover' />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className='bg-brand-gray-600 min-w-[100px] p-5 rounded-sm flex flex-col gap-2 z-[999]' sideOffset={10} >
          <DropdownMenu.Item asChild>
            <NavLink name='Perfil' to={`/me/${user?.id}`} className='hover:opacity-60 transition-opacity outline-none' />
          </DropdownMenu.Item>

          <DropdownMenu.Separator className='w-full h-px bg-brand-gray-200' />

          {user?.role === "COMPANY" && (
            <DropdownMenu.Item asChild>
              <NavLink name='Cadastrar sistema' to={`/systems/new`} className='text-brand-green-300 hover:opacity-60 transition-opacity outline-none' />
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Item asChild>
            <button className='text-left outline-none text-red-600 hover:opacity-60 transition-opacity' onClick={Logout} >Sair</button>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow fill='#161616' />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}