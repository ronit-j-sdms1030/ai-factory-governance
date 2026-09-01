function PayrollExport() {
  // Mock data
  const months = [
    { id: '2024-01', name: 'January 2024', locked: true },
    { id: '2024-02', name: 'February 2024', locked: true },
    { id: '2024-03', name: 'March 2024', locked: false },
    { id: '2024-04', name: 'April 2024', locked: false },
  ];
  
  const exportHistory = [
    { id: 1, period: 'March 2024', exportedBy: 'HR Manager', exportedAt: '2024-04-01 15:30', fileName: 'payroll_march_2024.csv' },
    { id: 2, period: 'February 2024', exportedBy: 'System', exportedAt: '2024-03-01 03:00', fileName: 'payroll_february_2024.csv' },
    { id: 3, period: 'January 2024', exportedBy: 'HR Manager', exportedAt: '2024-02-01 16:45', fileName: 'payroll_january_2024.csv' },
  ];

  const validationSummary = {
    totalEmployees: 1247,
    validRecords: 1238,
    discrepancies: 9,
    discrepancyList: [
      { employeeId: 'EMP00124', name: 'Robert Chen', issue: 'Missing clock-out' },
      { employeeId: 'EMP00356', name: 'Sarah Johnson', issue: 'Unverified overtime' },
      { employeeId: 'EMP00789', name: 'Michael Torres', issue: 'Late arrival discrepancy' },
    ]
  };

  const policyVersion = 'POL-V3-2024';

  const [selectedMonth, setSelectedMonth] = React.useState('2024-03');
  const [apiKey, setApiKey] = React.useState('wkpf_api_key_7d9b1c3f_a4e6');
  const [showApiKey, setShowApiKey] = React.useState(false);

  const handleLockToggle = (monthId) => {
    console.log(`Toggling lock for ${monthId}`);
    // In a real app, this would make an API call
  };

  const handleGenerateCSV = () => {
    console.log(`Generating CSV for ${selectedMonth}`);
    // In a real app, this would trigger CSV generation
  };

  const handleDownload = () => {
    console.log('Downloading payroll file');
    // In a real app, this would trigger file download
  };

  const handleRegenerateKey = () => {
    console.log('Regenerating API key');
    setApiKey('wkpf_api_key_' + Math.random().toString(36).substr(2, 8));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold">WorkPulse</h1>
          <p className="text-indigo-200 text-sm">Payroll Management</p>
        </div>
        <nav>
          <ul className="space-y-2">
            {['Dashboard', 'Clock Interface', 'Attendance', 'Leave Requests', 'Team View', 'Shift Rosters', 'Policies', 'Payroll Export', 'Facial Enrollment', 'Profile', 'Admin Audit'].map((item) => (
              <li key={item}>
                <a 
                  href="#" 
                  className={`block py-2 px-4 rounded ${item === 'Payroll Export' ? 'bg-indigo-700 text-white' : 'hover:bg-indigo-700'}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <h2 className="text-2xl font-semibold text-gray-800">Payroll Export</h2>
          <p className="text-gray-600">Secure export interface with period locking</p>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Month Picker & Locking Controls */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Period Selection & Locking</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {months.map((month) => (
                  <div 
                    key={month.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedMonth === month.id 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                    onClick={() => setSelectedMonth(month.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900">{month.name}</h4>
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          month.locked 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {month.locked ? 'Locked' : 'Open'}
                      </span>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLockToggle(month.id);
                        }}
                        className={`text-xs px-3 py-1 rounded ${
                          month.locked
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}
                      >
                        {month.locked ? 'Unlock Period' : 'Lock Period'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleGenerateCSV}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Generate CSV
                </button>
                <button
                  onClick={handleDownload}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Download File
                </button>
              </div>
            </div>

            {/* Data Validation Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Validation Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-600">Total Employees</span>
                  <span className="font-medium">{validationSummary.totalEmployees}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-600">Valid Records</span>
                  <span className="font-medium text-green-600">{validationSummary.validRecords}</span>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-gray-600">Discrepancies</span>
                  <span className="font-medium text-red-600">{validationSummary.discrepancies}</span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Top Issues</h4>
                  <ul className="space-y-2">
                    {validationSummary.discrepancyList.map((issue, index) => (
                      <li key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate max-w-[120px]">{issue.name}</span>
                        <span className="text-red-600">{issue.issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* API Key Management */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">API Key Management</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Current API Key</label>
                <div className="flex">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    readOnly
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-r-0 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm"
                  >
                    {showApiKey ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleRegenerateKey}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Regenerate Key
              </button>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> This key provides access to payroll export endpoints. Store securely and regenerate if compromised.
                </p>
              </div>
            </div>

            {/* Policy Version & Export History */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Policy Information</h3>
              
              <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Active Policy Version</span>
                  <span className="font-mono bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                    {policyVersion}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Applied to all calculations for current export period
                </p>
              </div>
              
              <h4 className="text-md font-medium text-gray-900 mb-3">Recent Exports</h4>
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {exportHistory.map((record) => (
                      <tr key={record.id}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{record.period}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{record.exportedAt.split(' ')[0]}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900">
                          <a href="#">{record.fileName}</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}