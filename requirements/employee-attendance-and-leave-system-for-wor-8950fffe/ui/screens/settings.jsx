function Settings() {
  // Mock data
  const employee = {
    id: 1,
    employee_id: "EMP001234",
    first_name: "Alex",
    last_name: "Morgan",
    email: "alex.morgan@starkdigital.com",
    department: "Engineering",
    timezone: "Asia/Kolkata",
    joining_date: "2020-05-15",
    employment_status: "Full-time"
  };

  const deviceInfo = {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    platform: "Win32",
    language: "en-US",
    screenWidth: "1920x1080"
  };

  // State for settings
  const [timezone, setTimezone] = React.useState(employee.timezone);
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true
  });
  const [offlineSync, setOfflineSync] = React.useState(true);
  const [manualLocation, setManualLocation] = React.useState(false);
  const [facialVerification, setFacialVerification] = React.useState(true);
  
  // Handlers
  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
  };

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleOfflineSyncToggle = () => {
    setOfflineSync(!offlineSync);
  };

  const handleManualLocationToggle = () => {
    setManualLocation(!manualLocation);
  };

  const handleFacialVerificationToggle = () => {
    setFacialVerification(!facialVerification);
  };

  const handleExportData = () => {
    alert("Data export request submitted. You'll receive an email when ready.");
  };

  const handlePrivacyUpdate = () => {
    alert("Privacy settings updated successfully");
  };

  const handleChangePassword = () => {
    alert("Redirecting to password change page...");
  };

  // Timezone options
  const timezones = [
    "Asia/Kolkata",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
    "Australia/Sydney"
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-2xl font-bold">WorkPulse</h1>
          <p className="text-indigo-200 text-sm">Attendance Management</p>
        </div>
        <nav className="flex-1">
          <a href="/" className="block py-3 px-4 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-2">Dashboard</a>
          <a href="/clock" className="block py-3 px-4 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-2">Clock In/Out</a>
          <a href="/attendance" className="block py-3 px-4 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-2">Attendance</a>
          <a href="/leave/request" className="block py-3 px-4 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-2">Leave Request</a>
          <a href="/team" className="block py-3 px-4 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-2">Team Attendance</a>
          <a href="/shifts" className="block py-3 px-4 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-2">Shift Roster</a>
          <a href="/payroll" className="block py-3 px-4 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-2">Payroll Export</a>
          <a href="/profile/face" className="block py-3 px-4 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-2">Facial Enrollment</a>
          <a href="/settings" className="block py-3 px-4 bg-indigo-900 rounded-lg mb-2 font-medium">Settings</a>
          <a href="/admin/policies" className="block py-3 px-4 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-2">Admin Policies</a>
          <a href="/admin/audit" className="block py-3 px-4 text-indigo-200 hover:bg-indigo-700 rounded-lg mb-2">Audit Trail</a>
        </nav>
        <div className="pt-4 border-t border-indigo-700">
          <p className="text-xs text-indigo-300">{employee.email}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600 mb-8">Manage your personal and device settings</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{employee.first_name} {employee.last_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Employee ID</p>
                  <p className="font-medium">{employee.employee_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{employee.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="font-medium">{employee.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joining Date</p>
                  <p className="font-medium">{new Date(employee.joining_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Employment Status</p>
                  <p className="font-medium">{employee.employment_status}</p>
                </div>
                <button 
                  onClick={handleChangePassword}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                  Change Password
                </button>
              </div>
            </div>

            {/* Device Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Device Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">User Agent</p>
                  <p className="font-medium text-sm truncate">{deviceInfo.userAgent}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Platform</p>
                  <p className="font-medium">{deviceInfo.platform}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Language</p>
                  <p className="font-medium">{deviceInfo.language}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Screen Resolution</p>
                  <p className="font-medium">{deviceInfo.screenWidth}</p>
                </div>
              </div>
            </div>

            {/* Timezone Selection */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Timezone</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select your timezone</label>
                <select 
                  value={timezone} 
                  onChange={handleTimezoneChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {timezones.map(tz => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-gray-500">This will affect how your attendance records are displayed</p>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notifications.email}
                      onChange={() => handleNotificationChange('email')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive text messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notifications.sms}
                      onChange={() => handleNotificationChange('sms')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500">Browser/app notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={notifications.push}
                      onChange={() => handleNotificationChange('push')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Offline Sync Management */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Offline Sync</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Offline Sync</p>
                  <p className="text-sm text-gray-500">Sync data when connection is restored</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={offlineSync}
                    onChange={handleOfflineSyncToggle}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>

            {/* Manual Location Override */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Location Settings</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Manual Location Override</p>
                  <p className="text-sm text-gray-500">Use custom location for attendance</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={manualLocation}
                    onChange={handleManualLocationToggle}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>

            {/* Facial Verification */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Security</h2>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium">Facial Verification</p>
                  <p className="text-sm text-gray-500">Require facial recognition for clock-in</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={facialVerification}
                    onChange={handleFacialVerificationToggle}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <button 
                onClick={handleChangePassword}
                className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition mb-4"
              >
                Update Security Settings
              </button>
            </div>

            {/* Data Export */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Export</h2>
              <p className="text-gray-600 mb-4">Request a copy of your personal data</p>
              <button 
                onClick={handleExportData}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Request Data Export
              </button>
            </div>

            {/* Privacy Controls */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Privacy Controls</h2>
              <p className="text-gray-600 mb-4">Manage your privacy preferences</p>
              <button 
                onClick={handlePrivacyUpdate}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
              >
                Update Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}