import Link from "next/link";
import { HTMLAttributes } from "react";

interface DefaultLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  text: string
  to: string
}

export function DefaultLink({ text, to, className, ...rest }: DefaultLinkProps) {
  return (
    <Link href={to} className={`underline underline-offset-4 decoration-brand-green-300 transition-colors hover:text-brand-green-300 ${className}`} {...rest} >
      {text}
    </Link>
  )
}