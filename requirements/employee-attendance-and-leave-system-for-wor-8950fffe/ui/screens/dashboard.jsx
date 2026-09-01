function Dashboard() {
  // Mock user data
  const user = {
    id: 1,
    employee_id: 'EMP00123',
    first_name: 'Alex',
    last_name: 'Morgan',
    role: 'manager', // employee/manager/hr
    department: 'Engineering',
    location: 'New York'
  };

  // Mock shift data
  const shift = {
    name: 'Day Shift',
    start_time: '09:00',
    end_time: '17:00',
    timezone: 'America/New_York',
    grace_period: 15
  };

  // Mock attendance data
  const attendanceSummary = [
    { date: '2023-06-01', status: 'present' },
    { date: '2023-06-02', status: 'late', minutes: 25 },
    { date: '2023-06-05', status: 'present' },
    { date: '2023-06-06', status: 'absent' },
    { date: '2023-06-07', status: 'present' }
  ];

  // Mock team data
  const teamMembers = [
    { id: 1, name: 'Jordan Smith', status: 'present', clockIn: '08:55' },
    { id: 2, name: 'Taylor Kim', status: 'late', clockIn: '09:22' },
    { id: 3, name: 'Morgan Lee', status: 'absent', clockIn: null },
    { id: 4, name: 'Casey Brown', status: 'on_leave', clockIn: null }
  ];

  // Mock leave requests
  const leaveRequests = [
    { id: 1, employee: 'Jamie Chen', type: 'PTO', dates: 'Jun 10-12', status: 'pending' },
    { id: 2, employee: 'Riley Jones', type: 'Sick', dates: 'Jun 11', status: 'pending' }
  ];

  // Mock org metrics
  const orgMetrics = {
    attendanceRate: 92.4,
    lateArrivals: 8,
    leaveUtilization: 12.3
  };

  // State
  const [timeRemaining, setTimeRemaining] = React.useState('05:32:18');
  const [clockStatus, setClockStatus] = React.useState('Clock Out');
  const [notifications, setNotifications] = React.useState([
    { id: 1, message: 'Taylor Kim clocked in at 09:22 (Late)', time: '2 mins ago' }
  ]);
  
  // Simulate countdown timer
  React.useEffect(() => {
    const timer = setInterval(() => {
      // In a real app, this would calculate actual time remaining
      setTimeRemaining(prev => {
        const parts = prev.split(':').map(Number);
        let [hours, minutes, seconds] = parts;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
            }
          }
        }
        
        return [hours, minutes, seconds]
          .map(t => String(t).padStart(2, '0'))
          .join(':');
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Handlers
  const handleClockAction = () => {
    // In a real app, this would trigger clock in/out
    setClockStatus(clockStatus === 'Clock In' ? 'Clock Out' : 'Clock In');
    
    // Add notification
    if (clockStatus === 'Clock Out') {
      setNotifications([
        { id: Date.now(), message: 'You have clocked out successfully', time: 'Just now' },
        ...notifications
      ]);
    }
  };

  const handleApproveLeave = (id) => {
    // In a real app, this would update leave request status
    console.log(`Approved leave request ${id}`);
  };

  const handleRejectLeave = (id) => {
    // In a real app, this would update leave request status
    console.log(`Rejected leave request ${id}`);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusColors = {
      present: 'bg-green-100 text-green-800',
      late: 'bg-yellow-100 text-yellow-800',
      absent: 'bg-red-100 text-red-800',
      'on_leave': 'bg-blue-100 text-blue-800',
      pending: 'bg-purple-100 text-purple-800'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">WorkPulse Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-500">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              Connected
            </div>
            <div className="relative">
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              <button className="p-1 text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <div className="flex items-center">
              <div className="mr-3 text-right">
                <p className="text-sm font-medium text-gray-900">{user.first_name} {user.last_name}</p>
                <p className="text-xs text-gray-500">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                {user.first_name.charAt(0)}{user.last_name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Today's Shift Card */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Today's Shift</h2>
                <p className="mt-1 text-sm text-gray-500">{shift.name} • {shift.start_time} - {shift.end_time}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  onClick={handleClockAction}
                  className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${clockStatus === 'Clock In' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {clockStatus}
                </button>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-blue-800">Time Remaining</p>
                <p className="mt-1 text-2xl font-bold text-blue-900">{timeRemaining}</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-indigo-800">Grace Period</p>
                <p className="mt-1 text-2xl font-bold text-indigo-900">{shift.grace_period} min</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-purple-800">Location</p>
                <p className="mt-1 text-2xl font-bold text-purple-900">{user.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Attendance Summary */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">Recent Attendance</h2>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {attendanceSummary.map((record, index) => (
                    <li key={index} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                        <div className="flex items-center">
                          <StatusBadge status={record.status} />
                          {record.status === 'late' && (
                            <span className="ml-2 text-sm text-gray-500">+{record.minutes} min</span>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Team Attendance (Manager View) */}
            {user.role === 'manager' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900">Team Attendance</h2>
                </div>
                <div className="border-t border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {teamMembers.map((member) => (
                      <li key={member.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <div className="flex items-center">
                            <StatusBadge status={member.status} />
                            {member.clockIn && (
                              <span className="ml-2 text-sm text-gray-500">{member.clockIn}</span>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Org Metrics (HR View) */}
            {user.role === 'hr' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900">Organization Metrics</h2>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Attendance Rate</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{orgMetrics.attendanceRate}%</dd>
                    </div>
                    <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Late Arrivals</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{orgMetrics.lateArrivals}</dd>
                    </div>
                    <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">Leave Utilization</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{orgMetrics.leaveUtilization}%</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Pending Leave Approvals (Manager View) */}
            {user.role === 'manager' && (
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900">Pending Approvals</h2>
                </div>
                <div className="border-t border-gray-200">
                  <ul className="divide-y divide-gray-200">
                    {leaveRequests.map((request) => (
                      <li key={request.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{request.employee}</p>
                            <p className="text-sm text-gray-500">{request.type} • {request.dates}</p>
                          </div>
                          <StatusBadge status={request.status} />
                        </div>
                        <div className="mt-3 flex space-x-3">
                          <button
                            onClick={() => handleApproveLeave(request.id)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectLeave(request.id)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Reject
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Real-time Notifications */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {notifications.map((notification) => (
                    <li key={notification.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                          <p className="mt-1 text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}