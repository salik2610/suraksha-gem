import React, { useState, useEffect } from 'react'

const Controller = ({ appData }) => {
  const [systemStatus, setSystemStatus] = useState({
    aiDetection: 'Online',
    collisionAvoidance: 'Active',
    trackMonitoring: 'Warning',
    alertSystem: 'Operational'
  })

  const [controlStates, setControlStates] = useState({
    systemStart: 'Start System',
    systemPause: 'Pause Monitoring',
    emergencyStop: 'Emergency Stop'
  })

  const handleControlAction = (action) => {
    setControlStates(prev => ({
      ...prev,
      [action]: 'Processing...'
    }))

    setTimeout(() => {
      switch(action) {
        case 'systemStart':
          setControlStates(prev => ({
            ...prev,
            [action]: '✅ System Running'
          }))
          break
        case 'systemPause':
          setControlStates(prev => ({
            ...prev,
            [action]: '⏸️ System Paused'
          }))
          break
        case 'emergencyStop':
          setControlStates(prev => ({
            ...prev,
            [action]: '🛑 Emergency Active'
          }))
          break
      }

      // Reset after 3 seconds
      setTimeout(() => {
        setControlStates(prev => ({
          ...prev,
          [action]: action === 'systemStart' ? 'Start System' :
                   action === 'systemPause' ? 'Pause Monitoring' : 'Emergency Stop'
        }))
      }, 3000)
    }, 1000)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        const statuses = ['Online', 'Active', 'Operational', 'Warning']
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        
        setSystemStatus(prev => ({
          ...prev,
          trackMonitoring: randomStatus
        }))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusClass = (status) => {
    switch(status) {
      case 'Online':
      case 'Active':
      case 'Operational':
        return 'status--success'
      case 'Warning':
        return 'status--warning'
      default:
        return 'status--info'
    }
  }

  return (
    <div className="controller-grid">
      <div className="card control-panel">
        <div className="card__header">
          <h3>Master Control Panel</h3>
        </div>
        <div className="card__body">
          <div className="control-sections">
            <div className="control-section">
              <h4>System Controls</h4>
              <div className="control-buttons">
                <button 
                  className="btn btn--primary control-btn" 
                  onClick={() => handleControlAction('systemStart')}
                  disabled={controlStates.systemStart === 'Processing...'}
                >
                  {controlStates.systemStart}
                </button>
                <button 
                  className="btn btn--secondary control-btn" 
                  onClick={() => handleControlAction('systemPause')}
                  disabled={controlStates.systemPause === 'Processing...'}
                >
                  {controlStates.systemPause}
                </button>
                <button 
                  className="btn status--warning control-btn" 
                  onClick={() => handleControlAction('emergencyStop')}
                  disabled={controlStates.emergencyStop === 'Processing...'}
                >
                  {controlStates.emergencyStop}
                </button>
              </div>
            </div>
            <div className="control-section">
              <h4>Manual Overrides</h4>
              <div className="override-controls">
                <label className="form-label">Track Section:</label>
                <select className="form-control">
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>
                <button className="btn btn--outline">Override Safety</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card system-status">
        <div className="card__header">
          <h3>System Status Monitor</h3>
        </div>
        <div className="card__body">
          <div className="status-indicators">
            <div className="status-item">
              <span className={`status-dot ${getStatusClass(systemStatus.aiDetection)}`}></span>
              <span>AI Detection Engine</span>
              <span className="status-value">{systemStatus.aiDetection}</span>
            </div>
            <div className="status-item">
              <span className={`status-dot ${getStatusClass(systemStatus.collisionAvoidance)}`}></span>
              <span>Collision Avoidance</span>
              <span className="status-value">{systemStatus.collisionAvoidance}</span>
            </div>
            <div className="status-item">
              <span className={`status-dot ${getStatusClass(systemStatus.trackMonitoring)}`}></span>
              <span>Track Monitoring</span>
              <span className="status-value">{systemStatus.trackMonitoring}</span>
            </div>
            <div className="status-item">
              <span className={`status-dot ${getStatusClass(systemStatus.alertSystem)}`}></span>
              <span>Alert System</span>
              <span className="status-value">{systemStatus.alertSystem}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Controller
