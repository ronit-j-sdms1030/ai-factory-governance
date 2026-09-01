function AttendanceCalendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedFilters, setSelectedFilters] = React.useState({
    present: true,
    late: true,
    absent: true,
    on_leave: true
  });
  const [timezone, setTimezone] = React.useState('Asia/Kolkata');
  const [showModal, setShowModal] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState(null);
  const [attendanceData, setAttendanceData] = React.useState({});

  // Mock data generation
  React.useEffect(() => {
    const mockData = {};
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const statuses = ['present', 'late', 'absent', 'on_leave'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      mockData[dateStr] = {
        status,
        lateMinutes: status === 'late' ? Math.floor(Math.random() * 60) : 0,
        clockIn: status !== 'absent' ? `0${Math.floor(Math.random() * 9)}:${String(Math.floor(Math.random() * 59)).padStart(2, '0')}` : null,
        clockOut: status !== 'absent' && Math.random() > 0.2 ? `1${Math.floor(Math.random() * 8) + 7}:${String(Math.floor(Math.random() * 59)).padStart(2, '0')}` : null,
        device: ['Web Browser', 'Mobile App', 'Kiosk Terminal'][Math.floor(Math.random() * 3)],
        verified: Math.random() > 0.3,
        syncStatus: ['synced', 'pending', 'conflict'][Math.floor(Math.random() * 3)]
      };
    }
    
    setAttendanceData(mockData);
  }, [currentDate]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-500';
      case 'late': return 'bg-orange-500';
      case 'absent': return 'bg-red-500';
      case 'on_leave': return 'bg-blue-500';
      default: return 'bg-gray-300';
    }
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const toggleFilter = (filter) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const handleDayClick = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (attendanceData[dateStr]) {
      setSelectedDay({ day, data: attendanceData[dateStr] });
      setShowModal(true);
    }
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Previous month's trailing days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = prevMonthDays - firstDayOfMonth + 1; i <= prevMonthDays; i++) {
      days.push(
        <div key={`prev-${i}`} className="p-2 text-center text-gray-400">
          {i}
        </div>
      );
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayData = attendanceData[dateStr];
      const isFiltered = dayData && selectedFilters[dayData.status];
      
      days.push(
        <div 
          key={`curr-${i}`} 
          className={`p-2 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
            dayData && isFiltered ? 'border-gray-300' : 'border-transparent'
          }`}
          onClick={() => handleDayClick(i)}
        >
          <div className="flex justify-between">
            <span>{i}</span>
            {dayData && isFiltered && (
              <span className={`${getStatusColor(dayData.status)} w-3 h-3 rounded-full`} />
            )}
          </div>
          {dayData?.syncStatus !== 'synced' && (
            <div className="mt-1 flex justify-center">
              <span className={`text-xs px-1 rounded ${dayData?.syncStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                {dayData?.syncStatus === 'pending' ? 'Pending' : 'Conflict'}
              </span>
            </div>
          )}
        </div>
      );
    }

    // Next month's leading days
    const totalCells = 42; // 6 weeks * 7 days
    const nextMonthDays = totalCells - days.length;
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <div key={`next-${i}`} className="p-2 text-center text-gray-400">
          {i}
        </div>
      );
    }

    return days;
  };

  const exportToCSV = () => {
    alert('Exporting attendance data to CSV...');
    // In a real app, this would generate and download a CSV file
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Attendance Calendar</h1>
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export CSV
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigateMonth(-1)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <h2 className="text-xl font-semibold text-gray-700 min-w-[180px] text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            
            <button 
              onClick={() => navigateMonth(1)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 ml-auto">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Timezone:</label>
              <select 
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                <option value="Asia/Kolkata">IST (UTC+5:30)</option>
                <option value="America/New_York">EST (UTC-5:00)</option>
                <option value="Europe/London">GMT (UTC+0:00)</option>
                <option value="Australia/Sydney">AEST (UTC+10:00)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-8">
          {renderCalendarDays()}
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-700">Filter by Status:</h3>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center gap-1 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedFilters.present}
                  onChange={() => toggleFilter('present')}
                  className="rounded text-green-500 focus:ring-green-500"
                />
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="text-sm">Present</span>
              </label>
              
              <label className="flex items-center gap-1 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedFilters.late}
                  onChange={() => toggleFilter('late')}
                  className="rounded text-orange-500 focus:ring-orange-500"
                />
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                <span className="text-sm">Late</span>
              </label>
              
              <label className="flex items-center gap-1 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedFilters.absent}
                  onChange={() => toggleFilter('absent')}
                  className="rounded text-red-500 focus:ring-red-500"
                />
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="text-sm">Absent</span>
              </label>
              
              <label className="flex items-center gap-1 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedFilters.on_leave}
                  onChange={() => toggleFilter('on_leave')}
                  className="rounded text-blue-500 focus:ring-blue-500"
                />
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <span className="text-sm">On Leave</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span>Present</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span>Late Arrival</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span>Absent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span>On Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">Pending</span>
            <span>Offline Record Pending Sync</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">Conflict</span>
            <span>Sync Conflict Requires Review</span>
          </div>
        </div>
      </div>

      {/* Day Detail Modal */}
      {showModal && selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">
                {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Status</span>
                <span className={`px-3 py-1 rounded-full text-white text-sm ${
                  selectedDay.data.status === 'present' ? 'bg-green-500' :
                  selectedDay.data.status === 'late' ? 'bg-orange-500' :
                  selectedDay.data.status === 'absent' ? 'bg-red-500' : 'bg-blue-500'
                }`}>
                  {selectedDay.data.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              {selectedDay.data.clockIn && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Clock In</span>
                  <span>{selectedDay.data.clockIn}</span>
                </div>
              )}

              {selectedDay.data.clockOut && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Clock Out</span>
                  <span>{selectedDay.data.clockOut}</span>
                </div>
              )}

              {selectedDay.data.lateMinutes > 0 && (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Late By</span>
                  <span>{selectedDay.data.lateMinutes} minutes</span>
                </div>
              )}

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Device</span>
                <span>{selectedDay.data.device}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Verification</span>
                <span className={selectedDay.data.verified ? "text-green-600" : "text-red-600"}>
                  {selectedDay.data.verified ? "Verified" : "Not Verified"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Sync Status</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  selectedDay.data.syncStatus === 'synced' ? 'bg-green-100 text-green-800' :
                  selectedDay.data.syncStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {selectedDay.data.syncStatus.charAt(0).toUpperCase() + selectedDay.data.syncStatus.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}