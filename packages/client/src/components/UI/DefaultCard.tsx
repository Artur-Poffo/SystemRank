'use client'

import { motion } from "framer-motion";
import { HTMLAttributes, ReactNode } from "react";

interface DefaultCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode,
  animationDelay?: number
}

export function DefaultCard({ children, animationDelay = 0, className, ...rest }: DefaultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { delay: animationDelay, duration: .4 } }}
      className={className}
    >
      {children}
    </motion.div>
  )
}