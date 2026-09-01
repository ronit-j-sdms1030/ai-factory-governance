const PayrollExport = () => {
  // Mock data
  const [selectedMonth, setSelectedMonth] = React.useState('2023-10');
  const [isLocked, setIsLocked] = React.useState(false);
  const [apiKey, setApiKey] = React.useState('sk_live_51J4X2KL0A2...');
  const [policyVersion, setPolicyVersion] = React.useState('v2.3');
  
  const mockPayrollData = [
    { employee_id: 'EMP00123', days_present: 22, late_count: 1, overtime_hours: 8.5, leave_days: 3 },
    { employee_id: 'EMP00234', days_present: 20, late_count: 3, overtime_hours: 12.0, leave_days: 5 },
    { employee_id: 'EMP00345', days_present: 23, late_count: 0, overtime_hours: 4.2, leave_days: 2 },
    { employee_id: 'EMP00456', days_present: 18, late_count: 5, overtime_hours: 6.8, leave_days: 7 },
    { employee_id: 'EMP00567', days_present: 21, late_count: 2, overtime_hours: 9.3, leave_days: 4 },
  ];
  
  const handleLockToggle = () => {
    setIsLocked(!isLocked);
  };
  
  const handleGenerateCSV = () => {
    alert('CSV generated successfully!');
  };
  
  const handleDownload = () => {
    alert('Payroll data downloaded as CSV');
  };
  
  const handleRegenerateKey = () => {
    setApiKey('sk_live_' + Math.random().toString(36).substr(2, 15) + '...');
  };
  
  const monthOptions = [
    '2023-09', '2023-10', '2023-11', '2023-12'
  ];
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h1 className="text-xl font-bold text-gray-800 mb-8">WorkPulse</h1>
        <nav className="flex-1">
          <a href="/dashboard" className="block py-2 text-gray-600 hover:text-blue-600">Dashboard</a>
          <a href="/attendance/clock" className="block py-2 text-gray-600 hover:text-blue-600">Clock In/Out</a>
          <a href="/attendance/history" className="block py-2 text-gray-600 hover:text-blue-600">Attendance History</a>
          <a href="/leave/request" className="block py-2 text-gray-600 hover:text-blue-600">Leave Request</a>
          <a href="/leave/approvals" className="block py-2 text-gray-600 hover:text-blue-600">Leave Approvals</a>
          <a href="/shifts/roster" className="block py-2 text-gray-600 hover:text-blue-600">Shift Roster</a>
          <a href="/admin/policies" className="block py-2 text-gray-600 hover:text-blue-600">Policy Management</a>
          <a href="/payroll/export" className="block py-2 text-blue-600 font-medium">Payroll Export</a>
          <a href="/admin/audit" className="block py-2 text-gray-600 hover:text-blue-600">Audit Trail</a>
          <a href="/profile/facial" className="block py-2 text-gray-600 hover:text-blue-600">Facial Enrollment</a>
          <a href="/offline/sync" className="block py-2 text-gray-600 hover:text-blue-600">Offline Sync</a>
          <a href="/employees" className="block py-2 text-gray-600 hover:text-blue-600">Employee Directory</a>
          <a href="/notifications" className="block py-2 text-gray-600 hover:text-blue-600">Notifications</a>
          <a href="/settings" className="block py-2 text-gray-600 hover:text-blue-600">Settings</a>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Payroll Export</h1>
            <p className="text-gray-600">Generate and export payroll-ready attendance data</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
                <div className="flex items-center space-x-4">
                  <select 
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {monthOptions.map(month => (
                      <option key={month} value={month}>{new Date(month).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</option>
                    ))}
                  </select>
                  <div className={`flex items-center ${isLocked ? 'text-red-600' : 'text-green-600'}`}>
                    <div className={`w-3 h-3 rounded-full mr-2 ${isLocked ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <span>{isLocked ? 'Locked' : 'Unlocked'}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleLockToggle}
                className={`px-4 py-2 rounded font-medium ${isLocked ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}
              >
                {isLocked ? 'Unlock Month' : 'Lock Month'}
              </button>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Payroll Data Preview</h2>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Present</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late Count</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime Hours</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Days</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockPayrollData.map((row, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{row.employee_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{row.days_present}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{row.late_count}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{row.overtime_hours}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{row.leave_days}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={handleGenerateCSV}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Generate CSV
              </button>
              <button 
                onClick={handleDownload}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Download CSV
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">REST API Access</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                <div className="flex">
                  <input 
                    type="text" 
                    value={apiKey}
                    readOnly
                    className="flex-1 border border-gray-300 rounded-l px-4 py-2 bg-gray-50"
                  />
                  <button 
                    onClick={handleRegenerateKey}
                    className="px-4 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300"
                  >
                    Regenerate
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p className="mb-2">Use this endpoint to access payroll data programmatically:</p>
                <code className="bg-gray-100 p-2 rounded block">
                  GET /api/v1/payroll/export?month={selectedMonth}&api_key=...
                </code>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Policy Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Policy Version Used</label>
                  <div className="text-lg font-semibold text-blue-600">{policyVersion}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Effective Period</label>
                  <div>October 1, 2023 - December 31, 2023</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Policy Details</label>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Grace period: 15 minutes</li>
                    <li>Overtime threshold: 8 hours</li>
                    <li>Half-day threshold: 4 hours</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Render the component
<PayrollExport />