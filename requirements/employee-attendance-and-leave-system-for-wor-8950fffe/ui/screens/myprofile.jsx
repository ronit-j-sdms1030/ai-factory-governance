function MyProfile() {
  // Mock employee data
  const employee = {
    id: "EMP00789",
    firstName: "Aisha",
    lastName: "Khan",
    email: "aisha.khan@starkdigital.com",
    department: "Engineering",
    location: "Mumbai, India",
    timeZone: "Asia/Kolkata",
    joiningDate: "2021-03-15",
    employmentStatus: "Full-time",
    shiftType: "Fixed Day Shift",
    entraId: "ENTRA-987654321"
  };

  // Facial enrollment status
  const [isEnrolled, setIsEnrolled] = React.useState(true);
  const [showEnrollmentModal, setShowEnrollmentModal] = React.useState(false);
  const [capturedImages, setCapturedImages] = React.useState([]);
  const [selectedTemplate, setSelectedTemplate] = React.useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = React.useState(false);

  // Compliance flags based on jurisdiction
  const complianceFlags = [
    { regulation: "GDPR", status: "Compliant", lastUpdated: "2023-11-15" },
    { regulation: "BIPA", status: "Not Applicable", lastUpdated: null }
  ];

  // Device preferences
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [reminderTime, setReminderTime] = React.useState("08:45");

  // Handlers
  const handleStartEnrollment = () => {
    setShowEnrollmentModal(true);
    setCapturedImages([]);
    setSelectedTemplate(null);
  };

  const handleCaptureImage = () => {
    // In a real app, this would capture from camera
    const newImage = {
      id: capturedImages.length + 1,
      timestamp: new Date().toLocaleTimeString(),
      url: `https://placehold.co/300x300/4f46e5/white?text=Capture+${capturedImages.length + 1}`
    };
    
    setCapturedImages([...capturedImages, newImage]);
    
    // Auto-select first image as best template
    if (!selectedTemplate && capturedImages.length === 0) {
      setSelectedTemplate(newImage.id);
    }
  };

  const handleSelectTemplate = (id) => {
    setSelectedTemplate(id);
  };

  const handleSaveEnrollment = () => {
    setIsEnrolled(true);
    setShowEnrollmentModal(false);
  };

  const handleDeleteEnrollment = () => {
    setIsEnrolled(false);
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your personal information and settings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Personal Information Card */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{employee.firstName} {employee.lastName}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Employee ID</p>
                <p className="font-medium">{employee.id}</p>
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
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{employee.location}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Time Zone</p>
                <p className="font-medium">{employee.timeZone}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Joining Date</p>
                <p className="font-medium">March 15, 2021</p>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Facial Enrollment Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Facial Enrollment</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {isEnrolled 
                      ? "Your facial template is enrolled for secure clock-ins" 
                      : "Enable facial recognition for faster, secure clock-ins"}
                  </p>
                </div>
                
                {isEnrolled ? (
                  <button 
                    onClick={() => setShowDeleteConfirmation(true)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none"
                  >
                    Delete Enrollment
                  </button>
                ) : (
                  <button 
                    onClick={handleStartEnrollment}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
              
              {isEnrolled && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="ml-2 text-sm text-green-800">
                      Your facial template was successfully enrolled on June 12, 2023
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Consent Agreements */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Consent Agreements</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Biometric Data Usage Consent</p>
                    <p className="text-sm text-gray-500">Signed on June 12, 2023 • Valid until June 12, 2026</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium text-gray-900">Compliance Status</h3>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {complianceFlags.map((flag, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{flag.regulation}</span>
                        <span className={`text-sm font-medium ${flag.status === 'Compliant' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {flag.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Device Preferences */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Device Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Clock-in Notifications</h3>
                    <p className="text-sm text-gray-500">Receive reminders before your scheduled shift</p>
                  </div>
                  <button
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={`${
                      notificationsEnabled ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                  >
                    <span
                      className={`${
                        notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
                
                {notificationsEnabled && (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Reminder Time</h3>
                      <p className="text-sm text-gray-500">Before your scheduled shift start time</p>
                    </div>
                    <select
                      value={reminderTime}
                      onChange={(e) => setReminderTime(e.target.value)}
                      className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value="08:30">15 minutes</option>
                      <option value="08:45">30 minutes</option>
                      <option value="09:00">45 minutes</option>
                      <option value="09:15">1 hour</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Facial Enrollment Modal */}
      {showEnrollmentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Facial Enrollment
                    </h3>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="bg-gray-100 rounded-lg aspect-square flex items-center justify-center">
                          <div className="text-center">
                            <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex items-center justify-center mb-3">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              </svg>
                            </div>
                            <p className="text-sm text-gray-500">Camera Feed</p>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-900">Instructions</h4>
                          <ul className="mt-2 text-sm text-gray-500 space-y-1">
                            <li className="flex items-start">
                              <svg className="h-4 w-4 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Look directly at the camera</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-4 w-4 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Maintain a neutral expression</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-4 w-4 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Ensure even lighting on your face</span>
                            </li>
                            <li className="flex items-start">
                              <svg className="h-4 w-4 text-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Remove glasses if possible</span>
                            </li>
                          </ul>
                          
                          <button
                            onClick={handleCaptureImage}
                            disabled={capturedImages.length >= 3}
                            className={`mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                              capturedImages.length >= 3 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            }`}
                          >
                            Capture Image
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Captures ({capturedImages.length}/3)</h4>
                        
                        <div className="mt-2 space-y-3">
                          {capturedImages.length > 0 ? (
                            capturedImages.map((image) => (
                              <div 
                                key={image.id} 
                                className={`border rounded-lg p-2 flex items-center ${
                                  selectedTemplate === image.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'
                                }`}
                              >
                                <img src={image.url} alt={`Capture ${image.id}`} className="w-16 h-16 object-cover rounded" />
                                <div className="ml-3 flex-1">
                                  <p className="text-xs text-gray-500">Captured at {image.timestamp}</p>
                                </div>
                                <button
                                  onClick={() => handleSelectTemplate(image.id)}
                                  className={`text-xs px-2 py-1 rounded ${
                                    selectedTemplate === image.id
                                      ? 'bg-indigo-100 text-indigo-700'
                                      : 'text-gray-500 hover:text-gray-700'
                                  }`}
                                >
                                  {selectedTemplate === image.id ? 'Selected' : 'Select'}
                                </button>
                              </div>
                            ))
                          ) : (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l11.172-11.172" />
                              </svg>
                              <p className="mt-2 text-sm text-gray-500">No captures yet</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-xs text-gray-500">
                            Select your best capture for facial recognition. We'll create a secure template from this image.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleSaveEnrollment}
                  disabled={!selectedTemplate}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${
                    selectedTemplate 
                      ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' 
                      : 'bg-indigo-300 cursor-not-allowed'
                  }`}
                >
                  Save Enrollment
                </button>
                <button
                  onClick={() => setShowEnrollmentModal(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Delete Facial Enrollment
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete your facial enrollment? This will remove your biometric template from our system. You'll need to re-enroll to use facial recognition for clock-ins.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleDeleteEnrollment}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Delete Enrollment
                </button>
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}