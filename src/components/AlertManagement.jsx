import React, { useState } from 'react'

const AlertManagement = ({ appData, addAlert }) => {
  const [filter, setFilter] = useState('all')
  const [isProcessing, setIsProcessing] = useState(false)

  const filteredAlerts = filter === 'all' 
    ? appData.alerts 
    : appData.alerts.filter(alert => alert.type.toLowerCase() === filter)

  const handleAcknowledgeAll = () => {
    setIsProcessing(true)
    
    // Simulate processing delay
    setTimeout(() => {
      // In a real app, this would update the alerts in the backend
      alert('All active alerts have been acknowledged!')
      setIsProcessing(false)
    }, 1500)
  }

  const handleSendMaintenance = () => {
    setIsProcessing(true)
    
    // Create maintenance alert
    const maintenanceAlert = {
      id: Date.now(),
      type: 'Info',
      message: 'Maintenance team dispatched - All active alerts require attention',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      status: 'Active',
      action: 'Maintenance team notified and dispatched'
    }
    
    addAlert(maintenanceAlert)
    
    setTimeout(() => {
      alert('Maintenance team has been notified and dispatched!')
      setIsProcessing(false)
    }, 1000)
  }

  const handleEmergencyStop = () => {
    if (window.confirm('Are you sure you want to initiate an emergency stop? This will halt all train operations.')) {
      setIsProcessing(true)
      
      // Create emergency stop alert
      const emergencyAlert = {
        id: Date.now(),
        type: 'Critical',
        message: 'EMERGENCY STOP INITIATED - All train operations halted immediately',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        status: 'Active',
        action: 'Emergency protocols activated - All trains stopped'
      }
      
      addAlert(emergencyAlert)
      
      setTimeout(() => {
        alert('EMERGENCY STOP ACTIVATED! All train operations have been halted.')
        setIsProcessing(false)
      }, 1000)
    }
  }

  return (
    <div className="alerts-grid">
      <div className="card alerts-feed">
        <div className="card__header">
          <h3>Live Alert Feed</h3>
          <div className="alert-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'critical' ? 'active' : ''}`}
              onClick={() => setFilter('critical')}
            >
              Critical
            </button>
            <button 
              className={`filter-btn ${filter === 'warning' ? 'active' : ''}`}
              onClick={() => setFilter('warning')}
            >
              Warning
            </button>
          </div>
        </div>
        <div className="card__body">
          <div className="alerts-feed-list">
            {filteredAlerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.type.toLowerCase()} animate-in`}>
                <div className="alert-content">
                  <h4>{alert.type} Alert - ID: {alert.id}</h4>
                  <p>{alert.message}</p>
                  <p><strong>Action:</strong> {alert.action}</p>
                  <div className={`status status--${alert.status.toLowerCase()}`}>
                    {alert.status}
                  </div>
                </div>
                <div className="alert-time">{alert.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card alert-actions">
        <div className="card__header">
          <h3>Response Actions</h3>
        </div>
        <div className="card__body">
          <div className="action-buttons">
            <button 
              className="btn btn--lg btn--primary" 
              onClick={handleAcknowledgeAll}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Acknowledge All'}
            </button>
            <button 
              className="btn btn--lg btn--secondary" 
              onClick={handleSendMaintenance}
              disabled={isProcessing}
            >
              {isProcessing ? 'Sending...' : 'Send Maintenance'}
            </button>
            <button 
              className="btn btn--lg status--warning" 
              onClick={handleEmergencyStop}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Emergency Stop'}
            </button>
          </div>
          <div className="response-stats">
            <div className="stat">
              <span className="stat-value">2.3s</span>
              <span className="stat-label">Avg Response Time</span>
            </div>
            <div className="stat">
              <span className="stat-value">98.5%</span>
              <span className="stat-label">Alert Resolution Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertManagement
