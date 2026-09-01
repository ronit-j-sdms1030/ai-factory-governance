function AttendanceHistory() {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [filterMonth, setFilterMonth] = React.useState(new Date().toISOString().slice(0, 7));
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [timezoneView, setTimezoneView] = React.useState('Asia/Kolkata');
  const [showModal, setShowModal] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);

  // Mock attendance data
  const attendanceData = [
    { id: 1, date: '2023-06-01', status: 'present', lateMinutes: 0, clockIn: '09:05', clockOut: '18:10', device: 'iPhone 12', verified: true, syncStatus: 'synced' },
    { id: 2, date: '2023-06-02', status: 'late', lateMinutes: 25, clockIn: '09:30', clockOut: '18:05', device: 'Windows Laptop', verified: false, syncStatus: 'synced' },
    { id: 3, date: '2023-06-03', status: 'absent', lateMinutes: 0, clockIn: null, clockOut: null, device: null, verified: false, syncStatus: 'pending' },
    { id: 4, date: '2023-06-04', status: 'on_leave', lateMinutes: 0, clockIn: null, clockOut: null, device: null, verified: false, syncStatus: 'synced' },
    { id: 5, date: '2023-06-05', status: 'present', lateMinutes: 0, clockIn: '08:55', clockOut: '17:58', device: 'Android Phone', verified: true, syncStatus: 'synced' },
    { id: 6, date: '2023-06-06', status: 'late', lateMinutes: 12, clockIn: '09:17', clockOut: '18:02', device: 'iPad Pro', verified: true, syncStatus: 'conflict' },
    { id: 7, date: '2023-06-07', status: 'present', lateMinutes: 0, clockIn: '09:02', clockOut: '18:05', device: 'MacBook Pro', verified: true, syncStatus: 'synced' },
    { id: 8, date: '2023-06-08', status: 'present', lateMinutes: 0, clockIn: '08:58', clockOut: '17:55', device: 'Surface Book', verified: false, syncStatus: 'synced' },
    { id: 9, date: '2023-06-09', status: 'absent', lateMinutes: 0, clockIn: null, clockOut: null, device: null, verified: false, syncStatus: 'pending' },
    { id: 10, date: '2023-06-10', status: 'on_leave', lateMinutes: 0, clockIn: null, clockOut: null, device: null, verified: false, syncStatus: 'synced' },
    { id: 11, date: '2023-06-13', status: 'present', lateMinutes: 0, clockIn: '09:01', clockOut: '18:03', device: 'iPhone 13', verified: true, syncStatus: 'synced' },
    { id: 12, date: '2023-06-14', status: 'late', lateMinutes: 8, clockIn: '09:08', clockOut: '18:12', device: 'Pixel 6', verified: true, syncStatus: 'synced' },
    { id: 13, date: '2023-06-15', status: 'present', lateMinutes: 0, clockIn: '08:59', clockOut: '17:57', device: 'Dell XPS', verified: false, syncStatus: 'synced' },
    { id: 14, date: '2023-06-16', status: 'present', lateMinutes: 0, clockIn: '09:03', clockOut: '18:01', device: 'Mac Studio', verified: true, syncStatus: 'synced' },
    { id: 15, date: '2023-06-17', status: 'on_leave', lateMinutes: 0, clockIn: null, clockOut: null, device: null, verified: false, syncStatus: 'synced' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return '#4CAF50'; // Green
      case 'late': return '#FF9800';    // Orange
      case 'absent': return '#F44336';   // Red
      case 'on_leave': return '#2196F3'; // Blue
      default: return '#9E9E9E';
    }
  };

  const getSyncStatusIcon = (status) => {
    switch(status) {
      case 'synced': return '✓';
      case 'pending': return '↻';
      case 'conflict': return '⚠';
      default: return '';
    }
  };

  const handleDateClick = (date) => {
    const record = attendanceData.find(item => item.date === date);
    if (record) {
      setModalData(record);
      setShowModal(true);
    }
  };

  const exportToCSV = () => {
    alert('Exporting attendance data to CSV...');
  };

  const filteredData = attendanceData.filter(record => {
    const matchesMonth = record.date.startsWith(filterMonth);
    const matchesStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchesMonth && matchesStatus;
  });

  // Generate calendar days for the selected month
  const generateCalendarDays = () => {
    const year = parseInt(filterMonth.split('-')[0]);
    const month = parseInt(filterMonth.split('-')[1]) - 1;
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
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      days.push(dateStr);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">Attendance History</h1>
            <div className="flex space-x-4">
              <select 
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2023-05">May 2023</option>
                <option value="2023-06">June 2023</option>
                <option value="2023-07">July 2023</option>
              </select>
              
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="present">Present</option>
                <option value="late">Late</option>
                <option value="absent">Absent</option>
                <option value="on_leave">On Leave</option>
              </select>
              
              <select 
                value={timezoneView}
                onChange={(e) => setTimezoneView(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Asia/Kolkata">IST (UTC+5:30)</option>
                <option value="America/New_York">EST (UTC-5:00)</option>
                <option value="Europe/London">GMT (UTC+0:00)</option>
                <option value="Asia/Tokyo">JST (UTC+9:00)</option>
              </select>
              
              <button 
                onClick={exportToCSV}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                Export CSV
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium text-gray-500 py-2">{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date, index) => {
                if (!date) {
                  return <div key={index} className="h-24 border border-gray-100 rounded"></div>;
                }
                
                const record = filteredData.find(item => item.date === date);
                const today = new Date().toISOString().split('T')[0];
                const isToday = date === today;
                
                return (
                  <div 
                    key={date} 
                    onClick={() => handleDateClick(date)}
                    className={`h-24 border border-gray-100 rounded cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col p-2 ${
                      isToday ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <div className="flex justify-between">
                      <span className={`text-sm ${isToday ? 'font-bold text-blue-600' : 'text-gray-700'}`}>
                        {new Date(date).getDate()}
                      </span>
                      {record && record.syncStatus !== 'synced' && (
                        <span className="text-xs text-orange-500 font-bold">
                          {getSyncStatusIcon(record.syncStatus)}
                        </span>
                      )}
                    </div>
                    
                    {record ? (
                      <div className="mt-1 flex-1 flex flex-col">
                        <div 
                          className="text-xs font-medium px-2 py-1 rounded truncate"
                          style={{ backgroundColor: `${getStatusColor(record.status)}20`, color: getStatusColor(record.status) }}
                        >
                          {record.status.replace('_', ' ')}
                        </div>
                        {record.lateMinutes > 0 && (
                          <div className="text-xs text-orange-600 mt-1">+{record.lateMinutes} min</div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 mt-1">No record</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Legend</h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: '#4CAF50' }}></div>
                <span className="text-sm text-gray-600">Present</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: '#FF9800' }}></div>
                <span className="text-sm text-gray-600">Late</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: '#F44336' }}></div>
                <span className="text-sm text-gray-600">Absent</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: '#2196F3' }}></div>
                <span className="text-sm text-gray-600">On Leave</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-sm mr-2 bg-gray-100 border border-gray-300"></div>
                <span className="text-sm text-gray-600">No Record</span>
              </div>
            </div>
            
            <h3 className="text-md font-medium text-gray-800 mt-6 mb-3">Offline Records</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <span className="text-orange-500 font-bold mr-1">↻</span>
                <span className="text-sm text-gray-600">Pending Sync</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-500 font-bold mr-1">⚠</span>
                <span className="text-sm text-gray-600">Conflict</span>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Day Detail Modal */}
      {showModal && modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Attendance Details</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-700">Date</h4>
                <p className="text-gray-900">{new Date(modalData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-700">Status</h4>
                <div 
                  className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: `${getStatusColor(modalData.status)}20`, color: getStatusColor(modalData.status) }}
                >
                  {modalData.status.replace('_', ' ')}
                </div>
              </div>
              
              {modalData.clockIn && (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-md font-medium text-gray-700">Clock In</h4>
                      <p className="text-gray-900">{modalData.clockIn}</p>
                    </div>
                    <div>
                      <h4 className="text-md font-medium text-gray-700">Clock Out</h4>
                      <p className="text-gray-900">{modalData.clockOut}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-md font-medium text-gray-700">Device Information</h4>
                    <p className="text-gray-900">{modalData.device}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-md font-medium text-gray-700">Verification</h4>
                    <p className="text-gray-900">
                      {modalData.verified ? (
                        <span className="flex items-center text-green-600">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          Facial Verification Successful
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                          </svg>
                          Not Verified
                        </span>
                      )}
                    </p>
                  </div>
                </>
              )}
              
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-700">Sync Status</h4>
                <p className="text-gray-900">
                  {modalData.syncStatus === 'synced' ? (
                    <span className="text-green-600">✓ Synced</span>
                  ) : modalData.syncStatus === 'pending' ? (
                    <span className="text-orange-500">↻ Pending Sync</span>
                  ) : (
                    <span className="text-orange-500">⚠ Conflict Detected</span>
                  )}
                </p>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}