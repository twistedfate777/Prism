import { useContext } from 'react'
import { ScanContext } from './scanContextValue'

export function useScan() {
  const context = useContext(ScanContext)
  if (!context) {
    throw new Error('useScan must be used within a ScanProvider')
  }
  return context
}
