import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useScan } from '../context/useScan'

export default function PreCheckConfirmPage() {
  const cardRef = useRef(null)
  const navigate = useNavigate()
  const { destination, ownership, performScan, isScanning, scanError } = useScan()
  const [config, setConfig] = useState({ destinations: [], ownership: [] })

  // Redirect back if no state (direct URL access)
  useEffect(() => {
    if (!destination || !ownership) {
      navigate('/check/context', { replace: true })
    }
  }, [destination, ownership, navigate])

  useEffect(() => {
    fetch('/api/config')
      .then(response => response.ok ? response.json() : Promise.reject(new Error('Configuration unavailable')))
      .then(setConfig)
      .catch(() => {})
  }, [])

  useEffect(() => {
    const card = cardRef.current
    if (card) {
      card.style.opacity = '0'
      card.style.transform = 'translateY(16px)'
      requestAnimationFrame(() => {
        setTimeout(() => {
          card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          card.style.opacity = '1'
          card.style.transform = 'translateY(0)'
        }, 100)
      })
    }
  }, [])

  async function handleStartCheck() {
    try {
      const result = await performScan()
      // Navigate to results page using the normalized destination from the result
      navigate(`/check/results/${result.destination}`)
    } catch (err) {
      console.error('Scan failed:', err)
      // Error is stored in context and handled/displayed in UI below
    }
  }

  if (!destination || !ownership) return null

  const dest = config.destinations.find(item => item.value === destination) || { label: destination, icon: 'arrow_forward' }
  const selectedOwnership = config.ownership.find(item => item.value === ownership)
  const own = selectedOwnership ? { label: `From: ${selectedOwnership.label.replace("It's ", '')}`, icon: selectedOwnership.icon } : { label: 'Selected content', icon: 'person' }

  return (
    <div className="min-h-screen flex items-center justify-center p-container-padding-mobile md:p-container-padding-desktop bg-background antialiased">
      <main className="w-full max-w-[480px]">
        <div className="flex justify-center mb-8">
          <Link to="/" className="text-xl font-headline-md font-extrabold tracking-tight text-primary">PRISM</Link>
        </div>
        <div
          ref={cardRef}
          className="bg-surface-container-lowest rounded-2xl shadow-level-2 border border-surface-container-highest p-6 md:p-8 flex flex-col items-center text-center gap-8"
        >
          {/* Thumbnail */}
          <div className="w-28 h-28 rounded-xl overflow-hidden shadow-inner ring-1 ring-outline-variant flex-shrink-0 relative group bg-surface-container">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
            <div className="w-full h-full flex items-center justify-center">
              {isScanning ? (
                 <span className="material-symbols-outlined text-[48px] text-primary animate-spin">refresh</span>
              ) : (
                 <span className="material-symbols-outlined text-[48px] text-on-surface-variant">description</span>
              )}
            </div>
          </div>

          {/* Context Badges — dynamic */}
          <div className="flex flex-wrap justify-center gap-3 w-full">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-primary-fixed bg-primary-fixed/50 text-primary text-sm font-medium gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">{dest.icon}</span>
              {dest.label}
            </span>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-outline-variant bg-surface-container text-on-surface-variant text-sm font-medium gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">{own.icon}</span>
              {own.label}
            </span>
          </div>

          {/* Personalized Text — dynamic */}
          <p className="text-base font-body-md text-on-surface-variant leading-relaxed max-w-sm mx-auto">
             {scanError ? (
                <span className="text-error">{scanError}</span>
             ) : isScanning ? (
                <span>Analyzing your content mindfully...</span>
             ) : (
                `We'll check this for ${dest.label.toLowerCase()} before you decide what to do next.`
             )}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-2 pt-6 border-t border-surface-variant gap-3">
            <Link to="/check/context" className={`text-on-surface-variant font-medium hover:text-on-surface transition-colors flex items-center px-2 py-2 rounded-lg hover:bg-surface-container ${isScanning ? 'pointer-events-none opacity-50' : ''}`}>
              Edit
            </Link>
            <button
              onClick={handleStartCheck}
              disabled={isScanning}
              className={`px-6 py-2.5 bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary font-medium rounded-full shadow-[0_4px_14px_0_rgba(0,107,88,0.39)] hover:shadow-[0_6px_20px_rgba(0,107,88,0.23)] transition-all active:scale-95 flex items-center gap-2 ${isScanning ? 'opacity-70 cursor-wait' : ''}`}
            >
              {isScanning ? 'Scanning...' : 'Start Check'}
              {!isScanning && <span className="material-symbols-outlined text-[18px] filled-icon">check_circle</span>}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
