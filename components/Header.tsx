import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍝</span>
            <span className="text-2xl font-bold text-neutral-900">
              Sapori d'Italia
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-neutral-700 hover:text-primary font-medium">
              Home
            </Link>
            <Link href="/recipes" className="text-neutral-700 hover:text-primary font-medium">
              Recipes
            </Link>
            <Link href="/about" className="text-neutral-700 hover:text-primary font-medium">
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden text-neutral-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}