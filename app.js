// Application Data
const appData = {
  portalDescription: {
    title: "Suraksha - AI Railway Safety Module",
    subtitle: "Part of the GatiRakshak System for Indian Railways",
    description: "Suraksha is a cutting-edge AI-powered safety module designed for Indian Railways. It provides continuous monitoring and proactive collision prevention through advanced artificial intelligence technology.",
    features: [
      {
        title: "Automatic Braking",
        description: "Instantly applies emergency brakes when collision risks are detected",
        icon: "🛑"
      },
      {
        title: "Track Monitoring",
        description: "Detects track defects and obstacles through integrated camera systems",
        icon: "👁️"
      },
      {
        title: "Real-time Alerts",
        description: "Sends immediate notifications to maintenance teams and control centers",
        icon: "⚡"
      }
    ]
  },
  trains: [
    {"id": "12951", "name": "Rajdhani Express", "status": "Running", "speed": 110, "position": {"lat": 28.6139, "lng": 77.2090}, "direction": "North"},
    {"id": "12002", "name": "Shatabdi Express", "status": "Running", "speed": 95, "position": {"lat": 28.6000, "lng": 77.2200}, "direction": "South"},
    {"id": "16317", "name": "Himsagar Express", "status": "Running", "speed": 85, "position": {"lat": 28.5950, "lng": 77.2150}, "direction": "East"}
  ],
  alerts: [
    {"id": 1, "type": "Critical", "message": "Potential collision detected - Trains 12951 and 12002", "time": "12:25 PM", "status": "Active", "action": "Emergency brake activated"},
    {"id": 2, "type": "Warning", "message": "Track crack detected at KM 245.7", "time": "12:20 PM", "status": "Acknowledged", "action": "Maintenance team dispatched"},
    {"id": 3, "type": "Info", "message": "Obstacle cleared from track section B-7", "time": "12:15 PM", "status": "Resolved", "action": "Track reopened"}
  ],
  trackDefects: [
    {"type": "crack", "severity": "high", "location": "KM 245.7", "description": "15cm crack in rail joint"},
    {"type": "obstacle", "severity": "critical", "location": "KM 267.2", "description": "Large boulder on track"},
    {"type": "looseBolt", "severity": "medium", "location": "KM 251.3", "description": "3 loose bolts detected"}
  ],
  metrics: {
    activeTrains: 47,
    safetyAlerts: 12,
    systemUptime: "99.7%",
    incidentsPrevented: 156,
    averageResponseTime: "2.3 seconds"
  },
  sampleImages: [
    {"name": "track_crack.jpg", "defects": ["crack"], "description": "Rail crack detected at joint"},
    {"name": "track_obstacle.jpg", "defects": ["obstacle"], "description": "Boulder blocking track"},
    {"name": "loose_bolts.jpg", "defects": ["looseBolt"], "description": "Multiple loose bolts identified"}
  ]
};

// Application State
let currentTab = 'dashboard';
let isCollisionSimulating = false;
let monitorCount = 124567;
let preventedIncidents = 156;
let updateInterval;
let collisionInterval;

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Suraksha AI Railway Safety System initializing...');
    
    // Wait a moment for all elements to be ready
    setTimeout(() => {
        initializeApp();
        setupEventListeners();
        startRealTimeUpdates();
        populateInitialData();
    }, 100);
});

function initializeApp() {
    console.log('Suraksha AI Railway Safety System initialized');
    // Ensure dashboard is shown by default
    showTab('dashboard');
}

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Use direct event delegation on document for tab navigation
    document.addEventListener('click', function(e) {
        // Tab navigation
        if (e.target.classList.contains('nav-tab')) {
            e.preventDefault();
            e.stopPropagation();
            
            const tabId = e.target.getAttribute('data-tab');
            console.log('Tab clicked:', tabId);
            
            if (tabId) {
                showTab(tabId);
            }
            return false;
        }
        
        // Sample image buttons
        if (e.target.classList.contains('sample-btn')) {
            const sampleType = e.target.getAttribute('data-sample');
            console.log('Sample button clicked:', sampleType);
            analyzeSampleImage(sampleType);
        }
        
        // Collision simulation buttons
        if (e.target.id === 'simulateCollision') {
            console.log('Simulate collision clicked');
            simulateCollision();
        }
        
        if (e.target.id === 'activateBrake') {
            console.log('Activate brake clicked');
            activateEmergencyBrake();
        }
        
        // Alert filter buttons
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const filter = e.target.getAttribute('data-filter');
            filterAlerts(filter);
        }
        
        // Controller buttons
        if (e.target.classList.contains('control-btn')) {
            handleControlAction(e);
        }
        
        // Modal close
        if (e.target.id === 'closeModal' || (e.target.id === 'analysisModal' && e.target === document.getElementById('analysisModal'))) {
            closeModal();
        }
    });

    // File upload setup
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    if (uploadArea) {
        uploadArea.addEventListener('click', () => {
            if (fileInput) fileInput.click();
        });
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('drop', handleDrop);
        uploadArea.addEventListener('dragleave', handleDragLeave);
    }
}

