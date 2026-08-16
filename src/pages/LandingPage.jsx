import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-20 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop bg-surface overflow-hidden">
        {/* Atmospheric Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-secondary-container/20 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 floating"></div>
          <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-primary-fixed/20 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 floating" style={{ animationDelay: '-3s' }}></div>
        </div>
        <div className="relative max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          {/* Hero Content */}
          <div className="lg:col-span-6 flex flex-col items-start gap-8 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container border border-outline-variant/30 text-primary-container font-label-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
              </span>
              Introducing Mindful Protection
            </div>
            <h1 className="font-display-lg text-display-lg text-primary-container max-w-2xl leading-tight">
              Before You Share, <br /><span className="text-secondary">Pause.</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              PRISM gives you a moment to decide responsibly before content leaves your control. A mindful approach to digital sharing, designed for clarity and peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              <Link to="/check" className="inline-flex justify-center items-center gap-2 bg-secondary hover:bg-secondary/90 text-on-secondary px-8 py-4 rounded-2xl font-label-md transition-all shadow-sm hover:shadow-md">
                Try PRISM
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <a href="#features" className="inline-flex justify-center items-center gap-2 bg-transparent border border-outline-variant hover:bg-surface-container-low text-on-surface px-8 py-4 rounded-2xl font-label-md transition-all">
                View Principles
              </a>
            </div>
          </div>
          {/* Hero Visual */}
          <div className="lg:col-span-6 relative h-[500px] w-full mt-12 lg:mt-0 z-0 hidden md:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 bg-surface rounded-full shadow-[0_8px_32px_rgba(20,21,88,0.08)] flex items-center justify-center border border-surface-container-highest z-20 floating">
                <div className="absolute inset-0 rounded-full border-2 border-secondary/20 pulse-ring"></div>
                <span className="material-symbols-outlined text-[80px] text-primary-container font-light">motion_photos_pause</span>
              </div>
              <div className="absolute w-[400px] h-[400px] border border-outline-variant/20 rounded-full animate-[spin_40s_linear_infinite] z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-surface rounded-full shadow-sm flex items-center justify-center border border-surface-container-highest">
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">image</span>
                </div>
              </div>
              <div className="absolute w-[550px] h-[550px] border border-outline-variant/10 rounded-full animate-[spin_60s_linear_infinite_reverse] z-10">
                <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-16 h-16 bg-surface rounded-full shadow-sm flex items-center justify-center border border-surface-container-highest">
                  <span className="material-symbols-outlined text-secondary text-[24px]">chat_bubble</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop bg-surface-container-lowest relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-container mb-4">A Framework for Clarity</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">We believe security shouldn't rely on fear. It should rely on a clear mind and a moment of reflection.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Protect */}
            <div className="bg-surface rounded-2xl p-8 soft-shadow border border-surface-container-highest hover:-translate-y-1 transition-transform duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-on-primary-fixed text-[28px]">shield_lock</span>
              </div>
              <h3 className="font-headline-md text-[20px] text-primary-container mb-3">PROTECT</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Automatically identify sensitive information before it leaves your device, creating a secure boundary around your digital life.
              </p>
            </div>
            {/* Think */}
            <div className="bg-surface rounded-2xl p-8 soft-shadow border border-surface-container-highest hover:-translate-y-1 transition-transform duration-300 group md:-translate-y-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-on-secondary-container text-[28px]">psychology</span>
              </div>
              <h3 className="font-headline-md text-[20px] text-primary-container mb-3">THINK</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Intercept impulsive actions with a gentle pause, allowing you time to reconsider the impact of what you are about to share.
              </p>
            </div>
            {/* Verify */}
            <div className="bg-surface rounded-2xl p-8 soft-shadow border border-surface-container-highest hover:-translate-y-1 transition-transform duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-on-tertiary-fixed text-[28px]">fact_check</span>
              </div>
              <h3 className="font-headline-md text-[20px] text-primary-container mb-3">VERIFY</h3>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                Confirm your intentions in a calm, clear interface free from urgent red alerts or confusing technical jargon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop bg-surface overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-16 md:w-1/2">
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-container mb-4">The Mindful Flow</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">A simple, intuitive process that integrates seamlessly into your daily digital interactions.</p>
          </div>
          {/* Desktop Flow */}
          <div className="hidden md:block relative w-full h-48 mt-20">
            <svg className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 z-0" preserveAspectRatio="none">
              <defs>
                <linearGradient id="flowGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#141558" />
                  <stop offset="50%" stopColor="#2b2d6e" />
                  <stop offset="100%" stopColor="#006b58" />
                </linearGradient>
              </defs>
              <line className="opacity-30" stroke="url(#flowGradient)" strokeWidth="2" x1="0" x2="100%" y1="4" y2="4" />
              <line className="path-line" stroke="url(#flowGradient)" strokeDasharray="20, 10" strokeWidth="2" x1="0" x2="100%" y1="4" y2="4" />
            </svg>
            <div className="absolute inset-0 flex justify-between items-center z-10 px-8">
              {[
                { icon: 'visibility', label: 'See', border: 'border-primary-container', text: 'text-primary-container' },
                { icon: 'motion_photos_pause', label: 'Pause', border: 'border-primary-container', text: 'text-primary-container' },
                { icon: 'lightbulb', label: 'Understand', border: 'border-primary/70', text: 'text-primary/70' },
                { icon: 'check_circle', label: 'Decide', border: 'border-secondary/80', text: 'text-secondary/80' },
                { icon: 'send', label: 'Share', border: '', text: 'text-secondary', bg: 'bg-secondary text-on-secondary shadow-md', bold: true },
              ].map((node) => (
                <div key={node.label} className="flex flex-col items-center gap-4 group">
                  <div className={`w-16 h-16 rounded-full ${node.bg || `bg-surface ${node.border}`} border-2 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <span className={`material-symbols-outlined ${node.bg ? '' : node.text}`}>{node.icon}</span>
                  </div>
                  <span className={`font-label-md ${node.text} ${node.bold ? 'font-bold' : ''}`}>{node.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Mobile Flow */}
          <div className="md:hidden flex flex-col gap-8 relative pl-8 mt-8">
            <div className="absolute left-[39px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary-container to-secondary opacity-30 z-0"></div>
            {[
              { icon: 'visibility', label: 'See', desc: 'Identify the content intent.' },
              { icon: 'motion_photos_pause', label: 'Pause', desc: 'Intercept impulsive action.' },
              { icon: 'send', label: 'Share', desc: 'Proceed with confidence.', accent: true },
            ].map((node) => (
              <div key={node.label} className="flex items-center gap-6 z-10">
                <div className={`w-12 h-12 shrink-0 rounded-full ${node.accent ? 'bg-secondary text-on-secondary shadow-sm' : 'bg-surface border-2 border-primary-container'} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined text-sm ${!node.accent ? 'text-primary-container' : ''}`}>{node.icon}</span>
                </div>
                <div>
                  <h4 className={`font-label-md ${node.accent ? 'text-secondary font-bold' : 'text-primary-container'}`}>{node.label}</h4>
                  <p className="font-body-md text-sm text-on-surface-variant">{node.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Editorial */}
      <section className="py-section-gap px-container-padding-mobile md:px-container-padding-desktop bg-surface-container-lowest">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[300px]">
            {/* Large Image Card */}
            <div className="md:col-span-8 rounded-2xl overflow-hidden relative soft-shadow group bg-surface-container">
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full md:w-2/3">
                <div className="inline-block px-3 py-1 bg-surface/80 backdrop-blur-sm rounded-full text-primary font-label-sm mb-3">Designed for Focus</div>
                <h3 className="font-headline-md text-primary-container mb-2">Integration without interruption.</h3>
                <p className="font-body-md text-on-surface-variant">PRISM works quietly in the background, only stepping forward when a mindful moment is necessary.</p>
              </div>
            </div>
            {/* Stat Card */}
            <div className="md:col-span-4 rounded-2xl bg-surface-container border border-surface-container-highest p-8 flex flex-col justify-center items-center text-center soft-shadow">
              <span className="font-display-lg text-[64px] text-secondary mb-2">99%</span>
              <h4 className="font-headline-md text-[18px] text-primary-container mb-2">False Positives Eliminated</h4>
              <p className="font-body-md text-sm text-on-surface-variant">Context-aware scanning ensures you are only prompted when it truly matters.</p>
            </div>
            {/* Info Card */}
            <div className="md:col-span-5 rounded-2xl bg-primary-container text-on-primary-container p-8 flex flex-col justify-between soft-shadow overflow-hidden relative">
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <span className="material-symbols-outlined text-[150px] filled-icon">lock</span>
              </div>
              <div>
                <span className="material-symbols-outlined mb-4 text-primary-fixed">encrypted</span>
                <h4 className="font-headline-md text-on-primary text-[22px] mb-2">Local First</h4>
                <p className="font-body-md text-primary-fixed-dim">Analysis happens on your device. Your content never touches our servers unless you explicitly choose to share it.</p>
              </div>
              <a className="inline-flex items-center gap-2 mt-6 text-on-primary font-label-md hover:text-secondary transition-colors" href="#">
                Read Privacy Policy <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
            {/* Video Card */}
            <div className="md:col-span-7 rounded-2xl overflow-hidden relative soft-shadow group bg-surface-container">
              <div className="absolute inset-0 flex items-center justify-center bg-surface/20 backdrop-blur-[2px]">
                <button className="w-16 h-16 bg-surface/90 backdrop-blur-md rounded-full shadow-md flex items-center justify-center text-primary-container hover:scale-110 transition-transform hover:text-secondary">
                  <span className="material-symbols-outlined filled-icon text-[32px]">play_arrow</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
