function HomeDashboard() {
  // Mock employee data
  const employee = {
    id: 'EMP-12345',
    firstName: 'Alex',
    lastName: 'Johnson',
    department: 'Engineering',
    role: 'Senior Software Engineer',
    shiftType: 'Fixed',
    timezone: 'UTC-5',
    joiningDate: '2021-03-15',
    managerName: 'Sarah Chen'
  };

  // Mock current time and shift
  const currentTime = new Date();
  const shiftStart = new Date(currentTime);
  shiftStart.setHours(9, тридцать, 0); // 9:30 AM
  const shiftEnd = new Date(currentTime);
  shiftEnd.setHours(18, 0, 0); // 6:00 PM
  
  // Calculate time remaining
  const getTimeRemaining = () => {
    const now = new Date();
    if (now < shiftStart) {
      const diff = shiftStart - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `Shift starts in ${hours}h ${minutes}m`;
    } else if (now < shiftEnd) {
      const diff = shiftEnd - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `Shift ends in ${hours}h ${minutes}m`;
    }
    return 'Shift completed for today';
  };

  // Attendance status
  const [attendanceStatus, setAttendanceStatus] = React.useState({
    clockedIn: true,
    clockInTime: '09:28 AM',
    clockOutTime: null,
    todayStatus: 'Present',
    lateMinutes: 2,
    currentShift: 'Regular Shift (9:30 AM - 6:00 PM)'
  });

  // Pending leave requests
  const [pendingLeaves, setPendingLeaves] = React.useState([
    { id: 1, employeeName: 'Michael Rodriguez', leaveType: 'Annual Leave', dates: 'May 15-19, 2024', status: 'Pending Approval', days: 5 },
    { id: 2, employeeName: 'Jennifer Kim', leaveType: 'Sick Leave', dates: 'May Pending Approval: Needs medical certificate', days: 2 },
    { id: 3, employeeName: 'David Wong', leaveType: 'Parental Leave', dates: 'Jun 1 - Jul 15, 2024', status: 'Pending HR Review', days: 45 }
  ]);

  // Notifications
  const [notifications, setNotifications] = React.useState([
    { id: 1, type: 'warning', title: 'Late Arrival Alert', message: '2 team members arrived late yesterday', time: '8:45 AM' },
    { id: 2, type: 'info', title: 'Payroll Processing', message: 'Monthly attendance data exported successfully', time: 'Yesterday, 5:30 PM' },
    { id: 3, type: 'success', title: 'Leave Approved', message: 'Your annual leave for May 20-24 has been approved', time: 'May 10, 2024' },
    { id: 4, type: 'reminder', title: 'Shift Change Reminder', message: 'Your shift changes to flexible hours next week', time: 'May 9, 2024' }
  ]);

  // Role-based metrics
  const [metrics, setMetrics] = React.useState({
    attendancePercentage: 96.7,
    lateArrivals: 3,
    leaveUtilization: 65,
    teamAttendance: 94.2,
    monthlyOvertime: 12.5,
    pendingApprovals: 7
  });

  // Clock action handler
  const handleClockAction = () => {
    if (attendanceStatus.clockedIn) {
      const newClockOutTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setAttendanceStatus(prev => ({
        ...prev,
        clockedIn: false,
        clockOutTime: newClockOutTime,
        todayStatus: 'Completed'
      }));
    } else {
      const newClockInTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const lateMinutes = Math.max(0, (new Date() - shiftStart) / (1000 * 60));
      setAttendanceStatus(prev => ({
        ...prev,
        clockedIn: true,
        clockInTime: newClockInTime,
        clockOutTime: null,
        todayStatus: 'Present',
        lateMinutes: Math.floor(lateMinutes)
      }));
    }
  };

  // Sync status
  const [syncStatus, setSyncStatus] = React.useState({
    online: true,
    lastSync: '2 minutes ago',
    pendingOperations: 0,
    deviceName: 'WorkPulse Desktop App v2.1.4'
  });

  // Handle leave approval
  const handleApproveLeave = (leaveId) => {
    setPendingLeaves(prev => prev.filter(leave => leave.id !== leaveId));
    setNotifications(prev => [
      { id: Date.now(), type: 'info', title: 'Leave Approved', message: 'You approved a leave request', time: 'Just now' },
      ...prev
    ]);
  };

  // Handle notification dismissal
  const handleDismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  // Format date nicely
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.logo}>WorkPulse</h1>
          <span style={styles.roleBadge}>{employee.role}</span>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>{employee.firstName.charAt(0)}</div>
            <div>
              <div style={styles.userName}>{employee.firstName} {employee.lastName}</div>
              <div style={styles.userDept}>{employee.department}</div>
            </div>
          </div>
        </div>
      </header>

      <div style={styles.layout}>
        {/* Sidebar Navigation */}
        <nav style={styles.sidebar}>
          <ul style={styles.navList}>
            <li style={styles.navItemActive}>
              <span style={styles.navIcon}>📊</span>
              <span style={styles.navText}>Dashboard</span>
            </li>
            <li style={styles.navItem}>
              <span style={styles.navIcon}>⏰</span>
              <span style={styles.navText}>Clock In/Out</span>
            </li>
            <li style={styles.navItem}>
              <span style={styles.navIcon}>📅</span>
              <span style={styles.navText}>Attendance Calendar</span>
            </li>
            <li style={styles.navItem}>
              <span style={styles.navIcon}>🏖️</span>
              <span style={styles.navText}>My Leave</span>
            </li>
            <li style={styles.navItem}>
              <span style={styles.navIcon}>👥</span>
              <span style={styles.navText}>Team Attendance</span>
            </li>
            <li style={styles.navItem}>
              <span style={styles.navIcon}>📋</span>
              <span style={styles.navText}>Shift Roster</span>
            </li>
            <li style={styles.navItem}>
              <span style={styles.navIcon}>✅</span>
              <span style={styles.navText}>Approvals</span>
            </li>
            <div style={styles.syncStatus}>
              <div style={{...styles.syncIndicator, backgroundColor: syncStatus.online ? '#10b981' : '#ef4444'}}></div>
              <span style={styles.syncText}>
                {syncStatus.online ? 'Online' : 'Offline'} • {syncStatus.lastSync}
              </span>
            </div>
          </ul>
        </nav>

        {/* Main Content */}
        <main style={styles.mainContent}>
          {/* Welcome Banner */}
          <div style={styles.welcomeBanner}>
            <div>
              <h2 style={styles.welcomeTitle}>Welcome back, {employee.firstName}! 👋</h2>
              <p style={styles.welcomeDate}>{formatDate(currentTime)}</p>
            </div>
            <div style={styles.timeRemaining}>
              <span style={styles.timerLabel}>Today's Shift</span>
              <span style={styles.timer}>{getTimeRemaining()}</span>
            </div>
          </div>

          {/* Clock Action & Status Cards */}
          <div style={styles.quickActionsRow}>
            <div style={styles.clockCard}>
              <div style={styles.clockHeader}>
                <h3 style={styles.clockTitle}>Current Status</h3>
                <span style={styles.clockStatus}>{attendanceStatus.todayStatus}</span>
              </div>
              <div style={styles.clockDetails}>
                <div style={styles.clockTime}>
                  <div style={styles.timeBlock}>
                    <span style={styles.timeLabel}>Clock In</span>
                    <span style={styles.timeValue}>{attendanceStatus.clockInTime}</span>
                  </div>
                  {attendanceStatus.clockOutTime && (
                    <div style={styles.timeBlock}>
                      <span style={styles.timeLabel}>Clock Out</span>
                      <span style={styles.timeValue}>{attendanceStatus.clockOutTime}</span>
                    </div>
                  )}
                </div>
                <button 
                  style={{
                    ...styles.clockButton,
                    backgroundColor: attendanceStatus.clockedIn ? '#ef4444' : '#3b82f6'
                  }}
                  onClick={handleClockAction}
                >
                  {attendanceStatus.clockedIn ? 'Clock Out Now' : 'Clock In Now'}
                </button>
              </div>
            </div>

            {/* Metrics Cards */}
            <div style={styles.metricsGrid}>
              <div style={styles.metricCard}>
                <div style={styles.metricIcon}>📈</div>
                <div style={styles.metricContent}>
                  <span style={styles.metricValue}>{metrics.attendancePercentage}%</span>
                  <span style={styles.metricLabel}>Attendance Rate</span>
                </div>
              </div>
              <div style={styles.metricCard}>
                <div style={styles.metricIcon}>⏰</div>
                <div style={styles.metricContent}>
                  <span style={styles.metricValue}>{metrics.lateArrivals}</span>
                  <span style={styles.metricLabel}>Late Arrivals (This Month)</span>
                </div>
              </div>
              <div style={styles.metricCard}>
                <div style={styles.metricIcon}>🏖️</div>
                <div style={styles.metricContent}>
                  <span style={styles.metricValue}>{metrics.leaveUtilization}%</span>
                  <span style={styles.metricLabel}>Leave Utilization</span>
                </div>
              </div>
              <div style={styles.metricCard}>
                <div style={styles.metricIcon}>👥</div>
                <div style={styles.metricContent}>
                  <span style={styles.metricValue}>{metrics.teamAttendance}%</span>
                  <span style={styles.metricLabel}>Team Attendance</span>
                </div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div style={styles.twoColumn}>
            {/* Left Column: Pending Approvals */}
            <div style={styles.column}>
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Pending Leave Approvals</h3>
                  <span style={styles.cardBadge}>{pendingLeaves.length}</span>
                </div>
                <div style={styles.cardBody}>
                  {pendingLeaves.map(leave => (
                    <div key={leave.id} style={styles.leaveItem}>
                      <div style={styles.leaveInfo}>
                        <div style={styles.leaveEmployee}>{leave.employeeName}</div>
                        <div style={styles.leaveType}>{leave.leaveType}</div>
                        <div style={styles.leaveDates}>{leave.dates}</div>
                        <div style={styles.leaveDays}>{leave.days} days</div>
                      </div>
                      <button 
                        style={styles.approveButton}
                        onClick={() => handleApproveLeave(leave.id)}
                      >
                        Review
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>This Month's Summary</h3>
                </div>
                <div style={styles.cardBody}>
                  <div style={styles.statsGrid}>
                    <div style={styles.statItem}>
                      <span style={styles.statValue}>{metrics.monthlyOvertime}h</span>
                      <span style={styles.statLabel}>Overtime</span>
                    </div>
                    <div style={styles.statItem}>
                      <span style={styles.statValue}>{metrics.pendingApprovals}</span>
                      <span style={styles.statLabel}>Pending Approvals</span>
                    </div>
                    <div style={styles.statItem}>
                      <span style={styles.statValue}>98.5%</span>
                      <span style={styles.statLabel}>On-time Clock-ins</span>
                    </div>
                    <div style={styles.statItem}>
                      <span style={styles.statValue}>0</span>
                      <span style={styles.statLabel}>Conflicts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Notifications */}
            <div style={styles.column}>
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Recent Notifications</h3>
                </div>
                <div style={styles.cardBody}>
                  {notifications.map(notification => (
                    <div key={notification.id} style={styles.notificationItem}>
                      <div style={{
                        ...styles.notificationIcon,
                        backgroundColor: 
                          notification.type === 'warning' ? '#fbbf24' :
                          notification.type === 'info' ? '#3b82f6' :
                          notification.type === 'success' ? '#10b981' : '#8b5cf6'
                      }}>
                        {notification.type === 'warning' ? '⚠️' :
                         notification.type === 'info' ? 'ℹ️' :
                         notification.type === 'success' ? '✓' : '⏰'}
                      </div>
                      <div style={styles.notificationContent}>
                        <div style={styles.notificationTitle}>{notification.title}</div>
                        <div style={styles.notificationMessage}>{notification.message}</div>
                        <div style={styles.notificationTime}>{notification.time}</div>
                      </div>
                      <button 
                        style={styles.dismissButton}
                        onClick={() => handleDismissNotification(notification.id)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Device Info */}
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>Device & Sync Status</h3>
                </div>
                <div style={styles.cardBody}>
                  <div style={styles.deviceInfo}>
                    <div style={styles.deviceRow}>
                      <span style={styles.deviceLabel}>Connection:</span>
                      <span style={{
                        ...styles.deviceValue,
                        color: syncStatus.online ? '#10b981' : '#ef4444'
                      }}>
                        {syncStatus.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                    <div style={styles.deviceRow}>
                      <span style={styles.deviceLabel}>Last Sync:</span>
                      <span style={styles.deviceValue}>{syncStatus.lastSync}</span>
                    </div>
                    <div style={styles.deviceRow}>
                      <span style={styles.deviceLabel}>Device:</span>
                      <span style={styles.deviceValue}>{syncStatus.deviceName}</span>
                    </div>
                    <div style={styles.deviceRow}>
                      <span style={styles.deviceLabel}>Pending Operations:</span>
                      <span style={styles.deviceValue}>{syncStatus.pendingOperations}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    color: '#1e293b'
  },
  header: {
    backgroundColor: '#ffffff',
    padding: '16px 24px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#3b82f6',
    margin: 0
  },
  roleBadge: {
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '16px'
  },
  userName: {
    fontWeight: '600',
    fontSize: '14px'
  },
  userDept: {
    color: '#64748b',
    fontSize: '12px'
  },
  layout: {
    display: 'flex',
    minHeight: 'calc(100vh - 73px)'
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #e2e8f0',
    padding: '24px 0'
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  navItem: {
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    color: '#64748b',
    fontSize: '14px',
    transition: 'all 0.2s'
  },
  navItemActive: {
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    color: '#3b82f6',
    fontSize: '14px',
    backgroundColor: '#eff6ff',
    borderRight: '3px solid #3b82f6',
    fontWeight: '500'
  },
  navIcon: {
    fontSize: '18px'
  },
  navText: {
    flex: 1
  },
  syncStatus: {
    marginTop: '24px',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#64748b'
  },
  syncIndicator: {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  syncText: {
    fontSize: '12px'
  },
  mainContent: {
    flex: 1,
    padding: '24px',
    overflow: 'auto'
  },
  welcomeBanner: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 ;text-shadow: none; 1px rgba(0,0,0,0.05)'
  },
  welcomeTitle: {
    fontSize: '24px',
    fontWeight: '600',
    margin: '0 0 8px 0',
    color: '#1e293b'
  },
  welcomeDate: {
    color: '#64748b',
    margin: 0
  },
  timeRemaining: {
    textAlign: 'right'
  },
  timerLabel: {
    display: 'block',
    color: '#64748b',
    fontSize: '12px',
    marginBottom: '4px'
  },
  timer: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#3b82f6'
  },
  quickActionsRow: {
    display: 'flex',
    gap: '24px',
    marginBottom: '24px'
  },
  clockCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    flex: '1',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  clockHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  clockTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0
  },
  clockStatus: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500'
  },
  clockDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  clockTime: {
    display: 'flex',
    gap: '24px'
  },
  timeBlock: {
    display: 'flex',
    flexDirection: 'column'
  },
  timeLabel: {
    color: '#64748b',
    fontSize: '12px',
    marginBottom: '4px'
  },
  timeValue: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1e293b'
  },
  clockButton: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    flex: '1'
  },
  metricCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  metricIcon: {
    fontSize: '24px',
    width: '48px',
    height: '48px',
    backgroundColor: '#eff6ff',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3b82f6'
  },
  metricContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  metricValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b'
  },
  metricLabel: {
    color: '#64748b',
    fontSize: '12px',
    marginTop: '4px'
  },
  twoColumn: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  cardHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0
  },
  cardBadge: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '600'
  },
  cardBody: {
    padding: '24px'
  },
  leaveItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #f1f5f9'
  },
  leaveItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #f1f5f9'
  },
  leaveItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid #f1f5f9'
  },
  leaveInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  leaveEmployee: {
    fontWeight: '600',
    fontSize: '14px'
  },
  leaveType: {
    color: '#64748b',
    fontSize: '12px'
  },
  leaveDates: {
    color: '#3b82f6',
    fontSize: '12px'
  },
  leaveDays: {
    color: '#ef4444',
    fontSize: '12px',
    fontWeight: '500'
  },
  approveButton: {
    backgroundColor: 'transparent',
    color: '#3b82f6',
    border: '1px solid #3b82f6',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px'
  },
  statValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '4px'
  },
  statLabel: {
    color: '#64748b',
    fontSize: '12px',
    textAlign: 'center'
  },
  notificationItem: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '16px 0',
    borderBottom: '1px solid #f1f5f9',
    gap: '12px'
  },
  notificationIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '16px'
  },
  notificationContent: {
    flex: 1
  },
  notificationTitle: {
    fontWeight: '600',
    fontSize: '14px',
    marginBottom: '4px'
  },
  notificationMessage: {
    color: '#64748b',
    fontSize: '12px',
    marginBottom: '4px'
  },
  notificationTime: {
    color: '#94a3b8',
    fontSize: '11px'
  },
  dismissButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#94a3b8',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '0',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px'
  },
  deviceInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  deviceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #f1f5f9'
  },
  deviceLabel: {
    color: '#64748b',
    fontSize: '14px'
  },
  deviceValue: {
    fontWeight: '500',
    fontSize: '14px',
    color: '#1e293b'
  }
};