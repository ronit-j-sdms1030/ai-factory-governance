function PayrollExport() {
  const [selectedMonth, setSelectedMonth] = React.useState('2024-03');
  const [isLocked, setIsLocked] = React.useState(true);
  const [exportPreview, setExportPreview] = React.useState([]);
  const [apiKey, setApiKey] = React.useState('sk_live_51J...');
  const [showApiKey, setShowApiKey] = React.useState(false);
  const [columnConfig, setColumnConfig] = React.useState({
    employeeId: true,
    fullName: true,
    department: true,
    workedHours: true,
    overtime: true,
    lateArrivals: true,
    leavesTaken: true,
    policyVersion: true
  });
  
  // Mock data for export preview
  React.useEffect(() => {
    setExportPreview([
      { id: 'EMP001', name: 'Sarah Johnson', department: 'Engineering', hours: 176, overtime: 8.5, late: 2, leaves: 1, policy: 'v2.1' },
      { id: 'EMP002', name: 'Michael Chen', department: 'Marketing', hours: 160, overtime: 0, late: 0, leaves: 3, policy: 'v2.1' },
      { id: 'EMP003', name: 'Priya Sharma', department: 'Sales', hours: 168, overtime: 4.2, late: 1, leaves: 0, policy: 'v2.1' },
      { id: 'EMP004', name: 'James Wilson', department: 'Support', hours: 152, overtime: 0, late: 4, leaves: 2, policy: 'v2.1' },
      { id: 'EMP005', name: 'Fatima Al-Mansoori', department: 'Operations', hours: 172, overtime: 6.8, late: 0, leaves: 1, policy: 'v2.1' }
    ]);
  }, [selectedMonth]);

  const toggleColumn = (column) => {
    setColumnConfig(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const generateCSV = () => {
    // In a real app, this would create and download a CSV file
    alert('CSV file generated successfully!');
  };

  const regenerateReport = () => {
    alert('Payroll report regenerated');
  };

  const togglePeriodLock = () => {
    setIsLocked(!isLocked);
  };

  const regenerateApiKey = () => {
    setApiKey('sk_live_' + Math.random().toString(36).substr(2, 10));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Payroll Export</h1>
            <div className="flex space-x-3">
              <button 
                onClick={generateCSV}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Download CSV
              </button>
              <button 
                onClick={regenerateReport}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Regenerate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Month Picker and Lock Status */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Payroll Period</h2>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isLocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    <svg className="-ml-1 mr-1.5 h-2 w-2 text-current" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                    {isLocked ? 'Locked' : 'Unlocked'}
                  </span>
                  <button
                    onClick={togglePeriodLock}
                    className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                      isLocked 
                        ? 'text-orange-700 bg-orange-100 hover:bg-orange-200' 
                        : 'text-blue-700 bg-blue-100 hover:bg-blue-200'
                    }`}
                  >
                    {isLocked ? 'Unlock Period' : 'Lock Period'}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="month-picker" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Month
                  </label>
                  <input
                    type="month"
                    id="month-picker"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Policy Version
                  </label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      v2.1 (Effective: Jan 2024)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Preview */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Export Preview</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Showing first 5 records. {exportPreview.length} total records for this period.
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {columnConfig.employeeId && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>}
                      {columnConfig.fullName && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>}
                      {columnConfig.department && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>}
                      {columnConfig.workedHours && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worked Hours</th>}
                      {columnConfig.overtime && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime (hrs)</th>}
                      {columnConfig.lateArrivals && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late Arrivals</th>}
                      {columnConfig.leavesTaken && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leaves Taken</th>}
                      {columnConfig.policyVersion && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Version</th>}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {exportPreview.map((record) => (
                      <tr key={record.id}>
                        {columnConfig.employeeId && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.id}</td>}
                        {columnConfig.fullName && <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.name}</td>}
                        {columnConfig.department && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.department}</td>}
                        {columnConfig.workedHours && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.hours}</td>}
                        {columnConfig.overtime && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.overtime}</td>}
                        {columnConfig.lateArrivals && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.late}</td>}
                        {columnConfig.leavesTaken && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.leaves}</td>}
                        {columnConfig.policyVersion && <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.policy}</td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Column Configuration */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Column Configuration</h3>
              <div className="space-y-3">
                {Object.entries(columnConfig).map(([key, enabled]) => (
                  <div key={key} className="flex items-center">
                    <input
                      id={`col-${key}`}
                      name={`col-${key}`}
                      type="checkbox"
                      checked={enabled}
                      onChange={() => toggleColumn(key)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`col-${key}`} className="ml-3 text-sm text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* API Key Management */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">API Access</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  REST API Key
                </label>
                <div className="flex">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    readOnly
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                onClick={regenerateApiKey}
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Regenerate Key
              </button>
            </div>

            {/* Audit Trail */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
              <ul className="space-y-3">
                <li className="text-sm">
                  <div className="font-medium text-gray-900">Report Generated</div>
                  <div className="text-gray-500">by HR Manager • Today, 09:30 AM</div>
                </li>
                <li className="text-sm">
                  <div className="font-medium text-gray-900">Period Locked</div>
                  <div className="text-gray-500">by System Admin • Mar 1, 2024</div>
                </li>
                <li className="text-sm">
                  <div className="font-medium text-gray-900">Column Configuration Updated</div>
                  <div className="text-gray-500">by Finance Lead • Feb 28, 2024</div>
                </li>
                <li className="text-sm">
                  <div className="font-medium text-gray-900">API Key Regenerated</div>
                  <div className="text-gray-500">by IT Admin • Feb 25, 2024</div>
                </li>
              </ul>
            </div>

            {/* Export History */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Export History</h3>
              <ul className="space-y-3">
                <li className="text-sm">
                  <div className="font-medium text-gray-900">March 2024 Report</div>
                  <div className="text-gray-500">Generated: Mar 5, 2024 • 12.4MB</div>
                </li>
                <li className="text-sm">
                  <div className="font-medium text-gray-900">February 2024 Report</div>
                  <div className="text-gray-500">Generated: Feb 5, 2024 • 11.8MB</div>
                </li>
                <li className="text-sm">
                  <div className="font-medium text-gray-900">January 2024 Report</div>
                  <div className="text-gray-500">Generated: Jan 7, 2024 • 13.2MB</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}