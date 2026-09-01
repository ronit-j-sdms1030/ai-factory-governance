function ProfileSettings() {
  // Mock data
  const employeeData = {
    id: "EMP00123",
    first_name: "Alex",
    last_name: "Morgan",
    email: "alex.morgan@starkdigital.com",
    timezone: "Asia/Kolkata",
    shift_type: "Fixed (9:00 AM - 6:00 PM)",
    joining_date: "2021-03-15",
    employment_status: "Active"
  };

  const [timezone, setTimezone] = React.useState(employeeData.timezone);
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false
  });
  const [facialEnrollmentStatus, setFacialEnrollmentStatus] = React.useState("Enrolled");
  const [deviceSyncStatus, setDeviceSyncStatus] = React.useState("Synced");
  const [passwordLastChanged, setPasswordLastChanged] = React.useState("2023-11-15");
  const [attendancePolicyAware, setAttendancePolicyAware] = React.useState(true);

  const timezones = [
    "Asia/Kolkata",
    "America/New_York",
    "Europe/London",
    "Australia/Sydney",
    "Asia/Tokyo"
  ];

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
  };

  const handleFacialEnrollment = () => {
    setFacialEnrollmentStatus(facialEnrollmentStatus === "Enrolled" ? "Pending" : "Enrolled");
  };

  const handleDeviceSync = () => {
    setDeviceSyncStatus("Syncing...");
    setTimeout(() => setDeviceSyncStatus("Synced"), 2000);
  };

  const handleChangePassword = () => {
    alert("Redirecting to password change page...");
  };

  const handleExportData = () => {
    alert("Data export request submitted. You will receive an email when ready.");
  };

  const togglePolicyAwareness = () => {
    setAttendancePolicyAware(!attendancePolicyAware);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-blue-700">WorkPulse</h1>
          <p className="text-gray-500 text-sm">Attendance & Leave Management</p>
        </div>
        <nav className="flex-1">
          <a href="/dashboard" className="block py-3 px-4 text-gray-600 hover:bg-blue-50 rounded-lg mb-2">Dashboard</a>
          <a href="/clock" className="block py-3 px-4 text-gray-600 hover:bg-blue-50 rounded-lg mb-2">Clock In/Out</a>
          <a href="/attendance" className="block py-3 px-4 text-gray-600 hover:bg-blue-50 rounded-lg mb-2">Attendance</a>
          <a href="/leave/request" className="block py-3 px-4 text-gray-600 hover:bg-blue-50 rounded-lg mb-2">Leave Request</a>
          <a href="/team" className="block py-3 px-4 text-gray-600 hover:bg-blue-50 rounded-lg mb-2">Team</a>
          <a href="/shifts" className="block py-3 px-4 text-gray-600 hover:bg-blue-50 rounded-lg mb-2">Shift Roster</a>
          <a href="/policies" className="block py-3 px-4 text-gray-600 hover:bg-blue-50 rounded-lg mb-2">Policies</a>
          <a href="/payroll" className="block py-3 px-4 text-gray-600 hover:bg-blue-50 rounded-lg mb-2">Payroll</a>
          <a href="/profile" className="block py-3 px-4 bg-blue-100 text-blue-700 font-medium rounded-lg mb-2">Profile Settings</a>
        </nav>
        <div className="pt-4 border-t border-gray-200">
          <p className="text-gray-500 text-sm">© 2023 Stark Digital</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Profile Settings</h2>
            <p className="text-gray-600">Manage your personal information and preferences</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">Employee ID</p>
                <p className="font-medium">{employeeData.id}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Email</p>
                <p className="font-medium">{employeeData.email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Name</p>
                <p className="font-medium">{employeeData.first_name} {employeeData.last_name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Employment Status</p>
                <p className="font-medium">{employeeData.employment_status}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Joining Date</p>
                <p className="font-medium">{new Date(employeeData.joining_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Shift Type</p>
                <p className="font-medium">{employeeData.shift_type}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Timezone Preference</h3>
            <div className="max-w-xs">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="timezone">
                Select Timezone
              </label>
              <select
                id="timezone"
                value={timezone}
                onChange={handleTimezoneChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {timezones.map(tz => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
              <p className="mt-2 text-sm text-gray-500">Current timezone: {timezone}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Facial Enrollment</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">Status: <span className={facialEnrollmentStatus === "Enrolled" ? "text-green-600" : "text-orange-500"}>{facialEnrollmentStatus}</span></p>
                <p className="text-gray-500 text-sm mt-1">Facial verification for clock-ins</p>
              </div>
              <button
                onClick={handleFacialEnrollment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {facialEnrollmentStatus === "Enrolled" ? "Manage" : "Enroll Now"}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-gray-500 text-sm">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-gray-500 text-sm">Receive updates via text message</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={() => handleNotificationChange('sms')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Device Sync</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Status: <span className={deviceSyncStatus === "Synced" ? "text-green-600" : "text-orange-500"}>{deviceSyncStatus}</span></p>
                <p className="text-gray-500 text-sm mt-1">Synchronize attendance data across devices</p>
              </div>
              <button
                onClick={handleDeviceSync}
                disabled={deviceSyncStatus === "Syncing..."}
                className={`px-4 py-2 rounded-lg transition-colors ${deviceSyncStatus === "Syncing..." ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                {deviceSyncStatus === "Syncing..." ? "Syncing..." : "Sync Now"}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Authentication</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-gray-500 text-sm mt-1">Last changed: {new Date(passwordLastChanged).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Attendance Policy</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Policy Awareness</p>
                <p className="text-gray-500 text-sm mt-1">I acknowledge I have read and understood company attendance policies</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={attendancePolicyAware}
                  onChange={togglePolicyAwareness}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Export</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Request Data Export</p>
                <p className="text-gray-500 text-sm mt-1">Download your personal attendance and leave data</p>
              </div>
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Request Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}