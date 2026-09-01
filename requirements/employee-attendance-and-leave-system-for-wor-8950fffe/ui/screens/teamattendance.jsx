function TeamAttendance() {
  // Mock data
  const teamMembers = [
    { id: 1, name: "Aarav Patel", department: "Engineering", status: "present", avatar: "AP" },
    { id: 2, name: "Priya Sharma", department: "Marketing", status: "late", avatar: "PS" },
    { id: 3, name: "Rohan Gupta", department: "Sales", status: "absent", avatar: "RG" },
    { id: 4, name: "Sneha Reddy", department: "HR", status: "on_leave", avatar: "SR" },
    { id: 5, name: "Vikram Singh", department: "Finance", status: "half_day", avatar: "VS" },
  ];

  const leaveRequests = [
    {
      id: 101,
      employee: "Aarav Patel",
      startDate: "2023-06-15",
      endDate: "2023-06-16",
      leaveType: "Casual Leave",
      reason: "Personal appointment",
      balanceImpact: "-2 days",
      status: "pending"
    },
    {
      id: 102,
      employee: "Neha Kapoor",
      startDate: "2023-06-20",
      endDate: "2023-06-22",
      leaveType: "Sick Leave",
      reason: "Medical consultation",
      balanceImpact: "-3 days",
      status: "pending"
    }
  ];

  const attendanceData = [
    { date: "2023-06-01", present: 42, late: 3, absent: 5 },
    { date: "2023-06-02", present: 38, late: 5, absent: 7 },
    { date: "2023-06-05", present: 40, late: 4, absent: 6 },
    { date: "2023-06-06", present: 45, late: 2, absent: 3 },
    { date: "2023-06-07", present: 39, late: 6, absent: 5 },
    { date: "2023-06-08", present: 41, late: 3, absent: 6 },
    { date: "2023-06-09", present: 43, late: 2, absent: 5 }
  ];

  // State
  const [selectedRequest, setSelectedRequest] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredMembers, setFilteredMembers] = React.useState(teamMembers);

  // Handlers
  const handleApprove = () => {
    if (selectedRequest) {
      console.log(`Approved leave request ${selectedRequest.id} with comment: ${comment}`);
      // In a real app, this would update the backend
      setSelectedRequest(null);
      setComment("");
    }
  };

  const handleReject = () => {
    if (selectedRequest) {
      console.log(`Rejected leave request ${selectedRequest.id} with comment: ${comment}`);
      // In a real app, this would update the backend
      setSelectedRequest(null);
      setComment("");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = teamMembers.filter(member => 
        member.name.toLowerCase().includes(term.toLowerCase()) ||
        member.department.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(teamMembers);
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusColors = {
      present: "bg-green-100 text-green-800",
      late: "bg-yellow-100 text-yellow-800",
      absent: "bg-red-100 text-red-800",
      on_leave: "bg-blue-100 text-blue-800",
      half_day: "bg-purple-100 text-purple-800"
    };

    const statusText = {
      present: "Present",
      late: "Late",
      absent: "Absent",
      on_leave: "On Leave",
      half_day: "Half Day"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  // Attendance chart component
  const AttendanceChart = () => {
    const maxValue = Math.max(...attendanceData.map(d => d.present + d.late + d.absent));
    
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Weekly Attendance Trend</h3>
        <div className="flex items-end justify-between h-40">
          {attendanceData.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex flex-col-reverse items-center w-8">
                <div 
                  className="w-full bg-green-500 rounded-t" 
                  style={{ height: `${(day.present / maxValue) * 100}%` }}
                ></div>
                <div 
                  className="w-full bg-yellow-500" 
                  style={{ height: `${(day.late / maxValue) * 100}%` }}
                ></div>
                <div 
                  className="w-full bg-red-500 rounded-b" 
                  style={{ height: `${(day.absent / maxValue) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs mt-2">{new Date(day.date).getDate()}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
            <span className="text-xs">Present</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded mr-1"></div>
            <span className="text-xs">Late</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-1"></div>
            <span className="text-xs">Absent</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Team Attendance</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your team's attendance and leave requests</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <div className="bg-white shadow rounded-lg p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search Team Members
                  </label>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by name or department..."
                    className="w-full md:w-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Bulk Actions
                  </button>
                </div>
              </div>
            </div>

            {/* Attendance Grid */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Today's Attendance</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clock In
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clock Out
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMembers.map((member) => (
                      <tr key={member.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                              {member.avatar}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={member.status} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.status === "present" || member.status === "late" ? "09:15 AM" : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.status === "present" || member.status === "late" ? "06:30 PM" : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Attendance Chart */}
            <AttendanceChart />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Leave Requests */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Pending Leave Requests</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {leaveRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedRequest?.id === request.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{request.employee}</h4>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{request.leaveType}</p>
                    <p className="text-xs text-gray-400 mt-1">{request.startDate} to {request.endDate}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leave Request Details */}
            {selectedRequest && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Leave Request Details</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Employee</h4>
                    <p className="text-sm text-gray-500">{selectedRequest.employee}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Dates</h4>
                    <p className="text-sm text-gray-500">{selectedRequest.startDate} to {selectedRequest.endDate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Leave Type</h4>
                    <p className="text-sm text-gray-500">{selectedRequest.leaveType}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Reason</h4>
                    <p className="text-sm text-gray-500">{selectedRequest.reason}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Balance Impact</h4>
                    <p className="text-sm text-gray-500">{selectedRequest.balanceImpact}</p>
                  </div>
                  <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment for the employee..."
                    ></textarea>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleApprove}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Approve
                    </button>
                    <button
                      onClick={handleReject}
                      className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Conflict Resolution */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Conflict Resolution</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-4">
                  Resolve discrepancies between online and offline attendance records.
                </p>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Rajiv Mehta</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Conflict
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">June 5, 2023 - Clock-in discrepancy</p>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Resolve Conflicts
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}