function showTab(tabId) {
    console.log('Attempting to show tab:', tabId);
    
    // Hide all tab contents with !important override
    const allTabContents = document.querySelectorAll('.tab-content');
    console.log('Found tab contents:', allTabContents.length);
    
    allTabContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });

    // Remove active class from all tab buttons
    const allTabButtons = document.querySelectorAll('.nav-tab');
    console.log('Found tab buttons:', allTabButtons.length);
    
    allTabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected tab content
    const selectedTab = document.getElementById(tabId);
    const selectedButton = document.querySelector(`[data-tab="${tabId}"]`);
    
    console.log('Selected tab element:', selectedTab);
    console.log('Selected button element:', selectedButton);
    
    if (selectedTab) {
        selectedTab.style.display = 'block';
        selectedTab.classList.add('active');
        currentTab = tabId;
        console.log('Successfully switched to tab:', tabId);

        // Initialize tab-specific functionality
        setTimeout(() => {
            initializeTabContent(tabId);
        }, 50);
    } else {
        console.error('Could not find tab element with id:', tabId);
    }
    
    if (selectedButton) {
        selectedButton.classList.add('active');
        console.log('Tab button marked as active');
    } else {
        console.error('Could not find button with data-tab:', tabId);
    }
}

function initializeTabContent(tabId) {
    console.log('Initializing content for tab:', tabId);
    
    switch(tabId) {
        case 'dashboard':
            updateDashboardMetrics();
            populateRecentAlerts();
            break;
        case 'collision':
            resetCollisionSimulation();
            break;
        case 'detection':
            resetDetectionResults();
            break;
        case 'alerts':
            populateAlerts();
            break;

        case 'controller':
            updateSystemStatus();
            break;
    }
}

function startRealTimeUpdates() {
    updateInterval = setInterval(() => {
        updateLiveMetrics();
        updateTrainPositions();
        generateRandomAlert();
        updateMonitorCount();
    }, 3000);
}

function updateLiveMetrics() {
    // Simulate slight variations in metrics
    const trainCountEl = document.getElementById('trainCount');
    const alertCountEl = document.getElementById('alertCount');
    const uptimeEl = document.getElementById('uptime');
    const preventedCountEl = document.getElementById('preventedCount');

    if (trainCountEl) {
        const currentCount = parseInt(trainCountEl.textContent);
        const variation = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        trainCountEl.textContent = Math.max(45, Math.min(50, currentCount + variation));
    }

    if (alertCountEl) {
        const currentAlerts = parseInt(alertCountEl.textContent);
        const variation = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        alertCountEl.textContent = Math.max(8, Math.min(15, currentAlerts + variation));
    }

    if (preventedCountEl) {
        if (Math.random() > 0.9) {
            preventedIncidents++;
            preventedCountEl.textContent = preventedIncidents;
            preventedCountEl.classList.add('animate-in');
            setTimeout(() => preventedCountEl.classList.remove('animate-in'), 300);
        }
    }
}

function updateMonitorCount() {
    const totalMonitorsEl = document.getElementById('totalMonitors');
    if (totalMonitorsEl) {
        monitorCount += Math.floor(Math.random() * 5) + 1;
        totalMonitorsEl.textContent = monitorCount.toLocaleString();
    }

    const todayPreventedEl = document.getElementById('todayPrevented');
    if (todayPreventedEl && Math.random() > 0.95) {
        const current = parseInt(todayPreventedEl.textContent);
        todayPreventedEl.textContent = current + 1;
    }
}

