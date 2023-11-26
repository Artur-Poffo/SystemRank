import { SettingsButton } from "@/components/UI/SettingsButton";

interface UserBannerProps {
  userId: string
  bannerImagePath?: string
  isTheOwner?: boolean
}

export function UserBanner({ userId, bannerImagePath, isTheOwner = false }: UserBannerProps) {
  return (
    <header className={`w-full min-h-[400px] bg-brand-gray-100 rounded-md relative ${!bannerImagePath && 'null-image-gradient'}`} >
      {bannerImagePath && (
        <img src={bannerImagePath} alt="Imagem de banner do usuário" className="absolute top-0 left-0 w-full h-full rounded-md object-cover" />
      )}

      {isTheOwner && (
        <SettingsButton link={`/me/${userId}/settings`} />
      )}
    </header>
  )
}