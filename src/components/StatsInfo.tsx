import './StatsInfo.css'

function StatsInfo() {
  return (
    <section className="course-info">
      <div className="info-stats">
        <div className="stat">
          <span className="stat-label">EXPERIENCE &gt;</span>
          <span className="stat-value highlight">+10 YEARS</span>
        </div>
        <div className="stat">
          <span className="stat-label">PROJECTS &gt;</span>
          <span className="stat-value highlight">+10</span>
        </div>
        <div className="stat">
          <span className="stat-label">LEVEL &gt;</span>
          <span className="stat-value highlight">SENIOR</span>
        </div>
        <div className="stat">
          <span className="stat-label">LOCATION &gt;</span>
          <span className="stat-value highlight">SOROCABA, SP - BRAZIL</span>
        </div>
      </div>
      <a href="mailto:e.junior95@gmail.com" className="cta-btn">async () =&gt; contact(email)</a>
    </section>
  )
}

export default StatsInfo
