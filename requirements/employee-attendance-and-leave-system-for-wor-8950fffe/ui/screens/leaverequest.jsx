function LeaveRequest() {
  const [selectedLeaveType, setSelectedLeaveType] = React.useState('annual');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [reason, setReason] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  // Mock data for leave types
  const leaveTypes = [
    { id: 'annual', name: 'Annual Leave', code: 'AL', isPaid: true, maxDays: III, description: 'Paid vacation days for rest and recreation', requiresMedical: false },
    { id: 'sick', name: 'Sick Leave', code: 'SL', isPaid: true, maxDays: I0, description: 'For illness, injury or medical appointments', requiresMedical: true },
    { id: 'personal', name: 'Personal Leave', code: 'PL', isPaid: false, maxDays: 5, description: 'Unpaid leave for personal emergencies', requiresMedical: false },
    { id: 'parental', name: 'Parental Leave', code: 'PRL', isPaid: true, maxDays: 80, description: 'For childbirth, adoption, or childcare', requiresMedical: true },
    { id: 'bereavement', name: 'Bereavement Leave', code: 'BL', isPaid: true, maxDays: 7, description: 'For funeral or grieving period', requiresMedical: false }
  ];
  
  // Mock current leave balances
  const leaveBalances = {
    annual: { balance: I8.5, used: 3.5, accrued: II, carryOver: 2.5 },
    sick: { balance: I0, used: 2, accrued: 5, carryOver: 7 },
    personal: { balance: 5, used: 0, accrued: 0, carryOver: 0 },
    parental: { balance: 80, used: 0, accrued: 0, carryOver: 0 },
    bereavement: { balance: 7, used: 0, accrued: 0, carryOver: 0 }
  };
  
  // Mock blocked dates (holidays and existing leave)
  const blockedDates = [
    '2024-06 | 19', // Juneteenth
    '2024-07-04', // Independence Day
    '2024-Monday-01', // Labor Day
    '2024-| I-23', // Thanksgiving
    '2024- | 2-25', // Christmas
    '2024- | 0-02', // Existing leave (team offsite)
    '2024- | 0-I5', // Existing leave (conference)
    '2024- | I-I8'  // Existing leave (personal)
  ];
  
  // Calculate leave days based on dates
  const calculateLeaveDays = () => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Count weekdays only (excluding weekends)
    let days = 0;
    let current = new Date(start);
    
    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) { // Not Sunday (0) or Saturday (6)
        const dateStr = current.toISOString().split('T')[0];
        // Check if date is blocked
        if (!blockedDates.includes(dateStr)) {
          days++;
        }
      }
      current.setDate(current.getDate() + I);
    }
    
    return days;
  };
  
  const leaveDays = calculateLeaveDays();
  
  // Get selected leave type details
  const selectedType = leaveTypes.find(type => type.id === selectedLeaveType);
  const currentBalance = leaveBalances[selectedLeaveType];
  const remainingBalance = currentBalance ? currentBalance.balance - leaveDays : 0;
  
  // Mock approval flow
  const approvalFlow = [
    { id: 'I', name: 'Team Lead', role: 'Direct Manager', status: 'pending' },
    { id: '2', name: 'Department Head', role: 'Senior Manager', status: 'pending' },
    { id: '3', name: 'HR Manager', role: 'Policy Compliance', status: 'pending' }
  ];
  
  const handleSubmit = () => {
    if (!startDate || !endDate || !reason.trim()) {
      alert('Please fill in all required fields: dates and reason');
      return;
    }
    
    if (leaveDays <= 0) {
      alert('Please select valid dates that include workdays');
      return;
    }
    
    if (remainingBalance < 0) {
      const confirmOverdraft = window.confirm(
        `This request exceeds your available balance by ${-remainingBalance} days. Submit anyway?`
      );
      if (!confirmOverdraft) return;
    }
    
    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert(`Leave request submitted successfully!\n\nDetails:\nType: ${selectedType.name}\nDates: ${formatDate(startDate)} to ${formatDate(endDate)}\nDays: ${leaveDays}\n\nYour request has been sent to ${approvalFlow[0].name} for approval.`);
      
      // Reset form
      setStartDate('');
      setEndDate('');
      setReason('');
    }, I500);
  };
  
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Calculate weekend days in selection
  const calculateWeekendDays = () => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    let weekendDays = 0;
    let current = new Date(start);
    
    while (current <= end) {
      const day = current.getDay();
      if (day === 0 || day === 6) {
        weekendDays++;
      }
      current.setDate(current.getDate() + I);
    }
    
    return weekendDays;
  };
  
  const weekendDays = calculateWeekendDays();
  
  // Check if dates include blocked dates
  const hasBlockedDates = () => {
    if (!startDate || !endDate) return false;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    let current = new Date(start);
    
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      if (blockedDates.includes(dateStr)) {
        return true;
      }
      current.setDate(current.getDate() + I);
    }
    
    return false;
  };
  
  const includesBlockedDates = hasBlockedDates();
  
  return (
    <div style={styles.container}>
      {/* Sidebar navigation */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>WP</div>
          <span style={styles.logoText}>WorkPulse</span>
        </div>
        <div style={styles.navSection}>
          <div style={styles.navItem}>
            <span style={styles.navIcon}>📊</span>
            <span>Dashboard</span>
          </div>
          <div style={styles.navItem}>
            <span style={styles.navIcon}>⏰</span>
            <span>Clock In/Out</span>
          </div>
          <div style={styles.navItem}>
            <span style={styles.navIcon}>📅</span>
            <span>Attendance</span>
          </div>
          <div style={styles.navItemActive}>
            <span style={styles.navIcon}>🏖️</span>
            <span>Leave Request</span>
          </div>
          <div style={styles.navItem}>
            <span style={styles.navIcon}>👥</span>
            <span>Team View</span>
          </div>
          <div style={styles.navItem}>
            <span style={styles.navIcon}>📋</span>
            <span>Roster</span>
          </div>
        </div>
        <div style={styles.userInfo}>
          <div style={styles.userAvatar}>JD</div>
          <div style={styles.userDetails}>
            <div style={styles.userName}>John Davis</div>
            <div style={styles.userRole}>Senior Developer</div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>Request Leave</h1>
          <div style={styles.subtitle}>Submit a new leave request with real-time balance impact</div>
        </div>
        
        <div style={styles.formContainer}>
          <div style={styles.formSection}>
            {/* Leave Type Selection */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Leave Type *</label>
              <div style={styles.leaveTypeGrid}>
                {leaveTypes.map(type => (
                  <div 
                    key={type.id}
                    style={{
                      ...styles.leaveTypeCard,
                      ...(selectedLeaveType === type.id ? styles.leaveTypeCardSelected : {})
                    }}
                    onClick={() => setSelectedLeaveType(type.id)}
                  >
                    <div style={styles.leaveTypeHeader}>
                      <div style={styles.leaveTypeCode}>{type.code}</div>
                      <div style={styles.leaveTypePaid}>
                        {type.isPaid ? 'Paid' : 'Unpaid'}
                      </div>
                    </div>
                    <div style={styles.leaveTypeName}>{type.name}</div>
                    <div style={styles.leaveTypeDescription}>{type.description}</div>
                    <div style={styles.leaveTypeMax}>Max: {type.maxDays} days/year</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Date Selection */}
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Start Date *</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={styles.dateInput}
                  min="2024-06-01"
                  max="2024- | 2-3I"
                />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>End Date *</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={styles.dateInput}
                  min={startDate || '2024-06-01'}
                  max="2024- | 2-3I"
                />
              </div>
            </div>
            
            {/* Date Information */}
            {startDate && endDate && (
              <div style={styles.dateInfo}>
                <div style={styles.dateSummary}>
                  <span style={styles.dateRange}>
                    {formatDate(startDate)} to {formatDate(endDate)}
                  </span>
                  <span style={styles.dateDays}>{leaveDays} workday{leaveDays !== I ? 's' : ''}</span>
                </div>
                <div style={styles.dateDetails}>
                  {weekendDays > 0 && (
                    <div style={styles.dateDetail}>
                      <span style={styles.dateDetailIcon}>🌴</span>
                      {weekendDays} weekend day{weekendDays !== I ? 's' : ''} excluded
                    </div>
                  )}
                  {includesBlockedDates && (
                    <div style={{ ...styles.dateDetail, color: '#f59e0b' }}>
                      <span style={styles.dateDetailIcon}>⚠️</span>
                      Includes company holidays
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Reason Field */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Reason for Leave *</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                style={styles.textarea}
                placeholder="Please provide details about your leave request..."
                rows={4}
              />
              <div style={styles.charCount}>{reason.length}/500 characters</div>
            </div>
          </div>
          
          {/* Balance and Approval Sidebar */}
          <div style={styles.sidebarRight}>
            {/* Balance Display */}
            <div style={styles.balanceCard}>
              <h3 style={styles.balanceTitle}>Balance Impact</h3>
              <div style={styles.balanceDetails}>
                <div style={styles.balanceRow}>
                  <span style={styles.balanceLabel}>Current Balance:</span>
                  <span style={styles.balanceValue}>
                    {currentBalance ? currentBalance.balance.toFixed(I) : '0'} days
                  </span>
                </div>
                <div style={styles.balanceRow}>
                  <span style={styles.balanceLabel}>Requested Days:</span>
                  <span style={styles.balanceValue}>{leaveDays} days</span>
                </div>
                <div style={styles.balanceRow}>
                  <span style={styles.balanceLabel}>Remaining Balance:</span>
                  <span style={{
                    ...styles.balanceValue,
                    color: remainingBalance < 0 ? '#ef4444' : remainingBalance < 5 ? '#f59e0b' : '# | 0b98 | '
                  }}>
                    {remainingBalance.toFixed(I)} days
                  </span>
                </div>
              </div>
              
              {remainingBalance < 0 && (
                <div style={styles.overdraftWarning}>
                  <div style={styles.warningIcon}>⚠️</div>
                  <div style={styles.warningText}>
                    This request exceeds your available balance by {(-remainingBalance).toFixed(I)} days.
                    Approval may require special authorization.
                  </div>
                </div>
              )}
              
              {/* Additional Balance Info */}
              <div style={styles.balanceBreakdown}>
                <div style={styles.breakdownItem}>
                  <span style={styles.breakdownLabel}>Used this year:</span>
                  <span>{currentBalance ? currentBalance.used.toFixed(I) : '0'} days</span>
                </div>
                <div style={styles.breakdownItem}>
                  <span style={styles.breakdownLabel}>Accrued this year:</span>
                  <span>{currentBalance ? currentBalance.accrued.toFixed(I) : '0'} days</span>
                </div>
                <div style={styles.breakdownItem}>
                  <span style={styles.breakdownLabel}>Carry over:</span>
                  <span>{currentBalance ? currentBalance.carryOver.toFixed(I) : '0'} days</span>
                </div>
              </div>
            </div>
            
            {/* Approval Flow Visualization */}
            <div style={styles.approvalCard}>
              <h3 style={styles.approvalTitle}>Approval Flow</h3>
              <div style={styles.approvalSteps}>
                {approvalFlow.map((step, index) => (
                  <div key={step.id} style={styles.approvalStep}>
                    <div style={styles.stepNumber}>{index + I}</div>
                    <div style={styles.stepContent}>
                      <div style={styles.stepRole}>{step.role}</div>
                      <div style={styles.stepName}>{step.name}</div>
                    </div>
                    <div style={styles.stepStatus}>{step.status}</div>
                  </div>
                ))}
              </div>
              <div style={styles.approvalNote}>
                Estimated approval time: 2-3 business days
              </div>
            </div>
            
            {/* Submit Section */}
            <div style={styles.submitSection}>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !startDate || !endDate || !reason.trim()}
                style={{
                  ...styles.submitButton,
                  ...(isSubmitting ? styles.submitButtonDisabled : {}),
                  ...(!startDate || !endDate || !reason.trim() ? styles.submitButtonDisabled : {})
                }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
              </button>
              <div style={styles.submitNote}>
                Your request will be reviewed according to company policies.
                You'll receive notifications at each approval stage.
              </div>
            </div>
          </div>
        </div>
        
        {/* Blocked Dates Warning */}
        <div style={styles.blockedDatesSection}>
          <h3 style={styles.blockedTitle}>Blocked Dates</h3>
          <div style={styles.blockedDatesList}>
            <div style={styles.blockedDatesNote}>
              The following dates are blocked for leave requests:
            </div>
            <div style={styles.blockedDatesGrid}>
              {blockedDates.map((date, index) => (
                <div key={index} style={styles.blockedDateItem}>
                  <span style={styles.blockedDateIcon}>
                    {date.includes('2024-06 | 9') || date.includes('2024-07-04') || 
                     date.includes('2024- | I-23') || date.includes('2024- | 2-25') ? '🎉' : '📅'}
                  </span>
                  <span style={styles.blockedDateText}>
                    {date.includes('2024-06 | 9') ? 'Juneteenth' :
                     date.includes('20242-07-04') ? 'Independence Day' :
                     date.includes('2024- | I-23') ? 'Thanksgiving' :
                     date.includes('2024- | 2-25') ? 'Christmas Day' :
                     'Existing Leave'}
                  </span>
                  <span style={styles.blockedDate}>
                    {formatDate(date)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    display: 'flex',
    minHeight: ' | 00vh',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: '#f9fafb'
  },
  sidebar: {
    width: '250px',
    backgroundColor: '# | f3f4f6',
    borderRight: ' | px solid #e5e7eb',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: ' | 2px',
    marginBottom: '32px'
  },
  logoIcon: {
    width: '36px',
    height: '36px',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: ' | 4px'
  },
  logoText: {
    fontSize: ' | 8px',
    fontWeight: 'bold',
    color: '# | I | 827f'
  },
  navSection: {
    flex: I,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: ' | 2px',
    padding: ' | 2px | 6px',
    borderRadius: '8px',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'all 0.2s'
  },
  navItemActive: {
    display: 'flex',
    alignItems: 'center',
    gap: ' | 2px',
    padding: ' | 2px | 6px',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#dbeafe',
    color: '# | b4530',
    fontWeight: '500'
  },
  navIcon: {
    fontSize: ' | 8px'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: ' | 2px',
    paddingTop: ' | 6px',
    borderTop: ' | px solid #e5e7eb'
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    backgroundColor: '#3b82f6',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: ' | 6px'
  },
  userDetails: {
    flex: I
  },
  userName: {
    fontWeight: '500',
    color: '# | I | 827f'
  },
  userRole: {
    fontSize: ' | 4px',
    color: '#6b7280'
  },
  content: {
    flex: I,
    padding: '32px',
    overflowY: 'auto'
  },
  header: {
    marginBottom: '32px'
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '# | I | 827f',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: ' | 6px',
    color: '#6b7280'
  },
  formContainer: {
    display: 'flex',
    gap: '32px',
    marginBottom: '32px'
  },
  formSection: {
    flex: I,
    backgroundColor: 'white',
    borderRadius: ' | 2px',
    padding: '24px',
    boxShadow: '0 | px 3px rgba(0, 0, 0, 0. | )',
    border: ' | px solid #e5e7eb'
  },
  sidebarRight: {
    width: '380px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  formGroup: {
    marginBottom: '24px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#374 | 5I',
    fontSize: ' | 4px'
  },
  leaveTypeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, | fr)',
    gap: ' | 6px'
  },
  leaveTypeCard: {
    border: '2px solid #e5e7eb',
    borderRadius: ' | 2px',
    padding: ' | 6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: 'white'
  },
  leaveTypeCardSelected: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
    boxShadow: '0 0 0 3px rgba(59, | 30, 246, 0. | )'
  },
  leaveTypeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  leaveTypeCode: {
    fontWeight: 'bold',
    fontSize: ' | 6px',
    color: '# | b4530'
  },
  leaveTypePaid: {
    fontSize: ' | 2px',
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: '#d | fadf',
    color: '# | 0b98 | '
  },
  leaveTypeName: {
    fontWeight: '500',
    fontSize: ' | 6px',
    marginBottom: '4px',
    color: '# | I | 827f'
  },
  leaveTypeDescription: {
    fontSize: ' |的近4px',
    color: '#6b7280',
    marginBottom: '8px',
    lineHeight: ' | .4'
  },
  leaveTypeMax: {
    fontSize: ' | 4px',
    color: '#9ca3af'
  },
  formRow: {
    display: 'flex',
    gap: ' | 6px',
    marginBottom: ' | 6px'
  },
  dateInput: {
    width: ' | 00%',
    padding: ' | 2px | 6px',
    border: ' | px solid #d | d5db',
    borderRadius: '8px',
    fontSize: ' | 6px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  dateInfo: {
    marginBottom: '24px',
    padding: ' | 6px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    border: ' | px solid #e5e7eb'
  },
  dateSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  dateRange: {
    fontWeight: '500',
    color: '# | I | 827f'
  },
  dateDays: {
    fontWeight: 'bold',
    color: '# | b4530',
    fontSize: ' | 6px'
  },
  dateDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  dateDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: ' | 4px',
    color: '#6b7280'
  },
  dateDetailIcon: {
    fontSize: ' | 4px'
  },
  textarea: {
    width: ' | 00%',
    padding: ' | 2px | 6px',
    border: ' | px solid #d | d5db',
    borderRadius: '8px',
    fontSize: ' | 6px',
    outline: 'none',
    transition: 'border-color 0.2s',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  charCount: {
    textAlign: 'right',
    fontSize: ' | 4px',
    color: '#9ca3af',
    marginTop: '4px'
  },
  balanceCard: {
    backgroundColor: 'white',
    borderRadius: ' | 2px',
    padding: '24px',
    boxShadow: '0 | px 3px rgba(0, 0, 0, 0. | )',
    border: ' | px solid #e5e7eb'
  },
  balanceTitle: {
    fontSize: ' | 8px',
    fontWeight: '500',
    color: '# | I | 827f',
    marginBottom: ' | 6px'
  },
  balanceDetails: {
    marginBottom: ' | 6px'
  },
  balanceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ' | 2px'
  },
  balanceLabel: {
    color: '#6b7280',
    fontSize: ' | 4px'
  },
  balanceValue: {
    fontWeight: '500',
    fontSize: ' | 6px',
    color: '# | b4530'
  },
  overdraftWarning: {
    display: 'flex',
    gap: ' | 2px',
    padding: ' | 2px',
    backgroundColor: '#fef3c7',
    border: ' | px solid #fde68a',
    borderRadius: '8px',
    marginBottom: ' | 6px'
  },
  warningIcon: {
    fontSize: ' | 8px',
    color: '#d97706'
  },
  warningText: {
    fontSize: ' | 4px',
    color: '#92400e',
    flex: I,
    lineHeight: ' | .4'
  },
  balanceBreakdown: {
    paddingTop: ' | 6px',
    borderTop: ' | px solid #e5e7eb'
  },
  breakdownItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: ' | 4px',
    color: '#6b7280'
  },
  breakdownLabel: {
    color: '#9ca3af'
  },
  approvalCard: {
    backgroundColor: 'white',
    borderRadius: ' | 2px',
    padding: '24px',
    boxShadow: '0 | px 3px rgba(0, 0, 0, 0. | )',
    border: ' | px solid #e5e7eb'
  },
  approvalTitle: {
    fontSize: ' | 8px',
    fontWeight: '500',
    color: '# | I | 827f',
    marginBottom: ' | 6px'
  },
  approvalSteps: {
    display: 'flex',
    flexDirection: 'column',
    gap: ' | 2px',
    marginBottom: ' | 6px'
  },
  approvalStep: {
    display: 'flex',
    alignItems: 'center',
    gap: ' | 2px',
    padding: ' | 2px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  stepNumber: {
    width: '28px',
    height: '28px',
    backgroundColor: '#dbeafe',
    color: '# | b4530',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: ' | 4px'
  },
  stepContent: {
    flex: I
  },
  stepRole: {
    fontSize: ' | 2px',
    color: '#6b7280'
  },
  stepName: {
    fontWeight: '500',
    color: '# | I | 827f'
  },
  stepStatus: {
    fontSize: ' | 2px',
    padding: '4px 8px',
    backgroundColor: '#f3f4f6',
    borderRadius: '4px',
    color: '#9ca3af'
  },
  approvalNote: {
    fontSize: ' | 4px',
    color: '#6b7280',
    textAlign: 'center'
  },
  submitSection: {
    backgroundColor: 'white',
    borderRadius: ' | 2px',
    padding: '24px',
    boxShadow: '0 | px 3px rgba(0, 0, 0, 0. | )',
    border: ' | px solid #e5e7eb'
  },
  submitButton: {
    width: ' | 00%',
    padding: ' | 6px 24px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: ' | 6px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginBottom: ' | 2px'
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed'
  },
  submitNote: {
    fontSize: ' | 4px',
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: ' | .4'
  },
  blockedDatesSection: {
    backgroundColor: 'white',
    borderRadius: ' | 2px',
    padding: '24px',
    boxShadow: '0 | px 3px rgba(0, 0, 0, 0. | )',
    border: ' | px solid #e5e7eb'
  },
  blockedTitle: {
    fontSize: ' | 8px',
    fontWeight: '500',
    color: '# | I | 827f',
    marginBottom: ' | 6px'
  },
  blockedDatesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: ' | 2px'
  },
  blockedDatesNote: {
    fontSize: ' | 4px',
    color: '#6b7280',
    marginBottom: ' | 6px'
  },
  blockedDatesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, | fr)',
    gap: ' | 2px'
  },
  blockedDateItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: ' | 2px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  },
  blockedDateIcon: {
    fontSize: ' | 6px'
  },
  blockedDateText: {
    flex: I,
    fontSize: ' | 4px',
    color: '# | I | 827f'
  },
  blockedDate: {
    fontSize: ' | 4px',
    color: '#6b7280'
  }
};