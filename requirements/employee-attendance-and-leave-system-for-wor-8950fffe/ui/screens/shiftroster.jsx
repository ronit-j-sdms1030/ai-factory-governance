function ShiftRoster() {
  // Mock data
  const employees = [
    { id: 1, name: 'Alex Morgan', department: 'Engineering', timezone: 'America/New_York' },
    { id: 2, name: 'Taylor Kim', department: 'Sales', timezone: 'Asia/Seoul' },
    { id: 3, name: 'Jordan Smith', department: 'Support', timezone: 'Europe/London' },
    { id: 4, name: 'Casey Johnson', department: 'HR', timezone: 'America/Chicago' },
    { id: 5, name: 'Riley Chen', department: 'Finance', timezone: 'Asia/Shanghai' }
  ];

  const shifts = [
    { id: 1, name: 'Morning Shift', start: '08:00', end: '16:00', type: 'fixed' },
    { id: 2, name: 'Night Shift', start: '22:00', end: '06:00', type: 'night' },
    { id: 3, name: 'Flexible Core', start: '10:00', end: '18:00', type: 'flexible' },
    { id: 4, name: 'Rotating A', start: '07:00', end: '19:00', type: 'rotating' }
  ];

  const assignments = [
    { employeeId: 1, shiftId: 1, date: '2023-06-15' },
    { employeeId: 2, shiftId: 2, date: '2023-06-15' },
    { employeeId: 3, shiftId: 3, date: '2023-06-15' }
  ];

  const timezones = [
    'America/New_York',
    'America/Chicago',
    'Europe/London',
    'Asia/Shanghai',
    'Asia/Seoul'
  ];

  // State
  const [selectedDate, setSelectedDate] = React.useState('2023-06-15');
  const [selectedTimezone, setSelectedTimezone] = React.useState('UTC');
  const [draggedShift, setDraggedShift] = React.useState(null);
  const [bulkAssignMode, setBulkAssignMode] = React.useState(false);
  const [selectedEmployees, setSelectedEmployees] = React.useState([]);

  // Handlers
  const handleDragStart = (shift) => {
    setDraggedShift(shift);
  };

  const handleDrop = (employeeId, date) => {
    if (draggedShift) {
      console.log(`Assigned shift ${draggedShift.name} to employee ${employeeId} on ${date}`);
      // In a real app, this would update the assignments state
      setDraggedShift(null);
    }
  };

  const handleEmployeeSelect = (employeeId) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleBulkAssign = () => {
    if (draggedShift && selectedEmployees.length > 0) {
      console.log(`Bulk assigned ${draggedShift.name} to ${selectedEmployees.length} employees`);
      setSelectedEmployees([]);
      setBulkAssignMode(false);
      setDraggedShift(null);
    }
  };

  // Render helpers
  const renderCalendarDay = (date) => {
    return (
      <div className="calendar-day">
        <div className="day-header">{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
        {employees.map(employee => {
          const assignment = assignments.find(a => 
            a.employeeId === employee.id && a.date === date
          );
          
          const shift = assignment 
            ? shifts.find(s => s.id === assignment.shiftId)
            : null;
          
          return (
            <div 
              key={`${employee.id}-${date}`}
              className={`assignment-cell ${shift?.type === 'night' ? 'overnight' : ''}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(employee.id, date)}
            >
              {shift ? (
                <div className="shift-assigned">
                  <span className="shift-name">{shift.name}</span>
                  <span className="shift-time">{shift.start} - {shift.end}</span>
                </div>
              ) : (
                <div className="unassigned">Unassigned</div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="shift-roster-container">
      <style>{`
        .shift-roster-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background-color: #f8fafc;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .header {
          background: linear-gradient(135deg, #1e3a8a, #3b82f6);
          color: white;
          padding: 1rem 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .header h1 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 600;
        }
        
        .controls {
          display: flex;
          justify-content: space-between;
          padding: 1rem 2rem;
          background-color: white;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .control-group {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        
        .timezone-selector, .date-selector {
          padding: 0.5rem;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          background-color: white;
        }
        
        .shift-patterns {
          display: flex;
          gap: 1rem;
          padding: 1rem 2rem;
          background-color: #f1f5f9;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .shift-pattern {
          padding: 0.5rem 1rem;
          background-color: white;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .shift-pattern:hover {
          background-color: #e2e8f0;
        }
        
        .shift-pattern.active {
          background-color: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }
        
        .main-content {
          display: flex;
          flex: 1;
          overflow: hidden;
        }
        
        .shift-library {
          width: 250px;
          padding: 1.5rem;
          background-color: white;
          border-right: 1px solid #e2e8f0;
          overflow-y: auto;
        }
        
        .shift-item {
          padding: 1rem;
          margin-bottom: 1rem;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          cursor: grab;
          transition: all 0.2s;
        }
        
        .shift-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        
        .shift-item.night {
          border-left: 4px solid #8b5cf6;
        }
        
        .shift-item.flexible {
          border-left: 4px solid #10b981;
        }
        
        .shift-item.fixed {
          border-left: 4px solid #3b82f6;
        }
        
        .shift-item.rotating {
          border-left: 4px solid #f59e0b;
        }
        
        .shift-name {
          font-weight: 600;
          margin-bottom: 0.25rem;
          display: block;
        }
        
        .shift-time {
          font-size: 0.85rem;
          color: #64748b;
        }
        
        .calendar-container {
          flex: 1;
          padding: 1.5rem;
          overflow-y: auto;
        }
        
        .calendar-header {
          display: flex;
          margin-bottom: 1rem;
          padding-left: 150px;
        }
        
        .calendar-day {
          display: flex;
          flex-direction: column;
          min-width: 180px;
          margin-right: 1rem;
        }
        
        .day-header {
          padding: 0.75rem;
          background-color: #e2e8f0;
          font-weight: 600;
          text-align: center;
          border-radius: 4px 4px 0 0;
        }
        
        .assignment-cell {
          flex: 1;
          min-height: 80px;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-top: none;
          background-color: white;
          transition: all 0.2s;
        }
        
        .assignment-cell:hover {
          background-color: #f1f5f9;
        }
        
        .assignment-cell.overnight {
          background-color: #f5f3ff;
        }
        
        .shift-assigned {
          display: flex;
          flex-direction: column;
        }
        
        .unassigned {
          color: #94a3b8;
          font-style: italic;
        }
        
        .employee-header {
          position: sticky;
          left: 0;
          background-color: white;
          z-index: 10;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          min-width: 150px;
          font-weight: 600;
        }
        
        .employee-row {
          display: flex;
          margin-bottom: 1rem;
        }
        
        .employee-name {
          padding: 0.75rem;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          min-width: 150px;
          font-weight: 500;
        }
        
        .bulk-actions {
          display: flex;
          gap: 1rem;
          padding: 1rem 2rem;
          background-color: white;
          border-top: 1px solid #e2e8f0;
        }
        
        .btn {
          padding: 0.5rem 1rem;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .btn-primary {
          background-color: #3b82f6;
          color: white;
        }
        
        .btn-primary:hover {
          background-color: #2563eb;
        }
        
        .btn-secondary {
          background-color: #e2e8f0;
          color: #1e293b;
        }
        
        .btn-secondary:hover {
          background-color: #cbd5e1;
        }
        
        .btn-success {
          background-color: #10b981;
          color: white;
        }
        
        .btn-success:hover {
          background-color: #059669;
        }
        
        .validation-warning {
          padding: 0.75rem;
          background-color: #fffbeb;
          border: 1px solid #fbbf24;
          border-radius: 4px;
          margin: 1rem 2rem;
          color: #92400e;
          display: flex;
          align-items: center;
        }
        
        .warning-icon {
          margin-right: 0.75rem;
          font-size: 1.2rem;
        }
      `}</style>
      
      <div className="header">
        <h1>Shift Roster Management</h1>
      </div>
      
      <div className="controls">
        <div className="control-group">
          <button 
            className={`btn ${bulkAssignMode ? 'btn-success' : 'btn-primary'}`}
            onClick={() => setBulkAssignMode(!bulkAssignMode)}
          >
            {bulkAssignMode ? 'Cancel Bulk Assign' : 'Bulk Assign Mode'}
          </button>
          
          {bulkAssignMode && (
            <button 
              className="btn btn-primary"
              onClick={handleBulkAssign}
              disabled={!draggedShift || selectedEmployees.length === 0}
            >
              Assign to Selected
            </button>
          )}
          
          <button className="btn btn-secondary">Import CSV</button>
          <button className="btn btn-secondary">Export CSV</button>
        </div>
        
        <div className="control-group">
          <select 
            className="timezone-selector"
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
          >
            {timezones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
          
          <input 
            type="date" 
            className="date-selector"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>
      
      <div className="shift-patterns">
        <div className="shift-pattern active">Fixed Shifts</div>
        <div className="shift-pattern">Flexible Shifts</div>
        <div className="shift-pattern">Night Shifts</div>
        <div className="shift-pattern">Rotating Patterns</div>
      </div>
      
      <div className="validation-warning">
        <span className="warning-icon">⚠️</span>
        <span>Warning: 2 overlapping shift assignments detected for June 15, 2023. Please review.</span>
      </div>
      
      <div className="main-content">
        <div className="shift-library">
          <h3>Shift Library</h3>
          {shifts.map(shift => (
            <div 
              key={shift.id}
              className={`shift-item ${shift.type}`}
              draggable
              onDragStart={() => handleDragStart(shift)}
            >
              <span className="shift-name">{shift.name}</span>
              <span className="shift-time">{shift.start} - {shift.end}</span>
              {shift.type === 'night' && (
                <div style={{fontSize: '0.75rem', marginTop: '0.25rem', color: '#8b5cf6'}}>🌙 Overnight Shift</div>
              )}
            </div>
          ))}
        </div>
        
        <div className="calendar-container">
          <div className="calendar-header">
            <div className="employee-header">Employee</div>
            {renderCalendarDay(selectedDate)}
          </div>
          
          {employees.map(employee => (
            <div key={employee.id} className="employee-row">
              <div className="employee-name">
                <div>{employee.name}</div>
                <div style={{fontSize: '0.8rem', color: '#64748b'}}>{employee.department}</div>
              </div>
              <div 
                className="assignment-cell"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(employee.id, selectedDate)}
                onClick={() => bulkAssignMode && handleEmployeeSelect(employee.id)}
                style={{
                  backgroundColor: bulkAssignMode && selectedEmployees.includes(employee.id) 
                    ? '#dbeafe' 
                    : undefined
                }}
              >
                {(() => {
                  const assignment = assignments.find(a => 
                    a.employeeId === employee.id && a.date === selectedDate
                  );
                  
                  const shift = assignment 
                    ? shifts.find(s => s.id === assignment.shiftId)
                    : null;
                  
                  return shift ? (
                    <div className="shift-assigned">
                      <span className="shift-name">{shift.name}</span>
                      <span className="shift-time">{shift.start} - {shift.end}</span>
                      {shift.type === 'night' && (
                        <div style={{fontSize: '0.75rem', marginTop: '0.25rem', color: '#8b5cf6'}}>🌙 Overnight</div>
                      )}
                    </div>
                  ) : (
                    <div className="unassigned">Unassigned</div>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bulk-actions">
        <div>
          <strong>Effective Date Range:</strong>
          <input type="date" defaultValue="2023-06-15" style={{margin: '0 0.5rem'}} />
          to
          <input type="date" defaultValue="2023-06-30" style={{margin: '0 0.5rem'}} />
        </div>
      </div>
    </div>
  );
}