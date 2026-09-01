function AttendanceCalendar() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2024, dictateCurrentMonth, 1));
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [activeFilters, setActiveFilters] = React.useState({
    present: true,
    late: true,
    absent: true,
    leave: true,
    offline: true
  });
  const [selectedTimezone, setSelectedTimezone] = React.useState('America/New_York');
  
  // Mock data for current user's attendance
  const mockAttendance = {
    "2024-03-

<｜DSML｜function_calls>
<｜DSML｜invoke name="ScreenSource">
<｜DSML｜parameter name="source" string="true">function AttendanceCalendar() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2024, 2,133, 1));
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [activeFilters, setActiveFilters] = React.useState({
    present: true,
    late: true,
    absent: true,
    leave: true,
    offline: true
  });
  const [selectedTimezone, setSelectedTimezone] = React.useState('America/New_York');
  
  // Mock data for current user's attendance
  const mockAttendance = {
    "2024-03-
    15": {
      clockIn: "08:45",
      clockOut: "17:30",
      status: "present",
      device: "iPhone 14 Pro",
      ipAddress: "192.168.1.105",
      facialVerified: true,
      offline: false
    },
    "2024-03-18": {
      clockIn: "09:15",
      clockOut: "17:45",
      status: "late",
      lateMinutes: 15,
      device: "Chrome on Windows",
      ipAddress: "10.0.1.22",
      facialVerified: false,
      offline: false
    },
    "2024-03-19": {
      clockIn: null,
      clockOut: null,
      status: "leave",
      leaveType: "Sick Leave",
      device: null,
      ipAddress: null,
      facialVerified: null,
      offline: false
    },
    "2024-03-20": {
      clockIn: "08:55",
      clockOut: "17:10",
      status: "present",
      device: "Android Samsung S23",
      ipAddress: "172.20.5.88",
      facialVerified: true,
      offline: true,
      syncStatus: "pending"
    },
    "2024-03-21": {
      clockIn: null,
      clockOut: null,
      status: "absent",
      device: null,
      ipAddress: null,
      facialVerified: null,
      offline: false
    },
    "2024-03-

