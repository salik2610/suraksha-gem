import React, { useState, useEffect } from 'react'

const CollisionAvoidance = ({ appData, addAlert }) => {
  const [isCollisionSimulating, setIsCollisionSimulating] = useState(false)
  const [trainDistance, setTrainDistance] = useState(2.5)
  const [collisionStatus, setCollisionStatus] = useState('✅ All trains maintaining safe distance')
  const [trainPositions, setTrainPositions] = useState({
    train1: { left: 50, top: 50 },
    train2: { right: 50, top: 150 }
  })

  const simulateCollision = () => {
    if (isCollisionSimulating) return
    
    setIsCollisionSimulating(true)
    setCollisionStatus('⚠️ COLLISION RISK DETECTED - Emergency protocols activated')
    
    // Add collision alert
    const collisionAlert = {
      id: Date.now(),
      type: 'Critical',
      message: 'COLLISION IMMINENT - Trains 12951 and 12002 - Emergency brake activated',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      status: 'Active',
      action: 'Emergency brake activated automatically'
    }
    
    addAlert(collisionAlert)

    // Simulate collision scenario
    let step = 0
    const interval = setInterval(() => {
      step++
      setTrainPositions(prev => ({
        train1: { ...prev.train1, left: 50 + (step * 15) },
        train2: { ...prev.train2, right: 50 + (step * 15) }
      }))

      const distance = Math.max(0.1, 2.5 - (step * 0.3))
      setTrainDistance(distance)

      if (step >= 7) {
        clearInterval(interval)
        activateEmergencyBrake()
      }
    }, 500)
  }

  const activateEmergencyBrake = () => {
    setCollisionStatus('✅ EMERGENCY BRAKE ACTIVATED - Trains stopped safely')
    setIsCollisionSimulating(false)
    
    // Reset after 3 seconds
    setTimeout(() => {
      resetCollisionSimulation()
    }, 3000)
  }

  const resetCollisionSimulation = () => {
    setIsCollisionSimulating(false)
    setTrainPositions({
      train1: { left: 50, top: 50 },
      train2: { right: 50, top: 150 }
    })
    setTrainDistance(2.5)
    setCollisionStatus('✅ All trains maintaining safe distance')
  }

  // Update train positions randomly when not simulating
  useEffect(() => {
    if (!isCollisionSimulating) {
      const interval = setInterval(() => {
        setTrainPositions(prev => ({
          train1: {
            left: Math.max(20, Math.min(200, prev.train1.left + (Math.random() - 0.5) * 20)),
            top: Math.max(20, Math.min(250, prev.train1.top + (Math.random() - 0.5) * 20))
          },
          train2: {
            right: Math.max(20, Math.min(200, prev.train2.right + (Math.random() - 0.5) * 20)),
            top: Math.max(20, Math.min(250, prev.train2.top + (Math.random() - 0.5) * 20))
          }
        }))
        
        setTrainDistance((Math.random() * 3 + 1.5).toFixed(1))
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [isCollisionSimulating])

  return (
    <div className="collision-grid">
      <div className="card">
        <div className="card__header">
          <h3>Train Proximity Monitor</h3>
        </div>
        <div className="card__body">
          <div className="proximity-map">
            <div 
              className="train-tracker" 
              id="train1"
              style={{ 
                left: `${trainPositions.train1.left}px`, 
                top: `${trainPositions.train1.top}px` 
              }}
            >
              <div className="train-dot">🚄</div>
              <span className="train-label">Rajdhani (12951)</span>
            </div>
            <div 
              className="train-tracker" 
              id="train2"
              style={{ 
                right: `${trainPositions.train2.right}px`, 
                top: `${trainPositions.train2.top}px` 
              }}
            >
              <div className="train-dot">🚄</div>
              <span className="train-label">Shatabdi (12002)</span>
            </div>
            <div className={`collision-zone ${isCollisionSimulating ? 'active' : ''}`}></div>
          </div>
          <div className="collision-controls">
            <button 
              className="btn btn--secondary" 
              onClick={simulateCollision}
              disabled={isCollisionSimulating}
            >
              Simulate Collision Scenario
            </button>
            <button 
              className="btn btn--primary" 
              onClick={activateEmergencyBrake}
            >
              Emergency Brake
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card__header">
          <h3>Collision Alert System</h3>
        </div>
        <div className="card__body">
          <div className={`collision-status ${isCollisionSimulating ? 'alert-flash' : ''}`}>
            <div className={isCollisionSimulating ? 'status--error' : 'status--success'}>
              {collisionStatus}
            </div>
          </div>
          <div className="collision-details">
            <div className="detail-item">
              <span>Distance Between Trains:</span>
              <span>{trainDistance} km</span>
            </div>
            <div className="detail-item">
              <span>Safety Threshold:</span>
              <span>1.0 km</span>
            </div>
            <div className="detail-item">
              <span>Response Time:</span>
              <span>2.3s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollisionAvoidance
