function LeaveRequest() {
  // Mock data
  const [leaveTypes] = React.useState([
    { id: 1, name: 'Annual Leave', code: 'AL', maxDays: 20, balance: 8 },
    { id: 2, name: 'Sick Leave', code: 'SL', maxDays: 10, balance: 5 },
    { id: 3, name: 'Maternity Leave', code: 'ML', maxDays: 180, balance: 180 },
    { id: 4, name: 'Unpaid Leave', code: 'UL', maxDays: 365, balance: 365 }
  ]);

  const [selectedLeaveType, setSelectedLeaveType] = React.useState(leaveTypes[0]);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [reason, setReason] = React.useState('');
  const [blockedDates] = React.useState(['2023-06-15', '2023-07-20', '2023-08-05']);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleLeaveTypeChange = (e) => {
    const typeId = parseInt(e.target.value);
    const type = leaveTypes.find(t => t.id === typeId);
    setSelectedLeaveType(type);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Leave request submitted!\nType: ${selectedLeaveType.name}\nStart: ${startDate}\nEnd: ${endDate}`);
      setIsSubmitting(false);
    }, 1500);
  };

  const isDateBlocked = (date) => {
    return blockedDates.includes(date) || new Date(date) < new Date();
  };

  const ApprovalWorkflowVisualization = () => (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold text-gray-700 mb-3">Approval Workflow</h3>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">1</div>
          <p className="text-xs mt-1 text-gray-600">Team Lead</p>
        </div>
        <div className="h-0.5 w-16 bg-gray-300"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold">2</div>
          <p className="text-xs mt-1 text-gray-600">Manager</p>
        </div>
        <div className="h-0.5 w-16 bg-gray-300"></div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 font-bold">3</div>
          <p className="text-xs mt-1 text-gray-600">HR</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5">
          <h1 className="text-2xl font-bold text-white">Request Leave</h1>
          <p className="text-blue-100 mt-1">Submit your leave request for approval</p>
        </div>

        <div className="p-6">
          {/* Leave Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
            <div className="relative">
              <select
                value={selectedLeaveType.id}
                onChange={handleLeaveTypeChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {leaveTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Real-time Balance Display */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-800">Current Balance</h3>
                <p className="text-sm text-gray-600">{selectedLeaveType.name}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-700">{selectedLeaveType.balance} days</p>
                <p className="text-sm text-gray-600">of {selectedLeaveType.maxDays} allocated</p>
              </div>
            </div>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(selectedLeaveType.balance / selectedLeaveType.maxDays) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDateBlocked(startDate) ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {isDateBlocked(startDate) && (
                <p className="mt-1 text-sm text-red-600">Selected date is unavailable</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDateBlocked(endDate) ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
              {isDateBlocked(endDate) && (
                <p className="mt-1 text-sm text-red-600">Selected date is unavailable</p>
              )}
            </div>
          </div>

          {/* Reason */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Leave</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Please provide details about your leave request..."
            />
          </div>

          {/* Approval Workflow */}
          <ApprovalWorkflowVisualization />

          {/* Submit Button */}
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !startDate || !endDate || isDateBlocked(startDate) || isDateBlocked(endDate)}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              } transition-colors duration-200`}
            >
              {isSubmitting ? 'Submitting Request...' : 'Submit Leave Request'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}