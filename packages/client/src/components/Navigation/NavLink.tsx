import Link from "next/link"
import { AnchorHTMLAttributes } from "react"

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string
  to: string
}

export function NavLink({ name, to, className, ...rest }: NavLinkProps) {
  return (
    <>
      <Link {...rest} className={`${className}`} href={to} >{name}</Link>
    </>
  )
}