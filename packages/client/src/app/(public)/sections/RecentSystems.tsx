import { SectionHeader } from "@/components/UI/SectionHeader";
import { SystemCard } from "@/components/UI/SystemCard";
import Link from "next/link";

export function RecentSystemsSection() {
  return (
    <section id="#recent-systems" className="px-4 pb-10" >
      <SectionHeader text="Sistemas recentes" />

      <div className="flex flex-col gap-12" >
        <h2 className="text-3xl text-brand-green-300 font-bold" >Sistemas cadastrados recentemente:</h2>
        <ul className="flex flex-wrap items-start justify-center xl:justify-start gap-6">
          <li>
            <SystemCard animationDelay={0.2} />
          </li>
          <li>
            <SystemCard animationDelay={0.4} />
          </li>
          <li>
            <SystemCard animationDelay={0.6} />
          </li>
          <li className="w-full md:w-auto">
            <Link href={'/explore'} >
              <SystemCard skeleton animationDelay={0.8} />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}