function updateTrainPositions() {
    // Simulate train movement on the proximity map
    const train1 = document.getElementById('train1');
    const train2 = document.getElementById('train2');
    
    if (train1 && train2 && !isCollisionSimulating) {
        // Random small movements
        const moveRange = 20;
        const currentLeft1 = parseInt(train1.style.left || '50') + (Math.random() - 0.5) * moveRange;
        const currentTop1 = parseInt(train1.style.top || '50') + (Math.random() - 0.5) * moveRange;
        
        const currentRight2 = parseInt(train2.style.right || '50') + (Math.random() - 0.5) * moveRange;
        const currentTop2 = parseInt(train2.style.top || '150') + (Math.random() - 0.5) * moveRange;
        
        train1.style.left = Math.max(20, Math.min(200, currentLeft1)) + 'px';
        train1.style.top = Math.max(20, Math.min(250, currentTop1)) + 'px';
        
        train2.style.right = Math.max(20, Math.min(200, currentRight2)) + 'px';
        train2.style.top = Math.max(20, Math.min(250, currentTop2)) + 'px';

        // Update distance
        updateTrainDistance();
    }
}

function updateTrainDistance() {
    const distanceEl = document.getElementById('trainDistance');
    if (distanceEl) {
        const distance = (Math.random() * 3 + 1.5).toFixed(1);
        distanceEl.textContent = distance + ' km';
    }
}

function generateRandomAlert() {
    if (Math.random() > 0.95) { // 5% chance every interval
        const alertTypes = ['Warning', 'Info'];
        const messages = [
            'Minor track irregularity detected at KM 234.2',
            'Maintenance crew deployed to section C-4',
            'Weather monitoring alert - heavy rain predicted',
            'Signal system test completed successfully',
            'Track inspection completed - no issues found'
        ];

        const newAlert = {
            id: Date.now(),
            type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
            message: messages[Math.floor(Math.random() * messages.length)],
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            status: 'Active',
            action: 'Monitoring'
        };

        appData.alerts.unshift(newAlert);
        if (appData.alerts.length > 10) {
            appData.alerts.pop();
        }

        if (currentTab === 'alerts' || currentTab === 'dashboard') {
            populateAlerts();
            populateRecentAlerts();
        }
    }
}

function populateInitialData() {
    updateDashboardMetrics();
    populateRecentAlerts();
    populateAlerts();
    
    // Add animation classes to elements
    addAnimations();
}

function addAnimations() {
    // Add animation to metrics
    const metrics = document.querySelectorAll('.metric');
    metrics.forEach((metric, index) => {
        setTimeout(() => {
            metric.style.opacity = '0';
            metric.style.transform = 'translateY(20px)';
            setTimeout(() => {
                metric.style.transition = 'all 0.5s ease-out';
                metric.style.opacity = '1';
                metric.style.transform = 'translateY(0)';
            }, 100);
        }, index * 150);
    });
    
    // Add animation to feature items
    const features = document.querySelectorAll('.feature-item');
    features.forEach((feature, index) => {
        setTimeout(() => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            setTimeout(() => {
                feature.style.transition = 'all 0.5s ease-out';
                feature.style.opacity = '1';
                feature.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200 + 500);
    });
    
    // Add pulse animation to train icons
    const trainIcons = document.querySelectorAll('.train-icon');
    trainIcons.forEach(icon => {
        icon.style.animation = 'pulse 2s infinite';
    });
}

function updateDashboardMetrics() {
    const elements = {
        activeTrains: document.getElementById('activeTrains'),
        trainCount: document.getElementById('trainCount'),
        alertCount: document.getElementById('alertCount'),
        uptime: document.getElementById('uptime'),
        preventedCount: document.getElementById('preventedCount')
    };

    Object.entries(elements).forEach(([key, element]) => {
        if (element) {
            switch(key) {
                case 'activeTrains':
                case 'trainCount':
                    element.textContent = appData.metrics.activeTrains;
                    break;
                case 'alertCount':
                    element.textContent = appData.metrics.safetyAlerts;
                    break;
                case 'uptime':
                    element.textContent = appData.metrics.systemUptime;
                    break;
                case 'preventedCount':
                    element.textContent = preventedIncidents;
                    break;
            }
        }
    });
}

function populateRecentAlerts() {
    const recentAlertsEl = document.getElementById('recentAlerts');
    if (!recentAlertsEl) return;

    const recentAlerts = appData.alerts.slice(0, 3);
    recentAlertsEl.innerHTML = recentAlerts.map(alert => `
        <div class="alert-item ${alert.type.toLowerCase()}">
            <div class="alert-content">
                <h4>${alert.type} Alert</h4>
                <p>${alert.message}</p>
            </div>
            <div class="alert-time">${alert.time}</div>
        </div>
    `).join('');
}

function populateAlerts() {
    const alertsFeed = document.getElementById('alertsFeed');
    if (!alertsFeed) return;

    alertsFeed.innerHTML = appData.alerts.map(alert => `
        <div class="alert-item ${alert.type.toLowerCase()} animate-in">
            <div class="alert-content">
                <h4>${alert.type} Alert - ID: ${alert.id}</h4>
                <p>${alert.message}</p>
                <p><strong>Action:</strong> ${alert.action}</p>
                <div class="status status--${alert.status.toLowerCase()}">${alert.status}</div>
            </div>
            <div class="alert-time">${alert.time}</div>
        </div>
    `).join('');
}

function filterAlerts(filter) {
    const alertItems = document.querySelectorAll('#alertsFeed .alert-item');
    alertItems.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'flex';
        } else {
            const isMatch = item.classList.contains(filter);
            item.style.display = isMatch ? 'flex' : 'none';
        }
    });
}

