import { useState, useEffect, useCallback } from 'react'

const initialAppData = {
  trains: [
    {"id": "12951", "name": "Rajdhani Express", "status": "Running", "speed": 110, "position": {"lat": 28.6139, "lng": 77.2090}, "direction": "North"},
    {"id": "12002", "name": "Shatabdi Express", "status": "Running", "speed": 95, "position": {"lat": 28.6000, "lng": 77.2200}, "direction": "South"},
    {"id": "16317", "name": "Himsagar Express", "status": "Running", "speed": 85, "position": {"lat": 28.5950, "lng": 77.2150}, "direction": "East"}
  ],
  alerts: [],
  trackDefects: [],
  metrics: {
    activeTrains: 47,
    safetyAlerts: 12,
    systemUptime: "99.7%",
    incidentsPrevented: 156,
    averageResponseTime: "2.3 seconds"
  },
  sampleImages: []
}

export const useAppData = () => {
  const [appData, setAppData] = useState(initialAppData)
  const [monitorCount, setMonitorCount] = useState(124567)
  const [preventedIncidents, setPreventedIncidents] = useState(156)

  const updateMetrics = useCallback(() => {
    setAppData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        activeTrains: Math.max(45, Math.min(50, prev.metrics.activeTrains + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
        safetyAlerts: Math.max(8, Math.min(15, prev.metrics.safetyAlerts + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0)))
      }
    }))

    if (Math.random() > 0.9) {
      setPreventedIncidents(prev => prev + 1)
      setAppData(prev => ({
        ...prev,
        metrics: {
          ...prev.metrics,
          incidentsPrevented: prev.metrics.incidentsPrevented + 1
        }
      }))
    }
  }, [])

  const addAlert = useCallback((newAlert) => {
    setAppData(prev => ({
      ...prev,
      alerts: [newAlert, ...prev.alerts.slice(0, 9)]
    }))
  }, [])

  const generateRandomAlert = useCallback(() => {
    if (Math.random() > 0.95) {
      const alertTypes = ['Warning', 'Info']
      const messages = [
        'Minor track irregularity detected at KM 234.2',
        'Maintenance crew deployed to section C-4',
        'Weather monitoring alert - heavy rain predicted',
        'Signal system test completed successfully',
        'Track inspection completed - no issues found'
      ]

      const newAlert = {
        id: Date.now(),
        type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        status: 'Active',
        action: 'Monitoring'
      }

      addAlert(newAlert)
    }
  }, [addAlert])

  const updateMonitorCount = useCallback(() => {
    setMonitorCount(prev => prev + Math.floor(Math.random() * 5) + 1)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      updateMetrics()
      generateRandomAlert()
      updateMonitorCount()
    }, 3000)

    return () => clearInterval(interval)
  }, [updateMetrics, generateRandomAlert, updateMonitorCount])

  return {
    appData: {
      ...appData,
      monitorCount,
      preventedIncidents
    },
    updateMetrics,
    addAlert
  }
}
