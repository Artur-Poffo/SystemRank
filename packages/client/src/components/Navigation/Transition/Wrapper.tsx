'use client'

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Transition } from ".";

interface TransitionWrapperProps {
  children: ReactNode
}

export function TransitionWrapper({ children }: TransitionWrapperProps) {
  const pathName = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathName} className="h-full" >
        <Transition />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}