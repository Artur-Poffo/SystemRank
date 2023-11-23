interface RoleSpanProps {
  text: string
}

export function RoleSpan({ text }: RoleSpanProps) {
  return (
    <span className="text-sm text-brand-gray-100 bg-brand-green-400 py-px px-2 rounded-full font-mono font-bold uppercase tracking-widest" >{text}</span>
  )
}