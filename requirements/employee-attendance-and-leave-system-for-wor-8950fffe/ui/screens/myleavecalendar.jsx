function MyLeaveCalendar() {
  // Mock data
  const leaveBalances = [
    { id: 1, name: 'Annual Leave', code: 'AL', balance: 12, used: 3, total: 15 },
    { id: 2, name: 'Sick Leave', code: 'SL', balance: 5, used: 2, total: 7 },
    { id: 3, name: 'Personal Leave', code: 'PL', balance: 3, used: 1, total: 4 },
    { id: 4, name: 'Maternity Leave', code: 'ML', balance: 0, used: 0, total: 180 }
  ];

  const upcomingRequests = [
    { id: 101, startDate: '2023-06-15', endDate: '2023-06-16', type: 'Annual Leave', status: 'approved' },
    { id: 102, startDate: '2023-07-10', endDate: '2023-07-12', type: 'Personal Leave', status: 'pending' }
  ];

  const leaveHistory = [
    { id: 201, startDate: '2023-05-01', endDate: '2023-05-03', type: 'Sick Leave', status: 'approved', approver: 'Robert Chen' },
    { id: 202, startDate: '2023-04-10', endDate: '2023-04-10', type: 'Personal Leave', status: 'rejected', approver: 'Robert Chen', reason: 'Insufficient notice' },
    { id: 203, startDate: '2023-03-15', endDate: '2023-03-17', type: 'Annual Leave', status: 'approved', approver: 'Robert Chen' }
  ];

  const calendarEvents = [
    { date: '2023-06-05', type: 'sick', status: 'approved' },
    { date: '2023-06-12', type: 'annual', status: 'pending' },
    { date: '2023-06-20', type: 'personal', status: 'approved' }
  ];

  // Handlers
  const handleQuickRequest = () => {
    alert('Opening quick leave request form...');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'rejected': return '#EF4444';
      default: return '#9CA3AF';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Generate calendar days for June 2023
  const generateCalendarDays = () => {
    const days = [];
    const startDate = new Date(2023, 5, 1); // June 2023
    const endDate = new Date(2023, 5, 30);
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const event = calendarEvents.find(e => e.date === dateStr);
      
      days.push({
        date: new Date(d),
        day: d.getDate(),
        isWeekend: d.getDay() === 0 || d.getDay() === 6,
        event: event
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Leave Calendar</h1>
            <p className="text-gray-600 mt-2">Manage your leave requests and view your leave balances</p>
          </div>
          <button 
            onClick={handleQuickRequest}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Quick Request
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Calendar Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Calendar View */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">June 2023</h2>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div 
                    key={index} 
                    className={`min-h-24 p-2 border rounded-lg ${day.isWeekend ? 'bg-gray-50' : 'bg-white'} 
                      ${day.event ? 'border-blue-200' : 'border-gray-200'} 
                      ${day.date.toDateString() === new Date().toDateString() ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className="text-right">
                      <span className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-full 
                        ${day.date.toDateString() === new Date().toDateString() ? 'bg-blue-500 text-white' : ''}`}>
                        {day.day}
                      </span>
                    </div>
                    
                    {day.event && (
                      <div 
                        className="mt-1 text-xs px-2 py-1 rounded truncate"
                        style={{ backgroundColor: `${getStatusColor(day.event.status)}20`, color: getStatusColor(day.event.status) }}
                      >
                        {day.event.type.charAt(0).toUpperCase() + day.event.type.slice(1)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Approved</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Pending</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Rejected</span>
                </div>
              </div>
            </div>
            
            {/* Upcoming Requests */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Requests</h2>
              <div className="space-y-4">
                {upcomingRequests.map(request => (
                  <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div>
                      <h3 className="font-medium text-gray-900">{request.type}</h3>
                      <p className="text-sm text-gray-500">{request.startDate} to {request.endDate}</p>
                    </div>
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${getStatusColor(request.status)}20`, 
                        color: getStatusColor(request.status) 
                      }}
                    >
                      {getStatusText(request.status)}
                    </span>
                  </div>
                ))}
                
                {upcomingRequests.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No upcoming leave requests</p>
                )}
              </div>
            </div>
            
            {/* Leave History */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Leave History</h2>
              <div className="space-y-4">
                {leaveHistory.map(request => (
                  <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div>
                      <h3 className="font-medium text-gray-900">{request.type}</h3>
                      <p className="text-sm text-gray-500">{request.startDate} to {request.endDate}</p>
                      <p className="text-xs text-gray-400 mt-1">Approved by {request.approver}</p>
                      {request.reason && (
                        <p className="text-xs text-red-500 mt-1">Reason: {request.reason}</p>
                      )}
                    </div>
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: `${getStatusColor(request.status)}20`, 
                        color: getStatusColor(request.status) 
                      }}
                    >
                      {getStatusText(request.status)}
                    </span>
                  </div>
                ))}
                
                {leaveHistory.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No leave history</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leave Balances */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Leave Balances</h2>
              <div className="space-y-4">
                {leaveBalances.map(leave => (
                  <div key={leave.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{leave.name}</span>
                      <span className="text-sm font-medium text-gray-900">{leave.balance} of {leave.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(leave.used / leave.total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {leave.used} used • {leave.balance} remaining
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Leave Summary</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Pending Requests</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Approved This Year</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}