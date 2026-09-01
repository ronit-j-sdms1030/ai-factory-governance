function FacialEnrollment() {
  const [consentGiven, setConsentGiven] = React.useState(false);
  const [consentText, setConsentText] = React.useState('');
  const [cameraError, setCameraError] = React.useState('');
  const videoRef = React.useRef(null);
  const [stream, setStream] = React.useState(null);
  const MAX_ATTEMPTS = 3;
  const [attempts, setAttempts] = React.useState(0);
  const [captured, setCaptured] = React.useState([]); // data URLs
  const [status, setStatus] = React.useState('Not Enrolled'); // Pending, Enrolled
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [deleteReason, setDeleteReason] = React.useState('');
  const [compliance, setCompliance] = React.useState({ flags: [], expiry: '' });

  // Mock employee data
  const employee = {
    id: 42,
    first_name: 'Aisha',
    last_name: 'Khan',
    location_id: 101, // assume jurisdiction triggers BIPA + GDPR
    email: 'aisha.khan@workpulse.com',
  };

  // Load consent text based on location_id
  React.useEffect(() => {
    // In reality this would be fetched; we mock it
    const texts = {
      101: `By providing facial data you consent to the collection, storage, and processing of your biometric identifier in accordance with the Illinois Biometric Information Privacy Act (BIPA) and the EU General Data Protection Regulation (GDPR) Article 9. Your data will be encrypted and used solely for optional clock‑in verification. You may withdraw consent at any time.`,
      202: `Your facial data will be used for verification under local privacy regulations.`,
    };
    setConsentText(texts[employee.location_id] || 'Consent text not available for your location.');
  }, [employee.location_id]);

  // Load compliance flags
  React.useEffect(() => {
    const flagsMap = {
      101: { flags: ['BIPA', 'GDPR'], expiry: '2025-12-31' },
      202: { flags: ['CCPA'], expiry: '2024-06-30' },
    };
    setCompliance(flagsMap[employee.location_id] || { flags: [], expiry: '' });
  }, [employee.location_id]);

  // Start camera on mount if consent given
  React.useEffect(() => {
    if (!consentGiven) return;
    async function startCamera() {
      try {
        const media = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        videoRef.current.srcObject = media;
        setStream(media);
        setCameraError('');
      } catch (e) {
        console.error(e);
        setCameraError('Unable to access camera. Please allow camera permissions and try again.');
      }
    }
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [consentGiven]);

  const handleAccept = () => {
    setConsentGiven(true);
    setStatus('Pending');
  };

  const handleDecline = () => {
    setConsentGiven(false);
    setStatus('Not Enrolled');
    alert('You have declined facial enrollment.');
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
    setCaptured(prev => [...prev, dataUrl]);
    setAttempts(prev => prev + 1);
    // Simulate processing delay
    setTimeout(() => {
      // For demo, after first successful capture we consider it Enrolled
      setStatus('Enrolled');
    }, 1500);
  };

  const handleDelete = () => {
    // Reset state
    setConsentGiven(false);
    setAttempts(0);
    setCaptured([]);
    setStatus('Not Enrolled');
    setShowDeleteModal(false);
    alert(`Enrollment deleted. Reason recorded: ${deleteReason}`);
    setDeleteReason('');
  };

  // Helper components
  const Badge = ({ text, color }) => (
    React.createElement('span', {
      style: {
        backgroundColor: color,
        color: '#fff',
        borderRadius: '12px',
        padding: '4px 8px',
        fontSize: '0.85rem',
        fontWeight: '600',
        display: 'inline-block',
      },
    }, text)
  );

  const Modal = ({ children, onClose }) => (
    React.createElement('div', {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      },
    },
      React.createElement('div', {
        style: {
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '24px',
          minWidth: '320px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      },
        children,
        React.createElement('button', {
          onClick: onClose,
          style: {
            marginTop: '16px',
            backgroundColor: '#e0e0e0',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
          },
        }, 'Close')
      )
    )
  );

  // Layout styling
  const containerStyle = {
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    color: '#333',
    maxWidth: '960px',
    margin: '0 auto',
    padding: '24px',
  };
  const sectionStyle = { marginBottom: '24px' };
  const buttonStyle = (bg) => ({
    backgroundColor: bg,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 16px',
    cursor: 'pointer',
    fontWeight: '600',
    marginRight: '12px',
  });

  return (
    React.createElement('div', { style: containerStyle },
      // Header
      React.createElement('h2', { style: { marginBottom: '8px' } }, `Facial Enrollment – ${employee.first_name} ${employee.last_name}`),
      React.createElement('div', { style: { marginBottom: '16px' } },
        React.createElement(Badge, { text: status, color: status === 'Enrolled' ? '#4caf50' : status === 'Pending' ? '#ff9800' : '#f44336' })
      ),

      // Consent block
      !consentGiven && React.createElement('section', { style: sectionStyle },
        React.createElement('h3', null, 'Consent Agreement'),
        React.createElement('p', { style: { lineHeight: '1.5', maxHeight: '200px', overflowY: 'auto', backgroundColor: '#f9f9f9', padding: '12px', borderRadius: '4px' } }, consentText),
        React.createElement('div', null,
          React.createElement('button', { onClick: handleAccept, style: buttonStyle('#0066cc') }, 'Accept'),
          React.createElement('button', { onClick: handleDecline, style: buttonStyle('#9e9e9e') }, 'Decline')
        )
      ),

      // Camera & capture area (shown only after consent)
      consentGiven && React.createElement('section', { style: sectionStyle },
        React.createElement('h3', null, 'Capture Your Face'),
        React.createElement('p', { style: { marginBottom: '8px' } }, 'Make sure you have a neutral expression, good lighting, and no background distractions.'),
        cameraError && React.createElement('p', { style: { color: '#d32f2f' } }, cameraError),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '24px' } },
          // Video preview
          React.createElement('video', {
            ref: videoRef,
            autoPlay: true,
            playsInline: true,
            style: { width: '320px', height: '240px', backgroundColor: '#000', borderRadius: '4px' },
          }),
          // Capture controls
          React.createElement('div', null,
            React.createElement('button', {
              onClick: captureImage,
              disabled: attempts >= MAX_ATTEMPTS,
              style: buttonStyle('#0099ff'),
            }, attempts >= MAX_ATTEMPTS ? 'No Attempts Left' : 'Capture'),
            React.createElement('p', { style: { marginTop: '8px' } }, `Attempts: ${attempts} / ${MAX_ATTEMPTS}`),
            captured.length > 0 && React.createElement('div', { style: { marginTop: '12px' } },
              React.createElement('h4', null, 'Best Template Preview'),
              // Show latest capture blurred for privacy
              React.createElement('img', {
                src: captured[captured.length - 1],
                alt: 'Best template',
                style: { width: '120px', height: '90px', filter: 'blur(8px)', borderRadius: '4px' },
              })
            )
          )
        )
      ),

      // Compliance flags
      consentGiven && React.createElement('section', { style: sectionStyle },
        React.createElement('h3', null, 'Compliance'),
        React.createElement('ul', null,
          compliance.flags.map(flag =>
            React.createElement('li', { key: flag }, `${flag} – expires on ${compliance.expiry}`)
          )
        )
      ),

      // Delete enrollment
      status !== 'Not Enrolled' && React.createElement('section', { style: sectionStyle },
        React.createElement('button', {
          onClick: () => setShowDeleteModal(true),
          style: buttonStyle('#d32f2f'),
        }, 'Delete Enrollment')
      ),

      // Delete confirmation modal
      showDeleteModal && React.createElement(Modal, { onClose: () => setShowDeleteModal(false) },
        React.createElement('h3', null, 'Confirm Deletion'),
        React.createElement('p', null, 'Please provide a reason for deleting this facial enrollment. This will be recorded in the audit log.'),
        React.createElement('textarea', {
          value: deleteReason,
          onChange: e => setDeleteReason(e.target.value),
          rows: 4,
          style: { width: '100%', padding: '8px', borderRadius: '4px', borderColor: '#ccc' },
        }),
        React.createElement('div', { style: { marginTop: '12px' } },
          React.createElement('button', {
            onClick: handleDelete,
            disabled: deleteReason.trim() === '',
            style: buttonStyle('#d32f2f'),
          }, 'Confirm Delete'),
          React.createElement('button', {
            onClick: () => setShowDeleteModal(false),
            style: buttonStyle('#9e9e9e'),
          }, 'Cancel')
        )
      )
    )
  );
}