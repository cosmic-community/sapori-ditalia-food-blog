import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍝</span>
              <span className="text-xl font-bold">Sapori d'Italia</span>
            </div>
            <p className="text-neutral-400">
              Bringing authentic Italian flavors to your kitchen.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/recipes" className="text-neutral-400 hover:text-white">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-400 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <p className="text-neutral-400">
              Stay connected for the latest recipes and culinary inspiration.
            </p>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
          <p>&copy; {currentYear} Sapori d'Italia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}