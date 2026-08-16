import { Link } from 'react-router-dom'

export default function SignUpPage() {
  return (
    <div className="bg-surface-container-low min-h-screen flex items-center justify-center p-container-padding-mobile md:p-container-padding-desktop antialiased text-on-surface">
      <main className="w-full max-w-[420px] bg-surface-container-lowest rounded-[16px] shadow-level-1 px-6 py-10 md:px-10 md:py-12 flex flex-col gap-8 transition-all duration-300 ease-in-out hover:shadow-level-2">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary filled-icon">trip_origin</span>
            <span className="font-display-lg text-body-md tracking-tight text-primary font-bold uppercase">Prism</span>
          </div>
          <h1 className="font-headline-md text-headline-md text-primary-container">Let's set you up</h1>
        </header>
        <form className="flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1" htmlFor="email">Email or Phone</label>
              <input className="w-full bg-transparent border border-outline-variant text-on-surface font-body-md text-body-md rounded-xl px-4 py-3 placeholder-outline transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none" id="email" placeholder="you@example.com" type="text" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant ml-1" htmlFor="password">Password</label>
              <input className="w-full bg-transparent border border-outline-variant text-on-surface font-body-md text-body-md rounded-xl px-4 py-3 placeholder-outline transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none" id="password" placeholder="Create a strong password" type="password" />
            </div>
          </div>
          <div className="bg-surface-container rounded-xl p-5 flex items-start gap-4 transition-colors hover:bg-surface-variant/50">
            <div className="flex items-center h-6 mt-0.5">
              <input className="h-5 w-5 rounded-[4px] border-outline-variant text-primary focus:ring-primary/20 focus:ring-offset-0 bg-transparent transition-all cursor-pointer" id="consent" name="consent" type="checkbox" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-body-md text-[14px] leading-[22px] text-on-surface-variant cursor-pointer select-none" htmlFor="consent">
                PRISM does not store your original screenshots. We only keep anonymous metadata to help improve your experience.
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-2">
            <Link to="/home" className="w-full bg-secondary text-on-secondary font-label-md text-[16px] leading-[24px] font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 hover:bg-on-secondary-fixed-variant active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 group">
              Create Account
              <span className="material-symbols-outlined text-[20px] transition-transform duration-200 group-hover:translate-x-1">arrow_forward</span>
            </Link>
            <p className="text-center font-body-md text-label-md text-on-surface-variant">
              Already have an account?{' '}
              <Link className="text-primary font-medium hover:text-primary-container transition-colors underline-offset-4 hover:underline" to="/dashboard">Log in</Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  )
}
