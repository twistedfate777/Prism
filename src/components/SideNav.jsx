import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/profile', icon: 'person', label: 'Profile' },
  { to: '/practice', icon: 'psychology', label: 'Insights' },
]

const bottomItems = [
  { to: '#', icon: 'help_outline', label: 'Help' },
  { to: '#', icon: 'logout', label: 'Sign Out' },
]

export default function SideNav() {
  const location = useLocation()

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container-low shadow-sm py-base z-40 overflow-y-auto">
      <div className="px-6 py-4 flex flex-col items-start gap-1">
        <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">PRISM</Link>
        <span className="font-label-md text-label-md text-on-surface-variant">Digital Mindfulness</span>
      </div>
      <div className="px-6 py-4">
        <Link to="/check" className="block w-full bg-primary text-on-primary py-2 px-4 rounded-xl font-label-md text-label-md text-center shadow-sm hover:opacity-90 transition-opacity">
          New Check
        </Link>
      </div>
      <nav className="flex-1 mt-4 px-2 space-y-1">
        {navItems.map(item => {
          const isActive = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'text-primary font-bold border-r-4 border-primary bg-primary-container/10'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-md text-label-md">{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto px-2 pb-4 space-y-1">
        {bottomItems.map(item => (
          <a key={item.label} href={item.to} className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all">
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-label-md text-label-md">{item.label}</span>
          </a>
        ))}
      </div>
    </aside>
  )
}
