import { useState, useEffect } from 'react'
import HeroScene3D from './HeroScene3D'
import './Hero.css'

export default function Hero() {
  const [telemetryTime, setTelemetryTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTelemetryTime(now.toUTCString().replace('GMT', 'UTC'))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="hero-section" aria-label="SpaceX Hero">
      {/* Interactive 3D Three.js Scene */}
      <HeroScene3D />

      {/* Atmospheric dark gradient overlays */}
      <div className="hero-gradient-overlay" />

      {/* Hero Typography & CTA Content */}
      <div className="hero-container">
        <div className="hero-content">
          {/* Aerospace Telemetry Badges */}
          <div className="telemetry-bar">
            <span className="telemetry-pill">
              <span className="live-dot" /> LIVE ORBITAL TELEMETRY
            </span>
            <span className="telemetry-stat">STARBASE LAUNCH COMPLEX 1</span>
            <span className="telemetry-stat hide-mobile">{telemetryTime}</span>
          </div>

          <p className="hero-eyebrow">RECENT LAUNCH & RAPID REUSABILITY</p>
          <h1 className="hero-title">
            MAKING LIFE<br />
            MULTIPLANETARY
          </h1>
          <p className="hero-description">
            SpaceX is designing and operating the world&apos;s most advanced rockets and
            spacecraft to carry humans to Earth orbit, the Moon, Mars, and beyond.
          </p>

          <div className="hero-cta-group">
            <a href="#launches" className="hero-primary-btn">
              EXPLORE MISSION
            </a>
            <a href="#starship" className="hero-secondary-btn">
              STARSHIP FLIGHT 11
            </a>
          </div>

          {/* Quick Mission Telemetry Grid */}
          <div className="hero-metrics">
            <div className="metric-box">
              <span className="metric-value">400+</span>
              <span className="metric-label">TOTAL LAUNCHES</span>
            </div>
            <div className="metric-box">
              <span className="metric-value">360+</span>
              <span className="metric-label">LANDINGS RECORD</span>
            </div>
            <div className="metric-box">
              <span className="metric-value">330+</span>
              <span className="metric-label">REFLOWN BOOSTERS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <a href="#launches" className="scroll-indicator" aria-label="Scroll to Launches">
        <span className="scroll-text">SCROLL</span>
        <span className="scroll-line" />
      </a>
    </section>
  )
}
