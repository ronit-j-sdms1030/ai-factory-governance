function LeaveRequest() {
  // Mock data
  const employee = {
    id: 1,
    first_name: "Alex",
    last_name: "Johnson",
    department: "Engineering",
    location: "New York"
  };

  const leaveTypes = [
    { id: 1, name: "Annual Leave", code: "AL", balance: 15, maxDays: 20, requiresMedical: false },
    { id: 2, name: "Sick Leave", code: "SL", balance: 8, maxDays: 12, requiresMedical: true },
    { id: 3, name: "Personal Leave", code: "PL", balance: 5, maxDays: 5, requiresMedical: false }
  ];

  const holidays = [
    new Date('2023-12-25'),
    new Date('2024-01-01'),
    new Date('2024-07-04')
  ];

  const pendingRequests = [
    { id: 101, type: "Annual Leave", start: "2024-06-15", end: "2024-06-17", status: "Pending" },
    { id: 102, type: "Sick Leave", start: "2024-05-20", end: "2024-05-22", status: "Approved" }
  ];

  // State
  const [selectedLeaveType, setSelectedLeaveType] = React.useState(leaveTypes[0]);
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [reason, setReason] = React.useState('');
  const [attachment, setAttachment] = React.useState(null);
  const [daysRequested, setDaysRequested] = React.useState(0);
  const [balanceAfter, setBalanceAfter] = React.useState(selectedLeaveType.balance);

  // Calculate working days between dates (excluding weekends and holidays)
  const calculateWorkingDays = (start, end) => {
    if (!start || !end) return 0;
    
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    let count = 0;
    const currentDate = new Date(startDateObj);
    
    while (currentDate <= endDateObj) {
      const dayOfWeek = currentDate.getDay();
      const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
      const isHoliday = holidays.some(holiday => 
        holiday.getDate() === currentDate.getDate() && 
        holiday.getMonth() === currentDate.getMonth() && 
        holiday.getFullYear() === currentDate.getFullYear()
      );
      
      if (!isWeekend && !isHoliday) {
        count++;
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return count;
  };

  // Update days requested and balance when dates change
  React.useEffect(() => {
    const days = calculateWorkingDays(startDate, endDate);
    setDaysRequested(days);
    setBalanceAfter(selectedLeaveType.balance - days);
  }, [startDate, endDate, selectedLeaveType]);

  // Handle leave type change
  const handleLeaveTypeChange = (e) => {
    const type = leaveTypes.find(t => t.id === parseInt(e.target.value));
    setSelectedLeaveType(type);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Leave request submitted!\nType: ${selectedLeaveType.name}\nDays: ${daysRequested}\nBalance after: ${balanceAfter}`);
    // In a real app, this would trigger an API call
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    setAttachment(e.target.files[0]);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', backgroundColor: '#2c3e50', color: 'white', padding: '20px 0' }}>
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #34495e' }}>
          <h2 style={{ margin: '0', fontSize: '22px' }}>WorkPulse</h2>
          <p style={{ opacity: 0.8, margin: '5px 0 0' }}>{employee.first_name} {employee.last_name}</p>
        </div>
        <nav>
          <a href="/" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Dashboard</a>
          <a href="/clock" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Clock In/Out</a>
          <a href="/attendance" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Attendance</a>
          <a href="/leave/request" style={{ display: 'block', padding: '12px 20px', color: '#3498db', backgroundColor: '#34495e', textDecoration: 'none' }}>Request Leave</a>
          <a href="/team" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Team</a>
          <a href="/shifts" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Shifts</a>
          <a href="/payroll" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Payroll</a>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: 0, color: '#2c3e50', fontSize: '28px' }}>Request Time Off</h1>
          <div style={{ backgroundColor: '#3498db', color: 'white', padding: '8px 16px', borderRadius: '4px' }}>
            {employee.department} • {employee.location}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
          {/* Left Column - Form */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '30px' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50' }}>Leave Type</label>
                <select 
                  value={selectedLeaveType.id}
                  onChange={handleLeaveTypeChange}
                  style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' }}
                >
                  {leaveTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name} ({type.balance} days available)
                    </option>
                  ))}
                </select>
                <div style={{ marginTop: '10px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px', fontSize: '14px' }}>
                  <strong>Policy Details:</strong> {selectedLeaveType.maxDays} days maximum per year. {selectedLeaveType.requiresMedical ? 'Medical certificate required.' : 'No medical certificate needed.'}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50' }}>Start Date</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50' }}>End Date</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50' }}>Reason for Leave</label>
                <textarea 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Please provide details about your leave request..."
                  rows="4"
                  style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px', resize: 'vertical' }}
                />
                <div style={{ textAlign: 'right', marginTop: '5px', fontSize: '14px', color: '#7f8c8d' }}>
                  {reason.length}/500 characters
                </div>
              </div>

              {selectedLeaveType.requiresMedical && (
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2c3e50' }}>Medical Certificate</label>
                  <div style={{ padding: '20px', border: '2px dashed #3498db', borderRadius: '4px', textAlign: 'center', cursor: 'pointer' }}>
                    <input 
                      type="file" 
                      onChange={handleFileUpload}
                      style={{ display: 'none' }} 
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                      <div style={{ color: '#3498db', fontWeight: '600' }}>Click to upload</div>
                      <div style={{ fontSize: '14px', color: '#7f8c8d', marginTop: '5px' }}>
                        PDF, JPG, or PNG (max 5MB)
                      </div>
                    </label>
                  </div>
                  {attachment && (
                    <div style={{ marginTop: '10px', fontSize: '14px', color: '#27ae60' }}>
                      ✓ {attachment.name} uploaded
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  type="submit" 
                  style={{ 
                    backgroundColor: '#3498db', 
                    color: 'white', 
                    border: 'none', 
                    padding: '12px 30px', 
                    borderRadius: '4px', 
                    fontSize: '16px', 
                    fontWeight: '600', 
                    cursor: 'pointer' 
                  }}
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Summary */}
          <div>
            {/* Balance Summary */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '25px', marginBottom: '30px' }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50', fontSize: '20px' }}>Leave Balance</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div>
                  <div style={{ fontSize: '14px', color: '#7f8c8d' }}>Current Balance</div>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: '#2c3e50' }}>{selectedLeaveType.balance} days</div>
                </div>
                <div>
                  <div style={{ fontSize: '14px', color: '#7f8c8d' }}>After Request</div>
                  <div style={{ fontSize: '24px', fontWeight: '600', color: balanceAfter < 0 ? '#e74c3c' : '#27ae60' }}>{balanceAfter} days</div>
                </div>
              </div>
              <div style={{ height: '8px', backgroundColor: '#ecf0f1', borderRadius: '4px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    width: `${Math.min(100, (daysRequested/selectedLeaveType.maxDays)*100)}%`, 
                    backgroundColor: balanceAfter < 0 ? '#e74c3c' : '#3498db' 
                  }}
                ></div>
              </div>
              <div style={{ marginTop: '15px', fontSize: '14px', color: '#7f8c8d' }}>
                Requesting {daysRequested} days of {selectedLeaveType.name}
              </div>
            </div>

            {/* Policy Summary */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '25px', marginBottom: '30px' }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50', fontSize: '20px' }}>Policy Summary</h3>
              <ul style={{ paddingLeft: '20px', margin: 0 }}>
                <li style={{ marginBottom: '10px' }}>Maximum {selectedLeaveType.maxDays} days per year</li>
                <li style={{ marginBottom: '10px' }}>Requests must be submitted at least 3 days in advance</li>
                <li style={{ marginBottom: '10px' }}>Manager approval required for all requests</li>
                <li>Holidays and weekends are not counted</li>
              </ul>
            </div>

            {/* Pending Requests */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '25px' }}>
              <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50', fontSize: '20px' }}>Pending Requests</h3>
              {pendingRequests.length > 0 ? (
                <div>
                  {pendingRequests.map(request => (
                    <div key={request.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #ecf0f1' }}>
                      <div>
                        <div style={{ fontWeight: '600' }}>{request.type}</div>
                        <div style={{ fontSize: '14px', color: '#7f8c8d' }}>{request.start} to {request.end}</div>
                      </div>
                      <div style={{ 
                        padding: '4px 10px', 
                        borderRadius: '4px', 
                        fontSize: '12px', 
                        fontWeight: '600',
                        backgroundColor: request.status === 'Pending' ? '#f39c12' : '#27ae60',
                        color: 'white'
                      }}>
                        {request.status}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', color: '#7f8c8d' }}>
                  No pending requests
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}