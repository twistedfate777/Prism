import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useScan } from '../context/useScan'

export default function BeforeYouSharePage() {
  const navigate = useNavigate()
  const { actionResult, scanResult } = useScan()

  // Redirect if no action result or scan result
  useEffect(() => {
    if (!actionResult && !scanResult) {
      navigate('/check', { replace: true })
    }
  }, [actionResult, scanResult, navigate])

  if (!actionResult && !scanResult) return null

  // We primarily want to show the action report. 
  // If not available, we fall back to a generic completion.
  const report = actionResult?.report || {
    summary: "Review complete.",
    flags_addressed: [],
    action_taken: "continue"
  }

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-container-padding-mobile md:p-container-padding-desktop antialiased">
      <main className="w-full max-w-[600px] bg-surface-container-lowest rounded-[16px] shadow-level-1 p-6 md:p-12 flex flex-col gap-8 relative overflow-hidden">
        {/* Header */}
        <header className="flex flex-col gap-4 text-center items-center">
          <div className="flex items-center gap-2 text-on-surface-variant">
             {report.action_taken === 'protect' ? (
                <span className="material-symbols-outlined text-[16px] filled-icon text-secondary">verified_user</span>
             ) : (
                <span className="material-symbols-outlined text-[16px] filled-icon">task_alt</span>
             )}
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Action Summary</span>
          </div>
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface">You're All Set.</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
            {report.summary}
          </p>
        </header>

        <div className="flex flex-col gap-6 w-full mt-4">
           {actionResult?.image && (
              <section className="flex flex-col gap-3 items-center">
                 <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wide flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] filled-icon">image</span> Protected Image
                 </h2>
                 <div className="w-full max-w-[300px] border border-surface-variant rounded-xl overflow-hidden bg-surface-container">
                    <img src={actionResult.image} alt="Protected version" className="w-full h-auto object-contain" />
                 </div>
              </section>
           )}

           {report.flags_addressed && report.flags_addressed.length > 0 && (
             <section className="flex flex-col gap-3">
               <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wide flex items-center gap-2">
                 <span className="material-symbols-outlined text-[18px] filled-icon">list</span> Addressed Items
               </h2>
               <div className="flex flex-col gap-2">
                 {report.flags_addressed.map((item, idx) => (
                    <div key={idx} className="bg-surface-container rounded-xl p-4 flex items-center gap-4 border border-surface-variant">
                      <div className="w-2 h-2 rounded-full bg-secondary shrink-0"></div>
                      <span className="font-body-md text-body-md text-on-surface">{item}</span>
                    </div>
                 ))}
               </div>
             </section>
           )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 pt-6 border-t border-surface-variant justify-center">
          <Link to="/dashboard" className="w-full sm:w-auto flex-1 bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary font-label-md text-label-md py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
             Return to Dashboard
          </Link>
          {actionResult?.image && (
             <a href={actionResult.image} download="prism-protected.png" className="w-full sm:w-auto flex-1 border-2 border-outline-variant hover:border-outline hover:bg-surface-container-low text-on-surface-variant font-label-md text-label-md py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined filled-icon">download</span> Download Image
             </a>
          )}
        </div>
      </main>
    </div>
  )
}
