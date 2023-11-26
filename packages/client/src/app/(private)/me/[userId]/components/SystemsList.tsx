import { DefaultListItem } from "@/components/UI/DefaultListItem"
import { EmptyList } from "@/components/UI/EmptyList"
import { SystemCard } from "@/components/UI/SystemCard"
import { ISystem } from "@/interfaces/ISystem"

interface SystemsListProps {
  systems: ISystem[]
}

export function SystemsList({ systems }: SystemsListProps) {
  return (
    systems.length > 0 ? (
      <DefaultListItem centered={false}>
        {systems.map(system => {
          return (
            <li key={system.id} className="w-full md:w-auto" >
              <SystemCard id={system.id} name={system.name} description={system.description} logoUrl={system.system_logo_image_path || ""} />
            </li>
          )
        })}
      </DefaultListItem>
    ) : (
      <EmptyList text="Sem sistemas por enquanto" />
    )
  )
}