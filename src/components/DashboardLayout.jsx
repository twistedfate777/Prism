import SideNav from './SideNav'
import { Link } from 'react-router-dom'

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-background text-on-background font-body-md antialiased min-h-screen flex flex-col md:flex-row">
      {/* Mobile top nav */}
      <nav className="md:hidden flex justify-between items-center w-full px-container-padding-mobile h-16 bg-surface shadow-sm z-50 fixed top-0 left-0">
        <Link to="/" className="font-headline-md text-headline-md font-bold text-primary">PRISM</Link>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary">notifications</span>
          <span className="material-symbols-outlined text-primary">settings</span>
        </div>
      </nav>
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
        <Link to="/profile" className="flex flex-col items-center justify-center text-primary bg-primary-container/10 rounded-full px-4 py-1">
          <span className="material-symbols-outlined filled-icon">account_circle</span>
          <span className="font-label-sm text-[10px]">Profile</span>
        </Link>
      </nav>
    </div>
  )
}
