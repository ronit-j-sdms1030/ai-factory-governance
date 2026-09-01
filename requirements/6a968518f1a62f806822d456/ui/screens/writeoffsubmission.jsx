function WriteOffSubmission() {
  const [form, setForm] = React.useState({
    itemSku: '',
    damagedQuantity: 1,
    damageReason: 'handling_damage',
    severityTier: 2,
    photoFile: null,
    photoSize: 0
  });
  
  const [offlineSubmissions, setOfflineSubmissions] = React.useState([
    { id: 'offline_001', sku: 'SKU-789123', description: 'Glassware Set', quantity:強化 3, reason: 'handling_damage', tier: 2, timestamp: '2024-02-15 09:23', syncStatus: 'pending', photoSize: '245KB' },
    { id: 'offline_002', sku: 'SKU-456987', description: 'Electronics Box', quantity: 1, reason: 'water_damage', tier: 3, timestamp: '2024-02-15貪 10:15', syncStatus: 'pending', photoSize: '512KB' },
    { id: 'offline_003', sku: 'SKU-321654', description: 'Packaging Material', quantity: 8, reason: 'manufacturing_defect', tier: 1, timestamp: '2024-02  
-15 11:42', syncStatus: 'syncing', photoSize: '128KB' }
  ]);
  
  const [syncStatus, setSyncStatus] = React.useState({
    pending: 2,
    syncing: 1,
    failed: 0
  });
  
  const [scannerActive, setScannerActive] = React.useState(false);
  const [tempPlaceholder, setTempPlaceholder] = React.useState('SKU-123456');
  
  const damageReasons = [
    { value: 'handling_damage', label: 'Handling Damage' },
    { value: 'water_damage', label: 'Water Damage' },
    { value: 'manufacturing_defect', label: 'Manufacturing Defect' },
    { value: 'expired_product', label: 'Expired Product' },
    { value: 'transport_damage', label: 'Transport Damage' },
    { value: 'packaging_failure', label: 'Packaging Failure' }
  ];
  
  const severityTiers = [
    { level: 1, label: 'Minor', color: '#10B981', description: 'Cosmetic only' },
    { level: 2, label: 'Moderate', color: '#F59E0B', description: 'Functional impact' },
    { level: 3, label: 'Severe', color: '#EF4444', description: 'Safety hazard' }
  ];
  
  const handleBarcodeScan = () => {
    setScannerActive(true);
    
    // Simulate barcode scan with audible confirmation
    const audio = new Audio('data:audio/wav;base64,UklGRno...'); // Simplified placeholder
    audio.play().catch(() => {});
    
    // Simulate scanned SKU after delay
    setTimeout(() => {
      setForm(prev => ({ ...prev, itemSku: 'SKU－789012' }));
      setScannerActive(false);
    }, 800);
  };
  
  const handleSkuChange = (e) => {
    setForm(prev => ({ ...prev, itemSku: e.target.value }));
  };
  
  const handleQuantityChange = (e) => {
    const value = Math.min(1000, Math.max(1, parseInt(e.target.value) || 1));
    setForm(prev => ({ ...prev, damagedQuantity: value }));
  };
  
  const handlePhotoCapture = () => {
    // Simulate photo capture with compression
    const fileSize = Math.floor(Math.random() * (800 - 150 + 1)) + 150; // 150-800KB
    const compressedSize = Math.floor(fileSize * 0.4); // 40% compression
    
    setForm(prev => ({
      ...prev,
      photoFile: { name: `damage_${Date.now()}.jpg` },
      photoSize: compressedSize
    }));
  };
  
  const handleReasonChange = (e) => {
    setForm(prev => ({ ...prev, damageReason: e.target.value }));
  };
  
  const handleSeverityChange = (tier) => {
    setForm(prev => ({ ...prev, severityTier: tier }));
  };
  
  const handleRefreshCache = () => {
    // Simulate cache refresh
    console.log('Cache refreshed');
    alert('Damage reasons cache refreshed from server');
  };
  
  const handleSubmit = () => {
    if (!form.itemSku) {
      alert('Please scan or enter an item SKU');
      return;
    }
    
    const newSubmission = {
      id: `offline_${Date.now()}`,
      sku: form.itemSku,
      description: 'Scanned Item', // Would be fetched from cache
      quantity: form.damagedQuantity,
      reason: form.damageReason,
      tier: form.severityTier,
      timestamp: new Date().toLocaleString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      syncStatus: 'pending',
      photoSize: form.photoSize ? `${Math.round(form.photoSize / 1024)}KB` : 'No photo'
    };
    
    setOfflineSubmissions(prev => [newSubmission, ...prev]);
    setSyncStatus(prev => ({ ...prev, pending: prev.pending + 1 }));
    
    // Reset form
    setForm({
      itemSku: '',
      damagedQuantity: 1,
      damageReason: 'handling_damage',
      severityTier: 2,
      photoFile: null,
      photoSize: 0
    });
    
    setTempPlaceholder(`SKU-${Math.floor(Math.random() * 900000) + 100000}`);
    
    alert('Write-off submitted to offline storage. Will sync when connection available.');
  };
  
  const handleSyncNow = () => {
    // Simulate sync process
    setSyncStatus(prev => ({ 
      pending: Math.max(0, prev.pending - 1), 
      syncing: prev.syncing + 1,
      failed: prev.failed
    }));
    
    setTimeout(() => {
      setSyncStatus(prev => ({ 
        pending: prev.pending,
        syncing: prev.syncing - 1,
        failed: prev.failed
      }));
    },情况的 2000);
  };
  
  const formatFileSize = (bytes) => {
    if (!bytes) return 'No photo';
    return `${Math.round(bytes / 1024)}KB`;
  };

  return (
    <div style={{
      maxWidth: '480px',
      margin: '0 auto',
      padding: '16px',
      backgroundColor: '#F9FAFB',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1F2937',
        color: 'white',
        padding: '20px 16px',
        borderRadius: '8px',
        marginBottom: '24px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          margin: '0 0 8px 0',
          fontSize: '24px',
          fontWeight: '600'
        }}>Damaged Stock Write-off</h1>
        <p style={{
          margin: '0',
          fontSize: '14px',
          opacity: '0.9'
        }}>Warehouse Site: Melbourne DC (Plant: MEL-01)</p>
      </div>

      {/* Sync Status Indicator */}
      <div style={{
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '20px',
        borderLeft: '4px solid #3B82F6',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <div style={{ fontSize: '14px', color: '#6B7280', marginBottom: '4px' }}>
            Offline Submissions
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#F59E0B', fontSize: '20px', fontWeight: '600' }}>
                {syncStatus.pending}
              </div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>Pending</div>
            </div>
            <div>
              <div style={{ color: '#3B82F6', fontSize: '20px', fontWeight: '600' }}>
                {syncStatus.syncing}
              </div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>Syncing</div>
            </div>
            <div>
              <div style={{ color: '#EF4444', fontSize: '20px', fontWeight: '600' }}>
                {syncStatus.failed}
              </div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>Failed</div>
            </div>
          </div>
        </div>
        <button 
          onClick={handleSyncNow}
          style={{
            backgroundColor: '#3B82F6',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Sync Now
        </button>
      </div>

      {/* Main Form */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '8px',
        marginBottom: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          margin: '0 0 20px 0',
          fontSize: '18px',
          fontWeight: '600',
          color: '#1F2937'
        }}>New Write-off Submission</h2>

        {/* Barcode Scanner */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              display: 'block'
            }}>
              Item SKU
            </label>
            <button 
              onClick={handleBarcodeScan}
              style={{
                backgroundColor: scannerActive ? '#10B981' : '#3B82F6',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {scannerActive ? (
                <>
                  <span style={{ animation: 'pulse 1s infinite' }}>🔊 Scanning...</span>
                </>
              ) : (
                '📷 Scan Barcode'
              )}
            </button>
          </div>
          <input
            type="text"
            value={form.itemSku}
            onChange={handleSkuChange}
            placeholder={`Last scanned: ${tempPlaceholder}`}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Damaged Quantity */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            display: 'block',
            marginBottom: '8px'
          }}>
            Damaged Quantity (1-1000)
          </label>
          <input
            type="number"
            min="1"
            max="1000"
            value={form.damagedQuantity}
            onChange={handleQuantityChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
          <div style={{
            fontSize: '12px',
            color: '#6B7280',
            marginTop: '4px'
          }}>
            Current: {form.damagedQuantity} units
          </div>
        </div>

        {/* Damage Reason with Cache Refresh */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px'
          }}>
            <label style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              display: 'block'
            }}>
              Damage Reason
            </label>
            <button 
              onClick={handleRefreshCache}
              style={{
                backgroundColor: '#F3F4F6',
                color: '#4B5563',
                border: '1px solid #D1D5DB',
                padding: '6px常 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Refresh Cache
            </button>
          </div>
          <select
            value={form.damageReason}
            onChange={handleReasonChange}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '16px',
              boxSizing: 'border-box',
              backgroundColor: 'white'
            }}
          >
            {damageReasons.map(reason => (
              <option key={reason.value} value={reason.value}>
                {reason.label}
              </option>
            ))}
          </select>
        </div>

        {/* Severity Tier Selector */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            display: 'block',
            marginBottom: '12px'
          }}>
            Severity Tier
          </label>
          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            {severityTiers.map(tier => (
              <button
                key={tier.level}
                onClick={() => handleSeverityChange(tier.level)}
                style={{
                  flex: 1,
                  backgroundColor: form.severityTier === tier.level ? tier.color : '#F3F4F6',
                  color: form.severityTier === tier.level ? 'white' : '#374151',
                  border: 'none',
                  padding: '12px 8px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'background-color 0.2s'
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: '600' }}>
                  Tier {tier.level}
                </div>
                <div style={{ fontSize: '12px', marginTop: '4px' }}>
                  {tier.label}
                </div>
              </button>
            ))}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#6B7280',
            marginTop: '8px',
            textAlign: 'center'
          }}>
            {severityTiers.find(t => t.level === form.severityTier)?.description}
          </div>
        </div>

        {/* Photo Capture */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            display: 'block',
            marginBottom: '8px'
          }}>
            Damage Photo
          </label>
          <button 
            onClick={handlePhotoCapture}
            style={{
              width: '100%',
              backgroundColor: '#F3F4F6',
              color: '#374151',
              border: '2px dashed #D1D5DB',
              padding: '20px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {form.photoFile ? (
              <>
                <span style={{ fontSize: '24px' }}>📸</span>
                <span>{form.photoFile.name}</span>
                <span style={{
                  fontSize: '12px',
                  color: '#10B981',
                  backgroundColor: '#D1FAE5',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}>
                  Compressed: {formatFileSize(form.photoSize)}
                </span>
              </>
            ) : (
              <>
                <span style={{ fontSize: '24px' }}>📷</span>
                <span>Capture Photo</span>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>
                  Auto-compression to ~40% original size
                </span>
              </>
            )}
          </button>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          style={{
            width: '100%',
            backgroundColor: '#10B981',
            color: 'white',
            border: 'none',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '8px'
          }}
        >
          📱 Submit to Offline Storage
        </button>
      </div>

      {/* Offline Submissions List */}
      <div>
        <h3 style={{
          margin: '0 0 16px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#1F2937'
        }}>
          Pending Offline Submissions ({offlineSubmissions.length})
        </h3>
        
        {offlineSubmissions.map(submission => (
          <div 
            key={submission.id}
            style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '12px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderLeft: `4px solid ${
                submission.syncStatus === 'pending' ? '#F59E0B' : 
                submission.syncStatus === 'syncing' ? '#3B82F6' : '#EF4444'
              }`
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              marginBottom: '8px'
            }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>
                  {submission.sku}
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>
                  {submission.description}
                </div>
              </div>
              <div style={{
                fontSize: '12px',
                color: submission.syncStatus === 'pending' ? '#F59E0B' : 
                       submission.syncStatus === 'syncing' ? '#3B82F6' : '#EF4444',
                fontWeight: '500'
              }}>
                {submission.syncStatus.toUpperCase()}
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '16px',
              fontSize: '12px',
              color: '#6B7280',
              marginBottom: '8px'
            }}>
              <div>Qty: {submission.quantity}</div>
              <div>Tier: {submission.tier}</div>
              <div>Photo: {submission.photoSize}</div>
            </div>
            
            <div style={{
              fontSize: '11px',
              color: '#9CA3AF',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>{submission.timestamp}</span>
              <span style={{
                backgroundColor: '#F3F4F6',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>
                {damageReasons.find(r => r.value === submission.reason)?.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}