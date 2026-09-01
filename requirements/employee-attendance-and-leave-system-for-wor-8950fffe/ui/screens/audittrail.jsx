function AuditTrail() {
  // Mock data
  const mockAuditLogs = [
    {
      id: 1,
      entity_type: 'attendance',
      entity_id: 1001,
      action: 'manual_correction',
      old_value: { clock_in_time: '09:15:00', status: 'late' },
      new_value: { clock_in_time: '09:00:00', status: 'present' },
      actor_id: 2001,
      actor_name: 'HR Manager',
      actor_role: 'HR',
      reason: 'Employee forgot to clock in',
      ip_address: '192.168.1.105',
      created_at: '2023-06-15T09:30:00Z'
    },
    {
      id: 2,
      entity_type: 'leave',
      entity_id: 3002,
      action: 'status_change',
      old_value: { status: 'pending' },
      new_value: { status: 'approved' },
      actor_id: 2002,
      actor_name: 'Department Head',
      actor_role: 'Manager',
      reason: 'Annual leave approved',
      ip_address: '203.0.113.42',
      created_at: '2023-06-14T14:22:00Z'
    },
    {
      id: 3,
      entity_type: 'shift',
      entity_id: 4003,
      action: 'assignment_change',
      old_value: { shift_id: 5 },
      new_value: { shift_id: 7 },
      actor_id: 2003,
      actor_name: 'Shift Coordinator',
      actor_role: 'Admin',
      reason: 'Employee requested schedule change',
      ip_address: '198.51.100.78',
      created_at: '2023-06-13T11:45:00Z'
    }
  ];

  const [logs, setLogs] = React.useState(mockAuditLogs);
  const [dateRange, setDateRange] = React.useState({ start: '2023-06-01', end: '2023-06-30' });
  const [entityType, setEntityType] = React.useState('all');
  const [actorSearch, setActorSearch] = React.useState('');
  const [selectedLog, setSelectedLog] = React.useState(null);
  const [showDiff, setShowDiff] = React.useState(false);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({ ...prev, [name]: value }));
  };

  const handleFilter = () => {
    // In a real app, this would filter the data
    console.log('Filtering with:', { dateRange, entityType, actorSearch });
  };

  const handleExport = () => {
    alert('Audit logs exported successfully!');
  };

  const handleLogSelect = (log) => {
    setSelectedLog(log);
    setShowDiff(true);
  };

  const filteredLogs = logs.filter(log => {
    const matchesEntityType = entityType === 'all' || log.entity_type === entityType;
    const matchesActor = actorSearch === '' || 
      log.actor_name.toLowerCase().includes(actorSearch.toLowerCase()) ||
      log.actor_role.toLowerCase().includes(actorSearch.toLowerCase());
    return matchesEntityType && matchesActor;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', backgroundColor: '#2c3e50', color: 'white', padding: '20px 0' }}>
        <h2 style={{ padding: '0 20px 20px', borderBottom: '1px solid #34495e' }}>WorkPulse Admin</h2>
        <nav>
          <a href="/" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Dashboard</a>
          <a href="/clock" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Clock In/Out</a>
          <a href="/attendance" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Attendance</a>
          <a href="/leave/request" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Leave Requests</a>
          <a href="/team" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Team Attendance</a>
          <a href="/shifts" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Shift Roster</a>
          <a href="/payroll" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Payroll Export</a>
          <a href="/profile/face" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Facial Enrollment</a>
          <a href="/settings" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Settings</a>
          <a href="/admin/policies" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Policies</a>
          <a href="/admin/audit" style={{ display: 'block', padding: '12px 20px', color: '#3498db', backgroundColor: '#34495e', textDecoration: 'none' }}>Audit Trail</a>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '20px', marginBottom: '20px' }}>
          <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>Audit Trail</h1>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#34495e' }}>Start Date</label>
              <input 
                type="date" 
                name="start"
                value={dateRange.start}
                onChange={handleDateChange}
                style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '150px' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#34495e' }}>End Date</label>
              <input 
                type="date" 
                name="end"
                value={dateRange.end}
                onChange={handleDateChange}
                style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '150px' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#34495e' }}>Entity Type</label>
              <select 
                value={entityType}
                onChange={(e) => setEntityType(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '150px' }}
              >
                <option value="all">All Entities</option>
                <option value="attendance">Attendance</option>
                <option value="leave">Leave</option>
                <option value="shift">Shift</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500', color: '#34495e' }}>Actor Search</label>
              <input 
                type="text" 
                placeholder="Name or role..."
                value={actorSearch}
                onChange={(e) => setActorSearch(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', width: '180px' }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button 
                onClick={handleFilter}
                style={{ padding: '8px 16px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' }}
              >
                Apply Filters
              </button>
              <button 
                onClick={handleExport}
                style={{ padding: '8px 16px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Export Logs
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Audit Log List */}
          <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '20px' }}>
            <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>Audit Events</h2>
            <div style={{ overflowY: 'auto', maxHeight: '600px' }}>
              {filteredLogs.map(log => (
                <div 
                  key={log.id} 
                  onClick={() => handleLogSelect(log)}
                  style={{ 
                    padding: '15px', 
                    borderBottom: '1px solid #eee', 
                    cursor: 'pointer',
                    backgroundColor: selectedLog?.id === log.id ? '#e3f2fd' : 'transparent'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '600', color: '#2c3e50' }}>
                      {log.entity_type.charAt(0).toUpperCase() + log.entity_type.slice(1)} {log.action.replace('_', ' ')}
                    </span>
                    <span style={{ color: '#7f8c8d', fontSize: '14px' }}>
                      {new Date(log.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#3498db' }}>{log.actor_name} ({log.actor_role})</span>
                    <span style={{ color: '#95a5a6' }}>{log.ip_address}</span>
                  </div>
                  <div style={{ marginTop: '5px', fontSize: '13px', color: '#7f8c8d' }}>
                    {log.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diff View */}
          {showDiff && selectedLog && (
            <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#2c3e50' }}>Change Details</h2>
                <button 
                  onClick={() => setShowDiff(false)}
                  style={{ background: 'none', border: 'none', color: '#95a5a6', cursor: 'pointer', fontSize: '20px' }}
                >
                  &times;
                </button>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#34495e', marginBottom: '10px' }}>Entity Information</h3>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div>
                    <p style={{ margin: '5px 0', color: '#7f8c8d' }}><strong>ID:</strong> {selectedLog.entity_id}</p>
                    <p style={{ margin: '5px 0', color: '#7f8c8d' }}><strong>Type:</strong> {selectedLog.entity_type}</p>
                  </div>
                  <div>
                    <p style={{ margin: '5px 0', color: '#7f8c8d' }}><strong>Action:</strong> {selectedLog.action.replace('_', ' ')}</p>
                    <p style={{ margin: '5px 0', color: '#7f8c8d' }}><strong>Date:</strong> {new Date(selectedLog.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#34495e', marginBottom: '10px' }}>Actor Information</h3>
                <p style={{ margin: '5px 0', color: '#7f8c8d' }}><strong>Name:</strong> {selectedLog.actor_name}</p>
                <p style={{ margin: '5px 0', color: '#7f8c8d' }}><strong>Role:</strong> {selectedLog.actor_role}</p>
                <p style={{ margin: '5px 0', color: '#7f8c8d' }}><strong>IP Address:</strong> {selectedLog.ip_address}</p>
              </div>
              
              <div>
                <h3 style={{ color: '#34495e', marginBottom: '10px' }}>Changes</h3>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: '#e74c3c', marginBottom: '10px' }}>Before</h4>
                    <pre style={{ backgroundColor: '#fdf6f6', padding: '15px', borderRadius: '4px', fontSize: '14px', overflowX: 'auto' }}>
                      {JSON.stringify(selectedLog.old_value, null, 2)}
                    </pre>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: '#27ae60', marginBottom: '10px' }}>After</h4>
                    <pre style={{ backgroundColor: '#f6fdf6', padding: '15px', borderRadius: '4px', fontSize: '14px', overflowX: 'auto' }}>
                      {JSON.stringify(selectedLog.new_value, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ color: '#34495e', marginBottom: '10px' }}>Reason</h3>
                <p style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px', borderLeft: '4px solid #3498db' }}>
                  {selectedLog.reason}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Compliance Actions */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '20px', marginTop: '20px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '15px' }}>Compliance Actions</h2>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button style={{ padding: '10px 20px', backgroundColor: '#9b59b6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Generate Compliance Report
            </button>
            <button style={{ padding: '10px 20px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Review Manual Corrections
            </button>
            <button style={{ padding: '10px 20px', backgroundColor: '#34495e', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              View Offline Sync Logs
            </button>
            <button style={{ padding: '10px 20px', backgroundColor: '#16a085', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              View Activity Timeline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
