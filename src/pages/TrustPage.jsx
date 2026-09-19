import { Link } from 'react-router-dom'

export default function TrustPage() {
  return (
    <div className="max-w-[900px] mx-auto px-container-padding-mobile md:px-container-padding-desktop py-section-gap">
      <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">Trust</span>
      <h1 className="font-display-lg text-display-lg text-primary mt-4">Useful context without taking ownership of your content.</h1>
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {[
          ['lock', 'Your original content', 'PRISM processes a check to return a result. The app does not need a permanent copy of your original screenshot to help you decide.'],
          ['tune', 'Clear recommendations', 'Every result separates detected details from suggestions, so you can understand why a pause may help.'],
          ['account_circle', 'Optional account', 'You can check content and practice as a guest. Create an account only when you want a personal history and profile.'],
          ['delete_sweep', 'You stay in control', 'Use the app for a single decision or sign out and leave your profile behind.'],
        ].map(([icon, title, body]) => (
          <article key={title} className="bg-surface-container-lowest rounded-xl p-6 shadow-level-1">
            <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
            <h2 className="font-headline-md text-headline-md text-primary mt-4">{title}</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3">{body}</p>
          </article>
        ))}
      </div>
      <Link to="/check" className="inline-flex items-center gap-2 mt-10 bg-secondary text-on-secondary px-6 py-3 rounded-xl font-label-md">Check something privately <span className="material-symbols-outlined">arrow_forward</span></Link>
    </div>
  )
}
