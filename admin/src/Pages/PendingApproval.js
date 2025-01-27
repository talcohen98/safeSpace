import React, { useContext } from 'react';
import { AlertCircle, UserX } from 'lucide-react';
import { ExpertsTable } from './ExpertsTable';
import { ExpertsContext } from '../Context/ExpertsContext';

const PendingApproval = () => {
  // Get context values 
  const {
    pendingExperts,
    pendingExpertsLoading,
    pendingExpertsError,
    approvePendingExpert,
    DeclinePendingExpert,
  } = useContext(ExpertsContext);

  const handleApprove = async (expertId, expertName) => {
    try {
      await approvePendingExpert(expertId);
      alert(`Expert ${expertName} approved successfully!`);
    } catch (error) {
      console.error('Error approving expert:', error.message);
      alert(error.message);
    }
  };

  const handleReject = async (expertId, expertName) => {
    try {
      await DeclinePendingExpert(expertId);
      alert(`Expert ${expertName} declined successfully!`);
    } catch (error) {
      console.error('Error declining expert:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="content-container">
      <div className="page-header">
        <h1 className="page-title">Pending Approvals</h1>
        <p className="page-subtitle">Review and approve or decline expert applications</p>
      </div>

      {/* Show loading spinner if data is loading */}
      {pendingExpertsLoading && (
        <div className="status-container">
          <div className="loading-spinner" />
          Loading...
        </div>
      )}

      {/* Show error message if there's an error */}
      {pendingExpertsError && (
        <div className="error-message">
          <AlertCircle size={20} />
          Error loading pending approvals: {pendingExpertsError}
        </div>
      )}

      {/* Show message if no unapproved experts and not loading */}
      {pendingExperts?.length === 0 && !pendingExpertsLoading && (
        <div className="status-container">
          <UserX size={40} />
          <p>No pending approval requests</p>
        </div>
      )}

      {/* Render ExpertsTable if there are unapproved experts */}
      {pendingExperts?.length > 0 && (
        <ExpertsTable 
          data={pendingExperts}  
          showApproveButton={true}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default PendingApproval;

