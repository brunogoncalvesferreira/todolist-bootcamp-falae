import { Rocket } from 'lucide-react'

export function Header() {
  return (
    <header className="py-20 bg-gray-900 flex items-center justify-center gap-2">
      <h1 className="md:text-3xl font-bold text-gray-50">TodoList</h1>
      <Rocket className="w-10 h-10 text-gray-50" />
    </header>
  )
}
