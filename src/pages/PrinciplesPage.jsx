import { Link } from 'react-router-dom'

const principles = [
  ['Pause before pressure', 'Urgency is a signal to slow down, not a reason to act faster.'],
  ['Context changes meaning', 'The right question depends on where you are sharing and who may see it.'],
  ['You stay in control', 'PRISM offers observations and options. The final decision remains yours.'],
]

export default function PrinciplesPage() {
  return (
    <div className="max-w-[900px] mx-auto px-container-padding-mobile md:px-container-padding-desktop py-section-gap">
      <span className="font-label-md text-label-md text-secondary uppercase tracking-wider">Principles</span>
      <h1 className="font-display-lg text-display-lg text-primary mt-4">Small pauses make room for better decisions.</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mt-6 max-w-2xl">PRISM is designed around practical digital responsibility, not fear. These principles guide every check and practice prompt.</p>
      <div className="mt-12 divide-y divide-surface-variant border-y border-surface-variant">
        {principles.map(([title, body], index) => (
          <article key={title} className="grid md:grid-cols-[80px_1fr] gap-5 py-8">
            <span className="font-display-lg text-display-lg text-secondary/60">0{index + 1}</span>
            <div><h2 className="font-headline-md text-headline-md text-primary">{title}</h2><p className="font-body-lg text-body-lg text-on-surface-variant mt-3 max-w-xl">{body}</p></div>
          </article>
        ))}
      </div>
      <Link to="/practice" className="inline-flex items-center gap-2 mt-10 text-primary font-label-md">Try practice mode <span className="material-symbols-outlined">arrow_forward</span></Link>
    </div>
  )
}
