function TeamAttendance() {
  const [viewMode, setViewMode] = React.useState('daily');
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [pendingRequests, setPendingRequests] = React.useState([
    {
      id: 101,
      employee: { id: 2001, name: 'Sarah Chen', department: 'Engineering' },
      leaveType: 'Annual Leave',
      dates: 'May — 2024',
      reason: 'Family vacation',
      status: 'pending',
      requestedOn: 'Apr 28, 2024'
    },
    {
      id:四个, employee: { id: 2002, name: 'Michael Rodriguez', department: 'Sales' },
      leaveType: 'Sick Leave',
      dates: 'May  — 2024',
      reason: 'Medical appointment',
      status: 'pending',
      requestedOn: 'Apr 29, 2024'
    },
    {
      id: 103,
      employee: { id: 2003, name: 'Jennifer Lee', department: 'Marketing' },
      leaveType: 'Personal Leave',
      dates: 'May — 2024',
      reason: 'Home renovation',
      status: 'pending',
      requestedOn: 'Apr 30, 2024'
    }
  ]);
  const [conflictItems, setConflictItems] = React.useState([
    {
      id: 401,
      employee: { id: 3001, name: 'David Park', department: 'Operations' },
      date: 'Apr 26, 2024',
      issue: 'Double clock-in detected',
      deviceInfo: 'iOS Safari, iPhone 13',
      offlineOperationId: 501
    },
    {
      id: 402,
      employee: { id: 3002, name: 'Amanda Wilson', department: 'Customer Support' },
      date: 'Apr 27, 2024',
      issue: 'Missing clock-out',
      deviceInfo: 'Chrome, Windows Desktop',
      offlineOperationId: 502
    }
  ]);
  const [commentText, setCommentText] = React.useState('');
  const [activeRequestId, setActiveRequestId] = React.useState(null);
  const [teamStats, setTeamStats] = React.useState({
    totalTeam: 12,
    presentToday: 9,
    onLeave: 2,
    lateToday: 1,
    pendingApprovals: 3,
    attendanceRate: '92%'
  });
  
  // Mock team attendance data
  const teamMembers = [
    { id: 1, name: 'Alex Johnson', role: 'Senior Developer', department: 'Engineering', status: 'present', clockIn: '8:45 AM', clockOut: '5:30 PM', lateMinutes: 0 },
    { id: 2, name: 'Sarah Chen', role: 'Frontend Developer', department: 'Engineering', status: 'on_leave', clockIn: '-', clockOut: '-', lateMinutes: 0 },
    { id: 3, name: 'Michael Rodriguez', role: 'Sales Executive', department: 'Sales', status: 'late', clockIn: '9:15 AM', clockOut: '6:00 PM', lateMinutes: 15 },
    { id: 4, name: 'Jennifer Lee', role: 'Marketing Manager', department: 'Marketing', status: 'present', clockIn: '8:55 AM', clockOut: '5:45 PM', lateMinutes: 0 },
    { id: 5, name: 'David Park', role: 'Operations Lead', department: 'Operations', status: 'present', clockIn: '9:00 AM', clockOut: '5:30 PM', lateMinutes: 0 },
    { id: 6, name: 'Amanda Wilson', role: 'Support Specialist', department: 'Customer Support', status: 'present', clockIn: '8:30 AM', clockOut: '5:00 PM', lateMinutes: 0 },
    { id: 7, name: 'Robert Kim', role: 'Backend Developer', department: 'Engineering', status: 'present', clockIn: '8:50 AM', clockOut: '5:40 PM', lateMinutes: 0 },
    { id: 8, name: 'Lisa Thompson', role: 'Product Manager', department: 'Product', status: 'on_leave', clockIn: '-', clockOut: '-', lateMinutes: 0 },
    { id: 9, name: 'James Miller', role: 'UX Designer', department: 'Design', status: 'present', clockIn: '9:05 AM', clockOut: '6:10 PM', lateMinutes: 5 },
    { id: 10, name: 'Emma Davis', role: 'Data Analyst', department: 'Analytics', status: 'present', clockIn: '8:35 AM', clockOut: '5:25 PM', lateMinutes: 0 }
  ];
  
  const statusColors = {
    present: '#10B981',
    late: '#F59E0B',
    on_leave: '#6366F1',
    absent: '#EF4444',
    half_day: '#8B5CF6'
  };
  
  const statusLabels = {
    present: 'Present',
    late: 'Late',
    on_leave: 'On Leave',
    absent: 'Absent',
    half_day: 'Half Day'
  };
  
  const handleApproveRequest = (requestId) => {
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    setActiveRequestId(null);
    setCommentText('');
    setTeamStats(prev => ({ ...prev, pendingApprovals: prev.pendingApprovals - 1 }));
    alert(`Leave request #${requestId} approved`);
  };
  
  const handleRejectRequest = (requestId) => {
    if (!commentText.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    setPendingRequests(prev => prev.filter(req => req.id !== requestId));
    setActiveRequestId(null);
    setCommentText('');
    setTeamStats(prev => ({ ...prev, pendingApprovals: prev.pendingApprovals - 1 }));
    alert(`Leave request #${requestId} rejected with comment: "${commentText}"`);
  };
  
  const handleResolveConflict = (conflictId, resolution) => {
    setConflictItems(prev => prev.filter(item => item.id !== conflictId));
    alert(`Conflict #${conflictId} resolved as "${resolution}"`);
  };
  
  const handleSendReminder = (employeeId) => {
    alert(`Reminder sent to employee #${employeeId}`);
  };
  
  const handleDateChange = (direction) => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'daily') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewMode === 'weekly') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setSelectedDate(newDate);
  };
  
  const formatDateDisplay = () => {
    if (viewMode === 'daily') {
      return selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    } else if (viewMode === 'weekly') {
      const weekStart = new Date(selectedDate);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      return selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };
  
  return (
    <div style={styles.container}>
      {/* Sidebar Navigation */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>⚡</span>
          <span style={styles.logoText}>WorkPulse</span>
        </div>
        <nav style={styles.nav}>
          <div style={styles.navSection}>
            <div style={styles.navHeader}>Dashboard</div>
            <div style={styles.navItem}>Home</div>
          </div>
          <div style={styles.navSection}>
            <div style={styles.navHeader}>Attendance</div>
            <div style={{...styles.navItem, ...styles.navActive}}>Team Attendance</div>
            <div style={styles.navItem}>My Attendance</div>
            <div style={styles.navItem}>Clock In/Out</div>
          </div>
          <div style={styles.navSection}>
            <div style={styles.navHeader}>Leave</div>
            <div style={styles.navItem}>Request Leave</div>
            <div style={styles.navItem}>My Leave</div>
            <div style={styles.navItem}>Approvals</div>
          </div>
          <div style={styles.navSection}>
            <div style={styles.navHeader}>Roster & Payroll</div>
            <div style={styles.navItem}>Shift Roster</div>
            <div style={styles.navItem}>Payroll Export</div>
          </div>
        </nav>
        <div style={styles.userProfile}>
          <div style={styles.userAvatar}>JD</div>
          <div style={styles.userInfo}>
            <div style={styles.userName}>John Davis</div>
            <div style={styles.userRole}>Engineering Manager</div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div>
            <h1 style={styles.pageTitle}>Team Attendance</h1>
            <p style={styles.pageSubtitle}>Manage your team's attendance and approve leave requests</p>
          </div>
          <div style={styles.headerActions}>
            <button style={styles.notificationButton}>
              <span style={styles.notificationIcon}>🔔</span>
              <span style={styles.notificationBadge}>3</span>
            </button>
            <button style={styles.syncButton}>
              <span style={styles.syncIcon}>🔄</span>
              Sync Offline Data
            </button>
          </div>
        </header>
        
        {/* Statistics Cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{teamStats.totalTeam}</div>
            <div style={styles.statLabel}>Team Members</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{teamStats.presentToday}</div>
            <div style={styles.statLabel}>Present Today</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{teamStats.onLeave}</div>
            <div style={styles.statLabel}>On Leave</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{teamStats.lateToday}</div>
            <div style={styles.statLabel}>Late Today</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{teamStats.pendingApprovals}</div>
            <div style={styles.statLabel}>Pending Approvals</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{teamStats.attendanceRate}</div>
            <div style={styles.statLabel}>Attendance Rate</div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div style={styles.contentGrid}>
          {/* Left Column - Team Attendance */}
          <div style={styles.contentColumn}>
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Team Attendance</h2>
                <div style={styles.viewControls}>
                  <button 
                    style={{...styles.viewButton, ...(viewMode === 'daily' ? styles.viewButtonActive : {})}}
                    onClick={() => setViewMode('daily')}
                  >
                    Daily
                  </button>
                  <button 
                    style={{...styles.viewButton, ...(viewMode === 'weekly' ? styles.viewButtonActive : {})}}
                    onClick={() => setViewMode('weekly')}
                  >
                    Weekly
                  </button>
                  <button 
                    style={{...styles.viewButton, ...(viewMode === 'monthly' ? styles.viewButtonActive : {})}}
                    onClick={() => setViewMode('monthly')}
                  >
                    Monthly
                  </button>
                  <div style={styles.dateNavigation}>
                    <button style={styles.dateNavButton} onClick={() => handleDateChange('prev')}>←</button>
                    <span style={styles.currentDate}>{formatDateDisplay()}</span>
                    <button style={styles.dateNavButton} onClick={() => handleDateChange('next')}>→</button>
                  </div>
                </div>
              </div>
              
              <div style={styles.attendanceTable}>
                <div style={styles.tableHeader}>
                  <div style={styles.tableHeaderCell}>Employee</div>
                  <div style={styles.tableHeaderCell}>Role</div>
                  <div style={styles.tableHeaderCell}>Department</div>
                  <div style={styles.tableHeaderCell}>Status</div>
                  <div style={styles.tableHeaderCell}>Clock In</div>
                  <div style={styles.tableHeaderCell}>Clock Out</div>
                  <div style={styles.tableHeaderCell}>Actions</div>
                </div>
                {teamMembers.map(member => (
                  <div key={member.id} style={styles.tableRow}>
                    <div style={styles.tableCell}>
                      <div style={styles.employeeInfo}>
                        <div style={styles.avatar}>{member.name.charAt(0)}</div>
                        <div>
                          <div style={styles.employeeName}>{member.name}</div>
                          <div style={styles.employeeId}>ID: EMP{member.id.toString().padStart(4, '0')}</div>
                        </div>
                      </div>
                    </div>
                    <div style={styles.tableCell}>{member.role}</div>
                    <div style={styles.tableCell}>{member.department}</div>
                    <div style={styles.tableCell}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: statusColors[member.status],
                        color: '#FFFFFF'
                      }}>
                        {statusLabels[member.status]}
                      </span>
                    </div>
                    <div style={styles.tableCell}>{member.clockIn}</div>
                    <div style={styles.tableCell}>{member.clockOut}</div>
                    <div style={styles.tableCell}>
                      <button 
                        style={styles.smallButton}
                        onClick={() => handleSendReminder(member.id)}
                      >
                        Send Reminder
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Pending Approvals & Conflicts */}
          <div style={styles.contentColumn}>
            {/* Pending Leave Approvals */}
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Pending Leave Approvals</h2>
                <span style={styles.badge}>{pendingRequests.length}</span>
              </div>
              
              {pendingRequests.map(request => (
                <div key={request.id} style={styles.approvalItem}>
                  <div style={styles.approvalHeader}>
                    <div style={styles.approvalEmployee}>
                      <div style={styles.avatarSmall}>{request.employee.name.charAt(0)}</div>
                      <div>
                        <div style={styles.approvalName}>{request.employee.name}</div>
                        <div style={styles.approvalDepartment}>{request.employee.department}</div>
                      </div>
                    </div>
                    <div style={styles.approvalType}>{request.leaveType}</div>
                  </div>
                  <div style={styles.approvalDetails}>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Dates:</span>
                      <span style={styles.detailValue}>{request.dates}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Reason:</span>
                      <span style={styles.detailValue}>{request.reason}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Requested:</span>
                      <span style={styles.detailValue}>{request.requestedOn}</span>
                    </div>
                  </div>
                  <div style={styles.approvalActions}>
                    <button 
                      style={styles.approveButton}
                      onClick={() => {
                        setActiveRequestId(request.id);
                        handleApproveRequest(request.id);
                      }}
                    >
                      Approve
                    </button>
                    <button 
                      style={styles.rejectButton}
                      onClick={() => {
                        setActiveRequestId(request.id);
                        if (commentText.trim()) {
                          handleRejectRequest(request.id);
                        }
                      }}
                    >
                      Reject
                    </button>
                  </div>
                  {activeRequestId === request.id && (
                    <div style={styles.commentSection}>
                      <textarea
                        style={styles.commentField}
                        placeholder="Add comment for rejection..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Conflict Resolution */}
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Conflict Resolution</h2>
                <span style={styles.badge}>{conflictItems.length}</span>
              </div>
              
              {conflictItems.map(conflict => (
                <div key={conflict.id} style={styles.conflictItem}>
                  <div style={styles.conflictHeader}>
                    <div style={styles.conflictEmployee}>
                      <div style={styles.avatarSmall}>{conflict.employee.name.charAt(0)}</div>
                      <div>
                        <div style={styles.conflictName}>{conflict.employee.name}</div>
                        <div style={styles.conflictDepartment}>{conflict.employee.department}</div>
                      </div>
                    </div>
                    <div style={styles.conflictDate}>{conflict.date}</div>
                  </div>
                  <div style={styles.conflictDetails}>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Issue:</span>
                      <span style={styles.detailValue}>{conflict.issue}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Device:</span>
                      <span style={styles.detailValue}>{conflict.deviceInfo}</span>
                    </div>
                  </div>
                  <div style={styles.conflictActions}>
                    <button 
                      style={styles.resolveButton}
                      onClick={() => handleResolveConflict(conflict.id, 'Accept')}
                    >
                      Accept Record
                    </button>
                    <button 
                      style={styles.resolveButtonSecondary}
                      onClick={() => handleResolveConflict(conflict.id, 'Reject')}
                    >
                      Reject Record
                    </button>
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
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#F9FAFB',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#1E293B',
    color: '#FFFFFF',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    paddingLeft: '8px'
  },
  logoIcon: {
    fontSize: '24px'
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#60A5FA'
  },
  nav: {
    flex: 1
  },
  navSection: {
    marginBottom: '32px'
  },
  navHeader: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '12px',
    paddingLeft: '8px'
  },
  navItem: {
    padding: '10px 12px',
    borderRadius: '6px',
    marginBottom: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '14px'
  },
  navActive: {
    backgroundColor: '#334155',
    fontWeight: '600'
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 8px',
    borderTop: '1px solid #334155',
    marginTop: 'auto'
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#3B82F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px'
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600'
  },
  userRole: {
    fontSize: '12px',
    color: '#94A3B8'
  },
  mainContent: {
    flex: 1,
    padding: '32px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px'
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1E293B',
    margin: '0 0 8px 0'
  },
  pageSubtitle: {
    fontSize: '14px',
    color: '#64748B',
    margin: 0
  },
  headerActions: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  notificationButton: {
    position: 'relative',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '8px'
  },
  notificationIcon: {
    fontSize: '20px'
  },
  notificationBadge: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    backgroundColor: '#EF4444',
    color: '#FFFFFF',
    fontSize: '10px',
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  syncButton: {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px嗎6px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  syncIcon: {
    fontSize: '16px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '16px',
    marginBottom: '32px'
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '12px',
    color: '#64748B',
    fontWeight: '500'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '24px'
  },
  contentColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '24px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1E293B',
    margin: 0
  },
  badge: {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: '600',
    padding: '4px 12px',
    borderRadius: '12px'
  },
  viewControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  viewButton: {
    padding: '6px 12px',
    border: '1px solid #D1D5DB',
    backgroundColor: 'transparent',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#6B7280'
  },
  viewButtonActive: {
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    borderColor: '#3B82F6'
  },
  dateNavigation: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginLeft: '16px'
  },
  dateNavButton: {
    backgroundColor: 'transparent',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontSize: '14px'
  },
  currentDate: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1E293B',
    minWidth: '180px',
    textAlign: 'center'
  },
  attendanceTable: {
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr',
    backgroundColor: '#F9FAFB',
    borderBottom: '1px solid #E5E7EB',
    padding: '16px'
  },
  tableHeaderCell: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 1fr',
    padding: '16px',
    borderBottom: '1px solid #E5E7EB',
    alignItems: 'center'
  },
  tableCell: {
    fontSize: '14px',
    color: '#374151'
  },
  employeeInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#3B82F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: '14px'
  },
  employeeName: {
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '2px'
  },
  employeeId: {
    fontSize: '12px',
    color: '#6B7280'
  },
  statusBadge: {
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'inline-block'
  },
  smallButton: {
    padding: '6px 12px',
    backgroundColor: '#F3F4F6',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    color: '#374151'
  },
  approvalItem: {
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px'
  },
  approvalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  approvalEmployee: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatarSmall: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#3B82F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: '14px'
  },
  approvalName: {
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '2px'
  },
  approvalDepartment: {
    fontSize: '12px',
    color: '#6B7280'
  },
  approvalType: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  },
  approvalDetails: {
    marginBottom: '16px'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '14px'
  },
  detailLabel: {
    color: '#6B7280',
    fontWeight: '500'
  },
  detailValue: {
    color: '#374151',
    fontWeight: '500'
  },
  approvalActions: {
    display: 'flex',
    gap: '12px'
  },
  approveButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#10B981',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  rejectButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#EF4444',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  commentSection: {
    marginTop: '16px'
  },
  commentField: {
    width: '100%',
    padding: '12px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '14px',
    resize: 'vertical',
    minHeight: '60px'
  },
  conflictItem: {
    border: '1px solid #E5E7EB',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px'
  },
  conflictHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  conflictEmployee: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  conflictName: {
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '2px'
  },
  conflictDepartment: {
    fontSize: '12px',
    color: '#6B7280'
  },
  conflictDate: {
    backgroundColor: '#F3F4F6',
    color: '#374151',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600'
  },
  conflictDetails: {
    marginBottom: '16px'
  },
  conflictActions: {
    display: 'flex',
    gap: '12px'
  },
  resolveButton: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#3B82F6',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  resolveButtonSecondary: {
    flex: 1,
    padding: '10px',
    backgroundColor: '#F3F4F6',
    color: '#374151',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};