import Link from "next/link";
import { IoMdSettings } from "react-icons/io";

interface UserBannerProps {
  userId: string
  bannerImagePath?: string
  isTheOwner?: boolean
}

export function UserBanner({ userId, bannerImagePath, isTheOwner = false }: UserBannerProps) {
  return (
    <header className={`w-full min-h-[400px] bg-brand-gray-100 rounded-md relative ${!bannerImagePath && 'bg-gradient-to-r from-brand-green-100 to-brand-green-500'}`} >
      {bannerImagePath && (
        <img src={bannerImagePath} alt="Imagem de banner do usuário" className="absolute top-0 left-0 w-full h-full rounded-md object-cover" />
      )}

      {isTheOwner && (
        <Link href={`/me/${userId}/settings`} className="absolute z-10 bottom-10 right-10 rounded-full" >
          <button className="p-3 rounded-full bg-brand-gray-700 cursor-pointer" >
            <IoMdSettings />
          </button>
        </Link>
      )}
    </header>
  )
}