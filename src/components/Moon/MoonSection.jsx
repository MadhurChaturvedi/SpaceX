import { useState } from 'react'
import MoonSimulation3D from './MoonSimulation3D'
import { LUNAR_PHASES, LUNAR_LANDMARKS, LUNAR_TELEMETRY } from './moonData'
import './Moon.css'

export default function MoonSection() {
  const [phaseAngle, setPhaseAngle] = useState(180) // Default: Full Moon
  const [viewMode, setViewMode] = useState('earth') // 'earth' | 'telescope' | 'orbit' | 'system'
  const [selectedLandmarkId, setSelectedLandmarkId] = useState(null)

  // Find nearest lunar phase description
  const currentPhase = LUNAR_PHASES.reduce((prev, curr) => {
    return Math.abs(curr.angle - phaseAngle) < Math.abs(prev.angle - phaseAngle) ? curr : prev
  }, LUNAR_PHASES[0])

  const selectedLandmark = LUNAR_LANDMARKS.find(lm => lm.id === selectedLandmarkId)

  return (
    <section id="moon" className="moon-simulation-section" aria-label="Moon Simulation from Earth">
      <div className="moon-container">
        {/* Section Header */}
        <div className="moon-header">
          <p className="moon-eyebrow">ASTRONOMICAL OBSERVATION & LUNAR EXPLORATION</p>
          <h2 className="moon-title">THE MOON FROM EARTH</h2>
          <p className="moon-lead">
            Interactive 3D simulation of Earth&apos;s natural satellite. Observe authentic
            lunar phase transitions, terminator crater shadows, and human landing sites
            as viewed from our home planet.
          </p>
        </div>

        {/* Enterprise Telemetry Status Bar */}
        <div className="lunar-telemetry-strip">
          <div className="telemetry-node">
            <span className="telemetry-node-label">DISTANCE FROM EARTH</span>
            <span className="telemetry-node-val">{LUNAR_TELEMETRY.meanDistanceKm}</span>
          </div>
          <div className="telemetry-node">
            <span className="telemetry-node-label">ORBITAL VELOCITY</span>
            <span className="telemetry-node-val">{LUNAR_TELEMETRY.orbitalSpeed}</span>
          </div>
          <div className="telemetry-node">
            <span className="telemetry-node-label">SYNODIC PHASE CYCLE</span>
            <span className="telemetry-node-val">{LUNAR_TELEMETRY.synodicCycleDays}</span>
          </div>
          <div className="telemetry-node">
            <span className="telemetry-node-label">SURFACE GRAVITY</span>
            <span className="telemetry-node-val">{LUNAR_TELEMETRY.surfaceGravity}</span>
          </div>
          <div className="telemetry-node">
            <span className="telemetry-node-label">STARSHIP TRANSIT TIME</span>
            <span className="telemetry-node-val highlight-cyan">{LUNAR_TELEMETRY.starshipTransitTime}</span>
          </div>
        </div>

        {/* Main 3D Simulation Stage */}
        <div className="moon-simulation-stage">
          {/* 3D WebGL Canvas Viewport */}
          <div className="moon-viewport-card">
            <MoonSimulation3D
              phaseAngle={phaseAngle}
              viewMode={viewMode}
              selectedLandmarkId={selectedLandmarkId}
              onSelectLandmark={(id) => setSelectedLandmarkId(id)}
            />

            {/* In-Canvas Telemetry Overlay */}
            <div className="canvas-hud-top">
              <span className="hud-phase-name">{currentPhase.name}</span>
              <span className="hud-phase-meta">
                {currentPhase.day} &bull; {currentPhase.illumination}% ILLUMINATED
              </span>
            </div>

            <div className="canvas-hud-bottom">
              <span className="hud-viewmode-indicator">
                VIEW: {viewMode.toUpperCase()} &bull; DRAG TO ROTATE
              </span>
              {selectedLandmarkId && (
                <button
                  type="button"
                  className="hud-clear-landmark-btn"
                  onClick={() => setSelectedLandmarkId(null)}
                >
                  RESET LANDMARK FOCUS &times;
                </button>
              )}
            </div>
          </div>

          {/* Interactive Observatory Controls Panel */}
          <div className="moon-control-deck">
            {/* Viewpoint Selector */}
            <div className="deck-group">
              <span className="deck-label">OBSERVATION VANTAGE POINT</span>
              <div className="vantage-button-group">
                <button
                  type="button"
                  className={`vantage-btn ${viewMode === 'earth' ? 'is-active' : ''}`}
                  onClick={() => setViewMode('earth')}
                >
                  EARTH NIGHT SKY
                </button>
                <button
                  type="button"
                  className={`vantage-btn ${viewMode === 'telescope' ? 'is-active' : ''}`}
                  onClick={() => setViewMode('telescope')}
                >
                  TELESCOPIC ZOOM
                </button>
                <button
                  type="button"
                  className={`vantage-btn ${viewMode === 'orbit' ? 'is-active' : ''}`}
                  onClick={() => setViewMode('orbit')}
                >
                  3D ORBITAL INSPECT
                </button>
                <button
                  type="button"
                  className={`vantage-btn ${viewMode === 'system' ? 'is-active' : ''}`}
                  onClick={() => setViewMode('system')}
                >
                  EARTH-MOON SYSTEM
                </button>
              </div>
            </div>

            {/* Solar Phase Angle Slider */}
            <div className="deck-group">
              <div className="slider-header-row">
                <span className="deck-label">SOLAR ILLUMINATION & LUNAR PHASE</span>
                <span className="slider-degree-readout">{phaseAngle}&deg; PHASE ANGLE</span>
              </div>

              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={phaseAngle}
                onChange={(e) => setPhaseAngle(Number(e.target.value))}
                className="phase-slider"
                aria-label="Solar phase angle scrubber"
              />

              <div className="phase-presets-row">
                {LUNAR_PHASES.map((p) => (
                  <button
                    key={p.angle}
                    type="button"
                    className={`preset-btn ${Math.abs(p.angle - phaseAngle) < 15 ? 'is-active' : ''}`}
                    onClick={() => setPhaseAngle(p.angle)}
                  >
                    {p.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              <p className="phase-synopsis-text">{currentPhase.desc}</p>
            </div>

            {/* Lunar Landmarks Quick-Focus */}
            <div className="deck-group">
              <span className="deck-label">SURFACE LANDMARKS & MISSIONS</span>
              <div className="landmarks-nav-list">
                {LUNAR_LANDMARKS.map((lm) => (
                  <button
                    key={lm.id}
                    type="button"
                    className={`landmark-tab-btn ${selectedLandmarkId === lm.id ? 'is-active' : ''}`}
                    onClick={() => setSelectedLandmarkId(lm.id)}
                  >
                    <span className="lm-btn-name">{lm.name}</span>
                    <span className="lm-btn-feature">{lm.feature}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Landmark Details Card */}
            {selectedLandmark ? (
              <div className="landmark-detail-card">
                <div className="lm-card-top">
                  <div>
                    <span className="lm-date-tag">{selectedLandmark.historicDate}</span>
                    <h4 className="lm-card-title">{selectedLandmark.name}</h4>
                  </div>
                  <button
                    type="button"
                    className="lm-close-btn"
                    onClick={() => setSelectedLandmarkId(null)}
                    aria-label="Dismiss landmark details"
                  >
                    &times;
                  </button>
                </div>
                <p className="lm-desc">{selectedLandmark.details}</p>
                <div className="lm-spacex-box">
                  <span className="lm-spacex-tag">SPACEX ARTEMIS HLS ARCHITECTURE</span>
                  <p className="lm-spacex-text">{selectedLandmark.spaceXRelevance}</p>
                </div>
              </div>
            ) : (
              <div className="landmark-placeholder">
                <span className="placeholder-icon">&Omicron;</span>
                <p>Select any lunar landmark or click the green beacons on the 3D surface to inspect telemetry.</p>
              </div>
            )}

            {/* CTA action */}
            <div className="moon-action-row">
              <a href="#starship" className="moon-cta-btn">
                EXPLORE STARSHIP LUNAR HLS &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
