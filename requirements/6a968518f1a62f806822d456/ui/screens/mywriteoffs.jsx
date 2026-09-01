const MyWriteOffs = () => {
  // Mock data for the current user's write-off submissions
  const mockWriteOffs = [
    {
      id: "WO-2024-00123",
      item_sku: "SNK-2357-AB",
      item_description: "Premium Running Shoes - Blue/White",
      damage_reason_code: "WATER_DAMAGE",
      severity_tier: "MAJOR",
      damaged_quantity_counted:"
12",
      status: "OFFLINE_PENDING",
      submitted_at: "2024-10-28 14:32:15",
      sap_validation_status: null,
      sap_sync_error: null,
      sap_sync_attempts: 0,
      offline_submission_id: "offline-001",
      last_sync_attempt: null,
      photos: [
        { id: "photo-1", uploaded_at: "2024-10-28 14:32:45", content_type: "image/jpeg", file_size_bytes: 245760, upload_status: "LOCAL_STORED" }
      ],
      validation_errors: []
    },
    {
      id: "WO-temp-4567",
      item_sku: "APP--7890-XL",
      item_description: "Organic Honeycrisp Apples (4lb bag)",
      damage_reason_code: "CRUSHED_PACKAGING",
      severity_tier: "MINOR",
      damaged_quantity_counted: "6",
      status: "SYNCING",
      submitted_at: "2024-10-Last_sync_attempt: "2024-10-28 15:45:30",
      sap_validation_status: null,
      sap_sync_error: null,
      sap_sync_attempts: 1,
      offline_submission_id: "offline, 15:30:22",
      sap_validation_status: null,
      sap_sync_error: null,
      sap_sync_attempts: 1,
      offline_submission_id: "offline-002",
      last_sync_attempt: "2024-10-28 15:45:30",
      photos: [
        { id: "photo-MINOR",
      damaged_quantity_counted: "6",
      status: "SYNCING",
      submitted_at: "2024-10-28 15:30:22",
      sap_validation_status: null,
      sap_sync_error: null,
      sap_sync_attempts: 1,
      offline_submission_id: "offline-002",
      last_sync_attempt: "2024-10-28 15:45:30",
      photos: [
        { id: "photo-2", uploaded_at: "2024-10-28 15:31:10", content_type: "image/jpeg", file_size_bytes: 327680, upload_status: "UPLOAD_PENDING" },
        { id: "photo-3", uploaded_at: "2024-10-28 15:31:25", content_type: "image/jpeg", file_size_bytes: 409600, upload_status: "UPLOAD_PENDING" }
      ],
      validation_errors: []
    },
    {
      id: "WO-2024-00145",
      item_sku: "CLTH-
      status: "COMPLETED",
      submitted_at: "2024-10-27 11:15:08",
      sap_validation_status: "VALID",
      sap_sync_error: null,
      sap_sync_attempts: 1,
      offline_submission_id: null,
      last_sync_attempt: "2024-10-27 12:30:45",
      photos: [
        { id: "photo-4", uploaded_at: "2024-10-27 11:16:22", content_type: "image/jpeg", file_size_bytes: 204800, upload_status: "UPLOADED" },
        { id: "photo-5", uploaded_at: "2024-10-27 11:16:45", content_type: "image/jpeg", file_size_bytes: 286720, upload_status: "UPLOADED" }
      ],
      validation_errors: [],
      sap_inventory_doc_num: "4900012345",
      sap_fi_doc_num: "5100012345"
    },
    {
      id: "WO-2024-00138",
      item_sku: "ELEC-8890-PL",
      item_description: "Smartphone Charger Cable (3m)",
      damage_reason_code: "MANUFACTURING_DEFECT",
      severity_tier: "MODERATE",
      damaged_quantity_counted: "24",
      status: "MANUAL_REVIEW",
      submitted_at: "2024-10-26 16:45:33",
      sap_validation_status: "ERROR",
      sap_sync_error: "SAP validation failed: Item master data mismatch. SKU not found in plant 3100. Please verify with inventory team.",
      sap_sync_attempts: 3,
      offline_submission_id: null,
      last_sync_attempt: "2024-10-27 09:15:20",
      photos: [
        { id: "photo-6", uploaded_at: "2024-10-26 16:46:50", content_type: "image/jpeg", file_size_bytes: 368640, upload_status: "UPLOADED" }
      ],
      validation_errors: [
        "Item SKU validation failed: ELEC-8890-PL not found in SAP plant 3100",
        "SAP inventory interface returned HTTP 404"
      ]
    },
    {
      id: "WO-2024-00129",
      item_sku: "FOOD-4567-HG",
      item_description: "Organic Granola Bars (24ct)",
      damage_reason_code: "EXPIRED",
      severity_tier: "MAJOR",
      damaged_quantity_counted: "48",
      status: "APPROVED",
      submitted_at: "2024-10-26 09:22:17",
      sap_validation_status: "VALID",
      sap_sync_error: null,
      sap_sync_attempts: 0,
      offline_submission_id: null,
      last_sync_attempt: null,
      photos: [
        { id: "photo-7", uploaded_at: "2024-10-26 09:23:05", content_type: "image/jpeg", file_size_bytes: 184320, upload_status: "UPLOADED" },
        { id: "photo-8", uploaded_at: "2024-10-26 09:23:20", content_type: "image/jpeg", file_size_bytes: 204800, upload_status: "UPLOADED" }
      ],
      validation_errors: []
    }
  ];

  // State for selected write-off and filter
  const [selectedWriteOff, setSelectedWriteOff] = React.useState(mockWriteOffs[0]);
  const [statusFilter, setStatusFilter] = React.useState("ALL");
  const [editingWriteOff, setEditingWriteOff] = React.useState(null);
  const [editedQuantity, setEditedQuantity] = React.useState("");

  // Filtered write-offs based on status
  const filteredWriteOffs = React.useMemo(() => {
    if (statusFilter === "ALL") return mockWriteOffs;
    return mockWriteOffs.filter(wo => wo.status === statusFilter);
  }, [statusFilter]);

  // Status options for filter
  const statusOptions = [
    { value: "ALL", label: "All Statuses" },
    { value: "OFFLINE_PENDING", label: "Offline Pending" },
    { value: "SYNCING", label: "Syncing" },
    { value: "APPROVED", label: "Approved" },
    { value: "COMPLETED", label: "Completed" },
    { value: "MANUAL_REVIEW", label: "Manual Review" }
  ];

  // Sync status icons and labels
  const getSyncStatusIcon = (status) => {
    switch(status) {
      case "OFFLINE_PENDING":
        return { icon: "☁️", label: "Offline Pending", color: "#6B7280" };
      case "SYNCING":
        return { icon: "🔄", label: "Syncing", color: "#3B82F6" };
      case "COMPLETED":
        return { icon: "✅", label: "Completed", color: "#10B981" };
      case "MANUAL_REVIEW":
        return { icon: "⚠️", label: "Manual Review", color: "#F59E0B" };
      case "APPROVED":
        return { icon: "👍", label: "Approved", color: "#8B5CF6" };
      default:
        return { icon: "❓", label: "Unknown", color: "#6B7280" };
    }
  };

  // Handle edit click
  const handleEditClick = (writeOff) => {
    if (writeOff.status === "OFFLINE_PENDING") {
      setEditingWriteOff(writeOff);
      setEditedQuantity(writeOff.damaged_quantity_counted);
    }
  };

  // Handle save edit
  const handleSaveEdit = () => {
    if (editingWriteOff && editedQuantity && parseInt(editedQuantity) >= 1 && parseInt(editedQuantity) <= 1000) {
      // In a real app, this would update the offline submission data
      alert(`Quantity updated to ${editedQuantity} for ${editingWriteOff.item_description}`);
      setEditingWriteOff(null);
      setEditedQuantity("");
    } else {
      alert("Please enter a valid quantity between 1 and 1000");
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingWriteOff(null);
    setEditedQuantity("");
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not submitted";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge style
  const getStatusStyle = (status) => {
    const statusConfig = getSyncStatusIcon(status);
    return {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '4px Organize the layout with a sidebar and main content area
      borderRadius: '12px',
      backgroundColor: `${statusConfig.color}20`,
      color: statusConfig.color,
      fontSize: '12px',
      fontWeight: '500'
    };
  };

  // Render the edit modal
  const renderEditModal = () => {
    if (!editingWriteOff) return null;

    return React.createElement('div', {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }
    }, 
      React.createElement('div', {
        style: {
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        }
      },
        React.createElement('h3', {
          style: {
            margin: '0 0 16px 0',
            color: '#111827',
            fontSize: '18px',
            fontWeight: '600'
          }
        }, `Edit ${editingWriteOff.item_description}`),
        
        React.createElement('div', {
          style: {
            marginBottom: '16px'
          }
        },
          React.createElement('label', {
            style: {
              display: 'block',
              marginBottom: '8px',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500'
            }
          }, 'Quantity'),
          React.createElement('input', {
            type: 'number',
            min: '1',
            max: '1000',
            value: editedQuantity,
            onChange: (e) => setEditedQuantity(e.target.value),
            style: {
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '14px'
            }
          })
        ),
        
        React.createElement('div', {
          style: {
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end'
          }
        },
          React.createElement('button', {
            onClick: handleCancelEdit,
            style: {
              padding: '8px 16px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              backgroundColor: 'white',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }
          }, 'Cancel'),
          React.createElement('button', {
            onClick: handleSaveEdit,
            style: {
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#3B82F6',
              color: 'white',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }
          }, 'Save Changes')
        )
      )
    );
  };

  return React.createElement('div', {
    style: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#F9FAFB'
    }
  },
    // Sidebar
    React.createElement('div', {
      style: {
        width: '240px',
        backgroundColor: '#1F2937',
        color: 'white',
        padding: '24px 0',
        display: 'flex',
        flexDirection: 'column'
      }
    },
      React.createElement('div', {
        style: {
          padding: '0 24px 24px 24px',
          borderBottom: '1px solid #374151'
        }
      },
        React.createElement('h1', {
          style: {
            margin: '0 0اطر 8px 0',
            fontSize: '20px',
            fontWeight: '600',
            color: '#F3F4F6'
          }
        }, 'Stark Digital'),
        React.createElement('p', {
          style: {
            margin: 0,
            fontSize: '14px',
            color: '#9CA3AF'
          }
        }, 'Write-Off System')
      ),
      
      React.createElement('nav', {
        style: {
          flex: 1,
          padding: '24px 0'
        }
      },
        React.createElement('a', {
          href: '/submit',
          style: {
            display: 'block',
            padding: '12px 24px',
            color: '#D1D5DB',
            textDecoration: 'none',
            fontSize: '14px'
          }
        }, '➕ New Submission'),
        React.createElement('a', {
          href: '/my-write-offs',
          style: {
            display: 'block',
            padding: '12px 24px',
            backgroundColor: '#374151',
            color: 'white',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            borderLeft: '3px solid #3B82F6'
          }
        }, '📋 My Write-Offs'),
        React.createElement('a', {
          href: '/review',
          style: {
            display: 'block',
            padding: '12px 24px',
            color: '#D1D5DB',
            textDecoration: 'none',
            fontSize: '14px'
          }
        }, '👁️ Supervisor Review'),
        React.createElement('a', {
          href: '/finance',
          style: {
            display: 'block',
            padding: '12px 24px',
            color: '#D1D5DB',
            textDecoration: 'none',
            fontSize: '14px'
          }
        }, '💰 Finance Dashboard'),
        React.createElement('a', {
          href: '/admin',
          style: {
            display: 'block',
            padding: '12px 24px',
            color: '#D1D5DB',
            textDecoration: 'none',
            fontSize: '14px'
          }
        }, '⚙️ Admin Settings')
      ),
      
      React.createElement('div', {
        style: {
          padding: '24px',
          borderTop: '1px solid #374151'
        }
      },
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }
        },
          React.createElement('div', {
            style: {
              width: '32px',
              height: '32px',
              borderRadius: '16px',
              backgroundColor: '#3B82F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '600'
            }
          }, 'JS'),
          React.createElement('div', {},
            React.createElement('p', {
              style: {
                margin: 0,
                fontSize: '14px',
                fontWeight: '500'
              }
            }, 'John Smith'),
            React.createElement('p', {
              style: {
                margin: 0,
                fontSize: '12px',
                color: '#9CA3AF'
              }
            }, 'Warehouse Staff')
          )
        )
      )
    ),
    
    // Main content area
    React.createElement('main', {
      style: {
        flex: 1,
        padding: '32px'
      }
    },
      // Header
      React.createElement('div', {
        style: {
          marginBottom: '32px'
        }
      },
        React.createElement('h1', {
          style: {
            margin: '0 0 8px 0',
            fontSize: '28px',
            fontWeight: '700',
            color: '#111827'
          }
        }, 'My Write-Offs'),
        React.createElement('p', {
          style: {
            margin: 0,
            color: '#6B7280',
            fontSize: '16px'
          }
        }, 'View and manage all your damaged stock submissions')
      ),
      
      // Filter and stats
      React.createElement('div', {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }
      },
        React.createElement('div', {
          style: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }
        },
          React.createElement('select', {
            value: statusFilter,
            onChange: (e) => setStatusFilter(e.target.value),
            style: {
              padding: '8px 16px',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              backgroundColor: 'white',
              color: '#374151',
              fontSize: '14px',
              minWidth: '180px'
            }
          },
            statusOptions.map(option => 
              React.createElement('option', { key: option.value, value: option.value }, option.label)
            )
          )
        ),
        
        React.createElement('div', {
          style: {
            display: 'flex',
            gap: '16px',
            fontSize: '14px',
            color: '#6B7280'
          }
        },
          React.createElement('span', {}, `Showing ${filteredWriteOffs.length} of ${mockWriteOffs.length} submissions`)
        )
      ),
      
      // Two-column layout for table and details
      React.createElement('div', {
        style: {
          display: 'flex',
          gap: '24px',
          flexDirection: 'row',
          '@media (max-width: 1024px)': {
            flexDirection: 'column'
          }
        }
      },
        // Table column
        React.createElement('div', {
          style: {
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
            overflow: 'hidden'
          }
        },
          React.createElement('div', {
            style: {
              overflowX: 'auto'
            }
          },
            React.createElement('table', {
              style: {
                width: '100%',
                borderCollapse: 'collapse'
              }
            },
              React.createElement('thead', {
                style: {
                  backgroundColor: '#F9FAFB',
                  borderBottom: '1px solid #E5E7EB'
                }
              },
                React.createElement('tr', {},
                  React.createElement('th', {
                    style: {
                      padding: '16px 24px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }
                  }, 'Item'),
                  React.createElement('th', {
                    style: {
                      padding: '16px 24px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }
                  }, 'Quantity'),
                  React.createElement('th', {
                    style: {
                      padding: '16px 24px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }
                  }, 'Status'),
                  React.createElement('th', {
                    style: {
                      padding: '16px 24px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }
                  }, 'Submitted'),
                  React.createElement('th', {
                    style: {
                      padding: '16px 24px',
                      textAlign: 'left',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#6B7280',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }
                  }, 'Actions')
                )
              ),
              
              React.createElement('tbody', {},
                filteredWriteOffs.map(writeOff => {
                  const isSelected = selectedWriteOff.id === writeOff.id;
                  const statusInfo = getSyncStatusIcon(writeOff.status);
                  
                  return React.createElement('tr', {
                    key: writeOff.id,
                    onClick: () => setSelectedWriteOff(writeOff),
                    style: {
                      cursor: 'pointer',
                      backgroundColor: isSelected ? '#F0F9FF' : 'white',
                      borderBottom: '1px solid #E5E7EB',
                      '&:hover': {
                        backgroundColor: '#F9FAFB'
                      }
                    }
                  },
                    React.createElement('td', {
                      style: {
                        padding: '16px 24px',
                        color: '#111827',
                        fontSize: '14px'
                      }
                    },
                      React.createElement('div', {
                        style: {
                          fontWeight: '500',
                          marginBottom: '4px'
                        }
                      }, writeOff.item_description),
                      React.createElement('div', {
                        style: {
                          color: '#6B7280',
                          fontSize: '12px'
                        }
                      }, writeOff.item_sku)
                    ),
                    React.createElement('td', {
                      style: {
                        padding: '16px 24px',
                        color: '#111827',
                        fontSize: '14px',
                        fontWeight: '500'
                      }
                    }, writeOff.damaged_quantity_counted),
                    React.createElement('td', {
                      style: {
                        padding: '16px 24px'
                      }
                    },
                      React.createElement('span', {
                        style: getStatusStyle(writeOff.status)
                      },
                        statusInfo.icon,
                        statusInfo.label
                      )
                    ),
                    React.createElement('td', {
                      style: {
                        padding: '16px 24px',
                        color: '#6B7280',
                        fontSize: '14px'
                      }
                    }, formatDate(writeOff.submitted_at)),
                    React.createElement('td', {
                      style: {
                        padding: '16px 24px'
                      }
                    },
                      writeOff.status === "OFFLINE_PENDING" && 
                        React.createElement('button', {
                          onClick: (e) => {
                            e.stopPropagation();
                            handleEditClick(writeOff);
                          },
                          style: {
                            padding: '6px 12px',
                            border: '1px solid #D1D5DB',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            color: '#374151',
                            fontSize: '12px',
                            fontWeight: '500',
                            cursor: 'pointer'
                          }
                        }, 'Edit')
                    )
                  );
                })
              )
            )
          )
        ),
        
        // Details panel column
        React.createElement('div', {
          style: {
            width: '400px',
            '@media (max-width: 1024px)': {
              width: '100%'
            }
          }
        },
          React.createElement('div', {
            style: {
              backgroundColor: 'white',
              borderRadius: '12px',
              border: '1px solid #E5E7EB',
              padding: '24px'
            }
          },
            React.createElement('h2', {
              style: {
                margin: '0 0 24px 0',
                fontSize: '18px',
                fontWeight: '600',
                color: '#111827'
              }
            }, 'Submission Details'),
            
            selectedWriteOff ? React.createElement('div', {},
              // Item info
              React.createElement('div', {
                style: {
                  marginBottom: '24px',
                  paddingBottom: '24px',
                  borderBottom: '1px solid #E5E7EB'
                }
              },
                React.createElement('h3', {
                  style: {
                    margin: '0 0 12px 0',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#111827'
                  }
                }, selectedWriteOff.item_description),
                React.createElement('div', {
                  style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px'
                  }
                },
                  React.createElement('div', {},
                    React.createElement('div', {
                      style: {
                        fontSize: '12px',
                        color: '#6B7280',
                        marginBottom: '4px'
                      }
                    }, 'SKU'),
                    React.createElement('div', {
                      style: {
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#111827'
                      }
                    }, selectedWriteOff.item_sku)
                  ),
                  React.createElement('div', {},
                    React.createElement('div', {
                      style: {
                        fontSize: '12px',
                        color: '#6B7280',
                        marginBottom: '4px'
                      }
                    }, 'Quantity'),
                    React.createElement('div', {
                      style: {
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#111827'
                      }
                    }, selectedWriteOff.damaged_quantity_counted)
                  ),
                  React.createElement('div', {},
                    React.createElement('div', {
                      style: {
                        fontSize: '12px',
                        color: '#6B7280',
                        marginBottom: '4px'
                      }
                    }, 'Damage Reason'),
                    React.createElement('div', {
                      style: {
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#111827'
                      }
                    }, selectedWriteOff.damage_reason_code.replace(/_/g, ' '))
                  ),
                  React.createElement('div', {},
                    React.createElement('div', {
                      style: {
                        fontSize: '12px',
                        color: '#6B7280',
                        marginBottom: '4px'
                      }
                    }, 'Severity'),
                    React.createElement('div', {
                      style: {
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#111827'
                      }
                    }, selectedWriteOff.severity_tier)
                  )
                )
              ),
              
              // Sync status
              React.createElement('div', {
                style: {
                  marginBottom: '24px'
                }
              },
                React.createElement('h3', {
                  style: {
                    margin: '0 0 12px 0',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#111827'
                  }
                }, 'Sync Status'),
                React.createElement('div', {
                  style: getStatusStyle(selectedWriteOff.status)
                },
                  getSyncStatusIcon(selectedWriteOff.status).icon,
                  getSyncStatusIcon(selectedWriteOff.status).label
                ),
                selectedWriteOff.last_sync_attempt && 
                  React.createElement('div', {
                    style: {
                      marginTop: '8px',
                      fontSize: '12px',
                      color: '#6B7280'
                    }
                  }, `Last sync attempt: ${formatDate(selectedWriteOff.last_sync_attempt)}`)
              ),
              
              // Photos
              React.createElement('div', {
                style: {
                  marginBottom: '24px'
                }
              },
                React.createElement('h3', {
                  style: {
                    margin: '0 0 12px 0',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#111827'
                  }
                }, `Photos (${selectedWriteOff.photos.length})`),
                React.createElement('div', {
                  style: {
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }
                },
                  selectedWriteOff.photos.map(photo => 
                    React.createElement('div', {
                      key: photo.id,
                      style: {
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#F3F4F6',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#6B7280',
                        fontSize: '12px',
                        border: '1px dashed #D1D5DB'
                      }
                    }, 
                      photo.upload_status === "UPLOADED" ? "✅" : 
                      photo.upload_status === "UPLOAD_PENDING" ? "⏳" : "📱"
                    )
                  )
                )
              ),
              
              // SAP failure details for MANUAL_REVIEW
              selectedWriteOff.status === "MANUAL_REVIEW" && 
                React.createElement('div', {
                  style: {
                    marginBottom: '24px',
                    padding: '16px',
                    backgroundColor: '#FEF3C7',
                    borderRadius: '8px',
                    border: '1px solid #FDE68A'
                  }
                },
                  React.createElement('h3', {
                    style: {
                      margin: '0 0 12px 0',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#92400E'
                    }
                  }, 'SAP Validation Error'),
                  React.createElement('div', {
                    style: {
                      fontSize: '14px',
                      color: '#92400E',
                      marginBottom: '8px'
                    }
                  }, selectedWriteOff.sap_sync_error),
                  selectedWriteOff.validation_errors.map((error, index) => 
                    React.createElement('div', {
                      key: index,
                      style: {
                        fontSize: '12px',
                        color: '#92400E',
                        marginTop: '4px'
                      }
                    }, `• ${error}`)
                  )
                ),
              
              // Completed details
              selectedWriteOff.status === "COMPLETED" && 
                React.createElement('div', {
                  style: {
                    marginBottom: '24px',
                    padding: '16px',
                    backgroundColor: '#D1FAE5',
                    borderRadius: '8px',
                    border: '1px solid #A7F3D0'
                  }
                },
                  React.createElement('h3', {
                    style: {
                      margin: '0 0 12px 0',
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#065F46'
                    }
                  }, 'SAP Integration Complete'),
                  React.createElement('div', {
                    style: {
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '12px'
                    }
                  },
                    React.createElement('div', {},
                      React.createElement('div', {
                        style: {
                          fontSize: '12px',
                          color: '#065F46',
                          marginBottom: '4px'
                        }
                      }, 'Inventory Doc'),
                      React.createElement('div', {
                        style: {
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#065F46'
                        }
                      }, selectedWriteOff.sap_inventory_doc_num || '4900012345')
                    ),
                    React.createElement('div', {},
                      React.createElement('div', {
                        style: {
                          fontSize: '12px',
                          color: '#065F46',
                          marginBottom: '4px'
                        }
                      }, 'FI Document'),
                      React.createElement('div', {
                        style: {
                          fontSize: '14px',
                          fontWeight: '500',
                          color: '#065F46'
                        }
                      }, selectedWriteOff.sap_fi_doc_num || '5100012345')
                    )
                  )
                )
            ) : React.createElement('div', {
              style: {
                textAlign: 'center',
                color: '#6B7280',
                padding: '32px'
              }
            }, 'Select a write-off to view details')
          )
        )
      )
    ),
    
    // Edit modal
    renderEditModal()
  );
};