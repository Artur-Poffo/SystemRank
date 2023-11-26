import Link from "next/link"
import { IoMdSettings } from "react-icons/io"

interface SettingsButtonProps {
  link: string
}

export function SettingsButton({ link }: SettingsButtonProps) {
  return (
    <Link href={link} className="absolute z-[1] bottom-10 right-10 rounded-full" >
      <button className="p-3 rounded-full bg-brand-gray-700 cursor-pointer" >
        <IoMdSettings />
      </button>
    </Link>
  )
}