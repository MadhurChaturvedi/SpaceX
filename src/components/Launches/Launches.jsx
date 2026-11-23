import { useState } from 'react'
import CountdownTimer from './CountdownTimer'
import LaunchCard from './LaunchCard'
import { NEXT_LAUNCH, LAUNCH_DATA } from './launchesData'
import './Launches.css'

export default function Launches() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedBrief, setSelectedBrief] = useState(null)

  const filteredLaunches = LAUNCH_DATA.filter(item => {
    if (activeFilter === 'all') return true
    return item.category === activeFilter
  })

  return (
    <section id="launches" className="launches-section" aria-label="SpaceX Launches">
      <div className="launches-container">
        {/* Section Header */}
        <div className="launches-header">
          <p className="launches-eyebrow">MISSION MANIFEST & TELEMETRY</p>
          <h2 className="launches-title">LAUNCH SCHEDULE</h2>
          <p className="launches-subtitle">
            Track real-time commercial, scientific, and crewed orbital missions powered by
            reusable orbital rocketry.
          </p>
        </div>

        {/* Featured Next Launch Spotlight with Countdown */}
        <div className="next-launch-spotlight">
          <div className="spotlight-details">
            <span className="spotlight-tag">UPCOMING PRIORITY FLIGHT</span>
            <h3 className="spotlight-title">{NEXT_LAUNCH.missionName}</h3>
            <p className="spotlight-vehicle">{NEXT_LAUNCH.vehicle}</p>

            <div className="spotlight-specs">
              <div className="spot-item">
                <span className="spot-label">PRIMARY PAYLOAD</span>
                <span className="spot-val">{NEXT_LAUNCH.payload}</span>
              </div>
              <div className="spot-item">
                <span className="spot-label">TARGET ORBIT</span>
                <span className="spot-val">{NEXT_LAUNCH.orbit}</span>
              </div>
              <div className="spot-item">
                <span className="spot-label">LAUNCHPAD</span>
                <span className="spot-val">{NEXT_LAUNCH.launchSite}</span>
              </div>
              <div className="spot-item">
                <span className="spot-label">BOOSTER RECOVERY</span>
                <span className="spot-val">{NEXT_LAUNCH.recoveryTarget}</span>
              </div>
            </div>

            <p className="spotlight-desc">{NEXT_LAUNCH.description}</p>
          </div>

          <div className="spotlight-timer-wrapper">
            <CountdownTimer targetHours={NEXT_LAUNCH.targetHoursFromNow} />
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="manifest-filter-row">
          <div className="filter-button-group" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'all'}
              className={`filter-btn ${activeFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              ALL MISSIONS ({LAUNCH_DATA.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'upcoming'}
              className={`filter-btn ${activeFilter === 'upcoming' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('upcoming')}
            >
              UPCOMING FLIGHTS
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'milestone'}
              className={`filter-btn ${activeFilter === 'milestone' ? 'is-active' : ''}`}
              onClick={() => setActiveFilter('milestone')}
            >
              HISTORIC MILESTONES
            </button>
          </div>
          <span className="manifest-count-indicator">
            SHOWING {filteredLaunches.length} OF {LAUNCH_DATA.length} MISSIONS
          </span>
        </div>

        {/* Launch Cards Grid */}
        <div className="launch-cards-grid">
          {filteredLaunches.map(launch => (
            <LaunchCard
              key={launch.id}
              launch={launch}
              onSelectBrief={(item) => setSelectedBrief(item)}
            />
          ))}
        </div>
      </div>

      {/* Mission Brief Modal */}
      {selectedBrief && (
        <div
          className="brief-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="brief-modal-title"
          onClick={() => setSelectedBrief(null)}
        >
          <div className="brief-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-category">{selectedBrief.category.toUpperCase()} MISSION</span>
                <h3 id="brief-modal-title" className="modal-title">{selectedBrief.missionName}</h3>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                aria-label="Close mission brief"
                onClick={() => setSelectedBrief(null)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-meta-grid">
                <div className="modal-meta-box">
                  <span className="meta-caption">VEHICLE</span>
                  <span className="meta-text">{selectedBrief.vehicle}</span>
                </div>
                <div className="modal-meta-box">
                  <span className="meta-caption">LAUNCH DATE</span>
                  <span className="meta-text">{selectedBrief.date}</span>
                </div>
                <div className="modal-meta-box">
                  <span className="meta-caption">BOOSTER SERIAL</span>
                  <span className="meta-text">{selectedBrief.booster}</span>
                </div>
                <div className="modal-meta-box">
                  <span className="meta-caption">ORBITAL DESTINATION</span>
                  <span className="meta-text">{selectedBrief.orbit}</span>
                </div>
                <div className="modal-meta-box">
                  <span className="meta-caption">PAYLOAD MASS</span>
                  <span className="meta-text">{selectedBrief.payloadMass}</span>
                </div>
                <div className="modal-meta-box">
                  <span className="meta-caption">RECOVERY LOCATION</span>
                  <span className="meta-text">{selectedBrief.recovery}</span>
                </div>
              </div>

              <div className="modal-full-desc">
                <h4>MISSION OBJECTIVE & TELEMETRY</h4>
                <p>{selectedBrief.summary}</p>
                <p>
                  Launch operations are coordinated through the SpaceX Falcon Command Center
                  in Hawthorne, California, and Cape Canaveral Space Force Station.
                  Live telemetry streams provide engine chamber pressures, staging timelines,
                  and booster atmospheric entry burn confirmation.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="modal-dismiss-btn"
                onClick={() => setSelectedBrief(null)}
              >
                CLOSE BRIEF
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
