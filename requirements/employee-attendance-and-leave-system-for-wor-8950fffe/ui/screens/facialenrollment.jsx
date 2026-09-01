function FacialEnrollment() {
  // Mock employee data
  const employee = {
    id: 'EMP00123',
    first_name: 'Alex',
    last_name: 'Morgan',
    location_id: 'LOC001',
    timezone: 'America/New_York'
  };

  // Mock jurisdiction data
  const jurisdiction = {
    id: 'US-IL',
    name: 'Illinois, United States',
    consent_agreement: 'Biometric Information Privacy Act (BIPA) requires explicit consent for facial data collection. Data will be encrypted and stored securely for attendance verification purposes only.',
    compliance_flags: ['BIPA Compliant', 'GDPR Article 9 Exempt']
  };

  // Mock capture attempts
  const [attempts, setAttempts] = React.useState([
    { id: 1, status: 'pending', timestamp: null },
    { id: 2, status: 'pending', timestamp: null },
    { id: 3, status: 'pending', timestamp: null }
  ]);
  
  const [currentAttempt, setCurrentAttempt] = React.useState(0);
  const [bestTemplate, setBestTemplate] = React.useState(null);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [enrollmentDeleted, setEnrollmentDeleted] = React.useState(false);

  // Handle capture attempt
  const handleCapture = () => {
    if (currentAttempt < 3) {
      const updatedAttempts = [...attempts];
      updatedAttempts[currentAttempt].status = 'success';
      updatedAttempts[currentAttempt].timestamp = new Date().toLocaleTimeString();
      setAttempts(updatedAttempts);
      setCurrentAttempt(currentAttempt + 1);
      
      // Auto-select best template after 3 attempts
      if (currentAttempt === 2) {
        setTimeout(() => {
          setBestTemplate(updatedAttempts[1]); // Mock selection
        }, 1000);
      }
    }
  };

  // Handle delete enrollment
  const handleDelete = () => {
    setEnrollmentDeleted(true);
    setShowConfirmation(false);
  };

  // Reset enrollment flow
  const resetEnrollment = () => {
    setAttempts([
      { id: 1, status: 'pending', timestamp: null },
      { id: 2, status: 'pending', timestamp: null },
      { id: 3, status: 'pending', timestamp: null }
    ]);
    setCurrentAttempt(0);
    setBestTemplate(null);
    setEnrollmentDeleted(false);
  };

  if (enrollmentDeleted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 text-center">
          <div className="text-green-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Enrollment Deleted</h2>
          <p className="text-gray-600 mb-6">Your facial enrollment has been successfully removed from the system.</p>
          <button 
            onClick={resetEnrollment}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Re-Enroll
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Facial Enrollment</h1>
          <p className="text-gray-600">Complete your biometric enrollment for secure attendance tracking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Consent Agreements */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Jurisdiction Consent</h2>
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{jurisdiction.name}</h3>
                  <p className="text-sm text-gray-600">{employee.timezone}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-gray-700 text-sm">{jurisdiction.consent_agreement}</p>
              </div>
              
              <div className="flex items-center mb-2">
                <input 
                  type="checkbox" 
                  id="consent-checkbox" 
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="consent-checkbox" className="ml-2 text-gray-700">
                  I consent to the collection and use of my facial data
                </label>
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-800 mb-3">Compliance Status</h3>
            <div className="space-y-2">
              {jurisdiction.compliance_flags.map((flag, index) => (
                <div key={index} className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">{flag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Column - Camera Feed */}
          <div className="lg:col-span-2 space-y-8">
            {/* Camera Feed */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Camera Capture</h2>
              
              <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4" style={{ height: '300px' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48 mx-auto mb-4" />
                    <p className="text-gray-400">Camera feed would appear here</p>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="border-4 border-blue-500 rounded-full w-48 h-48 animate-pulse"></div>
                </div>
              </div>
              
              <div className="text-center mb-4">
                <p className="text-gray-700 mb-2">Position your face within the frame</p>
                <p className="text-sm text-gray-500">Ensure good lighting and remove any obstructions</p>
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={handleCapture}
                  disabled={currentAttempt >= 3}
                  className={`px-6 py-3 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentAttempt >= 3 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'}`}
                >
                  Capture Image
                </button>
              </div>
            </div>
            
            {/* Capture Attempts */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Capture Attempts</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {attempts.map((attempt, index) => (
                  <div 
                    key={attempt.id} 
                    className={`border-2 rounded-lg p-4 text-center ${index === currentAttempt && currentAttempt < 3 ? 'border-blue-500 bg-blue-50' : ''} ${attempt.status === 'success' ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                  >
                    <div className="text-lg font-semibold mb-1">Attempt {attempt.id}</div>
                    <div className="text-sm text-gray-600 mb-2">
                      {attempt.timestamp || '--:--:--'}
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${attempt.status === 'success' ? 'bg-green-500' : 'bg-gray-300'}`}
                        style={{ width: attempt.status === 'success' ? '100%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Best Template Selection */}
              {bestTemplate && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium text-green-800">Best template selected from Attempt {bestTemplate.id}</span>
                  </div>
                </div>
              )}
              
              {/* Compliance Flags */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Compliance Validation</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Liveness Detection Passed</span>
                  </div>
                  <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Image Quality: Excellent</span>
                  </div>
                  <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Encryption Applied</span>
                  </div>
                  <div className="flex items-center bg-blue-50 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-gray-700">Consent Verified</span>
                  </div>
                </div>
              </div>
              
              {/* Delete Enrollment Button */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <button 
                  onClick={() => setShowConfirmation(true)}
                  className="px-4 py-2 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Delete Enrollment
                </button>
                
                <button 
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={!bestTemplate}
                >
                  Complete Enrollment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete your facial enrollment? This action cannot be undone.</p>
            
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}