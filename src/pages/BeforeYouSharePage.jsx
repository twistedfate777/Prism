import { Link } from 'react-router-dom'

export default function BeforeYouSharePage() {
  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-container-padding-mobile md:p-container-padding-desktop antialiased">
      <main className="w-full max-w-[600px] bg-surface-container-lowest rounded-[16px] shadow-level-1 p-6 md:p-12 flex flex-col gap-8 relative overflow-hidden">
        {/* Header */}
        <header className="flex flex-col gap-4 text-center items-center">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] filled-icon">pause_circle</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Before You Share</span>
          </div>
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface">Take a Moment.</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
            We've analyzed the content you're about to forward. Here are a few things worth checking first.
          </p>
        </header>

        <div className="flex flex-col gap-6 w-full mt-4">
          {/* Things to Fix */}
          <section className="flex flex-col gap-3">
            <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] filled-icon">gpp_maybe</span> Things to Fix
            </h2>
            <div className="flex flex-col gap-2">
              <div className="bg-error-container/40 rounded-xl p-4 flex items-center gap-4 border border-error-container/50">
                <div className="w-2 h-2 rounded-full bg-error shrink-0"></div>
                <span className="font-body-md text-body-md text-on-surface">Phone number detected in message body</span>
              </div>
              <div className="bg-error-container/40 rounded-xl p-4 flex items-center gap-4 border border-error-container/50">
                <div className="w-2 h-2 rounded-full bg-error shrink-0"></div>
                <span className="font-body-md text-body-md text-on-surface">Location metadata found in attached image</span>
              </div>
            </div>
          </section>

          {/* Worth a Pause */}
          <section className="flex flex-col gap-3">
            <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] filled-icon">psychology</span> Worth a Pause
            </h2>
            <div className="bg-tertiary-fixed/30 border border-tertiary-fixed-dim rounded-2xl rounded-bl-sm p-5 relative">
              <p className="font-body-md text-body-md text-on-tertiary-fixed-variant">
                This message uses strong urgency language. What evidence would you want to check first before reacting?
              </p>
            </div>
          </section>

          {/* Good to Know */}
          <section className="flex flex-col gap-3">
            <h2 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wide flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] filled-icon">info</span> Good to Know
            </h2>
            <div className="bg-primary-fixed/50 rounded-xl p-5 border border-primary-fixed-dim/50">
              <p className="font-body-md text-body-md text-on-primary-fixed">
                This information may have been updated since it was originally shared.{' '}
                <a className="font-label-md text-label-md text-primary underline underline-offset-2 hover:text-primary-container transition-colors" href="#">See latest context</a>
              </p>
            </div>
          </section>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 pt-6 border-t border-surface-variant">
          <button className="w-full sm:w-auto flex-1 bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary font-label-md text-label-md py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
            <span className="material-symbols-outlined filled-icon">shield_lock</span>
            Protect &amp; Fix
          </button>
          <Link to="/dashboard" className="w-full sm:w-auto flex-1 border-2 border-outline-variant hover:border-outline hover:bg-surface-container-low text-on-surface-variant font-label-md text-label-md py-4 px-6 rounded-xl transition-all flex items-center justify-center">
            Continue Anyway
          </Link>
        </div>
      </main>
    </div>
  )
}
