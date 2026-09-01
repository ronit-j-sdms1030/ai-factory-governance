function ClockInterface() {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [confirmationMessage, setConfirmationMessage] = React.useState('');
  const [cameraActive, setCameraActive] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);
  const [offlineMode, setOfflineMode] = React.useState(false);
  const [lastAction, setLastAction] = React.useState(null);

  // Mock employee data
  const employee = {
    first_name: "Alex",
    last_name: "Morgan",
    timezone: "America/New_York",
    employee_id: "EMP00789"
  };

  // Mock device info
  const deviceInfo = {
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X)",
    platform: "iOS",
    vendor: "Apple"
  };

  // Update time every second
  React.useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: employee.timezone
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: employee.timezone
    });
  };

  const handleClockIn = () => {
    if (cameraActive && !capturedImage) {
      alert("Please capture your image before clocking in");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmationMessage(`Clocked in at ${formatTime(new Date())}`);
      setShowConfirmation(true);
      setLastAction('in');
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => setShowConfirmation(false), 3000);
    }, 1500);
  };

  const handleClockOut = () => {
    if (cameraActive && !capturedImage) {
      alert("Please capture your image before clocking out");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmationMessage(`Clocked out at ${formatTime(new Date())}`);
      setShowConfirmation(true);
      setLastAction('out');
      // Auto-hide confirmation after 3 seconds
      setTimeout(() => setShowConfirmation(false), 3000);
    }, 1500);
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
    if (!cameraActive) {
      setCapturedImage(null);
    }
  };

  const captureImage = () => {
    // In a real app, this would capture from the camera feed
    setCapturedImage("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2NjYyIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMwIiBmaWxsPSIjOWY5Ii8+PC9zdmc+");
  };

  const toggleOfflineMode = () => {
    setOfflineMode(!offlineMode);
  };

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '15px',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <h1 style={{ 
          fontSize: '24px',
          fontWeight: '600',
          color: '#1e293b',
          margin: 0
        }}>
          WorkPulse
        </h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{
            fontSize: '14px',
            color: '#64748b',
            backgroundColor: '#e2e8f0',
            padding: '4px 8px',
            borderRadius: '12px'
          }}>
            {employee.employee_id}
          </span>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: '16px'
          }}>
            {employee.first_name.charAt(0)}
          </div>
        </div>
      </header>

      {/* Current Time Display */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '5px'
        }}>
          {formatTime(currentTime)}
        </div>
        <div style={{
          fontSize: '16px',
          color: '#64748b',
          marginBottom: '15px'
        }}>
          {formatDate(currentTime)} ({employee.timezone})
        </div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          backgroundColor: offlineMode ? '#fee2e2' : '#dcfce7',
          color: offlineMode ? '#b91c1c' : '#166534',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: offlineMode ? '#ef4444' : '#22c55e'
          }}></div>
          {offlineMode ? 'Offline Mode Active' : 'Online Connection'}
        </div>
      </div>

      {/* Camera Feed (if facial verification enabled) */}
      {cameraActive && (
        <div style={{
          marginBottom: '25px',
          padding: '15px',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{
            position: 'relative',
            height: '200px',
            backgroundColor: '#1e293b',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '15px'
          }}>
            {capturedImage ? (
              <img 
                src={capturedImage} 
                alt="Captured" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'white',
                fontSize: '14px'
              }}>
                Camera Feed Preview
              </div>
            )}
          </div>
          
          {!capturedImage && (
            <button
              onClick={captureImage}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              Capture Image
            </button>
          )}
        </div>
      )}

      {/* Clock Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '25px'
      }}>
        <button
          onClick={handleClockIn}
          disabled={isSubmitting || lastAction === 'in'}
          style={{
            padding: '25px 15px',
            backgroundColor: lastAction === 'in' ? '#94a3b8' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '20px',
            fontWeight: '700',
            cursor: lastAction === 'in' ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 6px rgba(16, 185, 129, 0.3)',
            transition: 'all 0.2s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => {
            if (lastAction !== 'in') e.target.style.backgroundColor = '#059669';
            if (lastAction !== 'in') e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            if (lastAction !== 'in') e.target.style.backgroundColor = '#10b981';
            if (lastAction !== 'in') e.target.style.transform = 'translateY(0)';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Clock In
        </button>
        
        <button
          onClick={handleClockOut}
          disabled={isSubmitting || lastAction === 'out'}
          style={{
            padding: '25px 15px',
            backgroundColor: lastAction === 'out' ? '#94a3b8' : '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '20px',
            fontWeight: '700',
            cursor: lastAction === 'out' ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 6px rgba(239, 68, 68, 0.3)',
            transition: 'all 0.2s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => {
            if (lastAction !== 'out') e.target.style.backgroundColor = '#dc2626';
            if (lastAction !== 'out') e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            if (lastAction !== 'out') e.target.style.backgroundColor = '#ef4444';
            if (lastAction !== 'out') e.target.style.transform = 'translateY(0)';
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Clock Out
        </button>
      </div>

      {/* Additional Controls */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '25px'
      }}>
        <button
          onClick={toggleCamera}
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: cameraActive ? '#fbbf24' : '#e2e8f0',
            color: cameraActive ? '#78350f' : '#334155',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          {cameraActive ? 'Disable Camera' : 'Enable Camera'}
        </button>
        
        <button
          onClick={toggleOfflineMode}
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: offlineMode ? '#10b981' : '#94a3b8',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
          {offlineMode ? 'Go Online' : 'Offline Mode'}
        </button>
      </div>

      {/* Device Info */}
      <div style={{
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        fontSize: '14px',
        color: '#64748b'
      }}>
        <div style={{ fontWeight: '600', marginBottom: '8px', color: '#1e293b' }}>Device Information</div>
        <div style={{ marginBottom: '4px' }}>Platform: {deviceInfo.platform}</div>
        <div>Vender: {deviceInfo.vendor}</div>
      </div>

      {/* Submission Spinner */}
      {isSubmitting && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            padding: '30px',
            backgroundColor: 'white',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div className="spinner" style={{
              width: '40px',
              height: '40px',
              border: '4px solid #e2e8f0',
              borderTop: '4px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
              Processing...
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Toast */}
      {showConfirmation && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#10b981',
          color: 'white',
          padding: '15px 25px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          {confirmationMessage}
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}