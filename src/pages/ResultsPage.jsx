import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useScan } from '../context/useScan'

const destinationLabels = {
  school: 'School',
  public: 'Public',
  'social_media': 'Social Media',
  'social-media': 'Social Media',
  ai: 'AI',
  'private_chat': 'Private Chat',
  'private-chat': 'Private Chat',
}

export default function ResultsPage() {
  const { context } = useParams()
  const navigate = useNavigate()
  const { scanResult, performAction, isActing } = useScan()

  // Redirect if no scan result
  useEffect(() => {
    if (!scanResult) {
      navigate('/check')
    }
  }, [scanResult, navigate])

  if (!scanResult) return null

  const label = destinationLabels[context] || context

  // Categorize flags
  const redFlags = scanResult.flags.filter(f => f.severity === 'red')
  const yellowFlags = scanResult.flags.filter(f => f.severity === 'yellow')
  const hasFlags = redFlags.length > 0 || yellowFlags.length > 0
  
  // P1 Think/Verify
  const hasThink = !!scanResult.think
  const hasVerify = scanResult.verify && scanResult.verify.findings.length > 0

  async function handleProtect() {
    try {
      await performAction('protect')
      navigate('/check/results/before-share')
    } catch (err) {
      console.error(err)
      alert("Failed to protect image. See console.")
    }
  }

  // Generate generic messages if no flags
  const allClear = !hasFlags && !hasThink && !hasVerify
  const formatFlag = flag => flag.label || (flag.type === 'phone_number' ? `Phone number detected: ${flag.value}` : flag.type === 'email' ? `Email address detected: ${flag.value}` : flag.type === 'id_number' ? 'ID number detected' : flag.type === 'face' ? 'A face was detected. Consider privacy implications.' : `${flag.type} detected`)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-background text-on-surface">
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl shadow-level-2 overflow-hidden border border-surface-container-highest/50">
        {/* Header */}
        <div className="p-6 md:p-8 pb-6 border-b border-surface-variant/50">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold uppercase tracking-wider">
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>arrow_forward</span>
              {label}
            </span>
            <button onClick={() => navigate('/dashboard')} className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <h1 className="text-2xl md:text-3xl font-headline-lg font-bold text-on-surface mb-2">Take a Moment.</h1>
          <p className="text-on-surface-variant text-base leading-relaxed">
             {allClear ? "We didn't find any major concerns, but always stay mindful." : "We noticed a few details worth considering before you proceed."}
          </p>
        </div>

        {/* Content Sections */}
        <div className="p-6 md:p-8 space-y-6 bg-surface">
          
          {/* Fix (Red/Coral) */}
          {redFlags.length > 0 && (
            <div className="flex gap-4 p-4 md:p-5 rounded-lg bg-error-container border border-error/10 transition-transform hover:-translate-y-0.5 duration-200">
              <div className="flex-shrink-0 mt-1">
                <span className="material-symbols-outlined text-on-error-container filled-icon">shield_lock</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-error-container uppercase tracking-wider mb-1">Things to Fix</h3>
                <ul className="list-disc pl-4 text-on-error-container/90 text-sm font-medium">
                  {redFlags.map((flag, idx) => (
                    <li key={idx}>
                      {formatFlag(flag)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Pause (Amber) */}
          {yellowFlags.length > 0 && (
            <div className="flex gap-4 p-4 md:p-5 rounded-lg bg-warning-container border border-warning/10 transition-transform hover:-translate-y-0.5 duration-200">
              <div className="flex-shrink-0 mt-1">
                <span className="material-symbols-outlined text-on-warning-container filled-icon">lightbulb</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-warning-container uppercase tracking-wider mb-1">Worth a Pause</h3>
                 <ul className="list-disc pl-4 text-on-warning-container/90 text-sm font-medium mb-1">
                  {yellowFlags.map((flag, idx) => (
                    <li key={idx}>
                      {formatFlag(flag)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {hasThink && (
            <div className="flex gap-4 p-4 md:p-5 rounded-lg bg-warning-container border border-warning/10 transition-transform hover:-translate-y-0.5 duration-200">
              <div className="flex-shrink-0 mt-1">
                <span className="material-symbols-outlined text-on-warning-container filled-icon">psychology</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-warning-container uppercase tracking-wider mb-1">Worth a Pause</h3>
                <p className="text-on-warning-container/90 text-sm font-medium mb-1">{scanResult.think.question}</p>
                {scanResult.think.signals && scanResult.think.signals.length > 0 && (
                   <p className="text-on-warning-container/70 text-xs mt-2">Detected signals: {scanResult.think.signals.join(', ')}</p>
                )}
              </div>
            </div>
          )}

          {/* Know (Blue) */}
          {hasVerify && (
            <div className="flex gap-4 p-4 md:p-5 rounded-lg bg-info-container border border-info/10 transition-transform hover:-translate-y-0.5 duration-200">
              <div className="flex-shrink-0 mt-1">
                <span className="material-symbols-outlined text-on-info-container filled-icon">fact_check</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-info-container uppercase tracking-wider mb-1">Good to Know</h3>
                <ul className="list-disc pl-4 text-on-info-container/90 text-sm font-medium">
                  {scanResult.verify.findings.map((finding, idx) => (
                    <li key={idx}>
                       {finding.entity} — {finding.note} (Source: {finding.matchedEntry.source})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 md:p-6 bg-surface-container-lowest border-t border-surface-variant/50 flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button 
             onClick={async () => {
                try {
                  await performAction('continue')
                  navigate('/check/results/before-share')
                } catch(e){
                   console.error(e)
                }
             }}
             disabled={isActing}
             className="px-6 py-2.5 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-colors border border-surface-container-highest text-center"
          >
            {isActing ? 'Processing...' : 'Continue Anyway'}
          </button>
          
          {hasFlags && scanResult.recommended_action === 'protect' && (
             <button 
                onClick={handleProtect}
                disabled={isActing}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-secondary text-on-secondary hover:bg-secondary/90 transition-colors shadow-sm flex items-center justify-center gap-2"
             >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>security</span>
                {isActing ? 'Applying...' : 'Protect & Fix'}
             </button>
          )}
        </div>
      </div>
    </div>
  )
}
