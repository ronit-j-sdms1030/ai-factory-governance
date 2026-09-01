function PayrollExport() {
  // Mock data
  const [selectedMonth, setSelectedMonth] = React.useState('2023-10');
  const [isLocked, setIsLocked] = React.useState(false);
  const [csvGenerated, setCsvGenerated] = React.useState(false);
  const [policyVersion, setPolicyVersion] = React.useState('v2.1.4');
  
  // Mock audit log data
  const auditLogs = [
    { id: 1, actor: 'HR Manager (ID: 1001)', timestamp: '2023-10-05 14:30:22', action: 'Generated payroll export' },
    { id: 2, actor: 'System', timestamp: '2023-10-01 00:05:10', action: 'Locked period' },
    { id: 3, actor: 'Finance Lead (ID: 2005)', timestamp: '2023-09-30 18:45:00', action: 'Generated payroll export' }
  ];
  
  // Mock API keys
  const [apiKeys, setApiKeys] = React.useState([
    { id: 'key_1', name: 'QuickBooks Integration', lastUsed: '2023-10-04 09:15:33', status: 'Active' },
    { id: 'key_2', name: 'Zoho Payroll Sync', lastUsed: '2023-09-28 16:42:11', status: 'Active' }
  ]);
  
  // Handlers
  const handleLockPeriod = () => {
    setIsLocked(true);
    alert(`Payroll for ${selectedMonth} has been locked.`);
  };
  
  const handleGenerateCSV = () => {
    setCsvGenerated(true);
    alert('Payroll CSV generated successfully!');
  };
  
  const handleDownload = () => {
    alert('Downloading payroll_export_2023-10.csv');
  };
  
  const handleRevokeKey = (id) => {
    setApiKeys(apiKeys.map(key => 
      key.id === id ? {...key, status: 'Revoked'} : key
    ));
  };
  
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', backgroundColor: '#2c3e50', color: 'white', padding: '20px 0' }}>
        <h2 style={{ padding: '0 20px 20px', borderBottom: '1px solid #34495e' }}>WorkPulse</h2>
        <nav>
          {['Dashboard', 'Clock In/Out', 'Attendance', 'Leave Request', 'Leave Approvals', 'My Leave', 'Shift Roster', 'Payroll Export', 'My Profile', 'Offline Sync', 'Policies', 'Audit Trail'].map((item, index) => {
            const paths = ['/', '/clock', '/attendance', '/leave/new', '/leave/pending', '/leave/calendar', '/shifts', '/payroll', '/profile', '/sync', '/admin/policies', '/admin/audit'];
            return (
              <a 
                key={index} 
                href={paths[index]} 
                style={{
                  display: 'block',
                  padding: '12px 20px',
                  color: paths[index] === '/payroll' ? '#3498db' : 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  fontWeight: paths[index] === '/payroll' ? '600' : '400',
                  borderLeft: paths[index] === '/payroll' ? '4px solid #3498db' : 'none',
                  backgroundColor: paths[index] === '/payroll' ? 'rgba(52, 152, 219, 0.1)' : 'transparent'
                }}
              >
                {item}
              </a>
            );
          })}
        </nav>
      </div>
      
      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#2c3e50', margin: 0 }}>Payroll Export</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Policy Version:</span>
              <span style={{ fontWeight: '600', color: '#3498db' }}>{policyVersion}</span>
            </div>
          </div>
        </div>
        
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '25px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#2c3e50' }}>Select Payroll Month</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <input 
                  type="month" 
                  value={selectedMonth} 
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '16px' }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: isLocked ? '#e74c3c' : '#2ecc71'
                  }}></div>
                  <span>{isLocked ? 'Locked' : 'Unlocked'}</span>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleLockPeriod}
                disabled={isLocked}
                style={{
                  padding: '10px 20px',
                  backgroundColor: isLocked ? '#bdc3c7' : '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4H3.5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5H11z"/>
                </svg>
                Lock Period
              </button>
              
              <button 
                onClick={handleGenerateCSV}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg>
                Generate CSV
              </button>
              
              <button 
                onClick={handleDownload}
                disabled={!csvGenerated}
                style={{
                  padding: '10px 20px',
                  backgroundColor: csvGenerated ? '#2ecc71' : '#bdc3c7',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: csvGenerated ? 'pointer' : 'not-allowed',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg>
                Download
              </button>
            </div>
          </div>
          
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '6px', border: '1px solid #e9ecef' }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>Generated CSV will include:</h3>
            <ul style={{ color: '#34495e', paddingLeft: '20px' }}>
              <li>employee_id</li>
              <li>days_present</li>
              <li>late_count</li>
              <li>overtime_hours</li>
              <li>leave_days</li>
            </ul>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* API Keys Section */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '20px' }}>API Key Management</h2>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#2c3e50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500'
              }}>
                + New Key
              </button>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
                    <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Name</th>
                    <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Last Used</th>
                    <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Status</th>
                    <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map(key => (
                    <tr key={key.id}>
                      <td style={{ padding: '12px 15px', borderBottom: '1px solid #e9ecef' }}>{key.name}</td>
                      <td style={{ padding: '12px 15px', borderBottom: '1px solid #e9ecef' }}>{key.lastUsed}</td>
                      <td style={{ padding: '12px 15px', borderBottom: '1px solid #e9ecef' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: key.status === 'Active' ? '#d4edda' : '#f8d7da',
                          color: key.status === 'Active' ? '#155724' : '#721c24',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {key.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 15px', borderBottom: '1px solid #e9ecef' }}>
                        <button 
                          onClick={() => handleRevokeKey(key.id)}
                          disabled={key.status === 'Revoked'}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: key.status === 'Revoked' ? '#bdc3c7' : '#e74c3c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: key.status === 'Revoked' ? 'not-allowed' : 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          {key.status === 'Revoked' ? 'Revoked' : 'Revoke'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Audit Log */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '25px' }}>
            <h2 style={{ margin: '0 0 20px 0', color: '#2c3e50', fontSize: '20px' }}>Audit Log</h2>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {auditLogs.map(log => (
                <div key={log.id} style={{ padding: '15px 0', borderBottom: '1px solid #eee' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '500', color: '#2c3e50' }}>{log.actor}</span>
                    <span style={{ color: '#7f8c8d', fontSize: '14px' }}>{log.timestamp}</span>
                  </div>
                  <div style={{ color: '#34495e' }}>{log.action}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}