function ClockInterface() {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [isClockingIn, setIsClockingIn] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [facialVerificationEnabled, setFacialVerificationEnabled] = React.useState(true);
  const [offlineMode, setOfflineMode] = React.useState(false);
  const [locationOverride, setLocationOverride] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);

  // Update time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockInOut = () => {
    setIsSubmitting(true);
    
    // Simulate API call with 3-second timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessToast(true);
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
    }, 3000);
  };

  const handleCapture = () => {
    // In a real app, this would capture from camera
    setCapturedImage("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAiIHk9IjEwMCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzMzMyI+Q2FwdHVyZWQgSW1hZ2U8L3RleHQ+PC9zdmc+");
  };

  const toggleOfflineMode = () => {
    setOfflineMode(!offlineMode);
  };

  const toggleLocationOverride = () => {
    setLocationOverride(!locationOverride);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Successfully clocked {isClockingIn ? 'in' : 'out'}!
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">WorkPulse</h1>
            <p className="text-sm text-gray-500">Attendance Management System</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-indigo-600">
              {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})}
            </div>
            <div className="text-sm text-gray-500">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} (IST)
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Clock Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Clock In/Out</h2>
                <p className="text-gray-600">Tap the button below to record your attendance</p>
              </div>

              <div className="flex flex-col items-center">
                {/* Clock Button */}
                <button
                  onClick={handleClockInOut}
                  disabled={isSubmitting}
                  className={`w-64 h-64 rounded-full text-white font-bold text-2xl shadow-lg transform transition-all duration-200 flex items-center justify-center ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : isClockingIn 
                        ? 'bg-green-500 hover:bg-green-600 hover:scale-105 active:scale-95' 
                        : 'bg-red-500 hover:bg-red-600 hover:scale-105 active:scale-95'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-2"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `Clock ${isClockingIn ? 'In' : 'Out'}`
                  )}
                </button>

                <div className="mt-6 text-center">
                  <p className="text-gray-600">
                    Current Status: <span className="font-semibold text-green-600">Ready to Clock In</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Device Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Device Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Device:</span>
                  <span className="font-medium">iPhone 14 Pro</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">OS:</span>
                  <span className="font-medium">iOS 17.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IP Address:</span>
                  <span className="font-medium">192.168.1.42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GPS:</span>
                  <span className="font-medium">12.9716° N, 77.5946° E</span>
                </div>
              </div>
            </div>

            {/* Offline & Location Controls */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Connection Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Offline Mode</div>
                    <div className="text-sm text-gray-500">Records saved locally</div>
                  </div>
                  <button
                    onClick={toggleOfflineMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      offlineMode ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        offlineMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Location Override</div>
                    <div className="text-sm text-gray-500">For field workers</div>
                  </div>
                  <button
                    onClick={toggleLocationOverride}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      locationOverride ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        locationOverride ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Facial Verification */}
            {facialVerificationEnabled && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Facial Verification</h3>
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  {capturedImage ? (
                    <img src={capturedImage} alt="Captured" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="text-gray-500 text-center">
                      <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                      </svg>
                      <p className="mt-2">Camera Feed</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleCapture}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Capture Image
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}