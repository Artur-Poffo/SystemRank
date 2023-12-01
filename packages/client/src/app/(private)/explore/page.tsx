'use client'

import { TransitionWrapper } from "@/components/Navigation/Transition/Wrapper";
import { DefaultListItem } from "@/components/UI/DefaultListItem";
import { PageHeader } from "@/components/UI/PageHeader";
import { SystemCard } from "@/components/UI/SystemCard";
import { ISystem } from "@/interfaces/ISystem";
import { fetchAllSystems } from "@/server-functions/fetchAllSystems";
import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar";

export default function Explore() {
  const [allSystems, setAllSystems] = useState<ISystem[]>([])
  const [querySystems, setQuerySystems] = useState<ISystem[]>([])

  useEffect(() => {
    fetchAllSystems()
      .then(systems => {
        setAllSystems(systems)
        setQuerySystems(systems)
      })
      .catch(err => console.error('Erro pesquisando por sistemas: ', err))
  }, [])

  async function handleQuerySystems(query: string) {
    const newQuerySystems = allSystems.filter(system => system.name.toUpperCase().trim().includes(query.toUpperCase().trim()))
    setQuerySystems(newQuerySystems)
  }

  return (
    <TransitionWrapper>
      <PageHeader title="Explorar" />

      <section id="explore" className="max-w-screen-2xl mx-auto flex flex-col items-center gap-16 mt-12 px-4 pb-10" >
        <header className="w-full max-w-lg" >
          <SearchBar searchFunc={handleQuerySystems} />
        </header>

        <DefaultListItem>
          {querySystems.map(system => {
            return (
              <li className="w-full md:w-auto" key={system.id}>
                <SystemCard id={system.id} name={system.name} description={system.description} logoUrl={system.system_logo_image_path || ""} />
              </li>
            )
          })}
        </DefaultListItem>
      </section>
    </TransitionWrapper>
  )
}