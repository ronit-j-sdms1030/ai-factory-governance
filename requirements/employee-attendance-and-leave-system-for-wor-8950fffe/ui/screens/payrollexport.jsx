function PayrollExport() {
  const [selectedMonth, setSelectedMonth] = React.useState({ year: 2024, month: 2 }); // March 2024
  const [isPeriodLocked, setIsPeriodLocked] = React.useState(true);
  const [selectedColumns, setSelectedColumns] = React.useState([
    'employee_id', 'full_name', 'department', 'regular_hours', 'overtime_hours', 
    'late_minutes', 'leave_days', 'gross_pay', 'net_pay'
  ]);
  const [apiKey, setApiKey] = React.useState('sk_live_********************************');
  const [showApiKey, setShowApiKey] = React.useState(false);
  const [exportHistory, setExportHistory] = React.useState([
    { id: 1, date: '2024-02-28', period: 'Feb 2024', columns: 9, downloadedBy: 'Sarah Chen (HR)', status: 'completed', size: '4.2 MB' },
    { id: 2, date: '2024-02-15', period: 'Feb 2024', columns:要切实发生值, downloadedBy: 'Finance Team', status: 'completed', size: '4.1 MB' },
    { id: 3, date: '2024-02-01', period: 'Jan 2024', columns: 12, downloadedBy: 'Michael Torres', status: 'completed', size: '4.8 MB' },
    { id: 4, date: '2024-01-28', period: 'Jan 2024', columns: 8, downloadedBy: 'Payroll System', status: 'completed', size: '4.0 MB' },
    { id: 5, date: '2024-01-15', period: 'Dec 2023', columns: 11, downloadedBy: 'Audit Team', status: 'completed', size: '4.5 MB' },
  ]);
  
  const months = [
    { value: 0, name: 'January 2024', locked: true },
    { value: 1, name: 'February 2024', locked: true },
    { value: 2, name: 'March 2024', locked: false },
    { value: 3, name: 'April 2024', locked: false },
    { value: 4, name: 'May 2024', locked: false },
  ];
  
  const columnOptions = [
    { id: 'employee_id', label: 'Employee ID', category: 'basic', default: true },
    { id: 'full_name', label: 'Full Name', category: 'basic', default: true },
    { id: 'department', label: 'Department', category: 'basic', default: true },
    { id: 'cost_center', label: 'Cost Center', category: 'financial', default: false },
    { id: 'regular_hours', label: 'Regular Hours', category: 'time', default: true },
    { id: 'overtime_hours', label: 'Overtime Hours', category: 'time', default: true },
    { id: 'late_minutes', label: 'Late Minutes', category: 'time', default: true },
    { id: 'early_leave_minutes', label: 'Early Leave Minutes', category: 'time', default: false },
    { id: 'leave_days', label: 'Leave Days', category: 'time', default: true },
    { id: 'absent_days', label: 'Absent Days', category: 'time', default: false },
    { id: 'gross_pay', label: 'Gross Pay', category: 'financial', default: true },
    { id: 'deductions', label: 'Deductions', category: 'financial', default: false },
    { id: 'net_pay', label: 'Net Pay', category: 'financial', default: true },
    { id: 'tax_withheld', label: 'Tax Withheld', category: 'financial', default: false },
    { id: 'benefits_contribution', label: 'Benefits Contribution', category: 'financial', default: false },
  ];
  
  const policyVersions = [
    { id: 1, version: '2.4.1', effectiveDate: '2024-01-01', changes: 'Updated overtime threshold to 45 hours' },
    { id: 2, version: '2.3.2', effectiveDate: '2023-10-15', changes: 'Added night shift differential calculation' },
    { id: 3, version: '2.2.0', effectiveDate: '2023-07-01', changes: 'Revised holiday pay multipliers' },
  ];
  
  const handleMonthSelect = (monthValue) => {
    const month = months.find(m => m.value === monthValue);
    setSelectedMonth({ year: 2024, month: monthValue });
    setIsPeriodLocked(month.locked);
  };
  
  const handleToggleLock = () => {
    setIsPeriodLocked(!isPeriodLocked);
    // In real app, this would call API to lock/unlock period
    alert(`Payroll period ${isPeriodLocked ? 'unlocked' : 'locked'} for adjustments`);
  };
  
  const handleColumnToggle = (columnId) => {
    if (selectedColumns.includes(columnId)) {
      setSelectedColumns(selectedColumns.filter(id => id !== columnId));
    } else {
      setSelectedColumns([...selectedColumns, columnId]);
    }
  };
  
  const handleExport = () => {
    // In real app, this would generate and download CSV
    const fileName = `payroll_export_${selectedMonth.year}_${selectedMonth.month + 1}_${new Date().toISOString().split('T')[0]}.csv`;
    alert(`Exporting ${selectedColumns.length} columns for ${months.find(m => m.value === selectedMonth.month).name}\nFile: ${fileName}`);
    
    // Add to history
    const newExport = {
      id: exportHistory.length + 1,
      date: new Date().toISOString().split('T')[0],
      period: months.find(m => m.value === selectedMonth.month).name,
      columns: selectedColumns.length,
      downloadedBy: 'You (Current User)',
      status: 'pending',
      size: 'Processing...'
    };
    setExportHistory([newExport, ...exportHistory]);
    
    // Simulate processing completion
    setTimeout(() => {
      setExportHistory(prev => prev.map(item => 
        item.id === newExport.id 
          ? { ...item, status: 'completed', size: '4.3 MB' }
          : item
      ));
    },)，；
  };
  
  const handleRegenerateApiKey = () => {
    const newKey = 'sk_live_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    alert('API Key regenerated. Old key is now invalid.');
  };
  
  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    alert('API Key copied to clipboard');
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>WP</div>
          <span style={styles.logoText}>WorkPulse</span>
        </div>
        <nav style={styles.nav}>
          <div style={styles.navSection}>
            <div style={styles.navHeader}>Attendance</div>
            <a href="#/clock" style={styles.navLink}>Clock In/Out</a>
            <a href="#/attendance" style={styles.navLink}>My Attendance</a>
            <a href="#/team/attendance" style={styles.navLink}>Team Attendance</a>
            <a href="#/roster" style={styles.navLink}>Shift Roster</a>
          </div>
          <div style={styles.navSection}>
            <div style={styles.navHeader}>Leave</div>
            <a href="#/leave/new" style={styles.navLink}>Request Leave</a>
            <a href="#/leave/my-leave" style={styles.navLink}>My Leave</a>
            <a href="#/approvals/leave" style={styles.navLink}>Approvals</a>
          </div>
          <div style={styles.navSection}>
            <div style={styles.navHeader}>Management</div>
            <a href="#/payroll/export" style={styles.navLinkActive}>Payroll Export</a>
            <a href="#/audit" style={styles.navLink}>Audit Trail</a>
            <a href="#/settings/policies" style={styles.navLink}>Policies</a>
          </div>
          <div style={styles.navSection}>
            <div style={styles.navHeader}>Profile</div>
            <a href="#/profile" style={styles.navLink}>My Profile</a>
            <a href="#/profile/biometrics" style={styles.navLink}>Facial Setup</a>
            <a href="#/offline" style={styles.navLink}>Offline Sync</a>
          </div>
        </nav>
        <div style={styles.userProfile}>
          <div style={styles.avatar}>JC</div>
          <div style={styles.userInfo}>
            <div style={styles.userName}>Jane Cooper</div>
            <div style={styles.userRole}>HR Manager</div>
          </div>
        </div>
      </div>
      
      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>Payroll Data Export</h1>
          <div style={styles.headerActions}>
            <div style={styles.badge}>Sensitive Data</div>
            <div style={styles.lastExport}>Last export: 28 Feb 2024</div>
          </div>
        </div>
        
        <div style={styles.contentGrid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Payroll Period Selection</h2>
            <div style={styles.periodSelector}>
              <div style={styles.monthPicker}>
                <div style={styles.monthPickerLabel}>Select Month/Year:</div>
                <div style={styles.monthOptions}>
                  {months.map(month => (
                    <button
                      key={month.value}
                      style={{
                        ...styles.monthOption,
                        ...(selectedMonth.month === month.value ? styles.monthOptionActive : {}),
                        ...(month.locked ? styles.monthOptionLocked : {})
                      }}
                      onClick={() => handleMonthSelect(month.value)}
                    >
                      <div style={styles.monthName}>{month.name}</div>
                      <div style={styles.monthStatus}>
                        {month.locked ? (
                          <span style={styles.lockedBadge}>✓ Locked</span>
                        ) : (
                          <span style={styles.unlockedBadge}>Open</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div style={styles.periodStatus}>
                <div style={styles.statusIndicator}>
                  <div style={styles.statusLabel}>Current Period Status:</div>
                  <div style={{
                    ...styles.statusValue,
                    ...(isPeriodLocked ? styles.statusLocked : styles.statusUnlocked)
                  }}>
                    {isPeriodLocked ? 'Locked for Payroll' : 'Open for Adjustments'}
                  </div>
                </div>
                
                <button 
                  style={styles.lockButton}
                  onClick={handleToggleLock}
                >
                  {isPeriodLocked ? 'Unlock Period' : 'Lock Period'}
                  <span style={styles.lockIcon}>{isPeriodLocked ? '🔓' : '🔒'}</span>
                </button>
              </div>
            </div>
            
            <div style={styles.policySection}>
              <h3 style={styles.sectionTitle}>Policy Version Used</h3>
              <div style={styles.policyCard}>
                <div style={styles.policyVersion}>
                  <span style={styles.versionBadge}>v{policyVersions[0].version}</span>
                  <span style={styles.versionDate}>Effective: {policyVersions[0].effectiveDate}</span>
                </div>
                <div style={styles.policyDescription}>{policyVersions[0].changes}</div>
                <div style={styles.policyHistory}>
                  <div style={styles.historyTitle}>Previous Versions:</div>
                  {policyVersions.slice(1).map(policy => (
                    <div key={policy.id} style={styles.historyItem}>
                      <span>v{policy.version}</span>
                      <span style={styles.historyDate}>{policy.effectiveDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Export Configuration</h2>
            
            <div style={styles.columnsSelector}>
              <h3 style={styles.sectionTitle}>Select Columns to Include</h3>
              <div style={styles.columnCategories}>
                <div style={styles.category}>
                  <div style={styles.categoryTitle}>Basic Information</div>
                  {columnOptions.filter(c => c.category === 'basic').map(column => (
                    <label key={column.id} style={styles.columnCheckbox}>
                      <input
                        type="checkbox"
                        checked={selectedColumns.includes(column.id)}
                        onChange={() => handleColumnToggle(column.id)}
                        style={styles.checkbox}
                      />
                      <span style={styles.checkboxLabel}>{column.label}</span>
                      {column.default && <span style={styles.defaultBadge}>Default</span>}
                    </label>
                  ))}
                </div>
                
                <div style={styles.category}>
                  <div style={styles.categoryTitle}>Time & Attendance</div>
                  {columnOptions.filter(c => c.category === 'time').map(column => (
                    <label key={column.id} style={styles.columnCheckbox}>
                      <input
                        type="checkbox"
                        checked={selectedColumns.includes(column.id)}
                        onChange={() => handleColumnToggle(column.id)}
                        style={styles.checkbox}
                      />
                      <span style={styles.checkboxLabel}>{column.label}</span>
                      {column.default && <span style={styles.defaultBadge}>Default</span>}
                    </label>
                  ))}
                </div>
                
                <div style={styles.category}>
                  <div style={styles.categoryTitle}>Financial Data</div>
                  {columnOptions.filter(c => c.category === 'financial').map(column => (
                    <label key={column.id} style={styles.columnCheckbox}>
                      <input
                        type="checkbox"
                        checked={selectedColumns.includes(column.id)}
                        onChange={() => handleColumnToggle(column.id)}
                        style={styles.checkbox}
                      />
                      <span style={styles.checkboxLabel}>{column.label}</span>
                      {column.default && <span style={styles.defaultBadge}>Default</span>}
                    </label>
                  ))}
                </div>
              </div>
              
              <div style={styles.exportSummary}>
                <div style={styles.summaryItem}>
                  <span style={styles.summaryLabel}>Selected Columns:</span>
                  <span style={styles.summaryValue}>{selectedColumns.length} of {columnOptions.length}</span>
                </div>
                <div style={styles.summaryItem}>
                  <span style={styles.summaryLabel}>Estimated Records:</span>
                  <span style={styles.summaryValue}>9,847 employees</span>
                </div>
                <div style={styles.summaryItem}>
                  <span style={styles.summaryLabel}>File Size:</span>
                  <span style={styles.summaryValue}>~4.2 MB (CSV)</span>
                </div>
              </div>
            </div>
            
            <button 
              style={styles.exportButton}
              onClick={handleExport}
            >
              Generate & Download CSV Export
              <span style={styles.exportIcon}>⬇</span>
            </button>
            
            <div style={styles.securityNote}>
              <div style={styles.securityIcon}>🔒</div>
              <div style={styles.securityText}>
                This export contains sensitive payroll data. Download requires HR role authentication.
                File will be encrypted with AES-256 and accessible for 24 hours only.
              </div>
            </div>
          </div>
          
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>REST API Integration</h2>
            <div style={styles.apiSection}>
              <div style={styles.apiKeySection}>
                <div style={styles.apiKeyLabel}>API Key for Automated Exports:</div>
                <div style={styles.apiKeyDisplay}>
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    readOnly
                    style={styles.apiKeyInput}
                  />
                  <button 
                    style={styles.apiKeyToggle}
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? 'Hide' : 'Show'}
                  </button>
                  <button 
                    style={styles.apiKeyCopy}
                    onClick={handleCopyApiKey}
                  >
                    Copy
                  </button>
                </div>
                <div style={styles.apiKeyActions}>
                  <button 
                    style={styles.apiKeyButton}
                    onClick={handleRegenerateApiKey}
                  >
                    Regenerate Key
                  </button>
                  <button style={styles.apiKeyButton}>
                    View Usage History
                  </button>
                </div>
              </div>
              
              <div style={styles.apiDocs}>
                <h3 style={styles.sectionTitle}>API Documentation</h3>
                <div style={styles.apiEndpoint}>
                  <code style={styles.endpointCode}>GET /api/v1/payroll/export?month=3&year=2024&format=csv</code>
                  <div style={styles.endpointDesc}>Returns payroll data for specified period</div>
                </div>
                <div style={styles.apiEndpoint}>
                  <code style={styles.endpointCode}>POST /api/v1/payroll/lock</code>
                  <div style={styles.endpointDesc}>Lock/unlock payroll period (HR role required)</div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Export History Audit Trail</h2>
            <div style={styles.historyTable}>
              <div style={styles.tableHeader}>
                <div style={styles.tableCell}>Date</div>
                <div style={styles.tableCell}>Period</div>
                <div style={styles.tableCell}>Columns</div>
                <div style={styles.tableCell}>Downloaded By</div>
                <div style={styles.tableCell}>Status</div>
                <div style={styles.tableCell}>Size</div>
              </div>
              {exportHistory.map(exportItem => (
                <div key={exportItem.id} style={styles.tableRow}>
                  <div style={styles.tableCell}>{exportItem.date}</div>
                  <div style={styles.tableCell}>{exportItem.period}</div>
                  <div style={styles.tableCell}>{exportItem.columns}</div>
                  <div style={styles.tableCell}>{exportItem.downloadedBy}</div>
                  <div style={{
                    ...styles.tableCell,
                    ...styles[`status${exportItem.status.charAt(0).toUpperCase() + exportItem.status.slice(1)}`]
                  }}>
                    {exportItem.status}
                  </div>
                  <div style={styles.tableCell}>{exportItem.size}</div>
                </div>
              ))}
            </div>
            <div style={styles.auditNote}>
              All exports are logged with IP address and timestamp. Data retention: 7 years for compliance.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#1a365d',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 16px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '32px',
    padding: '0 8px',
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: '#4299e1',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    marginRight: '12px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  nav: {
    flex: 1,
  },
  navSection: {
    marginBottom: '24px',
  },
  navHeader: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#a0aec0',
    marginBottom: '12px',
    padding: '0 8px',
  },
  navLink: {
    display: 'block',
    color: '#cbd5e0',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    marginBottom: '4px',
    transition: 'background-color 0.2s',
    fontSize: '14px',
  },
  navLinkActive: {
    display: 'block',
    color: 'white',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    marginBottom: '4px',
    backgroundColor: '#2d3748',
    fontWeight: '500',
    fontSize: '14px',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 8px',
    backgroundColor: '#2d3748',
    borderRadius: '8px',
    marginTop: 'auto',
  },
  avatar: {
    width: '36px',
    height: '36px',
    backgroundColor: '#4a5568',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '12px',
    fontWeight: '500',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: '14px',
    fontWeight: '500',
  },
  userRole: {
    fontSize: '12px',
    color: '#a0aec0',
  },
  mainContent: {
    flex: 1,
    padding: '32px',
    overflow: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#1a365d',
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  badge: {
    backgroundColor: '#fed7d7',
    color: '#9b2c2c',
    padding: '6px oj12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '500',
  },
  lastExport: {
    color: '#718096',
    fontSize: '14px',
  },
  contentGrid: {
    display: 'grid',
    gap: '24px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#2d3748',
    margin: '0 0 24px 0',
  },
  periodSelector: {
    display: 'flex',
    gap: '32px',
    marginBottom: '32px',
  },
  monthPicker: {
    flex: 1,
  },
  monthPickerLabel: {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '12px',
  },
  monthOptions: {
    display: 'flex',
    gap: '12px',
  },
  monthOption: {
    flex: 1,
    padding: '16px',
    backgroundColor: '#f7fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  monthOptionActive: {
    backgroundColor: '#ebf8ff',
    borderColor: '#4299e1',
    boxShadow: '0 0 0седа1px #4299e1',
  },
  monthOptionLocked: {
    backgroundColor: '#f0fff4',
    borderColor: '#9ae6b4',
  },
  monthName: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#2d3748',
    marginBottom: '8px',
  },
  monthStatus: {
    fontSize: '12px',
  },
  lockedBadge: {
    color: '#38a169',
    backgroundColor: '#c6f6d5',
    padding: '2px 8px',
    borderRadius: '12px',
    display: 'inline-block',
  },
  unlockedBadge: {
    color: '#dd6b20',
    backgroundColor: '#fed7d7',
    padding: '2px 8px',
    borderRadius: '12px',
    display: 'inline-block',
  },
  periodStatus: {
    width: '300px',
  },
  statusIndicator: {
    marginBottom: '16px',
  },
  statusLabel: {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '4px',
  },
  statusValue: {
    fontSize: '18px',
    fontWeight: '600',
    padding: '8px 12px',
    borderRadius: '6px',
  },
  statusLocked: {
    color: '#38a169',
    backgroundColor: '#f0fff4',
  },
  statusUnlocked: {
    color: '#dd6b20',
    backgroundColor: '#fffaf0',
  },
  lockButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'background-color 0.2s',
  },
  lockIcon: {
    fontSize: '18px',
  },
  policySection: {
    marginTop: '32px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#4a5568',
    margin: '0 0 16px 0',
  },
  policyCard: {
    backgroundColor: '#f7fafc',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  policyVersion: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  versionBadge: {
    backgroundColor: '#4299e1',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
  },
  versionDate: {
    color: '#718096',
    fontSize: '14px',
  },
  policyDescription: {
    color: '#4a5568',
    fontSize: '14px',
    marginBottom: '16px',
  },
  policyHistory: {
    borderTop: '1px solid #e2e8f0',
    paddingTop: '16px',
  },
  historyTitle: {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '8px',
  },
  historyItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#4a5568',
    marginBottom: '4px',
  },
  historyDate: {
    color: '#718096',
  },
  columnsSelector: {
    marginBottom: '24px',
  },
  columnCategories: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    marginBottom: '24px',
  },
  category: {
    backgroundColor: '#f7fafc',
    padding: '16px',
    borderRadius: '8px',
  },
  categoryTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '12px',
  },
  columnCheckbox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    cursor: 'pointer',
  },
  checkbox: {
    marginRight: '8px',
  },
  checkboxLabel: {
    fontSize: '14px',
    color: '#2d3748',
    flex: 1,
  },
  defaultBadge: {
    fontSize: '11px',
    color: '#718096',
    backgroundColor: '#edf2f7',
    padding: '2px 6px',
    borderRadius: '4px',
  },
  exportSummary: {
    display: 'flex',
    gap: '24px',
    padding: '16px',
    backgroundColor: '#f0fff4',
    borderRadius: '8px',
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#718096',
    marginBottom: '4px',
  },
  summaryValue: {
    display: 'block',
    fontSize: '16px',
    fontWeight: '600',
    color: '#2d3748',
  },
  exportButton: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#38a169',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    transition: 'background-color 0.2s',
    marginBottom: '16px',
  },
  exportIcon: {
    fontSize: '20px',
  },
  securityNote: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '16px',
    backgroundColor: '#ebf8ff',
    borderRadius: '8px',
    border: '1px solid #bee3f8',
  },
  securityIcon: {
    fontSize: '20px',
  },
  securityText: {
    fontSize: '14px',
    color: '#2b6cb0',
    flex: 1,
  },
  apiSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  apiKeySection: {
    backgroundColor: '#f7fafc',
    padding: '16px',
    borderRadius: '8px',
  },
  apiKeyLabel: {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '8px',
  },
  apiKeyDisplay: {
    display: 'flex',
    gap: '8px',
    marginBottom: '16px',
  },
  apiKeyInput: {
    flex: 1,
    padding: '12px',
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontFamily: 'monospace',
    fontSize: '14px',
  },
  apiKeyToggle: {
    padding: '12px 16px',
    backgroundColor: '#edf2f7',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  apiKeyCopy: {
    padding: '12px 16px',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  apiKeyActions: {
    display: 'flex',
    gap: '12px',
  },
  apiKeyButton: {
    padding: '8px 16px',
    backgroundColor: '#edf2f7',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  apiDocs: {
    backgroundColor: '#f7fafc',
    padding: '16px',
    borderRadius: '8px',
  },
  apiEndpoint: {
    marginBottom: '16px',
  },
  endpointCode: {
    display: 'block',
    backgroundColor: '#1a365d',
    color: '#a0aec0',
    padding: '12px',
    borderRadius: '6px',
    fontFamily: 'monospace',
    fontSize: '14px',
    marginBottom: '4px',
  },
  endpointDesc: {
    fontSize: '14px',
    color: '#718096',
    paddingLeft: '4px',
  },
  historyTable: {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    backgroundColor: '#f7fafc',
    padding: '12px 16px',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a5568',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    padding: '12px 16px',
    borderBottom: '1px solid #e2e8f0',
    fontSize: '14px',
    color: '#2d3748',
    transition: 'background-color 0.2s',
  },
  tableCell: {
    display: 'flex',
    alignItems: 'center',
  },
  statusCompleted: {
    color: '#38a169',
    fontWeight: '500',
  },
  statusPending: {
    color: '#d69e2e',
    fontWeight: '500',
  },
  auditNote: {
    fontSize: '14px',
    color: '#718096',
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#f7fafc',
    borderRadius: '6px',
  },
};