function Dashboard() {
  // Mock user role - in reality would come from auth context
  const userRole = 'employee'; // 'employee', 'manager', or 'hr'
  
  // Mock data based on role
  const userData = {
    employee: {
      name: "Amit Sharma",
      employeeId: "EMP00789",
      shift: {
        name: "Day Shift",
        startTime: "09:00 AM",
        endTime: "06:00 PM",
        gracePeriod: 15,
        isLate: false
      },
      nextAction: {
        type: "Clock In",
        time: "in 15 minutes"
      },
      recentAttendance: [
        { date: "2023-06-15", status: "present" },
        { date: "2023-06-14", status: "late", lateMinutes: 22 },
        { date: "2023-06-13", status: "present" },
        { date: "2023-06-12", status: "absent" },
        { date: "2023-06-11", status: "present" }
      ]
    },
    manager: {
      teamAttendance: [
        { id: 1, name: "Raj Patel", status: "present" },
        { id: 2, name: "Priya Nair", status: "late" },
        { id: 3, name: "Vikram Singh", status: "absent" },
        { id: 4, name: "Anjali Mehta", status: "present" },
        { id: 5, name: "Karan Kapoor", status: "present" }
      ],
      pendingLeaves: [
        { id: 101, employee: "Sneha Reddy", type: "Sick Leave", days: 2, submitted: "2023-06-15" },
        { id: 102, employee: "Manoj Kumar", type: "Casual Leave", days: 1, submitted: "2023-06-14" }
      ]
    },
    hr: {
      orgMetrics: {
        attendanceRate: 94.2,
        lateArrivals: 3.8,
        leaveRequests: 12,
        pendingApprovals: 5
      }
    }
  };

  const currentData = userData[userRole];
  
  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      present: { backgroundColor: '#e8f5e9', color: '#2e7d32', border: '1px solid #4caf50' },
      late: { backgroundColor: '#fff3e0', color: '#ef6c00', border: '1px solid #ff9800' },
      absent: { backgroundColor: '#ffebee', color: '#c62828', border: '1px solid #f44336' }
    };
    
    return (
      <span style={{
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '500',
        ...statusStyles[status]
      }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };
  
  // Quick action button component
  const QuickActionButton = ({ icon, label, onClick }) => (
    <button 
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#f5f7fa',
        cursor: 'pointer',
        transition: 'all 0.2s',
        width: '100%',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#e3f2fd'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#f5f7fa'}
    >
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
      <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>{label}</span>
    </button>
  );
  
  return (
    <div style={{ 
      padding: '24px', 
      backgroundColor: '#fafbfc', 
      minHeight: '100vh',
      fontFamily: 'Segoe UI, Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '32px' 
      }}>
        <div>
          <h1 style={{ 
            margin: 0, 
            fontSize: '28px', 
            fontWeight: '600', 
            color: '#1a237e' 
          }}>
            Good morning, {currentData.name || 'HR Team'}
          </h1>
          <p style={{ 
            margin: '4px 0 0 0', 
            color: '#666', 
            fontSize: '16px' 
          }}>
            Here's what's happening with your attendance today
          </p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '8px 16px', 
            backgroundColor: '#e3f2fd', 
            borderRadius: '20px',
            border: '1px solid #bbdefb'
          }}>
            <div style={{ 
              width: '10px', 
              height: '10px', 
              borderRadius: '50%', 
              backgroundColor: '#4caf50',
              marginRight: '8px'
            }}></div>
            <span style={{ fontSize: '14px', fontWeight: '500' }}>Online</span>
          </div>
          
          <div style={{ position: 'relative' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              backgroundColor: '#3f51b5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              {currentData.name ? currentData.name.charAt(0) : 'H'}
            </div>
            <div style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '12px',
              height: '12px',
              backgroundColor: '#4caf50',
              border: '2px solid white',
              borderRadius: '50%'
            }}></div>
          </div>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px' 
      }}>
        {/* Today's Shift Card */}
        {userRole === 'employee' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            gridColumn: '1 / -1'
          }}>
            <h2 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#333' 
            }}>
              Today's Shift
            </h2>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <div>
                <h3 style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '24px', 
                  fontWeight: '600',
                  color: '#1a237e'
                }}>
                  {currentData.shift.name}
                </h3>
                <p style={{ 
                  margin: 0, 
                  color: '#666', 
                  fontSize: '16px' 
                }}>
                  {currentData.shift.startTime} - {currentData.shift.endTime}
                </p>
              </div>
              
              <div style={{
                padding: '8px 16px',
                backgroundColor: currentData.shift.isLate ? '#fff3e0' : '#e8f5e9',
                borderRadius: '20px',
                border: `1px solid ${currentData.shift.isLate ? '#ff9800' : '#4caf50'}`
              }}>
                <span style={{ 
                  fontWeight: '500',
                  color: currentData.shift.isLate ? '#ef6c00' : '#2e7d32'
                }}>
                  {currentData.shift.isLate ? 'Late Arrival' : 'On Time'}
                </span>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '16px',
              borderTop: '1px solid #eee'
            }}>
              <div>
                <p style={{ 
                  margin: '0 0 4px 0', 
                  color: '#666', 
                  fontSize: '14px' 
                }}>
                  Next Action
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '18px', 
                  fontWeight: '600',
                  color: '#333'
                }}>
                  {currentData.nextAction.type} {currentData.nextAction.time}
                </p>
              </div>
              
              <button style={{
                padding: '12px 24px',
                backgroundColor: '#3f51b5',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#303f9f'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3f51b5'}>
                Clock In Now
              </button>
            </div>
          </div>
        )}
        
        {/* Recent Attendance */}
        {userRole === 'employee' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#333' 
            }}>
              Recent Attendance
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentData.recentAttendance.map((record, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: index !== currentData.recentAttendance.length - 1 ? '1px solid #f0f0f0' : 'none'
                }}>
                  <span style={{ fontSize: '16px', color: '#333' }}>
                    {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                  <StatusBadge status={record.status} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Team Attendance Grid */}
        {userRole === 'manager' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            gridColumn: '1 / -1'
          }}>
            <h2 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#333' 
            }}>
              Team Attendance Today
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
              gap: '16px' 
            }}>
              {currentData.teamAttendance.map(member => (
                <div key={member.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                  border: '1px solid #eee'
                }}>
                  <span style={{ fontWeight: '500', color: '#333' }}>{member.name}</span>
                  <StatusBadge status={member.status} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Pending Leaves */}
        {userRole === 'manager' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#333' 
            }}>
              Pending Leave Approvals
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {currentData.pendingLeaves.map(leave => (
                <div key={leave.id} style={{
                  padding: '16px',
                  backgroundColor: '#fff8e1',
                  borderRadius: '8px',
                  border: '1px solid #ffecb3'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '8px' 
                  }}>
                    <span style={{ fontWeight: '500', color: '#333' }}>{leave.employee}</span>
                    <span style={{ 
                      padding: '2px 8px', 
                      backgroundColor: '#ffecb3', 
                      borderRadius: '12px', 
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>
                      {leave.days} {leave.days === 1 ? 'day' : 'days'}
                    </span>
                  </div>
                  <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
                    {leave.type}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                  }}>
                    <span style={{ fontSize: '12px', color: '#999' }}>
                      Submitted: {leave.submitted}
                    </span>
                    <button style={{
                      padding: '6px 12px',
                      backgroundColor: '#3f51b5',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Organization Metrics */}
        {userRole === 'hr' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            gridColumn: '1 / -1'
          }}>
            <h2 style={{ 
              margin: '0 0 16px 0', 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#333' 
            }}>
              Organization Metrics
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '24px' 
            }}>
              <div>
                <p style={{ 
                  margin: '0 0 8px 0', 
                  color: '#666', 
                  fontSize: '14px' 
                }}>
                  Overall Attendance Rate
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '32px', 
                  fontWeight: '600',
                  color: '#1a237e'
                }}>
                  {currentData.orgMetrics.attendanceRate}%
                </p>
              </div>
              
              <div>
                <p style={{ 
                  margin: '0 0 8px 0', 
                  color: '#666', 
                  fontSize: '14px' 
                }}>
                  Late Arrivals
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '32px', 
                  fontWeight: '600',
                  color: '#ef6c00'
                }}>
                  {currentData.orgMetrics.lateArrivals}%
                </p>
              </div>
              
              <div>
                <p style={{ 
                  margin: '0 0 8px 0', 
                  color: '#666', 
                  fontSize: '14px' 
                }}>
                  Leave Requests Today
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '32px', 
                  fontWeight: '600',
                  color: '#333'
                }}>
                  {currentData.orgMetrics.leaveRequests}
                </p>
              </div>
              
              <div>
                <p style={{ 
                  margin: '0 0 8px 0', 
                  color: '#666', 
                  fontSize: '14px' 
                }}>
                  Pending Approvals
                </p>
                <p style={{ 
                  margin: 0, 
                  fontSize: '32px', 
                  fontWeight: '600',
                  color: '#c62828'
                }}>
                  {currentData.orgMetrics.pendingApprovals}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Quick Actions */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#333' 
          }}>
            Quick Actions
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '16px' 
          }}>
            <QuickActionButton 
              icon="⏱️" 
              label="Clock In/Out" 
              onClick={() => console.log('Navigate to clock interface')} 
            />
            <QuickActionButton 
              icon="📅" 
              label="View Calendar" 
              onClick={() => console.log('Navigate to calendar')} 
            />
            <QuickActionButton 
              icon="📝" 
              label="Request Leave" 
              onClick={() => console.log('Navigate to leave request')} 
            />
            <QuickActionButton 
              icon="👤" 
              label="My Profile" 
              onClick={() => console.log('Navigate to profile')} 
            />
          </div>
        </div>
        
        {/* Offline Sync Status */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ 
            margin: '0 0 16px 0', 
            fontSize: '20px', 
            fontWeight: '600', 
            color: '#333' 
          }}>
            Sync Status
          </h2>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            padding: '16px',
            backgroundColor: '#e8f5e9',
            borderRadius: '8px',
            border: '1px solid #4caf50'
          }}>
            <div style={{ 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: '#4caf50',
              marginRight: '12px'
            }}></div>
            <div>
              <p style={{ 
                margin: '0 0 4px 0', 
                fontWeight: '500',
                color: '#2e7d32'
              }}>
                Online & Synced
              </p>
              <p style={{ 
                margin: 0, 
                fontSize: '14px', 
                color: '#666' 
              }}>
                0 queued operations
              </p>
            </div>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ 
              margin: '0 0 8px 0', 
              color: '#666', 
              fontSize: '14px' 
            }}>
              Last sync: Just now
            </p>
            <button style={{
              padding: '8px 16px',
              backgroundColor: '#f5f7fa',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              Force Sync
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}