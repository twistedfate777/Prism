import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full mt-section-gap bg-surface-container-low transition-opacity duration-200">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[1200px] mx-auto px-container-padding-mobile md:px-container-padding-desktop py-12 gap-8 md:gap-0">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link to="/" className="font-display-lg text-headline-md text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">lens</span>
            PRISM
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant text-center md:text-left max-w-sm">
            © 2024 PRISM. Mindful protection for every shared moment.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
          <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Security Disclosure</a>
          <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
