function UserProfile() {
  const [activeTab, setActiveTab] = React.useState('personal');
  const [timezone, setTimezone] = React.useState('America/New_York');
  const [notificationPrefs, setNotificationPrefs] = React.useState({
    email: true,
    sms: true,
    push: true,
    clockInReminder: true,
    lateArrival: true,
    leaveApproval: true,
    missingClockOut: true,
    weeklySummary: false
  });
  const [attendancePrefs, setAttendancePrefs] = React.useState({
    manualLocationOverride: false,
    overrideLocation: 'Office - New York HQ'
  });
  const [syncStatus, setSyncStatus] = React.useState('synced');

  const deviceHistory = [
    { id: 1, device: 'Chrome 121 on Windows 11', ip: '192.168.1.105', location: 'New York HQ', lastUsed: '2024-03-15 09:12:45', status: 'Active' },
    { id: DNA 2, device: 'Safari 17 on macOS Sonoma', ip: '10.0.2.78', location: 'Home Office', lastUsed: '2024-03-14 surveyed 18:30:22', status: 'Active' },
    { id: 3, device: 'Mobile App v2.4.1 (iOS)', ip: '172.56.34.201', location: 'Client Site - Boston', lastUsed: '2024-03-12 14:15:08', status: 'Active' },
    { id: 4, device: 'Edge 122 on Windows 10', ip: '192.168.1.110', location: 'New York HQ', lastUsed: '2024-02-28 08:45:33', status: 'Inactive' },
    { id: 5, device: 'Firefox 115 on Ubuntu', ip: '203.0.113.45', location: 'Remote - Miami', lastUsed: '2024-02-15 11:20:19', status: 'Inactive' }
  ];

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Phoenix',
    'America/Anchorage',
    'Pacific/Honolulu',
    'Europe/London',
    'Europe/Paris',
    'Asia/Kolkata',
    'Asia/Singapore',
    'Australia/Sydney'
  ];

  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
    console.log(`Timezone changed to: ${e.target.value}`);
  };

  const handleNotificationToggle = (key) => {
    setNotificationPrefs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    console.log(`Notification preference "${key}" toggled to: ${!notificationPrefs[key]}`);
  };

  const handleLocationOverrideToggle = () => {
    setAttendancePrefs(prev => ({
      ...prev,
      manualLocationOverride: !prev.manualLocationOverride
    }));
    console.log(`Manual location override toggled to: ${!attendancePrefs.manualLocationOverride}`);
  };

  const handleLocationChange = (e) => {
    setAttendancePrefs(prev => ({
      ...prev,
      overrideLocation: e.target.value
    }));
    console.log(`Override location changed to: ${e.target.value}`);
  };

  const handleSyncNow = () => {
    setSyncStatus('syncing');
    setTimeout(() => {
      setSyncStatus('synced');
      console.log('Manual sync with Entra ID completed');
    },撤回 1500);
  };

  const handleRevokeDevice = (deviceId) => {
    console.log(`Device ${deviceId} access revoked`);
    // In a real app, this would update the backend
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logoSection}>
          <div style={styles.logo}>WP</div>
          <h2 style={styles.logoText}>WorkPulse</h2>
        </div>
        <nav style={styles.nav}>
          <div style={styles.navItem} onClick={() => window.location.hash = '#/'}>Dashboard</div>
          <div style={styles.navItem} onClick={() => window.location.hash = '#/clock'}>Clock In/Out</div>
          <div style={styles.navItem} onClick={() => window.location.hash = '#/attendance'}>Attendance</div>
          <div style={styles.navItem} onClick={() => window.location.hash = '#/team/attendance'}>Team</div>
          <div style={styles.navItem} onClick={() => window.location.hash = '#/leave/my-leave'}>My Leave</div>
          <div style={styles.navItemActive}>Profile</div>
        </nav>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>JA</div>
          <div>
            <div style={styles.userName}>Jessica Anderson</div>
            <div style={styles.userRole}>Senior Developer</div>
          </div>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.header}>
          <h1 style={styles.pageTitle}>My Profile</h1>
          <div style={styles.headerActions}>
            <button style={styles.syncButton} onClick={handleSyncNow}>
              <span style={styles.syncIcon}>⟳</span>
              Sync with Entra ID
            </button>
          </div>
        </div>

        <div style={styles.tabs}>
          <button 
            style={activeTab === 'personal' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('personal')}
          >
            Personal Information
          </button>
          <button 
            style={activeTab === 'preferences' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>
          <button 
            style={activeTab === 'security' ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab('security')}
          >
            Security & Devices
          </button>
        </div>

        <div style={styles.contentArea}>
          {activeTab === 'personal' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Personal Information</h2>
              <div style={styles.infoGrid}>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Employee ID</div>
                  <div style={styles.infoValue}>EMP-2847</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Full Name</div>
                  <div style={styles.infoValue}>Jessica Anderson</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Email Address</div>
                  <div style={styles.infoValue}>jessica.anderson@starkdigital.com</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Department</div>
                  <div style={styles.infoValue}>Engineering - Platform Team</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Manager</div>
                  <div style={styles.infoValue}>Michael Chen (Director)</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Employment Status</div>
                  <div style={styles.infoValue}>
                    <span style={styles.statusActive}>Active</span>
                    • Full-time
                  </div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Joining Date</div>
                  <div style={styles.infoValue}>June 15, 2020</div>
                </div>
                <div style={styles.infoCard}>
                  <div style={styles.infoLabel}>Shift Type</div>
                  <div style={styles.infoValue}>Flexible (Core hours: 10am-4pm)</div>
                </div>
              </div>

              <div style={styles.syncStatusSection}>
                <h3 style={styles.subsectionTitle}>Entra ID Sync Status</h3>
                <div style={styles.syncStatusCard}>
                  <div style={styles.syncStatusRow}>
                    <div>
                      <div style={styles.syncStatusLabel}>Last Sync</div>
                      <div style={styles.syncStatusValue}>Today, 08:45 AM</div>
                    </div>
                    <div>
                      <div style={styles.syncStatusLabel}>Status</div>
                      <div style={syncStatus === 'synced' ? styles.statusSynced : styles.statusSyncing}>
                        {syncStatus === 'synced' ? 'Synced ✓' : 'Syncing...'}
                      </div>
                    </div>
                    <div>
                      <div style={styles.syncStatusLabel}>Next Scheduled</div>
                      <div style={styles.syncStatusValue}>Tomorrow,量与 06:00 AM</div>
                    </div>
                  </div>
                  <div style={styles.syncInfo}>
                    <div style={styles.syncIconSmall}>🔄</div>
                    <div style={styles.syncText}>
                      Data is synchronized hourly with Microsoft Entra ID. Changes to name, email, or department are updated automatically.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Preferences & Settings</h2>
              
              <div style={styles.preferenceSection}>
                <h3 style={styles.subsectionTitle}>Timezone Configuration</h3>
                <div style={styles.timezoneCard}>
                  <div style={styles.timezoneLabel}>Current Timezone</div>
                  <select 
                    style={styles.timezoneSelect}
                    value={timezone}
                    onChange={handleTimezoneChange}
                  >
                    {timezones.map(tz => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                  <div style={styles.timezoneHelp}>
                    This timezone is used for all attendance calculations and shift displays.
                  </div>
                </div>
              </div>

              <div style={styles.preferenceSection}>
                <h3 style={styles.subsectionTitle}>Notification Preferences</h3>
                <div style={styles.notificationGrid}>
                  <div style={styles.notificationItem}>
                    <div style={styles.notificationLabel}>Email Notifications</div>
                    <label style={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notificationPrefs.email}
                        onChange={() => handleNotificationToggle('email')}
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>
                  <div style={styles.notificationItem}>
                    <div style={styles.notificationLabel}>SMS Alerts</div>
                    <label style={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notificationPrefs.sms}
                        onChange={() => handleNotificationToggle('sms')}
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>
                  <div style={styles.notificationItem}>
                    <div style={styles.notificationLabel}>Push Notifications</div>
                    <label style={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notificationPrefs.push}
                        onChange={() => handleNotificationToggle('push')}
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>
                  <div style={styles.notificationItem}>
                    <div style={styles.notificationLabel}>Clock-in Reminders</div>
                    <label style={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notificationPrefs.clockInReminder}
                        onChange={() => handleNotificationToggle('clockInReminder')}
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>
                  <div style={styles.notificationItem}>
                    <div style={styles.notificationLabel}>Late Arrival Alerts</div>
                    <label style={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notificationPrefs.lateArrival}
                        onChange={() => handleNotificationToggle('lateArrival')}
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>
                  <div style={styles.notificationItem}>
                    <div style={styles.notificationLabel}>Leave Approval Updates</div>
                    <label style={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notificationPrefs.leaveApproval}
                        onChange={() => handleNotificationToggle('leaveApproval')}
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>
                  <div style={styles.notificationItem}>
                    <div style={styles.notificationLabel}>Missing Clock-out Notifications</div>
                    <label style={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notificationPrefs.missingClockOut}
                        onChange={() => handleNotificationToggle('missingClockOut')}
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>
                  <div style={styles.notificationItem}>
                    <div style={styles.notificationLabel}>Weekly Summary Reports</div>
                    <label style={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={notificationPrefs.weeklySummary}
                        onChange={() => handleNotificationToggle('weeklySummary')}
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>
                </div>
              </div>

              <div style={styles.preferenceSection}>
                <h3 style={styles.subsectionTitle}>Attendance Preferences</h3>
                <div style={styles.attendanceCard}>
                  <div style={styles.attendanceSetting}>
                    <div>
                      <div style={styles.attendanceLabel}>Manual Location Override</div>
                      <div style={styles.attendanceDescription}>
                        Enable to specify your work location regardless of detected GPS
                      </div>
                    </div>
                    <label style={styles.switch}>
                      <input 
                        type="checkbox" 
                        checked={attendancePrefs.manualLocationOverride}
                        onChange={handleLocationOverrideToggle}
                      />
                      <span style={styles.slider}></span>
                    </label>
                  </div>
                  
                  {attendancePrefs.manualLocationOverride && (
                    <div style={styles.locationOverride}>
                      <div style={styles.locationLabel}>Override Location</div>
                      <select 
                        style={styles.locationSelect}
                        value={attendancePrefs.overrideLocation}
                        onChange={handleLocationChange}
                      >
                        <option value="Office - New York HQ">Office - New York HQ</option>
                        <option value="Home Office">Home Office</option>
                        <option value="Client Site - Boston">Client Site - Boston</option>
                        <option value="Remote - Miami">Remote - Miami</option>
                        <option value="Satellite Office - Jersey City">Satellite Office - Jersey City</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Security & Device Management</h2>
              
              <div style={styles.deviceSection}>
                <h3 style={styles.subsectionTitle}>Device Registration History</h3>
                <div style={styles.deviceTable}>
                  <div style={styles.deviceTableHeader}>
                    <div style={styles.deviceHeaderCell}>Device / Browser</div>
                    <div style={styles.deviceHeaderCell}>IP Address</div>
                    <div style={styles.deviceHeaderCell}>Location</div>
                    <div style={styles.deviceHeaderCell}>Last Used</div>
                    <div style={styles.deviceHeaderCell}>Status</div>
                    <div style={styles.deviceHeaderCell}>Actions</div>
                  </div>
                  {deviceHistory.map(device => (
                    <div key={device.id} style={styles.deviceTableRow}>
                      <div style={styles.deviceCell}>{device.device}</div>
                      <div style={styles.deviceCell}>{device.ip}</div>
                      <div style={styles.deviceCell}>{device.location}</div>
                      <div style={styles.deviceCell}>{device.lastUsed}</div>
                      <div style={styles.deviceCell}>
                        <span style={device.status === 'Active' ? styles.statusActive : styles.statusInactive}>
                          {device.status}
                        </span>
                      </div>
                      <div style={styles.deviceCell}>
                        {device.status === 'Active' && (
                          <button 
                            style={styles.revokeButton}
                            onClick={() => handleRevokeDevice(device.id)}
                          >
                            Revoke Access
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={styles.deviceHelp}>
                  <div style={styles.helpIcon}>ℹ️</div>
                  <div style={styles.helpText}>
                    Active devices can access your account for attendance tracking. Revoke access for any lost or unauthorized devices.
                  </div>
                </div>
              </div>

              <div style={styles.securitySection}>
                <h3 style={styles.subsectionTitle}>Additional Security Settings</h3>
                <div style={styles.securityActions}>
                  <button 
                    style={styles.securityButton}
                    onClick={() => window.location.hash = '#/profile/biometrics'}
                  >
                    Manage Facial Verification
                  </button>
                  <button 
                    style={styles.securityButtonSecondary}
                    onClick={() => console.log('Password reset requested')}
                  >
                    Reset Password
                  </button>
                  <button 
                    style={styles.securityButtonSecondary}
                    onClick={() => console.log('Two-factor authentication toggled')}
                  >
                    Enable Two-Factor Auth
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#1e293b',
    color: '#f1f5f9',
    display: 'flex',
    flexDirection: 'column',
  },
  logoSection: {
    padding: '24px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderBottom: '1px solid #334155',
  },
  logo: {
    width: '40px',
    height: '40px',
    backgroundColor: '#3b82f6',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  logoText: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
  },
  nav: {
    padding: '20px 0',
    flex: 1,
  },
  navItem: {
    padding: '12px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    color: '#cbd5e1',
  },
  navItemActive: {
    padding: '12px 20px',
    backgroundColor: '#334155',
    color: '#ffffff',
    borderLeft: '3px solid #3b82f6',
  },
  userInfo: {
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderTop: '1px solid #334155',
  },
  avatar: {
    width: '40px',
    height: '40px',
    backgroundColor: '#3b82f6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
  },
  userRole: {
    fontSize: '12px',
    color: '#94a3b8',
  },
  mainContent: {
    flex: 1,
    overflow: 'auto',
  },
  header: {
    padding: '24px 32px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
  },
  headerActions: {
    display: 'flex',
    gap: '12px',
  },
  syncButton: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
  },
  syncIcon: {
    fontSize: '16px',
  },
  tabs: {
    padding: '0 32px',
    display: 'flex',
    gap: '8px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#ffffff',
  },
  tab: {
    padding: '16px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#64748b',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    borderBottom: '2px solid transparent',
  },
  activeTab: {
    padding: '16px 24px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#3b82f6',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    borderBottom: '2px solid #3b82f6',
  },
  contentArea: {
    padding: '32px',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px o年 3px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    margin: '0 0 24px 0',
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
    marginBottom: '32px',
  },
  infoCard: {
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
  },
  infoLabel: {
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '4px',
  },
  infoValue: {
    fontSize: '14px',
    color: '#1e293b',
    fontWeight: '500',
  },
  statusActive: {
    color: '#10b981',
    fontWeight: '500',
    marginRight: '6px',
  },
  syncStatusSection: {
    marginTop: '32px',
  },
  subsectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#475569',
    marginBottom: '16px',
  },
  syncStatusCard: {
    padding: '20px',
    backgroundColor: '#f0f9ff',
    borderRadius: '6px',
    border: '1px solid #bae6fd',
  },
  syncStatusRow: {
    display: 'flex',
    gap: '40px',
    marginBottom: '16px',
  },
  syncStatusLabel: {
    fontSize: '12px',
    color: '#0369a1',
    marginBottom: '4px',
  },
  syncStatusValue: {
    fontSize: '14px',
    color: '#0c4a6e',
    fontWeight: '500',
  },
  statusSynced: {
    color: '#10b981',
    fontWeight: '500',
  },
  statusSyncing: {
    color: '#f59e0b',
    fontWeight: '500',
  },
  syncInfo: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
  },
  syncIconSmall: {
    fontSize: '16px',
    color: '#0369a1',
  },
  syncText: {
    fontSize: '13px',
    color: '#475569',
    lineHeight: '1.4',
  },
  preferenceSection: {
    marginBottom: '32px',
  },
  timezoneCard: {
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
  },
  timezoneLabel: {
    fontSize: '14px',
    color: '#475569',
    marginBottom: '8px',
    fontWeight: '500',
  },
  timezoneSelect: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '14px',
    marginBottom: '8px',
    backgroundColor: '#ffffff',
  },
  timezoneHelp: {
    fontSize: '13px',
    color: '#64748b',
  },
  notificationGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  },
  notificationItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
  },
  notificationLabel: {
    fontSize: '14px',
    color: '#475569',
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '48px',
    height: '24px',
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#cbd5e1',
    transition: '.4s',
    borderRadius: '24px',
  },
  'slider:before': {
    position: 'absolute',
    content: '""',
    height: '16px',
    width: '16px',
    left: '4px',
    bottom: '4px',
    backgroundColor: 'white',
    transition: '.4s',
    borderRadius: '50%',
  },
  'input:checked + .slider': {
    backgroundColor: '#3b82f6',
  },
  'input:checked + .slider:before': {
    transform: 'translateX(24px)',
  },
  attendanceCard: {
    padding: '20px',
    backgroundColor: '#f8fafc',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
  },
  attendanceSetting: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  attendanceLabel: {
    fontSize: '14px',
    color: '#475569',
    fontWeight: '500',
    marginBottom: '4px',
  },
  attendanceDescription: {
    fontSize: '13px',
    color: '#64748b',
  },
  locationOverride: {
    padding: '16px',
    backgroundColor: '#f0f9ff',
    borderRadius: '6px',
    border: '1px solid #bae6fd',
  },
  locationLabel: {
    fontSize: '14px',
    color: '#0369a1',
    marginBottom: '8px',
    fontWeight: '500',
  },
  locationSelect: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #7dd3fc',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: '#ffffff',
  },
  deviceSection: {
    marginBottom: '32px',
  },
  deviceTable: {
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    overflow: 'hidden',
  },
  deviceTableHeader: {
    display: 'flex',
    backgroundColor: '#f1f5f9',
    padding: '12px 16px',
    borderBottom: '1px solid #e2e8f0',
  },
  deviceHeaderCell: {
    flex: 1,
    fontSize: '13px',
    fontWeight: '600',
    color: '#475569',
  },
  deviceTableRow: {
    display: 'flex',
    padding: '16px',
    borderBottom: '1px solid #e2e8f0',
    alignItems: 'center',
  },
  deviceCell: {
    flex: 1,
    fontSize: '14px',
    color: '#475569',
  },
  statusInactive: {
    color: '#94a3b8',
    fontStyle: 'italic',
  },
  revokeButton: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: '1px solid #fca5a5',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
  },
  deviceHelp: {
    display: 'flex',
    gap: '12px',
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#f0f9ff',
    borderRadius: '6px',
    border: '1px solid #bae6fd',
  },
  helpIcon: {
    fontSize: '16px',
    color: '#0369a1',
  },
  helpText: {
    fontSize: '13px',
    color: '#475569',
    lineHeight: '1.4',
  },
  securitySection: {
    marginTop: '32px',
  },
  securityActions: {
    display: 'flex',
    gap: '12px',
  },
  securityButton: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  securityButtonSecondary: {
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: '1px solid #cbd5e1',
    padding: '12px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
};

// Add dynamic CSS for the switch component
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #3b82f6;
  }
  
  input:checked + .slider:before {
    transform: translateX(24px);
  }
`;
document.head.appendChild(styleSheet);