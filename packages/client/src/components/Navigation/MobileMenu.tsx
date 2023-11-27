"use client"

import { useAuth } from '@/hooks/useAuth';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { MdLogout } from 'react-icons/md';
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink, NavLinkProps } from './NavLink';

interface MobileMenuProps {
  navLinks: NavLinkProps[]
}

export function MobileMenu({ navLinks }: MobileMenuProps) {
  const { user, Logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen} >
      <DropdownMenu.Trigger asChild>
        <button className='p-3 rounded-full bg-brand-gray-700 z-[995] fixed top-10 right-10 sm:hidden outline-none' >
          <RxHamburgerMenu size={24} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={8} className='p-5 bg-brand-gray-700 z-[995] rounded-md min-w-[100px] flex flex-col gap-2' >
          <DropdownMenu.Group className='flex flex-col gap-1' >
            {navLinks.map(navLinkProps => {
              return (
                <NavLink key={navLinkProps.to} name={navLinkProps.name} to={navLinkProps.to} onClick={() => setIsOpen(false)} />
              )
            })}
            <NavLink name={"Perfil"} to={`/me/${user?.id}`} onClick={() => setIsOpen(false)} />
          </DropdownMenu.Group>

          <DropdownMenu.Separator className='w-full h-px bg-brand-gray-200' />

          <DropdownMenu.Group className='flex flex-col gap-1' >
            <DropdownMenu.Item className='outline-none' >
              {user?.role === "COMPANY" && (
                <NavLink name={"Cadastrar sistema"} to={`/systems/new`} className='text-brand-green-300' onClick={() => setIsOpen(false)} />
              )}
            </DropdownMenu.Item>

            <DropdownMenu.Item className='outline-none' >
              <button className='text-left outline-none text-red-600 hover:opacity-60 transition-opacity flex items-center gap-1' onClick={async () => await Logout()} >
                Sair
                <MdLogout />
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Group>

          <DropdownMenu.Arrow className='fill-brand-gray-700' />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}