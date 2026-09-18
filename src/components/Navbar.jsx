import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useScan } from '../context/useScan'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { user } = useScan()
  const navItems = [
    ['/check', 'Check'],
    ['/practice', 'Insights'],
    ['/principles', 'Principles'],
    ['/trust', 'Trust'],
  ]

  function isActive(path) {
    return location.pathname === path || (path === '/check' && location.pathname.startsWith('/check/'))
  }

  return (
    <header className="w-full top-0 sticky bg-surface/80 backdrop-blur-md shadow-sm z-50 transition-all duration-200 ease-in-out">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto px-container-padding-mobile md:px-container-padding-desktop h-20">
        <Link to="/" className="font-display-lg text-headline-md tracking-tight text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">lens</span>
          PRISM
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-label-md text-label-md">
          {navItems.map(([to, label]) => <Link key={to} to={to} className={`relative py-2 transition-all duration-200 ${isActive(to) ? 'text-primary font-semibold -translate-y-0.5 after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-primary' : 'text-on-surface-variant hover:text-primary hover:-translate-y-0.5'}`}>{label}</Link>)}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Link to={user ? '/dashboard' : '/signup'} className="bg-primary hover:bg-primary/90 text-on-primary px-5 py-3 rounded-xl font-label-md transition-colors shadow-sm whitespace-nowrap">
            {user ? 'Dashboard' : 'Get Started'}
          </Link>
          <Link to={user ? '/profile' : '/signup?mode=login'} aria-label={user ? 'Open profile' : 'Sign in'} title={user ? 'Profile' : 'Sign in'} className="text-primary hover:text-on-primary-fixed-variant transition-colors p-2 rounded-full hover:bg-surface-variant">
            <span className="material-symbols-outlined">{user ? 'account_circle' : 'login'}</span>
          </Link>
        </div>
        <button aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(prev => !prev)} className="md:hidden text-on-surface p-2 rounded-lg hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>
      {menuOpen && <div className="md:hidden absolute top-20 left-0 right-0 bg-surface shadow-level-2 border-t border-surface-variant px-container-padding-mobile py-5"><nav className="flex flex-col gap-1" aria-label="Mobile navigation">{[...navItems, [user ? '/dashboard' : '/signup', user ? 'Dashboard' : 'Get started']].map(([to, label]) => <Link key={to} to={to} onClick={() => setMenuOpen(false)} className={`relative px-4 py-3 rounded-lg font-label-md transition-all ${isActive(to) ? 'text-primary font-semibold translate-x-1 bg-primary-container/10 after:absolute after:left-0 after:top-2 after:bottom-2 after:w-0.5 after:bg-primary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'}`}>{label}</Link>)}</nav></div>}
    </header>
  )
}
