import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useScan } from '../context/useScan'

const starterItems = [
  { id: 1, type: 'social', icon: 'forum', author: '@healthynews_daily', text: 'BREAKING: New study finds that drinking lemon water cures 99% of diseases! Share before they delete this!', risk: 'high', hint: 'Urgency and an extraordinary health claim appear without a source.' },
  { id: 2, type: 'message', icon: 'chat_bubble', author: 'Unknown Contact', text: "I found your wallet. Send me your home address and I'll drop it off today.", risk: 'high', hint: 'An unknown contact is asking for sensitive personal information.' },
  { id: 3, type: 'news', icon: 'article', author: 'Local Community Board', text: 'The city council approved the new park renovation project. Construction begins next spring with community input sessions in January.', risk: 'low', hint: 'This is a specific community update without obvious pressure or extraordinary claims.' },
]

function classifyPost(text) {
  const lower = text.toLowerCase()
  const high = /send|address|password|urgent|cure|guarantee|before they delete/.test(lower)
  const medium = /share|viral|secret|shocking|they don't want/.test(lower)
  return high ? 'high' : medium ? 'medium' : 'low'
}

export default function FeedSimulatorPage() {
  const { practiceStats, recordPracticeDecision } = useScan()
  const [items, setItems] = useState(starterItems)
  const [revealedHints, setRevealedHints] = useState({})
  const [decisions, setDecisions] = useState({})
  const [draft, setDraft] = useState('')

  function addPost(e) {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    const risk = classifyPost(text)
    setItems(prev => [{ id: Date.now(), type: 'custom', icon: 'edit_note', author: 'Your practice post', text, risk, hint: risk === 'high' ? 'This includes a request or claim that deserves verification before sharing.' : risk === 'medium' ? 'This wording may create pressure or reduce the space to verify.' : 'There are no obvious pressure signals in this post. Context still matters.' }, ...prev])
    setDraft('')
  }

  function makeDecision(item, decision) {
    setDecisions(prev => ({ ...prev, [item.id]: decision }))
    const correct = decision === 'skip' ? item.risk !== 'low' : item.risk === 'low'
    recordPracticeDecision(correct)
  }

  const riskColors = { high: 'bg-error/10 border-error/20 text-on-error-container', medium: 'bg-tertiary-fixed/30 border-tertiary-fixed-dim/30 text-on-tertiary-fixed-variant', low: 'bg-secondary-container/30 border-secondary/20 text-on-secondary-container' }
  const riskLabels = { high: 'High risk', medium: 'Worth a pause', low: 'Lower risk' }

  return (
    <div className="flex flex-col gap-8"><header><div className="flex items-center gap-3 mb-4"><div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-on-primary-container">view_cozy</span></div><div><h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Insights</h1><p className="font-body-md text-body-md text-on-surface-variant">Feed simulator · {practiceStats.completed} decisions this session</p></div></div><p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Practice noticing pressure, privacy requests, and unsupported claims before you share.</p></header>
      <form onSubmit={addPost} className="bg-surface-container-low rounded-xl p-4 md:p-5 flex flex-col md:flex-row gap-3"><input value={draft} onChange={e => setDraft(e.target.value)} className="flex-1 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-on-surface" placeholder="Add a post to analyze..." aria-label="Add a practice post" /><button className="bg-primary text-on-primary px-5 py-3 rounded-lg font-label-md" type="submit">Add post</button></form>
      <div className="flex flex-col gap-6">{items.map(item => <article key={item.id} className="bg-surface-container-lowest rounded-[16px] shadow-level-1 overflow-hidden"><div className="p-4 md:p-6 flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0"><span className="material-symbols-outlined">{item.icon}</span></div><div className="flex-1 min-w-0"><span className="font-label-md text-label-md text-on-surface block truncate">{item.author}</span><span className="font-label-sm text-label-sm text-on-surface-variant">Practice post</span></div></div><div className="px-4 md:px-6 pb-4"><p className="font-body-md text-body-md text-on-surface leading-relaxed">{item.text}</p></div>{revealedHints[item.id] && <div className={`mx-4 md:mx-6 mb-4 p-4 rounded-xl border ${riskColors[item.risk]}`}><div className="flex items-center gap-2 mb-2"><span className="material-symbols-outlined text-[18px]">psychology</span><span className="font-label-md text-label-md font-semibold">{riskLabels[item.risk]}</span></div><p className="text-sm leading-relaxed">{item.hint}</p></div>}<div className="px-4 md:px-6 pb-4 md:pb-6 flex flex-wrap gap-3">{!decisions[item.id] ? <><button onClick={() => setRevealedHints(prev => ({ ...prev, [item.id]: !prev[item.id] }))} className="px-4 py-2 rounded-lg border border-primary text-primary font-label-md flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">search</span>{revealedHints[item.id] ? 'Hide analysis' : 'Analyze'}</button><button onClick={() => makeDecision(item, 'share')} className="px-4 py-2 rounded-lg bg-secondary/10 text-secondary font-label-md flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">share</span>Would share</button><button onClick={() => makeDecision(item, 'skip')} className="px-4 py-2 rounded-lg bg-surface-container text-on-surface-variant font-label-md flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px]">block</span>Would skip</button></> : <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container"><span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span><span className="font-label-md text-label-md text-on-surface-variant">You chose to <strong>{decisions[item.id]}</strong> this.</span></div>}</div></article>)}</div>
  <div className="flex justify-center mt-4"><Link to="/dashboard" className="bg-primary text-on-primary font-label-md px-8 py-3 rounded-xl">Finish practice</Link></div>
  </div>
  )
}
