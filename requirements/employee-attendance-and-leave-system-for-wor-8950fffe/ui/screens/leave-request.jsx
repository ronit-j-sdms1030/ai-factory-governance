function LeaveRequestScreen() {
  // Mock data
  const employeeId = 1;
  const employeeName = 'Alex Johnson';

  const leaveTypes = [
    { id: 1, name: 'Annual Leave', code: 'AL', is_paid: true, max_days_per_year: 25, accrual_policy: 'monthly', carry_over_limit: 5, requires_medical_certificate: false },
    { id: 2, name: 'Sick Leave', code: 'SL', is_paid: true, max_days_per_year: 12, accrual_policy: 'none', carry_over_limit: 0, requires_medical_certificate: true },
    { id: 3, name: 'Unpaid Leave', code: 'UL', is_paid: false, max_days_per_year: 365, accrual_policy: 'none', carry_over_limit: 0, requires_medical_certificate: false },
  ];

  const holidays = [
    { id: 1, name: 'Independence Day', date: '2024-07-04', location_id: 1 },
    { id: 2, name: 'Labor Day', date: '2024-09-02', location_id: 1 },
  ];

  const existingLeaveRequests = [
    { id: 101, employee_id: 1, leave_type_id: 1, start_date: '2024-08-12', end_date: '2024-08-15', reason: 'Family vacation', status: 'approved' },
    { id: 102, employee_id: 1, leave_type_id: 2, start_date: '2024-03-20', end_date: '2024-03-22', reason: 'Flu', status: 'approved' },
  ];

  const leaveBalances = [
    { id: 201, employee_id: 1, leave_type_id: 1, balance_days: 18, accrued_this_year: 25, used_this_year: 7, carry_over_from_previous: 0, fiscal_year: 2024 },
    { id: 202, employee_id: 1, leave_type_id: 2, balance_days: 5, accrued_this_year: 12, used_this_year: 7, carry_over_from_previous: 0, fiscal_year: 2024 },
    { id: 203, employee_id: 1, leave_type_id: 3, balance_days: 365, accrued_this_year: 365, used_this_year: 0, carry_over_from_previous: 0, fiscal_year: 2024 },
  ];

  // Component state
  const [selectedLeaveTypeId, setSelectedLeaveTypeId] = React.useState(leaveTypes[0].id);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [reason, setReason] = React.useState('');
  const [validationMsg, setValidationMsg] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');
  const [requests, setRequests] = React.useState(existingLeaveRequests);
  const [balances, setBalances] = React.useState(leaveBalances);

  // Helpers
  const daysBetween = (start, end) => {
    const msPerDay = 24 * 60 * 60 * 1000;
    const s = new Date(start);
    const e = new Date(end);
    return Math.round((e - s) / msPerDay) + 1; // inclusive
  };

  const isHoliday = (dateStr) => holidays.some(h => h.date === dateStr);

  const overlapsExisting = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    return requests.some(r => {
      if (r.employee_id !== employeeId) return false;
      const rs = new Date(r.start_date);
      const re = new Date(r.end_date);
      return s <= re && e >= rs; // overlap
    });
  };

  const selectedLeaveType = leaveTypes.find(t => t.id === selectedLeaveTypeId);
  const selectedBalance = balances.find(b => b.leave_type_id === selectedLeaveTypeId);
  const requestedDays = startDate && endDate ? daysBetween(startDate, endDate) : 0;
  const remainingBalance = selectedBalance ? selectedBalance.balance_days - requestedDays : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationMsg('');
    setSuccessMsg('');
    if (!reason.trim()) {
      setValidationMsg('Reason is required.');
      return;
    }
    if (!startDate || !endDate) {
      setValidationMsg('Please select both start and end dates.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setValidationMsg('Start date cannot be after end date.');
      return;
    }
    // Check holidays within range
    let date = new Date(startDate);
    const end = new Date(endDate);
    while (date <= end) {
      const iso = date.toISOString().split('T')[0];
      if (isHoliday(iso)) {
        setValidationMsg(`Selected range includes holiday ${iso}. Please adjust dates.`);
        return;
      }
      date.setDate(date.getDate() + 1);
    }
    // Overlap check
    if (overlapsExisting(startDate, endDate)) {
      setValidationMsg('Selected dates overlap with an existing approved leave.');
      return;
    }
    // Balance check (only for paid leaves)
    if (selectedLeaveType.is_paid && requestedDays > selectedBalance.balance_days) {
      setValidationMsg(`Requested ${requestedDays} days exceeds remaining balance of ${selectedBalance.balance_days} days.`);
      return;
    }
    // Create new request
    const newReq = {
      id: Math.max(...requests.map(r => r.id)) + 1,
      employee_id: employeeId,
      leave_type_id: selectedLeaveTypeId,
      start_date: startDate,
      end_date: endDate,
      reason: reason.trim(),
      status: 'pending',
    };
    setRequests([...requests, newReq]);
    // Update balance if paid
    if (selectedLeaveType.is_paid) {
      setBalances(balances.map(b => {
        if (b.leave_type_id === selectedLeaveTypeId) {
          return { ...b, balance_days: b.balance_days - requestedDays, used_this_year: b.used_this_year + requestedDays };
        }
        return b;
      }));
    }
    setSuccessMsg('Leave request submitted successfully and is now pending approval.');
    // Reset form
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  const handleCancel = () => {
    setStartDate('');
    setEndDate('');
    setReason('');
    setValidationMsg('');
    setSuccessMsg('');
  };

  // UI Styles
  const palette = {
    primary: '#2A6F97',
    secondary: '#5C9EAD',
    accent: '#F2A71B',
    bg: '#F4F7FA',
    text: '#333',
    border: '#DDD',
  };

  const containerStyle = { display: 'flex', minHeight: '100vh', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" };
  const sidebarStyle = { width: '220px', background: palette.primary, color: '#fff', padding: '20px' };
  const navItemStyle = { marginBottom: '15px', cursor: 'pointer' };
  const contentStyle = { flex: 1, background: palette.bg, padding: '30px' };
  const cardStyle = { background: '#fff', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', padding: '25px', maxWidth: '600px' };
  const labelStyle = { display: 'block', marginBottom: '6px', fontWeight: '600', color: palette.text };
  const inputStyle = { width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${palette.border}`, marginBottom: '15px', fontSize: '14px' };
  const textareaStyle = { ...inputStyle, height: '80px', resize: 'vertical' };
  const buttonStyle = (bg) => ({ background: bg, color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', marginRight: '10px' });
  const errorStyle = { color: '#D9534F', marginBottom: '10px' };
  const successStyle = { color: '#5CB85C', marginBottom: '10px' };
  const noticeStyle = { background: palette.secondary, color: '#fff', padding: '10px', borderRadius: '4px', marginTop: '20px' };

  return (
    React.createElement('div', { style: containerStyle },
      React.createElement('aside', { style: sidebarStyle },
        React.createElement('h2', { style: { marginTop: 0 } }, 'WorkPulse'),
        React.createElement('nav', null,
          React.createElement('div', { style: navItemStyle }, 'Dashboard'),
          React.createElement('div', { style: navItemStyle }, 'Attendance'),
          React.createElement('div', { style: navItemStyle }, 'Leave Request'),
          React.createElement('div', { style: navItemStyle }, 'Leave Approvals'),
          React.createElement('div', { style: navItemStyle }, 'Shift Roster'),
          React.createElement('div', { style: navItemStyle }, 'Policies'),
          React.createElement('div', { style: navItemStyle }, 'Payroll'),
          React.createElement('div', { style: navItemStyle }, 'Audit Trail')
        )
      ),
      React.createElement('main', { style: contentStyle },
        React.createElement('h1', { style: { color: palette.text } }, 'New Leave Request'),
        React.createElement('p', null, `Employee: ${employeeName}`),
        validationMsg && React.createElement('div', { style: errorStyle }, validationMsg),
        successMsg && React.createElement('div', { style: successStyle }, successMsg),
        React.createElement('form', { onSubmit: handleSubmit, style: cardStyle },
          // Leave Type
          React.createElement('label', { style: labelStyle, htmlFor: 'leaveType' }, 'Leave Type'),
          React.createElement('select', {
            id: 'leaveType',
            style: inputStyle,
            value: selectedLeaveTypeId,
            onChange: e => setSelectedLeaveTypeId(parseInt(e.target.value))
          },
            leaveTypes.map(t =>
              React.createElement('option', { key: t.id, value: t.id }, `${t.name} (${t.code})`)
            )
          ),
          // Date Range
          React.createElement('label', { style: labelStyle, htmlFor: 'startDate' }, 'Start Date'),
          React.createElement('input', {
            type: 'date',
            id: 'startDate',
            style: inputStyle,
            value: startDate,
            onChange: e => setStartDate(e.target.value)
          }),
          React.createElement('label', { style: labelStyle, htmlFor: 'endDate' }, 'End Date'),
          React.createElement('input', {
            type: 'date',
            id: 'endDate',
            style: inputStyle,
            value: endDate,
            onChange: e => setEndDate(e.target.value)
          }),
          // Balance display
          React.createElement('div', { style: { marginBottom: '15px' } },
            React.createElement('strong', null, 'Remaining Balance: '),
            selectedLeaveType.is_paid ? `${remainingBalance} days` : 'N/A (unpaid)'
          ),
          // Reason
          React.createElement('label', { style: labelStyle, htmlFor: 'reason' }, 'Reason'),
          React.createElement('textarea', {
            id: 'reason',
            style: textareaStyle,
            value: reason,
            onChange: e => setReason(e.target.value),
            placeholder: 'Provide a brief reason for the leave...'
          }),
          // Buttons
          React.createElement('div', null,
            React.createElement('button', { type: 'submit', style: buttonStyle(palette.accent) }, 'Submit'),
            React.createElement('button', { type: 'button', style: buttonStyle(palette.border), onClick: handleCancel }, 'Cancel')
          ),
          // Policy notice
          React.createElement('div', { style: noticeStyle },
            React.createElement('p', null, React.createElement('strong', null, 'Accrual Policy: '), selectedLeaveType.accrual_policy),
            React.createElement('p', null, React.createElement('strong', null, 'Maximum per year: '), `${selectedLeaveType.max_days_per_year} days`)
          )
        )
      )
    )
  );
}