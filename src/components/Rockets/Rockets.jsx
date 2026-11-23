import { useState } from 'react'
import RocketViewer3D from './RocketViewer3D'
import { ROCKETS_DATA } from './rocketsData'
import './Rockets.css'

export default function Rockets() {
  const [selectedRocket, setSelectedRocket] = useState('falcon9')
  const [useMetric, setUseMetric] = useState(true)

  const rocket = ROCKETS_DATA[selectedRocket]

  return (
    <section id="rockets" className="rockets-section" aria-label="SpaceX Rockets">
      <div className="rockets-container">
        {/* Section Header */}
        <div className="rockets-header">
          <p className="rockets-eyebrow">REUSABLE LAUNCH SYSTEMS</p>
          <h2 className="rockets-title">LAUNCH VEHICLES</h2>
          <p className="rockets-subtitle">
            Engineered for unprecedented reliability, rapid reusability, and multiplanetary
            payload capability.
          </p>
        </div>

        {/* Vehicle Selection Tabs */}
        <div className="rocket-tab-nav" role="tablist">
          {Object.keys(ROCKETS_DATA).map(key => {
            const item = ROCKETS_DATA[key]
            const isSelected = selectedRocket === key
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`rocket-tab-btn ${isSelected ? 'is-active' : ''}`}
                onClick={() => setSelectedRocket(key)}
              >
                <span className="tab-vehicle-name">{item.name}</span>
                {isSelected && <span className="tab-active-indicator" />}
              </button>
            )
          })}
        </div>

        {/* Interactive 3D Model & Technical Specs Layout */}
        <div className="rocket-interactive-stage">
          {/* 3D WebGL Rocket Model Viewer */}
          <div className="rocket-model-viewport">
            <RocketViewer3D rocketType={selectedRocket} />
          </div>

          {/* Technical Specifications Panel */}
          <div className="rocket-specs-panel">
            <div className="specs-top-bar">
              <div>
                <span className="vehicle-badge">{rocket.name} SPECIFICATIONS</span>
                <h3 className="specs-vehicle-title">{rocket.name}</h3>
                <p className="specs-tagline">{rocket.tagline}</p>
              </div>

              {/* Units Switcher */}
              <div className="units-toggle-group">
                <button
                  type="button"
                  className={`unit-toggle-btn ${useMetric ? 'is-active' : ''}`}
                  onClick={() => setUseMetric(true)}
                >
                  METRIC
                </button>
                <button
                  type="button"
                  className={`unit-toggle-btn ${!useMetric ? 'is-active' : ''}`}
                  onClick={() => setUseMetric(false)}
                >
                  IMPERIAL
                </button>
              </div>
            </div>

            <p className="specs-overview">{rocket.description}</p>

            {/* Spec Matrix Table */}
            <div className="specs-matrix">
              <div className="spec-row">
                <span className="matrix-label">HEIGHT</span>
                <span className="matrix-val">
                  {useMetric ? `${rocket.heightM} m` : `${rocket.heightFt} ft`}
                </span>
              </div>
              <div className="spec-row">
                <span className="matrix-label">DIAMETER</span>
                <span className="matrix-val">
                  {useMetric ? `${rocket.diameterM} m` : `${rocket.diameterFt} ft`}
                </span>
              </div>
              <div className="spec-row">
                <span className="matrix-label">MASS</span>
                <span className="matrix-val">
                  {useMetric ? `${rocket.massKg.toLocaleString()} kg` : `${rocket.massLb.toLocaleString()} lb`}
                </span>
              </div>
              <div className="spec-row">
                <span className="matrix-label">PAYLOAD TO LEO</span>
                <span className="matrix-val">
                  {useMetric ? `${rocket.payloadLEOKg.toLocaleString()} kg` : `${rocket.payloadLEOLb.toLocaleString()} lb`}
                </span>
              </div>
              <div className="spec-row">
                <span className="matrix-label">PAYLOAD TO GTO</span>
                <span className="matrix-val">
                  {useMetric ? `${rocket.payloadGTOKg.toLocaleString()} kg` : `${rocket.payloadGTOLb.toLocaleString()} lb`}
                </span>
              </div>
              <div className="spec-row">
                <span className="matrix-label">LIFTOFF THRUST</span>
                <span className="matrix-val">
                  {useMetric ? `${rocket.thrustSeaKN.toLocaleString()} kN` : `${rocket.thrustSeaLbf.toLocaleString()} lbf`}
                </span>
              </div>
              <div className="spec-row">
                <span className="matrix-label">FIRST STAGE ENGINES</span>
                <span className="matrix-val">{rocket.enginesFirstStage}</span>
              </div>
              <div className="spec-row">
                <span className="matrix-label">SECOND STAGE</span>
                <span className="matrix-val">{rocket.engineSecondStage}</span>
              </div>
              <div className="spec-row">
                <span className="matrix-label">REUSABILITY TRACK</span>
                <span className="matrix-val highlight-green">{rocket.reusabilityRecord}</span>
              </div>
            </div>

            {/* Subsystem Hotspots */}
            <div className="hotspots-section">
              <h4 className="hotspots-heading">SUBSYSTEM ARCHITECTURE</h4>
              <div className="hotspots-grid">
                {rocket.hotspots.map((item, idx) => (
                  <div key={idx} className="hotspot-card">
                    <span className="hotspot-name">{item.name}</span>
                    <span className="hotspot-desc">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
