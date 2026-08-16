import { useState } from 'react'
import { Link } from 'react-router-dom'

const feedItems = [
  {
    id: 1,
    type: 'social',
    icon: 'forum',
    author: '@healthynews_daily',
    time: '2h ago',
    text: 'BREAKING: New study finds that drinking lemon water cures 99% of diseases! Share before they delete this! 🍋💪',
    risk: 'high',
    hint: 'This post uses urgency language and makes extraordinary health claims without citing a source.',
  },
  {
    id: 2,
    type: 'message',
    icon: 'chat_bubble',
    author: 'Unknown Contact',
    time: '45m ago',
    text: "Hey! I found your wallet. Send me your home address and I'll drop it off today.",
    risk: 'high',
    hint: 'Be cautious about sharing personal information like your address with unknown contacts.',
  },
  {
    id: 3,
    type: 'news',
    icon: 'article',
    author: 'Local Community Board',
    time: '1d ago',
    text: 'The city council has approved the new park renovation project. Construction begins next spring with community input sessions in January.',
    risk: 'low',
    hint: 'This appears to be a factual community update from a legitimate local source.',
  },
  {
    id: 4,
    type: 'social',
    icon: 'image',
    author: '@viral_content_hub',
    time: '5h ago',
    text: 'This photo of a celebrity at a secret meeting is going viral! They don\'t want you to see this! RT before it gets taken down!',
    risk: 'medium',
    hint: 'This uses classic manipulation tactics: artificial scarcity and conspiracy framing. Verify the source before sharing.',
  },
]

export default function FeedSimulatorPage() {
  const [revealedHints, setRevealedHints] = useState({})
  const [decisions, setDecisions] = useState({})

  function toggleHint(id) {
    setRevealedHints(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function makeDecision(id, decision) {
    setDecisions(prev => ({ ...prev, [id]: decision }))
  }

  const riskColors = {
    high: 'bg-error/10 border-error/20 text-on-error-container',
    medium: 'bg-tertiary-fixed/30 border-tertiary-fixed-dim/30 text-on-tertiary-fixed-variant',
    low: 'bg-secondary-container/30 border-secondary/20 text-on-secondary-container',
  }

  const riskLabels = {
    high: '🔴 High Risk',
    medium: '🟡 Medium Risk',
    low: '🟢 Low Risk',
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary-container">view_cozy</span>
          </div>
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Feed Simulator</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Practice Mode</p>
          </div>
        </div>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Scroll through these simulated posts and practice your critical thinking skills. Tap "Analyze" to reveal what PRISM would flag.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {feedItems.map(item => (
          <div key={item.id} className="bg-surface-container-lowest rounded-[16px] shadow-level-1 overflow-hidden">
            {/* Post Header */}
            <div className="p-4 md:p-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-label-md text-label-md text-on-surface block truncate">{item.author}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">{item.time}</span>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 md:px-6 pb-4">
              <p className="font-body-md text-body-md text-on-surface leading-relaxed">{item.text}</p>
            </div>

            {/* Hint Reveal */}
            {revealedHints[item.id] && (
              <div className={`mx-4 md:mx-6 mb-4 p-4 rounded-xl border ${riskColors[item.risk]}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[18px] filled-icon">psychology</span>
                  <span className="font-label-md text-label-md font-semibold">{riskLabels[item.risk]}</span>
                </div>
                <p className="text-sm leading-relaxed">{item.hint}</p>
              </div>
            )}

            {/* Actions */}
            <div className="px-4 md:px-6 pb-4 md:pb-6 flex flex-wrap gap-3">
              {!decisions[item.id] ? (
                <>
                  <button
                    onClick={() => toggleHint(item.id)}
                    className="px-4 py-2 rounded-lg border border-primary text-primary font-label-md text-label-md hover:bg-primary/5 transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">search</span>
                    {revealedHints[item.id] ? 'Hide Analysis' : 'Analyze'}
                  </button>
                  <button
                    onClick={() => makeDecision(item.id, 'share')}
                    className="px-4 py-2 rounded-lg bg-secondary/10 text-secondary font-label-md text-label-md hover:bg-secondary/20 transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                    Would Share
                  </button>
                  <button
                    onClick={() => makeDecision(item.id, 'skip')}
                    className="px-4 py-2 rounded-lg bg-surface-container text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[18px]">block</span>
                    Would Skip
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container">
                  <span className="material-symbols-outlined text-[18px] text-secondary filled-icon">check_circle</span>
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    You chose to <strong>{decisions[item.id]}</strong> this.
                    {decisions[item.id] === 'skip' && item.risk !== 'low' && ' Good instinct!'}
                    {decisions[item.id] === 'share' && item.risk === 'high' && ' Consider being more cautious next time.'}
                    {decisions[item.id] === 'share' && item.risk === 'low' && ' Looks safe to share!'}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <Link to="/dashboard" className="bg-primary text-on-primary font-label-md text-label-md px-8 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-sm">
          Finish Practice
        </Link>
      </div>
    </div>
  )
}
