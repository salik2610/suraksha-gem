import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import CollisionAvoidance from './components/CollisionAvoidance'
import TrackDetection from './components/TrackDetection'
import AlertManagement from './components/AlertManagement'
import Controller from './components/Controller'
import { useAppData } from './hooks/useAppData'

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard')
  const { appData, updateMetrics, addAlert } = useAppData()

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'collision', label: 'Collision Avoidance' },
    { id: 'detection', label: 'Track Detection' },
    { id: 'alerts', label: 'Alert Management' },
    { id: 'controller', label: 'Controller' }
  ]

  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard appData={appData} updateMetrics={updateMetrics} />
      case 'collision':
        return <CollisionAvoidance appData={appData} addAlert={addAlert} />
      case 'detection':
        return <TrackDetection appData={appData} addAlert={addAlert} />
      case 'alerts':
        return <AlertManagement appData={appData} addAlert={addAlert} />
      case 'controller':
        return <Controller appData={appData} />
      default:
        return <Dashboard appData={appData} updateMetrics={updateMetrics} />
    }
  }

  return (
    <div className="app">
      <Header 
        appData={appData}
        tabs={tabs}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />

      <main className="main-content">
        <div className="container">
          {renderTabContent()}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
