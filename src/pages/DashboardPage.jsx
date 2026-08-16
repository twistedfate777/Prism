import { Link } from 'react-router-dom'

const progressBars = [
  { label: 'Privacy Awareness', value: 85 },
  { label: 'Source Evaluation', value: 72 },
  { label: 'Critical Thinking', value: 80 },
  { label: 'Sharing Awareness', value: 90 },
]

const recentChecks = [
  { type: 'forum', category: 'Social Feed', title: 'Suspicious Link Check', color: 'bg-secondary', glow: 'shadow-[0_0_8px_rgba(0,107,88,0.4)]' },
  { type: 'article', category: 'News Article', title: 'Source Verification', color: 'bg-tertiary-fixed-dim', glow: 'shadow-[0_0_8px_rgba(255,185,88,0.4)]' },
  { type: 'chat_bubble', category: 'Direct Message', title: 'Sender Analysis', color: 'bg-error', glow: 'shadow-[0_0_8px_rgba(186,26,26,0.4)]' },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="font-display-lg text-headline-lg md:text-display-lg text-primary tracking-tight">Welcome back</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Here is a gentle overview of your digital hygiene and recent activities.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Digital Responsibility Card */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 md:p-8 shadow-level-1">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-primary">My Digital Responsibility</h2>
          </div>
          <div className="flex flex-col gap-6">
            {progressBars.map(bar => (
              <div key={bar.label} className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="font-label-md text-label-md text-on-surface">{bar.label}</span>
                  <span className="font-label-md text-label-md text-on-surface-variant">{bar.value}%</span>
                </div>
                <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-container to-secondary rounded-full transition-all duration-1000 ease-out" style={{ width: `${bar.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Check CTA Card */}
        <Link to="/check" className="lg:col-span-4 group flex flex-col justify-between bg-surface-container-lowest rounded-xl p-6 md:p-8 shadow-level-1 border border-secondary-container hover:shadow-md transition-all duration-300">
          <div>
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-6 group-hover:scale-105 transition-transform duration-300">
              <span className="material-symbols-outlined filled-icon">upload_file</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-primary mb-2">Check something now</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Unsure about a link, image, or message? Upload it here for a mindful review.</p>
          </div>
          <div className="mt-8 flex items-center text-secondary font-label-md text-label-md group-hover:gap-2 transition-all duration-300">
            <span>Start review</span>
            <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
          </div>
        </Link>
      </div>

      {/* Recent Checks */}
      <section className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-headline-md text-headline-md text-primary">Recent Checks</h3>
          <Link className="font-label-md text-label-md text-secondary hover:text-on-secondary-fixed-variant transition-colors" to="/profile">View all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentChecks.map(check => (
            <Link to="/profile/detail" key={check.title} className="bg-surface-container-lowest rounded-xl p-4 shadow-level-1 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
              <div className="w-16 h-16 rounded-lg bg-surface-container-highest shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant text-[28px]">{check.type}</span>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">{check.type}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{check.category}</span>
                </div>
                <p className="font-label-md text-label-md text-on-surface truncate">{check.title}</p>
              </div>
              <div className={`w-3 h-3 rounded-full ${check.color} ${check.glow} shrink-0`}></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Practice Mode Banner */}
      <div className="bg-surface-container-low rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-surface-variant mt-4">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center text-primary-container shrink-0">
            <span className="material-symbols-outlined filled-icon">view_cozy</span>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md text-primary mb-1">Practice Mode: Enter the Feed Simulator</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Train your digital instincts in a safe, simulated environment without real-world consequences.</p>
          </div>
        </div>
        <Link to="/practice" className="shrink-0 w-full md:w-auto text-center bg-transparent border-2 border-primary-container text-primary-container font-label-md text-label-md px-6 py-3 rounded-xl hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300">
          Start Session
        </Link>
      </div>
    </div>
  )
}
