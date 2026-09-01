function AdminPolicies() {
  // Mock data
  const locations = [
    { id: 1, name: 'New York Office' },
    { id: 2, name: 'London Office' },
    { id: 3, name: 'Remote Workers' },
    { id: 4, name: 'Field Team - West' },
    { id: 5, name: 'Field Team - East' }
  ];

  const [activeTab, setActiveTab] = React.useState('grace-period');
  const [policies, setPolicies] = React.useState([
    { id: 1, version: '1.0', name: 'Standard Office Policy', effectiveFrom: '2023-01-01', effectiveTo: '2023-12-31', status: 'Active' },
    { id: 2, version: '1.1', name: 'Updated Office Policy', effectiveFrom: '2024-01-01', effectiveTo: null, status: 'Current' },
    { id: 3, version: '2.0', name: 'Revised Policy with Flex Hours', effectiveFrom: '2024-07-01', effectiveTo: null, status: 'Draft' }
  ]);

  const [gracePeriods, setGracePeriods] = React.useState([
    { locationId: 1, minutes: 10 },
    { locationId: 2, minutes: 15 },
    { locationId: 3, minutes: 0 },
    { locationId: 4, minutes: 30 },
    { locationId: 5, minutes: 30 }
  ]);

  const [overtimeRules, setOvertimeRules] = React.useState({ threshold: 8, multiplier: 1.5 });
  const [leaveAccrual, setLeaveAccrual] = React.useState({ annual: 20, sick: 10, personal: 5 });
  
  const [selectedPolicy, setSelectedPolicy] = React.useState(policies[1]);
  const [newPolicy, setNewPolicy] = React.useState({
    name: '',
    effectiveFrom: '',
    description: ''
  });

  const [holidays, setHolidays] = React.useState([
    { id: 1, name: 'New Year\'s Day', date: '2024-01-01', locationId: 1, recurring: true },
    { id: 2, name: 'Independence Day', date: '2024-07-04', locationId: 1, recurring: true },
    { id: 3, name: 'Christmas Day', date: '2024-12-25', locationId: 1, recurring: true },
    { id: 4, name: 'Boxing Day', date: '2024-12-26', locationId: 2, recurring: true },
    { id: 5, name: 'Bank Holiday', date: '2024-08-26', locationId: 2, recurring: true }
  ]);

  const handleGracePeriodChange = (locationId, minutes) => {
    setGracePeriods(prev => 
      prev.map(gp => gp.locationId === locationId ? { ...gp, minutes } : gp)
    );
  };

  const handleOvertimeChange = (field, value) => {
    setOvertimeRules(prev => ({ ...prev, [field]: value }));
  };

  const handleLeaveAccrualChange = (type, value) => {
    setLeaveAccrual(prev => ({ ...prev, [type]: value }));
  };

  const handleCreatePolicy = () => {
    if (newPolicy.name && newPolicy.effectiveFrom) {
      const version = (policies.length + 1) + '.0';
      const policy = {
        id: policies.length + 1,
        version,
        name: newPolicy.name,
        effectiveFrom: newPolicy.effectiveFrom,
        effectiveTo: null,
        status: 'Draft',
        description: newPolicy.description
      };
      setPolicies([policy, ...policies]);
      setNewPolicy({ name: '', effectiveFrom: '', description: '' });
    }
  };

  const handleRecalculate = () => {
    alert('Recalculation initiated for all attendance records from January 2024');
  };

  const tabs = [
    { id: 'grace-period', label: 'Grace Periods' },
    { id: 'overtime', label: 'Overtime Rules' },
    { id: 'leave-accrual', label: 'Leave Accrual' },
    { id: 'policy-versions', label: 'Policy Versions' },
    { id: 'holidays', label: 'Holidays' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">WorkPulse Admin</h1>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li><a href="/" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">Dashboard</a></li>
            <li><a href="/clock" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">Clock Interface</a></li>
            <li><a href="/attendance" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">Attendance</a></li>
            <li><a href="/leave/new" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">Leave Requests</a></li>
            <li><a href="/leave/pending" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">Approvals</a></li>
            <li><a href="/shifts" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">Shift Roster</a></li>
            <li><a href="/payroll" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">Payroll Export</a></li>
            <li><a href="/admin/policies" className="block py-2 px-4 bg-blue-50 text-blue-600 font-medium rounded">HR Policies</a></li>
            <li><a href="/admin/audit" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">Audit Trail</a></li>
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-200">
          <a href="/profile" className="block py-2 px-4 text-gray-600 hover:bg-gray-100 rounded">My Profile</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4">
          <h2 className="text-xl font-semibold text-gray-800">HR Policy Configuration</h2>
          <p className="text-gray-600">Manage attendance policies, leave rules, and holiday calendars</p>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow p-6">
            {/* Grace Period Configuration */}
            {activeTab === 'grace-period' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Grace Period Configuration</h3>
                <p className="text-gray-600 mb-6">Set allowable late arrival time before marking as late</p>
                
                <div className="space-y-4">
                  {locations.map(location => (
                    <div key={location.id} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-gray-700">{location.name}</span>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="0"
                          max="60"
                          value={gracePeriods.find(gp => gp.locationId === location.id)?.minutes || 0}
                          onChange={(e) => handleGracePeriodChange(location.id, parseInt(e.target.value) || 0)}
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="text-gray-500">minutes</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Overtime Rules */}
            {activeTab === 'overtime' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Overtime Rules Setup</h3>
                <p className="text-gray-600 mb-6">Configure overtime calculation parameters</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Overtime Threshold</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={overtimeRules.threshold}
                        onChange={(e) => handleOvertimeChange('threshold', parseFloat(e.target.value) || 0)}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="text-gray-500">hours per day</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Hours worked beyond this threshold will be considered overtime</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Overtime Multiplier</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="1"
                        step="0.1"
                        value={overtimeRules.multiplier}
                        onChange={(e) => handleOvertimeChange('multiplier', parseFloat(e.target.value) || 1)}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="text-gray-500">x regular pay rate</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Multiplier applied to calculate overtime pay</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Leave Accrual Rates */}
            {activeTab === 'leave-accrual' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Leave Accrual Rates</h3>
                <p className="text-gray-600 mb-6">Configure annual leave entitlements with versioning</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Annual Leave</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        value={leaveAccrual.annual}
                        onChange={(e) => handleLeaveAccrualChange('annual', parseInt(e.target.value) || 0)}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="text-gray-500">days per year</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sick Leave</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        value={leaveAccrual.sick}
                        onChange={(e) => handleLeaveAccrualChange('sick', parseInt(e.target.value) || 0)}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="text-gray-500">days per year</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Personal Leave</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        min="0"
                        value={leaveAccrual.personal}
                        onChange={(e) => handleLeaveAccrualChange('personal', parseInt(e.target.value) || 0)}
                        className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="text-gray-500">days per year</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Policy Versions */}
            {activeTab === 'policy-versions' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Policy Versions</h3>
                  <button 
                    onClick={() => document.getElementById('create-policy-modal').classList.remove('hidden')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Create New Version
                  </button>
                </div>
                
                <div className="mb-8">
                  <h4 className="text-md font-medium text-gray-800 mb-3">Current Policy</h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex justify-between">
                      <div>
                        <h5 className="font-medium text-blue-800">{selectedPolicy.name}</h5>
                        <p className="text-sm text-blue-600">Version {selectedPolicy.version}</p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {selectedPolicy.status}
                      </span>
                    </div>
                    <div className="mt-3 text-sm text-blue-700">
                      <p>Effective from: {selectedPolicy.effectiveFrom}</p>
                      {selectedPolicy.effectiveTo && <p>Effective to: {selectedPolicy.effectiveTo}</p>}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 mb-6">
                    <button 
                      onClick={handleRecalculate}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Recalculate Past Periods
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                      Compare Versions
                    </button>
                  </div>
                </div>
                
                <h4 className="text-md font-medium text-gray-800 mb-3">Policy History</h4>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective From</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {policies.map(policy => (
                        <tr key={policy.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{policy.version}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.effectiveFrom}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${policy.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                policy.status === 'Current' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                              {policy.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                            <button className="text-gray-600 hover:text-gray-900">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Holiday Calendar */}
            {activeTab === 'holidays' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Holiday Calendar Management</h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Add Holiday
                  </button>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Location</label>
                  <select className="w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option>All Locations</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holiday Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recurring</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {holidays.map(holiday => (
                        <tr key={holiday.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{holiday.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{holiday.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {locations.find(l => l.id === holiday.locationId)?.name || 'All Locations'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {holiday.recurring ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Yes
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                No
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Create Policy Modal */}
      <div id="create-policy-modal" className="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Policy Version</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Policy Name</label>
                <input
                  type="text"
                  value={newPolicy.name}
                  onChange={(e) => setNewPolicy({...newPolicy, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2024 Updated Policy"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Effective From</label>
                <input
                  type="date"
                  value={newPolicy.effectiveFrom}
                  onChange={(e) => setNewPolicy({...newPolicy, effectiveFrom: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newPolicy.description}
                  onChange={(e) => setNewPolicy({...newPolicy, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Brief description of changes in this policy version"
                ></textarea>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => document.getElementById('create-policy-modal').classList.add('hidden')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreatePolicy}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
