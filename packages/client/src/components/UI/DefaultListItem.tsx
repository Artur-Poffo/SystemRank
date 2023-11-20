import { ReactNode } from "react";

interface DefaultListItemProps {
  children: ReactNode
}

export function DefaultListItem({ children }: DefaultListItemProps) {
  return (
    <ul className="w-full grid grid-cols-5 justify-center gap-6" >
      {children}
    </ul>
  )
}