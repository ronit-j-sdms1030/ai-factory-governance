function FacialEnrollmentScreen() {
  // Mock data for the logged-in employee
  const employee = {
    id: 101,
    employee_id: 'EMP00101',
    first_name: 'Aisha',
    last_name: 'Khan',
    email: 'aisha.khan@example.com',
    location_id: 3, // 3 => Illinois (US) – BIPA jurisdiction
    department_id: 5,
    manager_id: 27,
    joining_date: '2022-04-12',
    employment_status: 'Active',
    shift_type: 'flexible',
    timezone: 'America/Chicago',
    created_at: '2022-04-01T09:30:00Z',
    updated_at: '2024-02-15T14:12:00Z',
    entra_id: 'a1b2c3d4-5678-90ab-cdef-1234567890ab'
  };

  // Mock jurisdiction texts
  const jurisdictionTexts = {
    1: {
      name: 'California',
      consent: 'By enrolling, you consent to the collection and storage of facial biometric data under the California Consumer Privacy Act (CCPA).',
      flags: ['CCPA']
    },
    2: {
      name: 'New York',
      consent: 'Your facial biometric data will be processed in compliance with New York State privacy regulations.',
      flags: []
    },
    3: {
      name: 'Illinois',
      consent: 'Illinois BIPA requires explicit written consent before collecting facial biometric data. This enrollment records your consent.',
      flags: ['BIPA']
    },
    4: {
      name: 'Germany',
      consent: 'Your facial biometric data will be processed under GDPR Article 9. You may withdraw consent at any time.',
      flags: ['GDPR']
    }
  };

  const jurisdiction = jurisdictionTexts[employee.location_id] || {
    name: 'Global',
    consent: 'Your facial data will be processed in accordance with applicable local regulations.',
    flags: []
  };

  // Mock existing facial template (could be null if not enrolled yet)
  const [facialTemplate, setFacialTemplate] = React.useState({
    id: 55,
    employee_id: employee.id,
    encrypted_template: 'U2FsdGVkX1+Vx7vK...==', // truncated mock encrypted blob
    jurisdiction_compliance_flags: jurisdiction.flags,
    consent_type: 'written',
    enrollment_date: '2024-03-18T10:15:00Z',
    consent_given_date: '2024-03-18T10:10:00Z',
    consent_expiry_date: '2025-03-18T10:10:00Z',
    is_active: true,
    created_at: '2024-03-18T10:15:00Z'
  });

  // UI state
  const [showConsentModal, setShowConsentModal] = React.useState(!facialTemplate?.is_active);
  const [consentAccepted, setConsentAccepted] = React.useState(false);
  const [cameraError, setCameraError] = React.useState('');
  const [stream, setStream] = React.useState(null);
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [captureAttempts, setCaptureAttempts] = React.useState(0);
  const [bestImage, setBestImage] = React.useState(null); // data URL
  const [isSaving, setIsSaving] = React.useState(false);
  const [saveMessage, setSaveMessage] = React.useState('');

  // Initialise camera when consent accepted
  React.useEffect(() => {
    if (consentAccepted) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
        .then(s => {
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        })
        .catch(err => {
          console.error(err);
          setCameraError('Unable to access camera. Please allow permission and try again.');
        });
    }
    // cleanup on unmount or when consent revoked
    return () => {
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, [consentAccepted]);

  const handleAcceptConsent = () => {
    setConsentAccepted(true);
    setShowConsentModal(false);
  };

  const handleDeclineConsent = () => {
    setConsentAccepted(false);
    setShowConsentModal(false);
    setCameraError('Consent declined – facial enrollment is unavailable.');
  };

  const handleCapture = () => {
    if (!videoRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const w = videoRef.current.videoWidth;
    const h = videoRef.current.videoHeight;
    canvasRef.current.width = w;
    canvasRef.current.height = h;
    ctx.drawImage(videoRef.current, 0, 0, w, h);
    const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.8);
    // For mock purposes we treat every capture as the "best" until 3 attempts.
    setBestImage(dataUrl);
    setCaptureAttempts(prev => Math.min(prev + 1, 3));
  };

  // Mock Azure Face API encryption – simple Base64 encode + dummy marker
  const mockEncryptTemplate = (imageDataUrl) => {
    // strip prefix
    const base64 = imageDataUrl.split(',')[1];
    // prepend dummy marker to indicate encryption
    return 'enc_' + btoa(base64);
  };

  const handleSave = () => {
    if (!bestImage) return;
    setIsSaving(true);
    setTimeout(() => {
      const encrypted = mockEncryptTemplate(bestImage);
      const now = new Date().toISOString();
      const newTemplate = {
        id: facialTemplate?.id || Math.floor(Math.random() * 1000) + 200,
        employee_id: employee.id,
        encrypted_template: encrypted,
        jurisdiction_compliance_flags: jurisdiction.flags,
        consent_type: 'written',
        enrollment_date: now,
        consent_given_date: now,
        consent_expiry_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
        is_active: true,
        created_at: now
      };
      setFacialTemplate(newTemplate);
      setSaveMessage('Facial template saved and encrypted successfully.');
      setIsSaving(false);
    }, 1200); // simulate network latency
  };

  const handleDelete = () => {
    if (!facialTemplate) return;
    const confirmed = window.confirm('Are you sure you want to delete your facial enrollment? This action cannot be undone.');
    if (confirmed) {
      const updated = { ...facialTemplate, is_active: false };
      setFacialTemplate(updated);
      setBestImage(null);
      setCaptureAttempts(0);
      setShowConsentModal(true);
      setConsentAccepted(false);
    }
  };

  // UI helpers
  const formatDate = (iso) => new Date(iso).toLocaleString();

  // Layout components (simple but styled inline)
  const Container = ({ children }) => (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", background: '#f5f7fa' }}>
      <nav style={{ width: '220px', background: '#2c3e50', color: '#ecf0f1', padding: '20px' }}>
        <h2 style={{ margin: '0 0 30px', fontSize: '1.4rem' }}>WorkPulse</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><a href="/dashboard" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Dashboard</a></li>
          <li><a href="/attendance/clock" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Clock In/Out</a></li>
          <li><a href="/attendance/history" style={{ color: '#ecf0f1', textDecoration: 'none' }}>Attendance History</a></li>
          <li><a href="/profile/facial" style={{ color: '#1abc9c', textDecoration: 'none' }}>Facial Enrollment</a></li>
          {/* other nav items omitted for brevity */}
        </ul>
      </nav>
      <main style={{ flex: 1, padding: '30px' }}>
        {children}
      </main>
    </div>
  );

  const Modal = ({ title, children, onClose }) => (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: '8px', width: '400px', maxWidth: '90%', padding: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
        <h3 style={{ marginTop: 0 }}>{title}</h3>
        {children}
        <button onClick={onClose} style={{ marginTop: '15px', background: '#e74c3c', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  );

  return (
    <Container>
      <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>Facial Biometric Enrollment</h1>

      {/* Consent modal */}
      {showConsentModal && (
        <Modal title="Biometric Consent" onClose={() => setShowConsentModal(false)}>
          <p>{jurisdiction.consent}</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
            <button onClick={handleDeclineConsent} style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' }}>Decline</button>
            <button onClick={handleAcceptConsent} style={{ background: '#27ae60', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>Accept</button>
          </div>
        </Modal>
      )}

      {/* Camera preview */}
      {cameraError && <div style={{ color: '#e74c3c', marginBottom: '15px' }}>{cameraError}</div>}
      {consentAccepted && !cameraError && (
        <div style={{ display: 'flex', gap: '30px' }}>
          <div>
            <video ref={videoRef} autoPlay playsInline style={{ width: '320px', height: '240px', background: '#000', borderRadius: '4px' }} />
            <div style={{ marginTop: '10px' }}>
              <button
                onClick={handleCapture}
                disabled={captureAttempts >= 3}
                style={{ background: captureAttempts < 3 ? '#2980b9' : '#95a5a6', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: captureAttempts < 3 ? 'pointer' : 'default' }}
              >Capture ({captureAttempts}/3)</button>
            </div>
          </div>
          <div>
            <h4>Best Template Preview</h4>
            {bestImage ? (
              <div style={{ position: 'relative', width: '160px', height: '120px' }}>
                <img src={bestImage} alt="Best capture" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(2px)', borderRadius: '4px' }} />
                <span style={{ position: 'absolute', top: '5px', right: '5px', background: '#27ae60', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🔒</span>
              </div>
            ) : (<p style={{ color: '#7f8c8d' }}>No capture yet.</p>)}
          </div>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* Action buttons */}
      {bestImage && (
        <div style={{ marginTop: '20px' }}>
          <button onClick={handleSave} disabled={isSaving} style={{ background: '#27ae60', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}>
            {isSaving ? 'Saving...' : 'Save Enrollment'}
          </button>
          <button onClick={handleDelete} style={{ background: '#c0392b', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '4px', cursor: 'pointer' }}>Delete Enrollment</button>
        </div>
      )}

      {/* Feedback messages */}
      {saveMessage && <div style={{ marginTop: '15px', color: '#27ae60' }}>{saveMessage}</div>}

      {/* Existing template info */}
      {facialTemplate && facialTemplate.is_active && (
        <section style={{ marginTop: '30px', padding: '15px', background: '#ecf0f1', borderRadius: '6px' }}>
          <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Current Enrollment Details</h3>
          <p><strong>Enrollment date:</strong> {formatDate(facialTemplate.enrollment_date)}</p>
          <p><strong>Consent given:</strong> {formatDate(facialTemplate.consent_given_date)}</p>
          <p><strong>Compliance flags:</strong> {facialTemplate.jurisdiction_compliance_flags.length ? facialTemplate.jurisdiction_compliance_flags.join(', ') : 'None'}</p>
        </section>
      )}
    </Container>
  );
}