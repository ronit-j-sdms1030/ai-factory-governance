function NotificationsCenter() {
  // Mock data for notifications
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      employee_id: 101,
      type: 'clock_in_reminder',
      title: 'Clock-in Reminder',
      message: 'Don\'t forget to clock in for your shift',
      metadata: {},
      sent_via: 'email',
      sent_at: '2023-05-15T08:00:00Z',
      read_at: null
    },
    {
      id: 2,
      employee_id: 102,
      type: 'late_arrival',
      title: 'Late Arrival Alert',
      message: 'You arrived 15 minutes late today',
      metadata: {},
      sent_via: 'sms',
      sent_at: '2023-05-15T09:15:00Z',
      read_at: '2023-05-15T09:20:00Z'
    },
    {
      id: 3,
      employee_id: 103,
      type: 'leave_approval',
      title: 'Leave Request Approved',
      message: 'Your leave request for May 20 has been approved',
      metadata: {},
      sent_via: 'email',
      sent_at: '2023-05-14T14:30:00Z',
      read_at: null
    },
    {
      id: 4,
      employee_id: 104,
      type: 'clock_in_reminder',
      title: 'Clock-in Reminder',
      message: 'Don\'t forget to clock in for your shift',
      metadata: {},
      sent_via: 'email',
      sent_at: '2023-05-16T08:00:00Z',
      read_at: null
    }
  ]);

  const [filter, setFilter] = React.useState('all');
  const [settings, setSettings] = React.useState({
    email: true,
    sms: true,
    push: false
  });

  // Filter notifications based on type
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  // Mark selected notifications as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read_at: new Date().toISOString()} : n
    ));
  };

  // Toggle notification settings
  const toggleSetting = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Unread';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="notifications-center" style={{ padding: '20px', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <div className="header" style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#2d3748', fontSize: '24px', fontWeight: '600' }}>Notifications Center</h1>
        <p style={{ color: '#718096', marginTop: '5px' }}>Manage all your alerts and communication preferences</p>
      </div>
      
      <div className="content-wrapper" style={{ display: 'flex', gap: '25px' }}>
        {/* Main Content */}
        <div className="main-content" style={{ flex: 3 }}>
          <div className="filters" style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
            <NotificationTypeFilter 
              currentFilter={filter} 
              onFilterChange={setFilter} 
            />
            <MarkAsReadButton 
              onClick={() => console.log('Mark all as read')} 
            />
          </div>
          
          <div className="notifications-table-container" style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <NotificationsTable 
              notifications={filteredNotifications} 
              onMarkAsRead={markAsRead}
              formatDate={formatDate}
            />
          </div>
          
          <div className="email-sms-history" style={{ marginTop: '25px' }}>
            <EmailSMSHistory />
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="sidebar" style={{ flex: 1 }}>
          <div className="notification-settings" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <NotificationSettingsPanel 
              settings={settings} 
              onToggle={toggleSetting} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsTable({ notifications, onMarkAsRead, formatDate }) {
  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f7fafc', textAlign: 'left' }}>
            <th style={{ padding: '15px 20px', fontWeight: '600', color: '#4a5568', borderBottom: '1px solid #e2e8f0' }}>Type</th>
            <th style={{ padding: '15px 20px', fontWeight: '600', color: '#4a5568', borderBottom: '1px solid #e2e8f0' }}>Title</th>
            <th style={{ padding: '15px 20px', fontWeight: '600', color: '#4a5568', borderBottom: '1px solid #e2e8f0' }}>Sent At</th>
            <th style={{ padding: '15px 20px', fontWeight: '600', color: '#4a5568', borderBottom: '1px solid #e2e8f0' }}>Read At</th>
            <th style={{ padding: '15px 20px', fontWeight: '600', color: '#4a5568', borderBottom: '1px solid #e2e8f0' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map(notification => (
            <tr key={notification.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '15px 20px', color: '#4a5568' }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500',
                  backgroundColor: 
                    notification.type === 'clock_in_reminder' ? '#e6fffa' : 
                    notification.type === 'late_arrival' ? '#fff5f5' : 
                    '#ebf8ff',
                  color: 
                    notification.type === 'clock_in_reminder' ? '#0d9488' : 
                    notification.type === 'late_arrival' ? '#e53e3e' : 
                    '#3182ce'
                }}>
                  {notification.type.replace('_', ' ')}
                </span>
              </td>
              <td style={{ padding: '15px 20px', color: '#2d3748' }}>{notification.title}</td>
              <td style={{ padding: '15px 20px', color: '#4a5568' }}>{formatDate(notification.sent_at)}</td>
              <td style={{ padding: '15px 20px', color: notification.read_at ? '#4a5568' : '#e53e3e' }}>
                {notification.read_at ? formatDate(notification.read_at) : 'Unread'}
              </td>
              <td style={{ padding: '15px 20px' }}>
                {!notification.read_at && (
                  <button 
                    onClick={() => onMarkAsRead(notification.id)}
                    style={{
                      backgroundColor: '#4299e1',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Mark as Read
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NotificationTypeFilter({ currentFilter, onFilterChange }) {
  const filterOptions = [
    { value: 'all', label: 'All Notifications' },
    { value: 'clock_in_reminder', label: 'Clock-in Reminders' },
    { value: 'late_arrival', label: 'Late Arrivals' },
    { value: 'leave_approval', label: 'Leave Approvals' }
  ];
  
  return (
    <div>
      <select 
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        style={{
          padding: '10px 15px',
          borderRadius: '6px',
          border: '1px solid #e2e8f0',
          backgroundColor: 'white',
          fontSize: '14px',
          color: '#4a5568',
          minWidth: '200px'
        }}
      >
        {filterOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

function MarkAsReadButton({ onClick }) {
  return (
    <button 
      onClick={onClick}
      style={{
        padding: '10px 20px',
        backgroundColor: '#4299e1',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500'
      }}
    >
      Mark All as Read
    </button>
  );
}

function NotificationSettingsPanel({ settings, onToggle }) {
  return (
    <div>
      <h3 style={{ color: '#2d3748', fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Notification Settings</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={settings.email}
            onChange={() => onToggle('email')}
            style={{ marginRight: '10px', width: '18px', height: '18px' }}
          />
          <span style={{ color: '#4a5568' }}>Email Notifications</span>
        </label>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={settings.sms}
            onChange={() => onToggle('sms')}
            style={{ marginRight: '10px', width: '18px', height: '18px' }}
          />
          <span style={{ color: '#4a5568' }}>SMS Notifications</span>
        </label>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={settings.push}
            onChange={() => onToggle('push')}
            style={{ marginRight: '10px', width: '18px', height: '18px' }}
          />
          <span style={{ color: '#4a5568' }}>Push Notifications</span>
        </label>
      </div>
      
      <button 
        style={{
          marginTop: '15px',
          padding: '10px 15px',
          backgroundColor: '#4299e1',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          width: '100%'
        }}
      >
        Save Preferences
      </button>
    </div>
  );
}

function EmailSMSHistory() {
  const history = [
    { id: 1, type: 'email', recipient: 'john.doe@company.com', subject: 'Clock-in Reminder', status: 'sent', timestamp: '2023-05-15T08:00:00Z' },
    { id: 2, type: 'sms', recipient: '+1 (555) 123-4567', subject: 'Late Arrival Alert', status: 'delivered', timestamp: '2023-05-15T09:15:00Z' },
    { id: 3, type: 'email', recipient: 'jane.smith@company.com', subject: 'Leave Approved', status: 'sent', timestamp: '2023-05-14T14:30:00Z' }
  ];
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ color: '#2d3748', fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Communication History</h3>
      
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f7fafc', textAlign: 'left' }}>
            <th style={{ padding: '12px 15px', fontWeight: '600', color: '#4a5568', borderBottom: '1px solid #e2e8f0' }}>Type</th>
            <th style={{ padding: '12px 15px', fontWeight: '600', color: '#4a5568', borderBottom: '1px solid #e2e8f0' }}>Recipient</th>
            <th style={{ padding: '12px 15px', fontWeight: '600', color: '#4a5568', borderBottom: '1px solid #e2e8f0' }}>Subject</th>
            <th style={{ padding: '12px 15px', fontWeight: '600', color: '#4a5568', borderBottom: '1px solid #e2e8f0' }}>Status</th>
            <th style={{ padding: '12px 15px', fontWeight: '600', color: '#4a5568', borderBottom: '1px solid #e2e8f0' }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map(item => (
            <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px 15px', color: '#4a5568' }}>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500',
                  backgroundColor: item.type === 'email' ? '#ebf8ff' : '#f0fff4',
                  color: item.type === 'email' ? '#3182ce' : '#38a169'
                }}>
                  {item.type.toUpperCase()}
                </span>
              </td>
              <td style={{ padding: '12px 15px', color: '#2d3748' }}>{item.recipient}</td>
              <td style={{ padding: '12px 15px', color: '#4a5568' }}>{item.subject}</td>
              <td style={{ padding: '12px 15px' }}>
                <span style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '500',
                  backgroundColor: item.status === 'sent' ? '#ebf8ff' : '#f0fff4',
                  color: item.status === 'sent' ? '#3182ce' : '#38a169'
                }}>
                  {item.status}
                </span>
              </td>
              <td style={{ padding: '12px 15px', color: '#4a5568' }}>{formatDate(item.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}