function SettingsProfile() {
  // Mock data
  const employee = {
    id: "EMP00123",
    first_name: "Alex",
    last_name: "Morgan",
    email: "alex.morgan@starkdigital.com",
    timezone: "Asia/Kolkata",
    notification_preferences: {
      email_attendance_reminder: true,
      sms_late_arrival: false,
      email_leave_approval: true,
      push_missing_clock_out: true
    }
  };

  const devices = [
    { id: 1, name: "iPhone 13 Pro", last_active: "2023-10-15 09:30:00", current: true },
    { id: 2, name: "MacBook Pro 16", last_active: "2023-10-14 17:45:00", current: false },
    { id: 3, name: "iPad Air", last_active: "2023-09-22 11:15:00", current: false }
  ];

  const sessions = [
    { id: 1, ip: "192.168.1.105", location: "Mumbai Office", device: "Chrome on Windows 11", active: true, last_activity: "2023-10-15 10:15:00" },
    { id: 2, ip: "203.197.85.42", location: "Bangalore Cafe", device: "Safari on iPhone", active: false, last_activity: "2023-10-13 14:20:00" },
    { id: 3, ip: "103.21.59.12", location: "Delhi Home", device: "Firefox on Ubuntu", active: false, last_activity: "2023-10-10 19:30:00" }
  ];

  // Handlers
  const handleTimezoneChange = (e) => {
    console.log("Timezone changed to:", e.target.value);
  };

  const handleNotificationChange = (key) => {
    console.log("Notification preference toggled:", key);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    alert("Password change initiated");
  };

  const handleRevokeDevice = (deviceId) => {
    console.log("Revoking device ID:", deviceId);
    alert(`Device ${deviceId} revoked`);
  };

  const handleTerminateSession = (sessionId) => {
    console.log("Terminating session ID:", sessionId);
    alert(`Session ${sessionId} terminated`);
  };

  const handlePrivacyChange = (setting) => {
    console.log("Privacy setting changed:", setting);
    alert(`Privacy setting updated: ${setting}`);
  };

  const handleExportData = () => {
    alert("Personal data export initiated. You will receive an email shortly.");
  };

  return (
    <div className="settings-profile">
      <div className="header">
        <h1>Settings & Profile</h1>
        <p>Manage your personal information and system preferences</p>
      </div>

      <div className="content-grid">
        {/* Personal Info Form */}
        <section className="card">
          <h2>Personal Information</h2>
          <div className="form-group">
            <label>Full Name</label>
            <p>{employee.first_name} {employee.last_name}</p>
          </div>
          <div className="form-group">
            <label>Email</label>
            <p>{employee.email}</p>
          </div>
          <div className="form-group">
            <label>Employee ID</label>
            <p>{employee.id}</p>
          </div>
          <div className="form-group">
            <label>Timezone</label>
            <select value={employee.timezone} onChange={handleTimezoneChange}>
              <option value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</option>
              <option value="America/New_York">America/New_York (GMT-4)</option>
              <option value="Europe/London">Europe/London (GMT+1)</option>
              <option value="Australia/Sydney">Australia/Sydney (GMT+10)</option>
            </select>
          </div>
          
          <h3 style={{marginTop: '24px'}}>Notification Preferences</h3>
          <div className="notification-settings">
            <div className="notification-item">
              <label>Email attendance reminders</label>
              <div className="toggle-switch" onClick={() => handleNotificationChange('email_attendance_reminder')}>
                <div className={`toggle ${employee.notification_preferences.email_attendance_reminder ? 'on' : 'off'}`}></div>
              </div>
            </div>
            <div className="notification-item">
              <label>SMS for late arrivals</label>
              <div className="toggle-switch" onClick={() => handleNotificationChange('sms_late_arrival')}>
                <div className={`toggle ${employee.notification_preferences.sms_late_arrival ? 'on' : 'off'}`}></div>
              </div>
            </div>
            <div className="notification-item">
              <label>Email for leave approvals</label>
              <div className="toggle-switch" onClick={() => handleNotificationChange('email_leave_approval')}>
                <div className={`toggle ${employee.notification_preferences.email_leave_approval ? 'on' : 'off'}`}></div>
              </div>
            </div>
            <div className="notification-item">
              <label>Push for missing clock-outs</label>
              <div className="toggle-switch" onClick={() => handleNotificationChange('push_missing_clock_out')}>
                <div className={`toggle ${employee.notification_preferences.push_missing_clock_out ? 'on' : 'off'}`}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Device Management */}
        <section className="card">
          <h2>Device Management</h2>
          <div className="device-list">
            {devices.map(device => (
              <div key={device.id} className="device-item">
                <div>
                  <h4>{device.name} {device.current && <span className="current-badge">Current</span>}</h4>
                  <p>Last active: {device.last_active}</p>
                </div>
                <button 
                  className="revoke-btn"
                  onClick={() => handleRevokeDevice(device.id)}
                  disabled={device.current}
                >
                  {device.current ? 'Current Device' : 'Revoke Access'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Password Change */}
        <section className="card">
          <h2>Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <div className="form-group">
              <label>Current Password</label>
              <input type="password" placeholder="Enter current password" required />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" placeholder="Enter new password" required />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" required />
            </div>
            <button type="submit" className="primary-btn">Update Password</button>
          </form>
        </section>

        {/* Session Management */}
        <section className="card">
          <h2>Active Sessions</h2>
          <div className="session-list">
            {sessions.map(session => (
              <div key={session.id} className="session-item">
                <div>
                  <h4>{session.device} {session.active && <span className="active-badge">Active Now</span>}</h4>
                  <p>IP: {session.ip} | Location: {session.location}</p>
                  <p>Last activity: {session.last_activity}</p>
                </div>
                <button 
                  className="terminate-btn"
                  onClick={() => handleTerminateSession(session.id)}
                  disabled={!session.active}
                >
                  {session.active ? 'Terminate Session' : 'Ended'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy Settings */}
        <section className="card">
          <h2>Privacy Settings</h2>
          <div className="privacy-item">
            <div>
              <h4>Facial Recognition Data</h4>
              <p>Manage your biometric templates and consent</p>
            </div>
            <button className="secondary-btn" onClick={() => handlePrivacyChange('facial_data')}>Manage</button>
          </div>
          <div className="privacy-item">
            <div>
              <h4>Location Tracking</h4>
              <p>Control GPS data collection for field employees</p>
            </div>
            <button className="secondary-btn" onClick={() => handlePrivacyChange('location_tracking')}>Manage</button>
          </div>
          <div className="privacy-item">
            <div>
              <h4>Data Retention</h4>
              <p>Configure how long your data is stored</p>
            </div>
            <button className="secondary-btn" onClick={() => handlePrivacyChange('data_retention')}>Manage</button>
          </div>
        </section>

        {/* Data Export */}
        <section className="card">
          <h2>Export Personal Data</h2>
          <p>Download a copy of your personal information in compliance with data protection regulations.</p>
          <button className="primary-btn" onClick={handleExportData}>
            Export Data
          </button>
        </section>
      </div>

      <style jsx>{`
        .settings-profile {
          padding: 24px;
          background-color: #f8fafc;
          min-height: 100vh;
        }
        
        .header {
          margin-bottom: 32px;
        }
        
        .header h1 {
          font-size: 28px;
          color: #0f172a;
          margin-bottom: 8px;
        }
        
        .header p {
          color: #64748b;
          font-size: 16px;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 24px;
        }
        
        .card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .card h2 {
          color: #0f172a;
          margin-bottom: 20px;
          font-size: 20px;
        }
        
        .form-group {
          margin-bottom: 20px;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #334155;
        }
        
        .form-group p {
          padding: 12px 16px;
          background: #f1f5f9;
          border-radius: 6px;
          color: #0f172a;
        }
        
        select {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          background: white;
          font-size: 16px;
        }
        
        .notification-settings {
          border-top: 1px solid #e2e8f0;
          padding-top: 16px;
        }
        
        .notification-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .notification-item:last-child {
          border-bottom: none;
        }
        
        .notification-item label {
          margin-bottom: 0;
          color: #334155;
        }
        
        .toggle-switch {
          cursor: pointer;
          width: 50px;
          height: 26px;
          background: #cbd5e1;
          border-radius: 13px;
          position: relative;
        }
        
        .toggle {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          transition: all 0.2s;
        }
        
        .toggle.on {
          left: 27px;
          background: #3b82f6;
        }
        
        .device-list, .session-list {
          margin-top: 16px;
        }
        
        .device-item, .session-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .device-item:last-child, .session-item:last-child {
          border-bottom: none;
        }
        
        .device-item h4, .session-item h4 {
          margin-bottom: 4px;
          color: #0f172a;
        }
        
        .device-item p, .session-item p {
          color: #64748b;
          font-size: 14px;
          margin: 0;
        }
        
        .current-badge, .active-badge {
          background: #dcfce7;
          color: #166534;
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .revoke-btn, .terminate-btn {
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          background: white;
          color: #0f172a;
          cursor: pointer;
        }
        
        .revoke-btn:disabled, .terminate-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .revoke-btn:not(:disabled):hover, .terminate-btn:not(:disabled):hover {
          background: #fef2f2;
          border-color: #fecaca;
        }
        
        input[type="password"] {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 16px;
        }
        
        .primary-btn, .secondary-btn {
          padding: 12px 20px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          border: none;
        }
        
        .primary-btn {
          background: #3b82f6;
          color: white;
        }
        
        .primary-btn:hover {
          background: #2563eb;
        }
        
        .secondary-btn {
          background: #f1f5f9;
          color: #0f172a;
        }
        
        .secondary-btn:hover {
          background: #e2e8f0;
        }
        
        .privacy-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .privacy-item:last-child {
          border-bottom: none;
        }
        
        .privacy-item h4 {
          margin-bottom: 4px;
          color: #0f172a;
        }
        
        .privacy-item p {
          color: #64748b;
          margin: 0;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
}