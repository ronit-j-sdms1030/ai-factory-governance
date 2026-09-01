function FinanceDashboard() {
  const [dateRange, setDateRange] = React.useState('last-week');
  const [selectedSites, setSelectedSites] = React.useState(['site-1', 'site-2', 'site-3']);
  const [manualReviewQueue, setManualReviewQueue] = React.useState([
    { id: 'req-456', staffName: 'John Smith', site: 'London East', sku: 'SKU-78945', description: 'Cotton T-Shirt Blue XL', quantity: 42, submittedAt: '2024-03-15 14:30', reason: 'Quantity adjustment needed', sapError: 'SAP item quantity mismatch' },
    { id: 'req-789', staffName: 'Sarah Johnson', site: 'Manchester', sku: 'SKU-matrix-123', description: 'Gaming Headset Pro', quantity: ×, submittedAt: '2024-03-14 09:15', reason: 'Severity tier conflict', sapError: 'Damage reason code invalid' },
    { id: 'req-234', staffName: 'Michael Chen', site: 'Birmingham', sku: 'SKU-food -88', description: 'Organic Coffee Beans 500g', quantity: 18, submittedAt: '2024-03-13 16:45', reason: 'Item validation failed', sapError: 'SAP validation timeout' },
    { id: 'req.567', staffName: 'Emma Wilson', site: 'London East', sku: 'SKU-90210', description: 'Premium Yoga Mat', quantity: 9, submittedAt: '2024-03-G 11:20', reason: 'Photo upload incomplete', sapError: 'Missing mandatory photo' }
  ]);
  const [selectedForApprove, setSelectedForApprove] = React.useState({});
  const [refreshTimestamp, setRefreshTimestamp] = React.useState(Date.now());
  const [exportData, setExportData] = React.useState([]);

  const sites = [
    { id: 'site-1', name: 'London East', plantCode: 'LDN-E' },
    { id: 'site-2', name: 'Manchester', plantCode: 'MAN' },
    { id: 'site-3', name: 'Birmingham', plantCode: 'BHM' }
  ];

  const financeReports = [
    { reportId: 'F-2024-001', name: 'Monthly Write-off Summary', period: 'March 2024', generated: '2024-03-16', status: 'Ready', size: '2.4 MB' },
    { reportId: 'F-2024-002', name: 'SAP Sync Audit Report', period: 'Q1 2024', generated: '2024-03-15', status: 'Ready', size: '1.8 MB' },
    { reportId: 'F-2024-003', name: 'Damaged Stock Analysis', period: 'Feb 2024', generated: '2024-03-10', status: 'Ready', size: '3.2 MB' },
    { reportId: 'F-2024-004', name: 'Supervisor Approval Metrics', period: 'Weekly', generated: '2024-03-09', status: 'Processing', size: '0.9 MB' },
    { reportId: 'F-2024-005', name: 'Financial Impact Report', period: 'YTD 2024', generated: '2024-03-08', status: 'Ready', size: '4.1 MB' }
  ];

  const metrics = {
    totalWriteOffValue: '£28,450',
    syncSuccessRate: '94.7%',
    pendingReviewCount: 24
  };

  const handleDateRangeChange = (value) => {
    setDateRange(value);
    // Simulate data refresh with new date range
    console.log('Date range changed to:', value);
    setRefreshTimestamp(Date.now());
  };

  const handleSiteToggle = (siteId) => {
    setSelectedSites(prev => {
      if (prev.includes(siteId)) {
        return prev.filter(id => id !== siteId);
      } else {
        return [...prev, siteId];
      }
    });
  };

  const handleSelectAllSites = () => {
    setSelectedSites(sites.map(site => site.id));
  };

  const handleClearSites = () => {
    setSelectedSites([]);
  };

  const handleSelectForApprove = (requestId) => {
    setSelectedForApprove(prev => ({
      ...prev,
      [requestId]: !prev[requestId]
    }));
  };

  const handleBulkApprove = () => {
    const selectedIds = Object.keys(selectedForApprove).filter(id => selectedForApprove[id]);
    if (selectedIds.length === 0) {
      alert('Please select at least one request for bulk approval');
      return;
    }
    
    // Simulate approval process
    alert(`Bulk approving ${selectedIds.length} requests... This will sync adjusted quantities to SAP.`);
    
    // Remove approved items from queue
    setManualReviewQueue(prev => prev.filter(item => !selectedIds.includes(item.id)));
    setSelectedForApprove({});
    
    // Update metrics
    metrics.pendingReviewCount -= selectedIds.length;
    console.log('Bulk approval completed for:', selectedIds);
  };

  const handleRefreshData = () => {
    setRefreshTimestamp(Date.now());
    alert('Refreshing real-time data... Latest metrics and queue updated.');
    // In a real app, this would trigger a data fetch
  };

  const handleExport = () => {
    const exportPayload = {
      dateRange,
      selectedSites,
      manualReviewQueue,
      financeReports,
      metrics,
      sapFailureReasons: manualReviewQueue.map(item => ({
        requestId: item.id,
        sapError: item.sapError,
        resolutionNeeded: item.reason
      }))
    };
    
    setExportData(exportPayload);
    alert('Export prepared with SAP failure reasons. Downloading CSV file...');
    console.log('Export data:', exportPayload);
  };

  const handleDownloadReport = (reportId) => {
    const report = financeReports.find(r => r.reportId === reportId);
    alert(`Downloading ${report.name} (${report.size})...`);
  };

  return (
    <div style={styles.container}>
      {/* Top Navigation */}
      <div style={styles.topNav}>
        <div style={styles.navLeft}>
          <div style={styles.logo}>Stark Digital</div>
          <div style={styles.appName}>Finance Dashboard</div>
        </div>
        <div style={styles.navRight}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>FD</div>
            <div style={styles.userDetails}>
              <div style={styles.userName}>Finance Department</div>
              <div style={styles.userRole}>Role: FINANCE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarHeader}>Navigation</div>
          <div style={styles.navItem}>Finance Dashboard</div>
          <div style={styles.navItem}>Write-off Reports</div>
          <div style={styles.navItem}>SAP Integration</div>
          <div style={styles.navItem}>Audit Logs</div>
          <div style={styles.navItem}>Settings</div>
          
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarHeader}>Quick Actions</div>
            <button style={styles.sidebarButton} onClick={handleRefreshData}>
              Refresh Data
            </button>
            <button style={styles.sidebarButton} onClick={handleExport}>
              Export All Data
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div style={styles.dashboardContent}>
          {/* Header with Controls */}
          <div style={styles.dashboardHeader}>
            <div style={styles.headerLeft}>
              <h1 style={styles.pageTitle}>Finance Oversight Dashboard</h1>
              <div style={styles.subtitle}>Comprehensive reports and manual review management</div>
            </div>
            <div style={styles.headerRight}>
              <div style={styles.controlGroup}>
                <label style={styles.controlLabel}>Date Range:</label>
                <select 
                  style={styles.select} 
                  value={dateRange} 
                  onChange={(e) => handleDateRangeChange(e.target.value)}
                >
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last-week">Last 7 Days</option>
                  <option value="this-month">This Month</option>
                  <option value="last-month">Last Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              
              <button style={styles.refreshButton} onClick={handleRefreshData}>
                <span style={styles.refreshIcon}>↻</span>
                Refresh Data
                <span style={styles.timestamp}>
                  Last: {new Date(refreshTimestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
              </button>
            </div>
          </div>

          {/* Metrics Dashboard */}
          <div style={styles.metricsGrid}>
            <div style={styles.metricCard}>
              <div style={styles.metricLabel}>Total Write-off Value</div>
              <div style={styles.metricValue}>{metrics.totalWriteOffValue}</div>
              <div style={styles.metricSubtitle}>Across all sites</div>
            </div>
            
            <div style={styles.metricCard}>
              <div style={styles.metricLabel}>SAP Sync Success Rate</div>
              <div style={styles.metricValue}>{metrics.syncSuccessRate}</div>
              <div style={styles.metricSubtitle}>Last 30 days</div>
            </div>
            
            <div style={styles.metricCard}>
              <div style={styles.metricLabel}>Pending Review Count</div>
              <div style={styles.metricValue}>{metrics.pendingReviewCount}</div>
              <div style={styles.metricSubtitle}>Across all queues</div>
            </div>
            
            <div style={styles.metricCard}>
              <div style={styles.metricLabel}>Export Data</div>
              <button style={styles.exportButton} onClick={handleExport}>
                Export with SAP Reasons
              </button>
              <div style={styles.metricSubtitle}>Includes failure analysis</div>
            </div>
          </div>

          {/* Site Filter */}
          <div style={styles.siteFilterSection}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Site Filter</h2>
              <div style={styles.filterActions}>
                <button style={styles.filterActionButton} onClick={handleSelectAllSites}>
                  Select All
                </button>
                <button style={styles.filterActionButton} onClick={handleClearSites}>
                  Clear All
                </button>
              </div>
            </div>
            
            <div style={styles.siteFilterGrid}>
              {sites.map(site => (
                <div key={site.id} style={styles.siteFilterItem}>
                  <input
                    type="checkbox"
                    id={`site-${site.id}`}
                    checked={selectedSites.includes(site.id)}
                    onChange={() => handleSiteToggle(site.id)}
                    style={styles.siteCheckbox}
                  />
                  <label htmlFor={`site-${site.id}`} style={styles.siteLabel}>
                    <div style={styles.siteName}>{site.name}</div>
                    <div style={styles.siteCode}>SAP: {site.plantCode}</div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* MANUAL_REVIEW Queue */}
          <div style={styles.manualReviewSection}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                MANUAL_REVIEW Queue
                <span style={styles.queueCount}>{manualReviewQueue.length} items</span>
              </h2>
              <div style={styles.queueActions}>
                <button 
                  style={styles.bulkApproveButton} 
                  onClick={handleBulkApprove}
                  disabled={Object.keys(selectedForApprove).filter(id => selectedForApprove[id]).length === 0}
                >
                  Bulk Approve Selected
                </button>
              </div>
            </div>
            
            <div style={styles.reviewTableContainer}>
              <table style={styles.reviewTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>
                      <input type="checkbox" style={styles.selectAllCheckbox} />
                    </th>
                    <th style={styles.tableHeader}>Request ID</th>
                    <th style={styles.tableHeader}>Staff</th>
                    <th style={styles.tableHeader}>Site</th>
                    <th style={styles.tableHeader}>Item</th>
                    <th style={styles.tableHeader}>Quantity</th>
                    <th style={styles.tableHeader}>Submitted</th>
                    <th style={styles.tableHeader}>Review Reason</th>
                    <th style={styles.tableHeader}>SAP Error</th>
                    <th style={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {manualReviewQueue.map(item => (
                    <tr key={item.id} style={styles.tableRow}>
                      <td style={styles.tableCell}>
                        <input
                          type="checkbox"
                          checked={!!selectedForApprove[item.id]}
                          onChange={() => handleSelectForApprove(item.id)}
                          style={styles.itemCheckbox}
                        />
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.requestId}>{item.id}</div>
                      </td>
                      <td style={styles.tableCell}>{item.staffName}</td>
                      <td style={styles.tableCell}>
                        <div style={styles.siteBadge}>{item.site}</div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.itemInfo}>
                          <div style={styles.itemSku}>{item.sku}</div>
                          <div style={styles.itemDescription}>{item.description}</div>
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.quantityCell}>{item.quantity}</div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.dateCell}>
                          {new Date(item.submittedAt).toLocaleDateString()}
                          <div style={styles.timeCell}>
                            {new Date(item.submittedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </div>
                        </div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.reasonCell}>{item.reason}</div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.errorCell}>{item.sapError}</div>
                      </td>
                      <td style={styles.tableCell}>
                        <div style={styles.actionButtons}>
                          <button style={styles.actionButton}>Review</button>
                          <button style={styles.actionButton}>Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Finance Reports Table */}
          <div style={styles.reportsSection}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Finance Reports</h2>
            </div>
            
            <div style={styles.reportsTableContainer}>
              <table style={styles.reportsTable}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Report ID</th>
                    <th style={styles.tableHeader}>Report Name</th>
                    <th style={styles.tableHeader}>Period</th>
                    <th style={styles.tableHeader}>Generated</th>
                    <th style={styles.tableHeader}>Status</th>
                    <th style={styles.tableHeader}>Size</th>
                    <th style={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {financeReports.map(report => (
                    <tr key={report.reportId} style={styles.tableRow}>
                      <td style={styles.tableCell}>
                        <div style={styles.reportId}>{report.reportId}</div>
                      </td>
                      <td style={styles.tableCell}>{report.name}</td>
                      <td style={styles.tableCell}>{report.period}</td>
                      <td style={styles.tableCell}>
                        {new Date(report.generated).toLocaleDateString()}
                      </td>
                      <td style={styles.tableCell}>
                        <div style={report.status === 'Ready' ? styles.statusReady : styles.statusProcessing}>
                          {report.status}
                        </div>
                      </td>
                      <td style={styles.tableCell}>{report.size}</td>
                      <td style={styles.tableCell}>
                        <button 
                          style={styles.downloadButton}
                          onClick={() => handleDownloadReport(report.reportId)}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
    backgroundColor: '#f5f7fa',
    minHeight: '100vh',
    color: '#333',
  },
  topNav: {
    backgroundColor: '#1a365d',
    color: 'white',
    padding: '0 24px',
    height: '64px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px监督管理px rgba(0,0,0,0.1)',
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#63b3ed',
  },
  appName: {
    fontSize: '16px',
    fontWeight: '600',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#4299e1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontWeight: '600',
    fontSize: '14px',
  },
  userRole: {
    fontSize: '12px',
    opacity: '0.9',
  },
  mainContent: {
    display: 'flex',
    minHeight: 'calc(100vh - 64px)',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#2d3748',
    color: 'white',
    padding: '20px 0',
  },
  sidebarHeader: {
    fontSize: '14px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#a0aec0',
    padding: '12px 20px',
    marginBottom: '8px',
  },
  navItem: {
    padding: '12px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    borderLeft: '3px solid transparent',
  },
  navItemHover: {
    backgroundColor: '#4a5568',
    borderLeft: '3px solid #4299e1',
  },
  sidebarSection: {
    marginTop: '32px',
  },
  sidebarButton: {
    width: '100%',
    padding: '12px 20px',
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  sidebarButtonHover: {
    backgroundColor: '#4a5568',
  },
  dashboardContent: {
    flex: '1',
    padding: '24px',
    overflowY: 'auto',
  },
  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
  },
  headerLeft: {
    flex: '1',
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a365d',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#718096',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  controlGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  controlLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a5568',
  },
  select: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    backgroundColor: 'white',
    fontSize: '14px',
    minWidth: '140px',
    cursor: 'pointer',
  },
  refreshButton: {
    padding: '10px 16px',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  refreshIcon: {
    fontSize: '16px',
  },
  timestamp: {
    fontSize: '12px',
    opacity: '0.9',
    marginLeft: '8px',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '32px',
  },
  metricCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '8px',
  },
  metricValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#1a365d',
    marginBottom: '4px',
  },
  metricSubtitle: {
    fontSize: '12px',
    color: '#a0aec0',
  },
  exportButton: {
    padding: '12px 24px',
    backgroundColor: '#38a169',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  siteFilterSection: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '32px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1a365d',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  queueCount: {
    fontSize: '14px',
    backgroundColor: '#ed8936',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
  },
  filterActions: {
    display: 'flex',
    gap: '8px',
  },
  filterActionButton: {
    padding: '8px 16px',
    backgroundColor: '#e2e8f0',
    color: '#4a5568',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  siteFilterGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  siteFilterItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  siteCheckbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
  },
  siteLabel: {
    cursor: 'pointer',
  },
  siteName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#2d3748',
  },
  siteCode: {
    fontSize: '14px',
    color: '#718096',
  },
  manualReviewSection: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '32px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  queueActions: {
    display: 'flex',
    gap: '12px',
  },
  bulkApproveButton: {
    padding: '10px 20px',
    backgroundColor: '#38a169',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  bulkApproveButtonDisabled: {
    backgroundColor: '#cbd5e0',
    cursor: 'not-allowed',
  },
  reviewTableContainer: {
    overflowX: 'auto',
  },
  reviewTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    padding: '16px',
    textAlign: 'left',
    borderBottom: '2px solid #e2e8f0',
    color: '#4a5568',
    fontWeight: '600',
    fontSize: '14px',
    backgroundColor: '#f7fafc',
  },
  selectAllCheckbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  tableRow: {
    borderBottom: '1px solid #e2e8f0',
    transition: 'background-color 0.2s',
  },
  tableRowHover: {
    backgroundColor: '#f7fafc',
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    color: '#4a5568',
  },
  itemCheckbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  requestId: {
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#2d3748',
    fontWeight: '600',
  },
  siteBadge: {
    display: 'inline-block',
    padding: '4px and',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
  },
  itemInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  itemSku: {
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#2d3748',
  },
  itemDescription: {
    fontSize: '12px',
    color: '#718096',
    marginTop: '2px',
  },
  quantityCell: {
    fontWeight: '600',
    fontSize: '16px',
    color: '#2d3748',
  },
  dateCell: {
    display: 'flex',
    flexDirection: 'column',
  },
  timeCell: {
    fontSize: '12px',
    color: '#718096',
    marginTop: '2px',
  },
  reasonCell: {
    maxWidth: '200px',
    padding: '8px',
    backgroundColor: '#fffaf0',
    borderRadius: '4px',
    borderLeft: '3px solid #ed8936',
    fontSize: '14px',
  },
  errorCell: {
    maxWidth: '200px',
    padding: '8px',
    backgroundColor: '#fff5f5',
    borderRadius: '4px',
    borderLeft: '3px solid #fc8181',
    fontSize: '14px',
    color: '#c53030',
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
  },
  actionButton: {
    padding: '6px 12px',
    backgroundColor: '#e2e8f0',
    color: '#4a5568',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'background-color 0.2s',
  },
  reportsSection: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  reportsTableContainer: {
    overflowX: 'auto',
  },
  reportsTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  reportId: {
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#2d3748',
    fontWeight: '600',
  },
  statusReady: {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#c6f6d5',
    color: '#276749',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  statusProcessing: {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#fed7d7',
    color: '#c53030',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  downloadButton: {
    padding: '6px 12px',
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    transition: 'background-color 0.2s',
  },
};
}