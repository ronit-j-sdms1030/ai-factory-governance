function SupervisorReview() {
  const [activeTab, setActiveTab] = React.useState('VALIDATED');
  const [selectedSite, setSelectedSite] = React.useState('all');
  const [selectedRequest, setSelectedRequest] = React.useState(null);
  const [quantityAdjustments, setQuantityAdjustments] = React.useState({});
  const [rejectComment, setRejectComment] = React.useState('');
  const [showModal, setShowModal] = React.useState(false);
  const [websocketStatus, setWebsocketStatus] = React.useState('connected');
  
  // Mock data for sites
  const sites = [
    { id: 'site-1', name: 'North Warehouse', sapPlantCode: 'PL001' },
    { id: 'site-2', name: 'East Distribution', sapPlantCode: 'PL002' },
    { id: 'site-3', name: 'West Logistics', sapPlantCode: 'PL003' }
  ];
  
  // Mock data for VALIDATED requests
  const validatedRequests = [
    {
      id: 'WR-2024-0456',
      staffName: 'Maria Rodriguez',
      siteName: 'North Warehouse',
      itemSku: 'SKU-784321',
      itemDescription: 'Premium Coffee Beans 5kg Bag',
      damageReason: 'Water Damage',
      severityTier: 'MODERATE',
      quantity: 12,
      submittedAt: '2024-03-15 14:30',
      validatedAt: '2024-03-15 отправлено в SAP',
      sapValidationStatus: 'VALID',
      sapValidationError: null,
      syncStatus: 'PENDING_SYNC',
      photos: 3,
      sapInventoryDocNum: null,
      sapFiDocNum: null
    },
    {
      id: 'WR-2024-0457',
      staffName: 'James Wilson',
      siteName: 'East Distribution',
      itemSku: 'SKU-459876',
      itemDescription: 'Ceramic Dinner Plates (Set of 6)',
      damageReason: 'Transport Crack',
      severityTier: 'SEVERE',
      quantity: □24,
      submittedAt: '2024-03-15 11:15',
      validatedAt: '2024-03-15 16:45',
      sapValidationStatus: 'VALID',
      sapValidationError: null,
      syncStatus: 'SYNC_IN_PROGRESS',
      photos: 2,
      sapInventoryDocNum: null,
      sapFiDocNum: null
    },
    {
      id: 'WR1.2024-0458',
      staffName: 'Sarah Chen',
      siteName: 'West Logistics',
      itemSku: 'SKU-632154',
      itemDescription: 'Organic Cotton Sheets Queen',
      damageReason: 'Manufacturing Defect',
      severityTier: 'MINOR',
      quantity: 8,
      submittedAt: '2024-03-14 09:45',
      validatedAt: '2024-03-15 08:20',
      sapValidationStatus: 'VALID',
      sapValidationError: null,
      syncStatus: 'READY_FOR_SYNC',
      photos: 1,
      sapInventoryDocNum: null,
      sapFiDocNum: null
    }
  ];
  
  // Mock data for MANUAL_REVIEW requests
  const manualReviewRequests = [
    {
      id: 'WR-2024-0449',
      staffName: 'Thomas Lee',
      siteName: 'North Warehouse',
      itemSku: 'SKU-987123',
      itemDescription: 'Stainless Steel Cookware Set',
      damageReason: 'Quality Reject',
      severityTier: 'SEVERE',
      quantity: 18,
      submittedAt: '2024-03-14 16:20',
      validatedAt: '2024-03-15 10:10',
      sapValidationStatus: 'INVALID',
      sapValidationError: 'Item blocked for write-off in SAP. Requires manual approval.',
      syncStatus: 'MANUAL_REVIEW',
      photos: 4,
      sapInventoryDocNum: null,
      sapFiDocNum: null
    },
    {
      id: 'WR-2024-LA044',
      staffName: 'Robert Kim',
      siteName: 'East Distribution',
      itemSku: 'SKU-321456',
      itemDescription: 'Glass Vase Collection',
      damageReason: 'Fragility Damage',
      severityTier: 'MODERATE',
      quantity: 32,
      submittedAt: '2024-03-15 13:05',
      validatedAt: '2024-03-15 17:30',
      sapValidationStatus: 'QUANTITY_MISMATCH',
      sapValidationError: 'SAP shows 28 units in stock, counted 32. Requires quantity adjustment.',
      syncStatus: 'MANUAL_REVIEW',
      photos: 2,
      sapInventoryDocNum: null,
      sapFiDocNum: null
    }
  ];
  
  const requests = activeTab === 'VALIDATED' ? validatedRequests : manualReviewRequests;
  const filteredRequests = selectedSite === 'all' 
    ? requests 
    : requests.filter(req => {
        const site = sites.find(s => s.name === req.siteName);
        return site && site.id === selectedSite;
      });
  
  const handleApprove = (requestId) => {
    alert(`Request ${requestId} approved successfully!`);
    // In real implementation: call API, update state, show confirmation
  };
  
  const handleReject = (requestId) => {
    if (!rejectComment.trim()) {
      alert('Please provide a rejection comment');
      return;
    }
    alert(`Request ${requestId} rejected. Comment: ${rejectComment}`);
    setRejectComment('');
    // In real implementation: call API, update state
  };
  
  const handleQuantityChange = (requestId, newQuantity) => {
    setQuantityAdjustments(prev => ({
      ...prev,
      [requestId]: newQuantity
    }));
  };
  
  const handleApplyQuantity = (requestId) => {
    const adjustedQty = quantityAdjustments[requestId];
    if (adjustedQty && adjustedQty > 0 && adjustedQty <= 1000) {
      alert(`Quantity for ${requestId} adjusted to ${adjustedQty}`);
      // In real implementation: call API
    }
  };
  
  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };
  
  const getSyncStatusColor = (status) => {
    const colors = {
      'PENDING_SYNC': '#f59e0b',
      'SYNC_IN_PROGRESS': '#3b82f6',
      'READY_FOR_SYNC': '#10b981',
      'MANUAL_REVIEW': '#ef4444',
      'COMPLETED': '#6b7280'
    };
    return colors[status] || '#6b7280';
  };
  
  const getSyncStatusText = (status) => {
    const texts = {
      'PENDING_SYNC': 'Pending Sync',
      'SYNC_IN_PROGRESS': 'Syncing to SAP',
      'READY_FOR_SYNC': 'Ready for SAP Sync',
      'MANUAL_REVIEW': 'Manual Review Needed',
      'COMPLETED': 'Synced to SAP'
    };
    return texts[status] || status;
  };
  
  // WebSocket simulation
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      const statuses = ['connected', 'reconnecting', 'connected'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setWebsocketStatus(randomStatus);
    },));

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.title}>Supervisor Review Dashboard</h1>
          <div style={styles.websocketIndicator}>
            <div 
              style={{
                ...styles.websocketDot,
                backgroundColor: websocketStatus === 'connected' ? '#10b981' : '#f59e0b'
              }}
            />
            <span style={styles.websocketText}>
              {websocketStatus === 'connected' ? 'Live Updates Active' : 'Reconnecting...'}
            </span>
          </div>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.siteSelector}>
            <label style={styles.siteLabel}>Site Filter:</label>
            <select 
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
              style={styles.siteSelect}
            >
              <option value="all">All Sites</option>
              {sites.map(site => (
                <option key={site.id} value={site.id}>{site.name}</option>
              ))}
            </select>
          </div>
          <div style={styles.stats}>
            <span style={styles.statItem}>
              <strong>{validatedRequests.length}</strong> Validated
            </span>
            <span style={styles.statItem}>
              <strong>{manualReviewRequests.length}</strong> Manual Review
            </span>
          </div>
        </div>
      </header>
      
      {/* Tab Navigation */}
      <div style={styles.tabContainer}>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'VALIDATED' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('VALIDATED')}
        >
          Validated Requests ({validatedRequests.length})
        </button>
        <button
          style={{
            ...styles.tab,
            ...(activeTab === 'MANUAL_REVIEW' ? styles.activeTab : {})
          }}
          onClick={() => setActiveTab('MANUAL_REVIEW')}
        >
          Manual Review ({manualReviewRequests.length})
        </button>
      </div>
      
      {/* Main Content */}
      <main style={styles.mainContent}>
        {filteredRequests.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>No requests found for the selected filters.</p>
          </div>
        ) : (
          <div style={styles.requestsGrid}>
            {filteredRequests.map(request => (
              <div key={request.id} style={styles.requestCard}>
                <div style={styles.cardHeader}>
                  <div style={styles.requestId}>
                    <strong>{request.id}</strong>
                    <span style={styles.siteBadge}>{request.siteName}</span>
                  </div>
                  <div style={{
                    ...styles.syncStatus,
                    backgroundColor: getSyncStatusColor(request.syncStatus)
                  }}>
                    {getSyncStatusText(request.syncStatus)}
                  </div>
                </div>
                
                <div style={styles.cardContent}>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Staff:</span>
                    <span style={styles.detailValue}>{request.staffName}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Item:</span>
                    <span style={styles.detailValue}>{request.itemDescription}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>SKU:</span>
                    <span style={styles.detailValue}>{request.itemSku}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Damage:</span>
                    <span style={styles.detailValue}>{request.damageReason} ({request.severityTier})</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Quantity:</span>
                    <span style={styles.detailValue}>
                      {request.quantity} units
                      {activeTab === 'MANUAL_REVIEW' && request.sapValidationStatus === 'QUANTITY_MISMATCH' && (
                        <span style={styles.quantityWarning}> (SAP: 28)</span>
                      )}
                    </span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Submitted:</span>
                    <span style={styles.detailValue}>{request.submittedAt}</span>
                  </div>
                  <div style={styles.detailRow}>
                    <span style={styles.detailLabel}>Validated:</span>
                    <span style={styles.detailValue}>{request.validatedAt}</span>
                  </div>
                  
                  {activeTab === 'MANUAL_REVIEW' && request.sapValidationError && (
                    <div style={styles.sapError}>
                      <strong>SAP Issue:</strong> {request.sapValidationError}
                    </div>
                  )}
                  
                  <div style={styles.photosSection}>
                    <button 
                      style={styles.viewPhotosBtn}
                      onClick={() => handleOpenModal(request)}
                    >
                      📷 View {request.photos} Compressed Photos
                    </button>
                  </div>
                </div>
                
                <div style={styles.cardActions}>
                  {activeTab === 'VALIDATED' ? (
                    <>
                      <button
                        style={styles.approveBtn}
                        onClick={() => handleApprove(request.id)}
                      >
                        Approve for SAP Sync
                      </button>
                      <button
                        style={styles.rejectBtn}
                        onClick={() => {
                          setSelectedRequest(request);
                          setShowModal(true);
                        }}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <>
                      <div style={styles.quantityAdjustment}>
                        <label style={styles.adjustLabel}>Adjust Quantity:</label>
                        <input
                          type="number"
                          min="1"
                          max="1000"
                          defaultValue={request.quantity}
                          style={styles.quantityInput}
                          onChange={(e) => handleQuantityChange(request.id, parseInt(e.target.value))}
                        />
                        <button
                          style={styles.applyBtn}
                          onClick={() => handleApplyQuantity(request.id)}
                        >
                          Apply
                        </button>
                      </div>
                      <div style={styles.reviewActions}>
                        <button
                          style={styles.approveBtn}
                          onClick={() => handleApprove(request.id)}
                        >
                          Approve with Adjustment
                        </button>
                        <button
                          style={styles.rejectBtn}
                          onClick={() => {
                            setSelectedRequest(request);
                            setShowModal(true);
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      
      {/* Modal for detailed view */}
      {showModal && selectedRequest && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Request Details: {selectedRequest.id}</h2>
              <button style={styles.closeBtn} onClick={handleCloseModal}>✕</button>
            </div>
            
            <div style={styles.modalContent}>
              <div style={styles.modalGrid}>
                <div style={styles.modalSection}>
                  <h3 style={styles.sectionTitle}>SAP Validation Results</h3>
                  <div style={styles.validationResult}>
                    <div style={styles.resultRow}>
                      <span>Status:</span>
                      <strong style={{
                        color: selectedRequest.sapValidationStatus === 'VALID' ? '#10b981' : '#ef4444'
                      }}>
                        {selectedRequest.sapValidationStatus}
                      </strong>
                    </div>
                    {selectedRequest.sapValidationError && (
                      <div style={styles.resultRow}>
                        <span>Error:</span>
                        <span style={styles.errorText}>{selectedRequest.sapValidationError}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div style={styles.modalSection}>
                  <h3 style={styles.sectionTitle}>Compressed Damage Photos</h3>
                  <div style={styles.photosGrid}>
                    {[1, 2, 3].map(num => (
                      <div key={num} style={styles.photoPreview}>
                        <div style={styles.photoPlaceholder}>
                          📷 Photo {num}
                        </div>
                        <div style={styles.photoMeta}>
                          <small>Compression: 65% • Size: 245KB</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div style={styles.decisionSection}>
                <h3 style={styles.sectionTitle}>Supervisor Decision</h3>
                <div style={styles.decisionForm}>
                  <div style={styles.commentField}>
                    <label style={styles.commentLabel}>
                      {activeTab === 'VALIDATED' ? 'Comment (Required for rejection):' : 'Decision Comment:'}
                    </label>
                    <textarea
                      value={rejectComment}
                      onChange={(e) => setRejectComment(e.target.value)}
                      placeholder="Enter your decision comments..."
                      style={styles.commentInput}
                      rows={3}
                    />
                  </div>
                  
                  <div style={styles.modalActions}>
                    <button
                      style={styles.modalApproveBtn}
                      onClick={() => handleApprove(selectedRequest.id)}
                    >
                      ✅ Approve Request
                    </button>
                    <button
                      style={styles.modalRejectBtn}
                      onClick={() => handleReject(selectedRequest.id)}
                    >
                      ❌ Reject Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const styles = {
  container: {
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    color: '#1e293b',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: '1.5rem 2rem',
    boxShadow: '0 2px repeated 0 rgba(0, 0, 0, 0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e2e8f0',
  },
  headerLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  title: {
    margin: 0,
    fontSize: '1.875rem',
    fontWeight: '600',
    color: '#1e293b',
  },
  websocketIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  websocketDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
  },
  websocketText: {
    fontSize: '0.875rem',
    color: '#64748b',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  siteSelector: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  siteLabel: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#475569',
  },
  siteSelect: {
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '0.875rem',
    color: '#1e293b',
    cursor: 'pointer',
  },
  stats: {
    display: 'flex',
    gap: '1.5rem',
  },
  statItem: {
    fontSize: '0.875rem',
    color: '#64748b',
  },
  tabContainer: {
    display: 'flex',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
  },
  tab: {
    flex: 1,
    padding: '1rem 1.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '3px solid transparent',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#64748b',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  activeTab: {
    color: '#3b82f6',
    borderBottomColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  mainContent: {
    padding: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px repeated 0 rgba(0, 0, 0, 0.05)',
  },
  emptyText: {
    color: '#64748b',
    fontSize: '1.125rem',
  },
  requestsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '1.5rem',
  },
  requestCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px repeated 0 rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
    overflow: 'hidden',
    transition: 'transform 0.2s ease',
  },
  cardHeader: {
    padding: '1rem 1.5rem',
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestId: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  siteBadge: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  syncStatus: {
    color: '#ffffff',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: '500',
  },
  cardContent: {
    padding: '1.5rem',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.75rem',
    fontSize: '0.875rem',
  },
  detailLabel: {
    color: '#64748b',
    fontWeight: '500',
  },
  detailValue: {
    color: '#1e293b',
    textAlign: 'right',
  },
  quantityWarning: {
    color: '#ef4444',
    fontWeight: '500',
  },
  sapError: {
    backgroundColor: '#fef2f2',
    borderLeft: '3px solid #ef4444',
    padding: '0.75rem',
    margin: '1rem 0',
    fontSize: '0.875rem',
    color: '#991b1b',
  },
  photosSection: {
    marginTop: '1rem',
    textAlign: 'center',
  },
  viewPhotosBtn: {
    backgroundColor: '#f8fafc',
    border: '1px solid #cbd5e1',
    color: '#475569',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  viewPhotosBtnHover: {
    backgroundColor: '#e2e8f0',
  },
  cardActions: {
    padding: '1rem 1.5rem',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #e2e8f0',
  },
  approveBtn: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginRight: '0.75rem',
  },
  rejectBtn: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  quantityAdjustment: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  adjustLabel: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#475569',
  },
  quantityInput: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #cbd5e1',
    width: '80px',
    textAlign: 'center',
  },
  applyBtn: {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    fontSize: '0.875rem',
    cursor: 'pointer',
  },
  reviewActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px repeated 0 rgba(0, 0, 0, 0.1)',
  },
  modalHeader: {
    padding: '1.5rem',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1e293b',
  },
  closeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    color: '#64748b',
    cursor: 'pointer',
    padding: '0.25rem',
  },
  modalContent: {
    padding: '1.5rem',
  },
  modalGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginBottom: '2rem',
  },
  modalSection: {
    backgroundColor: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  sectionTitle: {
    margin: '0 0 1rem 0',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#1e293b',
  },
  validationResult: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  resultRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
  },
  errorText: {
    color: '#ef4444',
    maxWidth: '250px',
    textAlign: 'right',
  },
  photosGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem',
  },
  photoPreview: {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    padding: '1rem',
    textAlign: 'center',
  },
  photoPlaceholder: {
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: '4px',
    color: '#64748b',
  },
  photoMeta: {
    marginTop: '0.5rem',
    color: '#64748b',
    fontSize: '0.75rem',
  },
  decisionSection: {
    backgroundColor: '#f8fafc',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
  },
  decisionForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  commentField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  commentLabel: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#475569',
  },
  commentInput: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '0.875rem',
    color: '#1e293b',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
  },
  modalApproveBtn: {
    backgroundColor: '#10b981',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  modalRejectBtn: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
};

// Add keyframes for pulse animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  button:hover {
    opacity: 0.9;
  }
`;
document.head.appendChild(styleSheet);