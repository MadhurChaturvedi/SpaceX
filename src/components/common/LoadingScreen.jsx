import { useState, useEffect } from 'react'
import './common.css'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('CALIBRATING ORBITAL TELEMETRY...')
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    const textStages = [
      { at: 20, text: 'INITIALIZING 3D THREE.JS ENGINES...' },
      { at: 50, text: 'GENERATING MULTI-LAYER STARFIELDS...' },
      { at: 75, text: 'SYNCING LAUNCH COUNTDOWN WITH STARBASE...' },
      { at: 95, text: 'SYSTEM STATUS: 100% READY' },
    ]

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsFinished(true), 400)
          return 100
        }
        const next = prev + Math.floor(Math.random() * 15 + 8)
        const cap = Math.min(100, next)

        const match = textStages.find(s => cap >= s.at && prev < s.at)
        if (match) {
          setLoadingText(match.text)
        }
        return cap
      })
    }, 90)

    return () => clearInterval(interval)
  }, [])

  if (isFinished) return null

  return (
    <div
      className={`global-loading-screen ${progress === 100 ? 'is-fading' : ''}`}
      aria-label="Loading SpaceX System"
      role="status"
    >
      <div className="loader-box">
        <span className="loader-logo">SPACEX</span>
        <div className="loader-radar">
          <div className="radar-sweep" />
        </div>
        <div className="loader-bar-wrap">
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader-status-row">
          <span className="loader-status-text">{loadingText}</span>
          <span className="loader-percent">{progress}%</span>
        </div>
      </div>
    </div>
  )
}
