function LeaveApprovals() {
  // Mock data
  const pendingRequests = [
    {
      id: 1,
      employee: { id: 101, name: 'Raj Patel', department: 'Engineering' },
      startDate: '2023-06-15',
      endDate: '2023-06-16',
      leaveType: 'Annual Leave',
      reason: 'Family vacation',
      balanceImpact: -2,
      status: 'pending'
    },
    {
      id: 2,
      employee: { id: 102, name: 'Priya Sharma', department: 'Marketing' },
      startDate: '2023-06-20',
      endDate: '2023-06-22',
      leaveType: 'Sick Leave',
      reason: 'Medical appointment',
      balanceImpact: -3,
      status: 'pending'
    },
    {
      id: 3,
      employee: { id: 103, name: 'Amit Kumar', department: 'Sales' },
      startDate: '2023-06-25',
      endDate: '2023-06-25',
      leaveType: 'Personal Leave',
      reason: 'Personal matter',
      balanceImpact: -1,
      status: 'pending'
    }
  ];

  const approvalHistory = [
    {
      id: 4,
      employee: { name: 'Neha Gupta' },
      startDate: '2023-06-01',
      endDate: '2023-06-02',
      leaveType: 'Annual Leave',
      status: 'approved',
      approvedBy: 'You',
      approvedAt: '2023-05-28 14:30'
    },
    {
      id: 5,
      employee: { name: 'Vikram Singh' },
      startDate: '2023-06-10',
      endDate: '2023-06-10',
      leaveType: 'Sick Leave',
      status: 'rejected',
      approvedBy: 'You',
      approvedAt: '2023-06-08 09:15',
      rejectionReason: 'Insufficient medical documentation'
    }
  ];

  const [selectedRequests, setSelectedRequests] = React.useState([]);
  const [comment, setComment] = React.useState('');
  const [conflictRequests, setConflictRequests] = React.useState([]);

  const handleSelectRequest = (id) => {
    setSelectedRequests(prev => 
      prev.includes(id) 
        ? prev.filter(reqId => reqId !== id)
        : [...prev, id]
    );
  };

  const handleApprove = (id) => {
    // In a real app, this would update the backend
    console.log(`Approved request ${id}`);
    // Reset selection
    setSelectedRequests([]);
  };

  const handleReject = (id) => {
    // In a real app, this would update the backend
    console.log(`Rejected request ${id} with comment: ${comment}`);
    setComment('');
    // Reset selection
    setSelectedRequests([]);
  };

  const handleBulkApprove = () => {
    console.log(`Bulk approved requests: ${selectedRequests.join(', ')}`);
    setSelectedRequests([]);
  };

  const handleBulkReject = () => {
    console.log(`Bulk rejected requests: ${selectedRequests.join(', ')} with comment: ${comment}`);
    setComment('');
    setSelectedRequests([]);
  };

  const resolveConflict = (id, resolution) => {
    console.log(`Resolved conflict for request ${id}: ${resolution}`);
    setConflictRequests(prev => prev.filter(req => req.id !== id));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', backgroundColor: '#2c3e50', color: 'white', padding: '20px 0' }}>
        <div style={{ padding: '0 20px 20px', fontSize: '24px', fontWeight: 'bold', borderBottom: '1px solid #34495e' }}>
          WorkPulse
        </div>
        <nav>
          <a href="/" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Dashboard</a>
          <a href="/clock" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Clock In/Out</a>
          <a href="/attendance" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Attendance</a>
          <a href="/leave/new" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Request Leave</a>
          <a href="/leave/pending" style={{ display: 'block', padding: '12px 20px', color: '#3498db', backgroundColor: '#34495e', textDecoration: 'none' }}>Approve Leave</a>
          <a href="/leave/calendar" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>My Leave</a>
          <a href="/shifts" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Shift Roster</a>
          <a href="/payroll" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Payroll</a>
          <a href="/profile" style={{ display: 'block', padding: '12px 20px', color: '#bdc3c7', textDecoration: 'none' }}>Profile</a>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ color: '#2c3e50', fontSize: '28px', fontWeight: '600' }}>Leave Approvals</h1>
          <p style={{ color: '#7f8c8d', fontSize: '16px' }}>Review and manage leave requests from your team</p>
        </div>

        {/* Conflict Resolution Section */}
        {conflictRequests.length > 0 && (
          <div style={{ backgroundColor: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '8px', padding: '20px', marginBottom: '30px' }}>
            <h2 style={{ color: '#856404', fontSize: '20px', marginBottom: '15px' }}>Attendance Conflicts</h2>
            {conflictRequests.map(req => (
              <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', backgroundColor: 'white', borderRadius: '6px', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontWeight: '600' }}>{req.employee.name}</div>
                  <div style={{ color: '#7f8c8d', fontSize: '14px' }}>{req.date} - {req.conflictType}</div>
                </div>
                <div>
                  <button 
                    onClick={() => resolveConflict(req.id, 'approve')}
                    style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 15px', marginRight: '10px', cursor: 'pointer' }}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => resolveConflict(req.id, 'reject')}
                    style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 15px', cursor: 'pointer' }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pending Requests Section */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '25px', marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#2c3e50', fontSize: '20px' }}>Pending Requests</h2>
            <div>
              {selectedRequests.length > 0 && (
                <>
                  <button 
                    onClick={handleBulkApprove}
                    style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 15px', marginRight: '10px', cursor: 'pointer' }}
                  >
                    Approve Selected
                  </button>
                  <button 
                    onClick={handleBulkReject}
                    style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', padding: '10px 15px', cursor: 'pointer' }}
                  >
                    Reject Selected
                  </button>
                </>
              )}
            </div>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
                  <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}></th>
                  <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Employee</th>
                  <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Dates</th>
                  <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Type</th>
                  <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Reason</th>
                  <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Balance Impact</th>
                  <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingRequests.map(request => (
                  <tr key={request.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                    <td style={{ padding: '12px 15px' }}>
                      <input 
                        type="checkbox" 
                        checked={selectedRequests.includes(request.id)}
                        onChange={() => handleSelectRequest(request.id)}
                      />
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      <div style={{ fontWeight: '500' }}>{request.employee.name}</div>
                      <div style={{ color: '#7f8c8d', fontSize: '14px' }}>{request.employee.department}</div>
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      {request.startDate} to {request.endDate}
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      {request.leaveType}
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      {request.reason}
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      {request.balanceImpact} days
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      <button 
                        onClick={() => handleApprove(request.id)}
                        style={{ backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '4px', padding: '6px 12px', marginRight: '5px', cursor: 'pointer' }}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleReject(request.id)}
                        style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer' }}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {selectedRequests.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment (optional for approval, required for rejection)"
                style={{ width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '80px', fontSize: '14px' }}
              />
            </div>
          )}
        </div>

        {/* Approval History Section */}
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '25px' }}>
          <h2 style={{ color: '#2c3e50', fontSize: '20px', marginBottom: '20px' }}>Approval History</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
                  <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Employee</th>
                  <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Dates</th>
                  <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Type</th>
                  <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Status</th>
                  <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Approved By</th>
                  <th style={{ padding: '12px 15px', borderBottom: '2px solid #e9ecef' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {approvalHistory.map(request => (
                  <tr key={request.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                    <td style={{ padding: '12px 15px' }}>
                      {request.employee.name}
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      {request.startDate} to {request.endDate}
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      {request.leaveType}
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: request.status === 'approved' ? '#d4edda' : '#f8d7da',
                        color: request.status === 'approved' ? '#155724' : '#721c24',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      {request.approvedBy}
                    </td>
                    <td style={{ padding: '12px 15px' }}>
                      {request.approvedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}