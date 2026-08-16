import { useParams, Link, useNavigate } from 'react-router-dom'

const contextData = {
  school: {
    label: 'School',
    fix: { title: 'THINGS TO FIX', text: 'Classmate email address detected in document body.' },
    pause: { title: 'WORTH A PAUSE', text: 'This looks like it may need a citation before you submit it.', sub: 'Have you cited where this information or content came from?' },
    know: { title: 'GOOD TO KNOW', text: 'Consider checking this against a primary source before including it in your work.' },
  },
  public: {
    label: 'Public',
    fix: { title: 'THINGS TO FIX', text: 'Home address visible in photo metadata.' },
    pause: { title: 'WORTH A PAUSE', text: 'This post could be searchable indefinitely. Are you comfortable with that?', sub: 'Consider the long-term visibility of this content.' },
    know: { title: 'GOOD TO KNOW', text: 'Public posts are indexed by search engines and may appear in results.' },
  },
  'social-media': {
    label: 'Social Media',
    fix: { title: 'THINGS TO FIX', text: 'Image contains identifiable location data from EXIF metadata.' },
    pause: { title: 'WORTH A PAUSE', text: 'This image includes someone who may not have given consent to be shared.', sub: 'Consider whether all people in this content are aware of it being posted.' },
    know: { title: 'GOOD TO KNOW', text: 'This platform\'s terms allow content to be re-shared without notification.' },
  },
  ai: {
    label: 'AI',
    fix: { title: 'THINGS TO FIX', text: 'Document contains proprietary company information.' },
    pause: { title: 'WORTH A PAUSE', text: 'Content uploaded to AI platforms may be used for model training.', sub: 'Review the platform\'s data retention policy before proceeding.' },
    know: { title: 'GOOD TO KNOW', text: 'Some AI platforms retain uploaded data for up to 30 days.' },
  },
  'private-chat': {
    label: 'Private Chat',
    fix: { title: 'THINGS TO FIX', text: 'Phone number detected in message body.' },
    pause: { title: 'WORTH A PAUSE', text: 'This message uses strong urgency language.', sub: 'What evidence would you want to check first before reacting?' },
    know: { title: 'GOOD TO KNOW', text: 'This information may have been updated since it was originally shared.' },
  },
}

export default function ResultsPage() {
  const { context } = useParams()
  const navigate = useNavigate()
  const data = contextData[context] || contextData.school

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-background text-on-surface">
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-level-2 overflow-hidden border border-surface-container-highest/50">
        {/* Header */}
        <div className="p-6 md:p-8 pb-6 border-b border-surface-variant/50">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold uppercase tracking-wider">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
              {data.label}
            </span>
            <button onClick={() => navigate('/dashboard')} className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <h1 className="text-2xl md:text-3xl font-headline-lg font-bold text-on-surface mb-2">Take a Moment.</h1>
          <p className="text-on-surface-variant text-base leading-relaxed">We noticed a few details worth considering before you proceed.</p>
        </div>

        {/* Content Sections */}
        <div className="p-6 md:p-8 space-y-6 bg-surface">
          {/* Fix (Red/Coral) */}
          <div className="flex gap-4 p-4 md:p-5 rounded-lg bg-error-container border border-error/10 transition-transform hover:-translate-y-0.5 duration-200">
            <div className="flex-shrink-0 mt-1">
              <span className="material-symbols-outlined text-on-error-container filled-icon">shield_lock</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-error-container uppercase tracking-wider mb-1">{data.fix.title}</h3>
              <p className="text-on-error-container/90 text-sm font-medium">{data.fix.text}</p>
              <button className="mt-3 text-xs font-semibold text-on-error-container hover:underline flex items-center gap-1">
                Review Details
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span>
              </button>
            </div>
          </div>

          {/* Pause (Amber) */}
          <div className="flex gap-4 p-4 md:p-5 rounded-lg bg-warning-container border border-warning/10 transition-transform hover:-translate-y-0.5 duration-200">
            <div className="flex-shrink-0 mt-1">
              <span className="material-symbols-outlined text-on-warning-container filled-icon">lightbulb</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-warning-container uppercase tracking-wider mb-1">{data.pause.title}</h3>
              <p className="text-on-warning-container/90 text-sm font-medium mb-1">{data.pause.text}</p>
              {data.pause.sub && <p className="text-on-warning-container/70 text-xs">{data.pause.sub}</p>}
            </div>
          </div>

          {/* Know (Blue) */}
          <div className="flex gap-4 p-4 md:p-5 rounded-lg bg-info-container border border-info/10 transition-transform hover:-translate-y-0.5 duration-200">
            <div className="flex-shrink-0 mt-1">
              <span className="material-symbols-outlined text-on-info-container filled-icon">fact_check</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-on-info-container uppercase tracking-wider mb-1">{data.know.title}</h3>
              <p className="text-on-info-container/90 text-sm font-medium">{data.know.text}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 bg-surface-container-lowest border-t border-surface-variant/50 flex flex-col-reverse sm:flex-row justify-end gap-3">
          <Link to="/check/results/before-share" className="px-6 py-2.5 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors border border-surface-container-highest text-center">
            Continue Anyway
          </Link>
          <button className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-secondary text-on-secondary hover:bg-secondary/90 transition-colors shadow-sm flex items-center justify-center gap-2">
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>security</span>
            Protect &amp; Fix
          </button>
        </div>
      </div>
    </div>
  )
}
