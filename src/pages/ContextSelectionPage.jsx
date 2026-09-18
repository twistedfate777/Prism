import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useScan } from '../context/useScan'

export default function ContextSelectionPage() {
  const { destination, setDestination, ownership: savedOwnership, setOwnership, uploadedFile, uploadedText } = useScan()
  const [destinations, setDestinations] = useState([])
  const [ownershipOptions, setOwnershipOptions] = useState([])
  const [configError, setConfigError] = useState(null)
  const [selectedDest, setSelectedDest] = useState(destination)
  const [selectedOwner, setSelectedOwner] = useState(savedOwnership)
  const navigate = useNavigate()
  const canSubmit = selectedDest !== null && selectedOwner !== null && destinations.length > 0 && ownershipOptions.length > 0

  // Redirect if no content was uploaded
  useEffect(() => {
    if (!uploadedFile && !uploadedText) {
      navigate('/check', { replace: true })
    }
  }, [uploadedFile, uploadedText, navigate])

  useEffect(() => {
    async function loadConfig() {
      try {
        const response = await fetch('/api/config')
        if (!response.ok) throw new Error('Configuration unavailable')
        const config = await response.json()
        setDestinations(config.destinations || [])
        setOwnershipOptions(config.ownership || [])
      } catch (error) {
        setConfigError(error.message)
      }
    }

    loadConfig()
  }, [])

  function handleSubmit() {
    if (!canSubmit) return
    setDestination(selectedDest)
    setOwnership(selectedOwner)
    navigate('/check/confirm')
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md antialiased">
      <header className="w-full px-container-padding-mobile md:px-container-padding-desktop py-6">
        <div className="max-w-[560px] mx-auto">
          <Link to="/check" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group">
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="font-label-md text-label-md">Back</span>
          </Link>
        </div>
      </header>

      <main className="w-full px-container-padding-mobile md:px-container-padding-desktop pb-section-gap">
        <div className="max-w-[560px] mx-auto">
          {/* Destination */}
          <section className="mb-12">
            <div className="mb-6">
              <p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-3">Step 2 of 3</p>
              <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary-container mb-2">Where are you sending this?</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">This helps us check what actually matters for this destination.</p>
            </div>
            {configError && <p className="mb-4 rounded-lg bg-error-container px-4 py-3 text-sm text-on-error-container">We could not load the available destinations. Please refresh and try again.</p>}
            {destinations.length === 0 && !configError && <p className="mb-4 text-sm text-on-surface-variant">Loading available destinations...</p>}
            <div className="grid grid-cols-2 gap-4">
              {destinations.map(dest => (
                <div
                  key={dest.value}
                  className={`selection-card bg-surface-container-lowest rounded-[16px] p-5 relative shadow-level-1 cursor-pointer ${dest.value === 'public' ? 'col-span-2 md:col-span-1' : ''} ${selectedDest === dest.value ? 'card-selected' : ''}`}
                  onClick={() => setSelectedDest(dest.value)}
                >
                  <div className={`check-badge absolute top-4 right-4 w-5 h-5 bg-secondary rounded-full flex items-center justify-center ${selectedDest === dest.value ? 'opacity-100 scale-100' : ''}`}>
                    <span className="material-symbols-outlined text-[14px] text-white">check</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center mb-4 text-primary">
                    <span className="material-symbols-outlined">{dest.icon}</span>
                  </div>
                  <h3 className="font-label-md text-label-md text-on-surface">{dest.label}</h3>
                </div>
              ))}
            </div>
          </section>

          <div className="h-px w-full bg-surface-variant my-10"></div>

          {/* Ownership */}
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="font-headline-md text-headline-md text-primary-container mb-2">Is this your own content, or someone else's?</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">So we know what to check for.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {ownershipOptions.map(own => (
                <div
                  key={own.value}
                  className={`selection-card bg-surface-container-lowest rounded-[16px] p-6 relative shadow-level-1 flex flex-col items-center text-center cursor-pointer ${selectedOwner === own.value ? 'card-selected' : ''}`}
                  onClick={() => setSelectedOwner(own.value)}
                >
                  <div className={`check-badge absolute top-4 right-4 w-5 h-5 bg-secondary rounded-full flex items-center justify-center ${selectedOwner === own.value ? 'opacity-100 scale-100' : ''}`}>
                    <span className="material-symbols-outlined text-[14px] text-white">check</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center mb-4 text-primary">
                    <span className="material-symbols-outlined text-[24px]">{own.icon}</span>
                  </div>
                  <h3 className="font-label-md text-label-md text-on-surface">{own.label}</h3>
                </div>
              ))}
            </div>
          </section>

          {/* Submit */}
          <div className="mt-12 flex justify-end">
            <button
              className={`bg-secondary text-on-secondary font-label-md text-label-md px-8 py-4 rounded-xl transition-all duration-300 shadow-sm flex items-center gap-2 ${
                canSubmit ? 'hover:bg-on-secondary-fixed-variant shadow-[0_4px_12px_rgba(0,107,88,0.3)] active:scale-95' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!canSubmit}
              onClick={handleSubmit}
            >
              Check This
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
