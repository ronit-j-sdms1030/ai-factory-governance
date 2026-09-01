function ClockInterface() {
  // Mock employee data
  const employee = {
    id: 101,
    employee_id: 'EMP-00101',
    first_name: 'Alex',
    last_name: 'Mendoza',
    timezone: 'America/New_York',
    facialVerificationEnabled: true // toggle to show camera UI
  };

  const [now, setNow] = React.useState(new Date());
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const [location, setLocation] = React.useState('Office - New York');
  const [history, setHistory] = React.useState([
    { id: 1, type: 'Clock In', time: new Date(Date.now() - 8 * 3600 * 1000), status: 'present' },
    { id: 2, type: 'Clock Out', time: new Date(Date.now() - 2 * 3600 * 1000), status: 'present' },
    { id: 3, type: 'Clock In', time: new Date(Date.now() - 24 * 3600 * 1000), status: 'late' }
  ]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const [showCamera, setShowCamera] = React.useState(false);

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Listen for online/offline events
  React.useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true,
      timeZone: employee.timezone
    }).format(date);
  };

  const lastAction = history[0];
  const nextAction = lastAction && lastAction.type === 'Clock In' ? 'Clock Out' : 'Clock In';

  const handleClock = () => {
    setIsSubmitting(true);
    // simulate 3‑second processing
    setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        type: nextAction,
        time: new Date(),
        status: nextAction === 'Clock In' ? 'present' : 'present'
      };
      setHistory([newEntry, ...history].slice(0, 3));
      setIsSubmitting(false);
      setToast(`${newEntry.type} recorded at ${formatTime(newEntry.time)}`);
    }, 3000);
  };

  const handleCapture = () => {
    setToast('Face captured and verified');
    // In real app we would send image to backend
  };

  const handleLocationOverride = () => {
    const newLoc = prompt('Enter location description', location);
    if (newLoc !== null) setLocation(newLoc);
  };

  // Simple toast component
  const Toast = ({ message, onClose }) => (
    <div style={styles.toast} onClick={onClose}>
      {message}
    </div>
  );

  // Spinner overlay
  const Spinner = () => (
    <div style={styles.spinnerOverlay}>
      <div style={styles.spinner} />
    </div>
  );

  // Sidebar navigation (static for demo)
  const NavItem = ({ label, path }) => (
    <div style={styles.navItem} onClick={() => alert(`Navigate to ${path}`)}>{label}</div>
  );

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.brand}>WorkPulse</h2>
        <NavItem label="Dashboard" path="/" />
        <NavItem label="Clock" path="/clock" />
        <NavItem label="Attendance" path="/attendance" />
        <NavItem label="Leave Request" path="/leave/request" />
        <NavItem label="Team" path="/team" />
        <NavItem label="Shifts" path="/shifts" />
        <NavItem label="Policies" path="/policies" />
        <NavItem label="Payroll" path="/payroll" />
        <NavItem label="Sync" path="/sync" />
        <NavItem label="Audit Logs" path="/admin/audit" />
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Clock {nextAction}</h1>
          <div style={styles.statusBar}>
            <span>{employee.first_name} {employee.last_name}</span>
            <span style={styles.timeDisplay}>{formatTime(now)}</span>
            {!isOnline && <span style={styles.offlineBadge}>Offline</span>}
          </div>
        </div>

        <div style={styles.content}>
          {/* Large Clock Button */}
          <button style={styles.clockButton} onClick={handleClock} disabled={isSubmitting}>
            {isSubmitting ? 'Processing…' : nextAction}
          </button>

          {/* Manual location override */}
          <button style={styles.locationButton} onClick={handleLocationOverride}>
            Override Location ({location})
          </button>

          {/* Facial verification UI */}
          {employee.facialVerificationEnabled && (
            <div style={styles.faceSection}>
              <h3 style={styles.subTitle}>Facial Verification</h3>
              <div style={styles.cameraPlaceholder}>Camera feed (mock)</div>
              <button style={styles.captureButton} onClick={handleCapture}>Capture</button>
            </div>
          )}

          {/* Recent clock history */}
          <div style={styles.historyBox}>
            <h3 style={styles.subTitle}>Recent Activity</h3>
            <table style={styles.historyTable}>
              <thead>
                <tr>
                  <th style={styles.th}>Type</th>
                  <th style={styles.th}>Time ({employee.timezone})</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map(entry => (
                  <tr key={entry.id}>
                    <td style={styles.td}>{entry.type}</td>
                    <td style={styles.td}>{formatTime(entry.time)}</td>
                    <td style={styles.td}>{entry.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Spinner */}
      {isSubmitting && <Spinner />}
    </div>
  );
}

// Simple style object – using a limited colour palette (teal, slate, white)
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: "'Segoe UI', Tahoma, Helvetica, Arial, sans-serif",
    backgroundColor: '#f5f7fa'
  },
  sidebar: {
    width: 200,
    backgroundColor: '#0d6efd', // primary teal-like
    color: '#fff',
    padding: '20px',
    boxSizing: 'border-box'
  },
  brand: {
    margin: 0,
    fontSize: '1.4rem',
    marginBottom: '30px'
  },
  navItem: {
    padding: '8px 0',
    cursor: 'pointer',
    fontSize: '0.95rem'
  },
  main: {
    flexGrow: 1,
    padding: '30px',
    overflowY: 'auto'
  },
  header: {
    marginBottom: '30px'
  },
  title: {
    margin: 0,
    fontSize: '2rem',
    color: '#333'
  },
  statusBar: {
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    fontSize: '0.95rem',
    color: '#555'
  },
  timeDisplay: {
    fontWeight: 'bold',
    color: '#0d6efd'
  },
  offlineBadge: {
    backgroundColor: '#dc3545',
    color: '#fff',
    borderRadius: '4px',
    padding: '2px 6px',
    fontSize: '0.8rem'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '20px',
    maxWidth: '600px'
  },
  clockButton: {
    padding: '20px',
    fontSize: '1.5rem',
    backgroundColor: '#0d6efd',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  locationButton: {
    padding: '10px 15px',
    fontSize: '0.95rem',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  faceSection: {
    marginTop: '20px',
    padding: '15px',
    border: '1px solid #dee2e6',
    borderRadius: '6px',
    backgroundColor: '#fff'
  },
  subTitle: {
    margin: '0 0 10px 0',
    fontSize: '1.2rem',
    color: '#333'
  },
  cameraPlaceholder: {
    width: '100%',
    height: '180px',
    backgroundColor: '#e9ecef',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6c757d',
    marginBottom: '10px',
    borderRadius: '4px'
  },
  captureButton: {
    padding: '8px 12px',
    fontSize: '0.9rem',
    backgroundColor: '#198754',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  historyBox: {
    marginTop: '20px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid #dee2e6'
  },
  historyTable: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    borderBottom: '2px solid #dee2e6',
    padding: '6px',
    fontWeight: '600',
    color: '#212529'
  },
  td: {
    padding: '6px',
    borderBottom: '1px solid #e9ecef',
    color: '#495057'
  },
  toast: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#0d6efd',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    cursor: 'pointer'
  },
  spinnerOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '6px solid #dee2e6',
    borderTopColor: '#0d6efd',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  }
};

// Add keyframes for spinner animation (inject into document head)
(function addSpinnerKeyframes() {
  const style = document.createElement('style');
  style.innerHTML = `@keyframes spin { to { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
})();