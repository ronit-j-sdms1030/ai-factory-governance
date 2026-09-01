const PolicyManagement = () => {
  // Mock data
  const [policies, setPolicies] = React.useState([
    { id: 1, version: '1.0', name: 'Standard Office Policy', effectiveFrom: '2023-01-01', effectiveTo: '2023-12-31', isActive: true },
    { id: 2, version: '1.1', name: 'Updated Remote Policy', effectiveFrom: '2024-01-01', effectiveTo: null, isActive: true },
    { id: 3, version: '2.0', name: 'Global Policy Update', effectiveFrom: '2024-06-01', effectiveTo: null, isActive: false }
  ]);

  const [selectedPolicy, setSelectedPolicy] = React.useState(policies[1]);
  
  const [policyForm, setPolicyForm] = React.useState({
    gracePeriodMinutes: 15,
    overtimeThresholdHours: 8,
    halfDayThresholdHours: 4,
    leaveAccrualRate: 1.5
  });

  const [holidays, setHolidays] = React.useState([
    { id: 1, name: 'New Year\'s Day', date: '2024-01-01', location: 'All Offices', recurring: true },
    { id: 2, name: 'Independence Day', date: '2024-07-04', location: 'US Offices', recurring: true },
    { id: 3, name: 'Christmas Day', date: '2024-12-25', location: 'All Offices', recurring: true }
  ]);

  const [recurringPatterns, setRecurringPatterns] = React.useState([
    { id: 1, pattern: 'First Monday of Month', description: 'Monthly team meetings' },
    { id: 2, pattern: 'Last Friday of Month', description: 'Month-end cleanup' }
  ]);

  const [historyEvents] = React.useState([
    { id: 1, date: '2024-05-15', user: 'HR Admin', action: 'Updated overtime threshold to 8 hours' },
    { id: 2, date: '2024-03-22', user: 'System', action: 'Auto-applied grace period change' },
    { id: 3, date: '2024-01-01', user: 'HR Director', action: 'Activated new remote work policy' }
  ]);

  // Handlers
  const handlePolicySelect = (policy) => {
    setSelectedPolicy(policy);
    // In a real app, we would fetch policy details here
  };

  const handleFormChange = (field, value) => {
    setPolicyForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSavePolicy = () => {
    alert(`Policy ${selectedPolicy.version} updated successfully!`);
  };

  const handleRecalculate = () => {
    alert('Recalculating attendance records for past periods...');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Attendance Policy Management</h1>
          <p className="text-gray-600">Configure company-wide attendance policies and location-specific settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Policy Versions and Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Policy Version List */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Policy Versions</h2>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition">
                  Create New Version
                </button>
              </div>
              <div className="space-y-3">
                {policies.map(policy => (
                  <div 
                    key={policy.id}
                    className={`p-4 border rounded-lg cursor-pointer transition ${
                      selectedPolicy.id === policy.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handlePolicySelect(policy)}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium">{policy.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        policy.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {policy.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      Version {policy.version} • Effective: {policy.effectiveFrom} 
                      {policy.effectiveTo && ` to ${policy.effectiveTo}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Policy Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Policy Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grace Period (minutes)
                  </label>
                  <input
                    type="number"
                    value={policyForm.gracePeriodMinutes}
                    onChange={(e) => handleFormChange('gracePeriodMinutes', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Overtime Threshold (hours)
                  </label>
                  <input
                    type="number"
                    value={policyForm.overtimeThresholdHours}
                    onChange={(e) => handleFormChange('overtimeThresholdHours', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Half-Day Threshold (hours)
                  </label>
                  <input
                    type="number"
                    value={policyForm.halfDayThresholdHours}
                    onChange={(e) => handleFormChange('halfDayThresholdHours', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leave Accrual Rate (days/month)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={policyForm.leaveAccrualRate}
                    onChange={(e) => handleFormChange('leaveAccrualRate', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSavePolicy}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Save Policy Changes
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Holidays, Recurring Patterns, History */}
          <div className="space-y-6">
            {/* Location-Specific Holiday Calendar */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Holiday Calendar</h2>
              <div className="space-y-3">
                {holidays.map(holiday => (
                  <div key={holiday.id} className="p-3 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <span className="font-medium">{holiday.name}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        holiday.recurring 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {holiday.recurring ? 'Recurring' : 'One-time'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {holiday.date} • {holiday.location}
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
                + Add Holiday
              </button>
            </div>

            {/* Recurring Pattern Setup */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recurring Patterns</h2>
              <div className="space-y-3">
                {recurringPatterns.map(pattern => (
                  <div key={pattern.id} className="p-3 border border-gray-200 rounded-md">
                    <div className="font-medium">{pattern.pattern}</div>
                    <div className="text-sm text-gray-600">{pattern.description}</div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition">
                + Add Recurring Pattern
              </button>
            </div>

            {/* Policy History Timeline */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Policy History</h2>
              <div className="space-y-4">
                {historyEvents.map(event => (
                  <div key={event.id} className="relative pl-6 pb-4 border-l-2 border-blue-200">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                    <div className="text-sm font-medium">{event.action}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {event.date} by {event.user}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recalculation Button */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Policy Recalculation</h2>
              <p className="text-gray-600 text-sm mb-4">
                Apply policy changes to historical attendance records
              </p>
              <button
                onClick={handleRecalculate}
                className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
              >
                Recalculate Past Periods
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};