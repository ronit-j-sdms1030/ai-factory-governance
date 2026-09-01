function AttendanceCalendar() {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(2024, 4, 1)); // May 2024
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [timezoneView, setTimezoneView] = React.useState('local'); // 'local' or 'utc'
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  
  // Mock employee data
  const employee = {
    id: 1,
    first_name: "Alex",
    last_name: "Johnson",
    timezone: "America/New_York"
  };
  
  // Mock attendance data
  const attendanceData = [
    { date: '2024-05-01', status: 'present', clock_in: '08:55', clock_out: '17:30', device: 'iPhone 14', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-02', status: 'late', clock_in: '09:25', clock_out: '17:45', device: 'Desktop Chrome', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-03', status: 'absent', clock_in: null, clock_out: null, device: null, verified: false, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-04', status: 'on_leave', clock_in: null, clock_out: null, device: null, verified: false, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-05', status: 'present', clock_in: '08:58', clock_out: '18:15', device: 'Android Samsung', verified: true, timezone: 'EDT', sync: 'pending' },
    { date: '2024-05-06', status: 'present', clock_in: '09:02', clock_out: '17:28', device: 'iPhone 14', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-07', status: 'late', clock_in: '09:35', clock_out: '17:30', device: 'Desktop Firefox', verified: false, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-08', status: 'present', clock_in: '08:45', clock_out: '17:35', device: 'iPhone 14', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-09', status: 'present', clock_in: '09:00', clock_out: '17:25', device: 'Android Samsung', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-10', status: 'absent', clock_in: null, clock_out: null, device: null, verified: false, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-11', status: 'on_leave', clock_in: null, clock_out: null, device: null, verified: false, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-12', status: 'present', clock_in: '08:55', clock_out: '17:40', device: 'iPhone 14', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-13', status: 'present', clock_in: '09:05', clock_out: '17:30', device: 'Desktop Chrome', verified: false, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-14', status: 'late', clock_in: '09:40', clock_out: '17:20', device: 'Android Samsung', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-15', status: 'present', clock_in: '08:50', clock_out: '17:35', device: 'iPhone 14', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-16', status: 'present', clock_in: '08:58', clock_out: '17:25', device: 'Desktop Safari', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-17', status: 'absent', clock_in: null, clock_out: null, device: null, verified: false, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-18', status: 'on_leave', clock_in: null, clock_out: null, device: null, verified: false, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-19', status: 'present', clock_in: '09:02', clock_out: '17:45', device: 'Android Samsung', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-20', status: 'present', clock_in: '08:55', clock_out: '17:30', device: 'iPhone 14', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-21', status: 'late', clock_in: '09:30', clock_out: '17:25', device: 'Desktop Chrome', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-22', status: 'present', clock_in: '08:50', clock_out: '17:35', device: 'Android Samsung', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-23', status: 'present', clock_in: '09:05', clock_out: '17:40', device: 'iPhone 14', verified: false, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-24', status: 'absent', clock_in: null, clock_out: null, device: null, verified: false, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-25', status: 'on_leave', clock_in: null, clock_out: null, device: null, verified: false, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-26', status: 'present', clock_in: '08:58', clock_out: '17:30', device: 'Desktop Firefox', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-27', status: 'present', clock_in: '09:00', clock_out: '17:25', device: 'Android Samsung', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-28', status: 'late', clock_in: '09:45', clock_out: '17:35', device: 'iPhone 14', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-29', status: 'present', clock_in: '08:55', clock_out: '17:40', device: 'Desktop Chrome', verified: true, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-30', status: 'present', clock_in: '09:02', clock_out: '17:30', device: 'Android Samsung', verified: false, timezone: 'EDT', sync: 'synced' },
    { date: '2024-05-31', status: 'absent', clock_in: null, clock_out: null, device: null, verified: false, timezone: 'EDT', sync: 'synced' }
  ];
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of month
    const firstDay = new Date(year, month, 1);
    // Last day of month
    const lastDay = new Date(year, month + 1, 0);
    // Days from previous month to show
    const prevMonthDays = firstDay.getDay();
    // Total days to show (6 weeks)
    const totalDays = 42;
    
    const days = [];
    
    // Previous month days
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({
        date: date,
        currentMonth: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const dateString = date.toISOString().split('T')[0];
      const record = attendanceData.find(d => d.date === dateString);
      
      days.push({
        date: date,
        currentMonth: true,
        record: record
      });
    }
    
    // Next month days
    const nextMonthDays = totalDays - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date: date,
        currentMonth: false
      });
    }
    
    return days;
  };
  
  const calendarDays = generateCalendarDays();
  
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'bg-green-500';
      case 'late': return 'bg-orange-500';
      case 'absent': return 'bg-red-500';
      case 'on_leave': return 'bg-blue-500';
      default: return 'bg-gray-200';
    }
  };
  
  // Get sync status icon
  const getSyncIcon = (syncStatus) => {
    switch (syncStatus) {
      case 'pending': return '⏳';
      case 'synced': return '✓';
      case 'conflict': return '⚠️';
      default: return '';
    }
  };
  
  // Handle day click
  const handleDayClick = (day) => {
    if (day.currentMonth && day.record) {
      setSelectedDay(day);
      setShowModal(true);
    }
  };
  
  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(newn Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Handle export
  const handleExport = () => {
    alert('Exporting attendance data to CSV...');
  };
  
  // Filtered days
  const filteredDays = calendarDays.filter(day => {
    if (!day.currentMonth) return true;
    if (filterStatus === 'all') return true;
    return day.record && day.record.status === filterStatus;
  });
  
  // Calculate summary
  const calculateSummary = () => {
    const present = attendanceData.filter(d => d.status === 'present').length;
    const late = attendanceData.filter(d => d.status === 'late').length;
    const absent = attendanceData.filter(d => d.status === 'absent').length;
    const onLeave = attendanceData.filter(d => d.status === 'on_leave').length;
    
    return { present, late, absent, onLeave };
  };
  
  const summary = calculateSummary();
  
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Attendance Calendar</h1>
          <button 
            onClick={handleExport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export to CSV
          </button>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handlePrevMonth}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <h2 className="text-xl font-semibold text-gray-700">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            
            <button 
              onClick={handleNextMonth}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Filter:</span>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="present">Present</option>
                <option value="late">Late</option>
                <option value="absent">Absent</option>
                <option value="on_leave">On Leave</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Timezone:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                  onClick={() => setTimezoneView('local')}
                  className={`px-3 py-1 rounded-md ${timezoneView === 'local' ? 'bg-white shadow-sm' : ''}`}
                >
                  Local
                </button>
                <button 
                  onClick={() => setTimezoneView('utc')}
                  className={`px-3 py-1 rounded-md ${timezoneView === 'utc' ? 'bg-white shadow-sm' : ''}`}
                >
                  UTC
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row p-4 gap-6">
        {/* Calendar */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {filteredDays.map((day, index) => (
              <div 
                key={index}
                onClick={() => handleDayClick(day)}
                className={`min-h-24 p-2 border rounded-lg cursor-pointer transition-all
                  ${day.currentMonth ? 'bg-white hover:bg-gray-50 border-gray-200' : 'bg-gray-50 border-gray-100 text-gray-400'}
                  ${day.currentMonth && day.record ? 'hover:shadow-md' : ''}
                  ${selectedDay && day.date.toDateString() === selectedDay.date.toDateString() ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    {day.date.getDate()}
                  </span>
                  {day.currentMonth && day.record && (
                    <span className="text-xs">
                      {getSyncIcon(day.record.sync)}
                    </span>
                  )}
                </div>
                
                {day.currentMonth && day.record && (
                  <div className={`w-full h-2 rounded-full mt-2 ${getStatusColor(day.record.status)}`}></div>
                )}
                
                {day.currentMonth && day.record && day.record.status === 'late' && (
                  <div className="text-xs text-orange-600 mt-1">
                    {day.record.clock_in}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Summary */}
        <div className="w-full md:w-80 bg-white rounded-xl shadow-sm p-6 h-fit">
          <h3 className="font-semibold text-lg text-gray-800 mb-4">Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Present</span>
              </div>
              <span className="font-medium">{summary.present}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Late</span>
              </div>
              <span className="font-medium">{summary.late}</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Absent</span>
              </div>
              <span className="font-medium">{summary.absent}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-600">On Leave</span>
              </div>
              <span className="font-medium">{summary.onLeave}</span>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center font-semibold">
                <span>Total Days</span>
                <span>{summary.present + summary.late + summary.absent + summary.onLeave}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Day Detail Modal */}
      {showModal && selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedDay.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-600">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedDay.record.status)} text-white`}>
                    {selectedDay.record.status.charAt(0).toUpperCase() + selectedDay.record.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Clock In</div>
                    <div className="font-medium">{selectedDay.record.clock_in || '--:--'}</div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Clock Out</div>
                    <div className="font-medium">{selectedDay.record.clock_out || '--:--'}</div>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Device Used</div>
                  <div className="font-medium">{selectedDay.record.device || 'N/A'}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Verification</div>
                    <div className="font-medium">
                      {selectedDay.record.verified ? (
                        <span className="text-green-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Verified
                        </span>
                      ) : (
                        <span className="text-orange-600">Not Verified</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-500">Timezone</div>
                    <div className="font-medium">{selectedDay.record.timezone}</div>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Sync Status</div>
                  <div className="font-medium flex items-center">
                    <span className="mr-2">{getSyncIcon(selectedDay.record.sync)}</span>
                    {selectedDay.record.sync.charAt(0).toUpperCase() + selectedDay.record.sync.slice(1)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}