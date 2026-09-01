function FacialEnrollment() {
  // Mock data
  const employee = {
    id: "EMP001",
    first_name: "Alex",
    last_name: "Johnson",
    department: "Engineering",
    location: "New York, USA"
  };

  const jurisdiction = {
    name: "United States",
    regulations: [
      "Biometric Information Privacy Act (BIPA)",
      "General Data Protection Regulation (GDPR) Article 9",
      "State privacy laws apply"
    ],
    consentExpiry: "2025-12-31"
  };

  const [consentAgreed, setConsentAgreed] = React.useState(false);
  const [cameraActive, setCameraActive] = React.useState(false);
  const [attempts, setAttempts] = React.useState(0);
  const [bestTemplate, setBestTemplate] = React.useState(null);
  const [complianceFlags, setComplianceFlags] = React.useState({
    bipa: true,
    gdpr: false,
    statePrivacy: true
  });
  const [enrolled, setEnrolled] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  const startEnrollment = () => {
    setCameraActive(true);
  };

  const captureImage = () => {
    if (attempts < 3) {
      const newAttempt = attempts + 1;
      setAttempts(newAttempt);
      
      // Simulate template quality scoring
      const qualityScore = Math.floor(Math.random() * 40) + 60; // 60-99
      
      if (!bestTemplate || qualityScore > bestTemplate.quality) {
        setBestTemplate({
          attempt: newAttempt,
          quality: qualityScore
        });
      }
    }
    
    if (attempts === 2) {
      setTimeout(() => setEnrolled(true), 1000);
    }
  };

  const deleteEnrollment = () => {
    setEnrolled(false);
    setAttempts(0);
    setBestTemplate(null);
    setShowDeleteConfirm(false);
  };

  return (
    <div style={{display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fa'}}>
      {/* Sidebar */}
      <div style={{width: 240, backgroundColor: '#2c3e50', color: 'white', padding: '20px 0'}}>
        <div style={{padding: '0 20px 20px', borderBottom: '1px solid #34495e'}}>
          <h1 style={{color: '#3498db', fontSize: 20, margin: 0}}>WorkPulse</h1>
          <p style={{color: '#bdc3c7', fontSize: 12, marginTop: 5}}>Attendance Management</p>
        </div>
        <nav>
          {['Dashboard', 'Clock In/Out', 'Attendance Calendar', 'Leave Request', 'Team Attendance', 'Shift Roster', 'Payroll Export'].map((item) => (
            <div key={item} style={{padding: '12px 20px', cursor: 'pointer'}}>{item}</div>
          ))}
          <div style={{backgroundColor: '#3498db', padding: '12px 20px', cursor: 'pointer'}}>Facial Enrollment</div>
          {['Settings', 'Admin Policy Manager', 'Audit Trail'].map((item) => (
            <div key={item} style={{padding: '12px 20px', cursor: 'pointer'}}>{item}</div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{flex: 1, padding: 30}}>
        <div style={{maxWidth: 1000, margin: '0 auto'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30}}>
            <div>
              <h1 style={{margin: 0, color: '#2c3e50', fontSize: 28}}>Facial Enrollment</h1>
              <p style={{color: '#7f8c8d', marginTop: 5}}>Manage biometric identification for secure clock-ins</p>
            </div>
            <div style={{textAlign: 'right'}}>
              <p style={{margin: 0, fontWeight: 500}}>{employee.first_name} {employee.last_name}</p>
              <p style={{margin: 0, color: '#7f8c8d', fontSize: 14}}>{employee.department} • {employee.location}</p>
            </div>
          </div>

          <div style={{backgroundColor: 'white', borderRadius: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: 30}}>
            {!enrolled ? (
              <>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25}}>
                  <h2 style={{margin: 0, color: '#2c3e50'}}>Biometric Consent</h2>
                  <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    <span style={{fontSize: 14, color: '#7f8c8d'}}>Status:</span>
                    <span style={{padding: '4px 12px', backgroundColor: '#f1c40f', color: 'white', borderRadius: 20, fontSize: 12}}>
                      Not Enrolled
                    </span>
                  </div>
                </div>

                <div style={{borderBottom: '1px solid #ecf0f1', paddingBottom: 20, marginBottom: 25}}>
                  <h3 style={{color: '#2c3e50', marginBottom: 15}}>Jurisdiction-Specific Regulations</h3>
                  <div style={{backgroundColor: '#f8f9fa', padding: 15, borderRadius: 8, borderLeft: '4px solid #3498db'}}>
                    <p style={{fontWeight: 600, margin: '0 0 10px'}}>{jurisdiction.name} Compliance Requirements:</p>
                    <ul style={{margin: 0, paddingLeft: 20}}>
                      {jurisdiction.regulations.map((reg, i) => (
                        <li key={i} style={{marginBottom: 8}}>{reg}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{marginBottom: 25}}>
                  <h3 style={{color: '#2c3e50', marginBottom: 15}}>Consent Agreement</h3>
                  <div style={{backgroundColor: '#f8f9fa', padding: 20, borderRadius: 8, maxHeight: 150, overflowY: 'auto', border: '1px solid #ddd'}}>
                    <p style={{fontSize: 14, lineHeight: 1.6}}>
                      I understand that my facial biometric data will be collected, processed, and stored securely for 
                      authentication purposes only. This data will be encrypted and retained in compliance with applicable 
                      privacy laws including {jurisdiction.regulations[0]} and GDPR. My consent expires on {jurisdiction.consentExpiry}.
                    </p>
                  </div>
                  
                  <label style={{display: 'flex', alignItems: 'center', marginTop: 15, cursor: 'pointer'}}>
                    <input 
                      type="checkbox" 
                      checked={consentAgreed}
                      onChange={(e) => setConsentAgreed(e.target.checked)}
                      style={{marginRight: 10, transform: 'scale(1.2)'}}
                    />
                    <span style={{fontSize: 14}}>I agree to the terms and consent to biometric enrollment</span>
                  </label>
                </div>

                {consentAgreed && (
                  <div>
                    <h3 style={{color: '#2c3e50', marginBottom: 15}}>Facial Capture Process</h3>
                    
                    {!cameraActive ? (
                      <div style={{textAlign: 'center', padding: 30}}>
                        <button 
                          onClick={startEnrollment}
                          style={{
                            backgroundColor: '#27ae60',
                            color: 'white',
                            border: 'none',
                            padding: '12px 25px',
                            borderRadius: 6,
                            fontSize: 16,
                            cursor: 'pointer',
                            fontWeight: 600
                          }}
                        >
                          Start Camera
                        </button>
                        <p style={{marginTop: 15, color: '#7f8c8d', fontSize: 14}}>
                          Please ensure good lighting and position yourself directly in front of the camera
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div style={{display: 'flex', gap: 30, marginBottom: 25}}>
                          <div style={{flex: 1}}>
                            <div style={{backgroundColor: '#34495e', height: 300, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: 10}}>
                              Camera Feed Placeholder
                            </div>
                            <p style={{textAlign: 'center', color: '#7f8c8d', fontSize: 14, margin: 0}}>
                              Neutral expression • Directly facing camera • Good lighting
                            </p>
                          </div>
                          
                          <div style={{flex: 1}}>
                            <div style={{backgroundColor: '#ecf0f1', height: 300, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7f8c8d'}}>
                              Capture Preview
                            </div>
                            <div style={{display: 'flex', justifyContent: 'center', marginTop: 15}}>
                              <button 
                                onClick={captureImage}
                                disabled={attempts >= 3}
                                style={{
                                  backgroundColor: attempts < 3 ? '#3498db' : '#95a5a6',
                                  color: 'white',
                                  border: 'none',
                                  padding: '10px 20px',
                                  borderRadius: 6,
                                  cursor: attempts < 3 ? 'pointer' : 'not-allowed',
                                  fontWeight: 600
                                }}
                              >
                                Capture Attempt {attempts + 1}/3
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 style={{color: '#2c3e50', marginBottom: 10}}>Capture Progress</h4>
                          <div style={{display: 'flex', gap: 10, alignItems: 'center'}}>
                            {[1, 2, 3].map(i => (
                              <div key={i} style={{display: 'flex', alignItems: 'center'}}>
                                <div style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: '50%',
                                  backgroundColor: i <= attempts ? '#27ae60' : '#ecf0f1',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: 'white',
                                  fontWeight: 'bold'
                                }}>
                                  {i}
                                </div>
                                {i < 3 && <div style={{height: 2, width: 30, backgroundColor: '#ecf0f1'}}></div>}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25}}>
                  <h2 style={{margin: 0, color: '#2c3e50'}}>Enrollment Complete</h2>
                  <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                    <span style={{fontSize: 14, color: '#7f8c8d'}}>Status:</span>
                    <span style={{padding: '4px 12px', backgroundColor: '#27ae60', color: 'white', borderRadius: 20, fontSize: 12}}>
                      Enrolled
                    </span>
                  </div>
                </div>
                
                <div style={{backgroundColor: '#f8f9fa', padding: 20, borderRadius: 8, marginBottom: 25}}>
                  <h3 style={{color: '#2c3e50', marginTop: 0}}>Selected Template</h3>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <p style={{margin: '0 0 10px'}}>Best Quality Template: Attempt #{bestTemplate.attempt}</p>
                      <p style={{margin: 0}}>Quality Score: {bestTemplate.quality}%</p>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <p style={{margin: 0, fontSize: 14, color: '#7f8c8d'}}>Enrollment Date</p>
                      <p style={{margin: 0, fontWeight: 600}}>June 15, 2023</p>
                    </div>
                  </div>
                </div>
                
                <div style={{marginBottom: 25}}>
                  <h3 style={{color: '#2c3e50', marginBottom: 15}}>Compliance Status</h3>
                  <div style={{display: 'flex', gap: 15}}>
                    {Object.entries(complianceFlags).map(([key, value]) => (
                      <div key={key} style={{
                        flex: 1,
                        padding: 15,
                        backgroundColor: value ? '#d5f5e3' : '#fadbd8',
                        borderRadius: 6,
                        textAlign: 'center'
                      }}>
                        <div style={{fontWeight: 600, marginBottom: 5}}>
                          {key.toUpperCase()}
                        </div>
                        <div style={{fontSize: 14}}>
                          {value ? 'Compliant' : 'Not Compliant'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25}}>
                  <div>
                    <h3 style={{color: '#2c3e50', marginBottom: 5}}>Consent Expiration</h3>
                    <p style={{margin: 0, fontSize: 14, color: '#7f8c8d'}}>
                      Your consent expires on December 31, 2025 (in 847 days)
                    </p>
                  </div>
                  <button 
                    onClick={() => setShowDeleteConfirm(true)}
                    style={{
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: 6,
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Delete Enrollment
                  </button>
                </div>
                
                {showDeleteConfirm && (
                  <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                  }}>
                    <div style={{
                      backgroundColor: 'white',
                      padding: 30,
                      borderRadius: 10,
                      maxWidth: 400,
                      textAlign: 'center'
                    }}>
                      <h3 style={{margin: '0 0 15px', color: '#2c3e50'}}>Confirm Deletion</h3>
                      <p style={{margin: '0 0 20px', color: '#7f8c8d'}}>
                        Are you sure you want to delete your facial enrollment? This action cannot be undone.
                      </p>
                      <div style={{display: 'flex', justifyContent: 'center', gap: 10}}>
                        <button 
                          onClick={() => setShowDeleteConfirm(false)}
                          style={{
                            backgroundColor: '#95a5a6',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: 6,
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={deleteEnrollment}
                          style={{
                            backgroundColor: '#e74c3c',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: 6,
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div style={{textAlign: 'center', marginTop: 20, color: '#7f8c8d', fontSize: 14}}>
            <p>All biometric data is encrypted and stored in compliance with regional regulations</p>
          </div>
        </div>
      </div>
    </div>
  );
}