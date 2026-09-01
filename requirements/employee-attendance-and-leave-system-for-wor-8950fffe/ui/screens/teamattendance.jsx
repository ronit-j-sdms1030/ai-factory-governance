function TeamAttendance() {
  // Mock data
  const teamMembers = [
    { id: 1, name: 'Alex Morgan', department: 'Engineering', status: 'present', lateMinutes: 0 },
    { id: 2, name: 'Taylor Swift', department: 'Marketing', status: 'late', lateMinutes: 15 },
    { id: 3, name: 'Jamie Lee', department: 'Sales', status: 'absent', lateMinutes: 0 },
    { id: 4, name: 'Jordan Kim', department: 'HR', status: 'on_leave', lateMinutes: 0 },
    { id: 5, name: 'Casey Smith', department: 'Finance', status: 'present', lateMinutes: 0 },
  ];

  const leaveRequests = [
    { id: 101, employeeName: 'Jamie Lee', startDate: '2023-06-15', endDate: '2023-06-16', reason: 'Medical appointment', status: 'pending' },
    { id: 102, employeeName: 'Jordan Kim', startDate: '2023-06-20', endDate: '2023-06-22', reason: 'Family vacation', status: 'pending' },
  ];

  const attendanceSummary = {
    present: 124,
    late: 8,
    absent: 3,
    onLeave: 5,
    total: 140
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return '#4CAF50';
      case 'late': return '#FF9800';
      case 'absent': return '#F44336';
      case 'on_leave': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  const handleApprove = (requestId) => {
    console.log(`Approved request ${requestId}`);
    // In a real app, this would update the state and make an API call
  };

  const handleReject = (requestId) => {
    console.log(`Rejected request ${requestId}`);
    // In a real app, this would update the state and make an API call
  };

  const handleBulkApprove = () => {
    console.log('Bulk approved selected requests');
    // In a real app, this would process multiple requests
  };

  return (
    <div className="team-attendance" style={{ padding: '20px', fontFamily: 'Segoe UI, sans-serif' }}>
      <div className="header" style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#333', fontSize: '28px', fontWeight: '600' }}>Team Attendance</h1>
        <p style={{ color: '#666', marginTop: '5px' }}>Manage your team's attendance and leave requests</p>
      </div>

      <div className="summary-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card" style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '16px' }}>Present</h3>
          <p style={{ margin: '0', fontSize: '24px', fontWeight: '600', color: '#4CAF50' }}>{attendanceSummary.present}</p>
        </div>
        <div className="card" style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '16px' }}>Late Arrivals</h3>
          <p style={{ margin: '0', fontSize: '24px', fontWeight: '600', color: '#FF9800' }}>{attendanceSummary.late}</p>
        </div>
        <div className="card" style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '16px' }}>Absent</h3>
          <p style={{ margin: '0', fontSize: '24px', fontWeight: '600', color: '#F44336' }}>{attendanceSummary.absent}</p>
        </div>
        <div className="card" style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#666', fontSize: '16px' }}>On Leave</h3>
          <p style={{ margin: '0', fontSize: '24px', fontWeight: '600', color: '#2196F3' }}>{attendanceSummary.onLeave}</p>
        </div>
      </div>

      <div className="main-content" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div className="attendance-grid">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 style={{ margin: '0', fontSize: '20px', color: '#333' }}>Team Attendance Grid</h2>
            <div>
              <select style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', marginRight: '10px' }}>
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>HR</option>
                <option>Finance</option>
              </select>
              <button style={{ padding: '8px 15px', backgroundColor: '#1976D2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Filter</button>
            </div>
          </div>
          
          <div className="grid-container" style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div className="grid-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', backgroundColor: '#f5f5f5', padding: '15px' }}>
              <div style={{ fontWeight: '600' }}>Employee</div>
              <div style={{ fontWeight: '600' }}>Department</div>
              <div style={{ fontWeight: '600' }}>Status</div>
              <div style={{ fontWeight: '600' }}>Late Minutes</div>
            </div>
            
            {teamMembers.map(member => (
              <div key={member.id} className="grid-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '15px', borderBottom: '1px solid #eee' }}>
                <div>{member.name}</div>
                <div>{member.department}</div>
                <div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    backgroundColor: getStatusColor(member.status),
                    color: 'white',
                    fontSize: '12px'
                  }}>
                    {member.status.replace('_', ' ')}
                  </span>
                </div>
                <div>{member.lateMinutes > 0 ? `${member.lateMinutes} min` : '-'}</div>
              </div>
            ))}
          </div>
          
          <div className="patterns-section" style={{ marginTop: '30px' }}>
            <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '15px' }}>Absence Patterns</h3>
            <div className="pattern-card" style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
              <p><strong>Notable Pattern:</strong> Engineering department has 15% higher late arrivals compared to company average.</p>
            </div>
          </div>
        </div>
        
        <div className="sidebar">
          <div className="pending-approvals" style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ margin: '0', fontSize: '20px', color: '#333' }}>Pending Approvals</h2>
              <button 
                onClick={handleBulkApprove}
                style={{ padding: '6px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
              >
                Bulk Approve
              </button>
            </div>
            
            {leaveRequests.map(request => (
              <div key={request.id} className="request-item" style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <strong>{request.employeeName}</strong>
                  <span style={{ backgroundColor: '#FF9800', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>
                    {request.status}
                  </span>
                </div>
                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Dates:</strong> {request.startDate} to {request.endDate}</p>
                <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Reason:</strong> {request.reason}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button 
                    onClick={() => handleApprove(request.id)}
                    style={{ padding: '6px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleReject(request.id)}
                    style={{ padding: '6px 12px', backgroundColor: '#F44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Reject
                  </button>
                </div>
                <textarea 
                  placeholder="Add comment..." 
                  style={{ width: '100%', marginTop: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '60px' }}
                ></textarea>
              </div>
            ))}
          </div>
          
          <div className="alerts" style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#333' }}>Late Arrival Alerts</h3>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <strong>Taylor Swift</strong> - 15 minutes late today
              </li>
              <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                <strong>Jamie Lee</strong> - 30 minutes late yesterday
              </li>
              <li style={{ padding: '10px 0' }}>
                <strong>Morgan Freeman</strong> - 20 minutes late (3 days ago)
              </li>
            </ul>
          </div>
          
          <div className="policy-reminders" style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginTop: '20px' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#333' }}>Policy Reminders</h3>
            <ul style={{ listStyle: 'none', padding: '0' }}>
              <li style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                Grace period for late arrivals: 10 minutes
              </li>
              <li style={{ padding: '10px 0' }}>
                Overtime requires prior approval
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}