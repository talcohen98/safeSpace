import React, { createContext, useState, useEffect } from "react";
import { useFetch } from "../Hooks/useFetch"; 

export const ExpertsContext = createContext(null);

const ExpertsContextProvider = ({ children }) => {

  const { data: allExpertsData, isLoading: allExpertsLoading, error: allExpertsError } = useFetch("http://localhost:5000/admin/approvedExperts");
  const { data: pendingExpertsData, isLoading: pendingExpertsLoading, error: pendingExpertsError } = useFetch("http://localhost:5000/admin/pendingExperts");
  const {data : unapprovedExpertsData, isLoading: unapprovedExpertsLoading, error: unapprovedExpertsError} = useFetch("http://localhost:5000/admin/unapprovedExperts");

  // using useState so pages showing the data can be updated when the data changes
  const [allExperts, setAllExperts] = useState([]);
  const [pendingExperts, setPendingExperts] = useState([]);
  const [unapprovedExperts, setUnapprovedExperts] = useState([]);

  // initial state from useFetch data
  useEffect(() => {
    if (allExpertsData) setAllExperts(allExpertsData.data);
  }, [allExpertsData]);

  // initial state from useFetch data
  useEffect(() => {
    if (pendingExpertsData) {
      setPendingExperts(pendingExpertsData.data); 
    }
  }, [pendingExpertsData]);

  // initial state from useFetch data
  useEffect(() => {
    if (unapprovedExpertsData) {
      setUnapprovedExperts(unapprovedExpertsData.data);
    }
  }, [unapprovedExpertsData]);
  
  /***********************  functions for Pending Approval page ***********************/

  // Approve an expert and update the state 
  const approvePendingExpert = async (expertId) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/approveExpert/${expertId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const result = await response.json();
      if (response.ok) {
        // Add the approved expert to the allExperts state
        setAllExperts((prevAllExperts) => [...prevAllExperts, result.data]);
        // Remove the approved expert from the pendingExperts state
        setPendingExperts((prevPendingExperts) =>
          prevPendingExperts.filter((expert) => expert.expertID !== expertId)
        );
      } else {
        throw new Error(result.message || "Failed to approve expert");
      }
    } catch (error) {
      throw error;
    }
  };

  // decline an expert waiting for an approval
  const DeclinePendingExpert = async (expertId) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/declineExpert/${expertId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const result = await response.json();
      if (response.ok) {
        // Remove the approved expert from the pendingExperts state
        setPendingExperts((prevPendingExperts) =>
          prevPendingExperts.filter((expert) => expert.expertID !== expertId)
        );
        // Add the declined expert to the unapprovedExperts state
        setUnapprovedExperts((prevUnapprovedExperts) => [...prevUnapprovedExperts, result.data]);
      } else {
        throw new Error(result.message || "Failed to Decline expert");
      }
    } catch (error) {
      throw error;
    }
  };

   /***********************  functions for Experts page ***********************/

  // unapprove an expert that was approved in the past 
  const RemoveApprovedExpert = async (expertId) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/declineExpert/${expertId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const result = await response.json();
      if (response.ok) {
        // Remove the approved expert from the AllExperts state
        setAllExperts((prevAllExperts) =>
          prevAllExperts.filter((expert) => expert.expertID !== expertId)
        );
        // Add the declined expert to the unapprovedExperts state
        setUnapprovedExperts((prevUnapprovedExperts) => [...prevUnapprovedExperts, result.data]);
      } else {
        throw new Error(result.message || "Failed to remove expert");
      }
    } catch (error) {
      throw error;
    }
  };


   /***********************  functions for Unapproved Experts page ***********************/

  // Approve an expert that was declined in the past
  const approveDeclinedExpert = async (expertId) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/approveExpert/${expertId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const result = await response.json();
      if (response.ok) {
        // Add the approved expert to the allExperts state
        setAllExperts((prevAllExperts) => [...prevAllExperts, result.data]);
        // Remove the approved expert from the unapprovedExperts state
        setUnapprovedExperts((prevUnapprovedExperts) =>
          prevUnapprovedExperts.filter((expert) => expert.expertID !== expertId)
        );
      } else {
        throw new Error(result.message || "Failed to approve expert");
      }
    } catch (error) {
      throw error;
    }
  };


  // Provide the context value
  const contextValue = {
    allExperts,
    allExpertsLoading,
    allExpertsError,
    RemoveApprovedExpert,
    pendingExperts,
    pendingExpertsLoading,
    pendingExpertsError,
    approvePendingExpert,
    DeclinePendingExpert,
    unapprovedExperts,
    unapprovedExpertsLoading,
    unapprovedExpertsError,
    approveDeclinedExpert,
  };

  return (
    <ExpertsContext.Provider value={contextValue}>
      {children}
    </ExpertsContext.Provider>
  );
};

export default ExpertsContextProvider;
