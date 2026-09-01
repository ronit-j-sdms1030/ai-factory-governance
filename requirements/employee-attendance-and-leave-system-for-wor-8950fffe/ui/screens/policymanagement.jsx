function PolicyManagement() {
  const [activeTab, setActiveTab] = React.useState('policies');
  const [selectedPolicy, setSelectedPolicy] = React.useState(null);
  const [showComparison, setShowComparison] = React.useState(false);
  const [comparisonVersions, setComparisonVersions] = React.useState([null, null]);
  
  // Mock data
  const policies = [
    { id: 1, name: 'Standard Office Policy', version: '2.1', effectiveFrom: '2024-01-01', effectiveTo: null, location: 'Bangalore HQ' },
    { id: 2, name: 'Remote Work Policy', version: '1.3', effectiveFrom: '2023-06-01', effectiveTo: null, location: 'All Remote Locations' },
    { id: 3, name: 'Field Operations Policy', version: '3.0', effectiveFrom: '2024-03-01', effectiveTo: null, location: 'Field Teams' }
  ];
  
  const policyHistory = [
    { id: 1, version: '2.1', effectiveFrom: '2024-01-01', createdBy: 'Amit Sharma' },
    { id: 4, version: '2.0', effectiveFrom: '2023-09-01', createdBy: 'Priya Patel' },
    { id: 5, version: '1.5', effectiveFrom: '2023-03-01', createdBy: 'Rajesh Kumar' }
  ];
  
  const holidays = [
    { id: 1, name: 'Republic Day', date: '2024-01-26', recurring: true, location: 'India' },
    { id: 2, name: 'Independence Day', date: '2024-08-15', recurring: true, location: 'India' },
    { id: 3, name: 'Diwali', date: '2024-10-31', recurring: true, location: 'India' }
  ];
  
  const locations = [
    { id: 1, name: 'Bangalore HQ' },
    { id: 2, name: 'Mumbai Branch' },
    { id: 3, name: 'Delhi Office' },
    { id: 4, name: 'Chennai Center' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">WorkPulse</h1>
        <nav className="flex-1">
          <ul className="space-y-2">
            {['Dashboard', 'Clock In/Out', 'Attendance', 'Leave', 'Team', 'Shifts', 'Policies', 'Payroll', 'Profile'].map((item) => (
              <li key={item}>
                <a 
                  href="#" 
                  className={`block py-3 px-4 rounded-lg transition ${
                    item === 'Policies' ? 'bg-indigo-700 font-medium' : 'hover:bg-indigo-700'
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pt-4 border-t border-indigo-700">
          <button className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg transition text-left">
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Policy Management</h2>
            <div className="flex items-center space-x-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition">
                Create New Policy
              </button>
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="font-medium text-gray-700">AS</span>
              </div>
            </div>
          </div>
        </header>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <div className="flex px-6">
            {['policies', 'holidays', 'history', 'comparison'].map((tab) => (
              <button
                key={tab}
                className={`py-4 px-6 font-medium text-sm ${
                  activeTab === tab
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Policies Tab */}
          {activeTab === 'policies' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Active Policies</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Effective From</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {policies.map((policy) => (
                        <tr key={policy.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{policy.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.version}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.effectiveFrom}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{policy.location}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button 
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                              onClick={() => setSelectedPolicy(policy)}
                            >
                              Edit
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900">
                              Clone
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Policy Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Grace Period (minutes)</label>
                      <input 
                        type="number" 
                        className="w-full rounded-lg border-gray-300 border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        defaultValue="15"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Overtime Threshold (hours)</label>
                      <input 
                        type="number" 
                        className="w-full rounded-lg border-gray-300 border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        defaultValue="8"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Half-Day Threshold (hours)</label>
                      <input 
                        type="number" 
                        className="w-full rounded-lg border-gray-300 border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        defaultValue="4"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Leave Accrual Method</label>
                      <select className="w-full rounded-lg border-gray-300 border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Annually</option>
                        <option>None</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Bulk Location Assignment</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select Locations</label>
                      <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
                        {locations.map(location => (
                          <div key={location.id} className="flex items-center mb-2">
                            <input 
                              type="checkbox" 
                              id={`loc-${location.id}`} 
                              className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor={`loc-${location.id}`} className="ml-2 text-sm text-gray-700">
                              {location.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition">
                      Apply Policy to Selected Locations
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Holidays Tab */}
          {activeTab === 'holidays' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Holiday Calendar</h3>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition">
                  Add Holiday
                </button>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Recurring Holiday Patterns</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded" defaultChecked />
                      <span className="ml-2 font-medium">Weekly Off Pattern</span>
                    </div>
                    <p className="text-sm text-gray-600">Every Sunday</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded" />
                      <span className="ml-2 font-medium">Bi-weekly Off Pattern</span>
                    </div>
                    <p className="text-sm text-gray-600">Alternate Sundays</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <input type="checkbox" className="h-4 w-4 text-indigo-600 rounded" defaultChecked />
                      <span className="ml-2 font-medium">Monthly Off Pattern</span>
                    </div>
                    <p className="text-sm text-gray-600">First Sunday of month</p>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
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
                      <tr key={holiday.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{holiday.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{holiday.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {holiday.recurring ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{holiday.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-6">Policy Version History</h3>
              <div className="space-y-4">
                {policyHistory.map((version) => (
                  <div key={version.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">Version {version.version}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Effective from {version.effectiveFrom} • Created by {version.createdBy}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={() => {
                            setComparisonVersions([selectedPolicy?.id || policies[0].id, version.id]);
                            setShowComparison(true);
                            setActiveTab('comparison');
                          }}
                        >
                          Compare
                        </button>
                        <button className="text-indigo-600 hover:text-indigo-900">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-gray-800 mb-4">Retroactive Recalculation</h4>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input 
                        type="date" 
                        className="w-full rounded-lg border-gray-300 border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input 
                        type="date" 
                        className="w-full rounded-lg border-gray-300 border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Affected Policy</label>
                      <select className="w-full rounded-lg border-gray-300 border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <option>Select Policy</option>
                        {policies.map(policy => (
                          <option key={policy.id} value={policy.id}>{policy.name} v{policy.version}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition">
                    Run Retroactive Calculation
                  </button>
                  <p className="mt-2 text-sm text-gray-600">
                    This will recalculate attendance records for the selected period using the new policy settings.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Tab */}
          {activeTab === 'comparison' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Policy Comparison</h3>
                <button 
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => setShowComparison(false)}
                >
                  Back to History
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select First Version</label>
                  <select 
                    className="w-full rounded-lg border-gray-300 border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={comparisonVersions[0] || ''}
                    onChange={(e) => setComparisonVersions([e.target.value, comparisonVersions[1]])}
                  >
                    <option value="">Select Version</option>
                    {policyHistory.map(version => (
                      <option key={version.id} value={version.id}>Version {version.version} ({version.effectiveFrom})</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Second Version</label>
                  <select 
                    className="w-full rounded-lg border-gray-300 border py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={comparisonVersions[1] || ''}
                    onChange={(e) => setComparisonVersions([comparisonVersions[0], e.target.value])}
                  >
                    <option value="">Select Version</option>
                    {policyHistory.map(version => (
                      <option key={version.id} value={version.id}>Version {version.version} ({version.effectiveFrom})</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {comparisonVersions[0] && comparisonVersions[1] && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Setting</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version {policyHistory.find(v => v.id == comparisonVersions[0])?.version}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version {policyHistory.find(v => v.id == comparisonVersions[1])?.version}</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Grace Period</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">15 minutes</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 minutes</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-600">Changed (-5 minutes)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Overtime Threshold</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8 hours</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8 hours</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No change</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Half-Day Threshold</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4 hours</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3.5 hours</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-600">Changed (-0.5 hours)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}