import Link from "next/link"
import { ButtonHTMLAttributes } from "react"

interface DefaultButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
  link?: string
}

export function DefaultButton({ text, link, className, ...rest }: DefaultButtonProps) {
  return (
    link ? (
      <Link href={link}>
        <button className={`px-4 py-1 bg-brand-green-300 text-brand-gray-100 rounded-sm transition-opacity hover:opacity-80 ${className}`} {...rest} >{text}</button>
      </Link>
    ) : (
      <button className={`px-4 py-1 bg-brand-green-300 text-brand-gray-100 rounded-sm transition-opacity hover:opacity-80 ${className}`} {...rest} >{text}</button>
    )
  )
}