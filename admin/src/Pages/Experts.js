import React, { useContext } from 'react';
import { AlertCircle, UserX } from 'lucide-react';
import { ExpertsTable } from './ExpertsTable';
import { ExpertsContext } from '../Context/ExpertsContext';

const ExpertsList = () => {
  // Access the context values
  const { allExperts, allExpertsLoading, allExpertsError, RemoveApprovedExpert } = useContext(ExpertsContext);

  const handleReject = async (expertId, expertName) => {
    try {
      await RemoveApprovedExpert(expertId);
      alert(`Expert ${expertName} removed successfully!`);
    } catch (error) {
      console.error('Error removing expert:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="content-container">
      <div className="page-header">
        <h1 className="page-title">Approved Experts</h1>
        <p className="page-subtitle">Manage and view all approved experts in the system</p>
      </div>

      {/* Show loading spinner if data is loading */}
      {allExpertsLoading && (
        <div className="status-container">
          <div className="loading-spinner" />
          Loading...
        </div>
      )}

      {/* Show error message if there's an error */}
      {allExpertsError && (
        <div className="error-message">
          <AlertCircle size={20} />
          Error loading experts: {allExpertsError}
        </div>
      )}

      {/* Show message if there are no experts and not loading */}
      {allExperts?.length === 0 && !allExpertsLoading && (
        <div className="status-container">
          <UserX size={40} />
          <p>No experts found in the system</p>
        </div>
      )}

      {/* Render ExpertsTable if there are approved experts */}
      {allExperts?.length > 0 && 
      <ExpertsTable 
        data={allExperts}
        onReject={handleReject} />}
    </div>
  );
};

export default ExpertsList;

