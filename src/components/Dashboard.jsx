import React from 'react'

const Dashboard = ({ appData, updateMetrics }) => {
  const recentAlerts = appData.alerts.slice(0, 3)

  return (
    <React.Fragment>
      {/* Portal Description */}
      <section className="portal-description">
        <div className="container">
          <div className="description-content">
            <h2>Proactive Collision Avoidance System</h2>
            <p>
              Suraksha is a cutting-edge AI-powered safety module of the GatiRakshak system 
              designed for Indian Railways. It provides continuous monitoring and proactive 
              collision prevention through advanced artificial intelligence.
            </p>
            <div className="feature-grid">
              <div className="feature-item">
                <div className="feature-icon">🛑</div>
                <h3>Automatic Braking</h3>
                <p>Instantly applies emergency brakes when collision risks are detected</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">👁️</div>
                <h3>Track Monitoring</h3>
                <p>Detects track defects and obstacles through integrated camera systems</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h3>Real-time Alerts</h3>
                <p>Sends immediate notifications to maintenance teams and control centers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="dashboard-grid">
        {/* Live Metrics */}
      <div className="card metrics-card">
        <div className="card__header">
          <h3>Live Railway Metrics</h3>
        </div>
        <div className="card__body">
          <div className="metrics-grid">
            <div className="metric">
              <div className="metric-value">{appData.metrics.activeTrains}</div>
              <div className="metric-label">Active Trains</div>
            </div>
            <div className="metric">
              <div className="metric-value status--warning">{appData.metrics.safetyAlerts}</div>
              <div className="metric-label">Safety Alerts</div>
            </div>
            <div className="metric">
              <div className="metric-value status--success">{appData.metrics.systemUptime}</div>
              <div className="metric-label">System Uptime</div>
            </div>
            <div className="metric">
              <div className="metric-value status--info">{appData.metrics.incidentsPrevented}</div>
              <div className="metric-label">Incidents Prevented</div>
            </div>
          </div>
        </div>
      </div>

      {/* Track Status Map */}
      <div className="card map-card">
        <div className="card__header">
          <h3>Track Section Status</h3>
        </div>
        <div className="card__body">
          <div className="track-map">
            <div className="track-section status-safe" data-section="A">
              <span className="section-label">Section A</span>
              <div className="train-icon">🚄</div>
            </div>
            <div className="track-section status-warning" data-section="B">
              <span className="section-label">Section B</span>
              <div className="alert-badge">⚠️</div>
            </div>
            <div className="track-section status-safe" data-section="C">
              <span className="section-label">Section C</span>
              <div className="train-icon">🚄</div>
            </div>
            <div className="track-section status-critical" data-section="D">
              <span className="section-label">Section D</span>
              <div className="alert-badge">🚨</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="card alerts-preview">
        <div className="card__header">
          <h3>Recent Safety Alerts</h3>
        </div>
        <div className="card__body">
          <div className="alerts-list">
            {recentAlerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.type.toLowerCase()}`}>
                <div className="alert-content">
                  <h4>{alert.type} Alert</h4>
                  <p>{alert.message}</p>
                </div>
                <div className="alert-time">{alert.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  )
}

export default Dashboard
