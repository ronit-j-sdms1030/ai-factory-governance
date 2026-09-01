function LeaveRequest() {
  // Mock data
  const employee = {
    id: 101,
    first_name: "Aarav",
    last_name: "Patel",
    department_id: 5,
    manager_id: 205
  };

  const leaveTypes = [
    { id: 1, name: "Annual Leave", code: "AL", balance: 12 },
    { id: 2, name: "Sick Leave", code: "SL", balance: 8 },
    { id: 3, name: "Personal Leave", code: "PL", balance: 5 }
  ];

  const holidays = [
    { id: 1, name: "Republic Day", date: "2024-01-26" },
    { id: 2, name: "Independence Day", date: "2024-08-15" },
    { id: 3, name: "Diwali", date: "2024-10-31" }
  ];

  const existingLeaves = [
    { id: 10, start_date: "2024-02-10", end_date: "2024-02-12" },
    { id: 15, start_date: "2024-06-05", end_date: "2024-06-05" }
  ];

  const approvalPath = [
    { id: 205, name: "Ravi Kumar", role: "Team Lead" },
    { id: 301, name: "Sunita Rao", role: "Department Head" }
  ];

  // State
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [leaveTypeId, setLeaveTypeId] = React.useState(1);
  const [reason, setReason] = React.useState("");
  const [selectedDates, setSelectedDates] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Derived values
  const selectedLeaveType = leaveTypes.find(lt => lt.id === leaveTypeId);
  const totalDays = selectedDates.length;
  const remainingBalance = selectedLeaveType ? selectedLeaveType.balance - totalDays : 0;
  
  // Handle date selection
  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    
    if (start && end) {
      const dates = [];
      const currentDate = new Date(start);
      const endDateObj = new Date(end);
      
      while (currentDate <= endDateObj) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      // Filter out weekends and holidays
      const filteredDates = dates.filter(date => {
        const day = date.getDay();
        const dateString = date.toISOString().split('T')[0];
        const isWeekend = (day === 0 || day === 6);
        const isHoliday = holidays.some(h => h.date === dateString);
        const isExistingLeave = existingLeaves.some(l => 
          dateString >= l.start_date && dateString <= l.end_date);
        
        return !isWeekend && !isHoliday && !isExistingLeave;
      });
      
      setSelectedDates(filteredDates);
    } else {
      setSelectedDates([]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Leave request submitted!\n${totalDays} day(s) requested for ${selectedLeaveType.name}`);
      setIsSubmitting(false);
      // Reset form
      setStartDate("");
      setEndDate("");
      setReason("");
      setSelectedDates([]);
    }, 1500);
  };

  // Render calendar days with indicators
  const renderCalendarDay = (date) => {
    const dateString = date.toISOString().split('T')[0];
    const day = date.getDay();
    const isWeekend = (day === 0 || day === 6);
    const isHoliday = holidays.some(h => h.date === dateString);
    const isExistingLeave = existingLeaves.some(l => 
      dateString >= l.start_date && dateString <= l.end_date);
    const isSelected = selectedDates.some(d => 
      d.toISOString().split('T')[0] === dateString);
    
    let className = "calendar-day";
    if (isWeekend) className += " weekend";
    if (isHoliday) className += " holiday";
    if (isExistingLeave) className += " blocked";
    if (isSelected) className += " selected";
    
    return (
      <div key={dateString} className={className}>
        {date.getDate()}
        {isHoliday && <span className="indicator holiday-indicator">H</span>}
        {isExistingLeave && <span className="indicator blocked-indicator">L</span>}
      </div>
    );
  };

  // Generate calendar for next 3 months
  const generateCalendar = () => {
    const months = [];
    const today = new Date();
    
    for (let i = 0; i < 3; i++) {
      const month = new Date(today.getFullYear(), today.getMonth() + i, 1);
      const monthName = month.toLocaleString('default', { month: 'long', year: 'numeric' });
      const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
      
      const days = [];
      for (let j = 1; j <= daysInMonth; j++) {
        const date = new Date(month.getFullYear(), month.getMonth(), j);
        days.push(renderCalendarDay(date));
      }
      
      months.push(
        <div key={i} className="calendar-month">
          <h3>{monthName}</h3>
          <div className="calendar-grid">
            <div className="calendar-header">Sun</div>
            <div className="calendar-header">Mon</div>
            <div className="calendar-header">Tue</div>
            <div className="calendar-header">Wed</div>
            <div className="calendar-header">Thu</div>
            <div className="calendar-header">Fri</div>
            <div className="calendar-header">Sat</div>
            {days}
          </div>
        </div>
      );
    }
    
    return months;
  };

  return (
    <div className="leave-request-container">
      <div className="header">
        <h1>Request Leave</h1>
        <p>Submit a new leave request for approval</p>
      </div>
      
      <div className="content">
        <form onSubmit={handleSubmit} className="leave-form">
          <div className="form-section">
            <h2>Leave Details</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Leave Type</label>
                <div className="select-with-balance">
                  <select 
                    value={leaveTypeId} 
                    onChange={(e) => setLeaveTypeId(Number(e.target.value))}
                    className="leave-type-select"
                  >
                    {leaveTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <div className="balance-display">
                    Balance: {selectedLeaveType?.balance} days
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Dates</label>
                <div className="date-inputs">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => handleDateChange(e.target.value, endDate)}
                    className="date-input"
                  />
                  <span>to</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => handleDateChange(startDate, e.target.value)}
                    className="date-input"
                  />
                </div>
                <div className="date-summary">
                  {totalDays > 0 && (
                    <p>{totalDays} working day(s) selected</p>
                  )}
                  {remainingBalance < 0 && (
                    <p className="warning">Insufficient balance</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label>Reason <span className="required">*</span></label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Briefly explain the reason for your leave"
                required
                className="reason-textarea"
              />
            </div>
          </div>
          
          <div className="form-section">
            <h2>Calendar</h2>
            <div className="calendar-container">
              {generateCalendar()}
            </div>
            <div className="calendar-legend">
              <div className="legend-item">
                <div className="indicator holiday-indicator">H</div>
                <span>Holiday</span>
              </div>
              <div className="legend-item">
                <div className="indicator blocked-indicator">L</div>
                <span>Existing Leave</span>
              </div>
              <div className="legend-item">
                <div className="indicator weekend-indicator"></div>
                <span>Weekend</span>
              </div>
              <div className="legend-item">
                <div className="indicator selected-indicator"></div>
                <span>Selected</span>
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h2>Approval Path</h2>
            <div className="approval-path">
              {approvalPath.map((approver, index) => (
                <div key={approver.id} className="approver">
                  <div className="approver-position">{index + 1}</div>
                  <div className="approver-details">
                    <div className="approver-name">{approver.name}</div>
                    <div className="approver-role">{approver.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              disabled={isSubmitting || !startDate || !endDate || !reason || remainingBalance < 0}
              className="submit-button"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
      
      <style jsx>{`
        .leave-request-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        
        .header {
          margin-bottom: 30px;
        }
        
        .header h1 {
          font-size: 28px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 8px;
        }
        
        .header p {
          font-size: 16px;
          color: #7f8c8d;
        }
        
        .content {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          padding: 30px;
        }
        
        .leave-form {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        
        .form-section {
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        
        .form-section:last-child {
          border-bottom: none;
        }
        
        .form-section h2 {
          font-size: 20px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 20px;
        }
        
        .form-row {
          display: flex;
          gap: 30px;
          margin-bottom: 20px;
        }
        
        .form-group {
          flex: 1;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #34495e;
        }
        
        .required {
          color: #e74c3c;
        }
        
        .select-with-balance {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .leave-type-select {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
        }
        
        .balance-display {
          font-size: 14px;
          color: #7f8c8d;
          background: #f8f9fa;
          padding: 8px 12px;
          border-radius: 4px;
        }
        
        .date-inputs {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .date-input {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
          flex: 1;
        }
        
        .date-summary {
          margin-top: 10px;
        }
        
        .date-summary p {
          margin: 5px 0;
          font-size: 14px;
        }
        
        .warning {
          color: #e74c3c;
          font-weight: 500;
        }
        
        .reason-textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-family: inherit;
          font-size: 16px;
          min-height: 100px;
          resize: vertical;
        }
        
        .calendar-container {
          display: flex;
          gap: 30px;
          overflow-x: auto;
          padding-bottom: 20px;
        }
        
        .calendar-month {
          min-width: 300px;
        }
        
        .calendar-month h3 {
          text-align: center;
          margin-bottom: 15px;
          color: #2c3e50;
        }
        
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
        }
        
        .calendar-header {
          text-align: center;
          font-weight: 600;
          color: #7f8c8d;
          padding: 8px 0;
          font-size: 14px;
        }
        
        .calendar-day {
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border-radius: 6px;
          background: #f8f9fa;
        }
        
        .calendar-day.weekend {
          background: #ecf0f1;
          color: #95a5a6;
        }
        
        .calendar-day.holiday {
          background: #fff3cd;
        }
        
        .calendar-day.blocked {
          background: #f8d7da;
        }
        
        .calendar-day.selected {
          background: #3498db;
          color: white;
        }
        
        .indicator {
          position: absolute;
          top: 2px;
          right: 2px;
          font-size: 10px;
          font-weight: bold;
        }
        
        .holiday-indicator {
          color: #856404;
        }
        
        .blocked-indicator {
          color: #721c24;
        }
        
        .calendar-legend {
          display: flex;
          gap: 20px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }
        
        .weekend-indicator {
          width: 16px;
          height: 16px;
          background: #ecf0f1;
          border-radius: 3px;
        }
        
        .selected-indicator {
          width: 16px;
          height: 16px;
          background: #3498db;
          border-radius: 3px;
        }
        
        .approval-path {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .approver {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        
        .approver-position {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #3498db;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        
        .approver-details {
          flex: 1;
        }
        
        .approver-name {
          font-weight: 600;
          color: #2c3e50;
        }
        
        .approver-role {
          font-size: 14px;
          color: #7f8c8d;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          padding-top: 20px;
        }
        
        .submit-button {
          padding: 14px 28px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .submit-button:hover:not(:disabled) {
          background: #2980b9;
        }
        
        .submit-button:disabled {
          background: #bdc3c7;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .form-row {
            flex-direction: column;
            gap: 20px;
          }
          
          .calendar-container {
            flex-direction: column;
          }
          
          .calendar-month {
            min-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}