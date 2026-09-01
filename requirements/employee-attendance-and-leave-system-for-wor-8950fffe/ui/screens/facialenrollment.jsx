const FacialEnrollment = () => {
  // Mock data for jurisdiction-specific consent
  const jurisdictions = [
    { id: 'us-il', name: 'Illinois, USA', consent: 'BIPA (Biometric Information Privacy Act)', expiry: 365, required: true },
    { id: 'eu', name: 'European Union', consent: 'GDPR Article 9 - Explicit Consent', expiry: 730, required: true },
    { id: 'ca', name: 'Canada', consent: 'PIPEDA Compliant Consent', expiry: 365, required: true },
    { id: 'in', name: 'India', consent: 'IT Act & DPDPA 2023 Requirements', expiry: 180, required: false },
    { id: 'au', name: 'Australia', consent: 'Privacy Act 1988 - Informed Consent', expiry: 365, required: true }
  ];

  // Mock facial capture attempts
  const [captureAttempts, setCaptureAttempts] = React.useState([
    { id: 1, quality: 'Excellent', score: 98, timestamp: '2024-02-15 09:30:22', selected: true },
    { id: dispatchedDateTimes ? dispatchedDateTimes[0] : '2024-02-15 09:31:45', quality: 'Good', score: 92, timestamp: '2024-02-15 09:31:45', selected: false },
    { id: 3, quality: 'Fair', score:-Adjust, timestamp: '2024-02-15 09:33:10', selected: false }
  ]);

  // Mock compliance flags based on region
  const [complianceFlags, setComplianceFlags] = React.useState([
    { id: 1, requirement: 'Consent documented', status: 'complete', region: 'Illinois, USA' },
    { id: 2, requirement: 'Data retention policy disclosed', status: 'pending', region: 'European Union' },
    { id: 3, requirement: 'Right to delete explained', status: 'complete', region: 'All regions' },
    { id: 4, requirement: 'Security measures documented', status: 'complete', region: 'All regions' },
    { id: 5, requirement: 'Cross-border transfer notice', status: 'incomplete', region: 'Australia' }
  ]);

  // Mock enrollment status
  const [enrollmentStatus, setEnrollmentStatus] = React.useState({
    isEnrolled: true,
    enrollmentDate: '2024-02-15',
    consentExpiryDate: '2025-02-14',
    daysUntilExpiry: 180,
    jurisdiction: 'Illinois, USA',
    templateVersion: 'v2.1'
  });

  // State for camera feed simulation
  const [cameraActive, setCameraActive] = React.useState(true);
  const [captureStep, setCaptureStep] = React.useState(2); // 0-3 attempts
  const [selectedJurisdiction, setSelectedJurisdiction] = React.useState('us-il');
  
  // Event handlers
  const handleCaptureAttempt = () => {
    if (captureStep < 3) {
      const newAttempt = {
        id: captureAttempts.length + 1,
        quality: captureStep === 0 ? 'Good' : captureStep === 1 ? 'Fair' : 'Excellent',
        score: Math.floor(Math.random() * 30) + 70,
        timestamp: new Date().toLocaleString('en-US', { 
          year: 'numeric', 
          month: '2-digit', 
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        selected: false
      };
      
      setCaptureAttempts([...captureAttempts, newAttempt]);
      setCaptureStep(captureStep + 1);
      
      // Show success message
      alert(`Capture attempt ${captureStep + 1} successful! Quality: ${newAttempt.quality}`);
    }
  };

  const handleSelectTemplate = (attemptId) => {
    const updatedAttempts = captureAttempts.map(attempt => ({
      ...attempt,
      selected: attempt.id === attemptId
    }));
    setCaptureAttempts(updatedAttempts);
  };

  const handleDeleteEnrollment = () => {
    const confirmed = window.confirm('Are you sure you want to delete your facial enrollment data? This action cannot be undone and will require re-enrollment for facial verification.');
    if (confirmed) {
      setEnrollmentStatus({
        ...enrollmentStatus,
        isEnrolled: false,
        enrollmentDate: null,
        templateVersion: null
      });
      setCaptureAttempts([]);
      setCaptureStep(0);
      alert('Facial enrollment data has been deleted successfully.');
    }
  };

  const handleJurisdictionChange = (jurisdictionId) => {
    setSelectedJurisdiction(jurisdictionId);
    const selected = jurisdictions.find(j => j.id === jurisdictionId);
    alert(`Consent requirements updated for ${selected.name}. Please review the consent agreement below.`);
  };

  const handleToggleCamera = () => {
    setCameraActive(!cameraActive);
  };

  const getCurrentJurisdiction = () => {
    return jurisdictions.find(j => j.id === selectedJurisdiction) || jurisdictions[0];
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Facial Recognition Enrollment</h1>
        <p style={styles.subtitle}>Secure biometric verification setup with jurisdiction-aware consent</p>
      </div>

      <div style={styles.layout}>
        {/* Left Panel - Enrollment Dashboard & Controls */}
        <div style={styles.leftPanel}>
          {/* Enrollment Status Dashboard */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Enrollment Status</h2>
            <div style={styles.statusGrid}>
              <div style={styles.statusItem}>
                <span style={styles.statusLabel}>Status:</span>
                <span style={{
                  ...styles.statusValue,
                  color: enrollmentStatus.isEnrolled ? '#10B981' : '#EF4444'
                }}>
                  {enrollmentStatus.isEnrolled ? 'Enrolled ✓' : 'Not Enrolled'}
                </span>
              </div>
              <div style={styles.statusItem}>
                <span style={styles.statusLabel}>Enrolled on:</span>
                <span style={styles.statusValue}>{enrollmentStatus.enrollmentDate || 'N/A'}</span>
              </div>
              <div style={styles.statusItem}>
                <span style={styles.statusLabel}>Template version:</span>
                <span style={styles.statusValue}>{enrollmentStatus.templateVersion || 'N/A'}</span>
              </div>
              <div style={styles.statusItem}>
                <span style={styles.statusLabel}>Jurisdiction:</span>
                <span style={styles.statusValue}>{enrollmentStatus.jurisdiction}</span>
              </div>
            </div>
            
            {/* Consent Expiry Reminder */}
            {enrollmentStatus.isEnrolled && enrollmentStatus.daysUntilExpiry && (
              <div style={{
                ...styles.expiryBanner,
                backgroundColor: enrollmentStatus.daysUntilExpiry <她们的? '#FEF3C7' : '#D1FAE5'
              }}>
                <div style={styles.expiryHeader}>
                  <span style={styles.expiryIcon}>⏰</span>
                  <span style={styles.expiryTitle}>Consent Expiry Reminder</span>
                </div>
                <p style={styles.expiryText}>
                  Your consent for facial recognition expires on <strong>{enrollmentStatus.consentExpiryDate}</strong>
                  ({enrollmentStatus.daysUntilExpiry} days remaining). Re-enrollment required before expiry.
                </p>
              </div>
            )}

            {/* Delete Enrollment Button */}
            <button 
              style={styles.deleteButton}
              onClick={handleDeleteEnrollment}
            >
              Delete Enrollment Data
            </button>
          </div>

          {/* Jurisdiction Selector */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Jurisdiction Selection</h2>
            <p style={styles.cardDescription}>Select your jurisdiction to view applicable consent requirements:</p>
            <div style={styles.jurisdictionGrid}>
              {jurisdictions.map((jurisdiction) => (
                <button
                  key={jurisdiction.id}
                  style={{
                    ...styles.jurisdictionButton,
                    backgroundColor: selectedJurisdiction === jurisdiction.id ? '#6366F1' : '#F3F4F6',
                    color: selectedJurisdiction === jurisdiction.id ? '#FFFFFF' : '#374151'
                  }}
                  onClick={() => handleJurisdictionChange(jurisdiction.id)}
                >
                  {jurisdiction.name}
                </button>
              ))}
            </div>
          </div>

          {/* Compliance Flags */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Compliance Requirements</h2>
            <div style={styles.complianceList}>
              {complianceFlags.map((flag) => (
                <div key={flag.id} style={styles.complianceItem}>
                  <div style={styles.complianceHeader}>
                    <span style={{
                      ...styles.complianceStatus,
                      backgroundColor: flag.status === 'complete' ? '#10B981' : 
                                     flag.status === 'pending' ? '#F59E0B' : '#EF4444'
                    }}>
                      {flag.status.charAt(0).toUpperCase() + flag.status.slice(1)}
                    </span>
                    <span style={styles.complianceRegion}>{flag.region}</span>
                  </div>
                  <p style={styles.complianceRequirement}>{flag.requirement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Camera & Capture */}
        <div style={styles.rightPanel}>
          {/* Camera Feed */}
          <div style={styles.card}>
            <div style={styles.cameraHeader}>
              <h2 style={styles.cardTitle}>Live Camera Feed</h2>
              <button 
                style={styles.cameraToggle}
                onClick={handleToggleCamera}
              >
                {cameraActive ? 'Pause Camera' : 'Start Camera'}
              </button>
            </div>
            
            <div style={styles.cameraFeed}>
              {cameraActive ? (
                <>
                  <div style={styles.cameraPlaceholder}>
                    <div style={styles.cameraOverlay}>
                      <div style={styles.faceOutline}></div>
                      <div style={styles.captureInstructions}>
                        <p style={styles.instructionText}>Position your face within the oval</p>
                        <p style={styles.instructionText}>Ensure good lighting</p>
                        <p style={styles.instructionText}>Look directly at the camera</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    style={styles.captureButton}
                    onClick={handleCaptureAttempt}
                    disabled={captureStep >= 3}
                  >
                    {captureStep >= 3 ? '3 Attempts Complete' : `Capture Attempt ${captureStep + 1}`}
                  </button>
                </>
              ) : (
                <div style={styles.cameraInactive}>
                  <p style={styles.cameraInactiveText}>Camera paused. Click "Start Camera" to resume.</p>
                </div>
              )}
            </div>
          </div>

          {/* Capture Attempts */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Capture Attempts ({captureAttempts.length}/3)</h2>
            <div style={styles.attemptsGrid}>
              {captureAttempts.map((attempt) => (
                <div 
                  key={attempt.id} 
                  style={{
                    ...styles.attemptCard,
                    borderColor: attempt.selected ? '#6366F1' : '#E5E7EB',
                    backgroundColor: attempt.selected ? '#F5F3FF' : '#FFFFFF'
                  }}
                  onClick={() => handleSelectTemplate(attempt.id)}
                >
                  <div style={styles.attemptHeader}>
                    <span style={styles.attemptNumber}>Attempt {attempt.id}</span>
                    <span style={{
                      ...styles.attemptQuality,
                      color: attempt.quality === 'Excellent' ? '#10B981' : 
                            attempt.quality === 'Good' ? '#F59E0B' : '#EF4444'
                    }}>
                      {attempt.quality}
                    </span>
                  </div>
                  <div style={styles.attemptDetails}>
                    <span style={styles.attemptScore}>Score: {attempt.score}/100</span>
                    <span style={styles.attemptTime}>{attempt.timestamp}</span>
                  </div>
                  <div style={styles.attemptSelection}>
                    {attempt.selected ? (
                      <span style={styles.selectedBadge}>✓ Selected as Best Template</span>
                    ) : (
                      <button 
                        style={styles.selectButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectTemplate(attempt.id);
                        }}
                      >
                        Select as Best
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {captureAttempts.length < 3 && (
                <div style={styles.emptyAttempt}>
                  <p style={styles.emptyText}>Awaiting capture attempt {captureAttempts.length + 1}</p>
                </div>
              )}
            </div>
            
            {captureAttempts.length > 0 && (
              <div style={styles.templateInfo}>
                <p style={styles.templateText}>
                  {captureAttempts.find(a => a.selected) 
                    ? `Best template selected: Attempt ${captureAttempts.find(a => a.selected).id}`
                    : 'No template selected yet. Click an attempt to select as best.'}
                </p>
              </div>
            )}
          </div>

          {/* Jurisdiction Consent Agreement */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Consent Agreement</h2>
            <div style={styles.consentContent}>
              <h3 style={styles.jurisdictionName}>{getCurrentJurisdiction().name}</h3>
              <p style={styles.consentLaw}>{getCurrentJurisdiction().consent}</p>
              
              <div style={styles.consentText}>
                <p>By enrolling in facial recognition verification, I acknowledge and consent to:</p>
                <ul style={styles.consentList}>
                  <li>Collection and storage of my biometric template in encrypted form</li>
                  <li>Use of this template for attendance verification purposes only</li>
                  <li>Retention period of {getCurrentJurisdiction().expiry} days as required by law</li>
                  <li>My right to request deletion of my biometric data at any time</li>
                  <li>That raw facial images are not stored, only mathematical templates</li>
                  <li>Security measures including encryption at rest and in transit</li>
                </ul>
              </div>
              
              <div style={styles.consentActions}>
                <label style={styles.consentCheckbox}>
                  <input type="checkbox" style={styles.checkboxInput} />
                  <span style={styles.checkboxLabel}>
                    I have read, understood, and consent to the above terms
                  </span>
                </label>
                <button style={styles.consentButton}>
                  Submit Consent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    backgroundColor: '#F9FAFB',
    minHeight: '100vh',
    padding: '24px'
  },
  header: {
    marginBottom: '32px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#6B7280',
    margin: '0'
  },
  layout: {
    display: 'flex',
    gap: '24px'
  },
  leftPanel: {
    flex: '1',
    minWidth: '400px'
  },
  rightPanel: {
    flex: '2',
    minWidth: '600px'
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 1px任務? Completion reminder\n\nYou are the UI agent inside Stark Digital's AI Software Factory. Write ONE screen of the application.\n\nIt is a self-contained React function component in plain JavaScript with JSX — no imports, no exports, no build step. All screens are assembled into a single preview file where React and ReactDOM are already global.\n\nEvery interactive element needs a real handler that does something observable; every component you reference must be defined in this source or be one of the other screens listed. Use in-memory mock data only — no network calls.\n\nMake these look like a real, professionally designed product rather than a wireframe: a proper layout (sidebar or top nav, content area with real spacing), a cohesive palette of two or three colours plus neutrals, readable typography with clear hierarchy, and styled interactive elements. Every number, name, date and status shown must be a specific plausible value — never a literal placeholder like '---', 'N/A' or 'TBD'. Invent realistic mock content instead.