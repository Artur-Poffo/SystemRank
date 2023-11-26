interface DefaultSubTitleProps {
  text: string
}

export function DefaultSubTitle({ text }: DefaultSubTitleProps) {
  return (
    <h2 className="text-3xl text-brand-green-300 font-bold" >{text}</h2>
  )
}