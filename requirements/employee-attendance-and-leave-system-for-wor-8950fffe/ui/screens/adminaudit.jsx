function AdminAudit() {
  // Mock data
  const mockAuditLogs = [
    {
      id: 1,
      entity_type: 'attendance',
      entity_id: 101,
      action: 'manual_correction',
      old_value: { clock_in_time: '09:15:00', status: 'late' },
      new_value: { clock_in_time: '09:00:00', status: 'present' },
      actor_id: 501,
      actor_name: 'HR Manager',
      actor_role: 'HR',
      reason: 'Employee forgot to clock in',
      ip_address: '192.168.1.105',
      created_at: '2023-06-15T09:30:00Z'
    },
    {
      id: 2,
      entity_type: 'leave',
      entity_id: 205,
      action: 'status_change',
      old_value: { status: 'pending' },
      new_value: { status: 'approved' },
      actor_id: 502,
      actor_name: 'Department Head',
      actor_role: 'Manager',
      reason: 'Annual leave approved',
      ip_address: '203.0.113.42',
      created_at: '2023-06-15T14:22:00Z'
    },
    {
      id: 3,
      entity_type: 'shift',
      entity_id: 301,
      action: 'assignment_change',
      old_value: { shift_id: 1 },
      new_value: { shift_id: 2 },
      actor_id: 503,
      actor_name: 'Shift Coordinator',
      actor_role: 'Admin',
      reason: 'Night shift rotation',
      ip_address: '198.51.100.78',
      created_at: '2023-06-16T11:05:00Z'
    }
  ];

  const mockOfflineLogs = [
    {
      id: 101,
      employee_id: 112,
      employee_name: 'Robert Chen',
      operation_type: 'clock_in',
      local_timestamp: '2023-06-14T08:45:00Z',
      device_info: { userAgent: 'Mobile Safari', platform: 'iOS' },
      sync_status: 'synced',
      conflict_resolution: null,
      synced_at: '2023-06-14T12:30:00Z'
    },
    {
      id: 102,
      employee_id: 134,
      employee_name: 'Priya Sharma',
      operation_type: 'clock_out',
      local_timestamp: '2023-06-14T18:30:00Z',
      device_info: { userAgent: 'Chrome', platform: 'Android' },
      sync_status: 'conflict',
      conflict_resolution: 'manager_override',
      synced_at: '2023-06-15T09:15:00Z'
    }
  ];

  // State
  const [filters, setFilters] = React.useState({
    dateRange: { start: '2023-06-01', end: '2023-06-30' },
    entityType: 'all',
    actor: ''
  });
  
  const [selectedLog, setSelectedLog] = React.useState(null);
  const [showDiff, setShowDiff] = React.useState(false);
  
  // Handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleViewDiff = (log) => {
    setSelectedLog(log);
    setShowDiff(true);
  };
  
  const handleCloseDiff = () => {
    setShowDiff(false);
    setSelectedLog(null);
  };
  
  const handleExportLogs = () => {
    alert('Audit logs exported successfully!');
  };
  
  const handleGenerateReport = () => {
    alert('Compliance report generation started. You will receive it via email shortly.');
  };
  
  // Filter audit logs
  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesEntityType = filters.entityType === 'all' || log.entity_type === filters.entityType;
    const matchesActor = !filters.actor || log.actor_name.toLowerCase().includes(filters.actor.toLowerCase());
    const logDate = new Date(log.created_at);
    const startDate = new Date(filters.dateRange.start);
    const endDate = new Date(filters.dateRange.end);
    const matchesDate = logDate >= startDate && logDate <= endDate;
    
    return matchesEntityType && matchesActor && matchesDate;
  });
  
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Sidebar */}
      <div style={{ width: 240, backgroundColor: '#1e293b', color: 'white', padding: '24px 16px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 24 }}>WorkPulse</h1>
        <nav>
          <a href="/" style={{ display: 'block', padding: '10px 12px', color: '#94a3b8', textDecoration: 'none', borderRadius: 4, marginBottom: 4 }}>Dashboard</a>
          <a href="/clock" style={{ display: 'block', padding: '10px 12px', color: '#94a3b8', textDecoration: 'none', borderRadius: 4, marginBottom: 4 }}>Clock Interface</a>
          <a href="/attendance" style={{ display: 'block', padding: '10px 12px', color: '#94a3b8', textDecoration: 'none', borderRadius: 4, marginBottom: 4 }}>Attendance</a>
          <a href="/leave/new" style={{ display: 'block', padding: '10px 12px', color: '#94a3b8', textDecoration: 'none', borderRadius: 4, marginBottom: 4 }}>New Leave</a>
          <a href="/leave/pending" style={{ display: 'block', padding: '10px 12px', color: '#94a3b8', textDecoration: 'none', borderRadius: 4, marginBottom: 4 }}>Leave Approvals</a>
          <a href="/leave/calendar" style={{ display: 'block', padding: '10px 12px', color: '#94a3b8', textDecoration: 'none', borderRadius: 4, marginBottom: 4 }}>My Leave</a>
          <a href="/shifts" style={{ display: 'block', padding: '10px 12px', color: '#94a3b8', textDecoration: 'none', borderRadius: 4, marginBottom: 4 }}>Shift Roster</a>
          <a href="/payroll" style={{ display: 'block', padding: '10px 12px', color: '#94a3b8', textDecoration: 'none', borderRadius: 4, marginBottom: 4 }}>Payroll Export</a>
          <a href="/profile" style={{ display: 'block', padding: '10px 12px', color: '#94a3b8', textDecoration: 'none', borderRadius: 4, marginBottom: 4 }}>My Profile</a>
          <a href="/sync" style={{ display: 'block', padding: '10px 12px', color: '#94a3b8', textDecoration: 'none', borderRadius: 4, marginBottom: 4 }}>Offline Sync</a>
          <a href="/admin/policies" style={{ display: 'block', padding: '10px 12px', color: '#94a3b8', textDecoration: 'none', borderRadius: 4, marginBottom: 4 }}>Policies</a>
          <a href="/admin/audit" style={{ display: 'block', padding: '10px 12px', color: 'white', backgroundColor: '#334155', borderRadius: 4, marginBottom: 4 }}>Audit Trail</a>
        </nav>
      </div>
      
      {/* Main Content */}
      <div style={{ flex: 1, padding: '24px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#0f172a' }}>Audit Trail & Compliance</h1>
          <div>
            <button 
              onClick={handleExportLogs}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                padding: '8px 16px',
                fontWeight: 500,
                cursor: 'pointer',
                marginRight: 12
              }}
            >
              Export Logs
            </button>
            <button 
              onClick={handleGenerateReport}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                padding: '8px 16px',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              Generate Report
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div style={{ backgroundColor: 'white', borderRadius: 8, padding: 20, marginBottom: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#334155', marginBottom: 6 }}>Date Range</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <input 
                  type="date" 
                  value={filters.dateRange.start}
                  onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                  style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 4 }}
                />
                <span style={{ alignSelf: 'center' }}>to</span>
                <input 
                  type="date" 
                  value={filters.dateRange.end}
                  onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                  style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 4 }}
                />
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#334155', marginBottom: 6 }}>Entity Type</label>
              <select 
                value={filters.entityType}
                onChange={(e) => handleFilterChange('entityType', e.target.value)}
                style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 4, minWidth: 150 }}
              >
                <option value="all">All Entities</option>
                <option value="attendance">Attendance</option>
                <option value="leave">Leave</option>
                <option value="shift">Shift</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#334155', marginBottom: 6 }}>Actor</label>
              <input 
                type="text" 
                placeholder="Search by actor name"
                value={filters.actor}
                onChange={(e) => handleFilterChange('actor', e.target.value)}
                style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 4, minWidth: 200 }}
              />
            </div>
          </div>
        </div>
        
        {/* Audit Log Table */}
        <div style={{ backgroundColor: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden', marginBottom: 32 }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a' }}>Audit Logs</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Timestamp</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Entity</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Action</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Actor</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>IP Address</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#334155' }}>{new Date(log.created_at).toLocaleString()}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#334155' }}>
                      <span style={{ textTransform: 'capitalize' }}>{log.entity_type}</span> #{log.entity_id}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#334155' }}>{log.action.replace('_', ' ')}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#334155' }}>
                      <div>{log.actor_name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{log.actor_role}</div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#334155' }}>{log.ip_address}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem' }}>
                      <button 
                        onClick={() => handleViewDiff(log)}
                        style={{
                          backgroundColor: '#f1f5f9',
                          color: '#0f172a',
                          border: 'none',
                          borderRadius: 4,
                          padding: '6px 12px',
                          fontSize: '0.875rem',
                          cursor: 'pointer'
                        }}
                      >
                        View Changes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Offline Sync Audit */}
        <div style={{ backgroundColor: 'white', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a' }}>Offline Sync Audit</h2>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9' }}>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Employee</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Operation</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Timestamp</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Device</th>
                  <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '0.875rem', fontWeight: 600, color: '#64748b' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockOfflineLogs.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#334155' }}>{log.employee_name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#334155' }}>{log.operation_type.replace('_', ' ')}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#334155' }}>{new Date(log.local_timestamp).toLocaleString()}</td>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: '#334155' }}>
                      <div>{log.device_info.userAgent}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{log.device_info.platform}</div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '0.875rem' }}>
                      <span 
                        style={{
                          padding: '4px 8px',
                          borderRadius: 4,
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          backgroundColor: log.sync_status === 'synced' ? '#dcfce7' : '#fee2e2',
                          color: log.sync_status === 'synced' ? '#166534' : '#991b1b'
                        }}
                      >
                        {log.sync_status}
                      </span>
                      {log.conflict_resolution && (
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
                          Resolved: {log.conflict_resolution.replace('_', ' ')}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Diff Viewer Modal */}
      {showDiff && selectedLog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: 8,
            width: '80%',
            maxWidth: 800,
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#0f172a' }}>
                Changes for {selectedLog.entity_type} #{selectedLog.entity_id}
              </h2>
              <button 
                onClick={handleCloseDiff}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#94a3b8'
                }}
              >
                &times;
              </button>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>Reason</h3>
                <p style={{ color: '#334155' }}>{selectedLog.reason}</p>
              </div>
              
              <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>Before</h3>
                  <pre style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 4,
                    padding: 16,
                    fontSize: '0.875rem',
                    color: '#334155',
                    overflow: 'auto'
                  }}>
                    {JSON.stringify(selectedLog.old_value, null, 2)}
                  </pre>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>After</h3>
                  <pre style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 4,
                    padding: 16,
                    fontSize: '0.875rem',
                    color: '#334155',
                    overflow: 'auto'
                  }}>
                    {JSON.stringify(selectedLog.new_value, null, 2)}
                  </pre>
                </div>
              </div>
              
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Actor</div>
                    <div style={{ fontWeight: 500, color: '#0f172a' }}>{selectedLog.actor_name} ({selectedLog.actor_role})</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>IP Address</div>
                    <div style={{ fontWeight: 500, color: '#0f172a' }}>{selectedLog.ip_address}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Timestamp</div>
                    <div style={{ fontWeight: 500, color: '#0f172a' }}>{new Date(selectedLog.created_at).toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}