import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScan } from '../context/useScan'

export default function ContentIntakePage() {
  const [hasContent, setHasContent] = useState(false)
  const [fileName, setFileName] = useState('')
  const [dragover, setDragover] = useState(false)
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)
  const navigate = useNavigate()
  const { setUploadedFile, setUploadedText, resetScan } = useScan()

  useEffect(() => {
    resetScan()
  }, [resetScan])

  // Reset previous scan state when arriving at this page
  // (user is starting a new check)

  function handleTextChange(e) {
    const value = e.target.value.trim()
    setHasContent(value.length > 0 || !!fileName)
    setUploadedText(e.target.value)
  }

  function handleFileChange(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0]
      setHasContent(true)
      setFileName(file.name)
      setUploadedFile(file)
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragover(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      setHasContent(true)
      setFileName(files[0].name)
      setUploadedFile(files[0])
    }
  }

  function handleContinue() {
    if (!hasContent) return
    // Also capture textarea value in case onChange missed final state
    if (textareaRef.current) {
      setUploadedText(textareaRef.current.value)
    }
    navigate('/check/context')
  }

  return (
    <div className="flex-grow flex items-center justify-center py-section-gap px-container-padding-mobile md:px-container-padding-desktop">
      <div className="w-full max-w-[560px] bg-white rounded-[16px] shadow-level-1 p-gutter md:p-[48px]">
        <div className="text-center mb-gutter"><p className="font-label-sm text-label-sm text-secondary uppercase tracking-wider mb-3">Step 1 of 3</p><h1 className="font-headline-md text-headline-md text-primary-container">Check something before you share</h1><p className="font-body-md text-body-md text-on-surface-variant mt-3">Paste a message or upload an image. We will help you spot what deserves a pause.</p></div>

        {/* Upload Zone */}
        <div
          className={`border-2 border-dashed border-primary-fixed rounded-[16px] p-gutter flex flex-col items-center justify-center mb-gutter transition-colors cursor-pointer group hover:bg-surface-container-low min-h-[200px] md:min-h-[240px] ${dragover ? 'bg-surface-container-low border-primary' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={(e) => { e.preventDefault(); setDragover(true) }}
          onDragOver={(e) => { e.preventDefault(); setDragover(true) }}
          onDragLeave={() => setDragover(false)}
          onDrop={handleDrop}
        >
          <span className="material-symbols-outlined text-4xl text-primary mb-4 group-hover:-translate-y-1 transition-transform">upload_file</span>
          <p className="font-body-md text-body-md text-on-surface mb-6 text-center">
            {fileName || 'Drop a screenshot, image, or paste text'}
          </p>
          <button
            type="button"
            className="border border-primary text-primary font-label-md text-label-md px-6 py-3 rounded-xl hover:bg-primary/5 transition-colors"
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
          >
            Browse files
          </button>
          <input ref={fileInputRef} accept="image/*,text/*" className="hidden" type="file" onChange={handleFileChange} />
        </div>

        {/* Textarea */}
        <div className="mb-gutter relative">
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2" htmlFor="text-input">Or paste text directly</label>
          <textarea
            ref={textareaRef}
            className="w-full rounded-xl border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-body-md text-body-md text-on-surface bg-transparent resize-none p-4"
            id="text-input"
            placeholder="Enter content here..."
            rows="4"
            onChange={handleTextChange}
          />
        </div>

        {/* CTA */}
        <button
          className={`w-full font-label-md text-label-md px-6 py-4 rounded-xl transition-colors flex items-center justify-center gap-2 ${
            hasContent
              ? 'bg-secondary text-on-secondary hover:bg-on-secondary-fixed-variant cursor-pointer'
              : 'bg-surface-container-highest text-outline-variant cursor-not-allowed'
          }`}
          disabled={!hasContent}
          onClick={handleContinue}
        >
          Continue
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>
    </div>
  )
}
