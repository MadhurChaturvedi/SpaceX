import './Launches.css'

export default function LaunchCard({ launch, onSelectBrief }) {
  const isMilestone = launch.category === 'milestone'

  return (
    <article className="launch-manifest-card">
      <div className="card-top-row">
        <span className={`status-badge ${isMilestone ? 'badge-success' : 'badge-active'}`}>
          <span className="status-dot" />
          {launch.status}
        </span>
        <span className="launch-date-pill">{launch.date}</span>
      </div>

      <h3 className="card-mission-title">{launch.missionName}</h3>
      <p className="card-vehicle-tag">{launch.vehicle}</p>

      <div className="card-specs-list">
        <div className="card-spec-item">
          <span className="spec-label">LAUNCH SITE</span>
          <span className="spec-value">{launch.site}</span>
        </div>
        <div className="card-spec-item">
          <span className="spec-label">BOOSTER SERIAL</span>
          <span className="spec-value">{launch.booster}</span>
        </div>
        <div className="card-spec-item">
          <span className="spec-label">RECOVERY ZONE</span>
          <span className="spec-value">{launch.recovery}</span>
        </div>
      </div>

      <p className="card-summary">{launch.summary}</p>

      <div className="card-footer-action">
        <button
          type="button"
          className="brief-action-btn"
          onClick={() => onSelectBrief(launch)}
          aria-label={`View mission brief for ${launch.missionName}`}
        >
          VIEW MISSION BRIEF &rarr;
        </button>
      </div>
    </article>
  )
}
