function RequestLeave() {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [selectedLeaveType, setSelectedLeaveType] = React.useState(null);
  const [reason, setReason] = React.useState('');
  const [submitted, setSubmitted] = React.useState([]);
  const [message, setMessage] = React.useState('');

  // Mock data
  const holidays = [
    { date: '2024-12-25', name: 'Christmas Day' },
    { date: '2024-01-01', name: 'New Year\'s Day' },
    { date: '2024-07-04', name: 'Independence Day' },
  ];

  const existingLeaves = [
    { start: '2024-09-10', end: '2024-09-12', type: 'Annual Leave' },
    { start: '2024-10-15', end: '2024-10-16', type: 'Sick Leave' },
  ];

  const leaveTypes = [
    { id: 1, name: 'Annual Leave', code: 'AL', balance: 15, maxDays: 30, requiresMedical: false, accrual: 'Monthly' },
    { id: 2, name: 'Sick Leave', code: 'SL', balance: 8, maxDays: 10, requiresMedical: true, accrual: 'Quarterly' },
    { id: 3, name: 'Personal Day', code: 'PD', balance: 3, maxDays: 3, requiresMedical: false, accrual: 'None' },
  ];

  const upcomingApprovedLeaves = [
    { type: 'Annual Leave', start: '2024-11-05', end: '2024-11-07' },
    { type: 'Personal Day', start: '2024-12-20', end: '2024-12-20' },
  ];

  // Helper to get blocked dates as strings
  const blockedDatesSet = React.useMemo(() => {
    const set = new Set();
    holidays.forEach(h => set.add(h.date));
    existingLeaves.forEach(l => {
      const s = new Date(l.start);
      const e = new Date(l.end);
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        set.add(d.toISOString().split('T')[0]);
      }
    });
    return set;
  }, []);

  // Calculate days requested (inclusive) and remaining balance
  const daysRequested = React.useMemo(() => {
    if (!startDate || !endDate) return 0;
    const s = new Date(startDate);
    const e = new Date(endDate);
    if (e < s) return 0;
    const diffTime = e - s;
    return Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }, [startDate, endDate]);

  const remainingBalance = React.useMemo(() => {
    if (!selectedLeaveType) return null;
    const bal = selectedLeaveType.balance;
    const rem = bal - daysRequested;
    return rem < 0 ? 0 : rem;
  }, [selectedLeaveType, daysRequested]);

  const handleSubmit = () => {
    if (!selectedLeaveType) {
      setMessage('Please select a leave type.');
      return;
    }
    if (!startDate || !endDate) {
      setMessage('Select both start and end dates.');
      return;
    }
    if (daysRequested <= 0) {
      setMessage('End date must be after start date.');
      return;
    }
    if (remainingBalance === 0 && selectedLeaveType.balance < daysRequested) {
      setMessage('Insufficient balance for this request.');
      return;
    }
    // Simple blocked‑date check
    const s = new Date(startDate);
    const e = new Date(endDate);
    for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
      const iso = d.toISOString().split('T')[0];
      if (blockedDatesSet.has(iso)) {
        setMessage(`Selected range includes a blocked date (${iso}).`);
        return;
      }
    }
    const newRequest = {
      id: Date.now(),
      type: selectedLeaveType.name,
      start: startDate,
      end: endDate,
      reason,
      status: 'Pending',
    };
    setSubmitted(prev => [newRequest, ...prev]);
    setMessage('Leave request submitted – awaiting approval.');
    // Reset fields
    setStartDate('');
    setEndDate('');
    setReason('');
    setSelectedLeaveType(null);
  };

  // Simple styling objects
  const colors = {
    primary: '#2C7EF6',
    secondary: '#F6A623',
    bg: '#f5f5f5',
    text: '#333',
    border: '#e0e0e0',
  };
  const layoutStyle = {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    color: colors.text,
    backgroundColor: colors.bg,
  };
  const sidebarStyle = {
    width: '260px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRight: `1px solid ${colors.border}`,
  };
  const contentStyle = {
    flex: 1,
    padding: '30px',
  };
  const cardStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  };
  const buttonStyle = {
    backgroundColor: colors.primary,
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  };
  const disabledButton = {
    ...buttonStyle,
    backgroundColor: colors.border,
    cursor: 'not-allowed',
  };

  return (
    <div style={layoutStyle}>
      {/* Sidebar – Leave policy details */}
      <aside style={sidebarStyle}>
        <h2 style={{ marginTop: 0, color: colors.primary }}>Leave Policy</h2>
        {leaveTypes.map(lt => (
          <div key={lt.id} style={{ marginBottom: '12px' }}>
            <strong>{lt.name}</strong>
            <ul style={{ margin: '4px 0 0 12px', padding: 0, listStyle: 'disc' }}>
              <li>Code: {lt.code}</li>
              <li>Balance: {lt.balance} days</li>
              <li>Maximum per year: {lt.maxDays} days</li>
              <li>Accrual: {lt.accrual}</li>
              <li>{lt.requiresMedical ? 'Medical certificate required' : 'No certificate needed'}</li>
            </ul>
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main style={contentStyle}>
        <h1 style={{ color: colors.primary, marginBottom: '20px' }}>Request New Leave</h1>
        {message && (
          <div style={{ marginBottom: '16px', padding: '10px', backgroundColor: '#e6f4ff', borderRadius: '4px' }}>
            {message}
          </div>
        )}
        {/* Form Card */}
        <section style={cardStyle}>
          {/* Leave type dropdown */}
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="leaveType" style={{ display: 'block', marginBottom: '4px' }}>Leave Type</label>
            <select
              id="leaveType"
              value={selectedLeaveType ? selectedLeaveType.id : ''}
              onChange={e => {
                const lt = leaveTypes.find(l => l.id === Number(e.target.value));
                setSelectedLeaveType(lt);
                setMessage('');
              }}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${colors.border}` }}
            >
              <option value="" disabled>Select a type</option>
              {leaveTypes.map(lt => (
                <option key={lt.id} value={lt.id}>{lt.name} ({lt.balance} days left)</option>
              ))}
            </select>
          </div>

          {/* Date range picker */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
            <div style={{ flex: 1 }}>
              <label htmlFor="start" style={{ display: 'block', marginBottom: '4px' }}>Start Date</label>
              <input
                type="date"
                id="start"
                value={startDate}
                onChange={e => { setStartDate(e.target.value); setMessage(''); }}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${colors.border}` }}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label htmlFor="end" style={{ display: 'block', marginBottom: '4px' }}>End Date</label>
              <input
                type="date"
                id="end"
                value={endDate}
                onChange={e => { setEndDate(e.target.value); setMessage(''); }}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${colors.border}` }}
                min={startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Blocked dates info */}
          <div style={{ marginBottom: '16px', fontSize: '0.9rem', color: '#777' }}>
            <strong>Blocked dates (holidays / existing leave):</strong>
            <ul style={{ margin: '4px 0 0 16px' }}>
              {holidays.map(h => (<li key={h.date}>{h.date} – {h.name}</li>))}
              {existingLeaves.map(l => (
                <li key={l.start}>{l.start} to {l.end} – {l.type}</li>
              ))}
            </ul>
          </div>

          {/* Real‑time balance */}
          {selectedLeaveType && (
            <div style={{ marginBottom: '16px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px' }}>
              <p style={{ margin: 0 }}>
                Requested Days: <strong>{daysRequested}</strong>
              </p>
              <p style={{ margin: 0 }}>
                Remaining Balance after request: <strong>{remainingBalance}</strong> days
              </p>
            </div>
          )}

          {/* Reason textarea */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="reason" style={{ display: 'block', marginBottom: '4px' }}>Reason (optional)</label>
            <textarea
              id="reason"
              rows={4}
              value={reason}
              onChange={e => setReason(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${colors.border}` }}
            />
          </div>

          <button
            onClick={handleSubmit}
            style={selectedLeaveType && daysRequested > 0 ? buttonStyle : disabledButton}
          >
            Submit Request
          </button>
        </section>

        {/* Upcoming approved leave preview */}
        <section style={cardStyle}>
          <h3 style={{ marginTop: 0, color: colors.secondary }}>Upcoming Approved Leaves</h3>
          {upcomingApprovedLeaves.length === 0 ? (
            <p>No approved leave scheduled.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Start</th>
                  <th style={{ textAlign: 'left', padding: '8px' }}>End</th>
                </tr>
              </thead>
              <tbody>
                {upcomingApprovedLeaves.map((l, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${colors.border}` }}>
                    <td style={{ padding: '8px' }}>{l.type}</td>
                    <td style={{ padding: '8px' }}>{l.start}</td>
                    <td style={{ padding: '8px' }}>{l.end}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Submitted requests list – for demo purposes */}
        {submitted.length > 0 && (
          <section style={cardStyle}>
            <h3 style={{ marginTop: 0, color: colors.primary }}>Your Submitted Requests</h3>
            <ul>
              {submitted.map(r => (
                <li key={r.id}>
                  {r.type}: {r.start} → {r.end} ({r.status})
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}