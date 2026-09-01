function ShiftRoster() {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2024-10-15'));
  const [timezone, setTimezone] = React.useState('America/New_York');
  const [selectedShiftPattern, setSelectedShiftPattern] = React.useState(null);
  const [draggedEmployee, setDraggedEmployee] = React.useState(null);
  const [assignments, setAssignments] = React.useState([
    { employeeId: 101, shiftId: 'morning', date: '2024-10-15' },
    { employeeId:17, shiftId: 'night', date: '2024-10-15' },
    { employeeId: 102, shiftId: 'morning', date: '2024-10-16' },
    { employeeId: 103, shiftId: 'afternoon', date: '2024-10-16' },
    { employeeId: 104, shiftId: 'flexible', date: '2024-10-17' },
    { employeeId: 105, shiftId: 'night', date: '2024-10-17' },
  ]);
  const [validationWarnings, setValidationWarnings] = React.useState([
    { employeeId: 105, date: '2024-10-18', message: 'Consecutive night shifts exceed policy limit' },
    { employeeId: 103, date: '2024-10-17', message: 'Overlap with existing leave request' }
  ]);

  const shifts = [
    { id: 'morning', name: 'Morning Shift', startTime: '07:00', endTime: '15:00', color: '#3B82F6', isOvernight: false, timezone: 'America/New_York' },
    { id: 'afternoon', name: 'Afternoon Shift', startTime: '15:00', endTime: '23:00', color: '#10B981', isOvernight: false, timezone: 'America/New_York' },
    { id: 'night', name: 'Night Shift', startTime: '23:00', endTime: '07:00', color: '#8B5CF6', isOvernight: true, timezone: 'America/New_York' },
    { id: 'flexible', name: 'Flexible Hours', startTime: '09:00-12:00', endTime: '17:00-to-flex', color: '#F59E0B', isOvernight: false, timezone: 'America/New_York' },
    { id: 'remote', name: 'Remote Timezone', startTime: '10:00', endTime: '18:00', color: '#EF4444', isOvernight: false, timezone: 'America/Los_Angeles' }
  ];

  const employees = [
    { id: 101, employeeId: 'EMP-2101', name: 'Alex Johnson', department: 'Operations', location: 'NY Office', timezone: 'America/New_York' },
    { id: 102, employeeId: 'EMP-2102', name: 'Maria Rodriguez', department: 'Engineering', location: 'Remote', timezone: 'America/Chicago' },
    { id: 103, employeeId: 'EMP-2103', name: 'David Chen', department: 'Sales', location: 'SF Office', timezone: 'America/Los_Angeles' },
    { id: 104, employeeId: 'EMP-2104', name: 'Sarah Williams', department: 'Customer Support', location: 'Remote', timezone: 'America/New_York' },
    { id: 105, employeeId: 'EMP-2105', name: 'Michael Brown', department: 'Operations', location: 'NY Office', timezone: 'America/New_York' },
    { id: 106, employeeId: 'EMP-2106', name: 'Jessica Taylor', department: 'Engineering', location: 'Remote', timezone: 'America/Denver' },
    { id: 107, employeeId: 'EMP-2107', name: 'Robert Kim', department: 'Sales', location: 'NY Office', timezone: 'America/New_York' }
  ];

  const shiftPatterns = [
    { id: 'pattern-1', name: 'Weekday Rotation', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], shifts: ['morning', 'morning', 'morning', 'afternoon', 'flexible'] },
    { id: 'pattern-2', name: 'Night Rotation', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], shifts: ['night', 'night', 'night', 'night', 'off'] },
    { id: 'pattern-3', name: 'Remote Schedule', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], shifts: ['remote', 'remote', 'remote', 'remote', 'remote'] }
  ];

  const weekDays = [
    { date: '2024-10-14', day: 'Mon', display: 'Oct 14' },
    { date: '2024-10-15', day: 'Tue', display: 'Oct 15' },
    { date: '2024-10-16', day: 'Wed', display: 'Oct 16' },
    { date: '2024-10-17', day: 'Thu', display: 'Oct 17' },
    { date: '2024-10-18', day: 'Fri', display: 'Oct 18' },
    { date: '2024.10-19', day: 'Sat', display: 'Oct 19' },
    { date: '2024-10-20', day: 'Sun', display: 'Oct 20' }
  ];

  const handleDragStart = (employee) => {
    setDraggedEmployee(employee);
  };

  const handleDrop = (date, employeeId) => {
    if (draggedEmployee) {
      const shiftId = document.getElementById(`shift-dropdown-${employeeId}`)?.value || 'morning';
      const newAssignment = { employeeId: draggedEmployee.id, shiftId, date };
      
      // Check for overlaps
      const existing = assignments.find(a => a.employeeId === draggedEmployee.id && a.date === date);
      if (existing) {
        setValidationWarnings(prev => [...prev, {
          employeeId: draggedEmployee.id,
          date,
          message: `Shift assignment already exists for ${draggedEmployee.name}`
        }]);
        return;
      }
      
      setAssignments(prev => [...prev, newAssignment]);
      setDraggedEmployee(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveAssignment = (employeeId, date) => {
    setAssignments(prev => prev.filter(a => !(a.employeeId === employeeId && a.date === date)));
  };

  const handleBulkExport = () => {
    alert('CSV export started for October 15-20, 2024 roster. File will download shortly.');
  };

  const handleBulkImport = () => {
    alert('CSV import dialog opened. Select a file to upload shift assignments.');
  };

  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
    alert(`Timezone changed to ${e.target.value}. All shift times will be displayed in this timezone.`);
  };

  const handleSavePattern = () => {
    if (selectedShiftPattern) {
      alert(`Shift pattern "${selectedShiftPattern.name}" saved and applied to selected employees.`);
    } else {
      alert('Please select a shift pattern first.');
    }
  };

  const getAssignmentForDay = (employeeId, date) => {
    return assignments.find(a => a.employeeId === employeeId && a.date === date);
  };

  const getShiftById = (shiftId) => {
    return shifts.find(s => s.id === shiftId);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Shift Roster Management</h1>
        <div style={styles.headerActions}>
          <button style={styles.exportButton} onClick={handleBulkExport}>
            Export CSV
          </button>
          <button style={styles.importButton} onClick={handleBulkImport}>
            Import CSV
          </button>
        </div>
      </header>

      <div style={styles.content}>
        <aside style={styles.sidebar}>
          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}>Timezone Settings</h3>
            <div style={styles.timezoneSelector}>
              <label style={styles.label}>Display Timezone:</label>
              <select 
                style={styles.select} 
                value={timezone} 
                onChange={handleTimezoneChange}
              >
                <option value="America/New_York">Eastern Time (New York)</option>
                <option value="America/Chicago">Central Time (Chicago)</option>
                <option value="America/Denver">Mountain Time (Denver)</option>
                <option value="America/Los_Angeles">Pacific Time (Los Angeles)</option>
                <option value="Europe/London">GMT (London)</option>
                <option value="Asia/Singapore">Singapore Time</option>
              </select>
            </div>
          </div>

          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}>Shift Legend</h3>
            <div style={styles.legend}>
              {shifts.map(shift => (
                <div key={shift.id} style={styles.legendItem}>
                  <div style={{...styles.legendColor, backgroundColor: shift.color}}></div>
                  <div style={styles.legendText}>
                    <strong>{shift.name}</strong>
                    <small>{shift.startTime} - {shift.endTime} {shift.isOvernight ? '🌙' : ''}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.sidebarSection}>
            <h3 style={styles.sidebarTitle}>Shift Patterns</h3>
            <div style={styles.patterns}>
              {shiftPatterns.map(pattern => (
                <div 
                  key={pattern.id} 
                  style={{
                    ...styles.patternCard,
                    ...(selectedShiftPattern?.id === pattern.id ? styles.selectedPattern : {})
                  }}
                  onClick={() => setSelectedShiftPattern(pattern)}
                >
                  <h4 style={styles.patternName}>{pattern.name}</h4>
                  <div style={styles.patternDays}>
                    {pattern.days.map((day, idx) => (
                      <span key={idx} style={styles.patternDay}>
                        {day}: {pattern.shifts[idx] || 'off'}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button style={styles.applyPatternButton} onClick={handleSavePattern}>
              Apply Selected Pattern
            </button>
          </div>
        </aside>

        <main style={styles.main}>
          <div style={styles.calendarHeader}>
            <h2 style={styles.calendarTitle}>October 2024 - Week 42</h2>
            <div style={styles.calendarControls}>
              <button style={styles.navButton}>← Previous Week</button>
              <button style={styles.navButton}>Next Week →</button>
            </div>
          </div>

          {validationWarnings.length > 0 && (
            <div style={styles.warnings}>
              <h4 style={styles.warningsTitle}>Validation Warnings</h4>
              {validationWarnings.map((warning, idx) => (
                <div key={idx} style={styles.warning}>
                  ⚠️ {warning.message} for EMP-{warning.employeeId} on {warning.date}
                </div>
              ))}
            </div>
          )}

          <div style={styles.calendarGrid}>
            <div style={styles.employeeList}>
              <div style={styles.employeeListHeader}>
                <h4 style={styles.employeeListTitle}>Employees</h4>
                <small>Drag to assign</small>
              </div>
              {employees.map(employee => (
                <div 
                  key={employee.id}
                  style={styles.employeeCard}
                  draggable="true"
                  onDragStart={() => handleDragStart(employee)}
                >
                  <div style={styles.employeeInfo}>
                    <strong>{employee.name}</strong>
                    <small>{employee.department} • {employee.location}</small>
                  </div>
                  <div style={styles.employeeId}>{employee.employeeId}</div>
                </div>
              ))}
            </div>

            {weekDays.map(day => (
              <div key={day.date} style={styles.dayColumn}>
                <div style={styles.dayHeader}>
                  <strong>{day.day}</strong>
                  <small>{day.display}</small>
                </div>
                {employees.map(employee => {
                  const assignment = getAssignmentForDay(employee.id, day.date);
                  const shift = assignment ? getShiftById(assignment.shiftId) : null;
                  
                  return (
                    <div 
                      key={`${employee.id}-${day.date}`}
                      style={{
                        ...styles.shiftCell,
                        ...(assignment ? { backgroundColor: shift?.color + '20', borderLeft: `4px solid ${shift?.color}` } : {})
                      }}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(day.date, employee.id)}
                    >
                      {assignment ? (
                        <div style={styles.assignedShift}>
                          <div style={styles.shiftName}>{shift?.name}</div>
                          <div style={styles.shiftTime}>{shift?.startTime} - {shift?.endTime}</div>
                          <button 
                            style={styles.removeButton}
                            onClick={() => handleRemoveAssignment(employee.id, day.date)}
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div style={styles.emptyCell}>
                          <select 
                            id={`shift-dropdown-${employee.id}`}
                            style={styles.shiftSelect}
                            defaultValue="morning"
                          >
                            {shifts.map(s => (
                              <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                          </select>
                          <small style={styles.dropHint}>Drop here</small>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div style={styles.stats}>
            <div style={styles.statCard}>
              <h4>Total Assigned Shifts</h4>
              <div style={styles.statNumber}>{assignments.length}</div>
            </div>
            <div style={styles.statCard}>
              <h4>Coverage This Week</h4>
              <div style={styles.statNumber}>94%</div>
            </div>
            <div style={styles.statCard}>
              <h4>Night Shifts</h4>
              <div style={styles.statNumber}>12</div>
            </div>
            <div style={styles.statCard}>
              <h4>Pending Changes</h4>
              <div style={styles.statNumber}>3</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    padding: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #e2e8f0'
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0
  },
  headerActions: {
    display: 'flex',
    gap: '12px'
  },
  exportButton: {
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px'
  },
  importButton: {
    backgroundColor: 'white',
    color: '#3B82F6',
    border: '1px solid #3B82F6',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px'
  },
  content: {
    display: 'flex',
    gap: '30px'
  },
  sidebar: {
    width: '320px',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 .px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  },
  sidebarSection: {
    marginBottom: '30px'
  },
  sidebarTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '16px',
    paddingBottom: '10px',
    borderBottom: '1px solid #f1f5f9'
  },
  timezoneSelector: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '8px'
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'white'
  },
  legend: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  legendColor: {
    width: '16px',
    height: '16px',
    borderRadius: '4px'
  },
  legendText: {
    display: 'flex',
    flexDirection: 'column'
  },
  patterns: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  patternCard: {
    padding: '12px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  selectedPattern: {
    borderColor: '#3B82F6',
    backgroundColor: '#eff6ff'
  },
  patternName: {
    fontSize: '14px',
    fontWeight: '600',
    margin: '0 0 8px 0',
    color: '#1e293b'
  },
  patternDays: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  patternDay: {
    fontSize: '12px',
    color: '#64748b'
  },
  applyPatternButton: {
    width: '100%',
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    marginTop: '16px'
  },
  main: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0'
  },
  calendarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  calendarTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
    margin: 0
  },
  calendarControls: {
    display: 'flex',
    gap: '12px'
  },
  navButton: {
    backgroundColor: 'white',
    color: '#64748b',
    border: '1px solid #cbd5e1',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  warnings: {
    backgroundColor: '#fef3c7',
    border: '1px solid #f59e0b',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '24px'
  },
  warningsTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#92400e',
    margin: '0 0马力 8px 0'
  },
  warning: {
    fontSize: '13px',
    color: '#92400e',
    padding: '6px 0'
  },
  calendarGrid: {
    display: 'flex',
    gap: '2px',
    marginBottom: '30px'
  },
  employeeList: {
    width: '220px'
  },
  employeeListHeader: {
    padding: '12px',
    backgroundColor: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: '6px 6px 0 0'
  },
  employeeListTitle: {
    fontSize: '14px',
    fontWeight: '600',
    margin: '0 0 4px 0',
    color: '#1e293b'
  },
  employeeCard: {
    padding: '12px',
    border: '1px solid #e2e8f0',
    borderTop: 'none',
    cursor: 'grab',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  employeeInfo: {
    display: 'flex',
    flexDirection: 'column'
  },
  employeeId: {
    fontSize: '12px',
    color: '#64748b',
    fontWeight: '600'
  },
  dayColumn: {
    flex: 1
  },
  dayHeader: {
    padding: '12px',
    backgroundColor: '#f1f5f9',
    border: '1px solid #e2e8f0',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '6px 6px 0 0'
  },
  shiftCell: {
    minHeight: '70px',
    padding: '8px',
    border: '1px solid #e2e8f0',
    borderTop: 'none',
    transition: 'all 0.2s'
  },
  assignedShift: {
    position: 'relative'
  },
  shiftName: {
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '2px'
  },
  shiftTime: {
    fontSize: '11px',
    color: '#64748b'
  },
  removeButton: {
    position: 'absolute',
    top: '0',
    right: '0',
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0',
    width: '20px',
    height: '20px'
  },
  emptyCell: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    minHeight: '54px'
  },
  shiftSelect: {
    width: '100%',
    padding: '6px',
    border: '1px solid #cbd5e1',
    borderRadius: '4px',
    fontSize: '12px',
    marginBottom: '4px'
  },
  dropHint: {
    fontSize: '11px',
    color: '#94a3b8',
    textAlign: 'center'
  },
  stats: {
    display: 'flex',
    gap: '20px',
    marginTop: '30px'
  },
  statCard: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '600',
    color: '#3B82F6',
    marginTop: '8px'
  }
};