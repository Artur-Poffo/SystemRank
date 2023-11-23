'use client'

import { PageHeader } from "@/components/UI/PageHeader";
import { SearchBar } from "./components/SearchBar"
import { DefaultListItem } from "@/components/UI/DefaultListItem";
import { SystemCard } from "@/components/UI/SystemCard";
import { useEffect, useState } from "react";
import { api } from "@/lib/ky";
import { ISystem } from "@/interfaces/ISystem";

export default function Explore() {
  const [allSystems, setAllSystems] = useState<ISystem[]>([])
  const [querySystems, setQuerySystems] = useState<ISystem[]>([])

  useEffect(() => {
    searchAllSystems()
      .then(systems => {
        setAllSystems(systems)
        setQuerySystems(systems)
      })
      .catch(err => console.error('Errro pesquisando por sistemas: ', err))
  }, [])

  async function searchAllSystems() {
    const res = await api.get('systems', {
      method: 'GET'
    })
    const { systems }: { systems: ISystem[] } = await res.json()

    return systems
  }

  async function handleQuerySystems(query: string) {
    const newQuerySystems = allSystems.filter(system => system.name.toUpperCase().trim().includes(query.toUpperCase().trim()))
    setQuerySystems(newQuerySystems)
  }

  return (
    <>
      <PageHeader title="Explorar" />

      <main className="max-w-screen-2xl mx-auto flex flex-col items-center gap-16 mt-12 px-4 pb-10" >
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
      </main>
    </>
  )
}