import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useCart()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/fabrics', label: 'Fabrics' },
    { to: '/custom-stitching', label: 'Custom Stitching' },
    { to: '/ready-made', label: 'Ready-Made' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const navLinkClass = ({ isActive }) =>
    `text-gray-700 hover:text-primary-600 transition-colors font-medium ${
      isActive ? 'text-primary-600' : ''
    }`

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-display text-2xl md:text-3xl font-bold text-primary-600">
              ClothStore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" aria-label="Main navigation">
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t" aria-label="Mobile navigation">
            <div className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={navLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
