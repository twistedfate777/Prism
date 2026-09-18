import SideNav from './SideNav'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useScan } from '../context/useScan'

export default function DashboardLayout({ children }) {
  const { user, signOut } = useScan()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const mobileLinks = [
    ['/dashboard', 'dashboard', 'Dashboard'],
    ['/practice', 'psychology', 'Insights'],
    ...(user ? [['/profile', 'person', 'Profile']] : []),
    ['/trust', 'help_outline', 'Help'],
  ]

  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col md:flex-row">
      {/* Mobile top nav */}
      <nav className="md:hidden flex justify-between items-center w-full px-container-padding-mobile h-16 bg-surface shadow-sm z-50 fixed top-0 left-0">
        <button aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(prev => !prev)} className="text-primary p-2 rounded-lg hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span></button>
        <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">PRISM</Link>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary">notifications</span>
          <span className="material-symbols-outlined text-primary">settings</span>
        </div>
      </nav>
      {menuOpen && <><button aria-label="Close navigation overlay" onClick={() => setMenuOpen(false)} className="md:hidden fixed inset-0 bg-on-background/30 z-40" /><aside className="md:hidden fixed left-0 top-0 bottom-0 w-[min(82vw,320px)] bg-surface z-50 shadow-level-2 pt-20 px-4"><div className="px-3 pb-5 border-b border-surface-variant"><Link to="/check" onClick={() => setMenuOpen(false)} className="block w-full bg-primary text-on-primary py-3 px-4 rounded-xl font-label-md text-center">New Check</Link></div><nav className="flex flex-col gap-1 py-5" aria-label="Dashboard navigation">{mobileLinks.map(([to, icon, label]) => <Link key={to} to={to} onClick={() => setMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg font-label-md ${location.pathname === to ? 'text-primary bg-primary-container/10 font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}><span className="material-symbols-outlined">{icon}</span>{label}</Link>)}{user ? <button onClick={() => { setMenuOpen(false); signOut() }} className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low text-left font-label-md"><span className="material-symbols-outlined">logout</span>Sign out</button> : <Link to="/signup?mode=login" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low font-label-md"><span className="material-symbols-outlined">login</span>Sign in</Link>}</nav></aside></>}
      <SideNav />
      <main className="flex-1 w-full max-w-[1200px] mx-auto md:ml-64 pt-20 md:pt-12 px-container-padding-mobile md:px-container-padding-desktop pb-24 md:pb-12 min-h-screen">
        {children}
      </main>
      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 h-16 bg-white/80 backdrop-blur-md shadow-[0_-4px_20px_rgba(43,45,110,0.04)] rounded-t-xl">
        <Link to="/dashboard" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-sm text-[10px]">Home</span>
        </Link>
        <Link to="/check" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary">
          <span className="material-symbols-outlined">visibility</span>
          <span className="font-label-sm text-[10px]">Check</span>
        </Link>
        <Link to="/practice" className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary">
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-label-sm text-[10px]">Practice</span>
        </Link>
        {user && <Link to="/profile" className="flex flex-col items-center justify-center text-primary bg-primary-container/10 rounded-full px-4 py-1">
          <span className="material-symbols-outlined filled-icon">account_circle</span>
          <span className="font-label-sm text-[10px]">Profile</span>
        </Link>}
      </nav>
    </div>
  )
}
