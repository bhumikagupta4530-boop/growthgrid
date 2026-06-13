import './goals.css';

const ROADMAPS = [
  {
    id: 'backend',
    title: 'Backend Development',
    category: 'Web APIs',
    progress: 65,
    milestonesCompleted: 2,
    estimatedCompletionDate: '2026-07-18',
    health: 'on-track',
    items: [
      { done: true, text: 'Learn Node.js' },
      { done: true, text: 'Learn Express' },
      { done: false, text: 'Learn MongoDB' },
      { done: false, text: 'Build API' },
      { done: false, text: 'Deploy Project' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    category: 'UI Engineering',
    progress: 45,
    milestonesCompleted: 2,
    estimatedCompletionDate: '2026-08-05',
    health: 'steady',
    items: [
      { done: true, text: 'Build UI components' },
      { done: true, text: 'Understand state patterns' },
      { done: false, text: 'Implement routing' },
      { done: false, text: 'Add performance profiling' },
      { done: false, text: 'Ship a polished dashboard' },
    ],
  },
  {
    id: 'dsa',
    title: 'DSA Mastery Sprint',
    category: 'Problem Solving',
    progress: 38,
    milestonesCompleted: 1,
    estimatedCompletionDate: '2026-07-30',
    health: 'building',
    items: [
      { done: true, text: 'Master sliding window basics' },
      { done: false, text: 'Solve graph patterns' },
      { done: false, text: 'Practice DP fundamentals' },
      { done: false, text: 'Improve complexity estimation' },
      { done: false, text: 'Run timed contests' },
    ],
  },
];

function HealthTag({ health }) {
  const map = {
    'on-track': { label: 'On track', className: 'tag-ontrack' },
    steady: { label: 'Steady', className: 'tag-steady' },
    building: { label: 'In progress', className: 'tag-building' },
  };
  const v = map[health] || map.building;
  return <span className={`health-tag ${v.className}`}>{v.label}</span>;
}

function RoadmapCard({ r }) {
  const completedCount = r.items.filter((i) => i.done).length;

  return (
    <article className="roadmap-card" aria-label={r.title}>
      <div className="roadmap-header">
        <div className="roadmap-titleWrap">
          <div className="roadmap-title">{r.title}</div>
          <div className="roadmap-category">{r.category}</div>
        </div>

        <div className="roadmap-side">
          <HealthTag health={r.health} />
          <div className="roadmap-percent" aria-label={`Progress ${r.progress}%`}>
            {r.progress}%
          </div>
        </div>
      </div>

      <div className="roadmap-meta">
        <div className="meta-item">
          <div className="meta-label">Milestones Completed</div>
          <div className="meta-value">{r.milestonesCompleted}</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">Estimated Completion Date</div>
          <div className="meta-value">{r.estimatedCompletionDate}</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">Checklist Completed</div>
          <div className="meta-value">
            {completedCount}/{r.items.length}
          </div>
        </div>
      </div>

      <div className="roadmap-progress">
        <div className="progress-track" aria-hidden="true">
          <div className="progress-bar" style={{ width: `${r.progress}%` }} />
        </div>
      </div>

      <ul className="roadmap-list" aria-label="Roadmap tasks">
        {r.items.map((item) => (
          <li key={item.text} className={`roadmap-li ${item.done ? 'done' : 'todo'}`}>
            <span className="roadmap-check" aria-hidden="true">
              {item.done ? '✓' : '⬜'}
            </span>
            <span className="roadmap-li-text">{item.text}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Goals() {
  return (
    <div className="goals-page">
      <header className="goals-hero">
        <div>
          <h1 className="goals-title">Manage Learning Roadmaps</h1>
          <p className="goals-subtitle">Create structured plans and track progress with clarity.</p>
        </div>
      </header>

      <section className="goals-form" aria-label="Create Roadmap">
        <div className="form-grid">
          <label className="field">
            <span className="field-label">Skill Name</span>
            <input className="field-input" type="text" placeholder="e.g., React Query" disabled />
          </label>

          <label className="field">
            <span className="field-label">Category</span>
            <input className="field-input" type="text" placeholder="e.g., Data Fetching" disabled />
          </label>

          <label className="field">
            <span className="field-label">Target Completion Date</span>
            <input className="field-input" type="date" disabled />
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-primary" disabled>
            Create Roadmap
          </button>
        </div>
      </section>

      <section className="goals-list" aria-label="Roadmap Cards">
        <div className="roadmaps-grid">
          {ROADMAPS.map((r) => (
            <RoadmapCard key={r.id} r={r} />
          ))}
        </div>
      </section>
    </div>
  );
}

