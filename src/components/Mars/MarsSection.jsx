import { useState } from 'react'
import MarsGlobe3D from './MarsGlobe3D'
import { MARS_TIMELINE, PLANETARY_COMPARISON } from './marsTimelineData'
import './Mars.css'

export default function MarsSection() {
  const [selectedMilestone, setSelectedMilestone] = useState(0)

  const activeMilestone = MARS_TIMELINE[selectedMilestone]

  return (
    <section id="mars" className="mars-section" aria-label="Road to Mars">
      <div className="mars-container">
        {/* Section Header */}
        <div className="mars-header">
          <p className="mars-eyebrow">DESTINATION MULTIPLANETARY</p>
          <h2 className="mars-title">ROAD TO MARS</h2>
          <p className="mars-lead">
            Establishing a self-sustaining civilization on Mars requires reusable orbital
            refueling, in-situ propellant synthesis, and long-term surface infrastructure.
          </p>
        </div>

        {/* Mars 3D Globe + Primary Planetary Overview */}
        <div className="mars-globe-stage">
          <div className="mars-globe-card">
            <MarsGlobe3D />
          </div>

          <div className="mars-overview-card">
            <span className="colony-target-badge">HUMAN COLONY ARCHITECTURE</span>
            <h3 className="colony-headline">WHY MARS?</h3>
            <p className="colony-summary">
              At an average distance of 225 million kilometers, Mars is one of Earth&apos;s closest
              habitable neighbors. Mars has decent sunlight, thin atmosphere, water ice deposits,
              and a 24.5-hour day length, making human settlement viable.
            </p>

            <div className="planetary-spec-list">
              {PLANETARY_COMPARISON.map((row, idx) => (
                <div key={idx} className="planetary-spec-row">
                  <div className="spec-name-col">
                    <span className="planet-param">{row.metric}</span>
                    <span className="planet-note">{row.note}</span>
                  </div>
                  <div className="spec-val-col">
                    <span className="mars-val">{row.mars}</span>
                    <span className="earth-val">Earth: {row.earth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Road to Mars Timeline Navigation */}
        <div className="timeline-section-header">
          <span className="phase-pill">SELECTED: {activeMilestone.phase} ({activeMilestone.year})</span>
          <h3 className="timeline-title">EXPLORATION & SETTLEMENT TIMELINE</h3>
          <p className="timeline-sub">
            Chronological stages from low Earth orbit propellant transfer to full in-situ resource utilization.
          </p>
        </div>

        {/* Interactive Milestone Cards */}
        <div className="timeline-cards-grid">
          {MARS_TIMELINE.map((item, index) => {
            const isSelected = selectedMilestone === index
            return (
              <div
                key={item.phase}
                className={`timeline-card ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setSelectedMilestone(index)}
              >
                <div className="card-phase-header">
                  <span className="phase-pill">{item.phase}</span>
                  <span className="phase-year">{item.year}</span>
                </div>
                <h4 className="card-phase-title">{item.title}</h4>
                <p className="card-phase-sub">{item.subtitle}</p>
                <p className="card-phase-desc">{item.description}</p>

                <div className="phase-stats-list">
                  {item.keyStats.map((stat, sIdx) => (
                    <div key={sIdx} className="stat-pill">
                      <span className="stat-name">{stat.label}:</span>
                      <span className="stat-num">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
