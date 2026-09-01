function EmployeeDirectory() {
  // Mock data
  const employees = [
    { id: 1, employee_id: 'EMP001', first_name: 'Alex', last_name: 'Johnson', department: 'Engineering', location: 'New York', shift_type: 'Day Shift', employment_status: 'Active', entra_id: 'user1@starkdigital.com' },
    { id: 2, employee_id: 'EMP002', first_name: 'Maria', last_name: 'Garcia', department: 'Marketing', location: 'London', shift_type: 'Evening Shift', employment_status: 'Active', entra_id: 'user2@starkdigital.com' },
    { id: 3, employee_id: 'EMP003', first_name: 'James', last_name: 'Wilson', department: 'Sales', location: 'Tokyo', shift_type: 'Night Shift', employment_status: 'On Leave', entra_id: 'user3@starkdigital.com' },
    { id: 4, employee_id: 'EMP004', first_name: 'Sarah', last_name: 'Miller', department: 'HR', location: 'New York', shift_type: 'Day Shift', employment_status: 'Active', entra_id: 'user4@starkdigital.com' },
    { id: 5, employee_id: 'EMP005', first_name: 'Robert', last_name: 'Davis', department: 'Finance', location: 'Remote', shift_type: 'Flexible', employment_status: 'Active', entra_id: 'user5@starkdigital.com' },
  ];

  const departments = ['All', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
  const locations = ['All', 'New York', 'London', 'Tokyo', 'Remote'];
  const statuses = ['All', 'Active', 'On Leave'];

  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDepartment, setSelectedDepartment] = React.useState('All');
  const [selectedLocation, setSelectedLocation] = React.useState('All');
  const [selectedStatus, setSelectedStatus] = React.useState('All');
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);
  
  // Filter employees based on search and filters
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.employee_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || emp.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'All' || emp.location === selectedLocation;
    const matchesStatus = selectedStatus === 'All' || emp.employment_status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesLocation && matchesStatus;
  });

  const handleViewAttendance = () => {
    alert(`Viewing attendance for ${selectedEmployee.first_name} ${selectedEmployee.last_name}`);
  };

  const handleAssignShift = () => {
    alert(`Assigning shift for ${selectedEmployee.first_name} ${selectedEmployee.last_name}`);
  };

  const handleManageLeave = () => {
    alert(`Managing leave for ${selectedEmployee.first_name} ${selectedEmployee.last_name}`);
  };

  const handleSyncStatusClick = () => {
    alert('Viewing Entra ID sync details');
  };

  function EmployeeSearchBar() {
    return (
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search employees by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '8px',
            border: '1px solid #D1D5DB',
            fontSize: '16px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
          }}
        />
      </div>
    );
  }

  function FilterPanel() {
    return (
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151' }}>Department</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid #D1D5DB',
              backgroundColor: 'white',
              minWidth: '150px'
            }}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151' }}>Location</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid #D1D5DB',
              backgroundColor: 'white',
              minWidth: '150px'
            }}
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500', color: '#374151' }}>Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '6px',
              border: '1px solid #D1D5DB',
              backgroundColor: 'white',
              minWidth: '150px'
            }}
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  function EmployeeTable() {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#F9FAFB' }}>
              <th style={{ textAlign: 'left', padding: '16px 20px', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Employee ID</th>
              <th style={{ textAlign: 'left', padding: '16px 20px', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Name</th>
              <th style={{ textAlign: 'left', padding: '16px 20px', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Department</th>
              <th style={{ textAlign: 'left', padding: '16px 20px', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Location</th>
              <th style={{ textAlign: 'left', padding: '16px 20px', fontWeight: '600', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>Shift Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr 
                key={employee.id} 
                onClick={() => setSelectedEmployee(employee)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedEmployee?.id === employee.id ? '#EFF6FF' : 'white',
                  transition: 'background-color 0.2s'
                }}
              >
                <td style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>{employee.employee_id}</td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB', fontWeight: '500', color: '#1F2937' }}>
                  {employee.first_name} {employee.last_name}
                </td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>{employee.department}</td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>{employee.location}</td>
                <td style={{ padding: '16px 20px', borderBottom: '1px solid #E5E7EB', color: '#4B5563' }}>{employee.shift_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function EmployeeProfileView() {
    if (!selectedEmployee) {
      return (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          padding: '32px',
          textAlign: 'center',
          color: '#6B7280'
        }}>
          <p>Select an employee to view details</p>
        </div>
      );
    }

    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            fontWeight: '600',
            color: '#4B5563',
            marginRight: '20px'
          }}>
            {selectedEmployee.first_name.charAt(0)}{selectedEmployee.last_name.charAt(0)}
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1F2937' }}>
              {selectedEmployee.first_name} {selectedEmployee.last_name}
            </h2>
            <p style={{ margin: '4px 0 0', color: '#6B7280' }}>{selectedEmployee.employee_id}</p>
            <p style={{ margin: '4px 0 0', color: '#6B7280' }}>{selectedEmployee.email || `${selectedEmployee.first_name.toLowerCase()}.${selectedEmployee.last_name.toLowerCase()}@company.com`}</p>
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>Department</p>
            <p style={{ margin: '4px 0 0', fontWeight: '500', color: '#1F2937' }}>{selectedEmployee.department}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>Location</p>
            <p style={{ margin: '4px 0 0', fontWeight: '500', color: '#1F2937' }}>{selectedEmployee.location}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>Shift Type</p>
            <p style={{ margin: '4px 0 0', fontWeight: '500', color: '#1F2937' }}>{selectedEmployee.shift_type}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>Status</p>
            <p style={{ margin: '4px 0 0', fontWeight: '500', color: selectedEmployee.employment_status === 'Active' ? '#10B981' : '#F59E0B' }}>
              {selectedEmployee.employment_status}
            </p>
          </div>
        </div>
        
        <div style={{ marginTop: 'auto' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: '600', color: '#1F2937' }}>Quick Actions</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleViewAttendance}
              style={{
                padding: '10px 16px',
                backgroundColor: '#3B82F6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                flex: 1,
                minWidth: '120px'
              }}
            >
              View Attendance
            </button>
            <button
              onClick={handleAssignShift}
              style={{
                padding: '10px 16px',
                backgroundColor: 'white',
                color: '#3B82F6',
                border: '1px solid #3B82F6',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                flex: 1,
                minWidth: '120px'
              }}
            >
              Assign Shift
            </button>
            <button
              onClick={handleManageLeave}
              style={{
                padding: '10px 16px',
                backgroundColor: 'white',
                color: '#3B82F6',
                border: '1px solid #3B82F6',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                flex: 1,
                minWidth: '120px'
              }}
            >
              Manage Leave
            </button>
          </div>
        </div>
      </div>
    );
  }

  function EntraIDSyncStatus() {
    return (
      <div 
        onClick={handleSyncStatusClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px',
          backgroundColor: '#F9FAFB',
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        <div style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          backgroundColor: '#10B981',
          marginRight: '8px'
        }}></div>
        <span style={{ fontSize: '14px', color: '#374151' }}>
          Entra ID Sync: <span style={{ fontWeight: '600' }}>Active</span> (Last sync: 2 mins ago)
        </span>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1F2937', marginBottom: '24px' }}>Employee Directory</h1>
        
        <EmployeeSearchBar />
        <FilterPanel />
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div>
            <EmployeeTable />
            <EntraIDSyncStatus />
          </div>
          <div>
            <EmployeeProfileView />
          </div>
        </div>
      </div>
    </div>
  );
}