function AttendanceCalendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [timezone, setTimezone] = React.useState('Asia/Kolkata');
  const [showModal, setShowModal] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  // Mock attendance data
  const mockAttendanceData = [
    { date: '2024-06-01', status: 'present', clockIn: '09:05', clockOut: '18:10', lateMinutes: 5, device: 'Web App', verified: true, sync: 'synced' },
    { date: '2024-06-02', status: 'late', clockIn: '10:30', clockOut: '19:00', lateMinutes: 90, device: 'Mobile App', verified: true, sync: 'synced' },
    { date: '2024-06-03', status: 'absent', clockIn: null, clockOut: null, lateMinutes: 0, device: null, verified: false, sync: 'synced' },
    { date: '2024-06-04', status: 'present', clockIn: '08:55', clockOut: '17:58', lateMinutes: 0, device: 'Desktop Client', verified: true, sync: 'synced' },
    { date: '2024-06-05', status: 'leave', clockIn: null, clockOut: null, lateMinutes: 0, device: null, verified: false, sync: 'synced' },
    { date: '2024-06-06', status: 'present', clockIn: '09:02', clockOut: '18:05', lateMinutes: 2, device: 'Web App', verified: true, sync: 'synced' },
    { date: '2024-06-07', status: 'present', clockIn: '08:58', clockOut: '18:15', lateMinutes: 0, device: 'Mobile App', verified: false, sync: 'pending' },
    { date: '2024-06-08', status: 'present', clockIn: '09:15', clockOut: '18:20', lateMinutes: 15, device: 'Web App', verified: true, sync: 'synced' },
    { date: '2024-06-09', status: 'absent', clockIn: null, clockOut: null, lateMinutes: 0, device: null, verified: false, sync: 'synced' },
    { date: '2024-06-10', status: 'late', clockIn: '09:45', clockOut: '18:30', lateMinutes: 45, device: 'Mobile App', verified: true, sync: 'synced' },
    { date: '2024-06-11', status: 'present', clockIn: '09:00', clockOut: '18:00', lateMinutes: 0, device: 'Desktop Client', verified: true, sync: 'synced' },
    { date: '2024-06-12', status: 'present', clockIn: '08:55', clockOut: '17:55', lateMinutes: 0, device: 'Web App', verified: true, sync: 'synced' },
    { date: '2024-06-13', status: 'present', clockIn: '09:05', clockOut: '18:10', lateMinutes: 5, device: 'Mobile App', verified: false, sync: 'synced' },
    { date: '2024-06-14', status: 'leave', clockIn: null, clockOut: null, lateMinutes: 0, device: null, verified: false, sync: 'synced' },
    { date: '2024-06-15', status: 'present', clockIn: '09:00', clockOut: '18:05', lateMinutes: 0, device: 'Web App', verified: true, sync: 'synced' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-500';
      case 'late': return 'bg-orange-500';
      case 'absent': return 'bg-red-500';
      case 'leave': return 'bg-blue-500';
      default: return 'bg-gray-300';
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const attendance = mockAttendanceData.find(d => d.date === dateString);
      days.push({
        date: i,
        dateString,
        attendance
      });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
  
  const filteredDays = filterStatus === 'all' 
    ? days 
    : days.filter(day => day && day.attendance && day.attendance.status === filterStatus);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const openDayDetail = (day) => {
    if (day && day.attendance) {
      setModalData(day.attendance);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  const exportToCSV = () => {
    alert('Attendance data exported to CSV successfully!');
  };

  const getStatusCount = (status) => {
    return mockAttendanceData.filter(d => d.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Attendance Calendar</h1>
          <button 
            onClick={exportToCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            Export to CSV
          </button>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Present Days</div>
            <div className="text-2xl font-bold text-green-600">{getStatusCount('present')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Late Arrivals</div>
            <div className="text-2xl font-bold text-orange-600">{getStatusCount('late')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Absent Days</div>
            <div className="text-2xl font-bold text-red-600">{getStatusCount('absent')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-sm text-gray-500">Leave Days</div>
            <div className="text-2xl font-bold text-blue-600">{getStatusCount('leave')}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
                <select 
                  value={filterStatus} 
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="present">Present</option>
                  <option value="late">Late</option>
                  <option value="absent">Absent</option>
                  <option value="leave">On Leave</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select 
                  value={timezone} 
                  onChange={(e) => setTimezone(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="America/New_York">America/New York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Australia/Sydney">Australia/Sydney (AEDT)</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePrevMonth}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              
              <button 
                onClick={handleToday}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Today
              </button>
              
              <button 
                onClick={handleNextMonth}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              
              <div className="text-lg font-semibold text-gray-800">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-7 gap-px bg-gray-200 border-b">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="bg-white p-3 text-center text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {filteredDays.map((day, index) => (
              <div 
                key={index} 
                className={`min-h-24 bg-white p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
                  day?.attendance?.sync === 'pending' ? 'border-l-4 border-yellow-400' : ''
                }`}
                onClick={() => openDayDetail(day)}
              >
                {day ? (
                  <>
                    <div className="text-right text-sm font-medium text-gray-700">
                      {day.date}
                    </div>
                    {day.attendance ? (
                      <div className="mt-1">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(day.attendance.status)} inline-block mr-1`}></div>
                        <span className="text-xs capitalize">
                          {day.attendance.status}
                        </span>
                        {day.attendance.sync === 'pending' && (
                          <span className="ml-1 text-xs text-yellow-600">Offline</span>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 mt-1">No record</div>
                    )}
                  </>
                ) : (
                  <div className="h-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm">Present</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-sm">Late Arrival</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">Absent</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">On Leave</span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 border-l-4 border-yellow-400 mr-2"></div>
              <span className="text-sm">Offline Record</span>
            </div>
          </div>
        </div>
      </div>

      {/* Day Detail Modal */}
      {showModal && modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-900">
                  Attendance Details
                </h3>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <div className="mt-4 space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{modalData.date}</span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium capitalize ${
                    modalData.status === 'present' ? 'text-green-600' :
                    modalData.status === 'late' ? 'text-orange-600' :
                    modalData.status === 'absent' ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {modalData.status}
                  </span>
                </div>
                
                {modalData.clockIn && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Clock In:</span>
                    <span className="font-medium">{modalData.clockIn}</span>
                  </div>
                )}
                
                {modalData.clockOut && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Clock Out:</span>
                    <span className="font-medium">{modalData.clockOut}</span>
                  </div>
                )}
                
                {modalData.lateMinutes > 0 && (
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Late By:</span>
                    <span className="font-medium text-orange-600">{modalData.lateMinutes} minutes</span>
                  </div>
                )}
                
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Device:</span>
                  <span className="font-medium">{modalData.device || 'N/A'}</span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Verification:</span>
                  <span className={`font-medium ${modalData.verified ? 'text-green-600' : 'text-gray-500'}`}>
                    {modalData.verified ? 'Verified' : 'Not Verified'}
                  </span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Sync Status:</span>
                  <span className={`font-medium ${
                    modalData.sync === 'synced' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {modalData.sync.charAt(0).toUpperCase() + modalData.sync.slice(1)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}