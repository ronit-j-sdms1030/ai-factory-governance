function FacialEnrollment() {
  // Mock data
  const employee = {
    id: "EMP00123",
    first_name: "Alex",
    last_name: "Morgan",
    department: "Engineering",
    location: "New York, USA"
  };

  const consentAgreement = {
    jurisdiction: "New York, USA",
    content: "I consent to the collection and processing of my facial biometric data for time and attendance purposes in compliance with the Biometric Information Privacy Act (BIPA). This data will be encrypted and stored securely, with no sharing to third parties.",
    expiry_date: "2025-06-15",
    consent_type: "BIPA Compliant"
  };

  const [currentAttempt, setCurrentAttempt] = React.useState(1);
  const [capturedImages, setCapturedImages] = React.useState([]);
  const [selectedTemplate, setSelectedTemplate] = React.useState(null);
  const [enrollmentStatus, setEnrollmentStatus] = React.useState("Pending");
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  
  const complianceFlags = [
    { regulation: "BIPA", status: "Compliant" },
    { regulation: "GDPR", status: "Not Applicable" }
  ];

  const captureInstructions = [
    "Position your face in the center of the frame",
    "Ensure even lighting with no glare or shadows",
    "Maintain a neutral expression with both eyes open"
  ];

  // Handlers
  const handleCapture = () => {
    if (currentAttempt <= 3) {
      // Simulate capturing an image
      const newImage = {
        id: currentAttempt,
        timestamp: new Date().toLocaleTimeString(),
        quality: Math.floor(Math.random() * 20) + 80 // 80-99 quality score
      };
      
      setCapturedImages([...capturedImages, newImage]);
      
      if (currentAttempt < 3) {
        setCurrentAttempt(currentAttempt + 1);
      } else {
        // After 3 attempts, auto-select best template
        const best = [...capturedImages, newImage].reduce((max, img) => 
          img.quality > max.quality ? img : max, { quality: 0 });
        setSelectedTemplate(best);
        setEnrollmentStatus("Completed");
      }
    }
  };

  const handleRetake = () => {
    if (currentAttempt > 1) {
      setCurrentAttempt(currentAttempt - 1);
      setCapturedImages(capturedImages.slice(0, -1));
    }
  };

  const handleConfirmEnrollment = () => {
    setEnrollmentStatus("Active");
  };

  const handleDeleteEnrollment = () => {
    setShowDeleteConfirm(false);
    setEnrollmentStatus("Deleted");
    setCapturedImages([]);
    setSelectedTemplate(null);
    setCurrentAttempt(1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 border-b border-gray-200">
        <div classNamen="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Facial Enrollment</h1>
          <div className="text-sm text-gray-600">
            <span className="font-medium">{employee.first_name} {employee.last_name}</span> | {employee.department}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Consent Agreement */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Jurisdiction-Specific Consent</h2>
              <div className="border border-gray-200 rounded p-4 bg-blue-50">
                <p className="text-gray-700 mb-4">{consentAgreement.content}</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Jurisdiction: {consentAgreement.jurisdiction}</span>
                  <span>Consent Type: {consentAgreement.consent_type}</span>
                  <span>Expiry: {consentAgreement.expiry_date}</span>
                </div>
              </div>
            </section>

            {/* Camera Feed */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Capture Facial Template</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Camera Preview */}
                <div className="border border-gray-300 rounded-lg bg-gray-100 h-80 flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full border-4 border-blue-400 border-dashed"></div>
                  </div>
                  <div className="text-center p-4 bg-white bg-opacity-80 rounded-lg">
                    <p className="font-medium text-gray-700">Camera Feed</p>
                    <p className="text-sm text-gray-500 mt-1">Attempt {currentAttempt} of 3</p>
                  </div>
                </div>
                
                {/* Instructions */}
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Capture Instructions</h3>
                  <ul className="space-y-2">
                    {captureInstructions.map((instruction, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-600 text-sm">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-6 flex space-x-3">
                    <button 
                      onClick={handleCapture}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                      disabled={currentAttempt > 3}
                    >
                      Capture Image
                    </button>
                    {currentAttempt > 1 && (
                      <button 
                        onClick={handleRetake}
                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                      >
                        Retake
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Captured Images */}
            {capturedImages.length > 0 && (
              <section className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Captured Templates</h2>
                <div className="grid grid-cols-3 gap-4">
                  {capturedImages.map((img) => (
                    <div 
                      key={img.id} 
                      className={`border rounded-lg p-3 text-center ${selectedTemplate?.id === img.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                    >
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Quality: {img.quality}%</p>
                      <p className="text-xs text-gray-500">{img.timestamp}</p>
                      {selectedTemplate?.id === img.id && (
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Selected</span>
                      )}
                    </div>
                  ))}
                </div>
                
                {selectedTemplate && (
                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={handleConfirmEnrollment}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Confirm Enrollment
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* Compliance & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Compliance */}
              <section className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Compliance Status</h2>
                <div className="space-y-3">
                  {complianceFlags.map((flag, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">{flag.regulation}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${flag.status === 'Compliant' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {flag.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
              
              {/* Enrollment Status */}
              <section className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Enrollment Details</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${enrollmentStatus === 'Active' ? 'bg-green-100 text-green-800' : enrollmentStatus === 'Deleted' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {enrollmentStatus}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Enrollment Date</span>
                    <span className="text-gray-800">June 15, 2023</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Consent Expiry</span>
                    <span className="text-gray-800">{consentAgreement.expiry_date}</span>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      onClick={() => setShowDeleteConfirm(true)}
                      disabled={enrollmentStatus !== 'Active'}
                      className="w-full py-2 px-4 border border-red-300 text-red-600 rounded hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Delete Enrollment
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* Consent History */}
            <section className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Consent History & Renewals</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Given</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consent Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">June 15, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">BIPA Compliant</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{consentAgreement.expiry_date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">June 10, 2021</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Initial Consent</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">June 15, 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Expired
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>Next renewal reminder: May 15, 2025</p>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this facial enrollment? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleDeleteEnrollment}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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