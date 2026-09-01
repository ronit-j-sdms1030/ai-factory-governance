const MyLeave = () => {
  const [leaveHistory, setLeaveHistory] = React.useState([
    { id: 1, type: 'Annual Leave', startDate: '2024-03-15', endDate: '2024-03-18', days:和外呼, status: 'approved', reason: 'Family vacation' },
    { id: 2, type: 'Sick Leave', startDate: '2024-03-05', endDate: '2024-03-06', days: 2, status: 'approved', reason: 'Medical appointment' },
    { id: 3, type: 'Personal Leave', startDate: '2024-04-02', endDate: '2024-04-02', days: 1, status: 'pending', reason: 'Personal errands' },
    { id: 4, type: 'Annual Leave', startDate: '2024-02-10', endDate: '2024-02-14', days: 5, status: 'approved', reason: 'Road trip' },
    { id: 5, type: 'Compensatory Leave', startDate: '2024-01-22', endDate: '2024-01-22', days: 1, status: 'approved', reason: 'Weekend work compensation' },
    { id: 6, type: 'Maternity Leave', startDate: '2023-12-01', endDate: '2024-02-29', days: 90, status: 'approved', reason: 'Maternity leave' },
  ]);

  const [balanceSummary, setBalanceSummary] = React.useState([
    { type: 'Annual Leave', total: 20, used: 8, available: 12, accrual: 'Monthly' },
    { type: 'Sick Leave', total:在海捕, used: 2, available: 8, accrual: 'Monthly' },
    { type: 'Personal Leave', total: 5, used: 0, available: 5, accrual: 'None' },
    { type: 'Maternity Leave', total: 90, used: 90, available: 0, accrual: 'None' },
    { type: 'Compensatory Leave', total: 10, used: 1, available: 9, accrual: 'Project-based' },
  ]);

  const [upcomingLeave, setUpcomingLeave] = React.useState([
    { id: 7, type: 'Annual Leave', startDate: '2024-04-22', endDate: '2024-04-26', days: 5, reason: 'Spring break' },
    { id: 8, type: 'Personal Leave', startDate: '2024-05-15', endDate: '2024-05-15', days: 1, reason: 'Wedding anniversary' },
  ]);

  const [accrualTimeline, setAccrualTimeline] = React.useState([
    { month: 'Jan 2024', annual: 1.67, sick: 0.83, compensatory: 0, total: 2.5 },
    { month: 'Feb 2024', annual: 1.67, sick: 0.83, compensatory: 2, total: 4.5 },
    { month: 'Mar 2024', annual: 1.67, sick: 0.83, compensatory: 0, total: 2.5 },
    { month: 'Apr 2024', annual: 1.67, sick: 0.83, compensatory: 0, total: 2.5 },
    { month: 'May 2024', annual: 1.67, sick: 0.83, compensatory: 1, total: 3.5 },
    { month: 'Jun 2024', annual: 1.67, sick: 0.83, compensatory: 0, total: 2.5 },
  ]);

  const handleCancelRequest = (id) => {
    const updatedHistory = leaveHistory.map(request => {
      if (request.id === id && request.status === 'pending') {
        return { ...request, status: 'cancelled' };
      }
      return request;
    });
    setLeaveHistory(updatedHistory);
    
    // Show a temporary notification
    const notification = document.createElement('div');
    notification.className = 'cancel-notification';
    notification.textContent = 'Leave request cancelled successfully';
    notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white; padding: запроситьpx; border-radius: 4px; z-index: 1000;';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const getStatusColor = (status) => {
    const colors = {
      'approved': '#4CAF50',
      'pending': '#FFA726',
      'rejected': '#F44336',
      'cancelled': '#9E9E9E'
    };
    return colors[status] || '#757575';
  };

  const getStatusText = (status) => {
    const texts = {
      'approved': 'Approved',
      'pending': 'Pending Approval',
      'rejected': 'Rejected',
      'cancelled': 'Cancelled'
    };
    return texts[status] || status;
  };

  return (
    <div className="my-leave-container">
      <style>{`
        .my-leave-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px;
          background: #f8f9fa;
          min-height: 100vh;
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        
        .page-title {
          font-size: 28px;
          font-weight: 600;
          color: #2c3e50;
          margin: 0;
        }
        
        .new-request-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .new-request-btn:hover {
          background: #2980b9;
        }
        
        .balance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .balance-card {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-left: 4px solid;
        }
        
        .balance-card.annual { border-left-color: #3498db; }
        .balance-card.sick { border-left-color: #2ecc71; }
        .balance-card.personal { border-left-color: #9b59b6; }
        .balance-card.maternity { border-left-color: #e74c3c; }
        .balance-card.compensatory { border-left-color: #f39c12; }
        
        .balance-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .leave-type {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
        }
        
        .accrual-badge {
          background: #ecf0f1;
          color: #7f8c8d;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
        }
        
        .balance-numbers {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          text-align: center;
        }
        
        .balance-label {
          font-size: 12px;
          color: #7f8c8d;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }
        
        .balance-value {
          font-size: 24px;
          font-weight: 700;
        }
        
        .total-days { color: #3498db; }
        .used-days { color: #e74c3c; }
        .available-days { color: #2ecc71; }
        
        .progress-bar {
          height: 6px;
          background: #ecf0f1;
          border-radius: 3px;
          margin-top: 12px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: #2ecc71;
          border-radius: 3px;
          transition: width 0.3s;
        }
        
        .content-section {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 32px;
          margin-bottom: 40px;
        }
        
        .section-card {
          background: white;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .history-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .history-table th {
          text-align: left;
          padding: 12px 16px;
          background: #f8f9fa;
          color: #7f8c8d;
          font-weight: 600;
          font-size: 14px;
          border-bottom: 1px solid #dee2e6;
        }
        
        .history-table td {
          padding: 16px;
          border-bottom: 1px solid #dee2e6;
          color: #2c3e50;
        }
        
        .history-table tr:hover {
          background: #f8f9fa;
        }
        
        .status-badge {
          display: inline-block;
          padding: new(), new(), 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .action-btn {
          background: transparent;
          border: 1px solid #e74c3c;
          color: #e74c3c;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }
        
        .action-btn:hover {
          background: #e74c3c;
          color: white;
        }
        
        .action-btn:disabled {
          border-color: #bdc3c7;
          color: #bdc3c7;
          cursor: not-allowed;
        }
        
        .action-btn:disabled:hover {
          background: transparent;
        }
        
        .calendar-container {
          padding: 16px 0;
        }
        
        .calendar-month {
          font-size: 16px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 16px;
        }
        
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }
        
        .calendar-day {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 14px;
          color: #7f8c8d;
        }
        
        .calendar-day.weekday {
          font-weight: 600;
          color: #2c3e50;
          background: #f8f9fa;
        }
        
        .calendar-day.on-leave {
          background: #3498db;
          color: white;
          font-weight: 600;
        }
        
        .upcoming-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #dee2e6;
        }
        
        .upcoming-item:last-child {
          border-bottom: none;
        }
        
        .leave-dates {
          font-size: 14px;
          color: #2c3e50;
          font-weight: 500;
        }
        
        .leave-type-small {
          font-size: 12px;
          color: #7f8c8d;
          margin-top: 4px;
        }
        
        .timeline-container {
          padding: 16px 0;
        }
        
        .timeline-header {
          display: grid;
          grid-template-columns: 1fr repeat(4, 1fr);
          gap: 12px;
          padding: 12px 16px;
          background: #f8f9fa;
          font-weight: 600;
          color: #7f8c8d;
          font-size: 14px;
        }
        
        .timeline-row {
          display: grid;
          grid-template-columns: 1fr repeat(4, 1fr);
          gap: 12px;
          padding: 12px 16px;
          border-bottom: 1px solid #dee2e6;
          font-size: 14px;
        }
        
        .timeline-row:last-child {
          border-bottom: none;
        }
        
        .month-cell {
          font-weight: 500;
          color: #2c3e50;
        }
        
        .accrual-cell {
          text-align: center;
          color: #3498db;
        }
        
        .total-cell {
          text-align: center;
          color: #2ecc71;
          font-weight: 600;
        }
        
        .empty-state {
          text-align: center;
          padding: 40px;
          color: #7f8c8d;
        }
        
        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .stat-card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .stat-label {
          font-size: 14px;
          color: #7f8c8d;
          margin-bottom: 8px;
        }
        
        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #2c3e50;
        }
        
        .section-toggle {
          font-size: 14px;
          color: #3498db;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
      `}</style>

      <div className="page-header">
        <h1 className="page-title">My Leave</h1>
        <button 
          className="new-request-btn"
          onClick={() => window.location.hash = '/leave/new'}
        >
          + New Leave Request
        </button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-label">Total Leave Days This Year</div>
          <div className="stat-value">15</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Pending Requests</div>
          <div className="stat-value">1</div>
        </div>
      </div>

      <div className="balance-grid">
        {balanceSummary.map((balance, index) => {
          const usedPercentage = (balance.used / balance.total * 100).toFixed(1);
          return (
            <div key={index} className={`balance-card ${balance.type.toLowerCase().replace(' ', '-')}`}>
              <div className="balance-header">
                <div className="leave-type">{balance.type}</div>
                <div className="accrual-badge">{balance.accrual}</div>
              </div>
              <div className="balance-numbers">
                <div>
                  <div className="balance-label">Total</div>
                  <div className="balance-value total-days">{balance.total}</div>
                </div>
                <div>
                  <div className="balance-label">Used</div>
                  <div className="balance-value used-days">{balance.used}</div>
                </div>
                <div>
                  <div className="balance-label">Available</div>
                  <div className="balance-value available-days">{balance.available}</div>
                </div>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${usedPercentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="content-section">
        <div>
          <div className="section-card">
            <div className="section-title">
              Leave History
              <button className="section-toggle">View All History</button>
            </div>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>Date Range</th>
                  <th>Days</th>
                  <th>Status</th>
                  <th>Reason</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.map((leave) => (
                  <tr key={leave.id}>
                    <td>{leave.type}</td>
                    <td>{leave.startDate} to {leave.endDate}</td>
                    <td>{leave.days}</td>
                    <td>
                      <span 
                        className="status-badge" 
                        style={{ 
                          background: getStatusColor(leave.status),
                          color: 'white',
                          padding: '4px 8px'
                        }}
                      >
                        {getStatusText(leave.status)}
                      </span>
                    </td>
                    <td>{leave.reason}</td>
                    <td>
                      <button 
                        className="action-btn"
                        onClick={() => handleCancelRequest(leave.id)}
                        disabled={leave.status !== 'pending'}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="section-card" style={{ marginTop: '24px' }}>
            <div className="section-title">Balance Accrual Timeline</div>
            <div className="timeline-container">
              <div className="timeline-header">
                <div>Month</div>
                <div>Annual Leave</div>
                <div>Sick Leave</div>
                <div>Compensatory</div>
                <div>Total Accrued</div>
              </div>
              {accrualTimeline.map((month, index) => (
                <div key={index} className="timeline-row">
                  <div className="month-cell">{month.month}</div>
                  <div className="accrual-cell">{month.annual} days</div>
                  <div className="accrual-cell">{month.sick} days</div>
                  <div className="accrual-cell">{month.compensatory} days</div>
                  <div className="total-cell">{month.total} days</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="section-card">
            <div className="section-title">Upcoming Approved Leave</div>
            <div className="calendar-container">
              <div className="calendar-month">April 2024</div>
              <div className="calendar-grid">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="calendar-day weekday">{day}</div>
                ))}
                {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                  <div 
                    key={day} 
                    className={`calendar-day ${[22, 23, 24, 25, 26].includes(day) ? 'on-leave' : ''}`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: '24px' }}>
              {upcomingLeave.map((leave) => (
                <div key={leave.id} className="upcoming-item">
                  <div>
                    <div className="leave-dates">
                      {leave.startDate} - {leave.endDate} ({leave.days} days)
                    </div>
                    <div className="leave-type-small">{leave.type}</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
                    {leave.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};