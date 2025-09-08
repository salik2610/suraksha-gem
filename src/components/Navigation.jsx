import React from 'react'

const Navigation = ({ tabs, currentTab, onTabChange }) => {
  // Function to get icon based on tab id
  const getTabIcon = (tabId) => {
    switch(tabId) {
      case 'dashboard':
        return '📊 ';
      case 'collision':
        return '🚨 ';
      case 'detection':
        return '🔍 ';
      case 'alerts':
        return '⚠️ ';
      case 'controller':
        return '🎮 ';
      default:
        return '';
    }
  };

  return (
    <nav className="nav-tabs">
      <div className="container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${currentTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="tab-icon">{getTabIcon(tab.id)}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
