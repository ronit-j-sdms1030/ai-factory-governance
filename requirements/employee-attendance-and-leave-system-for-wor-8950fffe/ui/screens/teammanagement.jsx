// TeamManagement Screen
function TeamManagement() {
  // Mock data
  const initialTeam = [
    { id: 1, employee_id: 'E1001', first_name: 'Alice', last_name: 'Johnson', email: 'alice.johnson@example.com', department: 'Engineering', location: 'New York', phone: '555-0123' },
    { id: 2, employee_id: 'E1002', first_name: 'Bob', last_name: 'Smith', email: 'bob.smith@example.com', department: 'Engineering', location: 'San Francisco', phone: '555-0456' },
    { id: 3, employee_id: 'E1003', first_name: 'Carol', last_name: 'Lee', email: 'carol.lee@example.com', department: 'Product', location: 'Austin', phone: '555-0789' },
    { id: 4, employee_id: 'E1004', first_name: 'David', last_name: 'Kim', email: 'david.kim@example.com', department: 'Design', location: 'Remote', phone: '555-0110' },
    { id: 5, employee_id: 'E1005', first_name: 'Eve', last_name: 'Martinez', email: 'eve.martinez@example.com', department: 'Support', location: 'Chicago', phone: '555-0222' },
  ];

  const attendanceStatuses = ['present', 'late', 'half_day', 'absent', 'on_leave'];
  const statusColors = {
    present: '#28a745', // green
    late: '#dc3545',    // red
    half_day: '#fd7e14', // orange
    absent: '#6c757d', // gray
    on_leave: '#17a2b8', // cyan
  };

  // generate a week of attendance per employee (Mon-Fri)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const generateAttendance = () => {
    const records = {};
    initialTeam.forEach(emp => {
      records[emp.id] = days.map(() => {
        const status = attendanceStatuses[Math.floor(Math.random() * attendanceStatuses.length)];
        return status;
      });
    });
    return records;
  };
  const [attendance, setAttendance] = React.useState(generateAttendance());

  // Leave requests pending approval
  const [leaveQueue, setLeaveQueue] = React.useState([
    { id: 101, employee: 'Bob Smith', type: 'Annual Leave', start: '2024-09-10', end: '2024-09-12', reason: 'Family vacation', status: 'pending' },
    { id: 102, employee: 'Eve Martinez', type: 'Sick Leave', start: '2024-09-08', end: '2024-09-09', reason: 'Flu', status: 'pending' },
    { id: 103, employee: 'David Kim', type: 'Remote Work', start: '2024-09-15', end: '2024-09-15', reason: 'Home repair', status: 'pending' },
  ]);

  const [searchTerm, setSearchTerm] = React.useState('');

  // Summary metrics calculated from mock attendance
  const summary = React.useMemo(() => {
    const totals = { present: 0, late: 0, half_day: 0, absent: 0, on_leave: 0 };
    Object.values(attendance).forEach(daysArr => {
      daysArr.forEach(status => {
        totals[status]++;
      });
    });
    const totalRecords = days.length * initialTeam.length;
    return {
      totalEmployees: initialTeam.length,
      presentPct: ((totals.present / totalRecords) * 100).toFixed(1) + '%',
      latePct: ((totals.late / totalRecords) * 100).toFixed(1) + '%',
      absentPct: ((totals.absent / totalRecords) * 100).toFixed(1) + '%',
    };
  }, [attendance]);

  // Handlers
  const handleApprove = (reqId, comment) => {
    setLeaveQueue(prev => prev.map(r => r.id === reqId ? { ...r, status: 'approved', comment } : r));
    alert('Leave request #' + reqId + ' approved. Comment: ' + comment);
  };

  const handleReject = (reqId, comment) => {
    setLeaveQueue(prev => prev.map(r => r.id === reqId ? { ...r, status: 'rejected', comment } : r));
    alert('Leave request #' + reqId + ' rejected. Comment: ' + comment);
  };

  const handleExport = () => {
    // Create CSV string from attendance
    const header = ['Employee'].concat(days).join(',');
    const rows = initialTeam.map(emp => {
      const rec = attendance[emp.id].map(s => s.toUpperCase()).join(',');
      return `${emp.first_name} ${emp.last_name},${rec}`;
    });
    const csv = [header, ...rows].join('\n');
    console.log('Export CSV:\n' + csv);
    alert('Attendance data logged to console as CSV.');
  };

  // Filtered team based on search
  const filteredTeam = initialTeam.filter(emp => {
    const fullName = (emp.first_name + ' ' + emp.last_name).toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || emp.employee_id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Styles
  const palette = {
    primary: '#2C7EF5',
    secondary: '#FFB200',
    bg: '#F5F5F5',
    text: '#333',
    light: '#FFF',
    border: '#E0E0E0',
  };
  const styles = {
    container: { display: 'flex', height: '100vh', fontFamily: "Helvetica, Arial, sans-serif", color: palette.text, backgroundColor: palette.bg },
    sidebar: { width: '200px', backgroundColor: palette.primary, color: palette.light, padding: '20px' },
    main: { flexGrow: 1, overflowY: 'auto', padding: '20px' },
    header: { fontSize: '24px', marginBottom: '20px' },
    cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' },
    card: { backgroundColor: palette.light, borderRadius: '8px', padding: '15px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
    section: { marginBottom: '30px' },
    sectionHeader: { fontSize: '18px', marginBottom: '10px', color: palette.primary },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { backgroundColor: palette.primary, color: palette.light, padding: '8px', textAlign: 'left' },
    td: { borderBottom: `1px solid ${palette.border}`, padding: '8px' },
    statusBadge: (status) => ({ backgroundColor: statusColors[status], color: '#FFF', borderRadius: '4px', padding: '2px 6px', fontSize: '12px', display: 'inline-block' }),
    input: { padding: '6px', borderRadius: '4px', border: `1px solid ${palette.border}`, marginRight: '10px' },
    button: { backgroundColor: palette.secondary, color: '#FFF', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer', marginRight: '8px' },
    approveBtn: { backgroundColor: '#28a745' },
    rejectBtn: { backgroundColor: '#dc3545' },
    textarea: { width: '100%', height: '60px', marginTop: '5px', borderRadius: '4px', border: `1px solid ${palette.border}` },
    exportBtn: { backgroundColor: palette.primary, color: palette.light, padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  };

  return (
    React.createElement('div', { style: styles.container },
      // Sidebar navigation (simplified)
      React.createElement('nav', { style: styles.sidebar },
        React.createElement('h2', null, 'WorkPulse'),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0 } },
          ['Dashboard', 'Team', 'Shifts', 'Policies', 'Payroll', 'Audit Logs'].map(item =>
            React.createElement('li', { key: item, style: { margin: '12px 0' } },
              React.createElement('a', { href: '#', style: { color: palette.light, textDecoration: 'none' } }, item)
            )
          )
        )
      ),
      // Main content
      React.createElement('div', { style: styles.main },
        React.createElement('div', { style: styles.header }, 'Team Management'),
        // Search bar and export button
        React.createElement('div', { style: { marginBottom: '20px', display: 'flex', alignItems: 'center' } },
          React.createElement('input', {
            type: 'text',
            placeholder: 'Search by name or ID...',
            value: searchTerm,
            onChange: e => setSearchTerm(e.target.value),
            style: styles.input,
          }),
          React.createElement('button', { onClick: handleExport, style: styles.exportBtn }, 'Export Attendance')
        ),
        // Summary cards
        React.createElement('section', { style: styles.section },
          React.createElement('h3', { style: styles.sectionHeader }, 'Attendance Summary'),
          React.createElement('div', { style: styles.cardGrid },
            React.createElement('div', { style: styles.card },
              React.createElement('strong', null, 'Team Size'),
              React.createElement('div', { style: { fontSize: '24px', marginTop: '8px' } }, summary.totalEmployees)
            ),
            React.createElement('div', { style: styles.card },
              React.createElement('strong', null, 'Present %'),
              React.createElement('div', { style: { fontSize: '24px', marginTop: '8px', color: '#28a745' } }, summary.presentPct)
            ),
            React.createElement('div', { style: styles.card },
              React.createElement('strong', null, 'Late %'),
              React.createElement('div', { style: { fontSize: '24px', marginTop: '8px', color: '#dc3545' } }, summary.latePct)
            ),
            React.createElement('div', { style: styles.card },
              React.createElement('strong', null, 'Absent %'),
              React.createElement('div', { style: { fontSize: '24px', marginTop: '8px', color: '#6c757d' } }, summary.absentPct)
            )
          )
        ),
        // Attendance Grid
        React.createElement('section', { style: styles.section },
          React.createElement('h3', { style: styles.sectionHeader }, 'Team Attendance (Current Week)'),
          React.createElement('table', { style: styles.table },
            React.createElement('thead', null,
              React.createElement('tr', null,
                React.createElement('th', { style: styles.th }, 'Employee'),
                days.map(day => React.createElement('th', { key: day, style: styles.th }, day))
              )
            ),
            React.createElement('tbody', null,
              filteredTeam.map(emp =>
                React.createElement('tr', { key: emp.id },
                  React.createElement('td', { style: styles.td }, `${emp.first_name} ${emp.last_name}`),
                  attendance[emp.id].map((status, idx) =>
                    React.createElement('td', { key: idx, style: styles.td },
                      React.createElement('span', { style: styles.statusBadge(status) }, status.replace('_', ' '))
                    )
                  )
                )
              )
            )
          )
        ),
        // Pending Leave Approvals
        React.createElement('section', { style: styles.section },
          React.createElement('h3', { style: styles.sectionHeader }, 'Pending Leave Approvals'),
          leaveQueue.filter(r => r.status === 'pending').map(req =>
            React.createElement('div', { key: req.id, style: { ...styles.card, marginBottom: '12px' } },
              React.createElement('div', null,
                React.createElement('strong', null, req.employee), ' – ', req.type,
                React.createElement('div', null, `From ${req.start} to ${req.end}`),
                React.createElement('div', null, `Reason: ${req.reason}`)
              ),
              React.createElement('div', { style: { marginTop: '8px' } },
                React.createElement('textarea', {
                  placeholder: 'Add comment (optional)',
                  id: `comment-${req.id}`,
                  style: styles.textarea,
                })
              ),
              React.createElement('div', { style: { marginTop: '6px' } },
                React.createElement('button', {
                  style: { ...styles.button, ...styles.approveBtn },
                  onClick: () => {
                    const comment = document.getElementById(`comment-${req.id}`).value;
                    handleApprove(req.id, comment);
                  }
                }, 'Approve'),
                React.createElement('button', {
                  style: { ...styles.button, ...styles.rejectBtn },
                  onClick: () => {
                    const comment = document.getElementById(`comment-${req.id}`).value;
                    handleReject(req.id, comment);
                  }
                }, 'Reject')
              )
            )
          )
        ),
        // Direct Reports List
        React.createElement('section', { style: styles.section },
          React.createElement('h3', { style: styles.sectionHeader }, 'Direct Reports'),
          React.createElement('table', { style: styles.table },
            React.createElement('thead', null,
              React.createElement('tr', null,
                React.createElement('th', { style: styles.th }, 'Name'),
                React.createElement('th', { style: styles.th }, 'Employee ID'),
                React.createElement('th', { style: styles.th }, 'Email'),
                React.createElement('th', { style: styles.th }, 'Phone'),
                React.createElement('th', { style: styles.th }, 'Location')
              )
            ),
            React.createElement('tbody', null,
              filteredTeam.map(emp =>
                React.createElement('tr', { key: emp.id },
                  React.createElement('td', { style: styles.td }, `${emp.first_name} ${emp.last_name}`),
                  React.createElement('td', { style: styles.td }, emp.employee_id),
                  React.createElement('td', { style: styles.td }, emp.email),
                  React.createElement('td', { style: styles.td }, emp.phone),
                  React.createElement('td', { style: styles.td }, emp.location)
                )
              )
            )
          )
        )
      )
    )
  );
}