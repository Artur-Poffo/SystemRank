import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-4 bg-brand-gray-600 flex items-center justify-center text-center gap-4" >
      <span className="text-brand-green-300" >@SystemRank</span>
      |
      <Link href={'https://github.com/Artur-Poffo/SystemRank'} className="text-sm text-brand-green-200" >Código fonte no GitHub</Link>
    </footer>
  )
}