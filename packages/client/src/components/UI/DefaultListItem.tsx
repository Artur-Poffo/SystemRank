import { HTMLAttributes, ReactNode } from "react";

interface DefaultListItemProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode
  centered?: boolean
}

export function DefaultListItem({ children, centered = true, className }: DefaultListItemProps) {
  return (
    <ul className={`w-full flex items-start ${centered ? 'justify-center' : 'justify-start'} flex-wrap gap-10 gap-y-14 gap-x-6 ${className}`} >
      {children}
    </ul>
  )
}