function AuditTrail() {
  // Mock data for audit logs
  const mockAuditLogs = [
    {
      id: 1,
      entity_type: 'attendance',
      entity_id: 101,
      action: 'update',
      old_value: { clock_in_time: '09:15:00', status: 'late' },
      new_value: { clock_in_time: '09:00:00', status: 'present' },
      actor_id: 201,
      actor_role: 'manager',
      reason: 'Employee provided valid excuse',
      ip_address: '192.168.1.105',
      created_at: '2023-05-15T14:30:00Z'
    },
    {
      id: 2,
      entity_type: 'leave',
      entity_id: 502,
      action: 'approve',
      old_value: { status: 'pending' },
      new_value: { status: 'approved' },
      actor_id: 301,
      actor_role: 'hr_specialist',
      reason: 'Medical certificate provided',
      ip_address: '203.0.113.42',
      created_at: '2023-05-16T09:15:00Z'
    },
    {
      id: 3,
      entity_type: 'shift_assignment',
      entity_id: 75,
      action: 'create',
      old_value: {},
      new_value: { employee_id: 125, shift_id: 4, effective_from: '2023-06-01' },
      actor_id: 201,
n      actor_role: 'manager',
      reason: 'New project assignment',
      ip_address: '198.51.100.23',
      created_at: '2023-05-17T11:45:00Z'
    }
  ];

  // Mock data for employees
  const mockEmployees = [
    { id: 201, name: 'Sarah Johnson' },
    { id: 301, name: 'Michael Chen' },
    { id: 125, name: 'David Rodriguez' }
  ];

  // State for filters
  const [filters, setFilters] = React.useState({
    dateRange: { start: '2023-05-01', end: '2023-05-31' },
    entityType: 'all',
    actor: 'all'
  });

  // State for selected log
  const [selectedLog, setSelectedLog] = React.useState(null);

  // State for offline sync status
  const [offlineSyncStatus, setOfflineSyncStatus] = React.useState('synced');

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  // Handle log selection
  const handleLogSelect = (log) => {
    setSelectedLog(log);
  };

  // Handle export
  const handleExport = () => {
    alert('Audit logs exported successfully!');
  };

  // Handle offline sync
  const handleOfflineSync = () => {
    setOfflineSyncStatus('syncing');
    setTimeout(() => {
      setOfflineSyncStatus('synced');
      alert('Offline audit logs synchronized successfully!');
    }, 2000);
  };

  // Filter audit logs based on current filters
  const filteredLogs = mockAuditLogs.filter(log => {
    const logDate = new Date(log.created_at);
    const startDate = new Date(filters.dateRange.start);
    const endDate = new Date(filters.dateRange.end);
    
    const dateMatch = logDate >= startDate && logDate <= endDate;
    const entityMatch = filters.entityType === 'all' || log.entity_type === filters.entityType;
    const actorMatch = filters.actor === 'all' || log.actor_id.toString() === filters.actor;
    
    return dateMatch && entityMatch && actorMatch;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      {/* Main Content */}
      <div style={{ flex: 1, padding: '24px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ color: '#2d3748', fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Audit Trail</h1>
          <p style={{ color: '#718096', fontSize: '14px' }}>Track all system changes and compliance activities</p>
        </div>

        {/* Filters */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '6px' }}>Date Range</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, start: e.target.value })}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #cbd5e0',
                    borderRadius: '4px',
                    fontSize: '14px',
                    width: '140px'
                  }}
                />
                <span style={{ alignSelf: 'center', color: '#718096' }}>to</span>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, end: e.target.value })}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #cbd5e0',
                    borderRadius: '4px',
                    fontSize: '14px',
                    width: '140px'
                  }}
                />
              </div>
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '6px' }}>Entity Type</label>
              <select
                value={filters.entityType}
                onChange={(e) => handleFilterChange('entityType', e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #cbd5e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  width: '160px'
                }}
              >
                <option value="all">All Types</option>
                <option value="attendance">Attendance</option>
                <option value="leave">Leave</option>
                <option value="shift_assignment">Shift Assignment</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', color: '#4a5568', marginBottom: '6px' }}>Actor</label>
              <select
                value={filters.actor}
                onChange={(e) => handleFilterChange('actor', e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #cbd5e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  width: '160px'
                }}
              >
                <option value="all">All Actors</option>
                {mockEmployees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                onClick={() => setFilters({ dateRange: { start: '2023-05-01', end: '2023-05-31' }, entityType: 'all', actor: 'all' })}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#edf2f7',
                  color: '#4a5568',
                  border: '1px solid #cbd5e0',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  height: '36px'
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <button
              onClick={handleExport}
              style={{
                padding: '10px 16px',
                backgroundColor: '#4299e1',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export Audit Logs
            </button>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#4a5568' }}>IP Tracking:</span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#2d3748' }}>Enabled</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#4a5568' }}>Offline Sync:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div 
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: offlineSyncStatus === 'synced' ? '#48bb78' : '#ed8936'
                  }}
                ></div>
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#2d3748' }}>
                  {offlineSyncStatus === 'synced' ? 'Synced' : 'Syncing...'}
                </span>
              </div>
              <button
                onClick={handleOfflineSync}
                disabled={offlineSyncStatus === 'syncing'}
                style={{
                  padding: '6px 12px',
                  backgroundColor: offlineSyncStatus === 'syncing' ? '#a0aec0' : '#4299e1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  cursor: offlineSyncStatus === 'syncing' ? 'not-allowed' : 'pointer'
                }}
              >
                Sync Now
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Audit Log Table */}
          <div style={{ flex: 1 }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #edf2f7' }}>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>Audit Events</h2>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f7fafc', textAlign: 'left' }}>
                      <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date & Time</th>
                      <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Entity</th>
                      <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Action</th>
                      <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Actor</th>
                      <th style={{ padding: '12px 20px', fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.5px' }}>IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map(log => {
                      const actor = mockEmployees.find(emp => emp.id === log.actor_id);
                      return (
                        <tr 
                          key={log.id} 
                          onClick={() => handleLogSelect(log)}
                          style={{
                            cursor: 'pointer',
                            borderBottom: '1px solid #edf2f7',
                            backgroundColor: selectedLog?.id === log.id ? '#ebf8ff' : 'white',
                            transition: 'background-color 0.2s'
                          }}
                        >
                          <td style={{ padding: '14px 20px', fontSize: '14px', color: '#4a5568' }}>
                            {new Date(log.created_at).toLocaleString()}
                          </td>
                          <td style={{ padding: '14px 20px', fontSize: '14px', color: '#4a5568' }}>
                            <span style={{
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: '500',
                              backgroundColor: 
                                log.entity_type === 'attendance' ? '#e6fffa' : 
                                log.entity_type === 'leave' ? '#fff5f5' : '#f0fff4',
                              color: 
                                log.entity_type === 'attendance' ? '#38b2ac' : 
                                log.entity_type === 'leave' ? '#e53e3e' : '#38a169'
                            }}>
                              {log.entity_type.replace('_', ' ')}
                            </span>
                          </td>
                          <td style={{ padding: '14px 20px', fontSize: '14px', color: '#4a5568' }}>
                            <span style={{ textTransform: 'capitalize' }}>{log.action}</span>
                          </td>
                          <td style={{ padding: '14px 20px', fontSize: '14px', color: '#4a5568' }}>
                            {actor ? actor.name : 'Unknown Actor'}
                            <div style={{ fontSize: '12px', color: '#a0aec0' }}>{log.actor_role}</div>
                          </td>
                          <td style={{ padding: '14px 20px', fontSize: '14px', color: '#4a5568' }}>
                            {log.ip_address}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {filteredLogs.length === 0 && (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#718096' }}>
                  No audit events found matching your filters
                </div>
              )}
            </div>
          </div>

          {/* Diff View */}
          <div style={{ width: '40%', minWidth: '400px' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              height: '100%'
            }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #edf2f7' }}>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
                  {selectedLog ? 'Changes Details' : 'Select an Event'}
                </h2>
              </div>
              
              {selectedLog ? (
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>Reason for Change</h3>
                    <p style={{ fontSize: '14px', color: '#2d3748', lineHeight: '1.5' }}>{selectedLog.reason}</p>
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '12px' }}>Changes</h3>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '12px', fontWeight: '600', color: '#718096', marginBottom: '8px', textTransform: 'uppercase' }}>Before</h4>
                        <div style={{
                          backgroundColor: '#fff5f5',
                          border: '1px solid #fed7d7',
                          borderRadius: '4px',
                          padding: '12px',
                          fontSize: '13px',
                          color: '#c53030'
                        }}>
                          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                            {JSON.stringify(selectedLog.old_value, null, 2)}
                          </pre>
                        </div>
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '12px', fontWeight: '600', color: '#718096', marginBottom: '8px', textTransform: 'uppercase' }}>After</h4>
                        <div style={{
                          backgroundColor: '#f0fff4',
                          border: '1px solid #c6f6d5',
                          borderRadius: '4px',
                          padding: '12px',
                          fontSize: '13px',
                          color: '#2f855a'
                        }}>
                          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
                            {JSON.stringify(selectedLog.new_value, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568', marginBottom: '8px' }}>Additional Details</h3>
                    <div style={{ fontSize: '13px', color: '#4a5568' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #edf2f7' }}>
                        <span>Entity ID:</span>
                        <span style={{ fontWeight: '500' }}>{selectedLog.entity_id}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #edf2f7' }}>
                        <span>Performed by:</span>
                        <span style={{ fontWeight: '500' }}>
                          {mockEmployees.find(emp => emp.id === selectedLog.actor_id)?.name || 'Unknown Actor'}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                        <span>IP Address:</span>
                        <span style={{ fontWeight: '500' }}>{selectedLog.ip_address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#718096' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ margin: '0 auto 16px', opacity: 0.5 }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <p>Select an audit event to view detailed changes</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}