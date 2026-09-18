import { Link } from 'react-router-dom'

export default function PlatformPage() {
  return (
    <div className="max-w-[1000px] mx-auto px-container-padding-mobile md:px-container-padding-desktop py-section-gap">
      <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">Platform</span>
      <h1 className="font-display-lg text-display-lg text-primary mt-4 max-w-3xl">A calmer way to decide what to share.</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mt-6 max-w-2xl">PRISM brings content checks, context, and reflection into one short workflow. Start with a screenshot, image, or message and leave with a clearer next step.</p>
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        {[
          ['visibility', 'Check content', 'Spot private details, sensitive signals, and things worth pausing over.'],
          ['psychology', 'Build instincts', 'Practice reading urgency, pressure, and source quality in a safe feed.'],
          ['shield', 'Choose an action', 'Protect, continue, or step away with the reasoning visible.'],
        ].map(([icon, title, body]) => (
          <article key={title} className="bg-surface-container-lowest rounded-xl p-6 shadow-level-1">
            <span className="material-symbols-outlined text-secondary text-3xl">{icon}</span>
            <h2 className="font-headline-md text-headline-md text-primary mt-5">{title}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3">{body}</p>
          </article>
        ))}
      </div>
      <Link to="/check" className="inline-flex items-center gap-2 mt-12 bg-primary text-on-primary px-6 py-3 rounded-xl font-label-md">Start a check <span className="material-symbols-outlined">arrow_forward</span></Link>
    </div>
  )
}
