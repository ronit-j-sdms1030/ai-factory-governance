function LeaveRequest() {
  // Mock data
  const employee = {
    id: "EMP001",
    first_name: "Alex",
    last_name: "Johnson",
    department: "Engineering",
    location: "New York"
  };

  const leaveTypes = [
    { id: 1, name: "Annual Leave", code: "AL", balance: 15, maxDays: 20, isPaid: true },
    { id: 2, name: "Sick Leave", code: "SL", balance: 8, maxDays: 10, isPaid: true },
    { id: 3, name: "Unpaid Leave", code: "UL", balance: 0, maxDays: 30, isPaid: false }
  ];

  const holidays = [
    { date: "2024-06-19", name: "Juneteenth" },
    { date: "2024-07-04", name: "Independence Day" }
  ];

  const existingRequests = [
    { startDate: "2024-06-25", endDate: "2024-06-26", type: "AL" }
  ];

  const approvalPath = [
    { name: "Sarah Williams", role: "Direct Manager", status: "pending" },
    { name: "Michael Chen", role: "Department Head", status: "pending" }
  ];

  // State
  const [selectedType, setSelectedType] = React.useState(leaveTypes[0]);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [daysRequested, setDaysRequested] = React.useState(0);
  const [balanceAfter, setBalanceAfter] = React.useState(selectedType.balance);

  // Calculate days requested when dates change
  React.useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setDaysRequested(diffDays);
      setBalanceAfter(selectedType.balance - diffDays);
    }
  }, [startDate, endDate, selectedType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Leave request submitted!\n${daysRequested} days of ${selectedType.name} requested.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Request Leave</h1>
          <p className="mt-1 text-sm text-gray-500">
            Submit a new leave request with real-time balance updates
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Leave Type Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leave Type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {leaveTypes.map((type) => (
                      <div 
                        key={type.id}
                        onClick={() => setSelectedType(type)}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedType.id === type.id 
                            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">{type.name}</h3>
                          {type.isPaid && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Paid
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          Balance: {type.balance} days
                        </p>
                        <div className="mt-2 text-xs text-gray-400">
                          Max: {type.maxDays} days/year
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h4 className="text-sm font-medium text-blue-800">{selectedType.name} Policy</h4>
                    <ul className="mt-2 text-sm text-blue-700 list-disc pl-5 space-y-1">
                      <li>Maximum consecutive days: 10</li>
                      <li>Requires 3 days notice for approval</li>
                      <li>Accrues monthly based on tenure</li>
                      {selectedType.requires_medical_certificate && (
                        <li>Medical certificate required for >3 days</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Blocked Dates Info */}
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <h4 className="text-sm font-medium text-yellow-800 flex items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.529 0-2.492-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Important Dates
                  </h4>
                  <ul className="mt-2 text-sm text-yellow-700 list-disc pl-5 space-y-1">
                    <li>Holidays during selection will not count toward leave days</li>
                    <li>You already have leave booked: Jun 25-26</li>
                    <li>Minimum notice period: 3 business days</li>
                  </ul>
                </div>

                {/* Reason Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Leave
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Please provide details about your leave request..."
                  />
                </div>

                {/* Balance Impact Calculator */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Leave Balance Impact</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="border-r border-gray-200">
                      <p className="text-sm text-gray-500">Current Balance</p>
                      <p className="text-xl font-bold text-gray-900">{selectedType.balance} days</p>
                    </div>
                    <div className="border-r border-gray-200">
                      <p className="text-sm text-gray-500">Days Requested</p>
                      <p className="text-xl font-bold text-blue-600">{daysRequested} days</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Balance After</p>
                      <p className={`text-xl font-bold ${
                        balanceAfter >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {balanceAfter >= 0 ? balanceAfter : 'Insufficient'} days
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={balanceAfter < 0 || !startDate || !endDate}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Leave Request
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Balances Summary */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Your Leave Balances</h2>
              <div className="space-y-4">
                {leaveTypes.map((type) => (
                  <div key={type.id} className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-gray-900">{type.name}</p>
                      <p className="text-sm text-gray-500">{type.code}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{type.balance} days</p>
                      <p className="text-sm text-gray-500">of {type.maxDays}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last updated:</span>
                  <span className="font-medium">May 15, 2024</span>
                </div>
              </div>
            </div>

            {/* Approval Workflow Preview */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Approval Workflow</h2>
              <div className="flow-root">
                <ul className="space-y-4">
                  {approvalPath.map((approver, index) => (
                    <li key={index} className="relative pl-8">
                      <div className="absolute left-0 top-1 flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 border-2 border-blue-300">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{approver.name}</p>
                          <p className="text-sm text-gray-500">{approver.role}</p>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 capitalize">
                          {approver.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 p-3 bg-blue-50 rounded-md">
                  <p className="text-xs text-blue-700">
                    <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Estimated approval time: 2-3 business days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}