import { DefaultListItem } from "@/components/UI/DefaultListItem";
import { DefaultSubTitle } from "@/components/UI/DefaultSubTitle";
import { SectionHeader } from "@/components/UI/SectionHeader";
import { SystemCard } from "@/components/UI/SystemCard";
import { fetchAllSystems } from "@/server-functions/fetchAllSystems";
import Link from "next/link";

export async function RecentSystemsSection() {
  const systems = await fetchAllSystems()

  return (
    <section id="recent-systems" className="px-4 pb-10" >
      <SectionHeader text="Sistemas recentes" />

      <div className="flex flex-col gap-12" >
        <DefaultSubTitle text="Sistemas cadastrados recentemente:" />
        <DefaultListItem className="justify-center xl:justify-start">
          {systems.slice(0, 3).map((system, index) => {
            return (
              <li className="w-full md:w-auto" key={system.id} >
                <SystemCard id={system.id} name={system.name} description={system.description} logoUrl={system.system_logo_image_path || ""} animationDelay={index * 20 / 100} />
                {/* Animation delay order: 0,2 -> 0,4 -> 0,6 */}
              </li>
            )
          })}
          <li className="w-full md:w-auto">
            <Link href={'/explore'} >
              <SystemCard skeleton animationDelay={0.8} />
            </Link>
          </li>
        </DefaultListItem>
      </div>
    </section>
  )
}