import { Link } from 'react-router-dom'
import { useScan } from '../context/useScan'

const destinationLabels = {
  school: 'School', public: 'Public', social_media: 'Social Media', 'social-media': 'Social Media',
  ai: 'AI', private_chat: 'Private Chat', 'private-chat': 'Private Chat',
}

export default function DashboardPage() {
  const { user, checkHistory, practiceStats } = useScan()
  const checks = checkHistory.length
  const accuracy = practiceStats.completed ? Math.round((practiceStats.correct / practiceStats.completed) * 100) : 0
  const progressBars = [
    { label: 'Privacy Awareness', value: Math.min(100, checks * 12 + practiceStats.correct * 5) },
    { label: 'Source Evaluation', value: Math.min(100, accuracy + (checks ? 15 : 0)) },
    { label: 'Critical Thinking', value: Math.min(100, practiceStats.completed * 10 + checks * 8) },
    { label: 'Sharing Awareness', value: Math.min(100, checks * 10 + practiceStats.correct * 8) },
  ]

  return (
    <div className="flex flex-col gap-12">
      <header>
        <h1 className="font-display-lg text-headline-lg md:text-display-lg text-primary tracking-tight">{user ? `Welcome back, ${user.name}` : 'Your digital dashboard'}</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">{checks ? `You have completed ${checks} ${checks === 1 ? 'check' : 'checks'} in this session.` : 'Start with a check or a short practice session. No account is required.'}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 md:p-8 shadow-level-1">
          <div className="flex items-center gap-3 mb-8"><div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary"><span className="material-symbols-outlined">psychology</span></div><div><h2 className="font-headline-md text-headline-md text-primary">My Digital Responsibility</h2><p className="text-sm text-on-surface-variant">Based on activity in this session</p></div></div>
          <div className="flex flex-col gap-6">{progressBars.map(bar => <div key={bar.label} className="flex flex-col gap-2"><div className="flex justify-between items-center"><span className="font-label-md text-label-md text-on-surface">{bar.label}</span><span className="font-label-md text-label-md text-on-surface-variant">{bar.value}%</span></div><div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-primary-container to-secondary rounded-full transition-all duration-700" style={{ width: `${bar.value}%` }} /></div></div>)}</div>
        </div>
        <Link to="/check" className="lg:col-span-4 group flex flex-col justify-between bg-surface-container-lowest rounded-xl p-6 md:p-8 shadow-level-1 border border-secondary-container hover:shadow-md transition-all"><div><div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-6"><span className="material-symbols-outlined filled-icon">upload_file</span></div><h3 className="font-headline-md text-headline-md text-primary mb-2">Check something now</h3><p className="font-body-md text-body-md text-on-surface-variant">Review a link, image, or message before it leaves your hands.</p></div><div className="mt-8 flex items-center text-secondary font-label-md text-label-md"><span>Start review</span><span className="material-symbols-outlined text-sm ml-1">arrow_forward</span></div></Link>
      </div>

      <section className="mt-8"><div className="flex items-center justify-between mb-6"><h3 className="font-headline-md text-headline-md text-primary">Recent Checks</h3>{user && <Link className="font-label-md text-label-md text-secondary" to="/profile">View all</Link>}</div>{checkHistory.length === 0 ? <div className="bg-surface-container-low rounded-xl p-8 text-center"><span className="material-symbols-outlined text-4xl text-primary-container">inbox</span><p className="font-body-md text-body-md text-on-surface-variant mt-3">Your completed checks will appear here.</p></div> : <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{checkHistory.slice(0, 3).map(check => <Link to={user ? '/profile/detail' : '/check'} key={check.id} className="bg-surface-container-lowest rounded-xl p-4 shadow-level-1 flex items-center gap-4 hover:bg-surface-container-low transition-colors"><div className="w-16 h-16 rounded-lg bg-surface-container-highest shrink-0 flex items-center justify-center"><span className="material-symbols-outlined text-on-surface-variant text-[28px]">description</span></div><div className="flex-grow min-w-0"><span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{destinationLabels[check.destination] || 'Content check'}</span><p className="font-label-md text-label-md text-on-surface truncate">{check.title}</p><p className="text-xs text-on-surface-variant">{check.flags.length ? `${check.flags.length} signal${check.flags.length === 1 ? '' : 's'} found` : 'No signals found'}</p></div></Link>)}</div>}</section>

      <div className="bg-surface-container-low rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-surface-variant mt-4"><div className="flex items-center gap-6"><div className="w-14 h-14 rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center text-primary-container shrink-0"><span className="material-symbols-outlined filled-icon">view_cozy</span></div><div><h3 className="font-headline-md text-headline-md text-primary mb-1">Insights: practice in the feed</h3><p className="font-body-md text-body-md text-on-surface-variant">{practiceStats.completed ? `${practiceStats.completed} decisions made, ${accuracy}% accurate.` : 'Build your instincts in a safe, simulated feed.'}</p></div></div><Link to="/practice" className="shrink-0 w-full md:w-auto text-center bg-transparent border-2 border-primary-container text-primary-container font-label-md px-6 py-3 rounded-xl hover:bg-primary hover:text-on-primary transition-all">{practiceStats.completed ? 'Keep practicing' : 'Start session'}</Link></div>
    </div>
  )
}
