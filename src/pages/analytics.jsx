import { BarChart, Bar, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import './analytics.css';

// NOTE: Use deterministic, non-generic metrics (no random values).
// These represent example learning history and are intended to be replaced by real data.
const monthlyProgress = [
  { month: 'Jan', percent: 12, completed: 2 },
  { month: 'Feb', percent: 28, completed: 5 },
  { month: 'Mar', percent: 41, completed: 7 },
  { month: 'Apr', percent: 56, completed: 10 },
  { month: 'May', percent: 66, completed: 12 },
  { month: 'Jun', percent: 73, completed: 14 },
];

const weeklyVelocity = [
  { week: 'W1', velocity: 8 },
  { week: 'W2', velocity: 10 },
  { week: 'W3', velocity: 9 },
  { week: 'W4', velocity: 13 },
];

const prevWeekVelocity = 9;
const currentWeekVelocity = weeklyVelocity[3].velocity; // 13
const improvementPct = ((currentWeekVelocity - prevWeekVelocity) / prevWeekVelocity) * 100;

const completionForecast = {
  estimatedCompletionDate: '2026-09-22',
};

const skillHealth = {
  status: 'Healthy',
  sub: 'Healthy',
};

function HealthPill({ status }) {
  const map = {
    Healthy: { className: 'health-healthy', label: 'Healthy' },
    'Slowing Down': { className: 'health-slow', label: 'Slowing Down' },
    Neglected: { className: 'health-neglected', label: 'Neglected' },
  };
  const v = map[status] || map.Healthy;
  return <span className={`health-pill ${v.className}`}>{v.label}</span>;
}

function Heatmap({ data }) {
  // GitHub-style 4x6 grid: 24 cells derived from monthly progression.
  // value buckets are derived deterministically from percent/completed.
  const cells = [];
  for (let m = 0; m < data.length; m += 1) {
    const p = data[m].percent;
    for (let i = 0; i < 4; i += 1) {
      const v = Math.min(4, Math.floor((p / 100) * 4) + (i % 2 === 0 ? 0 : 1));
      cells.push(v);
    }
  }

  // render 6 columns, 4 rows
  const cols = 6;
  const rows = 4;

  return (
    <div className="heat-wrap" aria-label="GitHub style heatmap">
      <div className="heat-grid">
        {cells.map((v, idx) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            className={`heatcell heat-${v}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="heat-labels" aria-hidden="true">
        <span>Low</span>
        <span>High</span>
      </div>

      <div className="heat-legend" aria-label="Heatmap legend">
        {data.map((d) => (
          <span key={d.month} className="heat-month">
            {d.month}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Analytics() {
  const improvementShown = `${improvementPct.toFixed(1)}%`;

  return (
    <div className="analytics-page">
      <header className="analytics-hero">
        <h1 className="analytics-title">Analytics</h1>
        <p className="analytics-subtitle">Track velocity, completion, and skill health with a crisp overview.</p>
      </header>

      <section className="analytics-grid">
        <div className="panel">
          <div className="panel-titleRow">
            <h2 className="panel-title">Learning Velocity</h2>
            <div className="panel-rule" aria-hidden="true" />
          </div>

          <div className="kv-grid">
            <div className="kv">
              <div className="kv-label">Current Velocity</div>
              <div className="kv-value">{currentWeekVelocity} pts</div>
            </div>
            <div className="kv">
              <div className="kv-label">Previous Velocity</div>
              <div className="kv-value">{prevWeekVelocity} pts</div>
            </div>
            <div className="kv">
              <div className="kv-label">Improvement Percentage</div>
              <div className="kv-value">
                {improvementPct >= 0 ? '+' : ''}
                {improvementShown}
              </div>
            </div>
          </div>

          <div className="chartWrap">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={weeklyVelocity} margin={{ top: 10, right: 16, bottom: 10, left: 0 }}>
                <XAxis dataKey="week" tick={{ fill: 'rgba(156,163,175,0.95)', fontSize: 12 }} />
                <YAxis hide domain={[0, 'dataMax + 2']} />
                <Line type="monotone" dataKey="velocity" stroke="rgba(170,59,255,0.95)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel-titleRow">
            <h2 className="panel-title">Completion Forecast</h2>
            <div className="panel-rule" aria-hidden="true" />
          </div>

          <div className="forecast">
            <div className="forecast-main">
              <div className="forecast-label">Estimated Completion Date</div>
              <div className="forecast-value">{completionForecast.estimatedCompletionDate}</div>
            </div>

            <div className="forecast-sub">
              <div className="smallStat">
                <div className="smallStat-label">Latest Month Progress</div>
                <div className="smallStat-value">{monthlyProgress[monthlyProgress.length - 1].percent}%</div>
              </div>

              <div className="smallStat">
                <div className="smallStat-label">Total Milestones</div>
                <div className="smallStat-value">
                  {monthlyProgress.reduce((acc, d) => acc + d.completed, 0)}
                </div>
              </div>
            </div>
          </div>

          <div className="chartWrap">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyProgress} margin={{ top: 10, right: 16, bottom: 10, left: 0 }}>
                <XAxis dataKey="month" tick={{ fill: 'rgba(156,163,175,0.95)', fontSize: 12 }} />
                <YAxis hide domain={[0, 100]} />
                <Bar dataKey="percent" fill="rgba(192,132,252,0.65)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel panel-wide">
          <div className="panel-titleRow">
            <h2 className="panel-title">Skill Health</h2>
            <div className="panel-rule" aria-hidden="true" />
          </div>

          <div className="healthRow">
            <HealthPill status={skillHealth.status} />

            <div className="healthBars" aria-label="Skill health spectrum">
              <div className="healthbar">
                <span className="healthbar-label">Healthy</span>
                <span className="healthbar-track">
                  <span className="healthbar-fill fill-healthy" style={{ width: '62%' }} />
                </span>
              </div>
              <div className="healthbar">
                <span className="healthbar-label">Slowing Down</span>
                <span className="healthbar-track">
                  <span className="healthbar-fill fill-slow" style={{ width: '22%' }} />
                </span>
              </div>
              <div className="healthbar">
                <span className="healthbar-label">Neglected</span>
                <span className="healthbar-track">
                  <span className="healthbar-fill fill-neglected" style={{ width: '16%' }} />
                </span>
              </div>
            </div>
          </div>

          <div className="heatSection">
            <div className="heatHead">
              <h3 className="heatTitle">GitHub Style Heatmap</h3>
              <div className="heatRule" aria-hidden="true" />
            </div>
            <Heatmap data={monthlyProgress} />
          </div>
        </div>
      </section>
    </div>
  );
}

