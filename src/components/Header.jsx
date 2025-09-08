import React from 'react'
import Navigation from './Navigation'

const Header = ({ appData, tabs, currentTab, onTabChange }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo-section">
            <h1>
              <span className="logo-icon"></span> Suraksha
            </h1>
            <p className="subtitle">AI Railway Safety Module - GatiRakshak System</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <span className="stat-value">{appData.metrics.activeTrains}</span>
              <span className="stat-label">Active Trains</span>
            </div>
            <div className="stat-item">
              <span className="stat-value status--success">Online</span>
              <span className="stat-label">System Status</span>
            </div>
          </div>
        </div>
      </div>
      <Navigation tabs={tabs} currentTab={currentTab} onTabChange={onTabChange} />
    </header>
  )
}

export default Header
