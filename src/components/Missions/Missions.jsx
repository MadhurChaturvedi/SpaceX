import { useState } from 'react'
import { MISSIONS_LIST } from './missionsData'
import './Missions.css'

export default function Missions() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredMissions = MISSIONS_LIST.filter(item => {
    if (activeCategory === 'all') return true
    return item.category === activeCategory
  })

  return (
    <section id="missions" className="missions-section" aria-label="SpaceX Missions">
      <div className="missions-container">
        {/* Section Header */}
        <div className="missions-header">
          <p className="missions-eyebrow">GLOBAL IMPACT & EXPLORATION</p>
          <h2 className="missions-title">SPACE MISSIONS</h2>
          <p className="missions-lead">
            From commercial crew rotations and global broadband internet to NASA lunar lander
            contracts and deep-space scientific probes.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="missions-filter-strip" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            className={`mission-tab-btn ${activeCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            ALL MISSIONS ({MISSIONS_LIST.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'human'}
            className={`mission-tab-btn ${activeCategory === 'human' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('human')}
          >
            HUMAN SPACEFLIGHT
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'constellation'}
            className={`mission-tab-btn ${activeCategory === 'constellation' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('constellation')}
          >
            STARLINK
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'deep-space'}
            className={`mission-tab-btn ${activeCategory === 'deep-space' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('deep-space')}
          >
            DEEP SPACE & MOON
          </button>
        </div>

        {/* Cards Grid */}
        <div className="missions-grid">
          {filteredMissions.map(m => (
            <article key={m.id} className="mission-program-card">
              <div className="mission-card-header">
                <span className="mission-category-tag">{m.category.toUpperCase()}</span>
                <span className="mission-active-dot" />
              </div>

              <h3 className="mission-program-title">{m.title}</h3>
              <p className="mission-program-tagline">{m.tagline}</p>
              <p className="mission-program-specs">{m.specs}</p>
              <p className="mission-program-desc">{m.description}</p>

              <div className="mission-stats-matrix">
                {m.stats.map((s, idx) => (
                  <div key={idx} className="mission-stat-item">
                    <span className="mission-stat-label">{s.label}</span>
                    <span className="mission-stat-val">{s.value}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
