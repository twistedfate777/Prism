import { Link } from 'react-router-dom'

export default function NewUserHome() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center py-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-[1200px] mx-auto w-full">
      {/* Hero */}
      <div className="w-full max-w-3xl mx-auto text-center flex flex-col items-center gap-8 mb-section-gap">
        <div className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center">
          <img alt="Mindful sharing illustration" className="w-full h-full object-contain mix-blend-multiply opacity-90" src="/illustration.png" />
        </div>
        <div className="space-y-4">
          <h1 className="font-display-lg text-display-lg text-primary">Nothing to show yet — let's change that</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Check your first piece of content before you share it anywhere.</p>
        </div>
        <Link to="/check" className="group w-full max-w-lg mt-8 bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-8 shadow-level-1 hover:shadow-level-2 transition-all duration-300 flex flex-col items-center gap-6 relative overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background">
          <div className="absolute top-0 left-0 w-full h-1 bg-secondary-fixed"></div>
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary-container group-hover:text-on-primary-container transition-all duration-300">
            <span className="material-symbols-outlined text-3xl">upload_file</span>
          </div>
          <span className="font-headline-md text-headline-md text-primary block mb-2 group-hover:text-primary-container transition-colors">
            Check something now <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </Link>
      </div>
      {/* Locked Preview Cards */}
      <div className="w-full mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {[
            { icon: 'shield_person', label: 'Your Responsibility Profile' },
            { icon: 'model_training', label: 'Practice Mode' },
            { icon: 'forum', label: 'Community Reports' },
          ].map(card => (
            <div key={card.label} className="bg-surface-container-low/50 border border-outline-variant/20 rounded-xl p-6 flex flex-col gap-4 opacity-60 grayscale-[0.5] relative overflow-hidden">
              <div className="flex items-center gap-3 text-on-surface-variant">
                <span className="material-symbols-outlined">{card.icon}</span>
                <h3 className="font-label-md text-label-md font-semibold">{card.label}</h3>
              </div>
              <div className="flex items-center gap-2 mt-auto text-on-surface-variant/70">
                <span className="material-symbols-outlined text-sm">lock</span>
                <span className="font-label-sm text-label-sm">Unlocks after your first check</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
