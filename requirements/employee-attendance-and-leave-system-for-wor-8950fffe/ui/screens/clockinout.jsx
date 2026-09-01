function ClockInOut() {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState('');
  const [showCamera, setShowCamera] = React.useState(false);
  const [showGPSInput, setShowGPSInput] = React.useState(false);
  const [manualGPS, setManualGPS] = React.useState({ lat: '', lng: '' });
  const [syncStatus, setSyncStatus] = React.useState('synced'); // synced, pending, conflict
  const [deviceInfo, setDeviceInfo] = React.useState({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearInterval(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleClockIn = async () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSubmitting(false);
    setToastMessage(`Clocked in at ${formatTime(new Date())}`);
    setShowToast(true);
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleClockOut = async () => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsSubmitting(false);
    setToastMessage(`Clocked out at ${formatTime(new Date())}`);
    setShowToast(true);
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleCamera = () => {
    setShowCamera(!showCamera);
  };

  const toggleGPSInput = () => {
    setShowGPSInput(!showGPSInput);
  };

  const handleGPSChange = (e) => {
    const { name, value } = e.target;
    setManualGPS(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submitGPS = () => {
    console.log('Manual GPS submitted:', manualGPS);
    setShowGPSInput(false);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>WorkPulse Attendance</h1>
        <div style={styles.statusBar}>
          <div style={{...styles.badge, backgroundColor: isOnline ? '#4CAF50' : '#F44336'}}>
            {isOnline ? 'Online' : 'Offline'}
          </div>
          <div style={{...styles.badge, backgroundColor: 
            syncStatus === 'synced' ? '#4CAF50' : 
            syncStatus === 'pending' ? '#FF9800' : '#F44336'
          }}>
            {syncStatus === 'synced' ? 'Synced' : 
             syncStatus === 'pending' ? 'Pending Sync' : 'Conflict'}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        {/* Time Display */}
        <div style={styles.timeSection}>
          <div style={styles.dateDisplay}>{formatDate(currentTime)}</div>
          <div style={styles.timeDisplay}>{formatTime(currentTime)}</div>
          <div style={styles.timezone}>IST (UTC+5:30)</div>
        </div>

        {/* Clock Buttons */}
        <div style={styles.buttonContainer}>
          <button 
            onClick={handleClockIn}
            disabled={isSubmitting}
            style={{
              ...styles.clockButton,
              backgroundColor: '#4CAF50',
              marginRight: '20px'
            }}
          >
            {isSubmitting ? (
              <div style={styles.spinner}></div>
            ) : (
              'CLOCK IN'
            )}
          </button>
          
          <button 
            onClick={handleClockOut}
            disabled={isSubmitting}
            style={{
              ...styles.clockButton,
              backgroundColor: '#F44336'
            }}
          >
            {isSubmitting ? (
              <div style={styles.spinner}></div>
            ) : (
              'CLOCK OUT'
            )}
          </button>
        </div>

        {/* Additional Options */}
        <div style={styles.optionsSection}>
          <button onClick={toggleCamera} style={styles.optionButton}>
            📷 Facial Verification
          </button>
          <button onClick={toggleGPSInput} style={styles.optionButton}>
            📍 Location Override
          </button>
        </div>

        {/* Camera Feed (if enabled) */}
        {showCamera && (
          <div style={styles.cameraSection}>
            <div style={styles.cameraPlaceholder}>
              Camera Feed
            </div>
            <button style={styles.captureButton}>Capture Photo</button>
          </div>
        )}

        {/* Manual GPS Input */}
        {showGPSInput && (
          <div style={styles.gpsSection}>
            <h3>Manual Location Entry</h3>
            <div style={styles.gpsInputRow}>
              <input
                type="text"
                name="lat"
                placeholder="Latitude"
                value={manualGPS.lat}
                onChange={handleGPSChange}
                style={styles.gpsInput}
              />
              <input
                type="text"
                name="lng"
                placeholder="Longitude"
                value={manualGPS.lng}
                onChange={handleGPSChange}
                style={styles.gpsInput}
              />
            </div>
            <button onClick={submitGPS} style={styles.submitGPSButton}>
              Submit Location
            </button>
          </div>
        )}

        {/* Device Info */}
        <div style={styles.deviceInfo}>
          <strong>Device:</strong> {deviceInfo.platform} | 
          <strong> Browser:</strong> {deviceInfo.userAgent.substring(0, 30)}...
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div style={styles.toast}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

// Styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    padding: '20px'
  },
  header: {
    marginBottom: '30px'
  },
  title: {
    color: '#2c3e50',
    fontSize: '28px',
    fontWeight: '600',
    margin: '0 0 15px 0'
  },
  statusBar: {
    display: 'flex',
    gap: '10px'
  },
  badge: {
    padding: '5px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '12px',
    fontWeight: '500'
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  },
  timeSection: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  dateDisplay: {
    fontSize: '18px',
    color: '#7f8c8d',
    marginBottom: '5px'
  },
  timeDisplay: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#2c3e50',
    margin: '10px 0'
  },
  timezone: {
    fontSize: '14px',
    color: '#95a5a6'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px'
  },
  clockButton: {
    width: '200px',
    height: '70px',
    fontSize: '20px',
    fontWeight: '600',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  spinner: {
    width: '24px',
    height: '24px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  optionsSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '30px'
  },
  optionButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  cameraSection: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  cameraPlaceholder: {
    height: '200px',
    backgroundColor: '#ecf0f1',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#7f8c8d',
    fontSize: '18px',
    marginBottom: '15px'
  },
  captureButton: {
    backgroundColor: '#9b59b6',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  gpsSection: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  gpsInputRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px'
  },
  gpsInput: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  },
  submitGPSButton: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  deviceInfo: {
    fontSize: '12px',
    color: '#7f8c8d',
    textAlign: 'center',
    paddingTop: '20px',
    borderTop: '1px solid #eee'
  },
  toast: {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#27ae60',
    color: 'white',
    padding: '15px 30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    zIndex: 1000
  }
};

// Add keyframes for spinner animation
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);
