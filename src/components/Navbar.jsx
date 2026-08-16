import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="w-full top-0 sticky bg-surface/80 backdrop-blur-md shadow-sm z-50 transition-all duration-200 ease-in-out">
      <div className="flex justify-between items-center max-w-[1200px] mx-auto px-container-padding-mobile md:px-container-padding-desktop h-20">
        <Link to="/" className="font-display-lg text-headline-md tracking-tight text-primary flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">lens</span>
          PRISM
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-label-md text-label-md">
          <Link to="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors duration-300">Platform</Link>
          <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors duration-300">Principles</Link>
          <Link to="/" className="text-primary font-semibold border-b-2 border-primary pb-1">Safety</Link>
          <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors duration-300">Trust</Link>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Link to="/signup" className="bg-primary hover:bg-primary/90 text-on-primary px-6 py-3 rounded-xl font-label-md transition-colors shadow-sm">
            Get Started
          </Link>
          <Link to="/profile" className="text-primary hover:text-on-primary-fixed-variant transition-colors p-2 rounded-full hover:bg-surface-variant">
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
        <button className="md:hidden text-on-surface p-2">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>
  )
}
