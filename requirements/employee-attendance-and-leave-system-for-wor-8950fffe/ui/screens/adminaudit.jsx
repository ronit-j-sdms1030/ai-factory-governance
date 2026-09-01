function AdminAudit() {
  // Mock data for audit logs
  const mockAuditLogs = [
    {
      id: 1,
      entity_type: 'attendance',
      entity_id: 101,
      action: 'update',
      old_value: { clock_in_time: '09:15:00', status: 'late' },
      new_value: { clock_in_time: '09:00:00', status: 'present' },
      actor_id: 501,
      actor_name: 'HR Manager',
      actor_role: 'admin',
      reason: 'Manual correction for system error',
      ip_address: '192.168.1.105',
      created_at: '2023-06-15T14:30:00Z'
    },
    {
      id: 2,
      entity_type: 'leave',
      entity_id: 205,
      action: 'approve',
      old_value: { status: 'pending' },
      new_value: { status: 'approved', current_approver_id: 501 },
      actor_id: 502,
      actor_name: 'Department Head',
      actor_role: 'manager',
      reason: 'Annual leave request approved',
      ip_address: '203.0.113.5',
      created_at: '2023-06-14T11:45:00Z'
    },
    {
      id: 3,
      entity_type: 'shift_assignment',
      entity_id: 301,
      action: 'create',
      old_value: {},
      new_value: { employee_id: 120, shift_id: 15, effective_from: '2023-07-01' },
      actor_id: 501,
      actor_name: 'HR Manager',
      actor_role: 'admin',
      reason: 'New shift assignment for July rotation',
      ip_address: '192.168.1.105',
      created_at: '2023-06-10T09:20:00Z'
    },
    {
      id: 4,
      entity_type: 'attendance',
      entity_id: 115,
      action: 'create',
      old_value: {},
      new_value: { employee_id: 115, date: '2023-06-15', clock_in_time: '08:55:00', status: 'present' },
      actor_id: 503,
      actor_name: 'Payroll Specialist',
      actor_role: 'admin',
      reason: 'Backfill missing record',
      ip_address: '198.51.100.22',
      created_at: '2023-06-15T16:10:00Z'
    }
  ];

  const [auditLogs, setAuditLogs] = React.useState(mockAuditLogs);
  const [filteredLogs, setFilteredLogs] = React.useState(mockAuditLogs);
  const [dateFrom, setDateFrom] = React.useState('2023-06-01');
  const [dateTo, setDateTo] = React.useState('2023-06-30');
  const [entityType, setEntityType] = React.useState('all');
  const [actorFilter, setActorFilter] = React.useState('');
  const [selectedLog, setSelectedLog] = React.useState(null);
  const [exportFormat, setExportFormat] = React.useState('csv');

  // Filter audit logs based on criteria
  React.useEffect(() => {
    let result = auditLogs;
    
    // Date range filter
    result = result.filter(log => {
      const logDate = new Date(log.created_at);
      return logDate >= new Date(dateFrom) && logDate <= new Date(dateTo);
    });
    
    // Entity type filter
    if (entityType !== 'all') {
      result = result.filter(log => log.entity_type === entityType);
    }
    
    // Actor filter
    if (actorFilter) {
      const filterLower = actorFilter.toLowerCase();
      result = result.filter(log => 
        log.actor_name.toLowerCase().includes(filterLower) ||
        log.actor_role.toLowerCase().includes(filterLower)
      );
    }
    
    setFilteredLogs(result);
  }, [dateFrom, dateTo, entityType, actorFilter, auditLogs]);

  // Handle export
  const handleExport = () => {
    alert(`Exporting ${filteredLogs.length} audit logs as ${exportFormat.toUpperCase()}`);
    // In a real app, this would generate and download a file
  };

  // Handle bulk export
  const handleBulkExport = () => {
    alert(`Bulk exporting all ${auditLogs.length} audit logs`);
    // In a real app, this would export all logs regardless of filters
  };

  // Show diff view
  const showDiff = (log) => {
    setSelectedLog(log);
  };

  // Close diff view
  const closeDiff = () => {
    setSelectedLog(null);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    });
  };

  // Render diff view
  const renderDiffView = () => {
    if (!selectedLog) return null;
    
    return (
      <div className="diff-overlay">
        <div className="diff-modal">
          <div className="diff-header">
            <h3>Audit Log Details</h3>
            <button className="close-btn" onClick={closeDiff}>×</button>
          </div>
          <div className="diff-content">
            <div className="diff-section">
              <h4>Entity Information</h4>
              <p><strong>Type:</strong> {selectedLog.entity_type}</p>
              <p><strong>ID:</strong> {selectedLog.entity_id}</p>
              <p><strong>Action:</strong> {selectedLog.action}</p>
            </div>
            
            <div className="diff-section">
              <h4>Changes</h4>
              <div className="diff-grid">
                <div>
                  <h5>Before</h5>
                  <pre>{JSON.stringify(selectedLog.old_value, null, 2)}</pre>
                </div>
                <div>
                  <h5>After</h5>
                  <pre>{JSON.stringify(selectedLog.new_value, null, 2)}</pre>
                </div>
              </div>
            </div>
            
            <div className="diff-section">
              <h4>Metadata</h4>
              <p><strong>Actor:</strong> {selectedLog.actor_name} ({selectedLog.actor_role})</p>
              <p><strong>Reason:</strong> {selectedLog.reason}</p>
              <p><strong>IP Address:</strong> {selectedLog.ip_address}</p>
              <p><strong>Timestamp:</strong> {formatDate(selectedLog.created_at)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-audit-screen">
      <header className="app-header">
        <h1>WorkPulse Admin</h1>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/clock">Clock</a>
          <a href="/attendance">Attendance</a>
          <a href="/leave/request">Leave</a>
          <a href="/team">Team</a>
          <a href="/shifts">Shifts</a>
          <a href="/policies">Policies</a>
          <a href="/payroll">Payroll</a>
          <a href="/facial-enrollment">Facial Enrollment</a>
          <a href="/profile">Profile</a>
          <a href="/admin/audit" className="active">Audit</a>
        </nav>
      </header>
      
      <main className="audit-content">
        <div className="audit-header">
          <h2>Audit Trail</h2>
          <div className="export-controls">
            <select 
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="format-selector"
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
              <option value="xlsx">Excel</option>
            </select>
            <button className="export-btn" onClick={handleExport}>
              Export Filtered
            </button>
            <button className="bulk-export-btn" onClick={handleBulkExport}>
              Bulk Export All
            </button>
          </div>
        </div>
        
        <div className="audit-filters">
          <div className="filter-group">
            <label>Date Range:</label>
            <input 
              type="date" 
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <span>to</span>
            <input 
              type="date" 
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label>Entity Type:</label>
            <select 
              value={entityType}
              onChange={(e) => setEntityType(e.target.value)}
            >
              <option value="all">All Entities</option>
              <option value="attendance">Attendance</option>
              <option value="leave">Leave</option>
              <option value="shift_assignment">Shift Assignment</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Actor:</label>
            <input 
              type="text" 
              placeholder="Search by name or role"
              value={actorFilter}
              onChange={(e) => setActorFilter(e.target.value)}
            />
          </div>
        </div>
        
        <div className="audit-results">
          <div className="results-header">
            <span>{filteredLogs.length} audit records found</span>
          </div>
          
          <div className="audit-table-container">
            <table className="audit-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Entity</th>
                  <th>Action</th>
                  <th>Actor</th>
                  <th>Reason</th>
                  <th>IP Address</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(log => (
                  <tr key={log.id}>
                    <td>{formatDate(log.created_at)}</td>
                    <td>{log.entity_type} #{log.entity_id}</td>
                    <td>{log.action}</td>
                    <td>{log.actor_name} ({log.actor_role})</td>
                    <td>{log.reason}</td>
                    <td>{log.ip_address}</td>
                    <td>
                      <button 
                        className="view-details-btn"
                        onClick={() => showDiff(log)}
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
      </main>
      
      {renderDiffView()}
      
      <style jsx>{`
        .admin-audit-screen {
          min-height: 100vh;
          background-color: #f5f7fa;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .app-header {
          background: linear-gradient(135deg, #2c3e50, #1a2530);
          color: white;
          padding: 1rem 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .app-header h1 {
          margin: 0 0 0.5rem 0;
          font-weight: 600;
          font-size: 1.8rem;
        }
        
        .app-header nav {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        
        .app-header nav a {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          padding: 0.4rem 0;
          transition: color 0.2s;
        }
        
        .app-header nav a:hover,
        .app-header nav a.active {
          color: white;
          border-bottom: 2px solid #4da6ff;
        }
        
        .audit-content {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .audit-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .audit-header h2 {
          margin: 0;
          color: #2d3748;
          font-weight: 600;
        }
        
        .export-controls {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        
        .format-selector {
          padding: 0.5rem;
          border: 1px solid #cbd5e0;
          border-radius: 4px;
          background: white;
        }
        
        .export-btn, .bulk-export-btn {
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .export-btn {
          background: #4299e1;
          color: white;
        }
        
        .export-btn:hover {
          background: #3182ce;
        }
        
        .bulk-export-btn {
          background: #48bb78;
          color: white;
        }
        
        .bulk-export-btn:hover {
          background: #38a169;
        }
        
        .audit-filters {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          margin-bottom: 2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        
        .filter-group {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        
        .filter-group label {
          font-weight: 500;
          color: #4a5568;
          min-width: 100px;
        }
        
        .filter-group input, .filter-group select {
          padding: 0.5rem;
          border: 1px solid #cbd5e0;
          border-radius: 4px;
          font-size: 0.95rem;
        }
        
        .audit-results {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        
        .results-header {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          background: #f7fafc;
          font-weight: 500;
          color: #4a5568;
        }
        
        .audit-table-container {
          overflow-x: auto;
        }
        
        .audit-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .audit-table th {
          background: #edf2f7;
          padding: 1rem 1.5rem;
          text-align: left;
          font-weight: 600;
          color: #4a5568;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .audit-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          color: #4a5568;
        }
        
        .audit-table tbody tr:hover {
          background: #f7fafc;
        }
        
        .view-details-btn {
          background: #4299e1;
          color: white;
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .view-details-btn:hover {
          background: #3182ce;
        }
        
        .diff-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .diff-modal {
          background: white;
          border-radius: 8px;
          width: 90%;
          max-width: 900px;
          max-height: 90vh;
          overflow: auto;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        }
        
        .diff-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .diff-header h3 {
          margin: 0;
          color: #2d3748;
        }
        
        .close-btn {
          background: none;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          color: #a0aec0;
          padding: 0;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .close-btn:hover {
          color: #718096;
        }
        
        .diff-content {
          padding: 1.5rem;
        }
        
        .diff-section {
          margin-bottom: 2rem;
        }
        
        .diff-section h4 {
          margin-top: 0;
          color: #2d3748;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 0.5rem;
        }
        
        .diff-section p {
          margin: 0.5rem 0;
          color: #4a5568;
        }
        
        .diff-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        .diff-grid h5 {
          margin-top: 0;
          color: #4a5568;
        }
        
        .diff-grid pre {
          background: #f7fafc;
          padding: 1rem;
          border-radius: 4px;
          overflow: auto;
          max-height: 200px;
          font-size: 0.85rem;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .audit-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .export-controls {
            width: 100%;
            justify-content: flex-end;
          }
          
          .audit-filters {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .filter-group {
            width: 100%;
          }
          
          .diff-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}