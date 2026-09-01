function Dashboard() {
  // Mock data
  const userRole = 'Manager'; // Employee, Manager, HR
  const employee = {
    id: 1,
    first_name: 'Alex',
    last_name: 'Johnson',
    employee_id: 'EMP00123',
    department: 'Engineering',
    shift_type: 'Standard Office Hours',
    timezone: 'America/New_York'
  };
  
  const todayShift = {
    name: 'Standard Office Hours',
    start_time: '09:00 AM',
    end_time: '05:00 PM',
    grace_period: 15,
    status: 'on_time', // on_time, late, absent
    countdown: '02:45:30'
  };
  
  const recentAttendance = [
    { date: '2023-06-15', status: 'present', clock_in: '08:58 AM', clock_out: '05:01 PM' },
    { date: '2023-06-14', status: 'present', clock_in: '09:02 AM', clock_out: '05:03 PM' },
    { date: '2023-06-13', status: 'late', clock_in: '09:25 AM', clock_out: '05:10 PM' },
    { date: '2023-06-12', status: 'present', clock_in: '08:55 AM', clock_out: '04:58 PM' },
    { date: '2023-06-11', status: 'present', clock_in: '09:01 AM', clock_out: '05:02 PM' }
  ];
  
  const pendingLeaveRequests = [
    { id: 101, employee_name: 'Sarah Miller', leave_type: 'Vacation', start_date: '2023-06-20', days: 3 },
    { id: 102, employee_name: 'James Wilson', leave_type: 'Sick Leave', start_date: '2023-06-18', days: 1 }
  ];
  
  const teamAttendance = [
    { name: 'Sarah Miller', status: 'present' },
    { name: 'James Wilson', status: 'late' },
    { name: 'Michael Chen', status: 'absent' },
    { name: 'Emma Davis', status: 'on_leave' },
    { name: 'Robert Garcia', status: 'present' }
  ];
  
  const orgMetrics = {
    total_employees: 1240,
    present_today: 987,
    late_today: 42,
    on_leave: 65,
    absent: 146
  };
  
  const [clockStatus, setClockStatus] = React.useState('Clocked Out');
  const [notifications, setNotifications] = React.useState([]);
  
  // Simulate WebSocket connection
  const [wsStatus, setWsStatus] = React.useState('connected');
  
  // Simulate offline operations
  const [offlineCount, setOfflineCount] = React.useState(0);
  
  // Handle clock in/out
  const handleClockAction = () => {
    if (clockStatus === 'Clocked Out') {
      setClockStatus('Clocked In');
      // Add notification
      setNotifications([
        { id: Date.now(), message: `${employee.first_name} ${employee.last_name} clocked in at ${new Date().toLocaleTimeString()}`, type: 'clock_in' },
        ...notifications
      ]);
    } else {
      setClockStatus('Clocked Out');
    }
  };
  
  // Simulate receiving real-time notifications
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && notifications.length < 5) {
        const names = ['Sarah Miller', 'James Wilson', 'Michael Chen', 'Emma Davis', 'Robert Garcia'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        setNotifications([
          { id: Date.now(), message: `${randomName} clocked in`, type: 'clock_in' },
          ...notifications
        ]);
      }
    }, 10000);
    
    return () => clearInterval(interval);
  }, [notifications]);
  
  return (
    <div className="dashboard" style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', backgroundColor: '#2c3e50', color: 'white', padding: '20px 0' }}>
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #34495e' }}>
          <h2 style={{ margin: '0 0 10px', fontSize: '22px' }}>WorkPulse</h2>
          <p style={{ margin: '0', fontSize: '14px', color: '#bdc3c7' }}>{employee.first_name} {employee.last_name}</p>
          <p style={{ margin: '5px 0 0', fontSize: '12px', color: '#95a5a6' }}>{employee.department}</p>
        </div>
        
        <nav style={{ marginTop: '20px' }}>
          <a href="/" style={{ display: 'block', padding: '12px 20px', color: 'white', textDecoration: 'none', backgroundColor: '#3498db' }}>Dashboard</a>
          <a href="/clock" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Clock In/Out</a>
          <a href="/attendance" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Attendance</a>
          <a href="/leave/request" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Leave Request</a>
          <a href="/team" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Team Attendance</a>
          <a href="/shifts" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Shift Roster</a>
          <a href="/payroll" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Payroll Export</a>
          <a href="/profile/face" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Facial Enrollment</a>
          <a href="/settings" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Settings</a>
          <a href="/admin/policies" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Admin</a>
        </nav>
      </div>
      
      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: '0 0 5px', color: '#2c3e50' }}>Dashboard</h1>
            <p style={{ margin: '0', color: '#7f8c8d' }}>Welcome back, {employee.first_name}</p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Role Switcher */}
            <div style={{ display: 'flex', backgroundColor: '#ecf0f1', borderRadius: '20px', padding: '3px' }}>
              {['Employee', 'Manager', 'HR'].map(role => (
                <button 
                  key={role}
                  onClick={() => {}}
                  style={{
                    padding: '6px 15px',
                    borderRadius: '17px',
                    border: 'none',
                    backgroundColor: userRole === role ? '#3498db' : 'transparent',
                    color: userRole === role ? 'white' : '#7f8c8d',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
            
            {/* Connection Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: wsStatus === 'connected' ? '#2ecc71' : '#e74c3c'
              }}></div>
              <span style={{ fontSize: '14px', color: '#7f8c8d' }}>
                {wsStatus === 'connected' ? 'Online' : 'Offline'}
              </span>
            </div>
            
            {/* Offline Queue Badge */}
            {offlineCount > 0 && (
              <div style={{
                backgroundColor: '#e74c3c',
                color: 'white',
                borderRadius: '10px',
                padding: '2px 8px',
                fontSize: '12px'
              }}>
                {offlineCount}
              </div>
            )}
          </div>
        </div>
        
        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {/* Today's Shift Card */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', gridColumn: 'span 2' }}>
            <h3 style={{ margin: '0 0 15px', color: '#2c3e50' }}>Today's Shift</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 5px', fontSize: '18px', fontWeight: '600' }}>{todayShift.name}</p>
                <p style={{ margin: '0', color: '#7f8c8d' }}>{todayShift.start_time} - {todayShift.end_time}</p>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: '12px',
                    backgroundColor: todayShift.status === 'on_time' ? '#2ecc71' : todayShift.status === 'late' ? '#f39c12' : '#e74c3c',
                    color: 'white',
                    fontSize: '12px',
                    marginRight: '10px'
                  }}>
                    {todayShift.status === 'on_time' ? 'On Time' : todayShift.status === 'late' ? 'Late' : 'Absent'}
                  </span>
                  <span style={{ color: '#7f8c8d', fontSize: '14px' }}>Grace period: {todayShift.grace_period} mins</span>
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ margin: '0 0 5px', color: '#7f8c8d' }}>Time Remaining</p>
                <p style={{ margin: '0', fontSize: '24px', fontWeight: '600', color: '#2c3e50' }}>{todayShift.countdown}</p>
              </div>
            </div>
          </div>
          
          {/* Clock Action Card */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ margin: '0 0 15px', color: '#7f8c8d' }}>Current Status</p>
            <p style={{ margin: '0 0 20px', fontSize: '20px', fontWeight: '600', color: clockStatus === 'Clocked In' ? '#2ecc71' : '#e74c3c' }}>{clockStatus}</p>
            <button 
              onClick={handleClockAction}
              style={{
                padding: '12px 30px',
                backgroundColor: clockStatus === 'Clocked Out' ? '#2ecc71' : '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              {clockStatus === 'Clocked Out' ? 'Clock In' : 'Clock Out'}
            </button>
          </div>
          
          {/* Recent Attendance Summary */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', gridColumn: 'span 2' }}>
            <h3 style={{ margin: '0 0 15px', color: '#2c3e50' }}>Recent Attendance</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #ecf0f1' }}>
                    <th style={{ textAlign: 'left', padding: '10px 0', color: '#7f8c8d' }}>Date</th>
                    <th style={{ textAlign: 'left', padding: '10px 0', color: '#7f8c8d' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '10px 0', color: '#7f8c8d' }}>Clock In</th>
                    <th style={{ textAlign: 'left', padding: '10px 0', color: '#7f8c8d' }}>Clock Out</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAttendance.map((record, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ecf0f1' }}>
                      <td style={{ padding: '10px 0' }}>{record.date}</td>
                      <td style={{ padding: '10px 0' }}>
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: '12px',
                          backgroundColor: 
                            record.status === 'present' ? '#2ecc71' : 
                            record.status === 'late' ? '#f39c12' : '#e74c3c',
                          color: 'white',
                          fontSize: '12px'
                        }}>
                          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                        </span>
                      </td>
                      <td style={{ padding: '10px 0' }}>{record.clock_in}</td>
                      <td style={{ padding: '10px 0' }}>{record.clock_out}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Pending Leave Requests (Manager View) */}
          {userRole === 'Manager' && (
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <h3 style={{ margin: '0 0 15px', color: '#2c3e50' }}>Pending Leave Requests</h3>
              {pendingLeaveRequests.length > 0 ? (
                <div>
                  {pendingLeaveRequests.map(request => (
                    <div key={request.id} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #ecf0f1' }}>
                      <p style={{ margin: '0 0 5px', fontWeight: '600' }}>{request.employee_name}</p>
                      <p style={{ margin: '0', fontSize: '14px', color: '#7f8c8d' }}>{request.leave_type} • {request.days} days</p>
                      <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#7f8c8d' }}>Starting {request.start_date}</p>
                      <button style={{ marginTop: '10px', padding: '6px 12px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', fontSize: '14px', cursor: 'pointer' }}>
                        Review Request
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ margin: '0', color: '#7f8c8d' }}>No pending requests</p>
              )}
            </div>
          )}
          
          {/* Team Attendance Grid (Manager View) */}
          {userRole === 'Manager' && (
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', gridColumn: 'span 3' }}>
              <h3 style={{ margin: '0 0 15px', color: '#2c3e50' }}>Team Attendance Today</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                {teamAttendance.map((member, index) => (
                  <div key={index} style={{
                    padding: '15px',
                    borderRadius: '6px',
                    backgroundColor: 
                      member.status === 'present' ? '#e8f6ef' : 
                      member.status === 'late' ? '#fef9e7' : 
                      member.status === 'absent' ? '#fadbd8' : '#ebf5fb',
                    border: `1px solid ${
                      member.status === 'present' ? '#2ecc71' : 
                      member.status === 'late' ? '#f39c12' : 
                      member.status === 'absent' ? '#e74c3c' : '#3498db'}50`,
                    textAlign: 'center'
                  }}>
                    <p style={{ margin: '0 0 8px', fontWeight: '600' }}>{member.name}</p>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '12px',
                      backgroundColor: 
                        member.status === 'present' ? '#2ecc71' : 
                        member.status === 'late' ? '#f39c12' : 
                        member.status === 'absent' ? '#e74c3c' : '#3498db',
                      color: 'white',
                      fontSize: '12px'
                    }}>
                      {member.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Organization Metrics (HR View) */}
          {userRole === 'HR' && (
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', gridColumn: 'span 3' }}>
              <h3 style={{ margin: '0 0 15px', color: '#2c3e50' }}>Organization Attendance Metrics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                <div style={{ padding: '15px', backgroundColor: '#e8f6ef', borderRadius: '6px', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 5px', fontSize: '24px', fontWeight: '600', color: '#27ae60' }}>{orgMetrics.total_employees}</p>
                  <p style={{ margin: '0', color: '#2c3e50' }}>Total Employees</p>
                </div>
                <div style={{ padding: '15px', backgroundColor: '#e8f6ef', borderRadius: '6px', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 5px', fontSize: '24px', fontWeight: '600', color: '#27ae60' }}>{orgMetrics.present_today}</p>
                  <p style={{ margin: '0', color: '#2c3e50' }}>Present Today</p>
                </div>
                <div style={{ padding: '15px', backgroundColor: '#fef9e7', borderRadius: '6px', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 5px', fontSize: '24px', fontWeight: '600', color: '#f39c12' }}>{orgMetrics.late_today}</p>
                  <p style={{ margin: '0', color: '#2c3e50' }}>Late Arrivals</p>
                </div>
                <div style={{ padding: '15px', backgroundColor: '#ebf5fb', borderRadius: '6px', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 5px', fontSize: '24px', fontWeight: '600', color: '#3498db' }}>{orgMetrics.on_leave}</p>
                  <p style={{ margin: '0', color: '#2c3e50' }}>On Leave</p>
                </div>
                <div style={{ padding: '15px', backgroundColor: '#fadbd8', borderRadius: '6px', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 5px', fontSize: '24px', fontWeight: '600', color: '#e74c3c' }}>{orgMetrics.absent}</p>
                  <p style={{ margin: '0', color: '#2c3e50' }}>Absent</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Real-time Notifications */}
        <div style={{ marginTop: '20px', backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 15px', color: '#2c3e50' }}>Recent Activity</h3>
          {notifications.length > 0 ? (
            <div>
              {notifications.map(notification => (
                <div key={notification.id} style={{ padding: '12px 0', borderBottom: '1px solid #ecf0f1', display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: notification.type === 'clock_in' ? '#2ecc71' : '#3498db',
                    marginRight: '12px'
                  }}></div>
                  <p style={{ margin: '0', color: '#2c3e50' }}>{notification.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: '0', color: '#7f8c8d' }}>No recent activity</p>
          )}
        </div>
      </div>
    </div>
  );
}