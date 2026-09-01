function LeaveApprovals() {
  const [pendingRequests, setPendingRequests] = React.useState([
    {
      id: 101,
      employee_id: 'EMP-2308',
      employee_name: 'Sarah Chen',
      department: 'Engineering',
      leave_type: 'Annual Leave',
      start_date: '2024-11-18',
      end_date: '2024-11-22',
      days_requested: toDays('2024-11 18', '2024-11 22'),
      reason: 'Family vacation to Hawaii',
      current_balance: 14.5,
      balance_after: 10.5,
      submitted_date: '2024-NOV-14',
      status: 'pending',
      approver_comment: ''
    },
    {
      id: 102,
      employee_id: 'EMP. 1892',
      employee_name: 'Marcus Rodriguez',
      department: 'Sales',
      leave_type: 'Sick Leave',
      start_date: '2024-11-20',
      end_date: '2024-11-21',
      days_requested: 2,
      reason: 'Medical appointment follow-up',
      current_balance: 8,
      balance_after: 6,
      submitted_date: '2024-NOV-15',
      status: 'pending',
      approver_comment: ''
    },
    {
      id: 103,
      employee_id: 'EMP-2011',
      employee_name: 'Aisha Johnson',
      department: 'Marketing',
      leave_type: 'Annual Leave',
      start_date: '2024-11-25',
      end_date: '2024-11-29',
      days_requested: 5,
      reason: 'Personal time for home renovation',
      current_balance: 22,
      balance_after: 17,
      submitted_date: '2024-NOV-S 16',
      status: 'pending',
      approver_comment: ''
    },
    {
      id: 104,
      employee_id: 'EMP-2175',
      employee_name: 'David Kim',
      department: 'Customer Support',
      leave_type: 'Family Leave',
      start_date: '2024-12.

      03',
      end_date: '2024-12-07',
      days_requested: 5,
      reason: 'Child care during school break',
      current_balance: 12,
      balance_after: 7,
      submitted_date: '2024-NOV-16',
      status: 'pending',
      approver_comment: ''
    }
  ]);

  const [approvalHistory, setApprovalHistory] = React.useState([
    {
      id: 98,
      employee_name: 'James Wilson',
      leave_type: 'Annual Leave',
      dates: 'Nov 12-13, 2024',
      decision: 'approved',
      decision_date: '2024-NOV-11',
      approver_comment: 'Approved for team offsite planning'
    },
    {
      id: 99,
      employee_name: 'Priya Patel',
      leave_type: 'Sick Leave',
      dates: 'Nov 14, 2024',
      decision: 'approved',
      decision_date: '2024-NOV-13',
      approver_comment: 'Medical certificate provided'
    },
    {
      id: 100,
      employee_name: 'Robert Thompson',
      leave_type: 'Annual Leave',
      dates: 'Nov 15-18, 2024',
      decision: 'rejected',
      decision_date: '2024-NOV-14',
      approver_comment: 'Team deployment scheduled during this period'
    }
  ]);

  const [filterEmployee, setFilterEmployee] = React.useState('');
  const [filterLeaveType, setFilterLeaveType] = React.useState('');
  const [selectedRequest, setSelectedRequest] = React.useState(null);
  const [approvalComment, setApprovalComment] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('pending');

  const leaveTypes = ['Annual Leave', 'Sick Leave', 'Family Leave', 'Bereavement', 'Parental Leave'];
  const employees = ['Sarah Chen', 'Marcus Rodriguez', 'Aisha Johnson', 'David Kim'];

  const toDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleApprove = (requestId) => {
    if (!approvalComment.trim()) {
      alert('Please provide a comment before approving');
      return;
    }

    const requestIndex = pendingRequests.findIndex(r => r.id === requestId);
    if (requestIndex !== -1) {
      const request = pendingRequests[requestIndex];
      
      const newHistory = {
        id: approvalHistory.length + 1,
        employee_name: request.employee_name,
        leave_type: request.leave_type,
        dates: `${formatDate(request.start_date)} - ${formatDate(request.end_date)}`,
        decision: 'approved',
        decision_date: new Date().toISOString().split('T')[0],
        approver_comment: approvalComment
      };

      const updatedRequests = pendingRequests.filter(r => r.id !== requestId);
      setPendingRequests(updatedRequests);
      setApprovalHistory([newHistory, ...approvalHistory]);
      setApprovalComment('');
      setSelectedRequest(null);
      
      alert(`Leave request for ${request.employee_name} approved`);
    }
  };

  const handleReject = (requestId) => {
    if (!approvalComment.trim()) {
      alert('Please provide a comment before rejecting');
      return;
    }

    const requestIndex = pendingRequests.findIndex(r => r.id === requestId);
    if (requestIndex !== -1) {
      const request = pendingRequests[requestIndex];
      
      const newHistory = {
        id: approvalHistory.length + 1,
        employee_name: request.employee_name,
        leave_type: request.leave_type,
        dates: `${formatDate(request.start_date)} - ${formatDate(request.end_date)}`,
        decision: 'rejected',
        decision_date: new Date().toISOString().split('T')[0],
        approver_comment: approvalComment
      };

      const updatedRequests = pendingRequests.filter(r => r.id !== requestId);
      setPendingRequests(updatedRequests);
      setApprovalHistory([newHistory, ...approvalHistory]);
      setApprovalComment('');
      setSelectedRequest(null);
      
      alert(`Leave request for ${request.employee_name} rejected`);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const filteredRequests = pendingRequests.filter(request => {
    const matchesEmployee = filterEmployee === '' || request.employee_name.includes(filterEmployee);
    const matchesLeaveType = filterLeaveType === '' || request.leave_type === filterLeaveType;
    return matchesEmployee && matchesLeaveType;
  });

  const handleRequestSelect = (request) => {
    setSelectedRequest(request);
  };

  const renderCalendarPreview = () => {
    if (!selectedRequest) {
      return (
        <div className="calendar-placeholder">
          <div className="calendar-header">No request selected</div>
          <div className="calendar-grid">
            <div className="calendar-cell">Select a request to view dates</div>
          </div>
        </div>
      );
    }

    const start = new Date(selectedRequest.start_date);
    const end = new Date(selectedRequest.end_date);
    const days = [];
    
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }

    return (
      <div className="calendar-preview">
        <div className="calendar-header">
          {selectedRequest.employee_name}'s Leave Period
        </div>
        <div className="calendar-days">
          {days.map((day, index) => (
            <div key={index} className="calendar-day">
              <div className="day-name">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className="day-number">{day.getDate()}</div>
              <div className="day-month">{day.toLocaleDateString('en-US', { month: 'short' })}</div>
            </div>
          ))}
        </div>
        <div className="calendar-summary">
          Total: {selectedRequest.days_requested} days ({selectedRequest.leave_type})
        </div>
      </div>
    );
  };

  return (
    <div className="leave-approvals-container">
      <div className="approvals-header">
        <h1>Leave Approvals</h1>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{pendingRequests.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">This Week</span>
            <span className="stat-value">{pendingRequests.filter(r => {
              const date = new Date(r.start_date);
              const now = new Date();
              const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
              return date >= weekStart;
            }).length}</span>
          </div>
        </div>
      </div>

      <div className="approvals-content">
        <div className="filters-section">
          <div className="filter-group">
            <label htmlFor="employee-filter">Employee</label>
            <select 
              id="employee-filter" 
              value={filterEmployee}
              onChange={(e) => setFilterEmployee(e.target.value)}
            >
              <option value="">All Employees</option>
              {employees.map(emp => (
                <option key={emp} value={emp}>{emp}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="leave-type-filter">Leave Type</label>
            <select 
              id="leave-type-filter" 
              value={filterLeaveType}
              onChange={(e) => setFilterLeaveType(e.target.value)}
            >
              <option value="">All Types</option>
              {leaveTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <button className="clear-filters" onClick={() => {
              setFilterEmployee('');
              setFilterLeaveType('');
            }}>
              Clear Filters
            </button>
          </div>
        </div>

        <div className="main-layout">
          <div className="approval-queue">
            <div className="section-header">
              <h2>Pending Approvals ({filteredRequests.length})</h2>
            </div>
            
            <div className="requests-table">
              <table>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Leave Type</th>
                    <th>Dates</th>
                    <th>Days</th>
                    <th>Balance Impact</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map(request => (
                    <tr 
                      key={request.id} 
                      className={`request-row ${selectedRequest?.id === request.id ? 'selected' : ''}`}
                      onClick={() => handleRequestSelect(request)}
                    >
                      <td>
                        <div className="employee-info">
                          <div className="employee-name">{request.employee_name}</div>
                          <div className="employee-id">{request.employee_id}</div>
                        </div>
                      </td>
                      <td>{request.department}</td>
                      <td>
                        <span className={`leave-type ${request.leave_type.replace(' ', '-').toLowerCase()}`}>
                          {request.leave_type}
                        </span>
                      </td>
                      <td>
                        <div className="date-range">
                          {formatDate(request.start_date)} – {formatDate(request.end_date)}
                        </div>
                      </td>
                      <td>{request.days_requested}</td>
                      <td>
                        <div className="balance-change">
                          <div className="balance-before">{request.current_balance} →</div>
                          <div className="balance-after">{request.balance_after}</div>
                        </div>
                      </td>
                      <td>
                        <span className="status-pending">Pending</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="approval-details">
            <div className="details-section">
              <h3>Request Details</h3>
              {selectedRequest ? (
                <div className="request-details">
                  <div className="detail-item">
                    <label>Employee</label>
                    <div className="value">{selectedRequest.employee_name} ({selectedRequest.employee_id})</div>
                  </div>
                  <div className="detail-item">
                    <label>Department</label>
                    <div className="value">{selectedRequest.department}</div>
                  </div>
                  <div className="detail-item">
                    <label>Leave Type</label>
                    <div className="value">{selectedRequest.leave_type}</div>
                  </div>
                  <div className="detail-item">
                    <label>Dates</label>
                    <div className="value">{formatDate(selectedRequest.start_date)} to {formatDate(selectedRequest.end_date)}</div>
                  </div>
                  <div className="detail-item">
                    <label>Reason</label>
                    <div className="value reason-text">{selectedRequest.reason}</div>
                  </div>
                  <div className="detail-item">
                    <label>Submitted</label>
                    <div className="value">{selectedRequest.submitted_date}</div>
                  </div>
                  <div className="detail-item">
                    <label>Balance Change</label>
                    <div className="value balance-change-detail">
                      {selectedRequest.current_balance} → {selectedRequest.balance_after}
                      <span className="change-amount">(-{selectedRequest.days_requested})</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="no-selection">
                  Select a request from the table to view details
                </div>
              )}
            </div>

            <div className="calendar-section">
              <h3>Calendar Preview</h3>
              {renderCalendarPreview()}
            </div>

            <div className="approval-actions">
              <h3>Approval Decision</h3>
              <div className="comment-input">
                <label htmlFor="approval-comment">Comment (Required)</label>
                <textarea 
                  id="approval-comment"
                  placeholder="Enter your approval or rejection reason..."
                  value={approvalComment}
                  onChange={(e) => setApprovalComment(e.target.value)}
                  rows="3"
                />
              </div>
              <div className="action-buttons">
                <button 
                  className="btn-approve"
                  onClick={() => selectedRequest && handleApprove(selectedRequest.id)}
                  disabled={!selectedRequest}
                >
                  Approve Request
                </button>
                <button 
                  className="btn-reject"
                  onClick={() => selectedRequest && handleReject(selectedRequest.id)}
                  disabled={!selectedRequest}
                >
                  Reject Request
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="approval-history">
          <div className="section-header">
            <h2>Recent Approval History</h2>
          </div>
          <div className="history-table">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Leave Type</th>
                  <th>Dates</th>
                  <th>Decision</th>
                  <th>Decision Date</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {approvalHistory.map(history => (
                  <tr key={history.id}>
                    <td>{history.employee_name}</td>
                    <td>{history.leave_type}</td>
                    <td>{history.dates}</td>
                    <td>
                      <span className={`decision-${history.decision}`}>
                        {history.decision.charAt(0).toUpperCase() + history.decision.slice(1)}
                      </span>
                    </td>
                    <td>{history.decision_date}</td>
                    <td className="comment-cell">{history.approver_comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .leave-approvals-container {
          padding: A24px;
          background: #f8f9fa;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .approvals-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .approvals-header h1 {
          margin: 0;
          color: #2c3e50;
          font-size: 28px;
          font-weight: 600;
        }

        .header-stats {
          display: flex;
          gap: 32px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-label {
          display: block;
          color: #7b8a8b;
          font-size: 14px;
          margin-bottom: 4px;
        }

        .stat-value {
          display: block;
          color: #3498db;
          font-size: 24px;
          font-weight: 600;
        }

        .filters-section {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .filter-group {
          flex: 1;
          max-width: 250px;
        }

        .filter-group label {
          display: block;
          margin-bottom: 8px;
          color: #2c3e50;
          font-weight: 500;
          font-size: 14px;
        }

        .filter-group select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #e0e0e0;
          border-radius:14px;
          background: white;
          color: #2c3e50;
          font-size: 14px;
          cursor: pointer;
        }

        .filter-group select:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52,152,219,0.1);
        }

        .clear-filters {
          margin-top: 28px;
          padding: 10px 20px;
          background: #f8f9fa;
          border: 1px solid #e0e0e0;
          border-radius:14px;
          color: #7b8a8b;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .clear-filters:hover {
          background: #e9ecef;
          color: #2c3e50;
        }

        .main-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        .approval-queue, .approval-details {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          overflow: hidden;
        }

        .section-header {
          padding: 20px 24px;
          border-bottom: 1px solid #e0e0e0;
          background: #f8f9fa;
        }

        .section-header h2 {
          margin: 0;
          color: #2c3e50;
          font-size: 18px;
          font-weight: 600;
        }

        .requests-table {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          padding: 16px 24px;
          background: #f8f9fa;
          color: #7b8a8b;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e0e0e0;
        }

        td {
          padding: 20px 24px;
          border-bottom: 1px solid #f8f9fa;
          color: #2c3e50;
          font-size: 14px;
        }

        .request-row {
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .request-row:hover {
          background-color: #f8f9fa;
        }

        .request-row.selected {
          background-color: #e3f2fd;
          border-left: 4px solid #3498db;
        }

        .employee-info {
          display: flex;
          flex-direction: column;
        }

        .employee-name {
          font-weight: 500;
          color: #2c3e50;
        }

        .employee-id {
          font-size: 12px;
          color: #7b8a8b;
          margin-top: 4px;
        }

        .leave-type {
          padding: 6px 12px;
          border-radius:20px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
        }

        .leave-type.annual-leave {
          background: #d4edda;
          color: #155724;
        }

        .leave-type.sick-leave {
          background: #d1ecf1;
          color: #0c5460;
        }

        .leave-type.family-leave {
          background: #f8d7da;
          color: #721c24;
        }

        .date-range {
          font-weight: 500;
        }

        .balance-change {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .balance-before {
          color: #7b8a8b;
        }

        .balance-after {
          color: #2c3e50;
          font-weight: 500;
        }

        .status-pending {
          background: #fff3cd;
          color: #856404;
          padding: 6px 12px;
          border-radius:20px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
        }

        .approval-details {
          display: flex;
          flex-direction: column;
        }

        .details-section, .calendar-section, .approval-actions {
          padding: 24px;
          border-bottom: 1px solid #f8f9fa;
        }

        .details-section h3, .calendar-section h3, .approval-actions h3 {
          margin: 0 0 20px 0;
          color: #2c3e50;
          font-size: 16px;
          font-weight: 600;
        }

        .request-details {
          display: grid;
          gap: 16px;
        }

        .detail-item {
          display: grid;
          gap: 4px;
        }

        .detail-item label {
          color: #7b8a8b;
          font-size: 12px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-item .value {
          color: #2c3e50;
          font-size: 14px;
          font-weight: 500;
        }

        .reason-text {
          line-height: 1.5;
          padding: 12px;
          background: #f8f9fa;
          border-radius:8px;
          border-left: 3px solid #3498db;
        }

        .balance-change-detail {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .change-amount {
          color: #e74c3c;
          font-weight: 500;
          font-size:342px;
        }

        .no-selection {
          text-align: center;
          padding: 40px 20px;
          color: #7b8a8b;
          font-style: italic;
        }

        .calendar-preview {
          background: #f8f9fa;
          border-radius:8px;
          overflow: hidden;
        }

        .calendar-header {
          background: #3498db;
          color: white;
          padding: 12px 16px;
          font-weight: 500;
          font-size: 14px;
        }

        .calendar-days {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 16px;
          justify-content: center;
        }

        .calendar-day {
          background: white;
          border-radius:8px;
          padding: 12px;
          min-width: 60px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .day-name {
          font-size: 12px;
          color: #7b8a8b;
          margin-bottom: 4px;
        }

        .day-number {
          font-size: 20px;
          font-weight: 600;
          color: #2c3e50;
        }

        .day-month {
          font-size: 12px;
          color: #7b8a8b;
          margin-top: 4px;
        }

        .calendar-summary {
          padding: 12px 16px;
          background: white;
          border-top: 1px solid #e0e0e0;
          font-weight: 500;
          color: #2c3e50;
          text-align: center;
        }

        .comment-input {
          margin-bottom: 20px;
        }

        .comment-input label {
          display: block;
          margin-bottom: 8px;
          color: #2c3e50;
          font-weight: 500;
          font-size: 14px;
        }

        .comment-input textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #e0e0e0;
          border-radius:8px;
          font-size: 14px;
          resize: vertical;
          min-height: 80px;
        }

        .comment-input textarea:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52,152,219,0.1);
        }

        .action-buttons {
          display: flex;
          gap: 12px;
        }

        .btn-approve, .btn-reject {
          flex: 1;
          padding: 12px 24px;
          border: none;
          border-radius:8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-approve {
          background: #27ae60;
          color: white;
        }

        .btn-approve:hover:not(:disabled) {
          background: #219955;
        }

        .btn-reject {
          background: #e74c3c;
          color: white;
        }

        .btn-reject:hover:not(:disabled) {
          background: #c0392b;
        }

        .btn-approve:disabled, .btn-reject:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .approval-history {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          overflow: hidden;
          margin-top: 24px;
        }

        .history-table {
          overflow-x: auto;
        }

        .decision-approved {
          background: #d4edda;
          color: #155724;
          padding: 6px 12px;
          border-radius:20px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
        }

        .decision-rejected {
          background: #f8d7da;
          color: #721c24;
          padding: 6px 12px;
          border-radius:20px;
          font-size: 12px;
          font-weight: 500;
          display: inline-block;
        }

        .comment-cell {
          max-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}