function simulateCollision() {
    console.log('Starting collision simulation...');
    
    if (isCollisionSimulating) return;
    
    isCollisionSimulating = true;
    const train1 = document.getElementById('train1');
    const train2 = document.getElementById('train2');
    const collisionZone = document.getElementById('collisionZone');
    const collisionStatus = document.getElementById('collisionStatus');
    const simulateBtn = document.getElementById('simulateCollision');

    // Update UI
    if (simulateBtn) simulateBtn.disabled = true;
    if (collisionZone) collisionZone.classList.add('active');
    
    if (collisionStatus) {
        collisionStatus.innerHTML = '<div class="status--error">⚠️ COLLISION RISK DETECTED - Emergency protocols activated</div>';
        collisionStatus.classList.add('alert-flash');
    }

    // Animate trains moving towards each other
    let step = 0;
    collisionInterval = setInterval(() => {
        step++;
        if (train1) {
            const currentLeft = 50 + (step * 15);
            train1.style.left = currentLeft + 'px';
        }
        if (train2) {
            const currentRight = 50 + (step * 15);
            train2.style.right = currentRight + 'px';
        }

        // Update distance
        const distance = Math.max(0.1, 2.5 - (step * 0.3));
        const distanceEl = document.getElementById('trainDistance');
        if (distanceEl) {
            distanceEl.textContent = distance.toFixed(1) + ' km';
        }

        if (step >= 7) { // Stop before actual collision
            activateEmergencyBrake();
        }
    }, 500);

    // Add collision alert
    const collisionAlert = {
        id: Date.now(),
        type: 'Critical',
        message: 'COLLISION IMMINENT - Trains 12951 and 12002 - Emergency brake activated',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        status: 'Active',
        action: 'Emergency brake activated automatically'
    };
    
    appData.alerts.unshift(collisionAlert);
    if (currentTab === 'alerts') populateAlerts();
}

function activateEmergencyBrake() {
    console.log('Activating emergency brake...');
    
    clearInterval(collisionInterval);
    
    const collisionStatus = document.getElementById('collisionStatus');
    const simulateBtn = document.getElementById('simulateCollision');
    const brakeBtn = document.getElementById('activateBrake');

    if (collisionStatus) {
        collisionStatus.innerHTML = '<div class="status--success">✅ EMERGENCY BRAKE ACTIVATED - Trains stopped safely</div>';
        collisionStatus.classList.remove('alert-flash');
    }

    if (brakeBtn) {
        brakeBtn.textContent = '✅ Brake Activated';
        brakeBtn.disabled = true;
    }

    // Reset after 3 seconds
    setTimeout(() => {
        resetCollisionSimulation();
        if (simulateBtn) simulateBtn.disabled = false;
        if (brakeBtn) {
            brakeBtn.textContent = 'Emergency Brake';
            brakeBtn.disabled = false;
        }
    }, 3000);

    // Increment prevented incidents
    preventedIncidents++;
    const preventedCountEl = document.getElementById('preventedCount');
    if (preventedCountEl) {
        preventedCountEl.textContent = preventedIncidents;
    }
}

