import { Link } from 'react-router-dom'

export default function CheckDetailPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Back Button */}
      <Link to="/profile" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group w-fit">
        <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
        <span className="font-label-md text-label-md">Back to Profile</span>
      </Link>

      {/* Detail Card */}
      <div className="bg-surface-container-lowest rounded-[16px] shadow-level-2 p-6 md:p-8 relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 pb-6 border-b border-surface-variant">
          <div className="w-20 h-20 rounded-xl bg-surface-container-highest overflow-hidden shrink-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-[40px] text-on-surface-variant">description</span>
          </div>
          <div className="flex-1">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-1">Article: Climate Policy Update</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Checked on Oct 24, 2023 at 10:30 AM</p>
          </div>
        </div>

        {/* Context Info */}
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed text-sm font-medium">
            <span className="material-symbols-outlined text-[16px]">public</span>
            Public
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant text-sm font-medium">
            <span className="material-symbols-outlined text-[16px]">person_play</span>
            Someone Else's Content
          </span>
        </div>

        {/* Findings */}
        <div className="flex flex-col gap-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">Findings</h2>

          {/* Fix */}
          <div className="flex gap-4 p-4 md:p-5 rounded-xl bg-error-container/40 border border-error-container/50">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-error/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-error-container text-[18px] filled-icon">shield_lock</span>
              </div>
            </div>
            <div>
              <h3 className="font-label-md text-label-md text-on-error-container uppercase tracking-wider mb-1">Things to Fix</h3>
              <p className="font-body-md text-body-md text-on-surface">Author's personal email found embedded in article source code.</p>
              <p className="font-body-md text-sm text-on-surface-variant mt-1">Status: <span className="text-secondary font-medium">Resolved</span></p>
            </div>
          </div>

          {/* Pause */}
          <div className="flex gap-4 p-4 md:p-5 rounded-xl bg-tertiary-fixed/20 border border-tertiary-fixed-dim/30">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-tertiary-fixed-dim/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-tertiary-fixed-variant text-[18px] filled-icon">lightbulb</span>
              </div>
            </div>
            <div>
              <h3 className="font-label-md text-label-md text-on-tertiary-fixed-variant uppercase tracking-wider mb-1">Worth a Pause</h3>
              <p className="font-body-md text-body-md text-on-surface">Article cites data from 2019 without noting the age of the source.</p>
              <p className="font-body-md text-sm text-on-surface-variant mt-1">Status: <span className="text-tertiary-fixed-dim font-medium">Acknowledged</span></p>
            </div>
          </div>

          {/* Know */}
          <div className="flex gap-4 p-4 md:p-5 rounded-xl bg-primary-fixed/30 border border-primary-fixed-dim/30">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-fixed text-[18px] filled-icon">info</span>
              </div>
            </div>
            <div>
              <h3 className="font-label-md text-label-md text-on-primary-fixed uppercase tracking-wider mb-1">Good to Know</h3>
              <p className="font-body-md text-body-md text-on-surface">The policy discussed has since been amended. Updated information is available.</p>
            </div>
          </div>
        </div>

        {/* Action Summary */}
        <div className="mt-8 pt-6 border-t border-surface-variant flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-secondary"></div>
            <span className="font-label-md text-label-md text-on-surface-variant">You chose to <strong className="text-on-surface">fix and share</strong> this content.</span>
          </div>
          <Link to="/check" className="bg-primary text-on-primary font-label-md text-label-md px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-sm">
            Check New Content
          </Link>
        </div>
      </div>
    </div>
  )
}
