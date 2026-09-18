import { useState, useCallback } from 'react'
import { ScanContext } from './scanContextValue'

/**
 * ScanProvider — holds all state for the Golden Path flow.
 * No data is persisted to localStorage/sessionStorage (privacy constraint).
 * State is held in memory only and lost on page refresh.
 */
export function ScanProvider({ children }) {
  const [user, setUser] = useState(null)
  const [checkHistory, setCheckHistory] = useState([])
  const [practiceStats, setPracticeStats] = useState({ completed: 0, correct: 0 })

  // Content intake
  const [uploadedFile, setUploadedFile] = useState(null)
  const [uploadedText, setUploadedText] = useState('')

  // Context selection
  const [destination, setDestination] = useState(null)
  const [ownership, setOwnership] = useState(null)

  // Scan results
  const [scanResult, setScanResult] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanError, setScanError] = useState(null)

  // Action results
  const [actionResult, setActionResult] = useState(null)
  const [isActing, setIsActing] = useState(false)

  /**
   * Call POST /api/scan with the uploaded file/text + destination.
   */
  const performScan = useCallback(async () => {
    setIsScanning(true)
    setScanError(null)
    setScanResult(null)

    try {
      const formData = new FormData()

      if (uploadedFile) {
        formData.append('image', uploadedFile)
      }
      if (uploadedText) {
        formData.append('text', uploadedText)
      }
      formData.append('destination', destination || 'social_media')

      const response = await fetch('/api/scan', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || `Scan failed (${response.status})`)
      }

      const result = await response.json()
      setScanResult(result)
      setCheckHistory(prev => [
        {
          id: result.scan_id || `${Date.now()}`,
          title: uploadedText?.trim().slice(0, 48) || uploadedFile?.name || 'Content review',
          destination: destination || 'social_media',
          createdAt: new Date().toISOString(),
          flags: result.flags || [],
          result,
        },
        ...prev,
      ])
      return result
    } catch (err) {
      setScanError(err.message)
      throw err
    } finally {
      setIsScanning(false)
    }
  }, [uploadedFile, uploadedText, destination])

  const recordPracticeDecision = useCallback((isCorrect) => {
    setPracticeStats(prev => ({
      completed: prev.completed + 1,
      correct: prev.correct + (isCorrect ? 1 : 0),
    }))
  }, [])

  const signIn = useCallback((profile) => {
    setUser(profile)
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
  }, [])

  /**
   * Call POST /api/action with the scan_id and chosen action.
   */
  const performAction = useCallback(async (action) => {
    if (!scanResult?.scan_id) {
      throw new Error('No scan result available')
    }

    setIsActing(true)

    try {
      const response = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scan_id: scanResult.scan_id,
          action,
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || `Action failed (${response.status})`)
      }

      const result = await response.json()
      setActionResult(result)
      return result
    } finally {
      setIsActing(false)
    }
  }, [scanResult])

  /**
   * Reset all state — used when starting a new check.
   */
  const resetScan = useCallback(() => {
    setUploadedFile(null)
    setUploadedText('')
    setDestination(null)
    setOwnership(null)
    setScanResult(null)
    setScanError(null)
    setActionResult(null)
  }, [])

  const value = {
    // Content state
    uploadedFile, setUploadedFile,
    uploadedText, setUploadedText,
    // Context state
    destination, setDestination,
    ownership, setOwnership,
    // Scan state
    scanResult, setScanResult,
    isScanning, scanError,
    checkHistory,
    practiceStats,
    user,
    // Action state
    actionResult, isActing,
    // Methods
    performScan,
    performAction,
    recordPracticeDecision,
    signIn,
    signOut,
    resetScan,
  }

  return (
    <ScanContext.Provider value={value}>
      {children}
    </ScanContext.Provider>
  )
}

