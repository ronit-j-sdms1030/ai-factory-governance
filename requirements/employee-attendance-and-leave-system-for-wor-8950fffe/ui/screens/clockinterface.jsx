function ClockInterface() {
  const [clockState, setClockState] = React.useState('ready'); // ready, clocking_in, clocking_out, verifying, submitting, success
  const [isClockedIn, setIsClockedIn] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState('');
  const [useFacialVerification, setUseFacialVerification] = React.useState(true);
  const [useLocationOverride, setUseLocationOverride] = React.useState(false);
  const [isOffline, setIsOffline] = React.useState(false);
  const [verificationImage, setVerificationImage] = React.useState(null);
  const [submissionTimeout, setSubmissionTimeout] = React.useState(null);
  
  // Mock employee data
  const employee = {
    id: 'EMP-00789',
    name: 'Alexandra Chen',
    department: 'Field Operations',
    location: 'Singapore',
    timezone: 'Asia/Singapore',
    shift: 'Standard Day (9:00-18:00)'
  };
  
  // Format current time in employee's timezone
  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: employee.timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      const timeString = now.toLocaleTimeString('en-US', options);
      const dateString = now.toLocaleDateString('en-US', {
        timeZone: employee.timezone,
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      setCurrentTime(`${dateString} • ${timeString}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime,常说);
    return () => clearInterval(interval);
  }, []);
  
  // Simulate offline status
  React.useEffect(() => {
    const simulateNetwork = () => {
      setIsOffline(Math.random() < 0.1); // 10% chance offline
    };
    
    simulateNetwork();
    const interval = setInterval(simulateNetwork, 30000);
    return () => clearInterval(interval);
  }, []);
  
  const handleClockAction = () => {
    if (clockState !== 'ready') return;
    
    if (isClockedIn) {
      // Clock out
      setClockState('clocking_out');
      if (useFacialVerification) {
        setClockState('verifying');
      } else {
        submitClockEvent('out');
      }
    } else {
      // Clock in
      setClockState('clocking_in');
      if (useFacialVerification) {
        setClockState('verifying');
      } else {
        submitClockEvent('in');
      }
    }
  };
  
  const captureFace = () => {
    // Simulate face capture
    setVerificationImage('captured');
    setTimeout(() => {
      submitClockEvent(isClockedIn ? 'out' : 'in');
    }, 1500);
  };
  
  const submitClockEvent = (type) => {
    setClockState('submitting');
    
    // Clear any existing timeout
    if (submissionTimeout) clearTimeout(submissionTimeout);
    
    // Start 3-second timeout
    const timeout = setTimeout(() => {
      // Simulate successful submission
      setIsClockedIn(type === 'in');
      setClockState('success');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setClockState('ready');
        setVerificationImage(null);
      }, 3000);
    }, 3000);
    
    setSubmissionTimeout(timeout);
  };
  
  const toggleFacialVerification = () => {
    setUseFacialVerification(!useFacialVerification);
  };
  
  const toggleLocationOverride = () => {
    setUseLocationOverride(!useLocationOverride);
  };
  
  const getButtonText = () => {
    switch (clockState) {
      case 'clocking_in': return 'Clock In Progress...';
      case 'clocking_out': return 'Clock Out Progress...';
      case 'verifying': return 'Awaiting Verification...';
      case 'submitting': return 'Submitting...';
      case 'success': return isClockedIn ? 'Clocked In ✓' : 'Clocked Out ✓';
      default: return isClockedIn ? 'CLOCK OUT' : 'CLOCK IN';
    }
  };
  
  const getButtonColor = () => {
    if (clockState === 'success') return '#10B981';
    if (clockState === 'submitting') return '#3B82F6';
    return isClockedIn ? '#EF4444' : '#10B981';
  };
  
  const getButtonIcon = () => {
    if (clockState === 'submitting') return '⟳';
    if (clockState === 'success') return '✓';
    return isClockedIn ? '→' : '•';
  };
  
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logo}>WorkPulse</div>
          <div style={styles.breadcrumb}>Clock Interface</div>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.employeeInfo}>
            <div style={styles.employeeName}>{employee.name}</div>
            <div style={styles.employeeDetails}>{employee.id} • {employee.department}</div>
          </div>
          <div style={styles.avatar}>AC</div>
        </div>
      </div>
      
      <div style={styles.mainContent}>
        <div style={styles.contentCard}>
          {/* Current Status Section */}
          <div style={styles.statusSection}>
            <div style={styles.statusHeader}>
              <h2 style={styles.title}>Clock Status</h2>
              {isOffline && (
                <div style={styles.offlineBadge}>
                  <span style={styles.offlineDot}>●</span>
                  Offline Mode
                </div>
              )}
            </div>
            
            <div style={styles.timeDisplay}>
              <div style={styles.currentTimeLabel}>Current Time ({employee.location})</div>
              <div style={styles.currentTime}>{currentTime}</div>
              <div style={styles.shiftInfo}>Shift: {employee.shift}</div>
            </div>
            
            <div style={styles.statusIndicator}>
              <div style={{
                ...styles.statusPill,
                backgroundColor: isClockedIn ? '#FEF3C7' : '#D1FAE5'
              }}>
                <span style={{
                  ...styles.statusDot,
                  backgroundColor: isClockedIn ? '#F59E0B' : '#10B981'
                }}>●</span>
                {isClockedIn ? 'Currently Clocked In' : 'Ready to Clock In'}
              </div>
            </div>
          </div>
          
          {/* Main Clock Button */}
          <div style={styles.clockButtonSection}>
            <button
              onClick={handleClockAction}
              disabled={clockState !== 'ready'}
              style={{
                ...styles.clockButton,
                backgroundColor: getButtonColor(),
                opacity: clockState !== 'ready' ? 0.9 : 1,
                transform: clockState === 'submitting' ? 'scale(0.98)' : 'scale(1)'
              }}
            >
              <div style={styles.buttonIcon}>{getButtonIcon()}</div>
              <div style={styles.buttonText}>{getButtonText()}</div>
              {clockState === 'submitting' && (
                <div style={styles.submissionSpinner}>
                  <div style={styles.spinnerDot}></div>
                  <div style={styles.spinnerDot}></div>
                  <div style={styles.spinnerDot}></div>
                </div>
              )}
            </button>
            
            <div style={styles.buttonHint}>
              {isClockedIn ? 'Tap to end your workday' : 'Tap to start your workday'}
            </div>
          </div>
          
          {/* Verification Section */}
          <div style={styles.verificationSection}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Verification Options</h3>
              <label style={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={useFacialVerification}
                  onChange={toggleFacialVerification}
                  style={styles.toggleInput}
                />
                <span style={styles.toggleSlider}></span>
                <span style={styles.toggleLabel}>Facial Verification</span>
              </label>
            </div>
            
            {useFacialVerification && (
              <div style={styles.cameraSection}>
                <div style={styles.cameraFeed}>
                  <div style={styles.cameraPlaceholder}>
                    {verificationImage ? (
                      <>
                        <div style={styles.faceVerified}>✓ Face Verified</div>
                        <div style={styles.cameraImage}>📸</div>
                      </>
                    ) : (
                      <>
                        <div style={styles.cameraIcon}>📷</div>
                        <div style={styles.cameraLabel}>Camera Ready</div>
                        <div style={styles.cameraHint}>Position face within frame</div>
                      </>
                    )}
                  </div>
                  <div style={styles.cameraOverlay}>
                    <div style={styles.faceGuide}></div>
                  </div>
                </div>
                
                {clockState === 'verifying' && (
                  <button
                    onClick={captureFace}
                    style={styles.captureButton}
                  >
                    <span style={styles.captureIcon}>📸</span>
                    Capture Face
                  </button>
                )}
              </div>
            )}
            
            <div style={styles.locationSection}>
              <label style={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={useLocationOverride}
                  onChange={toggleLocationOverride}
                  style={styles.toggleInput}
                />
                <span style={styles.toggleSlider}></span>
                <span style={styles.toggleLabel}>Location Override (Field Work)</span>
              </label>
              {useLocationOverride && (
                <div style={styles.locationNote}>
                  Location services will be bypassed for field operations
                </div>
              )}
            </div>
          </div>
          
          {/* Success Toast */}
          {clockState === 'success' && (
            <div style={styles.successToast}>
              <div style={styles.toastIcon}>✓</div>
              <div style={styles.toastContent}>
                <div style={styles.toastTitle}>
                  {isClockedIn ? 'Clocked In Successfully' : 'Clocked Out Successfully'}
                </div>
                <div style={styles.toastMessage}>
                  {isClockedIn 
                    ? 'Your shift started at 09:02:15. Have a productive day!' 
                    : 'Your shift ended at ππ:15:33. Work duration: 8h 13m'}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Quick Stats */}
        <div style={styles.statsCard}>
          <h3 style={styles.statsTitle}>Today's Summary</h3>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>09:02</div>
              <div style={styles.statLabel}>Clock In Time</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>0 min</div>
              <div style={styles.statLabel}>Late Duration</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>8h 13m</div>
              <div style={styles.statLabel}>Work Duration</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>✓</div>
              <div style={styles.statLabel}>Verification</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
    color: '#111827'
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E5E7EB',
    padding: '20px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#3B82F6',
    letterSpacing: '-0.025em'
  },
  breadcrumb: {
    fontSize: '14px',
    color: '#6B7280',
    fontWeight: '500'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  employeeInfo: {
    textAlign: 'right'
  },
  employeeName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  },
  employeeDetails: {
    fontSize: '14px',
    color: '#6B7280',
    marginTop: '2px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#3B82F6',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px'
  },
  mainContent: {
    padding: '32px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: '24px'
  },
  statusSection: {
    marginBottom: '32px'
  },
  statusHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    margin: '0',
    color: '#111827'
  },
  offlineBadge: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  offlineDot: {
    color: '#F59E0B',
    fontSize: '12px'
  },
  timeDisplay: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  currentTimeLabel: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '8px',
    fontWeight: '500'
  },
  currentTime: {
    fontSize: '32px',
    fontWeight: '600',
    color: '#111827',
    letterSpacing: '-0.025em'
  },
  shiftInfo: {
    fontSize: '14px',
    color: '#6B7280',
    marginTop: '8px'
  },
  statusIndicator: {
    display: 'flex',
    justifyContent: 'center'
  },
  statusPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '24px',
    fontSize: '16px',
    fontWeight: '500'
  },
  statusDot: {
    fontSize: '12px'
  },
  clockButtonSection: {
    textAlign: 'center',
    marginBottom: '40px'
  },
  clockButton: {
    width: '100%',
    maxWidth: '400px',
    height: '120px',
    border: 'none',
    borderRadius: '20px',
    color: 'white',
    fontSize: '24px',
    fontWeight: '600',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    margin: '0 auto'
  },
  buttonIcon: {
    fontSize: '32px'
  },
  buttonText: {
    fontSize: '24px',
    letterSpacing: '0.025em'
  },
  buttonHint: {
    fontSize: '14px',
    color: '#6B7280',
    marginTop: '16px'
  },
  submissionSpinner: {
    position: 'absolute',
    bottom: '20px',
    display: 'flex',
    gap: '6px'
  },
  spinnerDot: {
    width: '8px',
    height: '8px',
    backgroundColor: 'white',
    borderRadius: '50%',
    animation: 'pulse 1.4s infinite'
  },
  verificationSection: {
    borderTop: '1px solid #E5E7EB',
    paddingTop: '32px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0',
    color: '#111827'
  },
  toggleSwitch: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer'
  },
  toggleInput: {
    display: 'none'
  },
  toggleSlider: {
    width: '44px',
    height: '24px',
    backgroundColor: '#D1D5DB',
    borderRadius: '12px',
    position: 'relative',
    transition: 'background-color 0.2s ease'
  },
  toggleInput: {
    display: 'none'
  },
  toggleSlider: {
    width: '44px',
    height: '24px',
    backgroundColor: '#D1D5DB',
    borderRadius: '12px',
    position: 'relative',
    transition: 'background-color 0.2s ease'
  },
  toggleSlider: {
    width: '44px',
    height: '24px',
    backgroundColor: '#D1D5DB',
    borderRadius: '12px',
    position: 'relative',
    transition: 'background-color 0.2s ease'
  },
  toggleInput: {
    display: 'none'
  },
  toggleSlider: {
    width: '44px',
    height: '24px',
    backgroundColor: '#D1D5DB',
    borderRadius: '12px',
    position: 'relative',
    transition: 'background-color 0.2s ease'
  },
  toggleSlider: {
    width: '44px',
    height: '24px',
    backgroundColor: '#D1D5DB',
    borderRadius: '12px',
    position: 'relative',
    transition: 'background-color 0.2s ease'
  },
  toggleSlider: {
    width: '44px',
    height: '24px',
    backgroundColor: '#D1D5DB',
    borderRadius: '12px',
    position: 'relative',
    transition: 'background-color 0.2s ease'
  },
  toggleLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  },
  cameraSection: {
    marginBottom: '32px'
  },
  cameraFeed: {
    backgroundColor: '#1F2937',
    borderRadius: '12px',
    height: '240px',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '20px'
  },
  cameraPlaceholder: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9CA3AF'
  },
  cameraIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  cameraLabel: {
    fontSize: '18px',
    fontWeight: '500',
    marginBottom: '8px'
  },
  cameraHint: {
    fontSize: '14px',
    color: '#6B7280'
  },
  faceVerified: {
    color: '#10B981',
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px'
  },
  cameraImage: {
    fontSize: '64px'
  },
  cameraOverlay: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  faceGuide: {
    width: '160px',
    height: '200px',
    border: '2px dashed rgba(255, 255, 255, 0.3)',
    borderRadius: '12px'
  },
  captureButton: {
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    margin: '0 auto'
  },
  captureIcon: {
    fontSize: '20px'
  },
  locationSection: {
    backgroundColor: '#F9FAFB',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB'
  },
  locationNote: {
    fontSize: '14px',
    color: '#6B7280',
    marginTop: '12px',
    fontStyle: 'italic'
  },
  successToast: {
    backgroundColor: '#D1FAE5',
    border: '1px solid #A7F3D0',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginTop: '32px',
    animation: 'slideIn 0.3s ease'
  },
  toastIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: '#10B981',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '600'
  },
  toastContent: {
    flex: '1'
  },
  toastTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#065F46',
    marginBottom: '4px'
  },
  toastMessage: {
    fontSize: '14px',
    color: '#047857'
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px ANIMATION`
  },
  statsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 20px 0'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px'
  },
  statItem: {
    textAlign: 'center'
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#3B82F6',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '14px',
    color: '#6B7280'
  }
};

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  input[type="checkbox"]:checked + span {
    background-color: #10B981;
  }
  
  input[type="checkbox"]:checked + span::before {
    transform: translateX(20px);
  }
  
  input[type="checkbox"] + span::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: 2px;
    transition: transform 0.2s ease;
  }
  
  button:disabled {
    cursor: not-allowed;
  }
  
  button:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;
document.head.appendChild(styleSheet);