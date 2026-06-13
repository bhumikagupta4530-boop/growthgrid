import './dashboard.css';

const STATS = [
  {
    label: 'Active Skills',
    value: 3,
    sub: 'React, Node, DSA',
  },
  {
    label: 'Completed Skills',
    value: 7,
    sub: 'History: fundamentals',
  },
  {
    label: 'Current Streak',
    value: 12,
    sub: 'Days of practice',
  },
  {
    label: 'Milestones Completed',
    value: 19,
    sub: 'Course milestones',
  },
];

const SKILLS = [
  {
    name: 'React Hooks',
    progress: 72,
    milestones: 6,
    health: 'strong',
  },
  {
    name: 'Express Routing',
    progress: 54,
    milestones: 4,
    health: 'steady',
  },
  {
    name: 'DSA Patterns',
    progress: 38,
    milestones: 3,
    health: 'building',
  },
  {
    name: 'TypeScript Basics',
    progress: 63,
    milestones: 5,
    health: 'strong',
  },
];

const RECENT_ACTIVITY = [
  { title: 'Completed React Hooks', time: 'Today' },
  { title: 'Finished Express Routing', time: 'Yesterday' },
  { title: 'Solved DSA Problems', time: '2 days ago' },
];

function HealthPill({ health }) {
  const map = {
    strong: { label: 'Healthy', className: 'pill-strong' },
    steady: { label: 'On track', className: 'pill-steady' },
    building: { label: 'In progress', className: 'pill-building' },
  };
  const v = map[health] || map.building;
  return <span className={`health-pill ${v.className}`}>{v.label}</span>;
}

function MiniHeatmap({ values }) {
  // values should be length 14
  return (
    <div className="heatmap" aria-label="Mini heatmap preview">
      {values.map((n, idx) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          className={`heatcell heat-${n}`}
          aria-label={`Day ${idx + 1}: ${n}`}
        />
      ))}
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="dashboard-page">
      <header className="dash-hero">
        <div className="dash-titleWrap">
          <h1 className="dash-title">Welcome Back</h1>
          <p className="dash-subtitle">Keep momentum with a clear view of what’s next.</p>
        </div>
        <div className="dash-badge" aria-label="Premium SaaS inspired">
          Premium • Focus Mode
        </div>
      </header>

      <section className="dash-section">
        <div className="stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-top">
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
              </div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="dash-section">
        <div className="section-header">
          <h2 className="section-title">Skill Overview</h2>
          <div className="section-rule" aria-hidden="true" />
        </div>

        <div className="skills-grid">
          {SKILLS.map((sk) => (
            <div key={sk.name} className="skill-card">
              <div className="skill-header">
                <div className="skill-name">{sk.name}</div>
                <HealthPill health={sk.health} />
              </div>

              <div className="skill-progress">
                <div className="progress-row">
                  <div className="progress-pct">{sk.progress}%</div>
                  <div className="progress-tag">Milestones: {sk.milestones}</div>
                </div>
                <div className="progress-track" aria-hidden="true">
                  <div
                    className="progress-bar"
                    style={{ width: `${sk.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dash-section dash-late">
        <div className="dash-twoCol">
          <div className="activity-card">
            <div className="section-header">
              <h2 className="section-title">Recent Activity</h2>
              <div className="section-rule" aria-hidden="true" />
            </div>

            <div className="activity-list">
              {RECENT_ACTIVITY.map((a) => (
                <div key={a.title} className="activity-item">
                  <div className="activity-dot" aria-hidden="true" />
                  <div className="activity-text">
                    <div className="activity-title">{a.title}</div>
                    <div className="activity-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="heat-card">
            <div className="section-header">
              <h2 className="section-title">Mini Heatmap Preview</h2>
              <div className="section-rule" aria-hidden="true" />
            </div>

            <MiniHeatmap values={[0, 1, 2, 1, 3, 2, 2, 4, 3, 2, 1, 2, 3, 4]} />
            <div className="heat-legend" aria-hidden="true">
              <span className="legend-item">Low</span>
              <span className="legend-item">High</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

