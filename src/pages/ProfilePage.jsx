import { Link } from 'react-router-dom'

const historyItems = [
  { title: 'Article: Climate Policy Update', date: 'Oct 24, 2023 • 10:30 AM', dots: ['bg-error', 'bg-tertiary-fixed-dim', 'bg-secondary'], selected: true },
  { title: 'Report: Q3 Financial Summary', date: 'Oct 22, 2023 • 2:15 PM', dots: ['bg-secondary'], selected: false },
  { title: 'Social Media Post Analysis', date: 'Oct 20, 2023 • 9:05 AM', dots: ['bg-tertiary-fixed-dim', 'bg-secondary'], selected: false },
]

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-12">
      {/* Profile Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shadow-lg shadow-primary/5 bg-surface-container-highest shrink-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant">account_circle</span>
        </div>
        <div className="flex-1">
          <h1 className="font-headline-lg text-headline-lg md:font-display-lg md:text-display-lg text-on-surface mb-2">Alex Rivera</h1>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-secondary filled-icon">verified_user</span>
            <span className="font-body-md text-body-md">Digital Guardian since Oct 2023</span>
          </div>
        </div>
        <button className="hidden md:flex items-center gap-2 bg-surface-container-low text-primary px-6 py-3 rounded-xl border border-surface-variant hover:bg-surface-container-high transition-colors">
          <span className="material-symbols-outlined">edit</span>
          <span className="font-label-md text-label-md">Edit Profile</span>
        </button>
      </header>

      {/* Journey Overview */}
      <section>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Journey Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <div className="bg-surface-container-lowest rounded-[16px] p-6 shadow-level-1 flex flex-col justify-between min-h-[160px] relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-container/10 rounded-full blur-2xl group-hover:bg-primary-container/20 transition-all duration-500"></div>
            <div className="flex items-center justify-between z-10">
              <span className="font-body-lg text-body-lg text-on-surface-variant">Checks Completed</span>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">fact_check</span>
              </div>
            </div>
            <div className="z-10 mt-4">
              <span className="font-display-lg text-display-lg text-on-surface">124</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-[16px] p-6 shadow-level-1 flex flex-col justify-between min-h-[160px] relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-secondary-container/10 rounded-full blur-2xl group-hover:bg-secondary-container/20 transition-all duration-500"></div>
            <div className="flex items-center justify-between z-10">
              <span className="font-body-lg text-body-lg text-on-surface-variant">Insights Gained</span>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>
            </div>
            <div className="z-10 mt-4">
              <span className="font-display-lg text-display-lg text-on-surface">42</span>
            </div>
          </div>
        </div>
      </section>

      {/* Responsibility History */}
      <section>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Responsibility History</h2>
        <div className="flex flex-col gap-4">
          {historyItems.map(item => (
            <Link
              to="/profile/detail"
              key={item.title}
              className={`bg-surface-container-lowest rounded-[16px] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all cursor-pointer ${
                item.selected
                  ? 'shadow-level-2 ring-1 ring-primary/20 z-20 transform scale-[1.01]'
                  : 'shadow-level-1 border border-transparent hover:border-surface-variant'
              }`}
            >
              <div className="w-16 h-16 rounded-lg bg-surface-container-highest overflow-hidden shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px] text-on-surface-variant">description</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-headline-md text-lg text-on-surface truncate">{item.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{item.date}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 mt-2 sm:mt-0">
                {item.dots.map((dot, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${dot}`}></div>
                ))}
              </div>
            </Link>
          ))}
          <button className="mt-4 text-primary font-label-md text-label-md hover:underline self-center bg-transparent py-2">
            View Full History
          </button>
        </div>
      </section>
    </div>
  )
}
