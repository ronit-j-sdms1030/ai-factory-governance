const Dashboard = () => {
  const [activeTab, setActiveTab] = React.useState('employee');
  const [notifications, setNotifications] = React.useState([
    { id: 1, title: 'Late Arrival Warning', message: 'Your shift starts in 15 minutes. Clock in on time to avoid penalties.', read: false, timestamp: '2023-06-15T08:45:00Z' },
    { id: 2, title: 'Leave Approved', message: 'Your vacation request for July 10-17 has been approved by Sarah Johnson.', read: true, timestamp: '2023-06-14T14:22:00Z' }
  ]);
  const [unreadCount, setUnreadCount] = React.useState(1);
  
  // Mock data
  const todayShift = {
    shiftName: 'Day Shift',
    startTime: '09:00 AM',
    endTime: '06:00 PM',
    gracePeriod: 15,
    nextAction: 'Clock In',
    actionTime: 'Now'
  };

  const teamAttendance = [
    { id: 1, name: 'Alex Morgan', status: 'present', avatar: 'AM' },
    { id: 2, name: 'Taylor Kim', status: 'late', avatar: 'TK' },
    { id: 3, name: 'Jordan Smith', status: 'absent', avatar: 'JS' },
    { id: 4, name: 'Casey Williams', status: 'on-leave', avatar: 'CW' },
    { id: 5, name: 'Riley Jones', status: 'present', avatar: 'RJ' }
  ];

  const orgMetrics = {
    attendanceRate: 92.4,
    lateArrivals: 8,
    leaveUtilization: 24.7
  };

  const pendingApprovals = [
    { id: 101, employee: 'Morgan Lee', type: 'Annual Leave', dates: '15/06/2025 14:15', submitted: '2 days ago' },
    { id: 102, employee: 'Patric Chen', type: 'Sick Leave', dates: '15/06/2025 14:15', submitted: '3 days ago' }
  ];

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
    setUnreadCount(unreadCount - 1);
  };

  const handleClockAction = () => {
    alert(`Clocking ${todayShift.nextAction.toLowerCase()}...`);
    // In a real app, this would trigger the clocking process
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">WorkPulse Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <div className="mr-3 text-right">
                  <p className="text-sm font-medium text-gray-800">Jamie Smith</p>
                  <p className="text-xs text-gray-500">Team Lead</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                  JS
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['employee', 'manager', 'hr'].map((tab) => (
                <button
                  key={tab}
                  className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Today's Shift Card */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Today's Shift</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Shift Name</p>
                  <p className="font-medium">{todayShift.shiftName}</p>
                </div>
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Start Time</p>
                    <p className="font-medium">{todayShift.startTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">End Time</p>
                    <p className="font-medium">{todayShift.endTime}</p>
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    onClick={handleClockAction}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition duration-150 ease-in-out"
                  >
                    {todayShift.nextAction} ({todayShift.actionTime})
                  </button>
                </div>
              </div>
            </div>

            {/* Organization Metrics */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Organization Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Attendance Rate</p>
                  <p className="text-3xl font-bold text-indigo-600">{orgMetrics.attendanceRate}%</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Late Arrivals</p>
                  <p className="text-3xl font-bold text-yellow-500">{orgMetrics.lateArrivals}</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Leave Utilization</p>
                  <p className="text-3xl font-bold text-green-500">{orgMetrics.leaveUtilization}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Attendance Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Team Attendance</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teamAttendance.map((member) => (
                  <div key={member.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold mr-3 ${
                      member.status === 'present' ? 'bg-green-500' :
                      member.status === 'late' ? 'bg-yellow-500' :
                      member.status === 'absent' ? 'bg-red-500' : 'bg-blue-500'
                    }`}>
                      {member.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className={`text-sm capitalize ${
                        member.status === 'present' ? 'text-green-600' :
                        member.status === 'late' ? 'text-yellow-600' :
                        member.status === 'absent' ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {member.status.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Approvals */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Pending Leave Approvals</h2>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingApprovals.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50 cursor-pointer">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{request.employee}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{request.type}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{request.dates}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{request.submitted}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-center">
                  <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                    View all approvals →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Feed */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Notifications</h2>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 rounded-lg border ${
                    notification.read ? 'bg-gray-50 border-gray-200' : 'bg-indigo-50 border-indigo-200'
                  }`}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{notification.title}</h3>
                    {!notification.read && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="text-xs text-indigo-600 hover:text-indigo-800"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                  <p className="mt-2 text-xs text-gray-500">
                    {new Date(notification.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};