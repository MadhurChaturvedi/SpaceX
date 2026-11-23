import { useState } from 'react'
import StarshipInteractive3D from './StarshipInteractive3D'
import './Starship.css'

const STARSHIP_STAGES = [
  {
    index: 0,
    badge: 'STAGE 01 • LIFTOFF DYNAMICS',
    title: 'RAPTOR 3 ENGINE CLUSTER',
    highlight: '33 ENGINES • 16.7M LBF THRUST',
    description:
      'Powered by 33 sub-cooled liquid methane and liquid oxygen (CH4/LOX) Raptor 3 engines. Raptor 3 eliminates external tubing and bolt-on sensors through precision internal 3D printed fluid channels, increasing specific impulse and reliability.',
    telemetry: [
      { label: 'PROPELLANT MASS', value: '3,400 TONS' },
      { label: 'CHAMBER PRESSURE', value: '350 BAR' },
      { label: 'GIMBAL RANGE', value: '13 CENTER ENGINES' },
    ],
  },
  {
    index: 1,
    badge: 'STAGE 02 • STAGING SEPARATION',
    title: 'RING HOT-STAGING',
    highlight: 'DIRECT ENGINE IGNITION IN FLIGHT',
    description:
      'Starship upper stage ignites its 6 Raptor engines while still mechanically joined to the Super Heavy booster. Hot-staging utilizes a vented stainless steel ring to deflect plume exhaust, avoiding coast phase deceleration and maximizing orbital mass.',
    telemetry: [
      { label: 'STAGING ALTITUDE', value: '65 - 72 KM' },
      { label: 'VELOCITY AT CUTOFF', value: '5,500 KM/H' },
      { label: 'RING CONSTRUCTION', value: 'VENTED 304L STEEL' },
    ],
  },
  {
    index: 2,
    badge: 'STAGE 03 • RECOVERY ARCHITECTURE',
    title: 'MECHAZILLA CATCH SYSTEM',
    highlight: 'TOWER ARMS MID-AIR CATCH',
    description:
      'Eliminating landing legs saves metric tons of dry mass. The 480-foot orbital launch tower ("Mechazilla") utilizes two hydraulic chopstick arms that close around the booster’s forward hardpoints as it hovers in the final seconds before touchdown.',
    telemetry: [
      { label: 'TOWER HEIGHT', value: '146 METERS' },
      { label: 'CATCH HARDPOINTS', value: 'STRUCTURAL LUGS' },
      { label: 'TURNAROUND GOAL', value: '< 1 HOUR REFLIGHT' },
    ],
  },
  {
    index: 3,
    badge: 'STAGE 04 • REENTRY PROTECTION',
    title: 'THERMAL HEX TILES',
    highlight: '18,000 CERAMIC AEROSPACE TILES',
    description:
      'Reentering Earth’s atmosphere at 27,000 km/h generates temperatures exceeding 1,400°C. Hexagonal ceramic tiles without gap lines protect the windward side, mounted with mechanical pins over ceramic fiber blanket insulation.',
    telemetry: [
      { label: 'MAX TEMP TOLERANCE', value: '1,400°C / 2,600°F' },
      { label: 'TILE GEOMETRY', value: 'HEXAGONAL INTERLOCK' },
      { label: 'ENTRY SPEED', value: 'MACH 25' },
    ],
  },
  {
    index: 4,
    badge: 'STAGE 05 • FLIGHT PROFILE',
    title: 'BELLYFLOP & FLIP MANEUVER',
    highlight: 'AERODYNAMIC CONTROL TO VERTICAL',
    description:
      'Starship descends horizontally through the atmosphere like a skydiver, with four independent body flaps dynamically actuating to maintain stability. Seconds before touchdown, the Raptor engines reignite to execute a rapid 90° flip to vertical.',
    telemetry: [
      { label: 'DESCENT ATTITUDE', value: '70° BELLYFLOP' },
      { label: 'ACTUATORS', value: 'ELECTRIC DIRECT DRIVE' },
      { label: 'TOUCHDOWN ENGINE BURN', value: '3 RAPTOR ENGINES' },
    ],
  },
]

export default function StarshipSection() {
  const [activeStage, setActiveStage] = useState(0)

  const stage = STARSHIP_STAGES[activeStage]

  return (
    <section id="starship" className="starship-section" aria-label="Starship Architecture">
      <div className="starship-container">
        {/* Section Header */}
        <div className="starship-header">
          <p className="starship-eyebrow">NEXT-GENERATION TRANSPORT</p>
          <h2 className="starship-title">STARSHIP ARCHITECTURE</h2>
          <p className="starship-lead">
            The world&apos;s first fully and rapidly reusable spacecraft designed to carry
            up to 150 metric tons to orbit and establish permanent infrastructure on Mars.
          </p>
        </div>

        {/* Scroll / Scrub Stage Navigator */}
        <div className="stage-nav-strip">
          {STARSHIP_STAGES.map((s, idx) => (
            <button
              key={s.index}
              type="button"
              className={`stage-nav-tab ${activeStage === idx ? 'is-active' : ''}`}
              onClick={() => setActiveStage(idx)}
              aria-label={`Inspect ${s.title}`}
            >
              <span className="stage-num">0{idx + 1}</span>
              <span className="stage-short-title">{s.title.split(' ')[0]}</span>
              {activeStage === idx && <span className="stage-indicator-line" />}
            </button>
          ))}
        </div>

        {/* Main Interactive Stage Experience */}
        <div className="starship-showcase-grid">
          {/* 3D Dynamic Model Viewport */}
          <div className="starship-viewer-card">
            <StarshipInteractive3D activeStageIndex={activeStage} />

            <div className="starship-viewer-meta">
              <span className="live-camera-tag">ORBITAL SIMULATOR • STAGE 0{activeStage + 1}</span>
              <div className="viewer-step-controls">
                <button
                  type="button"
                  className="step-btn"
                  disabled={activeStage === 0}
                  onClick={() => setActiveStage(prev => Math.max(0, prev - 1))}
                  aria-label="Previous flight stage"
                >
                  &larr; PREV STAGE
                </button>
                <button
                  type="button"
                  className="step-btn"
                  disabled={activeStage === STARSHIP_STAGES.length - 1}
                  onClick={() => setActiveStage(prev => Math.min(STARSHIP_STAGES.length - 1, prev + 1))}
                  aria-label="Next flight stage"
                >
                  NEXT STAGE &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Stage Engineering Breakdown */}
          <div className="starship-info-card">
            <span className="stage-badge">{stage.badge}</span>
            <h3 className="stage-main-title">{stage.title}</h3>
            <p className="stage-highlight">{stage.highlight}</p>
            <p className="stage-description">{stage.description}</p>

            {/* Flight Telemetry Matrix */}
            <div className="stage-telemetry-grid">
              {stage.telemetry.map((item, idx) => (
                <div key={idx} className="telemetry-box">
                  <span className="telemetry-box-label">{item.label}</span>
                  <span className="telemetry-box-value">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="starship-cta-row">
              <a href="#mars" className="starship-action-btn">
                ROAD TO MARS &rarr;
              </a>
              <span className="starship-fleet-note">
                TARGETING 100+ ANNUAL STARSHIP MISSIONS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
