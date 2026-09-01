function ShiftRoster() {
  // Mock data
  const shifts = [
    { id: 1, name: 'Morning Shift', start_time_utc: '08:00', end_time_utc: '16:00', timezone: 'IST', is_overnight: false },
    { id: 2, name: 'Night Shift', start_time_utc: '20:00', end_time_utc: '04:00', timezone: 'IST', is_overnight: true },
    { id: 3, name: 'Evening Shift', start_time_utc: '16:00', end_time_utc: '00:00', timezone: 'IST', is_overnight: false }
  ];

  const employees = [
    { id: 101, first_name: 'Amit', last_name: 'Sharma', department: 'Engineering' },
    { id: 102, first_name: 'Priya', last_name: 'Patel', department: 'Marketing' },
    { id: 103, first_name: 'Raj', last_name: 'Kumar', department: 'Operations' },
    { id: 104, first_name: 'Sneha', last_name: 'Iyer', department: 'HR' }
  ];

  const shiftPatterns = [
    { id: 1, name: 'Standard Day', description: '9 AM to 5 PM' },
    { id: 2, name: 'Night Rotation', description: 'Alternating nights' },
    { id: 3, name: 'Weekend Only', description: 'Saturday and Sunday' }
  ];

  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [selectedTimezone, setSelectedTimezone] = React.useState('IST');
  const [draggedEmployee, setDraggedEmployee] = React.useState(null);
  const [assignments, setAssignments] = React.useState({});
  const [showImportModal, setShowImportModal] = React.useState(false);
  const [history, setHistory] = React.useState([
    { id: 1, employee: 'Amit Sharma', shift: 'Morning Shift', date: '2023-05-15', assignedBy: 'Admin User' },
    { id: 2, employee: 'Priya Patel', shift: 'Night Shift', date: '2023-05-14', assignedBy: 'Admin User' }
  ]);

  const handleDragStart = (e, employee) => {
    setDraggedEmployee(employee);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, shiftId) => {
    e.preventDefault();
    if (draggedEmployee) {
      const newAssignment = {
        employee: `${draggedEmployee.first_name} ${draggedEmployee.last_name}`,
        shift: shifts.find(s => s.id === shiftId).name,
        date: selectedDate,
        assignedBy: 'Current User'
      };
      
      setHistory([newAssignment, ...history]);
      setDraggedEmployee(null);
    }
  };

  const handleImportClick = () => {
    setShowImportModal(true);
  };

  const handleFileUpload = (e) => {
    // In a real app, this would process the CSV
    alert('CSV file processed successfully!');
    setShowImportModal(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">WorkPulse</h1>
        <nav className="flex-1">
          <ul className="space-y-2">
            <li><a href="/dashboard" className="block py-2 hover:bg-indigo-700 rounded px-4">Dashboard</a></li>
            <li><a href="/attendance" className="block py-2 hover:bg-indigo-700 rounded px-4">Attendance</a></li>
            <li><a href="/leave/request" className="block py-2 hover:bg-indigo-700 rounded px-4">Leave Requests</a></li>
            <li><a href="/team" className="block py-2 hover:bg-indigo-700 rounded px-4">Team Attendance</a></li>
            <li><a href="/shifts" className="block py-2 bg-indigo-900 rounded px-4">Shift Roster</a></li>
            <li><a href="/policies" className="block py-2 hover:bg-indigo-700 rounded px-4">Policies</a></li>
            <li><a href="/payroll" className="block py-2 hover:bg-indigo-700 rounded px-4">Payroll Export</a></li>
          </ul>
        </nav>
        <div className="mt-auto">
          <a href="/profile" className="block py-2 hover:bg-indigo-700 rounded px-4">Profile Settings</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Shift Roster Management</h1>
          <p className="text-gray-600">Manage employee shifts and assignments</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <label className="mr-2 text-gray-700">Select Date:</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded px-3 py-2"
              />
            </div>
            
            <div>
              <label className="mr-2 text-gray-700">Timezone:</label>
              <select 
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="IST">India Standard Time (IST)</option>
                <option value="EST">Eastern Standard Time (EST)</option>
                <option value="UTC">Coordinated Universal Time (UTC)</option>
              </select>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={handleImportClick}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Import CSV
              </button>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
              </button>
            </div>
          </div>

          {/* Calendar View */}
          <div className="border rounded-lg p-4 mb-6">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium text-gray-600 py-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {[...Array(35)].map((_, i) => {
                const day = i - new Date(selectedDate).getDay() + 1;
                const isCurrentMonth = day > 0 && day <= new Date(selectedDate).getDate();
                return (
                  <div 
                    key={i} 
                    className={`min-h-24 border rounded p-2 ${isCurrentMonth ? 'bg-white' : 'bg-gray-100'}`}
                  >
                    <div className="text-right text-sm font-medium mb-1">
                      {isCurrentMonth ? day : ''}
                    </div>
                    {isCurrentMonth && day === new Date().getDate() && (
                      <div className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5">
                        Today
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drag & Drop Assignment Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Employee List */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Available Employees</h2>
            <div className="space-y-3">
              {employees.map(employee => (
                <div 
                  key={employee.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, employee)}
                  className="border rounded p-3 cursor-move bg-gray-50 hover:bg-indigo-50 flex items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium mr-3">
                    {employee.first_name.charAt(0)}{employee.last_name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{employee.first_name} {employee.last_name}</div>
                    <div className="text-sm text-gray-500">{employee.department}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shift Assignments */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Shift Assignments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {shifts.map(shift => (
                <div 
                  key={shift.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, shift.id)}
                  className={`border-2 border-dashed rounded-lg p-4 ${
                    shift.is_overnight ? 'border-red-300 bg-red-50' : 'border-indigo-300 bg-indigo-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{shift.name}</h3>
                    {shift.is_overnight && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Overnight</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {shift.start_time_utc} - {shift.end_time_utc} {shift.timezone}
                  </div>
                  <div className="text-xs text-gray-500">
                    Drag employees here to assign
                  </div>
                </div>
              ))}
            </div>

            {/* Shift Patterns */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3 text-gray-800">Shift Patterns</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {shiftPatterns.map(pattern => (
                  <div key={pattern.id} className="border rounded p-3 bg-gray-50">
                    <div className="font-medium">{pattern.name}</div>
                    <div className="text-sm text-gray-600">{pattern.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Assignment History */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Assignment History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned By</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {history.map(record => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{record.employee}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.shift}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.assignedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-1/3">
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Import Shift Assignments</h3>
              <p className="text-gray-600 mb-4">Upload a CSV file with employee shift assignments</p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l11.172-11.172" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-medium text-indigo-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">CSV file up to 10MB</p>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleFileUpload}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Upload File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}