function resetCollisionSimulation() {
    isCollisionSimulating = false;
    clearInterval(collisionInterval);
    
    const train1 = document.getElementById('train1');
    const train2 = document.getElementById('train2');
    const collisionZone = document.getElementById('collisionZone');
    const collisionStatus = document.getElementById('collisionStatus');

    if (train1) {
        train1.style.left = '50px';
        train1.style.top = '50px';
    }
    if (train2) {
        train2.style.right = '50px';
        train2.style.top = '150px';
    }
    if (collisionZone) {
        collisionZone.classList.remove('active');
    }
    if (collisionStatus) {
        collisionStatus.innerHTML = '<div class="status--success">✅ All trains maintaining safe distance</div>';
        collisionStatus.classList.remove('alert-flash');
    }

    updateTrainDistance();
}

function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length > 0) {
        analyzeUploadedImage(files[0]);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('dragover');
}

function handleDragLeave(event) {
    event.currentTarget.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        analyzeUploadedImage(files[0]);
    }
}

function analyzeUploadedImage(file) {
    const analysisResults = document.getElementById('analysisResults');
    if (!analysisResults) return;

    // Show loading state
    analysisResults.innerHTML = '<div class="loading">Analyzing image with AI...</div>';

    // Simulate AI analysis delay
    setTimeout(() => {
        const randomDefect = appData.trackDefects[Math.floor(Math.random() * appData.trackDefects.length)];
        showAnalysisResults(randomDefect, file.name);
    }, 2000);
}

function analyzeSampleImage(sampleType) {
    console.log('Analyzing sample image:', sampleType);
    
    const analysisResults = document.getElementById('analysisResults');
    if (!analysisResults) return;

    analysisResults.innerHTML = '<div class="loading">Analyzing sample image...</div>';

    setTimeout(() => {
        const defectMap = {
            'crack': appData.trackDefects.find(d => d.type === 'crack'),
            'obstacle': appData.trackDefects.find(d => d.type === 'obstacle'),
            'bolts': appData.trackDefects.find(d => d.type === 'looseBolt')
        };

        const defect = defectMap[sampleType];
        if (defect) {
            showAnalysisResults(defect, `sample_${sampleType}.jpg`);
        }
    }, 1500);
}

function showAnalysisResults(defect, filename) {
    const analysisResults = document.getElementById('analysisResults');
    if (!analysisResults) return;

    const severityClass = defect.severity === 'critical' ? 'status--error' : 
                         defect.severity === 'high' ? 'status--warning' : 'status--info';
    
    const confidence = Math.floor(Math.random() * 15) + 85; // 85-99% confidence

    analysisResults.innerHTML = `
        <div class="analysis-item animate-in">
            <div class="analysis-header">
                <span class="defect-type">${defect.type.toUpperCase()} DETECTED</span>
                <span class="confidence-score">${confidence}% confidence</span>
            </div>
            <p><strong>Location:</strong> ${defect.location}</p>
            <p><strong>Description:</strong> ${defect.description}</p>
            <p><strong>Severity:</strong> <span class="${severityClass}">${defect.severity.toUpperCase()}</span></p>
            <p><strong>Recommended Action:</strong> ${getRecommendedAction(defect)}</p>
            <div class="analysis-actions">
                <button class="btn btn--primary" onclick="openAnalysisModal('${defect.type}', '${filename}')">
                    View Detailed Report
                </button>
                <button class="btn btn--secondary" onclick="generateMaintenanceAlert('${defect.location}')">
                    Send to Maintenance
                </button>
            </div>
        </div>
    `;
}

function getRecommendedAction(defect) {
    const actions = {
        'crack': 'Immediate track inspection and repair required',
        'obstacle': 'Emergency clearance operation needed',
        'looseBolt': 'Schedule maintenance within 24 hours'
    };
    return actions[defect.type] || 'Contact maintenance team';
}

