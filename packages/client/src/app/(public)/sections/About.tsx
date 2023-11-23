'use client'

import { SectionHeader } from "@/components/UI/SectionHeader";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="flex flex-col items-center mb-24 px-4" >
      <SectionHeader text="Sobre a plataforma" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: .1, duration: .5 }}
        className="flex flex-col gap-2 max-w-xl"
      >
        <h2 className="text-3xl text-brand-green-300 font-bold" >Sobre a SystemRank</h2>
        <p>A SystemRank é uma plataforma que faz o intermédio entre entusiastas que buscam descobrir mais sistemas operacionais e empresas que desejam divulgar suas criações para esse público.</p>
        <p>Nós fazemos esse intermédio e permitimos que nossos usuários naveguem, descubram e avaliem os sistemas operacionais que as empresas cadastram em nossa plataforma.</p>
        <p>Graças a SystemRank podemos encontrar informações dos mais diversos tipos de sistemas operacionais, toda a informação e divulgação que você precisa em um só lugar.</p>
      </motion.div>
    </section>
  )
}