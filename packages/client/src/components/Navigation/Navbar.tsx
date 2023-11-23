'use client'

import { useAuth } from "@/hooks/useAuth";
import { DefaultButton } from "../UI/DefaultButton";
import { NavLink, NavLinkProps } from "./NavLink";

interface NavbarProps {
  navLinks: NavLinkProps[]
}

export function Navbar({ navLinks }: NavbarProps) {
  const { user, isAuthenticated } = useAuth()

  return (
    <header className="hidden fixed z-[999] top-0 w-full py-6 px-10 backdrop-blur-sm sm:flex items-center justify-between" >
      <a href={'/#home'} >
        <h1 className="text-3xl font-mono font-bold text-brand-gray-100" >System<span className="text-brand-green-300" >Rank</span></h1>
      </a>

      <nav className="flex items-center gap-12">
        <ul className="flex items-center gap-4" >
          {navLinks.map(navLink => {
            return (
              <li key={navLink.name} >
                <NavLink className="text-brand-gray-200 hover:text-brand-green-300 transition-all" name={navLink.name} to={navLink.to} />
              </li>
            )
          })}
        </ul>

        {!isAuthenticated && <DefaultButton text="Entrar" link="/auth/signin" />}
        {isAuthenticated && <DefaultButton text="Logado" link="/auth/signin" />}
      </nav>
    </header>
  )
}