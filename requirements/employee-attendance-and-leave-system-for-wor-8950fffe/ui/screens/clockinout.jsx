function ClockInOutScreen() {
  // Mock employee data (would normally come from context/auth)
  const employee = {
    id: 42,
    employee_id: "E-0042",
    first_name: "Maya",
    last_name: "Patel",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // use browser tz
    facial_enrolled: true,
  };

  // State management
  const [now, setNow] = React.useState(new Date());
  const [isClockedIn, setIsClockedIn] = React.useState(false);
  const [online, setOnline] = React.useState(navigator.onLine);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [toast, setToast] = React.useState(null); // {type: 'success'|'error', message}
  const [faceStatus, setFaceStatus] = React.useState({verified: false, checking: false});
  const [gps, setGps] = React.useState({lat: null, lng: null, fetched: false});
  const [queue, setQueue] = React.useState(() => JSON.parse(localStorage.getItem('offlineQueue')||'[]'));

  // Update clock every second
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // Listen to online/offline events
  React.useEffect(() => {
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  // Helper: format time in employee timezone
  const fmt = (date) => {
    try {
      return date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: employee.timezone});
    } catch {
      return date.toLocaleTimeString();
    }
  };

  // Device info & IP (mocked)
  const deviceInfo = navigator.userAgent;
  const ipAddress = "203.0.113.42"; // static mock value

  // GPS handling
  const fetchGps = () => {
    if (!navigator.geolocation) {
      setToast({type: 'error', message: 'Geolocation not supported in this browser.'});
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({lat: pos.coords.latitude.toFixed(5), lng: pos.coords.longitude.toFixed(5), fetched: true});
        setToast({type: 'success', message: 'Location captured.'});
      },
      (err) => {
        setToast({type: 'error', message: 'Unable to get location: ' + err.message});
      }
    );
  };

  // Facial verification (simulated)
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    if (employee.facial_enrolled && videoRef.current) {
      navigator.mediaDevices.getUserMedia({video: true})
        .then(stream => { videoRef.current.srcObject = stream; })
        .catch(() => setToast({type: 'error', message: 'Camera access denied'}));
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const captureFace = () => {
    if (!videoRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    setFaceStatus({verified: false, checking: true});
    // Simulate async liveness check (2s)
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% pass
      setFaceStatus({verified: success, checking: false});
      setToast({type: success ? 'success' : 'error', message: success ? 'Face verified' : 'Liveness check failed'});
    }, 2000);
  };

  // Submit handler (clock in/out)
  const handleClock = () => {
    const operation = isClockedIn ? 'clock_out' : 'clock_in';
    const payload = {
      employee_id: employee.id,
      operation,
      timestamp: now.toISOString(),
      device_info: deviceInfo,
      ip_address: ipAddress,
      gps_coordinates: gps.fetched ? `${gps.lat},${gps.lng}` : null,
      facial_verified: faceStatus.verified,
      timezone_applied: employee.timezone,
    };

    // Show spinner (max 3s)
    setShowSpinner(true);
    const finish = (success, message) => {
      setShowSpinner(false);
      setToast({type: success ? 'success' : 'error', message});
    };

    if (online) {
      // Simulate network latency 1-2s
      setTimeout(() => {
        // Random success/failure simulation
        const ok = Math.random() > 0.1; // 90% success
        if (ok) {
          setIsClockedIn(!isClockedIn);
          finish(true, `Successfully ${operation.replace('_',' ')}ed at ${fmt(now)}`);
        } else {
          finish(false, 'Server error – try again');
        }
      }, 1500);
    } else {
      // Offline: store locally
      const offlineOp = {
        id: Date.now(),
        employee_id: employee.id,
        operation,
        operation_data: payload,
        local_timestamp: now.toISOString(),
        device_info: deviceInfo,
        sync_status: 'pending',
      };
      const newQueue = [...queue, offlineOp];
      setQueue(newQueue);
      localStorage.setItem('offlineQueue', JSON.stringify(newQueue));
      setIsClockedIn(!isClockedIn);
      finish(true, `Offline ${operation.replace('_',' ')} recorded – will sync when online.`);
    }
  };

  // UI components
  const Badge = ({online}) => (
    <span style={{
      padding: '4px 8px',
      borderRadius: '12px',
      backgroundColor: online ? '#28a745' : '#dc3545',
      color: 'white',
      fontSize: '0.85rem',
    }}>{online ? 'Online' : 'Offline'}</span>
  );

  const Spinner = () => (
    <div style={{marginTop: 12}}>
      <div className="spinner" style={{
        width: 24,
        height: 24,
        border: '4px solid #f3f3f3',
        borderTop: '4px solid #007bff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
    </div>
  );

  const Toast = ({msg}) => (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      backgroundColor: msg.type === 'success' ? '#28a745' : '#dc3545',
      color: 'white',
      padding: '12px 20px',
      borderRadius: 4,
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    }}>{msg.message}</div>
  );

  // Styles
  const containerStyle = {fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', maxWidth: 600, margin: '40px auto', padding: 20, border: '1px solid #e0e0e0', borderRadius: 8, backgroundColor: '#fafafa'};
  const headerStyle = {display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24};
  const timeStyle = {fontSize: '2.5rem', fontWeight: 300, color: '#333'};
  const btnStyle = {padding: '12px 24px', fontSize: '1rem', fontWeight: 'bold', borderRadius: 6, border: 'none', cursor: 'pointer', width: '100%'};
  const primaryBtn = {...btnStyle, backgroundColor: '#007bff', color: 'white'};
  const secondaryBtn = {...btnStyle, backgroundColor: '#6c757d', color: 'white'};
  const sectionStyle = {marginTop: 24};
  const videoStyle = {width: '100%', maxWidth: 300, borderRadius: 4, backgroundColor: '#000'};

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={{margin:0}}>WorkPulse – Attendance</h2>
        <Badge online={online} />
      </div>

      {/* Current Time */}
      <div style={{textAlign:'center', marginBottom:20}}>
        <div style={{color:'#555'}}>Current time ({employee.timezone})</div>
        <div style={timeStyle}>{fmt(now)}</div>
      </div>

      {/* Clock In/Out Button */}
      <button style={primaryBtn} onClick={handleClock} disabled={showSpinner}>
        {isClockedIn ? 'Clock Out' : 'Clock In'}
      </button>
      {showSpinner && <Spinner />}

      {/* Offline queue status */}
      {!online && queue.length > 0 && (
        <div style={sectionStyle}>
          <strong>Pending offline submissions:</strong> {queue.length}
        </div>
      )}

      {/* Facial verification panel */}
      {employee.facial_enrolled && (
        <div style={sectionStyle}>
          <h4>Facial Verification</h4>
          <video ref={videoRef} autoPlay muted style={videoStyle} />
          <canvas ref={canvasRef} width={300} height={225} style={{display:'none'}} />
          <button style={secondaryBtn} onClick={captureFace} disabled={faceStatus.checking}>
            {faceStatus.checking ? 'Verifying...' : 'Capture'}
          </button>
          <div style={{marginTop:8}}>
            Status: {faceStatus.checking ? 'Checking...' : faceStatus.verified ? '✅ Verified' : '❌ Not verified'}
          </div>
        </div>
      )}

      {/* Manual GPS override */}
      <div style={sectionStyle}>
        <h4>Location</h4>
        <button style={secondaryBtn} onClick={fetchGps}>Get GPS Coordinates</button>
        {gps.fetched && (
          <div style={{marginTop:8}}>
            Latitude: {gps.lat}, Longitude: {gps.lng}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && <Toast msg={toast} />}

      {/* Hidden fields (displayed for demo purposes) */}
      <div style={{display:'none'}}>
        <input type="hidden" name="device_info" value={deviceInfo} />
        <input type="hidden" name="ip_address" value={ipAddress} />
        <input type="hidden" name="gps_coordinates" value={gps.fetched ? `${gps.lat},${gps.lng}` : ''} />
        <input type="hidden" name="facial_verified" value={faceStatus.verified} />
      </div>
    </div>
  );
}

// Simple keyframes for spinner (inject into page)
const styleTag = document.createElement('style');
styleTag.textContent = `@keyframes spin { from {transform: rotate(0deg);} to {transform: rotate(360deg);} }`;
document.head.appendChild(styleTag);