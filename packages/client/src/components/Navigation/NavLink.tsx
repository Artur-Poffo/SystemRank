'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnchorHTMLAttributes } from "react"

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string
  to: string
}

export function NavLink({ name, to, className, ...rest }: NavLinkProps) {
  const pathname = usePathname()

  return (
    <>
      <Link {...rest} className={`transition-colors ${pathname === to && 'text-brand-green-300'} ${className}`} href={to} >{name}</Link>
    </>
  )
}