import React, { useContext } from 'react';
import { AlertCircle, UserX } from 'lucide-react';
import { ExpertsTable } from './ExpertsTable';
import { ExpertsContext } from '../Context/ExpertsContext';


const UnApprovedExperts = () => {
  const { unapprovedExperts, unapprovedExpertsLoading, unapprovedExpertsError, approveDeclinedExpert } = useContext(ExpertsContext);

  const handleApprove = async (expertId, expertName) => {
    try {
      await approveDeclinedExpert(expertId);
      alert(`Expert ${expertName} approved successfully!`);
    } catch (error) {
      console.error('Error approving expert:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="content-container">
      <div className="page-header">
        <h1 className="page-title">Experts Denied Approval</h1>
        <p className="page-subtitle">Manage and view all experts who were not approved in the system</p>
      </div>

      {/* Show loading spinner if data is loading */}
      {unapprovedExpertsLoading && (
        <div className="status-container">
          <div className="loading-spinner" />
          Loading...
        </div>
      )}

      {/* Show error message if there's an error */}
      {unapprovedExpertsError && (
        <div className="error-message">
          <AlertCircle size={20} />
          Error loading unapproved experts: {unapprovedExpertsError}
        </div>
      )}

      {/* Show message if there are no experts and not loading */}
      {unapprovedExperts?.length === 0 && !unapprovedExpertsLoading && (
        <div className="status-container">
          <UserX size={40} />
          <p>No unapproved experts found in the system</p>
        </div>
      )}

      {/* Render ExpertsTable if there are approved experts */}
      {unapprovedExperts?.length > 0 && 
      <ExpertsTable 
        data={unapprovedExperts}
        onApprove={handleApprove}
        showApproveButton={true}
        showDeclineButton={false}
        />}
    </div>
  );
};

export default UnApprovedExperts;

