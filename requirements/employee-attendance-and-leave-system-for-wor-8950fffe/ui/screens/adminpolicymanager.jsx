function AdminPolicyManager() {
  const [activeTab, setActiveTab] = React.useState('policies');
  const [policies, setPolicies] = React.useState([
    { id: 1, version: '2.1', name: 'Global Office Policy', effectiveFrom: '2023-01-01', effectiveTo: null, gracePeriod: 15, overtimeThreshold: 8, location: 'All Offices' },
    { id: 2, version: '1.5', name: 'Field Worker Policy', effectiveFrom: '2022-06-01', effectiveTo: '2023-12-31', gracePeriod: 30, overtimeThreshold: 9, location: 'Field Locations' }
  ]);
  
  const [holidays, setHolidays] = React.useState([
    { id: 1, name: 'New Year\'s Day', date: '2024-01-01', recurring: true, location: 'All' },
    { id: 2, name: 'Independence Day', date: '2024-07-04', recurring: true, location: 'US' },
    { id: 3, name: 'Christmas', date: '2024-12-25', recurring: true, location: 'All' }
  ]);
  
  const [showPolicyForm, setShowPolicyForm] = React.useState(false);
  const [showHolidayForm, setShowHolidayForm] = React.useState(false);
  
  const locations = ['All Offices', 'US Headquarters', 'UK Office', 'Field Locations'];
  
  const handleCreatePolicy = (policyData) => {
    const newPolicy = {
      id: policies.length + 1,
      ...policyData,
      effectiveTo: null
    };
    setPolicies([newPolicy, ...policies]);
    setShowPolicyForm(false);
  };
  
  const handleCreateHoliday = (holidayData) => {
    const newHoliday = {
      id: holidays.length + 1,
      ...holidayData
    };
    setHolidays([newHoliday, ...holidays]);
    setShowHolidayForm(false);
  };
  
  const handleRecalculate = (policyId) => {
    alert(`Recalculation triggered for policy ${policyId}`);
  };
  
  const handleRollback = (policyId) => {
    alert(`Rollback initiated for policy ${policyId}`);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h1 className="text-2xl font-bold text-indigo-700 mb-8">WorkPulse Admin</h1>
        <nav className="flex-1">
          <ul className="space-y-2">
            {['Dashboard', 'Clock In/Out', 'Attendance', 'Leave', 'Team', 'Shifts', 'Payroll', 'Profile', 'Settings', 'Policies', 'Audit'].map((item, index) => (
              <li key={item}>
                <a 
                  href={`/${item.toLowerCase().replace(' ', '')}`} 
                  className={`flex items-center p-3 rounded-lg ${item === 'Policies' ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <span>{item}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">HR Administrator</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Policy Management</h2>
            <div className="flex items-center space-x-4">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Export Policy Report
              </button>
            </div>
          </div>
        </header>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <nav className="flex px-6">
            {['policies', 'holidays', 'history', 'comparison'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 font-medium text-sm capitalize ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {activeTab === 'policies' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Attendance Policies</h3>
                <button 
                  onClick={() => setShowPolicyForm(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  New Policy
                </button>
              </div>
              
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective From</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grace Period</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime Threshold</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {policies.map((policy) => (
                      <tr key={policy.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{policy.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.version}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.effectiveFrom}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.gracePeriod} minutes</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.overtimeThreshold} hours</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            onClick={() => handleRecalculate(policy.id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            Recalculate
                          </button>
                          <button 
                            onClick={() => handleRollback(policy.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Rollback
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'holidays' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Holiday Calendar</h3>
                <div className="flex space-x-3">
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Import Holidays
                  </button>
                  <button 
                    onClick={() => setShowHolidayForm(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Add Holiday
                  </button>
                </div>
              </div>
              
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holiday Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recurring</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {holidays.map((holiday) => (
                      <tr key={holiday.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{holiday.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{holiday.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{holiday.recurring ? 'Yes' : 'No'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{holiday.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Policy History</h3>
              <div className="bg-white shadow rounded-lg p-6">
                <div className="border-l-4 border-indigo-500 pl-4 py-1 mb-4">
                  <h4 className="font-medium text-gray-900">Global Office Policy v2.1</h4>
                  <p className="text-sm text-gray-500">Effective: Jan 1, 2023 - Current</p>
                </div>
                <div className="border-l-4 border-gray-300 pl-4 py-1 mb-4">
                  <h4 className="font-medium text-gray-900">Global Office Policy v2.0</h4>
                  <p className="text-sm text-gray-500">Effective: Jun 1, 2022 - Dec 31, 2022</p>
                </div>
                <div className="border-l-4 border-gray-300 pl-4 py-1">
                  <h4 className="font-medium text-gray-900">Global Office Policy v1.9</h4>
                  <p className="text-sm text-gray-500">Effective: Jan 1, 2022 - May 31, 2022</p>
                </div>
                <div className="mt-6">
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                    </svg>
                    Rollback to v2.0
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'comparison' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Policy Comparison</h3>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Setting</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Global Office Policy v2.1</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field Worker Policy v1.5</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Grace Period</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 minutes</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30 minutes</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Overtime Threshold</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8 hours</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">9 hours</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Half-day Threshold</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4 hours</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5 hours</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Location</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">All Offices</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Field Locations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Policy Creation Modal */}
      {showPolicyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Create New Policy</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Policy Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="e.g., Global Office Policy" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Version</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="e.g., 2.2" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Effective From</label>
                  <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Grace Period (minutes)</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="15" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Overtime Threshold (hours)</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="8" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Half-day Threshold (hours)</label>
                  <input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="4" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-3 py-2" rows="3" placeholder="Policy description..."></textarea>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setShowPolicyForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleCreatePolicy({})}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Create Policy
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Holiday Creation Modal */}
      {showHolidayForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Add New Holiday</h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Holiday Name</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="e.g., New Year's Day" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="recurring" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                <label htmlFor="recurring" className="ml-2 block text-sm text-gray-700">Recurring Holiday</label>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button 
                onClick={() => setShowHolidayForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleCreateHoliday({})}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Add Holiday
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