<｜DSML｜function_calls>
<｜DSML｜invoke name="ScreenSource">
<｜DSML｜parameter name="source" string="true">function AttendanceCalendar() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2024, 2, 1));
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [activeFilters, setActiveFilters] = React.useState({
    present: true,
    late: true,
    absent: true,
    leave: true,
    offline: true
  });
  const [selectedTimezone, setSelectedTimezone] = React.useState('America/New_York');
  
  // Mock data for current user's attendance
  const mockAttendance = {
    "2024-03-15": {
      clockIn: "08:45",
      clockOut: "17:30",
      status: "present",
      device: "iPhone 14 Pro",
      ipAddress: "192.168.1.105",
      facialVerified: true,
      offline: false
    },
    "2024-03-18": {
      clockIn: "09:15",
      clockOut: "17:45",
      status: "late",
      lateMinutes: 15,
      device: "Chrome on Windows",
      ipAddress: "10.0.1.22",
      facialVerified: false,
      offline: false
    },
    "2024-03-19": {
      clockIn: null,
      clockOut: null,
      status: "leave",
      leaveType: "Sick Leave",
      device: null,
      ipAddress: null,
      facialVerified: null,
      offline: false
    },
    "2024-03-20": {
      clockIn: "08:55",
      clockOut: "17:10",
      status: "present",
      device: "Android Samsung S23",
      ipAddress: "172.20.5.88",
      facialVerified: true,
      offline: true,
      syncStatus: "pending"
    },
    "2024-03-21": {
      clockIn: null,
      clockOut: null,
      status: "absent",
      device: null,
      ipAddress: null,
      facialVerified: null,
      offline: false
    },
    "2024-03-22": {
      clockIn: "08:30",
      clockOut: "17:00",
      status: "present",
      device: "Safari on Mac",
      ipAddress: "203.0.113.42",
      facialVerified: true,
      offline: false
    },
    "2024-03-25": {
      clockIn: "09:05",
      clockOut: "17:20",
      status: "late",
      lateMinutes: -5,
      device: "Edge on Windows",
      ipAddress: "198.51.100.23",
      facialVerified: false,
      offline: false
    },
    "2024-03-26": {
      clockIn: null,
      clockOut: null,
      status: "leave",
      leaveType: "Annual Leave",
      device: null,
      ipAddress: null,
      facialVerified: null,
      offline: false
    },
    "2024-03-27": {
      clockIn: "08:50",
      clockOut: "18:15",
      status: "present",
      device: "iPhone 15",
      ipAddress: "192.168.2.101",
      facialVerified: true,
      offline: true,
      syncStatus: "synced"
    },
    "2024-03-28": {
      clockIn: "08:45",
      clockOut: "17:30",
      status: "present",
      device: "Chrome on Windows",
      ipAddress: "10.0.0.15",
      facialVerified: false,
      offline: false
    }
  };
  
  // Calculate summary statistics
  const calculateSummary = () => {
    const days = Object.values(mockAttendance);
    const present = days.filter(d => d.status === 'present').length;
    const late = days.filter(d => d.status === 'late').length;
    const absent = days.filter(d => d.status === 'absent').length;
    const leave = days.filter(d => d.status === 'leave').length;
    const offline = days.filter(d => d.offline).length;
    const verified = days.filter(d => d.facialVerified).length;
    
    return { present, late, absent, leave, offline, verified, total: days.length };
  };
  
  const summary = calculateSummary();
  
  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const attendance = mockAttendance[dateKey];
      days.push({
        date,
        dateKey,
        attendance
      });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const handleMonthChange = (e) => {
    const [year, month] = e.target.value.split('-');
    setCurrentMonth(new Date(parseInt(year), parseInt(month) - 1, 1));
  };
  
  // Handle filter toggles
  const handleFilterToggle = (filter) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };
  
  // Handle export to CSV
  const handleExportCSV = () => {
    alert(`Exporting attendance data for ${currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })} to CSV...`);
    // In real implementation, this would generate and download CSV
  };
  
  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return '#10b981';
      case 'late': return '#f59e0b';
      case 'absent': return '#ef4444';
      case 'leave': return '#3b82f6';
      default: return '#6b7280';
    }
  };
  
  // Get status label
  const getStatusLabel = (status) => {
    switch(status) {
      case 'present': return 'Present';
      case 'late': return 'Late';
      case 'absent': return 'Absent';
      case 'leave': return 'Leave';
      default: return 'Not Recorded';
    }
  };
  
  // Get day detail content
  const getDayDetailContent = (attendance) => {
    if (!attendance) return <p>No attendance record for this day.</p>;
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: getStatusColor(attendance.status)
          }}></div>
          <strong>{getStatusLabel(attendance.status)}</strong>
        </div>
        
        {attendance.clockIn && (
          <div>
            <strong>Clock Times:</strong>
            <div style={{ marginLeft: '16px', marginTop: '4px' }}>
              In: {attendance.clockIn} | Out: {attendance.clockOut || 'Not clocked out'}
              {attendance.lateMinutes && ` (${Math.abs(attendance.lateMinutes)} minutes ${attendance.lateMinutes > 0 ? 'late' : 'early'})`}
            </div>
          </div>
        )}
        
        {attendance.device && (
          <div>
            <strong>Device Info:</strong>
            <div style={{ marginLeft: '16px', marginTop: '4px' }}>{attendance.device}</div>
          </div>
        )}
        
        {attendance.ipAddress && (
          <div>
            <strong>IP Address:</strong>
            <div style={{ marginLeft: '16px', marginTop: '4px' }}>{attendance.ipAddress}</div>
          </div>
        )}
        
        <div>
          <strong>Verification:</strong>
          <div style={{ marginLeft: '16px', marginTop: '4px' }}>
            {attendance.facialVerified === true ? '✓ Facial Verified' : 
             attendance.facialVerified === false ? 'No facial verification' : 'N/A'}
          </div>
        </div>
        
        {attendance.offline && (
          <div>
            <strong>Offline Record:</strong>
            <div style={{ marginLeft: '16px', marginTop: '4px', color: attendance.syncStatus === 'pending' ? '#f59e0b' : '#10b981' }}>
              {attendance.syncStatus === 'pending' ? '⏳ Sync Pending' : '✓ Synced'}
            </div>
          </div>
        )}
        
        {attendance.leaveType && (
          <div>
            <strong>Leave Type:</strong>
            <div style={{ marginLeft: '16px', marginTop: '4px' }}>{attendance.leaveType}</div>
          </div>
        )}
      </div>
    );
  };
  
  // Timezone options
  const timezones = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Berlin',
    'Asia/Singapore',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];
  
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '240px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        padding: '24px'
      }}>
        <h2 style={{
          margin: '0 0 опя24px',
          fontSize: '20px',
          fontWeight: '600',
          color: '#1e293b'
        }}>WorkPulse</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <a href="/" style={{
            padding: '8px 12px',
            borderRadius: '6px',
            color: '#475569',
            textDecoration: 'none',
            fontSize: '14px'
          }}>Dashboard</a>
          <a href="/clock" style={{
            padding: '8px 12px',
            borderRadius: '6px',
            color: '#475569',
            textDecoration: 'none',
            fontSize: '14px'
          }}>Clock In/Out</a>
          <a href="/attendance" style={{
            padding: '8px 12px',
            borderRadius: '6px',
            backgroundColor: '#eff6ff',
            color: '#3b82f6',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500'
          }}>Attendance Calendar</a>
          <a href="/leave/my-leave" style={{
            padding: '8px 12px',
            borderRadius: '6px',
            color: '#475569',
            textDecoration: 'none',
            fontSize: '14px'
          }}>My Leave</a>
          <a href="/team/attendance" style={{
            padding: '8px 12px',
            borderRadius: '6px',
            color: '#475569',
            textDecoration: 'none',
            fontSize: '14px'
          }}>Team Attendance</a>
          <a href="/roster" style={{
            padding: '8px 12px',
            borderRadius: '6px',
            color: '#475569',
            textDecoration: 'none',
            fontSize: '14px'
          }}>Shift Roster</a>
          <a href="/profile" style={{
            padding: '8px 12px',
            borderRadius: '6px',
            color: '#475569',
            textDecoration: 'none',
            fontSize: '14px'
          }}>Profile</a>
        </nav>
      </div>
      
      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px' }}>
              Attendance Calendar
            </h1>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
              View your attendance history with timezone-aware calculations
            </p>
          </div>
          
          <button onClick={handleExportCSV} style={{
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>📥</span>
            Export to CSV
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '32px' }}>
          {/* Filters Panel */}
          <div style={{
            width: '280px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1e293b',
              margin: '0 0 20px'
            }}>Filters</h3>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#475569',
                marginBottom: '8px'
              }}>Show Status</label>
              
              {['present', 'late', 'absent', 'leave', 'offline'].map(filter => (
                <div key={filter} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '8px',
                  cursor: 'pointer'
                }} onClick={() => handleFilterToggle(filter)}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    border: `2px solid ${activeFilters[filter] ? getStatusColor(filter === 'offline' ? 'present' : filter) : '#cbd5e1'}`,
                    backgroundColor: activeFilters[filter] ? getStatusColor(filter === 'offline' ? 'present' : filter) : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {activeFilters[filter] && '✓'}
                  </div>
                  <span style={{
                    fontSize: '14px',
                    color: '#475569',
                    textTransform: 'capitalize'
                  }}>{filter}</span>
                </div>
              ))}
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#475569',
                marginBottom: '8px'
              }}>Timezone View</label>
              
              <select 
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  color: '#1e293b',
                  backgroundColor: '#ffffff'
                }}
              >
                {timezones.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
              
              <p style={{
                fontSize: '12px',
                color: '#64748b',
                marginTop: '8px',
                marginBottom: '0'
              }}>
                All times displayed in {selectedTimezone}
              </p>
            </div>
          </div>
          
          {/* Main Calendar Area */}
          <div style={{ flex: 1 }}>
            {/* Calendar Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button onClick={handlePrevMonth} style={{
                  padding: '8px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer'
                }}>
                  ←
                </button>
                
                <input
                  type="month"
                  value={`${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`}
                  onChange={handleMonthChange}
                  style={{
                    padding: '8px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#1e293b'
                  }}
                />
                
                <button onClick={handleNextMonth} style={{
                  padding: '8px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer'
                }}>
                  →
                </button>
              </div>
              
              <div style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b' }}>
                {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </div>
            </div>
            
            {/* Summary Statistics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Present Days</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>{summary.present}</div>
              </div>
              
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Late Arrivals</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b' }}>{summary.late}</div>
              </div>
              
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Leave Days</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>{summary.leave}</div>
              </div>
              
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Absent Days</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444' }}>{summary.absent}</div>
              </div>
              
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Offline Records</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6' }}>{summary.offline}</div>
              </div>
              
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Facial Verified</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>{summary.verified}</div>
              </div>
            </div>
            
            {/* Calendar Grid */}
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '8px',
                marginBottom: '16px'
              }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} style={{
                    textAlign: 'center',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#64748b',
                    padding: '8px'
                  }}>
                    {day}
                  </div>
                ))}
              </div>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '8px'
              }}>
                {calendarDays.map(day => {
                  const shouldShow = day.attendance ? activeFilters[day.attendance.status] : true;
                  
                  if (!shouldShow) return (
                    <div key={day.dateKey} style={{
                      aspectRatio: '1',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      opacity: '0.5'
                    }}>
                      <div style={{ fontSize: '14px', color: '#94a3b8' }}>{day.date.getDate()}</div>
                    </div>
                  );
                  
                  return (
                    <div
                      key={day.dateKey}
                      onClick={() => setSelectedDate(day)}
                      style={{
                        aspectRatio: '1',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: day.attendance ? '#ffffff' : '#f8fafc',
                        borderRadius: '8px',
                        border: day.attendance ? `2px solid ${getStatusColor(day.attendance.status)}` : '1px solid #e2e8f0',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
                        {day.date.getDate()}
                      </div>
                      
                      {day.attendance && (
                        <div style={{
                          fontSize: '10px',
                          color: getStatusColor(day.attendance.status),
                          fontWeight: '500',
                          marginTop: '4px'
                        }}>
                          {getStatusLabel(day.attendance.status).substring(0, 3)}
                        </div>
                      )}
                      
                      {day.attendance?.offline && (
                        <div style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: day.attendance.syncStatus === 'pending' ? '#f59e0b' : '#10b981'
                        }}></div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '24px',
                fontSize: '12px',
                color: '#64748b'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: '#10b981' }}></div>
                  Present
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: '#f59e0b' }}></div>
                  Late
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: '#ef4444' }}></div>
                  Absent
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: '#3b82f6' }}></div>
                  Leave
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
                  Offline Pending
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Day Detail Modal */}
      {selectedDate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setSelectedDate(null)}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            width: '400px',
            maxWidth: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                {selectedDate.date.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <button onClick={() => setSelectedDate(null)} style={{
                padding: '4px 8px',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#64748b'
              }}>
                ×
              </button>
            </div>
            
            {getDayDetailContent(selectedDate.attendance)}
            
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedDate(null)} style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}