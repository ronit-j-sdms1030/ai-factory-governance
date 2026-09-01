const ShiftRoster = () => {
  // Mock data
  const employees = [
    { id: 1, name: 'Alex Morgan', department: 'Engineering', timezone: 'America/New_York' },
    { id: 2, name: 'Taylor Kim', department: 'Marketing', timezone: 'Asia/Seoul' },
    { id: 3, name: 'Jordan Smith', department: 'Sales', timezone: 'Europe/London' },
    { id: 4, name: 'Casey Brown', department: 'Support', timezone: 'America/Los_Angeles' },
  ];

  const shifts = [
    { id: 1, name: 'Day Shift', startTime: '09:00', endTime: '17:00', isOvernight: false },
    { id: 2, name: 'Night Shift', startTime: '22:00', endTime: '06:00', isOvernight: true },
    { id: 3, name: 'Evening Shift', startTime: '16:00', endTime: '00:00', isOvernight: false },
  ];

  const assignments = [
    { employeeId: 1, shiftId: 1, date: '2023-06-15' },
    { employeeId: 2, shiftId: 2, date: '2023-06-15' },
    { employeeId: 3, shiftId: 3, date: '2023-06-15' },
  ];

  const [selectedDate, setSelectedDate] = React.useState('2023-06-15');
  const [selectedTimezone, setSelectedTimezone] = React.useState('UTC');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [draggedEmployee, setDraggedEmployee] = React.useState(null);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragStart = (e, employee) => {
    setDraggedEmployee(employee);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e, shiftId) => {
    e.preventDefault();
    // In a real app, this would update assignments
    console.log(`Assigned ${draggedEmployee.name} to shift ${shiftId}`);
    setDraggedEmployee(null);
  };

  const exportToCSV = () => {
    alert('Exporting shift roster to CSV...');
  };

  const importFromCSV = () => {
    alert('Importing shift roster from CSV...');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Shift Roster</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="Europe/London">London</option>
            <option value="Asia/Seoul">Seoul</option>
          </select>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search Employees</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Name or department"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Shift Templates</h3>
          <ul className="space-y-2">
            <li className="text-sm text-blue-600 cursor-pointer hover:underline">Standard Day Shift</li>
            <li className="text-sm text-blue-600 cursor-pointer hover:underline">Night Rotation</li>
            <li className="text-sm text-blue-600 cursor-pointer hover:underline">Weekend Coverage</li>
          </ul>
        </div>
        
        <div className="flex space-x-2">
          <button 
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            onClick={exportToCSV}
          >
            Export
          </button>
          <button 
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
            onClick={importFromCSV}
          >
            Import
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">June 2023</h1>
            <div className="flex space-x-2">
              <button className="p-2 rounded-md hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="p-2 rounded-md hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium text-gray-500 py-2">{day}</div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 30 }, (_, i) => {
              const date = `2023-06-${String(i + 1).padStart(2, '0')}`;
              const isToday = date === selectedDate;
              return (
                <div 
                  key={date}
                  className={`min-h-24 border rounded-md p-2 ${isToday ? 'bg-blue-50 border-blue-300' : 'border-gray-200'}`}
                  onClick={() => setSelectedDate(date)}
                >
                  <div className="font-medium text-gray-700">{i + 1}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {assignments.filter(a => a.date === date).length} assigned
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employee List */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Employees</h2>
            <div className="space-y-3">
              {filteredEmployees.map(employee => (
                <div 
                  key={employee.id}
                  className="flex items-center p-3 border border-gray-200 rounded-md cursor-move hover:bg-gray-50"
                  draggable
                  onDragStart={(e) => handleDragStart(e, employee)}
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                  <div className="ml-3">
                    <div className="font-medium text-gray-800">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.department}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Shift Assignments */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Shift Assignments - {selectedDate}</h2>
            
            <div className="space-y-4">
              {shifts.map(shift => (
                <div 
                  key={shift.id}
                  className="border border-gray-200 rounded-md p-4"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, shift.id)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-800">{shift.name}</h3>
                    {shift.isOvernight && (
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Overnight</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    {shift.startTime} - {shift.endTime} ({shift.isOvernight ? 'Next Day' : 'Same Day'})
                  </div>
                  
                  <div className="space-y-2">
                    {assignments
                      .filter(a => a.shiftId === shift.id && a.date === selectedDate)
                      .map(assignment => {
                        const employee = employees.find(e => e.id === assignment.employeeId);
                        return (
                          <div key={`${assignment.employeeId}-${assignment.date}`} className="flex items-center p-2 bg-gray-50 rounded">
                            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                            <div className="ml-2 text-sm text-gray-700">{employee?.name}</div>
                          </div>
                        );
                      })
                    }
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex">
                <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-medium text-yellow-800">Overlap Warning</h4>
                  <p className="text-sm text-yellow-700 mt-1">2 employees have overlapping shifts. Please review assignments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Team Capacity</h2>
          <div className="flex items-end h-32 space-x-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t" 
                  style={{ height: `${70 - index * 8}%` }}
                ></div>
                <div className="text-xs text-gray-600 mt-2">{day}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Current capacity: 85% (42/50 scheduled)</p>
          </div>
        </div>
      </div>
    </div>
  );
};