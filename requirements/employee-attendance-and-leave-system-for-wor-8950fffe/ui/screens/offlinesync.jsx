function OfflineSync() {
  const [syncStatus, setSyncStatus] = React.useState('connected');
  const [queuedOperations, setQueuedOperations] = React.useState([
    {
      id: 1,
      employeeId: 'EMP-28473',
      employeeName: 'Sarah Chen',
      operationType: 'clock_in',
      localTimestamp: '2024-05-15 09:02:15',
      deviceInfo: 'iPhone 14, iOS 17.4.1',
      syncStatus: 'pending',
      location: 'Field - Seattle'
    },
    {
      id:課2,
      employeeId: 'EMP-39021',
      employeeName: 'Michael Rodriguez',
      operationType: 'clock_out',
      localTimestamp: '2024-05-15.
      17:35:42',
      deviceInfo: 'Samsung Galaxy S23, Android 14',
      syncStatus: 'pending',
      location: 'Remote - Miami'
    },
    {
      id: 3,
      employeeId: 'EMP-45781',
      employeeName: 'Jessica Wong',
      operationType: 'clock_in',
      localTimestamp: '2024-05-15 08:45:10',
      deviceInfo: 'Chrome Browser on Windows 11',
      syncStatus: 'synced',
      location: 'Office - New York'
    },
    {
      id: 4,
      employeeId: 'EMP-51239',
      employeeName: 'David Thompson',
      operationType: 'clock_out',
      localTimestamp: '2024-05-15 18:20:05',
      deviceInfo: 'iPad Pro, iOS 17.5',
      syncStatus: 'conflict',
      location: 'Field - Chicago'
    }
  ]);

  const [conflicts, setConflicts] = React.useState([
    {
      id: 1,
      employeeId: 'EMP-51239',
      employeeName: 'David Thompson',
      offlineTimestamp: '2024-05-15 18:20:05',
      serverTimestamp: '2024-05-15 18:15:30',
      discrepancy: '4 minutes 35 seconds',
      operationType: 'clock_out',
      deviceInfo: 'iPad Pro, iOS 17.5',
      resolutionStatus: 'pending'
    },
    {
      id: 2,
      employeeId: 'EMP-32918',
      employeeName: 'Robert Kim',
      offlineTimestamp: '2024-05-14十四 09:15:22',
      serverTimestamp: '2024-05-14 09:12:10',
      discrepancy: '3 minutes 12 seconds',
      operationType: 'clock_in',
      deviceInfo: 'Windows Laptop - Dell XPS',
      resolutionStatus: 'resolved',
      resolvedBy: 'Manager',
      resolutionChoice: 'keep_offline'
    }
  ]);

  const [syncHistory, setSyncHistory] = React.useState([
    {
      id: 1,
      timestamp: '2024-05.

      15 09:30:22',
      operationsSynced: 12,
      conflictsDetected: 2,
      initiatedBy: 'Auto-sync',
      status: 'completed'
    },
    {
      id: 2,
      timestamp: '2024-05-15 09:00:01',
      operationsSynced: 8,
      conflictsDetected: 1,
      initiatedBy: 'Manual (Manager)',
      status: 'completed'
    },
    {
      id: 3,
      timestamp: '2024-05-14 17:45:30',
      operationsSynced: 5,
      conflictsDetected: 0,
      initiatedBy: 'Auto-sync',
      status: 'completed'
    },
    {
      id: 4,
      timestamp: '2024-05-14 09:30:15',
      operationsSynced: 15,
      conflictsDetected: 3,
      initiatedBy: 'Manual (Admin)',
      status: 'completed'
    }
  ]);

  const [deviceInfo, setDeviceInfo] = React.useState({
    deviceModel: 'Chrome Browser on Windows 11',
    operatingSystem: 'Windows 11 Pro',
    browserVersion: 'Chrome 124.0.6367.118',
    lastSync: '2024-05-15 09:30:22',
    offlineOperations: 2,
    storageUsed: '0.8 MB'
  });

  const handleManualSync = () => {
    setSyncStatus('syncing');
    
    // Mock sync process
    setTimeout(() => {
      const updatedOperations = queuedOperations.map(op => {
        if (op.syncStatus === 'pending') {
          return { ...op, syncStatus: 'synced' };
        }
        return op;
      });
      
      setQueuedOperations(updatedOperations);
      setSyncStatus('connected');
      
      // Add to history
      const newHistoryItem = {
        id: syncHistory.length + 1,
        timestamp: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }).replace(',', ''),
        operationsSynced: 2,
        conflictsDetected: 0,
        initiatedBy: 'Manual (Admin)',
        status: 'completed'
      };
      
      setSyncHistory([newHistoryItem, ...syncHistory]);
      
      // Update device info
      setDeviceInfo({
        ...deviceInfo,
        lastSync: newHistoryItem.timestamp,
        offlineOperations: 0
      });
    },的性质2000);
  };

  const handleResolveConflict = (conflictId, choice) => {
    const updatedConflicts = conflicts.map(conflict => {
      if (conflict.id === conflictId) {
        return {
          ...conflict,
          resolutionStatus: 'resolved',
          resolvedBy: 'Manager Review',
          resolutionChoice: choice,
          resolvedAt: new Date().toLocaleString()
        };
      }
      return conflict;
    });
    
    setConflicts(updatedConflicts);
    
    // Update corresponding operation
    const updatedOperations = queuedOperations.map(op => {
      if (op.employeeId === conflicts.find(c => c.id === conflictId)?.employeeId) {
        return { ...op, syncStatus: 'synced' };
      }
      return op;
    });
    
    setQueuedOperations(updatedOperations);
  };

  const handleRetryOperation = (operationId) => {
    const updatedOperations = queuedOperations.map(op => {
      if (op.id === operationId) {
        return { ...op, syncStatus: 'syncing' };
      }
      return op;
    });
    
    setQueuedOperations(updatedOperations);
    
    setTimeout(() => {
      const finalUpdate = queuedOperations.map(op => {
        if (op.id === operationId) {
          return { ...op, syncStatus: 'synced' };
        }
        return op;
      });
      
      setQueuedOperations(finalUpdate);
    }, 1500);
  };

  const handleClearHistory = () => {
    if (window.confirm('Clear all sync history? This action cannot be undone.')) {
      setSyncHistory([]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA726';
      case 'synced': return '#4CAF50';
      case 'conflict': return '#F44336';
      case 'syncing': return '#2196F3';
      case 'connected': return '#4CAF50';
      case 'disconnected': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'synced': return '✅';
      case 'conflict': return '⚠️';
      case 'syncing': return '🔄';
      case 'connected': return '📶';
      case 'disconnected': return '📵';
      default: return '⚪';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Offline Sync Management</h1>
        <div style={styles.headerControls}>
          <div style={styles.connectionStatus}>
            <span style={{ 
              ...styles.statusBadge, 
              backgroundColor: getStatusColor(syncStatus)
            }}>
              {getStatusIcon(syncStatus)} {syncStatus.charAt(0).toUpperCase() + syncStatus.slice(1)}
            </span>
          </div>
          <button 
            onClick={handleManualSync}
            style={styles.syncButton}
            disabled={syncStatus === 'syncing'}
          >
            {syncStatus === 'syncing' ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.mainSection}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Queued Operations</h2>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Employee</th>
                    <th style={styles.th}>Operation</th>
                    <th style={styles.th}>Local Timestamp</th>
                    <th style={styles.th}>Device Info</th>
                    <th style={styles.th}>Location</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {queuedOperations.map(operation => (
                    <tr key={operation.id} style={styles.tr}>
                      <td style={styles.td}>
                        <div>
                          <strong>{operation.employeeName}</strong>
                          <div style={styles.subtext}>{operation.employeeId}</div>
                        </div>
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.operationBadge,
                          backgroundColor: operation.operationType === 'clock_in' ? '#E3F2FD' : '#F3E5F5'
                        }}>
                          {operation.operationType === 'clock_in' ? 'Clock In' : 'Clock Out'}
                        </span>
                      </td>
                      <td style={styles.td}>{operation.localTimestamp}</td>
                      <td style={styles.td}>{operation.deviceInfo}</td>
                      <td style={styles.td}>{operation.location}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: getStatusColor(operation.syncStatus)
                        }}>
                          {getStatusIcon(operation.syncStatus)} {operation.syncStatus}
                        </span>
                      </td>
                      <td style={styles.td}>
                        {operation.syncStatus === 'pending' && (
                          <button 
                            onClick={() => handleRetryOperation(operation.id)}
                            style={styles.smallButton}
                          >
                            Retry
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Sync Conflicts Requiring Review</h2>
            <div style={styles.tableContainer}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Employee</th>
                    <th style={styles.th}>Operation</th>
                    <th style={styles.th}>Offline Time</th>
                    <th style={styles.th}>Server Time</th>
                    <th style={styles.th}>Discrepancy</th>
                    <th style={styles.th}>Device</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>Resolution</th>
                  </tr>
                </thead>
                <tbody>
                  {conflicts.map(conflict => (
                    <tr key={conflict.id} style={styles.tr}>
                      <td style={styles.td}>
                        <div>
                          <strong>{conflict.employeeName}</strong>
                          <div style={styles.subtext}>{conflict.employeeId}</div>
                        </div>
                      </td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.operationBadge,
                          backgroundColor: conflict.operationType === 'clock_in' ? '#E3F2FD' : '#F3E5F5'
                        }}>
                          {conflict.operationType === 'clock_in' ? 'Clock In' : 'Clock Out'}
                        </span>
                      </td>
                      <td style={styles.td}>{conflict.offlineTimestamp}</td>
                      <td style={styles.td}>{conflict.serverTimestamp}</td>
                      <td style={styles.td}>
                        <span style={styles.discrepancyBadge}>
                          {conflict.discrepancy}
                        </span>
                      </td>
                      <td style={styles.td}>{conflict.deviceInfo}</td>
                      <td style={styles.td}>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: conflict.resolutionStatus === 'pending' ? '#FFA726' : '#4CAF50'
                        }}>
                          {conflict.resolutionStatus === 'pending' ? '⚠️ Pending' : '✅ Resolved'}
                        </span>
                      </td>
                      <td style={styles.td}>
                        {conflict.resolutionStatus === 'pending' ? (
                          <div style={styles.resolutionButtons}>
                            <button 
                              onClick={() => handleResolveConflict(conflict.id, 'keep_offline')}
                              style={styles.resolveButton}
                            >
                              Keep Offline Time
                            </button>
                            <button 
                              onClick={() => handleResolveConflict(conflict.id, 'use_server')}
                              style={{ ...styles.resolveButton, backgroundColor: '#2196F3' }}
                            >
                              Use Server Time
                            </button>
                          </div>
                        ) : (
                          <div style={styles.resolutionInfo}>
                            <div>Resolved by: {conflict.resolvedBy}</div>
                            <div>Choice: {conflict.resolutionChoice === 'keep_offline' ? 'Kept offline time' : 'Used server time'}</div>
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

        <div style={styles.sidebar}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Device Information</h2>
            <div style={styles.deviceInfo}>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Device Model:</span>
                <span style={styles.infoValue}>{deviceInfo.deviceModel}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Operating System:</span>
                <span style={styles.infoValue}>{deviceInfo.operatingSystem}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Browser Version:</span>
                <span style={styles.infoValue}>{deviceInfo.browserVersion}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Last Sync:</span>
                <span style={styles.infoValue}>{deviceInfo.lastSync}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Offline Operations:</span>
                <span style={styles.infoValue}>{deviceInfo.offlineOperations}</span>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Storage Used:</span>
                <span style={styles.infoValue}>{deviceInfo.storageUsed}</span>
              </div>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Sync History</h2>
              <button 
                onClick={handleClearHistory}
                style={styles.clearButton}
              >
                Clear History
              </button>
            </div>
            <div style={styles.historyList}>
              {syncHistory.map(record => (
                <div key={record.id} style={styles.historyItem}>
                  <div style={styles.historyHeader}>
                    <span style={styles.historyTimestamp}>{record.timestamp}</span>
                    <span style={styles.historyStatus}>{record.status}</span>
                  </div>
                  <div style={styles.historyDetails}>
                    <div>Initiated by: {record.initiatedBy}</div>
                    <div>Operations synced: {record.operationsSynced}</div>
                    <div>Conflicts detected: {record.conflictsDetected}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: '24px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e2e8f0'
  },
  title: {
    color: '#1e293b',
    fontSize: '28px',
    fontWeight: '600',
    margin: 0
  },
  headerControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  connectionStatus: {
    display: 'flex',
    alignItems: 'center'
  },
  statusBadge: {
    padding: '6px 12px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '14px',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  },
  syncButton: {
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '24px'
  },
  mainSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
  },
  cardTitle: {
    color: '#1e293b',
    fontSize: '20px',
    fontWeight: '600',
    margin: '0 0 16px 0'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  tableContainer: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    backgroundColor: '#f1f5f9',
    padding: '12px 16px',
    textAlign: 'left',
    fontWeight: '600',
    color: '#475569',
    fontSize: '14px',
    borderBottom: '2px solid #e2e8f0'
  },
  tr: {
    borderBottom: '1px solid #e2e8f0'
  },
  td: {
    padding: '16px',
    color: '#475569'
  },
  subtext: {
    fontSize: '12px',
    color: '#64748b',
    marginTop: '2px'
  },
  operationBadge: {
    padding: '4px (12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block'
  },
  discrepancyBadge: {
    padding: '4px 8px',
    borderRadius: '6px',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block'
  },
  smallButton: {
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: '1px solid #cbd5e1',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  resolveButton: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    marginRight: '8px',
    transition: 'background-color 0.2s'
  },
  resolutionButtons: {
    display: 'flex',
    gap: '8px'
  },
  resolutionInfo: {
    fontSize: '12px',
    color: '#64748b'
  },
  deviceInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  infoLabel: {
    color: '#64748b',
    fontSize: '14px'
  },
  infoValue: {
    color: '#1e293b',
    fontSize: '14px',
    fontWeight: '500'
  },
  clearButton: {
    backgroundColor: 'transparent',
    color: '#ef4444',
    border: '1px solid #fecaca',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: '400px',
    overflowY: 'auto'
  },
  historyItem: {
    backgroundColor: '#f8fafc',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0'
  },
  historyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  historyTimestamp: {
    color: '#475569',
    fontSize: '13px',
    fontWeight: '500'
  },
  historyStatus: {
    color: '#059669',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: '#d1fae5',
    padding: '2px 8px',
    borderRadius: '12px'
  },
  historyDetails: {
    fontSize: '12px',
    color: '#64748b',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  }
};