function openAnalysisModal(defectType, filename) {
    const modal = document.getElementById('analysisModal');
    const modalBody = document.getElementById('modalBody');
    if (!modalBody) return;

    modalBody.innerHTML = `
        <div class="modal-analysis">
            <h4>Detailed Analysis Report</h4>
            <p><strong>Image:</strong> ${filename}</p>
            <p><strong>Detection Algorithm:</strong> YOLOv8 Railway Defect Detector</p>
            <p><strong>Processing Time:</strong> 0.23 seconds</p>
            <p><strong>Model Version:</strong> v2.1.4</p>
            
            <h5>Detection Details:</h5>
            <ul>
                <li>Defect Type: ${defectType}</li>
                <li>Bounding Box Coordinates: (x:245, y:156, w:89, h:67)</li>
                <li>Classification Score: 0.94</li>
                <li>Feature Maps: 512 activated neurons</li>
            </ul>
            
            <h5>Maintenance Recommendations:</h5>
            <p>Based on the detected ${defectType}, immediate action is recommended to ensure railway safety.</p>
            
            <div class="modal-actions">
                <button class="btn btn--primary">Generate Work Order</button>
                <button class="btn btn--secondary">Export Report</button>
            </div>
        </div>
    `;

    if (modal) modal.classList.remove('hidden');
}

function generateMaintenanceAlert(location) {
    const maintenanceAlert = {
        id: Date.now(),
        type: 'Warning',
        message: `Maintenance required at ${location} - Defect detected by AI system`,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        status: 'Active',
        action: 'Maintenance team notified'
    };

    appData.alerts.unshift(maintenanceAlert);
    alert('Maintenance alert generated and sent to dispatch center!');
}

function resetDetectionResults() {
    const analysisResults = document.getElementById('analysisResults');
    if (analysisResults) {
        analysisResults.innerHTML = `
            <div class="no-analysis">
                <p>Upload an image or select a sample to see AI detection results</p>
            </div>
        `;
    }
}



function updateSystemStatus() {
    const statusItems = document.querySelectorAll('.status-item');
    statusItems.forEach(item => {
        const dot = item.querySelector('.status-dot');
        const value = item.querySelector('.status-value');
        
        if (Math.random() > 0.95) { // Occasional status changes
            const statuses = ['Online', 'Active', 'Operational', 'Warning'];
            const classes = ['status--success', 'status--success', 'status--success', 'status--warning'];
            
            const randomIndex = Math.floor(Math.random() * statuses.length);
            if (value) value.textContent = statuses[randomIndex];
            if (dot) {
                dot.className = 'status-dot ' + classes[randomIndex];
            }
        }
    });
}

function handleControlAction(event) {
    const button = event.target;
    const action = button.id;
    
    button.disabled = true;
    button.textContent = 'Processing...';
    
    setTimeout(() => {
        switch(action) {
            case 'systemStart':
                button.textContent = '✅ System Running';
                button.className = 'btn btn--primary status--success control-btn';
                break;
            case 'systemPause':
                button.textContent = '⏸️ System Paused';
                button.className = 'btn btn--secondary status--warning control-btn';
                break;
            case 'emergencyStop':
                button.textContent = '🛑 Emergency Active';
                button.className = 'btn status--error control-btn';
                break;
        }
        
        // Reset after 3 seconds
        setTimeout(() => {
            button.disabled = false;
            switch(action) {
                case 'systemStart':
                    button.textContent = 'Start System';
                    button.className = 'btn btn--primary control-btn';
                    break;
                case 'systemPause':
                    button.textContent = 'Pause Monitoring';
                    button.className = 'btn btn--secondary control-btn';
                    break;
                case 'emergencyStop':
                    button.textContent = 'Emergency Stop';
                    button.className = 'btn status--warning control-btn';
                    break;
            }
        }, 3000);
    }, 1000);
}

function closeModal() {
    const modal = document.getElementById('analysisModal');
    if (modal) modal.classList.add('hidden');
}

// Cleanup
window.addEventListener('beforeunload', () => {
    if (updateInterval) clearInterval(updateInterval);
    if (collisionInterval) clearInterval(collisionInterval);
});

// Export functions for global access
window.openAnalysisModal = openAnalysisModal;
window.generateMaintenanceAlert = generateMaintenanceAlert;