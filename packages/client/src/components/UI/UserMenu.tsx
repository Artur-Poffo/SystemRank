'use client'

import { useAuth } from '@/hooks/useAuth';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { MdLogout } from "react-icons/md";
import { NavLink } from '../Navigation/NavLink';

export function UserMenu() {
  const { user, Logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    user && (
      <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen} >
        <DropdownMenu.Trigger asChild>
          <div className={`w-10 h-10 rounded-full border-2 border-brand-green-300 cursor-pointer ${!user.banner_profile_image_path && 'null-image-gradient'}`} >
            {user.banner_profile_image_path && (
              <img src={user?.profile_image_path} alt="Imagem de perfil do usuário" className='w-full h-full rounded-full object-cover' />
            )}
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className='bg-brand-gray-600 min-w-[100px] p-5 rounded-md flex flex-col gap-2 z-[996]' sideOffset={10} >
            <DropdownMenu.Item asChild>
              <NavLink name='Perfil' to={`/me/${user?.id}`} className='hover:opacity-60 transition-opacity outline-none' onClick={() => setIsOpen(false)} />
            </DropdownMenu.Item>

            <DropdownMenu.Separator className='w-full h-px bg-brand-gray-200' />

            {user?.role === "COMPANY" && (
              <DropdownMenu.Item asChild>
                <NavLink name='Cadastrar sistema' to={`/systems/new`} className='text-brand-green-300 hover:opacity-60 transition-opacity outline-none' onClick={() => setIsOpen(false)} />
              </DropdownMenu.Item>
            )}

            <DropdownMenu.Item asChild>
              <button className='text-left outline-none text-red-600 hover:opacity-60 transition-opacity flex items-center gap-1' onClick={async () => await Logout()} >
                Sair
                <MdLogout />
              </button>
            </DropdownMenu.Item>

            <DropdownMenu.Arrow className='fill-brand-gray-600' />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  )
}