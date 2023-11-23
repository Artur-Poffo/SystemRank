import { ReactNode } from "react";

interface DefaultListItemProps {
  children: ReactNode
}

export function DefaultListItem({ children }: DefaultListItemProps) {
  return (
    <ul className="w-full flex items-start justify-center flex-wrap gap-10 gap-y-14 gap-x-6" >
      {children}
    </ul>
  )
}