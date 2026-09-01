const ShiftRoster = () => {
  // Mock data
  const [selectedDate, setSelectedDate] = React.useState(new Date(2023, 5, 15));
  const [timezone, setTimezone] = React.useState('UTC');
  const [draggedShift, setDraggedShift] = React.useState(null);
  const [assignments, setAssignments] = React.useState([
    { id: 1, employeeId: 101, shiftId: 1, date: '2023-06-15' },
    { id: 2, employeeId: 102, shiftId: 2, date: '2023-06-15' },
    { id: 3, employeeId: 103, shiftId: 3, date: '2023-06-15' },
  ]);
  
  const shifts = [
    { id: 1, name: 'Morning Shift', startTime: '08:00', endTime: '16:00', isOvernight: false },
    { id: 2, name: 'Evening Shift', startTime: '16:00', endTime: '00:00', isOvernight: true },
    { id: 3, name: 'Night Shift', startTime: '00:00', endTime: '08:00', isOvernight: true },
  ];
  
  const employees = [
    { id: 101, name: 'Alex Johnson', department: 'Engineering' },
    { id: 102, name: 'Maria Garcia', department: 'Marketing' },
    { id: 103, name: 'James Wilson', department: 'Sales' },
  ];

  const timezones = [
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];

  const handleDragStart = (shift) => {
    setDraggedShift(shift);
  };

  const handleDrop = (employeeId, date) => {
    if (draggedShift) {
      const newAssignment = {
        id: assignments.length + 1,
        employeeId,
        shiftId: draggedShift.id,
        date: date.toISOString().split('T')[0]
      };
      setAssignments([...assignments, newAssignment]);
      setDraggedShift(null);
    }
  };

  const handleExportCSV = () => {
    alert('Exporting shift roster to CSV...');
  };

  const handleImportCSV = () => {
    alert('Importing shift roster from CSV...');
  };

  // Calendar navigation
  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    // Previous month's days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false
      });
    }
    
    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Next month's days
    const totalCells = 42; // 6 weeks
    const remaining = totalCells - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Shift Management</h2>
        
        <div className="mb-8">
          <h3 className="font-semibold text-gray-700 mb-3">Timezone</h3>
          <select 
            className="w-full p-2 border rounded-md"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            {timezones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-8">
          <h3 className="font-semibold text-gray-700 mb-3">Available Shifts</h3>
          <div className="space-y-2">
            {shifts.map(shift => (
              <div 
                key={shift.id}
                draggable
                onDragStart={() => handleDragStart(shift)}
                className={`p-3 rounded-lg cursor-move border ${
                  shift.isOvernight ? 'bg-purple-100 border-purple-300' : 'bg-blue-100 border-blue-300'
                }`}
              >
                <div className="font-medium">{shift.name}</div>
                <div className="text-sm text-gray-600">
                  {shift.startTime} - {shift.endTime}
                  {shift.isOvernight && (
                    <span className="ml-2 px-2 py-1 bg-purple-500 text-white text-xs rounded-full">
                      Overnight
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-auto space-y-3">
          <button 
            onClick={handleExportCSV}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Export CSV
          </button>
          <button 
            onClick={handleImportCSV}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Import CSV
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Shift Roster</h1>
          <p className="text-gray-600">Manage employee shift assignments</p>
        </div>
        
        {/* Calendar Header */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-between">
          <button 
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            &larr;
          </button>
          <h2 className="text-xl font-semibold">
            {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h2>
          <button 
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            &rarr;
          </button>
        </div>
        
        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Weekday Headers */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-3"></div>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center font-medium text-gray-700">
                {day}
              </div>
            ))}
          </div>
          
          {/* Employee Rows */}
          <div className="divide-y">
            {employees.map(employee => (
              <div key={employee.id} className="grid grid-cols-8">
                <div className="p-3 font-medium flex items-center">
                  <div>
                    <div>{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.department}</div>
                  </div>
                </div>
                
                {calendarDays.map((day, index) => {
                  const assignment = assignments.find(
                    a => a.employeeId === employee.id && 
                         a.date === day.date.toISOString().split('T')[0]
                  );
                  
                  const shift = assignment ? shifts.find(s => s.id === assignment.shiftId) : null;
                  
                  return (
                    <div 
                      key={index}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(employee.id, day.date)}
                      className={`p-2 min-h-[80px] border-l ${
                        day.isCurrentMonth 
                          ? 'bg-white' 
                          : 'bg-gray-50 text-gray-400'
                      } ${assignment ? 'cursor-pointer' : ''}`}
                    >
                      <div className="text-xs mb-1">
                        {day.date.getDate()}
                      </div>
                      
                      {shift && (
                        <div 
                          className={`p-2 rounded text-xs ${
                            shift.isOvernight 
                              ? 'bg-purple-500 text-white' 
                              : 'bg-blue-500 text-white'
                          }`}
                        >
                          <div className="font-medium truncate">{shift.name}</div>
                          <div>{shift.startTime}-{shift.endTime}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-6 flex items-center space-x-6 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span>Regular Shift</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-purple-500 rounded mr-2"></div>
            <span>Overnight Shift</span>
          </div>
        </div>
      </div>
    </div>
  );
};