function LeaveApprovals() {
  // Mock data
  const pendingRequests = [
    {
      id: 1,
      employee: { id: 101, name: "Aarav Patel", department: "Engineering" },
      startDate: "2023-06-15",
      endDate: "2023-06-16",
      leaveType: "Annual Leave",
      days: 2,
      balanceImpact: -2,
      reason: "Personal travel",
      status: "pending"
    },
    {
      id: 2,
      employee: { id: 102, name: "Priya Sharma", department: "Marketing" },
      startDate: "2023-06-20",
      endDate: "2023-06-22",
      leaveType: "Sick Leave",
      days: 3,
      balanceImpact: -3,
      reason: "Medical appointment",
      status: "pending"
    },
    {
      id: 3,
      employee: { id: 103, name: "Rohan Gupta", department: "Sales" },
      startDate: "2023-06-25",
      endDate: "2023-06-25",
      leaveType: "Half Day",
      days: 0.5,
      balanceImpact: -0.5,
      reason: "Dental checkup",
      status: "pending"
    }
  ];

  const teamCalendarEvents = [
    { date: "2023-06-15", employee: "Aarav Patel", type: "leave" },
    { date: "2023-06-16", employee: "Aarav Patel", type: "leave" },
    { date: "2023-06-20", employee: "Priya Sharma", type: "leave" },
    { date: "2023-06-21", employee: "Priya Sharma", type: "leave" },
    { date: "2023-06-22", employee: "Priya Sharma", type: "leave" },
    { date: "2023-06-25", employee: "Rohan Gupta", type: "leave" }
  ];

  const [selectedRequest, setSelectedRequest] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const [requests, setRequests] = React.useState(pendingRequests);
  const [calendarView, setCalendarView] = React.useState("month");
  const [conflicts, setConflicts] = React.useState([
    { id: 1, employee: "Neha Verma", date: "2023-06-10", type: "attendance", status: "unresolved" }
  ]);

  const handleApprove = () => {
    if (!selectedRequest) return;
    
    // Update request status
    const updatedRequests = requests.map(req => 
      req.id === selectedRequest.id ? {...req, status: "approved"} : req
    );
    setRequests(updatedRequests);
    
    // Add notification
    alert(`Leave request for ${selectedRequest.employee.name} approved`);
    setSelectedRequest(null);
    setComment("");
  };

  const handleReject = () => {
    if (!selectedRequest) return;
    
    // Update request status
    const updatedRequests = requests.map(req => 
      req.id === selectedRequest.id ? {...req, status: "rejected"} : req
    );
    setRequests(updatedRequests);
    
    // Add notification
    alert(`Leave request for ${selectedRequest.employee.name} rejected`);
    setSelectedRequest(null);
    setComment("");
  };

  const resolveConflict = (conflictId) => {
    const updatedConflicts = conflicts.map(c => 
      c.id === conflictId ? {...c, status: "resolved"} : c
    );
    setConflicts(updatedConflicts);
    alert("Conflict resolved successfully");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">Leave Approvals</h1>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="flex items-center">
                <div className="mr-3 text-right">
                  <p className="text-sm font-medium text-gray-800">Manager Name</p>
                  <p className="text-xs text-gray-500">HR Department</p>
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  MN
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Pending Requests Section */}
          <div className="flex-1 overflow-auto p-6">
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">Pending Leave Requests</h2>
              </div>
              
              {/* Pending Requests Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Impact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {requests.filter(r => r.status === "pending").map((request) => (
                      <tr 
                        key={request.id} 
                        className={`hover:bg-gray-50 cursor-pointer ${selectedRequest?.id === request.id ? 'bg-blue-50' : ''}`}
                        onClick={() => setSelectedRequest(request)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              <span className="text-indigo-800 font-medium">{request.employee.name.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{request.employee.name}</div>
                              <div className="text-sm text-gray-500">{request.employee.department}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.startDate} to {request.endDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.leaveType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.days}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={request.balanceImpact < 0 ? "text-red-600" : "text-green-600"}>
                            {request.balanceImpact}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {request.reason}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedRequest(request);
                            }}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Approval Section */}
            {selectedRequest && (
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-800">Approve Request</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Reviewing request for {selectedRequest.employee.name}
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Leave Details</h3>
                      <dl className="grid grid-cols-2 gap-2 text-sm">
                        <dt className="text-gray-500">Type:</dt>
                        <dd className="text-gray-900">{selectedRequest.leaveType}</dd>
                        
                        <dt className="text-gray-500">Dates:</dt>
                        <dd className="text-gray-900">{selectedRequest.startDate} to {selectedRequest.endDate}</dd>
                        
                        <dt className="text-gray-500">Days:</dt>
                        <dd className="text-gray-900">{selectedRequest.days}</dd>
                        
                        <dt className="text-gray-500">Reason:</dt>
                        <dd className="text-gray-900">{selectedRequest.reason}</dd>
                      </dl>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Employee Info</h3>
                      <dl className="grid grid-cols-2 gap-2 text-sm">
                        <dt className="text-gray-500">Name:</dt>
                        <dd className="text-gray-900">{selectedRequest.employee.name}</dd>
                        
                        <dt className="text-gray-500">Department:</dt>
                        <dd className="text-gray-900">{selectedRequest.employee.department}</dd>
                        
                        <dt className="text-gray-500">Current Balance:</dt>
                        <dd className="text-gray-900">12 days</dd>
                      </dl>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                      Comments (Optional)
                    </label>
                    <textarea
                      id="comment"
                      rows={3}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                      placeholder="Add any comments for the employee..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={() => {
                        setSelectedRequest(null);
                        setComment("");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      onClick={handleReject}
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={handleApprove}
                    >
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Conflict Resolution */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">Conflict Resolution</h2>
                <p className="text-sm text-gray-600 mt-1">Resolve attendance discrepancies</p>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {conflicts.map((conflict) => (
                        <tr key={conflict.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {conflict.employee}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {conflict.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {conflict.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              conflict.status === "resolved" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {conflict.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {conflict.status === "unresolved" ? (
                              <button
                                onClick={() => resolveConflict(conflict.id)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Resolve
                              </button>
                            ) : (
                              <span className="text-gray-500">Resolved</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Team Calendar Sidebar */}
          <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">Team Calendar</h2>
              <div className="mt-2 flex space-x-2">
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${
                    calendarView === "month" 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setCalendarView("month")}
                >
                  Month
                </button>
                <button 
                  className={`px-3 py-1 text-sm rounded-md ${
                    calendarView === "week" 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => setCalendarView("week")}
                >
                  Week
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-4">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-800">June 2023</h3>
                  <div className="flex space-x-1">
                    <button className="p-1 rounded hover:bg-gray-200">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="p-1 rounded hover:bg-gray-200">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} className="text-center text-xs font-medium text-gray-500 py-1">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                    const dateStr = `2023-06-${day < 10 ? '0' + day : day}`;
                    const events = teamCalendarEvents.filter(e => e.date === dateStr);
                    
                    return (
                      <div 
                        key={day} 
                        className={`h-10 rounded flex flex-col items-center justify-center text-xs relative ${
                          day === 15 || day === 16 || day === 20 || day === 21 || day === 22 || day === 25
                            ? "bg-blue-100 border border-blue-300"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <span className={day === 15 || day === 16 || day === 20 || day === 21 || day === 22 || day === 25 ? "font-bold text-blue-800" : ""}>
                          {day}
                        </span>
                        {events.length > 0 && (
                          <div className="absolute bottom-0.5 flex space-x-0.5">
                            {events.slice(0, 3).map((event, idx) => (
                              <div 
                                key={idx} 
                                className="w-1.5 h-1.5 rounded-full bg-blue-500"
                                title={event.employee}
                              ></div>
                            ))}
                            {events.length > 3 && (
                              <div className="text-xs text-gray-500">+{events.length - 3}</div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-3">Legend</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Leave</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Approved</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}