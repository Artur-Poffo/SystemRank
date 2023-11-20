'use client'

import { motion } from "framer-motion"

interface SectionHeaderProps {
  text: string
}

export function SectionHeader({ text }: SectionHeaderProps) {
  return (
    <motion.header
      className="w-full text-center my-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: .1, duration: .5 }}
    >
      <h1 className="text-4xl uppercase text-brand-blue-700 font-mono font-bold" >{text}</h1>
    </motion.header>
  )
}